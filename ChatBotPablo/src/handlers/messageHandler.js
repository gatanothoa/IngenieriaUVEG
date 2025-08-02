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
            return `¡Hola! 👋 Bienvenido a *${companyConfig.name}*\\n\\nSoy tu asistente virtual. ¿En qué puedo ayudarte hoy?\\n\\nEscribe */menu* para ver todas las opciones disponibles. 😊`;
        }

        // Despedidas
        if (this.containsWords(message, ['adiós', 'bye', 'chao', 'hasta luego', 'nos vemos'])) {
            return `¡Hasta luego! 👋 Gracias por contactar a *${companyConfig.name}*\\n\\nSi necesitas algo más, estaré aquí para ayudarte. ¡Que tengas un excelente día! 😊`;
        }

        // Preguntas sobre productos
        if (this.containsWords(message, ['producto', 'venden', 'ofrecen', 'catálogo', 'qué tienen'])) {
            return `📦 Te interesas por nuestros productos. ¡Excelente!\\n\\nEscribe */productos* para ver nuestro catálogo completo, o */cotizar* si ya sabes lo que necesitas.\\n\\n¿Te puedo ayudar con algo específico? 😊`;
        }

        // Preguntas sobre servicios
        if (this.containsWords(message, ['servicio', 'servicios', 'hacen', 'ayudan'])) {
            return `🔧 ¡Perfecto! Tenemos varios servicios disponibles.\\n\\nEscribe */servicios* para ver la lista completa, o */contacto* para hablar directamente con un especialista.\\n\\n¿Hay algún servicio específico que te interese? 😊`;
        }

        // Preguntas sobre precios/cotizaciones
        if (this.containsWords(message, ['precio', 'costo', 'cuánto', 'cotización', 'presupuesto'])) {
            return `💰 Te ayudo con información de precios.\\n\\nEscribe */cotizar* para solicitar una cotización personalizada, o */contacto* para hablar directamente con nuestro equipo comercial.\\n\\n¿Qué producto o servicio te interesa cotizar? 😊`;
        }

        // Preguntas sobre contacto
        if (this.containsWords(message, ['contacto', 'teléfono', 'dirección', 'ubicación', 'dónde'])) {
            return `📞 ¡Por supuesto! Te comparto nuestros datos de contacto.\\n\\nEscribe */contacto* para ver toda la información completa, o */horarios* para conocer nuestros horarios de atención.\\n\\n¿Prefieres que te contactemos nosotros? 😊`;
        }

        // Preguntas sobre horarios
        if (this.containsWords(message, ['horario', 'hora', 'abierto', 'cerrado', 'cuándo', 'atienden'])) {
            return `⏰ Te informo sobre nuestros horarios.\\n\\nEscribe */horarios* para ver nuestros horarios completos de atención.\\n\\nActualmente atendemos: ${companyConfig.businessHours.days} de ${companyConfig.businessHours.start} a ${companyConfig.businessHours.end} 😊`;
        }

        // Consultas sobre la empresa
        if (this.containsWords(message, ['empresa', 'compañía', 'negocio', 'sobre', 'quiénes son'])) {
            return `🏢 Te cuento sobre *${companyConfig.name}*\\n\\nEscribe */info* para conocer más sobre nosotros, o */menu* para ver todas nuestras opciones.\\n\\n¿Te gustaría saber algo específico de nuestra empresa? 😊`;
        }

        // Agradecimientos
        if (this.containsWords(message, ['gracias', 'thanks', 'agradezco', 'excelente'])) {
            return `¡De nada! 😊 Es un placer ayudarte.\\n\\nSi necesitas algo más, no dudes en escribirme. Estoy aquí para lo que necesites.\\n\\nEscribe */menu* si quieres ver otras opciones disponibles. 👍`;
        }

        // Problemas o quejas
        if (this.containsWords(message, ['problema', 'error', 'queja', 'malo', 'defecto'])) {
            return `😔 Lamento que tengas un inconveniente.\\n\\nEscribe */soporte* para contactar a nuestro equipo de soporte técnico, o */contacto* para hablar directamente con un representante.\\n\\n¿Puedes contarme más detalles del problema? Así te ayudo mejor. 🛠️`;
        }

        // Preguntas generales sobre ayuda
        if (this.containsWords(message, ['ayuda', 'help', 'no sé', 'cómo', 'qué puedo'])) {
            return `🤗 ¡Claro que te ayudo!\\n\\nEscribe */help* para ver todos los comandos disponibles, o */menu* para las opciones principales.\\n\\nTambién puedes preguntarme directamente lo que necesites. ¿En qué específicamente te puedo ayudar? 😊`;
        }

        // Preguntas sobre el bot
        if (this.containsWords(message, ['bot', 'robot', 'eres real', 'humano', 'artificial'])) {
            return `🤖 ¡Soy el asistente virtual de *${companyConfig.name}*!\\n\\nEstoy aquí para ayudarte con información sobre productos, servicios, contacto y mucho más.\\n\\nAunque soy un bot, detrás de mí hay un equipo humano real listo para atenderte. ¿En qué te puedo ayudar? 😊`;
        }

        // Respuesta por defecto para mensajes no reconocidos
        return `🤔 Entiendo que necesitas ayuda, pero no estoy seguro de cómo responder a eso.\\n\\nPuedes:\\n• Escribir */help* para ver todos los comandos\\n• Escribir */menu* para las opciones principales\\n• Ser más específico en tu consulta\\n• Escribir */contacto* para hablar con una persona real\\n\\n¿Podrías reformular tu pregunta? 😊`;
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
