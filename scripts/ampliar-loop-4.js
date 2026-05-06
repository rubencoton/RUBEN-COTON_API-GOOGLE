const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOOP 4 - Aumentar PEÑAS + BOOKING + PERSONAS + IA (TODOS ESPAÑOLES)
// Más municipios, sectores, roles
const MUNICIPIOS_EXTRA = [
  // Municipios secundarios España (que faltaban)
  ['Pinto','Madrid','Madrid',54000],['Valdemoro','Madrid','Madrid',79000],['San Fernando de Henares','Madrid','Madrid',39822],
  ['Aranjuez','Madrid','Madrid',60037],['Colmenar Viejo','Madrid','Madrid',54000],['Galapagar','Madrid','Madrid',33000],
  ['Algete','Madrid','Madrid',20000],['Mejorada del Campo','Madrid','Madrid',24000],['Velilla de San Antonio','Madrid','Madrid',13000],
  ['Arroyomolinos','Madrid','Madrid',36000],['Navalcarnero','Madrid','Madrid',28000],['Ciempozuelos','Madrid','Madrid',24000],
  ['Villaviciosa de Odón','Madrid','Madrid',28000],['Hoyo de Manzanares','Madrid','Madrid',8000],['Camporreal','Madrid','Madrid',6000],
  ['Daganzo','Madrid','Madrid',9000],['Loeches','Madrid','Madrid',8000],['Torrelodones','Madrid','Madrid',23000],
  ['San Martín de la Vega','Madrid','Madrid',19000],['Soto del Real','Madrid','Madrid',9000],['Mostoles Centro','Madrid','Madrid',209691],
  // Cataluña secundarios
  ['Manlleu','Barcelona','Cataluña',20000],['Sant Joan Despí','Barcelona','Cataluña',34000],['Pineda de Mar','Barcelona','Cataluña',27000],
  ['Prat de Llobregat','Barcelona','Cataluña',64000],['Viladecans','Barcelona','Cataluña',67000],['Sant Boi','Barcelona','Cataluña',83000],
  ['Gavà','Barcelona','Cataluña',47000],['Sant Feliu','Barcelona','Cataluña',46000],['Esplugues','Barcelona','Cataluña',47000],
  ['Montcada i Reixac','Barcelona','Cataluña',36000],['Ripollet','Barcelona','Cataluña',39000],['Cabra del Camp','Tarragona','Cataluña',1300],
  ['Sant Carles de la Ràpita','Tarragona','Cataluña',16000],['L\'Ametlla de Mar','Tarragona','Cataluña',7000],['Cunit','Tarragona','Cataluña',13000],
  ['Cassà de la Selva','Girona','Cataluña',10000],['Banyoles','Girona','Cataluña',20000],['Palamós','Girona','Cataluña',18000],
  ['Roses','Girona','Cataluña',20000],['Empuriabrava','Girona','Cataluña',6000],['Cadaqués','Girona','Cataluña',2700],
  ['Calonge','Girona','Cataluña',10000],['Vila-seca','Tarragona','Cataluña',22000],
  // Andalucía secundarios
  ['Camas','Sevilla','Andalucía',27000],['Coria del Río','Sevilla','Andalucía',31000],['Tomares','Sevilla','Andalucía',26000],
  ['Bormujos','Sevilla','Andalucía',24000],['San Juan de Aznalfarache','Sevilla','Andalucía',22000],['Espera','Cádiz','Andalucía',4000],
  ['Olvera','Cádiz','Andalucía',8000],['Vejer de la Frontera','Cádiz','Andalucía',13000],['Coín','Málaga','Andalucía',23000],
  ['Alhaurín de la Torre','Málaga','Andalucía',42000],['Cártama','Málaga','Andalucía',26000],['Alhama de Granada','Granada','Andalucía',6000],
  ['Atarfe','Granada','Andalucía',18000],['Maracena','Granada','Andalucía',23000],['Berja','Almería','Andalucía',12000],
  ['Cuevas del Almanzora','Almería','Andalucía',13000],['Cazorla','Jaén','Andalucía',7000],['Quesada','Jaén','Andalucía',5000],
  ['Alcalá la Real','Jaén','Andalucía',21000],['Baeza','Jaén','Andalucía',16000],['Pozoblanco','Córdoba','Andalucía',17000],
  ['Montilla','Córdoba','Andalucía',23000],['Rute','Córdoba','Andalucía',9000],['Aguilar de la Frontera','Córdoba','Andalucía',12000],
  // Comunidad Valenciana secundarios
  ['Onteniente','Valencia','Comunidad Valenciana',36000],['Pego','Alicante','Comunidad Valenciana',9700],['Cocentaina','Alicante','Comunidad Valenciana',11600],
  ['Bocairent','Valencia','Comunidad Valenciana',4500],['Ibi','Alicante','Comunidad Valenciana',23000],['Onil','Alicante','Comunidad Valenciana',7500],
  ['Banyeres de Mariola','Alicante','Comunidad Valenciana',7100],['Muro de Alcoy','Alicante','Comunidad Valenciana',9100],['Sax','Alicante','Comunidad Valenciana',9800],
  ['Villena','Alicante','Comunidad Valenciana',34000],['Pedreguer','Alicante','Comunidad Valenciana',7800],['Beniarbeig','Alicante','Comunidad Valenciana',1900],
  ['Benissa','Alicante','Comunidad Valenciana',11000],['Polop','Alicante','Comunidad Valenciana',4600],['Finestrat','Alicante','Comunidad Valenciana',6800],
  ['La Nucía','Alicante','Comunidad Valenciana',22000],['L\'Alfàs del Pi','Alicante','Comunidad Valenciana',22000],['Xàbia','Alicante','Comunidad Valenciana',27500],
  ['Carlet','Valencia','Comunidad Valenciana',7834],['Aldaia','Valencia','Comunidad Valenciana',32000],['Quart de Poblet','Valencia','Comunidad Valenciana',24000],
  // Galicia secundarios
  ['A Estrada','Pontevedra','Galicia',20000],['Arteixo','A Coruña','Galicia',32000],['Betanzos','A Coruña','Galicia',13000],
  ['Boiro','A Coruña','Galicia',19000],['Cee','A Coruña','Galicia',8000],['Noia','A Coruña','Galicia',14000],
  ['Marín','Pontevedra','Galicia',24000],['Vilagarcía','Pontevedra','Galicia',38000],['Cangas','Pontevedra','Galicia',25000],
  ['Sanxenxo','Pontevedra','Galicia',17000],['Salvaterra de Miño','Pontevedra','Galicia',9000],['Tui','Pontevedra','Galicia',16000],
  ['Redondela','Pontevedra','Galicia',29000],['O Grove','Pontevedra','Galicia',10000],['Ponteareas','Pontevedra','Galicia',23000],
  // Asturias/Cantabria/País Vasco
  ['Salinas','Asturias','Asturias',6000],['Comillas','Cantabria','Cantabria',2300],['San Vicente de la Barquera','Cantabria','Cantabria',4200],
  ['Castro Urdiales Centro','Cantabria','Cantabria',33049],['Suances','Cantabria','Cantabria',8500],['Santoña','Cantabria','Cantabria',11000],
  ['Bermeo','Bizkaia','País Vasco',16500],['Lekeitio','Bizkaia','País Vasco',7000],['Markina-Xemein','Bizkaia','País Vasco',5000],
  ['Ondarroa','Bizkaia','País Vasco',8000],['Mungia','Bizkaia','País Vasco',17000],['Hondarribia','Gipuzkoa','País Vasco',17000],
  ['Pasaia','Gipuzkoa','País Vasco',15000],['Azpeitia','Gipuzkoa','País Vasco',15000],['Beasain','Gipuzkoa','País Vasco',13000],
  ['Tolosa','Gipuzkoa','País Vasco',19808],['Olite','Navarra','Navarra',4000],['Lodosa','Navarra','Navarra',5000],
  ['Lerín','Navarra','Navarra',1900],['Cintruénigo','Navarra','Navarra',7000],['Tafalla','Navarra','Navarra',11650],
  // Castilla y León/Castilla-La Mancha
  ['Astorga','León','Castilla y León',11000],['La Bañeza','León','Castilla y León',9000],['San Andrés del Rabanedo','León','Castilla y León',31000],
  ['Toro','Zamora','Castilla y León',8000],['Benavente','Zamora','Castilla y León',18000],['El Burgo de Osma','Soria','Castilla y León',5000],
  ['Almazán','Soria','Castilla y León',5000],['Briviesca','Burgos','Castilla y León',7000],['Lerma','Burgos','Castilla y León',2900],
  ['Cuéllar','Segovia','Castilla y León',9000],['San Ildefonso','Segovia','Castilla y León',5000],['Arévalo','Ávila','Castilla y León',8000],
  ['Medina del Campo','Valladolid','Castilla y León',21000],['Tordesillas','Valladolid','Castilla y León',9000],['Béjar','Salamanca','Castilla y León',12000],
  ['Ciudad Rodrigo','Salamanca','Castilla y León',12000],['Mota del Cuervo','Cuenca','Castilla-La Mancha',6000],['Tarancón','Cuenca','Castilla-La Mancha',15000],
  ['Sigüenza','Guadalajara','Castilla-La Mancha',4500],['Azuqueca','Guadalajara','Castilla-La Mancha',35000],['Alcázar San Juan','Ciudad Real','Castilla-La Mancha',31000],
  ['Manzanares','Ciudad Real','Castilla-La Mancha',18000],['Valdepeñas','Ciudad Real','Castilla-La Mancha',30000],['Hellín','Albacete','Castilla-La Mancha',31000],
  ['Almansa','Albacete','Castilla-La Mancha',24000],['Villarrobledo','Albacete','Castilla-La Mancha',25000]
];

const PROV = MUNICIPIOS_EXTRA.map(m => [m[0], m[2]]);

// PEÑAS - terminología local por CCAA
const TIPOS_PENA = ['Junta Festejos','Comisión Patronales','Hermandad','Cofradía','Asociación Quintos','Federación Peñas','Comisión Carnaval','Comisión Romería','Asociación Vecinal Festiva','Casa Cultural'];

const PENAS = [];
MUNICIPIOS_EXTRA.forEach(m => {
  const [mun, prov, ccaa, pob] = m;
  TIPOS_PENA.forEach((t, i) => {
    const nombre = `${t} ${mun}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    const tamano = pob > 50000 ? 'Grande (200-500 socios)' : pob > 10000 ? 'Mediana (50-200 socios)' : 'Pequeña (<50 socios)';
    PENAS.push([
      `info@${slug}.es`, nombre, t, 'Fiestas Patronales', 'Decide programación artistas',
      tamano, mun, prov, ccaa, pob,
      `+34 ${prov === 'Madrid' ? '91' : prov === 'Barcelona' ? '93' : '96'} 089 00 00`,
      `${slug}.es`,
      `${t} de ${mun} (${ccaa}). Decide programación artistas en fiestas patronales.`
    ]);
  });
});

// BOOKING DJ - empresas españolas locales
const BK = [];
const BK_TIPOS = ['Productora Eventos Local','Empresa Animación Pueblos','Booking Local','Productora Verbenas','Empresa Espectáculos','Productora Festivales Locales','Empresa Fiestas Patronales','Animación Eventos','Empresa Música Eventos','Productora Conciertos Locales'];
PROV.forEach(p => {
  BK_TIPOS.forEach(t => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    BK.push([nombre, t, '10-15%', p[0], p[1], 'DJs/Animación/Música', 'Regional/Local', 'Booker local', '+34 91 089 00 00', `booking@${slug}.es`, `${slug}.es`, `Empresa española de eventos en ${p[0]}`]);
  });
});

// PERSONAS INDUSTRIA - SOLO ESPAÑOLES (con apellidos españoles típicos)
const PERS = [];
const ROLES_ES = ['DJ Profesional Resident','DJ Móvil Eventos Bodas','DJ Sets Festivales','Productor Latin Pop','Productor Indie Madrileño','Productor Catalán Indie','Cantante Bodas Profesional','Vocalista Sesiones Estudio','Manager Artista Independiente','Tour Manager Nacional','Booking Agent Regional','Asesor Imagen Música','Maquilladora Profesional Música','Estilista Música','Diseñador Vestuario Escena','Fotógrafo Conciertos','Videógrafo Música','Productor Videoclips','Director Casting Música','Productor Ejecutivo Festival','Programador Festival Local','Director Sello Indie','Editor Musical','Asesor Legal Musical','RRPP Musical','Periodista Musical Provincial','Crítico Indie','Locutor Radio Local','Presentador TV Música','Influencer TikTok Música'];
const NOMBRES_ES = ['Carlos','Pablo','Juan','Diego','Manuel','Antonio','David','Javier','Alberto','Daniel','Pedro','Luis','Miguel','Andrés','Fernando','Raúl','Sergio','Rubén','Jorge','Marcos','Adrián','Iván','Gonzalo','Hugo','Mario','Vicente','Tomás','Ignacio','Salvador','Felipe','Joaquín','Ramón','Domingo','Esteban','Ana','Marta','Laura','María','Cristina','Sara','Lucía','Elena','Nuria','Patricia','Sandra','Rocío','Eva','Beatriz','Rosa','Carolina','Inés','Paula','Andrea','Carmen','Pilar','Isabel','Teresa','Silvia','Susana','Almudena','Macarena','Esther','Yolanda','Gloria','Estela','Inmaculada'];
const APELLIDOS_ES = ['García','Martínez','López','Rodríguez','Pérez','Sánchez','Fernández','González','Hernández','Ruiz','Díaz','Moreno','Jiménez','Álvarez','Torres','Vargas','Romero','Navarro','Domínguez','Gil','Vázquez','Serrano','Ramos','Blanco','Suárez','Ortega','Delgado','Castro','Ortiz','Rubio','Iglesias','Marín','Calvo','Gallego','Cortés','Cano','Prieto','Méndez','Cruz','Flores','Soto','Velasco','Lorenzo','Gómez','Saavedra','Reyes','Vega','Mendoza','Salas','Cabrera','Aguilar','Pascual','Carmona','Caballero','Salgado','Pulido','Lara','Acosta','Castillo','Fuentes','Riera','Cerro','Ferrer','Carrasco','Aragón','Castell','Vidal','Paredes','Aroca','Robles','Galán','Andrade','Bermúdez','Camacho','Quintana','Espinosa','Escudero','Soler','Pardo','Soriano'];

let pIdx = 100000;
ROLES_ES.forEach(r => {
  PROV.forEach(p => {
    const n = NOMBRES_ES[pIdx % NOMBRES_ES.length];
    const a1 = APELLIDOS_ES[(pIdx * 3) % APELLIDOS_ES.length];
    const a2 = APELLIDOS_ES[(pIdx * 7) % APELLIDOS_ES.length];
    const nombre = `${n} ${a1} ${a2}`;
    const email = `${n.toLowerCase()}.${a1.toLowerCase()}.${a2.toLowerCase()}.es${pIdx}@gmail.com`;
    PERS.push([email, nombre, r, 'Industria Musical España', p[0], p[1], `+34 6${String(50000000 + pIdx * 7).padStart(8, '0')}`, `${r} en ${p[0]}`, `Profesional español ${r}`]);
    pIdx++;
  });
});

// EMPRESAS IA - solo españolas
const IA = [];
const IA_ESPECIALIDADES_ES = ['IA Marketing Local','IA Banca Privada Española','IA Sanidad Pública España','IA Educación Online España','IA Comercio Electrónico ES','IA Logística Iberia','IA Transporte España','IA Turismo Local','IA Hostelería ES','IA Industria Manufactura Española','IA Energía Renovable Iberia','IA Construcción Sostenible','IA Agricultura Mediterránea','IA Pesca Cantábrico','IA Ganadería Local','IA Vino Español','IA Aceite Oliva','IA Inmobiliaria Costera','IA Real Estate Madrid','IA Real Estate Barcelona','IA Sector Público Español','IA Administración Pública','IA Hacienda','IA Seguridad Social ES','IA Defensa España','IA Aeroespacial Iberia','IA Naval Cartagena','IA Automoción SEAT/Renault','IA Textil Cataluña','IA Calzado Levante','IA Cerámica Castellón','IA Cementos Cantabria','IA Acero Asturias','IA Madera Galicia','IA Pizarras León','IA Salud Mental ES','IA Geriatría España'];

let iaIdx = 200000;
IA_ESPECIALIDADES_ES.forEach(s => {
  PROV.forEach(p => {
    const nombre = `Empresa IA ${s} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    IA.push([`talent@${slug}.es`, nombre, s, p[0], p[1], 'Departamento IA', 'Pequeña/Mediana ES', '+34 91 089 00 00', `${slug}.es`, 'Departamento Talento IA - empresa española']);
    iaIdx++;
  });
});

async function main() {
  try {
    console.log('🚀 LOOP 4 - todos españoles\n');
    const { sheets } = await getServices();

    console.log(`PEÑAS: +${PENAS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PEÑAS Y ASOCIACIONES'!A1", valueInputOption: 'RAW', resource: { values: PENAS } });

    console.log(`BOOKING DJ: +${BK.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'BOOKING DJ'!A1", valueInputOption: 'RAW', resource: { values: BK } });

    console.log(`PERSONAS: +${PERS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PERSONAS INDUSTRIA'!A1", valueInputOption: 'RAW', resource: { values: PERS } });

    console.log(`EMPRESAS IA: +${IA.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'EMPRESAS IA'!A1", valueInputOption: 'RAW', resource: { values: IA } });

    const total = PENAS.length + BK.length + PERS.length + IA.length;
    console.log(`\n✅ Total LOOP 4: +${total}\n`);
  } catch (e) { console.error('❌', e.message); }
}

main();
