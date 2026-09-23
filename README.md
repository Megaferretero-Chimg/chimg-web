# CHIMG Web

Sitio corporativo de CHIMG con Next.js App Router, React, Sass y Lucide React.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

- `npm run lint`: revisión con ESLint.
- `npm run build`: compilación de producción.
- `npm start`: ejecuta la compilación de producción.

## Estructura

- `app/page.js`: portada y accesos a las páginas principales.
- `app/nosotros/page.js`: presentación e historia de la empresa.
- `app/lineas/page.js`: índice de las cinco líneas.
- `app/servicios/page.js`: servicios y atención comercial.
- `app/contacto/page.js`: locales, horarios y formulario de WhatsApp.
- `app/lineas/[slug]/page.js`: páginas estáticas por línea, con metadatos y galerías.
- `app/layout.js`: idioma, metadatos y elementos compartidos.
- `app/globals.scss`: variables de marca y estilos base.
- `components/`: cabecera responsive, pie, iconos y formulario de consulta.
- `lib/site.js`: fuente única de datos de empresa, locales, líneas y enlaces de WhatsApp.
- `public/`: recursos originales proporcionados por el cliente; no modificados.

Los estilos corporativos compartidos están en `styles/corporate.module.scss`; los componentes y las páginas de detalle usan sus propios módulos SCSS. Cada página principal tiene URL, título y descripción propios. La navegación utiliza rutas reales, con indicador de página actual. Se usan fuentes del sistema, sin descargas externas.

## Contenido y contacto

Las cinco líneas confirmadas son Hogar, Acabados, Maquinaria, Construcción y Ferretería. La información de experiencia, servicios, teléfono y locales procede del tríptico entregado por el cliente. Las fotografías son ilustrativas de las líneas; no se presentan como fichas de productos con inventario confirmado.

El formulario valida el nombre, la línea y el mensaje, y prepara un enlace de WhatsApp. El visitante revisa el mensaje y lo envía desde WhatsApp. La web no envía mensajes, no guarda consultas y no simula un envío exitoso.

Los enlaces de ubicación abren una búsqueda en Google Maps con la dirección del tríptico. Antes de publicar, confirmar la numeración de la matriz (15165 en el documento), horarios, teléfono y condiciones de los servicios. No se han inventado correos, contactos personales, certificaciones ni códigos de WeChat.

## Evolución a tienda

Las líneas tienen identificadores estables (`slug`), rutas propias y datos separados de la presentación. La siguiente etapa puede añadir productos asociados a cada línea (SKU, descripción, imágenes, especificaciones y variantes), conservando esta navegación.

Carrito, stock, precios, pagos, cuentas y gestión de pedidos requieren una implementación posterior y conexión a los sistemas comerciales. No están implementados en esta etapa corporativa.

## Banner de sucursales

`components/home-hero.js` alterna Ambato y Salcedo cada 8 segundos. Durante 950 ms, un frente diagonal avanza de abajo a la izquierda hacia arriba a la derecha: deforma la fotografía en partículas y reconstruye la siguiente imagen mediante Canvas, con un mosaico fotográfico opaco que cubre los espacios entre fragmentos. El texto y los botones permanecen fijos. Los controles permiten seleccionar la sucursal y pausar o reanudar el ciclo; elegir manualmente pausa la reproducción.

El efecto decorativo se dibuja en Canvas solo durante el cambio, con menos partículas en móvil y sin interferir con los clics. La reproducción espera a que ambas imágenes estén cargadas, se detiene con la pestaña oculta y respeta `prefers-reduced-motion`. Cada sucursal tiene una composición vertical para móvil. Los PNG originales y los prompts de ImageGen se conservan en `output/banners/`, sin modificar `public/`.

