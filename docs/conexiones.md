# Mapa de Conexiones Google — RUBEN COTON

Ultima actualizacion: 2026-04-16
Basado en escaneo real del workspace (tokens OAuth + package.json + .env).

## Cuenta: manager@rubencoton.com

### Conexiones ACTIVAS (con credenciales reales en disco)

| Proyecto | APIs Google | Credencial | Token |
|----------|-------------|------------|-------|
| `drive-manager-rubencoton-com` | Drive, Gmail (send/modify), Calendar | OAuth client 994826284966 | `config/token.json` |
| `RUBEN-COTON_COPIA-CRM-ARTES-BUHO` | Drive, Gmail (send/modify), Calendar | OAuth client 994826284966 | `config/token.json` |
| `codex-google-hub` | Drive, Gmail, Calendar, Sheets, YouTube, Analytics, Contacts, Chat, Forms, Slides, Tasks, Business | OAuth client 1072944905499 (clasp) | `secrets/oauth_token_manager_rubencoton_com.json` |

### Proyectos que PODRIAN conectarse (no lo hacen todavia)

| Proyecto | Uso potencial |
|----------|---------------|
| `RUBEN-COTON_YOUTUBE` | Usa cuenta YouTube propia (OAuth 310735458864), NO manager@ |
| `RUBEN-COTON_EXTENSION-EMAILING` | Tiene googleapis, podria usar Gmail de manager@ |
| `IA_RUBEN-COTON_VIDEO-API` | Podria usar YouTube Data API |

## Cuenta: booking@artesbuhomanagement.com (referencia — NO gestionada aqui)

Gestionada por `ARTES-BUHO_API-GOOGLE`. Listada solo para evitar confusion.

| Proyecto | APIs | OAuth Client |
|----------|------|--------------|
| `ARTES-BUHO_API-GOOGLE` | Drive, Gmail, Calendar, Sheets, Places, Maps, YouTube | 584090574982 |
| `APP_ARTES-BUHO_DISTRITOS-MADRID` | Drive, Gmail, Sheets | 613435478827 |
| `codex-google-hub` (cuenta secundaria) | Drive, Gmail, Calendar | 1072944905499 |
| `factusol-google-sheets-looker-artes-buho` | Sheets (Service Account) | robot-codex@profound-media-489618-d8 |

## Proyectos con `googleapis` en package.json

| Proyecto | Version googleapis | Cuenta |
|----------|-------------------|--------|
| `drive-manager-rubencoton-com` | ^137.1.0 | manager@ |
| `RUBEN-COTON_COPIA-CRM-ARTES-BUHO` | ^137.1.0 | manager@ |
| `codex-google-hub` | ^171.4.0 | manager@ + booking@ |
| `ARTES-BUHO_API-GOOGLE` | ^144.0.0 | booking@ |
| `APP_ARTES-BUHO_DISTRITOS-MADRID` | ^144.0.0 | booking@ |
| `APP_ARTES-BUHO_EMAILING` | ^171.4.0 | booking@ |
| `RUBEN-COTON_EXTENSION-EMAILING` | ^171.4.0 | sin token asignado |
| `RUBEN-COTON_YOUTUBE` | ^144.0.0 | cuenta YouTube propia |
| `youtube-desktop-manager` | ^144.0.0 | cuenta YouTube propia |

## Apps Script (no usan googleapis npm, usan servicios nativos)

| Proyecto | Servicios Google usados |
|----------|------------------------|
| `APP_ARTES-BUHO_BUSCA-CONTACTOS` | Places API (UrlFetchApp), Gemini API |
| `APP_ARTES-BUHO_CONTABILIDAD` | DriveApp, DocumentApp |
| `festivales-github` | Gemini API |
| `noches-neon-crm-gas` | Gemini + OpenAI |
| `venta-booking-crm-gas` | UrlFetchApp (multiples) |
| `crm_marketing_promocion_cirradio_gas` | UrlFetchApp |
| `gmail-api-inbox-router-manager-gas` | GmailApp (cuenta manager@) |

## Como anadir un nuevo proyecto al hub

1. En el proyecto consumidor, en vez de crear OAuth propio:
   ```js
   const { getAuthClient } = require('../RUBEN-COTON_API-GOOGLE/src/auth/oauth-manager');
   const auth = await getAuthClient();
   ```
2. Registrar la conexion en la tabla "Conexiones ACTIVAS" arriba
3. Si requiere un scope nuevo, ejecutar `npm run oauth:setup` en este hub

## Busqueda rapida (auditoria)

```bash
# Tokens OAuth en el workspace
find "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" -name "token*.json" -o -name "oauth_token*.json"

# API Keys hardcodeadas (RIESGO)
grep -r "AIzaSy" "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" --include="*.js" --include="*.ts" --include="*.gs" --include="*.json"

# OAuth Client Secrets
grep -r "GOCSPX-" "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" --include="*.env*" --include="*.json"
```
