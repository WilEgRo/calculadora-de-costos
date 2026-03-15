/**
 * CalculadoraService.js
 * Módulo de Lógica de Negocio
 *
 * Entrada: datos numéricos puros (precios, cantidades, porcentajes).
 * Salida:  resultados numéricos calculados.
 *
 * REGLA: Este módulo NO contiene referencias a `document` ni al DOM.
 *        Todas sus funciones son puras y predecibles.
 */

/**
 * Convierte un string con coma decimal ('1,5') o punto ('1.5') a número.
 * @param  {string} valor - Texto ingresado por el usuario.
 * @returns {number} Número flotante resultante.
 */
export function parsearNumero(valor) {
  return parseFloat(String(valor).replace(',', '.'));
}

/**
 * Calcula el costo proporcional de un ingrediente según su uso en la receta.
 * @param  {number} precioPaquete      - Precio total del paquete comprado.
 * @param  {number} cantidadPaquete    - Cantidad total del paquete (gr/ml/U).
 * @param  {number} cantidadUtilizada  - Cantidad usada en la receta.
 * @returns {number} Costo del ingrediente para esta receta.
 */
export function calcularSubtotalIngrediente(precioPaquete, cantidadPaquete, cantidadUtilizada) {
  return (precioPaquete / cantidadPaquete) * cantidadUtilizada;
}

/**
 * Suma los subtotales de todos los ingredientes de la receta.
 * @param  {number[]} subtotales - Array con el costo de cada ingrediente.
 * @returns {number} Costo total de ingredientes.
 */
export function calcularCostoTotalIngredientes(subtotales) {
  return subtotales.reduce((acumulado, subtotal) => acumulado + subtotal, 0);
}

/**
 * Calcula el precio de venta con 100 % de ganancia y desglosa su distribución.
 * Fórmula: precio_venta = total × 3.  Ganancia = total (misma base de la tabla).
 * Distribución: 2 % servicios básicos, 30 % reinversión, 68 % ganancia neta.
 *
 * @param  {number} totalIngredientes
 * @returns {{ precioVenta: number, servicios: number, reinversion: number, gananciaNeta: number }}
 */
export function calcularDesglosGanancia(totalIngredientes) {
  const precioVenta = totalIngredientes * 3;
  const ganancia    = totalIngredientes;
  return {
    precioVenta,
    servicios:    ganancia * 0.02,
    reinversion:  ganancia * 0.30,
    gananciaNeta: ganancia * 0.68,
  };
}

/**
 * Divide el precio final entre la cantidad de porciones o unidades.
 * @param  {number} precioFinal       - Precio total del producto.
 * @param  {number} cantidadPorciones - Número de porciones/unidades producidas.
 * @returns {number} Precio de venta por porción.
 */
export function dividirEnPorciones(precioFinal, cantidadPorciones) {
  return precioFinal / cantidadPorciones;
}

/**
 * Suma el costo del envase al precio base del producto.
 * @param  {number} precioBase   - Precio antes de incluir el envase.
 * @param  {number} costoEnvase  - Costo unitario del envase.
 * @returns {number} Precio final con envase incluido.
 */
export function sumarCostoEnvase(precioBase, costoEnvase) {
  return precioBase + costoEnvase;
}
