// COMANDOS PRINCIPALES DEL CHATBOT - PLANTILLA UNIVERSAL
const axios = require('axios');
const moment = require('moment');
moment.locale('es');

class Commands {
    constructor() {
        this.version = '1.0.0';
        this.botName = process.env.BOT_NAME || 'ChatBot Assistant';
        this.jokes = [
            '¿Por qué los pájaros vuelan hacia el sur en invierno? 🐦\\n¡Porque caminar sería demasiado lejos! 😂',
            '¿Qué le dice un jardinero a otro? 🌱\\n¡Seamos plantas! 😄',
            '¿Por qué no se puede confiar en las escaleras? 🪜\\n¡Porque siempre están tramando algo! 😂',
            '¿Cómo se llama el campeón de buceo japonés? 🏊‍♂️\\n¡Tokofondo! 😂',
            '¿Qué hace una abeja en el gimnasio? 🐝\\n¡Zum-ba! 💃'
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
    start(message, companyConfig) {
        const welcomeMessage = `🤖 *¡Bienvenido al ${this.botName}!*\\n\\n` +
                              `👋 Hola! Soy el asistente virtual de *${companyConfig.name}*\\n\\n` +
                              `🚀 *¿Qué puedo hacer por ti?*\\n` +
                              `• Información sobre productos y servicios\\n` +
                              `• Datos de contacto\\n` +
                              `• Horarios de atención\\n` +
                              `• Solicitar cotizaciones\\n` +
                              `• Responder preguntas frecuentes\\n` +
                              `• Entretenerte con chistes y frases\\n` +
                              `• Ayudarte con cálculos\\n` +
                              `• Consultar el clima\\n\\n` +
                              `📋 Escribe */menu* para ver todas las opciones\\n` +
                              `❓ Escribe */help* si necesitas ayuda\\n\\n` +
                              `¡Estoy aquí para ayudarte! 😊`;
        
        return {
            type: 'text',
            content: welcomeMessage
        };
    }

    // COMANDO HELP/AYUDA
    help(message, companyConfig) {
        const helpMessage = `📚 *GUÍA DE COMANDOS*\\n\\n` +
                           `🔹 *COMANDOS BÁSICOS:*\\n` +
                           `• */start* - Mensaje de bienvenida\\n` +
                           `• */help* - Esta guía de ayuda\\n` +
                           `• */menu* - Menú principal\\n` +
                           `• */info* - Información de ${companyConfig.name}\\n\\n` +
                           `🔹 *INFORMACIÓN EMPRESARIAL:*\\n` +
                           `• */productos* - Lista de productos\\n` +
                           `• */servicios* - Lista de servicios\\n` +
                           `• */contacto* - Datos de contacto\\n` +
                           `• */horarios* - Horarios de atención\\n` +
                           `• */cotizar* - Solicitar cotización\\n\\n` +
                           `🔹 *UTILIDADES:*\\n` +
                           `• */clima [ciudad]* - Consultar clima\\n` +
                           `• */hora* - Hora y fecha actual\\n` +
                           `• */calc [operación]* - Calculadora\\n\\n` +
                           `🔹 *ENTRETENIMIENTO:*\\n` +
                           `• */chiste* - Chiste aleatorio\\n` +
                           `• */frase* - Frase motivacional\\n\\n` +
                           `💡 *Tip:* También puedes escribir mensajes normales y yo responderé de forma inteligente.\\n\\n` +
                           `¿Necesitas ayuda con algo específico? ¡Solo pregunta! 😊`;
        
        return {
            type: 'text',
            content: helpMessage
        };
    }

    // COMANDO MENU
    menu(message, companyConfig) {
        const menuMessage = `🎯 *MENÚ DE ${companyConfig.name.toUpperCase()}*\\n\\n` +
                           `Selecciona una opción escribiendo el comando:\\n\\n` +
                           `🏢 *INFORMACIÓN EMPRESARIAL:*\\n` +
                           `• */info* - Sobre nosotros\\n` +
                           `• */productos* - Nuestros productos\\n` +
                           `• */servicios* - Nuestros servicios\\n` +
                           `• */contacto* - Contactanos\\n` +
                           `• */horarios* - Horarios de atención\\n\\n` +
                           `💼 *COMERCIAL:*\\n` +
                           `• */cotizar* - Solicitar cotización\\n` +
                           `• */soporte* - Soporte técnico\\n\\n` +
                           `🛠️ *HERRAMIENTAS:*\\n` +
                           `• */clima* - Consultar el clima\\n` +
                           `• */calc* - Calculadora\\n` +
                           `• */hora* - Ver fecha y hora\\n\\n` +
                           `🎮 *ENTRETENIMIENTO:*\\n` +
                           `• */chiste* - Escuchar un chiste\\n` +
                           `• */frase* - Frase inspiradora\\n\\n` +
                           `❓ *AYUDA:*\\n` +
                           `• */help* - Guía completa\\n\\n` +
                           `¿En qué puedo ayudarte hoy? 🤔`;
        
        return {
            type: 'text',
            content: menuMessage
        };
    }

    // COMANDO INFO - INFORMACIÓN DE LA EMPRESA
    info(message, companyConfig) {
        const infoMessage = `🏢 *INFORMACIÓN DE ${companyConfig.name.toUpperCase()}*\\n\\n` +
                           `📍 *Dirección:*\\n${companyConfig.address}\\n\\n` +
                           `📞 *Teléfono:*\\n${companyConfig.phone}\\n\\n` +
                           `📧 *Email:*\\n${companyConfig.email}\\n\\n` +
                           `🌐 *Sitio Web:*\\n${companyConfig.website}\\n\\n` +
                           `⏰ *Horarios de Atención:*\\n${companyConfig.businessHours.days}\\n${companyConfig.businessHours.start} - ${companyConfig.businessHours.end}\\n\\n` +
                           `¿Te gustaría saber algo más específico? Escribe */menu* para ver más opciones. 😊`;
        
        return {
            type: 'text',
            content: infoMessage
        };
    }

    // COMANDO PRODUCTOS
    productos(message, companyConfig) {
        if (!companyConfig.products || companyConfig.products.length === 0) {
            return {
                type: 'text',
                content: `📦 *NUESTROS PRODUCTOS*\\n\\nActualmente estamos actualizando nuestro catálogo de productos.\\n\\nPara información detallada, contáctanos:\\n📞 ${companyConfig.phone}\\n📧 ${companyConfig.email}`
            };
        }

        let productList = companyConfig.products.map((product, index) => `${index + 1}. ${product.trim()}`).join('\\n');
        
        const productsMessage = `📦 *NUESTROS PRODUCTOS*\\n\\n` +
                               `${productList}\\n\\n` +
                               `💡 *¿Necesitas más información?*\\n` +
                               `• Escribe */cotizar* para solicitar presupuesto\\n` +
                               `• Escribe */contacto* para hablar con un asesor\\n\\n` +
                               `¡Estamos aquí para ayudarte! 😊`;
        
        return {
            type: 'text',
            content: productsMessage
        };
    }

    // COMANDO SERVICIOS
    servicios(message, companyConfig) {
        if (!companyConfig.services || companyConfig.services.length === 0) {
            return {
                type: 'text',
                content: `🔧 *NUESTROS SERVICIOS*\\n\\nActualmente estamos actualizando nuestro catálogo de servicios.\\n\\nPara información detallada, contáctanos:\\n📞 ${companyConfig.phone}\\n📧 ${companyConfig.email}`
            };
        }

        let serviceList = companyConfig.services.map((service, index) => `${index + 1}. ${service.trim()}`).join('\\n');
        
        const servicesMessage = `🔧 *NUESTROS SERVICIOS*\\n\\n` +
                                `${serviceList}\\n\\n` +
                                `💡 *¿Necesitas más información?*\\n` +
                                `• Escribe */cotizar* para solicitar presupuesto\\n` +
                                `• Escribe */contacto* para hablar con un especialista\\n\\n` +
                                `¡Estamos aquí para ayudarte! 😊`;
        
        return {
            type: 'text',
            content: servicesMessage
        };
    }

    // COMANDO CONTACTO
    contacto(message, companyConfig) {
        const contactMessage = `📞 *DATOS DE CONTACTO*\\n\\n` +
                              `🏢 *${companyConfig.name}*\\n\\n` +
                              `📍 *Dirección:*\\n${companyConfig.address}\\n\\n` +
                              `📞 *Teléfono:*\\n${companyConfig.phone}\\n\\n` +
                              `📧 *Email:*\\n${companyConfig.email}\\n\\n` +
                              `🌐 *Sitio Web:*\\n${companyConfig.website}\\n\\n` +
                              `⏰ *Horarios:*\\n${companyConfig.businessHours.days}\\n${companyConfig.businessHours.start} - ${companyConfig.businessHours.end}\\n\\n` +
                              `💬 *WhatsApp:*\\n${companyConfig.phone}\\n\\n` +
                              `¡Contáctanos cuando gustes! Estamos aquí para ayudarte. 😊`;
        
        return {
            type: 'text',
            content: contactMessage
        };
    }

    // COMANDO HORARIOS
    horarios(message, companyConfig) {
        const horariosMessage = `⏰ *HORARIOS DE ATENCIÓN*\\n\\n` +
                               `🏢 *${companyConfig.name}*\\n\\n` +
                               `📅 *Días:* ${companyConfig.businessHours.days}\\n` +
                               `🕐 *Horario:* ${companyConfig.businessHours.start} - ${companyConfig.businessHours.end}\\n\\n` +
                               `💡 *Nota:* Fuera de horario laboral, este bot sigue activo 24/7 para responder tus consultas básicas.\\n\\n` +
                               `📞 Para urgencias, puedes contactarnos al ${companyConfig.phone}`;
        
        return {
            type: 'text',
            content: horariosMessage
        };
    }

    // COMANDO COTIZAR
    cotizar(message, companyConfig) {
        const cotizarMessage = `💰 *SOLICITAR COTIZACIÓN*\\n\\n` +
                              `¡Perfecto! Te ayudamos a cotizar nuestros productos o servicios.\\n\\n` +
                              `📋 *Para una cotización rápida:*\\n` +
                              `1. Describe lo que necesitas\\n` +
                              `2. Incluye cantidades (si aplica)\\n` +
                              `3. Menciona tu ubicación\\n\\n` +
                              `📞 *Contacto directo:*\\n` +
                              `• Teléfono: ${companyConfig.phone}\\n` +
                              `• Email: ${companyConfig.email}\\n\\n` +
                              `🚀 *Respuesta rápida:* Nuestro equipo te responderá en menos de 2 horas laborales.\\n\\n` +
                              `¿Qué producto o servicio te interesa cotizar? 🤔`;
        
        return {
            type: 'text',
            content: cotizarMessage
        };
    }

    // COMANDO SOPORTE
    soporte(message, companyConfig) {
        const soporteMessage = `🛠️ *SOPORTE TÉCNICO*\\n\\n` +
                              `¡Estamos aquí para ayudarte!\\n\\n` +
                              `📞 *Contacto directo:*\\n${companyConfig.phone}\\n\\n` +
                              `📧 *Email de soporte:*\\n${companyConfig.email}\\n\\n` +
                              `⏰ *Horarios de soporte:*\\n${companyConfig.businessHours.days}\\n${companyConfig.businessHours.start} - ${companyConfig.businessHours.end}\\n\\n` +
                              `💡 *Tip:* Describe detalladamente tu problema para una ayuda más rápida.\\n\\n` +
                              `¿En qué podemos ayudarte? 🤔`;
        
        return {
            type: 'text',
            content: soporteMessage
        };
    }

    // COMANDO HORA
    hora(message) {
        const now = moment();
        const horaMessage = `🕐 *FECHA Y HORA ACTUAL*\\n\\n` +
                           `📅 *Fecha:* ${now.format('dddd, DD [de] MMMM [de] YYYY')}\\n` +
                           `🕐 *Hora:* ${now.format('HH:mm:ss')}\\n` +
                           `🌍 *Zona horaria:* México (UTC-6)\\n\\n` +
                           `¡Que tengas un excelente día! 😊`;
        
        return {
            type: 'text',
            content: horaMessage
        };
    }

    // COMANDO CHISTE
    chiste(message) {
        const randomJoke = this.jokes[Math.floor(Math.random() * this.jokes.length)];
        return {
            type: 'text',
            content: `😂 *CHISTE DEL DÍA*\\n\\n${randomJoke}\\n\\n¿Te gustó? ¡Escribe */chiste* para otro! 😄`
        };
    }

    // COMANDO FRASE
    frase(message) {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        return {
            type: 'text',
            content: `✨ *FRASE MOTIVACIONAL*\\n\\n${randomQuote}\\n\\n¡Que tengas un día inspirador! 🌟`
        };
    }

    // COMANDO CALCULADORA
    calc(message) {
        const expression = message.body.replace('/calc', '').trim();
        
        if (!expression) {
            return {
                type: 'text',
                content: `🧮 *CALCULADORA*\\n\\nUso: */calc [operación]*\\n\\n📝 *Ejemplos:*\\n• /calc 2 + 2\\n• /calc 10 * 5\\n• /calc 100 / 4\\n• /calc 15 - 7\\n\\n¡Inténtalo! 😊`
            };
        }

        try {
            // Sanitizar la expresión para evitar código malicioso
            const sanitizedExpression = expression.replace(/[^0-9+\\-*/.() ]/g, '');
            const result = eval(sanitizedExpression);
            
            return {
                type: 'text',
                content: `🧮 *CALCULADORA*\\n\\n📝 *Operación:* ${sanitizedExpression}\\n🔢 *Resultado:* ${result}\\n\\n¿Necesitas otra operación? 😊`
            };
        } catch (error) {
            return {
                type: 'text',
                content: `❌ *Error en la operación*\\n\\nPor favor verifica que la operación sea válida.\\n\\n📝 *Ejemplos válidos:*\\n• 2 + 2\\n• 10 * 5\\n• 100 / 4`
            };
        }
    }

    // COMANDO CLIMA
    async clima(message) {
        const city = message.body.replace('/clima', '').trim();
        
        if (!city) {
            return {
                type: 'text',
                content: `🌤️ *CONSULTA DEL CLIMA*\\n\\nUso: */clima [ciudad]*\\n\\n📝 *Ejemplos:*\\n• /clima Ciudad de México\\n• /clima Puebla\\n• /clima Guadalajara\\n\\n¿De qué ciudad quieres saber el clima? 🌍`
            };
        }

        try {
            // Nota: Necesitarías una API key de OpenWeatherMap
            const apiKey = process.env.OPENWEATHER_API_KEY;
            
            if (!apiKey) {
                return {
                    type: 'text',
                    content: `🌤️ *CLIMA DE ${city.toUpperCase()}*\\n\\nActualmente el servicio de clima no está configurado.\\n\\nPara configurarlo, necesitas una API key de OpenWeatherMap en el archivo .env\\n\\n💡 Mientras tanto, te recomiendo consultar:\\n• Google Weather\\n• Weather.com\\n• Tu app de clima favorita`
                };
            }

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
            const weather = response.data;
            
            const climaMessage = `🌤️ *CLIMA DE ${weather.name.toUpperCase()}*\\n\\n` +
                                `🌡️ *Temperatura:* ${Math.round(weather.main.temp)}°C\\n` +
                                `🌈 *Descripción:* ${weather.weather[0].description}\\n` +
                                `💧 *Humedad:* ${weather.main.humidity}%\\n` +
                                `💨 *Viento:* ${weather.wind.speed} m/s\\n` +
                                `👀 *Sensación térmica:* ${Math.round(weather.main.feels_like)}°C\\n\\n` +
                                `¡Que tengas un buen día! 😊`;
            
            return {
                type: 'text',
                content: climaMessage
            };
        } catch (error) {
            return {
                type: 'text',
                content: `❌ No pude encontrar información del clima para "${city}".\\n\\nVerifica que el nombre de la ciudad esté correcto e intenta de nuevo. 🌍`
            };
        }
    }

    // COMANDO STATS (solo para administradores)
    stats(message, companyConfig, statistics) {
        const uptime = Math.floor(statistics.uptime / 60); // en minutos
        const statsMessage = `📊 *ESTADÍSTICAS DEL BOT*\\n\\n` +
                             `🤖 *Bot:* ${this.botName}\\n` +
                             `🏢 *Empresa:* ${companyConfig.name}\\n` +
                             `📥 *Mensajes recibidos:* ${statistics.messagesReceived}\\n` +
                             `📤 *Mensajes enviados:* ${statistics.messagesSent}\\n` +
                             `👥 *Usuarios únicos:* ${statistics.usersInteracted}\\n` +
                             `⏰ *Tiempo activo:* ${uptime} minutos\\n` +
                             `✅ *Estado:* ${statistics.isReady ? 'Conectado' : 'Desconectado'}\\n\\n` +
                             `¡El bot está funcionando correctamente! 🚀`;
        
        return {
            type: 'text',
            content: statsMessage
        };
    }

    // COMANDO NO RECONOCIDO
    unknown(message) {
        return {
            type: 'text',
            content: `❓ *Comando no reconocido*\\n\\nEscribe */help* para ver todos los comandos disponibles, o */menu* para ver las opciones principales.\\n\\n¿Necesitas ayuda con algo específico? ¡Solo pregúntamelo! 😊`
        };
    }
}

module.exports = Commands;
