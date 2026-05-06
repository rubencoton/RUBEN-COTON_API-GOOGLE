const { getServices } = require('../src/auth/oauth-manager');
const fs = require('fs');
const path = require('path');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Extraer arrays de empresas de los 3 scripts mediante require regex
function extraerArrays() {
  const allEmpresas = [];
  const archivos = ['create-empresas-ia.js', 'add-mas-empresas-ia.js', 'add-empresas-ia-lote2.js', 'add-empresas-ia-lote3.js', 'add-empresas-ia-lote4.js'];
  const variables = ['EMPRESAS', 'NUEVAS', 'LOTE2', 'LOTE3', 'LOTE4'];

  for (let i = 0; i < archivos.length; i++) {
    const file = path.join(__dirname, archivos[i]);
    const varName = variables[i];
    const code = fs.readFileSync(file, 'utf-8');

    // Buscar el array por nombre de variable
    const startMatch = code.match(new RegExp(`const ${varName} = \\[`));
    if (!startMatch) continue;
    const startIdx = startMatch.index + startMatch[0].length - 1;

    // Encontrar el cierre del array
    let depth = 0;
    let endIdx = startIdx;
    for (let j = startIdx; j < code.length; j++) {
      if (code[j] === '[') depth++;
      else if (code[j] === ']') {
        depth--;
        if (depth === 0) { endIdx = j + 1; break; }
      }
    }

    const arrCode = code.substring(startIdx, endIdx);
    try {
      const arr = eval(arrCode);
      console.log(`   ${archivos[i]} (${varName}): ${arr.length} empresas`);
      allEmpresas.push(...arr);
    } catch (e) {
      console.error(`   Error parseando ${archivos[i]}:`, e.message);
    }
  }

  return allEmpresas;
}

async function rebuild() {
  try {
    console.log('🔄 Reconstruyendo EMPRESAS IA desde cero...\n');

    console.log('📂 Extrayendo datos de los 3 scripts:');
    const todas = extraerArrays();
    console.log(`\n📊 TOTAL bruto: ${todas.length}`);

    // Filtrar las que tienen email válido (col 7)
    const conEmail = todas.filter(e => e[7] && e[7].includes('@'));
    console.log(`📊 Con email válido: ${conEmail.length}`);

    // Deduplicar agrupando por email (col 7)
    const grupos = new Map();
    for (const r of conEmail) {
      const email = (r[7] || '').toLowerCase().trim();
      if (!email) continue;

      if (!grupos.has(email)) {
        grupos.set(email, {
          email: email,
          empresas: new Set(),
          sectores: new Set(),
          ciudades: new Set(),
          comunidades: new Set(),
          roles: new Set(),
          tamanos: new Set(),
          telefono: r[6] || '',
          web: r[8] || '',
          notas: new Set()
        });
      }

      const g = grupos.get(email);
      if (r[0]) g.empresas.add(r[0]);
      if (r[1]) g.sectores.add(r[1]);
      if (r[2]) g.ciudades.add(r[2]);
      if (r[3]) g.comunidades.add(r[3]);
      if (r[4]) g.roles.add(r[4]);
      if (r[5]) g.tamanos.add(r[5]);
      if (r[9]) g.notas.add(r[9]);
    }

    console.log(`✅ Emails únicos: ${grupos.size}\n`);

    // Construir nueva data
    const headers = [
      'EMAIL CONTRATACIÓN',
      'EMPRESA(S)',
      'SECTOR',
      'CIUDAD',
      'COMUNIDAD AUTÓNOMA',
      'ROL/ÁREA IA DEMANDADA',
      'TAMAÑO',
      'TELÉFONO',
      'WEB',
      'DEPARTAMENTO IA / NOTAS'
    ];

    const filas = Array.from(grupos.values()).sort((a, b) => {
      const empA = Array.from(a.empresas)[0] || '';
      const empB = Array.from(b.empresas)[0] || '';
      return empA.localeCompare(empB);
    });

    const newData = [headers];
    for (const g of filas) {
      newData.push([
        g.email,
        Array.from(g.empresas).join(' | '),
        Array.from(g.sectores).join(' | '),
        Array.from(g.ciudades).join(' | '),
        Array.from(g.comunidades).join(' | '),
        Array.from(g.roles).join(' | '),
        Array.from(g.tamanos).join(' | '),
        g.telefono,
        g.web,
        Array.from(g.notas).join(' | ')
      ]);
    }

    const { sheets } = await getServices();

    // Borrar pestaña antigua
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'EMPRESAS IA');
    if (old) {
      console.log('🗑️  Eliminando pestaña antigua...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    // Crear pestaña nueva
    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'EMPRESAS IA' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: newData }
    });

    // Formato
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.4, green: 0.1, blue: 0.5 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE',
              wrapStrategy: 'WRAP'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: newData.length, startColumnIndex: 0, endColumnIndex: 10 },
          cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
          fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 280 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 250 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 2, endIndex: 7 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 7, endIndex: 10 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: newData.length, startColumnIndex: 0, endColumnIndex: 10 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('\n═══════════════════════════════════════');
    console.log('🎉 EMPRESAS IA RECONSTRUIDA');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Empresas brutas: ${todas.length}`);
    console.log(`📊 Con email: ${conEmail.length}`);
    console.log(`📊 Emails únicos: ${newData.length - 1}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

rebuild();
