// ============================================================
// Productos de la sección "Nuestros Productos".
//
// Los productos 1-14 salen del catálogo oficial del cliente
// (catalogo_ferreteria_panamericana.pdf); sus imágenes son los
// renders reales del catálogo, ya optimizados en
// public/images/productos/. Los productos 15-19 (WPC, UV mármol,
// lámina policarbonato, tanque y contenedores) los envió el cliente
// por WhatsApp (nov 2026); sus imágenes son PROVISIONALES hasta
// recibir las fotos reales (reemplazar el archivo con el mismo nombre).
//
// Campos:
// - nombre:      igual que en el catálogo.
// - medida:      largo × ancho y espesor (no todos la tienen;
//                el catálogo no da medidas de caballetes/accesorios).
// - descripcion: resumen corto de la ficha del catálogo.
// - imagen:      render del producto (fondo blanco).
// ============================================================

export const products = [
  {
    id: 1,
    nombre: 'Teja UPVC Blanca Cresta Baja',
    medida: 'Largo 11.80 m × Ancho 1.13 m · Espesor 2 mm',
    descripcion:
      'Ligera, resistente y eficiente. Excelente aislamiento térmico y alta resistencia a la corrosión. Ideal para viviendas, bodegas, galpones y proyectos comerciales.',
    imagen: '/images/productos/teja-upvc-blanca-cresta-baja.jpg',
  },
  {
    id: 2,
    nombre: 'Teja UPVC Blanca Cresta Alta',
    medida: 'Largo 11.80 m × Ancho 1.07 m · Espesor 2.5 mm',
    descripcion:
      'Mayor rigidez para grandes luces. Ideal para bodegas, centros logísticos, instalaciones industriales, escenarios deportivos y proyectos agropecuarios.',
    imagen: '/images/productos/teja-upvc-blanca-cresta-alta.jpg',
  },
  {
    id: 3,
    nombre: 'Teja UPVC Colonial',
    medida: 'Largo 10.66 m × Ancho 1.05 m · Espesor 2 mm',
    descripcion:
      'La elegancia de la teja tradicional con la tecnología del UPVC: menor peso, mayor durabilidad, requiere muy poco mantenimiento y alta resistencia. Ideal para viviendas, hoteles y fincas.',
    imagen: '/images/productos/teja-upvc-colonial.jpg',
  },
  {
    id: 4,
    nombre: 'Teja Policarbonato Cristal Cresta Alta',
    medida: 'Largo 6.00 m × Ancho 1.07 m · Espesor 1.2 mm',
    descripcion:
      'Iluminación natural, alta resistencia al impacto y a los rayos UV. Ideal para bodegas, terrazas, pasillos y cubiertas industriales.',
    imagen: '/images/productos/teja-policarbonato-cresta-alta.jpg',
  },
  {
    id: 5,
    nombre: 'Teja Policarbonato Cristal Cresta Baja',
    medida: 'Largo 6.00 m × Ancho 1.13 m · Espesor 1.2 mm',
    descripcion:
      'Más luz, más ahorro y mejor apariencia. Alta transmisión de luz con protección UV, para complementar cubiertas de cresta baja.',
    imagen: '/images/productos/teja-policarbonato-cresta-baja.jpg',
  },
  {
    id: 6,
    nombre: 'Caballetes para Cresta Baja',
    descripcion:
      'El complemento perfecto para una cubierta segura: acabado profesional en la cumbrera y protección contra filtraciones. Varios colores disponibles.',
    imagen: '/images/productos/caballetes-cresta-baja.jpg',
  },
  {
    id: 7,
    nombre: 'Caballetes para Cresta Alta',
    descripcion:
      'Protección y acabado profesional. Se adaptan perfectamente a las tejas de cresta alta, mejorando la impermeabilización de la cubierta.',
    imagen: '/images/productos/caballetes-cresta-alta.jpg',
  },
  {
    id: 8,
    nombre: 'Caballetes Coloniales',
    descripcion:
      'Elegancia y protección en cada detalle. Complementan las cubiertas coloniales con un acabado armónico y resistente al clima.',
    imagen: '/images/productos/caballetes-coloniales.jpg',
  },
  {
    id: 9,
    nombre: 'Perfiles Galvanizados',
    descripcion:
      'La base sólida de una gran estructura. Alta resistencia para cubiertas, estructuras metálicas, cerramientos y proyectos industriales.',
    imagen: '/images/productos/perfiles-galvanizados.jpg',
  },
  {
    id: 10,
    nombre: 'Sistema Completo de Canales',
    descripcion:
      'Conducción eficiente del agua lluvia en presentación cuadrada y redonda. Protege fachadas, cubiertas y cimentaciones.',
    imagen: '/images/productos/sistema-de-canales.jpg',
  },
  {
    id: 11,
    nombre: 'Set de Fijación',
    descripcion:
      'Instalación segura y duradera: tornillos, capelotes, capuchones y elementos de fijación especializados para tus tejas.',
    imagen: '/images/productos/set-de-fijacion.jpg',
  },
  {
    id: 12,
    nombre: 'Alambre de Amarre',
    descripcion:
      'Resistencia y versatilidad para amarres en construcción, estructuras metálicas y aplicaciones industriales.',
    imagen: '/images/productos/alambre-de-amarre.jpg',
  },
  {
    id: 13,
    nombre: 'Sellantes',
    descripcion:
      'Protección total contra filtraciones: sellantes de alto desempeño para juntas, uniones y cubiertas, con máxima adherencia.',
    imagen: '/images/productos/sellantes.jpg',
  },
  {
    id: 14,
    nombre: 'Cemento Cemex',
    descripcion:
      'La fuerza que construye grandes proyectos. Cemento de alta calidad, ideal para viviendas, edificaciones, obras civiles y remodelaciones.',
    imagen: '/images/productos/cemento-cemex.jpg',
  },
  {
    id: 15,
    nombre: 'Panel WPC Interior (palillería)',
    medida: 'Largo 2.90 m × Ancho 16.8 cm · Espesor 2.4 cm',
    descripcion:
      'Revestimiento de acanalado vertical en WPC para interiores: la elegancia del acabado en madera para salas, cabeceras de cama y muros acentuados. Liviano, resistente a la humedad, sin mantenimiento y de instalación rápida.',
    imagen: '/images/productos/panel-wpc-interior.jpg',
  },
  {
    id: 16,
    nombre: 'Lámina UV Mármol',
    medida: 'Alto 2.44 m × Ancho 1.22 m · Espesor 2.5 mm',
    descripcion:
      'El sofisticado acabado del mármol real sin obra pesada: láminas de PVC con recubrimiento UV, brillo impecable, vetas ultrarrealistas y alta resistencia al desgaste, la humedad y las manchas. Perfectas para salas, recepciones, baños y muros acentuados.',
    imagen: '/images/productos/lamina-uv-marmol.jpg',
  },
  {
    id: 17,
    nombre: 'Lámina Policarbonato Cristal',
    medida: 'Largo 11.80 m × Ancho 2.10 m · Espesor 6 mm',
    descripcion:
      'Plástico transparente muy resistente al impacto, ideal para aprovechar la luz natural: invernaderos, cubiertas, techos de centros comerciales, terrazas, piscinas, patios y fachadas. Ligera y fácil de manipular.',
    imagen: '/images/productos/lamina-policarbonato-cristal.jpg',
  },
  {
    id: 18,
    nombre: 'Tanque de Agua en Acero Galvanizado 5.000 L',
    medida: 'Capacidad 5.000 L · Diámetro 3 m × Alto 0.92 m · Lámina 1.2 mm',
    descripcion:
      'Tanque circular de almacenamiento de agua en acero galvanizado con cubierta metálica. Una solución para fincas, proyectos agrícolas, industriales y de construcción.',
    imagen: '/images/productos/tanque-acero-galvanizado.jpg',
  },
  {
    id: 19,
    nombre: 'Contenedores',
    descripcion:
      'La solución definitiva para almacenamiento seguro, transporte de carga o proyectos de construcción modular. Ideales para bodegas, oficinas móviles y proyectos arquitectónicos.',
    imagen: '/images/productos/contenedores.jpg',
  },
];
