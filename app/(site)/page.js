import { getTranslator } from "@/lib/i18n/server";
import HomeHero from "@/components/home-hero";
import SocialSection from "@/components/social-section";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectBanner from "@/components/project-banner";
import LineIcon from "@/components/line-icon";
import tickerStyles from "@/components/category-ticker.module.scss";
import { lines } from "@/lib/site";
const categories = lines.map(line => ({ ...line, href: `/product-lines/${line.slug}` }));
import styles from "@/styles/corporate.module.scss";

export default async function Home() {
  const t = await getTranslator();
  return (
    <main id="main-content" className={styles.homePage}>
      <HomeHero><SocialSection /></HomeHero>
      <nav className={tickerStyles.ticker} aria-label={t("Explora nuestras categorías")}>
        <div className={tickerStyles.track}>{[0, 1].map(copy => <div className={tickerStyles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>{categories.map(category => <Link key={category.name} href={category.href} tabIndex={copy === 1 ? -1 : undefined}><LineIcon name={category.icon} size={25} /><span>{t(category.name)}</span><ArrowUpRight size={15} /></Link>)}</div>)}</div>
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
