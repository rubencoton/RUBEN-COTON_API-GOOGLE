# Guia de configuracion Google Cloud Platform

## Requisitos previos

- Cuenta Google: **manager@rubencoton.com**
- Acceso a Google Cloud Console

## Paso 1 — Crear proyecto en GCP

1. Ir a https://console.cloud.google.com
2. Crear nuevo proyecto: `RUBEN-COTON-API-GOOGLE`
3. Anotar el Project ID
4. Actualizar `docs/apis-activas.md` con el Project ID

## Paso 2 — Habilitar APIs necesarias

En APIs y servicios → Biblioteca, habilitar:

- Places API (New)
- Maps JavaScript API
- Geocoding API
- Sheets API
- Drive API
- Gmail API
- Calendar API
- YouTube Data API v3
- Analytics Data API
- Apps Script API

## Paso 3 — Crear credenciales

### API Keys (para APIs publicas)

1. APIs y servicios → Credenciales → Crear credenciales → Clave de API
2. Restringir la clave:
   - Por aplicacion (HTTP referrers o IP)
   - Por API (solo las necesarias)
3. Copiar a `config/.env`

### OAuth 2.0 (para APIs con datos de usuario)

1. Configurar pantalla de consentimiento OAuth
2. Crear credenciales → ID de cliente OAuth
3. Tipo: Aplicacion web
4. URI de redireccion: `http://localhost:3000/oauth/callback`
5. Descargar JSON a `config/oauth/credentials.json`
6. Copiar Client ID y Secret a `config/.env`

## Paso 4 — Verificar conexion

```bash
npm run test:connection
```

## Paso 5 — Documentar

- Actualizar `docs/apis-activas.md` marcando ✅ las habilitadas
- Actualizar `docs/conexiones.md` con los proyectos que consumen
