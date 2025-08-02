// CHATBOT WHATSAPP - INICIO RÁPIDO CON QR PERSISTENTE
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');

// Servidor web simple
const app = express();
const port = 3000;

let qrCodeData = '';
let isConnected = false;
let connectionStatus = 'Iniciando...';

// Configurar archivos estáticos
app.use(express.static('public'));

// Página principal con QR
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ChatBot ArcoExpress - Conexión WhatsApp</title>
        <meta charset="UTF-8">
        <style>
            body { 
                font-family: Arial, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0; 
                padding: 20px;
                color: white;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            }
            .header {
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                font-size: 2.5em;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .status {
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                font-weight: bold;
                font-size: 1.2em;
            }
            .status.connecting { background: rgba(255,193,7,0.8); color: #333; }
            .status.connected { background: rgba(40,167,69,0.8); }
            .status.error { background: rgba(220,53,69,0.8); }
            .qr-container {
                background: white;
                padding: 20px;
                border-radius: 15px;
                margin: 20px 0;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            }
            .qr-code {
                max-width: 100%;
                height: auto;
            }
            .refresh-btn {
                background: #28a745;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 25px;
                font-size: 1.1em;
                cursor: pointer;
                margin: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            }
            .refresh-btn:hover {
                background: #218838;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            .instructions {
                background: rgba(255,255,255,0.1);
                padding: 20px;
                border-radius: 15px;
                margin-top: 20px;
                text-align: left;
            }
            .instructions h3 {
                color: #ffeb3b;
                margin-top: 0;
            }
            .instructions ol {
                padding-left: 20px;
            }
            .instructions li {
                margin: 10px 0;
                line-height: 1.6;
            }
            .company-info {
                margin-top: 30px;
                padding: 20px;
                background: rgba(255,255,255,0.05);
                border-radius: 15px;
            }
        </style>
        <script>
            function refreshQR() {
                location.reload();
            }
            
            // Auto-refresh cada 10 segundos
            setInterval(() => {
                fetch('/status')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('status').textContent = data.status;
                        document.getElementById('status').className = 'status ' + data.class;
                        
                        if (data.qr && data.qr !== document.getElementById('qr-img').src) {
                            document.getElementById('qr-img').src = data.qr;
                        }
                    })
                    .catch(console.error);
            }, 10000);
        </script>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 ChatBot ArcoExpress</h1>
                <p>Panel de Conexión WhatsApp Business</p>
            </div>
            
            <div id="status" class="status ${isConnected ? 'connected' : 'connecting'}">
                ${connectionStatus}
            </div>
            
            ${qrCodeData ? `
                <div class="qr-container">
                    <h3>📱 Escanea este código QR</h3>
                    <img id="qr-img" src="${qrCodeData}" alt="Código QR" class="qr-code">
                </div>
                <button onclick="refreshQR()" class="refresh-btn">
                    🔄 Actualizar QR
                </button>
            ` : `
                <div class="qr-container">
                    <h3>⏳ Generando código QR...</h3>
                    <p>Por favor espera mientras se genera el código QR</p>
                </div>
            `}
            
            <div class="instructions">
                <h3>📋 Instrucciones para conectar:</h3>
                <ol>
                    <li><strong>Abre WhatsApp Business</strong> en tu teléfono</li>
                    <li>Ve a <strong>Configuración (⚙️)</strong></li>
                    <li>Selecciona <strong>"Dispositivos vinculados"</strong></li>
                    <li>Toca <strong>"Vincular un dispositivo"</strong></li>
                    <li><strong>Escanea el código QR</strong> de arriba</li>
                    <li>¡Listo! El bot estará conectado 24/7</li>
                </ol>
            </div>
            
            <div class="company-info">
                <h3>🏢 ArcoExpress de México</h3>
                <p><strong>📞 WhatsApp Business:</strong> +52 221 794 6704</p>
                <p><strong>🏷️ Especializados en:</strong> Etiquetas térmicas, ribbons e impresoras</p>
                <p><strong>⚡ Experiencia:</strong> Más de 20 años en Puebla, México</p>
            </div>
        </div>
    </body>
    </html>
    `);
});

// API para estado
app.get('/status', (req, res) => {
    res.json({
        status: connectionStatus,
        connected: isConnected,
        qr: qrCodeData,
        class: isConnected ? 'connected' : (qrCodeData ? 'connecting' : 'error')
    });
});

// Configurar cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'arcoexpress-bot',
        dataPath: './session-data'
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
            '--disable-gpu'
        ]
    }
});

// Generar QR
client.on('qr', async (qr) => {
    console.log('📱 Código QR generado');
    
    // Mostrar en terminal
    qrcode.generate(qr, { small: true });
    
    // Generar imagen base64 para web
    try {
        qrCodeData = await QRCode.toDataURL(qr, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });
        connectionStatus = '📱 Escanea el código QR con WhatsApp Business';
        console.log('✅ QR disponible en: http://localhost:3000');
    } catch (error) {
        console.error('❌ Error generando QR:', error);
        connectionStatus = '❌ Error generando código QR';
    }
});

// Cliente listo
client.on('ready', () => {
    console.log('✅ ChatBot ArcoExpress conectado correctamente!');
    isConnected = true;
    connectionStatus = '✅ ¡ChatBot conectado y funcionando!';
    qrCodeData = ''; // Limpiar QR ya que ya está conectado
});

// Desconectado
client.on('disconnected', (reason) => {
    console.log('⚠️ ChatBot desconectado:', reason);
    isConnected = false;
    connectionStatus = '⚠️ Desconectado - Generando nuevo QR...';
    qrCodeData = '';
});

// Error de autenticación
client.on('auth_failure', () => {
    console.log('❌ Error de autenticación');
    isConnected = false;
    connectionStatus = '❌ Error de autenticación - Nuevo QR requerido';
    qrCodeData = '';
});

// Mensajes (básico)
client.on('message', async (message) => {
    if (message.body === '1') {
        await message.reply('🏷️ *PRODUCTOS ARCOEXPRESS*\\n\\n*Especialistas en:*\\n• Etiquetas térmicas\\n• Ribbons\\n• Impresoras industriales\\n\\n📞 *WhatsApp:* +52 221 794 6704');
    }
});

// Iniciar servidor web
app.listen(port, () => {
    console.log(`🌐 Servidor web iniciado en http://localhost:${port}`);
    console.log('📱 El código QR aparecerá aquí y en el navegador');
});

// Inicializar cliente
console.log('🚀 Iniciando ChatBot ArcoExpress...');
client.initialize();
