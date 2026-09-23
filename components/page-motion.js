"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll("[data-reveal], [data-reveal-group] > *, main > section:not([data-active-branch], [data-reveal-group]):not(:has([data-reveal], [data-reveal-group])), main > nav:not(:has([data-reveal-group]))")];
    const reveal = element => {
      element.dataset.revealState = "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        entry.target.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 130}ms`);
        reveal(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
    const showAll = () => {
      if (media.matches) elements.forEach(element => { element.style.setProperty("--reveal-delay", "0ms"); reveal(element); });
    };
    // Keyboard users should never focus an invisible link or field.
    const onFocus = event => {
      elements.forEach(element => { if (element.contains(event.target)) { element.style.setProperty("--reveal-delay", "0ms"); reveal(element); } });
    };
    elements.forEach(element => {
      if (media.matches || element.getBoundingClientRect().bottom <= 0) return;
      element.dataset.revealState = "pending";
    });
    // Paint the initial state before observing, including blocks already in the viewport.
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => elements.forEach(element => {
        if (element.dataset.revealState === "pending") observer.observe(element);
      }));
    });
    media.addEventListener("change", showAll);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      elements.forEach(element => { delete element.dataset.revealState; element.style.removeProperty("--reveal-delay"); });
      media.removeEventListener("change", showAll);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
