// ============================================================
// Datos generales del negocio.
// Edita este archivo para cambiar teléfonos, ciudad, horario,
// mapa o redes sociales sin tocar los componentes.
// ============================================================

export const site = {
  nombre: 'Panamericana Sur',
  importadora: 'Importadora Allianz',

  // Teléfonos tal como se muestran en pantalla
  telefonos: ['315 605 5016', '315 581 5016'],

  // Número de WhatsApp en formato internacional (sin "+" ni espacios)
  whatsapp: '573156055016',

  // Número que marca el botón flotante de llamada
  telefonoLlamada: '+573156055016',

  ciudad: 'Pasto, Nariño — Colombia',

  // Dirección del local (sale en el catálogo oficial del cliente)
  direccion: 'Cl. 12 # 5-23, Barrio Chapal — Salida al Sur',

  // Horario de atención (placeholder: confirmar con el cliente)
  horario: 'Lunes a sábado · 8:00 a.m. — 6:00 p.m.',

  // URL del iframe de Google Maps con el PIN en la dirección del local.
  // Si el pin no queda exacto, en Google Maps: buscar el local ->
  // Compartir -> Insertar un mapa -> copiar el valor del atributo src aquí.
  mapaEmbed:
    'https://maps.google.com/maps?q=Calle%2012%20%23%205-23%2C%20Pasto%2C%20Nari%C3%B1o%2C%20Colombia&t=&z=17&ie=UTF8&iwloc=&output=embed',

  // Redes sociales (agregar las URLs cuando el cliente las entregue)
  redes: {
    facebook: '#',
    instagram: '#',
    tiktok: '#',
  },
};

/**
 * Construye un enlace de WhatsApp con mensaje prellenado.
 * @param {string} mensaje - Texto que aparecerá escrito en el chat.
 * @returns {string} URL lista para usar en un <a href>.
 */
export function linkWhatsApp(mensaje = '') {
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${site.whatsapp}${texto}`;
}
