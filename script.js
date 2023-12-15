const BUTTON = document.getElementById("guess-button");
const RESTART_BUTTON = document.getElementById("restart-button");
const INPUT = document.getElementById("guess-input");
let palabra = "";
let intentos = 6;
const UrlApi = "https://random-word-api.herokuapp.com/word?lang=en&&length=5";
console.log(palabra);
fetch(UrlApi).then(response => response.json()).then(response=>{
    palabra=response[0].toUpperCase();
    console.log("API: ",palabra);
}).catch(err =>{
    palabra= listaAuxiliarEnError[Math.floor(Math.random()*listaAuxiliarEnError.length)]
    console.log("Lista auxiliar: ",palabra);
});


INPUT.addEventListener("input", () => {
    if (INPUT.value.trim() !== "") {
        BUTTON.disabled = false;
    } else {
        BUTTON.disabled = true;
    }
});

let juegoTerminado = false;

BUTTON.addEventListener("click", () => {
    if (juegoTerminado) {
        return;
    }

    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");


    if (INTENTO.length !== 5) {
        mostrarMensaje("Debe usar 5 letras");
        return;
    }

    let row = document.createElement("div");
    row.className = "row";
    for (let i in palabra) {
        if (palabra[i] === INTENTO[i]) {
            let cuadroLetra = armarLetra(INTENTO[i], "green");
            row.appendChild(cuadroLetra);
        } else if (palabra.includes(INTENTO[i])) {
            let cuadroLetra = armarLetra(INTENTO[i], "blue");
            row.appendChild(cuadroLetra);
        } else {
            let cuadroLetra = armarLetra(INTENTO[i], "gray");
            row.appendChild(cuadroLetra);
        }
    }
    GRID.appendChild(row);
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!</h1>");
        juegoTerminado = true;
    } else {
        intentos--;
        if (intentos === 0) {
            terminar("<h1>PERDISTE!</h1>");
            juegoTerminado = true;
        }
    }


    if (intentos === 0 || INTENTO === palabra) {
        BUTTON.disabled = true;
        RESTART_BUTTON.style.display = "inline";
    }
});

RESTART_BUTTON.addEventListener("click", reiniciarJuego);

function leerIntento() {
    return document.getElementById("guess-input").value.toUpperCase();
}

function terminar(mensaje) {
    document.getElementById("mensaje").innerHTML = mensaje;
}

function armarLetra(letra, color) {
    let span = document.createElement("span");
    span.className = "letter";
    span.innerHTML = letra;
    span.style.backgroundColor = color;
    span.style.borderRadius = "0";
    return span;
}

function mostrarMensaje(mensaje) {
    const mensajeElement = document.getElementById("mensaje");
    mensajeElement.textContent = mensaje;
    setTimeout(() => {
        mensajeElement.textContent = "";
    }, 2000);
}

function reiniciarJuego() {
    RESTART_BUTTON.removeEventListener("click", reiniciarJuego);
    palabra = DICCIONARIO[Math.floor(Math.random() * DICCIONARIO.length)];
    intentos = 6;
    juegoTerminado = false;

    const GRID = document.getElementById("grid");
    GRID.innerHTML = "";

    INPUT.value = "";

    BUTTON.disabled = false;
    RESTART_BUTTON.style.display = "none";

    terminar("");

    console.log(palabra);

    RESTART_BUTTON.addEventListener("click", reiniciarJuego);
}