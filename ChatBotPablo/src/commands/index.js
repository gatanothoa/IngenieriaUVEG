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
        const welcomeMessage = `🤖 *¡Bienvenido al ChatBot de ArcoExpress!*\\n\\n` +
                              `👋 Hola! Soy tu asistente virtual especializado en *etiquetas térmicas y ribbons*\\n\\n` +
                              `🏷️ *ArcoExpress de México - Más de 20 años de experiencia*\\n\\n` +
                              `🚀 *¿En qué puedo ayudarte hoy?*\\n` +
                              `• 🏷️ Etiquetas térmicas (directas y transferencia)\\n` +
                              `• 🎗️ Ribbons (cera, resina y mixtos)\\n` +
                              `• 🖨️ Impresoras Zebra, Honeywell, TSC\\n` +
                              `• 🔧 Maquila e impresión de etiquetas\\n` +
                              `• 📊 Códigos de barras y QR\\n` +
                              `• 💰 Cotizaciones personalizadas\\n` +
                              `• 🛠️ Soporte técnico especializado\\n\\n` +
                              `📋 Escribe */menu* para ver todas las opciones\\n` +
                              `❓ Escribe */help* si necesitas ayuda\\n\\n` +
                              `*¡Somos expertos en identificación industrial!* 😊`;
        
        return {
            type: 'text',
            content: welcomeMessage
        };
    }

    // COMANDO HELP/AYUDA
    help(message, companyConfig) {
        const helpMessage = `📚 *GUÍA DE COMANDOS ARCOEXPRESS*\\n\\n` +
                           `🔹 *COMANDOS BÁSICOS:*\\n` +
                           `• */start* - Mensaje de bienvenida\\n` +
                           `• */help* - Esta guía de ayuda\\n` +
                           `• */menu* - Menú principal\\n` +
                           `• */info* - Información sobre ArcoExpress\\n\\n` +
                           `🔹 *PRODUCTOS ESPECIALIZADOS:*\\n` +
                           `• */productos* - Catálogo completo\\n` +
                           `• */etiquetas* - Tipos de etiquetas térmicas\\n` +
                           `• */ribbons* - Ribbons y cintas\\n` +
                           `• */impresoras* - Equipos Zebra, Honeywell, TSC\\n\\n` +
                           `🔹 *SERVICIOS PROFESIONALES:*\\n` +
                           `• */servicios* - Servicios especializados\\n` +
                           `• */maquila* - Servicio de maquila\\n` +
                           `• */contacto* - Datos de contacto\\n` +
                           `• */horarios* - Horarios de atención\\n` +
                           `• */cotizar* - Solicitar cotización\\n\\n` +
                           `🔹 *UTILIDADES:*\\n` +
                           `• */soporte* - Soporte técnico\\n` +
                           `• */clima [ciudad]* - Consultar clima\\n` +
                           `• */hora* - Hora y fecha actual\\n` +
                           `• */calc [operación]* - Calculadora\\n\\n` +
                           `🔹 *ENTRETENIMIENTO:*\\n` +
                           `• */chiste* - Chiste aleatorio\\n` +
                           `• */frase* - Frase motivacional\\n\\n` +
                           `💡 *Tip:* También puedes preguntarme directamente sobre etiquetas, ribbons o impresoras.\\n\\n` +
                           `¿Necesitas ayuda con identificación industrial? ¡Pregunta sin compromiso! 😊`;
        
        return {
            type: 'text',
            content: helpMessage
        };
    }

    // COMANDO MENU
    menu(message, companyConfig) {
        const menuMessage = `🎯 *MENÚ ARCOEXPRESS DE MÉXICO*\\n\\n` +
                           `🏷️ *Especialistas en etiquetas térmicas desde hace 20+ años*\\n\\n` +
                           `Selecciona una opción escribiendo el comando:\\n\\n` +
                           `🏢 *INFORMACIÓN EMPRESARIAL:*\\n` +
                           `• */info* - Sobre ArcoExpress\\n` +
                           `• */contacto* - Contactanos\\n` +
                           `• */horarios* - Horarios de atención\\n\\n` +
                           `🏷️ *PRODUCTOS ESPECIALIZADOS:*\\n` +
                           `• */productos* - Catálogo completo\\n` +
                           `• */etiquetas* - Etiquetas térmicas\\n` +
                           `• */ribbons* - Ribbons y cintas\\n` +
                           `• */impresoras* - Zebra, Honeywell, TSC\\n\\n` +
                           `🔧 *SERVICIOS PROFESIONALES:*\\n` +
                           `• */servicios* - Todos los servicios\\n` +
                           `• */maquila* - Maquila e impresión\\n` +
                           `• */soporte* - Soporte técnico\\n\\n` +
                           `💼 *COMERCIAL:*\\n` +
                           `• */cotizar* - Cotización personalizada\\n\\n` +
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
        const infoMessage = `🏢 *ARCOEXPRESS DE MÉXICO*\\n\\n` +
                           `🏷️ *Especialistas en etiquetas térmicas desde hace más de 20 años*\\n\\n` +
                           `✅ *Nuestra experiencia:*\\n` +
                           `• Más de 2 décadas en el mercado\\n` +
                           `• Líderes en etiquetas térmicas\\n` +
                           `• Distribuidores autorizados\\n` +
                           `• Cobertura en todo México\\n\\n` +
                           `🎯 *Nos especializamos en:*\\n` +
                           `• Etiquetas térmicas directas\\n` +
                           `• Etiquetas de transferencia térmica\\n` +
                           `• Ribbons de cera, resina y mixtos\\n` +
                           `• Impresoras Zebra, Honeywell, TSC\\n` +
                           `• Maquila e impresión\\n` +
                           `• Señalización industrial\\n\\n` +
                           `📍 *Ubicación:* Puebla, México\\n` +
                           `📞 *Teléfono:* +52 222 210 61 44\\n` +
                           `📧 *Email:* ventas@arcoexpress.mx\\n` +
                           `🌐 *Web:* arcoexpress.mx\\n\\n` +
                           `¿Te gustaría conocer nuestros productos? Escribe */productos* 😊`;
        
        return {
            type: 'text',
            content: infoMessage
        };
    }

    // COMANDO PRODUCTOS
    productos(message, companyConfig) {
        const productsMessage = `📦 *CATÁLOGO ARCOEXPRESS*\\n\\n` +
                               `🏷️ *ETIQUETAS TÉRMICAS:*\\n` +
                               `1. Etiquetas térmicas directas\\n` +
                               `2. Etiquetas de transferencia térmica\\n` +
                               `3. Etiquetas adhesivas permanentes\\n` +
                               `4. Etiquetas para códigos de barras\\n` +
                               `5. Etiquetas industriales especiales\\n\\n` +
                               `🎗️ *RIBBONS Y CINTAS:*\\n` +
                               `6. Ribbons de cera\\n` +
                               `7. Ribbons de resina\\n` +
                               `8. Ribbons mixtos\\n\\n` +
                               `🖨️ *IMPRESORAS:*\\n` +
                               `9. Impresoras Zebra (industriales y escritorio)\\n` +
                               `10. Impresoras Honeywell (alta resistencia)\\n` +
                               `11. Impresoras TSC (económicas y eficientes)\\n\\n` +
                               `📝 *MATERIALES DISPONIBLES:*\\n` +
                               `• Papel térmico directo\\n` +
                               `• Sintético resistente\\n` +
                               `• Poliéster premium\\n` +
                               `• Polipropileno industrial\\n\\n` +
                               `💡 *¿Necesitas información específica?*\\n` +
                               `• */etiquetas* - Detalles de etiquetas\\n` +
                               `• */ribbons* - Detalles de ribbons\\n` +
                               `• */impresoras* - Información de equipos\\n` +
                               `• */cotizar* - Solicitar presupuesto\\n\\n` +
                               `¡Somos tu mejor opción en identificación industrial! 😊`;
        
        return {
            type: 'text',
            content: productsMessage
        };
    }

    // COMANDO SERVICIOS
    servicios(message, companyConfig) {
        const servicesMessage = `🔧 *SERVICIOS ARCOEXPRESS*\\n\\n` +
                                `🏷️ *SERVICIOS ESPECIALIZADOS:*\\n` +
                                `1. 📄 Maquila e impresión de etiquetas\\n` +
                                `2. 🏭 Señalización e identificación industrial\\n` +
                                `3. 📦 Identificación de productos\\n` +
                                `4. 🛠️ Soporte técnico especializado\\n` +
                                `5. 📋 Consultoría en procesos de etiquetado\\n\\n` +
                                `�️ *SERVICIOS DE IMPRESORAS:*\\n` +
                                `6. 🦓 Servicio técnico Zebra\\n` +
                                `7. 🏭 Servicio técnico Honeywell\\n` +
                                `8. 🔧 Servicio técnico TSC\\n` +
                                `9. 🛡️ Garantía extendida\\n` +
                                `10. 📞 Soporte remoto\\n\\n` +
                                `� *SOLUCIONES INTEGRALES:*\\n` +
                                `• Diseño de etiquetas personalizadas\\n` +
                                `• Implementación de códigos de barras\\n` +
                                `• Capacitación en equipos\\n` +
                                `• Asesoría en selección de materiales\\n\\n` +
                                `� *BENEFICIOS ADICIONALES:*\\n` +
                                `• Envíos a todo México\\n` +
                                `• Entrega rápida\\n` +
                                `• Precios competitivos\\n` +
                                `• Calidad garantizada\\n\\n` +
                                `💡 *¿Necesitas más información?*\\n` +
                                `• */maquila* - Detalles del servicio de maquila\\n` +
                                `• */soporte* - Información de soporte técnico\\n` +
                                `• */cotizar* - Solicitar presupuesto\\n\\n` +
                                `¡Más de 20 años respaldando tu negocio! 😊`;
        
        return {
            type: 'text',
            content: servicesMessage
        };
    }

    // COMANDO CONTACTO
    contacto(message, companyConfig) {
        const contactMessage = `📞 *CONTACTO ARCOEXPRESS*\\n\\n` +
                              `🏢 *ArcoExpress de México*\\n` +
                              `🏷️ *Especialistas en etiquetas térmicas*\\n\\n` +
                              `📍 *Ubicación:*\\n` +
                              `Puebla, México\\n\\n` +
                              `📞 *Teléfonos:*\\n` +
                              `• +52 222 210 61 44\\n` +
                              `• +52 222 210 61 40\\n\\n` +
                              `💬 *WhatsApp:*\\n` +
                              `+52 222 750 68 55\\n\\n` +
                              `📧 *Email:*\\n` +
                              `ventas@arcoexpress.mx\\n\\n` +
                              `🌐 *Sitio Web:*\\n` +
                              `arcoexpress.mx\\n\\n` +
                              `⏰ *Horarios:*\\n` +
                              `Lunes a Viernes\\n` +
                              `9:00 AM - 6:00 PM\\n\\n` +
                              `� *Cobertura:*\\n` +
                              `Envíos a todo México\\n\\n` +
                              `¡Contáctanos cuando gustes! Tenemos más de 20 años de experiencia ayudando empresas con sus necesidades de identificación. 😊`;
        
        return {
            type: 'text',
            content: contactMessage
        };
    }

    // COMANDO HORARIOS
    horarios(message, companyConfig) {
        const horariosMessage = `⏰ *HORARIOS ARCOEXPRESS*\\n\\n` +
                               `🏢 *ArcoExpress de México*\\n` +
                               `🏷️ *Especialistas en etiquetas térmicas*\\n\\n` +
                               `📅 *Días de atención:*\\n` +
                               `Lunes a Viernes\\n\\n` +
                               `� *Horario:*\\n` +
                               `9:00 AM - 6:00 PM\\n\\n` +
                               `💡 *Nota importante:*\\n` +
                               `• Este chatbot está disponible 24/7\\n` +
                               `• Para atención personalizada: horario laboral\\n` +
                               `• WhatsApp: respuesta rápida garantizada\\n\\n` +
                               `📞 *Contacto inmediato:*\\n` +
                               `• WhatsApp: +52 222 750 68 55\\n` +
                               `• Tel: +52 222 210 61 44\\n` +
                               `• Email: ventas@arcoexpress.mx\\n\\n` +
                               `¡Siempre listos para resolver tus dudas sobre etiquetas térmicas! 😊`;
        
        return {
            type: 'text',
            content: horariosMessage
        };
    }
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

    // ========================================
    // COMANDOS ESPECÍFICOS ARCOEXPRESS
    // ========================================

    // COMANDO ETIQUETAS TÉRMICAS
    etiquetas(message) {
        const etiquetasMessage = `🏷️ *ETIQUETAS TÉRMICAS ARCOEXPRESS*\\n\\n` +
                                `📝 *TIPOS DISPONIBLES:*\\n\\n` +
                                `1. 🔥 *Etiquetas Térmicas Directas*\\n` +
                                `   • Impresión directa por calor\\n` +
                                `   • Ideales para uso inmediato\\n` +
                                `   • Económicas y eficientes\\n\\n` +
                                `2. 🎗️ *Etiquetas de Transferencia Térmica*\\n` +
                                `   • Requieren ribbon para impresión\\n` +
                                `   • Mayor durabilidad\\n` +
                                `   • Resistentes a factores ambientales\\n\\n` +
                                `📊 *MATERIALES DISPONIBLES:*\\n` +
                                `• 📄 Papel térmico directo\\n` +
                                `• 🔧 Sintético resistente\\n` +
                                `• 💎 Poliéster premium\\n` +
                                `• 🏭 Polipropileno industrial\\n\\n` +
                                `🔒 *TIPOS DE ADHESIVO:*\\n` +
                                `• Permanente\\n` +
                                `• Removible\\n` +
                                `• Especiales\\n\\n` +
                                `📏 *MEDIDAS:*\\n` +
                                `• Medidas estándar disponibles\\n` +
                                `• Medidas personalizadas\\n` +
                                `• Consulta por medidas específicas\\n\\n` +
                                `💡 *¿Necesitas más información?*\\n` +
                                `• */cotizar* - Solicitar precio\\n` +
                                `• */contacto* - Hablar con especialista\\n\\n` +
                                `¡Más de 20 años perfeccionando etiquetas térmicas! 😊`;
        
        return {
            type: 'text',
            content: etiquetasMessage
        };
    }

    // COMANDO RIBBONS
    ribbons(message) {
        const ribbonsMessage = `🎗️ *RIBBONS ARCOEXPRESS*\\n\\n` +
                              `📝 *TIPOS DE RIBBONS:*\\n\\n` +
                              `1. 🕯️ *Ribbons de Cera (Wax)*\\n` +
                              `   • Papel térmico directo\\n` +
                              `   • Impresión estándar\\n` +
                              `   • Económicos\\n` +
                              `   • Uso general\\n\\n` +
                              `2. 💎 *Ribbons de Resina (Resin)*\\n` +
                              `   • Materiales sintéticos\\n` +
                              `   • Alta resistencia\\n` +
                              `   • Durabilidad extrema\\n` +
                              `   • Aplicaciones industriales\\n\\n` +
                              `3. 🔀 *Ribbons Mixtos (Wax-Resin)*\\n` +
                              `   • Combinación perfecta\\n` +
                              `   • Versatilidad máxima\\n` +
                              `   • Relación costo-beneficio\\n` +
                              `   • Uso versátil\\n\\n` +
                              `🖨️ *COMPATIBILIDAD:*\\n` +
                              `• 🦓 Zebra (todos los modelos)\\n` +
                              `• 🏭 Honeywell (serie completa)\\n` +
                              `• 🔧 TSC (compatibilidad total)\\n` +
                              `• Otras marcas disponibles\\n\\n` +
                              `📏 *ANCHOS DISPONIBLES:*\\n` +
                              `• 25mm, 40mm, 50mm, 83mm\\n` +
                              `• 110mm, 156mm, 220mm\\n` +
                              `• Medidas especiales bajo pedido\\n\\n` +
                              `💡 *¿Qué ribbon necesitas?*\\n` +
                              `• */cotizar* - Solicitar precio\\n` +
                              `• */contacto* - Asesoría técnica\\n\\n` +
                              `¡Ribbons de calidad mundial! 😊`;
        
        return {
            type: 'text',
            content: ribbonsMessage
        };
    }

    // COMANDO IMPRESORAS
    impresoras(message) {
        const impresorasMessage = `🖨️ *IMPRESORAS ARCOEXPRESS*\\n\\n` +
                                 `🦓 *ZEBRA - Líderes mundiales*\\n` +
                                 `• ZD230, ZD420, ZD620 (escritorio)\\n` +
                                 `• ZT230, ZT410, ZT510 (industriales)\\n` +
                                 `• Serie móvil: ZQ320, ZQ630\\n` +
                                 `• Garantía y soporte oficial\\n\\n` +
                                 `🏭 *HONEYWELL - Resistencia industrial*\\n` +
                                 `• PC23d, PC43d (escritorio)\\n` +
                                 `• PM43, PM45 (industriales)\\n` +
                                 `• Serie portátil disponible\\n` +
                                 `• Tecnología de vanguardia\\n\\n` +
                                 `🔧 *TSC - Excelente relación precio-calidad*\\n` +
                                 `• TE200, TE300 (básicas)\\n` +
                                 `• TTP-225, TTP-247 (escritorio)\\n` +
                                 `• TTP-368MT, MEX200 (industriales)\\n` +
                                 `• Ideales para PyMES\\n\\n` +
                                 `🛠️ *SERVICIOS INCLUIDOS:*\\n` +
                                 `• ✅ Instalación y configuración\\n` +
                                 `• ✅ Capacitación de usuarios\\n` +
                                 `• ✅ Soporte técnico especializado\\n` +
                                 `• ✅ Garantía extendida\\n` +
                                 `• ✅ Mantenimiento preventivo\\n\\n` +
                                 `💰 *OPCIONES DE FINANCIAMIENTO:*\\n` +
                                 `• Compra directa\\n` +
                                 `• Planes de financiamiento\\n` +
                                 `• Renta de equipos\\n\\n` +
                                 `💡 *¿Qué impresora necesitas?*\\n` +
                                 `• */cotizar* - Solicitar precio\\n` +
                                 `• */contacto* - Asesoría técnica\\n\\n` +
                                 `¡Distribuidores autorizados con más de 20 años de experiencia! 😊`;
        
        return {
            type: 'text',
            content: impresorasMessage
        };
    }

    // COMANDO MAQUILA
    maquila(message) {
        const maquilaMessage = `🔧 *SERVICIO DE MAQUILA ARCOEXPRESS*\\n\\n` +
                              `📋 *¿QUÉ ES LA MAQUILA?*\\n` +
                              `Nosotros imprimimos tus etiquetas con tus diseños, textos, códigos de barras o logos específicos.\\n\\n` +
                              `🏷️ *SERVICIOS DE MAQUILA:*\\n\\n` +
                              `1. 📄 *Impresión de etiquetas personalizadas*\\n` +
                              `   • Tus diseños y especificaciones\\n` +
                              `   • Códigos de barras únicos\\n` +
                              `   • Logos y texto variable\\n\\n` +
                              `2. 📊 *Códigos de barras y QR*\\n` +
                              `   • Numeración consecutiva\\n` +
                              `   • Códigos únicos por producto\\n` +
                              `   • Validación y calidad garantizada\\n\\n` +
                              `3. 🎨 *Diseño personalizado*\\n` +
                              `   • Creación de diseños nuevos\\n` +
                              `   • Adaptación de diseños existentes\\n` +
                              `   • Optimización para impresión\\n\\n` +
                              `📈 *VOLÚMENES DE PRODUCCIÓN:*\\n` +
                              `• Desde 1,000 etiquetas\\n` +
                              `• Volúmenes medianos (10K-100K)\\n` +
                              `• Grandes volúmenes (100K+)\\n` +
                              `• Producción continua\\n\\n` +
                              `⚡ *TIEMPOS DE ENTREGA:*\\n` +
                              `• Urgentes: 24-48 horas\\n` +
                              `• Estándar: 3-5 días hábiles\\n` +
                              `• Grandes volúmenes: según cantidad\\n\\n` +
                              `✅ *GARANTÍAS:*\\n` +
                              `• Calidad de impresión garantizada\\n` +
                              `• Materiales de primera calidad\\n` +
                              `• Revisión antes de entrega\\n\\n` +
                              `💡 *¿Necesitas servicio de maquila?*\\n` +
                              `• */cotizar* - Solicitar presupuesto\\n` +
                              `• */contacto* - Hablar con especialista\\n\\n` +
                              `¡Más de 20 años produciendo etiquetas de calidad! 😊`;
        
        return {
            type: 'text',
            content: maquilaMessage
        };
    }

    // COMANDO SOPORTE TÉCNICO
    soporte(message) {
        const soporteMessage = `🛠️ *SOPORTE TÉCNICO ARCOEXPRESS*\\n\\n` +
                              `👨‍🔧 *EQUIPO ESPECIALIZADO*\\n` +
                              `Más de 20 años de experiencia en etiquetas térmicas e impresoras industriales.\\n\\n` +
                              `🔧 *SERVICIOS DE SOPORTE:*\\n\\n` +
                              `1. 📞 *Soporte telefónico inmediato*\\n` +
                              `   • Diagnóstico remoto\\n` +
                              `   • Solución de problemas\\n` +
                              `   • Configuración de equipos\\n\\n` +
                              `2. 🏠 *Servicio en sitio*\\n` +
                              `   • Visita técnica especializada\\n` +
                              `   • Reparación en sus instalaciones\\n` +
                              `   • Mantenimiento preventivo\\n\\n` +
                              `3. 🔄 *Mantenimiento preventivo*\\n` +
                              `   • Limpieza especializada\\n` +
                              `   • Calibración de equipos\\n` +
                              `   • Actualización de firmware\\n\\n` +
                              `📋 *PROBLEMAS COMUNES QUE RESOLVEMOS:*\\n` +
                              `• Calidad de impresión deficiente\\n` +
                              `• Problemas de conectividad\\n` +
                              `• Configuración de software\\n` +
                              `• Instalación de drivers\\n` +
                              `• Optimización de etiquetas\\n\\n` +
                              `🖨️ *MARCAS QUE SOPORTAMOS:*\\n` +
                              `• 🦓 Zebra (certificados)\\n` +
                              `• 🏭 Honeywell (autorizados)\\n` +
                              `• 🔧 TSC (especialistas)\\n` +
                              `• Otras marcas disponibles\\n\\n` +
                              `⚡ *TIEMPOS DE RESPUESTA:*\\n` +
                              `• Telefónico: Inmediato\\n` +
                              `• WhatsApp: < 30 minutos\\n` +
                              `• Visita en sitio: 24-48 horas\\n\\n` +
                              `📞 *¿NECESITAS SOPORTE AHORA?*\\n` +
                              `• Tel: +52 222 210 61 44\\n` +
                              `• WhatsApp: +52 222 750 68 55\\n` +
                              `• Email: ventas@arcoexpress.mx\\n\\n` +
                              `¡Tu tranquilidad es nuestra prioridad! 😊`;
        
        return {
            type: 'text',
            content: soporteMessage
        };
    }

    // COMANDO COTIZAR MEJORADO
    cotizar(message) {
        const cotizarMessage = `💰 *COTIZACIÓN PERSONALIZADA ARCOEXPRESS*\\n\\n` +
                              `📋 *PARA BRINDARTE EL MEJOR PRECIO NECESITAMOS:*\\n\\n` +
                              `🏷️ *Si es ETIQUETA:*\\n` +
                              `• Medidas (ancho x alto)\\n` +
                              `• Material (papel, sintético, etc.)\\n` +
                              `• Tipo de adhesivo\\n` +
                              `• Cantidad requerida\\n` +
                              `• Diseño o texto a imprimir\\n\\n` +
                              `🎗️ *Si es RIBBON:*\\n` +
                              `• Ancho del ribbon\\n` +
                              `• Tipo (cera, resina, mixto)\\n` +
                              `• Marca de impresora\\n` +
                              `• Cantidad de rollos\\n\\n` +
                              `🖨️ *Si es IMPRESORA:*\\n` +
                              `• Volumen de impresión diario\\n` +
                              `• Tipo de aplicación\\n` +
                              `• Presupuesto aproximado\\n` +
                              `• Marca preferida\\n\\n` +
                              `🔧 *Si es SERVICIO DE MAQUILA:*\\n` +
                              `• Cantidad de etiquetas\\n` +
                              `• Diseño o especificaciones\\n` +
                              `• Urgencia requerida\\n\\n` +
                              `⚡ *FORMAS DE COTIZAR:*\\n\\n` +
                              `1. 💬 *WhatsApp (RÁPIDO)*\\n` +
                              `   +52 222 750 68 55\\n` +
                              `   ¡Respuesta en minutos!\\n\\n` +
                              `2. 📞 *Teléfono directo*\\n` +
                              `   +52 222 210 61 44\\n` +
                              `   Atención inmediata\\n\\n` +
                              `3. 📧 *Email detallado*\\n` +
                              `   ventas@arcoexpress.mx\\n` +
                              `   Con especificaciones técnicas\\n\\n` +
                              `🎯 *BENEFICIOS DE COTIZAR CON NOSOTROS:*\\n` +
                              `• ✅ Más de 20 años de experiencia\\n` +
                              `• ✅ Precios competitivos\\n` +
                              `• ✅ Calidad garantizada\\n` +
                              `• ✅ Envíos a todo México\\n` +
                              `• ✅ Soporte técnico incluido\\n\\n` +
                              `¡Contactanos ahora y obtén la mejor cotización del mercado! 😊`;
        
        return {
            type: 'text',
            content: cotizarMessage
        };
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
