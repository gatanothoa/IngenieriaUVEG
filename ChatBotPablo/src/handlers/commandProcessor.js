// PROCESADOR DE COMANDOS - PLANTILLA UNIVERSAL
const Commands = require('../commands');

class CommandProcessor {
    constructor() {
        this.commands = new Commands();
        this.adminNumbers = (process.env.ADMIN_NUMBERS || '').split(',').map(num => num.trim()).filter(num => num);
        this.lastCommandTime = new Map();
        this.commandCooldown = 2000; // 2 segundos entre comandos
    }

    async processCommand(message, client, companyConfig, statistics = {}) {
        try {
            const chatId = message.from;
            const command = this.extractCommand(message.body);
            const now = Date.now();

            // Verificar cooldown para evitar spam
            if (this.lastCommandTime.has(chatId)) {
                const timeSinceLastCommand = now - this.lastCommandTime.get(chatId);
                if (timeSinceLastCommand < this.commandCooldown) {
                    await client.sendMessage(chatId, '⏰ Por favor espera un momento antes de enviar otro comando.');
                    return;
                }
            }

            this.lastCommandTime.set(chatId, now);

            // Procesar comando
            const response = await this.executeCommand(command, message, companyConfig, statistics);
            
            if (response) {
                await this.sendResponse(client, chatId, response);
            }

        } catch (error) {
            console.error('Error procesando comando:', error);
            await client.sendMessage(message.from, '❌ Ocurrió un error procesando tu comando. Inténtalo de nuevo.');
        }
    }

    extractCommand(messageBody) {
        return messageBody.toLowerCase().split(' ')[0].replace('/', '');
    }

    async executeCommand(command, message, companyConfig, statistics) {
        const isAdmin = this.adminNumbers.includes(message.from);

        switch (command) {
            case 'start':
            case 'inicio':
                return this.commands.start(message, companyConfig);

            case 'help':
            case 'ayuda':
                return this.commands.help(message, companyConfig);

            case 'menu':
                return this.commands.menu(message, companyConfig);

            case 'info':
            case 'informacion':
                return this.commands.info(message, companyConfig);

            case 'productos':
            case 'catalogo':
                return this.commands.productos(message, companyConfig);

            case 'servicios':
                return this.commands.servicios(message, companyConfig);

            case 'contacto':
            case 'contactar':
                return this.commands.contacto(message, companyConfig);

            case 'horarios':
            case 'horario':
                return this.commands.horarios(message, companyConfig);

            case 'cotizar':
            case 'presupuesto':
                return this.commands.cotizar(message, companyConfig);

            case 'soporte':
            case 'ayuda_tecnica':
                return this.commands.soporte(message, companyConfig);

            case 'hora':
            case 'fecha':
                return this.commands.hora(message);

            case 'chiste':
            case 'broma':
                return this.commands.chiste(message);

            case 'frase':
            case 'motivacion':
                return this.commands.frase(message);

            case 'calc':
            case 'calculadora':
                return this.commands.calc(message);

            case 'clima':
            case 'tiempo':
                return await this.commands.clima(message);

            case 'stats':
            case 'estadisticas':
                if (isAdmin) {
                    return this.commands.stats(message, companyConfig, statistics);
                } else {
                    return {
                        type: 'text',
                        content: '❌ Este comando solo está disponible para administradores.'
                    };
                }

            default:
                return this.commands.unknown(message);
        }
    }

    async sendResponse(client, chatId, response) {
        switch (response.type) {
            case 'text':
                await client.sendMessage(chatId, response.content);
                break;
            
            case 'media':
                // Para futuras implementaciones de medios
                await client.sendMessage(chatId, response.media, { caption: response.caption });
                break;
            
            default:
                await client.sendMessage(chatId, response.content || response);
                break;
        }
    }

    // Método para verificar si un número es administrador
    isAdmin(phoneNumber) {
        return this.adminNumbers.includes(phoneNumber);
    }

    // Método para agregar comandos personalizados
    addCustomCommand(commandName, handler) {
        this.commands[commandName] = handler;
    }
}

module.exports = CommandProcessor;
