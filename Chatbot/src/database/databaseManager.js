// ADMINISTRADOR DE BASE DE DATOS
const fs = require('fs-extra');
const path = require('path');
const Logger = require('../utils/logger');

class DatabaseManager {
    constructor() {
        this.logger = new Logger();
        this.dbPath = './data/database.json';
        this.backupPath = './data/backups';
        this.data = {
            users: {},
            messages: [],
            settings: {},
            statistics: {},
            created: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        this.isInitialized = false;
    }

    // INICIALIZAR BASE DE DATOS
    async init() {
        try {
            this.logger.info('🗄️ Inicializando base de datos...');
            
            // Crear directorio de backups
            await fs.ensureDir(this.backupPath);
            
            // Cargar datos existentes o crear nueva base de datos
            if (await fs.pathExists(this.dbPath)) {
                await this.loadData();
                this.logger.success('✅ Base de datos cargada exitosamente');
            } else {
                await this.createNewDatabase();
                this.logger.success('✅ Nueva base de datos creada');
            }
            
            this.isInitialized = true;
            
            // Programar backups automáticos
            this.scheduleBackups();
            
        } catch (error) {
            this.logger.error('❌ Error al inicializar base de datos:', error);
            throw error;
        }
    }

    // CARGAR DATOS EXISTENTES
    async loadData() {
        try {
            const rawData = await fs.readFile(this.dbPath, 'utf8');
            this.data = JSON.parse(rawData);
            
            // Validar estructura de datos
            this.validateDataStructure();
            
            this.logger.info('📊 Datos cargados:', {
                users: Object.keys(this.data.users).length,
                messages: this.data.messages.length,
                settings: Object.keys(this.data.settings).length
            });
            
        } catch (error) {
            this.logger.error('Error al cargar datos:', error);
            await this.createNewDatabase();
        }
    }

    // CREAR NUEVA BASE DE DATOS
    async createNewDatabase() {
        this.data = {
            users: {},
            messages: [],
            settings: {
                botName: 'WhatsApp Bot Assistant',
                version: '1.0.0',
                maxMessagesHistory: 1000,
                autoBackup: true,
                backupInterval: 24 * 60 * 60 * 1000 // 24 horas
            },
            statistics: {
                totalMessages: 0,
                totalUsers: 0,
                startDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            },
            created: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        
        await this.saveData();
    }

    // VALIDAR ESTRUCTURA DE DATOS
    validateDataStructure() {
        const requiredKeys = ['users', 'messages', 'settings', 'statistics'];
        
        for (const key of requiredKeys) {
            if (!this.data[key]) {
                this.data[key] = key === 'messages' ? [] : {};
            }
        }
        
        // Asegurar configuraciones por defecto
        if (!this.data.settings.maxMessagesHistory) {
            this.data.settings.maxMessagesHistory = 1000;
        }
    }

    // GUARDAR DATOS
    async saveData() {
        try {
            this.data.lastModified = new Date().toISOString();
            const dataString = JSON.stringify(this.data, null, 2);
            await fs.writeFile(this.dbPath, dataString, 'utf8');
            this.logger.debug('💾 Datos guardados en base de datos');
        } catch (error) {
            this.logger.error('Error al guardar datos:', error);
            throw error;
        }
    }

    // GESTIÓN DE USUARIOS

    // Agregar o actualizar usuario
    async addUser(userId, userData = {}) {
        if (!this.isInitialized) {
            throw new Error('Base de datos no inicializada');
        }

        const now = new Date().toISOString();
        
        if (!this.data.users[userId]) {
            this.data.users[userId] = {
                id: userId,
                firstContact: now,
                lastActivity: now,
                messageCount: 0,
                profile: {},
                preferences: {},
                history: [],
                ...userData
            };
            
            this.data.statistics.totalUsers++;
            this.logger.info(`👤 Nuevo usuario registrado: ${userId}`);
        } else {
            // Actualizar usuario existente
            this.data.users[userId] = {
                ...this.data.users[userId],
                ...userData,
                lastActivity: now
            };
        }
        
        await this.saveData();
        return this.data.users[userId];
    }

    // Obtener usuario
    getUser(userId) {
        return this.data.users[userId] || null;
    }

    // Actualizar actividad del usuario
    async updateUserActivity(userId) {
        if (this.data.users[userId]) {
            this.data.users[userId].lastActivity = new Date().toISOString();
            this.data.users[userId].messageCount++;
            this.data.statistics.lastActivity = new Date().toISOString();
            await this.saveData();
        }
    }

    // GESTIÓN DE MENSAJES

    // Agregar mensaje
    async addMessage(messageData) {
        if (!this.isInitialized) {
            throw new Error('Base de datos no inicializada');
        }

        const message = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            from: messageData.from,
            body: messageData.body,
            type: messageData.type || 'text',
            processed: false,
            ...messageData
        };

        this.data.messages.push(message);
        this.data.statistics.totalMessages++;

        // Mantener límite de mensajes
        const maxMessages = this.data.settings.maxMessagesHistory;
        if (this.data.messages.length > maxMessages) {
            this.data.messages = this.data.messages.slice(-maxMessages);
        }

        await this.saveData();
        return message;
    }

    // Obtener mensajes por usuario
    getMessagesByUser(userId, limit = 50) {
        return this.data.messages
            .filter(msg => msg.from === userId)
            .slice(-limit)
            .reverse();
    }

    // Obtener mensajes recientes
    getRecentMessages(limit = 100) {
        return this.data.messages.slice(-limit).reverse();
    }

    // GESTIÓN DE CONFIGURACIONES

    // Obtener configuración
    getSetting(key, defaultValue = null) {
        return this.data.settings[key] || defaultValue;
    }

    // Establecer configuración
    async setSetting(key, value) {
        this.data.settings[key] = value;
        await this.saveData();
        this.logger.info(`⚙️ Configuración actualizada: ${key} = ${value}`);
    }

    // ESTADÍSTICAS

    // Obtener estadísticas
    getStatistics() {
        const totalUsers = Object.keys(this.data.users).length;
        const totalMessages = this.data.messages.length;
        const recentUsers = this.getActiveUsersInLast(24); // últimas 24 horas
        
        return {
            ...this.data.statistics,
            totalUsers,
            totalMessages,
            recentActiveUsers: recentUsers.length,
            databaseSize: this.calculateDatabaseSize(),
            uptime: this.calculateUptime()
        };
    }

    // Usuarios activos en las últimas X horas
    getActiveUsersInLast(hours) {
        const timeLimit = new Date(Date.now() - (hours * 60 * 60 * 1000));
        
        return Object.values(this.data.users).filter(user => {
            return new Date(user.lastActivity) > timeLimit;
        });
    }

    // BACKUPS

    // Crear backup
    async createBackup() {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFileName = `backup-${timestamp}.json`;
            const backupFilePath = path.join(this.backupPath, backupFileName);
            
            await fs.copy(this.dbPath, backupFilePath);
            
            this.logger.success(`📦 Backup creado: ${backupFileName}`);
            
            // Limpiar backups antiguos
            await this.cleanOldBackups();
            
            return backupFilePath;
        } catch (error) {
            this.logger.error('Error al crear backup:', error);
            throw error;
        }
    }

    // Programar backups automáticos
    scheduleBackups() {
        const backupInterval = this.getSetting('backupInterval', 24 * 60 * 60 * 1000);
        
        setInterval(async () => {
            if (this.getSetting('autoBackup', true)) {
                await this.createBackup();
            }
        }, backupInterval);
        
        this.logger.info(`🕐 Backups automáticos programados cada ${backupInterval / 1000 / 60 / 60} horas`);
    }

    // Limpiar backups antiguos
    async cleanOldBackups() {
        try {
            const files = await fs.readdir(this.backupPath);
            const backupFiles = files.filter(file => file.startsWith('backup-') && file.endsWith('.json'));
            
            // Mantener solo los últimos 10 backups
            if (backupFiles.length > 10) {
                backupFiles.sort();
                const filesToDelete = backupFiles.slice(0, -10);
                
                for (const file of filesToDelete) {
                    await fs.remove(path.join(this.backupPath, file));
                    this.logger.info(`🗑️ Backup antiguo eliminado: ${file}`);
                }
            }
        } catch (error) {
            this.logger.error('Error al limpiar backups antiguos:', error);
        }
    }

    // MÉTODOS AUXILIARES

    // Generar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Calcular tamaño de base de datos
    calculateDatabaseSize() {
        try {
            const stats = require('fs').statSync(this.dbPath);
            return Math.round(stats.size / 1024); // KB
        } catch {
            return 0;
        }
    }

    // Calcular tiempo de actividad
    calculateUptime() {
        if (this.data.statistics.startDate) {
            return Date.now() - new Date(this.data.statistics.startDate).getTime();
        }
        return 0;
    }

    // Exportar datos
    async exportData() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const exportPath = `./data/export-${timestamp}.json`;
        
        await fs.copy(this.dbPath, exportPath);
        
        this.logger.success(`📤 Datos exportados a: ${exportPath}`);
        return exportPath;
    }

    // Cerrar base de datos
    async close() {
        if (this.isInitialized) {
            await this.saveData();
            await this.createBackup();
            this.logger.info('🔒 Base de datos cerrada correctamente');
        }
    }

    // Resetear base de datos (usar con precaución)
    async reset() {
        this.logger.warn('⚠️ Reseteando base de datos...');
        await this.createBackup(); // Backup antes de resetear
        await this.createNewDatabase();
        this.logger.success('✅ Base de datos reseteada');
    }
}

module.exports = DatabaseManager;
