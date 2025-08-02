// CHATBOT WHATSAPP - PLANTILLA UNIVERSAL
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
                clientId: 'whatsapp-bot-template',
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

        // Configuración de la empresa desde variables de entorno
        this.companyConfig = {
            name: process.env.COMPANY_NAME || 'Mi Empresa',
            phone: process.env.COMPANY_PHONE || '+52XXXXXXXXXX',
            email: process.env.COMPANY_EMAIL || 'contacto@miempresa.com',
            website: process.env.COMPANY_WEBSITE || 'https://miempresa.com',
            address: process.env.COMPANY_ADDRESS || 'Mi Ciudad, País',
            products: (process.env.COMPANY_PRODUCTS || '').split(',').filter(p => p.trim()),
            services: (process.env.COMPANY_SERVICES || '').split(',').filter(s => s.trim()),
            businessHours: {
                start: process.env.BUSINESS_HOURS_START || '09:00',
                end: process.env.BUSINESS_HOURS_END || '18:00',
                days: process.env.BUSINESS_DAYS || 'Lunes a Viernes'
            }
        };

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Evento: QR Code para conectar
        this.client.on('qr', async (qr) => {
            console.log('\\n📱 GENERANDO CÓDIGO QR PARA CONEXIÓN...');
            console.log('=' .repeat(50));
            qrcode.generate(qr, { small: true });
            console.log('=' .repeat(50));
            
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
                console.log('� QR guardado como imagen para panel web');
                
                // Mostrar URLs de acceso
                const webPort = process.env.WEB_PORT || 3000;
                console.log('\\n🌐 PANEL WEB DISPONIBLE:');
                console.log(`📱 Local: http://localhost:${webPort}`);
                console.log(`🌍 Remoto: Usa ngrok o deploy en la nube`);
                console.log('\\n📝 INSTRUCCIONES:');
                console.log('1. Abre WhatsApp en tu teléfono');
                console.log('2. Ve a Configuración > Dispositivos Vinculados');
                console.log('3. Toca "Vincular un dispositivo"');
                console.log('4. Escanea el código QR (dura 5 minutos)');
                console.log('\\n📲 PARA CONEXIÓN REMOTA:');
                console.log('- Comparte la URL del panel web');
                console.log('- El QR se actualiza automáticamente');
                console.log('=' .repeat(50));
                
            } catch (error) {
                console.error('❌ Error guardando QR como imagen:', error.message);
            }
            
            this.logger.info('Código QR generado para conexión');
        });

        // Evento: Cliente listo
        this.client.on('ready', () => {
            this.isReady = true;
            const welcomeMessage = `
🤖 ¡${this.companyConfig.name} ChatBot conectado exitosamente!
📱 Bot: ${process.env.BOT_NAME || 'ChatBot Assistant'}
🏢 Empresa: ${this.companyConfig.name}
⏰ Conectado: ${new Date().toLocaleString('es-MX')}
🚀 Estado: ¡Listo para recibir mensajes!
            `;
            
            console.log(welcomeMessage);
            this.logger.info('Bot conectado y listo para funcionar');
            
            // Crear carpetas necesarias
            this.ensureDirectories();
        });

        // Evento: Nuevo mensaje recibido
        this.client.on('message', async (message) => {
            await this.handleMessage(message);
        });

        // Evento: Error de conexión
        this.client.on('disconnected', (reason) => {
            console.log('🔌 Bot desconectado:', reason);
            this.logger.error(`Bot desconectado: ${reason}`);
            this.isReady = false;
        });

        // Evento: Error de autenticación
        this.client.on('auth_failure', (session) => {
            console.log('❌ Error de autenticación. Elimina la carpeta data/session y vuelve a intentar');
            this.logger.error('Error de autenticación', session);
        });
    }

    async ensureDirectories() {
        const directories = [
            './data',
            './data/session',
            './data/backups',
            './data/logs',
            './data/media'
        ];

        for (const dir of directories) {
            await fs.ensureDir(dir);
        }
    }

    async handleMessage(message) {
        try {
            // Ignorar mensajes del propio bot
            if (message.fromMe) return;

            // Actualizar estadísticas
            this.statistics.messagesReceived++;
            this.statistics.usersInteracted.add(message.from);

            // Log del mensaje recibido
            this.logger.info(`Mensaje recibido de ${message.from}: ${message.body}`);

            // Guardar mensaje en base de datos
            await this.database.saveMessage({
                from: message.from,
                body: message.body,
                timestamp: new Date(),
                type: 'received'
            });

            // Procesar el mensaje
            if (message.body.startsWith('/')) {
                // Es un comando
                await this.commandProcessor.processCommand(message, this.client, this.companyConfig);
            } else {
                // Es un mensaje natural
                await this.messageHandler.processMessage(message, this.client, this.companyConfig);
            }

            // Actualizar estadísticas de mensajes enviados
            this.statistics.messagesSent++;

        } catch (error) {
            this.logger.error('Error procesando mensaje:', error);
            console.error('❌ Error procesando mensaje:', error.message);
        }
    }

    async sendMessage(chatId, message) {
        try {
            await this.client.sendMessage(chatId, message);
            this.logger.info(`Mensaje enviado a ${chatId}: ${message}`);
        } catch (error) {
            this.logger.error(`Error enviando mensaje a ${chatId}:`, error);
            throw error;
        }
    }

    getStatistics() {
        const uptime = Date.now() - this.statistics.startTime.getTime();
        return {
            ...this.statistics,
            usersInteracted: this.statistics.usersInteracted.size,
            uptime: Math.floor(uptime / 1000), // en segundos
            isReady: this.isReady
        };
    }

    async start() {
        try {
            console.log('🤖 Iniciando ChatBot WhatsApp...');
            console.log(`🏢 Empresa: ${this.companyConfig.name}`);
            console.log('⏳ Conectando a WhatsApp Web...');
            console.log('📝 Una vez conectado, envía /start para comenzar');
            console.log('🛑 Presiona Ctrl+C para detener el bot');
            
            await this.client.initialize();
        } catch (error) {
            console.error('❌ Error iniciando el bot:', error);
            this.logger.error('Error iniciando el bot:', error);
            process.exit(1);
        }
    }

    async stop() {
        try {
            console.log('🛑 Deteniendo bot...');
            await this.client.destroy();
            this.logger.info('Bot detenido correctamente');
            process.exit(0);
        } catch (error) {
            console.error('❌ Error deteniendo el bot:', error);
            process.exit(1);
        }
    }
}

// Crear e iniciar el bot
const bot = new WhatsAppBot();

// Manejar señales de cierre
process.on('SIGINT', () => {
    console.log('\\n🛑 Señal de interrupción recibida...');
    bot.stop();
});

process.on('SIGTERM', () => {
    console.log('\\n🛑 Señal de terminación recibida...');
    bot.stop();
});

// Manejar errores no capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Error no manejado:', reason);
    bot.logger.error('Error no manejado:', { reason, promise });
});

// Iniciar el bot
bot.start().catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
});

module.exports = WhatsAppBot;
