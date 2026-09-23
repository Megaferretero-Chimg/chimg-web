import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import ProjectBanner from "@/components/project-banner";
import ambato from "@/output/branches/ambato-clean-v2.png";
import salcedo from "@/output/branches/salcedo-clean-v1.png";
import branchStyles from "./branches.module.scss";

import styles from "@/styles/corporate.module.scss";

export const metadata = { title: "Nosotros", description: "Conoce CHIMG: más de 25 años acompañando proyectos de construcción y hogar desde Ambato y Salcedo." };

export default function Page() {
  return (
    <main id="contenido">
      <PageBreadcrumb label="Nosotros" />
      <section className={`container ${branchStyles.intro}`} id="nosotros" aria-labelledby="about-title">
        <div className={styles.aboutCopy} data-reveal-group>
          <p className="eyebrow">SOMOS CHIMG</p><h2 className="section-title" id="about-title">25 años de historia.<br />Miles de ideas<br />por construir.</h2>
        </div>
        <div className={styles.aboutCopy} data-reveal-group>
          <p className={branchStyles.introText}>Detrás de cada obra hay una idea. Detrás de cada hogar, una historia. En CHIMG llevamos más de 25 años siendo parte de ambas.</p>
          <p>Desde Ambato y Salcedo, reunimos soluciones para la construcción y el hogar en un solo lugar, con atención personalizada para ayudarte a elegir en cada paso.</p>
          <div className={styles.aboutFacts}><div><strong>5</strong><span>Líneas para tu proyecto</span></div><div><strong>2</strong><span>Ciudades, cerca de ti</span></div><div><BadgeCheck size={28} strokeWidth={1.3} /><span>Atención personalizada</span></div></div>
          <Link href="/contacto" className="text-link">Conoce dónde encontrarnos <ArrowUpRight size={17} /></Link>
        </div>
      </section>
      <section className={`container ${branchStyles.section}`} aria-labelledby="branches-title">
        <div className={branchStyles.heading} data-reveal>
          <p className="eyebrow">DOS CIUDADES, UN MISMO COMPROMISO</p>
          <h2 className="section-title" id="branches-title">Cerca de tus proyectos.</h2>
          <p>Visítanos en Ambato y Salcedo. Nuestro equipo te espera para acompañarte en cada paso.</p>
        </div>
        <div className={branchStyles.grid} data-reveal-group>
          {[{ name: "Ambato", type: "Nuestra matriz", image: ambato }, { name: "Salcedo", type: "Nuestra sucursal", image: salcedo }].map(branch => (
            <figure className={branchStyles.card} key={branch.name}>
              <div className={branchStyles.photo}><Image src={branch.image} alt={`Fachada de CHIMG en ${branch.name}`} sizes="(max-width: 700px) 100vw, 50vw" /></div>
              <figcaption><div><span>{branch.type}</span><h3><MapPin size={18} />{branch.name}</h3></div><Link href="/contacto" className="text-link" aria-label={`Conoce cómo llegar a CHIMG ${branch.name}`}>Cómo llegar <ArrowUpRight size={18} /></Link></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


