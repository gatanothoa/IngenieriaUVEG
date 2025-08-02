// MANEJADOR DE MENSAJES - PLANTILLA UNIVERSAL
class MessageHandler {
    constructor() {
        this.lastMessageTime = new Map();
        this.messageFrequency = new Map();
        this.maxMessagesPerMinute = parseInt(process.env.MAX_MESSAGES_PER_MINUTE) || 10;
        this.responseDelayMin = parseInt(process.env.RESPONSE_DELAY_MIN) || 1000;
        this.responseDelayMax = parseInt(process.env.RESPONSE_DELAY_MAX) || 3000;
    }

    async processMessage(message, client, companyConfig) {
        try {
            const chatId = message.from;
            
            // Verificar límite de mensajes
            if (!this.checkMessageLimit(chatId)) {
                await client.sendMessage(chatId, '⏰ Has enviado muchos mensajes. Por favor espera un momento.');
                return;
            }

            // Simular tiempo de escritura humano
            await this.simulateTyping(client, chatId);

            // Procesar mensaje natural
            const response = this.processNaturalMessage(message.body, companyConfig);
            
            if (response) {
                await client.sendMessage(chatId, response);
            }

        } catch (error) {
            console.error('Error procesando mensaje:', error);
            await client.sendMessage(message.from, '❌ Disculpa, ocurrió un error. ¿Podrías repetir tu mensaje?');
        }
    }

    checkMessageLimit(chatId) {
        const now = Date.now();
        const oneMinute = 60 * 1000;
        
        if (!this.messageFrequency.has(chatId)) {
            this.messageFrequency.set(chatId, []);
        }
        
        const messages = this.messageFrequency.get(chatId);
        
        // Filtrar mensajes del último minuto
        const recentMessages = messages.filter(timestamp => now - timestamp < oneMinute);
        
        if (recentMessages.length >= this.maxMessagesPerMinute) {
            return false;
        }
        
        // Agregar mensaje actual
        recentMessages.push(now);
        this.messageFrequency.set(chatId, recentMessages);
        
        return true;
    }

    async simulateTyping(client, chatId) {
        const delay = Math.random() * (this.responseDelayMax - this.responseDelayMin) + this.responseDelayMin;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    processNaturalMessage(messageBody, companyConfig) {
        const message = messageBody.toLowerCase();

        // Saludos
        if (this.containsWords(message, ['hola', 'hi', 'hello', 'buenos', 'buenas', 'saludos'])) {
            return `¡Hola! 👋 Bienvenido a *ArcoExpress de México*\\n\\n🏷️ *Especialistas en etiquetas térmicas con más de 20 años de experiencia*\\n\\nSoy tu asistente virtual. ¿En qué puedo ayudarte hoy?\\n\\nEscribe */menu* para ver todas las opciones disponibles. 😊`;
        }

        // Despedidas
        if (this.containsWords(message, ['adiós', 'bye', 'chao', 'hasta luego', 'nos vemos'])) {
            return `¡Hasta luego! 👋 Gracias por contactar a *ArcoExpress de México*\\n\\n🏷️ Recuerda que somos tu mejor opción en etiquetas térmicas y ribbons.\\n\\nSi necesitas algo más, estaré aquí para ayudarte. ¡Que tengas un excelente día! 😊`;
        }

        // Preguntas específicas sobre etiquetas térmicas
        if (this.containsWords(message, ['etiqueta', 'etiquetas', 'termica', 'térmicas', 'térmica', 'label', 'labels'])) {
            return `🏷️ ¡Excelente! Las etiquetas térmicas son nuestra especialidad.\\n\\n*Tipos disponibles:*\\n• Etiquetas térmicas directas\\n• Etiquetas de transferencia térmica\\n• Adhesivos permanentes\\n• Para códigos de barras\\n• Industriales especiales\\n\\nEscribe */productos* para ver todo el catálogo o */cotizar* para precio personalizado. 😊`;
        }

        // Preguntas sobre ribbons
        if (this.containsWords(message, ['ribbon', 'ribbons', 'cinta', 'cintas', 'transferencia'])) {
            return `🎗️ ¡Perfecto! Manejamos todos los tipos de ribbons:\\n\\n*Tipos disponibles:*\\n• Ribbons de cera\\n• Ribbons de resina\\n• Ribbons mixtos\\n• Compatible con todas las marcas\\n\\n*Marcas que soportamos:* Zebra, Honeywell, TSC\\n\\nEscribe */productos* para detalles completos. 😊`;
        }

        // Preguntas sobre impresoras
        if (this.containsWords(message, ['impresora', 'impresoras', 'zebra', 'honeywell', 'tsc', 'printer'])) {
            return `�️ ¡Excelente! Trabajamos con las mejores marcas:\\n\\n*Marcas disponibles:*\\n• 🦓 *Zebra* - Industriales y escritorio\\n• 🏭 *Honeywell* - Alta resistencia\\n• 🔧 *TSC* - Económicas y eficientes\\n\\n*Servicios incluidos:*\\n• Venta de equipos\\n• Soporte técnico especializado\\n• Garantía extendida\\n\\nEscribe */servicios* para más información. 😊`;
        }

        // Preguntas sobre códigos de barras
        if (this.containsWords(message, ['codigo', 'códigos', 'barras', 'qr', 'scanner', 'escaner'])) {
            return `📊 ¡Especialistas en códigos de barras!\\n\\n*Soluciones completas:*\\n• Etiquetas para códigos de barras\\n• Impresoras especializadas\\n• Software de diseño\\n• Consultoría en implementación\\n\\n*Tipos soportados:* Code 128, EAN, UPC, QR, DataMatrix y más.\\n\\nEscribe */contacto* para asesoría personalizada. 😊`;
        }

        // Preguntas sobre maquila e impresión
        if (this.containsWords(message, ['maquila', 'impresion', 'impresión', 'servicio', 'servicios'])) {
            return `🔧 ¡Servicios profesionales ArcoExpress!\\n\\n*Servicios especializados:*\\n• 🏷️ Maquila e impresión de etiquetas\\n• 🏭 Señalización industrial\\n• 🔍 Identificación de productos\\n• 🛠️ Soporte técnico especializado\\n• 📋 Consultoría en etiquetado\\n\\nEscribe */servicios* para detalles completos. 😊`;
        }

        // Preguntas sobre precios/cotizaciones
        if (this.containsWords(message, ['precio', 'costo', 'cuánto', 'cotización', 'presupuesto'])) {
            return `💰 *Cotizaciones personalizadas ArcoExpress*\\n\\nPara darte el mejor precio necesito saber:\\n• Tipo de etiqueta o ribbon\\n• Cantidad requerida\\n• Medidas específicas\\n• Uso o aplicación\\n\\nEscribe */cotizar* para iniciar cotización formal\\nO */contacto* para hablar con ventas directamente. 😊`;
        }

        // Preguntas sobre ubicación y contacto
        if (this.containsWords(message, ['contacto', 'teléfono', 'dirección', 'ubicación', 'dónde', 'puebla'])) {
            return `📞 *Datos de contacto ArcoExpress*\\n\\n*Oficinas principales:*\\n📍 Puebla, México\\n☎️ Tel: +52 222 210 61 44\\n☎️ Tel: +52 222 210 61 40\\n📧 Email: ventas@arcoexpress.mx\\n💬 WhatsApp: +52 222 750 68 55\\n🌐 Web: arcoexpress.mx\\n\\nEscribe */horarios* para horarios de atención. 😊`;
        }

        // Preguntas sobre horarios
        if (this.containsWords(message, ['horario', 'hora', 'abierto', 'cerrado', 'cuándo', 'atienden'])) {
            return `⏰ *Horarios de atención ArcoExpress*\\n\\n🕘 *Lunes a Viernes*\\n⏰ 9:00 AM - 6:00 PM\\n\\n📞 *Contacto inmediato:*\\n• WhatsApp: +52 222 750 68 55\\n• Email: ventas@arcoexpress.mx\\n\\n*¡Respuesta rápida garantizada!* 😊`;
        }

        // Consultas sobre la empresa
        if (this.containsWords(message, ['empresa', 'compañía', 'negocio', 'sobre', 'quiénes son', 'experiencia'])) {
            return `🏢 *ArcoExpress de México*\\n\\n✅ Más de 20 años de experiencia\\n🏷️ Especialistas en etiquetas térmicas\\n🎗️ Líderes en ribbons y transferencia térmica\\n🖨️ Distribuidores autorizados Zebra, Honeywell, TSC\\n🇲🇽 Cobertura en todo México\\n\\nEscribe */info* para conocer más detalles\\nO */contacto* para hablar con un especialista. 😊`;
        }

        // Preguntas sobre materiales y especificaciones
        if (this.containsWords(message, ['material', 'materiales', 'adhesivo', 'papel', 'sintético', 'poliéster'])) {
            return `📝 *Materiales especializados ArcoExpress*\\n\\n*Materiales disponibles:*\\n• 📄 Papel térmico directo\\n• 🔧 Sintético resistente\\n• 💎 Poliéster premium\\n• 🏭 Polipropileno industrial\\n• 🔒 Adhesivos permanentes\\n• ❄️ Resistentes a temperatura\\n\\nEscribe */productos* para especificaciones técnicas. �`;
        }

        // Agradecimientos
        if (this.containsWords(message, ['gracias', 'thanks', 'agradezco', 'excelente', 'perfecto'])) {
            return `¡De nada! 😊 *ArcoExpress* siempre a tu servicio.\\n\\n🏷️ Somos expertos en etiquetas térmicas y ribbons\\n⚡ Respuesta rápida garantizada\\n🚚 Envíos a todo México\\n\\nSi necesitas algo más, estoy aquí para ayudarte.\\n\\nEscribe */menu* para ver todas las opciones. �`;
        }

        // Problemas técnicos o soporte
        if (this.containsWords(message, ['problema', 'error', 'falla', 'soporte', 'técnico', 'ayuda técnica'])) {
            return `🛠️ *Soporte técnico ArcoExpress*\\n\\n😔 Lamento el inconveniente. Nuestro equipo técnico especializado está aquí para ayudarte.\\n\\n*Soporte inmediato:*\\n• 📞 Tel: +52 222 210 61 44\\n• 💬 WhatsApp: +52 222 750 68 55\\n• 📧 Email: ventas@arcoexpress.mx\\n\\nEscribe */soporte* para detalles del problema. ¡Lo solucionamos! �`;
        }

        // Preguntas sobre el bot
        if (this.containsWords(message, ['bot', 'robot', 'eres real', 'humano', 'artificial'])) {
            return `🤖 ¡Soy el asistente virtual de *ArcoExpress de México*!\\n\\n🏷️ Especializado en etiquetas térmicas y ribbons\\n⚡ Disponible 24/7 para consultas\\n👥 Respaldado por expertos humanos con +20 años experiencia\\n\\n*¿En qué te puedo ayudar hoy?*\\n• Productos y servicios\\n• Cotizaciones personalizadas\\n• Soporte técnico\\n• Información de contacto 😊`;
        }

        // Respuesta por defecto especializada
        return `🤔 Entiendo tu consulta sobre etiquetas térmicas y ribbons.\\n\\n🏷️ *Como especialistas en:*\\n• Etiquetas térmicas directas\\n• Ribbons de transferencia\\n• Impresoras Zebra, Honeywell, TSC\\n• Maquila e impresión\\n\\n*Opciones para ayudarte:*\\n• */productos* - Catálogo completo\\n• */cotizar* - Precio personalizado\\n• */contacto* - Hablar con especialista\\n\\n¿Podrías ser más específico? 😊`;
    }

    containsWords(text, words) {
        return words.some(word => text.includes(word));
    }

    // Método para agregar respuestas personalizadas
    addCustomResponse(keywords, response) {
        // Este método puede ser extendido para agregar respuestas personalizadas
        // según las necesidades específicas de cada empresa
    }
}

module.exports = MessageHandler;
