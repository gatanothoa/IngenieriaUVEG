// MANEJADOR DE MENSAJES DEL CHATBOT
const Commands = require('../commands/index');
const Logger = require('../utils/logger');

class MessageHandler {
    constructor() {
        this.logger = new Logger();
        this.commands = new Commands();
        
        // Palabras clave para activar diferentes funciones - ArcoExpress
        this.keywords = {
            greeting: ['hola', 'hello', 'hi', 'buenos días', 'buenas tardes', 'buenas noches'],
            help: ['ayuda', 'help', 'menu', 'menú', 'comandos'],
            goodbye: ['adiós', 'adios', 'bye', 'hasta luego', 'nos vemos'],
            thanks: ['gracias', 'thank you', 'thanks', 'muchas gracias'],
            etiquetas: ['etiqueta', 'etiquetas', 'termica', 'térmicas', 'térmica', 'label', 'labels'],
            ribbons: ['ribbon', 'ribbons', 'cinta', 'cintas', 'transferencia'],
            impresoras: ['impresora', 'impresoras', 'zebra', 'honeywell', 'tsc', 'printer'],
            cotizacion: ['precio', 'costo', 'cuánto', 'cotización', 'presupuesto'],
            contacto: ['contacto', 'teléfono', 'dirección', 'ubicación', 'dónde'],
            maquila: ['maquila', 'impresion', 'impresión', 'servicio']
        };

        // Contador de interacciones por usuario
        this.userInteractions = new Map();
    }

    // PROCESAR MENSAJE ENTRANTE
    async processMessage(message) {
        try {
            const messageText = message.body.toLowerCase().trim();
            const userId = message.from;
            
            // Incrementar contador de interacciones
            this.updateUserInteraction(userId);
            
            // Detectar si es un comando (comienza con /)
            if (messageText.startsWith('/')) {
                return await this.handleCommand(message);
            }
            
            // Procesar mensaje según contenido
            return await this.handleNaturalMessage(message, messageText);
            
        } catch (error) {
            this.logger.error('Error al procesar mensaje:', error);
            return {
                type: 'text',
                content: '❌ Disculpa, hubo un error al procesar tu mensaje. Intenta de nuevo.'
            };
        }
    }

    // MANEJAR COMANDOS CON /
    async handleCommand(message) {
        const commandText = message.body.trim();
        const [command, ...args] = commandText.split(' ');
        
        this.logger.info(`🤖 Comando recibido: ${command} con argumentos: ${args.join(' ')}`);
        
        switch (command.toLowerCase()) {
            case '/start':
            case '/inicio':
            case '0':
                return this.commands.start(message);
                
            case '/help':
            case '/ayuda':
            case '9':
                return this.commands.help(message);
                
            case '/menu':
            case '00':
                return this.commands.menu(message);
                
            case '/info':
            case '8':
                return this.commands.info(message);
                
            // COMANDOS ESPECÍFICOS DE ARCOEXPRESS CON NÚMEROS
            case '/productos':
            case '/catalogo':
            case '1':
                return this.commands.productos(message);
                
            case '/etiquetas':
            case '2':
                return this.commands.etiquetas(message);
                
            case '/ribbons':
            case '/ribbon':
            case '3':
                return this.commands.ribbons(message);
                
            case '/impresoras':
            case '/impresora':
            case '4':
                return this.commands.impresoras(message);
                
            case '/cotizar':
            case '/cotizacion':
            case '/precio':
            case '/precios':
            case '5':
                return this.commands.cotizar(message);
                
            case '/maquila':
            case '/servicios':
            case '6':
                return this.commands.maquila(message);
                
            case '/contacto':
            case '/telefono':
            case '/direccion':
            case '7':
                return this.commands.contacto(message);
                
            // COMANDOS GENERALES
            case '/clima':
            case '/weather':
                return this.commands.weather(args.join(' '), message);
                
            case '/horario':
            case '/hora':
                return this.commands.time(message);
                
            case '/recordatorio':
            case '/reminder':
                return this.commands.reminder(args.join(' '), message);
                
            case '/chiste':
            case '/joke':
                return this.commands.joke(message);
                
            case '/frase':
            case '/quote':
                return this.commands.quote(message);
                
            case '/calculadora':
            case '/calc':
                return this.commands.calculator(args.join(' '), message);
                
            case '/traductor':
            case '/translate':
                return this.commands.translate(args.join(' '), message);
                
            case '/noticias':
            case '/news':
                return this.commands.news(args.join(' '), message);
                
            case '/stats':
            case '/estadisticas':
                return this.commands.statistics(message);
                
            default:
                return {
                    type: 'text',
                    content: `❓ Comando "${command}" no reconocido.\n\n🏷️ *Comandos de ArcoExpress:*\n• *1* - Ver catálogo\n• *5* - Solicitar precio\n• *7* - Información de contacto\n• *00* - Menú completo\n• *9* - Ayuda\n\nEscribe un número para acceso rápido.`
                };
        }
    }

    // MANEJAR MENSAJES NATURALES - ArcoExpress
    async handleNaturalMessage(message, messageText) {
        // Detectar tipo de mensaje por palabras clave
        const messageType = this.detectMessageType(messageText);
        
        switch (messageType) {
            case 'greeting':
                return this.handleGreeting(message);
                
            case 'help':
                return this.commands.help(message);
                
            case 'goodbye':
                return this.handleGoodbye(message);
                
            case 'thanks':
                return this.handleThanks(message);
                
            case 'etiquetas':
                return this.handleEtiquetas(message);
                
            case 'ribbons':
                return this.handleRibbons(message);
                
            case 'impresoras':
                return this.handleImpresoras(message);
                
            case 'cotizacion':
                return this.handleCotizacion(message);
                
            case 'contacto':
                return this.handleContacto(message);
                
            case 'maquila':
                return this.handleMaquila(message);
                
            default:
                return this.handleGeneral(message, messageText);
        }
    }

    // DETECTAR TIPO DE MENSAJE
    detectMessageType(messageText) {
        for (const [type, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => messageText.includes(keyword))) {
                return type;
            }
        }
        return 'general';
    }

    // MANEJAR SALUDOS - ArcoExpress
    handleGreeting(message) {
        const greetings = [
            '¡Hola! 👋 Bienvenido a *ArcoExpress de México*\n\n🏷️ *Especialistas en etiquetas térmicas con más de 20 años de experiencia*\n\n¿En qué puedo ayudarte hoy?\n\nEscribe */menu* para ver todas las opciones.',
            '¡Buenos días! 🌅 Soy tu asistente virtual de *ArcoExpress*\n\n🏷️ Expertos en etiquetas térmicas, ribbons e impresoras\n\n¿Necesitas información sobre algún producto?\n\nEscribe */productos* para ver nuestro catálogo.',
            '¡Hola! 😊 Te saluda *ArcoExpress de México*\n\n🎗️ Líderes en ribbons y etiquetas térmicas desde hace más de 20 años\n\n¿En qué te puedo ayudar?\n\nEscribe */cotizar* si necesitas un presupuesto.'
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        return {
            type: 'text',
            content: randomGreeting
        };
    }

    // MANEJAR DESPEDIDAS - ArcoExpress
    handleGoodbye(message) {
        const goodbyes = [
            '¡Hasta luego! 👋 Gracias por contactar a *ArcoExpress de México*\n\n🏷️ Recuerda que somos tu mejor opción en etiquetas térmicas y ribbons.\n\n¡Que tengas un excelente día!',
            '¡Nos vemos! 😊 *ArcoExpress* siempre a tu servicio\n\n🚚 Envíos a todo México\n⚡ Más de 20 años de experiencia\n\n¡Hasta pronto!',
            '¡Adiós! 👋 Ha sido un placer ayudarte\n\n🏷️ *ArcoExpress* - Tu socio en identificación industrial\n\n¡Regresa cuando necesites!'
        ];
        
        const randomGoodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];
        
        return {
            type: 'text',
            content: randomGoodbye
        };
    }

    // MANEJAR AGRADECIMIENTOS - ArcoExpress
    handleThanks(message) {
        const thanksResponses = [
            '¡De nada! 😊 *ArcoExpress* siempre a tu servicio\n\n🏷️ Somos expertos en etiquetas térmicas y ribbons\n⚡ Respuesta rápida garantizada\n\n¿Necesitas algo más?',
            '¡Es un placer ayudarte! 👍 \n\n🏷️ *ArcoExpress de México* - Más de 20 años de experiencia\n🚚 Envíos a todo México\n\nEstamos aquí para lo que necesites.',
            '¡Para eso estamos! 😊\n\n�️ Especialistas en ribbons e impresoras\n📞 Contacto directo: +52 222 750 68 55\n\n¡Siempre listos para ayudarte!'
        ];
        
        const randomThanks = thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
        
        return {
            type: 'text',
            content: randomThanks
        };
    }

    // MANEJAR CONSULTAS SOBRE ETIQUETAS
    handleEtiquetas(message) {
        return {
            type: 'text',
            content: '🏷️ *ETIQUETAS TÉRMICAS ARCOEXPRESS*\n\n*Tipos disponibles:*\n• Etiquetas térmicas directas\n• Etiquetas de transferencia térmica\n• Adhesivos permanentes\n• Para códigos de barras\n• Industriales especiales\n\n*Materiales:*\n• Papel térmico\n• Sintético\n• Poliéster\n• Polipropileno\n\nEscribe *1* para ver todo el catálogo\nO *5* para precio personalizado 😊'
        };
    }

    // MANEJAR CONSULTAS SOBRE RIBBONS
    handleRibbons(message) {
        return {
            type: 'text',
            content: '🎗️ *RIBBONS ARCOEXPRESS*\n\n*Tipos disponibles:*\n• Ribbons de cera\n• Ribbons de resina\n• Ribbons mixtos\n• Compatible con todas las marcas\n\n*Marcas que soportamos:*\n🦓 Zebra\n🏭 Honeywell\n🔧 TSC\n\n*Anchos disponibles:*\n25mm, 40mm, 50mm, 83mm, 110mm, 156mm, 220mm\n\nEscribe *1* para detalles completos 😊'
        };
    }

    // MANEJAR CONSULTAS SOBRE IMPRESORAS
    handleImpresoras(message) {
        return {
            type: 'text',
            content: '🖨️ *IMPRESORAS ARCOEXPRESS*\n\n*Marcas disponibles:*\n• 🦓 *Zebra* - Industriales y escritorio\n• 🏭 *Honeywell* - Alta resistencia\n• 🔧 *TSC* - Económicas y eficientes\n\n*Servicios incluidos:*\n• Venta de equipos\n• Soporte técnico especializado\n• Garantía extendida\n• Mantenimiento preventivo\n\n*Financiamiento disponible*\n\nEscribe *7* para asesoría personalizada 😊'
        };
    }

    // MANEJAR CONSULTAS SOBRE COTIZACIÓN
    handleCotizacion(message) {
        return {
            type: 'text',
            content: '💰 *COTIZACIÓN ARCOEXPRESS*\n\nPara darte el mejor precio necesito saber:\n• Tipo de etiqueta o ribbon\n• Cantidad requerida\n• Medidas específicas\n• Uso o aplicación\n\n*Formas de cotizar:*\n💬 WhatsApp: +52 222 750 68 55\n📞 Teléfono: +52 222 210 61 44\n📧 Email: ventas@arcoexpress.mx\n\n¡Respuesta rápida garantizada! 😊'
        };
    }

    // MANEJAR CONSULTAS SOBRE CONTACTO
    handleContacto(message) {
        return {
            type: 'text',
            content: '📞 *CONTACTO ARCOEXPRESS*\n\n*ArcoExpress de México*\n🏷️ Especialistas en etiquetas térmicas\n\n📍 Puebla, México\n☎️ +52 222 210 61 44\n☎️ +52 222 210 61 40\n💬 WhatsApp: +52 222 750 68 55\n📧 ventas@arcoexpress.mx\n🌐 arcoexpress.mx\n\n⏰ *Horarios:*\nLunes a Viernes\n9:00 AM - 6:00 PM\n\n¡Más de 20 años de experiencia! 😊'
        };
    }

    // MANEJAR CONSULTAS SOBRE MAQUILA
    handleMaquila(message) {
        return {
            type: 'text',
            content: '🔧 *SERVICIO DE MAQUILA ARCOEXPRESS*\n\n*Servicios especializados:*\n• 🏷️ Maquila e impresión de etiquetas\n• 🏭 Señalización industrial\n• 🔍 Identificación de productos\n• 🛠️ Soporte técnico especializado\n• 📋 Consultoría en etiquetado\n\n*Volúmenes:*\n• Desde 1,000 etiquetas\n• Grandes volúmenes\n• Producción continua\n\n*Tiempos:*\n⚡ Urgentes: 24-48 horas\n📅 Estándar: 3-5 días\n\nEscribe *7* para más información 😊'
        };
    }

    // MANEJAR MENSAJES GENERALES - ArcoExpress
    async handleGeneral(message, messageText) {
        // Si el mensaje contiene una pregunta
        if (messageText.includes('?') || messageText.includes('¿')) {
            return {
                type: 'text',
                content: `🤔 ¡Excelente pregunta! Te ayudo con información de *ArcoExpress*:\n\n` +
                        `• *1* - Ver catálogo completo\n` +
                        `• *5* - Solicitar precio\n` +
                        `• *7* - Información de contacto\n` +
                        `• *00* - Ver todas las opciones\n\n` +
                        `🏷️ *Especialistas en etiquetas térmicas*\n` +
                        `¿En qué más puedo ayudarte?`
            };
        }
        
        // Si el mensaje es muy corto, promover productos
        if (messageText.length < 10) {
            return {
                type: 'text',
                content: `👋 ¡Hola! Bienvenido a *ArcoExpress de México*\n\n` +
                        `🏷️ *Especialistas en:*\n` +
                        `• Etiquetas térmicas\n` +
                        `• Ribbons para impresoras\n` +
                        `• Impresoras industriales\n\n` +
                        `Escribe *00* para ver todas las opciones disponibles.`
            };
        }
        
        // Respuesta general inteligente para ArcoExpress
        return {
            type: 'text',
            content: `📝 He recibido tu mensaje: "${message.body}"\n\n` +
                    `🤖 Soy el asistente virtual de *ArcoExpress de México*\n\n` +
                    `🏷️ Para una mejor asistencia, usa números como:\n\n` +
                    `• *1* - Ver nuestro catálogo\n` +
                    `• */menu* - Ver menú de opciones\n` +
                    `• */info* - Información sobre el bot\n\n` +
                    `¿Te gustaría que te ayude con algo específico?`
        };
    }

    // ACTUALIZAR INTERACCIONES DE USUARIO
    updateUserInteraction(userId) {
        const currentCount = this.userInteractions.get(userId) || 0;
        this.userInteractions.set(userId, currentCount + 1);
        
        // Log para usuarios nuevos
        if (currentCount === 0) {
            this.logger.info(`👤 Nuevo usuario detectado: ${userId}`);
        }
    }

    // OBTENER ESTADÍSTICAS DE INTERACCIONES
    getUserInteractionStats() {
        const totalUsers = this.userInteractions.size;
        const totalInteractions = Array.from(this.userInteractions.values()).reduce((sum, count) => sum + count, 0);
        const averageInteractions = totalUsers > 0 ? (totalInteractions / totalUsers).toFixed(2) : 0;
        
        return {
            totalUsers,
            totalInteractions,
            averageInteractions
        };
    }

    // LIMPIAR DATOS DE INTERACCIONES (para mantenimiento)
    clearInteractionData() {
        this.userInteractions.clear();
        this.logger.info('🧹 Datos de interacciones limpiados');
    }
}

module.exports = MessageHandler;
