import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import styles from "./page-breadcrumb.module.scss";
export default async function PageBreadcrumb({ label }) {
 const t = await getTranslator();
 const title = label === "Nuestras líneas" ? "Productos" : label;
 return <section className={styles.hero} aria-labelledby="page-title"><div className="container"><nav className={styles.breadcrumb} aria-label={t("Ruta de navegación")}><Link href="/">{t("Inicio")}</Link><span aria-hidden="true">/</span><span aria-current="page">{t(title)}</span></nav><h1 id="page-title">{t(title)}</h1></div></section>;
}
