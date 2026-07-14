'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// La pantalla se muestra MÍNIMO este tiempo (para que no parpadee
// en conexiones rápidas) y MÁXIMO el tiempo límite (para no dejar
// al usuario esperando si alguna imagen tarda demasiado).
const DURACION_MINIMA_MS = 900;
const DURACION_MAXIMA_MS = 3500;
const DURACION_FADE_MS = 600;

/**
 * Pantalla de carga de la página: fondo navy con el logo combinado
 * (Panamericana Sur | Allianz, siempre juntos) latiendo suavemente
 * y las barras diagonales tricolor de la marca como indicador.
 *
 * Se desvanece cuando la página termina de cargar (evento "load")
 * y se desmonta del todo al acabar la transición. Hecha solo con
 * React state y CSS, sin librerías.
 */
export default function PantallaCarga() {
  const [oculta, setOculta] = useState(false); // inicia el desvanecido
  const [desmontada, setDesmontada] = useState(false); // se quita del DOM

  // Espera el evento "load" (todo cargado) respetando la duración mínima,
  // con un tope máximo por si algún recurso tarda demasiado.
  useEffect(() => {
    const inicio = performance.now();
    let temporizadorFade;

    const ocultar = () => {
      const transcurrido = performance.now() - inicio;
      const espera = Math.max(0, DURACION_MINIMA_MS - transcurrido);
      temporizadorFade = setTimeout(() => setOculta(true), espera);
    };

    if (document.readyState === 'complete') {
      ocultar();
    } else {
      window.addEventListener('load', ocultar, { once: true });
    }
    const temporizadorMaximo = setTimeout(() => setOculta(true), DURACION_MAXIMA_MS);

    return () => {
      window.removeEventListener('load', ocultar);
      clearTimeout(temporizadorFade);
      clearTimeout(temporizadorMaximo);
    };
  }, []);

  // Cuando termina el desvanecido, se desmonta para liberar el DOM
  useEffect(() => {
    if (!oculta) return;
    const temporizador = setTimeout(() => setDesmontada(true), DURACION_FADE_MS + 100);
    return () => clearTimeout(temporizador);
  }, [oculta]);

  if (desmontada) return null;

  return (
    <div
      aria-hidden="true"
      className={`pantalla-carga fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 bg-navy transition-opacity duration-[600ms] ease-out ${
        oculta ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo combinado con latido suave */}
      <Image
        src="/images/logos/logo-combinado-blanco.png"
        alt=""
        width={320}
        height={58}
        priority
        className="animacion-latido h-auto w-60 sm:w-80"
      />

      {/* Barras diagonales tricolor de la marca como indicador de carga */}
      <div className="flex items-center gap-1.5">
        <span className="animacion-barra-carga h-2.5 w-9 -skew-x-[24deg] rounded-[2px] bg-naranja" />
        <span className="animacion-barra-carga h-2.5 w-9 -skew-x-[24deg] rounded-[2px] bg-white [animation-delay:180ms]" />
        <span className="animacion-barra-carga h-2.5 w-9 -skew-x-[24deg] rounded-[2px] bg-verde [animation-delay:360ms]" />
      </div>

      {/* Si el navegador no tiene JavaScript, la pantalla no debe
          quedarse pegada tapando el contenido */}
      <noscript>
        <style>{`.pantalla-carga { display: none; }`}</style>
      </noscript>
    </div>
  );
}
