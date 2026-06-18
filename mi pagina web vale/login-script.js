let tipoUsuario = 'cliente';
let intentosFallidos = 0;
const MAX_INTENTOS = 3;

// Usuarios demo
const usuarios = {
    cliente: [
        { email: 'cliente@novalogic.mx', password: 'Cliente123', nombre: 'Juan Pérez', empresa: 'Tech Corp' },
        { email: 'demo@empresa.com', password: 'Demo123', nombre: 'María García', empresa: 'Demo SA' }
    ],
    admin: [
        { email: 'admin@novalogic.mx', password: 'Admin123', nombre: 'Admin NovaLogic', rol: 'Super Admin' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initForm();
    cargarRecordarme();
});

function cambiarTipo(tipo) {
    tipoUsuario = tipo;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === tipo) {
            btn.classList.add('active');
        }
    });

    // Cambiar placeholder según tipo
    const emailInput = document.getElementById('email');
    if (tipo === 'admin') {
        emailInput.placeholder = 'admin@novalogic.mx';
    } else {
        emailInput.placeholder = 'tu@empresa.com';
    }
}

function togglePassword() {
    const input = document.getElementById('password');
    const icon = document.getElementById('eyeIcon');

    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '🙈';
    } else {
        input.type = 'password';
        icon.textContent = '👁️';
    }
}

function initForm() {
    const form = document.getElementById('formLogin');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpiar errores
        limpiarErrores();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const recordarme = document.getElementById('recordarme').checked;

        // Validaciones
        let hayError = false;

        if (!email) {
            mostrarError('email', 'Ingresa tu email');
            hayError = true;
        } else if (!validarEmail(email)) {
            mostrarError('email', 'Email inválido');
            hayError = true;
        }

        if (!password) {
            mostrarError('password', 'Ingresa tu contraseña');
            hayError = true;
        } else if (password.length < 6) {
            mostrarError('password', 'Mínimo 6 caracteres');
            hayError = true;
        }

        if (hayError) return;

        // Simular validación
        const btn = form.querySelector('.btn-login');
        const btnText = document.getElementById('btnText');
        const loader = document.getElementById('loader');

        btnText.style.display = 'none';
        loader.style.display = 'inline-flex';
        btn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Verificar credenciales
        const usuario = usuarios[tipoUsuario].find(u => u.email === email && u.password === password);

        if (usuario) {
            // Login exitoso
            intentosFallidos = 0;

            if (recordarme) {
                localStorage.setItem('nl_remember', JSON.stringify({ email, tipo: tipoUsuario }));
            } else {
                localStorage.removeItem('nl_remember');
            }

            // Guardar sesión
            sessionStorage.setItem('nl_user', JSON.stringify({
                nombre: usuario.nombre,
                email: usuario.email,
                tipo: tipoUsuario,
                empresa: usuario.empresa || 'NovaLogic',
                loginTime: new Date().toISOString()
            }));

            mostrarToast('¡Bienvenido! Redirigiendo...', 'success');

            setTimeout(() => {
                if (tipoUsuario === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'portal-cliente.html';
                }
            }, 1000);

        } else {
            // Login fallido
            intentosFallidos++;

            if (intentosFallidos >= MAX_INTENTOS) {
                mostrarToast('Demasiados intentos. Cuenta bloqueada 15 min', 'error');
                btn.disabled = true;
                setTimeout(() => {
                    intentosFallidos = 0;
                    btn.disabled = false;
                }, 900000); // 15 min
            } else {
                mostrarError('password', `Credenciales incorrectas. Intento ${intentosFallidos}/${MAX_INTENTOS}`);
                mostrarToast('Email o contraseña incorrectos', 'error');
            }

            btnText.style.display = 'inline';
            loader.style.display = 'none';
            btn.disabled = false;
        }
    });
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mostrarError(campo, mensaje) {
    const input = document.getElementById(campo);
    const errorEl = document.getElementById(campo + 'Error');

    input.parentElement.parentElement.classList.add('error');
    errorEl.textContent = mensaje;
    errorEl.classList.add('show');
}

function limpiarErrores() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    document.querySelectorAll('.error-msg').forEach(msg => {
        msg.classList.remove('show');
    });
}

function cargarRecordarme() {
    const recordado = localStorage.getItem('nl_remember');
    if (recordado) {
        const data = JSON.parse(recordado);
        document.getElementById('email').value = data.email;
        document.getElementById('recordarme').checked = true;
        if (data.tipo) {
            cambiarTipo(data.tipo);
        }
    }
}

function loginMicrosoft() {
    mostrarToast('Redirigiendo a Microsoft 365...', 'info');
    setTimeout(() => {
        mostrarToast('SSO en desarrollo. Usa email/contraseña', 'info');
    }, 1500);
}

function recuperarPassword(e) {
    e.preventDefault();
    document.getElementById('modalRecuperar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function cerrarModalRecuperar() {
    document.getElementById('modalRecuperar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function enviarRecuperacion() {
    const email = document.getElementById('emailRecuperar').value.trim();

    if (!email ||!validarEmail(email)) {
        mostrarToast('Ingresa un email válido', 'error');
        return;
    }

    mostrarToast('Enlace enviado a ' + email, 'success');
    setTimeout(() => {
        cerrarModalRecuperar();
    }, 1500);
}

function mostrarToast(mensaje, tipo = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <span class="toast-icon">${tipo === 'success'? '✓' : tipo === 'error'? '✕' : 'ℹ'}</span>
        <span>${mensaje}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Toast styles
const style = document.createElement('style');
style.textContent = `
.toast {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 9999;
    transform: translateX(450px);
    transition: transform 0.3s;
    max-width: 400px;
}
.toast.show { transform: translateX(0); }
.toast.success { border-left: 4px solid #059669; }
.toast.error { border-left: 4px solid #dc2626; }
.toast.info { border-left: 4px solid #2563eb; }
.toast-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
}
.toast.success.toast-icon { background: #059669; color: white; }
.toast.error.toast-icon { background: #dc2626; color: white; }
.toast.info.toast-icon { background: #2563eb; color: white; }
@media (max-width: 768px) {
    .toast { right: 10px; left: 10px; max-width: none; }
}`;
document.head.appendChild(style);

document.getElementById('overlay').addEventListener('click', cerrarModalRecuperar);

console.log('%c NovaLogic Login v2.0 ', 'background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 8px; border-radius: 4px; font-weight: bold;');
console.log('Demo Cliente: cliente@novalogic.mx / Cliente123');
console.log('Demo Admin: admin@novalogic.mx / Admin123');