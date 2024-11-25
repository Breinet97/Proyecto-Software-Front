 // Referencias a elementos
 const acumularSi = document.getElementById('acumularSi');
 const acumularNo = document.getElementById('acumularNo');
 const acumulaPuntosContainer = document.getElementById('acumulaPuntosContainer');
 const noAcumulaPuntosContainer = document.getElementById('noAcumulaPuntosContainer');

 const domicilioRadio = document.getElementById('domicilio');
 const tiendaRadio = document.getElementById('tienda');
 const direccionContainer = document.getElementById('direccionContainer');
 const recogerContainer = document.getElementById('recogerContainer');

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
     } else if (acumularNo.checked) {
         acumulaPuntosContainer.style.display = 'none';
         noAcumulaPuntosContainer.style.display = 'block';
     }
 }

 // Función para cargar y mostrar el detalle del carrito
function mostrarDetalleCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartDetailBody = document.getElementById('cartDetailBody');

    // Limpiar contenido previo
    cartDetailBody.innerHTML = '';

    if (carrito.length === 0) {
        cartDetailBody.innerHTML = '<tr><td colspan="4">Tu carrito está vacío.</td></tr>';
        return;
    }

    // Renderizar cada producto en el carrito
    carrito.forEach((producto) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>1</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>$${producto.precio.toLocaleString()}</td>
        `;
        cartDetailBody.appendChild(fila);
    });

    // Calcular y mostrar el total
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>$${total.toLocaleString()}</strong></td>
    `;
    cartDetailBody.appendChild(totalRow);
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Recuperar carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Elementos HTML
    const cartDetailBody = document.getElementById('cartDetailBody');
    const totalElement = document.getElementById('total');
    const direccionContainer = document.getElementById('direccionContainer');
    const recogerContainer = document.getElementById('recogerContainer');
    const acumulaPuntosContainer = document.getElementById('acumulaPuntosContainer');
    const noAcumulaPuntosContainer = document.getElementById('noAcumulaPuntosContainer');

    // Función para formatear valores monetarios
    function formatearMoneda(valor) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
    }

    // Función para cargar el detalle del carrito
    function cargarDetalleCarrito() {
        cartDetailBody.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            const totalPorProducto = producto.precio * producto.cantidad;
            total += totalPorProducto;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${formatearMoneda(producto.precio)}</td>
                <td>${formatearMoneda(totalPorProducto)}</td>
            `;
            cartDetailBody.appendChild(fila);
        });

        totalElement.textContent = `Total: ${formatearMoneda(total)}`;
    }

    // Mostrar/ocultar contenedores según la opción seleccionada
    document.getElementById('domicilio').addEventListener('change', function () {
        direccionContainer.style.display = 'block';
        recogerContainer.style.display = 'none';
    });

    document.getElementById('tienda').addEventListener('change', function () {
        direccionContainer.style.display = 'none';
        recogerContainer.style.display = 'block';
    });

    document.getElementById('acumularSi').addEventListener('change', function () {
        acumulaPuntosContainer.style.display = 'block';
        noAcumulaPuntosContainer.style.display = 'none';
    });

    document.getElementById('acumularNo').addEventListener('change', function () {
        acumulaPuntosContainer.style.display = 'none';
        noAcumulaPuntosContainer.style.display = 'block';
    });

    // Inicializar la vista
    cargarDetalleCarrito();
});

 // Eventos
 domicilioRadio.addEventListener('change', toggleFields);
 tiendaRadio.addEventListener('change', toggleFields);

 acumularSi.addEventListener('change', toggleAcumulaPuntos);
 acumularNo.addEventListener('change', toggleAcumulaPuntos);