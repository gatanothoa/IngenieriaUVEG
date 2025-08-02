// MANEJADOR DE MENSAJES DEL CHATBOT
const Commands = require('../commands/index');
const Logger = require('../utils/logger');

class MessageHandler {
    constructor() {
        this.logger = new Logger();
        this.commands = new Commands();
        
        // Palabras clave para activar diferentes funciones
        this.keywords = {
            greeting: ['hola', 'hello', 'hi', 'buenos días', 'buenas tardes', 'buenas noches'],
            help: ['ayuda', 'help', 'menu', 'menú', 'comandos'],
            goodbye: ['adiós', 'adios', 'bye', 'hasta luego', 'nos vemos'],
            thanks: ['gracias', 'thank you', 'thanks', 'muchas gracias']
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
                return this.commands.start(message);
                
            case '/help':
            case '/ayuda':
                return this.commands.help(message);
                
            case '/menu':
                return this.commands.menu(message);
                
            case '/info':
                return this.commands.info(message);
                
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
                    content: `❓ Comando "${command}" no reconocido.\n\nEscribe */help* para ver todos los comandos disponibles.`
                };
        }
    }

    // MANEJAR MENSAJES NATURALES
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

    // MANEJAR SALUDOS
    handleGreeting(message) {
        const greetings = [
            '¡Hola! 👋 ¿En qué puedo ayudarte hoy?',
            '¡Buenos días! 🌅 Estoy aquí para asistirte.',
            '¡Hola! 😊 ¿Qué necesitas?',
            '¡Saludos! 🤖 ¿Cómo puedo ser útil?'
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        return {
            type: 'text',
            content: `${randomGreeting}\n\nEscribe */menu* para ver todas mis funciones o */help* para obtener ayuda.`
        };
    }

    // MANEJAR DESPEDIDAS
    handleGoodbye(message) {
        const goodbyes = [
            '¡Hasta luego! 👋 Que tengas un excelente día.',
            '¡Nos vemos pronto! 😊 Cuídate mucho.',
            '¡Adiós! 🌟 Siempre estaré aquí cuando me necesites.',
            '¡Que tengas un buen día! ✨ Hasta la próxima.'
        ];
        
        const randomGoodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];
        
        return {
            type: 'text',
            content: randomGoodbye
        };
    }

    // MANEJAR AGRADECIMIENTOS
    handleThanks(message) {
        const responses = [
            '¡De nada! 😊 Siempre es un placer ayudar.',
            '¡No hay de qué! 🤗 Para eso estoy aquí.',
            '¡Con gusto! 🌟 Si necesitas algo más, solo pregunta.',
            '¡Encantado de ayudar! 🤖 Hasta pronto.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return {
            type: 'text',
            content: randomResponse
        };
    }

    // MANEJAR MENSAJES GENERALES
    async handleGeneral(message, messageText) {
        // Si el mensaje contiene una pregunta
        if (messageText.includes('?') || messageText.includes('¿')) {
            return {
                type: 'text',
                content: `🤔 Interesante pregunta. Te recomiendo usar alguno de mis comandos específicos:\n\n` +
                        `• */clima* - Para consultar el clima\n` +
                        `• */info* - Para información general\n` +
                        `• */calculadora* - Para cálculos\n` +
                        `• */help* - Para ver todos los comandos\n\n` +
                        `¿En qué más puedo ayudarte?`
            };
        }
        
        // Si el mensaje es muy corto, sugerir comandos
        if (messageText.length < 10) {
            return {
                type: 'text',
                content: `👋 Hola! Para una mejor experiencia, te recomiendo usar comandos específicos.\n\n` +
                        `Escribe */menu* para ver todas mis funciones disponibles.`
            };
        }
        
        // Respuesta general inteligente
        return {
            type: 'text',
            content: `📝 He recibido tu mensaje: "${message.body}"\n\n` +
                    `🤖 Soy un bot automatizado. Para una mejor asistencia, usa comandos como:\n\n` +
                    `• */help* - Ver ayuda completa\n` +
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
