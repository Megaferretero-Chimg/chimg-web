import Image from "next/image";
import Link from "next/link";
import { getTranslator } from "@/lib/i18n/server";
import { branches, whatsappUrl } from "@/lib/site";
import { salcedoCategories, salcedoPhotos } from "@/lib/salcedo-gallery";
import SalcedoGallery from "@/components/salcedo-gallery";
import styles from "./salcedo.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Sucursal Salcedo"), description: t("Conoce nuestras líneas de productos en Salcedo: ferretería, herramientas, maquinaria, baños, cocinas y materiales para construcción.") }; }
export default async function Page() {
  const t = await getTranslator();
  const branch = branches.find(branch => branch.name === "Salcedo");
  return <main id="main-content">
    <section className={`container ${styles.hero}`}>
      <div><Link href="/about" className="text-link">← {t("Nuestras sucursales")}</Link><p className="eyebrow">CHIMG · {t("SUCURSAL SALCEDO")}</p><h1 className="section-title">{t("Todo para tu proyecto, en Salcedo.")}</h1><p>{t("Recorre nuestras líneas de productos y encuentra soluciones para construir, renovar y equipar tus espacios.")}</p><p>{branch.address}</p><p>{t(branch.weekdays)}<br />{t(branch.saturday)}<br />{t(branch.sunday)}</p><a className="button button-yellow" href={whatsappUrl(t("Hola, CHIMG. Me gustaría consultar productos de la sucursal Salcedo."))} target="_blank" rel="noopener noreferrer">{t("Consultar disponibilidad")}</a><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer">{t("Cómo llegar")}</a></div>
      <Image src="/imgs/sucursales/salcedo/DSC00626.webp" alt={t("Fachada de CHIMG en Salcedo")} width={1920} height={1280} sizes="(max-width: 800px) 100vw, 50vw" />
    </section>
    <SalcedoGallery categories={salcedoCategories.map(category => t(category))} photos={salcedoPhotos.map(photo => ({ ...photo, label: t(photo.label), categories: photo.categories.map(category => t(category)) }))} labels={{ eyebrow: t("EXPLORA NUESTRAS LÍNEAS"), title: t("Encuentra lo que necesitas."), description: t("Elige una línea para ver sus productos y exhibiciones. Consulta con nuestro equipo la disponibilidad de cada artículo."), filter: t("Filtrar por línea de productos"), photos: t("fotos"), enlarge: t("Ampliar imagen"), close: t("Cerrar"), more: t("Ver más fotos") }} />
  </main>;
}
