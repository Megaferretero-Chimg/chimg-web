"use client";
import { useLanguage } from "@/components/language-selector";
import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { productCategories } from "@/lib/product-categories";
import styles from "./contact-form.module.scss";
export default function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const text = t("Hola, CHIMG. Mi nombre es {name}. Soy {role}. Me interesa: {line}.\n\n{message}", { name: name.trim(), role: t(role), line: t(line), message: message.trim() });
  function handleSubmit(event) {
    event.preventDefault();
    const fields = event.currentTarget.elements;
    const nameInput = fields.namedItem("name");
    const messageInput = fields.namedItem("message");
    nameInput.setCustomValidity(name.trim().length < 2 ? t("Escribe tu nombre.") : "");
    messageInput.setCustomValidity(message.trim().length < 10 ? t("Cuéntanos un poco más sobre tu proyecto (al menos 10 caracteres).") : "");
    if (event.currentTarget.reportValidity()) setReady(true);
  }
  return <form className={styles.form} onSubmit={handleSubmit} onChange={() => setReady(false)} onInput={event => event.target.setCustomValidity?.("")}>
    <div className={styles.heading}><MessageCircle size={24} strokeWidth={1.5} /><span>{t("CUÉNTANOS TU IDEA")}</span></div>
    <label htmlFor="contact-name">{t("Nombre:")}</label><input id="contact-name" name="name" autoComplete="name" placeholder={t("¿Cómo te llamas?")} required minLength={2} maxLength={100} value={name} onChange={event => setName(event.target.value)} pattern=".*\S.*" />
    <label htmlFor="contact-role">{t("Soy:")}</label><select id="contact-role" name="role" required value={role} onChange={event => setRole(event.target.value)}><option value="" disabled>{t("Selecciona una opción")}</option>{["Constructor", "Ferretería", "Profesional Independiente", "Consumidor Final"].map(item => <option key={item} value={item}>{t(item)}</option>)}</select>
    <label htmlFor="contact-line">{t("Me interesa:")}</label><select id="contact-line" name="line" required value={line} onChange={event => setLine(event.target.value)}><option value="" disabled>{t("Selecciona una categoría")}</option>{productCategories.map(category => <option key={category} value={category}>{t(category)}</option>)}</select>
    <label htmlFor="contact-message">{t("Cuéntanos de tu proyecto")}</label><textarea id="contact-message" name="message" rows={3} required minLength={10} maxLength={2000} placeholder={t("Cuéntanos qué necesitas, cantidades o detalles de tu idea…")} value={message} onChange={event => setMessage(event.target.value)} />
    <button className="button button-yellow" type="submit">{t("Preparar consulta")} <ArrowUpRight size={18} /></button>
    <div aria-live="polite">{ready && <div className={styles.ready}><p>{t("Tu consulta está lista. Abre WhatsApp para revisarla y enviarla.")}</p><a className="button button-blue" href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">{t("Continuar en WhatsApp")} <ArrowUpRight size={17} /></a></div>}</div>
    <small>{t("Se abrirá WhatsApp con tu mensaje. Tú decides cuándo enviarlo.")}</small>
  </form>;
}
