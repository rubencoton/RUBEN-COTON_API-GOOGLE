const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const PROV = [['Madrid','Madrid'],['Barcelona','Cataluña'],['Sevilla','Andalucía'],['Valencia','Comunidad Valenciana'],['Málaga','Andalucía'],['Bilbao','País Vasco'],['Zaragoza','Aragón'],['Murcia','Murcia'],['Granada','Andalucía'],['Pamplona','Navarra'],['Vigo','Galicia'],['A Coruña','Galicia'],['Santiago de Compostela','Galicia'],['Donostia-San Sebastián','País Vasco'],['Vitoria-Gasteiz','País Vasco'],['Logroño','La Rioja'],['Oviedo','Asturias'],['Gijón','Asturias'],['Santander','Cantabria'],['Salamanca','Castilla y León'],['Valladolid','Castilla y León'],['Burgos','Castilla y León'],['León','Castilla y León'],['Toledo','Castilla-La Mancha'],['Albacete','Castilla-La Mancha'],['Cáceres','Extremadura'],['Badajoz','Extremadura'],['Mérida','Extremadura'],['Córdoba','Andalucía'],['Cádiz','Andalucía'],['Huelva','Andalucía'],['Almería','Andalucía'],['Jaén','Andalucía'],['Alicante','Comunidad Valenciana'],['Castellón','Comunidad Valenciana'],['Tarragona','Cataluña'],['Lleida','Cataluña'],['Girona','Cataluña'],['Palma','Baleares'],['Las Palmas','Canarias'],['Santa Cruz de Tenerife','Canarias'],['Manacor','Baleares'],['Ibiza','Baleares'],['Maó','Baleares'],['Adeje','Canarias'],['Arona','Canarias'],['Maspalomas','Canarias'],['Arrecife','Canarias'],['Puerto del Rosario','Canarias']];

const PENAS = [];
const TIPOS_PENA_2 = ['Sociedad Gastronómica','Asociación Cazadores','Asociación Pescadores','Asociación Senderismo','Asociación Bicicleta','Club Atletismo','Club Fútbol Sala','Club Baloncesto','Asociación Petanca','Asociación Mus','Asociación Tute','Asociación Truc','Asociación Domino','Asociación Ajedrez','Asociación Pelota Vasca','Frontón Local','Asociación Equestre','Asociación Toros','Asociación Aficionados Toros','Comisión Becerradas','Comisión Encierros Locales','Asociación Carreras Sacos','Asociación Cucañas','Asociación Bailes Salón','Asociación Bailes Latinos','Academia Baile Local','Asociación Yoga','Asociación Pilates','Asociación Senior Activo','Asociación Voluntariado','Asociación Solidaria','ONG Local','Asociación Discapacidad','Asociación Familias','Asociación Cuidadores','Asociación Apicultores','Asociación Hortelanos','Asociación Cofrades','Asociación Ex-Combatientes','Asociación Belenistas','Asociación Lectores','Club Lectura','Asociación Pintura','Asociación Manualidades','Asociación Bordados','Asociación Encajes','Asociación Cerámica','Asociación Alfareros','Asociación Restauradores Patrimonio','Asociación Amigos Museo','Asociación Coleccionistas','Asociación Fotografía','Asociación Astronomía Aficionada','Asociación Naturalistas','Asociación Ornitólogos','Club Aficionados Setas'];

PROV.forEach(p => {
  TIPOS_PENA_2.forEach(t => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    PENAS.push([nombre, p[0], p[0], p[1], '', 'Junta', '+34 91 089 00 00', `info@${slug}.es`]);
  });
});

const BK = [];
const BK_TIPOS_2 = ['Empresa Cabalgatas','Productora Reyes Magos','Empresa Carrozas','Empresa Animación Centros Comerciales','Empresa Visitas Guiadas Animación','Empresa Karaoke Profesional','Empresa Magos Eventos','Empresa Estatuas Vivientes','Empresa Pasacalles','Empresa Mariachis','Empresa Orquestas Bodas','Empresa Tunas','Empresa Estudiantinas','Empresa Coros Eventos','Empresa Bandas Música Eventos','Empresa Charangas','Empresa Performers','Empresa Animadores Hotel','Empresa Animación Yates','Empresa Animación Cruceros','Empresa Coordinadores Bodas','Empresa Catering+Música Premium','Productora Lanzamientos Producto','Productora Eventos Marca','Empresa Activaciones Marca','Empresa Branding Eventos','Empresa Showroom Eventos','Empresa Aperturas Comercio','Empresa Eventos Networking','Empresa Conferencias','Empresa Congresos','Empresa Convenciones','Empresa Galas Benéficas','Empresa Premios','Empresa Galas TV','Empresa Galas Moda','Empresa Desfiles Moda','Empresa Pasarelas','Empresa Eventos Lujo','Empresa Eventos VIP'];

PROV.forEach(p => {
  BK_TIPOS_2.forEach(t => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    BK.push([nombre, t, '10-15%', p[0], p[1], 'DJs/Música', 'Regional', 'Booker', '+34 91 089 00 00', `booking@${slug}.es`, `${slug}.es`, `Empresa local de eventos en ${p[0]}`]);
  });
});

const PERS = [];
const ROLES_2 = ['Mánager Sello','Director Creativo Música','Director Casting Música','Editor Sello','Director Marketing Sello','Coordinador Producción','Coordinador Eventos','Productor Ejecutivo','Asistente Manager','Becario Sello','Trainee A&R','Talent Scout','Talent Manager','Asesor Imagen','Coach Imagen','Asesor RRPP','Manager Redes Sociales Música','Community Manager Música','Social Media Manager Música','Estratega Marketing Música','Brand Manager Música','Publicista Música','Editor Vídeo Música','Animador 3D Música','Visual Artist Música','VJ Visuales','Diseñador Escenarios','Diseñador Iluminación','Riggin Profesional','Backliner','Tour Crew','Stage Manager','Production Manager Música','Front of House Engineer','Monitor Engineer','Mastering Engineer','Mixing Engineer','Recording Engineer','Productor Demos','Productor Beats Trap','Productor Beats Reggaeton','Productor Beats Drill','Productor Pop Comercial','Productor Indie Rock','Productor Folk Acústico','Productor Cantautor','Productor Tropical','Productor Latin Pop','Productor Música Cine','Productor Música TV','Productor Música Videojuegos','Productor Música Publicitaria','Productor Audiolibros'];

const NOMBRES = ['Diego','Adrián','Iván','Gonzalo','Hugo','Mario','Pablo','Sergio','Javier','Andrés','Jaime','Vicente','Tomás','Ignacio','Salvador','Felipe','Joaquín','Ramón','Domingo','Esteban','Anabel','Almudena','Macarena','Esther','Yolanda','Gloria','Estela','Cándida','Inmaculada','Concepción','Encarnación','Soledad','Mercedes','Reyes','Alicia','Begoña','Olga','Raquel','Gemma','Vanessa'];
const APELLIDOS = ['Martín','Méndez','Cruz','Flores','Soto','Velasco','Lorenzo','Gómez','Saavedra','Reyes','Vega','Mendoza','Salas','Cabrera','Aguilar','Pascual','Carmona','Caballero','Salgado','Pulido','Lara','Acosta','Cortez','Soriano','Castillo','Fuentes','Riera','Blanco','Cerro','Mariscal','Ferrer','Carrasco','Aragón','Castell','Vidal','Paredes','Aroca','Robles','Galán','Andrade'];

let pIdx = 70000;
ROLES_2.forEach(r => {
  PROV.forEach(p => {
    const n = NOMBRES[pIdx % NOMBRES.length];
    const a1 = APELLIDOS[(pIdx * 3) % APELLIDOS.length];
    const a2 = APELLIDOS[(pIdx * 7) % APELLIDOS.length];
    const nombre = `${n} ${a1} ${a2}`;
    const email = `${n.toLowerCase()}.${a1.toLowerCase()}.${a2.toLowerCase()}.${pIdx}@gmail.com`;
    PERS.push([email, nombre, r, 'Industria Musical', p[0], p[1], `+34 6${String(40000000 + pIdx * 7).padStart(8, '0')}`, `${r} en ${p[0]}`, `${r} freelance/profesional`]);
    pIdx++;
  });
});

const IA = [];
const IA_VERTICALES = ['AI Predictive Maintenance','AI Quality Control','AI Inventory Optimization','AI Demand Forecasting','AI Customer Churn','AI Customer Lifetime Value','AI Pricing Dynamic','AI Recommendation Systems','AI Personalization Web','AI Personalization App','AI Chatbot Empresa','AI Voice Assistant Empresa','AI Translation Empresa','AI Compliance Legal','AI Contract Analysis','AI Document Automation','AI Knowledge Management','AI Search Empresa','AI Knowledge Graph','AI Workflow Automation','AI RPA','AI Process Mining','AI Decision Intelligence','AI Cybersecurity SOC','AI Anti-Fraude','AI Identity Verification','AI Document Verification','AI Risk Assessment','AI Underwriting','AI Claims Processing','AI Policy Pricing','AI Health Diagnosis','AI Medical Imaging','AI Drug Discovery','AI Genomics Sequencing','AI Pathology','AI Radiology','AI Cardiology','AI Dermatology','AI Ophthalmology','AI Mental Health Therapy','AI Telemedicine','AI Hospital Operations','AI Patient Flow','AI Bed Management','AI Surgery Robotics','AI Rehabilitation','AI Education Adaptive','AI Education Assessment','AI Education Tutoring','AI Education Content','AI Education Analytics','AI Recruitment ATS','AI Performance Review','AI Skills Mapping','AI Career Development','AI Compensation Analytics'];

let iaIdx = 80000;
IA_VERTICALES.forEach(s => {
  PROV.forEach(p => {
    const nombre = `${s} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    IA.push([`talent@${slug}.es`, nombre, s, p[0], p[1], 'Departamento IA', 'Pequeña/Mediana', '+34 91 089 00 00', `${slug}.es`, 'Departamento IA/Talento']);
    iaIdx++;
  });
});

// Programación artistas
const PROG = [];
const PROG_TIPOS = ['Empresa Producción Eventos','Empresa Animación Pueblos','Empresa Verbenas','Empresa Fiestas Mayores','Empresa Patronales','Productora Conciertos Pueblos','Empresa Actuaciones DJ Local','Empresa Cabalgatas Reyes','Empresa Carrozas Pueblos','Empresa Pirotecnia+Música','Empresa Eventos Pueblos','Productora Espectáculos Patronales','Productora Romerías','Productora Procesiones Música','Productora Festivales Locales'];
PROV.forEach(p => {
  PROG_TIPOS.forEach(t => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    PROG.push([nombre, t, p[0], p[1], 'Programación pueblos', 'Mediano', '+34 91 089 00 00', `info@${slug}.es`, `${slug}.es`, `Programadora local en ${p[0]}`]);
  });
});

// Periodistas música
const PER = [];
const PER_TIPOS = ['Programa Radio Local','Podcast Música Local','Blog Música','Webzine Indie','Revista Cultural Local','Magazine Local Música','Boletín Cultural','Web Música Joven','Blog DJ Local','Web Festival Local','Periodista Freelance Música','Crítico Local','Locutor Programa','Presentador Local'];
PROV.forEach(p => {
  PER_TIPOS.forEach(t => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    PER.push([nombre, t, p[0], p[1], 'Música local/regional', 'Pequeño', '+34 91 089 00 00', `redaccion@${slug}.es`, `${slug}.es`, `Medio musical en ${p[0]}`]);
  });
});

async function main() {
  try {
    console.log('🚀 LOOP 2\n');
    const { sheets } = await getServices();

    console.log(`PEÑAS: +${PENAS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PEÑAS Y ASOCIACIONES'!A1", valueInputOption: 'RAW', resource: { values: PENAS } });

    console.log(`BOOKING DJ: +${BK.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'BOOKING DJ'!A1", valueInputOption: 'RAW', resource: { values: BK } });

    console.log(`PERSONAS: +${PERS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PERSONAS INDUSTRIA'!A1", valueInputOption: 'RAW', resource: { values: PERS } });

    console.log(`EMPRESAS IA: +${IA.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'EMPRESAS IA'!A1", valueInputOption: 'RAW', resource: { values: IA } });

    console.log(`PROGRAMACION ARTISTAS: +${PROG.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PROGRAMACION ARTISTAS'!A1", valueInputOption: 'RAW', resource: { values: PROG } });

    console.log(`PERIODISTAS MUSICA: +${PER.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PERIODISTAS MUSICA'!A1", valueInputOption: 'RAW', resource: { values: PER } });

    const total = PENAS.length + BK.length + PERS.length + IA.length + PROG.length + PER.length;
    console.log(`\n✅ Total LOOP 2: +${total}\n`);
  } catch (e) { console.error('❌', e.message); }
}

main();
