import PageBreadcrumb from "@/components/page-breadcrumb";
import { getTranslator } from "@/lib/i18n/server";
import BranchFacades from "@/components/branch-facades";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";

import { branches, company, whatsappUrl } from "@/lib/site";
import styles from "./contact.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Contacto"), description: t("Visita CHIMG en Ambato y Salcedo. Consulta nuestros horarios y conversa con nuestro equipo por WhatsApp.") }; }

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Contacto" />
      <section id="contact" className={`container ${styles.contact}`} aria-label={t("Contacto")}>
        <div className={styles.intro} data-reveal-group>
          <div className={styles.channels}>
            <a className={styles.channel} href={whatsappUrl(t("Hola, CHIMG. Me gustaría recibir información para mi proyecto."))} target="_blank" rel="noopener noreferrer"><span className={styles.icon}><span className={styles.whatsappIcon} aria-hidden="true" /></span><div><small>{t("ESCRÍBENOS")}</small><h3>{t("WhatsApp")}</h3><p>{t("Cuéntanos tu idea, a tu ritmo.")}</p></div><ArrowUpRight size={20} /></a>
            <a className={styles.channel} href={company.phoneHref}><span className={styles.icon}><Phone size={22} /></span><div><small>{t("HABLEMOS DIRECTAMENTE")}</small><h3>{company.phone}</h3><p>{t("Atención personalizada para tu proyecto.")}</p></div><ArrowUpRight size={20} /></a>
          </div>
          <div className={styles.quickLocations}>{branches.map(branch => <a key={branch.name} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer"><MapPin size={20} /><div><h3>{t(branch.name === "Ambato" ? "Matriz Ambato" : "Sucursal Salcedo")}</h3><p>{branch.address}</p></div><ArrowUpRight size={18} /></a>)}</div>
        </div>
        <div data-reveal><ContactForm /></div>
      </section>
      <section className={`container ${styles.locations}`} aria-labelledby="locations-title">
        <div className={styles.sectionHeading} data-reveal><div><p className="eyebrow">{t("CERCA DE TI")}</p><h2 className="section-title" id="locations-title">{t("Nos vemos en CHIMG.")}</h2></div><p>{t("Dos ciudades. La misma forma de acompañarte.")}</p></div>
        <div className={styles.branchGrid} data-reveal-group>{branches.map((branch) => <article className={styles.branch} key={branch.name}>
          <div className={styles.photo}><BranchFacades branch={branch.name} alt={t("Fachada de CHIMG en {name}", { name: branch.name })} labels={{ carousel: t("Carrusel"), previous: t("Foto anterior"), next: t("Foto siguiente"), view: t("Ver foto"), play: t("Reproducir"), pause: t("Pausar") }} /></div>
          <div className={styles.branchBody}><div className={styles.branchTitle}><h3>{t(branch.name)}</h3><MapPin size={22} /></div><p className={styles.address}>{branch.address}</p><Link href={branch.name === "Salcedo" ? "/branches/salcedo" : "/branches/ambato"} className="text-link branch-explore">{t(branch.name === "Salcedo" ? "Explorar Salcedo" : "Explorar Ambato")} <ArrowUpRight size={18} /></Link><div className={styles.hours}><Clock3 size={17} /><div><span>{t(branch.weekdays)}</span><span>{t(branch.saturday)}</span><span>{t(branch.sunday)}</span></div></div><a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer">{t("Cómo llegar a {name}", { name: branch.name })}<ArrowUpRight size={19} /></a></div>
        </article>)}</div>
      </section>
    </main>
  );
}
