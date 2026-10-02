"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./salcedo-gallery.module.scss";

export default function SalcedoGallery({ photos, categories, labels }) {
  const [filter, setFilter] = useState(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(null);
  const [limit, setLimit] = useState(12);
  const dialog = useRef(null);
  const families = categories.slice(1);
  const featured = families.filter((_, index) => index % Math.max(1, Math.ceil(families.length / 8)) === 0).map(category => photos.find(photo => photo.categories.includes(category))).filter(Boolean);
  const current = featured[slide % featured.length];
  const visible = filter === categories[0] ? photos : photos.filter(photo => photo.categories.includes(filter));
  useEffect(() => {
    if (paused || !featured.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSlide(value => (value + 1) % featured.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, featured.length]);
  function open(photo) { setSelected(photo); dialog.current.showModal(); }
  return <section className={`container ${styles.section}`} aria-labelledby="gallery-title">
    <p className="eyebrow">{labels.eyebrow}</p>
    <h2 className="section-title" id="gallery-title">{labels.title}</h2>
    {current && <div className={styles.presentation} role="region" aria-roledescription={labels.carousel} aria-label={labels.presentation} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className={styles.slidePhoto}>{featured.map((photo, position) => <div key={photo.src} className={`${styles.slideLayer} ${position === slide % featured.length ? styles.slideActive : ""}`} aria-hidden={position !== slide % featured.length}><Image src={photo.src} alt={`${labels.photos} · ${position + 1}`} fill sizes="(max-width: 800px) 100vw, 85vw" /></div>)}</div>
      <div className={styles.slideFooter}><div className={styles.controls}><button type="button" onClick={() => setSlide(value => (value - 1 + featured.length) % featured.length)} aria-label={labels.previous}>←</button><span>{slide % featured.length + 1} / {featured.length}</span><button type="button" onClick={() => setSlide(value => (value + 1) % featured.length)} aria-label={labels.next}>→</button></div></div>
    </div>}
    <div className={styles.familyHeading}><h3>{labels.families}</h3><p>{labels.choose}</p></div>
    <div className={styles.filters} role="group" aria-label={labels.filter}>{categories.map(category => <button type="button" key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setLimit(12); }}>{category}</button>)}</div>
    {filter && <><p className={styles.count} role="status">{filter} · {visible.length} {labels.photos}</p>
    <div className={styles.grid}>{visible.slice(0, limit).map((photo, position) => <button type="button" className={styles.card} key={photo.src} onClick={() => open(photo)} aria-label={`${labels.enlarge} ${position + 1}`}><div className={styles.image}><Image src={photo.src} alt={`${labels.photos} · ${position + 1}`} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div></button>)}</div>
    {limit < visible.length && <button type="button" className={`button button-yellow ${styles.more}`} onClick={() => setLimit(current => current + 12)}>{labels.more}</button>}</>}
    <dialog ref={dialog} aria-label={labels.enlarge} className={styles.dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <button type="button" autoFocus className={styles.close} onClick={() => dialog.current.close()}>{labels.close} ×</button>
      {selected && <><Image src={selected.src} alt={labels.enlarge} width={1920} height={1280} sizes="90vw" /></>}
    </dialog>
  </section>;
}
