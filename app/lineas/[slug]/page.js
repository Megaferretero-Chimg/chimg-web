import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import LineIcon from "@/components/line-icon";
import { lines, whatsappUrl } from "@/lib/site";
import styles from "./page.module.scss";

export function generateStaticParams() { return lines.map(line => ({ slug: line.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const line = lines.find(item => item.slug === slug);
  if (!line) return {};
  return { title: line.name, description: line.description };
}

export default async function LinePage({ params }) {
  const { slug } = await params;
  const line = lines.find(item => item.slug === slug);
  if (!line) notFound();

  return <main id="contenido">
    <div className={`container ${styles.breadcrumb}`}><Link href="/">Inicio</Link><span>/</span><Link href="/lineas">Nuestras líneas</Link><span>/</span><span>{line.name}</span></div>
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`} data-reveal-group>
        <div className={styles.copy}><p className="eyebrow">CHIMG · {line.name}</p><h1>{line.title}</h1><p>{line.description}</p><a className="button button-yellow" href={whatsappUrl(`Hola, CHIMG. Me gustaría recibir asesoría sobre la línea de ${line.name}.`)} target="_blank" rel="noopener noreferrer">Consultar esta línea <ArrowUpRight size={18} /></a><span className={styles.note}>Asesoría personalizada en Ambato y Salcedo.</span></div>
        <div className={styles.image}><Image src={line.image} alt={line.alt} fill sizes="(max-width: 800px) 100vw, 55vw" preload /><span><LineIcon name={line.icon} size={23} /> {line.name}</span></div>
      </div>
    </section>
    <section className={`container ${styles.details}`}><div><p className="eyebrow">ENCUENTRA LO QUE BUSCAS</p><h2 className="section-title">Opciones para<br />hacerlo realidad.</h2></div><div><div className={styles.categories}>{line.categories.map(category => <div key={category}><Check size={19} /><h3>{category}</h3></div>)}</div><p className={styles.availability}>Consulta modelos, especificaciones, disponibilidad y opciones de entrega con nuestro equipo.</p></div></section>
    {line.gallery.length > 0 && <section className={`container ${styles.gallery}`} data-reveal-group aria-label={`Conoce la línea de ${line.name}`}>{line.gallery.map(photo => <figure key={photo.src}><div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><figcaption>{photo.label}</figcaption></figure>)}</section>}
    <section className={styles.cta}><div className="container"><div><p className="eyebrow">CONVERSEMOS</p><h2>El siguiente paso lo damos juntos.</h2><p>Cuéntanos qué necesitas y te ayudamos a encontrar una solución.</p></div><Link className="button button-blue" href="/contacto"><MessageCircle size={18} /> Contactar a CHIMG <ArrowUpRight size={18} /></Link></div></section>
    <nav className={`container ${styles.otherLines}`} aria-label="Otras líneas"><h2>Más posibilidades para tu proyecto</h2><div>{lines.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/lineas/${item.slug}`}><LineIcon name={item.icon} size={23} /><span>{item.name}</span><ArrowRight size={17} /></Link>)}</div></nav>
  </main>;
}

