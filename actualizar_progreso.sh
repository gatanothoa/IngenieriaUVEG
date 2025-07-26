#!/bin/bash
# Script de actualización semanal automática
# Ejecutar todos los sábados

echo "🚀 Iniciando actualización semanal del progreso..."
echo "📅 Fecha: $(date)"

# Navegar al directorio del proyecto
cd "c:\Users\Tiamat\Dropbox\universidad\Udemy"

# Verificar cambios
echo "📊 Verificando cambios en el repositorio..."
git status

# Agregar todos los cambios
echo "➕ Agregando archivos nuevos y modificados..."
git add .

# Crear commit con fecha
FECHA=$(date +"%Y-%m-%d")
git commit -m "📚 Actualización semanal del $FECHA - Progreso del curso Udemy"

# Subir a GitHub
echo "☁️ Sincronizando con GitHub..."
git push

echo "✅ ¡Actualización completada!"
echo "🔗 Revisa tu progreso en: https://github.com/gatanothoa/IngenieriaUVEG"
echo ""
echo "📈 Estadísticas del repositorio:"
git log --oneline -5
