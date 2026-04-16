# RUBEN-COTON_API-GOOGLE

Hub central de integraciones con APIs de Google para proyectos de RUBEN COTON.

## Objetivo

Centralizar TODAS las conexiones, credenciales y configuraciones de APIs de Google
en un unico repositorio. Cualquier proyecto que necesite acceso a servicios Google
debe referenciar este hub.

## APIs Google cubiertas

| API | Estado | Uso principal |
|-----|--------|---------------|
| Google Places API | Pendiente | Busqueda de negocios/contactos |
| Google Maps API | Pendiente | Geolocalizacion, mapas |
| Google Sheets API | Pendiente | Lectura/escritura hojas de calculo |
| Google Drive API | Pendiente | Gestion de archivos |
| Gmail API | Pendiente | Envio/lectura de emails |
| Google Calendar API | Pendiente | Eventos, disponibilidad |
| YouTube Data API | Pendiente | Gestion de contenido |
| Google Analytics API | Pendiente | Metricas web |
| Google Apps Script | Pendiente | Automatizaciones serverless |
| Google OAuth 2.0 | Pendiente | Autenticacion centralizada |

## Estructura del proyecto

```
RUBEN-COTON_API-GOOGLE/
├── README.md              # Este archivo
├── CLAUDE.md              # Contexto para Claude/IA
├── config/                # Configuraciones y credenciales (plantillas)
│   ├── .env.example       # Variables de entorno necesarias
│   └── oauth/             # Tokens y config OAuth
├── docs/                  # Documentacion tecnica
│   ├── setup-gcp.md       # Guia de configuracion GCP
│   ├── apis-activas.md    # Inventario de APIs activas
│   └── conexiones.md      # Mapa de conexiones entre proyectos
├── src/                   # Codigo fuente
│   ├── auth/              # Modulos de autenticacion
│   ├── places/            # Google Places
│   ├── sheets/            # Google Sheets
│   ├── drive/             # Google Drive
│   ├── gmail/             # Gmail
│   ├── calendar/          # Google Calendar
│   ├── youtube/           # YouTube Data
│   └── analytics/         # Google Analytics
├── scripts/               # Scripts de utilidad
│   ├── test-connection.js # Verificar conexion con APIs
│   └── setup-oauth.js     # Configurar OAuth inicial
└── tests/                 # Tests
```

## Proyectos que consumen APIs Google

| Proyecto | APIs que usa | Ruta |
|----------|-------------|------|
| APP_ARTES-BUHO_BUSCA-CONTACTOS | Places API | `../APP_ARTES-BUHO_BUSCA-CONTACTOS` |
| ARTES-BUHO_API-GOOGLE | OAuth, Gmail, Drive, Sheets | `../ARTES-BUHO_API-GOOGLE` |
| gmail-api-inbox-router-manager-gas | Gmail, Apps Script | `../gmail-api-inbox-router-manager-gas` |
| IA_RUBEN-COTON_VIDEO-API | YouTube Data | `../IA_RUBEN-COTON_VIDEO-API` |
| whatsapp-work-api | (indirecto) | `../whatsapp-work-api` |

## Cuenta Google vinculada

- **manager@rubencoton.com** — Cuenta unica del proyecto

> Nota: ARTES-BUHO_API-GOOGLE usa booking@artesbuhomanagement.com.
> Este proyecto es independiente y solo gestiona manager@rubencoton.com.

## Configuracion inicial

1. Clonar este repositorio
2. Copiar `config/.env.example` a `config/.env`
3. Rellenar las API Keys y credenciales
4. Ejecutar `npm install` (cuando se implemente)
5. Verificar conexion: `npm run test:connection`

## Notas

- Las API Keys NO se suben al repositorio (`.gitignore`)
- Cada API tiene su propia carpeta en `src/`
- La documentacion de conexiones esta en `docs/conexiones.md`
