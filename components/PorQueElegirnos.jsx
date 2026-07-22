import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';

// Las 4 razones que se muestran como tarjetas
const razones = [
  {
    titulo: 'Importadores directos',
    descripcion: 'Sin intermediarios: traemos el producto del fabricante a tu obra, con mejor precio.',
    icono: (
      // Ícono: globo / importación
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a13.5 13.5 0 000 18M12 3a13.5 13.5 0 010 18" />
      </svg>
    ),
  },
  {
    titulo: 'Precios competitivos',
    descripcion: 'Los mejores precios del mercado regional, con calidad de importación garantizada.',
    icono: (
      // Ícono: etiqueta de precio
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    titulo: 'Atención personalizada',
    descripcion: 'Asesoría técnica incluida: te acompañamos desde la cotización hasta tu proyecto.',
    icono: (
      // Ícono: conversación / asesoría
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    titulo: 'Entregas a domicilio',
    descripcion: 'Cubrimos todo el sur del país: tu pedido llega directo a la puerta de tu proyecto.',
    icono: (
      // Ícono: camión de reparto
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
];

/**
 * Sección "Por qué elegirnos": 4 tarjetas sobre fondo navy con
 * ícono, título y descripción, animadas de forma escalonada.
 */
export default function PorQueElegirnos() {
  return (
    <section className="bg-navy py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ¿Por qué <span className="text-naranja">elegirnos</span>?
          </h2>
          <AcentoDiagonal enOscuro className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-white/70 sm:text-lg">
            Somos el aliado que tu proyecto necesita, del primer contacto a la
            entrega final.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {razones.map((razon, i) => (
            <Reveal key={razon.titulo} variante="zoom" delay={i * 120}>
              <article className="h-full rounded-2xl bg-white/5 p-7 text-center ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-verde/15 text-verde">
                  {razon.icono}
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{razon.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {razon.descripcion}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
