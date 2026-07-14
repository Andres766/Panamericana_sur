import { Montserrat } from 'next/font/google';
import './globals.css';

// Fuente Montserrat desde Google Fonts.
// display: 'swap' evita que la fuente bloquee el renderizado inicial.
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Metadatos de la página (título y descripción para buscadores y redes).
// IMPORTANTE: cuando el cliente confirme su dominio, cámbialo en
// metadataBase — de él salen las URLs absolutas que usan WhatsApp
// y las redes para mostrar la tarjeta con imagen al compartir el link.
export const metadata = {
  metadataBase: new URL('https://panamericanasur.com'),
  title: 'Panamericana Sur | Importadora Allianz — Teja UPVC en Colombia',
  description:
    'Importadores directos de Teja UPVC para viviendas, bodegas, fincas y locales comerciales. Precios competitivos, asesoría técnica y entregas a todo el sur de Colombia. Cotiza por WhatsApp: 315 605 5016.',

  // Tarjeta que se muestra al compartir el enlace (WhatsApp, Facebook...)
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Panamericana Sur | Importadora Allianz',
    title: 'Panamericana Sur | Importadora Allianz — Teja UPVC en Colombia',
    description:
      'Importadores directos de Teja UPVC. Cotiza por WhatsApp: 315 605 5016.',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Panamericana Sur | Importadora Allianz — Teja UPVC',
      },
    ],
  },

  // Misma tarjeta para X/Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Panamericana Sur | Importadora Allianz — Teja UPVC en Colombia',
    description:
      'Importadores directos de Teja UPVC. Cotiza por WhatsApp: 315 605 5016.',
    images: ['/images/og.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="bg-white font-sans text-navy antialiased">
        {/* Sin JavaScript el IntersectionObserver de <Reveal> nunca corre:
            este respaldo muestra todo el contenido para que la página
            siga siendo legible (la animación simplemente no ocurre). */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
