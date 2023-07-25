
function generarLista(evento) {
    evento.preventDefault();
    ajustarAlto();
    
    const cantidadIngredientes = parseInt(document.getElementById("cantidadIngredientes").value);
    const listaIngredientes = document.getElementById("listaIngredientes");
    const nuevoDiv = document. getElementById('formulario1');

    nuevoDiv.innerHTML=''; //limpia el documento asi no se esta repitiendo
    listaIngredientes.innerHTML = '';

    const divPrecio = document.createElement('h3');
    divPrecio.textContent = 'precio por la cantidad comprada';
    divPrecio.id = 'divPrecio';
    nuevoDiv.appendChild(divPrecio);

    const divTotalPaquete = document.createElement('h3');
    divTotalPaquete.textContent = 'total del paquete comprado gr/lm/U';
    divTotalPaquete.id = 'divTotalPaquete';
    nuevoDiv.appendChild(divTotalPaquete);

    const divCantidadUtilizada = document.createElement('h3');
    divCantidadUtilizada.textContent = 'Cantidad utilizada en la receta';
    divCantidadUtilizada.id = 'divCantidadUtilizada';
    nuevoDiv.appendChild(divCantidadUtilizada);

    for (let i = 1; i <= cantidadIngredientes; i++) {
      const ingrediente = prompt('Ingrediente #' + i + ':');
      if (ingrediente == null) {
        return;
      }
      const nuevoIngrediente = document.createElement('li');
  
      const nombreIngrediente = document.createElement('span');
      nombreIngrediente.textContent = ingrediente;
      nombreIngrediente.id = 'span1';
      nuevoIngrediente.appendChild(nombreIngrediente);
      
      const precioInput = document.createElement('input');
      precioInput.type = 'text';
      precioInput.placeholder = 'Precio';
      precioInput.id = 'inputPrecio';
      nuevoIngrediente.appendChild(precioInput);

      const paqueteCantidadInput = document.createElement('input');
      paqueteCantidadInput.type = 'text';
      paqueteCantidadInput.placeholder = "Cantidad comprada";
      paqueteCantidadInput.id = 'inputCantidadComprada'
      nuevoIngrediente.appendChild(paqueteCantidadInput);

      const cantidadInput = document.createElement('input');
      cantidadInput.type = 'text';
      cantidadInput.placeholder = 'Cantidad utilizada';
      cantidadInput.id = 'inputCantidadUtilizada';
      nuevoIngrediente.appendChild(cantidadInput);
  
      listaIngredientes.appendChild(nuevoIngrediente);
    }
}

function limpiarResultados() {

  const mainElement = document.querySelector('main');

  const limpiarSumaMasdividir = document.getElementById("sumaMasdividir");
  if (limpiarSumaMasdividir) {
    mainElement.removeChild(limpiarSumaMasdividir);
  }

  const limpiarResultadosDeLasSumas = document.getElementById('resultadosDeLasSumas');
  if (limpiarResultadosDeLasSumas) {
    mainElement.removeChild(limpiarResultadosDeLasSumas);
  }
  
}

// borrar div para evitar aglomeración

function borrarDiv() {
    document.getElementById("sumarRecipiente").style.display = "none";
}

function aparecerDiv(){
  document.getElementById("sumarRecipiente").style.display = "flex";
}

function ocultarSumarEnvase(){
  document.getElementById("sumarRecipiente2").style.display = "none";
}

function ocultarDivision(){
  document.getElementById("divirPreparacion").style.display = "none";
}

// el main cambiar su height

function ajustarAlto(){
  document.querySelector('main').style.height = "auto";
}

// boton calcular

function calcularTotal(evento) {
    evento.preventDefault();

    limpiarResultados();
    ajustarAlto();

    const listaIngredientes = document.getElementById("listaIngredientes");
    const ingredientes = listaIngredientes.getElementsByTagName('li');
    
    const tBodyPrimeraTabla = document.getElementById("tBody");
    tBodyPrimeraTabla.innerHTML = ''; 

    const tHeadPrimeraTabla = document.getElementById('tHead');
    tHeadPrimeraTabla.innerHTML="";

    const tBodySegundaTabla = document.getElementById('tBodyDeLaTabla2');
    tBodySegundaTabla.innerHTML = "";
    
    const tHeadSegundaTabla = document.getElementById('tHeadDeLaTabla2');
    tHeadSegundaTabla.innerHTML="";

    const trDeltHead = document.createElement("tr");
    trDeltHead.id = "trDeltHead";
    tHeadPrimeraTabla.appendChild(trDeltHead);
    
    const tr1Tabla1 = document.getElementById("trDeltHead");
    tr1Tabla1.innerHTML = "";

    const cabeza1 = document.createElement('th');
    cabeza1.textContent = "ingrediente";
    tr1Tabla1.appendChild(cabeza1);

    const cabeza2 = document.createElement('th');
    cabeza2.textContent = "precio por ingrediente";
    tr1Tabla1.appendChild(cabeza2);

    let total = 0;
    let totalSimple = 0;
    let final = 0;
    let resultado = 0;

    for (let i = 0; i < ingredientes.length; i++) {
      const nombreIngrediente = ingredientes[i].querySelector('span').textContent;
      const cantidadInput = ingredientes[i].querySelector('input[type="text"][placeholder="Cantidad utilizada"]');
      const precioInput = ingredientes[i].querySelector('input[type="text"][placeholder="Precio"]');
      const paqueteCantidadInput = ingredientes[i].querySelector('input[type="text"][placeholder="Cantidad comprada"]');
  
      const cantidad = parseFloat(cantidadInput.value.replace(',', '.'));
      const precio = parseFloat(precioInput.value.replace(',', '.'));
      const paquete = parseFloat(paqueteCantidadInput.value.replace(',', '.'));
  
      if (isNaN(cantidad) || isNaN(precio) || isNaN(paquete)) {
        alert('Ingrese valores numéricos válidos');
        return;
      }
  
      const subtotal = (precio / paquete) * cantidad;
      total += subtotal;

      const sinDecimales = subtotal.toFixed(2);

      const trDeltBody = document.createElement("tr");
      const nombreId = "trDeltBody"+i;
      trDeltBody.id = nombreId.toString();
      tBodyPrimeraTabla.appendChild(trDeltBody);

      const tr2Tabla1 = document.getElementById(nombreId.toString());
      
      const subtotalElemento = document.createElement('td');
      subtotalElemento.textContent = nombreIngrediente;
      tr2Tabla1.appendChild(subtotalElemento);

      const subtotalElemento2 = document.createElement('td');
      const mostrarEnBs = sinDecimales + " BS";
      subtotalElemento2.textContent = mostrarEnBs;
      tr2Tabla1.appendChild(subtotalElemento2);

    }

    totalSimple = total.toFixed(2);

    const trtHeadDeLaTabla2 = document.createElement('tr');
    trtHeadDeLaTabla2.id = "trtHeadDeLaTabla2";
    tHeadSegundaTabla.appendChild(trtHeadDeLaTabla2);

    const trtBodyDeLaTabla2 = document.createElement('tr');
    trtBodyDeLaTabla2.id = "trtBodyDeLaTabla2";
    tBodySegundaTabla.appendChild(trtBodyDeLaTabla2);
    
 
    const texto1 = document.createElement('th');
    texto1.textContent = "INGREDIENTES";
    trtHeadDeLaTabla2.appendChild(texto1);

    const texto2 = document.createElement('th');
    texto2.textContent = "MANO DE OBRA";
    trtHeadDeLaTabla2.appendChild(texto2);

    const texto3 = document.createElement('th');
    texto3.textContent ="GANANCIA";
    trtHeadDeLaTabla2.appendChild(texto3);
    
    const resultado1 = document.createElement('td');
    resultado1.textContent = totalSimple;
    trtBodyDeLaTabla2.appendChild(resultado1);

    const resultado2 = document.createElement('td');
    resultado2.textContent = totalSimple;
    trtBodyDeLaTabla2.appendChild(resultado2);

    const resultado3 = document.createElement('td');
    resultado3.textContent = totalSimple;
    trtBodyDeLaTabla2.appendChild(resultado3);

    const prueba = document.getElementById("resultadoTotal");
    prueba.innerHTML = '';

    const legendDelSelector = document.createElement('legend');
    legendDelSelector.id = 'legendDelSelector';
    legendDelSelector.textContent = "ganancia en porcentaje";
    prueba.appendChild(legendDelSelector);

    const flecha = document.createElement('p');
    flecha.id = 'flechaNegra';
    prueba.appendChild(flecha);

    const selectorDePorcentaje  = document.createElement('select');
    selectorDePorcentaje.id = "selectorPorcentual";
    prueba.appendChild(selectorDePorcentaje);

    for(let n = 100; n >= 50; n-=10){
      const selectorPorcentual = document.getElementById("selectorPorcentual")

      const crearID = "option"+n;
      const crearNombre = n.toString();

      const opciones = document.createElement('option');
      opciones.id = crearID.toString();
      opciones.textContent = crearNombre + "%";
      selectorPorcentual.appendChild(opciones);
    }
    const selectorPorcentual = document.getElementById("selectorPorcentual");
    let divResultadoPorcentaje = null;
    let flechaNegra2 = null;
    let divResultadoPorcentaje2 = null;
    
    const resultadosFinales = {};

    selectorPorcentual.addEventListener("change", function() {
      const seleccionarOpcion = parseInt(selectorPorcentual.value);
      
      const multiplicadores = {
        100: 3,
        90: 2.9,
        80: 2.8,
        70: 2.7,
        60: 2.6,
        50: 2.5
      };
      
      const multiplicador = multiplicadores[seleccionarOpcion];
      
      if (multiplicador) {
        resultadosFinales[seleccionarOpcion] = totalSimple * multiplicador; // Almacenamos el resultado final en el objeto resultadosFinales
        
        if (divResultadoPorcentaje) {
          divResultadoPorcentaje.remove();
          flechaNegra2.remove();
          divResultadoPorcentaje2.remove();
        }
      
        divResultadoPorcentaje = document.createElement('p');
        divResultadoPorcentaje.id = "resultadoSinEnvase";
        flechaNegra2 = document.createElement('p');
        flechaNegra2.id = "flechaNegra2";
        divResultadoPorcentaje2 = document.createElement('p');
        divResultadoPorcentaje2.id = "resultadoSinEnvase2";
        

        if (seleccionarOpcion === 100) {
          divResultadoPorcentaje.textContent = 'El total por el ' + seleccionarOpcion + '% de ganancia';
          flechaNegra2.textContent = "";
          divResultadoPorcentaje2.textContent = resultadosFinales[seleccionarOpcion].toFixed(2) + " BS";
        } else {
          const dosPorciento = (resultadosFinales[seleccionarOpcion] * 2) / 100;
          resultadosFinales[seleccionarOpcion] += dosPorciento;
          divResultadoPorcentaje.textContent = 'El total por el ' + seleccionarOpcion + '% de ganancia más el 2% de servicios basicos';
          flechaNegra2.textContent = "";
          divResultadoPorcentaje2.textContent = resultadosFinales[seleccionarOpcion].toFixed(2) + " BS";
        }
        
        prueba.appendChild(divResultadoPorcentaje);
        prueba.appendChild(flechaNegra2);
        prueba.appendChild(divResultadoPorcentaje2);
      } else {
        if (divResultadoPorcentaje) {
          divResultadoPorcentaje.remove();
          divResultadoPorcentaje2.remove();
          flechaNegra2.remove();
        }
      
        divResultadoPorcentaje = document.createElement('p');
        divResultadoPorcentaje.textContent = 'No se encontró el multiplicador para la opción seleccionada';
        prueba.appendChild(divResultadoPorcentaje);
        prueba.appendChild(flechaNegra2);
        prueba.appendChild(divResultadoPorcentaje2);
      }
    });
    
    // div separador

    const sumaMasdividir = document.createElement("div");
    sumaMasdividir.id = "sumaMasdividir";
    const elementoMain = document.querySelector('main');
    elementoMain.appendChild(sumaMasdividir);

    // div para dividir

    const primeraOpcion = 0; // [0] Índice de la primera opción (100%)
  
    selectorPorcentual.selectedIndex = primeraOpcion;
    selectorPorcentual.dispatchEvent(new Event('change'));
    
    const formularioExistente = document.getElementById("formulario2");
    if (formularioExistente) {
      formularioExistente.parentNode.removeChild(formularioExistente);
    }

    const crearDivFormulario2 = document.createElement("div");
    crearDivFormulario2.id = "divirPreparacion";
    sumaMasdividir.appendChild(crearDivFormulario2);

    const divirPreparacion = document.getElementById("divirPreparacion");
    
    const crearFormulario2 = document.createElement("form");
    crearFormulario2.id = "formulario2";
    divirPreparacion.appendChild(crearFormulario2);

    const formulario2 = document.getElementById("formulario2");

    const crearLabelFormulario2 = document.createElement("label");
    crearLabelFormulario2.id = "LabelFormulario2";
    crearLabelFormulario2.textContent = "dividir en Unidades o porciones si es requerido";
    formulario2.appendChild(crearLabelFormulario2);
    
    const crearInputFormulario2 = document.createElement("input");
    crearInputFormulario2.id = "inputFormulario2";
    formulario2.appendChild(crearInputFormulario2);

    const crearBotonFormulario2 = document.createElement("button");
    crearBotonFormulario2.id = "botonFormulario2";
    crearBotonFormulario2.textContent = "dividir"
    formulario2.appendChild(crearBotonFormulario2);

    const resultadosDeLasSumas  = document.createElement("div");
    resultadosDeLasSumas.id = "resultadosDeLasSumas";
    elementoMain.appendChild(resultadosDeLasSumas);

    const divParaLaDivision = document.createElement("div");
    divParaLaDivision.id = "divParaLaDivision";
    resultadosDeLasSumas.appendChild(divParaLaDivision);

    crearBotonFormulario2.addEventListener('click', dividirResultado);
    
    formulario2.setAttribute('data-total', final);


    function dividirResultado(evento) {
      evento.preventDefault();
      
      const duplicado = document.getElementById("resultadoDividir");
      if (duplicado) {
        duplicado.parentNode.removeChild(duplicado);
      };
    
      const inputFormulario2 = document.getElementById("inputFormulario2");
      const valorInput = parseFloat(inputFormulario2.value.replace(',', '.'));
    
      if (isNaN(valorInput)) {
        alert('Ingrese un valor numérico válido');
        return;
      }

      const seleccionarOpcion = parseInt(selectorPorcentual.value);
      const final = resultadosFinales[seleccionarOpcion]; // Obtendremos el resultado final correspondiente a la opción seleccionada
      
      if (isNaN(final)) {
        alert('No se ha calculado el total aún');
        return;
      }
    
      const divResultadoDivision = document.createElement("div");
      divResultadoDivision.id = "resultadoDividir";
      divParaLaDivision.appendChild(divResultadoDivision);
      

      resultado = final / valorInput;
    
      const h2 = document.createElement("h3");
      h2.id = "ultimoH2";
      h2.textContent = "El precio por Unidad o Porcion";
      divResultadoDivision.appendChild(h2);

      const flechaNegra3 = document.createElement('p');
      flechaNegra3.id = "flechaNegra4";
      divResultadoDivision.appendChild(flechaNegra3);

      const h2Final = document.createElement("h3");
      h2Final.id = "precioDividido";
      h2Final.textContent = resultado.toFixed(2) + " BS";
      divResultadoDivision.appendChild(h2Final);
      
    }

    // div para sumar el total // [0] Índice de la primera opción (100%)
  
    selectorPorcentual.selectedIndex = primeraOpcion;
    selectorPorcentual.dispatchEvent(new Event('change'));
    
    const formularioExistente3 = document.getElementById("formulario4");
    if (formularioExistente3) {
      formularioExistente3.parentNode.removeChild(formulario4);
    }

    const crearDivFormulario4 = document.createElement("div");
    crearDivFormulario4.id = "sumarRecipiente2";
    sumaMasdividir.appendChild(crearDivFormulario4);

    const sumarRecipiente2 = document.getElementById("sumarRecipiente2");
    
    const crearFormulario4 = document.createElement("form");
    crearFormulario4.id = "formulario4";
    sumarRecipiente2.appendChild(crearFormulario4);

    const formulario4 = document.getElementById("formulario4");

    const crearLabelFormulario4 = document.createElement("label");
    crearLabelFormulario4.id = "LabelFormulario4";
    crearLabelFormulario4.textContent = "sumar el envase";
    formulario4.appendChild(crearLabelFormulario4);
    
    const crearInputFormulario4 = document.createElement("input");
    crearInputFormulario4.id = "inputFormulario4";
    formulario4.appendChild(crearInputFormulario4);

    const crearBotonFormulario4 = document.createElement("button");
    crearBotonFormulario4.id = "botonFormulario4";
    crearBotonFormulario4.textContent = "sumar"
    formulario4.appendChild(crearBotonFormulario4);

    const resultadosDeLasSumas2  = document.createElement("div");
    resultadosDeLasSumas2.id = "resultadosDeLasSumas2";
    elementoMain.appendChild(resultadosDeLasSumas2);

    crearBotonFormulario4.addEventListener('click', sumarEnvase2);
    
    formulario2.setAttribute('data-total', final);


    function sumarEnvase2(evento) {
      evento.preventDefault();
      
      const duplicado = document.getElementById("resultadoSuma2");
      if (duplicado) {
        duplicado.parentNode.removeChild(duplicado);
      };
    
      const inputFormulario4 = document.getElementById("inputFormulario4");
      const valorInput = parseFloat(inputFormulario4.value.replace(',', '.'));
    
      if (isNaN(valorInput)) {
        alert('Ingrese un valor numérico válido');
        return;
      }

      const seleccionarOpcion = parseInt(selectorPorcentual.value);
      const final = resultadosFinales[seleccionarOpcion]; // Obtendremos el resultado final correspondiente a la opción seleccionada
      
      if (isNaN(final)) {
        alert('No se ha calculado el total aún');
        return;
      }
    
      const resultadoSuma2 = document.createElement("div");
      resultadoSuma2.id = "resultadoSuma2";
      resultadosDeLasSumas.appendChild(resultadoSuma2);
      

      resultado = final + valorInput;
    
      const h2 = document.createElement("h3");
      h2.id = "ultimoH2";
      h2.textContent = "El precio final de su producto con el envase es";
      resultadoSuma2.appendChild(h2);

      const flechaNegra3 = document.createElement('p');
      flechaNegra3.id = "flechaNegra4";
      resultadoSuma2.appendChild(flechaNegra3);

      const h2Final = document.createElement("h3");
      h2Final.id = "precioMasEnvase2";
      h2Final.textContent = resultado.toFixed(2) + " BS";
      resultadoSuma2.appendChild(h2Final);
      
    }      

    // div para sumar el resultado de las porciones.
    
    const formularioExistente2 = document.getElementById("formulario3");
    if (formularioExistente2) {
      formularioExistente2.parentNode.removeChild(formularioExistente);
    }

    const crearDivFormulario3 = document.createElement("div");
    crearDivFormulario3.id = "sumarRecipiente";
    sumaMasdividir.appendChild(crearDivFormulario3);

    const sumarRecipiente = document.getElementById("sumarRecipiente");
    
    const crearFormulario3 = document.createElement("form");
    crearFormulario3.id = "formulario3";
    sumarRecipiente.appendChild(crearFormulario3);

    borrarDiv();

    const formulario3 = document.getElementById("formulario3");

    const crearLabelFormulario3 = document.createElement("label");
    crearLabelFormulario3.id = "LabelFormulario3";
    crearLabelFormulario3.textContent = "sumar envase si es requerido";
    formulario3.appendChild(crearLabelFormulario3);
    
    const crearInputFormulario3 = document.createElement("input");
    crearInputFormulario3.id = "inputFormulario3";
    formulario3.appendChild(crearInputFormulario3);

    const crearBotonFormulario3 = document.createElement("button");
    crearBotonFormulario3.id = "botonFormulario3";
    crearBotonFormulario3.textContent = "sumar"
    formulario3.appendChild(crearBotonFormulario3);

    crearBotonFormulario3.addEventListener('click', sumarEnvase);
    
    formulario3.setAttribute('data-total', resultado);

    function sumarEnvase(evento) {
      evento.preventDefault();
      
      const duplicado = document.getElementById("resultadoSuma");
      if (duplicado) {
        duplicado.parentNode.removeChild(duplicado);
      };
    
      const inputFormulario3 = document.getElementById("inputFormulario3");
      const valorInput = parseFloat(inputFormulario3.value.replace(',', '.'));
    
      if (isNaN(valorInput)) {
        alert('Ingrese un valor numérico válido');
        return;
      }
      
      if (isNaN(resultado)) {
        alert('No se ha calculado el total aún');
        return;
      }
    
      const divResultado = document.createElement("div");
      divResultado.id = "resultadoSuma";
      resultadosDeLasSumas.appendChild(divResultado);
      

      const resultadoSegundo = resultado + valorInput;
    
      const h3 = document.createElement("h3");
      h3.id = "ultimoH3";
      h3.textContent = "El precio final de su producto con el envase es";
      divResultado.appendChild(h3);

      const flechaNegra3 = document.createElement('p');
      flechaNegra3.id = "flechaNegra3";
      divResultado.appendChild(flechaNegra3);

      const h3Final = document.createElement("h3");
      h3Final.id = "precioMasEnvase";
      h3Final.textContent = resultadoSegundo.toFixed(2) + " BS";
      divResultado.appendChild(h3Final);
      
    }
    
  document.getElementById('botonFormulario2').addEventListener('click', aparecerDiv);
  document.getElementById('botonFormulario2').addEventListener('click', ocultarSumarEnvase);
  document.getElementById('botonFormulario4').addEventListener('click', ocultarDivision);

}
  
  document.getElementById('crearIngredientes').addEventListener('submit', generarLista);
  document.getElementById('listaIngredientesFormulario2').addEventListener('submit', calcularTotal);