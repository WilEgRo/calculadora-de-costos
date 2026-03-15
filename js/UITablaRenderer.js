/**
 * UITablaRenderer.js
 * Renderizado de la lista de ingredientes, tablas de costos
 * y selector de porcentaje de ganancia.
 *
 * Entrada: datos ya calculados listos para mostrar.
 * Salida:  nodos DOM creados en las secciones de tabla y selector.
 */

export class UITablaRenderer {
  constructor() {}

  /** No-op mantenido para compatibilidad con UIManager. */
  resetearEstadoPorcentaje() {}

  // ─── Lista de ingredientes ────────────────────────────────────────────────

  /**
   * Construye cabeceras de columna y una fila de inputs por ingrediente.
   * @param {number}   cantidad            - Número de ingredientes a crear.
   * @param {string[]} nombresIngredientes - Nombres introducidos por el usuario.
   */
  renderizarListaIngredientes(cantidad, nombresIngredientes) {
    const contenedorHeaders = document.getElementById('formulario1');
    const contenedorLista   = document.getElementById('listaIngredientes');

    contenedorHeaders.innerHTML = '';
    contenedorLista.innerHTML   = '';

    [
      { id: 'divPrecio',            texto: 'Precio por la cantidad comprada' },
      { id: 'divTotalPaquete',      texto: 'Total del paquete comprado (gr / ml / U)' },
      { id: 'divCantidadUtilizada', texto: 'Cantidad utilizada en la receta' },
    ].forEach(({ id, texto }) => {
      const h3       = document.createElement('h3');
      h3.id          = id;
      h3.textContent = texto;
      contenedorHeaders.appendChild(h3);
    });

    for (let i = 0; i < cantidad; i++) {
      const liItem = document.createElement('li');

      const spanNombre       = document.createElement('span');
      spanNombre.textContent = nombresIngredientes[i];
      liItem.appendChild(spanNombre);

      [
        { placeholder: 'Precio',             ariaLabel: `Precio de ${nombresIngredientes[i]}` },
        { placeholder: 'Cantidad comprada',  ariaLabel: `Cantidad comprada de ${nombresIngredientes[i]}` },
        { placeholder: 'Cantidad utilizada', ariaLabel: `Cantidad utilizada de ${nombresIngredientes[i]}` },
      ].forEach(({ placeholder, ariaLabel }) => {
        const input       = document.createElement('input');
        input.type        = 'text';
        input.placeholder = placeholder;
        input.setAttribute('aria-label', ariaLabel);
        liItem.appendChild(input);
      });

      contenedorLista.appendChild(liItem);
    }
  }

  // ─── Tablas de resultados ─────────────────────────────────────────────────

  /**
   * Renderiza la Tabla 1: nombre de cada ingrediente y su costo parcial.
   * @param {{ nombre: string, subtotal: number }[]} filas
   */
  renderizarTablaCostoIngredientes(filas) {
    const tHead = document.getElementById('tHead');
    const tBody = document.getElementById('tBody');
    tHead.innerHTML = '';
    tBody.innerHTML = '';

    const trEncabezado = document.createElement('tr');
    ['Ingrediente', 'Precio por ingrediente'].forEach((texto) => {
      const th       = document.createElement('th');
      th.textContent = texto;
      trEncabezado.appendChild(th);
    });
    tHead.appendChild(trEncabezado);

    filas.forEach(({ nombre, subtotal }) => {
      const tr = document.createElement('tr');
      [nombre, `${subtotal.toFixed(2)} BS`].forEach((texto) => {
        const td       = document.createElement('td');
        td.textContent = texto;
        tr.appendChild(td);
      });
      tBody.appendChild(tr);
    });
  }

  /**
   * Renderiza la Tabla 2: resumen de ingredientes, mano de obra y ganancia.
   * @param {number} totalSimple - Suma total de ingredientes sin ganancia.
   */
  renderizarTablaResumen(totalSimple) {
    const tHead = document.getElementById('tHeadDeLaTabla2');
    const tBody = document.getElementById('tBodyDeLaTabla2');
    tHead.innerHTML = '';
    tBody.innerHTML = '';

    const trEncabezado = document.createElement('tr');
    ['INGREDIENTES', 'MANO DE OBRA', 'GANANCIA'].forEach((texto) => {
      const th       = document.createElement('th');
      th.textContent = texto;
      trEncabezado.appendChild(th);
    });
    tHead.appendChild(trEncabezado);

    const totalFormateado = totalSimple.toFixed(2);
    const trResumen       = document.createElement('tr');
    [totalFormateado, totalFormateado, totalFormateado].forEach((texto) => {
      const td       = document.createElement('td');
      td.textContent = texto;
      trResumen.appendChild(td);
    });
    tBody.appendChild(trResumen);
  }

  // ─── Selector de porcentaje de ganancia ───────────────────────────────────

  /**
   * Construye el <select> de ganancia (50 %–100 %) en #resultadoTotal.
   * @returns {HTMLSelectElement}
   */
  renderizarSelectorPorcentaje() {
    const contenedor     = document.getElementById('resultadoTotal');
    contenedor.innerHTML = '';

    const leyenda          = document.createElement('legend');
    leyenda.id             = 'legendDelSelector';
    leyenda.textContent    = 'Ganancia en porcentaje';
    contenedor.appendChild(leyenda);

    const flecha    = document.createElement('p');
    flecha.id       = 'flechaNegra';
    contenedor.appendChild(flecha);

    const selector  = document.createElement('select');
    selector.id     = 'selectorPorcentual';
    for (let n = 100; n >= 50; n -= 10) {
      const opcion         = document.createElement('option');
      opcion.value         = n;
      opcion.textContent   = `${n}%`;
      selector.appendChild(opcion);
    }
    contenedor.appendChild(selector);

    return selector;
  }

  /**
   * Actualiza los párrafos de precio de venta según el porcentaje elegido.
   * @param {number}  porcentaje       - Porcentaje de ganancia aplicado.
   * @param {number}  precioFinal      - Precio de venta calculado.
   * @param {boolean} incluyeServicios - Si se sumó el 2 % de servicios básicos.
   */
  actualizarVisualizacionPorcentaje(porcentaje, precioFinal, incluyeServicios) {
    const contenedor = document.getElementById('resultadoTotal');

    if (this._nodoEtiquetaPorcentaje) {
      this._nodoEtiquetaPorcentaje.remove();
      this._nodoFlechaPorcentaje.remove();
      this._nodoPrecioPorcentaje.remove();
    }

    const etiqueta       = document.createElement('p');
    etiqueta.id          = 'resultadoSinEnvase';
    etiqueta.textContent = incluyeServicios
      ? `El total por el ${porcentaje}% de ganancia más el 2% de servicios básicos`
      : `El total por el ${porcentaje}% de ganancia`;

    const flecha  = document.createElement('p');
    flecha.id     = 'flechaNegra2';

    const precio         = document.createElement('p');
    precio.id            = 'resultadoSinEnvase2';
    precio.textContent   = `${precioFinal.toFixed(2)} BS`;

    contenedor.appendChild(etiqueta);
    contenedor.appendChild(flecha);
    contenedor.appendChild(precio);

    this._nodoEtiquetaPorcentaje = etiqueta;
    this._nodoFlechaPorcentaje   = flecha;
    this._nodoPrecioPorcentaje   = precio;
  }
}
