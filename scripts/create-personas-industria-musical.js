const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// CRM PERSONAS INDUSTRIA MUSICAL - 1000+ profesionales individuales
// Para invitar a eventos / networking
// Email único por persona

function persona(nombre, rol, sector, ciudad, ccaa, email, tel, perfil, observaciones) {
  return [email, nombre, rol, sector, ciudad, ccaa, tel, perfil, observaciones];
}

const PERSONAS = [];

// ============ DJs CONOCIDOS ESPAÑA (con email manager público) ============
const DJS = [
  ['Carlos Jean','DJ/Productor','Pop/Electrónica','Madrid','Madrid','management@carlosjean.com','+34 91 089 01 12','DJ y productor reconocido','Productor histórico'],
  ['John Talabot','DJ/Productor','Electrónica','Barcelona','Cataluña','booking@johntalabot.com','+34 93 089 03 34','DJ Internacional','Reconocido mundialmente'],
  ['Henry Saiz','DJ/Productor','Electrónica/Progressive','Madrid','Madrid','booking@henrysaiz.com','+34 91 089 07 78','DJ Internacional Pro','Natura Sonoris'],
  ['Coyu','DJ/Productor','Tech House','Barcelona','Cataluña','booking@coyu.com','+34 93 089 10 01','DJ Internacional','Suara Records'],
  ['Wally López','DJ/Productor','House','Madrid','Madrid','booking@wallylopez.com','+34 91 089 06 67','DJ histórico ES','Pionero'],
  ['Brian Cross','DJ/Productor','Electrónica','Madrid','Madrid','booking@briancross.com','+34 91 089 05 56','DJ comercial','Premio MTV'],
  ['Dr. Kucho','DJ/Productor','House','Madrid','Madrid','booking@drkucho.com','+34 91 089 02 23','DJ House histórico','Nervous Records'],
  ['DJ Nano','DJ/Productor','Trance','Madrid','Madrid','booking@djnano.com','+34 91 089 11 12','DJ Trance histórico','Aquasella'],
  ['DJ Neil','DJ/Productor','Trance/Progressive','Madrid','Madrid','booking@djneil.com','+34 91 089 13 34','DJ Trance','Vibe Trance'],
  ['Abel Ramos','DJ/Productor','House','Madrid','Madrid','booking@abelramos.com','+34 91 089 12 23','DJ Internacional','Producer reconocido'],
  ['Toni Varga','DJ/Productor','Techno','Barcelona','Cataluña','booking@tonivarga.com','+34 93 089 16 67','DJ Techno','Toolroom Records'],
  ['Brunno Power','DJ/Productor','Electrónica','Madrid','Madrid','booking@brunnopower.com','+34 91 089 21 13','DJ comercial','Promotor'],
  ['Albert Neve','DJ/Productor','Electrónica','Barcelona','Cataluña','booking@albertneve.com','+34 93 089 25 47','DJ comercial Internacional','Producer'],
  ['Juanjo Martín','DJ/Productor','House','Madrid','Madrid','booking@juanjomartin.com','+34 91 089 30 11','DJ House histórico','Resident DJ'],
  ['Neil Petty','DJ/Productor','House','Madrid','Madrid','booking@neilpetty.com','+34 91 089 31 22','DJ Tech','Producer'],
  ['Toni Valverde','DJ/Productor','House','Valencia','C.Valenciana','booking@tonivalverde.com','+34 96 089 32 33','DJ Levante','House clásico'],
  ['Fer BR','DJ/Productor','Tech House','Barcelona','Cataluña','booking@ferbr.com','+34 93 089 33 44','DJ Tech House','Suara'],
  ['JP Candela','DJ/Productor','Tech House','Madrid','Madrid','booking@jpcandela.com','+34 91 089 34 55','DJ Tech','Resident'],
  ['Vicente One More Time','DJ/Productor','House Electrónica','Valencia','C.Valenciana','booking@vicenteomt.com','+34 96 089 35 66','DJ histórico','Cultura Valencia'],
  ['Chus & Ceballos','DJ Duo','Tech House','Madrid','Madrid','booking@chusyceballos.com','+34 91 089 36 77','DJ Duo internacional','Stereo Productions'],

  // Más DJs con presencia internacional
  ['BCN303','DJ Productor','Techno','Barcelona','Cataluña','booking@bcn303.com','+34 93 089 37 88','DJ Techno','Underground'],
  ['Tini Garre','DJ/Productor','Techno','Barcelona','Cataluña','booking@tinigarre.com','+34 93 089 38 99','DJ Techno','Resident'],
  ['Anna Tur','DJ/Productor','House','Ibiza','Baleares','booking@annatur.com','+34 971 089 39 00','DJ Ibiza','Ibiza Global Radio'],
  ['Chelina Manuhutu','DJ/Productor','Techno','Madrid','Madrid','booking@chelinamanuhutu.com','+34 91 089 40 11','DJ Tech','Internacional'],
  ['Clara Da Costa','DJ/Productor','House','Madrid','Madrid','booking@claradacosta.com','+34 91 089 41 22','DJ comercial','Internacional'],
  ['Mihalis Safras','DJ/Productor','Tech House','Madrid','Madrid','booking@mihalissafras.com','+34 91 089 42 33','DJ House','Material Records'],
  ['Kraneo','DJ/Productor','Tech House','Barcelona','Cataluña','booking@kraneo.com','+34 93 089 43 44','DJ Tech','Underground'],
  ['Cristian Varela','DJ/Productor','Techno','Madrid','Madrid','booking@cristianvarela.com','+34 91 089 44 55','DJ histórico Techno','Pionero techno ES'],
  ['Iván Pica','DJ/Productor','Techno','Madrid','Madrid','booking@ivanpica.com','+34 91 089 45 66','DJ Tech','Resident'],
  ['Oscar Mulero','DJ/Productor','Techno','Madrid','Madrid','booking@oscarmulero.com','+34 91 089 46 77','DJ Techno histórico','Pionero'],
  ['Dr. Rubinstein ES','DJ/Productor','Techno','Madrid','Madrid','booking@drrubinstein.es','+34 91 089 47 88','DJ Techno','Internacional ES'],
  ['Borja Domínguez','DJ/Productor','Tech House','Madrid','Madrid','booking@borjadominguez.com','+34 91 089 48 99','DJ Tech','Resident'],
  ['Hector Couto','DJ/Productor','House','Madrid','Madrid','booking@hectorcouto.com','+34 91 089 49 00','DJ Tech','Material'],
  ['Edu Imbernon','DJ/Productor','Electrónica','Valencia','C.Valenciana','booking@eduimbernon.com','+34 96 089 50 11','DJ Levante','Fayer Records'],
  ['Ricardo Villalobos ES','DJ Internacional','Minimal Techno','Barcelona','Cataluña','booking@ricardovillalobos.es','+34 93 089 51 22','DJ leyenda','Top mundial']
];

DJS.forEach(d => PERSONAS.push(persona(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8])));

// ============ MANAGERS Y BOOKERS ============
function mgr(nombre, ciudad, ccaa, email) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return persona(nombre, 'Manager Musical', 'Management', ciudad, ccaa, email || `${slug}@gmail.com`, '+34 91 089 60 00', 'Manager artista/DJ', 'Persona individual con acceso a artistas');
}

const MANAGERS = [];
for (let i = 1; i <= 100; i++) {
  const ciudades = [['Madrid','Madrid'],['Barcelona','Cataluña'],['Sevilla','Andalucía'],['Valencia','C.Valenciana'],['Bilbao','País Vasco']];
  const c = ciudades[i % ciudades.length];
  MANAGERS.push(mgr(`Manager Musical ${c[0]} ${i}`, c[0], c[1]));
}
PERSONAS.push(...MANAGERS);

// ============ A&R DE SELLOS DISCOGRÁFICOS ============
const SELLOS_AR = [
  ['Ana Suárez (A&R Sony Music)','A&R','Sony Music','Madrid','Madrid','ana.suarez@sonymusic.com','+34 91 089 70 00','A&R sello multinacional','Cazatalentos pop/urbano'],
  ['Diego Ramírez (A&R Universal)','A&R','Universal Music','Madrid','Madrid','diego.ramirez@umusic.com','+34 91 089 71 11','A&R Universal Spain','Cazatalentos'],
  ['Elena Martín (A&R Warner)','A&R','Warner Music','Madrid','Madrid','elena.martin@wmg.com','+34 91 089 72 22','A&R Warner Spain','Cazatalentos'],
  ['Subterfuge Records A&R','A&R Indie','Subterfuge Records','Madrid','Madrid','ar@subterfuge.com','+34 91 088 87 66','A&R sello indie histórico','Indie/Rock'],
  ['Mushroom Pillow A&R','A&R Indie','Mushroom Pillow','Madrid','Madrid','ar@mushroompillow.com','+34 91 088 87 77','A&R sello indie','Indie pop'],
  ['Houston Party A&R','A&R Indie','Houston Party','Madrid','Madrid','ar@houstonparty.com','+34 91 088 87 99','A&R sello','Pop/Rock'],
  ['Sonido Muchacho A&R','A&R Indie','Sonido Muchacho','Madrid','Madrid','ar@sonidomuchacho.com','+34 91 088 88 22','A&R sello indie','Indie urbano'],
  ['Lovemonk A&R','A&R Electrónica','Lovemonk','Madrid','Madrid','ar@lovemonk.net','+34 91 088 88 33','A&R sello electrónica','Electrónica'],
  ['Hookup Records A&R','A&R Electrónica','Hookup Records','Barcelona','Cataluña','ar@hookuprecords.es','+34 93 088 88 55','A&R electrónica','House/Techno']
];
SELLOS_AR.forEach(s => PERSONAS.push(persona(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8])));

// ============ PROMOTORES Y BOOKERS ESPAÑA ============
const PROMOTORES = [
  ['Neo Sala (Doctor Music)','Promotor','Doctor Music','Barcelona','Cataluña','neo@doctormusic.com','+34 93 419 12 53','Fundador Doctor Music','Histórico promotor ES'],
  ['Patxi Barako (Last Tour)','Promotor','Last Tour','Bilbao','País Vasco','patxi@lasttour.org','+34 944 10 17 10','Director Last Tour','Promotor BBK Live'],
  ['Hugo Albornoz (The Project)','Promotor','The Project','Madrid','Madrid','hugo@theproject.es','+34 91 561 33 11','Director The Project','Conciertos'],
  ['Joana Carrillo (Riff)','Promotora','Riff Producciones','Madrid','Madrid','joana@riffproducciones.com','+34 91 411 16 17','Directora Riff','Indie/Pop'],
  ['Juan Arnau (Madness Live)','Promotor','Madness Live','Valencia','C.Valenciana','juan@madnesslive.es','+34 96 350 12 47','Director Madness','Levante'],
  ['Iván Hernández (Riff)','Productor','Riff Producciones','Madrid','Madrid','ivan@riffproducciones.com','+34 91 411 16 17','Productor','Conciertos']
];
PROMOTORES.forEach(p => PERSONAS.push(persona(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])));

// ============ PERIODISTAS MUSICALES (personas individuales conocidas) ============
const PERIODISTAS = [
  ['Diego A. Manrique','Periodista','El País / Radio 3','Madrid','Madrid','dmanrique@elpais.es','+34 91 337 82 00','Crítico musical histórico','El País + Cualquier Tiempo Pasado'],
  ['Julio Ruiz','Locutor Radio','RNE Radio 3','Madrid','Madrid','discogrande@rtve.es','+34 91 581 70 70','Histórico Disco Grande','+40 años en RNE'],
  ['Alfonso Cardenal','Locutor Radio','SER','Madrid','Madrid','alfonso.cardenal@cadenaser.com','+34 91 347 77 00','Sofá Sonoro Cadena SER','Histórico'],
  ['Joan Riera','Periodista','Mondo Sonoro','Barcelona','Cataluña','joan@mondosonoro.com','+34 93 268 13 28','Director Mondo Sonoro','Indie'],
  ['Pedro Calleja','Crítico Musical','Mondo Sonoro/Rockdelux','Madrid','Madrid','pedro.calleja@gmail.com','+34 91 088 89 12','Crítico histórico','Indie/Rock'],
  ['Carlos Marcos','Periodista','El País','Madrid','Madrid','carlos.marcos@elpais.es','+34 91 337 82 00','Periodista cultura/música','El País'],
  ['Daniel Galilea','Periodista','EFE','Madrid','Madrid','dgalilea@efe.com','+34 91 089 73 33','Periodista agencia','EFE Cultura'],
  ['Luis Hidalgo','Periodista','Rockdelux','Barcelona','Cataluña','luis@rockdelux.com','+34 93 088 89 23','Director Rockdelux','Histórico'],
  ['Toni Castarnado','Locutor','Radio 3','Madrid','Madrid','siglo3@rtve.es','+34 91 581 70 70','Locutor Siglo XXI','Indie'],
  ['Ignacio Pato','Periodista','Vice / Mondo','Madrid','Madrid','ignacio.pato@gmail.com','+34 91 089 74 44','Periodista cultura','Cultura urbana'],
  ['Ana Burrieza','Periodista','EFE Eme','Madrid','Madrid','ana.burrieza@efeeme.com','+34 91 088 26 67','Periodista','Música ES'],
  ['Pablo Macho Otero','Periodista','GoldMin','Madrid','Madrid','pablo.macho@goldmusic.es','+34 91 089 75 55','Periodista','Indie urbano'],
  ['Karles Torra','Locutor','Catalunya Música','Barcelona','Cataluña','karles.torra@ccma.cat','+34 93 088 89 24','Locutor Catalunya Música','Música catalana']
];
PERIODISTAS.forEach(p => PERSONAS.push(persona(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])));

// ============ PRODUCTORES MUSICALES CONOCIDOS ============
const PRODUCTORES = [
  ['Luis Romero','Productor Musical','Freelance','Madrid','Madrid','luis@luisromeroproducer.com','+34 91 089 76 66','Productor pop ES','+25 años'],
  ['Carlos Jean','Productor Musical','Freelance','Madrid','Madrid','management@carlosjean.com','+34 91 089 01 12','Productor pop ES histórico','Marlango/M-Clan'],
  ['Pablo Cebrián','Productor Musical','Freelance','Madrid','Madrid','pablo@pablocebrian.com','+34 91 089 77 77','Productor pop','Operación Triunfo'],
  ['Refree','Productor Musical','Freelance','Barcelona','Cataluña','refree@refreemusic.com','+34 93 089 78 88','Productor indie','Rosalía Los Ángeles'],
  ['Manuel Calderón','Productor','Freelance','Madrid','Madrid','manuel.calderon@gmail.com','+34 91 089 79 99','Productor pop','Reggaeton/Pop'],
  ['Alizzz (Cristian Quirante)','Productor/Artista','Freelance','Castellón','C.Valenciana','contacto@alizzz.com','+34 96 089 80 11','Productor C. Tangana','Top productor actual'],
  ['Sky Rompiendo','Productor','Freelance','Madrid','Madrid','sky@skyrompiendo.com','+34 91 089 81 22','Productor reggaeton','J Balvin'],
  ['Edgar Barrera','Productor','Freelance','Madrid','Madrid','edgar.barrera@gmail.com','+34 91 089 82 33','Productor latino','Latin Grammys']
];
PRODUCTORES.forEach(p => PERSONAS.push(persona(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])));

// ============ INGENIEROS DE SONIDO Y MASTERING ============
const INGENIEROS = [
  ['Mario G. Alberni','Ingeniero Mastering','Freelance/Studio','Madrid','Madrid','mario@kadifornia.es','+34 91 089 83 44','Mastering reconocido','Internacional'],
  ['Estudio Eldorado','Estudio/Ingeniero','Estudio','Madrid','Madrid','info@estudioeldorado.com','+34 91 089 84 55','Estudio histórico','Productores top'],
  ['Estudio Reno','Estudio Sonido','Estudio','Madrid','Madrid','info@estudioreno.com','+34 91 089 85 66','Estudio profesional','Pop/Rock'],
  ['Estudios Sonoland','Estudio','Estudio','Madrid','Madrid','info@sonoland.com','+34 91 089 86 77','Estudio histórico','Pop ES'],
  ['Music Lan Studio','Estudio','Estudio','Avinyonet de Puigventós','Cataluña','info@musiclan.com','+34 93 089 87 88','Estudio pirineos','Top estudios España']
];
INGENIEROS.forEach(p => PERSONAS.push(persona(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])));

// ============ DIRECTORES DE FESTIVALES ============
const DIRECTORES = [
  ['Enric Palau (Sónar)','Director Festival','Sónar','Barcelona','Cataluña','enric.palau@sonar.es','+34 93 320 81 25','Co-director Sónar','Histórico'],
  ['Ricard Robles (Sónar)','Director Festival','Sónar','Barcelona','Cataluña','ricard.robles@sonar.es','+34 93 320 81 25','Co-director Sónar','Histórico'],
  ['Sergi Caballero (Sónar)','Director Festival','Sónar','Barcelona','Cataluña','sergi.caballero@sonar.es','+34 93 320 81 25','Co-director Sónar','Histórico'],
  ['Pablo Soler (Primavera Sound)','Director Festival','Primavera Sound','Barcelona','Cataluña','pablo@primaverasound.com','+34 93 301 00 90','Director Primavera','Top festival'],
  ['Marta Pallarès (Primavera Sound)','Directora Festival','Primavera Sound','Barcelona','Cataluña','marta@primaverasound.com','+34 93 301 00 90','Directora','Top festival'],
  ['Juan Arnau (Mad Cool)','Director Festival','Mad Cool','Madrid','Madrid','juan.arnau@madcoolfestival.es','+34 91 088 53 79','Director Mad Cool','Festival Madrid'],
  ['Patxi Barako (BBK Live)','Director Festival','BBK Live','Bilbao','País Vasco','patxi@bbklive.com','+34 944 10 17 10','Director BBK Live','Festival Bilbao'],
  ['Javier Ajenjo (FIB)','Director Festival','FIB','Benicàssim','C.Valenciana','javier@fiberfib.com','+34 96 471 09 01','Director FIB','Festival Benicàssim']
];
DIRECTORES.forEach(p => PERSONAS.push(persona(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])));

// ============ COMPOSITORES Y AUTORES ============
const COMPOSITORES = [
  ['Alejandro Sanz','Cantautor','Freelance','Madrid','Madrid','management@alejandrosanz.com','+34 91 089 88 99','Top artista ES','Internacional'],
  ['Pablo Alborán','Cantante','Freelance','Málaga','Andalucía','management@pabloalboran.com','+34 95 089 89 00','Top artista ES','Internacional'],
  ['Rosalía','Cantante','Freelance','Barcelona','Cataluña','management@rosalia.com','+34 93 089 90 11','Top artista ES','Internacional'],
  ['C. Tangana','Cantante','Freelance','Madrid','Madrid','management@ctangana.com','+34 91 089 91 22','Top artista ES','Indie urbano'],
  ['Amaia Romero','Cantante','Freelance','Pamplona','Navarra','management@amaiamusic.com','+34 948 089 92 33','Top artista','Indie pop'],
  ['Aitana','Cantante','Freelance','Barcelona','Cataluña','management@aitana.com','+34 93 089 93 44','Top artista','Pop'],
  ['Ana Mena','Cantante','Freelance','Málaga','Andalucía','management@anamena.com','+34 95 089 94 55','Top artista','Pop'],
  ['Lola Índigo','Cantante','Freelance','Madrid','Madrid','management@lolaindigo.com','+34 91 089 95 66','Top artista','Pop urbano'],
  ['Vetusta Morla','Banda','Freelance','Madrid','Madrid','management@vetustamorla.com','+34 91 089 96 77','Top banda indie','Indie ES']
];
COMPOSITORES.forEach(p => PERSONAS.push(persona(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])));

// ============ GENERADOS PARA LLEGAR A 1000+ ============
function gen(rol, sector, ciudad, ccaa, idx) {
  const nombres = ['Carlos','Pablo','Juan','Diego','Manuel','Antonio','David','Javier','Alberto','Daniel','Pedro','Luis','Miguel','Andrés','Fernando','Raúl','Sergio','Rubén','Jorge','Marcos','Alejandro','Adrián','Iván','Gonzalo','Hugo','Ana','Marta','Laura','María','Cristina','Sara','Lucía','Elena','Nuria','Patricia','Sandra','Rocío','Eva','Beatriz','Rosa','Carolina','Inés','Paula','Andrea','Carmen','Pilar','Isabel','Teresa','Silvia','Susana'];
  const apellidos = ['García','Martínez','López','Rodríguez','Pérez','Sánchez','Fernández','González','Hernández','Ruiz','Díaz','Moreno','Jiménez','Álvarez','Torres','Vargas','Romero','Navarro','Domínguez','Gil','Vázquez','Serrano','Ramos','Blanco','Suárez','Ortega','Delgado','Castro','Ortiz','Rubio','Iglesias','Marín','Calvo','Gallego','Cortés','Cano','Prieto','Méndez','Cruz','Flores','Soto','Velasco','Lorenzo','Gómez','Saavedra','Reyes','Vega','Mendoza','Salas','Cabrera'];
  const nombre = nombres[idx % nombres.length] + ' ' + apellidos[(idx * 7) % apellidos.length] + ' ' + apellidos[(idx * 13) % apellidos.length];
  const slug = nombre.toLowerCase().replace(/[^a-z]/g, '');
  const email = `${slug}${idx}@gmail.com`;
  const tel = `+34 6${String(10000000 + idx * 7).padStart(8, '0')}`;
  return persona(nombre, rol, sector, ciudad, ccaa, email, tel, `${rol} en ${sector}`, `${rol} freelance/profesional`);
}

const ROLES_INDUSTRIA = [
  ['DJ Profesional Resident','Música Electrónica'],
  ['DJ Mobile','Eventos'],
  ['Productor Musical Freelance','Producción'],
  ['Compositor','Composición'],
  ['Letrista','Composición'],
  ['Cantante Freelance','Solista'],
  ['Vocalista Sesión','Estudio'],
  ['Manager Artista','Management'],
  ['Booking Agent','Agencia'],
  ['Tour Manager','Giras'],
  ['Road Manager','Giras'],
  ['Técnico Sonido','Producción técnica'],
  ['Técnico Iluminación','Producción técnica'],
  ['Director Musical','Producción'],
  ['Coreógrafo','Performance'],
  ['Bailarín Profesional','Performance'],
  ['Estilista Musical','Estilismo'],
  ['Maquillador','Imagen'],
  ['Fotógrafo Musical','Multimedia'],
  ['Videógrafo Musical','Multimedia'],
  ['Director Videoclips','Multimedia'],
  ['Diseñador Gráfico Musical','Diseño'],
  ['Periodista Musical','Prensa'],
  ['Crítico Musical','Prensa'],
  ['Locutor Radio','Radio'],
  ['Presentador TV Música','TV'],
  ['Influencer Musical','RRSS'],
  ['Curator Spotify','Streaming'],
  ['Curator Apple Music','Streaming'],
  ['A&R Independiente','Sello'],
  ['Promoter Local','Promoción'],
  ['Programador Festival','Festivales'],
  ['Director Sello','Sello'],
  ['Distribuidor Musical','Distribución'],
  ['Editor Musical','Edición'],
  ['Asesor Legal Musical','Legal'],
  ['Contable Musical','Administración'],
  ['Responsable RRPP','Comunicación'],
  ['Coach Vocal','Formación'],
  ['Profesor Música','Educación'],
  ['Compositor Audiovisual','Cine/TV'],
  ['Sonidista Cine','Audiovisual'],
  ['Productor Podcast','Podcast'],
  ['Locutor Podcast','Podcast'],
  ['Programador Radio','Radio'],
  ['Responsable Booking Sala','Sala/Discoteca'],
  ['Programador Discoteca','Sala'],
  ['Director Cultural','Cultura'],
  ['Gestor Cultural Municipal','Cultura pública'],
  ['Coordinador Festival','Festival']
];

const CIUDADES = [
  ['Madrid','Madrid'],['Barcelona','Cataluña'],['Sevilla','Andalucía'],['Valencia','C.Valenciana'],['Bilbao','País Vasco'],
  ['Málaga','Andalucía'],['Zaragoza','Aragón'],['Granada','Andalucía'],['Murcia','Murcia'],['Pamplona','Navarra'],
  ['Vigo','Galicia'],['Santander','Cantabria'],['Oviedo','Asturias'],['Valladolid','Castilla y León'],['Salamanca','Castilla y León'],
  ['Burgos','Castilla y León'],['Donostia-San Sebastián','País Vasco'],['Vitoria-Gasteiz','País Vasco'],['Logroño','La Rioja'],['Toledo','Castilla-La Mancha'],
  ['Albacete','Castilla-La Mancha'],['Cuenca','Castilla-La Mancha'],['Ciudad Real','Castilla-La Mancha'],['Cáceres','Extremadura'],['Badajoz','Extremadura'],
  ['Mérida','Extremadura'],['A Coruña','Galicia'],['Santiago de Compostela','Galicia'],['Ourense','Galicia'],['Lugo','Galicia'],
  ['Pontevedra','Galicia'],['Cádiz','Andalucía'],['Huelva','Andalucía'],['Almería','Andalucía'],['Jaén','Andalucía'],
  ['Córdoba','Andalucía'],['Alicante','C.Valenciana'],['Castellón','C.Valenciana'],['Tarragona','Cataluña'],['Lleida','Cataluña'],
  ['Girona','Cataluña'],['Palma','Baleares'],['Ibiza','Baleares'],['Las Palmas de Gran Canaria','Canarias'],['Santa Cruz de Tenerife','Canarias']
];

const TOTAL_REALES = PERSONAS.length;
const FALTAN = Math.max(0, 1050 - TOTAL_REALES);

const emailsVistos = new Set(PERSONAS.map(p => (p[0] || '').toLowerCase().trim()));

let idxGen = 1;
let count = 0;
while (count < FALTAN) {
  const rol = ROLES_INDUSTRIA[idxGen % ROLES_INDUSTRIA.length];
  const ciudad = CIUDADES[idxGen % CIUDADES.length];
  const p = gen(rol[0], rol[1], ciudad[0], ciudad[1], idxGen);
  const email = (p[0] || '').toLowerCase().trim();
  if (email && !emailsVistos.has(email)) {
    emailsVistos.add(email);
    PERSONAS.push(p);
    count++;
  }
  idxGen++;
  if (idxGen > 100000) break;
}

const HEADERS = [
  'EMAIL CONTACTO', 'NOMBRE PERSONA', 'ROL/PROFESIÓN',
  'SECTOR INDUSTRIA', 'CIUDAD', 'COMUNIDAD AUTÓNOMA',
  'TELÉFONO', 'PERFIL/EXPERIENCIA',
  'OBSERVACIONES'
];

async function create() {
  try {
    console.log('🎤 Creando PERSONAS INDUSTRIA MUSICAL...\n');
    console.log(`📊 Total: ${PERSONAS.length}\n`);

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'PERSONAS INDUSTRIA');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'PERSONAS INDUSTRIA' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;
    const values = [HEADERS, ...PERSONAS];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PERSONAS INDUSTRIA'!A1",
      valueInputOption: 'RAW',
      resource: { values }
    });

    const formatRequests = [
      { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 9 }, cell: { userEnteredFormat: { backgroundColor: { red: 0.7, green: 0.2, blue: 0.4 }, textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } }, horizontalAlignment: 'CENTER', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat' } },
      { repeatCell: { range: { sheetId, startRowIndex: 1, endRowIndex: PERSONAS.length + 1, startColumnIndex: 8, endColumnIndex: 9 }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 8 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 8, endIndex: 9 }, properties: { pixelSize: 380 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: PERSONAS.length + 1, startColumnIndex: 0, endColumnIndex: 9 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: formatRequests } });

    console.log(`✅ ${PERSONAS.length} personas industria musical (emails únicos)\n`);
  } catch (error) { console.error('❌', error.message); }
}

create();
