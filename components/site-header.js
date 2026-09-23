"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Menu, Phone, X } from "lucide-react";
import { company } from "@/lib/site";
import styles from "./site-header.module.scss";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const pathname = usePathname();
  const overlay = ["/", "/nosotros", "/lineas", "/servicios", "/contacto"].includes(pathname);
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    }
    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown); };
  }, [open]);
  return <header className={`${styles.header} ${overlay ? styles.home : ""}`} ref={headerRef}>
    <div className={styles.topbar}><div className="container"><span>Más de 25 años construyendo contigo</span><div><Link href="/contacto"><MapPin size={13} /> Ambato & Salcedo</Link><a href={company.phoneHref}><Phone size={12} /> {company.phone}</a></div></div></div>
    <div className={`container ${styles.navigation}`}>
      <Link href="/" className={styles.logo} aria-label="CHIMG, inicio" onClick={() => setOpen(false)}><Image src={overlay ? "/logo-chimg-w.png" : "/logo-chimg.png"} alt="CHIMG Mega Ferretero Importadores" width={199} height={66} preload /></Link>
      <button className={styles.toggle} type="button" ref={toggleRef} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-navigation" aria-label="Navegación principal" className={`${styles.links} ${open ? styles.open : ""}`}>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>Inicio</Link>
        <Link href="/nosotros" aria-current={pathname === "/nosotros" ? "page" : undefined} onClick={() => setOpen(false)}>Nosotros</Link>
        <Link href="/lineas" aria-current={pathname === "/lineas" ? "page" : pathname.startsWith("/lineas/") ? "location" : undefined} onClick={() => setOpen(false)}>Nuestras líneas</Link>
        <Link href="/servicios" aria-current={pathname === "/servicios" ? "page" : undefined} onClick={() => setOpen(false)}>Servicios</Link>
        <Link href="/contacto" aria-current={pathname === "/contacto" ? "page" : undefined} className={styles.contact} onClick={() => setOpen(false)}>Contacto <span className={styles.contactArrow} aria-hidden="true"><ArrowUpRight size={17} /></span></Link>
      </nav>
    </div>
  </header>;
}

