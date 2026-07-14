'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import { slides } from '@/data/slides';
import { linkWhatsApp } from '@/data/site';

// Tiempo entre diapositivas del carrusel automático (en milisegundos)
const INTERVALO_MS = 4000;

/**
 * Hero principal con carrusel de imágenes de fondo:
 * - Avanza solo cada 4 segundos con transición de opacidad suave.
 * - Flechas manuales, puntos indicadores y botón de pausa/reanudar.
 * - Respeta la preferencia del sistema "reducir movimiento".
 * - Overlay oscuro para que el texto siempre sea legible.
 * - Solo la primera imagen carga de inmediato; las demás se montan
 *   después de la hidratación para no frenar la carga inicial.
 * Implementado únicamente con React state y transiciones CSS.
 */
export default function Hero() {
  const [actual, setActual] = useState(0); // índice de la diapositiva visible
  const [pausado, setPausado] = useState(false); // pausa del auto-avance
  const [listo, setListo] = useState(false); // true después de la hidratación

  // La diapositiva SALIENTE conserva la clase del zoom (Ken Burns)
  // mientras se desvanece; si la perdiera de inmediato, su escala
  // saltaría de ~1.1 a 1 en pleno crossfade (encogimiento visible).
  const [previo, setPrevio] = useState(null);
  const refAnterior = useRef(0);
  useEffect(() => {
    if (refAnterior.current !== actual) {
      setPrevio(refAnterior.current);
      refAnterior.current = actual;
    }
  }, [actual]);

  // Tras la carga inicial se montan las diapositivas 2 a 5, así la
  // primera imagen (la más importante) no compite con las otras cuatro.
  useEffect(() => {
    setListo(true);
    // Si el usuario prefiere menos movimiento, el carrusel arranca pausado
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPausado(true);
    }
  }, []);

  // Avanza a la siguiente diapositiva (vuelve a la primera al terminar)
  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % slides.length),
    []
  );

  // Retrocede a la diapositiva anterior
  const anterior = () =>
    setActual((i) => (i - 1 + slides.length) % slides.length);

  // Temporizador automático. Se reinicia cada vez que cambia la
  // diapositiva (así la navegación manual no choca con la automática)
  // y se detiene mientras el carrusel esté pausado.
  useEffect(() => {
    if (pausado) return;
    const temporizador = setInterval(siguiente, INTERVALO_MS);
    return () => clearInterval(temporizador);
  }, [actual, pausado, siguiente]);

  return (
    <section
      id="inicio"
      className="relative flex h-svh min-h-[560px] items-center justify-center overflow-hidden"
    >
      {/* Imágenes apiladas: solo la actual está visible (fade con CSS) */}
      {slides.map((slide, i) =>
        i === 0 || listo ? (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === actual ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== actual}
          >
            <Image
              src={slide.imagen}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              // La diapositiva activa hace un zoom lento (Ken Burns).
              // La saliente ("previo") lo mantiene durante el crossfade.
              className={`object-cover ${i === actual || i === previo ? 'animacion-kenburns' : ''}`}
            />
            {/* Overlay oscuro para legibilidad del texto */}
            <div className="absolute inset-0 bg-navy/60" />
          </div>
        ) : null
      )}

      {/* Contenido central. Entra escalonado justo cuando la pantalla
          de carga se desvanece (los retrasos están coordinados). */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        {/* Trazos diagonales de la marca */}
        <AcentoDiagonal enOscuro className="animacion-entrada mb-6 [animation-delay:950ms]" />
        <h1 className="animacion-entrada text-4xl font-extrabold leading-tight drop-shadow-md [animation-delay:1075ms] sm:text-5xl lg:text-6xl">
          Tu techo, <span className="text-naranja">nuestra solución</span>
        </h1>
        <p className="animacion-entrada mx-auto mt-5 max-w-2xl text-base font-medium text-white/90 [animation-delay:1200ms] sm:text-lg lg:text-xl">
          Importadores directos de Teja UPVC para viviendas, bodegas, fincas y
          locales comerciales
        </p>

        {/* Botones de acción */}
        <div className="animacion-entrada mt-9 flex flex-col items-center justify-center gap-4 [animation-delay:1325ms] sm:flex-row">
          <a
            href={linkWhatsApp('Hola, quiero cotizar Teja UPVC con Panamericana Sur. 🏠')}
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

      {/* Flecha izquierda */}
      <button
        type="button"
        onClick={anterior}
        aria-label="Diapositiva anterior"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-naranjaoscuro sm:left-6"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Flecha derecha */}
      <button
        type="button"
        onClick={siguiente}
        aria-label="Siguiente diapositiva"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-naranjaoscuro sm:right-6"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Controles inferiores: pausa + puntos indicadores */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
        {/* Botón pausar/reanudar (accesibilidad: WCAG 2.2.2) */}
        <button
          type="button"
          onClick={() => setPausado(!pausado)}
          aria-label={pausado ? 'Reanudar el carrusel' : 'Pausar el carrusel'}
          className="mr-1.5 rounded-full bg-white/15 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-naranjaoscuro"
        >
          {pausado ? (
            // Ícono reproducir
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            // Ícono pausa
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          )}
        </button>

        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActual(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            aria-current={i === actual}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === actual ? 'w-8 bg-naranja' : 'w-2.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
