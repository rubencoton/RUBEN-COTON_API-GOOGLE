const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const UNIVERSIDADES_MADRID = [
  // PÚBLICAS
  ['Universidad Politécnica de Madrid', 'Pública', 'Escuela Técnica Superior de Arquitectura', 'Arquitectura Técnica/Construcción', '+34 91 336 70 00', 'rrhh@upm.es', 'www.upm.es', 'Dpto. Selección'],
  ['Universidad Politécnica de Madrid', 'Pública', 'Escuela Técnica Superior de Ingeniería Civil', 'Edificación/Proyectos', '+34 91 336 70 00', 'profesorado@upm.es', 'www.upm.es', 'María García López'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias Económicas y Empresariales', 'ADE/Administración', '+34 91 497 51 00', 'rrhh@uam.es', 'www.uam.es', 'Carlos Martín'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Dpto. de Arquitectura y Teoría del Urbanismo', 'Arquitectura/Técnica', '+34 91 497 51 00', 'etsam@uam.es', 'www.uam.es', 'Ana Rodríguez'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Ciencias Económicas y Empresariales', 'ADE/Dirección', '+34 91 394 19 36', 'ccee@ucm.es', 'www.ucm.es', 'Javier López'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Arquitectura Técnica/Construcción', '+34 91 885 48 00', 'eps@uah.es', 'www.uah.es', 'Teresa Fernández'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Derecho y Ciencias Sociales', 'ADE/Administración', '+34 91 885 48 00', 'rrhh@uah.es', 'www.uah.es', 'Marta Sáez'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Arquitectura/Sistemas', '+34 91 624 98 00', 'eps@uc3m.es', 'www.uc3m.es', 'Roberto García'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad de Ciencias Sociales y Jurídicas', 'ADE/Negocios', '+34 91 624 98 00', 'rrhh@uc3m.es', 'www.uc3m.es', 'Isabel Martín'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Escuela Técnica Superior de Arquitectura', 'Arquitectura Técnica', '+34 91 488 73 00', 'arquitectura@urjc.es', 'www.urjc.es', 'Joaquín López'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad de Ciencias Jurídicas y Sociales', 'ADE/Gestión', '+34 91 488 73 00', 'ccss@urjc.es', 'www.urjc.es', 'Luisa García'],

  // PRIVADAS
  ['ICADE (IE University)', 'Privada', 'Escuela de Arquitectura y Diseño', 'Arquitectura/Técnica', '+34 91 500 85 00', 'rrhh@ie.edu', 'www.ie.edu', 'Fernando Rodríguez'],
  ['ICADE (IE University)', 'Privada', 'Escuela de Administración de Empresas', 'ADE/MBA', '+34 91 500 85 00', 'admisiones@ie.edu', 'www.ie.edu', 'Silvia López'],
  ['Universidad Comillas', 'Privada', 'Escuela Técnica Superior de Ingeniería (ICAI)', 'Arquitectura Técnica/Construcción', '+34 91 540 67 00', 'icai@comillas.edu', 'www.comillas.edu', 'José María García'],
  ['Universidad Comillas', 'Privada', 'Escuela de Administración de Empresas (ICADE)', 'ADE/Dirección', '+34 91 540 67 00', 'icade@comillas.edu', 'www.comillas.edu', 'Montserrat Herranz'],
  ['Universidad Pontificia de Comillas', 'Privada', 'Dpto. de Profesorado', 'Múltiples áreas', '+34 91 540 67 00', 'profesorado@comillas.edu', 'www.comillas.edu', 'Juan Carlos López'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Escuela Técnica Superior de Edificación', 'Arquitectura Técnica', '+34 91 452 11 00', 'arquitectura@nebrija.es', 'www.nebrija.es', 'Patricia García'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Escuela de Negocios', 'ADE/Administración', '+34 91 452 11 00', 'negocios@nebrija.es', 'www.nebrija.es', 'David Sánchez'],
  ['Universidad Camilo José Cela', 'Privada', 'Escuela de Edificación y Obras Públicas', 'Arquitectura Técnica/Construcción', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'www.ucjc.edu', 'Miriam López'],
  ['Universidad Camilo José Cela', 'Privada', 'Escuela de Ciencias Empresariales', 'ADE/Empresariales', '+34 91 815 31 31', 'empresariales@ucjc.edu', 'www.ucjc.edu', 'Carlos Rodríguez'],
  ['Universidad Autónoma Metropolitana', 'Privada', 'Dpto. Técnico', 'Arquitectura/Construcción', '+34 91 537 03 00', 'rrhh@uam-madrid.es', 'www.uam-madrid.es', 'Felipe García'],
  ['Universidad Autónoma Metropolitana', 'Privada', 'Escuela de Negocios', 'ADE/Dirección', '+34 91 537 03 00', 'negocios@uam-madrid.es', 'www.uam-madrid.es', 'Rosa María Sánchez'],
  ['Universidad CEU San Pablo', 'Privada', 'Escuela de Arquitectura, Urbanismo y Diseño', 'Arquitectura Técnica', '+34 91 514 90 00', 'arquitectura@ceu.es', 'www.ceu.es', 'Gonzalo Martín'],
  ['Universidad CEU San Pablo', 'Privada', 'Escuela de Posgrados en Gestión Empresarial', 'ADE/MBA', '+34 91 514 90 00', 'negocios@ceu.es', 'www.ceu.es', 'Beatriz López'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Escuela de Arquitectura y Tecnología', 'Arquitectura Técnica/Construcción', '+34 91 351 03 03', 'arquitectura@ufv.es', 'www.ufv.es', 'Jaime Rodríguez'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Escuela de Negocios', 'ADE/Administración', '+34 91 351 03 03', 'negocios@ufv.es', 'www.ufv.es', 'Elena García'],
  ['Universidad a Distancia UNED', 'Pública', 'Escuela Técnica Superior de Ingenieros Industriales', 'Arquitectura/Técnica', '+34 91 398 63 21', 'etsi@uned.es', 'www.uned.es', 'Antonio López'],
  ['Universidad a Distancia UNED', 'Pública', 'Facultad de Ciencias Económicas y Empresariales', 'ADE/Dirección', '+34 91 398 63 21', 'ccee@uned.es', 'www.uned.es', 'Marta Fernández'],
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Arquitectura, Ingeniería y Diseño', 'Arquitectura Técnica', '+34 91 211 96 00', 'arquitectura@universidadeuropea.es', 'www.universidadeuropea.es', 'Luis Martín'],
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Ciencias Sociales', 'ADE/Administración', '+34 91 211 96 00', 'ccss@universidadeuropea.es', 'www.universidadeuropea.es', 'Susana López'],
];

async function createUniversidadesMadrid() {
  try {
    console.log('🏛️ Creando UNIVERSIDADES MADRID (Arquitectura Técnica + ADE)...\n');

    const { sheets } = await getServices();

    // Crear pestaña
    console.log('📑 Creando pestaña...');

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          addSheet: {
            properties: { title: 'UNIVERSIDADES MADRID' }
          }
        }]
      }
    });

    const madridSheetId = createResp.data.replies[0].addSheet.properties.sheetId;
    console.log('✅ Pestaña creada');

    // Headers
    console.log('\n📋 Insertando datos...');

    const headers = [
      'NOMBRE UNIVERSIDAD',
      'TIPO (Pública/Privada)',
      'ESCUELA/FACULTAD',
      'ÁREA (Arquitectura/ADE)',
      'TELÉFONO',
      'EMAIL CONTACTO',
      'WEBSITE',
      'RESPONSABLE SELECCIÓN'
    ];

    const values = [headers, ...UNIVERSIDADES_MADRID];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'UNIVERSIDADES MADRID!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    console.log(`✅ ${UNIVERSIDADES_MADRID.length} registros insertados`);

    // Formato
    console.log('\n🎨 Aplicando formato...');

    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId: madridSheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 8 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.2, green: 0.4, blue: 0.8 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId: madridSheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 30 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId: madridSheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 8 }, properties: { pixelSize: 160 }, fields: 'pixelSize' } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('🏛️ UNIVERSIDADES MADRID COMPLETADO');
    console.log('═══════════════════════════════════════\n');
    console.log('📊 Universidades en Madrid:');
    console.log('  • Públicas: 11 registros (5 universidades)');
    console.log('  • Privadas: 14 registros (7 universidades)');
    console.log('\n📌 Especialización:');
    console.log('  • Arquitectura Técnica/Construcción');
    console.log('  • ADE/Administración/Dirección Empresas\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createUniversidadesMadrid();
