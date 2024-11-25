// Registro de Usuario
document.querySelector('.register__form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
    const rol = document.getElementById('rol').value;
    const codigoAdmin = document.getElementById('codigo-admin').value;

    // Verificar código si es administrador
    if (rol === 'administrador' && codigoAdmin !== 'admin123') {
        alert('Código de administrador incorrecto');
        return;
    }

    // Crear el usuario
    const usuario = { nombre, email, contraseña, rol };

    // Guardar en LocalStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.find((u) => u.email === email);
    if (existe) {
        alert('El correo ya está registrado.');
        return;
    }

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso');
    window.location.href = './index.html';
});

// Mostrar campo de código de administrador si se selecciona el rol "Administrador"
document.getElementById('rol').addEventListener('change', function () {
    const adminContainer = document.getElementById('codigo-admin-container');
    if (this.value === 'administrador') {
        adminContainer.style.display = 'block';
    } else {
        adminContainer.style.display = 'none';
    }
});
