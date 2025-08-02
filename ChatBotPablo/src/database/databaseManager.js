// GESTOR DE BASE DE DATOS - PLANTILLA UNIVERSAL
const fs = require('fs-extra');
const path = require('path');

class DatabaseManager {
    constructor() {
        this.dataDir = './data';
        this.usersFile = path.join(this.dataDir, 'users.json');
        this.messagesFile = path.join(this.dataDir, 'messages.json');
        this.settingsFile = path.join(this.dataDir, 'settings.json');
        this.statsFile = path.join(this.dataDir, 'statistics.json');
        
        this.maxMessages = parseInt(process.env.DB_MAX_MESSAGES) || 1000;
        this.autoBackup = process.env.AUTO_BACKUP === 'true';
        this.backupInterval = parseInt(process.env.BACKUP_INTERVAL_HOURS) || 24;
        
        this.init();
    }

    async init() {
        await fs.ensureDir(this.dataDir);
        await fs.ensureDir(path.join(this.dataDir, 'backups'));
        
        // Inicializar archivos si no existen
        await this.initializeFile(this.usersFile, []);
        await this.initializeFile(this.messagesFile, []);
        await this.initializeFile(this.settingsFile, {
            botName: process.env.BOT_NAME || 'ChatBot Assistant',
            version: '1.0.0',
            createdAt: new Date().toISOString(),
            lastBackup: null
        });
        await this.initializeFile(this.statsFile, {
            totalMessages: 0,
            totalUsers: 0,
            commandsUsed: {},
            dailyStats: {},
            lastReset: new Date().toISOString()
        });

        // Configurar backup automático
        if (this.autoBackup) {
            this.scheduleBackup();
        }
    }

    async initializeFile(filePath, defaultData) {
        if (!await fs.pathExists(filePath)) {
            await fs.writeJson(filePath, defaultData, { spaces: 2 });
        }
    }

    // MÉTODOS PARA USUARIOS
    async saveUser(userData) {
        try {
            const users = await this.getUsers();
            const existingIndex = users.findIndex(user => user.phone === userData.phone);
            
            const userToSave = {
                phone: userData.phone,
                name: userData.name || 'Usuario',
                firstContact: existingIndex === -1 ? new Date().toISOString() : users[existingIndex].firstContact,
                lastContact: new Date().toISOString(),
                messageCount: existingIndex === -1 ? 1 : users[existingIndex].messageCount + 1,
                ...userData
            };

            if (existingIndex === -1) {
                users.push(userToSave);
            } else {
                users[existingIndex] = userToSave;
            }

            await fs.writeJson(this.usersFile, users, { spaces: 2 });
            return userToSave;
        } catch (error) {
            console.error('Error guardando usuario:', error);
            throw error;
        }
    }

    async getUsers() {
        try {
            return await fs.readJson(this.usersFile);
        } catch (error) {
            return [];
        }
    }

    async getUserByPhone(phone) {
        const users = await this.getUsers();
        return users.find(user => user.phone === phone);
    }

    // MÉTODOS PARA MENSAJES
    async saveMessage(messageData) {
        try {
            const messages = await this.getMessages();
            
            const message = {
                id: Date.now().toString(),
                from: messageData.from,
                body: messageData.body,
                timestamp: messageData.timestamp || new Date().toISOString(),
                type: messageData.type || 'received',
                command: messageData.body.startsWith('/') ? messageData.body.split(' ')[0] : null
            };

            messages.push(message);

            // Mantener solo los últimos X mensajes
            if (messages.length > this.maxMessages) {
                messages.splice(0, messages.length - this.maxMessages);
            }

            await fs.writeJson(this.messagesFile, messages, { spaces: 2 });
            
            // Actualizar estadísticas
            await this.updateStatistics(message);
            
            return message;
        } catch (error) {
            console.error('Error guardando mensaje:', error);
            throw error;
        }
    }

    async getMessages(limit = null) {
        try {
            const messages = await fs.readJson(this.messagesFile);
            return limit ? messages.slice(-limit) : messages;
        } catch (error) {
            return [];
        }
    }

    async getMessagesByUser(phone, limit = 50) {
        const messages = await this.getMessages();
        return messages
            .filter(msg => msg.from === phone)
            .slice(-limit);
    }

    // MÉTODOS PARA ESTADÍSTICAS
    async updateStatistics(message) {
        try {
            const stats = await fs.readJson(this.statsFile);
            
            stats.totalMessages = (stats.totalMessages || 0) + 1;
            
            // Contar usuarios únicos
            const users = await this.getUsers();
            stats.totalUsers = users.length;
            
            // Contar comandos
            if (message.command) {
                stats.commandsUsed = stats.commandsUsed || {};
                stats.commandsUsed[message.command] = (stats.commandsUsed[message.command] || 0) + 1;
            }
            
            // Estadísticas diarias
            const today = new Date().toISOString().split('T')[0];
            stats.dailyStats = stats.dailyStats || {};
            stats.dailyStats[today] = (stats.dailyStats[today] || 0) + 1;
            
            await fs.writeJson(this.statsFile, stats, { spaces: 2 });
        } catch (error) {
            console.error('Error actualizando estadísticas:', error);
        }
    }

    async getStatistics() {
        try {
            return await fs.readJson(this.statsFile);
        } catch (error) {
            return {
                totalMessages: 0,
                totalUsers: 0,
                commandsUsed: {},
                dailyStats: {}
            };
        }
    }

    // MÉTODOS PARA CONFIGURACIÓN
    async getSettings() {
        try {
            return await fs.readJson(this.settingsFile);
        } catch (error) {
            return {};
        }
    }

    async updateSettings(newSettings) {
        try {
            const currentSettings = await this.getSettings();
            const updatedSettings = { ...currentSettings, ...newSettings };
            await fs.writeJson(this.settingsFile, updatedSettings, { spaces: 2 });
            return updatedSettings;
        } catch (error) {
            console.error('Error actualizando configuración:', error);
            throw error;
        }
    }

    // MÉTODOS PARA BACKUP
    async createBackup() {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupDir = path.join(this.dataDir, 'backups', `backup-${timestamp}`);
            
            await fs.ensureDir(backupDir);
            
            // Copiar archivos de datos
            await fs.copy(this.usersFile, path.join(backupDir, 'users.json'));
            await fs.copy(this.messagesFile, path.join(backupDir, 'messages.json'));
            await fs.copy(this.settingsFile, path.join(backupDir, 'settings.json'));
            await fs.copy(this.statsFile, path.join(backupDir, 'statistics.json'));
            
            // Actualizar fecha del último backup
            await this.updateSettings({ lastBackup: new Date().toISOString() });
            
            console.log(`✅ Backup creado: ${backupDir}`);
            return backupDir;
        } catch (error) {
            console.error('Error creando backup:', error);
            throw error;
        }
    }

    scheduleBackup() {
        const intervalMs = this.backupInterval * 60 * 60 * 1000; // Convertir horas a milisegundos
        
        setInterval(async () => {
            try {
                await this.createBackup();
                console.log('🔄 Backup automático completado');
            } catch (error) {
                console.error('❌ Error en backup automático:', error);
            }
        }, intervalMs);
        
        console.log(`🔄 Backup automático configurado cada ${this.backupInterval} horas`);
    }

    // MÉTODO PARA LIMPIAR DATOS ANTIGUOS
    async cleanOldData(daysToKeep = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
            
            const messages = await this.getMessages();
            const filteredMessages = messages.filter(msg => 
                new Date(msg.timestamp) > cutoffDate
            );
            
            await fs.writeJson(this.messagesFile, filteredMessages, { spaces: 2 });
            
            console.log(`🧹 Limpieza completada. Eliminados ${messages.length - filteredMessages.length} mensajes antiguos`);
            return messages.length - filteredMessages.length;
        } catch (error) {
            console.error('Error limpiando datos antiguos:', error);
            throw error;
        }
    }
}

module.exports = DatabaseManager;
