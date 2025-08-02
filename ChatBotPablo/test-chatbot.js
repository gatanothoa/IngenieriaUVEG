// PRUEBA RÁPIDA DEL CHATBOT ARCOEXPRESS
console.log('🤖 ChatBot ArcoExpress - Prueba de Inicialización\n');

// Verificar que el archivo .env existe
const fs = require('fs');
const path = require('path');

if (fs.existsSync('.env')) {
    console.log('✅ Archivo .env encontrado');
    
    // Cargar variables de entorno
    require('dotenv').config();
    
    console.log('📋 Configuración cargada:');
    console.log(`🏢 Empresa: ${process.env.COMPANY_NAME}`);
    console.log(`📞 Teléfono: ${process.env.COMPANY_PHONE}`);
    console.log(`📧 Email: ${process.env.COMPANY_EMAIL}`);
    console.log(`🌐 Web: ${process.env.COMPANY_WEBSITE}`);
    console.log(`🤖 Bot: ${process.env.BOT_NAME}`);
    
} else {
    console.log('❌ Archivo .env no encontrado');
    console.log('💡 Creando archivo .env desde .env.example...');
    
    if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env');
        console.log('✅ Archivo .env creado exitosamente');
    }
}

// Verificar dependencias principales
try {
    console.log('\n🔍 Verificando dependencias...');
    
    const { Client } = require('whatsapp-web.js');
    console.log('✅ whatsapp-web.js - OK');
    
    const qrcode = require('qrcode-terminal');
    console.log('✅ qrcode-terminal - OK');
    
    const express = require('express');
    console.log('✅ express - OK');
    
    console.log('\n🎯 ¡Todas las dependencias están correctas!');
    console.log('🚀 El ChatBot ArcoExpress está listo para funcionar.');
    
} catch (error) {
    console.error('❌ Error al verificar dependencias:', error.message);
    console.log('💡 Ejecuta: npm install');
}
