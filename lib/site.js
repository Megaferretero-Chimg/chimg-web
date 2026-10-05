import { ambatoPhotos } from "./ambato-gallery";
import { salcedoPhotos } from "./salcedo-gallery";
// Datos comerciales del tríptico de CHIMG. Fuente única para la web y el futuro catálogo.
export const company = { name: "CHIMG", phone: "+593 99 931 7143", phoneHref: "tel:+593999317143", whatsapp: "593999317143" };
export function whatsappUrl(message = "Hola, CHIMG. Me gustaría recibir información para mi proyecto.") {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const branches = [
  { name: "Ambato", type: "Matriz", address: "Av. Rodrigo Pachano 15165 y La Delicia", weekdays: "Lunes a viernes · 07:00–19:00", saturday: "Sábados · 08:00–18:00", sunday: "Domingos · 08:00–14:00", mapQuery: "Mega Ferretero CHIMG Av. Rodrigo Pachano La Delicia Ambato Ecuador" },
  { name: "Salcedo", type: "Sucursal", address: "Ricardo Garcés y Belisario Quevedo", weekdays: "Lunes a viernes · 08:00–18:00", saturday: "Sábados · 08:00–18:00", sunday: "Domingos · 08:00–14:00", mapQuery: "CHIMG Ricardo Garces Belisario Quevedo Salcedo Ecuador" },
];
const photos = [...ambatoPhotos, ...salcedoPhotos];
const galleryFor = category => photos.filter(photo => photo.categories.includes(category)).map(photo => ({ src: photo.src, alt: category }));
export const lines = [
 { slug: "home-living", name: "Hogar y Decoración", icon: "home", short: "Espacios que se sienten tuyos.", title: "Dale vida a tu espacio.", description: "Muebles, textiles y detalles para equipar y decorar tu hogar.", image: "/imgs/sucursales/ambato/DSC00765.webp", alt: "Hogar y Decoración", categories: ["Hogar y Decoración"], gallery: galleryFor("Hogar y Decoración") },
 { slug: "power-tools", name: "Herramienta Eléctrica", icon: "drill", short: "Potencia para cada tarea.", title: "Herramienta Eléctrica", description: "Encuentra herramientas y equipos para acompañarte en tus trabajos y proyectos.", image: "/imgs/sucursales/ambato/DSC00712.webp", alt: "Herramienta Eléctrica", categories: ["Herramienta Eléctrica", "Herramientas"], gallery: galleryFor("Herramienta Eléctrica") },
 { slug: "machinery", name: "Maquinaria Industrial", icon: "machinery", short: "Equipos para grandes proyectos.", title: "Maquinaria Industrial", description: "Maquinaria, compresores y equipos de trabajo. Consulta las opciones y disponibilidad con nuestro equipo.", image: "/imgs/sucursales/ambato/DSC00679.webp", alt: "Maquinaria Industrial", categories: ["Maquinaria Industrial"], gallery: galleryFor("Maquinaria Industrial") },
 { slug: "lawn-garden", name: "Jardinería", icon: "garden", short: "Todo para tus espacios verdes.", title: "Jardinería", description: "Herramientas, equipos y accesorios para cuidar tu jardín y tus espacios exteriores.", image: "/imgs/sucursales/ambato/DSC00674.webp", alt: "Jardinería", categories: ["Jardinería"], gallery: galleryFor("Jardinería") },
];
