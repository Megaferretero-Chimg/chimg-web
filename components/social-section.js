import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import styles from "./social-section.module.scss";

const networks = [
  { name: "Instagram", handle: "@megachimg", description: "Ideas para tus espacios.", href: "https://www.instagram.com/megachimg/", icon: "/icons/instagram.svg" },
  { name: "Facebook", handle: "@megachimg", description: "Conoce nuestras novedades.", href: "https://www.facebook.com/megachimg", icon: "/icons/facebook.svg" },
  { name: "TikTok", handle: "@megachimg", description: "Descubre CHIMG de cerca.", href: "https://www.tiktok.com/@megachimg", icon: "/icons/tiktok.svg" },
  { name: "WhatsApp", handle: "Conversemos", description: "Cuéntanos tu próximo proyecto.", href: whatsappUrl(), icon: "/icons/whastapp.svg" },
];

export default function SocialSection() {
  return <section className={`container ${styles.section}`} aria-labelledby="social-title">
    <div className={styles.panel}>
      <div className={styles.intro} data-reveal>
        <p className={styles.eyebrow}><span /> SIGAMOS CONECTADOS</p>
        <h2 id="social-title">Más ideas.<br /><em>Más cerca de ti.</em></h2>
        <p>Encuentra inspiración, novedades y nuevas formas de dar vida a tus proyectos.</p>
        <a className={styles.allLinks} href="https://linktr.ee/chimg" target="_blank" rel="noopener noreferrer">Todos nuestros enlaces <ArrowUpRight size={16} /></a>
      </div>
      <div className={styles.networks} data-reveal-group>
        {networks.map(network => <a className={styles.card} key={network.name} href={network.href} target="_blank" rel="noopener noreferrer" aria-label={`${network.name} de CHIMG (abre en otra pestaña)`}>
          <div className={styles.cardTop}><span className={styles.icon}><Image src={network.icon} alt="" width={32} height={32} /></span><ArrowUpRight size={19} /></div>
          <div><span className={styles.handle}>{network.handle}</span><h3>{network.name}</h3><p>{network.description}</p></div>
        </a>)}
      </div>
    </div>
  </section>;
}
