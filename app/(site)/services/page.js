import { getTranslator } from "@/lib/i18n/server";
import { Headphones, Ruler, Truck, Wrench } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import ProjectBanner from "@/components/project-banner";

import styles from "@/styles/corporate.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Servicios"), description: t("Asesoría, entrega a domicilio, soporte técnico y atención comercial para acompañar tu proyecto.") }; }

const services = [
  { icon: Ruler, title: "Asesoría para tu espacio", text: "Te acompañamos con atención personalizada y diseño de interiores." },
  { icon: Truck, title: "Llegamos a tu proyecto", text: "Entrega a domicilio con cobertura nacional. Consulta condiciones y tiempos." },
  { icon: Wrench, title: "Respaldo que continúa", text: "Servicio técnico, reparación, mantenimiento y cobertura de garantías." },
  { icon: Headphones, title: "Comprar es más fácil", text: "Venta telefónica y opciones de crédito. Consulta requisitos con nuestro equipo." },
];

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Servicios" />
      <section className={styles.services} id="services" aria-labelledby="services-title">
        <div className="container"><div className={styles.sectionHeading} data-reveal-group><div><p className="eyebrow">{t("CONTIGO, DE PRINCIPIO A FIN")}</p><h2 className="section-title" id="services-title">{t("Más respaldo.")}<br />{t("En cada paso.")}</h2></div><p>{t("La diferencia está en cómo te acompañamos.")}<br />{t("Descubre todo lo que podemos hacer por ti.")}</p></div>
          <div className={styles.serviceGrid} data-reveal-group>{services.map(({ icon: Icon, title, text }, index) => <div className={styles.service} key={title}><div><Icon size={31} strokeWidth={1.25} /><span>0{index + 1}</span></div><h3>{t(title)}</h3><p>{t(text)}</p></div>)}</div>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


