import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCardInitials, presentationCards } from "@/lib/presentation-cards";
import styles from "./page.module.scss";

export const metadata = { title: "Nuestro equipo", description: "Conoce al equipo de Mega CHIMG y conecta directamente con nuestros colaboradores." };

export default function CardsPage() {
  return <main id="main-content" className={styles.page}>
    <div className="container">
      <nav className={styles.breadcrumb} aria-label="Ruta de navegación"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">Nuestro equipo</span></nav>
      <div className={styles.heading}><p className="eyebrow">PERSONAS QUE TE ACOMPAÑAN</p><h1 className="section-title">Conecta con nuestro equipo.</h1><p>Encuentra a tu contacto en CHIMG y elige cómo conversar.</p></div>
      <div className={styles.grid}>{presentationCards.map(card => <Link className={styles.preview} href={`/business-cards/${card.slug}`} key={card.slug}>
        <span className={styles.initials} aria-hidden="true">{getCardInitials(card.name)}</span>
        <p>{card.company}</p><h2>{card.name}</h2><p>{card.role}</p>{card.location && <small>{card.location}</small>}
        <span className={styles.action}>Ver tarjeta de contacto <ArrowUpRight size={18} aria-hidden="true" /></span>
      </Link>)}</div>
    </div>
  </main>;
}
