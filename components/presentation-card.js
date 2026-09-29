"use client";
import LanguageSelector, { useLanguage } from "@/components/language-selector";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Copy, Download, Globe, Mail, MapPin, MessageCircle, Phone, UserRound, UserRoundPlus } from "lucide-react";
import { getCardInitials, getCardLinks } from "@/lib/presentation-cards";
import ambato from "@/output/banners/chimg-widescreen-v1.png";
import styles from "./presentation-card.module.scss";

const icons = { contact: UserRoundPlus, phone: Phone, email: Mail, whatsapp: MessageCircle, wechat: MessageCircle, website: Globe, location: MapPin };

function subscribeMobile(callback) {
  const media = window.matchMedia("(max-width: 700px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const isMobileViewport = () => window.matchMedia("(max-width: 700px)").matches;
const serverViewport = () => false;

export default function PresentationCard({ card }) {
  const { t } = useLanguage();
  const links = [{
    id: "save-contact", type: "contact", label: "Guardar contacto", value: "Añádeme a tu agenda",
    href: `/business-cards/${encodeURIComponent(card.slug)}/contact.vcf`,
    download: `${card.slug}.vcf`,
  }, ...getCardLinks(card)];
  const [copyStatus, setCopyStatus] = useState("");
  const [page, setPage] = useState(0);
  const [dragProgress, setDragProgress] = useState(null);
  const mobile = useSyncExternalStore(subscribeMobile, isMobileViewport, serverViewport);
  const touchStart = useRef(null);
  const suppressClick = useRef(false);
  const pageButtons = useRef([]);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  function showCopyStatus(message) {
    clearTimeout(copyTimer.current);
    setCopyStatus(message);
    copyTimer.current = setTimeout(() => setCopyStatus(""), 5000);
  }

  function changePage(next) {
    const destination = Math.max(0, Math.min(1, next));
    setPage(destination);
    setDragProgress(null);
    pageButtons.current[destination]?.focus({ preventScroll: true });
  }

  function startSwipe(event) {
    suppressClick.current = false;
    if (!mobile || !event.isPrimary || event.button !== 0 || event.target.closest("nav")) return;
    touchStart.current = { x: event.clientX, y: event.clientY, time: performance.now(), width: event.currentTarget.clientWidth, pointer: event.pointerId, axis: null };
  }

  function moveSwipe(event) {
    const start = touchStart.current;
    if (!start || start.pointer !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
      start.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
      if (start.axis === "x") event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (start.axis !== "x") return;
    suppressClick.current = true;
    setDragProgress(Math.max(0, Math.min(1, page - dx / start.width)));
  }

  function finishSwipe(event, cancelled = false) {
    const start = touchStart.current;
    touchStart.current = null;
    setDragProgress(null);
    if (!start) return;
    if (event.currentTarget.hasPointerCapture(start.pointer)) event.currentTarget.releasePointerCapture(start.pointer);
    if (cancelled || start.axis !== "x") return;
    const dx = event.clientX - start.x;
    const velocity = Math.abs(dx) / Math.max(1, performance.now() - start.time);
    if (Math.abs(dx) > start.width * .18 || (Math.abs(dx) > 24 && velocity > .45)) changePage(page + (dx < 0 ? 1 : -1));
  }

  async function copyCard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showCopyStatus("Enlace copiado. Ya puedes compartir esta tarjeta.");
    } catch {
      showCopyStatus("No se pudo copiar. Puedes compartir la dirección de esta página desde tu navegador.");
    }
  }

  return <article className={styles.card} aria-labelledby="card-name">
    <div className={styles.backdrop} aria-hidden="true">
      <Image src={ambato} alt="" fill sizes="100vw" preload className={styles.activeScene} />
    </div>
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <Image className={styles.logo} src="/logo-chimg-w.png" alt={t("Mega ferretero CHIMG")} width={199} height={66} />
        <div className={styles.topbarActions}><LanguageSelector /><Link className={styles.visit} href="/">{t("Visita CHIMG")} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div>
      <div className={styles.content} data-page={page} data-dragging={dragProgress !== null} style={{ "--progress": dragProgress ?? page }}
        onPointerDown={startSwipe} onPointerMove={moveSwipe}
        onPointerUp={event => finishSwipe(event)} onPointerCancel={event => finishSwipe(event, true)}
        onClickCapture={event => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
        onKeyDown={event => { if (mobile && ["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); changePage(page + (event.key === "ArrowRight" ? 1 : -1)); } }}>
        <div id="card-profile" className={styles.identity} inert={mobile && page !== 0}>
          <p className={styles.eyebrow}><span /> {t("PERSONAS QUE CONSTRUYEN CONTIGO")}</p>
          <div className={styles.profile}>
            <div className={styles.portrait}>
              {card.photo ? <Image src={card.photo} alt={t(card.name)} fill sizes="(max-width: 700px) 110px, 150px" preload /> : <span aria-hidden="true">{getCardInitials(card.name)}</span>}
            </div>
            <div className={styles.profileCaption}><span>{card.company}</span><p>{t(card.role)}</p>{card.location && <span className={styles.location}><MapPin size={14} aria-hidden="true" />{t(card.location)}</span>}</div>
          </div>
          <h1 id="card-name">{t(card.name)}</h1>
          <p className={styles.intro}>{t("Las grandes ideas empiezan")}<br />{t("con una buena conversación.")}</p>
          <button className={styles.mobileNext} type="button" onClick={() => changePage(1)}>{t("Ver mis contactos")} <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
        <div id="card-contact" className={styles.contact} inert={mobile && page !== 1}>
          <div className={styles.contactHeading}><span className={styles.kicker}>{t("CONTACTO DIRECTO")}</span><ArrowUpRight size={24} aria-hidden="true" /></div>
          <h2>{t("Hablemos de")}<br /><span>{t("tu próximo proyecto.")}</span></h2>
          <p className={styles.contactIntro}>{t("Elige tu canal y conectemos.")}</p>
          <ul className={styles.links}>
            {links.map((link, index) => {
              const Icon = icons[link.type] ?? Globe;
              const external = /^https?:\/\//.test(link.href ?? "");
              const primary = link.type === "whatsapp";
              const ActionIcon = link.download ? Download : ArrowUpRight;
              const content = <><span className={styles.icon}>{link.type === "whatsapp" ? <span className={styles.whatsappIcon} aria-hidden="true" /> : <Icon size={22} aria-hidden="true" />}</span><span className={styles.linkText}><strong>{t(link.label)}</strong>{link.value && <span>{t(link.value)}</span>}</span>{link.href && <ActionIcon className={styles.arrow} size={20} aria-hidden="true" />}</>;
              return <li key={link.id} style={{ "--delay": `${index * 90 + 150}ms` }}>
                {link.href ? <a className={`${styles.channel} ${primary ? styles.primary : ""}`} href={link.href} download={link.download} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{content}</a> : <div className={styles.channel}>{content}</div>}
              </li>;
            })}
          </ul>
          <div className={styles.share}><button type="button" onClick={copyCard}>{copyStatus.startsWith("Enlace copiado") ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{t("Copiar enlace de mi tarjeta")}</button></div>
        </div>
        <nav className={styles.pageControls} aria-label={t("Páginas de la tarjeta")}>
          <div className={styles.pageTrack}>
            <span className={styles.pageIndicator} aria-hidden="true" />
            {[{ label: "Perfil", icon: UserRound }, { label: "Contacto", icon: MessageCircle }].map(({ label, icon: PageIcon }, index) => <button key={label} ref={element => { pageButtons.current[index] = element; }} type="button" aria-current={page === index ? "step" : undefined} aria-controls={index === 0 ? "card-profile" : "card-contact"} onClick={() => changePage(index)}><PageIcon size={17} aria-hidden="true" /><span>{t(label)}</span></button>)}
          </div>
          <span className={styles.pageCount} aria-live="polite">{t("Página")} {page + 1} {t("de 2:")} {t(page === 0 ? "Perfil" : "Contacto")}</span>
        </nav>
      </div>
      <div className={styles.bottom}><span>{t("CONSTRUIMOS CONTIGO.")}</span><span>{t("AMBATO · SALCEDO")} <span aria-hidden="true">↗</span> {t("ECUADOR")}</span></div>
    </div>
    <div className={styles.noticeBar} data-visible={Boolean(copyStatus)} role="status" aria-atomic="true">{t(copyStatus)}</div>
  </article>;
}
