# **Manual de Usuario - Juego de Tres en Raya**

## **Introducción**
El **Tres en Raya** es un juego clásico de estrategia para dos jugadores o contra una IA, donde el objetivo es alinear tres marcas (X o O) en una fila, columna o diagonal en un tablero de 3x3. Este juego ha sido implementado en **HTML, CSS y JavaScript**, funcionando completamente con clics en los elementos del tablero.

---

## **Requisitos del Sistema**
1. **Navegador web compatible**: Chrome, Firefox, Edge, o Safari.
2. No se necesita conexión a internet, ya que es un juego local (Si se obtiene la carpeta). Tambien esta disponible en web con el link (tresyunaraya.freesite.online).

---

## **Inicio del Juego**
1. Abre el archivo `index.html` en tu navegador.
2. Se mostrará un **menú** en el cual el usuario podra elegir si jugar contra la IA o multijugador con un humano.
3. El juego está listo para comenzar.

---

## **Reglas del Juego**
1. El tablero es un cuadrado de 3x3 dividido en celdas.
2. Dos jugadores se turnan para jugar:
   - El primer jugador usa la marca **X**.
   - El segundo jugador usa la marca **O**.
3. Los jugadores alternan turnos haciendo clic en una celda vacía del tablero.
4. El objetivo es conseguir **tres marcas iguales** en:
   - Una fila horizontal.
   - Una columna vertical.
   - Una de las dos diagonales.
5. Si todas las celdas se llenan y no hay un ganador, el juego termina en un **empate**.

---

## **Interfaz del Juego**
### **Elementos visibles:**
1. **Título del juego**: depende la opción que escogistes.
2. **Tablero**: Una cuadrícula de 3x3 con celdas iniciales vacías.
3. **Indicador de turno**: Muestra de quién es el turno actual (X u O).
4. **Botón de reinicio**: Permite reiniciar el juego.

### **Interacciones:**
- **Clic en una celda vacía**: Coloca la marca del jugador actual en esa celda y cambia el turno.
- **Indicador de ganador/empate**: Muestra un mensaje como **¡Ganador X/O!**, o **"Empate"** al finalizar el juego.

---

## **Instrucciones de Uso**
### **Inicio del Juego**
1. Abre el archivo en tu navegador para cargar el juego.
2. El jugador 1 (X) comienza. Haz clic en una celda vacía para colocar su marca.

### **Durante el Juego**
1. Alterna turnos entre los jugadores siguiendo las reglas.
2. Observa el indicador de turno para saber quién juega.
3. El juego detectará automáticamente si hay un ganador o empate y mostrará el resultado.
                                                                                   
### **Reinicio del Juego**
- Si deseas jugar otra vez, haz clic en el botón **Reiniciar** (o actualiza la página si no hay botón).

---

## **Ejemplo de Juego**
1. **Turno 1**: El jugador X hace clic en la celda central. Aparece una "X" en esa celda.
2. **Turno 2**: El jugador O selecciona la esquina superior izquierda. Aparece una "O".
3. El juego continúa hasta que:
   - Un jugador alinea tres marcas (X o O) y se muestra el mensaje de victoria.
   - Todas las celdas están llenas y se declara 

### _Hecho por José Antonio Vera Arroyo_