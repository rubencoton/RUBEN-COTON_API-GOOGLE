const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function createCRM() {
  try {
    console.log('🚀 Creando CRM en múltiples pestañas...\n');

    const { sheets } = await getServices();

    // 1. Crear pestañas
    console.log('📑 Creando pestañas...');

    const tabNames = ['CRM', 'SEGUIMIENTO'];
    const creatorsRequests = tabNames.map(title => ({
      addSheet: {
        properties: { title }
      }
    }));

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: creatorsRequests }
    });

    const sheetIds = createResp.data.replies.map(r => r.addSheet.properties.sheetId);
    console.log(`✅ Pestañas creadas: ${tabNames.join(', ')}`);

    // 2. Configurar pestaña CRM (Dashboard)
    console.log('\n📊 Configurando Dashboard CRM...');

    const crmSheetId = sheetIds[0];
    const crmData = [
      ['DASHBOARD CRM - GESTIÓN DE CONTACTOS', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['KPI', 'VALOR', '', 'ESTADO', 'ACCIÓN', '', '', ''],
      ['Total Contactos', '=COUNTA(CONTACTOS!A2:A)', '', 'ACTIVOS', '=COUNTIFS(SEGUIMIENTO!B2:B,"Activo")', '', '', ''],
      ['Sin Contactar', '=COUNTIF(SEGUIMIENTO!B2:B,"Por Contactar")', '', 'EN PROCESO', '=COUNTIFS(SEGUIMIENTO!B2:B,"En Proceso")', '', '', ''],
      ['Contactados', '=COUNTIF(SEGUIMIENTO!B2:B,"Contactado")', '', 'CERRADO', '=COUNTIFS(SEGUIMIENTO!B2:B,"Cerrado")', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['PIPELINE DE VENTAS', '', '', '', '', '', '', ''],
      ['ETAPA', 'CANTIDAD', 'PORCENTAJE', '', '', '', '', ''],
      ['Por Contactar', '=COUNTIF(SEGUIMIENTO!B:B,"Por Contactar")', '=IF(C4=0,0,B10/C4)', '', '', '', '', ''],
      ['En Negociación', '=COUNTIF(SEGUIMIENTO!B:B,"En Proceso")', '=IF(C4=0,0,B11/C4)', '', '', '', '', ''],
      ['Contactado', '=COUNTIF(SEGUIMIENTO!B:B,"Contactado")', '=IF(C4=0,0,B12/C4)', '', '', '', '', ''],
      ['Cerrado', '=COUNTIF(SEGUIMIENTO!B:B,"Cerrado")', '=IF(C4=0,0,B13/C4)', '', '', '', '', ''],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'CRM!A1:H13',
      valueInputOption: 'USER_ENTERED',
      resource: { values: crmData }
    });

    console.log('✅ Dashboard insertado');

    // 3. Configurar pestaña SEGUIMIENTO
    console.log('\n📋 Configurando SEGUIMIENTO...');

    const followUpHeaders = [
      'ID CONTACTO',
      'ESTADO',
      'FECHA CONTACTO',
      'PRÓXIMO CONTACTO',
      'NOTAS',
      'RESPONSABLE',
      'PRIORIDAD'
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'SEGUIMIENTO!A1',
      valueInputOption: 'RAW',
      resource: { values: [followUpHeaders] }
    });

    console.log('✅ Headers SEGUIMIENTO insertados');

    // 4. Formato general
    console.log('\n🎨 Aplicando formato...');

    const firstSheetId = 0;
    const formatRequests = [
      {
        updateSheetProperties: {
          fields: 'title',
          properties: {
            sheetId: firstSheetId,
            title: 'CONTACTOS'
          }
        }
      },
      {
        repeatCell: {
          range: {
            sheetId: firstSheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: 8
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
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      {
        repeatCell: {
          range: {
            sheetId: sheetIds[1],
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: 7
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
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      {
        repeatCell: {
          range: {
            sheetId: crmSheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: 8
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
              textFormat: {
                bold: true,
                fontSize: 14,
                fontFamily: 'Arial',
                foregroundColor: { red: 1, green: 1, blue: 1 }
              },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      {
        updateDimensionProperties: {
          range: {
            sheetId: firstSheetId,
            dimension: 'ROWS',
            startIndex: 0,
            endIndex: 1
          },
          properties: { pixelSize: 30 },
          fields: 'pixelSize'
        }
      },
      {
        updateDimensionProperties: {
          range: {
            sheetId: sheetIds[1],
            dimension: 'ROWS',
            startIndex: 0,
            endIndex: 1
          },
          properties: { pixelSize: 30 },
          fields: 'pixelSize'
        }
      }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('✅ CRM CREADO EXITOSAMENTE');
    console.log('═══════════════════════════════════════\n');
    console.log('PESTAÑAS:');
    console.log('  1. CONTACTOS - Tabla juntas/asociaciones');
    console.log('  2. CRM - Dashboard + pipeline');
    console.log('  3. SEGUIMIENTO - Tareas/notas\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createCRM();
