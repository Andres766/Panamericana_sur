/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Colores oficiales de la marca Panamericana Sur | Importadora Allianz
      colors: {
        navy: '#1E2347',      // Primario
        naranja: '#E8460A',   // Acento principal (títulos, íconos, detalles)
        verde: '#3AAD2E',     // Acento secundario (íconos, detalles)
        grismarca: '#8A8A8A', // Gris corporativo (decorativo)

        // Variantes para accesibilidad (contraste WCAG AA):
        naranjaoscuro: '#C63C08', // Fondos de botón con texto blanco (5.2:1)
        verdeoscuro: '#2A8022',   // Fondos de botón WhatsApp con texto blanco (5:1)
        gristexto: '#6E6E6E',     // Texto corrido gris legible sobre blanco (5:1)
      },
      fontFamily: {
        // Montserrat se carga en app/layout.js con next/font (display: swap)
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
