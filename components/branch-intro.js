import Link from "next/link";
import { MapPin, Clock3, ArrowUpRight } from "lucide-react";
import { getTranslator } from "@/lib/i18n/server";
import { whatsappUrl } from "@/lib/site";
import WhatsAppIcon from "./whatsapp-icon";
import BranchFacades from "./branch-facades";
import styles from "./branch-intro.module.scss";
export default async function BranchIntro({ branch }) {
  const t = await getTranslator();
  return <section className={`container ${styles.section}`} aria-labelledby="branch-visit-title"><div className={styles.photo} data-reveal><BranchFacades branch={branch.name} alt={t("Fachada de CHIMG en {name}", { name: branch.name })} labels={{ carousel: t("Carrusel"), previous: t("Foto anterior"), next: t("Foto siguiente"), view: t("Ver foto") }} /><span className={styles.badge}>{t(branch.name === "Ambato" ? "Nuestra matriz" : "Nuestra sucursal")}</span></div><div className={styles.visit} data-reveal><p className={styles.eyebrow}>{t("VEN A CONOCERNOS")}</p><h2 id="branch-visit-title">{t("Tu proyecto empieza aquí.")}</h2><div className={styles.info}><MapPin size={22} /><div><h3>{t("Ubicación")}</h3><p>{branch.address}</p></div></div><div className={styles.info}><Clock3 size={22} /><div><h3>{t("Horarios")}</h3><p>{t(branch.weekdays)}<br />{t(branch.saturday)}<br />{t(branch.sunday)}</p></div></div><div className={styles.actions}><a href={whatsappUrl(t("Hola, CHIMG. Me gustaría consultar productos de {name}.", { name: branch.name }))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={21} />{t("Consultar disponibilidad")}</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer">{t("Cómo llegar")}<ArrowUpRight size={19} /></a></div><Link className={styles.back} href="/about">{t("Nuestras sucursales")} <ArrowUpRight size={15} /></Link></div></section>;
}
