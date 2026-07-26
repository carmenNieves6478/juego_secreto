let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    }
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número válido entre 1 y ${numeroMaximo}.`);
        limpiarCaja();
        return;
    }

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('h1', '¡Felicidades!');
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // Si ya sorteamos todos los números posibles
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        return numeroGenerado;
    } else {
        // Si el número generado está en la lista de números sorteados
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    // Limpiar la caja de entrada
    limpiarCaja();
    // Indicar mensaje de intervalo de números, generar número secreto e inicializar intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Inicializar condiciones del juego
condicionesIniciales();

// Soporte para presionar la tecla Enter en la caja de texto
document.addEventListener('DOMContentLoaded', () => {
    const inputUsuario = document.getElementById('valorUsuario');
    if (inputUsuario) {
        inputUsuario.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const botonReiniciar = document.getElementById('reiniciar');
                if (botonReiniciar && !botonReiniciar.disabled && document.querySelector('h1').textContent.includes('Felicidades')) {
                    reiniciarJuego();
                } else {
                    verificarIntento();
                }
            }
        });
    }
});
