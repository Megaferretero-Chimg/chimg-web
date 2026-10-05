"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./language-selector";
import { lines } from "@/lib/site";
import styles from "./product-gallery-cards.module.scss";
export default function ProductGalleryCards({ categories }) {
 const { t } = useLanguage();
 return <div className={styles.cards}>{categories.map((item, index) => <Link key={item.name} className={styles.card} style={{ "--delay": `${Math.min(index, 7) * 65}ms` }} href={`/product-lines/${lines.find(line => line.name === item.name).slug}`}><div className={styles.cover}><Image src={item.image} alt={t(item.name)} fill sizes="(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 22vw" /></div><span>{t(item.name)}<ArrowUpRight size={19} /></span></Link>)}</div>;
}
