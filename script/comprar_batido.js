// Crear un array para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Obtener los datos del carrito si existen, o crear uno vacío si no

// Función para agregar productos al carrito
function addToCart(id, nombre, precio) {
    // Crear un objeto del producto
    const producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: 1
    };

    // Agregar el producto al carrito
    carrito.push(producto);

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar en consola el contenido del carrito
    console.log("Producto agregado al carrito:", producto);
    console.log("Carrito actual:", carrito);

    // Mostrar mensaje de confirmación
    mostrarMensaje('Producto agregado al carrito');
}

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.querySelector('.card__message');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.add('card__message--visible'); // Mostrar el mensaje

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.classList.remove('card__message--visible'); // Ocultar el mensaje
    }, 3000);
}
