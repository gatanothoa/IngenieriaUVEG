# 🤖 CHATBOT ARCOEXPRESS - GUÍA COMPLETA
*Documentación única y consolidada - Todo lo que necesitas saber*

---

## 🚀 **INICIO RÁPIDO**

### **Deploy en Railway (RECOMENDADO):**
1. Crear proyecto en [railway.app](https://railway.app)
2. Conectar repositorio: `gatanothoa/IngenieriaUVEG`
3. Configurar variables de entorno (ver sección Variables)
4. ¡Deploy automático! 🎉

### **Ejecución Local:**
```bash
npm install
npm start
```

---

## ⚙️ **VARIABLES DE ENTORNO**

### **Para Railway Dashboard:**
```env
NODE_ENV=production
BOT_NAME=ArcoExpress ChatBot
TWILIO_ACCOUNT_SID=tu_account_sid_aqui
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### **Para desarrollo local (.env):**
```env
NODE_ENV=development
PORT=8080
BOT_NAME=ArcoExpress ChatBot Local
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

---

## 📱 **CONFIGURACIÓN WHATSAPP + TWILIO**

### **1. Crear cuenta Twilio:**
- Ve a [twilio.com](https://twilio.com)
- Crear cuenta gratuita
- Activar WhatsApp Sandbox

### **2. Configurar Sandbox:**
- En Twilio Console: Messaging > Try it out > Send a WhatsApp message
- Enviar mensaje a: `+1 (415) 523-8886`
- Código: `join ordinary-choose`

### **3. Configurar Webhook:**
```
Webhook URL: https://tu-app.up.railway.app/webhook/whatsapp
HTTP Method: POST
```

### **4. Obtener credenciales:**
- **Account SID:** Panel principal Twilio
- **Auth Token:** Panel principal Twilio  
- **WhatsApp Number:** whatsapp:+14155238886

---

## 🛠️ **COMANDOS DEL CHATBOT**

### **Comandos Numéricos:**
- `1` - 🏷️ Productos completos
- `2` - 🏷️ Etiquetas térmicas
- `3` - 🎗️ Ribbons industriales
- `4` - 🖨️ Impresoras (Zebra, Honeywell, TSC)
- `5` - 💰 Solicitar cotización
- `6` - 🔧 Servicios de maquila
- `7` - 📞 Información de contacto
- `8` - 🏢 Sobre ArcoExpress
- `9` - ❓ Ayuda y comandos

### **Comandos de Texto:**
- `hola` / `buenos días` - Mensaje de bienvenida
- `menu` / `00` - Menú principal

---

## 🔧 **ENDPOINTS DISPONIBLES**

### **Panel Web:**
- **`/`** - Interface principal del ChatBot
- **`/health`** - Estado del servidor (Railway)
- **`/api/stats`** - Estadísticas en JSON
- **`/api/demo`** - Simulador de comandos
- **`/empresa`** - Información de ArcoExpress

### **WhatsApp Webhooks:**
- **`/webhook/whatsapp`** - Recibe mensajes de Twilio
- **`/webhook/status`** - Estado de mensajes (opcional)

---

## 🏢 **INFORMACIÓN ARCOEXPRESS**

### **Datos de Contacto:**
- **WhatsApp Business:** +52 1 221 794 6704
- **Teléfono 1:** +52 222 210 61 44  
- **Teléfono 2:** +52 222 210 61 40
- **Email:** ventas@arcoexpress.mx
- **Web:** arcoexpress.mx
- **Ubicación:** Puebla, México

### **Especialidades:**
- Etiquetas térmicas directas y transferencia
- Ribbons de cera, resina y mixtos
- Impresoras industriales (Zebra, Honeywell, TSC)
- Servicios de maquila y personalización
- +20 años de experiencia

---

## 🚨 **TROUBLESHOOTING**

### **Deploy falla en Railway:**
1. Verificar `package.json` tiene script "start"
2. Verificar puerto 8080 configurado
3. Revisar logs en Railway Dashboard

### **WhatsApp no responde:**
1. Verificar variables TWILIO_* en Railway
2. Confirmar webhook URL configurada en Twilio
3. Probar sandbox: enviar "join ordinary-choose"

### **Health check falla:**
- Endpoint `/health` debe retornar status 200
- Verificar en: `https://tu-app.up.railway.app/health`

### **Comandos no funcionan:**
- Verificar función `processCommand()` en index.js
- Probar simulador en `/api/demo`

---

## 📊 **ESTRUCTURA DEL PROYECTO**

```
Chatbot/
├── index.js              # 🚀 Archivo principal
├── package.json          # 📦 Dependencias
├── railway.json          # ⚙️ Config Railway
├── .gitignore            # 🔒 Seguridad
├── .env.example          # 📝 Plantilla variables
└── CHATBOT-GUIDE.md      # 📚 Esta guía
```

---

## 🎯 **COMANDOS GIT ÚTILES**

```bash
# Verificar estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Actualización ChatBot"

# Push a GitHub (auto-deploy Railway)
git push
```

---

## 💡 **TIPS IMPORTANTES**

### **Para Railway:**
- Puerto **8080** es automático (no cambiar)
- Variables se configuran en Dashboard, no en código
- Auto-deploy cada push a GitHub main branch

### **Para Twilio:**
- Sandbox es gratis pero limitado
- Para producción: verificar número de teléfono
- WhatsApp Business API requiere aprobación

### **Para desarrollo:**
- Usar `.env` para variables locales
- Probar endpoints con `localhost:8080`
- El simulador `/api/demo` no requiere WhatsApp

---

**🚀 Estado:** ✅ Proyecto listo para producción
**📅 Actualizado:** 3 Agosto 2025
**👨‍💻 Desarrollado por:** Tiamat - UVEG
