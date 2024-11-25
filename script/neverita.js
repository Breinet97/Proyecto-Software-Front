// Recuperar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para formatear valores monetarios
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
}

// Función para llenar la tabla con los productos del carrito
function cargarCarrito() {
    const carritoContainer = document.querySelector('.cart__table-body');
    const totalContainer = document.querySelector('.cart__total');
    const finalizarBtn = document.querySelector('.cart__cta-btn');

    // Limpiar la tabla antes de llenarla
    carritoContainer.innerHTML = '';

    // Calcular el total
    let total = 0;

    carrito.forEach((producto, index) => {
        // Si no existe la cantidad, inicialízala con 1
        if (!producto.cantidad) {
            producto.cantidad = 1;
        }

        // Crear una fila para cada producto
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <input 
                    type="number" 
                    value="${producto.cantidad}" 
                    min="1" 
                    data-index="${index}" 
                    class="cart__quantity" 
                />
            </td>
            <td>${formatearMoneda(producto.precio)}</td>
            <td class="cart__total-price" data-index="${index}">
                ${formatearMoneda(producto.precio * producto.cantidad)}
            </td>
            <td>
                <button class="cart__remove" data-index="${index}">Eliminar</button>
            </td>
        `;
        carritoContainer.appendChild(fila);

        // Sumar al total
        total += producto.precio * producto.cantidad;
    });

    // Actualizar el total
    totalContainer.innerHTML = `<strong>Total: ${formatearMoneda(total)}</strong>`;

    // Habilitar el botón "Finalizar Pedido" si hay productos
    finalizarBtn.disabled = carrito.length === 0;

    // Actualizar el carrito en localStorage por si se inicializan valores
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminar producto del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
    cargarCarrito(); // Volver a cargar el carrito
}

// Función para actualizar el total cuando cambian las cantidades
function actualizarCantidad(index, cantidad) {
    // Convertir la cantidad a un número entero
    const nuevaCantidad = parseInt(cantidad, 10);
    // Actualizar la cantidad en el carrito
    carrito[index].cantidad = nuevaCantidad; // Asegúrate de que cada producto tenga un atributo 'cantidad'
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage

    // Actualizar el total por producto
    const precioUnitario = carrito[index].precio;
    const totalPorProducto = precioUnitario * nuevaCantidad;

    const totalElement = document.querySelector(`.cart__total-price[data-index="${index}"]`);
    totalElement.textContent = formatearMoneda(totalPorProducto);

    // Actualizar el total general
    let total = 0;
    document.querySelectorAll('.cart__total-price').forEach(item => {
        const valorNumerico = parseFloat(
            item.textContent
                .replace(/\./g, '') // Elimina los puntos (separadores de miles)
                .replace(',', '.')  // Convierte la coma decimal en punto decimal
                .replace(/[^\d.-]/g, '') // Elimina cualquier símbolo extra como "$"
        );
        total += valorNumerico;
    });

    // Mostrar el total general formateado
    document.querySelector('.cart__total').innerHTML = `<strong>Total: ${formatearMoneda(total)}</strong>`;
}

// Función para borrar todo el carrito
function borrarCarrito() {
    carrito = []; // Vaciar el array del carrito
    localStorage.removeItem('carrito'); // Eliminar los datos del carrito en localStorage
    cargarCarrito(); // Recargar la vista del carrito
}

// Manejar eventos de eliminar y actualizar cantidades
document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();

    // Escuchar clics en los botones de eliminar
    document.querySelector('.cart__table-body').addEventListener('click', function (e) {
        if (e.target.classList.contains('cart__remove')) {
            const index = e.target.getAttribute('data-index');
            eliminarProducto(index);
        }
    });

    // Escuchar cambios en las cantidades
    document.querySelector('.cart__table-body').addEventListener('input', function (e) {
        if (e.target.classList.contains('cart__quantity')) {
            const index = e.target.getAttribute('data-index');
            const cantidad = e.target.value;
            actualizarCantidad(index, cantidad);
        }
    });

    // Escuchar clic en el botón de finalizar pedido
    document.getElementById('finalizarPedidoBtn').addEventListener('click', function () {
        // Forzar la cantidad a 1 para todos los productos antes de proceder
        carrito.forEach(producto => {
            if (!producto.cantidad || producto.cantidad < 1) {
                producto.cantidad = 1; // Asignar la cantidad por defecto de 1
            }
        });

        if (carrito.length > 0) {
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Redirigir a la página de "Realizar Pedido"
            window.location.href = "realizar_pedido.html";
        } else {
            alert("Tu carrito está vacío. Agrega productos antes de finalizar el pedido.");
        }
    });



    // Escuchar clic en el botón de borrar carrito
    document.getElementById('borrarCarritoBtn').addEventListener('click', function () {
        borrarCarrito();
    });
});
