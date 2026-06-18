const productos = [
    { id: 1, nombre: "ESET NOD32 Antivirus", categoria: "antivirus", precio: 899, desc: "Protección avanzada 3 dispositivos", icono: "🛡️", badge: "HOT", sku: "ESET-3D" },
    { id: 2, nombre: "Microsoft 365 Empresas", categoria: "office", precio: 2499, desc: "Office + Teams + 1TB OneDrive", icono: "📊", badge: "OFERTA", sku: "MS365-BUS" },
    { id: 3, nombre: "Windows 11 Pro", categoria: "windows", precio: 3999, desc: "Licencia digital OEM original", icono: "💿", badge: "", sku: "WIN11-PRO" },
    { id: 4, nombre: "Adobe Creative Cloud", categoria: "software", precio: 4999, desc: "Photoshop, Illustrator, Premiere", icono: "🎨", badge: "PRO", sku: "ADOBE-CC" },
    { id: 5, nombre: "Malwarebytes Premium", categoria: "antivirus", precio: 599, desc: "Anti-malware 3 dispositivos", icono: "🦠", badge: "", sku: "MB-PREM" },
    { id: 6, nombre: "CCleaner Professional", categoria: "software", precio: 299, desc: "Optimización y limpieza de PC", icono: "🧹", badge: "", sku: "CC-PRO" },
    { id: 7, nombre: "Kaspersky Total Security", categoria: "antivirus", precio: 1299, desc: "VPN + Password Manager 5 disp", icono: "🔒", badge: "TOP", sku: "KASP-TOT" },
    { id: 8, nombre: "Acronis Cyber Protect", categoria: "software", precio: 999, desc: "Backup + Anti-ransomware 1TB", icono: "💾", badge: "", sku: "ACRO-CP" },
    { id: 9, nombre: "Office 2021 Pro Plus", categoria: "office", precio: 4499, desc: "Licencia permanente 1 PC", icono: "📝", badge: "", sku: "OFF21-PRO" },
    { id: 10, nombre: "VMware Workstation", categoria: "software", precio: 5999, desc: "Virtualización profesional", icono: "🖥️", badge: "", sku: "VMWARE-WS" },
    { id: 11, nombre: "Bitdefender GravityZone", categoria: "antivirus", precio: 1899, desc: "Seguridad empresarial 10 endpoints", icono: "🔐", badge: "PRO", sku: "BIT-GZ" },
    { id: 12, nombre: "AutoCAD 2024", categoria: "software", precio: 18999, desc: "Diseño CAD 2D/3D profesional", icono: "📐", badge: "", sku: "ACAD-2024" }
];

let carrito = [];
let filtroActual = 'todos';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
    renderProductos();
    initFiltros();
    initBusqueda();
    cargarCarrito();
    actualizarCarrito();
});

function renderProductos() {
    const grid = document.getElementById('gridProductos');
    const filtrados = productos.filter(p => {
        const matchCat = filtroActual === 'todos' || p.categoria === filtroActual;
        const matchSearch = !searchTerm || p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtrados.length === 0) {
        grid.innerHTML = '<div class="no-products"><p>No se encontraron productos</p></div>';
        return;
    }

    grid.innerHTML = filtrados.map(p => `
        <div class="producto">
            <div class="producto-img">
                ${p.icono}
                ${p.badge ? `<span class="producto-badge">${p.badge}</span>` : ''}
            </div>
            <div class="producto-info">
                <div class="producto-cat">${p.categoria.toUpperCase()}</div>
                <h3>${p.nombre}</h3>
                <p class="producto-desc">${p.desc}</p>
                <div class="producto-precio">
                    <span class="precio-valor">$${p.precio.toLocaleString()}</span>
                    <button class="btn-agregar" onclick="agregarCarrito(${p.id})">Agregar +</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initFiltros() {
    document.querySelectorAll('.tag').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tag').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroActual = btn.dataset.cat;
            renderProductos();
        });
    });
}

function initBusqueda() {
    document.getElementById('search').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderProductos();
    });
}

function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(i => i.id === id);
    
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    
    guardarCarrito();
    actualizarCarrito();
    toast(`${producto.nombre} agregado`, 'success');
}

function quitarCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    guardarCarrito();
    actualizarCarrito();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad += delta;
        if (item.cantidad <= 0) quitarCarrito(id);
        else {
            guardarCarrito();
            actualizarCarrito();
        }
    }
}

function actualizarCarrito() {
    const count = carrito.reduce((sum, i) => sum + i.cantidad, 0);
    const total = carrito.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
    
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = `$${total.toLocaleString()}`;
    document.querySelector('.btn-pagar').disabled = count === 0;
    
    const cartBody = document.getElementById('cartBody');
    if (carrito.length === 0) {
        cartBody.innerHTML = '<div class="cart-empty">Carrito vacío</div>';
    } else {
        cartBody.innerHTML = carrito.map(i => `
            <div class="cart-item">
                <div class="cart-item-img">${i.icono}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${i.nombre}</div>
                    <div class="cart-item-price">$${i.precio.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="cambiarCantidad(${i.id}, -1)">-</button>
                        <span>${i.cantidad}</span>
                        <button class="qty-btn" onclick="cambiarCantidad(${i.id}, 1)">+</button>
                        <button class="cart-item-remove" onclick="quitarCarrito(${i.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function toggleCarrito() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function guardarCarrito() {
    localStorage.setItem('novaCarrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const guardado = localStorage.getItem('novaCarrito');
    if (guardado) carrito = JSON.parse(guardado);
}

function abrirCheckout() {
    if (carrito.length === 0) return;
    
    const total = carrito.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
    document.getElementById('totalPagar').textContent = `$${total.toLocaleString()}`;
    document.getElementById('resumenItems').innerHTML = carrito.map(i => 
        `<div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
            <span>${i.nombre} x${i.cantidad}</span>
            <strong>$${(i.precio * i.cantidad).toLocaleString()}</strong>
        </div>`
    ).join('');
    
    document.getElementById('modalPago').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    toggleCarrito();
}

function cerrarModal() {
    document.getElementById('modalPago').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

document.querySelectorAll('input[name="pago"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.getElementById('formTarjeta').style.display = e.target.value === 'tarjeta' ? 'block' : 'none';
    });
});

document.getElementById('numTarjeta').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\s/g, '');
    e.target.value = v.match(/.{1,4}/g)?.join(' ') || v;
});

document.getElementById('vencimiento').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length >= 2) v = v.slice(0,2) + '/' + v.slice(2,4);
    e.target.value = v;
});

document.getElementById('rfc').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

async function procesarCompra() {
    const nombre = document.getElementById('nombre').value.trim();
    const rfc = document.getElementById('rfc').value.trim();
    const email = document.getElementById('email').value.trim();
    const metodo = document.querySelector('input[name="pago"]:checked').value;
    
    if (!nombre || !rfc || !email) {
        toast('Completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(rfc)) {
        toast('RFC inválido', 'error');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast('Email inválido', 'error');
        return;
    }
    
    if (metodo === 'tarjeta') {
        const num = document.getElementById('numTarjeta').value.replace(/\s/g, '');
        const ven = document.getElementById('vencimiento').value;
        const cvv = document.getElementById('cvv').value;
        
        if (num.length < 13 || !/^\d{2}\/\d{2}$/.test(ven) || cvv.length < 3) {
            toast('Datos de tarjeta incompletos', 'error');
            return;
        }
    }
    
    const btn = event.target;
    document.getElementById('btnText').style.display = 'none';
    document.getElementById('loader').style.display = 'inline';
    btn.disabled = true;
    
    await new Promise(r => setTimeout(r, 2500));
    
    const orden = '#NL-' + Date.now().toString().slice(-6);
    document.getElementById('numOrden').textContent = orden;
    
    const total = carrito.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
    const ordenes = JSON.parse(localStorage.getItem('novaOrdenes') || '[]');
    ordenes.push({ 
        numero: orden, 
        fecha: new Date().toISOString(), 
        total, 
        metodo,
        productos: carrito,
        cliente: {nombre, rfc, email}
    });
    localStorage.setItem('novaOrdenes', JSON.stringify(ordenes));
    
    cerrarModal();
    document.getElementById('modalExito').classList.add('active');
    
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    
    document.getElementById('btnText').style.display = 'inline';
    document.getElementById('loader').style.display = 'none';
    btn.disabled = false;
}

function cerrarExito() {
    document.getElementById('modalExito').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function toast(msg, tipo = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const t = document.createElement('div');
    t.className = `toast ${tipo}`;
    t.innerHTML = `<span>${tipo === 'success' ? '✓' : '✕'}</span> ${msg}`;
    document.body.appendChild(t);
    
    setTimeout(() => t.classList.add('show'), 100);
    setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 300);
    }, 3000);
}

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('modalPago').classList.remove('active');
    document.getElementById('modalExito').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
});

const style = document.createElement('style');
style.textContent = `
.toast {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 9999;
    transform: translateX(400px);
    transition: transform 0.3s;
}
.toast.show { transform: translateX(0); }
.toast.success { border-left: 4px solid #059669; }
.toast.error { border-left: 4px solid #dc2626; }
.toast span { font-size: 1.25rem; }
@media (max-width: 768px) {
    .nav-menu { display: none; }
    .grid { grid-template-columns: 1fr; }
    .cart-sidebar { width: 100%; right: -100%; }
    .payment-options { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
}`;
document.head.appendChild(style);