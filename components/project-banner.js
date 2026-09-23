import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import styles from "@/styles/corporate.module.scss";

export default function ProjectBanner() {
  return (
    <section className={styles.projectBanner}>
      <div className={`container ${styles.projectInner}`} data-reveal-group>
        <div><span>CADA GRAN PROYECTO EMPIEZA CON UNA CONVERSACIÓN.</span><h2>Tú lo imaginas.<br />Nosotros te acompañamos.</h2></div>
        <a href={whatsappUrl()} className="button button-yellow" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Conversemos por WhatsApp <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}
