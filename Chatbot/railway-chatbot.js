// CHATBOT ARCOEXPRESS PARA RAILWAY - WHATSAPP BUSINESS API
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Importar comandos de ArcoExpress
const ArcoExpressCommands = require('./src/commands/arcoExpressCommands');
const arcoCommands = new ArcoExpressCommands();

// Configuración WhatsApp Business API
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || 'tu_token_aqui';
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || 'tu_phone_id_aqui';
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'arcoexpress_verify_token_2025';

// Variables globales
let connectedUsers = new Map();
let messageStats = {
    total: 0,
    today: 0,
    lastReset: new Date().toDateString()
};

// Función para enviar mensajes via WhatsApp Business API
async function sendWhatsAppMessage(to, message) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
                type: "text",
                text: { body: message }
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('✅ Mensaje enviado correctamente');
        return response.data;
    } catch (error) {
        console.error('❌ Error enviando mensaje:', error.response?.data || error.message);
        return null;
    }
}

// Función para procesar comandos
function processCommand(message, from) {
    const text = message.toLowerCase().trim();
    
    // Resetear estadísticas diarias
    const today = new Date().toDateString();
    if (messageStats.lastReset !== today) {
        messageStats.today = 0;
        messageStats.lastReset = today;
    }
    
    messageStats.total++;
    messageStats.today++;
    
    // Registrar usuario
    if (!connectedUsers.has(from)) {
        connectedUsers.set(from, {
            firstContact: new Date(),
            lastMessage: new Date(),
            messageCount: 1
        });
    } else {
        const user = connectedUsers.get(from);
        user.lastMessage = new Date();
        user.messageCount++;
    }
    
    // Procesar comandos numéricos
    switch (text) {
        case '1':
            return arcoCommands.productos().content;
        case '2':
            return arcoCommands.etiquetas().content;
        case '3':
            return arcoCommands.ribbons().content;
        case '4':
            return arcoCommands.impresoras().content;
        case '5':
            return arcoCommands.cotizar().content;
        case '6':
            return arcoCommands.maquila().content;
        case '7':
            return arcoCommands.contacto().content;
        case '8':
            return getCompanyInfo();
        case '9':
            return getHelpMenu();
        case '00':
        case 'menu':
            return getMainMenu();
        default:
            if (text.includes('hola') || text.includes('buenos') || text.includes('buenas')) {
                return getWelcomeMessage();
            }
            return getMainMenu();
    }
}

// Mensajes del sistema
function getWelcomeMessage() {
    return `🏷️ *¡Bienvenido a ArcoExpress!* 🇲🇽\n\n` +
           `*Especialistas en etiquetas térmicas desde hace más de 20 años*\n\n` +
           `📱 *WhatsApp:* +52 221 794 6704\n` +
           `📍 *Ubicación:* Puebla, México\n\n` +
           `✨ *Escribe el número de tu consulta:*\n\n` +
           `*1* - 🏷️ Productos\n` +
           `*2* - 🏷️ Etiquetas\n` +
           `*3* - 🎗️ Ribbons\n` +
           `*4* - 🖨️ Impresoras\n` +
           `*5* - 💰 Cotizar\n` +
           `*7* - 📞 Contacto\n` +
           `*9* - ❓ Ayuda\n\n` +
           `¡Estamos aquí para ayudarte! 😊`;
}

function getMainMenu() {
    return `🏷️ *MENÚ ARCOEXPRESS* 🇲🇽\n\n` +
           `*Escribe el número de tu consulta:*\n\n` +
           `*1* - 🏷️ Ver todos los productos\n` +
           `*2* - 🏷️ Etiquetas térmicas\n` +
           `*3* - 🎗️ Ribbons\n` +
           `*4* - 🖨️ Impresoras\n` +
           `*5* - 💰 Solicitar cotización\n` +
           `*6* - 🔧 Servicios de maquila\n` +
           `*7* - 📞 Información de contacto\n` +
           `*8* - 🏢 Sobre nosotros\n` +
           `*9* - ❓ Ayuda\n\n` +
           `⚡ *Más de 20 años de experiencia*\n` +
           `📱 *WhatsApp:* +52 221 794 6704`;
}

function getHelpMenu() {
    return `❓ *AYUDA - CHATBOT ARCOEXPRESS*\n\n` +
           `*Comandos disponibles:*\n\n` +
           `🔢 *Comandos numéricos:*\n` +
           `• Escribe *1-9* para acceder a secciones\n` +
           `• Escribe *00* para el menú principal\n\n` +
           `💬 *Comandos de texto:*\n` +
           `• "Hola" - Mensaje de bienvenida\n` +
           `• "Menu" - Menú principal\n\n` +
           `🏷️ *Especialidades:*\n` +
           `• Etiquetas térmicas\n` +
           `• Ribbons industriales\n` +
           `• Impresoras Zebra, Honeywell, TSC\n\n` +
           `📞 *Contacto directo:*\n` +
           `WhatsApp: +52 221 794 6704\n` +
           `Email: ventas@arcoexpress.mx\n\n` +
           `⏰ *Disponible 24/7*`;
}

function getCompanyInfo() {
    return `🏢 *ARCOEXPRESS DE MÉXICO*\n\n` +
           `⚡ *Más de 20 años de experiencia*\n` +
           `📍 *Ubicación:* Puebla, México\n\n` +
           `🏷️ *Especialistas en:*\n` +
           `• Etiquetas térmicas directas\n` +
           `• Etiquetas de transferencia térmica\n` +
           `• Ribbons de cera, resina y mixtos\n` +
           `• Impresoras industriales\n` +
           `• Servicios de maquila\n\n` +
           `🌟 *Marcas que manejamos:*\n` +
           `• 🦓 Zebra\n` +
           `• 🏭 Honeywell\n` +
           `• 🔧 TSC\n\n` +
           `🚚 *Envíos a todo México*\n` +
           `💼 *Atención empresarial*\n` +
           `🛠️ *Soporte técnico especializado*\n\n` +
           `📞 *Contáctanos:*\n` +
           `WhatsApp: +52 221 794 6704\n` +
           `Web: arcoexpress.mx`;
}

// WEBHOOK PARA WHATSAPP BUSINESS API
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ Webhook verificado correctamente');
        res.status(200).send(challenge);
    } else {
        console.log('❌ Error en verificación de webhook');
        res.sendStatus(403);
    }
});

app.post('/webhook', async (req, res) => {
    try {
        const body = req.body;
        
        if (body.object === 'whatsapp_business_account') {
            body.entry.forEach(entry => {
                entry.changes.forEach(change => {
                    if (change.field === 'messages') {
                        const messages = change.value.messages;
                        if (messages) {
                            messages.forEach(async message => {
                                const from = message.from;
                                const messageText = message.text?.body || '';
                                
                                console.log(`📱 Mensaje recibido de ${from}: ${messageText}`);
                                
                                // Procesar comando
                                const response = processCommand(messageText, from);
                                
                                // Enviar respuesta
                                await sendWhatsAppMessage(from, response);
                            });
                        }
                    }
                });
            });
        }
        
        res.status(200).send('OK');
    } catch (error) {
        console.error('❌ Error procesando webhook:', error);
        res.status(500).send('Error interno');
    }
});

// RUTAS WEB
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ArcoExpress ChatBot - WhatsApp Business</title>
        <meta charset="UTF-8">
        <style>
            body { 
                font-family: Arial, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0; 
                padding: 20px;
                color: white;
                min-height: 100vh;
            }
            .container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                font-size: 2.5em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .status {
                background: rgba(40,167,69,0.8);
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                font-weight: bold;
                font-size: 1.2em;
                text-align: center;
            }
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            .info-card {
                background: rgba(255,255,255,0.1);
                padding: 20px;
                border-radius: 15px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .stats {
                background: rgba(255,193,7,0.2);
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
            }
            .commands {
                background: rgba(0,123,255,0.2);
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
            }
            .contact-info {
                background: rgba(40,167,69,0.2);
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                text-align: center;
            }
            .whatsapp-btn {
                background: #25D366;
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 25px;
                font-size: 1.1em;
                text-decoration: none;
                display: inline-block;
                margin: 10px;
                transition: all 0.3s ease;
            }
            .whatsapp-btn:hover {
                background: #128C7E;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 ChatBot ArcoExpress</h1>
                <p>WhatsApp Business API - Funcionando en la nube</p>
            </div>
            
            <div class="status">
                ✅ ChatBot activo y funcionando 24/7 en Railway
            </div>
            
            <div class="info-grid">
                <div class="info-card">
                    <h3>🏢 Empresa</h3>
                    <p><strong>ArcoExpress de México</strong></p>
                    <p>Más de 20 años de experiencia</p>
                    <p>📍 Puebla, México</p>
                </div>
                
                <div class="info-card">
                    <h3>🏷️ Especialidades</h3>
                    <p>• Etiquetas térmicas</p>
                    <p>• Ribbons industriales</p>
                    <p>• Impresoras Zebra, Honeywell, TSC</p>
                    <p>• Servicios de maquila</p>
                </div>
            </div>
            
            <div class="stats">
                <h3>📊 Estadísticas del ChatBot</h3>
                <p><strong>Mensajes totales:</strong> ${messageStats.total}</p>
                <p><strong>Mensajes hoy:</strong> ${messageStats.today}</p>
                <p><strong>Usuarios conectados:</strong> ${connectedUsers.size}</p>
                <p><strong>Estado:</strong> Activo en Railway ✅</p>
            </div>
            
            <div class="commands">
                <h3>🔢 Comandos Disponibles</h3>
                <p><strong>1</strong> - Ver productos | <strong>2</strong> - Etiquetas | <strong>3</strong> - Ribbons</p>
                <p><strong>4</strong> - Impresoras | <strong>5</strong> - Cotizar | <strong>6</strong> - Maquila</p>
                <p><strong>7</strong> - Contacto | <strong>8</strong> - Info empresa | <strong>9</strong> - Ayuda</p>
                <p><strong>00</strong> - Menú principal</p>
            </div>
            
            <div class="contact-info">
                <h3>📱 Conecta con nuestro ChatBot</h3>
                <p>Envía un mensaje a nuestro WhatsApp Business</p>
                <a href="https://wa.me/5222179476704?text=Hola" class="whatsapp-btn" target="_blank">
                    💬 Abrir WhatsApp (+52 221 794 6704)
                </a>
                <p><small>El ChatBot responde automáticamente 24/7</small></p>
            </div>
        </div>
    </body>
    </html>
    `);
});

// API para estadísticas
app.get('/api/stats', (req, res) => {
    res.json({
        messageStats,
        connectedUsers: connectedUsers.size,
        status: 'active',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Endpoint de salud
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        chatbot: 'ArcoExpress',
        version: '2.0.0'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 ChatBot ArcoExpress iniciado en puerto ${PORT}`);
    console.log(`🌐 URL: https://ingenieriauveg-production.up.railway.app`);
    console.log(`📱 WhatsApp Business API configurado`);
    console.log(`✅ Listo para recibir mensajes 24/7`);
});

module.exports = app;
