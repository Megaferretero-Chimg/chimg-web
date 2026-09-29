import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import LanguageSelector from "@/components/language-selector";
export default async function NotFound() {
  const t = await getTranslator();
  return <main id="main-content" className="container" style={{ paddingBlock: "100px", minHeight: "50vh" }}><LanguageSelector /><p className="eyebrow">{t("PÁGINA NO ENCONTRADA")}</p><h1 className="section-title">{t("Busquemos un nuevo camino.")}</h1><p>{t("Esta página no está disponible. Descubre nuestras cinco líneas para continuar.")}</p><Link href="/product-lines" className="button button-yellow">{t("Explorar nuestras líneas")}</Link></main>;
}
