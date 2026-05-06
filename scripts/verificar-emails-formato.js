const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Validación de formato de email (RFC 5322 simplificado)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Patrones sospechosos
const PATRONES_SOSPECHOSOS = [
  /info@info-/i,
  /test@/i,
  /ejemplo@/i,
  /example@/i,
  /noreply@/i
];

// Dominios verificados (alta probabilidad de ser reales)
const DOMINIOS_VERIFICADOS_OFICIALES = [
  '.gob.es', '.gov.es', '.cat', '.eus', '.gal',
  'ucm.es', 'upm.es', 'uam.es', 'uc3m.es', 'urjc.es', 'uah.es', 'uned.es',
  'csic.es', 'ciemat.es', 'imdea.org', 'inta.es', 'isciii.es',
  'bsc.es', 'iiia.csic.es', 'bbva.com', 'santander.com', 'caixabank.com',
  'telefonica.com', 'vodafone.es', 'orange.es', 'masmovil.com',
  'inditex.com', 'mango.com', 'mercadona.com', 'iberia.com', 'renfe.es',
  'mapfre.com', 'mutua.es', 'asisa.es', 'sanitas.es', 'quironsalud.es',
  'repsol.com', 'iberdrola.es', 'endesa.com', 'naturgy.com', 'cepsa.com',
  'accenture.com', 'deloitte.es', 'kpmg.es', 'ey.com', 'pwc.com',
  'capgemini.com', 'nttdata.com', 'atos.net', 'ibm.com', 'microsoft.com',
  'google.com', 'amazon.com', 'oracle.com', 'sap.com',
  'fallas.com', 'hogueras.es', 'penassanfermin.com', 'hermandades-de-sevilla.org',
  'bilbokokonpartsak.eus', 'carnavaldecadiz.com', 'rociodealmonte.es'
];

function clasificarEmail(email) {
  if (!email || !email.trim()) return { valido: false, motivo: 'Vacío' };

  const e = email.toLowerCase().trim();

  // Validar formato
  if (!EMAIL_REGEX.test(e)) {
    return { valido: false, motivo: 'Formato inválido' };
  }

  // Patrones sospechosos
  for (const patron of PATRONES_SOSPECHOSOS) {
    if (patron.test(e)) {
      return { valido: true, motivo: 'Sospechoso (review)', confianza: 'baja' };
    }
  }

  // Verificación de dominios oficiales conocidos
  for (const dominio of DOMINIOS_VERIFICADOS_OFICIALES) {
    if (e.endsWith(dominio) || e.includes(dominio)) {
      return { valido: true, motivo: 'Dominio oficial', confianza: 'alta' };
    }
  }

  // Email genérico (info@, rrhh@, etc.) - probablemente real
  const localPart = e.split('@')[0];
  const dominio = e.split('@')[1];

  if (['info', 'rrhh', 'cultura', 'admision', 'careers', 'jobs', 'comunicacion',
       'secretaria', 'admin', 'contacto', 'eventos', 'fiestas'].includes(localPart)) {
    return { valido: true, motivo: 'Email genérico estándar', confianza: 'media' };
  }

  // Email específico
  return { valido: true, motivo: 'Email específico', confianza: 'media' };
}

async function verificar() {
  try {
    console.log('🔍 VERIFICACIÓN DE FORMATO Y CALIDAD DE EMAILS...\n');

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

    const stats = {
      total: 0,
      valido_alta: 0,
      valido_media: 0,
      valido_baja: 0,
      invalido: 0,
      vacio: 0
    };

    const errores = [];

    for (const sheet of meta.data.sheets) {
      const titulo = sheet.properties.title;
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

      console.log(`\n📄 ${titulo}`);
      let sheetValid = 0, sheetInvalid = 0;

      for (let i = 1; i < values.length; i++) {
        const email = values[i][emailColIndex] || '';
        const clasif = clasificarEmail(email);

        stats.total++;
        if (!clasif.valido) {
          if (clasif.motivo === 'Vacío') stats.vacio++;
          else stats.invalido++;
          sheetInvalid++;
          if (errores.length < 20) {
            errores.push(`   ${titulo} fila ${i + 1}: ${email} - ${clasif.motivo}`);
          }
        } else {
          if (clasif.confianza === 'alta') stats.valido_alta++;
          else if (clasif.confianza === 'media') stats.valido_media++;
          else stats.valido_baja++;
          sheetValid++;
        }
      }

      console.log(`   ✅ Formato válido: ${sheetValid}`);
      console.log(`   ❌ Inválido: ${sheetInvalid}`);
    }

    console.log('\n═══════════════════════════════════════');
    console.log('📊 RESUMEN GLOBAL');
    console.log('═══════════════════════════════════════');
    console.log(`Total emails: ${stats.total}`);
    console.log(`✅ Confianza ALTA (dominios oficiales): ${stats.valido_alta}`);
    console.log(`🟢 Confianza MEDIA (genéricos/específicos): ${stats.valido_media}`);
    console.log(`🟡 Confianza BAJA (review): ${stats.valido_baja}`);
    console.log(`❌ Formato inválido: ${stats.invalido}`);
    console.log(`⚪ Vacíos: ${stats.vacio}`);

    if (errores.length > 0) {
      console.log('\n⚠️  ERRORES DETECTADOS (primeros 20):');
      errores.forEach(e => console.log(e));
    }

    console.log('\n💡 NOTA: La única forma 100% segura de verificar emails es:');
    console.log('   1. Enviar email y monitorizar bounces');
    console.log('   2. Usar servicio de verificación (Hunter, ZeroBounce, etc.)');
    console.log('   3. Validar SMTP MX records (aún no garantiza usuario)\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verificar();
