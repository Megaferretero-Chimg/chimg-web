"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./branch-facades.module.scss";

const images = {
  Ambato: ["/imgs/sucursales/ambato/DSC00788.webp", "/imgs/sucursales/ambato/DSC00666.webp"],
  Salcedo: ["/imgs/sucursales/salcedo/DSC00626.webp", "/imgs/sucursales/salcedo/DSC00621.webp", "/imgs/sucursales/salcedo/DSC00630.webp", "/imgs/sucursales/salcedo/DSC00624.webp"],
};

export default function BranchFacades({ branch, alt, labels }) {
  const photos = images[branch];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % photos.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, photos.length]);
  function move(step) { setPaused(true); setIndex(value => (value + step + photos.length) % photos.length); }
  return <div className={styles.slider} role="region" aria-label={alt} aria-roledescription={labels.carousel}>
    <div className={styles.frame}><Image key={photos[index]} src={photos[index]} alt={`${alt} · ${index + 1}`} width={1920} height={1280} sizes="(max-width: 800px) 100vw, 50vw" /></div>
    <div className={styles.controls}><button type="button" onClick={() => move(-1)} aria-label={labels.previous}>←</button><div className={styles.dots}>{photos.map((src, position) => <button key={src} type="button" aria-label={`${labels.view} ${position + 1}`} aria-pressed={position === index} onClick={() => { setPaused(true); setIndex(position); }} />)}</div><button type="button" onClick={() => move(1)} aria-label={labels.next}>→</button><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? labels.play : labels.pause}</button></div>
  </div>;
}
