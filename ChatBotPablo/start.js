// SCRIPT DE INICIO RÁPIDO - PLANTILLA UNIVERSAL
const fs = require('fs');
const path = require('path');

console.log('🤖 INICIANDO CHATBOT WHATSAPP - PLANTILLA UNIVERSAL');
console.log('=' .repeat(60));

// Verificar si existe el archivo .env
const envFile = path.join(__dirname, '.env');
if (!fs.existsSync(envFile)) {
    console.log('⚠️  ADVERTENCIA: No se encontró el archivo .env');
    console.log('');
    console.log('📋 PASOS PARA CONFIGURAR:');
    console.log('1. Copia el archivo .env.example como .env');
    console.log('2. Edita el archivo .env con los datos de tu empresa');
    console.log('3. Ejecuta el bot nuevamente');
    console.log('');
    console.log('💡 EJEMPLO:');
    console.log('   cp .env.example .env');
    console.log('   # Luego edita .env con tus datos');
    console.log('');
    process.exit(1);
}

// Verificar variables de entorno críticas
require('dotenv').config();

const requiredVars = [
    'COMPANY_NAME',
    'COMPANY_PHONE',
    'COMPANY_EMAIL'
];

const missingVars = requiredVars.filter(varName => !process.env[varName] || process.env[varName].includes('tuempresa') || process.env[varName].includes('XXXXXXXXXX'));

if (missingVars.length > 0) {
    console.log('❌ FALTAN CONFIGURACIONES REQUERIDAS:');
    console.log('');
    missingVars.forEach(varName => {
        console.log(`   ${varName}: ${process.env[varName] || 'NO DEFINIDA'}`);
    });
    console.log('');
    console.log('📝 Edita el archivo .env y personaliza estos valores:');
    console.log('');
    console.log('COMPANY_NAME="Nombre de tu Empresa"');
    console.log('COMPANY_PHONE="+52XXXXXXXXXX"');
    console.log('COMPANY_EMAIL="contacto@tuempresa.com"');
    console.log('');
    process.exit(1);
}

// Verificar que Node.js sea compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.substring(1).split('.')[0]);

if (majorVersion < 16) {
    console.log(`❌ Versión de Node.js no compatible: ${nodeVersion}`);
    console.log('📋 Se requiere Node.js v16 o superior');
    console.log('💡 Visita https://nodejs.org para actualizar');
    process.exit(1);
}

// Verificar dependencias
const packageJson = require('./package.json');
const dependencies = Object.keys(packageJson.dependencies);

console.log('🔍 Verificando dependencias...');

for (const dep of dependencies) {
    try {
        require.resolve(dep);
    } catch (error) {
        console.log(`❌ Dependencia faltante: ${dep}`);
        console.log('📋 Ejecuta: npm install');
        process.exit(1);
    }
}

console.log('✅ Todas las dependencias están instaladas');
console.log('');

// Mostrar configuración actual
console.log('⚙️  CONFIGURACIÓN ACTUAL:');
console.log('=' .repeat(40));
console.log(`🏢 Empresa: ${process.env.COMPANY_NAME}`);
console.log(`📞 Teléfono: ${process.env.COMPANY_PHONE}`);
console.log(`📧 Email: ${process.env.COMPANY_EMAIL}`);
console.log(`🌐 Web: ${process.env.COMPANY_WEBSITE || 'No configurado'}`);
console.log(`🤖 Bot: ${process.env.BOT_NAME || 'ChatBot Assistant'}`);
console.log('=' .repeat(40));
console.log('');

// Verificar estructura de carpetas
const directories = ['./data', './data/logs', './data/backups'];
directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Creada carpeta: ${dir}`);
    }
});

// Iniciando el bot principal
console.log('🚀 Iniciando el bot...');
console.log('');

try {
    require('./src/index.js');
} catch (error) {
    console.error('❌ Error fatal iniciando el bot:', error.message);
    console.log('');
    console.log('🔧 POSIBLES SOLUCIONES:');
    console.log('1. Verificar que todas las dependencias estén instaladas: npm install');
    console.log('2. Verificar configuración en archivo .env');
    console.log('3. Revisar logs en la carpeta data/logs/');
    console.log('4. Reiniciar el proceso');
    console.log('');
    process.exit(1);
}
