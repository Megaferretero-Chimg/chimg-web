import HomeHero from "@/components/home-hero";
import SocialSection from "@/components/social-section";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectBanner from "@/components/project-banner";
import LineIcon from "@/components/line-icon";
import { lines } from "@/lib/site";
import styles from "@/styles/corporate.module.scss";

export default function Home() {
  return (
    <main id="contenido">
      <HomeHero />
      <nav className={styles.lineNav} aria-label="Explora nuestras cinco líneas">
        <div className="container" data-reveal-group>{lines.map(line => <Link key={line.slug} href={`/lineas/${line.slug}`}><LineIcon name={line.icon} size={23} /><span>{line.name}</span><ArrowUpRight className={styles.lineNavArrow} size={14} /></Link>)}</div>
      </nav>
      <SocialSection />
      <section className={`container ${styles.explore}`} aria-labelledby="explore-title">
        <p className="eyebrow" data-reveal>CONOCE CHIMG</p>
        <h2 className="section-title" id="explore-title" data-reveal>Un aliado en cada paso.</h2>
        <div className={styles.exploreGrid} data-reveal-group>
          <Link href="/nosotros"><span>01 · NOSOTROS</span><h3>Una historia que construimos juntos.</h3><p>Conoce quiénes somos y qué nos mueve desde hace más de 25 años.</p><span className="text-link">Conoce CHIMG <ArrowUpRight size={18} /></span></Link>
          <Link href="/lineas"><span>02 · NUESTRAS LÍNEAS</span><h3>Encuentra nuevas posibilidades.</h3><p>Cinco líneas para construir, renovar y dar vida a tus espacios.</p><span className="text-link">Explora nuestras líneas <ArrowUpRight size={18} /></span></Link>
          <Link href="/servicios"><span>03 · SERVICIOS</span><h3>Te acompañamos más allá de la compra.</h3><p>Descubre nuestra asesoría, entrega y soporte para tu proyecto.</p><span className="text-link">Descubre nuestros servicios <ArrowUpRight size={18} /></span></Link>
        </div>
      </section>
      <ProjectBanner />
    </main>
  );
}
