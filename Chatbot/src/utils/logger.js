// SISTEMA DE LOGGING AVANZADO
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

class Logger {
    constructor(options = {}) {
        this.options = {
            logLevel: options.logLevel || 'info',
            logToFile: options.logToFile !== false,
            logToConsole: options.logToConsole !== false,
            logDirectory: options.logDirectory || './data/logs',
            maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10MB
            maxFiles: options.maxFiles || 10,
            dateFormat: options.dateFormat || 'YYYY-MM-DD HH:mm:ss',
            ...options
        };

        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3,
            verbose: 4
        };

        this.colors = {
            error: '\x1b[31m',   // Rojo
            warn: '\x1b[33m',    // Amarillo
            info: '\x1b[36m',    // Cian
            debug: '\x1b[35m',   // Magenta
            verbose: '\x1b[37m', // Blanco
            success: '\x1b[32m', // Verde
            reset: '\x1b[0m'     // Reset
        };

        this.currentLogFile = null;
        this.init();
    }

    // INICIALIZAR LOGGER
    async init() {
        if (this.options.logToFile) {
            await fs.ensureDir(this.options.logDirectory);
            this.currentLogFile = this.generateLogFileName();
        }
    }

    // GENERAR NOMBRE DE ARCHIVO DE LOG
    generateLogFileName() {
        const date = moment().format('YYYY-MM-DD');
        return path.join(this.options.logDirectory, `bot-${date}.log`);
    }

    // MÉTODO PRINCIPAL DE LOGGING
    async log(level, message, data = null) {
        if (this.levels[level] > this.levels[this.options.logLevel]) {
            return; // No loguear si el nivel es menor al configurado
        }

        const timestamp = moment().format(this.options.dateFormat);
        const logEntry = this.formatLogEntry(timestamp, level, message, data);

        // Log a consola
        if (this.options.logToConsole) {
            this.logToConsole(level, logEntry);
        }

        // Log a archivo
        if (this.options.logToFile) {
            await this.logToFile(logEntry);
        }
    }

    // FORMATEAR ENTRADA DE LOG
    formatLogEntry(timestamp, level, message, data) {
        let entry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        
        if (data) {
            if (typeof data === 'object') {
                entry += ` | DATA: ${JSON.stringify(data, null, 2)}`;
            } else {
                entry += ` | DATA: ${data}`;
            }
        }

        return entry;
    }

    // LOG A CONSOLA CON COLORES
    logToConsole(level, message) {
        const color = this.colors[level] || this.colors.info;
        const resetColor = this.colors.reset;
        
        console.log(`${color}${message}${resetColor}`);
    }

    // LOG A ARCHIVO
    async logToFile(message) {
        try {
            // Rotar archivo si es necesario
            await this.rotateLogFileIfNeeded();
            
            // Escribir al archivo
            await fs.appendFile(this.currentLogFile, message + '\n', 'utf8');
        } catch (error) {
            console.error('Error escribiendo al archivo de log:', error);
        }
    }

    // ROTAR ARCHIVO DE LOG SI ES NECESARIO
    async rotateLogFileIfNeeded() {
        if (!this.currentLogFile || !await fs.pathExists(this.currentLogFile)) {
            return;
        }

        const stats = await fs.stat(this.currentLogFile);
        
        // Rotar por tamaño
        if (stats.size >= this.options.maxFileSize) {
            await this.rotateLogFile();
        }
        
        // Rotar por fecha (nuevo día)
        const newLogFile = this.generateLogFileName();
        if (newLogFile !== this.currentLogFile) {
            this.currentLogFile = newLogFile;
        }
    }

    // ROTAR ARCHIVO DE LOG
    async rotateLogFile() {
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const rotatedFile = this.currentLogFile.replace('.log', `_${timestamp}.log`);
        
        await fs.move(this.currentLogFile, rotatedFile);
        
        // Limpiar archivos antiguos
        await this.cleanOldLogFiles();
    }

    // LIMPIAR ARCHIVOS DE LOG ANTIGUOS
    async cleanOldLogFiles() {
        try {
            const files = await fs.readdir(this.options.logDirectory);
            const logFiles = files
                .filter(file => file.startsWith('bot-') && file.endsWith('.log'))
                .map(file => ({
                    name: file,
                    path: path.join(this.options.logDirectory, file),
                    stats: null
                }));

            // Obtener estadísticas de archivos
            for (const file of logFiles) {
                file.stats = await fs.stat(file.path);
            }

            // Ordenar por fecha de modificación (más reciente primero)
            logFiles.sort((a, b) => b.stats.mtime - a.stats.mtime);

            // Eliminar archivos excedentes
            if (logFiles.length > this.options.maxFiles) {
                const filesToDelete = logFiles.slice(this.options.maxFiles);
                
                for (const file of filesToDelete) {
                    await fs.remove(file.path);
                    await this.info(`Archivo de log eliminado: ${file.name}`);
                }
            }
        } catch (error) {
            console.error('Error limpiando archivos de log antiguos:', error);
        }
    }

    // MÉTODOS DE LOGGING POR NIVEL

    async error(message, data = null) {
        await this.log('error', `❌ ${message}`, data);
    }

    async warn(message, data = null) {
        await this.log('warn', `⚠️  ${message}`, data);
    }

    async info(message, data = null) {
        await this.log('info', `ℹ️  ${message}`, data);
    }

    async debug(message, data = null) {
        await this.log('debug', `🐛 ${message}`, data);
    }

    async verbose(message, data = null) {
        await this.log('verbose', `📝 ${message}`, data);
    }

    async success(message, data = null) {
        const timestamp = moment().format(this.options.dateFormat);
        const logEntry = this.formatLogEntry(timestamp, 'success', `✅ ${message}`, data);
        
        if (this.options.logToConsole) {
            const color = this.colors.success;
            const resetColor = this.colors.reset;
            console.log(`${color}${logEntry}${resetColor}`);
        }
        
        if (this.options.logToFile) {
            await this.logToFile(logEntry);
        }
    }

    // MÉTODOS ESPECIALES

    // Log de rendimiento
    async performance(operation, duration, data = null) {
        const message = `⚡ ${operation} completado en ${duration}ms`;
        await this.log('info', message, data);
    }

    // Log de seguridad
    async security(event, details = null) {
        const message = `🔒 Evento de seguridad: ${event}`;
        await this.log('warn', message, details);
    }

    // Log de API
    async api(method, endpoint, status, duration = null) {
        const message = `🌐 API ${method} ${endpoint} - Status: ${status}${duration ? ` (${duration}ms)` : ''}`;
        await this.log('info', message);
    }

    // Log de base de datos
    async database(operation, details = null) {
        const message = `🗄️  DB: ${operation}`;
        await this.log('debug', message, details);
    }

    // UTILIDADES

    // Crear logger hijo con contexto
    createChild(context) {
        const childLogger = new Logger(this.options);
        const originalLog = childLogger.log.bind(childLogger);
        
        childLogger.log = async (level, message, data = null) => {
            const contextMessage = `[${context}] ${message}`;
            return originalLog(level, contextMessage, data);
        };
        
        return childLogger;
    }

    // Obtener estadísticas de logs
    async getLogStats() {
        if (!this.options.logToFile) {
            return { message: 'Logging a archivo deshabilitado' };
        }

        try {
            const files = await fs.readdir(this.options.logDirectory);
            const logFiles = files.filter(file => file.startsWith('bot-') && file.endsWith('.log'));
            
            let totalSize = 0;
            let oldestDate = null;
            let newestDate = null;

            for (const file of logFiles) {
                const filePath = path.join(this.options.logDirectory, file);
                const stats = await fs.stat(filePath);
                
                totalSize += stats.size;
                
                if (!oldestDate || stats.mtime < oldestDate) {
                    oldestDate = stats.mtime;
                }
                
                if (!newestDate || stats.mtime > newestDate) {
                    newestDate = stats.mtime;
                }
            }

            return {
                totalFiles: logFiles.length,
                totalSize: Math.round(totalSize / 1024), // KB
                oldestLog: oldestDate ? moment(oldestDate).format('YYYY-MM-DD HH:mm:ss') : null,
                newestLog: newestDate ? moment(newestDate).format('YYYY-MM-DD HH:mm:ss') : null,
                currentLogFile: this.currentLogFile
            };
        } catch (error) {
            await this.error('Error obteniendo estadísticas de logs', error);
            return { error: 'Error obteniendo estadísticas' };
        }
    }

    // Leer logs recientes
    async getRecentLogs(lines = 100) {
        if (!this.currentLogFile || !await fs.pathExists(this.currentLogFile)) {
            return [];
        }

        try {
            const content = await fs.readFile(this.currentLogFile, 'utf8');
            const logLines = content.split('\n').filter(line => line.trim());
            
            return logLines.slice(-lines);
        } catch (error) {
            await this.error('Error leyendo logs recientes', error);
            return [];
        }
    }

    // Buscar en logs
    async searchLogs(query, maxResults = 50) {
        if (!this.currentLogFile || !await fs.pathExists(this.currentLogFile)) {
            return [];
        }

        try {
            const content = await fs.readFile(this.currentLogFile, 'utf8');
            const logLines = content.split('\n').filter(line => line.trim());
            
            const matchingLines = logLines
                .filter(line => line.toLowerCase().includes(query.toLowerCase()))
                .slice(-maxResults);
            
            return matchingLines;
        } catch (error) {
            await this.error('Error buscando en logs', error);
            return [];
        }
    }

    // Configurar nivel de log dinámicamente
    setLogLevel(level) {
        if (this.levels.hasOwnProperty(level)) {
            this.options.logLevel = level;
            this.info(`Nivel de log cambiado a: ${level}`);
        } else {
            this.warn(`Nivel de log inválido: ${level}`);
        }
    }
}

module.exports = Logger;
