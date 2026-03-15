/**
 * PdfService.js
 * Módulo de Generación de Archivos
 *
 * Entrada: ID del elemento HTML a exportar y nombre del archivo destino.
 * Salida:  Descarga automática del archivo PDF en el navegador.
 *
 * Depende de la librería global `html2pdf` cargada desde CDN en index.html.
 */

/** Configuración base compartida por todas las exportaciones. */
const CONFIGURACION_PDF = {
  margin: 5,
  image:      { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 10 },
  jsPDF:      { unit: 'mm', format: 'a4', orientation: 'portrait' },
};

/**
 * Genera y descarga un PDF a partir del elemento HTML indicado.
 *
 * @param {string} idElemento   - ID del nodo DOM que se exportará.
 * @param {string} nombreArchivo - Nombre del archivo PDF resultante (con extensión).
 */
export function generarPDF(idElemento, nombreArchivo) {
  const elemento = document.getElementById(idElemento);

  if (!elemento) {
    console.error(`PdfService: no se encontró el elemento con id="${idElemento}"`);
    return;
  }

  const opciones = { ...CONFIGURACION_PDF, filename: nombreArchivo };
  html2pdf().set(opciones).from(elemento).save();
}
