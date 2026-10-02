import { getTranslator } from "@/lib/i18n/server";
import BranchFacades from "@/components/branch-facades";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import ProjectBanner from "@/components/project-banner";
import branchStyles from "./branches.module.scss";

import styles from "@/styles/corporate.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Nosotros"), description: t("Conoce CHIMG: más de 25 años acompañando proyectos de construcción y hogar desde Ambato y Salcedo.") }; }

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Nosotros" />
      <section className={`container ${branchStyles.intro}`} id="about" aria-labelledby="about-title">
        <div className={styles.aboutCopy} data-reveal-group>
          <p className="eyebrow">{t("SOMOS CHIMG")}</p><h2 className="section-title" id="about-title">{t("25 años de historia.")}<br />{t("Miles de ideas")}<br />{t("por construir.")}</h2>
        </div>
        <div className={styles.aboutCopy} data-reveal-group>
          <p className={branchStyles.introText}>{t("Detrás de cada obra hay una idea. Detrás de cada hogar, una historia. En CHIMG llevamos más de 25 años siendo parte de ambas.")}</p>
          <p>{t("Desde Ambato y Salcedo, reunimos soluciones para la construcción y el hogar en un solo lugar, con atención personalizada para ayudarte a elegir en cada paso.")}</p>
          <div className={styles.aboutFacts}><div><strong>5</strong><span>{t("Líneas para tu proyecto")}</span></div><div><strong>2</strong><span>{t("Ciudades, cerca de ti")}</span></div><div><BadgeCheck size={28} strokeWidth={1.3} /><span>{t("Atención personalizada")}</span></div></div>
          <Link href="/contact" className="text-link">{t("Conoce dónde encontrarnos")} <ArrowUpRight size={17} /></Link>
        </div>
      </section>
      <section className={`container ${branchStyles.section}`} aria-labelledby="branches-title">
        <div className={branchStyles.heading} data-reveal>
          <p className="eyebrow">{t("DOS CIUDADES, UN MISMO COMPROMISO")}</p>
          <h2 className="section-title" id="branches-title">{t("Cerca de tus proyectos.")}</h2>
          <p>{t("Visítanos en Ambato y Salcedo. Nuestro equipo te espera para acompañarte en cada paso.")}</p>
        </div>
        <div className={branchStyles.grid} data-reveal-group>
          {[{ name: "Ambato", type: "Nuestra matriz",  }, { name: "Salcedo", type: "Nuestra sucursal",  }].map(branch => (
            <figure className={branchStyles.card} key={branch.name}>
              <div className={branchStyles.photo}><BranchFacades branch={branch.name} alt={t("Fachada de CHIMG en {name}", { name: branch.name })} labels={{ carousel: t("Carrusel"), previous: t("Foto anterior"), next: t("Foto siguiente"), view: t("Ver foto"), play: t("Reproducir"), pause: t("Pausar") }} /></div>
              <figcaption><div><span>{t(branch.type)}</span><h3><MapPin size={18} />{t(branch.name)}</h3></div><Link href={branch.name === "Salcedo" ? "/branches/salcedo" : "/branches/ambato"} className="text-link" aria-label={t("Conoce CHIMG {name}", { name: branch.name })}>{t(branch.name === "Salcedo" ? "Explorar Salcedo" : "Explorar Ambato")} <ArrowUpRight size={18} /></Link></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


