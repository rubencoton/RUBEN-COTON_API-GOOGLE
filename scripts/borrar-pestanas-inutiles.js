const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const PESTANAS_BORRAR = [
  'CRM', 'SEGUIMIENTO', 'CAMPAÑAS', 'PIPELINE VENTAS',
  'DOCUMENTOS', 'INTERACCIONES', 'CRM PRINCIPAL', 'CONTACTOS'
];

async function borrar() {
  try {
    console.log('🗑️  Borrando pestañas inútiles...\n');
    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

    const requests = [];
    for (const sheet of meta.data.sheets) {
      const titulo = sheet.properties.title;
      if (PESTANAS_BORRAR.some(p => titulo.toUpperCase() === p.toUpperCase())) {
        requests.push({ deleteSheet: { sheetId: sheet.properties.sheetId } });
        console.log(`   🗑️  ${titulo}`);
      }
    }

    if (requests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests }
      });
      console.log(`\n✅ ${requests.length} pestañas borradas\n`);
    } else {
      console.log('   ✅ Ya estaban borradas\n');
    }

    // Listar pestañas finales
    const meta2 = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    console.log('📋 Pestañas actuales:');
    meta2.data.sheets.forEach(s => {
      console.log(`   ✓ ${s.properties.title}`);
    });
    console.log();

  } catch (error) {
    console.error('❌', error.message);
  }
}

borrar();
