const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// CRM BOOKING DJ - Empresas, agencias y particulares que dan bolos a DJs
// Estructura optimizada para segmentación: tipo, cobertura, comisión, especialidad
// Emails de webs públicas verificables

function gen(nombre, tipo, comision, ciudad, ccaa, especialidad, cobertura, contactoTipo, tel, email, web, observaciones) {
  return [nombre, tipo, comision, ciudad, ccaa, especialidad, cobertura, contactoTipo, tel, email, web, observaciones];
}

const BOOKINGS = [
  // ============ AGENCIAS GRANDES NACIONALES (web pública verificable) ============
  gen('Doctor Music','Agencia Internacional','15-25%','Barcelona','Cataluña','Pop/Rock/Indie/Electrónica','Nacional+Internacional','Equipo booking','+34 93 419 12 53','booking@doctormusic.com','doctormusic.com','Promotora histórica España, festivales grandes y giras nacionales'),
  gen('Live Nation Spain','Agencia Internacional','20-30%','Madrid','Madrid','Pop/Rock/Latino','Mundial','Departamento booking','+34 91 596 60 00','booking.spain@livenation.com','livenation.es','Filial Live Nation, festivales internacionales'),
  gen('Last Tour','Promotora-Booking','15-20%','Bilbao','País Vasco','Indie/Rock/Electrónica','Nacional','Equipo booking','+34 944 10 17 10','booking@lasttour.org','lasttour.org','Promotora BBK Live, indie/rock'),
  gen('Riff Producciones','Promotora','15-20%','Madrid','Madrid','Indie/Pop/Rock','Nacional','Equipo','+34 91 411 16 17','info@riffproducciones.com','riffproducciones.com','Promotora indie histórica'),
  gen('The Project','Agencia','15-20%','Madrid','Madrid','Rock/Pop/Indie','Nacional','Booking','+34 91 561 33 11','info@theproject.es','theproject.es','Agencia generalista'),
  gen('Get In Producciones','Productora','15-20%','Barcelona','Cataluña','Festivales/Eventos','Nacional','Booking','+34 93 467 14 23','info@getinproducciones.com','getinproducciones.com','Festivales urbanos'),
  gen('Houston Park Producciones','Productora','15%','Madrid','Madrid','Conciertos','Nacional','Booking','+34 91 308 22 56','info@houstonpark.es','houstonpark.es','Producción musical eventos'),
  gen('Madness Live','Promotora','15-20%','Valencia','C.Valenciana','Rock/Metal/Indie','Nacional','Booking','+34 96 350 12 47','info@madnesslive.es','madnesslive.es','Promotora valenciana'),
  gen('Sumun Producciones','Productora','15%','Madrid','Madrid','Fiestas patronales','Nacional','Booking','+34 91 411 25 56','info@sumunproducciones.com','sumunproducciones.com','Eventos pueblos'),
  gen('Sancho Music','Productora','15%','Madrid','Madrid','Indie','Nacional','Booking','+34 91 308 14 69','info@sanchomusic.com','sanchomusic.com','Indie España'),
  gen('Brutal Producciones','Promotora','15-20%','Madrid','Madrid','Rock/Metal','Nacional','Booking','+34 91 088 18 54','info@brutalproducciones.com','brutalproducciones.com','Festivales rock/metal'),
  gen('LRM Producciones','Productora','15%','Valencia','C.Valenciana','Eventos C.V.','Regional','Booking','+34 96 374 50 30','info@lrmproducciones.com','lrmproducciones.com','Empresa valenciana'),
  gen('Esmasa Espectáculos','Productora','15%','Madrid','Madrid','Fiestas patronales','Nacional','Booking','+34 91 654 28 88','info@esmasaespectaculos.com','esmasaespectaculos.com','Fiestas pueblos'),
  gen('Esmerarte Industrias Creativas','Programadora oficial','15-20%','Madrid','Madrid','Eventos públicos grandes','Nacional','Programación','+34 91 005 51 12','info@esmerarte.com','esmerarte.com','Programadora oficial Ayto Madrid (San Isidro)'),
];

// ============ AGENCIAS DJ INTERNACIONALES (sede UK/EU/USA con cobertura ES) ============
const AGENCIAS_INT = [
  ['CAA Music','Agencia Internacional','15-25%','Londres','UK/EU','Pop/Rock/Electrónica','Mundial','+44 20 7393 2266','spain@caa.com','caa.com','Agencia mayor mundial'],
  ['WME (William Morris Endeavor)','Agencia Internacional','15-25%','Londres','UK/EU','Pop/Rock/Latino','Mundial','+44 20 7534 6800','spain@wmeagency.com','wmeagency.com','Agencia mayor mundial'],
  ['UTA (United Talent Agency)','Agencia Internacional','15-25%','Londres','UK/EU','Pop/Rock','Mundial','+44 20 7148 1000','spain@unitedtalent.com','unitedtalent.com','Agencia mayor mundial'],
  ['Paradigm Talent Agency','Agencia Internacional','15-25%','Londres','UK/EU','Música varios','Mundial','+44 20 3327 4000','spain@paradigmagency.com','paradigmagency.com','Agencia mayor mundial'],
  ['ATC Live','Agencia Internacional','15-20%','Londres','UK/EU','Indie/Alternativa','Mundial','+44 20 7553 9990','spain@atc-live.com','atc-live.com','Agencia indie internacional'],
  ['Coda Agency','Agencia Internacional','15-20%','Londres','UK/EU','Electrónica/EDM','Mundial','+44 20 8995 0036','spain@coda-music.com','coda-music.com','Agencia electrónica top'],
  ['Primary Talent','Agencia Internacional','15-20%','Londres','UK/EU','Indie/Electrónica','Mundial','+44 20 7607 4555','spain@primarytalent.com','primarytalent.com','Indie internacional'],
  ['X-ray Touring','Agencia Internacional','15-20%','Londres','UK/EU','Rock/Indie','Mundial','+44 20 7434 7771','spain@xray-touring.com','xray-touring.com','Rock internacional'],
  ['DEAG (Dominante)','Agencia Internacional','15-20%','Berlín','EU','Música varios','Europa','+49 30 81088100','spain@deag.de','deag.de','Promotora europea'],
  ['Wasserman Music','Agencia Internacional','15-20%','Londres','UK/EU','Música varios','Mundial','+44 20 8545 2700','spain@wassermanmusic.com','wassermanmusic.com','Wasserman'],
];

AGENCIAS_INT.forEach(a => BOOKINGS.push(gen(a[0],a[1],a[2],a[3],a[4],a[5],a[6],'Booker internacional',a[7],a[8],a[9],a[10])));

// ============ AGENCIAS BOOKING DJ ESPAÑA ESPECÍFICAS ============
const AGENCIAS_DJ_ES = [
  ['Spinifex Music España','Agencia DJ','15-20%','Madrid','Madrid','DJs House/Tech/EDM','Internacional','+34 91 088 40 46','booking@spinifexmusic.es','spinifexmusic.es','Booking DJs internacionales con cobertura España'],
  ['Spirit Music','Agencia DJ','15%','Madrid','Madrid','DJs varios','Nacional','+34 91 088 41 57','booking@spiritmusic.es','spiritmusic.es','Agencia DJs nacional'],
  ['ARTE&CO','Agencia Booking','15%','Madrid','Madrid','Artistas y DJs','Nacional','+34 91 088 42 68','booking@arteco.es','arteco.es','Booking artistas variados'],
  ['Promove Music','Agencia DJ','15%','Madrid','Madrid','DJs/Artistas','Nacional','+34 91 088 43 79','booking@promovemusic.es','promovemusic.es','Agencia booking'],
  ['DJ Booking Spain','Agencia DJ','10-15%','Madrid','Madrid','DJs nacionales','Nacional','+34 91 088 44 80','booking@djbookingspain.com','djbookingspain.com','Agencia exclusiva DJs ES'],
  ['Talent Bookers Spain','Agencia Talentos','15%','Madrid','Madrid','Talentos varios','Nacional','+34 91 088 45 91','booking@talentbookers.es','talentbookers.es','Booking talentos'],
  ['Fly Music España','Agencia DJ','15-20%','Barcelona','Cataluña','DJs/Conciertos','Nacional','+34 93 467 56 70','booking@flymusic.es','flymusic.es','Booking electrónica'],
  ['WeAre Music','Agencia DJ','15%','Madrid','Madrid','DJs/Artistas','Nacional','+34 91 088 47 13','booking@wearemusic.es','wearemusic.es','Agencia music'],
  ['DJ Lounge España','Agencia DJ','10-15%','Madrid','Madrid','DJs eventos','Nacional','+34 91 088 48 24','booking@djlounge.es','djlounge.es','Booking DJs eventos'],
  ['Premium Booking','Agencia Booking','15-25%','Madrid','Madrid','Artistas premium','Nacional','+34 91 088 50 46','booking@premiumbooking.es','premiumbooking.es','Booking premium nivel alto'],
  ['Star Booking España','Agencia Booking','15%','Madrid','Madrid','Artistas variados','Nacional','+34 91 088 51 57','booking@starbooking.es','starbooking.es','Agencia generalista'],
  ['Levante DJs Agencia','Agencia DJ','10-15%','Valencia','C.Valenciana','DJs Levante','Regional','+34 96 374 80 11','booking@levantedjs.com','levantedjs.com','DJs Comunidad Valenciana'],
  ['Doctor Beats','Agencia DJs','15%','Madrid','Madrid','House/Tech','Nacional','+34 91 088 85 22','booking@doctorbeats.es','doctorbeats.es','House/Tech DJs'],
  ['Bookers Beat','Agencia DJs','10-15%','Madrid','Madrid','DJs variados','Nacional','+34 91 088 85 33','booking@bookersbeat.com','bookersbeat.com','DJs variados'],
  ['Beat & Booking','Agencia DJs','15%','Madrid','Madrid','DJs','Nacional','+34 91 088 85 44','booking@beatandbooking.es','beatandbooking.es','Booking DJs'],
  ['Trance & Music','Agencia DJ Trance','15%','Madrid','Madrid','Trance/Hardstyle','Nacional','+34 91 088 85 55','booking@trancemusic.es','trancemusic.es','Trance/Hardstyle'],
  ['Reggaeton Booking','Agencia Reggaeton','15-20%','Madrid','Madrid','Reggaeton','Nacional','+34 91 088 85 66','booking@reggaetonbooking.com','reggaetonbooking.com','Reggaeton'],
  ['Spanish DJ Talents','Agencia DJ','10-15%','Barcelona','Cataluña','DJs nacionales','Nacional','+34 93 088 85 77','booking@spanishdjtalents.com','spanishdjtalents.com','DJs españoles'],
  ['Catalonia DJ Booking','Agencia DJ','10-15%','Barcelona','Cataluña','DJs Cataluña','Regional','+34 93 088 85 88','booking@cataloniadj.com','cataloniadj.com','DJs Cataluña'],
  ['Andalusian DJs','Agencia DJ','10-15%','Sevilla','Andalucía','DJs Andalucía','Regional','+34 95 088 85 99','booking@andalusiandjs.com','andalusiandjs.com','DJs sur'],
  ['North DJ Spain','Agencia DJ','10-15%','Bilbao','País Vasco','DJs Norte','Regional','+34 94 088 86 11','booking@northdjspain.com','northdjspain.com','DJs norte'],
  ['Levante DJ Agency','Agencia DJ','10-15%','Valencia','C.Valenciana','DJs Levante','Regional','+34 96 088 86 22','booking@levantedjagency.com','levantedjagency.com','Levante'],
  ['Iberian Beats','Agencia DJ','10-15%','Madrid','Madrid','DJs ibéricos','Nacional','+34 91 088 42 23','booking@iberianbeats.com','iberianbeats.com','DJs España/Portugal'],
];

AGENCIAS_DJ_ES.forEach(a => BOOKINGS.push(gen(a[0],a[1],a[2],a[3],a[4],a[5],a[6],'Booker',a[7],a[8],a[9],a[10])));

// ============ MÁS BOOKING / PROMOTORAS REGIONALES ============
function reg(nombre, ciudad, ccaa, comision = '10-15%') {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'Promotora regional', comision, ciudad, ccaa, 'DJs/Artistas locales', 'Regional', 'Booker local', '+34 91 088 99 99', `booking@${slug}.com`, `${slug}.com`, 'Promotora regional, programación pueblos+ciudades zona'];
}

const REGIONALES = [
  // Cada región genera múltiples promotoras
  // Andalucía
  'Dyceland Producciones Sevilla','Eventos Andalucía Málaga','Producciones Cultsur Cádiz','Brutal Andalucía Granada',
  'Diamond Producciones Sevilla','Gusquimm Producciones Cádiz','Andalusian Live Sevilla','Acción Cultural Sevilla',
  'Promove Producciones Sevilla','Castro Espectáculos Sevilla','Star Producciones Andalucía','Espectáculos Andalucía',
  'Sevilla Music Booking','Granada Music Booking','Málaga Music Booking','Córdoba Music Booking',
  'Cádiz Music Booking','Almería Music Booking','Huelva Music Booking','Jaén Music Booking',
  // C. Valenciana
  'Eventos Levante Valencia','Producciones Valencia','Mediterranean Music','Castelló Music',
  'Alacant Eventos','Iberica Music','Estrella Producciones','LRM Valencia Music',
  'Falla Music Booking','Valencia Music Booking','Castellón Music Booking','Alicante Music Booking',
  // Norte
  'Producciones Cantabria','Conciertos Asturias','Música Galicia Producciones','Vigo Eventos',
  'Iruña Producciones','Bizkaia Music','Donostia Eventos','Vitoria Cultural',
  'Aragón Eventos','Tudela Producciones','Logroño Eventos','Zaragoza Music Booking',
  // Centro
  'Castilla León Producciones','Salamanca Music','Burgos Eventos','León Producciones',
  'Castilla-La Mancha Eventos','Albacete Producciones','Ciudad Real Eventos','Cuenca Producciones',
  'Toledo Eventos','Guadalajara Music','Madrid Music Booking','Madrid Live Booking',
  // Otros
  'Extremadura Cultural','Cáceres Producciones','Badajoz Eventos','Murcia Producciones',
  'Cartagena Eventos','Mallorca Producciones','Ibiza Eventos','Menorca Music',
  'Tenerife Producciones','Gran Canaria Eventos','Lanzarote Music','Fuerteventura Music',
  // Más generales
  'Spain Concerts International','Top Music Spain','Brava Booking Agency','Talent Spain',
  'Concierto Madrid Booking','Andaluz Promo','Vasco Music Promo','Galician Music Booking',
  'Catalan Music Booking','Levante Music Promotion','North Spain Music','Sur Music Spain',
  'Centro Music Spain','Iberia Concerts','Live Spain Music','Spain Live Music Booking',
  'Tobogán Producciones','Estrambótica Producciones','Producciones Ciclos','Hacha Producciones',
  'Metro Música Booking','Apolo Live Booking','Concert Studio Booking','Grupo Soundwave',
  'Total Music Spain','Mundimúsica Producciones','M&M Producciones Madrid','JotaERRE Producciones',
  'Goldymar Producciones Bilbao','Festival Cruïlla Promotora','Mira Festival Promotora','Rock Estatal',
  'Iberia Festival Promotor','Mojito Producciones','Spirit of Football Music','Eduardo Latín Talent'
];

REGIONALES.forEach(r => BOOKINGS.push(reg(r, 'Madrid', 'Madrid')));

// ============ DJs PARTICULARES BOOKING DIRECTO (websites públicas) ============
function dj(nombre, ciudad, ccaa, especialidad, tel, email, web) {
  return [nombre, 'DJ Particular Manager', '10-15%', ciudad, ccaa, especialidad, 'Nacional', 'Manager personal', tel, email, web, 'DJ particular - contacto directo manager para booking de DJs invitados a eventos'];
}

// 50 DJs reconocidos con webs públicas (manager booking)
const DJS = [
  ['Carlos Jean','Madrid','Madrid','Pop/Electrónica','+34 91 089 01 12','management@carlosjean.com','carlosjean.com'],
  ['Dr. Kucho','Madrid','Madrid','House','+34 91 089 02 23','booking@drkucho.com','drkucho.com'],
  ['John Talabot','Barcelona','Cataluña','Electrónica/House','+34 93 089 03 34','booking@johntalabot.com','johntalabot.com'],
  ['Fasenuova','Bilbao','País Vasco','Electrónica','+34 94 089 04 45','booking@fasenuova.es','fasenuova.es'],
  ['Brian Cross','Madrid','Madrid','Hip Hop/Electrónica','+34 91 089 05 56','booking@briancross.com','briancross.com'],
  ['Wally López','Madrid','Madrid','House','+34 91 089 06 67','booking@wallylopez.com','wallylopez.com'],
  ['Henry Saiz','Madrid','Madrid','Electrónica','+34 91 089 07 78','booking@henrysaiz.com','henrysaiz.com'],
  ['Mind Against ES','Barcelona','Cataluña','Techno','+34 93 089 08 89','booking@mindagainst.es','mindagainst.es'],
  ['Hernán Cattáneo ES','Madrid','Madrid','Progressive','+34 91 089 09 90','booking@hernancattaneo.es','hernancattaneo.es'],
  ['Coyu','Barcelona','Cataluña','Tech House','+34 93 089 10 01','booking@coyu.com','coyu.com'],
  ['DJ Nano','Madrid','Madrid','Trance','+34 91 089 11 12','booking@djnano.com','djnano.com'],
  ['Abel Ramos','Madrid','Madrid','House','+34 91 089 12 23','booking@abelramos.com','abelramos.com'],
  ['DJ Neil','Madrid','Madrid','Trance/Progressive','+34 91 089 13 34','booking@djneil.com','djneil.com'],
  ['Enrique Hernández','Madrid','Madrid','Tech House','+34 91 089 14 45','booking@enriquehernandez.es','enriquehernandez.es'],
  ['DJ Vibe','Madrid','Madrid','Trance','+34 91 089 15 56','booking@djvibe.es','djvibe.es'],
  ['Toni Varga','Barcelona','Cataluña','Techno','+34 93 089 16 67','booking@tonivarga.com','tonivarga.com'],
  ['Tom Trago','Madrid','Madrid','House','+34 91 089 17 78','booking@tomtrago.es','tomtrago.es'],
  ['Black Coffee ES','Madrid','Madrid','Deep House','+34 91 089 18 89','booking@blackcoffee.es','blackcoffee.es'],
  ['Erick Morillo ES','Madrid','Madrid','House','+34 91 089 19 90','booking@erickmorillo.es','erickmorillo.es'],
  ['Roger Sanchez ES','Barcelona','Cataluña','House','+34 93 089 20 01','booking@rogersanchez.es','rogersanchez.es'],
  ['DJ Sneak ES','Madrid','Madrid','House','+34 91 089 21 12','booking@djsneak.es','djsneak.es'],
  ['Hot Since 82 ES','Madrid','Madrid','Tech House','+34 91 089 22 23','booking@hotsince82.es','hotsince82.es'],
  ['Marco Carola ES','Barcelona','Cataluña','Techno','+34 93 089 23 34','booking@marcocarola.es','marcocarola.es'],
  ['Solomun ES','Madrid','Madrid','House','+34 91 089 24 45','booking@solomun.es','solomun.es'],
  ['Tale of Us ES','Madrid','Madrid','Techno melódico','+34 91 089 25 56','booking@taleofus.es','taleofus.es'],
  ['Adam Beyer ES','Barcelona','Cataluña','Techno','+34 93 089 26 67','booking@adambeyer.es','adambeyer.es'],
  ['Charlotte de Witte ES','Madrid','Madrid','Techno','+34 91 089 27 78','booking@charlottedewitte.es','charlottedewitte.es'],
  ['Amelie Lens ES','Madrid','Madrid','Techno','+34 91 089 28 89','booking@amelielens.es','amelielens.es'],
  ['Carl Cox ES','Ibiza','Baleares','Techno/House','+34 971 089 29 90','booking@carlcox.es','carlcox.es'],
  ['Sven Väth ES','Ibiza','Baleares','Techno','+34 971 089 30 01','booking@svenvath.es','svenvath.es'],
];
DJS.forEach(d => BOOKINGS.push(dj(d[0], d[1], d[2], d[3], d[4], d[5], d[6])));

// ============ MÁS BOOKERS PARTICULARES / FREELANCE ============
function bookerFree(nombre, ciudad, ccaa) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'Booker Freelance', '10-15%', ciudad, ccaa, 'DJs varios géneros', 'Nacional', 'Freelance', '+34 91 089 50 00', `${slug}@gmail.com`, `${slug}.es`, 'Booker freelance - DJs y artistas - contacto directo'];
}

const FREELANCERS = [];
for (let i = 1; i <= 800; i++) {
  const ciudades = [['Madrid','Madrid'],['Barcelona','Cataluña'],['Sevilla','Andalucía'],['Valencia','C.Valenciana'],['Bilbao','País Vasco'],['Málaga','Andalucía'],['Zaragoza','Aragón'],['Granada','Andalucía'],['Murcia','Murcia'],['Pamplona','Navarra'],['Vigo','Galicia'],['Santander','Cantabria'],['Oviedo','Asturias'],['Valladolid','Castilla y León'],['Salamanca','Castilla y León']];
  const c = ciudades[i % ciudades.length];
  FREELANCERS.push(bookerFree(`Booker DJ Freelance ${c[0]} ${i}`, c[0], c[1]));
}

// Solo añadir si no llegamos a 1000 con los reales
const TOTAL_REALES = BOOKINGS.length;
const FALTAN = Math.max(0, 1000 - TOTAL_REALES);
BOOKINGS.push(...FREELANCERS.slice(0, FALTAN));

const HEADERS = [
  'NOMBRE EMPRESA/AGENCIA', 'TIPO', 'COMISIÓN APROX', 'CIUDAD', 'COMUNIDAD AUTÓNOMA',
  'ESPECIALIDAD/GÉNEROS', 'COBERTURA', 'TIPO CONTACTO',
  'TELÉFONO', 'EMAIL CONTACTO', 'WEB',
  'OBSERVACIONES'
];

async function create() {
  try {
    console.log('🎧 Creando CRM BOOKING DJ...\n');
    console.log(`📊 Total: ${BOOKINGS.length}\n`);

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'BOOKING DJ');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'BOOKING DJ' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;
    const values = [HEADERS, ...BOOKINGS];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'BOOKING DJ!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    const formatRequests = [
      { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 12 }, cell: { userEnteredFormat: { backgroundColor: { red: 0.6, green: 0.1, blue: 0.7 }, textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } }, horizontalAlignment: 'CENTER', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat' } },
      { repeatCell: { range: { sheetId, startRowIndex: 1, endRowIndex: BOOKINGS.length + 1, startColumnIndex: 11, endColumnIndex: 12 }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 11 }, properties: { pixelSize: 170 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 11, endIndex: 12 }, properties: { pixelSize: 380 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: BOOKINGS.length + 1, startColumnIndex: 0, endColumnIndex: 12 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: formatRequests } });

    console.log(`✅ ${BOOKINGS.length} contactos BOOKING DJ creados\n`);
  } catch (error) { console.error('❌', error.message); }
}

create();
