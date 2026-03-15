/**
 * EventHandlers.js
 * Manejadores de eventos de la aplicación.
 *
 * Entrada: eventos del DOM (submit, click, change).
 * Salida:  coordina UIManager y CalculadoraService según la acción del usuario.
 *
 * REGLA: no manipula el DOM directamente ni contiene cálculos matemáticos.
 */

import {
  parsearNumero,
  calcularSubtotalIngrediente,
  calcularCostoTotalIngredientes,
  calcularDesglosGanancia,
  dividirEnPorciones,
  sumarCostoEnvase,
} from './CalculadoraService.js';

export class EventHandlers {
  /**
   * @param {import('./UIManager.js').UIManager} ui
   * @param {{ preciosPorPorcentaje: Object, ultimoPrecioPorPorcion: number }} estadoCalculo
   */
  constructor(ui, estadoCalculo) {
    this._ui     = ui;
    this._estado = estadoCalculo;
  }

  // ─── Crear lista de ingredientes ──────────────────────────────────────────

  /** Solicita nombres vía prompt y delega el renderizado al UIManager. */
  manejarCrearIngredientes(evento) {
    evento.preventDefault();
    this._ui.ajustarAlturaMain();

    const cantidad = parseInt(
      document.getElementById('cantidadIngredientes').value, 10,
    );

    const nombres = [];
    for (let i = 1; i <= cantidad; i++) {
      const nombre = prompt(`Ingrediente #${i}:`);
      if (nombre === null) return;
      nombres.push(nombre.trim() || `Ingrediente ${i}`);
    }

    this._ui.renderizarListaIngredientes(cantidad, nombres);
  }

  // ─── Calcular costos ──────────────────────────────────────────────────────

  /** Orquesta la extracción de datos, cálculos y renderizado completo. */
  manejarCalcularCostos(evento) {
    evento.preventDefault();
    this._ui.limpiarResultadosAnteriores();
    this._ui.ajustarAlturaMain();

    const datosIngredientes = this._extraerDatosIngredientes();
    if (!datosIngredientes) return;

    const filasTabla = datosIngredientes.map(
      ({ nombre, precio, cantidadPaquete, cantidadUtilizada }) => ({
        nombre,
        subtotal: calcularSubtotalIngrediente(precio, cantidadPaquete, cantidadUtilizada),
      }),
    );
    const totalIngredientes = calcularCostoTotalIngredientes(
      filasTabla.map((f) => f.subtotal),
    );

    this._ui.renderizarTablaCostoIngredientes(filasTabla);
    this._ui.renderizarTablaResumen(totalIngredientes);

    const desglose = calcularDesglosGanancia(totalIngredientes);
    this._estado.precioVenta            = desglose.precioVenta;
    this._estado.ultimoPrecioPorPorcion = 0;

    this._ui.mostrarDesglosGanancia(desglose);
    this._registrarEventosAcciones();
  }

  // ─── Métodos internos de coordinación ────────────────────────────────────

  /**
   * Lee y valida los inputs de la lista de ingredientes del DOM.
   * @returns {Array|null} Array de datos o null si hay error de validación.
   */
  _extraerDatosIngredientes() {
    const items = document
      .getElementById('listaIngredientes')
      .getElementsByTagName('li');
    const datos = [];

    for (const item of items) {
      const nombre = item.querySelector('span').textContent;
      const [inputPrecio, inputCantPaquete, inputCantUtilizada] =
        item.querySelectorAll('input[type="text"]');

      const precio            = parsearNumero(inputPrecio.value);
      const cantidadPaquete   = parsearNumero(inputCantPaquete.value);
      const cantidadUtilizada = parsearNumero(inputCantUtilizada.value);

      if (isNaN(precio) || isNaN(cantidadPaquete) || isNaN(cantidadUtilizada)) {
        alert('Ingrese valores numéricos válidos en todos los campos.');
        return null;
      }
      datos.push({ nombre, precio, cantidadPaquete, cantidadUtilizada });
    }
    return datos;
  }

  /** Registra los listeners de los formularios de acción post-cálculo. */
  _registrarEventosAcciones() {
    const {
      inputDivision,      botonDividir,
      inputEnvaseDirecto, botonEnvaseDirecto,
      inputEnvasePorcion, botonEnvasePorcion,
      contenedorResultados,
    } = this._ui.renderizarFormulariosAcciones();

    this._ui.crearContenedorDivision(contenedorResultados);
    this._ui.ocultarFormEnvasePorcion();

    botonDividir.addEventListener('click', (e) => {
      e.preventDefault();
      this._manejarDividirPorciones(inputDivision, contenedorResultados);
    });
    botonEnvaseDirecto.addEventListener('click', (e) => {
      e.preventDefault();
      this._manejarSumarEnvaseDirecto(inputEnvaseDirecto, contenedorResultados);
    });
    botonEnvasePorcion.addEventListener('click', (e) => {
      e.preventDefault();
      this._manejarSumarEnvasePorcion(inputEnvasePorcion, contenedorResultados);
    });
  }

  _manejarDividirPorciones(inputDivision, contenedorResultados) {
    const cantidadPorciones = parsearNumero(inputDivision.value);
    if (isNaN(cantidadPorciones) || cantidadPorciones <= 0) {
      alert('Ingrese un número válido de porciones.');
      return;
    }

    const precioFinal = this._estado.precioVenta;
    if (!precioFinal) {
      alert('No se ha calculado el total aún.');
      return;
    }

    const precioPorPorcion = dividirEnPorciones(precioFinal, cantidadPorciones);
    this._estado.ultimoPrecioPorPorcion = precioPorPorcion;

    this._ui.mostrarResultadoDivision(precioPorPorcion, contenedorResultados);
    this._ui.mostrarFormEnvasePorcion();
    this._ui.ocultarFormEnvaseDirecto();
  }

  _manejarSumarEnvaseDirecto(inputEnvase, contenedorResultados) {
    const costoEnvase = parsearNumero(inputEnvase.value);
    if (isNaN(costoEnvase)) {
      alert('Ingrese un valor numérico válido para el envase.');
      return;
    }

    const precioFinal = this._estado.precioVenta;
    if (!precioFinal) {
      alert('No se ha calculado el total aún.');
      return;
    }

    this._ui.mostrarResultadoEnvaseDirecto(
      sumarCostoEnvase(precioFinal, costoEnvase), contenedorResultados,
    );
    this._ui.ocultarFormDivision();
  }

  _manejarSumarEnvasePorcion(inputEnvase, contenedorResultados) {
    const costoEnvase      = parsearNumero(inputEnvase.value);
    const precioPorPorcion = this._estado.ultimoPrecioPorPorcion;

    if (isNaN(costoEnvase)) {
      alert('Ingrese un valor numérico válido para el envase.');
      return;
    }
    if (!precioPorPorcion) {
      alert('Primero divida el total en porciones.');
      return;
    }

    this._ui.mostrarResultadoEnvasePorcion(
      sumarCostoEnvase(precioPorPorcion, costoEnvase), contenedorResultados,
    );
  }
}
