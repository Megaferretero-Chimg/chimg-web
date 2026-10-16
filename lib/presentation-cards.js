/**
 * Colección estática de tarjetas. Los canales pertenecen a la persona, no al cargo.
 * Todas usan PresentationCard: modificar el diseño allí actualiza cada tarjeta.
 * Obligatorios: slug (único, para la URL) y name.
 * Opcionales: role, company, location, countryCode, photo, givenName, familyName, links.
 * Omitir role/location oculta esos campos; countryCode EC añade la bandera de Ecuador.
 * Añadir una persona requiere únicamente otro objeto en esta colección.
 * photo: ruta local opcional en public/. Sin foto se muestran iniciales.
 * links: { id, type, label, value?, href?, phoneNumber?, qrImage? }[]
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
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (305) 954-3394", phoneNumber: "+13059543394", href: "https://u.wechat.com/kLxOzwbpzuGuDYsdTMRLpmQ?s=2", qrImage: "/business-cards/cesar-a-chiluisa/wechat-qr-v2.png" },
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
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (786) 769-4053", phoneNumber: "+17867694053", href: "https://u.wechat.com/kLsoiQK67GzSApm6kSmcgs4?s=2", qrImage: "/business-cards/ashley-chiluisa/wechat-qr.png" },
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
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (305) 954-3202", phoneNumber: "+13059543202", href: "https://u.wechat.com/kIaSjbkkTh2rJkXwFWipzwQ?s=2", qrImage: "/business-cards/cesar-chiluisa/wechat-qr-v2.png" },
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
      { id: "wechat", type: "wechat", label: "We Chat", value: "+1 (786) 351-0480", phoneNumber: "+17863510480", href: "https://u.wechat.com/kJAcud2Z-F7n57t7lNODxto?s=2", qrImage: "/business-cards/rosa-rodriguez/wechat-qr-v2.png" },
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
      { id: "wechat", type: "wechat", label: "We Chat", value: "+593 959739185", phoneNumber: "+593959739185", href: "https://u.wechat.com/kDgKMx8qk5V0wvY5VeUx38I?s=2", qrImage: "/business-cards/michelle-chiluisa/wechat-qr-v2.png" },
    ],
  },
  {
    "slug": "bastidas-velasco-patricia-alexandra",
    "name": "Patricia Alexandra Bastidas Velasco",
    "givenName": "Patricia Alexandra",
    "familyName": "Bastidas Velasco",
    "role": "Auxiliar Pago a Proveedores",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/bastidas-velasco-patricia-alexandra/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "pagos@megachimg.com",
        "href": "mailto:pagos@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 939055351",
        "href": "https://wa.me/593939055351"
      }
    ]
  },
  {
    "slug": "guaman-pintado-maria-fernanda",
    "name": "María Fernanda Guamán Pintado",
    "givenName": "María Fernanda",
    "familyName": "Guamán Pintado",
    "role": "Auxiliar de Ingreso de Compras",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/guaman-pintado-maria-fernanda/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "compras3@megachimg.com",
        "href": "mailto:compras3@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 939055569",
        "href": "https://wa.me/593939055569"
      }
    ]
  },
  {
    "slug": "gutierrez-bonilla-jeaneth-paulina",
    "name": "Jeaneth Paulina Gutiérrez Bonilla",
    "givenName": "Jeaneth Paulina",
    "familyName": "Gutiérrez Bonilla",
    "role": "Contadora General",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/gutierrez-bonilla-jeaneth-paulina/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "contabilidad@megachimg.com",
        "href": "mailto:contabilidad@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 995800276",
        "href": "https://wa.me/593995800276"
      }
    ]
  },
  {
    "slug": "jaya-cuipallo-adriana-elizabeth",
    "name": "Adriana Elizabeth Jaya Cuipallo",
    "givenName": "Adriana Elizabeth",
    "familyName": "Jaya Cuipallo",
    "role": "Auxiliar Financiera",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/jaya-cuipallo-adriana-elizabeth/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "auxiliarcontable@megachimg.com",
        "href": "mailto:auxiliarcontable@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 991404622",
        "href": "https://wa.me/593991404622"
      }
    ]
  },
  {
    "slug": "mejia-moya-andrea-fernanda",
    "name": "Andrea Fernanda Mejía Moya",
    "givenName": "Andrea Fernanda",
    "familyName": "Mejía Moya",
    "role": "Coordinador de Compras Nacionales",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/mejia-moya-andrea-fernanda/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "compras1@megachimg.com",
        "href": "mailto:compras1@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 980218111",
        "href": "https://wa.me/593980218111"
      }
    ]
  },
  {
    "slug": "proano-lizano-daniela-paola",
    "name": "Daniela Paola Proaño Lizano",
    "givenName": "Daniela Paola",
    "familyName": "Proaño Lizano",
    "role": "Auxiliar de Cartera Crédito y Cobranza",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/proano-lizano-daniela-paola/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "cartera@megachimg.com",
        "href": "mailto:cartera@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 939055260",
        "href": "https://wa.me/593939055260"
      }
    ]
  },
  {
    "slug": "soto-de-la-cruz-diego-alejandro",
    "name": "Diego Alejandro Soto de la Cruz",
    "givenName": "Diego Alejandro",
    "familyName": "Soto de la Cruz",
    "role": "Jefe de Bodega",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/soto-de-la-cruz-diego-alejandro/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "bodega@megachimg.com",
        "href": "mailto:bodega@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 999725864",
        "href": "https://wa.me/593999725864"
      }
    ]
  },
  {
    "slug": "valencia-villacres-fernanda-de-los-angeles",
    "name": "Fernanda de los Ángeles Valencia Villacrés",
    "givenName": "Fernanda de los Ángeles",
    "familyName": "Valencia Villacrés",
    "role": "Auxiliar de Talento Humano",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/valencia-villacres-fernanda-de-los-angeles/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "talentohumano@megachimg.com",
        "href": "mailto:talentohumano@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 999625339",
        "href": "https://wa.me/593999625339"
      }
    ]
  },
  {
    "slug": "rodriguez-dias-leydi-rubi",
    "name": "Leydi Rubí Rodríguez Dias",
    "givenName": "Leydi Rubí",
    "familyName": "Rodríguez Dias",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/rodriguez-dias-leydi-rubi/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 997930386",
        "href": "https://wa.me/593997930386"
      }
    ]
  },
  {
    "slug": "acosta-rivera-jeferson-alexander",
    "name": "Jeferson Alexander Acosta Rivera",
    "givenName": "Jeferson Alexander",
    "familyName": "Acosta Rivera",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/acosta-rivera-jeferson-alexander/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 996293269",
        "href": "https://wa.me/593996293269"
      }
    ]
  },
  {
    "slug": "barragan-barrionuevo-zaida-magali",
    "name": "Zaida Magali Barragán Barrionuevo",
    "givenName": "Zaida Magali",
    "familyName": "Barragán Barrionuevo",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/barragan-barrionuevo-zaida-magali/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 939055327",
        "href": "https://wa.me/593939055327"
      }
    ]
  },
  {
    "slug": "gamboa-yancha-felipe-valentin",
    "name": "Felipe Valentín Gamboa Yancha",
    "givenName": "Felipe Valentín",
    "familyName": "Gamboa Yancha",
    "role": "Jefe de Sucursal",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/gamboa-yancha-felipe-valentin/portrait.png",
    "links": [
      {
        "id": "email",
        "type": "email",
        "label": "Correo electrónico",
        "value": "fgamboa@megachimg.com",
        "href": "mailto:fgamboa@megachimg.com"
      },
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 987598782",
        "href": "https://wa.me/593987598782"
      }
    ]
  },
  {
    "slug": "gonzalez-grijalva-monica-graciela",
    "name": "Mónica Graciela González Grijalva",
    "givenName": "Mónica Graciela",
    "familyName": "González Grijalva",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/gonzalez-grijalva-monica-graciela/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 999723966",
        "href": "https://wa.me/593999723966"
      }
    ]
  },
  {
    "slug": "medina-jimenez-mayra-cristina",
    "name": "Mayra Cristina Medina Jiménez",
    "givenName": "Mayra Cristina",
    "familyName": "Medina Jiménez",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/medina-jimenez-mayra-cristina/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 997931637",
        "href": "https://wa.me/593997931637"
      }
    ]
  },
  {
    "slug": "mera-quintanilla-angel-geovanni",
    "name": "Ángel Geovanni Mera Quintanilla",
    "givenName": "Ángel Geovanni",
    "familyName": "Mera Quintanilla",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/mera-quintanilla-angel-geovanni/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 939055353",
        "href": "https://wa.me/593939055353"
      }
    ]
  },
  {
    "slug": "pesantez-rodriguez-ronald-gabriel",
    "name": "Ronald Gabriel Pesantez Rodríguez",
    "givenName": "Ronald Gabriel",
    "familyName": "Pesantez Rodríguez",
    "role": "Asesor de Ventas",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/pesantez-rodriguez-ronald-gabriel/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 939056126",
        "href": "https://wa.me/593939056126"
      }
    ]
  },
  {
    "slug": "toscano-zapata-javier-ricardo",
    "name": "Javier Ricardo Toscano Zapata",
    "givenName": "Javier Ricardo",
    "familyName": "Toscano Zapata",
    "role": "Coordinador de Logística",
    "company": "Mega CHIMG",
    "location": "Ambato - Ecuador",
    "countryCode": "EC",
    "photo": "/business-cards/toscano-zapata-javier-ricardo/portrait.png",
    "links": [
      {
        "id": "whatsapp",
        "type": "whatsapp",
        "label": "WhatsApp",
        "value": "+593 984224764",
        "href": "https://wa.me/593984224764"
      }
    ]
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
