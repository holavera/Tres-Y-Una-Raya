// Guardamos en constantes los datos importantes de los elementos.
const toggleSoundButton = document.getElementById('toggle-sound');
const backgroundMusic = document.getElementById('background-music');

// Verificamos el estado de la música desde el localStorage
let isPlaying = localStorage.getItem('musicState') === 'playing';

// Función para reproducir música cuando el usuario interactúe
function playMusic() {
    if (!isPlaying) {
        backgroundMusic.play().catch((error) => {
            console.log("Error al intentar reproducir la música:", error);
        });
        toggleSoundButton.src = 'music/sound-on.png'; // Cambiar imagen a sonido activado
        localStorage.setItem('musicState', 'playing'); // Guardar estado de la música como activada
        isPlaying = true;
    }
}

// Función para pausar la música
function pauseMusic() {
    backgroundMusic.pause();
    toggleSoundButton.src = 'music/sound-off.png'; // Cambiar imagen a sonido desactivado
    localStorage.setItem('musicState', 'paused'); // Guardar estado de la música como pausada
    isPlaying = false;
}

// Establecer un manejador de eventos en el botón de control de sonido
toggleSoundButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Intentar iniciar la música cuando el usuario interactúe por primera vez
document.body.addEventListener('click', playMusic, { once: true });
