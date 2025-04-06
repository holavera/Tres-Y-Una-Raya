// Aqui guardamos los datos de los elementos en variables.
const tablero = document.getElementById("tablero");
const estadoJuego = document.getElementById("estado-juego");
const turnoActualTexto = document.getElementById("turno-actual");
const botonReiniciar = document.getElementById("reiniciar-btn");

let turnoActual = 'X'; // X siempre comienza
let celdas = Array(9).fill(null); // Tablero vacío

// Inicializar tablero
function inicializarTablero() {
    tablero.innerHTML = ''; // Limpiar el tablero antes de redibujarlo
    celdas.forEach((x, index) => {
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

    if (celdas[index] === null) {
        celdas[index] = turnoActual;
        event.target.textContent = turnoActual;

        // Verificar ganador
        if (verificarGanador()) {
            estadoJuego.textContent = `¡Ganador: ${turnoActual}!`;
            bloquearJuego();
            return;
        }

        // Verificar empate
        if (celdas.every((celda) => celda !== null)) {
            estadoJuego.textContent = '¡Empate!';
            bloquearJuego();
            return;
        }

        // Cambiar de turno
        turnoActual =  'O'
        turnoActualTexto.textContent = turnoActual;

        // Movimiento de la IA si es su turno
        if (turnoActual === 'O') {
            setTimeout(movimientoIA, 400);
        }
    }
}

// Bloquear el juego después de que haya un ganador o empate
function bloquearJuego() {
    tablero.querySelectorAll('.celda').forEach((celda) => {
        celda.removeEventListener('click', manejarMovimiento);
    });
}

// IA: Movimiento Medio
function movimientoIA() {
    let movimiento;
    const movimientosDisponibles = obtenerMovimientosDisponibles();

    // Modo fácil: Elige un movimiento aleatorio
    movimiento = movimientosDisponibles[Math.floor(Math.random() * movimientosDisponibles.length)];

    // Realizar el movimiento de la IA
    celdas[movimiento] = 'O';
    tablero.querySelector(`[data-index="${movimiento}"]`).textContent = 'O';

    // Verificar ganador
    if (verificarGanador()) {
        estadoJuego.textContent = '¡Ganador: O!';
        bloquearJuego();
        return;
    }

    // Verificar empate
    if (celdas.every((celda) => celda !== null)) {
        estadoJuego.textContent = '¡Empate!';
        bloquearJuego();
        return;
    }

    turnoActual = 'X';
    turnoActualTexto.textContent = turnoActual;
}

// Obtener los índices de las celdas vacías
function obtenerMovimientosDisponibles() {
    return celdas
        .map((celda, index) => (celda === null ? index : null))
        .filter((index) => index !== null);
}

// Verificar condiciones de victoria
function verificarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    return combinacionesGanadoras.some(([a, b, c]) => celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]);
}

// Reiniciar el juego
function reiniciarJuego() {
    location.reload(); // Recarga la página actual
}

// Clave para iniciarlizar los divs y el juego.
inicializarTablero();
botonReiniciar.addEventListener('click', reiniciarJuego); // Metodo para reiniciar la página. Solo incuido en unJugadorFacil.html y unJugadorMedio.html