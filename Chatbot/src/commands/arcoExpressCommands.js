// COMANDOS ESPECÍFICOS DE ARCOEXPRESS
class ArcoExpressCommands {
    constructor() {
        this.companyInfo = {
            name: 'ArcoExpress de México',
            speciality: 'Especialistas en etiquetas térmicas, ribbons e impresoras',
            experience: 'Más de 20 años de experiencia',
            location: 'Puebla, México',
            website: 'arcoexpress.mx',
            email: 'ventas@arcoexpress.mx',
            phone: '+52 222 210 61 44',
            phone2: '+52 222 210 61 40',
            whatsapp: '+52 221 794 6704'
        };
        
        this.productos = {
            etiquetas: {
                tipos: [
                    'Etiquetas térmicas directas',
                    'Etiquetas de transferencia térmica',
                    'Adhesivos permanentes',
                    'Para códigos de barras',
                    'Industriales especiales'
                ],
                materiales: [
                    'Papel térmico',
                    'Sintético',
                    'Poliéster',
                    'Polipropileno'
                ]
            },
            ribbons: {
                tipos: [
                    'Ribbons de cera',
                    'Ribbons de resina',
                    'Ribbons mixtos'
                ],
                marcas: [
                    '🦓 Zebra',
                    '🏭 Honeywell',
                    '🔧 TSC'
                ],
                anchos: ['25mm', '40mm', '50mm', '83mm', '110mm', '156mm', '220mm']
            },
            impresoras: {
                marcas: [
                    '🦓 Zebra - Industriales y escritorio',
                    '🏭 Honeywell - Alta resistencia',
                    '🔧 TSC - Económicas y eficientes'
                ],
                servicios: [
                    'Venta de equipos',
                    'Soporte técnico especializado',
                    'Garantía extendida',
                    'Mantenimiento preventivo'
                ]
            }
        };
    }

    // COMANDO PRODUCTOS GENERAL
    productos(message) {
        return {
            type: 'text',
            content: `🏷️ *CATÁLOGO ARCOEXPRESS*\n\n` +
                    `*${this.companyInfo.speciality}*\n\n` +
                    `📋 *NUESTROS PRODUCTOS:*\n\n` +
                    `🏷️ *ETIQUETAS TÉRMICAS*\n` +
                    `• Térmicas directas\n` +
                    `• Transferencia térmica\n` +
                    `• Códigos de barras\n` +
                    `• Industriales especiales\n\n` +
                    `🎗️ *RIBBONS*\n` +
                    `• Ribbons de cera\n` +
                    `• Ribbons de resina\n` +
                    `• Ribbons mixtos\n` +
                    `• Compatible con todas las marcas\n\n` +
                    `🖨️ *IMPRESORAS*\n` +
                    `• Zebra (Industriales y escritorio)\n` +
                    `• Honeywell (Alta resistencia)\n` +
                    `• TSC (Económicas y eficientes)\n\n` +
                    `🔧 *SERVICIOS ADICIONALES*\n` +
                    `• Maquila de etiquetas\n` +
                    `• Soporte técnico\n` +
                    `• Consultoría especializada\n\n` +
                    `💰 Escribe *5* para precios\n` +
                    `📞 Escribe *7* para más información\n\n` +
                    `⚡ *${this.companyInfo.experience}* 🇲🇽`
        };
    }

    // COMANDO ETIQUETAS ESPECÍFICO
    etiquetas(message) {
        return {
            type: 'text',
            content: `🏷️ *ETIQUETAS TÉRMICAS ARCOEXPRESS*\n\n` +
                    `*Especialistas desde hace más de 20 años*\n\n` +
                    `📋 *TIPOS DISPONIBLES:*\n` +
                    this.productos.etiquetas.tipos.map(tipo => `• ${tipo}`).join('\n') + '\n\n' +
                    `🧾 *MATERIALES:*\n` +
                    this.productos.etiquetas.materiales.map(material => `• ${material}`).join('\n') + '\n\n' +
                    `✨ *APLICACIONES:*\n` +
                    `• Códigos de barras industriales\n` +
                    `• Etiquetado de productos\n` +
                    `• Identificación de inventarios\n` +
                    `• Shipping y logística\n` +
                    `• Farmacéutica y laboratorios\n\n` +
                    `🎯 *VENTAJAS:*\n` +
                    `• Alta durabilidad\n` +
                    `• Resistente a condiciones extremas\n` +
                    `• Calidad garantizada\n` +
                    `• Precios competitivos\n\n` +
                    `💰 *5* - Solicitar precio personalizado\n` +
                    `📞 *7* - Asesoría especializada\n\n` +
                    `🚚 *Envíos a todo México* 🇲🇽`
        };
    }

    // COMANDO RIBBONS ESPECÍFICO
    ribbons(message) {
        return {
            type: 'text',
            content: `🎗️ *RIBBONS ARCOEXPRESS*\n\n` +
                    `*Compatible con todas las marcas de impresoras*\n\n` +
                    `📋 *TIPOS DISPONIBLES:*\n` +
                    this.productos.ribbons.tipos.map(tipo => `• ${tipo}`).join('\n') + '\n\n' +
                    `🏭 *MARCAS COMPATIBLES:*\n` +
                    this.productos.ribbons.marcas.map(marca => `• ${marca}`).join('\n') + '\n\n' +
                    `📏 *ANCHOS DISPONIBLES:*\n` +
                    this.productos.ribbons.anchos.join(' • ') + '\n\n' +
                    `✨ *CARACTERÍSTICAS:*\n` +
                    `• Calidad premium\n` +
                    `• Impresión nítida y duradera\n` +
                    `• Resistente a altas temperaturas\n` +
                    `• Compatible con todos los modelos\n` +
                    `• Diferentes longitudes disponibles\n\n` +
                    `🎯 *APLICACIONES:*\n` +
                    `• Etiquetas industriales\n` +
                    `• Códigos de barras\n` +
                    `• Identificación de productos\n` +
                    `• Logística y envíos\n\n` +
                    `💰 *5* - Precios al mayoreo\n` +
                    `📞 *7* - Asesoría técnica\n\n` +
                    `⚡ *Stock permanente disponible* 📦`
        };
    }

    // COMANDO IMPRESORAS ESPECÍFICO
    impresoras(message) {
        return {
            type: 'text',
            content: `🖨️ *IMPRESORAS ARCOEXPRESS*\n\n` +
                    `*Equipos industriales de alta calidad*\n\n` +
                    `🏭 *MARCAS DISPONIBLES:*\n` +
                    this.productos.impresoras.marcas.map(marca => `• ${marca}`).join('\n') + '\n\n' +
                    `🔧 *SERVICIOS INCLUIDOS:*\n` +
                    this.productos.impresoras.servicios.map(servicio => `• ${servicio}`).join('\n') + '\n\n' +
                    `💼 *TIPOS DE EQUIPOS:*\n` +
                    `• Impresoras de escritorio\n` +
                    `• Impresoras industriales\n` +
                    `• Equipos para alto volumen\n` +
                    `• Portátiles para campo\n\n` +
                    `✨ *BENEFICIOS:*\n` +
                    `• Garantía extendida\n` +
                    `• Soporte técnico especializado\n` +
                    `• Entrenamiento incluido\n` +
                    `• Refacciones disponibles\n` +
                    `• Financiamiento disponible\n\n` +
                    `📞 *7* - Asesoría personalizada\n` +
                    `💰 *5* - Cotización de equipos\n\n` +
                    `🛠️ *Soporte técnico especializado* ⚡`
        };
    }

    // COMANDO COTIZAR
    cotizar(message) {
        return {
            type: 'text',
            content: `💰 *SOLICITAR COTIZACIÓN*\n\n` +
                    `*${this.companyInfo.name}*\n` +
                    `🏷️ ${this.companyInfo.speciality}\n\n` +
                    `📋 *INFORMACIÓN NECESARIA:*\n` +
                    `Para darte el mejor precio necesitamos:\n\n` +
                    `🏷️ *Para Etiquetas:*\n` +
                    `• Tipo de etiqueta (térmica/transferencia)\n` +
                    `• Medidas (ancho x alto)\n` +
                    `• Material (papel/sintético)\n` +
                    `• Cantidad requerida\n` +
                    `• Uso o aplicación específica\n\n` +
                    `🎗️ *Para Ribbons:*\n` +
                    `• Ancho del ribbon\n` +
                    `• Tipo (cera/resina/mixto)\n` +
                    `• Marca de impresora\n` +
                    `• Cantidad necesaria\n\n` +
                    `🖨️ *Para Impresoras:*\n` +
                    `• Volumen de impresión\n` +
                    `• Tipo de aplicación\n` +
                    `• Presupuesto estimado\n\n` +
                    `📞 *CONTACTO INMEDIATO:*\n` +
                    `💬 WhatsApp: ${this.companyInfo.whatsapp}\n` +
                    `☎️ Teléfono: ${this.companyInfo.phone}\n` +
                    `📧 Email: ${this.companyInfo.email}\n\n` +
                    `⚡ *Respuesta rápida garantizada*\n` +
                    `🚚 *Envíos a todo México* 🇲🇽`
        };
    }

    // COMANDO MAQUILA
    maquila(message) {
        return {
            type: 'text',
            content: `🔧 *SERVICIOS DE MAQUILA*\n\n` +
                    `*${this.companyInfo.name}*\n` +
                    `⚡ ${this.companyInfo.experience}\n\n` +
                    `🏭 *SERVICIOS ESPECIALIZADOS:*\n` +
                    `• 🏷️ Maquila e impresión de etiquetas\n` +
                    `• 🏭 Señalización industrial\n` +
                    `• 🔍 Identificación de productos\n` +
                    `• 🛠️ Soporte técnico especializado\n` +
                    `• 📋 Consultoría en etiquetado\n` +
                    `• 📦 Diseño de empaques\n\n` +
                    `📊 *VOLÚMENES DE PRODUCCIÓN:*\n` +
                    `• Desde 1,000 etiquetas\n` +
                    `• Grandes volúmenes industriales\n` +
                    `• Producción continua\n` +
                    `• Entregas programadas\n\n` +
                    `⏱️ *TIEMPOS DE ENTREGA:*\n` +
                    `• ⚡ Urgentes: 24-48 horas\n` +
                    `• 📅 Estándar: 3-5 días hábiles\n` +
                    `• 📆 Programadas: Según proyecto\n\n` +
                    `✨ *VENTAJAS:*\n` +
                    `• Calidad garantizada\n` +
                    `• Precios competitivos\n` +
                    `• Asesoría técnica incluida\n` +
                    `• Control de calidad riguroso\n\n` +
                    `📞 *7* - Solicitar información\n` +
                    `💰 *5* - Cotizar servicio\n\n` +
                    `🏷️ *Tu socio en identificación industrial* 🇲🇽`
        };
    }

    // COMANDO CONTACTO
    contacto(message) {
        return {
            type: 'text',
            content: `📞 *CONTACTO ARCOEXPRESS*\n\n` +
                    `🏢 *${this.companyInfo.name}*\n` +
                    `🏷️ ${this.companyInfo.speciality}\n\n` +
                    `📍 *UBICACIÓN:*\n` +
                    `${this.companyInfo.location}\n\n` +
                    `📞 *TELÉFONOS:*\n` +
                    `☎️ ${this.companyInfo.phone}\n` +
                    `☎️ ${this.companyInfo.phone2}\n\n` +
                    `💬 *WHATSAPP:*\n` +
                    `${this.companyInfo.whatsapp}\n\n` +
                    `📧 *EMAIL:*\n` +
                    `${this.companyInfo.email}\n\n` +
                    `🌐 *SITIO WEB:*\n` +
                    `${this.companyInfo.website}\n\n` +
                    `⏰ *HORARIOS DE ATENCIÓN:*\n` +
                    `📅 Lunes a Viernes\n` +
                    `🕘 9:00 AM - 6:00 PM\n\n` +
                    `🚚 *COBERTURA:*\n` +
                    `Envíos a todo México 🇲🇽\n\n` +
                    `⚡ *${this.companyInfo.experience}*\n` +
                    `🏷️ *Tu mejor opción en etiquetas térmicas*\n\n` +
                    `¡Contáctanos ahora! 😊`
        };
    }
}

module.exports = ArcoExpressCommands;
