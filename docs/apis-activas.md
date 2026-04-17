# APIs Activas — manager@rubencoton.com

Ultima actualizacion: 2026-04-16

Inventario REAL de APIs vinculadas a la cuenta **manager@rubencoton.com**,
basado en escaneo del workspace (tokens OAuth activos en disco).

## Proyectos GCP asociados a manager@rubencoton.com

### 1. OAuth Client de `drive-manager-rubencoton-com`

- **Client ID**: `994826284966-xxxxxxxx.apps.googleusercontent.com` (ver `drive-manager-rubencoton-com/.env`)
- **Client Secret**: en `drive-manager-rubencoton-com/.env` → `GOOGLE_CLIENT_SECRET`
- **Redirect URI**: `http://localhost`
- **Usado por**:
  - `drive-manager-rubencoton-com`
  - `RUBEN-COTON_COPIA-CRM-ARTES-BUHO`

### 2. OAuth Client de `codex-google-hub` (clasp/Apps Script)

- **Client ID**: `1072944905499-xxxxxxxx.apps.googleusercontent.com` (ver `codex-google-hub/secrets/`)
- **Client Secret**: en `codex-google-hub/secrets/client_secret_from_clasprc_manager_rubencoton_com.json`
- **Project ID GCP**: `recovered-from-clasprc`
- **Usado por**: `codex-google-hub`

## APIs Google ACTIVAS (con token OAuth valido) para manager@rubencoton.com

| API | Activa | Scope OAuth | Proyecto con token |
|-----|--------|-------------|--------------------|
| Gmail API (modify) | SI | `gmail.modify` | drive-manager, COPIA-CRM, codex-google-hub |
| Gmail API (send) | SI | `gmail.send` | drive-manager, COPIA-CRM, codex-google-hub |
| Gmail API (full) | SI | `gmail` (completo) | codex-google-hub |
| Google Drive API | SI | `drive` | TODOS |
| Google Calendar API | SI | `calendar`, `calendar.events` | TODOS |
| Google Sheets API | SI | `spreadsheets` | codex-google-hub |
| YouTube Data API v3 | SI | `youtube`, `youtube.upload` | codex-google-hub |
| Google Analytics API | SI | `analytics` | codex-google-hub |
| Google Contacts API | SI | `contacts` | codex-google-hub |
| Google Chat API | SI | `chat` | codex-google-hub |
| Google Forms API | SI | `forms` | codex-google-hub |
| Google Slides API | SI | `presentations` | codex-google-hub |
| Google Tasks API | SI | `tasks` | codex-google-hub |
| Google Business Profile API | SI | `business.manage` | codex-google-hub |

## Tokens OAuth activos en disco (manager@rubencoton.com)

### Token "scope amplio" (codex-google-hub)

- **Ruta**: `C:\Users\elrub\Desktop\CARPETA CODEX\01_PROYECTOS\codex-google-hub\secrets\oauth_token_manager_rubencoton_com.json`
- **Refresh token**: `1//031JFNsZWk_hFCg...`
- **Scopes**: drive, gmail, calendar, spreadsheets, youtube, youtube.upload, analytics, contacts, calendar.events, chat, forms, presentations, tasks, business.manage
- **Expiry**: activo

### Token "scope basico" (drive + gmail + calendar)

- **Rutas**:
  - `drive-manager-rubencoton-com\config\token.json`
  - `RUBEN-COTON_COPIA-CRM-ARTES-BUHO\config\token.json`
- **Refresh token**: `1//03hXPSepFVdAEC...`
- **Scopes**: calendar, gmail.send, drive, gmail.modify

## APIs pendientes de habilitar o verificar

| API | Estado | Nota |
|-----|--------|------|
| Places API (New) | Pendiente | Actualmente solo la usa booking@ con otra key |
| Maps JavaScript API | Pendiente | Idem |
| Geocoding API | Pendiente | Idem |
| Apps Script API | Posible | clasp lo usa indirectamente en codex-google-hub |

## Como habilitar una API nueva para manager@rubencoton.com

1. Entrar a https://console.cloud.google.com con manager@rubencoton.com
2. Seleccionar el proyecto GCP correspondiente (ver OAuth Clients arriba)
3. APIs y servicios → Biblioteca → Buscar → Habilitar
4. Si requiere nuevo scope OAuth: re-autorizar ejecutando `node scripts/setup-oauth.js`
5. Actualizar esta tabla con la fecha y el scope
