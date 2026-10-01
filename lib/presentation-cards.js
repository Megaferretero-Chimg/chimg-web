/**
 * Colección estática de tarjetas. Los canales pertenecen a la persona, no al cargo.
 * Todas usan PresentationCard: modificar el diseño allí actualiza cada tarjeta.
 * Obligatorios: slug (único, para la URL) y name.
 * Opcionales: role, company, location, countryCode, photo, givenName, familyName, links.
 * Omitir role/location oculta esos campos; countryCode EC añade la bandera de Ecuador.
 * Añadir una persona requiere únicamente otro objeto en esta colección.
 * photo: ruta local opcional en public/. Sin foto se muestran iniciales.
 * links: { id, type, label, value?, href?, phoneNumber? }[]
 * Un canal necesita href o un phoneNumber de WeChat para mostrarse.
 * Tipos: phone, email, whatsapp, wechat, website, location (otros usan un icono genérico).
 */
export const presentationCards = [
  {
    slug: "cesar-a-chiluisa",
    name: "César A. Chiluisa",
    givenName: "César A.",
    familyName: "Chiluisa",
    company: "Mega CHIMG",
    location: "Ambato - Ecuador",
    countryCode: "EC",
    photo: "/business-cards/cesar-a-chiluisa/portrait.png",
    links: [
      { id: "email", type: "email", label: "Correo electrónico", value: "cchiluisar@megachimg.com", href: "mailto:cchiluisar@megachimg.com" },
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (305) 954-3394", phoneNumber: "+13059543394" },
    ],
  },
  {
    slug: "ashley-chiluisa",
    name: "Ashley Chiluisa",
    givenName: "Ashley",
    familyName: "Chiluisa",
    role: "Gerente de operaciones",
    company: "Mega CHIMG",
    location: "Ambato - Ecuador",
    countryCode: "EC",
    photo: "/business-cards/ashley-chiluisa/portrait.png",
    links: [
      { id: "email", type: "email", label: "Correo electrónico", value: "achiluisa@megachimg.com", href: "mailto:achiluisa@megachimg.com" },
      { id: "whatsapp-ec", type: "whatsapp", label: "WhatsApp · Ecuador", value: "+593 994933639", href: "https://wa.me/593994933639" },
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (786) 769-4053", phoneNumber: "+17867694053" },
    ],
  },
  {
    slug: "cesar-chiluisa",
    name: "César Chiluisa",
    givenName: "César",
    familyName: "Chiluisa",
    role: "Gerente comercial",
    company: "Mega CHIMG",
    location: "Ambato - Ecuador",
    countryCode: "EC",
    photo: "/business-cards/cesar-chiluisa/portrait.png",
    links: [
      { id: "email", type: "email", label: "Correo electrónico", value: "cchiluisa@megachimg.com", href: "mailto:cchiluisa@megachimg.com" },
      { id: "whatsapp-ec", type: "whatsapp", label: "WhatsApp · Ecuador", value: "+593 991449036", href: "https://wa.me/593991449036" },
      // Enlace decodificado del QR de WeChat proporcionado para César.
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (305) 954-3202", phoneNumber: "+13059543202", href: "https://u.wechat.com/kHPXQLXlM-vRSvlRosvi-rs?s=2" },
    ],
  },
  {
    slug: "rosa-rodriguez",
    name: "Rosa Rodríguez",
    givenName: "Rosa",
    familyName: "Rodríguez",
    role: "Gerente general",
    company: "Mega CHIMG",
    location: "Ambato - Ecuador",
    countryCode: "EC",
    photo: "/business-cards/rosa-rodriguez/portrait.png",
    links: [
      { id: "email", type: "email", label: "Correo electrónico", value: "rrodriguez@megachimg.com", href: "mailto:rrodriguez@megachimg.com" },
      { id: "whatsapp-ec", type: "whatsapp", label: "WhatsApp · Ecuador", value: "+593 999381156", href: "https://wa.me/593999381156" },
      // Enlace decodificado del QR de WeChat proporcionado para Rosa.
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (786) 351-0480", phoneNumber: "+17863510480", href: "https://u.wechat.com/kKeJ5vStbYpkQEiTYnDKW7s?s=2" },
    ],
  },
  {
    slug: "michelle-chiluisa",
    name: "Michelle Chiluisa",
    givenName: "Michelle",
    familyName: "Chiluisa",
    role: "Gerente de ventas",
    company: "Mega CHIMG",
    location: "Ambato - Ecuador",
    countryCode: "EC",
    photo: "/business-cards/michelle-chiluisa/portrait-enhanced-v1.png",
    links: [
      { id: "email", type: "email", label: "Correo electrónico", value: "kchiluisa@megachimg.com", href: "mailto:kchiluisa@megachimg.com" },
      { id: "whatsapp", type: "whatsapp", label: "WhatsApp", value: "+593 959739185", href: "https://wa.me/593959739185" },
      // Enlace decodificado del QR proporcionado por el titular.
      { id: "wechat", type: "wechat", label: "We Chat", value: "+593 959739185", phoneNumber: "+593959739185", href: "https://u.wechat.com/kM4XCsjqok8s8JkjOIqzoJs?s=2" },
    ],
  },
];

export function getPresentationCard(slug) {
  return presentationCards.find(card => card.slug === slug);
}

export function getCardLinks(card) {
  return (card.links ?? []).filter(link => (typeof link?.href === "string" && link.href.trim()) || (link?.type === "wechat" && /^\+\d{7,15}$/.test(link.phoneNumber ?? "")));
}

export function getCardInitials(name) {
  return name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join("");
}
