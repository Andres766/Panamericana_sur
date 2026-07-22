// ============================================================
// Fotos de la sección "Obras realizadas con nuestros productos".
//
// Son OBRAS REALES del cliente (salen del catálogo oficial, que
// indica el lugar y el producto usado en cada una). Cada foto
// tiene los datos que se muestran al ampliarla en el lightbox:
// - lugar:       dónde se hizo la obra.
// - producto:    qué producto de la ferretería se usó.
// - medida:      largo × ancho del producto (vacío si no aplica).
// - descripcion: texto corto (2–3 líneas) sobre la obra.
//
// Para agregar más obras: copia la foto a public/images/galeria/
// (foto7.jpg, foto8.jpg...) y añade aquí un objeto con sus datos.
// ============================================================

export const gallery = [
  {
    id: 1,
    imagen: '/images/galeria/foto1.jpg',
    alt: 'Cubierta en teja UPVC blanca cresta baja — Colegio San Felipe Neri',
    lugar: 'Colegio San Felipe Neri, Pasto',
    producto: 'Teja UPVC Blanca Cresta Baja',
    medida: 'Largo 11.80 m × Ancho 1.13 m',
    descripcion:
      'Cubierta metálica en arco para las zonas comunes del colegio, instalada con teja UPVC blanca de cresta baja para lograr aislamiento térmico y una larga vida útil sin corrosión.',
  },
  {
    id: 2,
    imagen: '/images/galeria/foto2.jpg',
    alt: 'Cubierta en teja UPVC blanca cresta alta — Parque Bolívar',
    lugar: 'Parque Bolívar, Pasto',
    producto: 'Teja UPVC Blanca Cresta Alta',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Estructura en arco para espacio público cubierta con teja UPVC de cresta alta, que soporta grandes luces y resiste la humedad y el clima frío de la región.',
  },
  {
    id: 3,
    imagen: '/images/galeria/foto3.jpg',
    alt: 'Cubierta en teja UPVC blanca cresta alta — Plazoleta de comidas, sector Morasurco',
    lugar: 'Plazoleta de comidas, sector Morasurco',
    producto: 'Teja UPVC Blanca Cresta Alta',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Cubierta para zona comercial de comidas con teja UPVC blanca de cresta alta, que reduce el ruido de la lluvia y el calor interior para mayor comodidad de los visitantes.',
  },
  {
    id: 4,
    imagen: '/images/galeria/foto4.jpg',
    alt: 'Techo en teja UPVC colonial — Colegio San Juan de Pasto',
    lugar: 'Colegio San Juan de Pasto',
    producto: 'Teja UPVC Colonial',
    medida: 'Largo 10.66 m × Ancho 1.05 m',
    descripcion:
      'Techo con acabado colonial que combina la estética tradicional con la tecnología UPVC: menor peso sobre la estructura, alta resistencia a la humedad y muy poco mantenimiento.',
  },
  {
    id: 5,
    imagen: '/images/galeria/foto5.jpg',
    alt: 'Cubierta en teja policarbonato cristal — Colegio San Juan de Pasto',
    lugar: 'Colegio San Juan de Pasto',
    producto: 'Teja Policarbonato Cristal Cresta Alta',
    medida: 'Largo 6.00 m × Ancho 1.07 m',
    descripcion:
      'Pérgola con teja de policarbonato cristal sobre estructura metálica, que deja pasar la luz natural y reduce el consumo de energía durante el día.',
  },
  {
    id: 6,
    imagen: '/images/galeria/foto6.jpg',
    alt: 'Importación directa: descarga de teja en contenedor',
    lugar: 'Pasto, Nariño',
    producto: 'Importación directa',
    medida: '',
    descripcion:
      'Descarga de contenedor con teja importada directamente de fábrica. Al importar sin intermediarios garantizamos disponibilidad, calidad y mejores precios para tu obra.',
  },
];
