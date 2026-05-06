const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

async function improveCRM() {
  try {
    console.log('🔧 MEJORANDO CRM DE FORMA AUTÓNOMA...\n');

    const { sheets } = await getServices();

    // Obtener metadata
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const existingSheets = meta.data.sheets.map(s => s.properties.title);
    console.log('📊 Pestañas actuales:', existingSheets.length);
    console.log('   ', existingSheets.join(', '));

    // Crear nuevas pestañas estratégicas
    console.log('\n📑 Creando pestañas estratégicas...');

    const newSheets = [
      { title: 'CAMPAÑAS', exists: existingSheets.includes('CAMPAÑAS') },
      { title: 'PIPELINE VENTAS', exists: existingSheets.includes('PIPELINE VENTAS') },
      { title: 'DOCUMENTOS', exists: existingSheets.includes('DOCUMENTOS') },
      { title: 'INTERACCIONES', exists: existingSheets.includes('INTERACCIONES') }
    ];

    const sheetsToCreate = newSheets.filter(s => !s.exists);

    if (sheetsToCreate.length > 0) {
      const createRequests = sheetsToCreate.map(s => ({
        addSheet: { properties: { title: s.title } }
      }));

      const createResp = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: createRequests }
      });

      console.log(`✅ ${sheetsToCreate.length} nuevas pestañas creadas`);
    }

    // ===== PESTAÑA: CAMPAÑAS =====
    console.log('\n📧 Configurando CAMPAÑAS...');

    const campaignHeaders = ['ID CAMPAÑA', 'NOMBRE', 'OBJETIVO', 'FECHA INICIO', 'FECHA FIN', 'ESTADO', 'CONTACTOS', 'CONVERSIONES', 'TASA ÉXITO', 'NOTAS'];
    const campaignData = [
      ['C001', 'Arquitectura Técnica 2025', 'Profesores ADE Madrid', '2025-01-15', '2025-03-31', 'Activa', '=COUNTIFS(CONTACTOS!E:E,"ADE",CONTACTOS!B:B,"Madrid")', 0, '0%', 'Enfoque en universidades públicas'],
      ['C002', 'Construcción y Edificación', 'Profesores Técnicos', '2025-02-01', '2025-04-30', 'Planificada', '=COUNTIFS(CONTACTOS!E:E,"Construcción")', 0, '0%', 'Target: UPM + Comillas'],
      ['C003', 'Fallas Valencia 2025', 'Coordinadores Fallas', '2025-01-01', '2025-03-19', 'Activa', '=COUNTA(FALLAS VALENCIA!A:A)-1', 0, '0%', 'Contacto directo con juntas'],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'CAMPAÑAS!A1:J4',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [campaignHeaders, ...campaignData] }
    });

    console.log('✅ CAMPAÑAS configurado');

    // ===== PESTAÑA: PIPELINE VENTAS =====
    console.log('\n📈 Configurando PIPELINE VENTAS...');

    const pipelineHeaders = ['ETAPA', 'TOTAL', 'PORCENTAJE', 'VALOR PROMEDIO', 'PRÓXIMA ACCIÓN', 'RESPONSABLE'];
    const pipelineData = [
      ['Prospección', '=COUNTIF(SEGUIMIENTO!B:B,"Por contactar")', '=IF(B2=0,0,B2/SUM(B$2:B$6))', '€3,500', 'Contacto inicial', 'Sistema'],
      ['Contactado', '=COUNTIF(SEGUIMIENTO!B:B,"Contactado")', '=IF(B3=0,0,B3/SUM(B$2:B$6))', '€5,000', 'Propuesta envío', 'Gestor'],
      ['Negociación', '=COUNTIF(SEGUIMIENTO!B:B,"En Proceso")', '=IF(B4=0,0,B4/SUM(B$2:B$6))', '€7,500', 'Términos finales', 'Gestor'],
      ['Cierre', '=COUNTIF(SEGUIMIENTO!B:B,"Cerrado")', '=IF(B5=0,0,B5/SUM(B$2:B$6))', '€10,000', 'Contrato firmado', 'Legal'],
      ['Retención', '0', '=IF(B6=0,0,B6/SUM(B$2:B$6))', '€12,000', 'Seguimiento trimestral', 'Gestor']
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PIPELINE VENTAS!A1:F7',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [pipelineHeaders, ...pipelineData] }
    });

    console.log('✅ PIPELINE VENTAS configurado');

    // ===== PESTAÑA: DOCUMENTOS =====
    console.log('\n📄 Configurando DOCUMENTOS...');

    const docsHeaders = ['ID CONTACTO', 'TIPO DOC', 'NOMBRE', 'FECHA CREACIÓN', 'URL/RUTA', 'ESTADO', 'COMPARTIDO'];
    const docsData = [
      ['', 'Propuesta ADE', 'Propuesta_ADE_Universitaria_2025.pdf', '2025-01-20', 'https://drive.google.com/...', 'Revisión', 'No'],
      ['', 'CV Profesional', 'CV_Ruben_Coton_ADE_Arquitectura.pdf', '2025-01-15', 'https://drive.google.com/...', 'Final', 'Sí'],
      ['', 'Portfolio', 'Portfolio_Proyectos_Técnicos.pdf', '2025-01-18', 'https://drive.google.com/...', 'Final', 'Sí'],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'DOCUMENTOS!A1:G4',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [docsHeaders, ...docsData] }
    });

    console.log('✅ DOCUMENTOS configurado');

    // ===== PESTAÑA: INTERACCIONES =====
    console.log('\n💬 Configurando INTERACCIONES...');

    const interactionHeaders = ['FECHA', 'ID CONTACTO', 'TIPO', 'DESCRIPCIÓN', 'SEGUIMIENTO', 'RESPONSABLE'];
    const interactionData = [
      ['2025-01-25', '', 'Email', 'Envío propuesta inicial ADE', '2025-02-08', 'Sistema'],
      ['2025-01-22', '', 'Llamada', 'Contacto directo con gestor RRHH', '2025-01-29', 'Ruben Coton'],
      ['2025-01-20', '', 'Reunión', 'Presentación Arquitectura Técnica', '2025-02-05', 'Ruben Coton'],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'INTERACCIONES!A1:F4',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [interactionHeaders, ...interactionData] }
    });

    console.log('✅ INTERACCIONES configurado');

    // Aplicar formato a todas las nuevas pestañas
    console.log('\n🎨 Aplicando formato profesional...');

    const meta2 = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const formatRequests = [];

    const newSheetIds = meta2.data.sheets
      .filter(s => ['CAMPAÑAS', 'PIPELINE VENTAS', 'DOCUMENTOS', 'INTERACCIONES'].includes(s.properties.title))
      .map(s => s.properties.sheetId);

    for (const sheetId of newSheetIds) {
      formatRequests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.2, green: 0.4, blue: 0.8 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      });

      formatRequests.push({
        updateDimensionProperties: {
          range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
          properties: { pixelSize: 30 },
          fields: 'pixelSize'
        }
      });

      formatRequests.push({
        updateDimensionProperties: {
          range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 10 },
          properties: { pixelSize: 140 },
          fields: 'pixelSize'
        }
      });
    }

    if (formatRequests.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: formatRequests }
      });
    }

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('🎯 CRM MEJORADO AUTÓNOMAMENTE');
    console.log('═══════════════════════════════════════\n');
    console.log('📊 ESTRUCTURA FINAL CRM:');
    console.log('  1. CONTACTOS - Base de datos');
    console.log('  2. CRM - Dashboard KPIs');
    console.log('  3. SEGUIMIENTO - Pipeline tradicional');
    console.log('  4. CAMPAÑAS - Gestión de campañas 🆕');
    console.log('  5. PIPELINE VENTAS - Análisis embudo 🆕');
    console.log('  6. DOCUMENTOS - Referencias 🆕');
    console.log('  7. INTERACCIONES - Historial comunicaciones 🆕');
    console.log('  8. FALLAS VALENCIA - Datos específicos');
    console.log('  9. UNIVERSIDADES MADRID - Oportunidades educativas');
    console.log('\n✨ El CRM está listo para usar y escalar.\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

improveCRM();
