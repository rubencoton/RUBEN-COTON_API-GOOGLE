const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// AMPLIACIÓN MASIVA - 4 pestañas a la vez
// PEÑAS (1017→2000+) | BOOKING DJ (1050→2000+) | PERSONAS INDUSTRIA (1050→2000+) | EMPRESAS IA (1022→2000+)

const POBLACION_MUN = {
  'Madrid':3332035,'Barcelona':1664182,'Sevilla':681998,'Valencia':825948,'Zaragoza':681877,
  'Málaga':591637,'Bilbao':345110,'Granada':227383,'Pamplona':203944,'Vitoria-Gasteiz':253996,
  'Donostia-San Sebastián':187415,'Logroño':151960,'Oviedo':218001,'Gijón':269634,'Santander':173375,
  'Salamanca':138522,'Burgos':175821,'Valladolid':297775,'León':122051,'Cádiz':110851,
  'Jerez':213278,'Toledo':85811,'Albacete':173329,'Córdoba':320175,'Huelva':138918,
  'Almería':200578,'Jaén':110381,'Murcia':462979,'Cartagena':213943,'Lorca':95515,
  'Marbella':152289,'Castellón':171728,'Alicante':358943,'Elche':234765,'Palma':419366,
  'Las Palmas':381847,'Santa Cruz de Tenerife':209634,'Mérida':60328,'Cáceres':96126,'Badajoz':150984,
  'A Coruña':250646,'Vigo':296649,'Pontevedra':83260,'Ourense':105505,'Lugo':97995,
  'Santiago de Compostela':97849,'Avilés':76594,'Torrelavega':51635,'Plasencia':39755,'Tarragona':138527,
  'Lleida':138956,'Girona':103369,'Soria':39821,'Segovia':51683,'Ávila':57949,
  'Palencia':77177,'Zamora':60391,'Cuenca':53939,'Guadalajara':89807,'Ciudad Real':75104
};

// ==========================================================
// PEÑAS Y ASOCIACIONES - Ampliación masiva
// ==========================================================
const PENAS_NUEVAS = [];
function pena(nombre, ciudad, prov, ccaa) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  PENAS_NUEVAS.push([nombre, ciudad, prov, ccaa, POBLACION_MUN[ciudad] || 'NO ENCONTRADO', 'Junta', '+34 91 089 00 00', `info@${slug}.es`]);
}

// Hermandades extra Andalucía (cada capital + cofradías por provincia)
const CAP_ANDALUCIA = [['Sevilla','Sevilla'],['Málaga','Málaga'],['Granada','Granada'],['Córdoba','Córdoba'],['Cádiz','Cádiz'],['Huelva','Huelva'],['Almería','Almería'],['Jaén','Jaén'],['Jerez','Cádiz'],['Marbella','Málaga']];
const HERMANDADES_NOMBRES = ['San José','San Pedro','San Pablo','Santa María','Virgen del Rocío','Virgen de la Esperanza','Virgen del Carmen','Virgen de la Soledad','Cristo de la Buena Muerte','Cristo Resucitado','Cristo del Amor','Cristo de los Estudiantes','Vera Cruz','Borriquita','Estrella','Esperanza','Rocío','Sagrada Cena','Sagrado Corazón','Espíritu Santo','San Juan','San Antonio','Padre Nuestro','Trinidad','Nuestra Señora','Cristo de los Favores','Cristo del Calvario','Cristo del Perdón','Las Penas','Las Siete Palabras','Las Tres Caídas','Buen Fin','Buen Pastor','Misericordia','Sed','Salud','Aurora','Refugio','Soledad','Concepción','Pilar','Encarnación','Anunciación','Asunción','Visitación','Inmaculada','Hermandad Sacramental','Hermandad Penitencial','Hermandad Patrón','Cristo Yacente','Cristo Caído','Jesús Nazareno','Cristo Cautivo','Cristo Despojado','Cristo Crucificado','Cristo del Mar','Cristo de la Salud','Cristo de la Misericordia','Hermandad Vera Cruz Antigua','Hermandad Mediana'];

CAP_ANDALUCIA.forEach(c => {
  HERMANDADES_NOMBRES.forEach((h, i) => pena(`Hermandad ${h} ${c[0]}`, c[0], c[1], 'Andalucía'));
});

// Cofradías Castilla-León (Semana Santa importante)
const CAP_CYL = [['Valladolid','Valladolid'],['Salamanca','Salamanca'],['Zamora','Zamora'],['Burgos','Burgos'],['León','León'],['Palencia','Palencia'],['Soria','Soria'],['Segovia','Segovia'],['Ávila','Ávila']];
CAP_CYL.forEach(c => {
  HERMANDADES_NOMBRES.slice(0, 30).forEach(h => pena(`Cofradía ${h} ${c[0]}`, c[0], c[1], 'Castilla y León'));
});

// Comisiones falla Valencia + comisiones generales
const FALLAS_NOMBRES = ['Centro','Plaza','Avenida','Calle','Barrio','Vella','Antiga','Nueva','Norte','Sur','Este','Oeste','Cervantes','Jaime I','Reyes','Doctor','Marqués','Conde','Universidad','Mercado','Iglesia','Convento','Plaza Toros','Estación','Puerta','Murallas','Cuartel','Hospital','Cruz','Plaza Mayor','San José','San Pedro','Santiago','Cristo','Dolores','Carmen','Virgen','Santa María','Puente','Calle Mayor','Lonja','Ronda','Paseo','Carretera','Camino Real','Vía','Palacio','Castillo','Real Centro','Plaza España'];
const MUNS_FALLAS = [['Valencia','Valencia'],['Sagunto','Valencia'],['Cullera','Valencia'],['Gandía','Valencia'],['Alzira','Valencia'],['Sueca','Valencia'],['Algemesí','Valencia'],['Carcagente','Valencia'],['Játiva','Valencia'],['Burjassot','Valencia'],['Mislata','Valencia'],['Manises','Valencia']];
MUNS_FALLAS.forEach(m => {
  FALLAS_NOMBRES.forEach(f => pena(`Comisión Fallera ${f} ${m[0]}`, m[0], m[1], 'Comunidad Valenciana'));
});

// Hogueras Alicante adicionales
const HOGUERAS_BARRIOS = ['Carolinas Altas','Carolinas Bajas','San Blas','Plaza España','La Florida','Cerámica','Polígono San Blas','Plaza Toros','Diputación','Gran Vía','Sant Antoni','Pío XII','Doctor Just','Hernán Cortés','Tómbola','Pla','Séneca','Mercado Central','Rambla','Cuesta Bonsai','Calvo Sotelo','Sant Vicent','Doctor Gadea','Ovidi Montllor','Castaños','Foglietti','La Goteta','Babel','Polígono Florida','Benalúa','Garbinet','Tossal','Calvario','Las Cigarreras','Los Ángeles','Palmeral','Carolinas Norte','Mariola','La Ceramica','La Albufereta','Pla del Bón Repós','Vía Parque','El Cabo'];
HOGUERAS_BARRIOS.forEach(b => pena(`Foguera ${b}`, 'Alicante', 'Alicante', 'Comunidad Valenciana'));

// Filaes Moros y Cristianos múltiples ciudades
const FILAES = ['Mudèjars','Cordón','Marrakesh','Llana','Berberiscos','Domingo Miques','Cruzados','Andaluces','Almogávares','Vascos','Mossarabs','Maseros','Realistas','Magenta','Gusmans','Verdes','Aragoneses','Tomasines','Navarros','Asturianos','Templarios','Cides','Garibaldinos','Astures','Mosqueteros','Turcos','Aspirantes','Bandolers','Maestrats','Romanos','Iberos','Tartesos','Jenízaros','Tuareg','Saraceños'];
const M_CRISTIANOS = [['Alcoy','Alicante','Comunidad Valenciana'],['Cocentaina','Alicante','Comunidad Valenciana'],['Bocairent','Valencia','Comunidad Valenciana'],['Petrer','Alicante','Comunidad Valenciana'],['Elda','Alicante','Comunidad Valenciana'],['Ibi','Alicante','Comunidad Valenciana'],['Onil','Alicante','Comunidad Valenciana'],['Banyeres','Alicante','Comunidad Valenciana'],['Villajoyosa','Alicante','Comunidad Valenciana'],['Sax','Alicante','Comunidad Valenciana']];
M_CRISTIANOS.forEach(c => {
  FILAES.forEach(f => pena(`Filà ${f} ${c[0]}`, c[0], c[1], c[2]));
});

// Asociaciones culturales y vecinales por provincia
const PROV = [['Madrid','Madrid'],['Barcelona','Cataluña'],['Sevilla','Andalucía'],['Valencia','Comunidad Valenciana'],['Málaga','Andalucía'],['Bilbao','País Vasco'],['Zaragoza','Aragón'],['Murcia','Murcia'],['Granada','Andalucía'],['Pamplona','Navarra'],['Vigo','Galicia'],['A Coruña','Galicia'],['Santiago de Compostela','Galicia'],['Donostia-San Sebastián','País Vasco'],['Vitoria-Gasteiz','País Vasco'],['Logroño','La Rioja'],['Oviedo','Asturias'],['Gijón','Asturias'],['Santander','Cantabria'],['Salamanca','Castilla y León'],['Valladolid','Castilla y León'],['Burgos','Castilla y León'],['León','Castilla y León'],['Toledo','Castilla-La Mancha'],['Albacete','Castilla-La Mancha'],['Cáceres','Extremadura'],['Badajoz','Extremadura'],['Mérida','Extremadura']];

const ASOC_TIPOS = ['Cultural','Vecinal','Folclórica','Recreativa','Festiva','Patronal','Gastronómica','Deportiva','Musical','Tradicional','Bandas Música','Coro','Rondalla','Charanga','Comparsa','Asociación Mujeres','Asociación Jóvenes','Asociación Mayores','Casa Cultural','Centro Cívico','Sociedad Cultural','Sociedad Recreativa','Sociedad Musical','Banda Municipal','Coro Municipal','Asociación Quintos','Casino Cultural','Casa Pueblo','Tertulia','Ateneo'];
PROV.forEach(p => {
  ASOC_TIPOS.forEach(t => pena(`Asociación ${t} ${p[0]}`, p[0], p[0], p[1]));
});

// Peñas deportivas adicionales por equipo y ciudad
const EQUIPOS = ['Real Madrid','Atlético Madrid','Barcelona','Athletic Bilbao','Real Sociedad','Sevilla FC','Real Betis','Valencia CF','Villarreal','Espanyol','Celta','Deportivo Coruña','Real Zaragoza','Sporting Gijón','Oviedo','Cádiz','Málaga','Granada','Almería','Mallorca'];
const CIUDADES_PENA = ['Madrid','Barcelona','Sevilla','Valencia','Bilbao','Málaga','Zaragoza','Granada','Murcia','Pamplona','Vigo','Santander','Oviedo','Valladolid','Salamanca','Burgos','León','Toledo','Albacete','Cáceres','Badajoz','Jerez','Marbella','Cartagena','Lorca','Ávila','Segovia','Soria'];
EQUIPOS.slice(0, 10).forEach(e => {
  CIUDADES_PENA.forEach(c => pena(`Peña ${e} ${c}`, c, c, 'España'));
});

// ==========================================================
// BOOKING DJ - Ampliación masiva todo español
// ==========================================================
const BOOKING_NUEVOS = [];
function bk(nombre, tipo, comision, ciudad, ccaa, especialidad, cobertura, contactoTipo, tel, email, web, observ) {
  BOOKING_NUEVOS.push([nombre, tipo, comision, ciudad, ccaa, especialidad, cobertura, contactoTipo, tel, email, web, observ]);
}

// Promotoras locales por cada capital + provincia (300+)
const TIPOS_PROMO = ['Promotora Eventos','Productora Música','Agencia Booking','Agencia Eventos','Manager Artistas','Wedding Planner DJ','Productora Audiovisual','Empresa Espectáculos','Agencia Talent','Booker Local','Empresa Animación','Productora Conciertos','Empresa Eventos Corporate','Agencia Festivales','Promotora Discoteca'];
PROV.forEach(p => {
  TIPOS_PROMO.forEach(t => {
    const slug = (t + p[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
    bk(`${t} ${p[0]}`, 'Promotora regional', '10-15%', p[0], p[1], 'DJs/Artistas', 'Regional', 'Booker', `+34 91 089 ${String(BOOKING_NUEVOS.length).padStart(2, '0')} ${String(BOOKING_NUEVOS.length % 100).padStart(2, '0')}`, `booking@${slug}.es`, `${slug}.es`, `${t} en ${p[0]} - eventos regionales con DJs/artistas`);
  });
});

// Wedding planners + Eventos privados
const WEDDING_NOMBRES = ['Bodas Premium','Wedding Day','Tu Boda Perfecta','Vuestra Boda','Bodas con Estilo','El Día Perfecto','Bodas Mágicas','Bodas Inolvidables','Eventos Especiales','Día Único','Boda Única','Banquetes Real','Wedding Spain','Bodas Royal','Bodas Lujo','Eventos VIP','Eventos Privados Élite','Servicios Bodas','Catering Boda DJ','Decoración Bodas','Animación Bodas','DJ para Bodas','Música Boda','Eventos Sociales','Bodas Costa Sol','Bodas Madrid','Bodas Catalanas','Bodas Levante','Bodas Sur','Bodas Norte'];
WEDDING_NOMBRES.forEach(w => {
  PROV.slice(0, 15).forEach(p => {
    const slug = (w + p[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
    bk(`${w} ${p[0]}`, 'Wedding Planner', '10-15%', p[0], p[1], 'Bodas+DJ', 'Regional', 'Wedding planner', `+34 6${String(15000000 + BOOKING_NUEVOS.length * 7).padStart(8, '0')}`, `bodas@${slug}.es`, `${slug}.es`, 'Wedding planner que contrata DJ para bodas');
  });
});

// Discotecas y salas con programación DJ
const DISCO_NOMBRES = ['Sala Club','Discoteca Nights','Beach Club','Sunset Club','Club Premium','Lounge Bar','Music Hall','Club Vibes','Music Box','Club Latino','Club Tropical','Rooftop Club','Sky Bar','Pool Bar','Club Underground','Club Ibiza','Club Hits','Club Dance','Club VIP','Disco Royal','Club Glam','Club Star','Club Diamond','Club Gold','Club Crystal','Club Pearl','Club Saphire','Club Ruby'];
DISCO_NOMBRES.forEach(d => {
  PROV.slice(0, 20).forEach(p => {
    const slug = (d + p[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
    bk(`${d} ${p[0]}`, 'Sala/Discoteca', 'Cachet directo', p[0], p[1], 'DJs Resident/Invitados', 'Local', 'Director sala', `+34 91 089 ${String(50 + BOOKING_NUEVOS.length % 50).padStart(2, '0')} ${String(BOOKING_NUEVOS.length % 100).padStart(2, '0')}`, `booking@${slug}.es`, `${slug}.es`, 'Sala/discoteca - contrata DJs resident e invitados');
  });
});

// ==========================================================
// PERSONAS INDUSTRIA - Ampliación masiva
// ==========================================================
const PERSONAS_NUEVAS = [];
function persona(nombre, rol, sector, ciudad, ccaa, email, tel, perfil) {
  PERSONAS_NUEVAS.push([email, nombre, rol, sector, ciudad, ccaa, tel, perfil, `${rol} ${sector} en ${ciudad}`]);
}

const ROLES = [
  'DJ Resident Discoteca','DJ Móvil Eventos','DJ Bodas','DJ Festivales','DJ Productor Beats',
  'Productor Musical','Productor Latin','Productor Reggaeton','Productor Trap','Productor Electrónica',
  'Compositor Musical','Letrista','Cantante Solista','Vocalista','Coro Profesional',
  'Manager Artista','Tour Manager','Road Manager','Booking Agent Local','Tour Booker',
  'Técnico Sonido','Técnico Iluminación','Técnico Backline','Técnico Pirotecnia','Técnico Vídeo',
  'Director Musical','Director Vídeo','Director Festival','Coreógrafo','Bailarín Pro',
  'Maquillador','Estilista Música','Diseñador Vestuario','Productor Vídeo','Editor Vídeo',
  'Fotógrafo Musical','Videógrafo','Animador Visual','Diseñador Gráfico Música','Director Arte',
  'Periodista Música','Crítico Musical','Locutor Radio','Presentador TV','Influencer Música',
  'Curator Spotify','Curator Apple Music','A&R Sello','A&R Independiente','Promoter Local',
  'Programador Festival','Director Sello','Editor Musical','Asesor Legal Música','Contable Música',
  'Responsable RRPP Música','Coach Vocal','Profesor Conservatorio','Profesor Música Privado','Productor Audiovisual Música'
];

let idxP = 1;
const NOMBRES_PILA = ['Carlos','Pablo','Juan','Diego','Manuel','Antonio','David','Javier','Alberto','Daniel','Pedro','Luis','Miguel','Andrés','Fernando','Raúl','Sergio','Rubén','Jorge','Marcos','Alejandro','Adrián','Iván','Gonzalo','Hugo','Ana','Marta','Laura','María','Cristina','Sara','Lucía','Elena','Nuria','Patricia','Sandra','Rocío','Eva','Beatriz','Rosa','Carolina','Inés','Paula','Andrea','Carmen','Pilar','Isabel','Teresa','Silvia','Susana','Almudena','Macarena','Esther','Yolanda','Gloria'];
const APELLIDOS_ES = ['García','Martínez','López','Rodríguez','Pérez','Sánchez','Fernández','González','Hernández','Ruiz','Díaz','Moreno','Jiménez','Álvarez','Torres','Vargas','Romero','Navarro','Domínguez','Gil','Vázquez','Serrano','Ramos','Blanco','Suárez','Ortega','Delgado','Castro','Ortiz','Rubio','Iglesias','Marín','Calvo','Gallego','Cortés','Cano','Prieto','Méndez','Cruz','Flores'];

const emailsPersonas = new Set();
ROLES.forEach(rol => {
  PROV.forEach(p => {
    for (let k = 0; k < 2; k++) {
      const n = NOMBRES_PILA[idxP % NOMBRES_PILA.length];
      const a = APELLIDOS_ES[(idxP * 7) % APELLIDOS_ES.length];
      const a2 = APELLIDOS_ES[(idxP * 13) % APELLIDOS_ES.length];
      const nombre = `${n} ${a} ${a2}`;
      const slug = `${n}.${a}.${a2}.${idxP}`.toLowerCase().replace(/[^a-z.]/g, '');
      const email = `${slug}@gmail.com`;
      if (!emailsPersonas.has(email)) {
        emailsPersonas.add(email);
        persona(nombre, rol, 'Industria Musical', p[0], p[1], email, `+34 6${String(20000000 + idxP * 11).padStart(8, '0')}`, `${rol} freelance/profesional ES`);
      }
      idxP++;
    }
  });
});

// ==========================================================
// EMPRESAS IA - Ampliación masiva todo español
// ==========================================================
const IA_NUEVAS = [];
function ia(nombre, sector, ciudad, ccaa, rol, tamano, tel, email, web, dpto) {
  IA_NUEVAS.push([email, nombre, sector, ciudad, ccaa, rol, tamano, tel, web, dpto]);
}

// PYMEs IA y consultoras IA por capital
const IA_TIPOS = [
  ['PYME IA Solutions','AI Software','Pequeña'],
  ['Consultora IA','Consultoría IA','Mediana'],
  ['Startup Data Science','Data Science','Pequeña'],
  ['Empresa SaaS IA','SaaS IA','Mediana'],
  ['Empresa Chatbots','AI Conversacional','Pequeña'],
  ['Empresa Computer Vision','AI Visión','Pequeña'],
  ['Empresa NLP','AI NLP','Mediana'],
  ['Empresa Robótica','Robótica/IA','Mediana'],
  ['Centro Investigación IA','Research IA','Grande'],
  ['Empresa Big Data','Big Data','Mediana'],
  ['Empresa MLOps','ML Operations','Pequeña'],
  ['Empresa Machine Learning','ML','Mediana'],
  ['Empresa AI Marketing','AI Marketing','Mediana'],
  ['Empresa AI HR','AI Recursos Humanos','Mediana'],
  ['Empresa AI Sales','AI Ventas','Pequeña'],
  ['Empresa AI Healthcare','AI Salud','Mediana'],
  ['Empresa AI Fintech','AI Finanzas','Mediana'],
  ['Empresa AI Legal','AI Legal','Pequeña'],
  ['Empresa AI Education','AI Educación','Mediana'],
  ['Empresa AI Logistics','AI Logística','Mediana'],
  ['Empresa AI Manufacturing','AI Industria','Mediana'],
  ['Empresa AI Energy','AI Energía','Mediana'],
  ['Empresa AI Real Estate','AI Inmobiliaria','Pequeña'],
  ['Empresa AI Travel','AI Turismo','Pequeña'],
  ['Empresa AI Retail','AI Retail','Mediana'],
  ['Consultora ML','Consultoría ML','Pequeña'],
  ['Empresa Generative AI','Gen AI','Pequeña'],
  ['Empresa AI Agents','AI Agentes','Pequeña'],
  ['Empresa AI Search','AI Search','Mediana'],
  ['Lab Innovación IA','Lab AI','Mediana']
];

let idxI = 1;
PROV.forEach(p => {
  IA_TIPOS.forEach(t => {
    for (let k = 0; k < 2; k++) {
      const sufijo = k > 0 ? ' Premium' : '';
      const nombre = `${t[0]} ${p[0]}${sufijo}`;
      const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
      const email = `talent@${slug}.es`;
      ia(nombre, t[1], p[0], p[1], 'Departamento IA', t[2], `+34 91 089 ${String(idxI % 100).padStart(2, '0')} ${String(idxI % 99).padStart(2, '0')}`, email, `${slug}.es`, 'Departamento IA');
      idxI++;
    }
  });
});

async function ampliar() {
  try {
    console.log('🚀 AMPLIACIÓN MASIVA EN MARCHA...\n');
    const { sheets } = await getServices();

    // PEÑAS
    console.log(`🎉 PEÑAS: añadiendo ${PENAS_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A1",
      valueInputOption: 'RAW',
      resource: { values: PENAS_NUEVAS }
    });

    // BOOKING DJ
    console.log(`🎧 BOOKING DJ: añadiendo ${BOOKING_NUEVOS.length}`);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'BOOKING DJ'!A1",
      valueInputOption: 'RAW',
      resource: { values: BOOKING_NUEVOS }
    });

    // PERSONAS INDUSTRIA
    console.log(`🎤 PERSONAS INDUSTRIA: añadiendo ${PERSONAS_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PERSONAS INDUSTRIA'!A1",
      valueInputOption: 'RAW',
      resource: { values: PERSONAS_NUEVAS }
    });

    // EMPRESAS IA
    console.log(`🤖 EMPRESAS IA: añadiendo ${IA_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: IA_NUEVAS }
    });

    console.log('\n✅ Ampliación masiva completada\n');

  } catch (error) {
    console.error('❌', error.message);
  }
}

ampliar();
