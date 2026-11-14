/** @type {import('next').NextConfig} */
const nextConfig = {
  // El sitio se despliega en Vercel (ya no como exportación estática),
  // porque el asistente con IA usa una función de servidor: app/api/chat.
  // Por eso se quitó `output: 'export'` y `trailingSlash` (este último
  // redirige los POST y rompería la llamada al chat).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
