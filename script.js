let participantes = JSON.parse(localStorage.getItem('participantes')) || [];

function agregarParticipante() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (nombre && telefono) {
        participantes.push({ nombre, telefono });
        localStorage.setItem('participantes', JSON.stringify(participantes));
        actualizarLista();
        document.getElementById('nombre').value = '';
        document.getElementById('telefono').value = '';
    } else {
        alert('Por favor, completa ambos campos.');
    }
}

function actualizarLista() {
    const lista = document.getElementById('lista-participantes');
    lista.innerHTML = '';

    participantes.forEach((participante, index) => {
        const li = document.createElement('li');
        li.textContent = `${participante.nombre} - ${participante.telefono}`;
        
        // Botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarParticipante(index);
        li.appendChild(botonEliminar);

        lista.appendChild(li);
    });
}

function eliminarParticipante(indice) {
    if (confirm('¿Estás seguro de que deseas eliminar esta participación?')) {
        participantes.splice(indice, 1);
        localStorage.setItem('participantes', JSON.stringify(participantes));
        actualizarLista();
    }
}

function realizarRifa() {
    if (participantes.length === 0) {
        alert('No hay participantes registrados.');
        return;
    }

    // Elegir un ganador aleatoriamente
    const indiceGanador = Math.floor(Math.random() * participantes.length);
    const ganador = participantes[indiceGanador];

    // Mostrar el ganador
    document.getElementById('ganador').textContent = `¡El ganador es: ${ganador.nombre} (${ganador.telefono})!`;

    // Eliminar todas las entradas que coincidan con el nombre del ganador (insensible a mayúsculas/minúsculas)
    participantes = participantes.filter(participante =>
        participante.nombre.toLowerCase() !== ganador.nombre.toLowerCase()
    );
    localStorage.setItem('participantes', JSON.stringify(participantes));
    actualizarLista();
}

document.addEventListener('DOMContentLoaded', actualizarLista);

function formatearTelefono(input) {
    // Remueve todos los caracteres que no sean números
    let valor = input.value.replace(/\D/g, '');

    // Aplica el formato "504 9999-9999"
    if (valor.length > 4) {
        valor = valor.replace(/(\d{4})(\d{1,4})/, '$1-$2');
    }
    
    input.value = valor;
}

