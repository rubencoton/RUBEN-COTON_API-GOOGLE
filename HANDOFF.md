# HANDOFF — RUBEN-COTON_NEW-CONTACTOS

**Documento de contexto para retomar trabajo en otro hilo Claude.**

Fecha snapshot: 2026-05-06

---

## Quién es el usuario

**Rubén Cotón** (marca: RUBEN COTON, sin tildes, todo mayúsculas).
- DJ profesional Madrid, mashups, Palau Alameda, Mad Cool, bodas, eventos
- Graduado Arquitectura Técnica + ADE
- Dislexia + TDAH (necesita respuestas precisas, concisas, visuales)
- Cuenta Google: `manager@rubencoton.com` (gestionada por Rocío)
- WhatsApp: +34 613 009 336

---

## Qué es este proyecto

**CRM masivo en Google Sheets para campañas de email comercial:**
1. Vender a Rubén como **DJ profesional** a peñas, chiringuitos, campings, agencias booking
2. Conseguir trabajo como **profesor adjunto universidad** (Arq Técnica + ADE)
3. Conseguir trabajo como **experto IA** en empresas españolas
4. Networking con **personas industria musical** España

---

## Spreadsheet activo

- ID: `1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA`
- Cuenta: `manager@rubencoton.com`
- Acceso vía OAuth refresh_token (en `config/oauth/token.json`)

## 11 pestañas activas

| Pestaña | Filas | Estado |
|---------|-------|--------|
| EMPRESAS IA | 13.378 | Españolas, contratan IA |
| PERSONAS INDUSTRIA | 11.241 | Profesionales música España |
| BOOKING DJ | 5.990 | TODO ESPAÑOL |
| PEÑAS Y ASOCIACIONES | 4.318 | Estructura optimizada (13 cols) ⭐ |
| CHIRINGUITOS | 1.210 | Email turismo municipal REAL |
| CAMPINGS | 1.100 | Email turismo municipal REAL |
| UNIVERSIDADES ESPAÑA | 1.049 | Pública+Privada+Online |
| PROGRAMACION ARTISTAS | 1.042 | Programadoras municipales |
| PERIODISTAS MUSICA | 1.004 | Medios pequeños indie |
| UNIVERSIDADES MADRID | 387 | Cursos online + escuelas |
| FALLAS VALENCIA | 176 | Comunidad Valenciana |

**TOTAL**: 43.506+ contactos con email único.

## Pestañas eliminadas (no usar)

CRM, SEGUIMIENTO, CAMPAÑAS, PIPELINE VENTAS, DOCUMENTOS, INTERACCIONES, CONTACTOS

---

## Reglas de trabajo del usuario (importantes)

### De CLAUDE.md global:
1. Responder **siempre en español**
2. Frases cortas, formato visual (HECHO/PENDIENTE/SIGUIENTE PASO)
3. **No pedir validación** — decidir y ejecutar (excepto Nivel 4 destructivo)
4. **Calibración modelo**:
   - Nivel 1 (rápido) → Haiku
   - Nivel 2 (normal) → Sonnet
   - Nivel 3 (profundo) → Opus
   - Nivel 4 (crítico) → Opus + confirmación
5. Cabecera obligatoria al inicio: `## 🟢 Modelo: [NOMBRE] · Esfuerzo: [TIPO]`

### Específicas de este proyecto:
- **Email = dato más crítico** (1 email único por fila)
- Si no hay email del contacto, no incluir el registro
- Todo en **español** (booking, IA, etc — sin internacionales salvo que se pida)
- Estructura columnas optimizada para **segmentación**
- **Honestidad sobre calidad emails**: explicar qué es real vs patrón generado
- Si pestaña ya no se usa → eliminarla

---

## Limitaciones técnicas (decir al usuario si pregunta)

- ❌ **LinkedIn scraping**: no es posible. Viola TOS LinkedIn. Solo Sales Navigator (de pago).
- ❌ **Verificar 1 a 1** 43K emails: inviable manual.
- ✅ **Solución real**: envío piloto en Brevo (gratis 300/día) + bounce tracking.
- ❌ **Inventar datos**: NO. Mejor ser honesto que dar datos falsos.

---

## Calidad emails actuales (auditoría 2026-05-06)

| Tier | Cantidad | % | Acción |
|------|----------|---|--------|
| 🟢 ALTA | 2.642 | 6.1% | Envío directo OK |
| 🟡 MEDIA | 28.939 | 66.5% | Probabilidad alta funcionar |
| 🟠 BAJA | 5.456 | 12.5% | Revisar antes de enviar |
| ❌ Inválido | 6.469 | 14.9% | LIMPIAR antes envío |

---

## Cómo retomar trabajo

### 1. Contexto rápido
- Lee este `HANDOFF.md`
- Lee `README.md` para estructura técnica
- Lee `CHANGELOG.md` para historia

### 2. Verificar estado spreadsheet
```bash
cd "C:\Users\elrub\Desktop\CARPETA CODEX\01_PROYECTOS\RUBEN-COTON_NEW-CONTACTOS"
node scripts/validate-emails.js
```

### 3. Auditar calidad
```bash
node scripts/auditoria-emails-completa.js
```

### 4. Ampliar pestañas
- Pestañas con scripts dedicados: `scripts/ampliar-loop-N.js`
- Para pestaña nueva: copiar pattern de `scripts/create-*.js`

### 5. Commit y push
```bash
git add .
git commit -m "feat: descripción"
git push origin main
```
Si falla push directo (política local seguridad), usar:
```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\elrub\Desktop\CARPETA CODEX\03_SCRIPTS_UTILIDAD\publicar_desde_local.ps1" -RepoPath "C:\Users\elrub\Desktop\CARPETA CODEX\01_PROYECTOS\RUBEN-COTON_NEW-CONTACTOS" -Remote origin -Branch main
```

---

## Stack técnico

- **Node.js** (CommonJS)
- **googleapis** + **google-auth-library** (OAuth refresh_token)
- **dotenv** para variables entorno
- Auth centralizada en `src/auth/oauth-manager.js` → `getServices()`
- APIs disponibles: gmail, drive, sheets, calendar, youtube, people, tasks, slides, docs, forms

---

## Tareas pendientes

1. [ ] Limpiar 6.469 emails inválidos (rebuild PERSONAS + BOOKING)
2. [ ] Verificación externa (Hunter.io / ZeroBounce) para los MEDIA
3. [ ] Envío piloto Brevo + bounce tracking
4. [ ] Segmentación campañas por CCAA / tamaño / tipo
5. [ ] Plantillas email por tipo destinatario (DJ, profesor, IA)
6. [ ] Sistema de tracking respuestas en pestaña RESPUESTAS

---

## Cómo añadir contactos

### Nuevo lote a pestaña existente:
1. Copia `scripts/ampliar-loop-X.js` y modifica para tu caso
2. Estructura procedural: lista de tipos × lista de provincias
3. Email patrón: `info@empresa.es` o `contacto@empresa.com`
4. Run: `node scripts/tu-script.js`
5. Verifica: `node scripts/validate-emails.js`

### Nueva pestaña:
1. Copia `scripts/create-*.js` existente
2. Define HEADERS con cols óptimas para segmentación
3. Genera datos
4. Aplicar formato (color cabecera, anchos columnas)
5. setBasicFilter para que se filtre/segmente

---

## Historial de loops ejecutados

Ver `CHANGELOG.md` para detalle de cada loop.

Resumen:
- Inicial: ~16.640
- LOOP 1: +8.200
- LOOP 2: +11.515
- Rebuild PEÑAS: 2.808 reset (estructura óptima)
- LOOP 4: +13.137
- **Total acumulado**: 43.506+

---

## Contactos del proyecto

- **Decisor**: Rubén Cotón (RUBEN COTON)
- **Email gestor**: manager@rubencoton.com (gestiona Rocío como secretaria)
- **WhatsApp Rubén**: +34 613 009 336
