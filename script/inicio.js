// Manejar selección de rol en inicio de sesión
document.getElementById('clientBtn').addEventListener('click', function () {
    document.getElementById('loginFormCliente').style.display = 'block';
    document.getElementById('loginFormAdmin').style.display = 'none';
});

document.getElementById('adminBtn').addEventListener('click', function () {
    document.getElementById('loginFormAdmin').style.display = 'block';
    document.getElementById('loginFormCliente').style.display = 'none';
});

// Inicio de sesión como Cliente
document.getElementById('loginFormCliente').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('emailCliente').value;
    const contraseña = document.getElementById('passwordCliente').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((u) => u.email === email && u.contraseña === contraseña && u.rol === 'cliente');

    if (usuario) {
        alert(`Bienvenido ${usuario.nombre}`);
        // Redirigir o manejar acceso
        window.location.href = './realizar_pedido.html';
    } else {
        alert('Correo o contraseña incorrectos para cliente.');
    }
});

// Inicio de sesión como Administrador
document.getElementById('loginFormAdmin').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('emailAdmin').value;
    const contraseña = document.getElementById('passwordAdmin').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((u) => u.email === email && u.contraseña === contraseña && u.rol === 'administrador');

    if (usuario) {
        alert(`Bienvenido Administrador ${usuario.nombre}`);
        // Redirigir o manejar acceso
        window.location.href = './paginas-administrador/inventario.html';
    } else {
        alert('Correo o contraseña incorrectos para administrador.');
    }
});
