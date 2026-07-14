/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: "npm run build" genera la carpeta "out/"
  // lista para subir directamente a Hostinger (no requiere Node en el servidor).
  output: 'export',

  // En hosting estático no existe el servidor de optimización de imágenes de Next,
  // por eso se desactiva. Las imágenes ya vienen redimensionadas y comprimidas.
  images: {
    unoptimized: true,
  },

  // Genera rutas con barra final (carpeta/index.html), el formato
  // que mejor funciona en servidores Apache como el de Hostinger.
  trailingSlash: true,
};

export default nextConfig;
