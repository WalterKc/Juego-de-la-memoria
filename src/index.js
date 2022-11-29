let ContadorTurnos = 0;
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

let cuadroCarry = 0;
let carryActivo = false;
function selecionarCelda(event) {
  if (event.target.classList.contains("cuadro")) {
    if (!carryActivo) {
      const cuadroSelecionado = event.target;

      if (Number(cuadroSelecionado.style.opacity) === 0 && !carryActivo) {
        console.log("trasparente");
        console.log("falso");
        cuadroSelecionado.style.opacity = 1;
        cuadroCarry = cuadroSelecionado;
        carryActivo = true;
        ContadorTurnos += 1;
      } else if (Number(cuadroSelecionado.style.opacity) === 1) {
        console.log("opaco");
        cuadroSelecionado.style.opacity = 0;
        carryActivo = false;
      }
    } else {
      console.log("segunda opcion");
      comprobarIgualdadDeCuadros(event.target);
    }
  }
}

function comprobarIgualdadDeCuadros(cuadroSelecionado) {
  if (carryActivo) {
    cuadroSelecionado.style.opacity = 1;
    if (
      cuadroCarry.classList[2] === cuadroSelecionado.classList[2] &&
      cuadroSelecionado !== cuadroCarry
    ) {
      console.log("iguales");
      cuadroCarry.parentElement.classList.add("completo");
      cuadroSelecionado.parentElement.classList.add("completo");
      cuadroCarry.remove();
      cuadroSelecionado.remove();
      carryActivo = false;
      evaluoFinDeJuego();
    } else {
      console.log("diferentes");
      carryActivo = false;
      setTimeout(function () {
        cuadroCarry.style.opacity = 0;
      }, 200);
      setTimeout(function () {
        cuadroSelecionado.style.opacity = 0;
      }, 200);
    }
  }
}

function evaluoFinDeJuego() {
  const cuadrosActuales = tablero.querySelectorAll(".cuadro");
  if (cuadrosActuales.length === 0) {
    const mensajeFinJuego = document.querySelector("#fin-juego");
    mensajeFinJuego.querySelector("strong").textContent = ContadorTurnos;
    tablero.style.display = "none";
    finDeJuego = document.querySelector("#fin-juego");
    finDeJuego.style.display = "block";
  }
}

tablero.onclick = selecionarCelda;
