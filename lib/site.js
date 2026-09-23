// Datos comerciales del tríptico de CHIMG. Fuente única para la web y el futuro catálogo.
export const company = { name: "CHIMG", phone: "+593 99 931 7143", phoneHref: "tel:+593999317143", whatsapp: "593999317143" };
export function whatsappUrl(message = "Hola, CHIMG. Me gustaría recibir información para mi proyecto.") {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const branches = [
  { name: "Ambato", type: "Matriz", address: "Av. Rodrigo Pachano 15165 y La Delicia", weekdays: "Lunes a viernes · 07:00–19:00", saturday: "Sábados · 08:00–18:00", sunday: "Domingos · 08:00–14:00", mapQuery: "Mega Ferretero CHIMG Av. Rodrigo Pachano La Delicia Ambato Ecuador" },
  { name: "Salcedo", type: "Sucursal", address: "Ricardo Garcés y Belisario Quevedo", weekdays: "Lunes a viernes · 08:00–18:00", saturday: "Sábados · 08:00–18:00", sunday: "Domingos · 08:00–14:00", mapQuery: "CHIMG Ricardo Garces Belisario Quevedo Salcedo Ecuador" },
];
export const lines = [
  { slug: "hogar", name: "Hogar", icon: "home", short: "Espacios que se sienten tuyos.", title: "Dale vida a tu espacio.", description: "Muebles y detalles que acompañan tu día a día. Encuentra opciones para hacer de cada ambiente un lugar para compartir y disfrutar.", image: "/imgs/hogar/img2.jpg", alt: "Exhibición de muebles de sala y comedores en CHIMG", categories: ["Muebles de sala", "Comedores", "Decoración"], gallery: [
    { src: "/imgs/hogar/img.jpg", alt: "Sillones y mesas para el hogar", label: "Encuentra tu estilo" },
    { src: "/imgs/hogar/img3.jpg", alt: "Exhibición de cuadros y decoración", label: "Detalles que hacen la diferencia" },
  ] },
  { slug: "acabados", name: "Acabados", icon: "layers", short: "El detalle hace la diferencia.", title: "Tu visión, en cada detalle.", description: "Texturas, superficies y soluciones para transformar tus ambientes. Conoce nuestra línea de acabados y encuentra la combinación para tu proyecto.", image: "/imgs/acabados/img2.jpg", alt: "Showroom de acabados para cocinas y baños de CHIMG", categories: ["Pisos y revestimientos", "Grifería", "Línea sanitaria"], gallery: [
    { src: "/imgs/acabados/img3.jpg", alt: "Muestras de pisos y revestimientos", label: "Texturas para transformar" },
    { src: "/imgs/acabados/img4.jpg", alt: "Exhibición de grifería para baño y cocina", label: "Diseño que se vive" },
    { src: "/imgs/acabados/img.jpg", alt: "Cocina de exhibición de CHIMG", label: "Imagina las posibilidades" },
  ] },
  { slug: "maquinaria", name: "Maquinaria", icon: "drill", short: "Potencia para ir más lejos.", title: "La fuerza detrás de tu obra.", description: "Equipos para acompañar el trabajo en construcción. Consulta con nuestro equipo las características y disponibilidad de la maquinaria que necesitas.", image: "/imgs/maquinaria/img.jpg", alt: "Equipos y maquinaria exhibidos en CHIMG", categories: ["Concreteras", "Compactación", "Motocultores"], gallery: [] },
  { slug: "construccion", name: "Construcción", icon: "brick", short: "La base de grandes proyectos.", title: "Todo empieza con una buena base.", description: "Materiales para cada etapa de tu obra. Te acompañamos a encontrar lo que necesitas para construir, ampliar o renovar.", image: "/imgs/construccion/img2.jpg", alt: "Varillas de acero para construcción en CHIMG", categories: ["Cemento", "Varilla", "Tubería"], gallery: [
    { src: "/imgs/construccion/img.jpg", alt: "Materiales y sacos de cemento en bodega", label: "Materiales para tu próxima obra" },
  ] },
  { slug: "ferreteria", name: "Ferretería", icon: "wrench", short: "Soluciones a la mano.", title: "La herramienta para hacerlo posible.", description: "Herramientas, accesorios y soluciones para profesionales y para los proyectos de cada día. Todo comienza con elegir el equipo adecuado.", image: "/imgs/ferreteria/img3.jpg", alt: "Exhibición de herramientas manuales y eléctricas en CHIMG", categories: ["Herramienta manual y eléctrica", "Pintura", "Electricidad e iluminación", "Herrajería y cerrajería"], gallery: [
    { src: "/imgs/ferreteria/img.jpg", alt: "Pasillo de iluminación y material eléctrico", label: "Soluciones para cada tarea" },
    { src: "/imgs/ferreteria/img2.jpg", alt: "Pasillo de pinturas y accesorios", label: "Renueva tus espacios" },
  ] },
];
