# RUBEN-COTON_API-GOOGLE

Hub central de integraciones con APIs de Google para **manager@rubencoton.com**.

Ultima verificacion: 2026-04-16 — conexion en vivo con Gmail, Drive, Calendar y Sheets confirmada.

## Estado real de conexiones (manager@rubencoton.com)

| API Google | Estado | Como |
|-----------|--------|------|
| Gmail (send + modify) | ✅ ACTIVO | OAuth refresh_token |
| Google Drive | ✅ ACTIVO | OAuth refresh_token |
| Google Calendar | ✅ ACTIVO | OAuth refresh_token |
| Google Sheets | ✅ ACTIVO | OAuth refresh_token |
| YouTube Data v3 | ⚠️ Requiere re-auth | Falta scope |
| Google Contacts (People) | ⚠️ Requiere re-auth | Falta scope |
| Google Tasks | ⚠️ Requiere re-auth | Falta scope |
| Analytics, Forms, Slides, Chat | ⚠️ Requiere re-auth | Falta scope |
| Places / Maps API | ❌ No configurado | Crear API Key nueva en GCP |

Para ampliar scopes: `npm run oauth:setup`

## Uso rapido desde otros proyectos

```js
const { getServices } = require('../RUBEN-COTON_API-GOOGLE/src/auth/oauth-manager');

const { gmail, drive, sheets, calendar } = await getServices();
await gmail.users.getProfile({ userId: 'me' });
```

## Estructura del proyecto

```
RUBEN-COTON_API-GOOGLE/
├── README.md
├── CLAUDE.md                       # Contexto para Claude/IA
├── package.json
├── .gitignore                      # Protege .env y tokens
├── config/
│   ├── .env                        # Credenciales LOCALES (no versionado)
│   ├── .env.example                # Plantilla
│   └── oauth/
│       └── token.json              # Refresh token local (no versionado)
├── docs/
│   ├── setup-gcp.md                # Guia configuracion GCP
│   ├── apis-activas.md             # APIs reales + scopes
│   ├── conexiones.md               # Mapa proyectos → APIs
│   └── inventario-credenciales.md  # Donde vive cada credencial
├── src/
│   └── auth/
│       └── oauth-manager.js        # Cliente OAuth reutilizable
├── scripts/
│   ├── test-connection.js          # Verifica APIs en vivo
│   ├── setup-oauth.js              # Flujo OAuth inicial
│   └── audit-credentials.js        # Auditar secretos en workspace
└── tests/
```

## Scripts disponibles

```bash
npm install                  # Instalar dependencias (googleapis, google-auth-library, dotenv)
npm run test:connection      # Probar APIs en vivo con el token actual
npm run oauth:setup          # Regenerar refresh_token con todos los scopes
npm run audit:credentials    # Escanear el workspace buscando secretos
```

## Credenciales

- **Cuenta**: manager@rubencoton.com
- **OAuth Client ID**: `994826284966-xxxxxxxx.apps.googleusercontent.com` (ver `config/.env` local)
- **Token reutilizado de**: `drive-manager-rubencoton-com/config/token.json`

Ver `docs/inventario-credenciales.md` para el inventario completo.

## Proyectos que consumen este hub

| Proyecto | APIs que usa | Estado |
|----------|-------------|--------|
| `drive-manager-rubencoton-com` | Drive, Gmail, Calendar | Tiene su token propio (mismo client) |
| `RUBEN-COTON_COPIA-CRM-ARTES-BUHO` | Drive, Gmail, Calendar | Tiene su token propio (mismo client) |
| `codex-google-hub` | Todas (scope amplio) | Tiene su token propio (otro client) |

**Pendiente**: migrar estos proyectos para que importen `oauth-manager.js` en lugar de duplicar la logica OAuth.

## Repositorio

https://github.com/rubencoton/RUBEN-COTON_API-GOOGLE

## Notas de seguridad

- `.env` y `config/oauth/token.json` estan en `.gitignore`
- Nunca commitear API keys ni refresh tokens
- Rotar credenciales si se publican por error
