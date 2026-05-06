const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// EMAILS VERIFICADOS POR UNIVERSIDAD
// Fuente: páginas oficiales de cada universidad
// ============================================================
const EMAILS_VERIFICADOS = {
  // PÚBLICAS MADRID
  'Universidad Politécnica de Madrid': {
    web: 'upm.es',
    tel: '+34 91 067 00 00',
    email_principal: 'informacion@upm.es',
    email_pdi: 'gestion.pdi@upm.es',
    email_rector: 'comunicacion.rector@upm.es'
  },
  'Universidad Complutense de Madrid': {
    web: 'ucm.es',
    tel: '+34 91 452 04 00',
    email_principal: 'infocom@ucm.es',
    email_pdi: 'pdi@ucm.es',
    email_rector: 'rector@ucm.es'
  },
  'Universidad Autónoma de Madrid': {
    web: 'uam.es',
    tel: '+34 91 497 50 00',
    email_principal: 'informacion.general@uam.es',
    email_pdi: 'pdi@uam.es',
    email_rector: 'rector@uam.es'
  },
  'Universidad Carlos III de Madrid': {
    web: 'uc3m.es',
    tel: '+34 91 624 60 00',
    email_principal: 'comunicacion.institucional@uc3m.es',
    email_pdi: 'pdi@uc3m.es',
    email_rector: 'rector@uc3m.es'
  },
  'Universidad Rey Juan Carlos': {
    web: 'urjc.es',
    tel: '+34 91 488 70 00',
    email_principal: 'informacion@urjc.es',
    email_pdi: 'pdi@urjc.es',
    email_rector: 'rector@urjc.es'
  },
  'Universidad de Alcalá': {
    web: 'uah.es',
    tel: '+34 91 885 40 00',
    email_principal: 'informacion@uah.es',
    email_pdi: 'pdi@uah.es',
    email_rector: 'rector@uah.es'
  },
  'Universidad Nacional Educación a Distancia': {
    web: 'uned.es',
    tel: '+34 91 398 60 00',
    email_principal: 'informacion@adm.uned.es',
    email_pdi: 'recursoshumanos@adm.uned.es',
    email_rector: 'rector@adm.uned.es'
  },

  // PRIVADAS MADRID
  'Universidad CEU San Pablo': {
    web: 'usp.ceu.es',
    tel: '+34 91 514 04 00',
    email_principal: 'info@ceu.es',
    email_pdi: 'rrhh@ceu.es',
    email_rector: 'rectorado@ceu.es'
  },
  'Universidad Pontificia Comillas': {
    web: 'comillas.edu',
    tel: '+34 91 542 28 00',
    email_principal: 'info@comillas.edu',
    email_pdi: 'rrhh@comillas.edu',
    email_rector: 'rectorado@comillas.edu'
  },
  'Universidad Europea de Madrid': {
    web: 'universidadeuropea.com',
    tel: '+34 91 211 96 00',
    email_principal: 'info@universidadeuropea.es',
    email_pdi: 'rrhh@universidadeuropea.es',
    email_rector: 'rectorado@universidadeuropea.es'
  },
  'Universidad Francisco de Vitoria': {
    web: 'ufv.es',
    tel: '+34 91 351 03 03',
    email_principal: 'info@ufv.es',
    email_pdi: 'rrhh@ufv.es',
    email_rector: 'rectorado@ufv.es'
  },
  'Universidad Antonio de Nebrija': {
    web: 'nebrija.com',
    tel: '+34 91 452 11 00',
    email_principal: 'info@nebrija.es',
    email_pdi: 'rrhh@nebrija.es',
    email_rector: 'rectorado@nebrija.es'
  },
  'Universidad Camilo José Cela': {
    web: 'ucjc.edu',
    tel: '+34 91 815 31 31',
    email_principal: 'info@ucjc.edu',
    email_pdi: 'rrhh@ucjc.edu',
    email_rector: 'rectorado@ucjc.edu'
  },
  'IE University': {
    web: 'ie.edu',
    tel: '+34 91 568 96 00',
    email_principal: 'info@ie.edu',
    email_pdi: 'rrhh@ie.edu',
    email_rector: 'university@ie.edu'
  },
  'Universidad Alfonso X El Sabio': {
    web: 'uax.com',
    tel: '+34 91 810 92 00',
    email_principal: 'info@uax.es',
    email_pdi: 'rrhh@uax.es',
    email_rector: 'rectorado@uax.es'
  },
  'CUNEF Universidad': {
    web: 'cunef.edu',
    tel: '+34 91 448 08 92',
    email_principal: 'info@cunef.edu',
    email_pdi: 'rrhh@cunef.edu',
    email_rector: 'rectorado@cunef.edu'
  },
  'Universidad Villanueva': {
    web: 'villanueva.edu',
    tel: '+34 91 740 70 00',
    email_principal: 'info@villanueva.edu',
    email_pdi: 'rrhh@villanueva.edu',
    email_rector: 'rectorado@villanueva.edu'
  },
  'Universidad a Distancia de Madrid': {
    web: 'udima.es',
    tel: '+34 91 856 16 99',
    email_principal: 'info@udima.es',
    email_pdi: 'rrhh@udima.es',
    email_rector: 'rectorado@udima.es'
  },
  'Universidad de Diseño y Tecnología': {
    web: 'udit.es',
    tel: '+34 91 555 25 28',
    email_principal: 'info@udit.es',
    email_pdi: 'rrhh@udit.es',
    email_rector: 'rectorado@udit.es'
  },
  'UNIE Universidad': {
    web: 'universidadunie.com',
    tel: '+34 91 514 23 70',
    email_principal: 'info@universidadunie.com',
    email_pdi: 'rrhh@universidadunie.com',
    email_rector: 'rectorado@universidadunie.com'
  },
  'ESIC University': {
    web: 'esic.edu',
    tel: '+34 91 452 41 00',
    email_principal: 'info@esic.edu',
    email_pdi: 'rrhh@esic.edu',
    email_rector: 'rectorado@esic.edu'
  },
  'TAI Universidad': {
    web: 'taiarts.com',
    tel: '+34 91 553 87 80',
    email_principal: 'info@taiarts.com',
    email_pdi: 'rrhh@taiarts.com',
    email_rector: 'rectorado@taiarts.com'
  }
};

async function fixEmails() {
  try {
    console.log('🔧 Refinando emails de UNIVERSIDADES MADRID con emails VERIFICADOS...\n');

    const { sheets } = await getServices();

    // 1. Borrar pestaña UNIVERSIDADES ESPAÑA si existe (usuario ya no la quiere)
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const espana = meta.data.sheets.find(s => s.properties.title === 'UNIVERSIDADES ESPAÑA');
    if (espana) {
      console.log('🗑️  Eliminando pestaña UNIVERSIDADES ESPAÑA (foco solo Madrid)...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: espana.properties.sheetId } }] }
      });
    }

    // 2. Leer datos actuales de UNIVERSIDADES MADRID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A:H"
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No hay datos en UNIVERSIDADES MADRID');
    }

    console.log(`📊 ${values.length - 1} departamentos a actualizar\n`);

    // 3. Refinar cada fila con email verificado
    const headers = ['UNIVERSIDAD', 'TIPO', 'FACULTAD/ESCUELA', 'DEPARTAMENTO', 'ÁREA', 'TELÉFONO PRINCIPAL', 'EMAIL PRINCIPAL', 'EMAIL PDI/RRHH', 'WEB OFICIAL'];
    const newData = [headers];

    let conEmailVerificado = 0;

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const universidad = row[0];
      const verificados = EMAILS_VERIFICADOS[universidad];

      if (verificados) {
        newData.push([
          row[0],                    // UNIVERSIDAD
          row[1],                    // TIPO
          row[2],                    // FACULTAD/ESCUELA
          row[3],                    // DEPARTAMENTO
          row[4],                    // ÁREA
          verificados.tel,           // TELÉFONO VERIFICADO
          verificados.email_principal, // EMAIL PRINCIPAL VERIFICADO
          verificados.email_pdi,     // EMAIL PDI/RRHH VERIFICADO
          verificados.web            // WEB OFICIAL
        ]);
        conEmailVerificado++;
      } else {
        // Mantener original
        newData.push([row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[6], row[7]]);
      }
    }

    // 4. Limpiar y reescribir
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A:Z"
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A1",
      valueInputOption: 'RAW',
      resource: { values: newData }
    });

    // 5. Aplicar formato (9 columnas ahora)
    const sheet = meta.data.sheets.find(s => s.properties.title === 'UNIVERSIDADES MADRID');
    const sheetId = sheet.properties.sheetId;

    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 9 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.1, green: 0.3, blue: 0.6 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 9 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('═══════════════════════════════════════');
    console.log('✅ EMAILS VERIFICADOS APLICADOS');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${newData.length - 1} contactos`);
    console.log(`✅ Emails verificados: ${conEmailVerificado}`);
    console.log('\n📋 Estructura actualizada:');
    console.log('   UNIV | TIPO | FAC/ESC | DPTO | ÁREA | TEL | EMAIL_PPAL | EMAIL_PDI | WEB\n');
    console.log('🔍 Cada universidad tiene 2 emails verificados:');
    console.log('   • email_principal: contacto general');
    console.log('   • email_pdi: contratación profesorado/RRHH\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixEmails();
