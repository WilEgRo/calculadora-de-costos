/**
 * UITablaRenderer.js
 * Renderizado de la lista de ingredientes, tablas de costos
 * y bloque de precio/desglose de ganancia.
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
      const indice = i + 1;

      const spanNombre       = document.createElement('span');
      spanNombre.className   = 'spanIngrediente';
      spanNombre.id          = `spanIngrediente${indice}`;
      spanNombre.textContent = nombresIngredientes[i];
      liItem.appendChild(spanNombre);

      [
        {
          placeholder: 'Precio',
          ariaLabel: `Precio de ${nombresIngredientes[i]}`,
          clase: 'inputPrecio',
          baseId: 'inputPrecio',
        },
        {
          placeholder: 'Cantidad comprada',
          ariaLabel: `Cantidad comprada de ${nombresIngredientes[i]}`,
          clase: 'inputCantidadComprada',
          baseId: 'inputCantidadComprada',
        },
        {
          placeholder: 'Cantidad utilizada',
          ariaLabel: `Cantidad utilizada de ${nombresIngredientes[i]}`,
          clase: 'inputCantidadUtilizada',
          baseId: 'inputCantidadUtilizada',
        },
      ].forEach(({ placeholder, ariaLabel, clase, baseId }) => {
        const input       = document.createElement('input');
        input.type        = 'text';
        input.placeholder = placeholder;
        input.className   = clase;
        input.id          = `${baseId}${indice}`;
        input.name        = `${baseId}${indice}`;
        input.autocomplete = 'off';
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

  // ─── Bloque de ganancia fija (100 %) ─────────────────────────────────────

  /**
   * Renderiza precio de venta y el desglose de la ganancia fija.
   * @param {{ precioVenta: number, servicios: number, reinversion: number, gananciaNeta: number }} desglose
   */
  mostrarDesglosGanancia(desglose) {
    const contenedor     = document.getElementById('resultadoTotal');
    contenedor.innerHTML = '';

    const leyenda       = document.createElement('legend');
    leyenda.id          = 'legendDelSelector';
    leyenda.textContent = 'Precio de venta con 100% de ganancia';
    contenedor.appendChild(leyenda);

    const flechaPrecio = document.createElement('p');
    flechaPrecio.id    = 'flechaNegra';
    contenedor.appendChild(flechaPrecio);

    const precioVenta       = document.createElement('p');
    precioVenta.id          = 'resultadoSinEnvase2';
    precioVenta.textContent = `${desglose.precioVenta.toFixed(2)} BS`;
    contenedor.appendChild(precioVenta);

    const tituloDesglose       = document.createElement('p');
    tituloDesglose.id          = 'resultadoSinEnvase';
    tituloDesglose.textContent = 'Desglose del 100% de ganancia:';
    contenedor.appendChild(tituloDesglose);

    [
      { id: 'flechaNegra2',         texto: '' },
      { id: 'desgloseServicios',    texto: `Servicios básicos (gas, agua, luz) — 2 %: ${desglose.servicios.toFixed(2)} BS` },
      { id: 'flechaNegraDes2',      texto: '' },
      { id: 'desgloseReinversion',  texto: `Reinversión — 30 %: ${desglose.reinversion.toFixed(2)} BS` },
      { id: 'flechaNegraDes3',      texto: '' },
      { id: 'desgloseGananciaNeta', texto: `Ganancia neta — 68 %: ${desglose.gananciaNeta.toFixed(2)} BS` },
    ].forEach(({ id, texto }) => {
      const p       = document.createElement('p');
      p.id          = id;
      p.textContent = texto;
      contenedor.appendChild(p);
    });
  }
}
