"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./salcedo-gallery.module.scss";

export default function SalcedoGallery({ photos, categories, labels }) {
  const [filter, setFilter] = useState(categories[0]);
  const [selected, setSelected] = useState(null);
  const [limit, setLimit] = useState(12);
  const dialog = useRef(null);
  const visible = filter === categories[0] ? photos : photos.filter(photo => photo.categories.includes(filter));
  function open(photo) { setSelected(photo); dialog.current.showModal(); }
  return <section className={`container ${styles.section}`} aria-labelledby="gallery-title">
    <p className="eyebrow">{labels.eyebrow}</p>
    <h2 className="section-title" id="gallery-title">{labels.title}</h2>
    <p className={styles.description}>{labels.description}</p>
    <div className={styles.filters} role="group" aria-label={labels.filter}>{categories.map(category => <button type="button" key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setLimit(12); }}>{category}</button>)}</div>
    <p className={styles.count} role="status">{filter} · {visible.length} {labels.photos}</p>
    <div className={styles.grid}>{visible.slice(0, limit).map(photo => <button type="button" className={styles.card} key={photo.src} onClick={() => open(photo)} aria-label={`${labels.enlarge}: ${photo.label}`}><div className={styles.image}><Image src={photo.src} alt={photo.label} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><span>{photo.label}</span></button>)}</div>
    {limit < visible.length && <button type="button" className={`button button-yellow ${styles.more}`} onClick={() => setLimit(current => current + 12)}>{labels.more}</button>}
    <dialog ref={dialog} aria-label={selected?.label || labels.enlarge} className={styles.dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <button type="button" autoFocus className={styles.close} onClick={() => dialog.current.close()}>{labels.close} ×</button>
      {selected && <><Image src={selected.src} alt={selected.label} width={1920} height={1280} sizes="90vw" /><p>{selected.label}</p></>}
    </dialog>
  </section>;
}
