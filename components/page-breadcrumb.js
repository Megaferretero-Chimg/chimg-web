import Link from "next/link";
import styles from "./page-breadcrumb.module.scss";
import { ArrowUpRight } from "lucide-react";

const pages = {
  Nosotros: { number: "01", eyebrow: "CONSTRUIMOS CONTIGO, DESDE SIEMPRE", title: "Mucho más que materiales.", accent: "Un aliado para crear.", description: "Más de 25 años acompañando ideas, hogares y proyectos desde Ambato y Salcedo.", href: "#nosotros", action: "Conoce nuestra historia" },
  "Nuestras líneas": { number: "02", eyebrow: "CINCO LÍNEAS. INFINITAS POSIBILIDADES.", title: "Lo que necesitas.", accent: "Para lo que imaginas.", description: "Hogar, acabados, maquinaria, construcción y ferretería. Encuentra el siguiente paso para tu proyecto.", href: "#lineas", action: "Explora nuestras líneas" },
  Servicios: { number: "03", eyebrow: "CONTIGO, DE PRINCIPIO A FIN", title: "Tu proyecto sigue.", accent: "Nosotros, contigo.", description: "Asesoría, entrega y respaldo para que cada idea avance con confianza.", href: "#servicios", action: "Descubre cómo te ayudamos" },
  Contacto: { number: "04", eyebrow: "CERCA DE TI, CERCA DE TUS IDEAS", title: "Ven con una idea.", accent: "Salgamos con un plan.", description: "Conversemos sobre tu próximo proyecto. Te esperamos en Ambato y Salcedo.", href: "#contacto", action: "Hablemos de tu proyecto" },
};

export default function PageBreadcrumb({ label }) {
  const page = pages[label];
  return (
    <section className={styles.hero} aria-labelledby="page-title">
    <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
      <Link href="/">Inicio</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{label}</span>
    </nav>
    <div className={styles.copy} data-reveal-group>
      <p className={styles.eyebrow}>{page.eyebrow}</p>
      <h1 id="page-title">{page.title}<br /><em>{page.accent}</em></h1>
      <p className={styles.description}>{page.description}</p>
      <Link href={page.href} className={styles.action}>{page.action}<span><ArrowUpRight size={20} /></span></Link>
    </div>
    <div className={styles.signature} aria-hidden="true"><p>CHIMG / {label}</p></div>
    <div className={styles.bottom}><span>AMBATO · SALCEDO</span><span>CONSTRUIMOS CONTIGO.</span></div>
    </section>
  );
}
