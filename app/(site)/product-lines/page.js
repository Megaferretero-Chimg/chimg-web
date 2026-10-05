import WhatsAppIcon from "@/components/whatsapp-icon";
import { getTranslator } from "@/lib/i18n/server";
import ProductGalleryCards from "@/components/product-gallery-cards";
import galleries from "@/lib/product-galleries.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageBreadcrumb from "@/components/page-breadcrumb";
import ProjectBanner from "@/components/project-banner";
import { productCategories } from "@/lib/product-categories";
import styles from "@/styles/corporate.module.scss";
import pageStyles from "./page.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Productos"), description: productCategories.map(category => t(category)).join(", ") }; }

export default async function Page() {
  const t = await getTranslator();
  return (
    <main id="main-content">
      <PageBreadcrumb label="Nuestras líneas" />
      <section className={`${styles.linesSection} ${pageStyles.products}`} id="product-lines" aria-labelledby="lines-title">
        <div className="container">
          <div className={pageStyles.heading} data-reveal-group><div><p className={pageStyles.eyebrow}>{t("ENCUENTRA LO QUE NECESITAS")}</p><h2 id="lines-title">{t("Ideas que empiezan")}<br /><span>{t("con lo que eliges.")}</span></h2></div><div className={pageStyles.guide}><span>{galleries.length} {t("categorías para explorar")}</span><p>{t("Elige una categoría y descubre nuestras exhibiciones en Ambato y Salcedo.")}</p></div></div>
          <ProductGalleryCards categories={galleries} />
          <div className={pageStyles.help} data-reveal><div><h3>{t("¿Buscas algo en particular?")}</h3><p>{t("Cuéntanos qué necesitas y te ayudamos a encontrarlo.")}</p></div><Link href="/contact">{t("Consultar disponibilidad")} <WhatsAppIcon size={22} /></Link></div>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}


