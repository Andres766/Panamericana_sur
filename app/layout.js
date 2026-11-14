import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// IDs de medición para las campañas (cotización: "Facebook Pixel y
// Google Analytics para medir las campañas"). Se configuran por
// variables de entorno; si no están definidas, no se carga nada.
// Ver .env.example para saber de dónde salen.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // Google Analytics 4 (G-XXXXXXXXXX)
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID; // Meta/Facebook Pixel (solo números)

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
  title: 'Panamericana Sur | Importadora Allianz — Construcción, cubiertas y acabados',
  description:
    'Importadores directos de tejas UPVC termoacústicas, WPC para interiores y exteriores y paneles UV tipo mármol. Precios competitivos, asesoría personalizada y envíos a diferentes regiones de Colombia. Cotiza por WhatsApp: 315 605 5016.',

  // Tarjeta que se muestra al compartir el enlace (WhatsApp, Facebook...)
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Panamericana Sur | Importadora Allianz',
    title: 'Panamericana Sur | Importadora Allianz — Construcción, cubiertas y acabados',
    description:
      'Importadores directos de tejas UPVC, WPC y paneles UV tipo mármol. Cotiza por WhatsApp: 315 605 5016.',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Panamericana Sur | Importadora Allianz — Soluciones para construcción, cubiertas y acabados',
      },
    ],
  },

  // Misma tarjeta para X/Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Panamericana Sur | Importadora Allianz — Construcción, cubiertas y acabados',
    description:
      'Importadores directos de tejas UPVC, WPC y paneles UV tipo mármol. Cotiza por WhatsApp: 315 605 5016.',
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

        {/* Google Analytics 4: solo se carga si NEXT_PUBLIC_GA_ID está definida.
            strategy="afterInteractive" no bloquea la carga de la página. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta (Facebook) Pixel: solo se carga si NEXT_PUBLIC_FB_PIXEL_ID
            está definida. Mide visitas para las campañas de Facebook/Instagram. */}
        {FB_PIXEL_ID && (
          <>
            <Script id="facebook-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
