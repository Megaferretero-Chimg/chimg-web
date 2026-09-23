import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { branches, company, whatsappUrl } from "@/lib/site";
import ambato from "@/output/branches/ambato-clean-v2.png";
import salcedo from "@/output/branches/salcedo-clean-v1.png";
import styles from "./contact.module.scss";

export const metadata = { title: "Contacto", description: "Visita CHIMG en Ambato y Salcedo. Consulta nuestros horarios y conversa con nuestro equipo por WhatsApp." };

export default function Page() {
  return (
    <main id="contenido">
      <PageBreadcrumb label="Contacto" />
      <section id="contacto" className={`container ${styles.contact}`} aria-labelledby="contact-title">
        <div className={styles.intro} data-reveal-group>
          <p className="eyebrow">UNA CONVERSACIÓN. NUEVAS POSIBILIDADES.</p>
          <h2 className="section-title" id="contact-title">Conectemos.<br /><span>Hagámoslo posible.</span></h2>
          <p className={styles.description}>Cada proyecto empieza con una buena conversación. Elige cómo prefieres hablar con nosotros.</p>
          <div className={styles.channels}>
            <a className={styles.channel} href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><span className={styles.icon}><MessageCircle size={24} /></span><div><small>ESCRÍBENOS</small><h3>WhatsApp</h3><p>Cuéntanos tu idea, a tu ritmo.</p></div><ArrowUpRight size={20} /></a>
            <a className={styles.channel} href={company.phoneHref}><span className={styles.icon}><Phone size={22} /></span><div><small>HABLEMOS DIRECTAMENTE</small><h3>{company.phone}</h3><p>Atención personalizada para tu proyecto.</p></div><ArrowUpRight size={20} /></a>
          </div>
          <div className={styles.localNote}><MapPin size={18} /><span>También te esperamos en <strong>Ambato y Salcedo.</strong></span></div>
        </div>
        <div data-reveal><ContactForm /></div>
      </section>
      <section className={`container ${styles.locations}`} aria-labelledby="locations-title">
        <div className={styles.sectionHeading} data-reveal><div><p className="eyebrow">CERCA DE TI</p><h2 className="section-title" id="locations-title">Nos vemos en CHIMG.</h2></div><p>Dos ciudades. La misma forma de acompañarte.</p></div>
        <div className={styles.branchGrid} data-reveal-group>{branches.map((branch, index) => <article className={styles.branch} key={branch.name}>
          <div className={styles.photo}><Image src={index === 0 ? ambato : salcedo} alt={`Sucursal CHIMG en ${branch.name}`} sizes="(max-width: 800px) 100vw, 50vw" /><span>{branch.type}</span></div>
          <div className={styles.branchBody}><div className={styles.branchTitle}><h3>{branch.name}</h3><MapPin size={22} /></div><p className={styles.address}>{branch.address}</p><div className={styles.hours}><Clock3 size={17} /><div><span>{branch.weekdays}</span><span>{branch.saturday}</span><span>{branch.sunday}</span></div></div><a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noopener noreferrer">Cómo llegar a {branch.name}<ArrowUpRight size={19} /></a></div>
        </article>)}</div>
      </section>
    </main>
  );
}
