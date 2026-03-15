/**
 * UIManager.js
 * Fachada de Gestión de Interfaz (UI)
 *
 * Delega el renderizado a UITablaRenderer (tablas, ingredientes, porcentaje)
 * y UIFormBuilder (formularios de acción, resultados, visibilidad).
 * La API pública permanece idéntica — EventHandlers no necesita cambios.
 */

import { UITablaRenderer } from './UITablaRenderer.js';
import { UIFormBuilder }   from './UIFormBuilder.js';

export class UIManager {
  constructor() {
    this._tablas = new UITablaRenderer();
    this._forms  = new UIFormBuilder();
  }

  // ─── Utilidades generales ────────────────────────────────────────────────
  ajustarAlturaMain() {
    document.querySelector('main').style.height = 'auto';
  }

  /**
   * Elimina del DOM los nodos generados en una ejecución anterior,
   * evitando duplicación al recalcular.
   */
  limpiarResultadosAnteriores() {
    const main = document.querySelector('main');
    ['sumaMasdividir', 'resultadosDeLasSumas'].forEach((id) => {
      const nodo = document.getElementById(id);
      if (nodo && nodo.parentNode === main) main.removeChild(nodo);
    });
    this._tablas.resetearEstadoPorcentaje();
  }

  // ─── Delegaciones a UITablaRenderer ──────────────────────────────────────

  renderizarListaIngredientes(cantidad, nombres) {
    return this._tablas.renderizarListaIngredientes(cantidad, nombres);
  }

  renderizarTablaCostoIngredientes(filas) {
    return this._tablas.renderizarTablaCostoIngredientes(filas);
  }

  renderizarTablaResumen(totalSimple) {
    return this._tablas.renderizarTablaResumen(totalSimple);
  }

  mostrarDesglosGanancia(desglose) {
    return this._tablas.mostrarDesglosGanancia(desglose);
  }

  // ─── Delegaciones a UIFormBuilder ────────────────────────────────────────

  renderizarFormulariosAcciones() {
    return this._forms.renderizarFormulariosAcciones();
  }

  crearContenedorDivision(contenedorResultados) {
    return this._forms.crearContenedorDivision(contenedorResultados);
  }

  mostrarResultadoDivision(precioPorPorcion) {
    return this._forms.mostrarResultadoDivision(precioPorPorcion);
  }

  mostrarResultadoEnvaseDirecto(precioConEnvase, contenedorResultados) {
    return this._forms.mostrarResultadoEnvaseDirecto(precioConEnvase, contenedorResultados);
  }

  mostrarResultadoEnvasePorcion(precioConEnvase, contenedorResultados) {
    return this._forms.mostrarResultadoEnvasePorcion(precioConEnvase, contenedorResultados);
  }

  ocultarFormEnvasePorcion()  { this._forms.ocultarFormEnvasePorcion();  }
  mostrarFormEnvasePorcion()  { this._forms.mostrarFormEnvasePorcion();  }
  ocultarFormEnvaseDirecto()  { this._forms.ocultarFormEnvaseDirecto();  }
  ocultarFormDivision()       { this._forms.ocultarFormDivision();       }
}
