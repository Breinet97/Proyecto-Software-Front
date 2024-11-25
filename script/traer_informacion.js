const guardarInformacion = async (info) => {
    try {
        const response = await fetch('http://tubackend.com/guardar-informacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            throw new Error('Error al guardar la información');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};
const obtenerInformacion = async () => {
    try {
        const response = await fetch('http://tubackend.com/obtener-informacion', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Error al obtener la información');
        }

        const data = await response.json();
        console.log('Información obtenida:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};