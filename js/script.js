window.onload = function() {
  const form=document.getElementById('form');
  const form2=document.getElementById('form2');
  const name=document.getElementById('nomJuego');
  document.getElementById('timer').innerHTML = 05 + ':' + 00
  
  // INICIALIZA EL TIMER
  
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      startTimer();
      modal.style.display = "block";
  
  });
  
  function startTimer() {
      var presentTime = document.getElementById('timer').innerHTML;
      var timeArray = presentTime.split(/[:]+/);
      var m = timeArray[0];
      var s = checkSecond((timeArray[1] - 1));
      if(s==59){m=m-1}
      if(m<0){
        return
  
      }
      if( m==0 & s==0){
          alert("Termino el tiempo") //ACA ACTIVARIA EL MODAL
      }
  
      
      document.getElementById('timer').innerHTML =
        m + ":" + s;
      
      setTimeout(startTimer, 1000);    
    }
    
    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
      if (sec < 0) {sec = "59"};
      return sec;
    }
  
    /* MODAL */
      // Get the modal
      const modal = document.getElementById("myModalJuego");
      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      
      // When the user clicks the button, open the modal 
      span.onclick = function() {
          modal.style.display = "block";
      }
      
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  }

// Creo objeto con colores:
let colores = {
  VERDE: 1,
  AMARILLO: 2,
  GRIS: 3,
  BLANCO: 0
}
  
// Creo matriz para ir seteando los colores

  let tablaColores = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
  
  
// Función que recorre la tabla y la pinta según corresponda.
  function pintaTabla(){
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iCol=0; iCol<5; iCol++){
            let input = document.getElementById(`f${iFila}c${iCol}`)
            switch(tablaColores[iFila][iCol]){
                case colores.VERDE:
                    input.classList.add("verde");
                    break;
                case colores.AMARILLO:
                    input.classList.add("amarillo");
                    break;
                case colores.GRIS:
                    input.classList.add("gris");
                    break;
                case colores.BLANCO:
                    input.classList.add("blanco");
                    break;
            }
        }
    }
  }
  
// Tabla para cargar las respuestas que va dando el usuario.
  let respuestas = [
    [],
    [],
    [],
    [],
    [],
    [],
  ]
  
// Función para guardar el progreso del usuario en el LocalStorage.
  function GuardaProgreso(){
    let save = {};
  
    save.fecha = new Date().toLocaleString("es-AR", {timeZone:"America/Argentina/Mendoza"});
    save.tiempo = document.querySelector("#time").innerHTML;
    save.respuestas = respuestas;
    save.usuario = document.getElementById("nombre-jugador-input").value;
    save.palabraGanadora = palabraGanadora;
    save.tablaColores = tablaColores;
  
    let savesArray = JSON.parse(localStorage.getItem("saves")) || [];
    savesArray.push(save);
  
    let savesArrayJSON = JSON.stringify(savesArray);
  
    localStorage.setItem("saves", savesArrayJSON);

    window.location.href = "index.html";
  }
  
// Función para traerme todas las partidas guardadas desde LocalStorage
  function ObtenerGuardadas() {
  
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];
    let body = "";
    let partida = savesArray.length +1;
    for (let i = savesArray.length -1; i >= 0; i--) {
        partida--;
        body += `<tr class="fila-partidas-guardadas" onclick=loadGame('${i}') role="row">
                    <td class="data-partida-guardadas" data-label="PARTIDA">${partida}</td>
                    <td class="data-partida-guardadas" data-label="NOMBRE">${(savesArray[i].usuario)}</td>
                    <td class="data-partida-guardadas" data-label="FECHA">${(savesArray[i].fecha)}</td>
                </tr>`
    }
    console.log(savesArray.length)
    document.getElementById("puntajes").innerHTML = body;
  }
  
  
  const loadGame = function(i){
    gameOver = false;
    let modal = document.getElementById("modalPartidas");
    modal.style.display = "none";
  
    for (let i = 0; i < 6; i++){
        let fieldset = document.getElementById(`fila${i}`);
        fieldset.disabled=false;
    }
  
    let savesArray = JSON.parse(localStorage.getItem('saves'));
    let actualArray = savesArray[i].respuestas;
    let actualPalabra = savesArray[i].palabraGanadora;
    let actualTiempo = savesArray[i].tiempo
    let actualUsuario = savesArray[i].usuario;
    let actualTablaColores = savesArray[i].tablaColores;
    colorTablero = actualTablaColores;

    pintaTabla();
  
    palabraGanadora = actualPalabra;
    document.querySelector("#time").innerHTML = actualTiempo;
    document.getElementById("nombre-jugador-input").value = actualUsuario;
  
  
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iCol=0; iCol<5; iCol++){
            let input = document.getElementById(`f${iFila}c${iCol}`);
            if(actualArray[iFila][iCol] !== undefined){
            input.value = actualArray[iFila][iCol];
            }
        }
    }
  
// Muestro datos varios de la partida guardada
    console.log("Datos partida guardada")
    console.log("Palabra: ",actualPalabra);
    console.log("Fecha: ",actualTiempo);
    console.log("Usuario: ",actualUsuario);
  
    hideBtn();
    msjerrorValor();
  
//Calculos varios tiempo
    let sec = actualTiempo.slice(5);
    let min = actualTiempo.slice(0, 2);
    let secTransform = Math.round((sec/60) * 100);
    let calculoTiempo = Math.round(((min + secTransform) /100) * 60);
    let timer = calculoTiempo;
    display = document.querySelector("#time");
    startTimer(timer, display);
  
  

    function guardaRespPartidaCargada(i){
        for (let iCol = 0; iCol < 5; iCol++){
            let input = document.getElementById(`f${i}c${iCol}`).value;
            respuestas[i].push(input);
        }
        revisaResulPartidaCargada(respuestas[i], i);
    }
  
    function revisaResulPartidaCargada(respuesta, i){
        respuesta.forEach(function(elemento, index){
            if(elemento === arrayActualPalabra[index]){
              tablaColores[i][index] = colores.VERDE;
            }
            else if(arrayActualPalabra.includes(elemento)){
              tablaColores[i][index] = colores.AMARILLO;
            }
            else if(!arrayActualPalabra.includes(elemento)){
              tablaColores[i][index] = colores.GRIS;
            }
        })
        pintaTabla();
    }
  
    arrayActualPalabra = actualPalabra.split("");
  
  
//Guardo la respuesta de la partida solo de las filas con letras.
    for (let i = 0; i < 6; i++){
        let fieldset = document.getElementById(`fila${i}`);
        let validaLetra = document.querySelectorAll(`#fila${i} input`);
  
        let valor0 = validaLetra[0].value;
        let valor1 = validaLetra[1].value;
        let valor2 = validaLetra[2].value;
        let valor3 = validaLetra[3].value;
        let valor4 = validaLetra[4].value;
  
        if (valor0 !== "" && valor1 !== "" && valor2 !== "" && valor3 !== ""&& valor4 !== ""){
          guardaRespPartidaCargada(i);
            fieldset.disabled=true;
        }
        if (valor0 == ""){
          validaLetra[0].focus();
            break
        }
    }
  
//Funcion para jugar con una partida cargada.
    for (let i = 0; i < 6; i++){
        let fieldset = document.getElementById(`fila${i}`);
        fieldset.onkeydown = function (event){
            if(event.key === `Enter`){
                let validaLetra = document.querySelectorAll(`#fila${i} input`);
                let regex = new RegExp ("[A-Z]");
                let valor0 = validaLetra[0].value;
                let valor1 = validaLetra[1].value;
                let valor2 = validaLetra[2].value;
                let valor3 = validaLetra[3].value;
                let valor4 = validaLetra[4].value;
  
                let input0 = regex.test(valor0);
                let input1 = regex.test(valor1);
                let input2 = regex.test(valor2);
                let input3 = regex.test(valor3);
                let input4 = regex.test(valor4);
  
                if (valor0 == "" || valor1 == "" || valor2 == "" || valor3 == "" || valor4 == ""){
                  msjerrorEnter();
                }
                else if (input0 == false || input1 == false || input2 == false || input3 == false || input4 == false){
                  msjerrorValor();
                }
                else if (valor0.length > 1 || valor1.length  > 1 || valor2.length > 1 || valor3.length > 1 || valor4.length > 1 ){
                  msjerrorLetra();
                }
                else{
                  guardaRespPartidaCargada(i);
                  eliminaMsjError();
  
                let respuestaUsuario = respuestas[i];
                let respuestaUsuarioString = respuestaUsuario.join("");
  
                if (respuestaUsuarioString == palabraGanadora){
                    gameOver = true;
                    showBtn();
                    document.getElementById("mensaje-resultado").style.color = "rgb(0, 0, 0)";
                    document.getElementById("mensaje-resultado").innerHTML = "Te felicito! Ganaste la partida!";
                    scorePartidaGanada(i); // Guardamos los datos de la partida con el puntaje
                    bloqueoFieldsetGanarOPerder();
                }
  
                if (i == 0 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila1").disabled=false;
                    document.getElementById("fila0").disabled=true;
                    document.getElementById("f1c0").focus();
                }
                if (i == 1 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila2").disabled=false;
                    document.getElementById("fila1").disabled=true;
                    document.getElementById("f2c0").focus();
                }
                if (i == 2 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila3").disabled=false;
                    document.getElementById("fila2").disabled=true;
                    document.getElementById("f3c0").focus();
                }
                if (i == 3 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila4").disabled=false;
                    document.getElementById("fila3").disabled=true;
                    document.getElementById("f4c0").focus();
                }
                if (i == 4 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila5").disabled=false;
                    document.getElementById("fila4").disabled=true;
                    document.getElementById("f5c0").focus();
                }
                if (i == 5  && respuestaUsuarioString != palabraGanadora){
                    gameOver = true;
                    showBtn();
                    document.getElementById("mensaje-resultado").innerHTML = `Perdiste. No quedan mas intentos. La palabra era: "${palabraGanadora}"`;
                    bloqueoFieldsetGanarOPerder();
                    }
                }
            }
        }
    }
  }
  
  
  //Funcion para definir puntaje, se ejecuta cuando el jugador gana
  function scorePartidaGanada(fila){
  
    let puntaje = {};
  
    puntaje.fecha = new Date().toLocaleString("es-AR", { timeZone:"America/Argentina/Buenos_Aires"});
    puntaje.nombre = document.getElementById("nombre-jugador-input").value;
  
    //calcular puntaje
    switch (fila) {
        case 0:
            puntaje.puntaje = 1000
            break;
  
        case 1:
            puntaje.puntaje = 800
            break;
  
        case 2:
            puntaje.puntaje = 600
            break;
  
        case 3:
            puntaje.puntaje = 400
            break;
  
        case 4:
            puntaje.puntaje = 200
            break;
  
        case 5:
            puntaje.puntaje = 50
            break;
  
        default:
            break;
    }
  
    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem("puntajes")) || [];
    puntajesArray.push(puntaje);
  
    //Convierto mi array de puntajes a json
    let puntajeArrayJSON = JSON.stringify(puntajesArray);
  
    //Guardo mi array de puntajes en formato JSON en el local storage
    localStorage.setItem("puntajes", puntajeArrayJSON);
  
  }
  
  //Funcion para obtener puntajes. 
  function ObtenerScore() { 
  
    //Traigo del LocalStorage "puntajes", si no esta se le asigna "[]"
    let puntajesArray = JSON.parse(localStorage.getItem("puntajes")) || [];
    //Muestra la lista de puntajes ordenado por fecha
    let body = "";
    for (let i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntaje)}</td>
                    </tr>`
        }
    document.getElementById("puntajes").innerHTML = body;
  }
  
  function ordenaTablaP() { //Funcion para ordenar puntajes
  
    //Traigo del LocalStorage "puntajes", si no esta se le asigna "[]"
    let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];
  
    //Orden puntajes
    puntajesArray.sort(function (a, b){
        if (a.puntaje > b.puntaje) {
            return 1;
          }
        if (a.puntaje < b.puntaje) {
            return -1;
        }
        return 0;
    });
  
    //Muestro la lista de puntajes ordenado por puntaje
    let body = '';
    for (let i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntaje)}</td>
                    </tr>`
        }
    document.getElementById('puntajes').innerHTML = body;
  }
  
  
  let gameOver = false;
  
  function bloqueoFieldsetGanarOPerder() {
    for (let i = 0; i < 6; i++){
        let fieldset = document.getElementById(`fila${i}`);
        if (gameOver);
        fieldset.disabled=true;
    }
  }
  
// FUNCIONES PARA CUANDO HAY ALGÚN ERROR EN LOS INPUTS

  function msjerrorEnter() {
    errorCampoVacio = document.getElementById("mensaje-error");
    errorCampoVacio.innerHTML = "Debe completar todos los cmapos de la fila";
    errorCampoVacio.style.visibility = "visible";
  }
  
  function msjerrorValor() {
    errorCampoValor = document.getElementById("mensaje-error");
    errorCampoValor.innerHTML = "Utilice solo letras mayúsculas";
    errorCampoValor.style.visibility = "visible";
  }
  
  function msjerrorLetra() {
    errorCampoValor = document.getElementById("mensaje-error");
    errorCampoValor.innerHTML = "Máximo una letra por campo";
    errorCampoValor.style.visibility = "visible";
  }
  
  function eliminaMsjError() {
    errorCampoValor = document.getElementById("mensaje-error");
    errorCampoValor.style.visibility = "hidden";
  }
  
// FUNCIÓN PRINCIPAL - INICIO DEL JUEGO

  function inicio () {
    for (let i = 0; i < 6; i++){
        let fieldset = document.getElementById(`fila${i}`);
        fieldset.onkeydown = function (event){
            if(event.key === `Enter`){
                let validaLetra = document.querySelectorAll(`#fila${i} input`);
                let regex = new RegExp ("[A-Z]");
                let valor0 = validaLetra[0].value;
                let valor1 = validaLetra[1].value;
                let valor2 = validaLetra[2].value;
                let valor3 = validaLetra[3].value;
                let valor4 = validaLetra[4].value;
  
                let input0 = regex.test(valor0);
                let input1 = regex.test(valor1);
                let input2 = regex.test(valor2);
                let input3 = regex.test(valor3);
                let input4 = regex.test(valor4);
                //VALIDO Nombre
                if (valor0 == "" || valor1 == "" || valor2 == "" || valor3 == "" || valor4 == ""){
                  msjerrorEnter();
                //VALIDO Valor
                }else if (input0 == false || input1 == false || input2 == false || input3 == false || input4 == false){
                  msjerrorValor();
                  //VALIDO Letra
                }else if (valor0.length > 1 || valor1.length  > 1 || valor2.length > 1 || valor3.length > 1 || valor4.length > 1 ){
                  msjerrorLetra();
                }
  
                else {
                    guardaResp(i);
                    eliminaMsjError();
  
                    let respUser = respuestas[i];
                    let respUserString = respUser.join("");
  
                    if (respUserString == palabraGanadora){
                        gameOver = true;
                        showBtn();
                        document.getElementById("mensaje-resultado").style.color = "rgb(0, 0, 0)";
                        document.getElementById("mensaje-resultado").innerHTML = "Te felicito! Ganaste la partida!";
                        scorePartidaGanada(i); // Guardo el score de la partida
                        bloqueoFieldsetGanarOPerder();
                    }
  
                    if (i == 0 && respUserString != palabraGanadora){
                        document.getElementById("fila1").disabled=false;
                        document.getElementById("fila0").disabled=true;
                        document.getElementById("f1c0").focus();
                    }
                    if (i == 1 && respUserString != palabraGanadora){
                        document.getElementById("fila2").disabled=false;
                        document.getElementById("fila1").disabled=true;
                        document.getElementById("f2c0").focus();
                    }
                    if (i == 2 && respUserString != palabraGanadora){
                        document.getElementById("fila3").disabled=false;
                        document.getElementById("fila2").disabled=true;
                        document.getElementById("f3c0").focus();
                    }
                    if (i == 3 && respUserString != palabraGanadora){
                        document.getElementById("fila4").disabled=false;
                        document.getElementById("fila3").disabled=true;
                        document.getElementById("f4c0").focus();
                    }
                    if (i == 4 && respUserString != palabraGanadora){
                        document.getElementById("fila5").disabled=false;
                        document.getElementById("fila4").disabled=true;
                        document.getElementById("f5c0").focus();
                    }
                    if (i == 5  && respUserString != palabraGanadora){
                        gameOver = true;
                        showBtn();
                        document.getElementById("mensaje-resultado").innerHTML = `Perdiste. La palabra era: "${palabraGanadora}"`;
                        bloqueoFieldsetGanarOPerder();
                    }
                }
            }
        }
    }
  }
  
// FUNCIÓN PARA GUARDAR RESPUESTA
  function guardaResp(i){
    for (let iCol = 0; iCol < 5; iCol++){
        let input = document.getElementById(`f${i}c${iCol}`).value;
        respuestas[i].push(input);
    }
    revisaResult(respuestas[i], i);
  }
  
  function revisaResult(respuesta, i){
    respuesta.forEach(function(elemento, index){
        if(elemento === arrayPalabraGanadora[index]){
          tablaColores[i][index] = colores.VERDE;
        }
        else if(arrayPalabraGanadora.includes(elemento)){
          tablaColores[i][index] = colores.AMARILLO;
        }
        else if(!arrayPalabraGanadora.includes(elemento)){
          tablaColores[i][index] = colores.GRIS;
        }
    })
    pintaTabla();
  }
  
  // CONSTANTE CON PALABRAS - NO SE PUDO HACER CON FETCH POR ERROR DE CORS

  const listaPalabras =     ["CABLE", "BOXEA", "JUEGA", "BAILA", "SALSA", "PAPAS", "JUEGA", "COFRE", "COMBO", "CALMA",
                             "CERCA", "CENAN", "CENAN", "FURIA", "FUROR", "ABRIL", "GANAR", "GARRA", "GATEE", "GOTEO",
                             "GMAIL", "GRITA", "GRITE", "GUITA", "PLATA", "HAZLO", "HECHO", "INFRA", "CABRA", "KARMA",
                             "LEONA", "MONJA", "MONOS", "MUJER", "OIGAN", "OZONO", "PALIO", "PELEA", "PALOS", "PANZA",
                             "PARAR", "PILAS", "PIPAS", "PLACA", "PUDOR", "FUMEN", "RAMOS", "RENAL", "TONGO", "ZANCO"]
  

//BUSCA UNA PALABRA DE "listaPalabras" Y LA SELECCIONA AL AZAR
  function elegirPalabraAlAzar(listaPalabras) {
    return listaPalabras[Math.floor(Math.random() * listaPalabras.length)]
  }

//DEFINE LA PALABRA ENCONTRADA COMO GANADORA
  let palabraGanadora = elegirPalabraAlAzar(listaPalabras);
  let arrayPalabraGanadora = palabraGanadora.split("");

//FUNCIÓN PARA UTILIZAR LA TECLA TAB
  function tabular(e) {
    let obj = e.target
    let frm = obj.form;
    let largo = obj.value.length;
    let tam = obj.maxLength;
        if (largo == tam) {
            for(i=0;i<frm.elements.length;i++) {
                if(frm.elements[i]==obj) {
                if (i==frm.elements.length-1) { i=-1; }
            break;
        }
    }
    frm.elements[i+1].focus();
    return false;
    }
  }


// OPCION "Nueva partida"
  function hideBtn() {
    document.getElementById("n-partida").style.display="none";
    document.getElementById("c-partida").style.display="none";
    document.getElementById("g-partida").style.display="inline-block";
    document.getElementById("timer").style.display="block";
    document.getElementById("time").style.display="inline";
    }
  
  function showBtn() {
    document.getElementById("v-partida").style.display="inline-block";
    document.getElementById("g-partida").style.display="none";
    document.getElementById("mensaje-resultado").style.display="inline-block";
    document.getElementById("time").style.display="none";
    document.getElementById("timer").style.display="none";
  }

// SETEA E INICIA EL TIMER
  function timer() {
    let tresminutos = 60 * 5,
    display = document.querySelector("#time");
    startTimer(tresminutos, display);
  }
  
  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let reloj = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (gameOver){
            clearInterval(reloj);
        }
  
        if (--timer < 0) {
            gameOver = true;
            timer = duration;
            showBtn();
            document.getElementById("mensaje-resultado").innerHTML = `Termnó el tiempo`;
            bloqueoFieldsetGanarOPerder();
        }
    }, 1000);
  }
  
  
  window.onload = function(){
    console.log(palabraGanadora)
  
    let inputsForm = document.getElementById("grilla").querySelectorAll("input");
  
    inputsForm.forEach(function (x){
        x.addEventListener("keyup", tabular);
    })
  
    const nuevaPartida = document.getElementById("n-partida");
    const volverAJugar = document.getElementById("v-partida");
    const gurdarPartida = document.getElementById("g-partida");
    const rankingPartida = document.getElementById("r-partida");
    const cargarPartida = document.getElementById("c-partida");
  
    const form = document.getElementById("formulario-usuario");
    const name = document.getElementById("nombre-jugador-input");
  
    const ordenFecha = document.getElementById("orden-por-fecha");
    const ordenPuntaje = document.getElementById("orden-por-puntaje");
    const numeroPartida = document.getElementById("numero-partida");
  
    form.addEventListener("submit", function(e){
        e.preventDefault();
  
        let regexName = new RegExp ("^[A-Za-z]+$");
        let nameValue = name.value;
        let regexValue = regexName.test(nameValue);
  
        if (name.value.length < 3 || regexValue == false || name.value == "") {
            errorNombre.innerHTML = "Ingrese un nombre mayor a 2 digitos. Solo letras sin espacios."
            return false;
        } else {
            document.getElementById("nombre-jugador").style.display="none";
            gameOver = false;
            inicio();
            timer();
            hideBtn();
            document.getElementById("fila0").disabled=false;
            document.getElementById("f0c0").focus();
            msjerrorValor();
        }
    })
  
    nuevaPartida.addEventListener("click", function(){
        document.getElementById("nombre-jugador").style.display="flex";
        name.focus();
    })
  
    volverAJugar.addEventListener("click", function(){
        gameOver = false;
        location.reload();
    })
  
    gurdarPartida.addEventListener("click", function(){
        GuardaProgreso();
    })
  
    rankingPartida.addEventListener("click", function(){
        ordenPuntaje.style.display="table-cell"
        numeroPartida.style.display="none"
        ObtenerScore();
        mostrarModal();
  
        ordenFecha.addEventListener("click", function(){
            ObtenerScore();
        })
  
        ordenPuntaje.addEventListener("click", function(){
          ordenaTablaP();
        })
    })
  
    cargarPartida.addEventListener("click", function(){
        document.getElementById("nombre-jugador").style.display="none";
        ordenPuntaje.style.display="none"
        numeroPartida.style.display="table-cell"
        ObtenerGuardadas();
        mostrarModal();
  
        ordenFecha.addEventListener("click", function(){
            ObtenerGuardadas();
        })
    })

//MODAL//

    function mostrarModal() {
        let modal = document.getElementById("modalPartidas");
        let span = document.getElementById("close");
  
        // When the user clicks the button, open the modal 
        modal.style.display = "block";
  
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
  
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
  }  