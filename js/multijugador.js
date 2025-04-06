const tablero = document.getElementById("tablero");
const estadoJuego = document.getElementById("estado-juego");
const turnoActualTexto = document.getElementById("turno-actual");
const botonReiniciar = document.getElementById("reiniciar-btn");

let turnoActual = 'X'; // X siempre comienza
let celdas = Array(9).fill(null); // Tablero vacío

// Inicializar tablero, crear divs, añadir class para cada div, maneja movimientos, etc
function inicializarTablero() {
    tablero.innerHTML = ''; // Limpiar el tablero antes de redibujarlo
    celdas.forEach((_, index) => {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        celda.dataset.index = index;
        celda.addEventListener('click', manejarMovimiento);
        tablero.appendChild(celda);
    });
}

// Manejar el clic en una celda
function manejarMovimiento(event) {
    const index = event.target.dataset.index;

    if (celdas[index] === null) { // Si la celda está vacía
        celdas[index] = turnoActual;
        event.target.textContent = turnoActual;
        event.target.setAttribute("data-value", turnoActual); // Asignar el valor a data-value

        // Verificar ganador o empate
        if (verificarGanador()) {
            turnoActualTexto.textContent = '';
            estadoJuego.textContent = `¡Ganador: ${turnoActual}!`;
            bloquearJuego();
            return;
        }

        // Verificar si hay empate
        if (celdas.every((celda) => celda !== null)) {
            turnoActualTexto.textContent = '';
            estadoJuego.textContent = '¡Empate!';
            bloquearJuego();
            return;
        }

        // Cambiar de turno
        turnoActual = turnoActual === 'X' ? 'O' : 'X'; //X o O ? Aqui da el resultado
        turnoActualTexto.textContent = turnoActual;
        console.log(turnoActual); // Esto espara demostrar en la consola cuando es el turno de cada uno. Es una prueba
    }
}

// Bloquear el juego después de que haya un ganador o empate
function bloquearJuego() {
    tablero.querySelectorAll('.celda').forEach((celda) => {
        celda.removeEventListener('click', manejarMovimiento);
    });
}

// Verificar condiciones de victoria
function verificarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    return combinacionesGanadoras.some(([a, b, c]) => 
        celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]
    );
}

// Reiniciar el juego
function reiniciarJuego() {
    estadoJuego.textContent = 'Turno actual: ';
    turnoActual = 'X'; // Reiniciar el turno a X
    turnoActualTexto.textContent = turnoActual; // Mostrar el turno actualizado
    celdas.fill(null); // Vaciar las celdas del tablero
    inicializarTablero(); // Volver a generar el tablero
}


// Inicialización
inicializarTablero();