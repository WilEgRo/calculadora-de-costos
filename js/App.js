/**
 * App.js
 * Punto de Entrada — coordina UIManager y EventHandlers.
 */

import { UIManager }     from './UIManager.js';
import { EventHandlers } from './EventHandlers.js';

const ui = new UIManager();

const estadoCalculo = {
  precioVenta:           0,
  ultimoPrecioPorPorcion: 0,
};

const handlers = new EventHandlers(ui, estadoCalculo);

document
  .getElementById('crearIngredientes')
  .addEventListener('submit', (e) => handlers.manejarCrearIngredientes(e));

document
  .getElementById('listaIngredientesFormulario2')
  .addEventListener('submit', (e) => handlers.manejarCalcularCostos(e));
