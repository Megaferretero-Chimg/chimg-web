"use client";
import WhatsAppIcon from "@/components/whatsapp-icon";

import { useLanguage } from "@/components/language-selector";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import trainingDesktop from "@/output/banners/chimg-training-desktop-v3.webp";
import trainingMobile from "@/output/banners/chimg-training-mobile-v3-raised.webp";
import eventDesktop from "@/output/banners/chimg-event-desktop-v4.webp";
import eventMobile from "@/output/banners/chimg-event-mobile-corrected.webp";
import anniversaryDesktop from "@/output/banners/chimg-25-years-both-branches.webp";
import anniversaryMobile from "@/output/banners/chimg-25-years-mobile.webp";
import serviceDesktop from "@/public/imgs/salcedo/cajas-botarga.webp";
import serviceMobile from "@/output/banners/chimg-service-mobile-v2.webp";
import showroomDesktop from "@/output/banners/chimg-showroom-desktop.webp";
import showroomMobile from "@/output/banners/chimg-showroom-mobile.webp";
import mobile from "@/output/banners/chimg-mobile-v1-uniform-raised.webp";
import desktop from "@/output/banners/chimg-widescreen-v1.png";
import salcedoDesktop from "@/output/banners/chimg-salcedo-desktop-v1.png";
import salcedoMobile from "@/output/banners/chimg-salcedo-mobile-v1-uniform-raised.webp";
import styles from "./home-hero.module.scss";
import DigitalTransition from "./digital-transition";

const slides = [
  { name: "Ambato", label: "Matriz Ambato", type: "MATRIZ", desktop, mobile },
  { name: "Salcedo", label: "Sucursal Salcedo", type: "SUCURSAL", desktop: salcedoDesktop, mobile: salcedoMobile },
  { name: "Capacitaciones", label: "Capacitaciones CHIMG", desktop: trainingDesktop, mobile: trainingMobile, alt: "Capacitación de CHIMG con asistentes, expositor y mascota" },
  { name: "Eventos", label: "Eventos CHIMG", desktop: eventDesktop, mobile: eventMobile, alt: "Stand de CHIMG con dos representantes y la mascota" },
  { name: "Atención", label: "Atención al cliente", desktop: serviceDesktop, mobile: serviceMobile, alt: "La mascota de CHIMG atendiendo a un cliente en caja" },
  { name: "Showrooms", label: "Showrooms CHIMG", desktop: showroomDesktop, mobile: showroomMobile, alt: "La mascota de CHIMG junto a las exhibiciones de grifería y acabados del showroom" },
  { name: "25 años", label: "25 años de experiencia", desktop: anniversaryDesktop, mobile: anniversaryMobile, alt: "25 años de experiencia de CHIMG junto a las sucursales de Ambato y Salcedo" },
];

function subscribeMotion(callback) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  return () => {
    media.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
  };
}

function canAnimate() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && document.visibilityState === "visible";
}

export default function HomeHero({ children }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(() => slides.map(() => false));
  const imageRefs = useRef([]);
  const motionAllowed = useSyncExternalStore(subscribeMotion, canAnimate, () => false);
  const ready = loaded.every(Boolean);

  useEffect(() => {
    let cancelled = false;
    // Cached images can finish before React attaches onLoad during hydration.
    imageRefs.current.forEach((image, index) => {
      if (!image) return;
      image.decode().then(() => {
        if (!cancelled) setLoaded(current => current[index] ? current : current.map((value, position) => position === index || value));
      }).catch(() => { /* A responsive source change is handled by onLoad. */ });
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || !motionAllowed) return;
    const timer = window.setTimeout(() => {
      setActive(current => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [active, ready, motionAllowed]);

  function selectSlide(index) {
    setActive(index);
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-title" aria-roledescription={t("carrusel")} data-active-branch={t(slides[active].name)}>
      {slides.map((slide, index) => {
        const { props } = getImageProps({ src: slide.desktop, unoptimized: true, loading: "eager", sizes: "100vw", alt: slide.alt || t("Personaje de CHIMG frente a la sucursal de {name} al atardecer", { name: slide.name }) });
        return (
          <div key={slide.name} className={`${styles.picture} ${active === index ? styles.visible : ""}`} aria-hidden={active !== index}>
            <picture>
            <source media="(max-width: 700px)" srcSet={slide.mobile.src} width={slide.mobile.width} height={slide.mobile.height} />
            <img {...props} ref={element => { imageRefs.current[index] = element; }} alt={t(props.alt)} className={`${styles.image} ${slide.name === "Capacitaciones" || slide.name === "Eventos" ? styles.trainingImage : ""}`} loading="eager" fetchPriority={index === 0 ? "high" : "low"} onLoad={() => setLoaded(current => current[index] ? current : current.map((value, position) => position === index || value))} />
            </picture>
          </div>
        );
      })}
      <div className={styles.shade} />
      <DigitalTransition scene={active} enabled={motionAllowed} imagesRef={imageRefs} />
      <div className={styles.content}>
        <h1 id="hero-title"><span className={styles.titleLine}><span>{t("Tú lo imaginas.")}{" "}{t("Juntos, lo")}{" "}<em>{t("hacemos.")}</em></span></span></h1>
        <p className={styles.description}>{t("Todo para construir, renovar y dar vida")}<br className={styles.desktopBreak} /> {t("a tus espacios. Un aliado en cada paso.")}</p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>{t("Trabajemos juntos")} <span><WhatsAppIcon size={20} /></span></Link>
        </div>
      </div>
      <div className={styles.socialDock}>{children}</div>
      <div className={styles.slideCaption}>
        {slides.map((slide, index) => <span key={slide.name} className={active === index ? styles.captionActive : ""} aria-hidden={active !== index}>{t(slide.label)}</span>)}
      </div>
      <div className={styles.controls} role="group" aria-label="Navegar imágenes">
        <button type="button" aria-label="Imagen anterior" onClick={() => selectSlide((active - 1 + slides.length) % slides.length)}><ChevronLeft size={18} /></button>
        <div className={styles.slideDots}>
          {slides.map((slide, index) => <button key={slide.name} type="button" disabled={!loaded[index]} aria-label={`Imagen ${index + 1}`} aria-pressed={active === index} onClick={() => selectSlide(index)}><span /></button>)}
        </div>
        <button type="button" aria-label="Imagen siguiente" onClick={() => selectSlide((active + 1) % slides.length)}><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
