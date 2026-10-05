import PageBreadcrumb from "@/components/page-breadcrumb";
import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import LineIcon from "@/components/line-icon";
import { lines, whatsappUrl } from "@/lib/site";
import styles from "./page.module.scss";

export function generateStaticParams() { return lines.map(line => ({ slug: line.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const t = await getTranslator();
  const { slug } = await params;
  const line = lines.find(item => item.slug === slug);
  if (!line) return {};
  return { title: t(line.name), description: t(line.description) };
}

export default async function LinePage({ params }) {
  const t = await getTranslator();
  const { slug } = await params;
  const line = lines.find(item => item.slug === slug);
  if (!line) notFound();

  return <main id="main-content">
    <PageBreadcrumb label={line.name} />
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`} data-reveal-group>
        <div className={styles.copy}><p className="eyebrow">{t("CHIMG ·")} {t(line.name)}</p><h2>{t(line.title)}</h2><p>{t(line.description)}</p><a className="button button-yellow" href={whatsappUrl(t("Hola, CHIMG. Me gustaría recibir asesoría sobre la línea de {line}.", { line: t(line.name) }))} target="_blank" rel="noopener noreferrer">{t("Consultar esta línea")} <ArrowUpRight size={18} /></a><span className={styles.note}>{t("Asesoría personalizada en Ambato y Salcedo.")}</span></div>
        <div className={styles.image}><Image src={line.image} alt={t(line.alt)} fill sizes="(max-width: 800px) 100vw, 55vw" preload /><span><LineIcon name={line.icon} size={23} /> {t(line.name)}</span></div>
      </div>
    </section>
    <section className={`container ${styles.details}`}><div><p className="eyebrow">{t("ENCUENTRA LO QUE BUSCAS")}</p><h2 className="section-title">{t("Opciones para")}<br />{t("hacerlo realidad.")}</h2></div><div><div className={styles.categories}>{line.categories.map(category => <div key={category}><Check size={19} /><h3>{t(category)}</h3></div>)}</div><p className={styles.availability}>{t("Consulta modelos, especificaciones, disponibilidad y opciones de entrega con nuestro equipo.")}</p></div></section>
    {line.gallery.length > 0 && <section className={`container ${styles.gallery}`} data-reveal-group aria-label={t("Conoce la línea de {line}", { line: t(line.name) })}>{line.gallery.map(photo => <figure key={photo.src}><div><Image src={photo.src} alt={t(photo.alt)} fill sizes="(max-width: 700px) 100vw, 50vw" /></div></figure>)}</section>}
    <section className={styles.cta}><div className="container"><div><p className="eyebrow">{t("CONVERSEMOS")}</p><h2>{t("El siguiente paso lo damos juntos.")}</h2><p>{t("Cuéntanos qué necesitas y te ayudamos a encontrar una solución.")}</p></div><Link className="button button-blue" href="/contact"><MessageCircle size={18} /> {t("Contactar a CHIMG")} <ArrowUpRight size={18} /></Link></div></section>
    <nav className={`container ${styles.otherLines}`} aria-label={t("Otras líneas")}><h2>{t("Más posibilidades para tu proyecto")}</h2><div>{lines.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/product-lines/${item.slug}`}><LineIcon name={item.icon} size={23} /><span>{t(item.name)}</span><ArrowRight size={17} /></Link>)}</div></nav>
  </main>;
}

