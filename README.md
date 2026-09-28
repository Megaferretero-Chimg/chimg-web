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

- `app/(site)/page.js`: portada y accesos a las páginas principales.
- `app/(site)/about/page.js`: presentación e historia de la empresa.
- `app/(site)/product-lines/page.js`: índice de las cinco líneas.
- `app/(site)/services/page.js`: servicios y atención comercial.
- `app/(site)/contact/page.js`: locales, horarios y formulario de WhatsApp.
- `app/(site)/product-lines/[slug]/page.js`: páginas estáticas por línea, con metadatos y galerías.
- `app/layout.js`: idioma, metadatos y acceso al contenido. `app/(site)/layout.js`: cabecera, pie y animaciones del sitio corporativo.
- `app/globals.scss`: variables de marca y estilos base.
- `components/`: cabecera responsive, pie, iconos y formulario de consulta.
- `lib/site.js`: fuente única de datos de empresa, locales, líneas y enlaces de WhatsApp.
- `public/`: recursos originales proporcionados por el cliente; no modificados.

Los estilos corporativos compartidos están en `styles/corporate.module.scss`; los componentes y las páginas de detalle usan sus propios módulos SCSS. Cada página principal tiene URL, título y descripción propios. La navegación utiliza rutas reales, con indicador de página actual. Se usan fuentes del sistema, sin descargas externas.

## Contenido y contacto

Las URLs de navegación están en inglés: `/about`, `/product-lines`, `/services`, `/contact` y `/business-cards`. Las líneas usan los slugs `home-living`, `finishes`, `machinery`, `construction` y `hardware`. Los enlaces internos y anclas usan estas convenciones. El contenido visible sigue en español. `next.config.mjs` redirige permanentemente (308) las rutas anteriores en español, incluidas las tarjetas y las cinco líneas, a sus destinos actuales.

Las cinco líneas confirmadas son Hogar, Acabados, Maquinaria, Construcción y Ferretería. La información de experiencia, servicios, teléfono y locales procede del tríptico entregado por el cliente. Las fotografías son ilustrativas de las líneas; no se presentan como fichas de productos con inventario confirmado.

El formulario valida el nombre, la línea y el mensaje, y prepara un enlace de WhatsApp. El visitante revisa el mensaje y lo envía desde WhatsApp. La web no envía mensajes, no guarda consultas y no simula un envío exitoso.

Los enlaces de ubicación abren una búsqueda en Google Maps con la dirección del tríptico. Antes de publicar, confirmar la numeración de la matriz (15165 en el documento), horarios, teléfono y condiciones de los servicios. No se han inventado correos, contactos personales, certificaciones ni códigos de WeChat.

## Tarjetas de presentación

- `/business-cards`: directorio del equipo, accesible desde Contacto.
- `/business-cards/michelle-chiluisa`: primera tarjeta individual, basada en los datos de la referencia entregada.
- `lib/presentation-cards.js`: colección estática de personas. Cada registro tiene `slug` único, `name`, `role`, `company`, `location` opcional, `photo` opcional y `links`.
- `components/presentation-card.js`: plantilla común responsive. El cargo es texto y no determina qué canales puede usar una persona.

Para agregar una persona, añade un objeto a `presentationCards` con un `slug` estable en minúsculas y guiones. Las páginas y sus metadatos se generan durante la compilación; después de cambiar la colección hay que volver a compilar y desplegar. Los slugs no registrados devuelven 404.

Cada entrada de `links` lleva `id` único dentro de la tarjeta, `type`, `label`, `href` y opcionalmente `value`. Se muestra únicamente si tiene enlace. Para vendedores sin WeChat, basta con omitir esa entrada; no hay botones vacíos. Se admiten enlaces telefónicos `tel:`, correos `mailto:` y URLs HTTPS. Usar únicamente destinos revisados y recursos locales.

Ejemplo de canal opcional con enlace directo:

```js
{ id: "wechat", type: "wechat", label: "We Chat", href: "https://u.wechat.com/kM4XCsjqok8s8JkjOIqzoJs?s=2" }
```

Las imágenes se guardan en `public/business-cards/<slug>/` y se referencian como `/business-cards/<slug>/foto.jpg` o `/business-cards/<slug>/wechat.png`. Sin fotografía se muestran iniciales. La tarjeta de Michelle usa la fotografía proporcionada y mejorada en `public/business-cards/michelle-chiluisa/portrait-enhanced-v1.png`. El enlace de WeChat se decodificó del QR individual proporcionado por el titular; no se ha recreado el QR. WhatsApp usa el teléfono mostrado en la tarjeta como contacto directo, sin afirmar que se haya decodificado su QR.

## Evolución a tienda

Las líneas tienen identificadores estables (`slug`), rutas propias y datos separados de la presentación. La siguiente etapa puede añadir productos asociados a cada línea (SKU, descripción, imágenes, especificaciones y variantes), conservando esta navegación.

Carrito, stock, precios, pagos, cuentas y gestión de pedidos requieren una implementación posterior y conexión a los sistemas comerciales. No están implementados en esta etapa corporativa.

## Banner de sucursales

`components/home-hero.js` alterna Ambato y Salcedo cada 8 segundos. Durante 950 ms, un frente diagonal avanza de abajo a la izquierda hacia arriba a la derecha: deforma la fotografía en partículas y reconstruye la siguiente imagen mediante Canvas, con un mosaico fotográfico opaco que cubre los espacios entre fragmentos. El texto y los botones permanecen fijos. Los controles permiten seleccionar la sucursal y pausar o reanudar el ciclo; elegir manualmente pausa la reproducción.

El efecto decorativo se dibuja en Canvas solo durante el cambio, con menos partículas en móvil y sin interferir con los clics. La reproducción espera a que ambas imágenes estén cargadas, se detiene con la pestaña oculta y respeta `prefers-reduced-motion`. Cada sucursal tiene una composición vertical para móvil. Los PNG originales y los prompts de ImageGen se conservan en `output/banners/`, sin modificar `public/`.


Las tarjetas individuales usan una vista independiente de pantalla completa, sin cabecera, pie ni navegación corporativa. El botón «Visita CHIMG» lleva a la portada. En móvil se presenta una sola tarjeta con dos páginas, presentación y contacto, ajustada a la altura visible del dispositivo. El directorio permanece dentro del layout corporativo. Las URLs no cambian al organizar las páginas en el grupo `(site)`.

### Presentación interactiva

La tarjeta usa el banner existente de Ambato como fondo fijo, sin selector de sucursales. Incluye entrada escalonada de los contactos, estados de foco y hover, un único acceso a WhatsApp, enlace directo de We Chat y copia del enlace con confirmación o mensaje de error. Las animaciones se desactivan con `prefers-reduced-motion`. Por debajo de 700 px se usa una tarjeta de dos páginas con transición horizontal, gesto táctil lateral, botones de navegación y flechas de teclado. La vista usa 100dvh y respeta las áreas seguras del dispositivo. La página oculta queda inerte. En alturas extremas o con texto ampliado, el contenido puede desplazarse dentro de la tarjeta para mantener todos los controles accesibles.

Guardar contacto descarga una vCard (.vcf) generada desde los datos estáticos: nombre, apellido, empresa, cargo, teléfono y correo. El orden de acciones es Guardar contacto, Correo electrónico, WhatsApp y We Chat.
