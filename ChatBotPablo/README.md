# 🤖 ChatBot WhatsApp - Plantilla Universal 2.0

Una plantilla completa y personalizable para crear chatbots de WhatsApp profesionales para cualquier empresa o negocio. **Ahora con panel web para conexión remota y deploy en la nube.**

## 🚀 Características Principales

### 🔧 Core Features
- ✅ **Fácil personalización** para cualquier empresa
- ✅ **Comandos predefinidos** y extensibles
- ✅ **Base de datos local** para usuarios y mensajes
- ✅ **Sistema de logging** avanzado
- ✅ **Respuestas inteligentes** con IA
- ✅ **Programación de tareas** automáticas
- ✅ **Configuración por variables** de entorno

### 🌐 Nuevas Funcionalidades 2.0
- ✅ **Panel web** para conexión remota
- ✅ **QR code persistente** (5 minutos de duración)
- ✅ **Deploy en la nube** (Railway, Heroku, Render)
- ✅ **URL pública** para conexión desde cualquier lugar
- ✅ **Interface responsive** para móviles y desktop
- ✅ **Monitoreo en tiempo real** del estado de conexión
- ✅ **Guías completas** de despliegue remoto

## 📋 Requisitos Previos

- Node.js v16 o superior
- npm v8 o superior
- Cuenta de WhatsApp

## 🛠️ Instalación y Uso

### 📱 Opción 1: Inicio Rápido con Panel Web (RECOMENDADO)
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar con panel web
node start-web.js

# 3. Abrir navegador en: http://localhost:3000
# 4. Escanear QR code desde WhatsApp
# 5. ¡Listo!
```

### 🖥️ Opción 2: Inicio Tradicional (Solo Terminal)
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar bot
npm start

# 3. Escanear QR en terminal
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con tus datos
nano .env
```

### 4. Ejecutar el bot
```bash
npm start
```

## ⚙️ Configuración Personalizada

### Editar archivo `.env`

**OBLIGATORIO - Datos de tu empresa:**
```bash
COMPANY_NAME="Tu Empresa S.A."
COMPANY_PHONE="+52XXXXXXXXXX"
COMPANY_EMAIL="contacto@tuempresa.com"
COMPANY_WEBSITE="https://tuempresa.com"
COMPANY_ADDRESS="Tu Ciudad, País"
```

**OPCIONAL - Productos y servicios:**
```bash
COMPANY_PRODUCTS="Producto A,Producto B,Producto C"
COMPANY_SERVICES="Servicio 1,Servicio 2,Servicio 3"
```

**OPCIONAL - Horarios:**
```bash
BUSINESS_HOURS_START="09:00"
BUSINESS_HOURS_END="18:00"
BUSINESS_DAYS="Lunes a Viernes"
```

## 📱 Comandos Disponibles

### Comandos Básicos
- `/start` - Inicializar el bot
- `/help` - Mostrar ayuda
- `/info` - Información de la empresa
- `/contacto` - Datos de contacto
- `/horarios` - Horarios de atención

### Comandos de Negocio
- `/productos` - Lista de productos
- `/servicios` - Lista de servicios
- `/cotizar` - Solicitar cotización
- `/soporte` - Contactar soporte

### Comandos Útiles
- `/clima [ciudad]` - Consultar clima
- `/calc [operación]` - Calculadora
- `/qr [texto]` - Generar código QR
- `/chiste` - Contar un chiste

### Comandos de Admin (solo números autorizados)
- `/stats` - Estadísticas del bot
- `/users` - Lista de usuarios
- `/broadcast [mensaje]` - Mensaje masivo
- `/backup` - Crear respaldo manual

## 🔧 Personalización Avanzada

### Agregar nuevos comandos
1. Editar `src/commands/index.js`
2. Agregar tu función de comando
3. Reiniciar el bot

### Modificar respuestas automáticas
1. Editar `src/handlers/messageHandler.js`
2. Personalizar las respuestas en `processNaturalMessage()`

### Configurar APIs externas
1. Obtener API keys (OpenWeather, Gemini, etc.)
2. Agregar al archivo `.env`
3. Usar en los comandos correspondientes

## 📊 Estructura del Proyecto

```
ChatBotPablo/
├── src/
│   ├── index.js              # Archivo principal
│   ├── handlers/
│   │   ├── messageHandler.js # Procesador de mensajes
│   │   └── commandProcessor.js # Procesador de comandos
│   ├── commands/
│   │   └── index.js          # Todos los comandos
│   ├── database/
│   │   └── databaseManager.js # Gestor de base de datos
│   └── utils/
│       └── logger.js         # Sistema de logs
├── config/                   # Configuraciones
├── data/                     # Base de datos local
├── utils/                    # Utilidades adicionales
├── .env.example             # Plantilla de configuración
├── .gitignore              # Archivos a ignorar
├── package.json            # Dependencias
├── start.js               # Script de inicio
└── README.md             # Este archivo
```

## 🔒 Seguridad

- Los números de admin se configuran en `ADMIN_NUMBERS`
- Límite de mensajes por minuto configurable
- Logs detallados de todas las actividades
- Base de datos local (no en la nube)

## 🆘 Solución de Problemas

### Error: "Cannot find module 'whatsapp-web.js'"
```bash
npm install whatsapp-web.js
```

### Error: "Cannot execute scripts"
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### El QR no aparece
- Verificar conexión a internet
- Reiniciar el bot
- Verificar que WhatsApp Web esté disponible

### Bot no responde
- Verificar archivo `.env`
- Revisar logs en carpeta `data/logs/`
- Verificar que el número esté registrado

## 📞 Soporte

Para soporte técnico:
- Revisar la documentación
- Verificar los logs del sistema
- Contactar al desarrollador

## 📝 Licencia

MIT License - Libre para uso comercial y personal

---

**¡Listo para personalizar tu chatbot! 🚀**
