// CHATBOT WHATSAPP - ARCHIVO PRINCIPAL
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

// Importar módulos personalizados
const MessageHandler = require('./handlers/messageHandler');
const CommandProcessor = require('./handlers/commandProcessor');
const DatabaseManager = require('./database/databaseManager');
const Logger = require('./utils/logger');

// Importar servidor web para panel remoto
let webServer = null;
try {
    webServer = require('./web/server');
} catch (error) {
    console.log('📝 Servidor web no disponible - funcionando en modo local');
}

class WhatsAppBot {
    constructor() {
        // Configuración del cliente WhatsApp
        this.client = new Client({
            authStrategy: new LocalAuth({
                clientId: 'whatsapp-bot',
                dataPath: './data/session'
            }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ],
                timeout: 60000 // Timeout más largo para estabilidad
            },
            // Configuración para QR más duradero
            qrMaxRetries: 10,
            restartOnAuthFail: true,
            qrTimeout: 300000 // 5 minutos de duración del QR
        });

        // Inicializar módulos
        this.messageHandler = new MessageHandler();
        this.commandProcessor = new CommandProcessor();
        this.database = new DatabaseManager();
        this.logger = new Logger();

        // Variables de estado
        this.isReady = false;
        this.statistics = {
            messagesReceived: 0,
            messagesSent: 0,
            usersInteracted: new Set(),
            startTime: new Date()
        };

        this.init();
    }

    // INICIALIZACIÓN DEL BOT
    async init() {
        try {
            this.logger.info('🤖 Iniciando WhatsApp Bot...');
            
            // Crear directorio de datos si no existe
            await this.ensureDirectories();
            
            // Configurar eventos del cliente
            this.setupClientEvents();
            
            // Inicializar base de datos
            await this.database.init();
            
            // Inicializar cliente WhatsApp
            await this.client.initialize();
            
        } catch (error) {
            this.logger.error('Error al inicializar el bot:', error);
            process.exit(1);
        }
    }

    // CREAR DIRECTORIOS NECESARIOS
    async ensureDirectories() {
        const directories = [
            './data',
            './data/session',
            './data/media',
            './data/logs',
            './data/backups'
        ];

        for (const dir of directories) {
            await fs.ensureDir(dir);
        }
    }

    // CONFIGURAR EVENTOS DEL CLIENTE WHATSAPP
    setupClientEvents() {
        // Evento: Generar código QR
        this.client.on('qr', async (qr) => {
            this.logger.info('📱 Generando código QR para conexión...');
            
            // Mostrar QR en terminal
            qrcode.generate(qr, { small: true });
            
            // Guardar QR como imagen para panel web
            try {
                await fs.ensureDir('./data');
                await QRCode.toFile('./data/qr.png', qr, {
                    width: 400,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                this.logger.info('💾 QR guardado como imagen para panel web');
                
                // Mostrar URLs de acceso
                const webPort = process.env.PORT || process.env.WEB_PORT || 3000;
                console.log('\n🌐 PANEL WEB DISPONIBLE:');
                console.log(`📱 Local: http://localhost:${webPort}`);
                console.log(`🌍 Remoto: Usa ngrok o deploy en la nube`);
                console.log('\n📋 INSTRUCCIONES PARA CONEXIÓN REMOTA:');
                console.log('1. Abre el panel web en cualquier navegador');
                console.log('2. Comparte la URL con la persona remota');
                console.log('3. Escanea el QR desde WhatsApp');
                console.log('4. ¡El bot funcionará 24/7!\n');
                
            } catch (error) {
                this.logger.error('❌ Error guardando QR como imagen:', error.message);
            }
        });

        // Evento: Cliente listo
        this.client.on('ready', () => {
            this.isReady = true;
            this.logger.success('✅ Bot de WhatsApp conectado y listo!');
            this.logger.info(`📞 Número conectado: ${this.client.info.wid.user}`);
            this.startPeriodicTasks();
        });

        // Evento: Cliente autenticado
        this.client.on('authenticated', () => {
            this.logger.info('🔐 Cliente autenticado correctamente');
        });

        // Evento: Error de autenticación
        this.client.on('auth_failure', (msg) => {
            this.logger.error('❌ Error de autenticación:', msg);
        });

        // Evento: Cliente desconectado
        this.client.on('disconnected', (reason) => {
            this.logger.warn('⚠️ Cliente desconectado:', reason);
            this.isReady = false;
        });

        // Evento: Mensaje recibido
        this.client.on('message', async (message) => {
            await this.handleIncomingMessage(message);
        });

        // Evento: Estado de mensaje actualizado
        this.client.on('message_ack', (message, ack) => {
            this.handleMessageAck(message, ack);
        });

        // Evento: Cambio de estado del cliente
        this.client.on('change_state', (state) => {
            this.logger.info(`🔄 Estado del cliente: ${state}`);
        });
    }

    // MANEJAR MENSAJES ENTRANTES
    async handleIncomingMessage(message) {
        try {
            // Ignorar mensajes propios y de estado
            if (message.fromMe || message.isStatus) return;

            // Incrementar estadísticas
            this.statistics.messagesReceived++;
            this.statistics.usersInteracted.add(message.from);

            // Log del mensaje recibido
            this.logger.info(`📨 Mensaje de ${message.from}: ${message.body}`);

            // Procesar mensaje según tipo
            const response = await this.messageHandler.processMessage(message);
            
            if (response) {
                await this.sendResponse(message, response);
            }

        } catch (error) {
            this.logger.error('Error al procesar mensaje:', error);
            await this.sendErrorMessage(message);
        }
    }

    // ENVIAR RESPUESTA
    async sendResponse(originalMessage, response) {
        try {
            let sentMessage;

            // Enviar según tipo de respuesta
            if (response.type === 'text') {
                sentMessage = await originalMessage.reply(response.content);
            } else if (response.type === 'media') {
                const media = MessageMedia.fromFilePath(response.content);
                sentMessage = await originalMessage.reply(media, response.caption || '');
            } else if (response.type === 'contact') {
                sentMessage = await originalMessage.reply(response.content);
            }

            // Incrementar estadísticas
            if (sentMessage) {
                this.statistics.messagesSent++;
                this.logger.success(`✅ Respuesta enviada a ${originalMessage.from}`);
            }

        } catch (error) {
            this.logger.error('Error al enviar respuesta:', error);
        }
    }

    // ENVIAR MENSAJE DE ERROR
    async sendErrorMessage(message) {
        const errorMsg = '❌ Lo siento, ocurrió un error al procesar tu mensaje. Por favor intenta de nuevo.';
        try {
            await message.reply(errorMsg);
        } catch (error) {
            this.logger.error('Error al enviar mensaje de error:', error);
        }
    }

    // MANEJAR CONFIRMACIONES DE MENSAJE
    handleMessageAck(message, ack) {
        const ackStatus = {
            1: 'Enviado',
            2: 'Recibido',
            3: 'Leído'
        };
        
        if (ack > 0) {
            this.logger.debug(`📋 Mensaje ${ackStatus[ack] || 'Desconocido'}: ${message.id._serialized}`);
        }
    }

    // TAREAS PERIÓDICAS
    startPeriodicTasks() {
        // Guardar estadísticas cada 30 minutos
        setInterval(() => {
            this.saveStatistics();
        }, 30 * 60 * 1000);

        // Limpiar logs antiguos cada día
        setInterval(() => {
            this.cleanupOldLogs();
        }, 24 * 60 * 60 * 1000);
    }

    // GUARDAR ESTADÍSTICAS
    async saveStatistics() {
        try {
            const stats = {
                ...this.statistics,
                usersInteracted: this.statistics.usersInteracted.size,
                uptime: Date.now() - this.statistics.startTime.getTime(),
                timestamp: new Date().toISOString()
            };

            await fs.writeFile('./data/statistics.json', JSON.stringify(stats, null, 2));
            this.logger.info('📊 Estadísticas guardadas');
        } catch (error) {
            this.logger.error('Error al guardar estadísticas:', error);
        }
    }

    // LIMPIAR LOGS ANTIGUOS
    async cleanupOldLogs() {
        try {
            const logsDir = './data/logs';
            const files = await fs.readdir(logsDir);
            const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

            for (const file of files) {
                const filePath = path.join(logsDir, file);
                const stats = await fs.stat(filePath);
                
                if (stats.mtime.getTime() < oneWeekAgo) {
                    await fs.remove(filePath);
                    this.logger.info(`🗑️ Log antiguo eliminado: ${file}`);
                }
            }
        } catch (error) {
            this.logger.error('Error al limpiar logs:', error);
        }
    }

    // MÉTODOS PÚBLICOS PARA CONTROL EXTERNO
    
    // Obtener estadísticas
    getStatistics() {
        return {
            ...this.statistics,
            usersInteracted: this.statistics.usersInteracted.size,
            uptime: Date.now() - this.statistics.startTime.getTime(),
            isReady: this.isReady
        };
    }

    // Enviar mensaje directo
    async sendDirectMessage(chatId, message) {
        try {
            if (!this.isReady) {
                throw new Error('Bot no está listo');
            }

            await this.client.sendMessage(chatId, message);
            this.statistics.messagesSent++;
            this.logger.success(`📤 Mensaje directo enviado a ${chatId}`);
            return true;
        } catch (error) {
            this.logger.error('Error al enviar mensaje directo:', error);
            return false;
        }
    }

    // Cerrar bot de forma segura
    async shutdown() {
        try {
            this.logger.info('🔄 Cerrando bot de forma segura...');
            
            // Guardar estadísticas finales
            await this.saveStatistics();
            
            // Cerrar conexión de base de datos
            await this.database.close();
            
            // Destruir cliente WhatsApp
            await this.client.destroy();
            
            this.logger.success('✅ Bot cerrado correctamente');
            process.exit(0);
        } catch (error) {
            this.logger.error('Error al cerrar bot:', error);
            process.exit(1);
        }
    }
}

// MANEJO DE SEÑALES DEL SISTEMA
process.on('SIGINT', async () => {
    console.log('\n🛑 Señal SIGINT recibida, cerrando bot...');
    if (global.bot) {
        await global.bot.shutdown();
    } else {
        process.exit(0);
    }
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Señal SIGTERM recibida, cerrando bot...');
    if (global.bot) {
        await global.bot.shutdown();
    } else {
        process.exit(0);
    }
});

// INICIAR BOT
if (require.main === module) {
    const bot = new WhatsAppBot();
    global.bot = bot;
}

module.exports = WhatsAppBot;
