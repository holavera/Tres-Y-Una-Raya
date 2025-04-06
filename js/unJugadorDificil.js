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
            turnoActualTexto.textContent = '';
            bloquearJuego();
            return;
        }

        // Verificar empate
        if (celdas.every((celda) => celda !== null)) {
            estadoJuego.textContent = '¡Empate!';
            turnoActualTexto.textContent = '';
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

// IA: Movimiento difícil
function movimientoIA() {
    let movimiento;
    const movimientosDisponibles = obtenerMovimientosDisponibles();

    // Modo difícil: Prioriza ganar, luego bloquear, y después elige una esquina.
    movimiento = buscarVictoria() || buscarBloqueo() || elegirEsquina() || 
                 movimientosDisponibles[Math.floor(Math.random() * movimientosDisponibles.length)];

    // Realizar el movimiento de la IA
    celdas[movimiento] = 'O';
    tablero.querySelector(`[data-index="${movimiento}"]`).textContent = 'O';

    // Verificar ganador
    if (verificarGanador()) {
        turnoActualTexto.textContent = '';
        estadoJuego.textContent = '¡Ganador: O!';
        bloquearJuego();
        return;
    }

    // Verificar empate
    if (celdas.every((celda) => celda !== null)) {
        turnoActualTexto.textContent = '';
        estadoJuego.textContent = '¡Empate!';
        bloquearJuego();
        return;
    }

    turnoActual = 'X';
    turnoActualTexto.textContent = turnoActual;
}

// Verificar si la IA puede ganar
function buscarVictoria() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let [a, b, c] of combinacionesGanadoras) {
        if (celdas[a] === 'O' && celdas[b] === 'O' && celdas[c] === null) return c;
        if (celdas[a] === 'O' && celdas[c] === 'O' && celdas[b] === null) return b;
        if (celdas[b] === 'O' && celdas[c] === 'O' && celdas[a] === null) return a;
    }
    return null;
}

// Verificar si la IA puede bloquear al jugador
function buscarBloqueo() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let [a, b, c] of combinacionesGanadoras) {
        if (celdas[a] === 'X' && celdas[b] === 'X' && celdas[c] === null) return c;
        if (celdas[a] === 'X' && celdas[c] === 'X' && celdas[b] === null) return b;
        if (celdas[b] === 'X' && celdas[c] === 'X' && celdas[a] === null) return a;
    }
    return null;
}

// Elegir una esquina si está disponible
function elegirEsquina() {
    const esquinas = [0, 2, 6, 8].filter((index) => celdas[index] === null);
    if (esquinas.length > 0) return esquinas[Math.floor(Math.random() * esquinas.length)];
    return null;
}

// Obtener todos los movimientos disponibles
function obtenerMovimientosDisponibles() {
    return celdas
        .map((celda, index) => (celda === null ? index : null))
        .filter((index) => index !== null);
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

    return combinacionesGanadoras.some(([a, b, c]) => celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]);
}

// Reiniciar el juego
function reiniciarJuego() {
    estadoJuego.textContent = 'Turno actual: ';
    turnoActual = 'X'; // Reiniciar el turno a X
    turnoActualTexto.textContent = turnoActual; // Mostrar el turno actualizado
    celdas.fill(null); // Vaciar las celdas del tablero
    inicializarTablero(); // Volver a generar el tablero
}

inicializarTablero(); // Clave para empezar el juego y crear divs
