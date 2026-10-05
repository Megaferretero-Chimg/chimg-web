"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { useLanguage } from "./language-selector";
import styles from "./ambato-journey.module.scss";
export default function AmbatoJourney({ categories, branch = "ambato" }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const category = categories[active];
  function move(step) { setActive(value => (value + step + categories.length) % categories.length); }
  function open(src) { setSelected(src); dialog.current.showModal(); }
  return <div className={`container ${styles.album}`}><header><div><span>{String(active + 1).padStart(2, "0")} / {categories.length}</span><h3>{t(category.name)}</h3></div><div className={styles.controls}><button type="button" aria-label={t("Categoría anterior")} onClick={() => move(-1)}><ChevronLeft /></button><button type="button" aria-label={t("Categoría siguiente")} onClick={() => move(1)}><ChevronRight /></button></div></header><div key={category.name} className={styles.photos}>{category.branches[branch].map((src, index) => <button type="button" key={src} onClick={() => open(src)} aria-label={`${t("Ampliar imagen")} ${index + 1}`}><Image src={src} alt={`${t(category.name)} · ${branch === "ambato" ? "Ambato" : "Salcedo"}`} width={1200} height={800} sizes={index === 0 ? "(max-width: 700px) 90vw, 60vw" : "(max-width: 700px) 45vw, 30vw"} /><span><Expand size={17} /></span></button>)}</div><div className={styles.progress} role="group" aria-label={t("Filtrar por línea de productos")}>{categories.map((item, index) => <button key={item.name} type="button" aria-label={t(item.name)} aria-pressed={active === index} onClick={() => setActive(index)} />)}</div><dialog ref={dialog} className={styles.dialog} aria-label={t(category.name)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}><button autoFocus type="button" aria-label={t("Cerrar")} onClick={() => dialog.current.close()}><X /></button>{selected && <Image src={selected} alt={t(category.name)} width={1920} height={1280} sizes="90vw" />}</dialog></div>;
}
