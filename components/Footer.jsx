import Image from 'next/image';
import { site } from '@/data/site';

// Redes sociales con sus íconos (URLs pendientes: se editan en data/site.js)
const redes = [
  {
    nombre: 'Facebook',
    href: site.redes.facebook,
    icono: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    nombre: 'Instagram',
    href: site.redes.instagram,
    icono: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    nombre: 'TikTok',
    href: site.redes.tiktok,
    icono: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

/**
 * Pie de página sobre fondo navy con logo, teléfonos,
 * redes sociales y la línea tricolor de la marca.
 */
export default function Footer() {
  return (
    <footer className="bg-navy">
      {/* Franja decorativa tricolor con cortes DIAGONALES,
          como en las piezas gráficas de la marca */}
      <div className="flex h-2 gap-1 overflow-hidden" aria-hidden="true">
        <span className="-ml-2 w-[34%] -skew-x-[30deg] bg-naranja" />
        <span className="w-[33%] -skew-x-[30deg] bg-white" />
        <span className="-mr-2 flex-1 -skew-x-[30deg] bg-verde" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <Image
            src="/images/logos/logo-combinado-blanco.png"
            alt="Panamericana Sur | Importadora Allianz"
            width={280}
            height={51}
            loading="lazy"
            className="h-auto w-64 sm:w-72"
          />

          {/* Teléfonos */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
              Contáctanos
            </h3>
            {site.telefonos.map((telefono) => (
              <a
                key={telefono}
                href={`tel:+57${telefono.replace(/\s/g, '')}`}
                className="block text-lg font-semibold text-white transition-colors hover:text-naranja"
              >
                {telefono}
              </a>
            ))}
          </div>

          {/* Redes sociales.
              Mientras no haya URL real (valor '#'), el ícono se muestra
              sin enlace para que el clic no salte al inicio de la página.
              En cuanto se agregue la URL en data/site.js, el ícono se
              vuelve un enlace que abre en pestaña nueva automáticamente. */}
          <div className="flex gap-3">
            {redes.map((red) =>
              red.href && red.href !== '#' ? (
                <a
                  key={red.nombre}
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={red.nombre}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-naranja"
                >
                  {red.icono}
                </a>
              ) : (
                <span
                  key={red.nombre}
                  title={`${red.nombre} (próximamente)`}
                  className="flex h-11 w-11 cursor-default items-center justify-center rounded-full bg-white/10 text-white"
                >
                  {red.icono}
                </span>
              )
            )}
          </div>
        </div>

        {/* Línea de derechos */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/60">
            © 2026 Panamericana Sur - Importadora Allianz. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
