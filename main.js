// sonido para el video 
function playVideo() {
    const video = document.getElementById('video');
    const button = document.getElementById('main__btn');
    // Alterna el estado de mute
    video.muted = !video.muted;
    // Actualiza el contenido del botón usando HTML directamente
    if (video.muted) {
        button.innerHTML = 'Haz clic para darle sonido al video <i class="bi bi-volume-mute-fill"></i>';
    } else {
        button.innerHTML = 'Haz clic para quitar el sonido del video <i class="bi bi-volume-up-fill"></i>';
    }
    // Asegura que el video esté reproduciéndose
    if (video.paused) {
        video.play();
    }
}
// cerrar aviso 
document.getElementById("cerrar").addEventListener("click", function (event) {
    // Evita que el enlace recargue la página
    event.preventDefault();
    document.getElementById("aviso").style.display = "none";
});
