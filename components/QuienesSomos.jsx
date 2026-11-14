import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';

// Los 3 pilares que se destacan con animación al entrar en pantalla
const pilares = [
  {
    titulo: 'Importadores directos',
    descripcion:
      'Importamos directamente nuestras líneas de Tejas UPVC, WPC y paneles UV tipo mármol, ofreciendo calidad, respaldo y precios competitivos.',
    icono: (
      // Ícono: barco de carga / importación
      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Envíos a todo el país',
    descripcion:
      'Despachamos nuestros productos a diferentes regiones de Colombia, atendiendo proyectos de construcción, remodelación y acabados.',
    icono: (
      // Ícono: camión de entregas
      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    titulo: 'Asesoría personalizada',
    descripcion:
      'Te acompañamos para elegir la solución adecuada según tu proyecto, presupuesto y necesidades, desde cubiertas hasta acabados interiores y exteriores.',
    icono: (
      // Ícono: asesor / auriculares de soporte
      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8a6 6 0 10-12 0v5a2 2 0 002 2h1v-6H6m12 5a2 2 0 01-2 2h-1v-6h3m0 0v5a4 4 0 01-4 4h-2" />
      </svg>
    ),
  },
];

/**
 * Sección "Quiénes Somos": presentación breve de la empresa
 * y 3 pilares destacados que aparecen escalonados al hacer scroll.
 */
export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado y presentación */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <Image
            src="/images/logos/logo-combinado.png"
            alt="Panamericana Sur | Importadora Allianz"
            width={420}
            height={74}
            loading="lazy"
            className="mx-auto mb-8 h-auto w-72 sm:w-96"
          />
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Quiénes <span className="text-naranja">Somos</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mt-5 text-base leading-relaxed text-gristexto sm:text-lg">
            <strong className="text-navy">Ferretería Panamericana Sur</strong>, junto a{' '}
            <strong className="text-navy">Importadora Allianz</strong>, ofrece
            soluciones para construcción, cubiertas y acabados. Importamos
            directamente{' '}
            <strong className="text-navy">Tejas UPVC termoacústicas</strong>,{' '}
            <strong className="text-navy">WPC para interiores y exteriores</strong> y{' '}
            <strong className="text-navy">paneles UV tipo mármol</strong>,
            seleccionando productos modernos, resistentes y de alta calidad para
            viviendas, bodegas, locales comerciales, proyectos industriales y
            remodelaciones.
          </p>

          {/* Trayectoria destacada */}
          <p className="mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl bg-navy px-6 py-4 text-base font-bold text-white sm:text-lg">
            <svg className="h-6 w-6 flex-none text-naranja" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>
              <span className="text-naranja">Más de 20 años</span> acompañando la
              construcción en Nariño
            </span>
          </p>
        </Reveal>

        {/* 3 pilares con animación escalonada */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {pilares.map((pilar, i) => (
            <Reveal key={pilar.titulo} variante="zoom" delay={i * 150}>
              <article className="h-full rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-naranja/10 text-naranja">
                  {pilar.icono}
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{pilar.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gristexto">
                  {pilar.descripcion}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
