@echo off
REM Script de actualización semanal automática para Windows
REM Ejecutar todos los sábados

echo 🚀 Iniciando actualización semanal del progreso...
echo 📅 Fecha: %date% %time%
echo.

REM Navegar al directorio del proyecto
cd /d "c:\Users\Tiamat\Dropbox\universidad\Udemy"

REM Verificar cambios
echo 📊 Verificando cambios en el repositorio...
git status
echo.

REM Agregar todos los cambios
echo ➕ Agregando archivos nuevos y modificados...
git add .

REM Crear commit con fecha
for /f "tokens=1-3 delims=/" %%a in ('date /t') do set FECHA=%%c-%%a-%%b
git commit -m "📚 Actualización semanal del %FECHA% - Progreso del curso Udemy"

REM Subir a GitHub
echo ☁️ Sincronizando con GitHub...
git push

echo.
echo ✅ ¡Actualización completada!
echo 🔗 Revisa tu progreso en: https://github.com/gatanothoa/IngenieriaUVEG
echo.
echo 📈 Últimos 5 commits:
git log --oneline -5

echo.
echo Presiona cualquier tecla para continuar...
pause >nul 
