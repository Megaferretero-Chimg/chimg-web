"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Menu, Phone, X } from "lucide-react";
import { company } from "@/lib/site";
import styles from "./site-header.module.scss";
import ambatoMenu from "@/output/banners/chimg-mobile-v1.png";
import salcedoMenu from "@/output/banners/chimg-salcedo-mobile-v1.png";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();
  const overlay = ["/", "/nosotros", "/lineas", "/servicios", "/contacto"].includes(pathname);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const sync = () => { if (navRef.current) navRef.current.inert = media.matches && !open; };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 800px)");
    if (!mobile.matches) return;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const behind = [...document.querySelectorAll("main, footer, .skip-link"), ...headerRef.current.querySelectorAll(`.${styles.logo}, .${styles.topbar}`)];
    const previousInert = behind.map(element => element.inert);
    behind.forEach(element => { element.inert = true; });
    function onResize() { if (!mobile.matches) setOpen(false); }
    function onKeyDown(event) {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...navRef.current.querySelectorAll("a[href]")];
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    mobile.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      behind.forEach((element, index) => { element.inert = previousInert[index]; });
      mobile.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);
  return <header className={`${styles.header} ${overlay ? styles.home : ""}`} ref={headerRef}>
    <div className={styles.topbar}><div className="container"><span>Más de 25 años construyendo contigo</span><div><Link href="/contacto"><MapPin size={13} /> Ambato & Salcedo</Link><a href={company.phoneHref}><Phone size={12} /> {company.phone}</a></div></div></div>
    <div className={`container ${styles.navigation}`}>
      <Link href="/" className={styles.logo} aria-label="CHIMG, inicio" onClick={() => setOpen(false)}><Image src={overlay ? "/logo-chimg-w.png" : "/logo-chimg.png"} alt="CHIMG Mega Ferretero Importadores" width={199} height={66} preload /></Link>
      <button className={styles.toggle} type="button" ref={toggleRef} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="main-navigation" onClick={() => { setMenuLoaded(true); setOpen(value => !value); }}><Menu className={styles.menuIcon} aria-hidden="true" /><X className={styles.closeIcon} aria-hidden="true" /></button>
      <nav ref={navRef} id="main-navigation" aria-label="Navegación principal" className={`${styles.links} ${open ? styles.open : ""}`}>
        {menuLoaded && <div className={styles.menuBackdrop} aria-hidden="true"><Image src={ambatoMenu} alt="" fill sizes="100vw" unoptimized /><Image src={salcedoMenu} alt="" fill sizes="100vw" unoptimized /><div /></div>}
        <div className={styles.menuBrand}><Image src="/logo-chimg-w.png" alt="CHIMG" width={165} height={55} /></div>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>Inicio</Link>
        <Link href="/nosotros" aria-current={pathname === "/nosotros" ? "page" : undefined} onClick={() => setOpen(false)}>Nosotros</Link>
        <Link href="/lineas" aria-current={pathname === "/lineas" ? "page" : pathname.startsWith("/lineas/") ? "location" : undefined} onClick={() => setOpen(false)}>Nuestras líneas</Link>
        <Link href="/servicios" aria-current={pathname === "/servicios" ? "page" : undefined} onClick={() => setOpen(false)}>Servicios</Link>
        <Link href="/contacto" aria-current={pathname === "/contacto" ? "page" : undefined} className={styles.contact} onClick={() => setOpen(false)}>Contacto <span className={styles.contactArrow} aria-hidden="true"><ArrowUpRight size={17} /></span></Link>
        <div className={styles.menuFooter}><span>AMBATO · SALCEDO</span><p>Tu próximo proyecto<br />empieza aquí.</p></div>
      </nav>
    </div>
  </header>;
}

