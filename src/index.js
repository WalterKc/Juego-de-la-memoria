let contadorTurnos = 0;
const tablero = document.querySelector("#tablero");
const cuadros = tablero.querySelectorAll(".cuadro");
function colorearTablero() {
  let colores = ["rojo", "azul", "verde", "amarillo", "negro", "blanco"];
  const coloresRepetidos = colores.concat(colores);
  coloresRepetidos.sort(function () {
    return 0.5 - Math.random();
  });
  for (i = 0; i < cuadros.length; i++) {
    cuadros[i].classList.add(coloresRepetidos[i]);
  }
}

let cuadroAnterior = 0;
let acarreoActivo = false;
function selecionarCelda(event) {
  if (event.target.classList.contains("cuadro")) {
    if (!acarreoActivo) {
      const cuadroSelecionado = event.target;
      if (Number(cuadroSelecionado.style.opacity) === 0 && !acarreoActivo) {
        cuadroSelecionado.style.opacity = 1;
        cuadroAnterior = cuadroSelecionado;
        acarreoActivo = true;
        ContadorTurnos += 1;
      } else if (Number(cuadroSelecionado.style.opacity) === 1) {
        cuadroSelecionado.style.opacity = 0;
        acarreoActivo = false;
      }
    } else {
      comprobarIgualdadDeCuadros(event.target);
    }
  }
}

function comprobarIgualdadDeCuadros(cuadroSelecionado) {
  if (acarreoActivo) {
    cuadroSelecionado.style.opacity = 1;
    if (
      cuadroAnterior.classList[2] === cuadroSelecionado.classList[2] &&
      cuadroSelecionado !== cuadroAnterior
    ) {
      cuadroAnterior.parentElement.classList.add("completo");
      cuadroSelecionado.parentElement.classList.add("completo");
      cuadroAnterior.remove();
      cuadroSelecionado.remove();
      acarreoActivo = false;
      evaluarFinDeJuego();
    } else {
      acarreoActivo = false;
      setTimeout(function () {
        cuadroAnterior.style.opacity = 0;
      }, 200);
      setTimeout(function () {
        cuadroSelecionado.style.opacity = 0;
      }, 200);
    }
  }
}

function evaluarFinDeJuego() {
  const cuadrosActuales = tablero.querySelectorAll(".cuadro");
  if (cuadrosActuales.length === 0) {
    const mensajeFinJuego = document.querySelector("#fin-juego");
    mensajeFinJuego.querySelector("strong").textContent = ContadorTurnos;
    tablero.style.display = "none";
    finDeJuego = document.querySelector("#fin-juego");
    finDeJuego.style.display = "block";
  }
}

colorearTablero();
tablero.onclick = selecionarCelda;
