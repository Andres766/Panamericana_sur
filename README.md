# Landing Page — Panamericana Sur | Importadora Allianz

Landing page construida con **Next.js 14 (App Router)** y **Tailwind CSS**.
Incluye un **asistente virtual con IA (Google Gemini)** que responde preguntas
de los clientes. Las cotizaciones se envían por WhatsApp.

> ⚠️ **Importante:** por el asistente con IA, el sitio ya **no** es 100% estático:
> necesita una función de servidor (`app/api/chat`). Por eso se despliega en
> **Vercel** (gratis), no en el hosting estático de Hostinger. El resto del sitio
> sigue siendo rapidísimo; solo el chat usa el servidor.

## 🖥️ Correr el proyecto localmente

```bash
npm install                 # solo la primera vez
cp .env.example .env.local  # y pon tu GEMINI_API_KEY (ver más abajo)
npm run dev                 # abre http://localhost:3000
```

El sitio funciona sin la clave; solo el chat mostrará "asistente no configurado"
hasta que agregues `GEMINI_API_KEY` en `.env.local`.

Para probar la versión de producción localmente:

```bash
npm run build
npm start       # http://localhost:3000
```

## 🚀 Desplegar en Vercel

1. Sube el proyecto a GitHub (si aún no está).
2. Entra a [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
3. Vercel detecta Next.js solo. **No cambies nada de la configuración.**
4. En **Settings → Environment Variables** agrega:
   - `GEMINI_API_KEY` = tu clave de [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
5. **Deploy.** En ~2 minutos el sitio queda en línea con el chat funcionando.

Cada `git push` vuelve a desplegar solo. Para el dominio propio: proyecto →
**Settings → Domains** → agrega el dominio y sigue los pasos de DNS. Recuerda
actualizar `metadataBase` en `app/layout.js` con el dominio real.

## 📷 Estado de las imágenes

La mayoría de las imágenes ya son REALES (tomadas del catálogo oficial del
cliente). Para cambiar cualquiera, **reemplaza el archivo manteniendo el
mismo nombre** (no hay que tocar el código) y vuelve a ejecutar `npm run build`:

| Carpeta | Archivos | Estado |
| --- | --- | --- |
| `public/images/productos/` | 14 renders del catálogo (`teja-upvc-colonial.jpg`, …) + 6 líneas nuevas (`panel-wpc-interior.jpg`, `panel-wpc-exterior.jpg`, `lamina-uv-marmol.jpg`, `lamina-policarbonato-cristal.jpg`, `tanque-acero-galvanizado.jpg`, `contenedores.jpg`) | ✔ Reales los 14 del catálogo · ✔ 5 de las 6 nuevas son fotos de ambiente enviadas por el cliente · ⏳ `contenedores.jpg` sigue provisional (mismo nombre) |
| `public/images/galeria/` | `foto1.jpg` … `foto15.jpg` | ✔ Reales: 15 fotos de obras con lugar, producto y área (ver `data/gallery.js`). Para agregar más, copia `foto16.jpg`… y añade su objeto en `data/gallery.js` |
| `public/images/empresa/` | `empresa1.jpg` … `empresa8.jpg` | ✔ Reales: punto de venta, bodega, importación y despachos (nov 2026) |
| `public/images/logos/` | `logo-*.png` | ✔ Reales |

> El hero ya no usa carrusel de fotos: ahora es un fondo de marca (navy con el símbolo de la marca). Por eso se eliminó la carpeta `public/images/hero/`.

Fotos reales de la galería: `foto1` Colegio San Felipe Neri (680 m²) · `foto2`
Parque Bolívar (620 m²) · `foto3` y `foto7` Plaza de comidas Gourmet (Morasurco) ·
`foto4` y `foto5` Colegio San Juan de Pasto · `foto6` descarga de contenedor ·
`foto8` y `foto9` obra Sandoná (colonial) · `foto10` El Encano (920 m²) ·
`foto11` Jongovito (740 m²) · `foto12` Bellavista, Catambuco (740 m²) ·
`foto13` y `foto14` Obra Fuertes Mejía · `foto15` Bellavista terminado. Todas
las obras en teja blanca son cresta alta 2.5 mm, 11.80 × 1.07 m (confirmado
por el cliente).

La galería también incluye 2 **videos de obras** (Morasurco y Alto Putumayo),
que viven en `public/videos/` y se reproducen en el lightbox.

Los originales del cliente (fotos y videos en alta resolución, organizados por
obra) están en `material-cliente/` (no se sube a git ni al deploy). El video
que el cliente pidió no usar quedó en `material-cliente/descartado/`.

El archivo original de cada producto está en
`C:\Users\andse\Downloads\productos_panamericana\` y el mapeo completo en
`scripts/procesar-imagenes.ps1` (script que las redimensionó para la web).

## ✏️ Textos y datos editables

| Archivo | Qué se edita |
| --- | --- |
| `data/site.js` | Teléfonos, WhatsApp, ciudad, horario, URL del mapa, redes sociales |
| `data/products.js` | Nombres, medidas, colores y descripciones de los 20 productos (14 del catálogo + 6 líneas nuevas de nov 2026) |
| `data/gallery.js` | Textos alternativos de la galería |
| `data/empresa.js` | Fotos de la sección "Nuestra Empresa" (reales desde nov 2026) |
| `tailwind.config.js` | Colores de marca (navy, naranja, verde, gris) |

### Actualizar el mapa de Google

Cuando el cliente confirme la dirección exacta del local:

1. Búscala en Google Maps → **Compartir → Insertar un mapa**.
2. Copia la URL que aparece en el atributo `src="…"` del iframe.
3. Pégala en el campo `mapaEmbed` de `data/site.js`.

## 📈 Google Analytics y Facebook Pixel

El sitio trae integradas las dos herramientas de medición de campañas; solo
hay que poner los IDs como variables de entorno (en `.env.local` y en Vercel):

| Variable | Dónde se obtiene |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | [analytics.google.com](https://analytics.google.com) → Administrar → Flujos de datos (ID "G-…") |
| `NEXT_PUBLIC_FB_PIXEL_ID` | [business.facebook.com](https://business.facebook.com) → Administrador de eventos (ID numérico) |

Si una variable no está definida, ese script **no se carga** (no afecta la
velocidad ni la privacidad hasta que el cliente cree las cuentas).

## 🤖 Asistente virtual (IA con Google Gemini)

El chat flotante (abajo a la izquierda) responde preguntas sobre las tejas,
medidas, instalación, envíos, etc.

- **Cómo funciona:** el widget ([components/ChatBot.jsx](components/ChatBot.jsx))
  llama a la función [app/api/chat/route.js](app/api/chat/route.js), que corre en
  el servidor (Vercel) y habla con Google Gemini (vía su API REST). La clave
  secreta vive solo en el servidor, nunca en el navegador.
- **Conocimiento del asistente:** está en [lib/promptAsistente.js](lib/promptAsistente.js)
  (datos del negocio y respuestas técnicas, tomados del catálogo). Edítalo para
  cambiar lo que sabe o el tono.
- **Modelo y costo:** usa `gemini-2.0-flash` (rápido y económico). El cliente paga
  el consumo a Google. Para más calidad, cambia `MODELO` en `route.js` a un modelo
  "pro" (más costoso).
- **Clave:** define `GEMINI_API_KEY` en `.env.local` (local) y en las variables de
  entorno de Vercel (producción). Se obtiene gratis en
  [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Ver `.env.example`.

## 📁 Estructura

```
app/            Layout, página principal, estilos y la API del chat (app/api/chat)
components/     Una sección de la landing por archivo + ChatBot
data/           Datos editables (productos, galería, empresa, negocio)
lib/            Conocimiento del asistente (promptAsistente.js)
public/         Imágenes (logos, productos, galería)
```
