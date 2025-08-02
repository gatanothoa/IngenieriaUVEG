# 🔧 SCRIPT DE MANTENIMIENTO AUTOMÁTICO - CHATBOT WHATSAPP (PowerShell)
# Ejecutar semanalmente para mantener el proyecto actualizado

Write-Host "🤖 INICIANDO MANTENIMIENTO DEL CHATBOT..." -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Yellow

# Verificar versiones actuales
Write-Host "📋 Verificando versiones..." -ForegroundColor Cyan
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "Node.js: $nodeVersion" -ForegroundColor White
Write-Host "npm: $npmVersion" -ForegroundColor White

# Navegar al directorio del proyecto
Set-Location "c:\Users\Tiamat\Dropbox\universidad\Udemy\Chatbot"

Write-Host ""
Write-Host "🔍 VERIFICANDO DEPENDENCIAS DESACTUALIZADAS..." -ForegroundColor Cyan
try {
    npm outdated
} catch {
    Write-Host "No se encontraron dependencias desactualizadas" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔒 VERIFICANDO VULNERABILIDADES DE SEGURIDAD..." -ForegroundColor Cyan
npm audit

Write-Host ""
Write-Host "📊 VERIFICANDO TAMAÑO DE LA BASE DE DATOS..." -ForegroundColor Cyan
$dbPath = ".\data\database.json"
if (Test-Path $dbPath) {
    $dbSize = [math]::Round((Get-Item $dbPath).Length / 1MB, 2)
    Write-Host "Base de datos: $dbSize MB" -ForegroundColor White
} else {
    Write-Host "Base de datos no encontrada" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 VERIFICANDO LOGS..." -ForegroundColor Cyan
$logsPath = ".\data\logs"
if (Test-Path $logsPath) {
    $logFiles = Get-ChildItem -Path $logsPath -Filter "*.log"
    Write-Host "Archivos de log: $($logFiles.Count)" -ForegroundColor White
    
    # Mostrar logs con errores recientes
    Write-Host "Verificando errores recientes..." -ForegroundColor Yellow
    $errorLogs = $logFiles | ForEach-Object {
        $content = Get-Content $_.FullName -Tail 50 | Where-Object { $_ -match "ERROR|❌|error" }
        if ($content) { $_.Name }
    }
    if ($errorLogs) {
        Write-Host "Logs con errores: $($errorLogs -join ', ')" -ForegroundColor Red
    } else {
        Write-Host "✅ No se encontraron errores recientes" -ForegroundColor Green
    }
} else {
    Write-Host "Directorio de logs no encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💾 VERIFICANDO BACKUPS..." -ForegroundColor Cyan
$backupsPath = ".\data\backups"
if (Test-Path $backupsPath) {
    $backupFiles = Get-ChildItem -Path $backupsPath -Filter "backup-*.json"
    Write-Host "Backups disponibles: $($backupFiles.Count)" -ForegroundColor White
    
    if ($backupFiles.Count -gt 0) {
        $latestBackup = $backupFiles | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        Write-Host "Último backup: $($latestBackup.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))" -ForegroundColor White
    }
} else {
    Write-Host "Directorio de backups no encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🧹 LIMPIEZA AUTOMÁTICA..." -ForegroundColor Cyan

# Limpiar logs antiguos (más de 7 días)
if (Test-Path $logsPath) {
    $oldLogs = Get-ChildItem -Path $logsPath -Filter "*.log" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) }
    if ($oldLogs) {
        $oldLogs | Remove-Item -Force
        Write-Host "✅ $($oldLogs.Count) logs antiguos eliminados" -ForegroundColor Green
    } else {
        Write-Host "✅ No hay logs antiguos para eliminar" -ForegroundColor Green
    }
}

# Limpiar backups antiguos (mantener últimos 10)
if (Test-Path $backupsPath) {
    $allBackups = Get-ChildItem -Path $backupsPath -Filter "backup-*.json" | Sort-Object LastWriteTime -Descending
    if ($allBackups.Count -gt 10) {
        $backupsToDelete = $allBackups | Select-Object -Skip 10
        $backupsToDelete | Remove-Item -Force
        Write-Host "✅ $($backupsToDelete.Count) backups antiguos eliminados" -ForegroundColor Green
    } else {
        Write-Host "✅ Cantidad de backups dentro del límite" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📈 GENERANDO REPORTE DE ESTADO..." -ForegroundColor Cyan

# Crear reporte de mantenimiento
$reportDate = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$reportFile = ".\maintenance_report_$reportDate.txt"

$reportContent = @"
🔧 REPORTE DE MANTENIMIENTO - CHATBOT WHATSAPP
===============================================
Fecha: $(Get-Date)
Node.js: $nodeVersion
npm: $npmVersion
Sistema: $env:OS

ESTADO DEL PROYECTO:
-------------------
✅ Dependencias verificadas
✅ Vulnerabilidades revisadas
✅ Logs limpiados
✅ Backups optimizados

ESTADÍSTICAS:
------------
Base de datos: $(if (Test-Path $dbPath) { "$([math]::Round((Get-Item $dbPath).Length / 1MB, 2)) MB" } else { "No encontrada" })
Logs actuales: $(if (Test-Path $logsPath) { (Get-ChildItem -Path $logsPath -Filter "*.log").Count } else { "0" })
Backups: $(if (Test-Path $backupsPath) { (Get-ChildItem -Path $backupsPath -Filter "backup-*.json").Count } else { "0" })

PRÓXIMAS ACCIONES RECOMENDADAS:
------------------------------
1. Revisar dependencias desactualizadas con: npm outdated
2. Actualizar whatsapp-web.js si hay nueva versión
3. Verificar funcionamiento del panel web con: node start-web.js
4. Hacer deploy si hay cambios importantes

COMANDOS ÚTILES:
--------------
npm update                    # Actualizar dependencias
npm audit fix                # Corregir vulnerabilidades
node start-web.js            # Iniciar con panel web
npm run dev                  # Modo desarrollo
npm start                    # Modo producción

URLS IMPORTANTES:
----------------
Panel Web Local: http://localhost:3001
Documentación: README.md
Deploy Guide: DEPLOY_REMOTO.md

SERVICIOS DE NUBE RECOMENDADOS:
------------------------------
Railway.app - Gratis hasta 500h/mes
Render.com - Gratis hasta 750h/mes
DigitalOcean - $4-6 USD/mes (~$70-105 MXN)
"@

$reportContent | Out-File -FilePath $reportFile -Encoding UTF8

Write-Host "✅ Reporte generado: $reportFile" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 MANTENIMIENTO COMPLETADO!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Yellow
$nextMaintenance = (Get-Date).AddDays(7).ToString("yyyy-MM-dd")
Write-Host "Próximo mantenimiento recomendado: $nextMaintenance" -ForegroundColor Cyan

Write-Host ""
Write-Host "🚀 COMANDOS RÁPIDOS PARA CONTINUAR:" -ForegroundColor Magenta
Write-Host "cd 'c:\Users\Tiamat\Dropbox\universidad\Udemy\Chatbot'" -ForegroundColor White
Write-Host "node start-web.js    # Iniciar chatbot con panel web" -ForegroundColor White
Write-Host "npm run dev          # Modo desarrollo con auto-reload" -ForegroundColor White

# Preguntar si desea ejecutar una verificación adicional
Write-Host ""
$response = Read-Host "¿Deseas ejecutar una verificación rápida del chatbot? (s/n)"
if ($response -eq "s" -or $response -eq "S") {
    Write-Host "🔍 Verificando estado del chatbot..." -ForegroundColor Cyan
    
    # Verificar archivos críticos
    $criticalFiles = @(
        "src\index.js",
        "src\web\server.js", 
        "package.json",
        ".env.example"
    )
    
    foreach ($file in $criticalFiles) {
        if (Test-Path $file) {
            Write-Host "✅ $file" -ForegroundColor Green
        } else {
            Write-Host "❌ $file (FALTANTE)" -ForegroundColor Red
        }
    }
    
    Write-Host "✅ Verificación completada" -ForegroundColor Green
}

Write-Host ""
Write-Host "💡 TIP: Ejecuta este script semanalmente para mantener tu chatbot en óptimas condiciones" -ForegroundColor Yellow
