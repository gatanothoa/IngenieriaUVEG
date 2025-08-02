#!/bin/bash
# 🔧 SCRIPT DE MANTENIMIENTO AUTOMÁTICO - CHATBOT WHATSAPP
# Ejecutar semanalmente para mantener el proyecto actualizado

echo "🤖 INICIANDO MANTENIMIENTO DEL CHATBOT..."
echo "=================================================="

# Verificar versiones actuales
echo "📋 Verificando versiones..."
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"

# Navegar al directorio del proyecto
cd "c:\Users\Tiamat\Dropbox\universidad\Udemy\Chatbot"

echo ""
echo "🔍 VERIFICANDO DEPENDENCIAS DESACTUALIZADAS..."
npm outdated

echo ""
echo "🔒 VERIFICANDO VULNERABILIDADES DE SEGURIDAD..."
npm audit

echo ""
echo "📊 VERIFICANDO TAMAÑO DE LA BASE DE DATOS..."
if [ -f "./data/database.json" ]; then
    DB_SIZE=$(du -h "./data/database.json" | cut -f1)
    echo "Base de datos: $DB_SIZE"
else
    echo "Base de datos no encontrada"
fi

echo ""
echo "📝 VERIFICANDO LOGS..."
if [ -d "./data/logs" ]; then
    LOG_COUNT=$(find "./data/logs" -name "*.log" | wc -l)
    echo "Archivos de log: $LOG_COUNT"
    
    # Mostrar logs más recientes
    echo "Últimos 5 errores:"
    find "./data/logs" -name "*.log" -exec grep -l "ERROR\|❌" {} \; | head -5
else
    echo "Directorio de logs no encontrado"
fi

echo ""
echo "💾 VERIFICANDO BACKUPS..."
if [ -d "./data/backups" ]; then
    BACKUP_COUNT=$(find "./data/backups" -name "backup-*.json" | wc -l)
    echo "Backups disponibles: $BACKUP_COUNT"
    
    # Mostrar backup más reciente
    LATEST_BACKUP=$(find "./data/backups" -name "backup-*.json" | sort | tail -1)
    if [ ! -z "$LATEST_BACKUP" ]; then
        BACKUP_DATE=$(basename "$LATEST_BACKUP" | sed 's/backup-\|\.json//g')
        echo "Último backup: $BACKUP_DATE"
    fi
else
    echo "Directorio de backups no encontrado"
fi

echo ""
echo "🧹 LIMPIEZA AUTOMÁTICA..."

# Limpiar logs antiguos (más de 7 días)
find "./data/logs" -name "*.log" -mtime +7 -delete 2>/dev/null && echo "✅ Logs antiguos eliminados"

# Limpiar backups antiguos (mantener últimos 10)
BACKUP_FILES=($(find "./data/backups" -name "backup-*.json" | sort))
BACKUP_COUNT=${#BACKUP_FILES[@]}
if [ $BACKUP_COUNT -gt 10 ]; then
    for ((i=0; i<$((BACKUP_COUNT-10)); i++)); do
        rm "${BACKUP_FILES[$i]}" 2>/dev/null
    done
    echo "✅ Backups antiguos eliminados"
fi

echo ""
echo "📈 GENERANDO REPORTE DE ESTADO..."

# Crear reporte de mantenimiento
REPORT_DATE=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_FILE="./maintenance_report_$REPORT_DATE.txt"

cat > "$REPORT_FILE" << EOF
🔧 REPORTE DE MANTENIMIENTO - CHATBOT WHATSAPP
===============================================
Fecha: $(date)
Node.js: $(node --version)
npm: $(npm --version)

ESTADO DEL PROYECTO:
-------------------
✅ Dependencias verificadas
✅ Vulnerabilidades revisadas
✅ Logs limpiados
✅ Backups optimizados

PRÓXIMAS ACCIONES RECOMENDADAS:
------------------------------
1. Revisar dependencias desactualizadas
2. Actualizar whatsapp-web.js si hay nueva versión
3. Verificar funcionamiento del panel web
4. Hacer deploy si hay cambios importantes

COMANDOS ÚTILES:
--------------
npm update                    # Actualizar dependencias
npm audit fix                # Corregir vulnerabilidades
node start-web.js            # Iniciar con panel web
npm run dev                  # Modo desarrollo

EOF

echo "✅ Reporte generado: $REPORT_FILE"

echo ""
echo "🎉 MANTENIMIENTO COMPLETADO!"
echo "=================================================="
echo "Próximo mantenimiento recomendado: $(date -d '+7 days' +%Y-%m-%d)"
