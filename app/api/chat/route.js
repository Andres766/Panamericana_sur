import { SYSTEM_ASISTENTE } from '@/lib/promptAsistente';

// Esta ruta corre en el servidor (función serverless en Vercel).
// Aquí vive la clave secreta GEMINI_API_KEY: nunca llega al navegador.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Modelo de Gemini. "flash" es rápido y económico, ideal para atención.
// 'gemini-flash-latest' apunta siempre al último flash disponible y tiene
// cupo en el nivel gratuito de este proyecto (verificado jul 2026).
// Alternativas con cupo gratis: 'gemini-flash-lite-latest' (más liviano) o
// 'gemini-3.6-flash'. Para más calidad, un modelo "pro" (más costoso).
const MODELO = 'gemini-flash-latest';

// Límites para proteger el costo y evitar abusos
const MAX_MENSAJES = 20; // solo se conservan los últimos N turnos
const MAX_CARACTERES = 2000; // por mensaje

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Si no hay clave configurada, se avisa con claridad (no revienta el sitio)
  if (!apiKey) {
    return Response.json(
      { error: 'El asistente aún no está configurado (falta GEMINI_API_KEY).' },
      { status: 503 }
    );
  }

  // Lee y valida la conversación que envía el navegador
  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const mensajesEntrada = Array.isArray(cuerpo?.messages) ? cuerpo.messages : null;
  if (!mensajesEntrada || mensajesEntrada.length === 0) {
    return Response.json({ error: 'No se recibió ningún mensaje.' }, { status: 400 });
  }
  // Rechaza payloads absurdamente grandes antes de procesarlos (anti-abuso)
  if (mensajesEntrada.length > 100) {
    return Response.json({ error: 'Demasiados mensajes en la solicitud.' }, { status: 400 });
  }

  // Sanea: solo roles válidos, texto recortado, y solo los últimos turnos
  const mensajes = mensajesEntrada
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim() !== ''
    )
    .slice(-MAX_MENSAJES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CARACTERES) }));

  if (mensajes.length === 0 || mensajes[mensajes.length - 1].role !== 'user') {
    return Response.json({ error: 'La conversación no es válida.' }, { status: 400 });
  }

  // Convierte los mensajes al formato de Gemini (el rol "assistant" se llama "model")
  const contents = mensajes.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const cuerpoGemini = {
    systemInstruction: { parts: [{ text: SYSTEM_ASISTENTE }] },
    contents,
    generationConfig: { maxOutputTokens: 1024 },
  };

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:streamGenerateContent` +
    `?alt=sse&key=${encodeURIComponent(apiKey)}`;

  let respuestaGemini;
  try {
    respuestaGemini = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpoGemini),
    });
  } catch (error) {
    console.error('No se pudo conectar con Gemini:', error);
    return Response.json(
      { error: 'No pude conectar con el asistente. Escríbenos por WhatsApp al 315 605 5016.' },
      { status: 502 }
    );
  }

  if (!respuestaGemini.ok || !respuestaGemini.body) {
    const detalle = await respuestaGemini.text().catch(() => '');
    console.error('Gemini respondió con error:', respuestaGemini.status, detalle);
    return Response.json(
      { error: 'El asistente no pudo responder en este momento. Escríbenos por WhatsApp al 315 605 5016.' },
      { status: 502 }
    );
  }

  // Lee el streaming SSE de Gemini y reenvía solo el texto al navegador
  const codificador = new TextEncoder();
  const decodificador = new TextDecoder();

  const flujo = new ReadableStream({
    async start(controller) {
      // Envía texto al navegador; si el cliente ya cerró, no revienta
      const enviar = (texto) => {
        if (!texto) return;
        try {
          controller.enqueue(codificador.encode(texto));
        } catch {
          // El navegador cerró la conexión: se ignora
        }
      };

      // Procesa una línea del stream SSE ("data: {json}")
      const emitirLinea = (linea) => {
        const l = linea.trim();
        if (!l.startsWith('data:')) return;
        const json = l.slice(5).trim();
        if (!json || json === '[DONE]') return;
        try {
          const dato = JSON.parse(json);
          const texto =
            dato?.candidates?.[0]?.content?.parts
              ?.map((p) => p.text || '')
              .join('') ?? '';
          enviar(texto);
        } catch {
          // Línea incompleta o no-JSON: se ignora
        }
      };

      try {
        const lector = respuestaGemini.body.getReader();
        let buffer = '';

        while (true) {
          const { done, value } = await lector.read();
          if (done) break;
          buffer += decodificador.decode(value, { stream: true });

          let salto;
          while ((salto = buffer.indexOf('\n')) !== -1) {
            emitirLinea(buffer.slice(0, salto));
            buffer = buffer.slice(salto + 1);
          }
        }
        // Procesa cualquier resto que quedó sin salto de línea final
        if (buffer.trim()) emitirLinea(buffer);
      } catch (error) {
        console.error('Error leyendo el stream de Gemini:', error);
        enviar(
          'Uy, tuve un problema para responder. Escríbenos por WhatsApp al 315 605 5016 y te ayudamos enseguida. 🙏'
        );
      } finally {
        try {
          controller.close();
        } catch {
          // El stream ya estaba cerrado: se ignora
        }
      }
    },
  });

  return new Response(flujo, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
