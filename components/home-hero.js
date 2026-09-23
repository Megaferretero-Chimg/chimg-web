"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Pause, Play } from "lucide-react";
import mobile from "@/output/banners/chimg-mobile-v1.png";
import desktop from "@/output/banners/chimg-widescreen-v1.png";
import salcedoDesktop from "@/output/banners/chimg-salcedo-desktop-v1.png";
import salcedoMobile from "@/output/banners/chimg-salcedo-mobile-v1.png";
import styles from "./home-hero.module.scss";
import DigitalTransition from "./digital-transition";

const slides = [
  { name: "Ambato", type: "MATRIZ", desktop, mobile },
  { name: "Salcedo", type: "SUCURSAL", desktop: salcedoDesktop, mobile: salcedoMobile },
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

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState([false, false]);
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
    if (paused || !ready || !motionAllowed) return;
    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, ready, motionAllowed]);

  function selectSlide(index) {
    setActive(index);
    setPaused(true);
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-title" aria-roledescription="carrusel" data-active-branch={slides[active].name}>
      {slides.map((slide, index) => {
        const { props } = getImageProps({ src: slide.desktop, unoptimized: true, loading: "eager", sizes: "100vw", alt: `Personaje de CHIMG frente a la sucursal de ${slide.name} al atardecer` });
        return (
          <div key={slide.name} className={`${styles.picture} ${active === index ? styles.visible : ""}`} aria-hidden={active !== index}>
            <picture>
            <source media="(max-width: 700px)" srcSet={slide.mobile.src} width={slide.mobile.width} height={slide.mobile.height} />
            <img {...props} ref={element => { imageRefs.current[index] = element; }} alt={props.alt} className={styles.image} loading="eager" fetchPriority={index === 0 ? "high" : "low"} onLoad={() => setLoaded(current => current[index] ? current : current.map((value, position) => position === index || value))} />
            </picture>
          </div>
        );
      })}
      <div className={styles.shade} />
      <DigitalTransition scene={active} enabled={motionAllowed} imagesRef={imageRefs} />
      <div className={styles.content}>
        <p className={styles.eyebrow}><span /> CONSTRUIMOS CONTIGO, DESDE SIEMPRE.</p>
        <h1 id="hero-title"><span className={styles.titleLine}><span>Tú lo imaginas.</span></span><br /><span className={styles.titleLine}><span>Juntos, lo</span></span>{" "}<br /><span className={styles.titleLine}><em>hacemos.</em></span></h1>
        <p className={styles.description}>Todo para construir, renovar y dar vida<br className={styles.desktopBreak} /> a tus espacios. Un aliado en cada paso.</p>
        <div className={styles.actions}>
          <Link href="/lineas" className={styles.primary}>Explora nuestras líneas <span><ArrowUpRight size={20} /></span></Link>
          <Link href="/contacto" className={styles.secondary}>Hablemos de tu proyecto <ArrowUpRight size={17} /></Link>
        </div>
      </div>
      <div className={styles.controls} role="group" aria-label="Seleccionar sucursal del banner">
        <div className={styles.branchTabs} style={{ "--active-branch": active }}>
          <span className={styles.selectionIndicator} aria-hidden="true" />
          {slides.map((slide, index) => <button key={slide.name} type="button" disabled={!loaded[index]} aria-pressed={active === index} onClick={() => selectSlide(index)}><span />{slide.name}</button>)}
        </div>
        {motionAllowed && <button type="button" className={styles.playback} onClick={() => setPaused(value => !value)} aria-label={paused ? "Reanudar presentación" : "Pausar presentación"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
      </div>
      <div className={styles.bottom}>
        <Link href="/nosotros" className={styles.experience}><strong>25<span>+</span></strong><span>Años de experiencia.<br />Miles de ideas por construir.</span><ArrowUpRight size={18} /></Link>
        <Link href="/contacto" className={styles.location} aria-label={`Visitar ${slides[active].name}`}>
          <MapPin size={19} />
          <span className={styles.locationLabels}>
            {slides.map((slide, index) => <span key={slide.name} className={`${styles.locationLabel} ${active === index ? styles.locationLabelActive : ""}`} aria-hidden={active !== index}><small>{slide.type} · VEN A CONOCERNOS</small><span>{slide.name}</span></span>)}
          </span>
          <ArrowUpRight size={19} />
        </Link>
      </div>
    </section>
  );
}
