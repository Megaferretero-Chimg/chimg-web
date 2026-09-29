import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import ProjectBanner from "@/components/project-banner";
import { lines } from "@/lib/site";
import styles from "@/styles/corporate.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Nuestras líneas"), description: t("Explora las cinco líneas de CHIMG: hogar, acabados, maquinaria, construcción y ferretería.") }; }

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Nuestras líneas" />
      <section className={styles.linesSection} id="product-lines" aria-labelledby="lines-title">
        <div className="container">
          <div className={styles.sectionHeading} data-reveal-group><div><p className="eyebrow">{t("UN MUNDO DE POSIBILIDADES")}</p><h2 id="lines-title" className="section-title">{t("Un mundo de posibilidades.")}</h2></div><p>{t("Cinco líneas, un mismo compromiso:")}<br />{t("acompañarte en cada etapa de tu proyecto.")}</p></div>
          <div className={styles.lineGrid} data-reveal-group>{lines.map((line, index) => (
            <Link href={`/product-lines/${line.slug}`} className={styles.lineCard} key={line.slug}>
              <div className={styles.lineImage}><Image src={line.image} alt={t(line.alt)} fill sizes="(max-width: 800px) 90vw, 20vw" /><span className={styles.lineNumber}>0{index + 1}</span><span className={styles.lineCircle}><ArrowUpRight size={19} /></span></div>
              <h3>{t(line.name)}</h3><p>{t(line.short)}</p>
            </Link>
          ))}</div>
          <div className={styles.linesNote} data-reveal><span>{t("¿No sabes por dónde empezar? Estamos para ayudarte.")}</span><Link href="/contact" className="text-link">{t("Hablemos de tu idea")} <ArrowRight size={16} /></Link></div>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


