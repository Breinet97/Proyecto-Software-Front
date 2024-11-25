// Referencia a la tabla y el total
const cartDetailBody = document.getElementById('cartDetailBody');
const totalElement = document.getElementById('total');

// Función para mostrar el detalle del carrito
function mostrarDetalleCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartDetailBody.innerHTML = '';

    if (carrito.length === 0) {
        cartDetailBody.innerHTML = '<tr><td colspan="4">Tu carrito está vacío.</td></tr>';
        totalElement.textContent = 'Total: $0';
        return;
    }

    let total = 0;
    carrito.forEach(producto => {
        const totalPorProducto = producto.precio * producto.cantidad;
        total += totalPorProducto;

        const fila = document.createElement('tr');
        fila.classList.add('inventory__row');
        fila.innerHTML = `
            <td class="inventory__data">${producto.nombre}</td>
            <td class="inventory__data">${producto.cantidad}</td>
            <td class="inventory__data">$${producto.precio.toLocaleString()}</td>
            <td class="inventory__data">$${totalPorProducto.toLocaleString()}</td>
        `;
        cartDetailBody.appendChild(fila);
    });

    totalElement.textContent = `Total: $${total.toLocaleString()}`;
}

// Inicializar vista cuando la página esté cargada
document.addEventListener('DOMContentLoaded', mostrarDetalleCarrito);
