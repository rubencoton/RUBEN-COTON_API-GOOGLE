const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function limpiar() {
  try {
    console.log('🧹 Eliminando columnas vacías de cada pestaña...\n');

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

    for (const sheet of meta.data.sheets) {
      const titulo = sheet.properties.title;
      const sheetId = sheet.properties.sheetId;
      const totalCols = sheet.properties.gridProperties.columnCount;
      const totalRows = sheet.properties.gridProperties.rowCount;

      console.log(`📄 ${titulo} (${totalCols} cols, ${totalRows} rows)`);

      // Leer todos los datos
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${titulo}'!A1:ZZ${totalRows}`
      });

      const values = response.data.values || [];
      if (values.length === 0) continue;

      // Determinar la última columna con datos
      let ultimaColConDatos = 0;
      for (const row of values) {
        for (let i = row.length - 1; i >= 0; i--) {
          if (row[i] && row[i].toString().trim() !== '') {
            if (i > ultimaColConDatos) ultimaColConDatos = i;
            break;
          }
        }
      }

      const colsConDatos = ultimaColConDatos + 1;
      const colsAEliminar = totalCols - colsConDatos;

      if (colsAEliminar > 0) {
        // Eliminar columnas vacías al final
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [{
              deleteDimension: {
                range: {
                  sheetId,
                  dimension: 'COLUMNS',
                  startIndex: colsConDatos,
                  endIndex: totalCols
                }
              }
            }]
          }
        });
        console.log(`   🗑️  ${colsAEliminar} columnas vacías eliminadas`);
      } else {
        console.log(`   ✅ Sin columnas vacías`);
      }
    }

    console.log('\n✅ Limpieza completada\n');

  } catch (error) {
    console.error('❌', error.message);
  }
}

limpiar();
