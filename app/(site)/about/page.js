import WhatsAppIcon from "@/components/whatsapp-icon";
import { getTranslator } from "@/lib/i18n/server";
import BranchFacades from "@/components/branch-facades";
import Link from "next/link";
import Image from "next/image";
import anniversary from "@/output/banners/chimg-25-years-both-branches.webp";
import { ArrowUpRight, MapPin } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import branchStyles from "./branches.module.scss";

import pageStyles from "./about.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Nosotros"), description: t("Conoce CHIMG: más de 25 años acompañando proyectos de construcción y hogar desde Ambato y Salcedo.") }; }

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Nosotros" />
      <section className={pageStyles.story} id="about" aria-labelledby="about-title">
        <div className={`container ${pageStyles.heading}`} data-reveal-group><p>{t("SOMOS CHIMG")}</p><h2 id="about-title">{t("La confianza se construye.")}<br /><span>{t("Juntos, todos los días.")}</span></h2></div>
        <div className={`container ${pageStyles.visual}`} data-reveal><Image src={anniversary} alt={t("25 años de experiencia de CHIMG junto a las sucursales de Ambato y Salcedo")} sizes="(max-width: 800px) 96vw, 90vw" /><div className={pageStyles.imageLabel}><span>CHIMG</span><span>{t("AMBATO · SALCEDO")}</span></div></div>
        <div className={`container ${pageStyles.statement}`} data-reveal-group><h3>{t("Parte de tu próxima gran idea.")}</h3><div><p>{t("Acompañamos a quienes construyen, transforman y dan vida a sus espacios. Nuestra historia continúa en cada proyecto que compartimos contigo.")}</p><Link href="/contact">{t("Trabajemos juntos")} <WhatsAppIcon size={22} /></Link></div></div>
      </section>
      <section className={`container ${branchStyles.section}`} aria-labelledby="branches-title">
        <div className={branchStyles.heading} data-reveal>
          <h2 className="section-title" id="branches-title">{t("Cerca de tus proyectos.")}</h2>
        </div>
        <div className={branchStyles.grid} data-reveal-group>
          {[{ name: "Ambato", type: "Nuestra matriz",  }, { name: "Salcedo", type: "Nuestra sucursal",  }].map(branch => (
            <figure className={branchStyles.card} key={branch.name}>
              <div className={branchStyles.photo}><BranchFacades branch={branch.name} alt={t("Fachada de CHIMG en {name}", { name: branch.name })} labels={{ carousel: t("Carrusel"), previous: t("Foto anterior"), next: t("Foto siguiente"), view: t("Ver foto"), play: t("Reproducir"), pause: t("Pausar") }} /></div>
              <figcaption><div><span>{t(branch.type)}</span><h3><MapPin size={18} />{t(branch.name)}</h3></div><Link href={branch.name === "Salcedo" ? "/branches/salcedo" : "/branches/ambato"} className="text-link branch-explore" aria-label={t("Conoce CHIMG {name}", { name: branch.name })}>{t(branch.name === "Salcedo" ? "Explorar Salcedo" : "Explorar Ambato")} <ArrowUpRight size={18} /></Link></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}


