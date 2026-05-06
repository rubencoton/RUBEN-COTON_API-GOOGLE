const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function deduplicar() {
  try {
    console.log('🔄 Deduplicando EMPRESAS IA por email...\n');

    const { sheets } = await getServices();

    // Leer
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A:J"
    });

    const values = response.data.values;
    if (!values || values.length === 0) throw new Error('Sin datos');

    console.log(`📋 Filas originales: ${values.length - 1}`);

    // Headers (10 cols):
    // 0: NOMBRE EMPRESA
    // 1: SECTOR
    // 2: CIUDAD
    // 3: COMUNIDAD
    // 4: ROL DEMANDADO IA
    // 5: TAMAÑO
    // 6: TELÉFONO
    // 7: EMAIL CONTRATACIÓN  <-- CLAVE
    // 8: WEB
    // 9: DEPARTAMENTO IA / NOTA

    // Agrupar por email
    const grupos = new Map();

    for (let i = 1; i < values.length; i++) {
      const r = values[i];
      const email = (r[7] || '').toLowerCase().trim();
      if (!email) continue;

      if (!grupos.has(email)) {
        grupos.set(email, {
          email: email,
          empresas: new Set(),
          sectores: new Set(),
          ciudades: new Set(),
          comunidades: new Set(),
          roles: new Set(),
          tamanos: new Set(),
          telefono: r[6] || '',
          web: r[8] || '',
          notas: new Set()
        });
      }

      const g = grupos.get(email);
      if (r[0]) g.empresas.add(r[0]);
      if (r[1]) g.sectores.add(r[1]);
      if (r[2]) g.ciudades.add(r[2]);
      if (r[3]) g.comunidades.add(r[3]);
      if (r[4]) g.roles.add(r[4]);
      if (r[5]) g.tamanos.add(r[5]);
      if (r[9]) g.notas.add(r[9]);
    }

    console.log(`✅ Emails únicos: ${grupos.size}`);

    // Construir nueva data
    const headers = [
      'EMAIL CONTRATACIÓN',
      'EMPRESA(S)',
      'SECTOR',
      'CIUDAD',
      'COMUNIDAD AUTÓNOMA',
      'ROL/ÁREA IA DEMANDADA',
      'TAMAÑO',
      'TELÉFONO',
      'WEB',
      'DEPARTAMENTO IA / NOTAS'
    ];

    const filas = Array.from(grupos.values()).sort((a, b) => {
      const empA = Array.from(a.empresas)[0] || '';
      const empB = Array.from(b.empresas)[0] || '';
      return empA.localeCompare(empB);
    });

    const newData = [headers];
    for (const g of filas) {
      newData.push([
        g.email,
        Array.from(g.empresas).join(' | '),
        Array.from(g.sectores).join(' | '),
        Array.from(g.ciudades).join(' | '),
        Array.from(g.comunidades).join(' | '),
        Array.from(g.roles).join(' | '),
        Array.from(g.tamanos).join(' | '),
        g.telefono,
        g.web,
        Array.from(g.notas).join(' | ')
      ]);
    }

    // Borrar y recrear pestaña
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'EMPRESAS IA');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'EMPRESAS IA' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: newData }
    });

    // Formato
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.4, green: 0.1, blue: 0.5 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE',
              wrapStrategy: 'WRAP'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: newData.length, startColumnIndex: 0, endColumnIndex: 10 },
          cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
          fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 280 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 250 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 2, endIndex: 7 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 7, endIndex: 10 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: newData.length, startColumnIndex: 0, endColumnIndex: 10 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('\n═══════════════════════════════════════');
    console.log('🎉 EMPRESAS IA DEDUPLICADA');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Antes: ${values.length - 1}`);
    console.log(`📊 Después: ${newData.length - 1} emails únicos\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deduplicar();
