import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';
import { products } from '@/data/products';
import { linkWhatsApp } from '@/data/site';

/**
 * Sección "Nuestros Productos" (catálogo oficial + líneas nuevas):
 * - En escritorio: cuadrícula de 4 columnas.
 * - En móvil: carrusel horizontal deslizable con CSS scroll snap
 *   (sin librerías externas).
 * Cada tarjeta muestra el render real del catálogo con su medida
 * y tiene su botón "Cotizar" que abre WhatsApp con el nombre del
 * producto ya escrito en el mensaje.
 */
export default function Productos() {
  return (
    <section id="productos" className="scroll-mt-20 bg-gray-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Nuestros <span className="text-naranja">Productos</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-gristexto sm:text-lg">
            De la fábrica a tu proyecto, con el respaldo de Panamericana Sur y
            Allianz Importaciones. Desliza o explora y cotiza directamente por
            WhatsApp.
          </p>
        </Reveal>

        {/* Aviso: ficha técnica por WhatsApp */}
        <Reveal delay={120}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-verde/30 bg-verde/5 p-5 text-center sm:flex-row sm:justify-center sm:text-left">
            <svg className="h-8 w-8 flex-none text-verdeoscuro" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm text-navy sm:text-base">
              ¿Necesitas la <strong>ficha técnica</strong> de algún producto?{' '}
              <a
                href={linkWhatsApp(
                  'Hola, me gustaría recibir la ficha técnica de un producto. 📄'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-verdeoscuro underline decoration-verde/50 underline-offset-2 transition-colors hover:text-navy"
              >
                Solicítala por WhatsApp
              </a>{' '}
              y te la enviamos.
            </p>
          </div>
        </Reveal>

        {/*
          Lista de productos:
          - Móvil: flex horizontal con snap-x (deslizable con el dedo).
          - md en adelante: cuadrícula (3 columnas en tablet, 4 en escritorio).
        */}
        <ul className="sin-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {products.map((producto, i) => (
            <li key={producto.id} className="w-72 flex-none snap-center md:w-auto">
              {/* Entrada escalonada por columna al hacer scroll */}
              <Reveal delay={(i % 4) * 120} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                {/* Render del producto: object-contain (sin recortar) porque
                    los renders del catálogo vienen sobre fondo blanco */}
                <div className="relative aspect-[4/3] overflow-hidden bg-white p-3">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-3 transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Texto y botón */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-navy">{producto.nombre}</h3>
                  {/* Medida y espesor (no todos los productos la tienen) */}
                  {producto.medida && (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-verdeoscuro">
                      <svg className="h-3.5 w-3.5 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20L20 6M9 7l-2 2m5-1l-3 3m7-1l-2 2m5-1l-3 3" />
                      </svg>
                      {producto.medida}
                    </p>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gristexto">
                    {producto.descripcion}
                  </p>
                  <a
                    href={linkWhatsApp(
                      `Hola, quiero cotizar: *${producto.nombre}*. ¿Me pueden dar más información?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-full bg-naranjaoscuro px-5 py-2.5 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-navy"
                  >
                    Cotizar
                  </a>
                </div>
              </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
