/**
 * UIFormBuilder.js
 * Construcción de formularios de acción, visualización de resultados
 * finales y control de visibilidad de secciones.
 *
 * Entrada: valores calculados (precios, totales).
 * Salida:  nodos DOM de formularios, resultados y botones creados en <main>.
 */

export class UIFormBuilder {

  // ─── Formularios de acción post-cálculo ───────────────────────────────────

  /**
   * Construye los tres formularios de acción (dividir / sumar envase directo
   * / sumar envase por porción) y el contenedor global de resultados.
   *
   * @returns {{
   *   inputDivision:        HTMLInputElement,
   *   botonDividir:         HTMLButtonElement,
   *   inputEnvaseDirecto:   HTMLInputElement,
   *   botonEnvaseDirecto:   HTMLButtonElement,
   *   inputEnvasePorcion:   HTMLInputElement,
   *   botonEnvasePorcion:   HTMLButtonElement,
   *   contenedorResultados: HTMLElement
   * }}
   */
  renderizarFormulariosAcciones() {
    const main = document.querySelector('main');

    const seccionAcciones = document.createElement('div');
    seccionAcciones.id    = 'sumaMasdividir';
    main.appendChild(seccionAcciones);

    const contDivision = document.createElement('div');
    contDivision.id    = 'divirPreparacion';
    seccionAcciones.appendChild(contDivision);
    const formDivision = this._crearFormulario(
      contDivision, 'formulario2',
      'Dividir en unidades o porciones (si es requerido)',
      'inputFormulario2', 'botonFormulario2', 'Dividir',
    );

    const contEnvaseDirecto = document.createElement('div');
    contEnvaseDirecto.id    = 'sumarRecipiente2';
    seccionAcciones.appendChild(contEnvaseDirecto);
    const formEnvaseDirecto = this._crearFormulario(
      contEnvaseDirecto, 'formulario4',
      'Sumar el envase',
      'inputFormulario4', 'botonFormulario4', 'Sumar',
    );

    const contEnvasePorcion = document.createElement('div');
    contEnvasePorcion.id    = 'sumarRecipiente';
    seccionAcciones.appendChild(contEnvasePorcion);
    const formEnvasePorcion = this._crearFormulario(
      contEnvasePorcion, 'formulario3',
      'Sumar envase al precio por porción (si es requerido)',
      'inputFormulario3', 'botonFormulario3', 'Sumar',
    );

    const contenedorResultados = document.createElement('div');
    contenedorResultados.id    = 'resultadosDeLasSumas';
    main.appendChild(contenedorResultados);

    return {
      inputDivision:        formDivision.input,
      botonDividir:         formDivision.boton,
      inputEnvaseDirecto:   formEnvaseDirecto.input,
      botonEnvaseDirecto:   formEnvaseDirecto.boton,
      inputEnvasePorcion:   formEnvasePorcion.input,
      botonEnvasePorcion:   formEnvasePorcion.boton,
      contenedorResultados,
    };
  }

  /**
   * Agrega el sub-contenedor de resultados de división en porciones.
   * @param   {HTMLElement} contenedorResultados
   * @returns {HTMLElement} Div #divParaLaDivision creado.
   */
  crearContenedorDivision(contenedorResultados) {
    const div = document.createElement('div');
    div.id    = 'divParaLaDivision';
    contenedorResultados.appendChild(div);
    return div;
  }

  // ─── Visualización de resultados finales ──────────────────────────────────

  /**
   * Muestra (o reemplaza) el precio calculado por unidad/porción.
   * @param {number} precioPorPorcion
   */
  mostrarResultadoDivision(precioPorPorcion) {
    const duplicado = document.getElementById('resultadoDividir');
    if (duplicado) duplicado.remove();

    const div = document.createElement('div');
    div.id    = 'resultadoDividir';
    div.appendChild(this._crearNodo('h3', 'El precio por Unidad o Porción', 'ultimoH2'));
    div.appendChild(this._crearNodo('p',  '',                                'flechaNegra4'));
    div.appendChild(this._crearNodo('h3', `${precioPorPorcion.toFixed(2)} BS`, 'precioDividido'));

    document.getElementById('divParaLaDivision').appendChild(div);
  }

  /**
   * Muestra (o reemplaza) el precio total con envase (sin dividir).
   * @param {number}      precioConEnvase
   * @param {HTMLElement} contenedorResultados
   */
  mostrarResultadoEnvaseDirecto(precioConEnvase, contenedorResultados) {
    const duplicado = document.getElementById('resultadoSuma2');
    if (duplicado) duplicado.remove();

    const div = document.createElement('div');
    div.id    = 'resultadoSuma2';
    div.appendChild(this._crearNodo('h3', 'El precio final de su producto con el envase es', 'ultimoH2EnvaseDirecto'));
    div.appendChild(this._crearNodo('p',  '',                                    'flechaNegra4b'));
    div.appendChild(this._crearNodo('h3', `${precioConEnvase.toFixed(2)} BS`,    'precioMasEnvase2'));

    contenedorResultados.appendChild(div);
  }

  /**
   * Muestra (o reemplaza) el precio por porción con envase sumado.
   * @param {number}      precioConEnvase
   * @param {HTMLElement} contenedorResultados
   */
  mostrarResultadoEnvasePorcion(precioConEnvase, contenedorResultados) {
    const duplicado = document.getElementById('resultadoSuma');
    if (duplicado) duplicado.remove();

    const div = document.createElement('div');
    div.id    = 'resultadoSuma';
    div.appendChild(this._crearNodo('h3', 'El precio final de su producto con el envase es', 'ultimoH3'));
    div.appendChild(this._crearNodo('p',  '',                                  'flechaNegra3'));
    div.appendChild(this._crearNodo('h3', `${precioConEnvase.toFixed(2)} BS`,  'precioMasEnvase'));

    contenedorResultados.appendChild(div);
  }

  // ─── Visibilidad de secciones ─────────────────────────────────────────────

  /** Oculta el formulario "sumar envase por porción". */
  ocultarFormEnvasePorcion() {
    this._setDisplay('sumarRecipiente', 'none');
  }

  /** Muestra el formulario "sumar envase por porción". */
  mostrarFormEnvasePorcion() {
    this._setDisplay('sumarRecipiente', 'flex');
  }

  /** Oculta el formulario "sumar envase al total directo". */
  ocultarFormEnvaseDirecto() {
    this._setDisplay('sumarRecipiente2', 'none');
  }

  /** Oculta el formulario "dividir en porciones". */
  ocultarFormDivision() {
    this._setDisplay('divirPreparacion', 'none');
  }

  // ─── Métodos privados de utilidad ─────────────────────────────────────────

  /**
   * Aplica un valor de display a un elemento por su id.
   * @param {string} id
   * @param {string} valor
   */
  _setDisplay(id, valor) {
    const elem = document.getElementById(id);
    if (elem) elem.style.display = valor;
  }

  /**
   * Crea un formulario (label + input + button) dentro del contenedor dado.
   * @returns {{ input: HTMLInputElement, boton: HTMLButtonElement }}
   */
  _crearFormulario(contenedor, formId, labelTexto, inputId, botonId, botonTexto) {
    const form  = document.createElement('form');
    form.id     = formId;
    contenedor.appendChild(form);

    const label         = document.createElement('label');
    label.textContent   = labelTexto;
    form.appendChild(label);

    const input  = document.createElement('input');
    input.id     = inputId;
    input.type   = 'text';
    form.appendChild(input);

    const boton       = document.createElement('button');
    boton.id          = botonId;
    boton.type        = 'button';
    boton.textContent = botonTexto;
    form.appendChild(boton);

    return { input, boton };
  }

  /**
   * Crea un nodo HTML con id y textContent.
   * @param {string} tag
   * @param {string} texto
   * @param {string} id
   * @returns {HTMLElement}
   */
  _crearNodo(tag, texto, id) {
    const elem       = document.createElement(tag);
    elem.id          = id;
    elem.textContent = texto;
    return elem;
  }
}
