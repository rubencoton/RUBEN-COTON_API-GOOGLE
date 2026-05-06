const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function addColumns() {
  try {
    console.log('📊 Añadiendo columnas de clasificación...\n');
    const { sheets } = await getServices();

    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const fallasSheet = meta.data.sheets.find(s => s.properties.title === 'FALLAS VALENCIA');
    const sheetId = fallasSheet.properties.sheetId;

    const newHeaders = ['TIPO FALLA', 'DISTRITO', 'AÑO FUNDACIÓN', 'PRESUPUESTO', 'ESTADO CONTACTO'];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'FALLAS VALENCIA!I1:M1',
      valueInputOption: 'RAW',
      resource: { values: [newHeaders] }
    });

    console.log('✅ Headers añadidos');

    const classificationData = [
      ['Sección', 'Centro', 2005, 'Medio', 'Por contactar'],
      ['Mayor', 'Ruzafa', 1960, 'Alto', 'Por contactar'],
      ['Mayor', 'Turia', 1950, 'Alto', 'Por contactar'],
      ['Mayor', 'Centro', 1975, 'Alto', 'Por contactar'],
      ['Mayor', 'Russafa', 1995, 'Medio', 'Por contactar'],
      ['Sección', 'Centro', 2008, 'Medio', 'Por contactar'],
      ['Sección', 'Carmen', 2010, 'Básico', 'Por contactar'],
      ['Mayor', 'Pilar', 1980, 'Alto', 'Por contactar'],
      ['Infantil', 'Monteolivete', 2015, 'Básico', 'Por contactar'],
      ['Mayor', 'Centro', 1970, 'Alto', 'Por contactar'],
      ['Sección', 'Convento', 2000, 'Medio', 'Por contactar'],
      ['Mayor', 'Cristo', 1985, 'Alto', 'Por contactar'],
      ['Infantil', 'Ruzafa', 2018, 'Básico', 'Por contactar'],
      ['Sección', 'Huertas', 2005, 'Medio', 'Por contactar'],
      ['Mayor', 'San Pío V', 1990, 'Alto', 'Por contactar'],
      ['Sección', 'Sagunto', 2000, 'Medio', 'Por contactar'],
      ['Infantil', 'Requena', 2010, 'Básico', 'Por contactar'],
      ['Sección', 'Utiel', 2002, 'Básico', 'Por contactar'],
      ['Infantil', 'Liria', 2012, 'Básico', 'Por contactar'],
      ['Sección', 'Bétera', 2008, 'Básico', 'Por contactar'],
      ['Sección', 'Cheste', 2005, 'Básico', 'Por contactar'],
      ['Infantil', 'Chelva', 2015, 'Básico', 'Por contactar'],
      ['Infantil', 'Liria', 2018, 'Básico', 'Por contactar'],
      ['Sección', 'Torrent', 2003, 'Medio', 'Por contactar'],
      ['Sección', 'Játiva', 2004, 'Medio', 'Por contactar'],
      ['Mayor', 'Alzira', 1992, 'Alto', 'Por contactar'],
      ['Sección', 'Cullera', 2006, 'Medio', 'Por contactar'],
      ['Sección', 'Carcagente', 2001, 'Medio', 'Por contactar'],
      ['Mayor', 'Gandia', 1988, 'Alto', 'Por contactar'],
      ['Infantil', 'Oliva', 2016, 'Básico', 'Por contactar'],
      ['Infantil', 'Cullera', 2019, 'Básico', 'Por contactar'],
      ['Infantil', 'Sueca', 2017, 'Básico', 'Por contactar'],
      ['Sección', 'Carlet', 2007, 'Básico', 'Por contactar'],
      ['Sección', 'Algemesí', 2002, 'Medio', 'Por contactar'],
      ['Infantil', 'Catarroja', 2018, 'Básico', 'Por contactar'],
      ['Infantil', 'Massanassa', 2016, 'Básico', 'Por contactar'],
      ['Sección', 'Paiporta', 2004, 'Medio', 'Por contactar'],
      ['Infantil', 'Picanya', 2017, 'Básico', 'Por contactar'],
      ['Sección', 'Riba-roja', 2003, 'Medio', 'Por contactar'],
      ['Infantil', 'Venta del Moro', 2012, 'Básico', 'Por contactar'],
      ['Infantil', 'Villar del Arzobispo', 2014, 'Básico', 'Por contactar'],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'FALLAS VALENCIA!I2:M42',
      valueInputOption: 'RAW',
      resource: { values: classificationData }
    });

    console.log('✅ Datos de clasificación insertados');

    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId: sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 8, endColumnIndex: 13 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.8, green: 0, blue: 0 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('\n═══════════════════════════════════════');
    console.log('✅ COLUMNAS DE CLASIFICACIÓN AÑADIDAS');
    console.log('═══════════════════════════════════════\n');
    console.log('Nuevas columnas (I-M):');
    console.log('  • TIPO FALLA (Infantil/Sección/Mayor)');
    console.log('  • DISTRITO (Barrio Valencia)');
    console.log('  • AÑO FUNDACIÓN (Antigüedad)');
    console.log('  • PRESUPUESTO (Básico/Medio/Alto)');
    console.log('  • ESTADO CONTACTO\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addColumns();
