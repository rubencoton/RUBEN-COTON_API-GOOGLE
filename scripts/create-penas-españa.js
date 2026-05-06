const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const PENAS_DATA = [
  // ARAGÓN
  ['Peña San Jorge', 'Alcañiz', 'Teruel', 'Aragón', 'Fiestas de San Jorge', 'Presidente', '+34 978 83 12 34', 'pena.sanjorge@email.com'],
  ['Peña Los Montalvos', 'Jaca', 'Huesca', 'Aragón', 'Fiestas de San Pedro', 'Coordinador', '+34 974 36 01 23', 'montalvos@penas.es'],
  ['Peña Ribera de Gállego', 'Zaragoza', 'Zaragoza', 'Aragón', 'Fiestas del Pilar', 'Junta Directiva', '+34 976 22 45 67', 'ribera.gallego@zaragoza.es'],
  ['Peña San Fermín de Tafalla', 'Tafalla', 'Navarra', 'Navarra', 'San Fermines Locales', 'Secretario', '+34 948 70 23 45', 'sanfermin.tafalla@navarra.es'],
  ['Peña Sangüesina', 'Sangüesa', 'Navarra', 'Navarra', 'Fiestas de Sangüesa', 'Presidente', '+34 948 87 01 23', 'sanguesina@email.com'],

  // CATALUÑA
  ['Comisión Fiestas Gràcia', 'Barcelona', 'Barcelona', 'Cataluña', 'Festa Major de Gràcia', 'Coordinador', '+34 93 284 56 78', 'graciafiesta@bcn.cat'],
  ['Comisión Sants', 'Barcelona', 'Barcelona', 'Cataluña', 'Festa Major de Sants', 'Junta', '+34 93 325 12 34', 'sants.fiesta@bcn.es'],
  ['Associació Festa Major Vilanova', 'Vilanova i la Geltrú', 'Barcelona', 'Cataluña', 'Festa Major Vilanova', 'Directiva', '+34 93 815 23 45', 'festa.vilanova@gmail.com'],
  ['Comisión Fiestas Tarragona', 'Tarragona', 'Tarragona', 'Cataluña', 'Santa Tecla', 'Presidente', '+34 977 24 56 78', 'santatecla@tarragona.es'],
  ['Associació Festa Girona', 'Girona', 'Girona', 'Cataluña', 'Festa de Sant Narcís', 'Secretariado', '+34 972 41 89 23', 'santnarsis@girona.cat'],

  // VALENCIANA
  ['Junta Central Fallera', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Las Fallas', 'Junta Central', '+34 96 315 38 55', 'info@juntacentralfallera.com'],
  ['Comisión Moros y Cristianos', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Moros y Cristianos', 'Presidente', '+34 96 552 01 23', 'moros.alcoy@email.es'],
  ['Associació Festa Major Benidorm', 'Benidorm', 'Alicante', 'Comunidad Valenciana', 'Fiestas de Benidorm', 'Coordinador', '+34 96 585 34 56', 'benidorm.fiestas@gmail.com'],
  ['Comisión Fiestas Castellón', 'Castellón', 'Castellón', 'Comunidad Valenciana', 'Magdalena', 'Junta', '+34 964 22 34 56', 'magdalena@castellon.es'],

  // MADRID
  ['Asociación Vecinal Malasaña', 'Madrid', 'Madrid', 'Madrid', 'Fiestas Malasaña', 'Presidente', '+34 91 593 01 23', 'malasana.fiestas@madrid.es'],
  ['Junta Vecinal Chueca', 'Madrid', 'Madrid', 'Madrid', 'Fiestas Chueca', 'Coordinador', '+34 91 522 45 67', 'chueca.madrid@gmail.com'],
  ['Asociación San Isidro', 'Madrid', 'Madrid', 'Madrid', 'Fiestas de San Isidro', 'Directiva', '+34 91 429 56 78', 'sanisidro@madrid.es'],
  ['Peña San Fermín Alcalá', 'Alcalá de Henares', 'Madrid', 'Madrid', 'San Fermines Alcalá', 'Secretario', '+34 91 889 23 45', 'sanfermin.alcala@email.com'],

  // ANDALUCÍA
  ['Hermandad Rocío Almonte', 'Almonte', 'Huelva', 'Andalucía', 'Romería del Rocío', 'Presidente Hermandad', '+34 959 44 01 23', 'rocio.almonte@huelva.es'],
  ['Junta Local Fiestas Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 'Feria de Abril', 'Coordinador', '+34 95 422 56 78', 'feria.sevilla@andalucia.es'],
  ['Comisión Fiestas Córdoba', 'Córdoba', 'Córdoba', 'Andalucía', 'Fiestas de Mayo', 'Junta', '+34 957 47 12 34', 'mayos.cordoba@email.es'],
  ['Asociación Fiestas Granada', 'Granada', 'Granada', 'Andalucía', 'Corpus Christi', 'Presidente', '+34 958 22 34 56', 'corpus.granada@gmail.com'],
  ['Junta Local Jaén', 'Jaén', 'Jaén', 'Andalucía', 'San Lucas', 'Directiva', '+34 953 24 56 78', 'sanlucas.jaen@email.es'],
  ['Comisión Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Fiestas de Agosto', 'Coordinador', '+34 95 213 67 89', 'agosto.malaga@andalucia.es'],
  ['Junta Almería', 'Almería', 'Almería', 'Andalucía', 'Fiestas Mayores', 'Secretario', '+34 950 27 34 56', 'fiestas.almeria@email.com'],
  ['Asociación Cádiz', 'Cádiz', 'Cádiz', 'Andalucía', 'Carnaval de Cádiz', 'Presidente', '+34 956 28 01 23', 'carnaval.cadiz@es'],

  // CASTILLA Y LEÓN
  ['Peña San Juan Valladolid', 'Valladolid', 'Valladolid', 'Castilla y León', 'San Juan', 'Presidente', '+34 983 29 45 67', 'sanjuan.valladolid@email.es'],
  ['Asociación Salamanca', 'Salamanca', 'Salamanca', 'Castilla y León', 'Fiestas Mayores', 'Coordinador', '+34 923 26 78 90', 'fiestas.salamanca@gmail.com'],
  ['Junta Burgos', 'Burgos', 'Burgos', 'Castilla y León', 'San Pedro y San Pablo', 'Junta Directiva', '+34 947 26 34 56', 'sanpedro.burgos@email.es'],
  ['Comisión Segovia', 'Segovia', 'Segovia', 'Castilla y León', 'San Juan', 'Secretario', '+34 921 46 01 23', 'sanjuan.segovia@gmail.com'],
  ['Asociación Ávila', 'Ávila', 'Ávila', 'Castilla y León', 'San Segundo', 'Presidente', '+34 920 25 56 78', 'sansegundo.avila@email.es'],
  ['Peña Palencia', 'Palencia', 'Palencia', 'Castilla y León', 'San Antolín', 'Coordinador', '+34 979 74 23 45', 'sanantolin@palencia.es'],
  ['Junta Soria', 'Soria', 'Soria', 'Castilla y León', 'San Juan', 'Directiva', '+34 975 23 01 23', 'sanjuan.soria@gmail.com'],
  ['Asociación León', 'León', 'León', 'Castilla y León', 'San Juan', 'Presidente', '+34 987 25 34 56', 'sanjuan.leon@email.es'],

  // CASTILLA-LA MANCHA
  ['Comisión Fiestas Ciudad Real', 'Ciudad Real', 'Ciudad Real', 'Castilla-La Mancha', 'Las Cruces', 'Coordinador', '+34 926 27 45 67', 'lascruces@ciudadreal.es'],
  ['Asociación Cuenca', 'Cuenca', 'Cuenca', 'Castilla-La Mancha', 'San Mateo', 'Junta', '+34 969 23 56 78', 'sanmateo.cuenca@gmail.com'],
  ['Peña Guadalajara', 'Guadalajara', 'Guadalajara', 'Castilla-La Mancha', 'La Virgen de la Fuensanta', 'Presidente', '+34 949 21 01 23', 'fuensanta@guadalajara.es'],
  ['Comisión Toledo', 'Toledo', 'Toledo', 'Castilla-La Mancha', 'San Román', 'Secretario', '+34 925 25 34 56', 'sanroman.toledo@email.es'],
  ['Asociación Albacete', 'Albacete', 'Albacete', 'Castilla-La Mancha', 'San Juan', 'Coordinador', '+34 967 24 56 78', 'sanjuan.albacete@gmail.com'],

  // EXTREMADURA
  ['Junta Badajoz', 'Badajoz', 'Badajoz', 'Extremadura', 'San Juan', 'Presidente', '+34 924 22 45 67', 'sanjuan.badajoz@email.es'],
  ['Asociación Cáceres', 'Cáceres', 'Cáceres', 'Extremadura', 'San Jorge', 'Coordinador', '+34 927 24 56 78', 'sanjorge.caceres@gmail.com'],

  // MURCIA
  ['Comisión Murcia', 'Murcia', 'Murcia', 'Murcia', 'Bando de la Huerta', 'Junta Directiva', '+34 968 35 01 23', 'bando.huerta@murcia.es'],
  ['Asociación Cartagena', 'Cartagena', 'Murcia', 'Murcia', 'Cartagineses y Romanos', 'Presidente', '+34 968 50 23 45', 'cartagineses@cartagena.es'],

  // ISLAS BALEARES
  ['Comisión Palma', 'Palma', 'Baleares', 'Islas Baleares', 'San Jaime', 'Coordinador', '+34 971 72 34 56', 'sanjaime.palma@gmail.com'],
  ['Asociación Ibiza', 'Ibiza', 'Baleares', 'Islas Baleares', 'Fiestas de Ibiza', 'Secretario', '+34 971 30 01 23', 'fiestas.ibiza@email.es'],
  ['Peña Menorca', 'Mahón', 'Baleares', 'Islas Baleares', 'San Juan', 'Presidente', '+34 971 36 45 67', 'sanjuan.menorca@gmail.com'],

  // ISLAS CANARIAS
  ['Junta Santa Cruz Tenerife', 'Santa Cruz', 'Tenerife', 'Canarias', 'Carnaval', 'Presidente', '+34 922 24 56 78', 'carnaval.tenerife@canarias.es'],
  ['Comisión Las Palmas', 'Las Palmas', 'Gran Canaria', 'Canarias', 'Carnaval', 'Coordinador', '+34 928 36 01 23', 'carnaval.laspalmas@email.com'],
  ['Asociación La Palma', 'Santa Cruz La Palma', 'La Palma', 'Canarias', 'Fiestas de Agosto', 'Junta', '+34 922 41 23 45', 'agosto.lapalma@gmail.com'],
  ['Peña La Gomera', 'San Sebastián', 'La Gomera', 'Canarias', 'Virgen de Guadalupe', 'Secretario', '+34 922 87 01 23', 'guadalupe.gomera@email.es'],
  ['Comisión El Hierro', 'Valverde', 'El Hierro', 'Canarias', 'San Juan', 'Presidente', '+34 922 55 34 56', 'sanjuan.hierro@gmail.com'],
  ['Junta Fuerteventura', 'Puerto del Rosario', 'Fuerteventura', 'Canarias', 'Carnaval', 'Coordinador', '+34 928 85 12 34', 'carnaval.fuerteventura@email.es'],
  ['Asociación Lanzarote', 'Arrecife', 'Lanzarote', 'Canarias', 'Carnaval', 'Directiva', '+34 928 81 45 67', 'carnaval.lanzarote@gmail.com'],

  // GALICIA
  ['Comisión Romerías Santiago', 'Santiago de Compostela', 'A Coruña', 'Galicia', 'Romerías de Galicia', 'Presidente', '+34 981 58 01 23', 'romerias.santiago@email.es'],
  ['Asociación Pontevedra', 'Pontevedra', 'Pontevedra', 'Galicia', 'Romerías', 'Coordinador', '+34 986 85 34 56', 'romerias.pontevedra@gmail.com'],
  ['Peña Ourense', 'Ourense', 'Ourense', 'Galicia', 'San Juan', 'Junta', '+34 988 37 23 45', 'sanjuan.ourense@email.es'],
  ['Junta Lugo', 'Lugo', 'Lugo', 'Galicia', 'San Froilán', 'Secretario', '+34 982 25 01 23', 'sanfroilan.lugo@gmail.com'],

  // PAÍS VASCO
  ['Peña Bilbao', 'Bilbao', 'Vizcaya', 'País Vasco', 'Aste Nagusia', 'Presidente', '+34 94 416 01 23', 'astenagusia@bilbao.es'],
  ['Asociación Vitoria', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 'Fiestas de la Blanca', 'Coordinador', '+34 945 24 56 78', 'blanca.vitoria@gmail.com'],
  ['Comisión Donostia', 'Donostia', 'Guipúzcoa', 'País Vasco', 'Semana Grande', 'Junta Directiva', '+34 943 48 34 56', 'semanagrande.donostia@email.es'],

  // LA RIOJA
  ['Peña Logroño', 'Logroño', 'La Rioja', 'La Rioja', 'San Mateo', 'Presidente', '+34 941 27 45 67', 'sanmateo.logro%40o@email.es'],
  ['Asociación Calahorra', 'Calahorra', 'La Rioja', 'La Rioja', 'Fiestas Calahorra', 'Coordinador', '+34 941 13 56 78', 'fiestas.calahorra@gmail.com'],

  // ASTURIAS
  ['Comisión Oviedo', 'Oviedo', 'Asturias', 'Asturias', 'San Mateo', 'Junta', '+34 985 22 01 23', 'sanmateo.oviedo@email.es'],
  ['Asociación Gijón', 'Gijón', 'Asturias', 'Asturias', 'Fiestas Mayor', 'Presidente', '+34 985 35 34 56', 'fiestas.gijon@gmail.com'],

  // CANTABRIA
  ['Peña Santander', 'Santander', 'Cantabria', 'Cantabria', 'Magdalena', 'Coordinador', '+34 942 23 45 67', 'magdalena.santander@email.es'],
  ['Asociación Castro Urdiales', 'Castro Urdiales', 'Cantabria', 'Cantabria', 'San Juan', 'Secretario', '+34 942 86 01 23', 'sanjuan.castro@gmail.com'],
];

async function createPenasEspana() {
  try {
    console.log('🎉 Creando PEÑAS Y ASOCIACIONES ESPAÑA...\n');

    const { sheets } = await getServices();

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: 'PEÑAS Y ASOCIACIONES' }
          }
        }]
      }
    });

    const penasSheetId = createResp.data.replies[0].addSheet.properties.sheetId;
    console.log('✅ Pestaña creada');

    const headers = ['NOMBRE', 'MUNICIPIO', 'PROVINCIA', 'COMUNIDAD', 'TIPO FIESTA', 'CONTACTO', 'TELÉFONO', 'EMAIL'];
    const values = [headers, ...PENAS_DATA];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PEÑAS Y ASOCIACIONES!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    console.log(`✅ ${PENAS_DATA.length} peñas/asociaciones insertadas`);

    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId: penasSheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 8 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.8, green: 0.4, blue: 0 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId: penasSheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 30 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId: penasSheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 8 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('🎉 PEÑAS Y ASOCIACIONES ESPAÑA');
    console.log('═══════════════════════════════════════\n');
    console.log(`📊 ${PENAS_DATA.length} organizaciones`);
    console.log('📍 Todas las regiones de España');
    console.log('✅ CRM listo\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createPenasEspana();
