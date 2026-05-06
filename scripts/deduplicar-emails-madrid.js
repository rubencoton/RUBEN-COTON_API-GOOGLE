const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function deduplicarEmails() {
  try {
    console.log('🔄 Deduplicando UNIVERSIDADES MADRID por email...\n');

    const { sheets } = await getServices();

    // 1. Leer datos actuales
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A:I"
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No hay datos');
    }

    console.log(`📋 Filas originales: ${values.length - 1}`);

    // Headers actuales (orden):
    // 0: UNIVERSIDAD/CENTRO
    // 1: TIPO
    // 2: FACULTAD/ESCUELA
    // 3: DEPARTAMENTO
    // 4: ÁREA
    // 5: TELÉFONO
    // 6: EMAIL PRINCIPAL  <-- email PPAL para reagrupar
    // 7: EMAIL PDI/RRHH   <-- email contratación
    // 8: WEB

    // 2. Agrupar por EMAIL CONTRATACIÓN (PDI/RRHH) - el más relevante para el objetivo
    const grupos = new Map();

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const universidad = row[0] || '';
      const tipo = row[1] || '';
      const facultad = row[2] || '';
      const departamento = row[3] || '';
      const area = row[4] || '';
      const telefono = row[5] || '';
      const emailPrincipal = (row[6] || '').toLowerCase().trim();
      const emailPDI = (row[7] || '').toLowerCase().trim();
      const web = row[8] || '';

      // Email clave: el de PDI/RRHH (contratación)
      // Si está vacío, usar el principal
      const emailClave = emailPDI || emailPrincipal;

      if (!emailClave) continue;

      if (!grupos.has(emailClave)) {
        grupos.set(emailClave, {
          email: emailClave,
          emailPrincipal: emailPrincipal,
          universidad: universidad,
          tipo: tipo,
          telefono: telefono,
          web: web,
          departamentos: new Set(),
          facultades: new Set(),
          areas: new Set()
        });
      }

      const grupo = grupos.get(emailClave);

      // Añadir departamento, facultad, area al set
      if (departamento) grupo.departamentos.add(departamento);
      if (facultad && facultad !== universidad) grupo.facultades.add(facultad);
      if (area) grupo.areas.add(area);
    }

    console.log(`✅ Emails únicos: ${grupos.size}\n`);

    // 3. Construir nueva estructura
    const headers = [
      'EMAIL CONTRATACIÓN',
      'UNIVERSIDAD/CENTRO',
      'TIPO',
      'DEPARTAMENTOS Y ÁREAS QUE CUBRE',
      'FACULTADES/ESCUELAS',
      'TELÉFONO',
      'WEB OFICIAL',
      'EMAIL ALTERNATIVO'
    ];

    const newData = [headers];

    // Convertir mapa a array y ordenar por universidad
    const filas = Array.from(grupos.values()).sort((a, b) =>
      a.universidad.localeCompare(b.universidad)
    );

    for (const g of filas) {
      // Concatenar departamentos únicos separados por " | "
      const deptosArr = Array.from(g.departamentos);
      const facsArr = Array.from(g.facultades);

      newData.push([
        g.email,
        g.universidad,
        g.tipo,
        deptosArr.join(' | '),
        facsArr.join(' | ') || g.universidad,
        g.telefono,
        g.web,
        g.emailPrincipal !== g.email ? g.emailPrincipal : ''
      ]);
    }

    // 4. Borrar pestaña antigua
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const oldSheet = meta.data.sheets.find(s => s.properties.title === 'UNIVERSIDADES MADRID');

    if (oldSheet) {
      console.log('🗑️  Eliminando pestaña antigua...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: oldSheet.properties.sheetId } }] }
      });
    }

    // 5. Crear pestaña nueva
    console.log('📑 Creando pestaña UNIVERSIDADES MADRID dedupliada...');
    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'UNIVERSIDADES MADRID' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    // 6. Insertar datos
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A1",
      valueInputOption: 'RAW',
      resource: { values: newData }
    });

    console.log(`✅ ${newData.length - 1} filas únicas insertadas`);

    // 7. Aplicar formato
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 8 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.1, green: 0.3, blue: 0.6 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE',
              wrapStrategy: 'WRAP'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      // Filas con wrap para ver bien los departamentos largos
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: newData.length, startColumnIndex: 3, endColumnIndex: 5 },
          cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
          fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 280 }, fields: 'pixelSize' } },  // EMAIL
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 250 }, fields: 'pixelSize' } },  // UNIV
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 130 }, fields: 'pixelSize' } },  // TIPO
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 3, endIndex: 4 }, properties: { pixelSize: 500 }, fields: 'pixelSize' } },  // DEPTOS
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 }, properties: { pixelSize: 350 }, fields: 'pixelSize' } },  // FACS
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 5, endIndex: 6 }, properties: { pixelSize: 130 }, fields: 'pixelSize' } },  // TEL
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 6, endIndex: 7 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },  // WEB
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 7, endIndex: 8 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },  // EMAIL ALT
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: newData.length, startColumnIndex: 0, endColumnIndex: 8 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('🎉 DEDUPLICACIÓN COMPLETA');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Antes: ${values.length - 1} filas`);
    console.log(`📊 Después: ${newData.length - 1} emails únicos`);
    console.log(`📉 Reducción: ${(((values.length - 1) - (newData.length - 1)) / (values.length - 1) * 100).toFixed(1)}%\n`);

    // Estadísticas por tipo
    const porTipo = {};
    filas.forEach(f => {
      porTipo[f.tipo] = (porTipo[f.tipo] || 0) + 1;
    });

    console.log('📋 Por tipo:');
    Object.entries(porTipo).sort((a, b) => b[1] - a[1]).forEach(([tipo, n]) => {
      console.log(`   • ${tipo || '(sin tipo)'}: ${n}`);
    });
    console.log();

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deduplicarEmails();
