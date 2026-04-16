# CLAUDE.md - RUBEN-COTON_API-GOOGLE

Ultima actualizacion: 2026-04-16

## Que es este proyecto

Hub central de integraciones con APIs de Google para RUBEN COTON.
Centraliza credenciales, OAuth y modulos de conexion.

## Reglas de trabajo

1. Responder en espanol simple.
2. NO subir credenciales ni API Keys al repositorio.
3. Toda API nueva se documenta en `docs/apis-activas.md` y `docs/conexiones.md`.
4. Cada servicio Google tiene su carpeta en `src/`.
5. Si un proyecto necesita una API Google, debe conectarse a traves de este hub.

## Estructura clave

- `config/.env` — Variables de entorno (NO versionado)
- `config/.env.example` — Plantilla de variables
- `docs/apis-activas.md` — Inventario de APIs habilitadas en GCP
- `docs/conexiones.md` — Mapa de que proyecto usa que API
- `src/auth/` — OAuth 2.0 centralizado
- `src/{servicio}/` — Modulo por cada API Google

## Cuenta Google

- **manager@rubencoton.com** — Cuenta UNICA de este proyecto
- Este hub NO gestiona booking@artesbuhomanagement.com (eso es ARTES-BUHO_API-GOOGLE)

## Proyectos dependientes

Estos proyectos consumen APIs Google y deben estar mapeados aqui:

- APP_ARTES-BUHO_BUSCA-CONTACTOS → Places API
- ARTES-BUHO_API-GOOGLE → OAuth, Gmail, Drive, Sheets
- gmail-api-inbox-router-manager-gas → Gmail, Apps Script
- IA_RUBEN-COTON_VIDEO-API → YouTube Data
- whatsapp-work-api → (conexion indirecta)

## Busqueda de conexiones Google

Para encontrar TODAS las conexiones Google en el workspace:

```bash
# Buscar API Keys en todos los proyectos
grep -r "GOOGLE_" ../*/  --include="*.env*" --include="*.json" --include="*.js" --include="*.ts"

# Buscar imports de googleapis
grep -r "googleapis" ../*/ --include="*.js" --include="*.ts" --include="*.gs"

# Buscar referencias a OAuth Google
grep -r "oauth2.*google\|google.*oauth" ../*/ -i --include="*.js" --include="*.ts" --include="*.json"

# Buscar Script Properties de Google Apps Script
grep -r "PLACES_API_KEY\|GOOGLE_MAPS_API_KEY\|GOOGLE_PLACES_API_KEY" ../*/ --include="*.gs" --include="*.js"
```

## Flujo Git

Si `git push` falla por politica local, usar:
```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\elrub\Desktop\CARPETA CODEX\03_SCRIPTS_UTILIDAD\publicar_desde_local.ps1" -RepoPath "C:\Users\elrub\Desktop\CARPETA CODEX\01_PROYECTOS\RUBEN-COTON_API-GOOGLE" -Remote origin -Branch main
```
