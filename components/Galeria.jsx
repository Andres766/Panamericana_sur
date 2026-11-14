'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';
import { gallery } from '@/data/gallery';

/**
 * Sección "Obras realizadas con nuestros productos": cuadrícula
 * responsiva de fotos y videos (2 columnas en móvil, 4 en escritorio)
 * con lightbox.
 *
 * El lightbox está hecho solo con React state y CSS:
 * - Click en una foto -> se abre en grande con fondo oscuro.
 * - Los elementos con "video" muestran un botón de play en la
 *   miniatura y se reproducen dentro del lightbox.
 * - Se cierra con el botón X, con la tecla Escape o tocando el fondo.
 * - Flechas y teclado para pasar de foto sin cerrar.
 * - Accesible: al abrir, el foco pasa al botón de cerrar; Tab circula
 *   solo por los controles del diálogo; al cerrar, el foco vuelve
 *   a la miniatura que lo abrió.
 */
export default function Galeria() {
  // Índice de la foto abierta en el lightbox (null = cerrado)
  const [abierta, setAbierta] = useState(null);

  const refDialogo = useRef(null); // contenedor del lightbox (trampa de foco)
  const refCerrar = useRef(null); // botón cerrar (recibe el foco al abrir)
  const refFocoPrevio = useRef(null); // elemento enfocado antes de abrir

  const estaAbierto = abierta !== null;
  const fotoActiva = estaAbierto ? gallery[abierta] : null; // datos de la foto ampliada

  // Manejo del foco: al abrir se guarda el foco actual y se mueve al
  // botón de cerrar; al cerrar se devuelve a donde estaba (la miniatura).
  useEffect(() => {
    if (!estaAbierto) return;
    refFocoPrevio.current = document.activeElement;
    refCerrar.current?.focus();
    return () => refFocoPrevio.current?.focus?.();
  }, [estaAbierto]);

  // Teclado (Escape, flechas, trampa de Tab) y bloqueo del scroll de fondo
  useEffect(() => {
    if (!estaAbierto) return;

    const alTeclear = (evento) => {
      if (evento.key === 'Escape') setAbierta(null);
      if (evento.key === 'ArrowRight') setAbierta((i) => (i + 1) % gallery.length);
      if (evento.key === 'ArrowLeft') setAbierta((i) => (i - 1 + gallery.length) % gallery.length);

      // Trampa de foco: Tab circula solo por los controles del lightbox
      if (evento.key === 'Tab') {
        const controles = refDialogo.current?.querySelectorAll('button');
        if (!controles || controles.length === 0) return;
        const primero = controles[0];
        const ultimo = controles[controles.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primero.focus();
        } else if (!refDialogo.current.contains(document.activeElement)) {
          // Si el foco quedó fuera del diálogo, se trae de vuelta
          evento.preventDefault();
          primero.focus();
        }
      }
    };

    document.addEventListener('keydown', alTeclear);
    document.body.style.overflow = 'hidden'; // Evita el scroll detrás del lightbox

    return () => {
      document.removeEventListener('keydown', alTeclear);
      document.body.style.overflow = '';
    };
  }, [estaAbierto]);

  return (
    <section id="galeria" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Obras realizadas con{' '}
            <span className="text-naranja">nuestros productos</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-gristexto sm:text-lg">
            Proyectos reales hechos con nuestros productos. Toca cualquier foto
            o video para ver los detalles.
          </p>
        </Reveal>

        {/* Cuadrícula de fotos: 2 columnas en móvil, 4 en escritorio */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((foto, i) => (
            <li key={foto.id}>
              {/* Entrada con zoom escalonado por columna */}
              <Reveal variante="zoom" delay={(i % 4) * 90}>
              <button
                type="button"
                onClick={() => setAbierta(i)}
                aria-label={foto.video ? `Reproducir video: ${foto.alt}` : `Ampliar: ${foto.alt}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-naranja"
              >
                {foto.video && !foto.imagen ? (
                  // Video sin póster: el navegador muestra el primer fotograma
                  <video
                    src={foto.video}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={foto.imagen}
                    alt={foto.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                {foto.video ? (
                  // Botón de play siempre visible sobre los videos
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/25 transition-colors duration-300 group-hover:bg-navy/40">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg className="ml-1 h-7 w-7 text-navy" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v13.72c0 .86.93 1.4 1.68.96l11-6.86a1.12 1.12 0 000-1.92l-11-6.86A1.12 1.12 0 008 5.14z" />
                      </svg>
                    </span>
                  </span>
                ) : (
                  /* Velo con ícono de lupa al pasar el mouse */
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/40">
                    <svg
                      className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
                    </svg>
                  </span>
                )}
              </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------- Lightbox ------------------- */}
      {estaAbierto && (
        <div
          ref={refDialogo}
          className="animacion-aparecer fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={fotoActiva.alt}
          onClick={() => setAbierta(null)} // Tocar el fondo cierra
        >
          {/* Botón cerrar (recibe el foco al abrir el lightbox) */}
          <button
            ref={refCerrar}
            type="button"
            onClick={() => setAbierta(null)}
            aria-label="Cerrar imagen"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-naranjaoscuro focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Flecha anterior */}
          <button
            type="button"
            onClick={(evento) => {
              evento.stopPropagation(); // No cerrar el lightbox
              setAbierta((i) => (i - 1 + gallery.length) % gallery.length);
            }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-naranjaoscuro focus:outline-none focus:ring-2 focus:ring-white sm:left-6"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tarjeta de la obra: imagen + ficha (click dentro no cierra) */}
          <figure
            onClick={(evento) => evento.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Imagen o video sobre fondo navy (se ve completo, sin recortar) */}
            <div className="flex shrink-0 items-center justify-center bg-navy">
              {fotoActiva.video ? (
                <video
                  key={fotoActiva.video} // Reinicia el video al cambiar de elemento
                  src={fotoActiva.video}
                  controls
                  autoPlay
                  playsInline
                  poster={fotoActiva.imagen || undefined}
                  className="max-h-[52vh] w-auto"
                >
                  Tu navegador no puede reproducir este video.
                </video>
              ) : (
                <Image
                  src={fotoActiva.imagen}
                  alt={fotoActiva.alt}
                  width={1200}
                  height={900}
                  className="max-h-[52vh] w-auto object-contain"
                />
              )}
            </div>

            {/* Franja diagonal tricolor de la marca */}
            <div className="flex h-1.5 overflow-hidden" aria-hidden="true">
              <span className="-ml-2 flex-1 -skew-x-[24deg] bg-naranja" />
              <span className="flex-1 -skew-x-[24deg] bg-navy" />
              <span className="-mr-2 flex-1 -skew-x-[24deg] bg-verde" />
            </div>

            {/* Ficha de la obra */}
            <figcaption className="min-h-0 overflow-y-auto p-6 text-left sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-extrabold text-navy sm:text-xl">
                  {fotoActiva.lugar}
                </h3>
                <span className="flex-none rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gristexto">
                  {abierta + 1} / {gallery.length}
                </span>
              </div>

              {/* Chips: producto usado y medida */}
              {fotoActiva.producto && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-verde/10 px-3 py-1 text-xs font-bold text-verdeoscuro">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {fotoActiva.producto}
                  </span>
                  {fotoActiva.medida && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-naranja/10 px-3 py-1 text-xs font-bold text-naranjaoscuro">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20L20 6M9 7l-2 2m5-1l-3 3m7-1l-2 2m5-1l-3 3" />
                      </svg>
                      {fotoActiva.medida}
                    </span>
                  )}
                </div>
              )}

              <p className="mt-4 text-sm leading-relaxed text-gristexto sm:text-base">
                {fotoActiva.descripcion}
              </p>
            </figcaption>
          </figure>

          {/* Flecha siguiente */}
          <button
            type="button"
            onClick={(evento) => {
              evento.stopPropagation();
              setAbierta((i) => (i + 1) % gallery.length);
            }}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-naranjaoscuro focus:outline-none focus:ring-2 focus:ring-white sm:right-6"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
