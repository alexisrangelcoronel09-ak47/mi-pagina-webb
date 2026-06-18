const casos = [
    {
        id: 1,
        empresa: "Grupo Industrial Norte",
        industria: "manufactura",
        roi: 300,
        logo: "GIN",
        resultado: "40% reducción costos IT",
        descripcion: "Migración completa a AWS + optimización de infraestructura",
        metricas: [
            { valor: "40%", label: "Ahorro anual" },
            { valor: "99.99%", label: "Uptime" },
            { valor: "6", label: "Meses ROI" }
        ],
        destacado: true,
        detalle: {
            problema: "Infraestructura on-premise obsoleta con costos de mantenimiento de $180K USD anuales. Caídas frecuentes afectando producción. 3 servidores físicos con 5+ años de antigüedad.",
            solucion: "Migración completa a AWS con arquitectura multi-AZ, auto-scaling y disaster recovery. Implementación de Kubernetes para contenedores. CI/CD con GitLab.",
            resultados: [
                "Reducción de costos de $180K a $108K anuales (-40%)",
                "Uptime mejorado de 95% a 99.99% (SLA garantizado)",
                "Tiempo de despliegue: de 2 semanas a 30 minutos",
                "Escalabilidad automática en picos de demanda",
                "Backup automatizado con RPO de 15 minutos",
                "Eliminación de mantenimiento de hardware físico"
            ],
            testimonio: "NovaLogic no solo migró nuestra infraestructura, la transformó. Pasamos de apagar incendios a innovar. El ROI se pagó en 6 meses y ahora tenemos una plataforma lista para crecer 10x.",
            autor: "Carlos Mendoza",
            cargo: "CTO",
            empresa: "Grupo Industrial Norte",
            avatar: "CM"
        }
    },
    {
        id: 2,
        empresa: "Retail Plus México",
        industria: "retail",
        roi: 250,
        logo: "RP+",
        resultado: "60% más velocidad en POS",
        descripcion: "Soporte 24/7 + modernización de 150 puntos de venta",
        metricas: [
            { valor: "150", label: "Tiendas" },
            { valor: "60%", label: "Más rápido" },
            { valor: "8", label: "Min resp." }
        ],
        destacado: true,
        detalle: {
            problema: "150 tiendas con sistemas POS lentos, caídas constantes en hora pico. Pérdidas de $50K USD mensuales por ventas no procesadas. Soporte anterior con SLA de 48 horas.",
            solucion: "Implementación de SD-WAN, modernización de POS con hardware nuevo, mesa de ayuda 24/7 con SLA de 15 minutos, monitoreo proactivo con RMM, portal de autoservicio.",
        }
    }
]