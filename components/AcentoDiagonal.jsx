/**
 * Acento decorativo de la identidad de la marca: tres trazos
 * DIAGONALES (naranja, navy y verde), como los que acompañan
 * los títulos y listas en las piezas gráficas de la empresa.
 *
 * Se usa bajo los títulos de sección y en el hero.
 * @param {boolean} enOscuro - En fondos oscuros el trazo central es blanco.
 * @param {string} className - Clases extra (márgenes, etc.).
 */
export default function AcentoDiagonal({ enOscuro = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden="true">
      <span className="h-2.5 w-8 -skew-x-[24deg] rounded-[2px] bg-naranja" />
      <span
        className={`h-2.5 w-8 -skew-x-[24deg] rounded-[2px] ${
          enOscuro ? 'bg-white' : 'bg-navy'
        }`}
      />
      <span className="h-2.5 w-8 -skew-x-[24deg] rounded-[2px] bg-verde" />
    </span>
  );
}
