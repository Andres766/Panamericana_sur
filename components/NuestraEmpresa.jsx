import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';
import { fotosEmpresa } from '@/data/empresa';

/**
 * Sección "Nuestra Empresa": galería de fotos del negocio
 * (fachada, bodega, equipo, despachos...). Las fotos actuales
 * son placeholders provisionales; se reemplazan editando
 * data/empresa.js cuando lleguen las reales.
 */
export default function NuestraEmpresa() {
  return (
    <section id="empresa" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Nuestra <span className="text-naranja">Empresa</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-gristexto sm:text-lg">
            Conoce nuestras instalaciones, nuestro equipo y la forma en que
            trabajamos día a día para llevar soluciones a tu obra.
          </p>
          <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white sm:text-base">
            <svg className="h-5 w-5 flex-none text-naranja" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Más de 20 años acompañando la construcción en Nariño
          </p>
        </Reveal>

        {/* Galería de fotos de la empresa: 2 columnas en móvil, 4 en escritorio */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {fotosEmpresa.map((foto, i) => (
            <li key={foto.id}>
              {/* Entrada con zoom escalonado por columna */}
              <Reveal variante="zoom" delay={(i % 4) * 90}>
                <div className="group relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src={foto.imagen}
                    alt={foto.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Velo navy sutil al pasar el mouse */}
                  <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
