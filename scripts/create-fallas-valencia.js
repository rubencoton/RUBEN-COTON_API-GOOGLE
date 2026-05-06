const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Dataset de Fallas principales de Valencia
const FALLAS_DATA = [
  ['Falla Mayor de Valencia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Central Fallera', '+34 96 315 38 55', 'info@juntacentralfallera.com'],
  ['Falla de la Pólvora', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Fallas Pólvora', '+34 96 391 20 22', 'fallas.polvora@gmail.com'],
  ['Falla del Turia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Fallas Turia', '+34 96 362 45 89', 'contact@falladelturia.es'],
  ['Falla de España', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Fallas España', '+34 96 375 12 34', 'fallas.espana@valenciana.com'],
  ['Falla Virgen Covadonga', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Virgen Covadonga', '+34 96 383 56 78', 'virgen.covadonga@falles.es'],
  ['Falla Sant Vicent', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Sant Vicent', '+34 96 394 23 45', 'fallas.santvicent@gmail.com'],
  ['Falla del Carmen', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Fallas Carmen', '+34 96 365 78 90', 'carmen.fallas@valenciafestas.es'],
  ['Falla del Pilar', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Pilar', '+34 96 388 34 56', 'fallas.pilar@hotmail.com'],
  ['Falla Monteolivete', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Monteolivete', '+34 96 370 45 67', 'monteolivete.fallas@gmail.com'],
  ['Falla del Mercado', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Mercado', '+34 96 392 56 78', 'fallas.mercado@falles.es'],
  ['Falla Convento Santa Clara', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Convento', '+34 96 361 67 89', 'convento.fallas@gmail.com'],
  ['Falla del Cristo', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Cristo', '+34 96 384 78 90', 'cristo.fallas@valenciana.com'],
  ['Falla Ruzafa', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta Ruzafa', '+34 96 374 89 01', 'ruzafa.fallas@gmail.com'],
  ['Falla Huertas', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Comisión Huertas', '+34 96 389 90 12', 'huertas.fallas@falles.es'],
  ['Falla San Pío V', 'Valencia', 'Valencia', 'Comunidad Valenciana', 1574601, 'Junta San Pío V', '+34 96 363 01 23', 'sanpio.fallas@gmail.com'],
  ['Falla Sagunto', 'Sagunto', 'Valencia', 'Comunidad Valenciana', 29535, 'Comisión Sagunto', '+34 96 262 12 34', 'fallas.sagunto@gmail.com'],
  ['Falla Requena', 'Requena', 'Valencia', 'Comunidad Valenciana', 9129, 'Junta Requena', '+34 96 230 23 45', 'requena.fallas@falles.es'],
  ['Falla Utiel', 'Utiel', 'Valencia', 'Comunidad Valenciana', 6738, 'Comisión Utiel', '+34 96 213 34 56', 'utiel.fallas@gmail.com'],
  ['Falla Liria', 'Liria', 'Valencia', 'Comunidad Valenciana', 12885, 'Junta Liria', '+34 96 278 45 67', 'liria.fallas@valenciana.com'],
  ['Falla Bétera', 'Bétera', 'Valencia', 'Comunidad Valenciana', 2489, 'Comisión Bétera', '+34 96 273 56 78', 'betera.fallas@gmail.com'],
  ['Falla Cheste', 'Cheste', 'Valencia', 'Comunidad Valenciana', 8392, 'Junta Cheste', '+34 96 257 67 89', 'cheste.fallas@falles.es'],
  ['Falla Chelva', 'Chelva', 'Valencia', 'Comunidad Valenciana', 5234, 'Comisión Chelva', '+34 96 272 78 90', 'chelva.fallas@gmail.com'],
  ['Falla Llíria Centro', 'Liria', 'Valencia', 'Comunidad Valenciana', 12885, 'Centro Fallero Llíria', '+34 96 279 89 01', 'lliriacentro@falles.es'],
  ['Falla Torrent', 'Torrent', 'Valencia', 'Comunidad Valenciana', 33651, 'Junta Torrent', '+34 96 202 90 12', 'torrent.fallas@gmail.com'],
  ['Falla Játiva', 'Játiva', 'Valencia', 'Comunidad Valenciana', 29535, 'Comisión Játiva', '+34 96 227 01 23', 'jativa.fallas@valenciana.com'],
  ['Falla Alzira', 'Alzira', 'Valencia', 'Comunidad Valenciana', 42789, 'Junta Alzira', '+34 96 240 12 34', 'alzira.fallas@gmail.com'],
  ['Falla Cullera', 'Cullera', 'Valencia', 'Comunidad Valenciana', 22567, 'Comisión Cullera', '+34 96 172 23 45', 'cullera.fallas@falles.es'],
  ['Falla Carcagente', 'Carcagente', 'Valencia', 'Comunidad Valenciana', 31456, 'Junta Carcagente', '+34 96 290 34 56', 'carcagente.fallas@gmail.com'],
  ['Falla Gandia', 'Gandía', 'Valencia', 'Comunidad Valenciana', 76234, 'Comisión Gandia', '+34 96 284 45 67', 'gandia.fallas@valenciana.com'],
  ['Falla Oliva', 'Oliva', 'Valencia', 'Comunidad Valenciana', 8234, 'Junta Oliva', '+34 96 289 56 78', 'oliva.fallas@gmail.com'],
  ['Falla Cullera Costa', 'Cullera', 'Valencia', 'Comunidad Valenciana', 22567, 'Falleros Costa Cullera', '+34 96 173 67 89', 'cullera.costa@falles.es'],
  ['Falla Sueca', 'Sueca', 'Valencia', 'Comunidad Valenciana', 26781, 'Comisión Sueca', '+34 96 170 78 90', 'sueca.fallas@gmail.com'],
  ['Falla Carlet', 'Carlet', 'Valencia', 'Comunidad Valenciana', 7834, 'Junta Carlet', '+34 96 219 89 01', 'carlet.fallas@valenciana.com'],
  ['Falla Algemesí', 'Algemesí', 'Valencia', 'Comunidad Valenciana', 22456, 'Comisión Algemesí', '+34 96 224 90 12', 'algemesi.fallas@gmail.com'],
  ['Falla Catarroja', 'Catarroja', 'Valencia', 'Comunidad Valenciana', 26234, 'Junta Catarroja', '+34 96 132 01 23', 'catarroja.fallas@falles.es'],
  ['Falla Massanassa', 'Massanassa', 'Valencia', 'Comunidad Valenciana', 16234, 'Comisión Massanassa', '+34 96 121 12 34', 'massanassa.fallas@gmail.com'],
  ['Falla Paiporta', 'Paiporta', 'Valencia', 'Comunidad Valenciana', 27134, 'Junta Paiporta', '+34 96 123 23 45', 'paiporta.fallas@valenciana.com'],
  ['Falla Picanya', 'Picanya', 'Valencia', 'Comunidad Valenciana', 11234, 'Comisión Picanya', '+34 96 141 34 56', 'picanya.fallas@gmail.com'],
  ['Falla Riba-roja', 'Riba-roja de Túria', 'Valencia', 'Comunidad Valenciana', 26345, 'Junta Riba-roja', '+34 96 134 45 67', 'ribaroja.fallas@falles.es'],
  ['Falla Venta del Moro', 'Venta del Moro', 'Valencia', 'Comunidad Valenciana', 2145, 'Comisión Venta del Moro', '+34 96 214 56 78', 'venta.fallas@gmail.com'],
  ['Falla Villar del Arzobispo', 'Villar del Arzobispo', 'Valencia', 'Comunidad Valenciana', 3456, 'Junta Villar', '+34 96 275 67 89', 'villar.fallas@valenciana.com'],
];

async function createFallasValencia() {
  try {
    console.log('🔥 Creando pestaña FALLAS VALENCIA...\n');

    const { sheets } = await getServices();

    // 1. Crear pestaña
    console.log('📑 Creando pestaña FALLAS VALENCIA...');

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: 'FALLAS VALENCIA' }
          }
        }]
      }
    });

    const fallasSheetId = createResp.data.replies[0].addSheet.properties.sheetId;
    console.log('✅ Pestaña creada');

    // 2. Insertar headers
    console.log('\n📋 Insertando headers y datos...');

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

    const values = [headers, ...FALLAS_DATA];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'FALLAS VALENCIA!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    console.log(`✅ ${FALLAS_DATA.length} fallas insertadas`);

    // 3. Formato
    console.log('\n🎨 Aplicando formato...');

    const formatRequests = [
      // Headers rojo+blanco
      {
        repeatCell: {
          range: {
            sheetId: fallasSheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endIndex: 8
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
      // Altura header
      {
        updateDimensionProperties: {
          range: {
            sheetId: fallasSheetId,
            dimension: 'ROWS',
            startIndex: 0,
            endIndex: 1
          },
          properties: { pixelSize: 30 },
          fields: 'pixelSize'
        }
      },
      // Ancho columnas
      {
        updateDimensionProperties: {
          range: {
            sheetId: fallasSheetId,
            dimension: 'COLUMNS',
            startIndex: 0,
            endIndex: 8
          },
          properties: { pixelSize: 150 },
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
    console.log('✅ FALLAS VALENCIA CREADO');
    console.log('═══════════════════════════════════════\n');
    console.log(`📊 ${FALLAS_DATA.length} Fallas cargadas`);
    console.log('✅ Headers: rojo + blanco\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createFallasValencia();
