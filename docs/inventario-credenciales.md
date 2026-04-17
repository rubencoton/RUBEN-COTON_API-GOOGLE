# Inventario de Credenciales — manager@rubencoton.com

> **AVISO DE SEGURIDAD**: este documento lista UBICACIONES de credenciales,
> no las credenciales en si. Los archivos `.env` y `token.json` estan en `.gitignore`.

Ultima auditoria: 2026-04-16

## Credenciales activas para manager@rubencoton.com

### OAuth Client #1 — drive-manager (recomendado para uso general)

| Campo | Valor |
|-------|-------|
| Client ID | `994826284966-xxxxxxxx.apps.googleusercontent.com` |
| Client Secret | En `drive-manager-rubencoton-com/.env` → `GOOGLE_CLIENT_SECRET` |
| Redirect URI | `http://localhost` |
| Tipo | OAuth 2.0 Desktop / Web |

**Archivos `.env` que lo usan**:
- `01_PROYECTOS/drive-manager-rubencoton-com/.env`
- `01_PROYECTOS/RUBEN-COTON_COPIA-CRM-ARTES-BUHO/.env`

**Tokens refresh asociados**:
- `01_PROYECTOS/drive-manager-rubencoton-com/config/token.json`
- `01_PROYECTOS/RUBEN-COTON_COPIA-CRM-ARTES-BUHO/config/token.json`

**Scopes del token**: `drive`, `gmail.send`, `gmail.modify`, `calendar`

---

### OAuth Client #2 — codex-google-hub / clasp (scope amplio)

| Campo | Valor |
|-------|-------|
| Client ID | `1072944905499-xxxxxxxx.apps.googleusercontent.com` |
| Project ID GCP | `recovered-from-clasprc` |
| Tipo | Desktop (clasp) |

**Archivos JSON**:
- `01_PROYECTOS/codex-google-hub/secrets/client_secret_from_clasprc_manager_rubencoton_com.json`
- `01_PROYECTOS/codex-google-hub/secrets/oauth_token_manager_rubencoton_com.json`

**Scopes del token**: drive, gmail, calendar, spreadsheets, youtube, youtube.upload, analytics, contacts, calendar.events, chat, forms, presentations, tasks, business.manage

---

## Credenciales de OTRAS cuentas (referencia, NO gestionadas aqui)

| Cuenta | OAuth Client ID | Proyecto |
|--------|----------------|----------|
| booking@artesbuhomanagement.com | 584090574982-0sivmu... | ARTES-BUHO_API-GOOGLE |
| booking@artesbuhomanagement.com | 613435478827-r0khao... | APP_ARTES-BUHO_DISTRITOS-MADRID |
| Cuenta YouTube RUBEN COTON | 310735458864-dfq9n6... | RUBEN-COTON_YOUTUBE |
| Service Account profound-media | robot-codex@... | factusol-google-sheets-looker |

## API Keys sueltas encontradas

| Key (primeros caracteres) | Uso | Ubicacion |
|---------------------------|-----|-----------|
| `AIzaSyCrKyxqrr2SKbyrWsg_...` | Places + Maps + YouTube | `ARTES-BUHO_API-GOOGLE/.env` |

> Esta key es de booking@. Para manager@rubencoton.com NO existe aun API Key dedicada
> para Places/Maps/YouTube v3. Si se necesita, crear una nueva en la consola GCP
> del proyecto recovered-from-clasprc o crear un proyecto GCP nuevo.

## Plan de rotacion y seguridad

### URGENTE
- [ ] NO subir ningun `.env` al repositorio (verificado via .gitignore)
- [ ] NO subir ningun `token.json` ni `client_secret*.json` al repositorio
- [ ] Verificar que el refresh token de manager@ no expire (monitorear `expiry_date`)

### RECOMENDADO
- [ ] Consolidar: que TODOS los proyectos que usan manager@ apunten a UN solo token
- [ ] Crear API Key dedicada para manager@ si se necesita Places/Maps desde esta cuenta
- [ ] Documentar en GCP console que el OAuth Client 994826284966 pertenece a este hub

## Comando de auditoria rapida

```bash
# Listar todos los tokens de manager@rubencoton.com
grep -rln "manager@rubencoton" "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" --include="*.json" --include="*.env*"
```
