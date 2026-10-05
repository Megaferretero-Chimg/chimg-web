import PageBreadcrumb from "@/components/page-breadcrumb";
import { getTranslator } from "@/lib/i18n/server";
import { ShieldCheck, Ruler, Truck, Wrench } from "lucide-react";

import Link from "next/link";
import ProjectBanner from "@/components/project-banner";

import styles from "@/styles/corporate.module.scss";
import pageStyles from "./services.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Servicios"), description: t("Diseño de interiores, reparaciones, remodelaciones e instalaciones, entregas a nivel nacional y garantías.") }; }

const services = [
  { icon: Ruler, title: "Diseño de Interiores", text: "Te ayudamos a elegir materiales, acabados y detalles para crear espacios funcionales que reflejen tu estilo." },
  { icon: Wrench, title: "Reparaciones, Remodelaciones e Instalaciones", text: "Te acompañamos en la reparación, renovación e instalación de tus espacios. Cuéntanos qué necesitas para conocer las opciones para tu proyecto." },
  { icon: Truck, title: "Entregas y Cobertura a nivel Nacional", text: "Llevamos tus productos a todo el Ecuador. Coordina con nuestro equipo el destino, los costos y los tiempos de entrega." },
  { icon: ShieldCheck, title: "Garantías", text: "Te orientamos sobre la garantía de tus productos y te acompañamos en su gestión, según las condiciones de cada marca." },
];

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Servicios" />
      <section className={styles.services} id="services" aria-labelledby="page-title">
        <div className="container">
          <div className={`${styles.serviceGrid} ${pageStyles.serviceGrid}`} data-reveal-group>{services.map(({ icon: Icon, title, text }, index) => <div className={styles.service} key={title}><div><Icon size={31} strokeWidth={1.25} /><span>0{index + 1}</span></div><h3>{t(title)}</h3><p>{t(text)}</p></div>)}</div>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


