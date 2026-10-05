"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./branch-category-explorer.module.scss";
export default function BranchCategoryExplorer({ categories, photos, selected, onSelect, labels }) {
  const [preview, setPreview] = useState(categories[1] || categories[0]);
  const all = preview === categories[0];
  const group = all ? photos : photos.filter(photo => photo.categories.includes(preview));
  return <div className={styles.explorer}>
    <div className={styles.scene}><div className={styles.image}>{group[0] && <Image key={group[0].src} src={group[0].src} alt={preview} fill sizes="(max-width: 800px) 90vw, 45vw" />}</div><div className={styles.caption}><span>{String(categories.indexOf(preview) + 1).padStart(2, "0")}</span><div><h4>{preview}</h4><p>{group.length} {labels.photos}</p></div><button type="button" aria-label={preview} onClick={() => onSelect(preview)}><ArrowUpRight size={25} /></button></div></div>
    <div className={styles.list} role="group" aria-label={labels.filter}>{categories.map((category, index) => <button type="button" key={category} aria-pressed={selected === category} data-preview={preview === category} onPointerEnter={() => setPreview(category)} onFocus={() => setPreview(category)} onClick={() => { setPreview(category); onSelect(category); }}><span className={styles.index}>{String(index + 1).padStart(2, "0")}</span><span>{category}</span><ArrowUpRight size={22} /></button>)}</div>
  </div>;
}
