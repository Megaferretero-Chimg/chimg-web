"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "./language-selector";
import styles from "./category-photo-grid.module.scss";

export default function CategoryPhotoGrid({ photos, category, branch }) {
  const { t } = useLanguage();
  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  return <>
    <div className={styles.grid}>{photos.map((src, index) => <button type="button" key={src} onClick={() => { setSelected(src); dialog.current.showModal(); }} aria-label={`${t("Ampliar imagen")} ${index + 1}`}><Image src={src} alt={`${t(category)} · ${t(branch)} · ${index + 1}`} width={960} height={640} sizes="(max-width: 700px) 90vw, 30vw" /><span><ArrowUpRight size={18} /></span></button>)}</div>
    <dialog ref={dialog} className={styles.dialog} aria-label={`${t(category)} · ${t(branch)}`} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }} onClose={() => setSelected(null)}><button autoFocus type="button" className={styles.close} aria-label={t("Cerrar")} onClick={() => dialog.current.close()}><X /></button>{selected && <Image src={selected} alt={`${t(category)} · ${t(branch)}`} width={1920} height={1280} sizes="90vw" />}</dialog>
  </>;
}
