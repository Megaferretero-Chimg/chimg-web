"use client";

import { useLanguage } from "./language-selector";
import { whatsappUrl } from "@/lib/site";
import styles from "./social-section.module.scss";

const networks = [
  { name: "Instagram", href: "https://www.instagram.com/megachimg/", icon: "/icons/instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/megachimg", icon: "/icons/facebook.svg" },
  { name: "TikTok", href: "https://www.tiktok.com/@megachimg", icon: "/icons/tiktok.svg" },
  { name: "WhatsApp", icon: "/icons/whastapp.svg" },
];

export default function SocialSection() {
  const { t } = useLanguage();

  return (
    <nav className={styles.social} aria-label={t("Redes sociales")}>
      {networks.map(network => (
        <a className={styles.link} key={network.name}
          href={network.name === "WhatsApp" ? whatsappUrl(t("Hola, CHIMG. Me gustaría recibir información para mi proyecto.")) : network.href}
          target="_blank" rel="noopener noreferrer"
          title={network.name}
          aria-label={t("{name} de CHIMG (abre en otra pestaña)", { name: network.name })}>
          <span className={styles.icon} style={{ "--social-icon": `url("${network.icon}")` }} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
