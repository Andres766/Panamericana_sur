import AcentoDiagonal from '@/components/AcentoDiagonal';
import Reveal from '@/components/Reveal';
import { site, linkWhatsApp } from '@/data/site';

/**
 * Sección "Encuéntranos": mapa de Google Maps (iframe embed,
 * sin API key) junto a los datos de contacto del negocio.
 * La URL del mapa se edita en data/site.js (campo mapaEmbed).
 */
export default function MapaContacto() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            <span className="text-naranja">Encuéntranos</span>
          </h2>
          <AcentoDiagonal className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-gristexto sm:text-lg">
            Visítanos o contáctanos por el medio que prefieras.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-5">
          {/* Mapa de Google (carga diferida para no frenar la página) */}
          <Reveal variante="izquierda" className="lg:col-span-3">
            <div className="h-80 overflow-hidden rounded-3xl shadow-lg lg:h-full lg:min-h-[420px]">
              <iframe
                src={site.mapaEmbed}
                title={`Ubicación de ${site.nombre} en ${site.ciudad}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Datos de contacto */}
          <Reveal variante="derecha" delay={150} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center gap-6 rounded-3xl bg-gray-50 p-8 sm:p-10">
              {/* Teléfonos */}
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-naranja/10 text-naranja">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-navy">Teléfonos</h3>
                  {site.telefonos.map((telefono) => (
                    <a
                      key={telefono}
                      href={`tel:+57${telefono.replace(/\s/g, '')}`}
                      className="block text-gristexto transition-colors hover:text-naranja"
                    >
                      {telefono}
                    </a>
                  ))}
                </div>
              </div>

              {/* Dirección del local */}
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-verde/10 text-verdeoscuro">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-navy">Dirección</h3>
                  <p className="text-gristexto">{site.direccion}</p>
                  <p className="text-gristexto">{site.ciudad}</p>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy/10 text-navy">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-navy">Horario de atención</h3>
                  <p className="text-gristexto">{site.horario}</p>
                </div>
              </div>

              {/* Acceso rápido a WhatsApp */}
              <a
                href={linkWhatsApp('Hola, me gustaría recibir más información. 😊')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-verdeoscuro px-6 py-3.5 font-bold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
