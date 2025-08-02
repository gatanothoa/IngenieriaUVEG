# 🚀 DEPLOY CHATBOT ARCOEXPRESS - RAILWAY.APP

## 📋 **GUÍA PASO A PASO**

### 🎯 **OBJETIVO:**
Subir el ChatBot ArcoExpress personalizado a Railway.app para que funcione 24/7 en la nube.

---

## 📝 **PASO 1: PREPARAR PROYECTO PARA GIT**

```bash
# 1. Inicializar repositorio Git (si no existe)
git init

# 2. Agregar archivos al repositorio
git add .

# 3. Hacer commit inicial
git commit -m "ChatBot ArcoExpress personalizado - Listo para deploy"

# 4. Conectar con repositorio remoto
git remote add origin https://github.com/gatanothoa/IngenieriaUVEG.git

# 5. Subir a GitHub
git push -u origin main
```

---

## 🌐 **PASO 2: CONFIGURAR RAILWAY.APP**

### 📋 **REQUISITOS:**
1. Cuenta en Railway.app (gratis)
2. Proyecto subido a GitHub
3. Variables de entorno configuradas

### 🔧 **CONFIGURACIÓN:**

1. **Ir a railway.app**
2. **Conectar con GitHub**
3. **Seleccionar repositorio IngenieriaUVEG**
4. **Seleccionar carpeta ChatBotPablo**
5. **Configurar variables de entorno**

### ⚙️ **VARIABLES DE ENTORNO RAILWAY:**

```env
# Bot Configuration
BOT_NAME=ArcoExpress ChatBot Assistant
BOT_VERSION=2.0.0-ArcoExpress
ENABLE_WEB_PANEL=true
WEB_PORT=3000

# Database
DB_MAX_MESSAGES=1000
AUTO_BACKUP=true
BACKUP_INTERVAL_HOURS=24

# Company Info - ArcoExpress
COMPANY_NAME=ArcoExpress de México
COMPANY_PHONE=+522222106144
COMPANY_EMAIL=ventas@arcoexpress.mx
COMPANY_WEBSITE=https://arcoexpress.mx
COMPANY_ADDRESS=Puebla, México
COMPANY_WHATSAPP=+522227506855

# Products
COMPANY_PRODUCTS=Etiquetas Térmicas Directas,Etiquetas de Transferencia Térmica,Ribbons de Cera,Ribbons de Resina,Ribbons Mixtos,Etiquetas Adhesivas Permanentes,Etiquetas para Códigos de Barras,Etiquetas Industriales Especiales

# Services
COMPANY_SERVICES=Maquila e Impresión de Etiquetas,Señalización Industrial,Identificación de Productos,Soporte Técnico Especializado,Consultoría en Etiquetado,Servicio de Impresoras Zebra,Servicio de Impresoras Honeywell,Servicio de Impresoras TSC

# Business Hours
BUSINESS_HOURS_START=09:00
BUSINESS_HOURS_END=18:00
BUSINESS_DAYS=Lunes a Viernes

# Technical
LOG_LEVEL=info
LOG_TO_FILE=true
LOG_TO_CONSOLE=true
MAX_MESSAGES_PER_MINUTE=15
```

---

## 🚀 **PASO 3: DEPLOY AUTOMÁTICO**

1. **Railway detecta el proyecto Node.js**
2. **Instala dependencias automáticamente**
3. **Ejecuta npm start**
4. **Genera URL pública**

### 📱 **RESULTADO ESPERADO:**
```
✅ URL pública: https://chatbot-arcoexpress-production.up.railway.app
✅ Panel web funcional
✅ QR code para conectar WhatsApp
✅ Chatbot funcionando 24/7
```

---

## 📞 **PASO 4: CONECTAR WHATSAPP**

1. **Abrir URL pública de Railway**
2. **Escanear QR code con WhatsApp Web**
3. **Verificar conexión exitosa**
4. **Probar comandos del chatbot**

### 🧪 **COMANDOS DE PRUEBA:**
- Enviar "Hola" al número conectado
- Probar `/menu` para ver opciones
- Probar `/productos` para ver catálogo
- Probar `/cotizar` para proceso de cotización

---

## 💰 **COSTOS RAILWAY.APP**

### 🆓 **PLAN GRATUITO:**
- **500 horas de ejecución/mes**
- **1GB RAM**
- **1GB almacenamiento**
- **Perfecto para chatbots pequeños/medianos**

### 💵 **PLAN HOBBY ($5 USD/mes):**
- **Ejecución ilimitada**
- **8GB RAM**
- **100GB almacenamiento**
- **Ideal para uso comercial**

---

## 🔧 **MONITOREO Y MANTENIMIENTO**

### 📊 **Panel de Control Railway:**
- Ver logs en tiempo real
- Monitorear uso de recursos
- Reiniciar servicio si es necesario
- Ver métricas de rendimiento

### 🔄 **ACTUALIZACIONES:**
```bash
# Para actualizar el chatbot:
1. Hacer cambios localmente
2. git add .
3. git commit -m "Actualización chatbot"
4. git push origin main
5. Railway despliega automáticamente
```

---

## 🎯 **BENEFICIOS DEL DEPLOY**

### ✅ **VENTAJAS:**
- **24/7 disponibilidad**
- **No depende de tu computadora**
- **URL pública profesional**
- **Escalabilidad automática**
- **Backups automáticos**
- **Logs profesionales**

### 📈 **PARA ARCOEXPRESS:**
- **Atención automática de clientes**
- **Información de productos siempre disponible**
- **Proceso de cotización automatizado**
- **Soporte técnico 24/7**
- **Imagen profesional mejorada**

---

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### ❌ **Si el deploy falla:**
1. Verificar package.json
2. Revisar variables de entorno
3. Verificar logs en Railway
4. Contactar soporte Railway

### 🔧 **Si WhatsApp no conecta:**
1. Regenerar QR code
2. Verificar conexión a internet
3. Probar con otro navegador
4. Reiniciar servicio en Railway

---

**🎯 OBJETIVO: URL pública funcionando para ArcoExpress**
**⏰ TIEMPO ESTIMADO: 15-20 minutos**
**💰 COSTO: $0 (plan gratuito)**
