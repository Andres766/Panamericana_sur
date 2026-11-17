// ============================================================
// Fotos de la sección "Obras realizadas con nuestros productos".
//
// Son OBRAS REALES del cliente: las fotos 1-6 salen del catálogo
// oficial y las 7-12 las envió el cliente por correo (nov 2026),
// con lugar, producto y área en el asunto de cada correo. Los
// originales están en material-cliente/obras/. Cada foto tiene
// los datos que se muestran al ampliarla en el lightbox:
//
// VIDEOS: un elemento con el campo "video" se muestra en la
// cuadrícula con un botón de play (usa "imagen" como póster si
// existe; si no, el primer fotograma del video) y se reproduce
// dentro del lightbox. Los .mp4 viven en public/videos/.
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
    alt: 'Cubierta en teja UPVC blanca cresta alta — Colegio San Felipe Neri',
    lugar: 'Colegio San Felipe Neri, Pasto',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Área cubierta: 680 m²',
    descripcion:
      'Cubierta metálica en arco de 680 m² para las zonas comunes del colegio, instalada con teja UPVC blanca para lograr aislamiento térmico y una larga vida útil sin corrosión.',
  },
  {
    id: 2,
    imagen: '/images/galeria/foto2.jpg',
    alt: 'Cubierta en teja UPVC blanca cresta alta — Parque Bolívar',
    lugar: 'Parque Bolívar, Pasto',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Área cubierta: 620 m²',
    descripcion:
      'Estructura en arco de 620 m² para espacio público, cubierta con teja UPVC de cresta alta, que soporta grandes luces y resiste la humedad y el clima frío de la región.',
  },
  {
    id: 3,
    imagen: '/images/galeria/foto3.jpg',
    alt: 'Cubierta en teja UPVC blanca cresta alta — Plazoleta de comidas, sector Morasurco',
    lugar: 'Plazoleta de comidas, sector Morasurco',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
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
    medida: 'Largo 11.80 m × Ancho 1.05 m',
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
  {
    id: 7,
    imagen: '/images/galeria/foto7.jpg',
    alt: 'Interior terminado de la plaza de comidas Gourmet — sector Morasurco',
    lugar: 'Plaza de comidas Gourmet, sector Morasurco',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Interior terminado de la plaza de comidas: la cubierta en teja UPVC aporta confort térmico y acústico a un espacio comercial moderno y acogedor.',
  },
  {
    id: 8,
    imagen: '/images/galeria/foto8.jpg',
    alt: 'Cubiertas en teja UPVC colonial — obra en Sandoná',
    lugar: 'Sandoná, Nariño',
    producto: 'Teja UPVC Colonial',
    medida: 'Largo 11.80 m × Ancho 1.05 m',
    descripcion:
      'Conjunto de cubiertas en teja UPVC colonial que conserva la estética tradicional del municipio con un material liviano, durable y sin mantenimiento.',
  },
  {
    id: 9,
    imagen: '/images/galeria/foto9.jpg',
    alt: 'Detalle de cubierta en teja UPVC colonial con caballetes — Sandoná',
    lugar: 'Sandoná, Nariño',
    producto: 'Teja UPVC Colonial + Caballetes',
    medida: 'Largo 11.80 m × Ancho 1.05 m',
    descripcion:
      'Detalle del acabado: teja colonial con sus caballetes instalados, que rematan la cumbrera, impermeabilizan la cubierta y logran un terminado uniforme.',
  },
  {
    id: 10,
    imagen: '/images/galeria/foto10.jpg',
    alt: 'Polideportivo cubierto con teja UPVC cresta alta — El Encano',
    lugar: 'Polideportivo El Encano, corregimiento de Pasto',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Área cubierta: 920 m²',
    descripcion:
      'Suministro de teja UPVC cresta alta blanca de 2.5 mm para el polideportivo del corregimiento: 920 m² de cubierta en arco frente a la laguna de La Cocha.',
  },
  {
    id: 11,
    imagen: '/images/galeria/foto11.jpg',
    alt: 'Estructura del polideportivo de Jongovito en construcción',
    lugar: 'Polideportivo Jongovito, corregimiento de Pasto',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Área cubierta: 740 m²',
    descripcion:
      'Obra del polideportivo de Jongovito: suministro de 740 m² de teja UPVC cresta alta blanca de 2.5 mm para la cubierta en arco del escenario deportivo.',
  },
  {
    id: 12,
    imagen: '/images/galeria/foto12.jpg',
    alt: 'Polideportivo Bellavista cubierto con teja UPVC — Catambuco',
    lugar: 'Polideportivo Bellavista, corregimiento de Catambuco',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Área cubierta: 740 m²',
    descripcion:
      'Cubierta de 740 m² en teja UPVC cresta alta blanca de 2.5 mm para el polideportivo de Bellavista, resistente al clima frío y a la humedad de la zona rural.',
  },
  {
    id: 17,
    imagen: '/images/galeria/foto15.jpg',
    alt: 'Polideportivo Bellavista terminado, con cubierta en arco de teja UPVC — Catambuco',
    lugar: 'Polideportivo Bellavista, corregimiento de Catambuco',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Área cubierta: 740 m²',
    descripcion:
      'La obra terminada: cancha cubierta en arco frente a la iglesia del sector Bellavista, con teja UPVC que da sombra, protege de la lluvia y soporta grandes luces.',
  },
  {
    id: 15,
    imagen: '/images/galeria/foto13.jpg',
    alt: 'Cubierta a dos aguas en teja UPVC blanca cresta alta — Obra Fuertes Mejía',
    lugar: 'Obra Fuertes Mejía',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Cubierta a dos aguas sobre estructura metálica: la teja UPVC no se oxida y resiste la humedad y el clima de montaña.',
  },
  {
    id: 16,
    imagen: '/images/galeria/foto14.jpg',
    alt: 'Instalación de teja UPVC blanca cresta alta — Obra Fuertes Mejía',
    lugar: 'Obra Fuertes Mejía',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Vista interior durante la instalación: la teja de 11.80 m cubre grandes luces con pocas uniones, lo que agiliza el montaje y reduce los puntos de filtración.',
  },
  {
    id: 13,
    video: '/videos/obra-plaza-comidas-morasurco.mp4',
    imagen: '/videos/poster-morasurco.jpg',
    alt: 'Video de la obra de la plaza de comidas Gourmet — sector Morasurco',
    lugar: 'Plaza de comidas Gourmet, sector Morasurco',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Recorrido en video por la obra de la plaza de comidas: estructura metálica y cubierta en teja UPVC blanca de cresta alta, del montaje al interior terminado.',
  },
  {
    id: 14,
    video: '/videos/obra-putumayo-santiago.mp4',
    alt: 'Video de obra en el municipio de Santiago, Alto Putumayo',
    lugar: 'Municipio de Santiago, Alto Putumayo',
    producto: 'Teja UPVC Blanca Cresta Alta · 2.5 mm',
    medida: 'Largo 11.80 m × Ancho 1.07 m',
    descripcion:
      'Video de obra en el Alto Putumayo: nuestros productos llegan a proyectos en diferentes regiones, con despacho hasta el sitio de la obra.',
  },
];
