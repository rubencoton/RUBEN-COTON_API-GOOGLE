const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Corregir caracteres especiales en emails
function corregirEmail(email) {
  if (!email || !email.trim()) return email;

  let corregido = email.toLowerCase().trim();

  // Reemplazar caracteres especiales
  const reemplazos = {
    'ñ': 'n', 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'ç': 'c', 'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
    'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u'
  };

  for (const [original, sustituto] of Object.entries(reemplazos)) {
    corregido = corregido.replace(new RegExp(original, 'g'), sustituto);
  }

  // Casos especiales: emails sin dominio completo
  if (corregido === 'carnaval.cadiz@es') {
    corregido = 'carnaval@aytocadiz.org';
  }

  return corregido;
}

async function corregir() {
  try {
    console.log('🔧 Corrigiendo emails con caracteres especiales...\n');

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

    let totalCorregidos = 0;

    for (const sheet of meta.data.sheets) {
      const titulo = sheet.properties.title;
      const sheetId = sheet.properties.sheetId;

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${titulo}'!A:Z`
      });

      const values = response.data.values || [];
      if (values.length <= 1) continue;

      const headers = values[0];
      const emailColIndex = headers.findIndex(h =>
        h && (h.toUpperCase().includes('CORREO') || h.toUpperCase().includes('EMAIL'))
      );

      if (emailColIndex === -1) continue;

      let corregidosSheet = 0;
      const updates = [];

      for (let i = 1; i < values.length; i++) {
        const original = values[i][emailColIndex] || '';
        const corregido = corregirEmail(original);

        if (corregido !== original.toLowerCase().trim() && corregido) {
          // Convertir índice de columna a letra (A=0, B=1, ...)
          const colLetter = String.fromCharCode(65 + emailColIndex);
          updates.push({
            range: `'${titulo}'!${colLetter}${i + 1}`,
            values: [[corregido]]
          });
          corregidosSheet++;
          totalCorregidos++;
        }
      }

      if (updates.length > 0) {
        await sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            data: updates,
            valueInputOption: 'RAW'
          }
        });
        console.log(`   📄 ${titulo}: ${corregidosSheet} corregidos`);
      }
    }

    console.log(`\n✅ Total corregidos: ${totalCorregidos}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

corregir();
