@echo off
cls
REM ===========================================
REM       SCRIPT DE ACTUALIZACIÓN AUTOMÁTICA
REM       Actualiza tu progreso en GitHub
REM ===========================================

echo.
echo 🎯 ===========================================
echo    ACTUALIZADOR DE PROGRESO - IngenieriaUVEG
echo 🎯 ===========================================
echo.

REM Navegar al directorio del proyecto
cd /d "c:\Users\Tiamat\Dropbox\universidad\Udemy"

REM Verificar si estamos en un repositorio Git
if not exist ".git" (
    echo ❌ Error: No se encontró un repositorio Git en esta carpeta
    echo    Asegúrate de estar en la carpeta correcta del proyecto
    pause
    exit /b 1
)

echo 📅 Fecha y hora: %date% - %time%
echo 📂 Directorio: %cd%
echo.

REM Verificar conexión a internet (ping a GitHub)
echo 🌐 Verificando conexión a GitHub...
ping -n 1 github.com >nul 2>&1
if errorlevel 1 (
    echo ❌ No hay conexión a internet o GitHub no es accesible
    echo    Verifica tu conexión e intenta de nuevo
    pause
    exit /b 1
)
echo ✅ Conexión verificada
echo.

REM Verificar estado del repositorio
echo 📊 Verificando cambios en el repositorio...
git status --porcelain > temp_status.txt
if %errorlevel% neq 0 (
    echo ❌ Error al verificar el estado de Git
    pause
    exit /b 1
)

REM Contar archivos modificados
for /f %%i in ('type temp_status.txt ^| find /c /v ""') do set COUNT=%%i
del temp_status.txt

if %COUNT%==0 (
    echo.
    echo 🎉 ================================
    echo     ¡TODO ESTÁ ACTUALIZADO!
    echo 🎉 ================================
    echo.
    echo ℹ️  No hay cambios nuevos para subir
    echo    Tu repositorio ya está sincronizado con GitHub
    echo.
    echo 🔗 Repositorio: https://github.com/gatanothoa/IngenieriaUVEG
    echo.
    echo 📈 Últimos commits:
    git log --oneline -3 --color=never
    echo.
    echo ✨ ¡Perfecto! No necesitas hacer nada más
    pause
    exit /b 0
)

echo 📝 Se encontraron %COUNT% cambios para actualizar
echo.

REM Mostrar qué archivos van a cambiar
echo 📄 Archivos que se van a actualizar:
git status --porcelain
echo.

REM Agregar todos los cambios
echo ➕ Agregando archivos nuevos y modificados...
git add .
if %errorlevel% neq 0 (
    echo ❌ Error al agregar archivos
    pause
    exit /b 1
)
echo ✅ Archivos agregados correctamente
echo.

REM Crear commit con fecha y hora
echo 💾 Creando commit...
for /f "tokens=1-3 delims=/" %%a in ('date /t') do set FECHA=%%c-%%a-%%b
for /f "tokens=1-2 delims=:" %%a in ('time /t') do set HORA=%%a:%%b
set HORA=%HORA: =%

git commit -m "📚 Progreso actualizado - %FECHA% %HORA%"
if %errorlevel% neq 0 (
    echo.
    echo ❌ ===============================================
    echo     ERROR: No se pudo crear el commit
    echo ❌ ===============================================
    echo.
    echo 💡 Esto puede pasar si:
    echo    • No hay cambios reales para guardar
    echo    • Los archivos ya están actualizados
    echo    • Hay un problema con la configuración de Git
    echo.
    echo 🔍 Verifica el estado actual:
    git status
    echo.
    pause
    exit /b 1
)
echo ✅ Commit creado exitosamente
echo.

REM Subir a GitHub
echo ☁️  Sincronizando con GitHub...
git push
if %errorlevel% neq 0 (
    echo ❌ Error al subir a GitHub
    echo    Verifica tu conexión y credenciales
    pause
    exit /b 1
)
echo ✅ Sincronización completada
echo.

REM Mostrar resumen
echo 🎉 ===========================================
echo     ¡ACTUALIZACIÓN COMPLETADA EXITOSAMENTE!
echo 🎉 ===========================================
echo.
echo 🔗 Tu repositorio: https://github.com/gatanothoa/IngenieriaUVEG
echo 📊 Archivos actualizados: %COUNT%
echo 📅 Última actualización: %FECHA% %HORA%
echo.

echo 📈 Últimos commits:
git log --oneline -5 --color=never
echo.

echo ✨ ¡Tu progreso está guardado y respaldado!
echo.
echo Presiona cualquier tecla para continuar...
pause >nul
