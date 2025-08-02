const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.WEB_PORT || 3000;

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para servir el QR code
app.get('/qr', (req, res) => {
    const qrPath = path.join(__dirname, '../../data/qr.png');
    
    if (fs.existsSync(qrPath)) {
        res.sendFile(qrPath);
    } else {
        res.status(404).json({ error: 'QR code not available yet' });
    }
});

// Ruta principal para el panel
app.get('/', (req, res) => {
    const companyName = process.env.COMPANY_NAME || 'ChatBot WhatsApp';
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${companyName} - Panel de Conexión</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: white;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    width: 100%;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .logo { font-size: 3em; margin-bottom: 10px; }
                .company-name { font-size: 2em; margin-bottom: 10px; font-weight: bold; }
                .subtitle { opacity: 0.9; margin-bottom: 30px; }
                .qr-container {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin: 30px 0;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .qr-code { max-width: 280px; width: 100%; }
                .status {
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px 0;
                    font-weight: bold;
                    font-size: 1.1em;
                }
                .connected { background: #4CAF50; }
                .disconnected { background: #f44336; }
                .waiting { background: #ff9800; }
                .refresh-btn {
                    background: #25D366;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 16px;
                    cursor: pointer;
                    margin: 10px;
                    transition: all 0.3s ease;
                }
                .refresh-btn:hover { background: #128C7E; transform: translateY(-2px); }
                .instructions {
                    text-align: left;
                    background: rgba(255,255,255,0.1);
                    padding: 25px;
                    border-radius: 15px;
                    margin: 30px 0;
                    line-height: 1.6;
                }
                .instructions h3 { margin-bottom: 15px; color: #fff; }
                .instructions ol, .instructions ul { padding-left: 20px; }
                .instructions li { margin-bottom: 8px; }
                .footer { margin-top: 30px; opacity: 0.8; font-size: 0.9em; }
                @media (max-width: 768px) {
                    .container { padding: 20px; }
                    .company-name { font-size: 1.5em; }
                    .qr-code { max-width: 250px; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">🤖</div>
                <div class="company-name">${companyName}</div>
                <div class="subtitle">Panel de Conexión WhatsApp</div>
                
                <div id="status" class="status waiting">
                    ⏳ Verificando estado de conexión...
                </div>
                
                <div id="qrSection" class="qr-container">
                    <img id="qrCode" class="qr-code" src="/qr" alt="QR Code para WhatsApp" 
                         onerror="this.style.display='none'; document.getElementById('qrError').style.display='block'">
                    <div id="qrError" style="display:none; color:#333; padding:20px;">
                        ⏳ Generando código QR...<br>
                        <small>El bot se está iniciando, por favor espera unos segundos</small>
                    </div>
                </div>
                
                <button class="refresh-btn" onclick="refreshQR()">
                    🔄 Actualizar QR
                </button>
                
                <div class="instructions">
                    <h3>📱 Cómo conectar WhatsApp:</h3>
                    <ol>
                        <li><strong>Abre WhatsApp</strong> en tu teléfono</li>
                        <li>Ve a <strong>Configuración</strong> (⚙️)</li>
                        <li>Selecciona <strong>"Dispositivos vinculados"</strong></li>
                        <li>Toca <strong>"Vincular dispositivo"</strong></li>
                        <li><strong>Escanea este QR</strong> con la cámara</li>
                        <li>¡Listo! El bot estará conectado 24/7</li>
                    </ol>
                    
                    <h3>⚡ Información importante:</h3>
                    <ul>
                        <li>El QR se actualiza automáticamente cada 2 minutos</li>
                        <li>Una vez conectado, no necesitas volver a escanear</li>
                        <li>El bot funcionará aunque cierres esta página</li>
                        <li>Si hay problemas, presiona "Actualizar QR"</li>
                        <li>La conexión es segura y privada</li>
                    </ul>
                </div>
                
                <div class="footer">
                    <p>🔒 Conexión segura • ⚡ Disponible 24/7 • 💬 Asistente inteligente</p>
                </div>
            </div>
            
            <script>
                let isConnected = false;
                let checkInterval;
                
                function refreshQR() {
                    const qrImg = document.getElementById('qrCode');
                    const timestamp = new Date().getTime();
                    qrImg.src = '/qr?' + timestamp;
                    qrImg.style.display = 'block';
                    document.getElementById('qrError').style.display = 'none';
                }
                
                function checkStatus() {
                    fetch('/status')
                        .then(response => response.json())
                        .then(data => {
                            const statusDiv = document.getElementById('status');
                            const qrSection = document.getElementById('qrSection');
                            
                            if (data.connected) {
                                statusDiv.className = 'status connected';
                                statusDiv.innerHTML = '✅ ¡Bot conectado exitosamente! 🎉';
                                qrSection.style.display = 'none';
                                isConnected = true;
                                
                                if (checkInterval) {
                                    clearInterval(checkInterval);
                                }
                            } else {
                                statusDiv.className = 'status waiting';
                                statusDiv.innerHTML = '⏳ Esperando conexión de WhatsApp...';
                                qrSection.style.display = 'block';
                                isConnected = false;
                            }
                        })
                        .catch(error => {
                            console.error('Error checking status:', error);
                            const statusDiv = document.getElementById('status');
                            statusDiv.className = 'status disconnected';
                            statusDiv.innerHTML = '⚠️ Error de conexión con el servidor';
                        });
                }
                
                // Verificar estado cada 5 segundos
                checkStatus();
                checkInterval = setInterval(checkStatus, 5000);
                
                // Actualizar QR cada 2 minutos si no está conectado
                setInterval(() => {
                    if (!isConnected) {
                        refreshQR();
                    }
                }, 120000);
            </script>
        </body>
        </html>
    `);
});

// Endpoint para verificar estado de conexión
app.get('/status', (req, res) => {
    const sessionPath = path.join(__dirname, '../../data/session');
    const connected = fs.existsSync(sessionPath) && fs.readdirSync(sessionPath).length > 0;
    res.json({ 
        connected,
        timestamp: new Date().toISOString(),
        company: process.env.COMPANY_NAME || 'ChatBot WhatsApp'
    });
});

app.listen(PORT, () => {
    console.log(`🌐 Panel web disponible en: http://localhost:${PORT}`);
    console.log(`📱 Comparte este enlace para conexión remota`);
});

module.exports = app;
