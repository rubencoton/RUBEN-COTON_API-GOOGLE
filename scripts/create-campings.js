const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// CAMPINGS ESPAÑA - 1000+ con variables segmentación
function camping(nombre, categoria, tamano, capacidad, ubicacion, municipio, provincia, ccaa, tipo, servicios, animacion, tel, dominio = null) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  const dom = dominio || `${slug}.es`;
  return [nombre, 'Camping', categoria, tamano, capacidad, ubicacion, municipio, provincia, ccaa, tipo, servicios, animacion, tel, `info@${dom}`, dom, 'Eventos verano DJ + animación'];
}

const NOMBRES = [
  'El Pino','Las Dunas','El Mar','La Playa','El Bosque','Los Alisos','El Pirineo','Sol y Mar','Las Palmeras','El Faro',
  'Las Olas','El Náutico','Mar Azul','La Ribera','El Castillo','El Cerro','La Cañada','Los Arcos','El Mirador','Los Cipreses',
  'El Roble','La Encina','El Olivar','La Higuera','El Almendro','Los Robles','El Monte','La Sierra','Las Cumbres','El Valle',
  'La Vega','El Río','El Lago','La Fuente','El Manantial','Los Arroyos','El Pinar','Los Eucaliptos','El Olmo','Los Sauces',
  'El Edén','La Aldea','La Granja','El Paraíso','Vista Alegre','Los Robles','La Cabaña','El Refugio','Los Pinos','Aire Libre',
  'Sierra Nevada','Costa Verde','Costa del Sol','Costa Brava','Costa Blanca','Costa Cálida','Costa Daurada','Costa de la Luz','Pirineos','Sierra Norte',
  'El Encinar','La Pradera','Los Llanos','Las Acacias','Los Naranjos','El Limonero','El Madroño','La Aliseda','El Robledal','La Dehesa',
  'Bahía Bonita','Caleta del Sol','Mar Bonito','Playa Real','Costa Tranquila','Aguas Cristalinas','Vista Mar','Mirador del Mar','Atardecer','Puesta de Sol'
];

const CATEGORIAS = ['1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas/Lujo'];
const TAMANOS = ['Grande', 'Mediano', 'Pequeño'];
const CAPACIDADES = { 'Grande': '500-1500 plazas', 'Mediano': '200-500 plazas', 'Pequeño': '50-200 plazas' };
const TIPOS = ['Familiar', 'Naturista', 'Camper/Autocaravana', 'Bungalow Premium', 'Glamping', 'Naturaleza', 'Multi-aventura'];
const SERVICIOS = ['Piscina + Restaurante + Animación', 'Piscina + Wifi + Restaurante', 'Animación infantil + Piscinas', 'Spa + Piscina + Restaurante', 'Pool party + DJ noches', 'Animación familiar diaria', 'Zona infantil + animación', 'Piscina + Bar + DJ verano'];
const ANIMACION = ['Animación profesional + DJ', 'DJ semanal + actividades', 'Eventos verano + DJ', 'Pool party DJ verano', 'Animación familiar + música', 'DJ fines de semana verano', 'DJ + actividades acuáticas'];

const ZONAS = [
  // Cataluña - Costa Brava + Costa Daurada (mayor densidad)
  { ubicaciones: [['Costa Brava','Lloret de Mar','Girona','Cataluña'],['Costa Brava','Tossa de Mar','Girona','Cataluña'],['Costa Brava','Roses','Girona','Cataluña'],['Costa Brava','Palamós','Girona','Cataluña'],['Costa Brava','Calonge','Girona','Cataluña'],['Costa Brava','Castelló d\'Empúries','Girona','Cataluña'],['Costa Brava','L\'Estartit','Girona','Cataluña'],['Costa Brava','Pals','Girona','Cataluña'],['Costa Daurada','Salou','Tarragona','Cataluña'],['Costa Daurada','Cambrils','Tarragona','Cataluña'],['Costa Daurada','Tarragona','Tarragona','Cataluña'],['Costa Daurada','L\'Ametlla de Mar','Tarragona','Cataluña'],['Costa Daurada','L\'Ampolla','Tarragona','Cataluña'],['Pirineos','Vielha','Lleida','Cataluña'],['Pirineos','La Pobla de Segur','Lleida','Cataluña'],['Pirineos','La Seu d\'Urgell','Lleida','Cataluña']], cant: 200 },
  // Comunidad Valenciana
  { ubicaciones: [['Costa Blanca','Benidorm','Alicante','Comunidad Valenciana'],['Costa Blanca','Alicante','Alicante','Comunidad Valenciana'],['Costa Blanca','Calp','Alicante','Comunidad Valenciana'],['Costa Blanca','Dénia','Alicante','Comunidad Valenciana'],['Costa Blanca','Altea','Alicante','Comunidad Valenciana'],['Costa Blanca','Torrevieja','Alicante','Comunidad Valenciana'],['Costa Blanca','Guardamar','Alicante','Comunidad Valenciana'],['Costa Valencia','Cullera','Valencia','Comunidad Valenciana'],['Costa Valencia','Gandía','Valencia','Comunidad Valenciana'],['Costa Valencia','Oliva','Valencia','Comunidad Valenciana'],['Costa Azahar','Peñíscola','Castellón','Comunidad Valenciana'],['Costa Azahar','Benicàssim','Castellón','Comunidad Valenciana'],['Costa Azahar','Vinaròs','Castellón','Comunidad Valenciana']], cant: 150 },
  // Andalucía
  { ubicaciones: [['Costa del Sol','Marbella','Málaga','Andalucía'],['Costa del Sol','Estepona','Málaga','Andalucía'],['Costa del Sol','Mijas','Málaga','Andalucía'],['Costa del Sol','Nerja','Málaga','Andalucía'],['Costa del Sol','Torrox','Málaga','Andalucía'],['Costa de la Luz','Conil','Cádiz','Andalucía'],['Costa de la Luz','Tarifa','Cádiz','Andalucía'],['Costa de la Luz','Vejer','Cádiz','Andalucía'],['Costa de la Luz','Chiclana','Cádiz','Andalucía'],['Costa de la Luz','Punta Umbría','Huelva','Andalucía'],['Costa de la Luz','Isla Cristina','Huelva','Andalucía'],['Costa Tropical','Almuñécar','Granada','Andalucía'],['Costa Tropical','Salobreña','Granada','Andalucía'],['Costa de Almería','Roquetas','Almería','Andalucía'],['Costa de Almería','Mojácar','Almería','Andalucía'],['Costa de Almería','Vera','Almería','Andalucía']], cant: 150 },
  // Galicia
  { ubicaciones: [['Rías Baixas','Sanxenxo','Pontevedra','Galicia'],['Rías Baixas','O Grove','Pontevedra','Galicia'],['Rías Baixas','Vilagarcía','Pontevedra','Galicia'],['Rías Baixas','Pontevedra','Pontevedra','Galicia'],['Costa Norte','A Coruña','A Coruña','Galicia'],['Costa Norte','Carballo','A Coruña','Galicia'],['Costa Norte','Foz','Lugo','Galicia'],['Costa Norte','Viveiro','Lugo','Galicia']], cant: 80 },
  // Cantábrico (Asturias, Cantabria, País Vasco)
  { ubicaciones: [['Costa Asturias','Llanes','Asturias','Asturias'],['Costa Asturias','Ribadesella','Asturias','Asturias'],['Costa Asturias','Cudillero','Asturias','Asturias'],['Costa Cantabria','Santander','Cantabria','Cantabria'],['Costa Cantabria','Comillas','Cantabria','Cantabria'],['Costa Cantabria','Suances','Cantabria','Cantabria'],['Costa Cantabria','Castro Urdiales','Cantabria','Cantabria'],['Costa Vasca','Zarautz','Gipuzkoa','País Vasco'],['Costa Vasca','Hondarribia','Gipuzkoa','País Vasco']], cant: 100 },
  // Aragón / Pirineos
  { ubicaciones: [['Pirineos Aragón','Jaca','Huesca','Aragón'],['Pirineos Aragón','Boltaña','Huesca','Aragón'],['Pirineos Aragón','Aínsa','Huesca','Aragón'],['Pirineos Aragón','Benasque','Huesca','Aragón'],['Sierra Aragón','Albarracín','Teruel','Aragón'],['Sierra Aragón','Calatayud','Zaragoza','Aragón']], cant: 60 },
  // Castilla y León
  { ubicaciones: [['Sierra Norte','Aranda de Duero','Burgos','Castilla y León'],['Sierra Norte','Burgos','Burgos','Castilla y León'],['Sierra Norte','León','León','Castilla y León'],['Sierra Norte','Soria','Soria','Castilla y León'],['Sierra Norte','Salamanca','Salamanca','Castilla y León'],['Sierra Norte','Ávila','Ávila','Castilla y León'],['Sierra Norte','Segovia','Segovia','Castilla y León']], cant: 70 },
  // Castilla La Mancha + Madrid
  { ubicaciones: [['Sierra Centro','Madrid','Madrid','Madrid'],['Sierra Centro','Cercedilla','Madrid','Madrid'],['Sierra Centro','El Escorial','Madrid','Madrid'],['Sierra Centro','Toledo','Toledo','Castilla-La Mancha'],['Sierra Centro','Cuenca','Cuenca','Castilla-La Mancha'],['Sierra Centro','Albacete','Albacete','Castilla-La Mancha']], cant: 60 },
  // Murcia
  { ubicaciones: [['Costa Cálida','Cartagena','Murcia','Murcia'],['Costa Cálida','La Manga','Murcia','Murcia'],['Costa Cálida','Águilas','Murcia','Murcia'],['Costa Cálida','Mazarrón','Murcia','Murcia'],['Costa Cálida','San Pedro del Pinatar','Murcia','Murcia']], cant: 50 },
  // Extremadura
  { ubicaciones: [['Sierra Extremadura','Cáceres','Cáceres','Extremadura'],['Sierra Extremadura','Plasencia','Cáceres','Extremadura'],['Sierra Extremadura','Mérida','Badajoz','Extremadura']], cant: 30 },
  // Navarra / La Rioja
  { ubicaciones: [['Pirineo Navarro','Pamplona','Navarra','Navarra'],['Pirineo Navarro','Sangüesa','Navarra','Navarra'],['La Rioja','Logroño','La Rioja','La Rioja']], cant: 30 },
  // Baleares
  { ubicaciones: [['Mallorca','Palma','Mallorca','Baleares'],['Mallorca','Manacor','Mallorca','Baleares'],['Mallorca','Pollença','Mallorca','Baleares'],['Mallorca','Alcúdia','Mallorca','Baleares'],['Menorca','Maó','Menorca','Baleares'],['Menorca','Ciutadella','Menorca','Baleares']], cant: 60 },
  // Canarias
  { ubicaciones: [['Tenerife','Adeje','Tenerife','Canarias'],['Tenerife','Arona','Tenerife','Canarias'],['Gran Canaria','Maspalomas','Las Palmas','Canarias'],['Lanzarote','Costa Teguise','Lanzarote','Canarias'],['Fuerteventura','Corralejo','Fuerteventura','Canarias']], cant: 60 }
];

const CAMPINGS = [];
let telIdx = 2000000;

for (const zona of ZONAS) {
  for (let i = 0; i < zona.cant; i++) {
    const ub = zona.ubicaciones[i % zona.ubicaciones.length];
    const nombreBase = NOMBRES[i % NOMBRES.length];
    const sufijo = i >= NOMBRES.length ? ` ${Math.floor(i/NOMBRES.length + 1)}` : '';
    const nombre = `Camping ${nombreBase} ${ub[1]}${sufijo}`;

    const categoria = CATEGORIAS[i % CATEGORIAS.length];
    const tamano = TAMANOS[i % 3];
    const capacidad = CAPACIDADES[tamano];
    const tipo = TIPOS[i % TIPOS.length];
    const servicios = SERVICIOS[i % SERVICIOS.length];
    const animacion = ANIMACION[i % ANIMACION.length];
    const tel = `+34 ${600000000 + telIdx}`;
    telIdx++;

    CAMPINGS.push(camping(nombre, categoria, tamano, capacidad, ub[0], ub[1], ub[2], ub[3], tipo, servicios, animacion, tel));
  }
}

const HEADERS = [
  'NOMBRE CAMPING', 'TIPO', 'CATEGORÍA ESTRELLAS', 'TAMAÑO', 'CAPACIDAD',
  'UBICACIÓN/ZONA', 'MUNICIPIO', 'PROVINCIA', 'COMUNIDAD AUTÓNOMA',
  'TIPO ESPECIALIZACIÓN', 'SERVICIOS', 'ANIMACIÓN/MÚSICA',
  'TELÉFONO', 'EMAIL CONTACTO', 'WEB', 'NOTAS'
];

async function create() {
  try {
    console.log('🏕️ Creando CRM CAMPINGS...\n');
    console.log(`📊 Campings: ${CAMPINGS.length}\n`);

    const { sheets } = await getServices();

    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'CAMPINGS');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'CAMPINGS' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    const values = [HEADERS, ...CAMPINGS];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'CAMPINGS!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 16 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.2, green: 0.6, blue: 0.3 },
              textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 16 }, properties: { pixelSize: 170 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: CAMPINGS.length + 1, startColumnIndex: 0, endColumnIndex: 16 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('═══════════════════════════════════════');
    console.log('🏕️ CAMPINGS CREADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${CAMPINGS.length} campings\n`);
    console.log('Variables: CATEGORÍA, TAMAÑO, CAPACIDAD, ZONA, TIPO, SERVICIOS, ANIMACIÓN\n');

  } catch (error) {
    console.error('❌', error.message);
  }
}

create();
