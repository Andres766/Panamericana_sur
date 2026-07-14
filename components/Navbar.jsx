'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Enlaces de navegación hacia cada sección de la landing
const enlaces = [
  { nombre: 'Inicio', href: '#inicio' },
  { nombre: 'Quiénes Somos', href: '#quienes-somos' },
  { nombre: 'Productos', href: '#productos' },
  { nombre: 'Galería', href: '#galeria' },
  { nombre: 'Contacto', href: '#contacto' },
];

/**
 * Barra de navegación fija:
 * - Transparente sobre el hero y navy sólido al hacer scroll.
 * - Menú hamburguesa en móvil.
 * - Botón "Cotiza ahora" que lleva al formulario de cotización.
 */
export default function Navbar() {
  const [conFondo, setConFondo] = useState(false); // true cuando el usuario ya hizo scroll
  const [menuAbierto, setMenuAbierto] = useState(false); // estado del menú móvil

  // Cambia el fondo de transparente a navy sólido al desplazarse
  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 40);
    alDesplazar(); // Estado correcto si la página carga ya desplazada
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        conFondo || menuAbierto ? 'bg-navy shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        {/* Logo combinado (los dos van SIEMPRE juntos por indicación del
            cliente: la ferretería es Panamericana Sur y la importadora es
            Allianz). Versión blanca: visible sobre hero y navy. */}
        <a href="#inicio" onClick={cerrarMenu} aria-label="Panamericana Sur | Importadora Allianz — ir al inicio">
          <Image
            src="/images/logos/logo-combinado-blanco.png"
            alt="Panamericana Sur | Importadora Allianz"
            width={276}
            height={50}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </a>

        {/* Navegación de escritorio */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                {/* Enlace con subrayado naranja que se desliza al pasar el mouse */}
                <a
                  href={enlace.href}
                  className="group relative text-sm font-semibold text-white transition-colors hover:text-naranja"
                >
                  {enlace.nombre}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-naranja transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#cotizacion"
            className="rounded-full bg-naranjaoscuro px-6 py-2.5 text-sm font-bold text-white shadow-md transition-transform duration-200 hover:scale-105"
          >
            Cotiza ahora
          </a>
        </div>

        {/* Botón hamburguesa (solo móvil / tablet) */}
        <button
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? (
            // Ícono X (cerrar)
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ícono hamburguesa (abrir)
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Menú desplegable móvil */}
      {menuAbierto && (
        <div className="border-t border-white/10 bg-navy px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  onClick={cerrarMenu}
                  className="block rounded-lg px-3 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {enlace.nombre}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#cotizacion"
            onClick={cerrarMenu}
            className="mt-3 block rounded-full bg-naranjaoscuro px-6 py-3 text-center font-bold text-white"
          >
            Cotiza ahora
          </a>
        </div>
      )}
    </header>
  );
}
