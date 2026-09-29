import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCardInitials, presentationCards } from "@/lib/presentation-cards";
import styles from "./page.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Nuestro equipo"), description: t("Conoce al equipo de Mega CHIMG y conecta directamente con nuestros colaboradores.") }; }

export default async function CardsPage() {
  const t = await getTranslator();
  return <main id="main-content" className={styles.page}>
    <div className="container">
      <nav className={styles.breadcrumb} aria-label={t("Ruta de navegación")}><Link href="/">{t("Inicio")}</Link><span aria-hidden="true">/</span><span aria-current="page">{t("Nuestro equipo")}</span></nav>
      <div className={styles.heading}><p className="eyebrow">{t("PERSONAS QUE TE ACOMPAÑAN")}</p><h1 className="section-title">{t("Conecta con nuestro equipo.")}</h1><p>{t("Encuentra a tu contacto en CHIMG y elige cómo conversar.")}</p></div>
      <div className={styles.grid}>{presentationCards.map(card => <Link className={styles.preview} href={`/business-cards/${card.slug}`} key={card.slug}>
        <span className={styles.initials} aria-hidden="true">{getCardInitials(card.name)}</span>
        <p>{card.company}</p><h2>{t(card.name)}</h2><p>{t(card.role)}</p>{card.location && <small>{t(card.location)}</small>}
        <span className={styles.action}>{t("Ver tarjeta de contacto")} <ArrowUpRight size={18} aria-hidden="true" /></span>
      </Link>)}</div>
    </div>
  </main>;
}
