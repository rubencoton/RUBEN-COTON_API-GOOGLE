# Mapa de Conexiones Google — RUBEN COTON

Documento central que mapea que proyecto usa que API de Google
y como se conecta a traves de este hub.

## Cuenta: manager@rubencoton.com

### Conexiones activas

| Proyecto | API Google | Tipo credencial | Estado |
|----------|-----------|----------------|--------|
| (pendiente de mapear) | | | |

### Conexiones planificadas

| Proyecto | API Google | Tipo credencial | Prioridad |
|----------|-----------|----------------|-----------|
| APP_ARTES-BUHO_BUSCA-CONTACTOS | Places API | API Key | Alta |
| IA_RUBEN-COTON_VIDEO-API | YouTube Data API | API Key | Media |
| gmail-api-inbox-router-manager-gas | Gmail API | OAuth + Apps Script | Alta |

## Cuenta: booking@artesbuhomanagement.com (referencia)

> Gestionada en ARTES-BUHO_API-GOOGLE, NO en este proyecto.

| Proyecto | API Google | Hub |
|----------|-----------|-----|
| ARTES-BUHO_API-GOOGLE | OAuth, Gmail, Drive, Sheets | Propio |

## Como registrar una nueva conexion

1. Identificar que API necesita el proyecto
2. Verificar que la API esta habilitada en `docs/apis-activas.md`
3. Anadir la fila en la tabla correspondiente de este archivo
4. Crear el modulo en `src/{servicio}/` si no existe
5. Documentar en el proyecto consumidor la referencia a este hub

## Busqueda rapida de conexiones en el workspace

```bash
# Todas las API Keys Google
grep -r "GOOGLE_\|PLACES_API\|YOUTUBE_API\|MAPS_API" "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" --include="*.env*" --include="*.json" --include="*.js" --include="*.ts" --include="*.gs" -l

# Imports de googleapis
grep -r "googleapis\|google-auth-library" "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" --include="*.js" --include="*.ts" --include="*.gs" -l

# OAuth Google
grep -r "oauth2.*google\|accounts.google.com\|googleapis.com/oauth" "C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/" -i -l
```
