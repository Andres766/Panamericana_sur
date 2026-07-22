'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Enlaces del menú. "Galería" es un desplegable con dos secciones:
// la galería de la empresa y la de obras realizadas.
const enlaces = [
  { nombre: 'Inicio', href: '#inicio' },
  { nombre: 'Quiénes Somos', href: '#quienes-somos' },
  { nombre: 'Productos', href: '#productos' },
  {
    nombre: 'Galería',
    submenu: [
      { nombre: 'Nuestra Empresa', href: '#empresa', descripcion: 'Instalaciones y equipo' },
      { nombre: 'Obras realizadas', href: '#galeria', descripcion: 'Proyectos con nuestros productos' },
    ],
  },
  { nombre: 'Contacto', href: '#contacto' },
];

/**
 * Barra de navegación fija:
 * - Transparente sobre el hero y navy sólido al hacer scroll.
 * - "Galería" despliega un submenú al pasar el cursor (o con foco).
 * - Menú hamburguesa en móvil (el submenú se muestra desplegado).
 */
export default function Navbar() {
  const [conFondo, setConFondo] = useState(false); // true cuando ya se hizo scroll
  const [menuAbierto, setMenuAbierto] = useState(false); // menú móvil
  const [galeriaAbierta, setGaleriaAbierta] = useState(false); // submenú "Galería" (escritorio)
  const refGaleria = useRef(null);

  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 40);
    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  // Cierra el submenú "Galería" al hacer clic fuera o pulsar Escape
  // (necesario para dispositivos táctiles, que abren con clic).
  useEffect(() => {
    if (!galeriaAbierta) return;
    const alClicFuera = (evento) => {
      if (refGaleria.current && !refGaleria.current.contains(evento.target)) {
        setGaleriaAbierta(false);
      }
    };
    const alEscape = (evento) => evento.key === 'Escape' && setGaleriaAbierta(false);
    document.addEventListener('pointerdown', alClicFuera);
    document.addEventListener('keydown', alEscape);
    return () => {
      document.removeEventListener('pointerdown', alClicFuera);
      document.removeEventListener('keydown', alEscape);
    };
  }, [galeriaAbierta]);

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
            cliente). Versión blanca: visible sobre hero y navy. */}
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
            {enlaces.map((enlace) =>
              enlace.submenu ? (
                // Elemento con submenú desplegable (hover o foco)
                <li
                  key={enlace.nombre}
                  ref={refGaleria}
                  className="group relative"
                  onMouseEnter={() => setGaleriaAbierta(true)}
                  onMouseLeave={() => setGaleriaAbierta(false)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={galeriaAbierta}
                    onClick={() => setGaleriaAbierta((v) => !v)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-white transition-colors hover:text-naranja"
                  >
                    {enlace.nombre}
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${galeriaAbierta ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Panel del submenú: se abre con hover, con clic (táctil) o
                      con foco de teclado. El pt-3 hace de "puente" para pasar
                      el cursor del botón al panel sin que se cierre. */}
                  <div
                    className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 ${
                      galeriaAbierta ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                  >
                    <ul className="overflow-hidden rounded-2xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                      {enlace.submenu.map((sub) => (
                        <li key={sub.href}>
                          <a
                            href={sub.href}
                            onClick={() => setGaleriaAbierta(false)}
                            className="block px-4 py-3 transition-colors hover:bg-naranja/10"
                          >
                            <span className="block text-sm font-bold text-navy">{sub.nombre}</span>
                            <span className="block text-xs text-gristexto">{sub.descripcion}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                // Enlace normal con subrayado naranja que se desliza al pasar el mouse
                <li key={enlace.href}>
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
              )
            )}
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
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
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
            {enlaces.map((enlace) =>
              enlace.submenu ? (
                // En móvil el submenú se muestra desplegado bajo su título
                <li key={enlace.nombre} className="pt-2">
                  <span className="block px-3 pb-1 text-xs font-bold uppercase tracking-wider text-white/50">
                    {enlace.nombre}
                  </span>
                  {enlace.submenu.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      onClick={cerrarMenu}
                      className="block rounded-lg px-3 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {sub.nombre}
                    </a>
                  ))}
                </li>
              ) : (
                <li key={enlace.href}>
                  <a
                    href={enlace.href}
                    onClick={cerrarMenu}
                    className="block rounded-lg px-3 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {enlace.nombre}
                  </a>
                </li>
              )
            )}
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
