'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';
import { gallery } from '@/data/gallery';

/**
 * Sección "Nuestros Trabajos": cuadrícula responsiva de fotos
 * (2 columnas en móvil, 4 en escritorio) con efecto lightbox.
 *
 * El lightbox está hecho solo con React state y CSS:
 * - Click en una foto -> se abre en grande con fondo oscuro.
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
            Nuestros <span className="text-naranja">Trabajos</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-gristexto sm:text-lg">
            Proyectos reales instalados por nuestro equipo. Toca cualquier foto
            para verla en grande.
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
                aria-label={`Ampliar: ${foto.alt}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-naranja"
              >
                <Image
                  src={foto.imagen}
                  alt={foto.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Velo con ícono de lupa al pasar el mouse */}
                <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/40">
                  <svg
                    className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
                  </svg>
                </span>
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
          aria-label={gallery[abierta].alt}
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

          {/* Imagen ampliada (click sobre ella no cierra) */}
          <figure onClick={(evento) => evento.stopPropagation()} className="text-center">
            <Image
              src={gallery[abierta].imagen}
              alt={gallery[abierta].alt}
              width={1200}
              height={900}
              className="max-h-[82vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-sm text-white/80">
              {gallery[abierta].alt} · {abierta + 1} / {gallery.length}
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
