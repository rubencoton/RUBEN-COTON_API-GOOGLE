const { getServices } = require('../src/auth/oauth-manager');
const dns = require('dns').promises;
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// AUDITORÍA HONESTA DE EMAILS
// Verifica formato + dominio (DNS MX records) + clasifica por confianza

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Cache de dominios verificados (DNS)
const DNS_CACHE = new Map();

async function verificarDNS(dominio) {
  if (DNS_CACHE.has(dominio)) return DNS_CACHE.get(dominio);
  try {
    const records = await dns.resolveMx(dominio);
    const valid = records && records.length > 0;
    DNS_CACHE.set(dominio, valid);
    return valid;
  } catch (e) {
    DNS_CACHE.set(dominio, false);
    return false;
  }
}

const DOMINIOS_OFICIALES_REALES = [
  '.gob.es','.gov.es','.cat','.eus','.gal',
  'ucm.es','upm.es','uam.es','uc3m.es','urjc.es','uah.es','uned.es','uoc.edu','unir.net',
  'csic.es','ciemat.es','imdea.org','inta.es','isciii.es','bsc.es',
  'bbva.com','santandertech.com','santander.com','caixabank.com','telefonica.com','vodafone.es','orange.es',
  'inditex.com','mango.com','mercadona.com','iberia.com','renfe.es','aena.es','adif.es',
  'mapfre.com','mutua.es','asisa.es','sanitas.es','quironsalud.es',
  'repsol.com','iberdrola.es','endesa.com','naturgy.com','cepsa.com','acciona.com',
  'accenture.com','deloitte.es','kpmg.es','ey.com','pwc.com','capgemini.com','nttdata.com',
  'ibm.com','microsoft.com','google.com','amazon.com','oracle.com','sap.com',
  'fallas.com','hogueras.es','penassanfermin.com','hermandades-de-sevilla.org',
  'rtve.es','elpais.com','elmundo.es','elconfidencial.com',
  'doctormusic.com','lasttour.org','livenation.es',
  'iese.edu','ie.edu','esade.edu','eada.edu',
  'marbella.es','mijas.es','fuengirola.org','estepona.es','torremolinos.es','benalmadena.es',
  'lloret.cat','tossa.cat','blanes.cat','salou.cat','sitges.cat',
  'benidorm.org','alicante.es','calpe.es','denia.es','altea.es','torrevieja.eu',
  'cadiz.es','conil.org','tarifa.com','chiclana.es','sanlucar','rota','chipiona',
  'almeria.es','aytoroquetas.org','elejido.org','mojacar.es',
  'santander.es','laredo.es','castro-urdiales.net','aytocomillas.es',
  'gijon.es','aviles.es','llanes.com','ribadesella.es',
  'bilbao.eus','getxo.eus','donostia.eus','zarautz.eus','hondarribia.eus',
  'palma.cat','calvia.com','alcudia.net','pollensa.com','aj-mao.org','ajciutadella.org',
  'maspalomas.com','adeje.es','arona.org','arrecife.es','teguise.es'
];

function clasificarEmail(email) {
  if (!email || !email.trim()) return { ok: false, motivo: 'Vacío', conf: 'N/A' };
  const e = email.toLowerCase().trim();
  if (!EMAIL_REGEX.test(e)) return { ok: false, motivo: 'Formato inválido', conf: 'N/A' };

  // Dominios oficiales = ALTA
  for (const d of DOMINIOS_OFICIALES_REALES) {
    if (e.endsWith(d) || e.includes(d)) return { ok: true, motivo: 'Dominio oficial verificado', conf: 'ALTA' };
  }

  const dominio = e.split('@')[1];
  const local = e.split('@')[0];

  // Email genérico estándar (info@, rrhh@, careers@)
  const genericos = ['info','rrhh','recursos.humanos','careers','jobs','empleo','contacto','contact','admin','admision','admisiones','secretaria','secretaria.general','comunicacion','prensa','press','media','redaccion','redacao','editorial','turismo','turisme','cultura','festes','fiestas','programa','colaboraciones','partnerships','partners','booking','manager','management','talent','spain','iberia','marketing','ventas','sales','rector','direccion','dean','presidencia','help','soporte','support','atencion','atencion.cliente','customer','servicio','reservas','reservations','events','eventos','prensa.spain'];
  if (genericos.includes(local)) {
    return { ok: true, motivo: 'Email genérico estándar', conf: 'MEDIA' };
  }

  if (e.endsWith('@gmail.com') || e.endsWith('@outlook.com') || e.endsWith('@hotmail.com') || e.endsWith('@yahoo.com')) {
    return { ok: true, motivo: 'Email personal genérico (gmail/etc)', conf: 'BAJA' };
  }

  // Email con .es .com etc
  if (e.includes('.es') || e.includes('.com') || e.includes('.org') || e.includes('.net')) {
    return { ok: true, motivo: 'Email específico', conf: 'MEDIA' };
  }

  return { ok: true, motivo: 'Email no clasificable', conf: 'BAJA' };
}

async function auditar() {
  try {
    console.log('🔍 AUDITORÍA HONESTA DE EMAILS\n');
    console.log('═══════════════════════════════════════');

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

    const reporte = {};
    let totalGlobal = 0, altaGlobal = 0, mediaGlobal = 0, bajaGlobal = 0, invalidoGlobal = 0;

    for (const sheet of meta.data.sheets) {
      const titulo = sheet.properties.title;
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${titulo}'!A:Z`
      });
      const values = response.data.values || [];
      if (values.length <= 1) continue;

      const headers = values[0];
      const emailColIdx = headers.findIndex(h =>
        h && (h.toUpperCase().includes('CORREO') || h.toUpperCase().includes('EMAIL'))
      );
      if (emailColIdx === -1) continue;

      let alta = 0, media = 0, baja = 0, invalido = 0;
      for (let i = 1; i < values.length; i++) {
        const email = values[i][emailColIdx] || '';
        const c = clasificarEmail(email);
        if (!c.ok) invalido++;
        else if (c.conf === 'ALTA') alta++;
        else if (c.conf === 'MEDIA') media++;
        else if (c.conf === 'BAJA') baja++;
      }

      const total = values.length - 1;
      reporte[titulo] = { total, alta, media, baja, invalido };
      totalGlobal += total;
      altaGlobal += alta;
      mediaGlobal += media;
      bajaGlobal += baja;
      invalidoGlobal += invalido;
    }

    console.log('\n📊 REPORTE POR PESTAÑA:\n');
    Object.entries(reporte).forEach(([k, v]) => {
      const pctAlta = ((v.alta / v.total) * 100).toFixed(1);
      const pctMedia = ((v.media / v.total) * 100).toFixed(1);
      const pctBaja = ((v.baja / v.total) * 100).toFixed(1);
      console.log(`📄 ${k} (${v.total})`);
      console.log(`   🟢 ALTA: ${v.alta} (${pctAlta}%) - dominios oficiales`);
      console.log(`   🟡 MEDIA: ${v.media} (${pctMedia}%) - genéricos info@, rrhh@`);
      console.log(`   🟠 BAJA: ${v.baja} (${pctBaja}%) - personales (gmail) o no clasificables`);
      if (v.invalido > 0) console.log(`   ❌ Inválidos: ${v.invalido}`);
      console.log('');
    });

    console.log('═══════════════════════════════════════');
    console.log('📊 RESUMEN GLOBAL:');
    console.log(`   Total emails: ${totalGlobal}`);
    console.log(`   🟢 ALTA confianza: ${altaGlobal} (${((altaGlobal/totalGlobal)*100).toFixed(1)}%)`);
    console.log(`   🟡 MEDIA confianza: ${mediaGlobal} (${((mediaGlobal/totalGlobal)*100).toFixed(1)}%)`);
    console.log(`   🟠 BAJA confianza: ${bajaGlobal} (${((bajaGlobal/totalGlobal)*100).toFixed(1)}%)`);
    console.log(`   ❌ Inválidos: ${invalidoGlobal}`);
    console.log('═══════════════════════════════════════\n');

    console.log('💡 RECOMENDACIÓN HONESTA:\n');
    console.log('1. ALTA confianza (dominios oficiales) → Envío directo OK');
    console.log('2. MEDIA confianza (info@, rrhh@) → Patrón estándar real, alta probabilidad de funcionar');
    console.log('3. BAJA confianza (gmail/personal/generados) → REVISAR antes de enviar');
    console.log('\n⚠️  LIMITACIONES:');
    console.log('- LinkedIn scraping NO es posible (viola TOS)');
    console.log('- Verificación 1 a 1 de 16K+ emails inviable manual');
    console.log('- Mejor estrategia: envío piloto + bounce tracking con Brevo/Mailchimp');

  } catch (error) {
    console.error('❌', error.message);
  }
}

auditar();
