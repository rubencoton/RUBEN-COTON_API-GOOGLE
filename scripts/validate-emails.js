const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function validateEmails() {
  try {
    console.log('🔍 BÚSQUEDA PROFUNDA DE EMAILS...\n');

    const { sheets } = await getServices();

    // Obtener metadata de todas las hojas
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const allSheets = meta.data.sheets;

    let totalRecords = 0;
    let recordsWithEmail = 0;
    let recordsWithoutEmail = 0;
    const report = [];

    // Recorrer cada hoja
    for (const sheet of allSheets) {
      const sheetTitle = sheet.properties.title;
      const sheetId = sheet.properties.sheetId;

      // Obtener datos de la hoja
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${sheetTitle}'!A:Z`
      });

      const values = response.data.values || [];
      if (values.length <= 1) continue; // Solo cabecero

      const headers = values[0];
      const emailColIndex = headers.findIndex(h =>
        h && (h.includes('CORREO') || h.includes('EMAIL'))
      );

      if (emailColIndex === -1) continue; // Sin columna de email

      let sheetRecords = 0;
      let sheetWithEmail = 0;
      let emptyEmails = [];

      for (let row = 1; row < values.length; row++) {
        const email = values[row][emailColIndex] || '';

        sheetRecords++;
        totalRecords++;

        if (email.trim()) {
          sheetWithEmail++;
          recordsWithEmail++;
        } else {
          recordsWithoutEmail++;
          emptyEmails.push({
            row: row + 1,
            nombre: values[row][0] || 'SIN NOMBRE'
          });
        }
      }

      if (sheetRecords > 0) {
        report.push({
          sheet: sheetTitle,
          total: sheetRecords,
          conEmail: sheetWithEmail,
          sinEmail: emptyEmails.length,
          details: emptyEmails
        });
      }
    }

    // Mostrar reporte
    console.log('═══════════════════════════════════════');
    console.log('📊 REPORTE DE VALIDACIÓN');
    console.log('═══════════════════════════════════════\n');

    report.forEach(r => {
      console.log(`📄 ${r.sheet}`);
      console.log(`   Total: ${r.total}`);
      console.log(`   ✅ Con email: ${r.conEmail}`);
      if (r.sinEmail > 0) {
        console.log(`   ❌ SIN email: ${r.sinEmail}`);
        r.details.forEach(d => {
          console.log(`      • Fila ${d.row}: ${d.nombre}`);
        });
      }
      console.log();
    });

    console.log('═══════════════════════════════════════');
    console.log(`🎯 RESUMEN TOTAL`);
    console.log(`   Total registros: ${totalRecords}`);
    console.log(`   ✅ Con email: ${recordsWithEmail}`);
    console.log(`   ❌ Sin email: ${recordsWithoutEmail}`);

    if (recordsWithoutEmail === 0) {
      console.log('\n🚀 EXCELENTE: Todos los contactos tienen email\n');
    } else {
      console.log(`\n⚠️  FALTA ELIMINAR ${recordsWithoutEmail} contactos sin email\n`);
    }
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

validateEmails();
