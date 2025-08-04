// CHATBOT ARCOEXPRESS - RAILWAY EDITION CON WHATSAPP AUTOMATION
// ChatBot completo que funciona 100% en la nube con integración WhatsApp
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de Twilio WhatsApp (Railway environment variables)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

// Variables de entorno adicionales para Railway
const NODE_ENV = process.env.NODE_ENV || 'production';
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL || '';
const RAILWAY_GIT_COMMIT_SHA = process.env.RAILWAY_GIT_COMMIT_SHA || '86eafca';

console.log('🚀 Iniciando ArcoExpress ChatBot...');
console.log(`📡 Puerto: ${PORT}`);
console.log(`🌍 Entorno: ${NODE_ENV}`);
console.log(`🔗 Railway URL: ${RAILWAY_STATIC_URL}`);
console.log(`📦 Commit: ${RAILWAY_GIT_COMMIT_SHA}`);
console.log(`📱 Twilio WhatsApp: ${TWILIO_WHATSAPP_NUMBER}`);

// Middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Comandos de ArcoExpress integrados (sin dependencias externas)
const arcoCommands = {
    productos: () => ({
        content: `🏷️ PRODUCTOS ARCOEXPRESS 🇲🇽\n\n` +
                `*Especialistas en etiquetas térmicas con más de 20 años de experiencia*\n\n` +
                `📋 *CATEGORÍAS PRINCIPALES:*\n\n` +
                `*1. ETIQUETAS TÉRMICAS*\n` +
                `• Térmicas directas\n` +
                `• Transferencia térmica\n` +
                `• Códigos de barras\n` +
                `• Etiquetas especiales\n\n` +
                `*2. RIBBONS*\n` +
                `• Cera (Wax)\n` +
                `• Resina (Resin)\n` +
                `• Mixtos (Wax-Resin)\n\n` +
                `*3. IMPRESORAS*\n` +
                `• 🦓 Zebra\n` +
                `• 🏭 Honeywell\n` +
                `• 🔧 TSC\n\n` +
                `📱 *Contáctanos:* +52 1 221 794 6704\n` +
                `💰 *Escribe 5 para cotizar*`
    }),
    etiquetas: () => ({
        content: `🏷️ *ETIQUETAS TÉRMICAS* - ArcoExpress\n\n` +
                `*ETIQUETAS TÉRMICAS DIRECTAS:*\n` +
                `• Ideales para códigos de barras\n` +
                `• Aplicaciones de corta duración\n` +
                `• Económicas y versátiles\n\n` +
                `*ETIQUETAS DE TRANSFERENCIA TÉRMICA:*\n` +
                `• Mayor durabilidad\n` +
                `• Resistentes a solventes\n` +
                `• Ideales para inventarios\n\n` +
                `*TAMAÑOS POPULARES:*\n` +
                `• 4" x 6" (101.6 x 152.4 mm)\n` +
                `• 4" x 4" (101.6 x 101.6 mm)\n` +
                `• 3" x 5" (76.2 x 127 mm)\n` +
                `• Tamaños personalizados\n\n` +
                `📞 *Cotización:* +52 1 221 794 6704\n` +
                `💼 *Ventas corporativas disponibles*`
    }),
    ribbons: () => ({
        content: `🎗️ *RIBBONS INDUSTRIALES* - ArcoExpress\n\n` +
                `*RIBBON DE CERA (WAX):*\n` +
                `• Económico y versátil\n` +
                `• Para papel y cartón\n` +
                `• Aplicaciones generales\n\n` +
                `*RIBBON DE RESINA (RESIN):*\n` +
                `• Máxima durabilidad\n` +
                `• Resistente a químicos\n` +
                `• Para materiales sintéticos\n\n` +
                `*RIBBON MIXTO (WAX-RESIN):*\n` +
                `• Equilibrio perfecto\n` +
                `• Durabilidad intermedia\n` +
                `• Versátil para múltiples sustratos\n\n` +
                `*ANCHOS DISPONIBLES:*\n` +
                `• 110mm, 83mm, 64mm, 40mm\n` +
                `• Longitudes: 300m, 450m, 600m\n\n` +
                `📱 *Consultas:* +52 1 221 794 6704`
    }),
    impresoras: () => ({
        content: `🖨️ *IMPRESORAS INDUSTRIALES* - ArcoExpress\n\n` +
                `*ZEBRA:*\n` +
                `• ZT230, ZT410, ZT510\n` +
                `• GX/GK Series\n` +
                `• Líderes del mercado\n\n` +
                `*HONEYWELL:*\n` +
                `• PC42t, PM43, PM23c\n` +
                `• Datamax-O'Neil\n` +
                `• Robustas y confiables\n\n` +
                `*TSC:*\n` +
                `• TTP-244 Pro, TE300\n` +
                `• Excelente relación precio-calidad\n` +
                `• Ideales para PyMEs\n\n` +
                `*SERVICIOS INCLUIDOS:*\n` +
                `• 🔧 Instalación y configuración\n` +
                `• 🛠️ Soporte técnico\n` +
                `• 📚 Capacitación de uso\n\n` +
                `📞 *Asesoría:* +52 1 221 794 6704`
    }),
    cotizar: () => ({
        content: `💰 *SOLICITAR COTIZACIÓN* - ArcoExpress\n\n` +
                `*INFORMACIÓN NECESARIA:*\n\n` +
                `📋 *Para Etiquetas:*\n` +
                `• Medidas (ancho x alto)\n` +
                `• Cantidad aproximada\n` +
                `• Tipo (térmica directa/transferencia)\n` +
                `• Aplicación específica\n\n` +
                `🎗️ *Para Ribbons:*\n` +
                `• Ancho requerido\n` +
                `• Tipo (cera/resina/mixto)\n` +
                `• Longitud preferida\n\n` +
                `🖨️ *Para Impresoras:*\n` +
                `• Volumen de impresión diario\n` +
                `• Tipo de etiquetas a usar\n` +
                `• Presupuesto aproximado\n\n` +
                `📱 *CONTACTO DIRECTO:*\n` +
                `WhatsApp: +52 1 221 794 6704\n` +
                `Email: ventas@arcoexpress.mx\n\n` +
                `⚡ *Respuesta en menos de 2 horas*`
    }),
    maquila: () => ({
        content: `🔧 *SERVICIOS DE MAQUILA* - ArcoExpress\n\n` +
                `*SERVICIOS DISPONIBLES:*\n\n` +
                `📝 *Impresión de Etiquetas:*\n` +
                `• Códigos de barras\n` +
                `• Etiquetas con logo\n` +
                `• Numeración consecutiva\n` +
                `• Datos variables\n\n` +
                `✂️ *Corte y Acabados:*\n` +
                `• Corte a medida\n` +
                `• Perforado\n` +
                `• Troquelado especial\n\n` +
                `📦 *Empaque y Distribución:*\n` +
                `• Empaque personalizado\n` +
                `• Etiquetado de productos\n` +
                `• Logística de entrega\n\n` +
                `🏭 *VENTAJAS:*\n` +
                `• Reduce costos operativos\n` +
                `• Tecnología especializada\n` +
                `• Flexibilidad de volúmenes\n\n` +
                `📞 *Consultoría:* +52 1 221 794 6704`
    }),
    contacto: () => ({
        content: `📞 *CONTACTO ARCOEXPRESS* 🇲🇽\n\n` +
                `*DATOS DE CONTACTO:*\n\n` +
                `📱 *WhatsApp Business:* +52 1 221 794 6704\n` +
                `☎️ *Teléfono 1:* +52 222 210 61 44\n` +
                `☎️ *Teléfono 2:* +52 222 210 61 40\n` +
                `✉️ *Email:* ventas@arcoexpress.mx\n` +
                `🌐 *Web:* arcoexpress.mx\n\n` +
                `📍 *UBICACIÓN:*\n` +
                `Puebla, México\n` +
                `🚚 Envíos a toda la República\n\n` +
                `⏰ *HORARIOS DE ATENCIÓN:*\n` +
                `Lunes a Viernes: 9:00 - 18:00\n` +
                `Sábados: 9:00 - 14:00\n` +
                `*ChatBot 24/7*\n\n` +
                `💼 *ESPECIALISTAS EN:*\n` +
                `• Etiquetas térmicas\n` +
                `• Ribbons industriales\n` +
                `• Impresoras de código de barras\n\n` +
                `⚡ *+20 años de experiencia*`
    })
};

// Estadísticas globales
let chatStats = {
    totalVisits: 0,
    totalMessages: 0,
    whatsappMessages: 0,
    activeUsers: 0,
    lastMessage: null,
    startTime: new Date(),
    whatsappConnected: false
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
           `📱 *WhatsApp:* +52 1 221 794 6704\n` +
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
           `📱 *WhatsApp:* +52 1 221 794 6704`;
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
           `WhatsApp: +52 1 221 794 6704\n` +
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
           `WhatsApp: +52 1 221 794 6704\n` +
           `Web: arcoexpress.mx`;
}

// RUTA DE SALUD PARA RAILWAY (requerida)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: Math.floor((new Date() - chatStats.startTime) / 1000),
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        chatbot: 'ArcoExpress Railway Edition',
        whatsapp: chatStats.whatsappConnected ? 'connected' : 'disconnected',
        stats: {
            visits: chatStats.totalVisits,
            messages: chatStats.totalMessages,
            whatsappMessages: chatStats.whatsappMessages
        }
    });
});

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
                background: linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #007bff 100%);
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
                background: rgba(0,0,0,0.4);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0,123,255,0.3);
                border: 1px solid rgba(0,123,255,0.2);
            }
            .header h1 {
                font-size: 3em;
                margin-bottom: 10px;
                background: linear-gradient(45deg, #ffffff, #007bff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 2px 2px 4px rgba(0,123,255,0.5);
            }
            .header p {
                font-size: 1.3em;
                opacity: 0.9;
            }
            .status-bar {
                background: linear-gradient(45deg, #007bff, #0056b3);
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                font-weight: bold;
                font-size: 1.2em;
                text-align: center;
                animation: pulse 2s infinite;
                border: 1px solid rgba(255,255,255,0.1);
            }
            @keyframes pulse {
                0% { opacity: 0.8; transform: scale(1); box-shadow: 0 5px 15px rgba(0,123,255,0.4); }
                50% { opacity: 1; transform: scale(1.02); box-shadow: 0 8px 25px rgba(0,123,255,0.6); }
                100% { opacity: 0.8; transform: scale(1); box-shadow: 0 5px 15px rgba(0,123,255,0.4); }
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                margin: 40px 0;
            }
            .card {
                background: rgba(0,0,0,0.4);
                backdrop-filter: blur(10px);
                padding: 25px;
                border-radius: 20px;
                border: 1px solid rgba(0,123,255,0.3);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0,123,255,0.4);
                border-color: rgba(0,123,255,0.6);
            }
            .card h3 {
                color: #007bff;
                margin-bottom: 15px;
                font-size: 1.5em;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }
            .whatsapp-section {
                background: linear-gradient(45deg, rgba(0,123,255,0.2), rgba(0,0,0,0.3));
                padding: 30px;
                border-radius: 20px;
                margin: 30px 0;
                text-align: center;
                border: 1px solid rgba(0,123,255,0.3);
            }
            .whatsapp-btn {
                background: linear-gradient(45deg, #007bff, #0056b3);
                color: white;
                padding: 18px 35px;
                border: none;
                border-radius: 50px;
                font-size: 1.2em;
                text-decoration: none;
                display: inline-block;
                margin: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,123,255,0.4);
                border: 1px solid rgba(255,255,255,0.2);
            }
            .whatsapp-btn:hover {
                background: linear-gradient(45deg, #0056b3, #003d82);
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,123,255,0.6);
            }
            .demo-section {
                background: linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,123,255,0.1));
                padding: 25px;
                border-radius: 20px;
                margin: 30px 0;
                border: 1px solid rgba(0,123,255,0.2);
            }
            .command-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            .command-btn {
                background: rgba(0,123,255,0.3);
                border: 1px solid rgba(0,123,255,0.5);
                color: white;
                padding: 15px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            }
            .command-btn:hover {
                background: rgba(0,123,255,0.5);
                transform: scale(1.05);
                border-color: rgba(0,123,255,0.8);
            }
            .response-area {
                background: rgba(0,0,0,0.6);
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                min-height: 200px;
                white-space: pre-wrap;
                font-family: monospace;
                border: 1px solid rgba(0,123,255,0.3);
            }
            .stats-bar {
                display: flex;
                justify-content: space-around;
                background: linear-gradient(45deg, rgba(0,123,255,0.2), rgba(0,0,0,0.3));
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                flex-wrap: wrap;
                border: 1px solid rgba(0,123,255,0.2);
            }
            .stat-item {
                text-align: center;
                margin: 10px;
            }
            .stat-number {
                font-size: 2em;
                font-weight: bold;
                color: #007bff;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }
            .footer {
                text-align: center;
                margin-top: 50px;
                padding: 30px;
                background: rgba(0,0,0,0.4);
                border-radius: 20px;
                border: 1px solid rgba(0,123,255,0.2);
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
                ${chatStats.whatsappConnected ? '📱 WhatsApp Conectado' : '⚠️ WhatsApp en Configuración'}
            </div>
            
            <div class="stats-bar">
                <div class="stat-item">
                    <div class="stat-number">${chatStats.totalVisits}</div>
                    <div>Visitas</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${chatStats.totalMessages}</div>
                    <div>Mensajes Totales</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${chatStats.whatsappMessages}</div>
                    <div>WhatsApp</div>
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
                    <p><strong>WhatsApp:</strong> +52 1 221 794 6704</p>
                    <p><strong>Teléfono 1:</strong> +52 222 210 61 44</p>
                    <p><strong>Teléfono 2:</strong> +52 222 210 61 40</p>
                    <p><strong>Email:</strong> ventas@arcoexpress.mx</p>
                    <p><strong>Horario:</strong> Lun-Vie 9:00-18:00</p>
                </div>
            </div>
            
            <div class="whatsapp-section">
                <h2>📱 Conecta con nuestro ChatBot</h2>
                <p>Envía un mensaje a nuestro WhatsApp automático y recibe atención inmediata 24/7</p>
                <a href="https://wa.me/14155238886?text=join%20ordinary-choose" class="whatsapp-btn" target="_blank">
                    🤖 Conectar al ChatBot Automático
                </a>
                <p><small>📋 <strong>Instrucciones:</strong> 1) Haz clic arriba, 2) Presiona "Enviar", 3) Escribe cualquier número (1-9) para ver el menú</small></p>
                <p><small>✨ Después de conectarte, envía <strong>"1"</strong> para ver todos los productos</small></p>
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

// WEBHOOK PARA WHATSAPP - Recibe mensajes de Twilio
app.post('/webhook/whatsapp', (req, res) => {
    console.log('📱 Mensaje de WhatsApp recibido:', req.body);
    
    const incomingMessage = req.body.Body || '';
    const fromNumber = req.body.From || '';
    const toNumber = req.body.To || '';
    
    // Procesar el comando usando nuestra lógica existente
    const botResponse = processCommand(incomingMessage);
    
    // Preparar respuesta para Twilio (TwiML)
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${botResponse}</Message>
</Response>`;
    
    // Log para debugging
    console.log(`📩 De: ${fromNumber} | Mensaje: "${incomingMessage}"`);
    console.log(`🤖 Respuesta: "${botResponse.substring(0, 100)}..."`);
    
    // Actualizar estadísticas
    chatStats.totalMessages++;
    chatStats.whatsappMessages++;
    chatStats.lastMessage = new Date();
    chatStats.whatsappConnected = true;
    
    // Enviar respuesta TwiML
    res.type('text/xml');
    res.send(twimlResponse);
});

// WEBHOOK PARA ESTADO DE MENSAJES (opcional)
app.post('/webhook/status', (req, res) => {
    console.log('📊 Estado del mensaje:', req.body);
    res.sendStatus(200);
});

// Página de información de la empresa
app.get('/empresa', (req, res) => {
    res.json({
        nombre: 'ArcoExpress de México',
        especialidad: 'Especialistas en etiquetas térmicas, ribbons e impresoras',
        experiencia: 'Más de 20 años de experiencia',
        ubicacion: 'Puebla, México',
        contacto: {
            whatsapp: '+52 1 221 794 6704',
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
    console.log(`📱 WhatsApp Business: +52 1 221 794 6704`);
    console.log(`✅ Sistema listo para producción`);
});

module.exports = app;
