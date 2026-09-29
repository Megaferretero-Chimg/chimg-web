import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { company, lines, whatsappUrl } from "@/lib/site";
import styles from "./site-footer.module.scss";
export default async function SiteFooter() {
  const t = await getTranslator();
  return <footer className={styles.footer}>
    <div className={`container ${styles.grid}`} data-reveal-group>
      <div className={styles.brand}><Link href="/" aria-label={t("CHIMG, inicio")}><Image src="/logo-chimg-w.png" alt={t("CHIMG Mega Ferretero Importadores")} width={218} height={73} /></Link><p>{t("Construimos contigo.")}<br />{t("Transformamos tus espacios.")}</p><span>{t("Ambato · Salcedo · Ecuador")}</span></div>
      <div><h3>{t("Explora CHIMG")}</h3><Link href="/about">{t("Sobre nosotros")}</Link><Link href="/services">{t("Nuestros servicios")}</Link><Link href="/contact">{t("Encuéntranos")}</Link></div>
      <div><h3>{t("Nuestras líneas")}</h3>{lines.map(line => <Link key={line.slug} href={`/product-lines/${line.slug}`}>{t(line.name)}</Link>)}</div>
      <div className={styles.help}><h3>{t("¿Empezamos tu proyecto?")}</h3><p>{t("Conversemos sobre lo que necesitas.")}</p><a href={company.phoneHref} className={styles.phone}>{company.phone} <ArrowUpRight size={18} /></a><a href={whatsappUrl(t("Hola, CHIMG. Me gustaría recibir información para mi proyecto."))} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> {t("Escríbenos por WhatsApp")}</a></div>
    </div>
    <div className={`container ${styles.bottom}`} data-reveal><span>© {new Date().getFullYear()} {t("CHIMG. Todos los derechos reservados.")}</span><span>{t("Más de 25 años siendo parte de tus proyectos.")}</span></div>
  </footer>;
}
