'use client';

import { useState } from 'react';
import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';
import { linkWhatsApp } from '@/data/site';

// Opciones del selector "Tipo de proyecto"
const tiposDeProyecto = ['Vivienda', 'Bodega', 'Finca', 'Local comercial'];

/**
 * Formulario de cotización SIN backend:
 * al enviar, arma un mensaje con los datos ingresados y abre
 * WhatsApp (wa.me) con el texto prellenado, listo para enviar.
 */
export default function FormularioCotizacion() {
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    tipoProyecto: tiposDeProyecto[0],
    mensaje: '',
  });

  // Actualiza el campo correspondiente cuando el usuario escribe
  const alCambiar = (evento) => {
    const { name, value } = evento.target;
    setDatos((previos) => ({ ...previos, [name]: value }));
  };

  // Arma el mensaje de WhatsApp y lo abre en una pestaña nueva
  const alEnviar = (evento) => {
    evento.preventDefault();

    const texto = [
      '¡Hola! Quiero solicitar una cotización. 👋',
      '',
      `*Nombre:* ${datos.nombre}`,
      `*Teléfono:* ${datos.telefono}`,
      `*Tipo de proyecto:* ${datos.tipoProyecto}`,
      datos.mensaje ? `*Mensaje:* ${datos.mensaje}` : '',
    ]
      .filter((linea, indice) => linea !== '' || indice === 1) // conserva la línea en blanco tras el saludo
      .join('\n');

    window.open(linkWhatsApp(texto), '_blank', 'noopener,noreferrer');
  };

  // Estilo compartido de todos los campos
  const estiloCampo =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-navy placeholder-gray-400 outline-none transition-colors focus:border-naranja focus:ring-2 focus:ring-naranja/30';

  return (
    <section id="cotizacion" className="scroll-mt-20 bg-gray-50 py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Solicita tu <span className="text-naranja">Cotización</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mx-auto mt-4 max-w-xl text-gristexto sm:text-lg">
            Cuéntanos sobre tu proyecto y te respondemos de inmediato por
            WhatsApp. Sin compromiso.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <form
            onSubmit={alEnviar}
            className="mt-10 rounded-3xl bg-white p-6 shadow-lg sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Nombre completo */}
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="mb-1.5 block text-sm font-bold text-navy">
                  Nombre completo *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ej: Juan Pérez"
                  value={datos.nombre}
                  onChange={alCambiar}
                  className={estiloCampo}
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="mb-1.5 block text-sm font-bold text-navy">
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="Ej: 315 000 0000"
                  value={datos.telefono}
                  onChange={alCambiar}
                  className={estiloCampo}
                />
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label htmlFor="tipoProyecto" className="mb-1.5 block text-sm font-bold text-navy">
                  Tipo de proyecto *
                </label>
                <select
                  id="tipoProyecto"
                  name="tipoProyecto"
                  value={datos.tipoProyecto}
                  onChange={alCambiar}
                  className={estiloCampo}
                >
                  {tiposDeProyecto.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="mb-1.5 block text-sm font-bold text-navy">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Cuéntanos qué necesitas: medidas aproximadas, tipo de teja, ubicación de la obra..."
                  value={datos.mensaje}
                  onChange={alCambiar}
                  className={`${estiloCampo} resize-none`}
                />
              </div>
            </div>

            {/* Botón de envío por WhatsApp */}
            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-naranjaoscuro px-8 py-4 text-base font-bold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Ícono de WhatsApp */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar por WhatsApp
            </button>

            <p className="mt-4 text-center text-xs text-gristexto">
              Al enviar se abrirá WhatsApp con tu mensaje listo. No guardamos
              tus datos en ningún servidor.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
