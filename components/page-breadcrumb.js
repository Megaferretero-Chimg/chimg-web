import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import styles from "./page-breadcrumb.module.scss";
import { ArrowUpRight } from "lucide-react";

const pages = {
  Nosotros: { number: "01", eyebrow: "CONSTRUIMOS CONTIGO, DESDE SIEMPRE", title: "Mucho más que materiales.", accent: "Un aliado para crear.", description: "Más de 25 años acompañando ideas, hogares y proyectos desde Ambato y Salcedo.", href: "#about", action: "Conoce nuestra historia" },
  "Nuestras líneas": { number: "02", eyebrow: "CINCO LÍNEAS. INFINITAS POSIBILIDADES.", title: "Lo que necesitas.", accent: "Para lo que imaginas.", description: "Hogar, acabados, maquinaria, construcción y ferretería. Encuentra el siguiente paso para tu proyecto.", href: "#product-lines", action: "Explora nuestras líneas" },
  Servicios: { number: "03", eyebrow: "CONTIGO, DE PRINCIPIO A FIN", title: "Tu proyecto sigue.", accent: "Nosotros, contigo.", description: "Asesoría, entrega y respaldo para que cada idea avance con confianza.", href: "#services", action: "Descubre cómo te ayudamos" },
  Contacto: { number: "04", eyebrow: "CERCA DE TI, CERCA DE TUS IDEAS", title: "Ven con una idea.", accent: "Salgamos con un plan.", description: "Conversemos sobre tu próximo proyecto. Te esperamos en Ambato y Salcedo.", href: "#contact", action: "Hablemos de tu proyecto" },
};

export default async function PageBreadcrumb({ label }) {
  const t = await getTranslator();
  const page = pages[label];
  return (
    <section className={styles.hero} aria-labelledby="page-title">
    <nav className={styles.breadcrumb} aria-label={t("Ruta de navegación")}>
      <Link href="/">{t("Inicio")}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{t(label)}</span>
    </nav>
    <div className={styles.copy} data-reveal-group>
      <p className={styles.eyebrow}>{t(page.eyebrow)}</p>
      <h1 id="page-title">{t(page.title)}<br /><em>{t(page.accent)}</em></h1>
      <p className={styles.description}>{t(page.description)}</p>
      <Link href={page.href} className={styles.action}>{t(page.action)}<span><ArrowUpRight size={20} /></span></Link>
    </div>
    <div className={styles.signature} aria-hidden="true"><p>{t("CHIMG /")} {t(label)}</p></div>
    <div className={styles.bottom}><span>{t("AMBATO · SALCEDO")}</span><span>{t("CONSTRUIMOS CONTIGO.")}</span></div>
    </section>
  );
}
