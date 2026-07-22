/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: "npm run build" genera la carpeta "out/"
  // lista para subir directamente a Hostinger (no requiere Node en el servidor).
  output: 'export',

  // En hosting estático no existe el servidor de optimización de imágenes de Next,
  // por eso se desactiva. Las imágenes ya vienen redimensionadas y comprimidas.
  images: {
    unoptimized: true,
    // picsum.photos: placeholders temporales de la sección "Nuestra Empresa".
    // Se quita cuando lleguen las fotos reales del cliente.
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },

  // Genera rutas con barra final (carpeta/index.html), el formato
  // que mejor funciona en servidores Apache como el de Hostinger.
  trailingSlash: true,
};

export default nextConfig;
