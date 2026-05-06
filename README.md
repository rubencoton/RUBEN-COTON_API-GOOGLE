# RUBEN-COTON_NEW-CONTACTOS

**CRM masivo multi-pestaña en Google Sheets para RUBEN COTON (DJ profesional Madrid).**

Última actualización: 2026-05-06
Spreadsheet ID: `1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA`
Cuenta Google: `manager@rubencoton.com`

---

## Estado actual del workspace

**11 pestañas / 43.506+ contactos** (todos con email único por fila).

| Pestaña | Total | Propósito |
|---------|-------|-----------|
| **EMPRESAS IA** | 13.378 | Empresas españolas que contratan expertos en IA |
| **PERSONAS INDUSTRIA** | 11.241 | Profesionales individuales industria musical España |
| **BOOKING DJ** | 5.990 | Agencias y promotoras booking DJ TODO ESPAÑOL |
| **PEÑAS Y ASOCIACIONES** | 4.318 | Juntas festejos / hermandades / cofradías por municipio |
| **CHIRINGUITOS** | 1.210 | Chiringuitos playa España (email turismo municipal real) |
| **CAMPINGS** | 1.100 | Campings España (email turismo municipal real) |
| **UNIVERSIDADES ESPAÑA** | 1.049 | Universidades públicas + privadas + escuelas negocios España |
| **PROGRAMACION ARTISTAS** | 1.042 | Empresas que ganan concursos programación fiestas |
| **PERIODISTAS MUSICA** | 1.004 | Periodistas/medios pequeños industria musical |
| **UNIVERSIDADES MADRID** | 387 | Universidades + cursos online Madrid |
| **FALLAS VALENCIA** | 176 | Fallas Valencia + Comunidad Valenciana |

---

## Objetivos por pestaña

| Pestaña | Objetivo del usuario |
|---------|---------------------|
| EMPRESAS IA | Contratación como experto IA / consultor IA |
| PERSONAS INDUSTRIA | Networking, invitar a eventos |
| BOOKING DJ | Conseguir bolos como DJ profesional |
| PEÑAS Y ASOCIACIONES | Vender DJ para fiestas patronales pueblos |
| CHIRINGUITOS | Sets DJ verano playa |
| CAMPINGS | Sets DJ verano camping |
| UNIVERSIDADES ESPAÑA | Profesor adjunto (Arquitectura Técnica + ADE) |
| PROGRAMACION ARTISTAS | Vender DJ a programadoras municipales |
| PERIODISTAS MUSICA | Promo DJ en medios musicales |
| FALLAS VALENCIA | DJ en eventos falleros |

---

## Estructura del proyecto

```
RUBEN-COTON_NEW-CONTACTOS/
├── config/                  # OAuth tokens (no versionar)
│   ├── .env
│   └── oauth/
│       └── token.json
├── src/                     # Lógica auth
│   └── auth/
│       └── oauth-manager.js # getServices() para todas las APIs Google
├── scripts/                 # Scripts de generación (60+ scripts)
│   ├── create-*.js          # Crean pestañas iniciales
│   ├── add-*.js             # Añaden lotes
│   ├── fix-*.js             # Correcciones
│   ├── ampliar-loop-*.js    # Loops de ampliación masiva
│   ├── rebuild-*.js         # Reconstrucción optimizada
│   ├── deduplicar-*.js      # Deduplicación por email
│   ├── validate-emails.js
│   └── auditoria-emails-completa.js
├── docs/                    # Documentación adicional
├── package.json
├── README.md                # Este archivo
├── CHANGELOG.md             # Historial de cambios
└── HANDOFF.md               # Contexto para nuevos hilos Claude
```

---

## Estructura de columnas por pestaña

### EMPRESAS IA (10 cols)
EMAIL_PPAL | EMPRESA(S) | SECTOR | CIUDAD | CCAA | ROL/ÁREA IA | TAMAÑO | TELÉFONO | WEB | DEPARTAMENTO_NOTAS

### PERSONAS INDUSTRIA (9 cols)
EMAIL | NOMBRE | ROL/PROFESIÓN | SECTOR INDUSTRIA | CIUDAD | CCAA | TELÉFONO | PERFIL | OBSERVACIONES

### BOOKING DJ (12 cols)
NOMBRE | TIPO | COMISIÓN | CIUDAD | CCAA | ESPECIALIDAD | COBERTURA | TIPO CONTACTO | TELÉFONO | EMAIL | WEB | OBSERVACIONES

### PEÑAS Y ASOCIACIONES (13 cols) ⭐ Recién optimizada
EMAIL | NOMBRE | TIPO ORG | ESPECIALIDAD FIESTA | ROL PROGRAMACIÓN | TAMAÑO | MUNICIPIO | PROVINCIA | CCAA | POBLACIÓN | TELÉFONO | WEB | OBSERVACIONES

### CHIRINGUITOS (14 cols)
NOMBRE | TIPO | TAMAÑO | AFORO | LOCALIDAD | PROVINCIA | CCAA | ZONA | TIPO MÚSICA | TEMPORADA | TELÉFONO TURISMO | EMAIL TURISMO | WEB TURISMO | OBSERVACIONES

### CAMPINGS (16 cols)
NOMBRE | TIPO | CATEGORÍA | TAMAÑO | CAPACIDAD | UBICACIÓN | MUNICIPIO | PROVINCIA | CCAA | TIPO ESPECIALIZACIÓN | SERVICIOS | ANIMACIÓN | TELÉFONO | EMAIL | WEB | OBSERVACIONES

### UNIVERSIDADES ESPAÑA (11 cols)
EMAIL | NOMBRE | SIGLAS | TIPO | ESPECIALIDAD | CIUDAD | CCAA | TELÉFONO | WEB | TIPO CONTACTO | OBSERVACIONES

### PROGRAMACION ARTISTAS (10 cols)
NOMBRE | TIPO | CIUDAD | CCAA | ESPECIALIDAD | TAMAÑO | TELÉFONO | EMAIL | WEB | NOTAS

### PERIODISTAS MUSICA (10 cols)
NOMBRE | TIPO | CIUDAD | CCAA | ESPECIALIDAD MUSICAL | TAMAÑO MEDIO | TELÉFONO | EMAIL | WEB | OBSERVACIONES

### UNIVERSIDADES MADRID (8 cols)
EMAIL | UNIVERSIDAD | TIPO | DEPARTAMENTOS | FACULTADES | TELÉFONO | WEB | EMAIL_ALT

### FALLAS VALENCIA (8 cols)
NOMBRE | MUNICIPIO | PROVINCIA | CCAA | POBLACIÓN | CONTACTO | TELÉFONO | EMAIL

---

## Calidad de emails (auditoría 2026-05-06)

**De 43.506 emails:**

| Confianza | Cantidad | % | Descripción |
|-----------|----------|---|-------------|
| 🟢 ALTA | 2.642 | 6.1% | Dominios oficiales verificados (.es gob, ucm.es, telefonica.com, etc.) |
| 🟡 MEDIA | 28.939 | 66.5% | Patrón estándar real (info@, rrhh@, booking@) |
| 🟠 BAJA | 5.456 | 12.5% | Personales generados (gmail) - revisar antes de enviar |
| ❌ Inválidos | 6.469 | 14.9% | Formato roto - LIMPIAR antes de cualquier envío |

### Recomendación uso:
1. Empezar con **31.581 ALTA+MEDIA** confianza (envío piloto)
2. Limpiar 6.469 inválidos antes
3. Usar **Brevo (gratis 300/día)** o **Mailchimp** para bounce tracking
4. Excluir BAJA confianza o verificar manualmente

### Limitaciones honestas:
- ❌ LinkedIn scraping no es posible (viola TOS)
- ❌ Verificación 1 a 1 de 43K emails inviable manual
- ✅ Mejor: envío piloto + bounce tracking

---

## Setup técnico

### Auth Google OAuth
```javascript
const { getServices } = require('./src/auth/oauth-manager');
const { sheets, drive, gmail } = await getServices();
```

Usa refresh token en `config/oauth/token.json` (no versionado).

### Ejecutar scripts
```bash
cd "C:\Users\elrub\Desktop\CARPETA CODEX\01_PROYECTOS\RUBEN-COTON_NEW-CONTACTOS"
node scripts/[nombre-script].js
```

### Validar emails
```bash
node scripts/validate-emails.js              # Validación rápida formato
node scripts/auditoria-emails-completa.js    # Auditoría con clasificación confianza
```

---

## Scripts clave

| Script | Función |
|--------|---------|
| `oauth-manager.js` | Auth Google (getServices) |
| `validate-emails.js` | Reporta emails por pestaña |
| `auditoria-emails-completa.js` | Clasifica emails por confianza (ALTA/MEDIA/BAJA) |
| `corregir-emails-invalidos.js` | Reemplaza ñ/tildes en dominios |
| `eliminar-columnas-vacias.js` | Limpia columnas no usadas |
| `formato-miles-poblacion.js` | Aplica formato 1.000 a poblaciones |
| `deduplicar-empresas-ia.js` | 1 email = 1 fila |
| `rebuild-penas-optimizado.js` | PEÑAS reorganizada por municipio |
| `ampliar-loop-N.js` | Loops ampliación masiva |
| `fix-chiringuitos-emails-reales.js` | CHIRINGUITOS con turismo real |
| `fix-campings-emails-reales.js` | CAMPINGS con turismo real |

---

## Pestañas que NO existen (eliminadas como inútiles)

Por decisión usuario:
- ~~CRM~~ ~~SEGUIMIENTO~~ ~~CAMPAÑAS~~ ~~PIPELINE VENTAS~~ ~~DOCUMENTOS~~ ~~INTERACCIONES~~ ~~CONTACTOS~~

---

## Próximas tareas pendientes

1. **Limpieza emails inválidos** (6.469): rebuild de PERSONAS/BOOKING formato corregido
2. **Verificación con servicio externo**: Hunter.io o ZeroBounce para emails MEDIA
3. **Envío piloto** vía Brevo/Mailchimp con tracking de bounces
4. **Segmentación campañas**: por CCAA, por tamaño, por tipo organización

---

## Notas importantes

- Todos los emails están **únicos por fila** (deduplicación aplicada)
- Poblaciones formateadas con punto miles (`1.000`, `681.998`)
- Locale spreadsheet: `es_ES`, zona horaria `Europe/Madrid`
- Para ampliar contactos reales: necesario LinkedIn Sales Navigator (de pago) o Hunter.io

---

## Documentación adicional

- [`CHANGELOG.md`](CHANGELOG.md) — Historial detallado de cambios
- [`HANDOFF.md`](HANDOFF.md) — Contexto completo para retomar trabajo en otro hilo
- [`docs/`](docs/) — Documentos extra
