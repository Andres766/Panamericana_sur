/** @type {import('next').NextConfig} */
const nextConfig = {
  // El sitio se despliega en Vercel (ya no como exportación estática),
  // porque el asistente con IA usa una función de servidor: app/api/chat.
  // Por eso se quitó `output: 'export'` y `trailingSlash` (este último
  // redirige los POST y rompería la llamada al chat).
  images: {
    unoptimized: true,
    // picsum.photos: placeholders temporales de la sección "Nuestra Empresa".
    // Se quita cuando lleguen las fotos reales del cliente.
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
};

export default nextConfig;
