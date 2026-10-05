// Shared product-family names for both branch galleries.
const families = {
  "Jardinería": ["Jardinería"], "Jardín y limpieza": ["Jardinería", "Hogar y Decoración"],
  "Maquinaria": ["Maquinaria Industrial"], "Maquinaria y compresores": ["Maquinaria Industrial"],
  "Herramientas": ["Herramientas", "Herramienta Eléctrica"], "Herramientas manuales y eléctricas": ["Herramientas", "Herramienta Eléctrica"],
  "Bodega y construcción": ["Materiales de construcción"], "Construcción y drenaje": ["Materiales de construcción"],
  "Pintura y adhesivos": ["Pintura"], "Pintura y accesorios": ["Pintura"], "Pegamentos y selladores": ["Herrajería"],
  "Pisos y revestimientos": ["Pisos"], "Pisos flotantes": ["Pisos"],
  "Ferretería": ["Herrajería"], "Ferretería y fijaciones": ["Herrajería"], "Cerraduras y cajas fuertes": ["Herrajería"], "Seguridad industrial": ["Herrajería"],
  "Plomería y tubería": ["Plomería"], "Electricidad e iluminación": ["Electricidad", "Iluminación"], "Electricidad y cables": ["Electricidad"], "Iluminación y energía solar": ["Iluminación"],
  "Cocinas y electrodomésticos": ["Cocina", "Electrodomésticos"], "Cocinas": ["Cocina"], "Fregaderos de cocina": ["Cocina", "Plomería"],
  "Grifería": ["Plomería", "Baño"], "Grifería y duchas": ["Plomería", "Baño"], "Baños y lavamanos": ["Baño"], "Sanitarios y lavamanos": ["Baño"], "Ambientes de baño": ["Baño"],
  "Limpieza": ["Hogar y Decoración"], "Balanzas": ["Hogar y Decoración"], "Salas y comedores": ["Hogar y Decoración"], "Parrillas": ["Hogar y Decoración"], "Vajillas y hogar": ["Hogar y Decoración"], "Camas y ropa de cama": ["Hogar y Decoración"], "Alfombras": ["Hogar y Decoración"],
};
export const productCategories = ["Jardinería", "Herramienta Eléctrica", "Maquinaria Industrial", "Hogar y Decoración", "Herramientas", "Materiales de construcción", "Pintura", "Pisos", "Herrajería", "Plomería", "Electricidad", "Electrodomésticos", "Baño", "Iluminación", "Cocina"];
export function organizePhotos(photos) {
  return photos.map(photo => ({ ...photo, categories: [...new Set(photo.categories.flatMap(category => families[category] || [category]))] }));
}
export function photoCategories(photos) {
  return ["Todas", ...productCategories.filter(category => photos.some(photo => photo.categories.includes(category)))];
}
