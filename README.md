# Landing Page — Panamericana Sur | Importadora Allianz

Landing page estática construida con **Next.js 14 (App Router)** y **Tailwind CSS**,
lista para publicarse en Hostinger. Sin backend: todas las cotizaciones se envían
por WhatsApp.

## 🖥️ Correr el proyecto localmente

```bash
npm install     # solo la primera vez
npm run dev     # abre http://localhost:3000
```

Para previsualizar el sitio EXACTAMENTE como quedará en Hostinger
(después de hacer el build):

```bash
npm run build
npm start       # sirve la carpeta out/ en http://localhost:3000
```

## 🚀 Exportar y subir a Hostinger

```bash
npm run build
```

Ese comando genera la carpeta **`out/`** con el sitio estático completo
(HTML, CSS, JS e imágenes). Para publicarlo:

1. Entra al **hPanel de Hostinger → Administrador de archivos**.
2. Abre la carpeta **`public_html/`** (bórrale el contenido si tiene archivos de ejemplo).
3. Sube **todo el CONTENIDO de la carpeta `out/`** (no la carpeta en sí):
   `index.html`, la carpeta `_next/`, la carpeta `images/`, etc.
4. Listo: el sitio queda en línea en tu dominio.

> Consejo: puedes comprimir el contenido de `out/` en un `.zip`, subir ese único
> archivo y usar la opción "Extraer" del administrador de archivos de Hostinger.

## 📷 Estado de las imágenes

La mayoría de las imágenes ya son REALES (tomadas del catálogo oficial del
cliente). Para cambiar cualquiera, **reemplaza el archivo manteniendo el
mismo nombre** (no hay que tocar el código) y vuelve a ejecutar `npm run build`:

| Carpeta | Archivos | Estado |
| --- | --- | --- |
| `public/images/productos/` | 14 renders con nombre descriptivo (`teja-upvc-colonial.jpg`, `cemento-cemex.jpg`, …) | ✔ Reales, del catálogo (páginas 2–15) |
| `public/images/hero/` | `slide1.jpg` … `slide5.jpg` | ✔ Reales: fotos de obras del catálogo |
| `public/images/galeria/` | `foto1.jpg` … `foto6.jpg` | ✔ Reales: obras con nombre de proyecto |
| `public/images/galeria/` | `foto7.jpg` … `foto15.jpg` | ⏳ Provisionales: se reemplazan cuando el cliente envíe más fotos de obras |
| `public/images/logos/` | `logo-*.png` | ✔ Reales |

Fotos reales de la galería: `foto1` Colegio San Felipe Neri · `foto2` Parque
Bolívar · `foto3` Plazoleta de comidas (Morasurco) · `foto4` y `foto5` Colegio
San Juan de Pasto (colonial y policarbonato) · `foto6` descarga de contenedor.

El archivo original de cada producto está en
`C:\Users\andse\Downloads\productos_panamericana\` y el mapeo completo en
`scripts/procesar-imagenes.ps1` (script que las redimensionó para la web).

## ✏️ Textos y datos editables

| Archivo | Qué se edita |
| --- | --- |
| `data/site.js` | Teléfonos, WhatsApp, ciudad, horario, URL del mapa, redes sociales |
| `data/products.js` | Nombres, medidas y descripciones de los 14 productos del catálogo |
| `data/gallery.js` | Textos alternativos de la galería |
| `data/slides.js` | Textos alternativos del carrusel |
| `tailwind.config.js` | Colores de marca (navy, naranja, verde, gris) |

### Actualizar el mapa de Google

Cuando el cliente confirme la dirección exacta del local:

1. Búscala en Google Maps → **Compartir → Insertar un mapa**.
2. Copia la URL que aparece en el atributo `src="…"` del iframe.
3. Pégala en el campo `mapaEmbed` de `data/site.js`.

## 📁 Estructura

```
app/          Layout, página principal y estilos globales
components/   Una sección de la landing por archivo
data/         Datos editables (productos, galería, slides, negocio)
public/       Imágenes (logos, hero, productos, galería)
out/          ← Resultado del build: esto es lo que se sube a Hostinger
```
