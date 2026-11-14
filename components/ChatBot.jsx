'use client';

import { useEffect, useRef, useState } from 'react';

// Endpoint de la función de servidor. Por defecto es el mismo sitio
// (/api/chat en Vercel). Si algún día se aloja la función en otro
// dominio, se define NEXT_PUBLIC_CHAT_API_URL con la URL absoluta.
const ENDPOINT = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat';

// Mensaje de bienvenida (solo se muestra; no se envía al modelo)
const SALUDO =
  '¡Hola! 👋 Soy el asistente de Panamericana Sur. Pregúntame sobre nuestras tejas UPVC, paneles WPC, láminas UV tipo mármol, medidas, instalación, envíos y más.';

// Preguntas sugeridas (botones rápidos)
const SUGERENCIAS = [
  '¿La teja UPVC disminuye el calor?',
  '¿Qué es el panel WPC interior?',
  '¿Qué son las láminas UV tipo mármol?',
  '¿Hacen envíos fuera de Pasto?',
  '¿Cuántas tejas necesito?',
];

// Convierte **texto** en negrita para mostrarlo bonito
function formatear(texto) {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith('**') && parte.endsWith('**') ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      parte
    )
  );
}

/**
 * Asistente virtual con IA (Google Gemini). Widget de chat flotante:
 * - Botón abajo a la izquierda (no choca con los botones de la derecha).
 * - Conversa llamando a /api/chat, que a su vez llama a Gemini.
 * - Muestra la respuesta en streaming (se ve escribir en vivo).
 * - Preguntas sugeridas, cierre con Escape y accesible por teclado.
 */
export default function ChatBot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([{ role: 'assistant', content: SALUDO }]);
  const [entrada, setEntrada] = useState('');
  const [cargando, setCargando] = useState(false);

  const refFin = useRef(null); // ancla para auto-scroll
  const refEntrada = useRef(null); // caja de texto

  // Auto-scroll al último mensaje
  useEffect(() => {
    refFin.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [mensajes, abierto]);

  // Al abrir, enfoca la caja de texto; Escape cierra
  useEffect(() => {
    if (!abierto) return;
    refEntrada.current?.focus();
    const alTeclear = (e) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('keydown', alTeclear);
    return () => document.removeEventListener('keydown', alTeclear);
  }, [abierto]);

  // Mientras el chat está abierto, oculta los botones flotantes de la
  // derecha en móvil para que el panel no los tape (ver globals.css).
  useEffect(() => {
    document.body.classList.toggle('chat-abierto', abierto);
    return () => document.body.classList.remove('chat-abierto');
  }, [abierto]);

  // Envía un texto al asistente y transmite la respuesta
  const enviar = async (texto) => {
    const pregunta = texto.trim();
    if (!pregunta || cargando) return;

    setEntrada('');
    const conUsuario = [...mensajes, { role: 'user', content: pregunta }];
    setMensajes(conUsuario);
    setCargando(true);

    // El historial que se manda al modelo debe empezar en "user"
    // (se descarta el saludo inicial del asistente).
    const historial = [...conUsuario];
    while (historial.length && historial[0].role === 'assistant') historial.shift();

    try {
      const respuesta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historial }),
      });

      if (!respuesta.ok || !respuesta.body) {
        const datos = await respuesta.json().catch(() => ({}));
        setMensajes((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              datos.error ||
              'No pude responder en este momento. Escríbenos por WhatsApp al 315 605 5016. 🙏',
          },
        ]);
        return;
      }

      // Placeholder que se irá llenando con el streaming
      setMensajes((prev) => [...prev, { role: 'assistant', content: '' }]);

      const lector = respuesta.body.getReader();
      const decodificador = new TextDecoder();
      let acumulado = '';

      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        acumulado += decodificador.decode(value, { stream: true });
        setMensajes((prev) => {
          const copia = [...prev];
          copia[copia.length - 1] = { role: 'assistant', content: acumulado };
          return copia;
        });
      }

      // Si el stream cerró sin texto, evita que la burbuja quede
      // con los puntos de "escribiendo..." para siempre.
      if (acumulado.trim() === '') {
        setMensajes((prev) => {
          const copia = [...prev];
          copia[copia.length - 1] = {
            role: 'assistant',
            content:
              'No recibí respuesta esta vez. Intenta de nuevo o escríbenos por WhatsApp al 315 605 5016. 🙏',
          };
          return copia;
        });
      }
    } catch {
      setMensajes((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Se cayó la conexión. Escríbenos por WhatsApp al 315 605 5016 y te ayudamos. 🙏',
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  const alEnviarFormulario = (e) => {
    e.preventDefault();
    enviar(entrada);
  };

  return (
    <>
      {/* Botón flotante que abre el chat (abajo a la izquierda) */}
      {!abierto && (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label="Abrir el asistente virtual"
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 rounded-full bg-navy py-3.5 pl-4 pr-5 text-white shadow-xl ring-1 ring-white/10 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-7 w-7 items-center justify-center">
            <svg className="h-7 w-7 text-naranja" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {/* Punto verde de "en línea" */}
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-verde ring-2 ring-navy" />
          </span>
          <span className="text-sm font-bold">Asistente</span>
        </button>
      )}

      {/* Panel del chat */}
      {abierto && (
        <div
          role="dialog"
          aria-label="Asistente virtual de Panamericana Sur"
          className="fixed bottom-5 left-1/2 z-50 flex h-[75vh] max-h-[600px] w-[92vw] max-w-sm -translate-x-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 sm:left-5 sm:translate-x-0"
        >
          {/* Encabezado */}
          <div className="flex items-center justify-between gap-3 bg-navy px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg className="h-5 w-5 text-naranja" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">Asistente Panamericana Sur</p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-verde" />
                  En línea
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar el asistente"
              className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Barra diagonal tricolor de la marca */}
          <div className="flex h-1.5 overflow-hidden" aria-hidden="true">
            <span className="-ml-2 flex-1 -skew-x-[24deg] bg-naranja" />
            <span className="flex-1 -skew-x-[24deg] bg-navy" />
            <span className="-mr-2 flex-1 -skew-x-[24deg] bg-verde" />
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {mensajes.map((mensaje, i) => (
              <div
                key={i}
                className={`flex ${mensaje.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    mensaje.role === 'user'
                      ? 'rounded-br-sm bg-navy text-white'
                      : 'rounded-bl-sm bg-white text-navy shadow-sm ring-1 ring-black/5'
                  }`}
                >
                  {mensaje.content === '' ? (
                    // Puntos "escribiendo..." mientras llega el streaming
                    <span className="flex gap-1 py-1" aria-label="Escribiendo">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gristexto/60 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gristexto/60 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gristexto/60" />
                    </span>
                  ) : (
                    formatear(mensaje.content)
                  )}
                </div>
              </div>
            ))}

            {/* Sugerencias (solo al inicio de la conversación) */}
            {mensajes.length === 1 && !cargando && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGERENCIAS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => enviar(sug)}
                    className="rounded-full border border-navy/15 bg-white px-3 py-1.5 text-left text-xs font-semibold text-navy transition-colors hover:border-naranja hover:text-naranjaoscuro"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
            <div ref={refFin} />
          </div>

          {/* Caja de texto */}
          <form onSubmit={alEnviarFormulario} className="flex items-center gap-2 border-t border-gray-100 p-3">
            <input
              ref={refEntrada}
              type="text"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Escribe tu pregunta..."
              aria-label="Escribe tu pregunta"
              className="min-w-0 flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-400 focus:border-naranja focus:ring-2 focus:ring-naranja/30"
            />
            <button
              type="submit"
              disabled={cargando || entrada.trim() === ''}
              aria-label="Enviar mensaje"
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-naranjaoscuro text-white transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Aviso legal */}
          <p className="bg-white px-3 pb-2.5 text-center text-[10px] leading-tight text-gristexto">
            Asistente virtual. Para precios y pedidos te confirmamos por WhatsApp.
          </p>
        </div>
      )}
    </>
  );
}
