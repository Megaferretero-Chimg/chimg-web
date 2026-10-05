import WhatsAppIcon from "@/components/whatsapp-icon";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { getTranslator } from "@/lib/i18n/server";
import { ShieldCheck, Ruler, Truck, Wrench, ArrowUpRight } from "lucide-react";

import Link from "next/link";

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
      <section className={pageStyles.services} id="services" aria-labelledby="page-title">
        <div className="container">
          <div className={pageStyles.serviceGrid} data-reveal-group>{services.map(({ icon: Icon, title, text }, index) => <article className={pageStyles.service} key={title} style={{ "--delay": `${index * 90}ms` }}><div className={pageStyles.cardTop}><span className={pageStyles.icon}><Icon size={34} strokeWidth={1.5} /></span><span className={pageStyles.number}>0{index + 1}</span></div><h2>{t(title)}</h2><p>{t(text)}</p><Link href="/contact">{t("Consultar este servicio")} <WhatsAppIcon size={22} /></Link></article>)}</div>
          <div className={pageStyles.closing} data-reveal><h2>{t("Demos el siguiente paso.")}</h2><Link href="/contact">{t("Trabajemos juntos")} <WhatsAppIcon size={22} /></Link></div>
        </div>
      </section>
    </main>
  );
}


