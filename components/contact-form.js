"use client";
import { useLanguage } from "@/components/language-selector";
import { useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { productCategories } from "@/lib/product-categories";
import LineSelect from "./line-select";
import styles from "./contact-form.module.scss";
export default function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const roleTrigger = useRef(null);
  const lineTrigger = useRef(null);
  const [invalid, setInvalid] = useState("");
  const [ready, setReady] = useState(false);
  const text = t("Hola, CHIMG. Mi nombre es {name}. Soy {role}. Me interesa: {line}.\n\n{message}", { name: name.trim(), role: t(role), line: t(line), message: message.trim() });
  function handleSubmit(event) {
    event.preventDefault();
    const fields = event.currentTarget.elements;
    const nameInput = fields.namedItem("name");
    const messageInput = fields.namedItem("message");
    nameInput.setCustomValidity(name.trim().length < 2 ? t("Escribe tu nombre.") : "");
    messageInput.setCustomValidity(message.trim().length < 10 ? t("Cuéntanos un poco más sobre tu proyecto (al menos 10 caracteres).") : "");
    if (!event.currentTarget.reportValidity()) return;
    if (!role || !line) { const field = !role ? "role" : "line"; setInvalid(field); (field === "role" ? roleTrigger : lineTrigger).current?.focus(); return; }
    setInvalid(""); setReady(true);
  }
  return <form className={styles.form} onSubmit={handleSubmit} onChange={() => setReady(false)} onInput={event => event.target.setCustomValidity?.("")}>
    <div className={styles.heading}><MessageCircle size={24} strokeWidth={1.5} /><span>{t("CUÉNTANOS TU IDEA")}</span></div>
    <label htmlFor="contact-name">{t("Nombre:")}</label><input id="contact-name" name="name" autoComplete="name" placeholder={t("¿Cómo te llamas?")} required minLength={2} maxLength={100} value={name} onChange={event => setName(event.target.value)} pattern=".*\S.*" />
    <label id="contact-role-label" htmlFor="contact-role">{t("Soy:")}</label><LineSelect id="contact-role" name="role" value={role} triggerRef={roleTrigger} invalid={invalid === "role"} placeholder="Selecciona una opción" options={["Constructor", "Ferretería", "Profesional Independiente", "Consumidor Final"].map(name => ({ name, icon: "home" }))} onChange={value => { setRole(value); setInvalid(""); setReady(false); }} />
    <label id="contact-line-label" htmlFor="contact-line">{t("Me interesa:")}</label><LineSelect value={line} triggerRef={lineTrigger} invalid={invalid === "line"} placeholder="Selecciona una categoría" options={productCategories.map(name => ({ name, icon: name === "Jardinería" ? "garden" : name === "Herramienta Eléctrica" ? "drill" : name === "Maquinaria Industrial" ? "machinery" : "layers" }))} onChange={value => { setLine(value); setInvalid(""); setReady(false); }} />
    <label htmlFor="contact-message">{t("Cuéntanos de tu proyecto")}</label><textarea id="contact-message" name="message" rows={3} required minLength={10} maxLength={2000} placeholder={t("Cuéntanos qué necesitas, cantidades o detalles de tu idea…")} value={message} onChange={event => setMessage(event.target.value)} />
    <button className="button button-yellow" type="submit">{t("Preparar consulta")} <ArrowUpRight size={18} /></button>
    <div aria-live="polite">{ready && <div className={styles.ready}><p>{t("Tu consulta está lista. Abre WhatsApp para revisarla y enviarla.")}</p><a className="button button-blue" href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">{t("Continuar en WhatsApp")} <ArrowUpRight size={17} /></a></div>}</div>
    <small>{t("Se abrirá WhatsApp con tu mensaje. Tú decides cuándo enviarlo.")}</small>
  </form>;
}
