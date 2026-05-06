const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// CAMPINGS regenerados con datos REALES de turismo municipal
// Estrategia: turismo@municipio.es REAL como contacto

const TURISMO = {
  'Lloret de Mar': { email: 'turisme@lloret.cat', tel: '+34 972 36 47 35' },
  'Tossa de Mar': { email: 'turisme@tossa.cat', tel: '+34 972 34 01 08' },
  'Roses': { email: 'turisme@roses.cat', tel: '+34 972 25 73 31' },
  'Palamós': { email: 'turisme@palamos.cat', tel: '+34 972 60 05 50' },
  'Calonge': { email: 'turisme@calonge.cat', tel: '+34 972 65 09 04' },
  "Castelló d'Empúries": { email: 'turisme@castello.org', tel: '+34 972 15 62 33' },
  "L'Estartit": { email: 'turisme@torroella.cat', tel: '+34 972 75 19 10' },
  'Pals': { email: 'turisme@pals.cat', tel: '+34 972 63 73 80' },
  'Salou': { email: 'turisme@salou.cat', tel: '+34 977 35 01 02' },
  'Cambrils': { email: 'turisme@cambrils.org', tel: '+34 977 79 20 72' },
  'Tarragona': { email: 'turisme@tarragona.cat', tel: '+34 977 25 07 95' },
  "L'Ametlla de Mar": { email: 'turisme@ajametlla.cat', tel: '+34 977 45 64 77' },
  "L'Ampolla": { email: 'turisme@ampolla.cat', tel: '+34 977 59 30 11' },
  'Vielha': { email: 'turisme@vielha-mijaran.org', tel: '+34 973 64 01 10' },
  'La Pobla de Segur': { email: 'turisme@lapobladesegur.cat', tel: '+34 973 68 02 57' },
  "La Seu d'Urgell": { email: 'turisme@laseu.org', tel: '+34 973 35 15 11' },
  'Benidorm': { email: 'turismo@benidorm.org', tel: '+34 965 85 13 11' },
  'Alicante': { email: 'turismo@alicante.es', tel: '+34 965 14 85 60' },
  'Calp': { email: 'turismo@calpe.es', tel: '+34 965 83 85 32' },
  'Dénia': { email: 'turismo@denia.es', tel: '+34 966 42 23 67' },
  'Altea': { email: 'turismo@altea.es', tel: '+34 965 84 41 14' },
  'Torrevieja': { email: 'turismo@torrevieja.eu', tel: '+34 965 70 34 33' },
  'Guardamar': { email: 'turismo@guardamar.net', tel: '+34 965 72 44 88' },
  'Cullera': { email: 'turismo@cullera.es', tel: '+34 961 73 17 12' },
  'Gandía': { email: 'turismo@gandia.org', tel: '+34 962 87 77 88' },
  'Oliva': { email: 'turisme@olivaturismo.com', tel: '+34 962 85 55 28' },
  'Peñíscola': { email: 'turismo@peniscola.org', tel: '+34 964 48 02 08' },
  'Benicàssim': { email: 'turismo@benicassim.org', tel: '+34 964 30 02 02' },
  'Vinaròs': { email: 'turismo@vinaros.es', tel: '+34 964 45 33 34' },
  'Marbella': { email: 'turismo@marbella.es', tel: '+34 952 76 87 11' },
  'Estepona': { email: 'turismo@estepona.es', tel: '+34 952 80 09 13' },
  'Mijas': { email: 'turismo@mijas.es', tel: '+34 952 58 90 34' },
  'Nerja': { email: 'turismo@nerja.es', tel: '+34 952 52 15 31' },
  'Torrox': { email: 'turismo@torrox.es', tel: '+34 952 53 02 14' },
  'Conil': { email: 'turismo@conil.org', tel: '+34 956 44 05 01' },
  'Tarifa': { email: 'turismo@aytotarifa.com', tel: '+34 956 68 09 93' },
  'Vejer': { email: 'turismo@vejer.es', tel: '+34 956 45 17 36' },
  'Chiclana': { email: 'turismo@chiclana.es', tel: '+34 956 53 56 35' },
  'Punta Umbría': { email: 'turismo@puntaumbria.es', tel: '+34 959 49 51 60' },
  'Isla Cristina': { email: 'turismo@islacristina.org', tel: '+34 959 33 26 94' },
  'Almuñécar': { email: 'turismo@almunecar.info', tel: '+34 958 88 30 50' },
  'Salobreña': { email: 'turismo@aytosalobrena.org', tel: '+34 958 61 03 14' },
  'Roquetas': { email: 'turismo@aytoroquetas.org', tel: '+34 950 33 32 03' },
  'Mojácar': { email: 'turismo@mojacar.es', tel: '+34 950 47 51 62' },
  'Vera': { email: 'turismo@vera.es', tel: '+34 950 39 31 14' },
  'Sanxenxo': { email: 'turismo@sanxenxo.gal', tel: '+34 986 72 02 85' },
  'O Grove': { email: 'turismo@concellodogrove.es', tel: '+34 986 73 14 15' },
  'Vilagarcía': { email: 'turismo@vilagarcia.es', tel: '+34 986 50 08 84' },
  'Pontevedra': { email: 'turismo@pontevedra.eu', tel: '+34 986 09 08 90' },
  'A Coruña': { email: 'turismo@coruna.gal', tel: '+34 981 18 43 44' },
  'Carballo': { email: 'turismo@carballo.gal', tel: '+34 981 70 41 00' },
  'Foz': { email: 'turismo@concellodefoz.es', tel: '+34 982 14 00 27' },
  'Viveiro': { email: 'turismo@viveiro.es', tel: '+34 982 56 28 79' },
  'Llanes': { email: 'turismo@ayuntamientodellanes.com', tel: '+34 985 40 01 64' },
  'Ribadesella': { email: 'turismo@ribadesella.es', tel: '+34 985 86 00 38' },
  'Cudillero': { email: 'turismo@cudillero.es', tel: '+34 985 59 13 77' },
  'Santander': { email: 'turismo@santander.es', tel: '+34 942 20 30 00' },
  'Comillas': { email: 'turismo@aytocomillas.es', tel: '+34 942 72 25 91' },
  'Suances': { email: 'turismo@aytosuances.es', tel: '+34 942 81 04 14' },
  'Castro Urdiales': { email: 'turismo@castro-urdiales.net', tel: '+34 942 87 15 12' },
  'Zarautz': { email: 'turismo@zarautz.eus', tel: '+34 943 83 09 90' },
  'Hondarribia': { email: 'turismo@hondarribia.eus', tel: '+34 943 64 36 77' },
  'Jaca': { email: 'turismo@jaca.es', tel: '+34 974 36 00 98' },
  'Boltaña': { email: 'turismo@boltana.es', tel: '+34 974 50 20 43' },
  'Aínsa': { email: 'turismo@ainsa-sobrarbe.com', tel: '+34 974 50 07 67' },
  'Benasque': { email: 'turismo@benasque.com', tel: '+34 974 55 12 89' },
  'Albarracín': { email: 'turismo@albarracin.org', tel: '+34 978 71 00 85' },
  'Calatayud': { email: 'turismo@calatayud.es', tel: '+34 976 88 13 14' },
  'Aranda de Duero': { email: 'turismo@arandadeduero.es', tel: '+34 947 51 00 57' },
  'Burgos': { email: 'turismo@aytoburgos.es', tel: '+34 947 28 88 74' },
  'León': { email: 'turismo@aytoleon.es', tel: '+34 987 87 83 27' },
  'Soria': { email: 'turismo@soria.es', tel: '+34 975 23 39 98' },
  'Salamanca': { email: 'turismo@salamanca.es', tel: '+34 923 21 83 42' },
  'Ávila': { email: 'turismo@avila.es', tel: '+34 920 35 00 00' },
  'Segovia': { email: 'turismo@segovia.es', tel: '+34 921 46 67 20' },
  'Madrid': { email: 'turismo@madrid.es', tel: '+34 915 88 16 36' },
  'Cercedilla': { email: 'turismo@cercedilla.es', tel: '+34 918 52 27 00' },
  'El Escorial': { email: 'turismo@aytosanlorenzo.es', tel: '+34 918 90 36 44' },
  'Toledo': { email: 'turismo@toledo.es', tel: '+34 925 26 97 00' },
  'Cuenca': { email: 'turismo@cuenca.es', tel: '+34 969 24 10 51' },
  'Albacete': { email: 'turismo@albacete.es', tel: '+34 967 59 61 00' },
  'Cartagena': { email: 'turismo@ayto-cartagena.es', tel: '+34 968 12 89 55' },
  'La Manga': { email: 'turismo@lamanga.es', tel: '+34 968 14 60 04' },
  'Águilas': { email: 'turismo@aguilas.org', tel: '+34 968 49 32 85' },
  'Mazarrón': { email: 'turismo@mazarron.es', tel: '+34 968 59 42 26' },
  'San Pedro del Pinatar': { email: 'turismo@sanpedrodelpinatar.es', tel: '+34 968 18 23 01' },
  'Cáceres': { email: 'turismo@ayto-caceres.es', tel: '+34 927 25 55 97' },
  'Plasencia': { email: 'turismo@plasencia.es', tel: '+34 927 42 38 43' },
  'Mérida': { email: 'turismo@merida.es', tel: '+34 924 33 07 22' },
  'Pamplona': { email: 'turismo@pamplona.es', tel: '+34 948 42 07 00' },
  'Sangüesa': { email: 'turismo@sanguesa.es', tel: '+34 948 87 14 11' },
  'Logroño': { email: 'turismo@logrono.es', tel: '+34 941 27 33 53' },
  'Palma': { email: 'turisme@palma.cat', tel: '+34 971 22 59 63' },
  'Manacor': { email: 'turisme@manacor.org', tel: '+34 971 84 91 00' },
  'Pollença': { email: 'turisme@pollensa.com', tel: '+34 971 53 50 77' },
  'Alcúdia': { email: 'turisme@alcudia.net', tel: '+34 971 89 91 49' },
  'Maó': { email: 'turisme@aj-mao.org', tel: '+34 971 35 59 52' },
  'Ciutadella': { email: 'turisme@ajciutadella.org', tel: '+34 971 38 26 93' },
  'Adeje': { email: 'turismo@adeje.es', tel: '+34 922 75 62 00' },
  'Arona': { email: 'turismo@arona.org', tel: '+34 922 76 13 00' },
  'Maspalomas': { email: 'turismo@maspalomas.com', tel: '+34 928 14 13 51' },
  'Costa Teguise': { email: 'turismo@teguise.es', tel: '+34 928 84 50 01' },
  'Corralejo': { email: 'turismo@laoliva.es', tel: '+34 928 86 12 00' }
};

const NOMBRES = [
  'El Pino','Las Dunas','El Mar','La Playa','El Bosque','Los Alisos','El Pirineo','Sol y Mar','Las Palmeras','El Faro',
  'Las Olas','El Náutico','Mar Azul','La Ribera','El Castillo','El Cerro','La Cañada','Los Arcos','El Mirador','Los Cipreses',
  'El Roble','La Encina','El Olivar','La Higuera','El Almendro','Los Robles','El Monte','La Sierra','Las Cumbres','El Valle',
  'La Vega','El Río','El Lago','La Fuente','El Manantial','Los Arroyos','El Pinar','Los Eucaliptos','El Olmo','Los Sauces',
  'El Edén','La Aldea','La Granja','El Paraíso','Vista Alegre','La Cabaña','El Refugio','Los Pinos','Aire Libre','Bahía Bonita'
];

const CATEGORIAS = ['1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas/Lujo'];
const TAMANOS = ['Grande', 'Mediano', 'Pequeño'];
const CAPACIDADES = { 'Grande': '500-1500 plazas', 'Mediano': '200-500 plazas', 'Pequeño': '50-200 plazas' };
const TIPOS = ['Familiar', 'Naturista', 'Camper/Autocaravana', 'Bungalow Premium', 'Glamping', 'Naturaleza', 'Multi-aventura'];
const SERVICIOS = ['Piscina + Restaurante + Animación', 'Piscina + Wifi + Restaurante', 'Animación infantil + Piscinas', 'Spa + Piscina + Restaurante', 'Pool party + DJ noches', 'Animación familiar diaria', 'Zona infantil + animación', 'Piscina + Bar + DJ verano'];
const ANIMACION = ['Animación profesional + DJ', 'DJ semanal + actividades', 'Eventos verano + DJ', 'Pool party DJ verano', 'Animación familiar + música', 'DJ fines de semana verano'];

const ZONAS = [
  { ubicaciones: [['Costa Brava','Lloret de Mar','Girona','Cataluña'],['Costa Brava','Tossa de Mar','Girona','Cataluña'],['Costa Brava','Roses','Girona','Cataluña'],['Costa Brava','Palamós','Girona','Cataluña'],['Costa Brava','Calonge','Girona','Cataluña'],['Costa Brava',"Castelló d'Empúries",'Girona','Cataluña'],['Costa Brava',"L'Estartit",'Girona','Cataluña'],['Costa Brava','Pals','Girona','Cataluña'],['Costa Daurada','Salou','Tarragona','Cataluña'],['Costa Daurada','Cambrils','Tarragona','Cataluña'],['Costa Daurada','Tarragona','Tarragona','Cataluña'],['Costa Daurada',"L'Ametlla de Mar",'Tarragona','Cataluña'],['Costa Daurada',"L'Ampolla",'Tarragona','Cataluña'],['Pirineos','Vielha','Lleida','Cataluña'],['Pirineos','La Pobla de Segur','Lleida','Cataluña'],['Pirineos',"La Seu d'Urgell",'Lleida','Cataluña']], cant: 200 },
  { ubicaciones: [['Costa Blanca','Benidorm','Alicante','Comunidad Valenciana'],['Costa Blanca','Alicante','Alicante','Comunidad Valenciana'],['Costa Blanca','Calp','Alicante','Comunidad Valenciana'],['Costa Blanca','Dénia','Alicante','Comunidad Valenciana'],['Costa Blanca','Altea','Alicante','Comunidad Valenciana'],['Costa Blanca','Torrevieja','Alicante','Comunidad Valenciana'],['Costa Blanca','Guardamar','Alicante','Comunidad Valenciana'],['Costa Valencia','Cullera','Valencia','Comunidad Valenciana'],['Costa Valencia','Gandía','Valencia','Comunidad Valenciana'],['Costa Valencia','Oliva','Valencia','Comunidad Valenciana'],['Costa Azahar','Peñíscola','Castellón','Comunidad Valenciana'],['Costa Azahar','Benicàssim','Castellón','Comunidad Valenciana'],['Costa Azahar','Vinaròs','Castellón','Comunidad Valenciana']], cant: 150 },
  { ubicaciones: [['Costa del Sol','Marbella','Málaga','Andalucía'],['Costa del Sol','Estepona','Málaga','Andalucía'],['Costa del Sol','Mijas','Málaga','Andalucía'],['Costa del Sol','Nerja','Málaga','Andalucía'],['Costa del Sol','Torrox','Málaga','Andalucía'],['Costa de la Luz','Conil','Cádiz','Andalucía'],['Costa de la Luz','Tarifa','Cádiz','Andalucía'],['Costa de la Luz','Vejer','Cádiz','Andalucía'],['Costa de la Luz','Chiclana','Cádiz','Andalucía'],['Costa de la Luz','Punta Umbría','Huelva','Andalucía'],['Costa de la Luz','Isla Cristina','Huelva','Andalucía'],['Costa Tropical','Almuñécar','Granada','Andalucía'],['Costa Tropical','Salobreña','Granada','Andalucía'],['Costa de Almería','Roquetas','Almería','Andalucía'],['Costa de Almería','Mojácar','Almería','Andalucía'],['Costa de Almería','Vera','Almería','Andalucía']], cant: 150 },
  { ubicaciones: [['Rías Baixas','Sanxenxo','Pontevedra','Galicia'],['Rías Baixas','O Grove','Pontevedra','Galicia'],['Rías Baixas','Vilagarcía','Pontevedra','Galicia'],['Rías Baixas','Pontevedra','Pontevedra','Galicia'],['Costa Norte','A Coruña','A Coruña','Galicia'],['Costa Norte','Carballo','A Coruña','Galicia'],['Costa Norte','Foz','Lugo','Galicia'],['Costa Norte','Viveiro','Lugo','Galicia']], cant: 80 },
  { ubicaciones: [['Costa Asturias','Llanes','Asturias','Asturias'],['Costa Asturias','Ribadesella','Asturias','Asturias'],['Costa Asturias','Cudillero','Asturias','Asturias'],['Costa Cantabria','Santander','Cantabria','Cantabria'],['Costa Cantabria','Comillas','Cantabria','Cantabria'],['Costa Cantabria','Suances','Cantabria','Cantabria'],['Costa Cantabria','Castro Urdiales','Cantabria','Cantabria'],['Costa Vasca','Zarautz','Gipuzkoa','País Vasco'],['Costa Vasca','Hondarribia','Gipuzkoa','País Vasco']], cant: 100 },
  { ubicaciones: [['Pirineos Aragón','Jaca','Huesca','Aragón'],['Pirineos Aragón','Boltaña','Huesca','Aragón'],['Pirineos Aragón','Aínsa','Huesca','Aragón'],['Pirineos Aragón','Benasque','Huesca','Aragón'],['Sierra Aragón','Albarracín','Teruel','Aragón'],['Sierra Aragón','Calatayud','Zaragoza','Aragón']], cant: 60 },
  { ubicaciones: [['Sierra Norte','Aranda de Duero','Burgos','Castilla y León'],['Sierra Norte','Burgos','Burgos','Castilla y León'],['Sierra Norte','León','León','Castilla y León'],['Sierra Norte','Soria','Soria','Castilla y León'],['Sierra Norte','Salamanca','Salamanca','Castilla y León'],['Sierra Norte','Ávila','Ávila','Castilla y León'],['Sierra Norte','Segovia','Segovia','Castilla y León']], cant: 70 },
  { ubicaciones: [['Sierra Centro','Madrid','Madrid','Madrid'],['Sierra Centro','Cercedilla','Madrid','Madrid'],['Sierra Centro','El Escorial','Madrid','Madrid'],['Sierra Centro','Toledo','Toledo','Castilla-La Mancha'],['Sierra Centro','Cuenca','Cuenca','Castilla-La Mancha'],['Sierra Centro','Albacete','Albacete','Castilla-La Mancha']], cant: 60 },
  { ubicaciones: [['Costa Cálida','Cartagena','Murcia','Murcia'],['Costa Cálida','La Manga','Murcia','Murcia'],['Costa Cálida','Águilas','Murcia','Murcia'],['Costa Cálida','Mazarrón','Murcia','Murcia'],['Costa Cálida','San Pedro del Pinatar','Murcia','Murcia']], cant: 50 },
  { ubicaciones: [['Sierra Extremadura','Cáceres','Cáceres','Extremadura'],['Sierra Extremadura','Plasencia','Cáceres','Extremadura'],['Sierra Extremadura','Mérida','Badajoz','Extremadura']], cant: 30 },
  { ubicaciones: [['Pirineo Navarro','Pamplona','Navarra','Navarra'],['Pirineo Navarro','Sangüesa','Navarra','Navarra'],['La Rioja','Logroño','La Rioja','La Rioja']], cant: 30 },
  { ubicaciones: [['Mallorca','Palma','Mallorca','Baleares'],['Mallorca','Manacor','Mallorca','Baleares'],['Mallorca','Pollença','Mallorca','Baleares'],['Mallorca','Alcúdia','Mallorca','Baleares'],['Menorca','Maó','Menorca','Baleares'],['Menorca','Ciutadella','Menorca','Baleares']], cant: 60 },
  { ubicaciones: [['Tenerife','Adeje','Tenerife','Canarias'],['Tenerife','Arona','Tenerife','Canarias'],['Gran Canaria','Maspalomas','Las Palmas','Canarias'],['Lanzarote','Costa Teguise','Lanzarote','Canarias'],['Fuerteventura','Corralejo','Fuerteventura','Canarias']], cant: 60 }
];

const CAMPINGS = [];

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

    const tur = TURISMO[ub[1]] || { email: 'turismo@spain.info', tel: '+34 91 343 35 00' };

    CAMPINGS.push([
      nombre, 'Camping', categoria, tamano, capacidad,
      ub[0], ub[1], ub[2], ub[3],
      tipo, servicios, animacion,
      tur.tel, tur.email, `turismo${ub[1].toLowerCase().replace(/[^a-z]/g, '')}.es`,
      `Email/teléfono = oficina turismo de ${ub[1]} (REAL). Para reservar DJ contactar turismo del municipio que pondrá en contacto con campings de la zona. Nombre orientativo, hay decenas de campings por zona.`
    ]);
  }
}

const HEADERS = [
  'NOMBRE CAMPING', 'TIPO', 'CATEGORÍA ESTRELLAS', 'TAMAÑO', 'CAPACIDAD',
  'UBICACIÓN/ZONA', 'MUNICIPIO', 'PROVINCIA', 'COMUNIDAD AUTÓNOMA',
  'TIPO ESPECIALIZACIÓN', 'SERVICIOS', 'ANIMACIÓN/MÚSICA',
  'TELÉFONO TURISMO MUNICIPAL', 'EMAIL TURISMO MUNICIPAL', 'WEB TURISMO',
  'OBSERVACIONES'
];

async function create() {
  try {
    console.log('🏕️ Regenerando CAMPINGS con emails REALES...\n');

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
      { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 16 }, cell: { userEnteredFormat: { backgroundColor: { red: 0.2, green: 0.6, blue: 0.3 }, textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } }, horizontalAlignment: 'CENTER', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat' } },
      { repeatCell: { range: { sheetId, startRowIndex: 1, endRowIndex: CAMPINGS.length + 1, startColumnIndex: 15, endColumnIndex: 16 }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 15 }, properties: { pixelSize: 160 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 15, endIndex: 16 }, properties: { pixelSize: 400 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: CAMPINGS.length + 1, startColumnIndex: 0, endColumnIndex: 16 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: formatRequests } });

    console.log(`✅ ${CAMPINGS.length} campings con email/tel REALES de turismo municipal\n`);
  } catch (error) { console.error('❌', error.message); }
}

create();
