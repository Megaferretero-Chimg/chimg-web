"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import LineSelect from "./line-select";
import styles from "./contact-form.module.scss";
export default function ContactForm() {
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [lineInvalid, setLineInvalid] = useState(false);
  const lineTrigger = useRef(null);
  const text = `Hola, CHIMG. Soy ${name.trim()}. Me interesa la línea de ${line}.\n\n${message.trim()}`;
  function handleSubmit(event) {
    event.preventDefault();
    const fields = event.currentTarget.elements;
    const nameInput = fields.namedItem("name");
    const messageInput = fields.namedItem("message");
    nameInput.setCustomValidity(name.trim().length < 2 ? "Escribe tu nombre." : "");
    messageInput.setCustomValidity(message.trim().length < 10 ? "Cuéntanos un poco más sobre tu proyecto (al menos 10 caracteres)." : "");
    if (!line) { setLineInvalid(true); lineTrigger.current?.focus(); return; }
    if (event.currentTarget.reportValidity()) setReady(true);
  }
  return <form className={styles.form} onSubmit={handleSubmit} onChange={() => setReady(false)} onInput={event => event.target.setCustomValidity?.("")}>
    <div className={styles.heading}><MessageCircle size={24} strokeWidth={1.5} /><span>CUÉNTANOS TU IDEA</span></div>
    <h3>Tu próximo proyecto<br />comienza aquí.</h3><p>Prepara tu consulta y conversemos por WhatsApp.</p>
    <label htmlFor="contact-name">Tu nombre</label><input id="contact-name" name="name" autoComplete="name" placeholder="¿Cómo te llamas?" required minLength={2} maxLength={100} value={name} onChange={event => setName(event.target.value)} pattern=".*\S.*" />
    <label id="contact-line-label" htmlFor="contact-line">¿Qué línea te interesa?</label><LineSelect value={line} triggerRef={lineTrigger} invalid={lineInvalid} onChange={value => { setLine(value); setLineInvalid(false); setReady(false); }} />
    <label htmlFor="contact-message">Háblanos de tu proyecto</label><textarea id="contact-message" name="message" rows={3} required minLength={10} maxLength={2000} placeholder="Cuéntanos qué necesitas, cantidades o detalles de tu idea…" value={message} onChange={event => setMessage(event.target.value)} />
    <button className="button button-yellow" type="submit">Preparar consulta <ArrowUpRight size={18} /></button>
    <div aria-live="polite">{ready && <div className={styles.ready}><p>Tu consulta está lista. Abre WhatsApp para revisarla y enviarla.</p><a className="button button-blue" href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">Continuar en WhatsApp <ArrowUpRight size={17} /></a></div>}</div>
    <small>Se abrirá WhatsApp con tu mensaje. Tú decides cuándo enviarlo.</small>
  </form>;
}
