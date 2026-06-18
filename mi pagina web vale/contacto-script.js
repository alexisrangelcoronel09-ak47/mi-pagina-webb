document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initCharCounter();
    initPhoneFormat();
    initRFCFormat();
});

// Contador de caracteres
function initCharCounter() {
    const mensaje = document.getElementById('mensaje');
    const charCount = document.getElementById('charCount');
    
    if (mensaje && charCount) {
        mensaje.addEventListener('input', () => {
            const length = mensaje.value.length;
            charCount.textContent = length;
            
            if (length > 450) {
                charCount.style.color = '#d97706';
            } else if (length > 480) {
                charCount.style.color = '#dc2626';
            } else {
                charCount.style.color = '#64748b';
            }
        });
    }
}

// Formato teléfono
function initPhoneFormat() {
    const telefono = document.getElementById('telefono');
    
    if (telefono) {
        telefono.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 10) {
                if (value.length > 6) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                } else if (value.length > 2) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '$1-$2');
                }
            }
            
            e.target.value = value;
        });
    }
}

// RFC Mayúsculas
function initRFCFormat() {
    const rfc = document.getElementById('rfc');
    if (rfc) {
        rfc.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }
}

// Validación y envío
function initForm() {
    const form = document.getElementById('formContacto');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar
        const nombre = document.getElementById('nombre').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        const terminos = document.getElementById('terminos').checked;
        
        // Validaciones
        if (!nombre || nombre.length < 3) {
            mostrarToast('Ingresa tu nombre completo', 'error');
            return;
        }
        
        if (!empresa || empresa.length < 2) {
            mostrarToast('Ingresa el nombre de tu empresa', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            mostrarToast('Email inválido', 'error');
            return;
        }
        
        if (email.includes('@gmail.com') || email.includes('@hotmail.com')) {
            mostrarToast('Por favor usa tu email corporativo', 'error');
            return;
        }
        
        const telValue = telefono.replace(/\D/g, '');
        if (telValue.length < 10) {
            mostrarToast('Teléfono inválido. Usa 10 dígitos', 'error');
            return;
        }
        
        if (!servicio) {
            mostrarToast('Selecciona un servicio', 'error');
            return;
        }
        
        if (mensaje.length < 20) {
            mostrarToast('Describe tu necesidad con al menos 20 caracteres', 'error');
            return;
        }
        
        if (!terminos) {
            mostrarToast('Debes aceptar el Aviso de Privacidad', 'error');
            return;
        }

        // Enviar
        const btn = form.querySelector('.btn-enviar');
        const btnText = document.getElementById('btnText');
        const loader = document.getElementById('loader');
        
        btnText.style.display = 'none';
        loader.style.display = 'inline';
        btn.disabled = true;

        // Simular envío
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Éxito
        mostrarToast('¡Mensaje enviado! Te contactaremos en menos de 2 horas', 'success');
        
        // Enviar a WhatsApp
        const whatsappMsg = `*Nueva Solicitud - NovaLogic*%0A%0A` +
            `*Nombre:* ${nombre}%0A` +
            `*Empresa:* ${empresa}%0A` +
            `*Email:* ${email}%0A` +
            `*Tel:* ${telefono}%0A` +
            `*Servicio:* ${getServicioText(servicio)}%0A%0A` +
            `*Mensaje:*%0A${mensaje}`;
        
        setTimeout(() => {
            window.open(`https://wa.me/525555555555?text=${whatsappMsg}`, '_blank');
        }, 1000);
        
        form.reset();
        document.getElementById('charCount').textContent = '0';
        
        btnText.style.display = 'inline';
        loader.style.display = 'none';
        btn.disabled = false;
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getServicioText(value) {
    const servicios = {
        'ciberseguridad': 'Ciberseguridad Empresarial',
        'cloud': 'Infraestructura Cloud',
        'soporte': 'Soporte Técnico 24/7',
        'consultoria': 'Consultoría IT Estratégica',
        'backup': 'Backup y DR',
        'otro': 'Otro'
    };
    return servicios[value] || value;
}

function mostrarToast(mensaje, tipo = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <span class="toast-icon">${tipo === 'success' ? '✓' : '✕'}</span>
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
.toast.success .toast-icon { background: #059669; color: white; }
.toast.error .toast-icon { background: #dc2626; color: white; }
@media (max-width: 768px) {
    .toast { right: 10px; left: 10px; max-width: none; }
}`;
document.head.appendChild(style);

console.log('%c NovaLogic Contacto v1.0 ', 'background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 8px; border-radius: 4px; font-weight: bold;');