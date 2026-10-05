import WhatsAppIcon from "@/components/whatsapp-icon";
import { getTranslator } from "@/lib/i18n/server";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import styles from "@/styles/corporate.module.scss";

export default async function ProjectBanner() {
  const t = await getTranslator();
  return (
    <section className={styles.projectBanner}>
      <div className={`container ${styles.projectInner}`} data-reveal-group>
        <div><span>{t("CADA GRAN PROYECTO EMPIEZA CON UNA CONVERSACIÓN.")}</span><h2>{t("Tú lo imaginas.")}<br />{t("Nosotros te acompañamos.")}</h2></div>
        <a href={whatsappUrl(t("Hola, CHIMG. Me gustaría recibir información para mi proyecto."))} className="button button-yellow" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> {t("Conversemos por WhatsApp")} <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}
