// SISTEMA DE LOGGING - PLANTILLA UNIVERSAL
const fs = require('fs-extra');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = './data/logs';
        this.logLevel = process.env.LOG_LEVEL || 'info';
        this.logToFile = process.env.LOG_TO_FILE === 'true';
        this.logToConsole = process.env.LOG_TO_CONSOLE !== 'false';
        this.maxFileSize = parseInt(process.env.MAX_LOG_FILE_SIZE) || 10485760; // 10MB
        this.maxFiles = parseInt(process.env.MAX_LOG_FILES) || 10;
        
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };

        this.colors = {
            error: '\\x1b[31m', // Rojo
            warn: '\\x1b[33m',  // Amarillo
            info: '\\x1b[36m',  // Cian
            debug: '\\x1b[90m', // Gris
            reset: '\\x1b[0m'
        };

        this.init();
    }

    async init() {
        if (this.logToFile) {
            await fs.ensureDir(this.logDir);
        }
    }

    log(level, message, data = null) {
        if (this.levels[level] > this.levels[this.logLevel]) {
            return;
        }

        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level: level.toUpperCase(),
            message,
            data
        };

        if (this.logToConsole) {
            this.logToConsoleMethod(logEntry);
        }

        if (this.logToFile) {
            this.logToFileMethod(logEntry);
        }
    }

    logToConsoleMethod(logEntry) {
        const color = this.colors[logEntry.level.toLowerCase()] || this.colors.info;
        const reset = this.colors.reset;
        
        let output = `${color}[${logEntry.timestamp}] ${logEntry.level}: ${logEntry.message}${reset}`;
        
        if (logEntry.data) {
            output += `\\n${JSON.stringify(logEntry.data, null, 2)}`;
        }

        console.log(output);
    }

    async logToFileMethod(logEntry) {
        try {
            const filename = this.getLogFileName();
            const logLine = JSON.stringify(logEntry) + '\\n';
            
            await fs.appendFile(filename, logLine);
            
            // Verificar tamaño del archivo y rotar si es necesario
            await this.rotateLogIfNeeded(filename);
        } catch (error) {
            console.error('Error escribiendo log:', error);
        }
    }

    getLogFileName() {
        const date = new Date().toISOString().split('T')[0];
        return path.join(this.logDir, `bot-${date}.log`);
    }

    async rotateLogIfNeeded(filename) {
        try {
            const stats = await fs.stat(filename);
            
            if (stats.size > this.maxFileSize) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const rotatedFilename = filename.replace('.log', `-${timestamp}.log`);
                
                await fs.move(filename, rotatedFilename);
                
                // Limpiar archivos antiguos
                await this.cleanOldLogs();
            }
        } catch (error) {
            // El archivo puede no existir aún, esto es normal
        }
    }

    async cleanOldLogs() {
        try {
            const files = await fs.readdir(this.logDir);
            const logFiles = files
                .filter(file => file.endsWith('.log'))
                .map(file => ({
                    name: file,
                    path: path.join(this.logDir, file),
                    stat: fs.statSync(path.join(this.logDir, file))
                }))
                .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());

            // Eliminar archivos excedentes
            if (logFiles.length > this.maxFiles) {
                const filesToDelete = logFiles.slice(this.maxFiles);
                
                for (const file of filesToDelete) {
                    await fs.remove(file.path);
                    this.info(`Log file deleted: ${file.name}`);
                }
            }
        } catch (error) {
            console.error('Error cleaning old logs:', error);
        }
    }

    // Métodos de conveniencia para diferentes niveles
    error(message, data = null) {
        this.log('error', message, data);
    }

    warn(message, data = null) {
        this.log('warn', message, data);
    }

    info(message, data = null) {
        this.log('info', message, data);
    }

    debug(message, data = null) {
        this.log('debug', message, data);
    }

    // Método para buscar en logs
    async searchLogs(query, daysBack = 7) {
        try {
            const results = [];
            const files = await fs.readdir(this.logDir);
            
            for (const file of files) {
                if (!file.endsWith('.log')) continue;
                
                const filePath = path.join(this.logDir, file);
                const content = await fs.readFile(filePath, 'utf8');
                const lines = content.split('\\n').filter(line => line.trim());
                
                for (const line of lines) {
                    try {
                        const logEntry = JSON.parse(line);
                        if (logEntry.message.toLowerCase().includes(query.toLowerCase()) ||
                            (logEntry.data && JSON.stringify(logEntry.data).toLowerCase().includes(query.toLowerCase()))) {
                            results.push(logEntry);
                        }
                    } catch (parseError) {
                        // Ignorar líneas que no sean JSON válido
                    }
                }
            }
            
            return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } catch (error) {
            this.error('Error searching logs:', error);
            return [];
        }
    }

    // Método para obtener estadísticas de logs
    async getLogStats() {
        try {
            const stats = {
                totalFiles: 0,
                totalSize: 0,
                logCounts: { error: 0, warn: 0, info: 0, debug: 0 },
                oldestLog: null,
                newestLog: null
            };

            const files = await fs.readdir(this.logDir);
            
            for (const file of files) {
                if (!file.endsWith('.log')) continue;
                
                stats.totalFiles++;
                const filePath = path.join(this.logDir, file);
                const fileStat = await fs.stat(filePath);
                stats.totalSize += fileStat.size;
                
                // Actualizar fechas de logs más antiguos y nuevos
                if (!stats.oldestLog || fileStat.mtime < stats.oldestLog) {
                    stats.oldestLog = fileStat.mtime;
                }
                if (!stats.newestLog || fileStat.mtime > stats.newestLog) {
                    stats.newestLog = fileStat.mtime;
                }
                
                // Contar tipos de logs
                const content = await fs.readFile(filePath, 'utf8');
                const lines = content.split('\\n').filter(line => line.trim());
                
                for (const line of lines) {
                    try {
                        const logEntry = JSON.parse(line);
                        const level = logEntry.level.toLowerCase();
                        if (stats.logCounts[level] !== undefined) {
                            stats.logCounts[level]++;
                        }
                    } catch (parseError) {
                        // Ignorar líneas inválidas
                    }
                }
            }
            
            return stats;
        } catch (error) {
            this.error('Error getting log stats:', error);
            return null;
        }
    }
}

module.exports = Logger;
