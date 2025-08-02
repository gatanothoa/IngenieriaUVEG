// CHATBOT ARCOEXPRESS - RAILWAY EDITION
// ChatBot completo que funciona 100% en la nube
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Importar comandos de ArcoExpress
const ArcoExpressCommands = require('./src/commands/arcoExpressCommands');
const arcoCommands = new ArcoExpressCommands();

// Estadísticas globales
let chatStats = {
    totalVisits: 0,
    totalMessages: 0,
    activeUsers: 0,
    lastMessage: null,
    startTime: new Date()
};

// Simulador de conversaciones para demostración
let demoConversations = [
    {
        from: '+52 222 123 4567',
        message: '1',
        response: 'Viendo catálogo de productos...',
        timestamp: new Date()
    },
    {
        from: '+52 221 987 6543',
        message: '5',
        response: 'Solicitando cotización...',
        timestamp: new Date()
    }
];

// Función para procesar comandos (simulada)
function processCommand(command) {
    chatStats.totalMessages++;
    chatStats.lastMessage = new Date();
    
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
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
            if (cmd.includes('hola') || cmd.includes('buenos') || cmd.includes('buenas')) {
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

// RUTAS PRINCIPALES
app.get('/', (req, res) => {
    chatStats.totalVisits++;
    
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ArcoExpress ChatBot - Especialistas en Etiquetas Térmicas</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏷️</text></svg>">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body { 
                font-family: 'Arial', sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: white;
            }
            .container { 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
                padding: 30px;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            }
            .header h1 {
                font-size: 3em;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .header p {
                font-size: 1.3em;
                opacity: 0.9;
            }
            .status-bar {
                background: rgba(40,167,69,0.8);
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                font-weight: bold;
                font-size: 1.2em;
                text-align: center;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { opacity: 0.8; }
                50% { opacity: 1; }
                100% { opacity: 0.8; }
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                margin: 40px 0;
            }
            .card {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                padding: 25px;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            }
            .card h3 {
                color: #ffeb3b;
                margin-bottom: 15px;
                font-size: 1.5em;
            }
            .whatsapp-section {
                background: rgba(37,211,102,0.2);
                padding: 30px;
                border-radius: 20px;
                margin: 30px 0;
                text-align: center;
            }
            .whatsapp-btn {
                background: #25D366;
                color: white;
                padding: 18px 35px;
                border: none;
                border-radius: 50px;
                font-size: 1.2em;
                text-decoration: none;
                display: inline-block;
                margin: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            .whatsapp-btn:hover {
                background: #128C7E;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.4);
            }
            .demo-section {
                background: rgba(0,123,255,0.2);
                padding: 25px;
                border-radius: 20px;
                margin: 30px 0;
            }
            .command-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            .command-btn {
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 15px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            }
            .command-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.05);
            }
            .response-area {
                background: rgba(0,0,0,0.3);
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                min-height: 200px;
                white-space: pre-wrap;
                font-family: monospace;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .stats-bar {
                display: flex;
                justify-content: space-around;
                background: rgba(255,193,7,0.2);
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            .stat-item {
                text-align: center;
                margin: 10px;
            }
            .stat-number {
                font-size: 2em;
                font-weight: bold;
                color: #ffeb3b;
            }
            .footer {
                text-align: center;
                margin-top: 50px;
                padding: 30px;
                background: rgba(0,0,0,0.2);
                border-radius: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏷️ ArcoExpress ChatBot</h1>
                <p>Especialistas en Etiquetas Térmicas • Más de 20 años de experiencia</p>
                <p>🇲🇽 Puebla, México</p>
            </div>
            
            <div class="status-bar">
                ✅ ChatBot Activo y Funcionando 24/7 en Railway
            </div>
            
            <div class="stats-bar">
                <div class="stat-item">
                    <div class="stat-number">${chatStats.totalVisits}</div>
                    <div>Visitas</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${chatStats.totalMessages}</div>
                    <div>Mensajes</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${Math.floor((new Date() - chatStats.startTime) / (1000 * 60 * 60))}</div>
                    <div>Horas Online</div>
                </div>
            </div>
            
            <div class="grid">
                <div class="card">
                    <h3>🏢 Sobre ArcoExpress</h3>
                    <p><strong>Nombre:</strong> ArcoExpress de México</p>
                    <p><strong>Especialidad:</strong> Etiquetas térmicas, ribbons e impresoras</p>
                    <p><strong>Experiencia:</strong> Más de 20 años</p>
                    <p><strong>Ubicación:</strong> Puebla, México</p>
                    <p><strong>Web:</strong> arcoexpress.mx</p>
                </div>
                
                <div class="card">
                    <h3>🏷️ Productos Principales</h3>
                    <p>• Etiquetas térmicas directas</p>
                    <p>• Etiquetas de transferencia térmica</p>
                    <p>• Ribbons de cera, resina y mixtos</p>
                    <p>• Impresoras Zebra, Honeywell, TSC</p>
                    <p>• Servicios de maquila</p>
                </div>
                
                <div class="card">
                    <h3>📞 Contacto</h3>
                    <p><strong>WhatsApp:</strong> +52 221 794 6704</p>
                    <p><strong>Teléfono 1:</strong> +52 222 210 61 44</p>
                    <p><strong>Teléfono 2:</strong> +52 222 210 61 40</p>
                    <p><strong>Email:</strong> ventas@arcoexpress.mx</p>
                    <p><strong>Horario:</strong> Lun-Vie 9:00-18:00</p>
                </div>
            </div>
            
            <div class="whatsapp-section">
                <h2>📱 Conecta con nuestro ChatBot</h2>
                <p>Envía un mensaje a nuestro WhatsApp Business y recibe atención automatizada 24/7</p>
                <a href="https://wa.me/5222179476704?text=Hola%20ArcoExpress" class="whatsapp-btn" target="_blank">
                    💬 Abrir WhatsApp (+52 221 794 6704)
                </a>
                <p><small>El ChatBot responde automáticamente a tus consultas sobre productos y servicios</small></p>
            </div>
            
            <div class="demo-section">
                <h3>🤖 Prueba el ChatBot Aquí</h3>
                <p>Simula una conversación con nuestro ChatBot usando los comandos:</p>
                
                <div class="command-grid">
                    <button class="command-btn" onclick="sendCommand('1')">1 - Productos</button>
                    <button class="command-btn" onclick="sendCommand('2')">2 - Etiquetas</button>
                    <button class="command-btn" onclick="sendCommand('3')">3 - Ribbons</button>
                    <button class="command-btn" onclick="sendCommand('4')">4 - Impresoras</button>
                    <button class="command-btn" onclick="sendCommand('5')">5 - Cotizar</button>
                    <button class="command-btn" onclick="sendCommand('7')">7 - Contacto</button>
                </div>
                
                <div id="response" class="response-area">
                    Bienvenido al simulador del ChatBot ArcoExpress.
                    Haz clic en cualquier comando de arriba para ver la respuesta automática.
                </div>
            </div>
            
            <div class="footer">
                <h3>🚀 ChatBot Desarrollado para Railway</h3>
                <p>Sistema automatizado de atención al cliente 24/7</p>
                <p>Especializado en productos industriales de etiquetado</p>
                <p><strong>Estado del Servidor:</strong> ✅ Activo en Railway</p>
            </div>
        </div>
        
        <script>
            function sendCommand(cmd) {
                fetch('/api/demo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ command: cmd })
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('response').textContent = data.response;
                })
                .catch(error => {
                    document.getElementById('response').textContent = 'Error: ' + error.message;
                });
            }
            
            // Auto-actualizar estadísticas cada 30 segundos
            setInterval(() => {
                location.reload();
            }, 30000);
        </script>
    </body>
    </html>
    `);
});

// API para demostración del chatbot
app.post('/api/demo', (req, res) => {
    const { command } = req.body;
    const response = processCommand(command);
    
    res.json({
        command: command,
        response: response,
        timestamp: new Date().toISOString()
    });
});

// API para estadísticas
app.get('/api/stats', (req, res) => {
    res.json({
        ...chatStats,
        uptime: Math.floor((new Date() - chatStats.startTime) / 1000),
        status: 'active',
        server: 'Railway',
        version: '1.0.0'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'ArcoExpress ChatBot',
        version: '1.0.0',
        server: 'Railway'
    });
});

// Página de información de la empresa
app.get('/empresa', (req, res) => {
    res.json({
        nombre: 'ArcoExpress de México',
        especialidad: 'Especialistas en etiquetas térmicas, ribbons e impresoras',
        experiencia: 'Más de 20 años de experiencia',
        ubicacion: 'Puebla, México',
        contacto: {
            whatsapp: '+52 221 794 6704',
            telefono1: '+52 222 210 61 44',
            telefono2: '+52 222 210 61 40',
            email: 'ventas@arcoexpress.mx',
            web: 'arcoexpress.mx'
        },
        productos: {
            etiquetas: ['Térmicas directas', 'Transferencia térmica', 'Códigos de barras'],
            ribbons: ['Cera', 'Resina', 'Mixtos'],
            impresoras: ['Zebra', 'Honeywell', 'TSC'],
            servicios: ['Maquila', 'Soporte técnico', 'Consultoría']
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 ArcoExpress ChatBot iniciado en puerto ${PORT}`);
    console.log(`🌐 Servidor activo en Railway`);
    console.log(`📱 WhatsApp Business: +52 221 794 6704`);
    console.log(`✅ Sistema listo para producción`);
});

module.exports = app;
