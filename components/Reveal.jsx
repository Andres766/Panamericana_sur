'use client';

import { useEffect, useRef } from 'react';

/**
 * Envoltorio reutilizable que hace aparecer su contenido con una
 * animación suave cuando entra en pantalla.
 *
 * Usa Intersection Observer nativo del navegador (sin librerías):
 * cuando el elemento es visible, se le agrega la clase
 * .reveal-visible (definida en app/globals.css) y se deja de observar.
 *
 * @param {string} className - Clases extra para el contenedor.
 * @param {number} delay - Retraso en milisegundos (útil para escalonar tarjetas).
 * @param {string} variante - Dirección de entrada: 'arriba' (por defecto),
 *                            'izquierda', 'derecha' o 'zoom'.
 */

// Clase CSS que corresponde a cada variante (ver globals.css)
const clasesVariante = {
  arriba: '',
  izquierda: 'reveal-izquierda',
  derecha: 'reveal-derecha',
  zoom: 'reveal-zoom',
};

export default function Reveal({ children, className = '', delay = 0, variante = 'arriba' }) {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('reveal-visible');
            observador.unobserve(entrada.target); // Solo anima una vez
          }
        });
      },
      { threshold: 0.15 }
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={['reveal', clasesVariante[variante], className].filter(Boolean).join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
