const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function formatearPoblacion() {
  try {
    console.log('🔢 Aplicando formato miles con punto a POBLACIÓN...\n');

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

    // Pestañas que tienen columna POBLACIÓN
    const pestanas = ['FALLAS VALENCIA', 'PEÑAS Y ASOCIACIONES'];

    const requests = [];

    for (const titulo of pestanas) {
      const sheet = meta.data.sheets.find(s => s.properties.title === titulo);
      if (!sheet) continue;

      const sheetId = sheet.properties.sheetId;

      // Leer headers para encontrar columna POBLACIÓN
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${titulo}'!A1:Z1`
      });

      const headers = response.data.values?.[0] || [];
      const polColIndex = headers.findIndex(h =>
        h && h.toUpperCase().includes('POBLACI')
      );

      if (polColIndex === -1) {
        console.log(`   ⚠️  ${titulo}: no tiene columna POBLACIÓN`);
        continue;
      }

      console.log(`   📄 ${titulo}: columna POBLACIÓN en col ${String.fromCharCode(65 + polColIndex)}`);

      // Aplicar formato numérico con separador de miles (.)
      // Patrón "#,##0" en locale es-ES = 1.000
      requests.push({
        repeatCell: {
          range: {
            sheetId,
            startRowIndex: 1,
            startColumnIndex: polColIndex,
            endColumnIndex: polColIndex + 1
          },
          cell: {
            userEnteredFormat: {
              numberFormat: {
                type: 'NUMBER',
                pattern: '#,##0'  // Sheets traduce con locale del documento
              }
            }
          },
          fields: 'userEnteredFormat.numberFormat'
        }
      });
    }

    // También aplicar locale español al spreadsheet
    requests.push({
      updateSpreadsheetProperties: {
        properties: {
          locale: 'es_ES',
          timeZone: 'Europe/Madrid'
        },
        fields: 'locale,timeZone'
      }
    });

    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests }
      });
      console.log(`\n✅ Formato aplicado: poblaciones con punto de miles (1.000)\n`);
    }

  } catch (error) {
    console.error('❌', error.message);
  }
}

formatearPoblacion();
