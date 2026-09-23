import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { company, lines, whatsappUrl } from "@/lib/site";
import styles from "./site-footer.module.scss";
export default function SiteFooter() {
  return <footer className={styles.footer}>
    <div className={`container ${styles.grid}`} data-reveal-group>
      <div className={styles.brand}><Link href="/" aria-label="CHIMG, inicio"><Image src="/logo-chimg-w.png" alt="CHIMG Mega Ferretero Importadores" width={218} height={73} /></Link><p>Construimos contigo.<br />Transformamos tus espacios.</p><span>Ambato · Salcedo · Ecuador</span></div>
      <div><h3>Explora CHIMG</h3><Link href="/nosotros">Sobre nosotros</Link><Link href="/servicios">Nuestros servicios</Link><Link href="/contacto">Encuéntranos</Link></div>
      <div><h3>Nuestras líneas</h3>{lines.map(line => <Link key={line.slug} href={`/lineas/${line.slug}`}>{line.name}</Link>)}</div>
      <div className={styles.help}><h3>¿Empezamos tu proyecto?</h3><p>Conversemos sobre lo que necesitas.</p><a href={company.phoneHref} className={styles.phone}>{company.phone} <ArrowUpRight size={18} /></a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Escríbenos por WhatsApp</a></div>
    </div>
    <div className={`container ${styles.bottom}`} data-reveal><span>© {new Date().getFullYear()} CHIMG. Todos los derechos reservados.</span><span>Más de 25 años siendo parte de tus proyectos.</span></div>
  </footer>;
}
