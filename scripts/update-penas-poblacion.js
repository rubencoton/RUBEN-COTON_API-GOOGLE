const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Mapa población municipios españoles (datos INE 2024)
const POBLACION = {
  'Alcañiz': 16265, 'Jaca': 13286, 'Zaragoza': 681877, 'Tafalla': 11650, 'Sangüesa': 5046,
  'Barcelona': 1664182, 'Vilanova i la Geltrú': 67779, 'Tarragona': 138527, 'Girona': 103369,
  'Valencia': 825948, 'Alcoy': 58853, 'Benidorm': 71034, 'Castellón': 171728,
  'Madrid': 3332035, 'Alcalá de Henares': 196888,
  'Almonte': 23913, 'Sevilla': 681998, 'Córdoba': 320175, 'Granada': 227383,
  'Jaén': 110381, 'Málaga': 591637, 'Almería': 200578, 'Cádiz': 110851,
  'Valladolid': 297775, 'Salamanca': 138522, 'Burgos': 175821, 'Segovia': 51683,
  'Ávila': 57949, 'Palencia': 77177, 'Soria': 39821, 'León': 122051, 'Zamora': 60391,
  'Toledo': 85811, 'Albacete': 173329, 'Ciudad Real': 75104, 'Cuenca': 53939, 'Guadalajara': 89807,
  'Cáceres': 96126, 'Badajoz': 150984, 'Mérida': 60328,
  'Murcia': 462979, 'Cartagena': 213943, 'Lorca': 95515,
  'Palma': 419366, 'Ibiza': 50643, 'Maó': 30255, 'Mahón': 30255,
  'Las Palmas': 381847, 'Santa Cruz de Tenerife': 209634, 'Santa Cruz': 209634,
  'Santa Cruz La Palma': 16235, 'Santa Cruz de La Palma': 16235,
  'Arrecife': 67577, 'Valverde': 4925, 'Puerto del Rosario': 41587,
  'Santiago de Compostela': 97849, 'A Coruña': 250646, 'Vigo': 296649, 'Ourense': 105505, 'Lugo': 97995, 'Pontevedra': 83260,
  'Bilbao': 345110, 'San Sebastián': 187415, 'Donostia': 187415, 'Donostia-San Sebastián': 187415,
  'Vitoria': 253996, 'Vitoria-Gasteiz': 253996,
  'Logroño': 151960, 'Calahorra': 23690,
  'Oviedo': 218001, 'Gijón': 269634, 'Avilés': 76594,
  'Santander': 173375, 'Torrelavega': 51635, 'Castro Urdiales': 33049
};

async function updatePenasPoblacion() {
  try {
    console.log('🔄 Actualizando PEÑAS con POBLACIÓN MUNICIPIO...\n');

    const { sheets } = await getServices();

    // Obtener datos actuales
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A:H"
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No hay datos en PEÑAS Y ASOCIACIONES');
    }

    console.log(`📋 ${values.length - 1} registros encontrados\n`);

    // Construir nueva estructura: agregar POBLACIÓN antes de TIPO FIESTA
    // Antes: NOMBRE | MUNICIPIO | PROVINCIA | CCAA | TIPO FIESTA | CONTACTO | TELÉFONO | EMAIL (8 cols)
    // Después: NOMBRE | MUNICIPIO | PROVINCIA | CCAA | POBLACIÓN | CONTACTO | TELÉFONO | EMAIL (8 cols)
    // Reemplazo TIPO FIESTA por POBLACIÓN

    const newHeaders = [
      'NOMBRE ENTIDAD', 'MUNICIPIO', 'PROVINCIA', 'COMUNIDAD AUTÓNOMA',
      'POBLACIÓN MUNICIPIO', 'NOMBRE CONTACTO', 'TELÉFONO', 'CORREO ELECTRÓNICO'
    ];

    const newData = [newHeaders];
    let conPoblacion = 0;
    let sinPoblacion = 0;

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const municipio = row[1] || '';
      const poblacion = POBLACION[municipio];

      if (poblacion) {
        conPoblacion++;
      } else {
        sinPoblacion++;
        console.log(`⚠️  Sin población: ${municipio}`);
      }

      newData.push([
        row[0] || '',                          // NOMBRE
        row[1] || '',                          // MUNICIPIO
        row[2] || '',                          // PROVINCIA
        row[3] || '',                          // CCAA
        poblacion || 'NO ENCONTRADO',          // POBLACIÓN (nueva, reemplaza TIPO FIESTA)
        row[5] || '',                          // CONTACTO
        row[6] || '',                          // TELÉFONO
        row[7] || ''                           // EMAIL
      ]);
    }

    // Limpiar y reescribir
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A:H"
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A1",
      valueInputOption: 'RAW',
      resource: { values: newData }
    });

    console.log('\n═══════════════════════════════════════');
    console.log('✅ ACTUALIZACIÓN COMPLETA');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total registros: ${newData.length - 1}`);
    console.log(`✅ Con población: ${conPoblacion}`);
    console.log(`⚠️  Sin población: ${sinPoblacion}`);
    console.log('\n📋 Nueva estructura:');
    console.log('   NOMBRE | MUNICIPIO | PROVINCIA | CCAA | POBLACIÓN | CONTACTO | TELÉFONO | EMAIL\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePenasPoblacion();
