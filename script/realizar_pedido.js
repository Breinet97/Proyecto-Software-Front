// Referencias a elementos
const domicilioRadio = document.getElementById('domicilio');
const tiendaRadio = document.getElementById('tienda');
const direccionContainer = document.getElementById('direccionContainer');
const recogerContainer = document.getElementById('recogerContainer');

const acumularSi = document.getElementById('acumularSi');
const acumularNo = document.getElementById('acumularNo');
const acumulaPuntosContainer = document.getElementById('acumulaPuntosContainer');
const noAcumulaPuntosContainer = document.getElementById('noAcumulaPuntosContainer');

const cartDetailBody = document.getElementById('cartDetailBody');
const totalElement = document.getElementById('total');
const orderButton = document.querySelector('.order__button');
const messageContainer = document.querySelector('.card__message');

// Función para alternar campos según el tipo de pedido
function toggleFields() {
    if (domicilioRadio.checked) {
        direccionContainer.style.display = 'block';
        recogerContainer.style.display = 'none';
    } else if (tiendaRadio.checked) {
        direccionContainer.style.display = 'none';
        recogerContainer.style.display = 'block';
    } else {
        direccionContainer.style.display = 'none';
        recogerContainer.style.display = 'none';
    }
}

// Función para alternar opciones de acumulación de puntos
function toggleAcumulaPuntos() {
    if (acumularSi.checked) {
        acumulaPuntosContainer.style.display = 'block';
        noAcumulaPuntosContainer.style.display = 'none';
    } else {
        acumulaPuntosContainer.style.display = 'none';
        noAcumulaPuntosContainer.style.display = 'block';
    }
}

// Función para mostrar el detalle del carrito
function mostrarDetalleCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cartDetailBody.innerHTML = '';

    if (carrito.length === 0) {
        cartDetailBody.innerHTML = '<tr><td colspan="4">Tu carrito está vacío.</td></tr>';
        totalElement.textContent = '';
        return;
    }

    let total = 0;
    carrito.forEach(producto => {
        const totalPorProducto = producto.precio * producto.cantidad;
        total += totalPorProducto;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>$${totalPorProducto.toLocaleString()}</td>
        `;
        cartDetailBody.appendChild(fila);
    });

    totalElement.textContent = `Total: $${total.toLocaleString()}`;
}

// Función para procesar el pedido
function realizarPedido() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert('No hay productos en el carrito para generar el reporte');
        return;
    }

    // Mostrar mensaje de éxito
    messageContainer.textContent = '¡Pedido realizado con éxito!';
    messageContainer.classList.add('card__message--visible');

    setTimeout(() => {
        messageContainer.classList.remove('card__message--visible');
        messageContainer.textContent = '';
    }, 3000);

    // Generar PDF con jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Detalle del Pedido", 10, 10);

    // Agregar datos del cliente
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre}`, 10, 20);
    doc.text(`Correo Electrónico: ${email}`, 10, 30);

    // Detalles del carrito
    let y = 40;
    carrito.forEach((producto, index) => {
        doc.text(
            `${index + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toLocaleString()}`,
            10,
            y
        );
        y += 10;
    });

    // Agregar total
    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    doc.text(`Total: $${total.toLocaleString()}`, 10, y);

    doc.save('Detalle De Tu Pedido.pdf');

    // Limpiar formulario
    document.querySelectorAll('input[type="text"], input[type="radio"], textarea').forEach((input) => {
        input.value = '';
        input.checked = false;
    });

    // Limpiar carrito
    localStorage.removeItem('carrito');
    mostrarDetalleCarrito();
}

// Eventos
domicilioRadio.addEventListener('change', toggleFields);
tiendaRadio.addEventListener('change', toggleFields);
acumularSi.addEventListener('change', toggleAcumulaPuntos);
acumularNo.addEventListener('change', toggleAcumulaPuntos);
orderButton.addEventListener('click', realizarPedido);

// Inicializar vista
document.addEventListener('DOMContentLoaded', mostrarDetalleCarrito);
