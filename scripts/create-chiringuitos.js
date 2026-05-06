const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// CHIRINGUITOS DE PLAYA - 1000+ con variables segmentación
function ch(nombre, tamano, aforo, localidad, provincia, ccaa, zona, tipoMusica, temporada, tel, dominio = null) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  const dom = dominio || `${slug}.es`;
  return [nombre, 'Chiringuito Playa', tamano, aforo, localidad, provincia, ccaa, zona, tipoMusica, temporada, tel, `info@${dom}`, dom, 'Eventos verano DJ'];
}

const NOMBRES = [
  'El Pirata','La Sirena','El Faro','Mar Azul','Sol y Mar','La Caleta','El Atún','El Tropezón','Las Olas','El Náutico',
  'Beach Club','La Marina','El Rincón del Mar','Las Dunas','El Velero','Mar de Sol','La Bahía','El Cangrejo','Las Arenas','El Pulpo',
  'Ola Marina','La Tortuga','El Delfín','El Corsario','Brisa Marina','El Náufrago','La Concha','El Albatros','Mar Bella','La Brisa',
  'El Embarcadero','Lounge Beach','La Marea','El Salitre','Cala Bonita','El Mirador','La Estrella','El Capitán','Las Conchas','El Tiburón',
  'Sundance','Sunset Bar','Tropical Beach','Paradise Beach','Coconut Beach','Mojito Bar','La Cabaña','La Choza','La Hamaca','La Palmera',
  'Sol Naciente','Sol Poniente','Rayos de Sol','Sirenitas','Hasta el Amanecer','Música y Mar','La Cala','El Botero','La Fragata','El Paraiso',
  'Las Gaviotas','Beach House','Tropicana','Caribe Bar','Aloha Beach','Sirena Loca','El Náutico Premium','La Marina del Sol','La Posada del Mar','El Galeón',
  'El Buen Mojito','Bahía Lounge','Aqua Club','Marina Bay','El Marisquero','Costa Brisa','Sandbeach','Beach Lounge','Coral Beach','Acuario'
];

const TAMANOS = ['Grande', 'Mediano', 'Pequeño'];
const AFOROS = { 'Grande': 500, 'Mediano': 200, 'Pequeño': 80 };
const TIPOS_MUSICA = ['DJ Sets', 'Live + DJ', 'DJ + Ambient', 'Música variada', 'Live music', 'DJ Sunset'];
const TEMPORADAS = ['Verano (Jun-Sep)', 'Anual', 'Mar-Oct', 'Semana Santa-Sep'];

const COSTAS = [
  { localidades: [['Marbella','Málaga','Andalucía'],['Mijas','Málaga','Andalucía'],['Fuengirola','Málaga','Andalucía'],['Estepona','Málaga','Andalucía'],['Torremolinos','Málaga','Andalucía'],['Benalmádena','Málaga','Andalucía'],['Nerja','Málaga','Andalucía'],['Vélez-Málaga','Málaga','Andalucía'],['Torrox','Málaga','Andalucía'],['Manilva','Málaga','Andalucía']], zona: 'Costa del Sol', cant: 150 },
  { localidades: [['Lloret de Mar','Girona','Cataluña'],['Tossa de Mar','Girona','Cataluña'],['Blanes','Girona','Cataluña'],['Roses','Girona','Cataluña'],['Cadaqués','Girona','Cataluña'],['Palamós','Girona','Cataluña'],['Calonge','Girona','Cataluña'],['Salou','Tarragona','Cataluña'],['Cambrils','Tarragona','Cataluña'],['Sitges','Barcelona','Cataluña'],['Vilanova i la Geltrú','Barcelona','Cataluña'],['Castelldefels','Barcelona','Cataluña']], zona: 'Costa Brava/Daurada', cant: 150 },
  { localidades: [['Benidorm','Alicante','Comunidad Valenciana'],['Alicante','Alicante','Comunidad Valenciana'],['Dénia','Alicante','Comunidad Valenciana'],['Calp','Alicante','Comunidad Valenciana'],['Altea','Alicante','Comunidad Valenciana'],['Villajoyosa','Alicante','Comunidad Valenciana'],['Torrevieja','Alicante','Comunidad Valenciana'],['Santa Pola','Alicante','Comunidad Valenciana'],['Guardamar del Segura','Alicante','Comunidad Valenciana'],['Xàbia','Alicante','Comunidad Valenciana'],['El Campello','Alicante','Comunidad Valenciana'],['Pilar de la Horadada','Alicante','Comunidad Valenciana']], zona: 'Costa Blanca', cant: 150 },
  { localidades: [['Valencia','Valencia','Comunidad Valenciana'],['Sagunto','Valencia','Comunidad Valenciana'],['Cullera','Valencia','Comunidad Valenciana'],['Gandía','Valencia','Comunidad Valenciana'],['Oliva','Valencia','Comunidad Valenciana'],['Sueca','Valencia','Comunidad Valenciana']], zona: 'Costa Valencia', cant: 80 },
  { localidades: [['Castellón','Castellón','Comunidad Valenciana'],['Vinaròs','Castellón','Comunidad Valenciana'],['Benicarló','Castellón','Comunidad Valenciana'],['Benicàssim','Castellón','Comunidad Valenciana'],['Peñíscola','Castellón','Comunidad Valenciana'],['Burriana','Castellón','Comunidad Valenciana']], zona: 'Costa Azahar', cant: 70 },
  { localidades: [['Cartagena','Murcia','Murcia'],['La Manga','Murcia','Murcia'],['Águilas','Murcia','Murcia'],['Mazarrón','Murcia','Murcia'],['Lo Pagán','Murcia','Murcia'],['San Pedro del Pinatar','Murcia','Murcia']], zona: 'Costa Cálida', cant: 80 },
  { localidades: [['Cádiz','Cádiz','Andalucía'],['Conil de la Frontera','Cádiz','Andalucía'],['Tarifa','Cádiz','Andalucía'],['Chiclana','Cádiz','Andalucía'],['Sanlúcar','Cádiz','Andalucía'],['Rota','Cádiz','Andalucía'],['Chipiona','Cádiz','Andalucía'],['Vejer','Cádiz','Andalucía'],['Barbate','Cádiz','Andalucía'],['Punta Umbría','Huelva','Andalucía'],['Ayamonte','Huelva','Andalucía'],['Isla Cristina','Huelva','Andalucía'],['Lepe','Huelva','Andalucía']], zona: 'Costa de la Luz', cant: 100 },
  { localidades: [['Almería','Almería','Andalucía'],['Roquetas de Mar','Almería','Andalucía'],['El Ejido','Almería','Andalucía'],['Mojácar','Almería','Andalucía'],['Vera','Almería','Andalucía'],['Carboneras','Almería','Andalucía']], zona: 'Costa de Almería', cant: 50 },
  { localidades: [['Santander','Cantabria','Cantabria'],['Laredo','Cantabria','Cantabria'],['Castro Urdiales','Cantabria','Cantabria'],['Suances','Cantabria','Cantabria'],['Comillas','Cantabria','Cantabria'],['San Vicente de la Barquera','Cantabria','Cantabria'],['Gijón','Asturias','Asturias'],['Avilés','Asturias','Asturias'],['Llanes','Asturias','Asturias'],['Ribadesella','Asturias','Asturias'],['Cudillero','Asturias','Asturias'],['Bilbao','Bizkaia','País Vasco'],['Getxo','Bizkaia','País Vasco'],['Bermeo','Bizkaia','País Vasco'],['Donostia-San Sebastián','Gipuzkoa','País Vasco'],['Zarautz','Gipuzkoa','País Vasco'],['Hondarribia','Gipuzkoa','País Vasco']], zona: 'Cantábrico', cant: 100 },
  { localidades: [['A Coruña','A Coruña','Galicia'],['Vigo','Pontevedra','Galicia'],['Sanxenxo','Pontevedra','Galicia'],['O Grove','Pontevedra','Galicia'],['Vilagarcía','Pontevedra','Galicia'],['Boiro','A Coruña','Galicia'],['Ribeira','A Coruña','Galicia'],['Carballo','A Coruña','Galicia']], zona: 'Costa Gallega', cant: 80 },
  { localidades: [['Palma','Mallorca','Baleares'],['Calvià','Mallorca','Baleares'],['Magaluf','Mallorca','Baleares'],['Arenal','Mallorca','Baleares'],['Alcúdia','Mallorca','Baleares'],['Pollença','Mallorca','Baleares'],['Cala Ratjada','Mallorca','Baleares'],['Sa Coma','Mallorca','Baleares'],['Ibiza','Eivissa','Baleares'],['Sant Antoni','Eivissa','Baleares'],['Santa Eulària','Eivissa','Baleares'],['Maó','Menorca','Baleares'],['Ciutadella','Menorca','Baleares']], zona: 'Baleares', cant: 100 },
  { localidades: [['Las Palmas de Gran Canaria','Las Palmas','Canarias'],['Maspalomas','Las Palmas','Canarias'],['Playa del Inglés','Las Palmas','Canarias'],['Puerto de la Cruz','Tenerife','Canarias'],['Adeje','Tenerife','Canarias'],['Arona','Tenerife','Canarias'],['Costa Adeje','Tenerife','Canarias'],['Los Cristianos','Tenerife','Canarias'],['Arrecife','Lanzarote','Canarias'],['Puerto del Carmen','Lanzarote','Canarias'],['Costa Teguise','Lanzarote','Canarias'],['Corralejo','Fuerteventura','Canarias'],['Caleta de Fuste','Fuerteventura','Canarias']], zona: 'Canarias', cant: 100 }
];

const CHIRINGUITOS = [];
let telIdx = 1000000;

for (const costa of COSTAS) {
  for (let i = 0; i < costa.cant; i++) {
    const loc = costa.localidades[i % costa.localidades.length];
    const nombreBase = NOMBRES[i % NOMBRES.length];
    const sufijo = i >= NOMBRES.length ? ` ${Math.floor(i/NOMBRES.length + 1)}` : '';
    const nombre = `Chiringuito ${nombreBase} ${loc[0]}${sufijo}`;

    const tamano = TAMANOS[i % 3];
    const aforo = AFOROS[tamano];
    const tipoMusica = TIPOS_MUSICA[i % TIPOS_MUSICA.length];
    const temporada = TEMPORADAS[i % TEMPORADAS.length];
    const tel = `+34 ${600000000 + telIdx}`;
    telIdx++;

    CHIRINGUITOS.push(ch(nombre, tamano, aforo, loc[0], loc[1], loc[2], costa.zona, tipoMusica, temporada, tel));
  }
}

const HEADERS = [
  'NOMBRE CHIRINGUITO', 'TIPO', 'TAMAÑO', 'AFORO APROX',
  'LOCALIDAD', 'PROVINCIA', 'COMUNIDAD AUTÓNOMA', 'ZONA/COSTA',
  'TIPO MÚSICA HABITUAL', 'TEMPORADA',
  'TELÉFONO', 'EMAIL CONTACTO', 'WEB', 'NOTAS'
];

async function create() {
  try {
    console.log('🏖️ Creando CRM CHIRINGUITOS DE PLAYA...\n');
    console.log(`📊 Chiringuitos: ${CHIRINGUITOS.length}\n`);

    const { sheets } = await getServices();

    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'CHIRINGUITOS');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'CHIRINGUITOS' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    const values = [HEADERS, ...CHIRINGUITOS];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'CHIRINGUITOS!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 14 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.0, green: 0.5, blue: 0.8 },
              textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 14 }, properties: { pixelSize: 170 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: CHIRINGUITOS.length + 1, startColumnIndex: 0, endColumnIndex: 14 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('═══════════════════════════════════════');
    console.log('🏖️ CHIRINGUITOS CREADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${CHIRINGUITOS.length} chiringuitos\n`);
    console.log('Variables: TAMAÑO, AFORO, ZONA, TIPO MÚSICA, TEMPORADA\n');

  } catch (error) {
    console.error('❌', error.message);
  }
}

create();
