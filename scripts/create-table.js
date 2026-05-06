const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = process.argv[2] || '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function createTable() {
  try {
    console.log('📊 Creando tabla en Sheets...');
    console.log(`ID: ${SPREADSHEET_ID}\n`);

    // Headers
    const headers = [
      'NOMBRE ENTIDAD',
      'MUNICIPIO',
      'PROVINCIA',
      'COMUNIDAD AUTÓNOMA',
      'POBLACIÓN DEL MUNICIPIO',
      'NOMBRE DE CONTACTO',
      'TELÉFONO',
      'CORREO ELECTRÓNICO'
    ];

    const { sheets } = await getServices();

    // 1. Obtener primera hoja
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });

    const sheetId = sheetMetadata.data.sheets[0].properties.sheetId;
    const sheetName = sheetMetadata.data.sheets[0].properties.title;

    console.log(`✅ Hoja detectada: "${sheetName}" (ID: ${sheetId})`);

    // 2. Limpiar contenido previo
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:H`
    });

    // 3. Insertar headers
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      resource: {
        values: [headers]
      }
    });

    console.log('✅ Headers insertados');

    // 4. Formatear: rojo fondo + blanco texto
    const requests = [
      {
        repeatCell: {
          range: {
            sheetId: sheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: headers.length
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.8, green: 0, blue: 0 },
              textFormat: {
                bold: true,
                fontSize: 11,
                fontFamily: 'Arial',
                foregroundColor: { red: 1, green: 1, blue: 1 }
              },
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      // Altura fila header
      {
        updateDimensionProperties: {
          range: {
            sheetId: sheetId,
            dimension: 'ROWS',
            startIndex: 0,
            endIndex: 1
          },
          properties: {
            pixelSize: 30
          },
          fields: 'pixelSize'
        }
      },
      // Ancho columnas
      {
        updateDimensionProperties: {
          range: {
            sheetId: sheetId,
            dimension: 'COLUMNS',
            startIndex: 0,
            endIndex: headers.length
          },
          properties: {
            pixelSize: 150
          },
          fields: 'pixelSize'
        }
      }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests }
    });

    console.log('✅ Formato aplicado');
    console.log('\n📋 TABLA LISTA\n');
    console.log('Columnas (8):');
    headers.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));
    console.log(`\n🔗 https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTable();
