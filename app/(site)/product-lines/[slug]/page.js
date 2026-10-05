import WhatsAppIcon from "@/components/whatsapp-icon";
import { getTranslator } from "@/lib/i18n/server";
import CategoryPhotoGrid from "@/components/category-photo-grid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PageBreadcrumb from "@/components/page-breadcrumb";
import galleries from "@/lib/product-galleries.json";
import { lines } from "@/lib/site";
import styles from "./gallery.module.scss";
export function generateStaticParams() { return lines.map(line => ({ slug: line.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }) { const t = await getTranslator(); const { slug } = await params; const line = lines.find(item => item.slug === slug); return line ? { title: t(line.name) } : {}; }
export default async function CategoryPage({ params }) {
 const t = await getTranslator(); const { slug } = await params; const line = lines.find(item => item.slug === slug); if (!line) notFound(); const category = galleries.find(item => item.name === line.name);
 return <main id="main-content"><PageBreadcrumb label={line.name} /><div className={`container ${styles.content}`}><Link className={styles.back} href="/product-lines"><ArrowLeft size={17} />{t("Volver a Productos")}</Link><p className={styles.intro}>{t("Descubre esta categoría en nuestras sucursales.")}</p>{["ambato", "salcedo"].filter(branch => category.branches[branch].length > 0).map(branch => <section key={branch} id={branch} className={styles.section} aria-labelledby={`title-${branch}`}><header><h2 id={`title-${branch}`}>{t(branch === "ambato" ? "Matriz Ambato" : "Sucursal Salcedo")}</h2><span>{category.branches[branch].length} {t("fotos")}</span></header><CategoryPhotoGrid photos={category.branches[branch]} category={line.name} branch={branch === "ambato" ? "Matriz Ambato" : "Sucursal Salcedo"} /></section>)}<Link className={styles.contact} href="/contact">{t("Consultar disponibilidad")} <WhatsAppIcon size={22} /></Link></div></main>;
}
