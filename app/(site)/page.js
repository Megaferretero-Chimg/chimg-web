import { getTranslator } from "@/lib/i18n/server";
import HomeHero from "@/components/home-hero";
import SocialSection from "@/components/social-section";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectBanner from "@/components/project-banner";
import LineIcon from "@/components/line-icon";
const categories = [
  { name: "Hogar y Decoración", icon: "home", href: "/product-lines/home-living" },
  { name: "Herramienta Eléctrica", icon: "drill", href: "/product-lines/power-tools" },
  { name: "Maquinaria Industrial", icon: "machinery", href: "/product-lines/machinery" },
  { name: "Jardinería", icon: "garden", href: "/product-lines/lawn-garden" },
];
import styles from "@/styles/corporate.module.scss";

export default async function Home() {
  const t = await getTranslator();
  return (
    <main id="main-content" className={styles.homePage}>
      <HomeHero><SocialSection /></HomeHero>
      <nav className={styles.lineNav} aria-label={t("Explora nuestras categorías")}>
        <div className="container" data-reveal-group>{categories.map(category => <Link key={category.name} href={category.href}><LineIcon name={category.icon} size={23} /><span>{t(category.name)}</span><ArrowUpRight className={styles.lineNavArrow} size={14} /></Link>)}</div>
      </nav>
      <section className={`container ${styles.explore}`} aria-labelledby="explore-title">
        <p className="eyebrow" data-reveal>{t("CONOCE CHIMG")}</p>
        <h2 className="section-title" id="explore-title" data-reveal>{t("Un aliado en cada paso.")}</h2>
        <div className={styles.exploreGrid} data-reveal-group>
          <Link href="/about"><span>{t("01 · NOSOTROS")}</span><h3>{t("Una historia que construimos juntos.")}</h3><p>{t("Conoce quiénes somos y qué nos mueve desde hace más de 25 años.")}</p><span className="text-link">{t("Conoce CHIMG")} <ArrowUpRight size={18} /></span></Link>
          <Link href="/product-lines"><span>{t("Productos")}</span><h3>{t("Encuentra nuevas posibilidades.")}</h3><p>{t("Hogar y Decoración, Herramienta Eléctrica, Maquinaria Industrial y Jardinería.")}</p><span className="text-link">{t("Explora nuestras líneas")} <ArrowUpRight size={18} /></span></Link>
          <Link href="/services"><span>{t("03 · SERVICIOS")}</span><h3>{t("Te acompañamos más allá de la compra.")}</h3><p>{t("Descubre nuestra asesoría, entrega y soporte para tu proyecto.")}</p><span className="text-link">{t("Descubre nuestros servicios")} <ArrowUpRight size={18} /></span></Link>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}
