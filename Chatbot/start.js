// SCRIPT DE INICIO RÁPIDO
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🤖 Iniciando ChatBot WhatsApp...\n');

// Verificar si existe .env
if (!fs.existsSync('.env')) {
    console.log('⚠️  Archivo .env no encontrado. Creando desde .env.example...');
    if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env');
        console.log('✅ Archivo .env creado. Puedes editarlo según tus necesidades.\n');
    }
}

// Verificar si existe node_modules
if (!fs.existsSync('node_modules')) {
    console.log('📦 Instalando dependencias...');
    const install = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true
    });
    
    install.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Dependencias instaladas correctamente.\n');
            startBot();
        } else {
            console.log('❌ Error al instalar dependencias.');
            process.exit(1);
        }
    });
} else {
    startBot();
}

function startBot() {
    console.log('🚀 Iniciando el bot...\n');
    console.log('📱 Escanea el código QR que aparecerá para conectar WhatsApp\n');
    console.log('⭐ Una vez conectado, envía /start para comenzar\n');
    console.log('🛑 Presiona Ctrl+C para detener el bot\n');
    console.log('='.repeat(50));
    
    const bot = spawn('node', ['src/index.js'], {
        stdio: 'inherit',
        shell: true
    });
    
    bot.on('close', (code) => {
        console.log(`\n🛑 Bot detenido con código: ${code}`);
    });
}

// Manejar interrupciones
process.on('SIGINT', () => {
    console.log('\n\n👋 ¡Hasta luego! Gracias por usar el ChatBot WhatsApp');
    process.exit(0);
});
