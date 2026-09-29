"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { LANGUAGE_COOKIE, supportedLanguages } from "@/lib/i18n/language";
import { translator } from "@/lib/i18n/translate";
import styles from "./language-selector.module.scss";

const LanguageContext = createContext("es");
export function LanguageProvider({ language, children }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const language = useContext(LanguageContext);
  return { language, t: translator(language) };
}
const languages = [{ code: "es", name: "Español" }, { code: "en", name: "English" }];

export default function LanguageSelector() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const dismiss = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function showOptions() {
    const rect = trigger.current.getBoundingClientRect();
    setAbove(window.innerHeight - rect.bottom < 160 && rect.top > 160);
    setActive(languages.findIndex(item => item.code === language));
    setOpen(true);
  }

  function changeLanguage(next) {
    if (pending || !supportedLanguages.includes(next)) return;
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
    if (next === language) return;
    document.cookie = `${LANGUAGE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    startTransition(() => router.refresh());
  }

  function onKeyDown(event) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!open) showOptions();
      else setActive(index => event.key === "Home" ? 0 : event.key === "End" ? 1 : (index + 1) % languages.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) changeLanguage(languages[active].code);
      else showOptions();
    } else if (open && event.key.toLowerCase() === "e") {
      event.preventDefault();
      setActive(index => (index + 1) % languages.length);
    }
  }

  return <div ref={root} className={styles.selector} data-above={above} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} type="button" role="combobox" className={styles.trigger}
      aria-label={t("Idioma")} title={t("Cambiar idioma")} aria-expanded={open} aria-haspopup="listbox"
      aria-controls={listId} aria-activedescendant={open ? `${listId}-${languages[active].code}` : undefined}
      aria-busy={pending} disabled={pending} onKeyDown={onKeyDown} onClick={() => open ? setOpen(false) : showOptions()}>
      <Globe2 size={14} aria-hidden="true" /><span>{language.toUpperCase()}</span><ChevronDown size={12} className={styles.chevron} aria-hidden="true" />
    </button>
    {open && <ul id={listId} role="listbox" aria-label={t("Idioma")} className={styles.options}>
      {languages.map((item, index) => <li key={item.code} id={`${listId}-${item.code}`} role="option" aria-selected={language === item.code}
        className={index === active ? styles.active : undefined} onPointerMove={() => setActive(index)}
        onMouseDown={event => event.preventDefault()} onClick={() => changeLanguage(item.code)}>
        <span className={styles.code} aria-hidden="true">{item.code.toUpperCase()}</span><span lang={item.code}>{item.name}</span>
        {language === item.code && <Check size={16} aria-hidden="true" />}
      </li>)}
    </ul>}
    <span className={styles.srOnly} role="status">{pending ? t("Cambiando idioma…") : ""}</span>
  </div>;
}
