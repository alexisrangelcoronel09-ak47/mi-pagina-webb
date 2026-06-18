const servicios = [
    {
        id: 1,
        icono: "🔒",
        color: "linear-gradient(135deg, #2563eb, #3b82f6)",
        nombre: "Ciberseguridad Empresarial",
        descripcion: "Protección avanzada 24/7 contra ransomware, phishing y amenazas avanzadas.",
        features: [
            "Firewall de nueva generación NGFW",
            "Detección y respuesta EDR/XDR",
            "SOC 24/7 con respuesta < 15 min",
            "Auditorías de seguridad y pentesting",
            "Capacitación anti-phishing para empleados",
            "Cumplimiento ISO 27001 y SOC 2"
        ],
        detalles: {
            que: "Implementamos una arquitectura de seguridad multicapa que protege tu infraestructura contra el 99.9% de amenazas conocidas y desconocidas.",
            como: "Usamos SIEM + SOAR + EDR integrados con IA para detectar, analizar y responder automáticamente a incidentes en tiempo real.",
            beneficios: [
                "Reduce 95% el riesgo de brechas de seguridad",
                "Cumple normativas internacionales de protección de datos",
                "Protección proactiva vs reactiva",
                "Equipo certificado CISSP, CEH, CISM"
            ]
        }
    },
    {
        id: 2,
        icono: "☁️",
        color: "linear-gradient(135deg, #7c3aed, #a855f7)",
        nombre: "Infraestructura Cloud",
        descripcion: "Migración, administración y optimización en AWS, Azure y Google Cloud.",
        features: [
            "Migración sin downtime",
            "Arquitectura multi-cloud",
            "Optimización de costos hasta 40%",
            "Disaster Recovery automatizado",
            "Auto-scaling inteligente",
            "Monitoreo 24/7"
        ],
        detalles: {
            que: "Transformamos tu infraestructura on-premise a cloud con arquitectura moderna, escalable y costo-eficiente.",
            como: "Usamos Infrastructure as Code (Terraform), contenedores (Kubernetes) y CI/CD para despliegues automatizados.",
            beneficios: [
                "Reduce costos de infraestructura 30-40%",
                "Escalabilidad ilimitada bajo demanda",
                "99.99% de uptime garantizado por SLA",
                "Backup automático y recuperación instantánea"
            ]
        }
    },
    {
        id: 3,
        icono: "🎧",
        color: "linear-gradient(135deg, #059669, #10b981)",
        nombre: "Soporte Técnico 24/7",
        descripcion: "Mesa de ayuda con SLA de 15 minutos. Técnicos certificados Microsoft, Cisco y CompTIA.",
        features: [
            "Soporte remoto ilimitado",
            "Visitas en sitio incluidas",
            "Monitoreo proactivo RMM",
            "Portal de tickets con tracking",
            "Inventario de activos automático",
            "Reportes mensuales ejecutivos"
        ],
        detalles: {
            que: "Tu departamento de TI externo. Resolvemos desde problemas de impresora hasta caídas de servidor críticos.",
            como: "3 niveles de soporte: L1 (inmediato), L2 (especializado), L3 (arquitectura). Herramientas RMM para prevención.",
            beneficios: [
                "Tiempo de respuesta promedio: 8 minutos",
                "Resolución en primera llamada: 85%",
                "Ahorro vs contratar equipo interno: 60%",
                "Escalamiento ilimitado sin costos extra"
            ]
        }
    },
    {
        id: 4,
        icono: "📊",
        color: "linear-gradient(135deg, #dc2626, #ef4444)",
        nombre: "Consultoría IT Estratégica",
        descripcion: "Transformación digital, optimización de procesos y roadmap tecnológico alineado a negocio.",
        features: [
            "Auditoría de infraestructura completa",
            "Plan de transformación digital 3 años",
            "Gobierno de TI y políticas",
            "Cumplimiento normativo (LFPDPPP, PCI-DSS)",
            "Selección de software empresarial",
            "Gestión de proyectos ágiles"
        ],
        detalles: {
            que: "Alineamos tu tecnología con tus objetivos de negocio. No más gastar en TI sin ROI claro.",
            como: "Metodología TOGAF + ITIL. Analizamos, diseñamos, implementamos y medimos resultados con KPIs de negocio.",
            beneficios: [
                "ROI promedio en proyectos: 300%",
                "Reducción de costos operativos IT: 35%",
                "Aumento de productividad: 60%",
                "Decisiones basadas en datos, no intuición"
            ]
        }
    },
    {
        id: 5,
        icono: "💾",
        color: "linear-gradient(135deg, #0891b2, #06b6d4)",
        nombre: "Backup y Recuperación",
        descripcion: "Respaldo automático 3-2-1. RPO de 15 minutos. Recuperación ante desastres garantizada.",
        features: [
            "Backup local + nube + offsite",
            "Replicación en tiempo real",
            "Pruebas de DR trimestrales",
            "Retención personalizable",
            "Cifrado AES-256",
            "Restauración granular"
        ],
        detalles: {
            que: "Tu seguro contra pérdida de datos. Ransomware, error humano, desastre natural: recuperamos todo.",
            como: "Regla 3-2-1: 3 copias, 2 medios diferentes, 1 offsite. Usamos Veeam, Acronis y soluciones enterprise.",
            beneficios: [
                "RTO < 1 hora, RPO < 15 minutos",
                "Recuperación 100% garantizada",
                "Pruebas de restauración incluidas",
                "Cumple auditorías y normativas"
            ]
        }
    },
    {
        id: 6,
        icono: "📱",
        color: "linear-gradient(135deg, #d97706, #f59e0b)",
        nombre: "Gestión de Dispositivos MDM",
        descripcion: "Administración centralizada de laptops, móviles y tablets. Seguridad y políticas remotas.",
        features: [
            "Enrollamiento zero-touch",
            "Borrado remoto de datos",
            "Control de aplicaciones",
            "Geolocalización de equipos",
            "Compliance automático",
            "Soporta iOS, Android, Windows, Mac"
        ],
        detalles: {
            que: "Controla todos los dispositivos de tu empresa desde una consola. BYOD seguro y sin dolores de cabeza.",
            como: "Implementamos Microsoft Intune, VMware Workspace ONE o JAMF según tu ecosistema.",
            beneficios: [
                "Reduce 90% incidentes de pérdida de datos",
                "Onboarding de empleados en 5 minutos",
                "Cumplimiento de políticas automático",
                "Visibilidad total de tu flota de equipos"
            ]
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderServicios();
});

function renderServicios() {
    const grid = document.getElementById('gridServicios');
    grid.innerHTML = servicios.map(s => `
        <div class="servicio-card" onclick="verDetalle(${s.id})">
            <div class="servicio-icon" style="background: ${s.color};">
                ${s.icono}
            </div>
            <h3>${s.nombre}</h3>
            <p>${s.descripcion}</p>
            <ul class="servicio-features">
                ${s.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
            </ul>
            <a href="#" class="servicio-link" onclick="event.preventDefault(); verDetalle(${s.id})">
                Ver detalles completos →
            </a>
        </div>
    `).join('');
}

function verDetalle(id) {
    const s = servicios.find(serv => serv.id === id);
    if (!s) return;

    document.getElementById('modalTitulo').textContent = s.nombre;
    document.getElementById('modalBody').innerHTML = `
        <div style="text-align: center; font-size: 4rem; margin-bottom: 1rem;">${s.icono}</div>
        <p><strong>${s.descripcion}</strong></p>
        
        <h4>¿Qué incluye?</h4>
        <ul>
            ${s.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h4>¿Qué es?</h4>
        <p>${s.detalles.que}</p>

        <h4>¿Cómo lo hacemos?</h4>
        <p>${s.detalles.como}</p>

        <h4>Beneficios para tu empresa</h4>
        <ul>
            ${s.detalles.beneficios.map(b => `<li>${b}</li>`).join('')}
        </ul>
    `;

    document.getElementById('modalServicio').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modalServicio').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('overlay').addEventListener('click', cerrarModal);