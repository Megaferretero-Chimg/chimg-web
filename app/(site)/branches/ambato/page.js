import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, Clock3 } from "lucide-react";
import PageBreadcrumb from "@/components/page-breadcrumb";
import WhatsAppIcon from "@/components/whatsapp-icon";
import AmbatoJourney from "@/components/ambato-journey";
import { getTranslator } from "@/lib/i18n/server";
import { branches, whatsappUrl } from "@/lib/site";
import galleries from "@/lib/product-galleries.json";
import styles from "./ambato.module.scss";
export async function generateMetadata() { const t = await getTranslator(); return { title: t("Matriz Ambato"), description: t("Conoce nuestra matriz en Ambato y recorre sus exhibiciones.") }; }
export default async function Page() {
 const t = await getTranslator(); const branch = branches.find(item => item.name === "Ambato");
 return <main id="main-content"><PageBreadcrumb label="Matriz Ambato" />
 <section className={styles.arrival} aria-labelledby="ambato-title"><div className={styles.title}><span>{t("EL PUNTO DE PARTIDA")}</span><h2 id="ambato-title">Ambato<span>.</span></h2><p>{t("Entra. Explora. Imagina tu próximo proyecto.")}</p></div><div className={styles.facade}><Image src="/imgs/ambato/DSC00788.webp" alt={t("Fachada de CHIMG en Ambato")} fill sizes="100vw" priority /><a href="#recorrido">{t("Recorre la matriz")}<ArrowDown size={20} /></a></div></section>
 <section id="recorrido" className={styles.journey}><div className={`container ${styles.journeyHeading}`}><span>{t("POR DENTRO")}</span><h2>{t("Un lugar. Muchas posibilidades.")}</h2><p>{t("Muévete entre nuestras categorías y descubre lo que te espera en Ambato.")}</p></div><AmbatoJourney categories={galleries.filter(item => item.branches.ambato.length)} /></section>
 <section className={`container ${styles.visit}`} aria-labelledby="visit-title"><div><span>{t("NOS VEMOS AQUÍ")}</span><h2 id="visit-title">{t("Ven con tu próxima idea.")}</h2><a className={styles.whatsapp} href={whatsappUrl(t("Hola, CHIMG. Me gustaría consultar productos de la matriz Ambato."))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={22} />{t("Conversemos por WhatsApp")}</a></div><div className={styles.visitDetails}><div><MapPin size={23} /><section><h3>{t("Ubicación")}</h3><p>{branch.address}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer">{t("Cómo llegar")}<ArrowUpRight size={17} /></a></section></div><div><Clock3 size={23} /><section><h3>{t("Horarios")}</h3><p>{t(branch.weekdays)}<br />{t(branch.saturday)}<br />{t(branch.sunday)}</p></section></div></div></section></main>;
}
