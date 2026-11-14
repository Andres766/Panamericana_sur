import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import { linkWhatsApp } from '@/data/site';

/**
 * Hero principal: fondo de marca (sin carrusel de fotos).
 * - Degradado navy con el símbolo de la marca como marca de agua gigante.
 * - Barras diagonales tricolor decorativas.
 * - Eslogan, subtítulo y botones de acción.
 * El texto entra con una animación suave (CSS) coordinada con la
 * pantalla de carga. Es un componente de servidor: no usa estado.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-svh min-h-[560px] items-center justify-center overflow-hidden bg-navy"
    >
      {/* Fondo: degradado navy */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#252c56] via-navy to-[#12162e]"
        aria-hidden="true"
      />

      {/* Símbolo de la marca como marca de agua gigante */}
      <Image
        src="/images/logos/simbolo-blanco.png"
        alt=""
        width={127}
        height={163}
        priority
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 w-64 -translate-y-1/2 opacity-[0.07] sm:w-96 lg:right-10 lg:w-[30rem]"
      />

      {/* Barras diagonales tricolor decorativas en la esquina inferior izquierda */}
      <div
        className="pointer-events-none absolute -left-6 bottom-10 flex gap-2 opacity-90"
        aria-hidden="true"
      >
        <span className="h-3 w-24 -skew-x-[24deg] rounded-[3px] bg-naranja" />
        <span className="h-3 w-24 -skew-x-[24deg] rounded-[3px] bg-white/80" />
        <span className="h-3 w-24 -skew-x-[24deg] rounded-[3px] bg-verde" />
      </div>

      {/* Contenido central. Entra escalonado justo cuando la pantalla
          de carga se desvanece (los retrasos están coordinados). */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        {/* Trazos diagonales de la marca */}
        <AcentoDiagonal enOscuro className="animacion-entrada mb-6 [animation-delay:950ms]" />
        <h1 className="animacion-entrada text-4xl font-extrabold leading-tight drop-shadow-md [animation-delay:1075ms] sm:text-5xl lg:text-6xl">
          Importamos soluciones,{' '}
          <span className="text-naranja">construimos confianza</span>
        </h1>
        <p className="animacion-entrada mx-auto mt-5 max-w-2xl text-base font-medium text-white/90 [animation-delay:1200ms] sm:text-lg lg:text-xl">
          Importadores directos de soluciones para construcción y acabados:
          tejas UPVC termoacústicas, WPC para interiores y exteriores, paneles
          UV tipo mármol y más. Productos modernos, resistentes y de excelente
          presentación para viviendas, proyectos comerciales y grandes obras.
        </p>

        {/* Botones de acción */}
        <div className="animacion-entrada mt-9 flex flex-col items-center justify-center gap-4 [animation-delay:1325ms] sm:flex-row">
          <a
            href={linkWhatsApp('Hola, quiero cotizar con Panamericana Sur. 🏠')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-verdeoscuro px-8 py-4 text-base font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {/* Ícono de WhatsApp */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotiza por WhatsApp
          </a>
          <a
            href="#productos"
            className="inline-flex items-center rounded-full border-2 border-white px-8 py-[14px] text-base font-bold text-white transition-all duration-200 hover:bg-white hover:text-navy active:scale-95"
          >
            Ver productos
          </a>
        </div>
      </div>
    </section>
  );
}
