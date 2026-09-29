/**
 * Colección estática de tarjetas. Los canales pertenecen a la persona, no al cargo.
 * photo: ruta local opcional en public/. Sin foto se muestran iniciales.
 * links: { id, type, label, value?, href }[]
 * Un canal necesita href para mostrarse. type solo decide el icono.
 * Tipos: phone, email, whatsapp, wechat, website, location (otros usan un icono genérico).
 */
export const presentationCards = [
  {
    slug: "michelle-chiluisa",
    name: "Michelle Chiluisa",
    givenName: "Michelle",
    familyName: "Chiluisa",
    role: "Gerente de ventas",
    company: "Mega CHIMG",
    location: "Ambato · Ecuador",
    photo: "/business-cards/michelle-chiluisa/portrait-enhanced-v1.png",
    links: [
      { id: "email", type: "email", label: "Correo electrónico", value: "kchiluisa@megachimg.com", href: "mailto:kchiluisa@megachimg.com" },
      { id: "whatsapp", type: "whatsapp", label: "WhatsApp", value: "+593 959739185", href: "https://wa.me/593959739185" },
      // Enlace decodificado del QR proporcionado por el titular.
      { id: "wechat", type: "wechat", label: "We Chat", value: "Conectemos, estés donde estés", href: "https://u.wechat.com/kM4XCsjqok8s8JkjOIqzoJs?s=2" },
    ],
  },
];

export function getPresentationCard(slug) {
  return presentationCards.find(card => card.slug === slug);
}

export function getCardLinks(card) {
  return (card.links ?? []).filter(link => link.href);
}

export function getCardInitials(name) {
  return name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join("");
}
