# 🤖 ChatBot WhatsApp - Asistente Virtual Inteligente

Un chatbot completo y profesional para WhatsApp desarrollado con Node.js que incluye múltiples funcionalidades, sistema de base de datos, logging avanzado y comandos inteligentes.

## 🌟 Características Principales

### 🚀 Funcionalidades del Bot
- ✅ **Respuestas automáticas 24/7**
- ✅ **Comandos inteligentes** con prefijo `/`
- ✅ **Sistema de mensajes naturales**
- ✅ **Base de datos integrada** para usuarios y mensajes
- ✅ **Logging avanzado** con rotación automática
- ✅ **Estadísticas en tiempo real**
- ✅ **Backups automáticos**
- ✅ **Gestión de usuarios**
- ✅ **Sistema de recordatorios**
- ✅ **Entretenimiento** (chistes, frases)
- ✅ **Herramientas útiles** (calculadora, clima)

### 🛠️ Comandos Disponibles

#### 📋 Comandos Básicos
- `/start` - Mensaje de bienvenida
- `/help` - Guía completa de comandos
- `/menu` - Menú principal de opciones
- `/info` - Información del bot

#### 🔧 Herramientas
- `/clima [ciudad]` - Consultar el clima
- `/hora` - Fecha y hora actual
- `/calc [operación]` - Calculadora
- `/recordatorio [mensaje]` - Crear recordatorio
- `/traductor [texto]` - Traducir texto

#### 🎯 Entretenimiento
- `/chiste` - Chiste aleatorio
- `/frase` - Frase motivacional

#### 📊 Información
- `/noticias` - Noticias recientes
- `/stats` - Estadísticas del bot

## 🚀 Instalación Rápida

### 1️⃣ Requisitos Previos
```bash
# Node.js v16 o superior
node --version

# npm o yarn
npm --version
```

### 2️⃣ Clonar y Configurar
```bash
# Descargar el proyecto
cd Chatbot

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### 3️⃣ Ejecutar el Bot
```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

### 4️⃣ Conectar WhatsApp
1. Ejecuta el bot
2. Escanea el código QR que aparece en la terminal con WhatsApp
3. ¡El bot estará listo para recibir mensajes!

## 📁 Estructura del Proyecto

```
Chatbot/
├── 📄 package.json           # Configuración del proyecto
├── 📄 .env.example          # Variables de entorno ejemplo
├── 📄 README.md             # Esta documentación
├── 📁 src/                  # Código fuente principal
│   ├── 📄 index.js          # Archivo principal del bot
│   ├── 📁 handlers/         # Manejadores de eventos
│   │   ├── messageHandler.js    # Procesamiento de mensajes
│   │   └── commandProcessor.js  # Comandos avanzados
│   ├── 📁 commands/         # Comandos del bot
│   │   └── index.js         # Todos los comandos disponibles
│   ├── 📁 database/         # Sistema de base de datos
│   │   └── databaseManager.js   # Gestión de datos
│   └── 📁 utils/            # Utilidades
│       └── logger.js        # Sistema de logging
├── 📁 config/               # Configuraciones
├── 📁 data/                 # Datos del bot (se crea automáticamente)
│   ├── 📁 session/          # Sesión de WhatsApp
│   ├── 📁 logs/             # Archivos de log
│   ├── 📁 backups/          # Backups automáticos
│   └── 📄 database.json     # Base de datos local
└── 📁 utils/                # Utilidades adicionales
```

## ⚙️ Configuración Avanzada

### 🔧 Variables de Entorno (.env)

```env
# Configuración del Bot
BOT_NAME=Mi Bot de WhatsApp
BOT_VERSION=1.0.0

# Base de Datos
DB_MAX_MESSAGES=1000
AUTO_BACKUP=true
BACKUP_INTERVAL_HOURS=24

# Logging
LOG_LEVEL=info
LOG_TO_FILE=true
LOG_TO_CONSOLE=true

# APIs Externas (opcional)
OPENWEATHER_API_KEY=tu_api_key
NEWS_API_KEY=tu_api_key
```

### 📊 Sistema de Base de Datos

El bot incluye un sistema de base de datos JSON que almacena:
- **Usuarios**: Información y estadísticas de cada usuario
- **Mensajes**: Historial de conversaciones
- **Configuraciones**: Ajustes del bot
- **Estadísticas**: Métricas de uso y rendimiento

### 📝 Sistema de Logging

Logging automático con:
- **Niveles**: error, warn, info, debug, verbose
- **Rotación automática** de archivos
- **Límite de tamaño** configurable
- **Limpieza automática** de logs antiguos
- **Colores en consola** para mejor legibilidad

## 🎯 Uso del Bot

### 💬 Comandos Básicos
```
Usuario: /start
Bot: ¡Bienvenido! Soy tu asistente virtual...

Usuario: /help
Bot: 📚 GUÍA DE COMANDOS...

Usuario: /clima Madrid
Bot: 🌤️ CLIMA EN MADRID
🌡️ Temperatura: 22°C
☁️ Condición: Soleado...
```

### 🗣️ Mensajes Naturales
```
Usuario: Hola
Bot: ¡Hola! 👋 ¿En qué puedo ayudarte hoy?

Usuario: Gracias
Bot: ¡De nada! 😊 Siempre es un placer ayudar.
```

### 🧮 Herramientas
```
Usuario: /calc 2 + 2
Bot: 🧮 RESULTADO
📊 Operación: 2 + 2
🎯 Resultado: 4

Usuario: /recordatorio Reunión a las 3 PM
Bot: ✅ RECORDATORIO CREADO
📝 Mensaje: Reunión a las 3 PM...
```

## 🔧 Personalización

### 🎨 Agregar Nuevos Comandos

1. Edita `src/commands/index.js`
2. Agrega tu nueva función:

```javascript
// Nuevo comando personalizado
customCommand(args, message) {
    return {
        type: 'text',
        content: '¡Mi comando personalizado funciona!'
    };
}
```

3. Registra el comando en `src/handlers/messageHandler.js`:

```javascript
case '/micmd':
    return this.commands.customCommand(args, message);
```

### 🔌 Integrar APIs Externas

```javascript
// Ejemplo: API del clima
async getRealWeather(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await axios.get(url);
    return response.data;
}
```

### 🎨 Personalizar Respuestas

Edita los arrays de respuestas en `src/commands/index.js`:

```javascript
this.jokes = [
    'Tu chiste personalizado aquí 😂',
    'Otro chiste divertido 🤣'
];

this.quotes = [
    'Tu frase inspiradora personalizada',
    'Otra cita motivacional'
];
```

## 📊 Monitoreo y Estadísticas

### 📈 Comandos de Estadísticas
```
/stats - Ver estadísticas completas del bot
```

### 📋 Información que se rastrea:
- Número total de usuarios
- Mensajes enviados y recibidos
- Comandos más utilizados
- Tiempo de actividad del bot
- Uso de memoria y rendimiento

### 📄 Logs Disponibles
- **Errores**: Problemas y excepciones
- **Actividad**: Mensajes y comandos ejecutados
- **Rendimiento**: Tiempos de respuesta
- **Seguridad**: Eventos importantes

## 🚀 Despliegue en Producción

### 🌐 Despliegue Local
```bash
# Instalar PM2 para gestión de procesos
npm install -g pm2

# Ejecutar con PM2
pm2 start src/index.js --name "whatsapp-bot"

# Ver logs
pm2 logs whatsapp-bot

# Reiniciar
pm2 restart whatsapp-bot
```

### ☁️ Despliegue en la Nube

#### Heroku
```bash
# Crear app en Heroku
heroku create mi-whatsapp-bot

# Configurar variables de entorno
heroku config:set BOT_NAME="Mi Bot"

# Desplegar
git push heroku main
```

#### VPS/Servidor
```bash
# Clonar proyecto
git clone <repo-url>

# Instalar dependencias
npm install --production

# Configurar variables de entorno
cp .env.example .env

# Ejecutar con PM2
pm2 start ecosystem.config.js
```

## 🔒 Seguridad y Mejores Prácticas

### 🛡️ Seguridad
- ✅ **Variables de entorno** para datos sensibles
- ✅ **Validación de entrada** en todos los comandos
- ✅ **Rate limiting** para prevenir spam
- ✅ **Logging de seguridad** para eventos importantes
- ✅ **Backup automático** de datos

### 📋 Mejores Prácticas
- ✅ **Manejo de errores** robusto
- ✅ **Logging detallado** para debugging
- ✅ **Estructura modular** para fácil mantenimiento
- ✅ **Documentación completa**
- ✅ **Configuración flexible**

## 🆘 Solución de Problemas

### ❓ Problemas Comunes

**Error: "Cannot find module"**
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

**Error: "WhatsApp Web not connected"**
```bash
# Eliminar sesión y reconectar
rm -rf data/session
npm start
```

**Error de permisos en archivos**
```bash
# Dar permisos correctos
chmod 755 src/
chmod 644 src/*.js
```

### 📞 Soporte

Si encuentras problemas:
1. 📋 Revisa los logs en `data/logs/`
2. 🔍 Busca en los issues del proyecto
3. 📝 Crea un nuevo issue con detalles del error

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. 🍴 Fork el proyecto
2. 🌿 Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔄 Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **whatsapp-web.js** - Librería principal para WhatsApp Web
- **Node.js** - Runtime de JavaScript
- **Moment.js** - Manipulación de fechas
- **Axios** - Cliente HTTP

---

**¡Disfruta tu nuevo ChatBot de WhatsApp! 🤖✨**

Para más información o soporte, contacta al desarrollador.
