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
        res.status(404).json({ error: 'QR code not available' });
    }
});

// Ruta principal para el panel
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ChatBot WhatsApp - Panel de Conexión</title>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 30px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                }
                .qr-container {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin: 20px 0;
                    display: inline-block;
                }
                .qr-code {
                    max-width: 300px;
                    width: 100%;
                }
                .status {
                    padding: 10px;
                    border-radius: 10px;
                    margin: 10px 0;
                    font-weight: bold;
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
                }
                .refresh-btn:hover {
                    background: #128C7E;
                }
                .instructions {
                    text-align: left;
                    background: rgba(255,255,255,0.1);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🤖 ChatBot WhatsApp</h1>
                <h2>Panel de Conexión Remota</h2>
                
                <div id="status" class="status waiting">
                    ⏳ Esperando conexión...
                </div>
                
                <div class="qr-container">
                    <img id="qrCode" class="qr-code" src="/qr" alt="QR Code" 
                         onerror="this.style.display='none'; document.getElementById('qrError').style.display='block'">
                    <div id="qrError" style="display:none; color:#333;">
                        ❌ QR no disponible. El bot podría estar conectado o iniciándose.
                    </div>
                </div>
                
                <button class="refresh-btn" onclick="refreshQR()">
                    🔄 Actualizar QR
                </button>
                
                <div class="instructions">
                    <h3>📱 Instrucciones:</h3>
                    <ol>
                        <li><strong>Abre WhatsApp</strong> en tu teléfono</li>
                        <li>Ve a <strong>Configuración</strong> (⚙️)</li>
                        <li>Selecciona <strong>"Dispositivos vinculados"</strong></li>
                        <li>Toca <strong>"Vincular dispositivo"</strong></li>
                        <li><strong>Escanea este QR</strong> con la cámara</li>
                        <li>¡Listo! El bot estará conectado 24/7</li>
                    </ol>
                    
                    <h3>⚡ Consejos:</h3>
                    <ul>
                        <li>El QR se actualiza automáticamente cada 30 segundos</li>
                        <li>Una vez conectado, no necesitas volver a escanear</li>
                        <li>El bot funcionará aunque cierres esta página</li>
                        <li>Si tienes problemas, presiona "Actualizar QR"</li>
                    </ul>
                </div>
            </div>
            
            <script>
                let isConnected = false;
                
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
                            if (data.connected) {
                                statusDiv.className = 'status connected';
                                statusDiv.innerHTML = '✅ ¡Bot conectado exitosamente!';
                                document.querySelector('.qr-container').style.display = 'none';
                                isConnected = true;
                            } else {
                                statusDiv.className = 'status waiting';
                                statusDiv.innerHTML = '⏳ Esperando conexión...';
                                document.querySelector('.qr-container').style.display = 'block';
                                isConnected = false;
                            }
                        })
                        .catch(error => {
                            console.error('Error checking status:', error);
                        });
                }
                
                // Actualizar QR cada 30 segundos si no está conectado
                setInterval(() => {
                    if (!isConnected) {
                        refreshQR();
                    }
                    checkStatus();
                }, 30000);
                
                // Verificar estado inicial
                checkStatus();
            </script>
        </body>
        </html>
    `);
});

// Endpoint para verificar estado de conexión
app.get('/status', (req, res) => {
    // Aquí verificarías el estado real del bot
    // Por ahora retornamos un estado básico
    res.json({ 
        connected: false, // Esto se actualizará desde el bot principal
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🌐 Panel web disponible en: http://localhost:${PORT}`);
    console.log(`📱 Comparte este enlace para conexión remota`);
});

module.exports = app;
