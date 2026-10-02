import BranchFacades from "@/components/branch-facades";
import Link from "next/link";
import { getTranslator } from "@/lib/i18n/server";
import { branches, whatsappUrl } from "@/lib/site";
import { ambatoCategories, ambatoPhotos } from "@/lib/ambato-gallery";
import AmbatoGallery from "@/components/salcedo-gallery";
import styles from "./ambato.module.scss";

export async function generateMetadata() { const t = await getTranslator(); return { title: t("Matriz Ambato"), description: t("Explora la matriz CHIMG en Ambato: herramientas, maquinaria, hogar, baños, cocinas, acabados y materiales para construcción.") }; }
export default async function Page() {
  const t = await getTranslator();
  const branch = branches.find(branch => branch.name === "Ambato");
  return <main id="main-content">
    <section className={`container ${styles.hero}`}>
      <div><Link href="/about" className="text-link">← {t("Nuestras sucursales")}</Link><p className="eyebrow">CHIMG · {t("MATRIZ AMBATO")}</p><h1 className="section-title">{t("Todo para tu proyecto, en Ambato.")}</h1><p>{t("Recorre nuestras líneas de productos y encuentra soluciones para construir, renovar y equipar tus espacios.")}</p><p>{branch.address}</p><p>{t(branch.weekdays)}<br />{t(branch.saturday)}<br />{t(branch.sunday)}</p><a className="button button-yellow" href={whatsappUrl(t("Hola, CHIMG. Me gustaría consultar productos de la matriz Ambato."))} target="_blank" rel="noopener noreferrer">{t("Consultar disponibilidad")}</a><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer">{t("Cómo llegar")}</a></div>
      <BranchFacades branch="Ambato" alt={t("Fachada de CHIMG en Ambato")} labels={{ carousel: t("Carrusel"), previous: t("Foto anterior"), next: t("Foto siguiente"), view: t("Ver foto"), play: t("Reproducir"), pause: t("Pausar") }} />
    </section>
    <AmbatoGallery categories={ambatoCategories.map(category => t(category))} photos={ambatoPhotos.map(photo => ({ ...photo, label: t(photo.label), categories: photo.categories.map(category => t(category)) }))} labels={{ eyebrow: t("EXPLORA NUESTRAS LÍNEAS"), title: t("Encuentra lo que necesitas."), description: t("Elige una línea para ver sus productos y exhibiciones. Consulta con nuestro equipo la disponibilidad de cada artículo."), filter: t("Filtrar por línea de productos"), photos: t("fotos"), enlarge: t("Ampliar imagen"), close: t("Cerrar"), more: t("Ver más fotos"), carousel: t("Carrusel"), presentation: t("Presentación de nuestras líneas"), slideDescription: t("Descubre nuestras exhibiciones y encuentra ideas para tu proyecto."), previous: t("Foto anterior"), next: t("Foto siguiente"), play: t("Reproducir"), pause: t("Pausar"), families: t("Nuestras líneas de productos"), choose: t("Elige una familia para ver su galería de imágenes.") }} />
  </main>;
}
