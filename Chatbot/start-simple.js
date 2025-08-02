// VERSIÓN SIMPLIFICADA PARA RAILWAY
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('public'));

// Página principal con información del ChatBot
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ArcoExpress ChatBot</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f0f0f0; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; color: #2c3e50; margin-bottom: 30px; }
            .feature { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #3498db; }
            .commands { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .status { text-align: center; padding: 15px; background: #fff3cd; border-radius: 8px; margin: 20px 0; }
            .contact { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            h1 { color: #2c3e50; }
            h2 { color: #34495e; }
            code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏷️ ArcoExpress ChatBot</h1>
                <p><strong>Especialistas en etiquetas térmicas, ribbons e impresoras</strong></p>
                <p>✅ <strong>Servidor funcionando correctamente en Railway</strong></p>
            </div>

            <div class="status">
                <h2>📱 Estado del Servicio</h2>
                <p>🟢 <strong>Aplicación desplegada exitosamente</strong></p>
                <p>⏰ Servidor iniciado: ${new Date().toLocaleString('es-MX')}</p>
                <p>🔗 Puerto: ${PORT}</p>
            </div>

            <div class="feature">
                <h2>🤖 Sobre el ChatBot</h2>
                <p><strong>ArcoExpress de México</strong> - Más de 20 años de experiencia</p>
                <p>📍 Puebla, México</p>
                <p>🏷️ Especialistas en:</p>
                <ul>
                    <li>Etiquetas térmicas directas y de transferencia</li>
                    <li>Ribbons de cera, resina y mixtos</li>
                    <li>Impresoras Zebra, Honeywell y TSC</li>
                    <li>Servicios de maquila e impresión</li>
                </ul>
            </div>

            <div class="commands">
                <h2>🔢 Comandos Numéricos Disponibles</h2>
                <p>El ChatBot responde a estos comandos numéricos:</p>
                <ul>
                    <li><code>1</code> - 🏷️ Catálogo de productos</li>
                    <li><code>2</code> - 🏷️ Etiquetas térmicas</li>
                    <li><code>3</code> - 🎗️ Ribbons</li>
                    <li><code>4</code> - 🖨️ Impresoras</li>
                    <li><code>5</code> - 💰 Solicitar cotización</li>
                    <li><code>6</code> - 🔧 Servicios de maquila</li>
                    <li><code>7</code> - 📞 Información de contacto</li>
                    <li><code>8</code> - ℹ️ Información de la empresa</li>
                    <li><code>9</code> - ❓ Ayuda y soporte</li>
                    <li><code>00</code> - 📋 Mostrar menú principal</li>
                </ul>
            </div>

            <div class="contact">
                <h2>📞 Contacto ArcoExpress</h2>
                <p><strong>📱 WhatsApp:</strong> +52 222 750 68 55</p>
                <p><strong>☎️ Teléfonos:</strong></p>
                <ul>
                    <li>+52 222 210 61 44</li>
                    <li>+52 222 210 61 40</li>
                </ul>
                <p><strong>📧 Email:</strong> ventas@arcoexpress.mx</p>
                <p><strong>🌐 Sitio web:</strong> arcoexpress.mx</p>
                <p><strong>⏰ Horarios:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>

            <div class="feature">
                <h2>🚀 Próximos Pasos</h2>
                <p>Para activar completamente el ChatBot de WhatsApp:</p>
                <ol>
                    <li>✅ <strong>Aplicación desplegada</strong> - El servidor está funcionando</li>
                    <li>🔄 <strong>Configurar WhatsApp Web</strong> - Requiere escaneo de QR</li>
                    <li>📱 <strong>Conectar número de negocio</strong> - WhatsApp Business</li>
                    <li>🎯 <strong>Activar comandos numéricos</strong> - Sistema 1-9, 00</li>
                </ol>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
                <p>🏷️ <strong>ArcoExpress de México</strong> - Tu mejor opción en etiquetas térmicas</p>
                <p>⚡ Más de 20 años de experiencia 🇲🇽</p>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Endpoint para verificar salud del servidor
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        port: PORT,
        service: 'ArcoExpress ChatBot',
        version: '1.0.0'
    });
});

// Endpoint para información de la empresa
app.get('/api/company', (req, res) => {
    res.json({
        name: 'ArcoExpress de México',
        speciality: 'Especialistas en etiquetas térmicas, ribbons e impresoras',
        experience: 'Más de 20 años de experiencia',
        location: 'Puebla, México',
        website: 'arcoexpress.mx',
        email: 'ventas@arcoexpress.mx',
        phones: ['+52 222 210 61 44', '+52 222 210 61 40'],
        whatsapp: '+52 222 750 68 55',
        commands: {
            '1': 'Catálogo de productos',
            '2': 'Etiquetas térmicas',
            '3': 'Ribbons',
            '4': 'Impresoras',
            '5': 'Solicitar cotización',
            '6': 'Servicios de maquila',
            '7': 'Información de contacto',
            '8': 'Información de la empresa',
            '9': 'Ayuda y soporte',
            '00': 'Menú principal'
        }
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ArcoExpress ChatBot iniciado`);
    console.log(`🌐 Servidor corriendo en puerto ${PORT}`);
    console.log(`📱 Panel disponible en: http://localhost:${PORT}`);
    console.log(`✅ Aplicación lista para Railway`);
    console.log(`⏰ Iniciado: ${new Date().toLocaleString('es-MX')}`);
});

// Manejo graceful de cierre
process.on('SIGTERM', () => {
    console.log('🔄 Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🔄 Cerrando servidor...');
    process.exit(0);
});
