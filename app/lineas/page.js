import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import ProjectBanner from "@/components/project-banner";
import { lines } from "@/lib/site";
import styles from "@/styles/corporate.module.scss";

export const metadata = { title: "Nuestras líneas", description: "Explora las cinco líneas de CHIMG: hogar, acabados, maquinaria, construcción y ferretería." };

export default function Page() {
  return (
    <main id="contenido">
      <PageBreadcrumb label="Nuestras líneas" />
      <section className={styles.linesSection} id="lineas" aria-labelledby="lines-title">
        <div className="container">
          <div className={styles.sectionHeading} data-reveal-group><div><p className="eyebrow">UN MUNDO DE POSIBILIDADES</p><h2 id="lines-title" className="section-title">Un mundo de posibilidades.</h2></div><p>Cinco líneas, un mismo compromiso:<br />acompañarte en cada etapa de tu proyecto.</p></div>
          <div className={styles.lineGrid} data-reveal-group>{lines.map((line, index) => (
            <Link href={`/lineas/${line.slug}`} className={styles.lineCard} key={line.slug}>
              <div className={styles.lineImage}><Image src={line.image} alt={line.alt} fill sizes="(max-width: 800px) 90vw, 20vw" /><span className={styles.lineNumber}>0{index + 1}</span><span className={styles.lineCircle}><ArrowUpRight size={19} /></span></div>
              <h3>{line.name}</h3><p>{line.short}</p>
            </Link>
          ))}</div>
          <div className={styles.linesNote} data-reveal><span>¿No sabes por dónde empezar? Estamos para ayudarte.</span><Link href="/contacto" className="text-link">Hablemos de tu idea <ArrowRight size={16} /></Link></div>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


