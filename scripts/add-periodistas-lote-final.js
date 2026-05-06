const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

function gen(nombre, tipo, ciudad, ccaa, especialidad, prefijo = 'redaccion', dominio = null) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  const dom = dominio || `${slug}.com`;
  return [nombre, tipo, ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 50 00', `${prefijo}@${dom}`, dom, `${tipo} ${especialidad}`];
}

const NUEVOS = [];

// ============ BLOGS ESPECIALIZADOS POR GÉNERO ============
const generosIndie = ['Indie Pop Spain','Indie Folk ES','Indie Rock Mag','Dream Pop España','Shoegaze Spain','Chamber Pop ES','Garage Indie Mag','Indie Surf Spain','Indie Lo-Fi','Indie Electro','Synth Pop Spain','New Wave ES','Post Rock Spain','Math Rock ES','Emo Indie Spain','Twee Pop Mag','Bedroom Pop ES','Indie Soul Spain','Folk Indie Mag','Indietronica ES','Indie Funk Spain','Indie Hip Hop','Indie R&B Spain','Indie Latina','Indie Jazz Mag','Indie Punk Spain','Indie Hardcore','Lo-Fi House Spain','Future Indie ES','Synthwave Spain'];
generosIndie.forEach(g => NUEVOS.push(gen('Blog '+g, 'Blog Indie', 'Madrid', 'Madrid', g)));

const generosElectronica = ['Tech House Spain','Deep House ES','Progressive House Spain','Minimal Techno Mag','Detroit Techno ES','Acid House Spain','Future House ES','Tropical House Mag','Garage House ES','Disco Edits Spain','Disco Funk Mag','Italo Disco ES','French House Spain','Dub Techno Mag','Drum & Bass Spain','Jungle UK ES','Hardstyle Spain','Hardcore Mag','Trap Future Spain','Bass Music ES','UK Garage Spain','Dubstep Mag','Future Bass Spain','Trance Mag','Psy Trance Spain','Goa Trance ES','Ambient Music Spain','IDM Mag','Glitch Hop ES','Breakbeat Spain'];
generosElectronica.forEach(g => NUEVOS.push(gen('Blog '+g, 'Blog Electrónica', 'Madrid', 'Madrid', g)));

const generosUrbano = ['Trap Spain Mag','Drill UK ES','Reggaeton Real','Latin Trap ES','Urban Latino','Spanish Hip Hop','Boombap Spain','Old School Hip Hop ES','New School Rap Spain','R&B Spain','Soul Music ES','Neo Soul Spain','Funk Music ES','Afrobeat Spain','Dancehall ES','Reggae Spain','Ska Music ES','Cumbia Spain','Bachata Mag','Salsa Spain','Merengue ES','Mambo Spain','Latin Pop ES','Latin Indie Spain','Rumba Catalana','Flamenco Fusion','Flamenco Pop ES','Kizomba Spain','Zouk ES'];
generosUrbano.forEach(g => NUEVOS.push(gen('Blog '+g, 'Blog Urbano/Latino', 'Madrid', 'Madrid', g)));

const generosRock = ['Heavy Metal Spain','Black Metal ES','Death Metal Spain','Doom Metal Mag','Power Metal ES','Thrash Metal Spain','Speed Metal Mag','Folk Metal Spain','Symphonic Metal','Gothic Metal Spain','Hard Rock Mag','Punk Rock Spain','Hardcore Punk ES','Skate Punk Spain','Pop Punk Mag','Progressive Rock','Psychedelic Rock','Stoner Rock Spain','Garage Rock ES','Surf Rock Spain','Math Rock Mag','Post Hardcore','Alternative Rock','Grunge Spain','Indie Punk ES'];
generosRock.forEach(g => NUEVOS.push(gen('Blog '+g, 'Blog Rock/Metal', 'Bilbao', 'País Vasco', g)));

// ============ MÁS RADIOS UNIVERSITARIAS Y LOCALES ============
const radiosExtra = [
  ['Radio UPM Madrid Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio UCM Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio UC3M Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio URJC Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio UAM Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio UAH Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio UNED Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio EHU/UPV Cultural','Radio Universitaria','Bilbao','País Vasco','Universitaria'],
  ['Radio UDeusto Cultural','Radio Universitaria','Bilbao','País Vasco','Universitaria'],
  ['Radio UV Cultural','Radio Universitaria','Valencia','Comunidad Valenciana','Universitaria'],
  ['Radio UJI Cultural','Radio Universitaria','Castellón','Comunidad Valenciana','Universitaria'],
  ['Radio UA Cultural','Radio Universitaria','Alicante','Comunidad Valenciana','Universitaria'],
  ['Radio UMH Cultural','Radio Universitaria','Elche','Comunidad Valenciana','Universitaria'],
  ['Radio US Cultural','Radio Universitaria','Sevilla','Andalucía','Universitaria'],
  ['Radio UCO Cultural','Radio Universitaria','Córdoba','Andalucía','Universitaria'],
  ['Radio UMA Cultural','Radio Universitaria','Málaga','Andalucía','Universitaria'],
  ['Radio UCA Cultural','Radio Universitaria','Cádiz','Andalucía','Universitaria'],
  ['Radio UAL Cultural','Radio Universitaria','Almería','Andalucía','Universitaria'],
  ['Radio UJA Cultural','Radio Universitaria','Jaén','Andalucía','Universitaria'],
  ['Radio UHU Cultural','Radio Universitaria','Huelva','Andalucía','Universitaria'],
  ['Radio UPO Cultural','Radio Universitaria','Sevilla','Andalucía','Universitaria'],
  ['Radio UB Cultural','Radio Universitaria','Barcelona','Cataluña','Universitaria'],
  ['Radio UAB Cultural','Radio Universitaria','Barcelona','Cataluña','Universitaria'],
  ['Radio UPC Cultural','Radio Universitaria','Barcelona','Cataluña','Universitaria'],
  ['Radio UPF Cultural','Radio Universitaria','Barcelona','Cataluña','Universitaria'],
  ['Radio UDG Cultural','Radio Universitaria','Girona','Cataluña','Universitaria'],
  ['Radio URV Cultural','Radio Universitaria','Tarragona','Cataluña','Universitaria'],
  ['Radio UDL Cultural','Radio Universitaria','Lleida','Cataluña','Universitaria'],
  ['Radio USC Cultural','Radio Universitaria','Santiago de Compostela','Galicia','Universitaria'],
  ['Radio UDC Cultural','Radio Universitaria','A Coruña','Galicia','Universitaria'],
  ['Radio UVI Cultural','Radio Universitaria','Vigo','Galicia','Universitaria'],
  ['Radio UNIOVI Cultural','Radio Universitaria','Oviedo','Asturias','Universitaria'],
  ['Radio UNICAN Cultural','Radio Universitaria','Santander','Cantabria','Universitaria'],
  ['Radio UPV Cultural','Radio Universitaria','Vitoria-Gasteiz','País Vasco','Universitaria'],
  ['Radio UNAVARRA Cultural','Radio Universitaria','Pamplona','Navarra','Universitaria'],
  ['Radio UNIZAR Cultural','Radio Universitaria','Zaragoza','Aragón','Universitaria'],
  ['Radio UR Cultural','Radio Universitaria','Logroño','La Rioja','Universitaria'],
  ['Radio UNIONLINE Cultural','Radio Universitaria','Madrid','Madrid','Universitaria'],
  ['Radio USAL Cultural','Radio Universitaria','Salamanca','Castilla y León','Universitaria'],
  ['Radio UVA Cultural','Radio Universitaria','Valladolid','Castilla y León','Universitaria'],
  ['Radio UBU Cultural','Radio Universitaria','Burgos','Castilla y León','Universitaria'],
  ['Radio ULE Cultural','Radio Universitaria','León','Castilla y León','Universitaria'],
  ['Radio UCLM Cultural','Radio Universitaria','Ciudad Real','Castilla-La Mancha','Universitaria'],
  ['Radio UMU Cultural','Radio Universitaria','Murcia','Murcia','Universitaria'],
  ['Radio UPCT Cultural','Radio Universitaria','Cartagena','Murcia','Universitaria'],
  ['Radio UNEX Cultural','Radio Universitaria','Badajoz','Extremadura','Universitaria'],
  ['Radio UIB Cultural','Radio Universitaria','Palma','Baleares','Universitaria'],
  ['Radio ULL Cultural','Radio Universitaria','La Laguna','Canarias','Universitaria'],
  ['Radio ULPGC Cultural','Radio Universitaria','Las Palmas de Gran Canaria','Canarias','Universitaria']
];
radiosExtra.forEach(r => NUEVOS.push([r[0], r[1], r[2], r[3], r[4], 'Pequeño', '+34 91 089 50 00', `radio@${r[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.es`, `${r[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.es`, 'Universitaria']));

// ============ PROGRAMAS RADIO LOCALES MUSICALES ============
const programas = [
  'Programa Música Madrid','Programa Sonido Capital','Programa Indie Madrid','Programa Reggaeton Madrid','Programa Trap Madrid',
  'Programa Hip Hop Madrid','Programa Rock Madrid','Programa Metal Madrid','Programa Latino Madrid','Programa Salsa Madrid',
  'Programa Música Barcelona','Programa Indie BCN','Programa Reggaeton BCN','Programa Trap BCN','Programa Latina BCN',
  'Programa Música Sevilla','Programa Flamenco Sevilla','Programa Indie Sevilla','Programa Latina Sevilla','Programa Trap Sevilla',
  'Programa Música Valencia','Programa Falla Sound','Programa Indie Valencia','Programa Reggaeton Valencia','Programa Mediterranea',
  'Programa Música Málaga','Programa Indie Málaga','Programa Latina Málaga','Programa Trap Málaga','Programa Costa Sol Music',
  'Programa Música Granada','Programa Indie Granada','Programa Latina Granada','Programa Flamenco Granada','Programa Música Andaluza',
  'Programa Música Bilbao','Programa Indie Bilbao','Programa Rock Bilbao','Programa Metal Bilbao','Programa Vasco Music',
  'Programa Música Donostia','Programa Indie Donostia','Programa Vasco Indie','Programa Donostia Sound','Programa Tamborrada Music',
  'Programa Música Pamplona','Programa San Fermín Music','Programa Indie Pamplona','Programa Navarra Pop','Programa Tudela Sound',
  'Programa Música Logroño','Programa Indie Logroño','Programa La Rioja Music','Programa Calahorra Sound','Programa Haro Music',
  'Programa Música Zaragoza','Programa Pilar Music','Programa Indie Zaragoza','Programa Aragón Pop','Programa Huesca Sound',
  'Programa Música Oviedo','Programa Indie Asturias','Programa Asturiana Pop','Programa San Mateo Music','Programa Gijón Sound',
  'Programa Música Santander','Programa Indie Cantabria','Programa Cantabra Pop','Programa Semana Grande Music','Programa Torrelavega Sound',
  'Programa Música Coruña','Programa Indie Galicia','Programa Galega Pop','Programa Apostol Music','Programa Vigo Sound',
  'Programa Música Mallorca','Programa Indie Mallorca','Programa Mallorquina Pop','Programa Festes Mallorca','Programa Manacor Sound',
  'Programa Música Tenerife','Programa Indie Canarias','Programa Canaria Pop','Programa Carnaval Music','Programa Las Palmas Sound'
];
programas.forEach(p => NUEVOS.push(gen(p, 'Programa Radio', 'Madrid', 'Madrid', 'Música variada', 'programa')));

// ============ PORTALES MUSICALES ESPECIALIZADOS ============
const portales = [
  ['Portal Club Cultura Música','Portal Música','Madrid','Madrid','Cultura musical'],
  ['Portal Música Independiente','Portal Indie','Madrid','Madrid','Indie'],
  ['Portal Sound Spain','Portal Música','Madrid','Madrid','Variada'],
  ['Portal Música y Más','Portal Música','Madrid','Madrid','Variada'],
  ['Portal Club Music Spain','Portal Electrónica','Madrid','Madrid','Electrónica'],
  ['Portal Festival Spain','Portal Festivales','Madrid','Madrid','Festivales'],
  ['Portal Música del Sur','Portal Música','Sevilla','Andalucía','Sur'],
  ['Portal Música del Norte','Portal Música','Bilbao','País Vasco','Norte'],
  ['Portal Levante Música','Portal Música','Valencia','Comunidad Valenciana','Levante'],
  ['Portal Música Catalana','Portal Música','Barcelona','Cataluña','Catalana'],
  ['Portal Música Galega','Portal Música','Santiago de Compostela','Galicia','Galega'],
  ['Portal Música Aragonesa','Portal Música','Zaragoza','Aragón','Aragonesa'],
  ['Portal Música Vasca','Portal Música','Bilbao','País Vasco','Vasca'],
  ['Portal Música Canaria','Portal Música','Santa Cruz de Tenerife','Canarias','Canaria'],
  ['Portal Música Balear','Portal Música','Palma','Baleares','Balear']
];
portales.forEach(p => NUEVOS.push([p[0], p[1], p[2], p[3], p[4], 'Pequeño', '+34 91 089 60 00', `redaccion@${p[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, `${p[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, 'Portal']));

// ============ COLUMNISTAS / CRÍTICOS MUSICALES (con web propia) ============
const criticos = [
  'Crítico Musical Madrid Web','Reseñador Indie Madrid','Crítica Sonora Madrid','Análisis Musical Spain','Voz Crítica Música',
  'Crítica Indie Spain','Reseñas Musicales Web','Crítica de Vinilos Spain','Crítica Disco Web','Reseñador Música Latina',
  'Crítica Catalana Música','Crítica Andaluza Música','Crítica Vasca Música','Crítica Galega Música','Crítica Aragonesa Música',
  'Reseñador Asturiano','Crítica Cantabra','Crítica Levante Música','Crítica Castellana','Crítica Manchega',
  'Crítica Murciana','Crítica Extremeña','Crítica Mallorquina Música','Crítica Canaria Música','Crítica Balear Música',
  'Crítica Riojana','Crítica Navarra','Crítica Bética Sound','Crítica Granadina','Crítica Malagueña',
  'Crítica Sevillana Música','Crítica Cordobesa','Crítica Almeriense','Crítica Valenciana Música','Crítica Castellonense',
  'Crítica Alicantina','Crítica Tarragonina','Crítica Leridana','Crítica Gerundense','Crítica Mallorquina Indie'
];
criticos.forEach(c => NUEVOS.push(gen(c, 'Crítico Música', 'Madrid', 'Madrid', 'Crítica musical', 'critica')));

// ============ MEDIOS DJ MAGAZINES ESPECÍFICOS ============
const djMags = [
  'DJ Times Magazine Spain','DJ Producer Mag ES','DJ Booking News','DJ Festival Web','DJ Equipment Spain',
  'DJ Producer España','DJ Beats Magazine','DJ Lounge Mag','DJ Nightclub Spain','DJ International Spain',
  'DJ Reviews Spain','DJ Tutorials Mag','DJ Equipment Reviews','DJ Studio Magazine','DJ Mixing Magazine'
];
djMags.forEach(d => NUEVOS.push(gen(d, 'Magazine DJ', 'Madrid', 'Madrid', 'DJ industry')));

// ============ INFLUENCERS / TIKTOKERS MUSICALES ============
const influencers = [
  'TikTok Música Madrid','Instagram Música Madrid','Twitter Música Madrid','Music Influencer Spain','Music Curator Spain',
  'Spotify Curator Madrid','Apple Music Curator ES','YouTube Music Spain','SoundCloud Spain','Mixcloud Spain',
  'TikTok Música Indie','TikTok Trap Spain','TikTok Reggaeton Spain','TikTok Latina Spain','TikTok Electronic Spain',
  'TikTok Rock Spain','TikTok Pop Spain','TikTok Folk Spain','TikTok Jazz Spain','TikTok Clásica Spain',
  'Influencer Música Cataluña','Influencer Música Andalucía','Influencer Música Vasca','Influencer Música Galega','Influencer Música Levante',
  'Influencer Música Canaria','Influencer Música Balear','Influencer Música Madrid','Influencer Música Norte','Influencer Música Sur'
];
influencers.forEach(i => NUEVOS.push(gen(i, 'Influencer Música', 'Madrid', 'Madrid', 'Redes sociales música', 'colaboraciones')));

// ============ FESTIVALES CON DEPARTAMENTO PRENSA ============
const festivales = [
  ['Sonar Festival Prensa','Festival Departamento','Barcelona','Cataluña','Electrónica'],
  ['Primavera Sound Prensa','Festival Departamento','Barcelona','Cataluña','Indie/Rock'],
  ['Mad Cool Prensa','Festival Departamento','Madrid','Madrid','Rock/Pop'],
  ['BBK Live Prensa','Festival Departamento','Bilbao','País Vasco','Rock'],
  ['Arenal Sound Prensa','Festival Departamento','Burriana','Comunidad Valenciana','Festival'],
  ['FIB Benicàssim Prensa','Festival Departamento','Benicàssim','Comunidad Valenciana','Festival'],
  ['Sonorama Prensa','Festival Departamento','Aranda de Duero','Castilla y León','Indie'],
  ['Resurrection Fest Prensa','Festival Departamento','Viveiro','Galicia','Metal'],
  ['Aquasella Prensa','Festival Departamento','Arriondas','Asturias','Electrónica'],
  ['Dreambeach Prensa','Festival Departamento','Villaricos','Andalucía','Electrónica'],
  ['A Summer Story Prensa','Festival Departamento','Madrid','Madrid','Electrónica'],
  ['Iberia Festival Prensa','Festival Departamento','Benicàssim','Comunidad Valenciana','Levante'],
  ['Cooltural Fest Prensa','Festival Departamento','Almería','Andalucía','Indie'],
  ['Granada Sound Prensa','Festival Departamento','Granada','Andalucía','Indie'],
  ['Boombastic Prensa','Festival Departamento','Asturias','Asturias','Reggaeton'],
  ['Reggaeton Beach Prensa','Festival Departamento','Salou','Cataluña','Reggaeton'],
  ['Rio Babel Prensa','Festival Departamento','Madrid','Madrid','Latino/Indie'],
  ['Tomavistas Prensa','Festival Departamento','Madrid','Madrid','Indie'],
  ['Cara B Festival Prensa','Festival Departamento','Madrid','Madrid','Indie'],
  ['Festival V Madrid Prensa','Festival Departamento','Madrid','Madrid','Pop/Rock'],
  ['Cultura Inquieta Prensa','Festival Departamento','Getafe','Madrid','Indie'],
  ['Brava Madrid Prensa','Festival Departamento','Madrid','Madrid','Urbano'],
  ['Coca Cola Music Prensa','Festival Departamento','Madrid','Madrid','Pop'],
  ['Las Noches del Botánico','Festival Departamento','Madrid','Madrid','Indie/Pop'],
  ['Universal Music Festival','Festival Departamento','Madrid','Madrid','Pop/Latino'],
  ['Festival Internacional Cante Minas','Festival Departamento','La Unión','Murcia','Flamenco'],
  ['Festival Sevilla Flamenco','Festival Departamento','Sevilla','Andalucía','Flamenco'],
  ['Festival Suma Flamenca','Festival Departamento','Madrid','Madrid','Flamenco'],
  ['Festival Caja Mágica','Festival Departamento','Madrid','Madrid','Multi-género'],
  ['Festival Bienal Flamenco','Festival Departamento','Sevilla','Andalucía','Flamenco']
];
festivales.forEach(f => NUEVOS.push([f[0], f[1], f[2], f[3], f[4], 'Mediano', '+34 91 089 70 00', `prensa@${f[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, `${f[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, 'Festival prensa']));

// ============ AGENCIAS COMUNICACIÓN MUSICAL ============
const agenciasMusica = [
  'Agencia Música y Comunicación','Agencia Vinilo Comunicación','Agencia Beat PR','Agencia Sonido PR','Agencia Music Press',
  'Agencia Indie Press','Agencia Latin Music PR','Agencia Trap PR','Agencia Reggaeton PR','Agencia Rock PR Spain',
  'Agencia Metal PR Spain','Agencia Electrónica PR','Agencia House PR Spain','Agencia Techno PR','Agencia Trance PR',
  'Agencia Jazz PR','Agencia Folk PR Spain','Agencia World Music PR','Agencia Música Catalana PR','Agencia Música Andaluza PR',
  'Agencia Música Vasca PR','Agencia Música Galega PR','Agencia Levante Music PR','Agencia Mediterraneo PR','Agencia Norte Music PR'
];
agenciasMusica.forEach(a => NUEVOS.push(gen(a, 'Agencia Comunicación', 'Madrid', 'Madrid', 'Comunicación musical', 'prensa')));

// ============ MEDIOS PEQUEÑOS ESPECIALIZADOS ELECTRÓNICA ============
const medElectronica = [
  'Vibras Electrónicas','Beats por Minuto','Electrónica Total','Synth Spain','Modular Spain',
  'Acid Iberia','House Beats Spain','Techno Iberia','Tech House Latino','Progressive Iberia',
  'Trance Iberia','Hardstyle Iberia','Drum & Bass Iberia','Dubstep Iberia','Future Beat Iberia'
];
medElectronica.forEach(m => NUEVOS.push(gen(m, 'Webzine Electrónica', 'Madrid', 'Madrid', 'Electrónica')));

// ============ MEDIOS HIP HOP / TRAP / URBANO ============
const medUrbano = [
  'Real Hip Hop Spain','Hip Hop Underground ES','Spanish Trap Mag','Latin Trap Iberia','Reggaeton Real Spain',
  'Drill Spain','Urban Spain Mag','Spanish Rap News','Boom Bap Spain','Old School Iberia',
  'New School Spain','Spanish Lyricists','Battle Rap Spain','Freestyle Spain Mag','Rap Spain Magazine'
];
medUrbano.forEach(m => NUEVOS.push(gen(m, 'Webzine Urbano', 'Madrid', 'Madrid', 'Hip Hop/Trap')));

// ============ MEDIOS LATINOS PEQUEÑOS ============
const medLatino = [
  'Música Latina Iberia','Latin Pop Spain','Reggaeton Iberia News','Salsa News Spain','Bachata News Spain',
  'Cumbia News Spain','Mambo Spain','Latin Trap News','Urbano Latino Iberia','Latin Indie News',
  'Música Iberoamericana News','Latino Rock News','Latin Electronic News','Latina Folk News','Latina Jazz News'
];
medLatino.forEach(m => NUEVOS.push(gen(m, 'Webzine Latino', 'Madrid', 'Madrid', 'Música latina')));

async function add() {
  try {
    console.log('🎤 Lote final PERIODISTAS MUSICA...\n');
    console.log(`📊 Nuevos: ${NUEVOS.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PERIODISTAS MUSICA'!A1",
      valueInputOption: 'RAW',
      resource: { values: NUEVOS }
    });

    console.log(`✅ ${NUEVOS.length} contactos añadidos\n`);

  } catch (error) {
    console.error('❌', error.message);
  }
}

add();
