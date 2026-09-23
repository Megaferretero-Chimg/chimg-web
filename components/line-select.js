"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { lines } from "@/lib/site";
import LineIcon from "./line-icon";
import styles from "./line-select.module.scss";

export default function LineSelect({ value, onChange, invalid, triggerRef }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const search = useRef({ text: "", time: 0 });
  const selected = lines.findIndex(line => line.name === value);

  useEffect(() => {
    if (!open) return;
    const close = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  function choose(index) {
    onChange(lines[index].name);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDown(event) {
    if (event.key === "Tab") { setOpen(false); return; }
    if (event.key === "Escape") { if (open) event.preventDefault(); setOpen(false); return; }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      if (event.key === "Home") setActive(0);
      else if (event.key === "End") setActive(lines.length - 1);
      else if (!open) setActive(selected >= 0 ? selected : event.key === "ArrowUp" ? lines.length - 1 : 0);
      else setActive(index => (index + (event.key === "ArrowDown" ? 1 : -1) + lines.length) % lines.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else { setActive(Math.max(selected, 0)); setOpen(true); }
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const text = (now - search.current.time < 700 ? search.current.text : "") + event.key.toLocaleLowerCase();
      search.current = { text, time: now };
      const index = lines.findIndex(line => line.name.toLocaleLowerCase().startsWith(text));
      if (index >= 0) { setActive(index); setOpen(true); }
    }
  }

  return <div className={styles.root} ref={root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={triggerRef} id="contact-line" type="button" role="combobox" aria-labelledby="contact-line-label" aria-expanded={open} aria-controls="contact-line-options" aria-haspopup="listbox" aria-required="true" aria-invalid={invalid || undefined} aria-describedby={invalid ? "contact-line-error" : undefined} aria-activedescendant={open ? `line-option-${active}` : undefined} className={styles.trigger} onKeyDown={onKeyDown} onClick={() => { setActive(Math.max(selected, 0)); setOpen(value => !value); }}>
      <span>{selected >= 0 && <LineIcon name={lines[selected].icon} size={18} />}{value || "Selecciona una línea"}</span><ChevronDown size={17} className={open ? styles.rotated : ""} />
    </button>
    <input type="hidden" name="line" value={value} />
    {open && <ul id="contact-line-options" role="listbox" aria-labelledby="contact-line-label" className={styles.options}>
      {lines.map((line, index) => <li key={line.slug} id={`line-option-${index}`} role="option" aria-selected={selected === index} className={index === active ? styles.active : ""} onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}><LineIcon name={line.icon} size={19} /><span>{line.name}</span>{selected === index && <Check size={17} />}</li>)}
    </ul>}
    {invalid && <p id="contact-line-error" className={styles.error} role="alert">Selecciona una línea para continuar.</p>}
  </div>;
}
