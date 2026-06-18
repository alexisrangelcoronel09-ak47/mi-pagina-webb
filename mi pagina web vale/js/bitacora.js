// BASE DE DATOS SIMULADA - LocalStorage
let bitacora = JSON.parse(localStorage.getItem('bitacora_amigopc')) || [
    // Datos de ejemplo para que no salga vacía
    {id: 1, fecha: '18/06/2026', cliente: 'Maravatío Corp', servicio: 'Formateo Windows 11 + Office', estatus: 'Completado'},
    {id: 2, fecha: '17/06/2026', cliente: 'Papelería El Águila', servicio: 'Reparación pantalla laptop', estatus: 'En proceso'},
    {id: 3, fecha: '16/06/2026', cliente: 'Esc. Primaria Benito Juárez', servicio: 'Mantenimiento preventivo 10 PCs', estatus: 'Pendiente'}
];

function guardarDB() {
    localStorage.setItem('bitacora_amigopc', JSON.stringify(bitacora));
}

function mostrarBitacora() {
    const tbody = document.getElementById('tablaBitacora');
    
    if (bitacora.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px; color:#999;">No hay servicios registrados. Agrega el primero.</td></tr>';
        return;
    }

    tbody.innerHTML = '';
    bitacora.forEach((item, index) => {
        const clase = item.estatus.toLowerCase().includes('completado') ? 'completado' : 
                     item.estatus.toLowerCase().includes('proceso') ? 'proceso' : 'pendiente';
        
        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.fecha}</td>
                <td>${item.cliente}</td>
                <td>${item.servicio}</td>
                <td><span class="status ${clase}">${item.estatus}</span></td>
                <td><button class="btn-borrar" onclick="borrar(${index})">Borrar</button></td>
            </tr>
        `;
    });
}

function nuevoServicio() {
    const cliente = prompt('1. Nombre del cliente:');
    if (!cliente || cliente.trim() === '') return;

    const servicio = prompt('2. Descripción del servicio realizado:');
    if (!servicio || servicio.trim() === '') return;

    const estatus = prompt('3. Estatus del servicio:\nEscribe: Pendiente / En proceso / Completado');
    if (!estatus || estatus.trim() === '') return;

    const nuevo = {
        id: bitacora.length + 1,
        fecha: new Date().toLocaleDateString('es-MX'),
        cliente: cliente.trim(),
        servicio: servicio.trim(),
        estatus: estatus.trim()
    };

    bitacora.unshift(nuevo);
    guardarDB();
    mostrarBitacora();
    
    alert(`Servicio registrado correctamente\nID: ${nuevo.id} | Cliente: ${nuevo.cliente}`);
}

function borrar(index) {
    if (confirm('¿Seguro que quieres borrar este registro de la bitácora?')) {
        bitacora.splice(index, 1);
        // Reasignar IDs para que queden ordenados
        bitacora.forEach((item, i) => item.id = i + 1);
        guardarDB();
        mostrarBitacora();
    }
}

function limpiarTodo() {
    if (confirm('ATENCIÓN: Esto borrará toda la bitácora. ¿Continuar?')) {
        bitacora = [];
        guardarDB();
        mostrarBitacora();
        alert('Bitácora limpiada');
    }
}

// Cargar datos al abrir la página
document.addEventListener('DOMContentLoaded', mostrarBitacora);

// Info para el profe en consola
console.log('=== PROYECTO AMIGO PC ===');
console.log('Base de Datos: LocalStorage - clave: bitacora_amigopc');
console.log('Para versión real: Conectar a MySQL con PHP y PDO');
console.log('Tabla SQL: CREATE TABLE servicios (id INT, fecha DATE, cliente VARCHAR(100), servicio TEXT, estatus VARCHAR(20))');