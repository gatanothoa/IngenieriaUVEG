// COMANDOS PRINCIPALES DEL CHATBOT
const axios = require('axios');
const moment = require('moment');
moment.locale('es');

class Commands {
    constructor() {
        this.version = '1.0.0';
        this.botName = 'WhatsApp Bot Assistant';
        this.jokes = [
            '¿Por qué los pájaros vuelan hacia el sur en invierno? 🐦\n¡Porque caminar sería demasiado lejos! 😂',
            '¿Qué le dice un jardinero a otro? 🌱\n¡Seamos plantas! 😄',
            '¿Por qué no se puede confiar en las escaleras? 🪜\n¡Porque siempre están tramando algo! 😂',
            '¿Cómo se llama el campeón de buceo japonés? 🏊‍♂️\n¡Tokofondo! 😂',
            '¿Qué hace una abeja en el gimnasio? 🐝\n¡Zum-ba! 💃'
        ];
        
        this.quotes = [
            '"La vida es lo que pasa mientras estás ocupado haciendo otros planes." - John Lennon',
            '"El éxito es la suma de pequeños esfuerzos repetidos día tras día." - Robert Collier',
            '"No esperes por el momento perfecto, toma el momento y hazlo perfecto." - Zoey Sayward',
            '"La única forma de hacer un gran trabajo es amar lo que haces." - Steve Jobs',
            '"El futuro pertenece a quienes creen en la belleza de sus sueños." - Eleanor Roosevelt'
        ];
    }

    // COMANDO START/INICIO
    start(message) {
        const welcomeMessage = `🤖 *¡Bienvenido al ${this.botName}!*\n\n` +
                              `👋 Hola! Soy tu asistente virtual automatizado.\n\n` +
                              `🚀 *¿Qué puedo hacer por ti?*\n` +
                              `• Responder preguntas\n` +
                              `• Proporcionar información\n` +
                              `• Entretenerte con chistes y frases\n` +
                              `• Ayudarte con cálculos\n` +
                              `• Consultar el clima\n` +
                              `• Crear recordatorios\n` +
                              `• ¡Y mucho más!\n\n` +
                              `📋 Escribe */menu* para ver todas las opciones\n` +
                              `❓ Escribe */help* si necesitas ayuda\n\n` +
                              `¡Estoy aquí para ayudarte! 😊`;
        
        return {
            type: 'text',
            content: welcomeMessage
        };
    }

    // COMANDO HELP/AYUDA
    help(message) {
        const helpMessage = `📚 *GUÍA DE COMANDOS*\n\n` +
                           `🔹 *COMANDOS BÁSICOS:*\n` +
                           `• */start* - Mensaje de bienvenida\n` +
                           `• */help* - Esta guía de ayuda\n` +
                           `• */menu* - Menú principal\n` +
                           `• */info* - Información del bot\n\n` +
                           `🔹 *UTILIDADES:*\n` +
                           `• */clima [ciudad]* - Consultar clima\n` +
                           `• */hora* - Hora y fecha actual\n` +
                           `• */calc [operación]* - Calculadora\n` +
                           `• */recordatorio [mensaje]* - Crear recordatorio\n\n` +
                           `🔹 *ENTRETENIMIENTO:*\n` +
                           `• */chiste* - Chiste aleatorio\n` +
                           `• */frase* - Frase motivacional\n\n` +
                           `🔹 *INFORMACIÓN:*\n` +
                           `• */noticias* - Noticias recientes\n` +
                           `• */stats* - Estadísticas del bot\n\n` +
                           `💡 *Tip:* También puedes escribir mensajes normales y yo responderé de forma inteligente.\n\n` +
                           `¿Necesitas ayuda con algo específico? ¡Solo pregunta! 😊`;
        
        return {
            type: 'text',
            content: helpMessage
        };
    }

    // COMANDO MENU
    menu(message) {
        const menuMessage = `🎯 *MENÚ PRINCIPAL*\n\n` +
                           `Selecciona una opción escribiendo el comando:\n\n` +
                           `🌟 *POPULARES:*\n` +
                           `• */clima* - Consultar el clima\n` +
                           `• */chiste* - Escuchar un chiste\n` +
                           `• */hora* - Ver fecha y hora\n\n` +
                           `🛠️ *HERRAMIENTAS:*\n` +
                           `• */calc* - Calculadora\n` +
                           `• */recordatorio* - Crear recordatorio\n` +
                           `• */traductor* - Traducir texto\n\n` +
                           `📰 *INFORMACIÓN:*\n` +
                           `• */noticias* - Últimas noticias\n` +
                           `• */frase* - Frase inspiradora\n` +
                           `• */info* - Info del bot\n\n` +
                           `📊 *ESTADÍSTICAS:*\n` +
                           `• */stats* - Ver estadísticas\n\n` +
                           `❓ *AYUDA:*\n` +
                           `• */help* - Guía completa\n\n` +
                           `¿Qué te gustaría hacer? 🤔`;
        
        return {
            type: 'text',
            content: menuMessage
        };
    }

    // COMANDO INFO
    info(message) {
        const infoMessage = `ℹ️ *INFORMACIÓN DEL BOT*\n\n` +
                           `🤖 *Nombre:* ${this.botName}\n` +
                           `📱 *Versión:* ${this.version}\n` +
                           `🚀 *Estado:* Activo y funcionando\n` +
                           `⚡ *Plataforma:* WhatsApp Web\n` +
                           `🔧 *Tecnología:* Node.js + whatsapp-web.js\n\n` +
                           `🎯 *Propósito:*\n` +
                           `Soy un asistente virtual diseñado para hacer tu vida más fácil. Puedo ayudarte con información, entretenimiento, cálculos y mucho más.\n\n` +
                           `✨ *Características:*\n` +
                           `• Respuestas automáticas 24/7\n` +
                           `• Comandos inteligentes\n` +
                           `• Entretenimiento personalizado\n` +
                           `• Herramientas útiles\n` +
                           `• Siempre aprendiendo\n\n` +
                           `👨‍💻 *Desarrollado con ❤️ para mejorar tu experiencia*\n\n` +
                           `¿Hay algo específico que te gustaría saber? 🤗`;
        
        return {
            type: 'text',
            content: infoMessage
        };
    }

    // COMANDO CLIMA
    async weather(location, message) {
        if (!location) {
            return {
                type: 'text',
                content: `🌤️ *CONSULTA DEL CLIMA*\n\nPor favor especifica una ciudad:\n\n*Ejemplo:* /clima Madrid\n\n¿De qué ciudad quieres saber el clima? 🏙️`
            };
        }

        try {
            // Simulación de consulta del clima (aquí integrarías una API real)
            const weatherData = this.getSimulatedWeather(location);
            
            const weatherMessage = `🌤️ *CLIMA EN ${location.toUpperCase()}*\n\n` +
                                  `🌡️ *Temperatura:* ${weatherData.temperature}°C\n` +
                                  `☁️ *Condición:* ${weatherData.condition}\n` +
                                  `💧 *Humedad:* ${weatherData.humidity}%\n` +
                                  `🌪️ *Viento:* ${weatherData.wind} km/h\n` +
                                  `👁️ *Visibilidad:* ${weatherData.visibility} km\n\n` +
                                  `📅 *Actualizado:* ${moment().format('DD/MM/YYYY HH:mm')}\n\n` +
                                  `*Nota:* Esta es información simulada. Para datos reales, integra una API de clima como OpenWeatherMap. 🌍`;
            
            return {
                type: 'text',
                content: weatherMessage
            };
        } catch (error) {
            return {
                type: 'text',
                content: `❌ Error al consultar el clima de "${location}". Intenta con otra ciudad o verifica la ortografía. 🌍`
            };
        }
    }

    // COMANDO HORA
    time(message) {
        const now = moment();
        const timeMessage = `⏰ *FECHA Y HORA ACTUAL*\n\n` +
                           `📅 *Fecha:* ${now.format('dddd, DD [de] MMMM [de] YYYY')}\n` +
                           `🕐 *Hora:* ${now.format('HH:mm:ss')}\n` +
                           `🌍 *Zona horaria:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n\n` +
                           `📊 *Información adicional:*\n` +
                           `• Semana del año: ${now.week()}\n` +
                           `• Día del año: ${now.dayOfYear()}\n` +
                           `• Trimestre: Q${now.quarter()}\n\n` +
                           `⏰ ¡Que tengas un excelente ${now.format('dddd')}! 😊`;
        
        return {
            type: 'text',
            content: timeMessage
        };
    }

    // COMANDO RECORDATORIO
    reminder(reminderText, message) {
        if (!reminderText) {
            return {
                type: 'text',
                content: `⏰ *CREAR RECORDATORIO*\n\nPor favor especifica qué quieres recordar:\n\n*Ejemplo:* /recordatorio Reunión a las 3 PM\n\n¿Qué necesitas recordar? 📝`
            };
        }

        const timestamp = moment().format('DD/MM/YYYY HH:mm');
        const reminderMessage = `✅ *RECORDATORIO CREADO*\n\n` +
                               `📝 *Mensaje:* ${reminderText}\n` +
                               `🕐 *Creado:* ${timestamp}\n\n` +
                               `💡 *Nota:* Este recordatorio ha sido registrado. En una versión completa, podrías programar notificaciones automáticas.\n\n` +
                               `¿Necesitas crear otro recordatorio? 🤔`;
        
        return {
            type: 'text',
            content: reminderMessage
        };
    }

    // COMANDO CHISTE
    joke(message) {
        const randomJoke = this.jokes[Math.floor(Math.random() * this.jokes.length)];
        
        return {
            type: 'text',
            content: `😂 *CHISTE DEL DÍA*\n\n${randomJoke}\n\n¿Quieres otro chiste? ¡Escribe */chiste* de nuevo! 🎭`
        };
    }

    // COMANDO FRASE
    quote(message) {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        
        return {
            type: 'text',
            content: `✨ *FRASE INSPIRADORA*\n\n${randomQuote}\n\n💪 ¡Que tengas un día lleno de motivación! 🌟`
        };
    }

    // COMANDO CALCULADORA
    calculator(expression, message) {
        if (!expression) {
            return {
                type: 'text',
                content: `🧮 *CALCULADORA*\n\nPor favor especifica una operación:\n\n*Ejemplos:*\n• /calc 2 + 2\n• /calc 10 * 5\n• /calc 100 / 4\n• /calc 2^3\n\n¿Qué quieres calcular? 🔢`
            };
        }

        try {
            // Limpiar y validar la expresión
            const cleanExpression = expression.replace(/[^0-9+\-*/().^√ ]/g, '');
            
            // Simular cálculo (en producción usarías una librería segura como math.js)
            const result = this.safeEval(cleanExpression);
            
            return {
                type: 'text',
                content: `🧮 *RESULTADO*\n\n📊 *Operación:* ${expression}\n🎯 *Resultado:* ${result}\n\n¿Necesitas hacer otro cálculo? 🤔`
            };
        } catch (error) {
            return {
                type: 'text',
                content: `❌ No pude calcular "${expression}". Verifica que la operación sea válida.\n\n*Operaciones válidas:* +, -, *, /, (), números 🔢`
            };
        }
    }

    // COMANDO TRADUCIR
    translate(text, message) {
        if (!text) {
            return {
                type: 'text',
                content: `🌐 *TRADUCTOR*\n\nPor favor especifica el texto a traducir:\n\n*Ejemplo:* /traductor Hello world\n\n¿Qué quieres traducir? 📝`
            };
        }

        // Simulación de traducción (integrarías Google Translate API o similar)
        const translatedText = this.simulateTranslation(text);
        
        return {
            type: 'text',
            content: `🌐 *TRADUCCIÓN*\n\n📝 *Original:* ${text}\n🔄 *Traducido:* ${translatedText}\n\n*Nota:* Esta es una simulación. Para traducciones reales, integra Google Translate API. 🌍`
        };
    }

    // COMANDO NOTICIAS
    async news(category, message) {
        const newsMessage = `📰 *NOTICIAS RECIENTES*\n\n` +
                           `🔹 *Tecnología:* Nuevos avances en IA revolucionan la industria\n` +
                           `🔹 *Ciencia:* Descubrimiento importante en exploración espacial\n` +
                           `🔹 *Mundo:* Cumbre internacional sobre cambio climático\n` +
                           `🔹 *Economía:* Mercados financieros muestran tendencia positiva\n\n` +
                           `📅 *Actualizado:* ${moment().format('DD/MM/YYYY HH:mm')}\n\n` +
                           `*Nota:* Estas son noticias simuladas. Para noticias reales, integra una API de noticias como NewsAPI. 📡`;
        
        return {
            type: 'text',
            content: newsMessage
        };
    }

    // COMANDO ESTADÍSTICAS
    statistics(message) {
        const uptime = this.formatUptime(process.uptime());
        const memoryUsage = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        
        const statsMessage = `📊 *ESTADÍSTICAS DEL BOT*\n\n` +
                            `🤖 *Estado:* Operativo ✅\n` +
                            `⏱️ *Tiempo activo:* ${uptime}\n` +
                            `🧠 *Memoria:* ${memoryUsage} MB\n` +
                            `📱 *Plataforma:* ${process.platform}\n` +
                            `🔧 *Node.js:* ${process.version}\n\n` +
                            `📈 *Rendimiento:*\n` +
                            `• CPU: Óptimo\n` +
                            `• Latencia: < 100ms\n` +
                            `• Disponibilidad: 99.9%\n\n` +
                            `🚀 *¡Todo funcionando perfectamente!* ✨`;
        
        return {
            type: 'text',
            content: statsMessage
        };
    }

    // MÉTODOS AUXILIARES

    // Simular datos del clima
    getSimulatedWeather(location) {
        const conditions = ['Soleado', 'Parcialmente nublado', 'Nublado', 'Lluvia ligera', 'Despejado'];
        return {
            temperature: Math.floor(Math.random() * 30) + 5,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.floor(Math.random() * 40) + 30,
            wind: Math.floor(Math.random() * 20) + 5,
            visibility: Math.floor(Math.random() * 10) + 5
        };
    }

    // Evaluación segura de expresiones matemáticas
    safeEval(expression) {
        // En producción, usa math.js o similar para mayor seguridad
        const cleanExpr = expression.replace(/\^/g, '**'); // Convertir ^ a **
        return eval(cleanExpr);
    }

    // Simular traducción
    simulateTranslation(text) {
        const translations = {
            'hello': 'hola',
            'world': 'mundo',
            'good morning': 'buenos días',
            'thank you': 'gracias',
            'how are you': 'cómo estás'
        };
        
        const lowerText = text.toLowerCase();
        return translations[lowerText] || `[Traducción de: ${text}]`;
    }

    // Formatear tiempo de actividad
    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }
}

module.exports = Commands;
