// PROCESADOR DE COMANDOS AVANZADOS
const Logger = require('../utils/logger');

class CommandProcessor {
    constructor() {
        this.logger = new Logger();
        this.commandHistory = new Map();
        this.userSessions = new Map();
    }

    // PROCESAR COMANDO COMPLEJO
    async processComplexCommand(message, command, args) {
        try {
            const userId = message.from;
            
            // Registrar comando en historial
            this.addToHistory(userId, command, args);
            
            // Procesar según tipo de comando
            switch (command) {
                case 'multi-step':
                    return await this.handleMultiStepCommand(message, args);
                    
                case 'interactive':
                    return await this.handleInteractiveCommand(message, args);
                    
                case 'scheduled':
                    return await this.handleScheduledCommand(message, args);
                    
                default:
                    return this.handleUnknownCommand(command);
            }
            
        } catch (error) {
            this.logger.error('Error en procesador de comandos:', error);
            return {
                type: 'text',
                content: '❌ Error al procesar comando complejo.'
            };
        }
    }

    // MANEJAR COMANDOS MULTI-PASO
    async handleMultiStepCommand(message, args) {
        const userId = message.from;
        let session = this.userSessions.get(userId) || { step: 0, data: {} };
        
        // Ejemplo: Proceso de registro
        if (args[0] === 'registro') {
            switch (session.step) {
                case 0:
                    session.step = 1;
                    this.userSessions.set(userId, session);
                    return {
                        type: 'text',
                        content: '📝 Proceso de registro iniciado.\n\nPaso 1/3: ¿Cuál es tu nombre completo?'
                    };
                    
                case 1:
                    session.data.nombre = args.join(' ');
                    session.step = 2;
                    this.userSessions.set(userId, session);
                    return {
                        type: 'text',
                        content: `✅ Nombre registrado: ${session.data.nombre}\n\nPaso 2/3: ¿Cuál es tu email?`
                    };
                    
                case 2:
                    session.data.email = args[0];
                    session.step = 3;
                    this.userSessions.set(userId, session);
                    return {
                        type: 'text',
                        content: `✅ Email registrado: ${session.data.email}\n\nPaso 3/3: ¿En qué ciudad vives?`
                    };
                    
                case 3:
                    session.data.ciudad = args.join(' ');
                    this.userSessions.delete(userId); // Finalizar sesión
                    
                    // Guardar datos del usuario
                    await this.saveUserData(userId, session.data);
                    
                    return {
                        type: 'text',
                        content: `🎉 ¡Registro completado!\n\n` +
                                `👤 Nombre: ${session.data.nombre}\n` +
                                `📧 Email: ${session.data.email}\n` +
                                `🏙️ Ciudad: ${session.data.ciudad}\n\n` +
                                `¡Bienvenido al sistema!`
                    };
            }
        }
        
        return {
            type: 'text',
            content: '❓ Comando multi-paso no reconocido. Usa: */multi-step registro*'
        };
    }

    // MANEJAR COMANDOS INTERACTIVOS
    async handleInteractiveCommand(message, args) {
        // Ejemplo: Quiz interactivo
        if (args[0] === 'quiz') {
            const questions = [
                {
                    question: '¿Cuál es la capital de Francia?',
                    options: ['A) Madrid', 'B) París', 'C) Roma', 'D) Londres'],
                    correct: 'B'
                },
                {
                    question: '¿En qué año llegó el hombre a la Luna?',
                    options: ['A) 1967', 'B) 1968', 'C) 1969', 'D) 1970'],
                    correct: 'C'
                },
                {
                    question: '¿Cuál es el océano más grande?',
                    options: ['A) Atlántico', 'B) Índico', 'C) Ártico', 'D) Pacífico'],
                    correct: 'D'
                }
            ];
            
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            
            return {
                type: 'text',
                content: `🧠 *QUIZ INTERACTIVO*\n\n` +
                        `❓ ${randomQuestion.question}\n\n` +
                        `${randomQuestion.options.join('\n')}\n\n` +
                        `Responde con la letra correspondiente (A, B, C o D)`
            };
        }
        
        return {
            type: 'text',
            content: '🎮 Comandos interactivos disponibles:\n\n• */interactive quiz* - Quiz de preguntas'
        };
    }

    // MANEJAR COMANDOS PROGRAMADOS
    async handleScheduledCommand(message, args) {
        // Ejemplo: Recordatorios programados
        if (args[0] === 'recordatorio') {
            const time = args[1]; // formato: HH:MM
            const reminderText = args.slice(2).join(' ');
            
            if (!time || !reminderText) {
                return {
                    type: 'text',
                    content: '⏰ Uso: */scheduled recordatorio HH:MM tu mensaje*\n\nEjemplo: */scheduled recordatorio 15:30 Reunión importante*'
                };
            }
            
            // Aquí iría la lógica para programar el recordatorio
            // Por ahora solo confirmamos la recepción
            return {
                type: 'text',
                content: `⏰ *Recordatorio programado*\n\n` +
                        `🕐 Hora: ${time}\n` +
                        `📝 Mensaje: ${reminderText}\n\n` +
                        `✅ Te recordaré a la hora indicada.`
            };
        }
        
        return {
            type: 'text',
            content: '⏰ Comandos programados disponibles:\n\n• */scheduled recordatorio HH:MM mensaje* - Programar recordatorio'
        };
    }

    // MANEJAR COMANDO DESCONOCIDO
    handleUnknownCommand(command) {
        return {
            type: 'text',
            content: `❓ Comando "${command}" no reconocido.\n\n` +
                    `Comandos complejos disponibles:\n` +
                    `• */multi-step* - Comandos de múltiples pasos\n` +
                    `• */interactive* - Comandos interactivos\n` +
                    `• */scheduled* - Comandos programados`
        };
    }

    // AGREGAR AL HISTORIAL DE COMANDOS
    addToHistory(userId, command, args) {
        if (!this.commandHistory.has(userId)) {
            this.commandHistory.set(userId, []);
        }
        
        const userHistory = this.commandHistory.get(userId);
        userHistory.push({
            command,
            args,
            timestamp: new Date(),
            executed: true
        });
        
        // Mantener solo los últimos 50 comandos por usuario
        if (userHistory.length > 50) {
            userHistory.shift();
        }
        
        this.logger.debug(`📚 Comando agregado al historial de ${userId}: ${command}`);
    }

    // OBTENER HISTORIAL DE USUARIO
    getUserHistory(userId) {
        return this.commandHistory.get(userId) || [];
    }

    // LIMPIAR HISTORIAL DE USUARIO
    clearUserHistory(userId) {
        this.commandHistory.delete(userId);
        this.userSessions.delete(userId);
        this.logger.info(`🧹 Historial limpiado para usuario: ${userId}`);
    }

    // OBTENER ESTADÍSTICAS DE COMANDOS
    getCommandStats() {
        const totalUsers = this.commandHistory.size;
        let totalCommands = 0;
        const commandFrequency = new Map();
        
        for (const userHistory of this.commandHistory.values()) {
            totalCommands += userHistory.length;
            
            for (const entry of userHistory) {
                const count = commandFrequency.get(entry.command) || 0;
                commandFrequency.set(entry.command, count + 1);
            }
        }
        
        return {
            totalUsers,
            totalCommands,
            commandFrequency: Object.fromEntries(commandFrequency),
            averageCommandsPerUser: totalUsers > 0 ? (totalCommands / totalUsers).toFixed(2) : 0
        };
    }

    // GUARDAR DATOS DE USUARIO
    async saveUserData(userId, userData) {
        try {
            // Aquí iría la lógica para guardar en base de datos
            // Por ahora solo logueamos
            this.logger.info(`💾 Datos guardados para usuario ${userId}:`, userData);
            return true;
        } catch (error) {
            this.logger.error('Error al guardar datos de usuario:', error);
            return false;
        }
    }

    // VALIDAR FORMATO DE COMANDO
    validateCommandFormat(command, expectedArgs) {
        // Implementar validación de formato según sea necesario
        return true;
    }

    // PROCESAR COMANDOS EN LOTE
    async processBatchCommands(commands) {
        const results = [];
        
        for (const command of commands) {
            try {
                const result = await this.processComplexCommand(command.message, command.command, command.args);
                results.push({ success: true, result });
            } catch (error) {
                results.push({ success: false, error: error.message });
            }
        }
        
        return results;
    }
}

module.exports = CommandProcessor;
