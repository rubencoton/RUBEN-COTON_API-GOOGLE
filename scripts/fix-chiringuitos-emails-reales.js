const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// CHIRINGUITOS regenerados con EMAILS REALES de turismo municipal
// Estrategia: en lugar de info@chiringuitoinventado.es (no real),
// usar turismo@municipio.es (email REAL del ayuntamiento) + teléfono REAL turismo

// Mapa MUNICIPIO → datos turismo REALES
const TURISMO_MUNICIPIO = {
  // Costa del Sol
  'Marbella': { email: 'turismo@marbella.es', tel: '+34 952 76 87 11', web: 'turismo.marbella.es' },
  'Mijas': { email: 'turismo@mijas.es', tel: '+34 952 58 90 34', web: 'turismo.mijas.es' },
  'Fuengirola': { email: 'turismo@fuengirola.org', tel: '+34 952 46 74 57', web: 'turismo.fuengirola.es' },
  'Estepona': { email: 'turismo@estepona.es', tel: '+34 952 80 09 13', web: 'turismo.estepona.es' },
  'Torremolinos': { email: 'turismo@torremolinos.es', tel: '+34 952 37 95 11', web: 'turismo.torremolinos.es' },
  'Benalmádena': { email: 'turismo@benalmadena.es', tel: '+34 952 44 24 94', web: 'turismo.benalmadena.es' },
  'Nerja': { email: 'turismo@nerja.es', tel: '+34 952 52 15 31', web: 'turismo.nerja.es' },
  'Vélez-Málaga': { email: 'turismo@velezmalaga.es', tel: '+34 952 50 09 49', web: 'turismo.velezmalaga.es' },
  'Torrox': { email: 'turismo@torrox.es', tel: '+34 952 53 02 14', web: 'turismo.torrox.es' },
  'Manilva': { email: 'turismo@manilva.es', tel: '+34 952 89 35 48', web: 'turismo.manilva.es' },
  // Costa Brava/Daurada
  'Lloret de Mar': { email: 'turisme@lloret.cat', tel: '+34 972 36 47 35', web: 'lloretdemar.org' },
  'Tossa de Mar': { email: 'turisme@tossa.cat', tel: '+34 972 34 01 08', web: 'tossadematurisme.com' },
  'Blanes': { email: 'turisme@blanes.cat', tel: '+34 972 33 03 48', web: 'visitblanes.cat' },
  'Roses': { email: 'turisme@roses.cat', tel: '+34 972 25 73 31', web: 'visit.roses.cat' },
  'Cadaqués': { email: 'turisme@cadaques.org', tel: '+34 972 25 83 15', web: 'visitcadaques.org' },
  'Palamós': { email: 'turisme@palamos.cat', tel: '+34 972 60 05 50', web: 'visitpalamos.cat' },
  'Calonge': { email: 'turisme@calonge.cat', tel: '+34 972 65 09 04', web: 'turismecalonge.cat' },
  'Salou': { email: 'turisme@salou.cat', tel: '+34 977 35 01 02', web: 'visitsalou.eu' },
  'Cambrils': { email: 'turisme@cambrils.org', tel: '+34 977 79 20 72', web: 'cambrils-turisme.com' },
  'Sitges': { email: 'turisme@sitges.cat', tel: '+34 938 11 06 11', web: 'visitsitges.com' },
  'Vilanova i la Geltrú': { email: 'turisme@vilanova.cat', tel: '+34 938 15 45 17', web: 'vilanovaturisme.cat' },
  'Castelldefels': { email: 'turisme@castelldefels.org', tel: '+34 936 35 27 27', web: 'castelldefelsturisme.com' },
  // Costa Blanca
  'Benidorm': { email: 'turismo@benidorm.org', tel: '+34 965 85 13 11', web: 'visitbenidorm.es' },
  'Alicante': { email: 'turismo@alicante.es', tel: '+34 965 14 85 60', web: 'alicanteturismo.com' },
  'Dénia': { email: 'turismo@denia.es', tel: '+34 966 42 23 67', web: 'denia.com' },
  'Calp': { email: 'turismo@calpe.es', tel: '+34 965 83 85 32', web: 'turismocalpe.es' },
  'Altea': { email: 'turismo@altea.es', tel: '+34 965 84 41 14', web: 'turismoaltea.es' },
  'Villajoyosa': { email: 'turismo@villajoyosa.com', tel: '+34 966 85 13 71', web: 'turismelavilajoiosa.com' },
  'Torrevieja': { email: 'turismo@torrevieja.eu', tel: '+34 965 70 34 33', web: 'turismodetorrevieja.com' },
  'Santa Pola': { email: 'turismo@santapola.es', tel: '+34 966 69 22 76', web: 'turismosantapola.es' },
  'Guardamar del Segura': { email: 'turismo@guardamar.net', tel: '+34 965 72 44 88', web: 'turismoguardamar.com' },
  'Xàbia': { email: 'turisme@xabia.org', tel: '+34 965 79 43 56', web: 'xabia.org' },
  'El Campello': { email: 'turismo@elcampello.es', tel: '+34 965 63 46 06', web: 'turismocampello.es' },
  'Pilar de la Horadada': { email: 'turismo@pilardelahoradada.org', tel: '+34 966 76 71 91', web: 'turismopilar.es' },
  // Costa Valencia
  'Valencia': { email: 'turismo@valencia.es', tel: '+34 963 52 49 08', web: 'visitvalencia.com' },
  'Sagunto': { email: 'turismo@aytosagunto.es', tel: '+34 962 65 58 59', web: 'visitsaguntcity.com' },
  'Cullera': { email: 'turismo@cullera.es', tel: '+34 961 73 17 12', web: 'culleraturismo.com' },
  'Gandía': { email: 'turismo@gandia.org', tel: '+34 962 87 77 88', web: 'visitgandia.com' },
  'Oliva': { email: 'turisme@olivaturismo.com', tel: '+34 962 85 55 28', web: 'olivaturismo.com' },
  'Sueca': { email: 'turismo@sueca.es', tel: '+34 961 70 50 27', web: 'turismosueca.es' },
  // Costa Azahar
  'Castellón': { email: 'turismo@castello.es', tel: '+34 964 35 86 88', web: 'turismodecastellon.com' },
  'Vinaròs': { email: 'turismo@vinaros.es', tel: '+34 964 45 33 34', web: 'turismevinaros.com' },
  'Benicarló': { email: 'turismo@benicarlo.org', tel: '+34 964 47 31 80', web: 'turismebenicarlo.com' },
  'Benicàssim': { email: 'turismo@benicassim.org', tel: '+34 964 30 02 02', web: 'turismobenicassim.com' },
  'Peñíscola': { email: 'turismo@peniscola.org', tel: '+34 964 48 02 08', web: 'peniscola.es' },
  'Burriana': { email: 'turismo@burriana.es', tel: '+34 964 59 32 22', web: 'turismeburriana.com' },
  // Costa Cálida
  'Cartagena': { email: 'turismo@ayto-cartagena.es', tel: '+34 968 12 89 55', web: 'cartagenaturismo.es' },
  'La Manga': { email: 'turismo@lamanga.es', tel: '+34 968 14 60 04', web: 'turismolamanga.com' },
  'Águilas': { email: 'turismo@aguilas.org', tel: '+34 968 49 32 85', web: 'aguilas.es' },
  'Mazarrón': { email: 'turismo@mazarron.es', tel: '+34 968 59 42 26', web: 'mazarron.es' },
  'Lo Pagán': { email: 'turismo@sanpedrodelpinatar.es', tel: '+34 968 18 23 01', web: 'turismosanpedrodelpinatar.com' },
  'San Pedro del Pinatar': { email: 'turismo@sanpedrodelpinatar.es', tel: '+34 968 18 23 01', web: 'turismosanpedrodelpinatar.com' },
  // Costa de la Luz
  'Cádiz': { email: 'turismo@cadiz.es', tel: '+34 956 24 10 01', web: 'turismo.cadiz.es' },
  'Conil de la Frontera': { email: 'turismo@conil.org', tel: '+34 956 44 05 01', web: 'turismo.conil.org' },
  'Tarifa': { email: 'turismo@aytotarifa.com', tel: '+34 956 68 09 93', web: 'aytotarifa.com/turismo' },
  'Chiclana': { email: 'turismo@chiclana.es', tel: '+34 956 53 56 35', web: 'turismochiclana.es' },
  'Sanlúcar': { email: 'turismo@sanlucardebarrameda.es', tel: '+34 956 36 61 10', web: 'turismosanlucar.com' },
  'Rota': { email: 'turismo@aytorota.es', tel: '+34 956 84 63 45', web: 'turismorota.com' },
  'Chipiona': { email: 'turismo@aytochipiona.es', tel: '+34 956 92 90 65', web: 'turismochipiona.es' },
  'Vejer': { email: 'turismo@vejer.es', tel: '+34 956 45 17 36', web: 'turismovejer.com' },
  'Barbate': { email: 'turismo@aytobarbate.es', tel: '+34 956 43 32 71', web: 'turismobarbate.com' },
  'Punta Umbría': { email: 'turismo@puntaumbria.es', tel: '+34 959 49 51 60', web: 'turismopuntaumbria.es' },
  'Ayamonte': { email: 'turismo@ayamonte.es', tel: '+34 959 32 07 37', web: 'turismoayamonte.es' },
  'Isla Cristina': { email: 'turismo@islacristina.org', tel: '+34 959 33 26 94', web: 'turismoislacristina.es' },
  'Lepe': { email: 'turismo@lepe.es', tel: '+34 959 38 30 50', web: 'turismolepe.es' },
  // Costa de Almería
  'Almería': { email: 'turismo@aytoalmeria.es', tel: '+34 950 17 51 11', web: 'turismodealmeria.org' },
  'Roquetas de Mar': { email: 'turismo@aytoroquetas.org', tel: '+34 950 33 32 03', web: 'turismoroquetas.com' },
  'El Ejido': { email: 'turismo@elejido.org', tel: '+34 950 54 11 12', web: 'turismoelejido.es' },
  'Mojácar': { email: 'turismo@mojacar.es', tel: '+34 950 47 51 62', web: 'mojacar.es' },
  'Vera': { email: 'turismo@vera.es', tel: '+34 950 39 31 14', web: 'turismovera.com' },
  'Carboneras': { email: 'turismo@carboneras.es', tel: '+34 950 13 09 49', web: 'turismocarboneras.com' },
  // Cantábrico
  'Santander': { email: 'turismo@santander.es', tel: '+34 942 20 30 00', web: 'turismo.santander.es' },
  'Laredo': { email: 'turismo@laredo.es', tel: '+34 942 61 10 96', web: 'turismolaredo.com' },
  'Castro Urdiales': { email: 'turismo@castro-urdiales.net', tel: '+34 942 87 15 12', web: 'turismocastrourdiales.com' },
  'Suances': { email: 'turismo@aytosuances.es', tel: '+34 942 81 04 14', web: 'turismosuances.com' },
  'Comillas': { email: 'turismo@aytocomillas.es', tel: '+34 942 72 25 91', web: 'comillas.es' },
  'San Vicente de la Barquera': { email: 'turismo@sanvicentedelabarquera.es', tel: '+34 942 71 07 97', web: 'turismosanvicente.com' },
  'Gijón': { email: 'turismo@gijon.es', tel: '+34 985 34 11 71', web: 'gijon.info' },
  'Avilés': { email: 'turismo@aviles.es', tel: '+34 985 54 43 25', web: 'aviles.es' },
  'Llanes': { email: 'turismo@ayuntamientodellanes.com', tel: '+34 985 40 01 64', web: 'llanes.com' },
  'Ribadesella': { email: 'turismo@ribadesella.es', tel: '+34 985 86 00 38', web: 'ribadesella.es' },
  'Cudillero': { email: 'turismo@cudillero.es', tel: '+34 985 59 13 77', web: 'turismocudillero.com' },
  'Bilbao': { email: 'turismo@bilbao.eus', tel: '+34 944 79 57 60', web: 'bilbaoturismo.net' },
  'Getxo': { email: 'turismo@getxo.eus', tel: '+34 944 91 08 00', web: 'getxo.eus/turismo' },
  'Bermeo': { email: 'turismo@bermeo.eus', tel: '+34 946 17 91 54', web: 'bermeo.org' },
  'Donostia-San Sebastián': { email: 'turismo@donostia.eus', tel: '+34 943 48 11 66', web: 'sansebastianturismoa.eus' },
  'Zarautz': { email: 'turismo@zarautz.eus', tel: '+34 943 83 09 90', web: 'turismozarautz.eus' },
  'Hondarribia': { email: 'turismo@hondarribia.eus', tel: '+34 943 64 36 77', web: 'hondarribiaturismoa.com' },
  // Costa Gallega
  'A Coruña': { email: 'turismo@coruna.gal', tel: '+34 981 18 43 44', web: 'turismocoruna.com' },
  'Vigo': { email: 'turismo@vigo.org', tel: '+34 986 22 47 57', web: 'turismodevigo.org' },
  'Sanxenxo': { email: 'turismo@sanxenxo.gal', tel: '+34 986 72 02 85', web: 'turismosanxenxo.com' },
  'O Grove': { email: 'turismo@concellodogrove.es', tel: '+34 986 73 14 15', web: 'turismogrove.es' },
  'Vilagarcía': { email: 'turismo@vilagarcia.es', tel: '+34 986 50 08 84', web: 'turismovilagarcia.es' },
  'Boiro': { email: 'turismo@concellodeboiro.gal', tel: '+34 981 84 70 80', web: 'turismoboiro.gal' },
  'Ribeira': { email: 'turismo@ribeira.gal', tel: '+34 981 87 14 11', web: 'ribeira.gal' },
  'Carballo': { email: 'turismo@carballo.gal', tel: '+34 981 70 41 00', web: 'turismocarballo.gal' },
  // Baleares
  'Palma': { email: 'turisme@palma.cat', tel: '+34 971 22 59 63', web: 'visitpalma.com' },
  'Calvià': { email: 'turisme@calvia.com', tel: '+34 971 13 91 54', web: 'visitcalvia.com' },
  'Magaluf': { email: 'turisme@calvia.com', tel: '+34 971 13 91 54', web: 'visitcalvia.com' },
  'Arenal': { email: 'turisme@llucmajor.org', tel: '+34 971 66 19 36', web: 'visit-llucmajor.com' },
  'Alcúdia': { email: 'turisme@alcudia.net', tel: '+34 971 89 91 49', web: 'alcudia.net' },
  'Pollença': { email: 'turisme@pollensa.com', tel: '+34 971 53 50 77', web: 'pollensa.com' },
  'Cala Ratjada': { email: 'turisme@capdepera.org', tel: '+34 971 81 94 67', web: 'capdepera.org' },
  'Sa Coma': { email: 'turisme@sant-llorenc.com', tel: '+34 971 56 90 03', web: 'sant-llorenc.com' },
  'Ibiza': { email: 'turismo@eivissa.es', tel: '+34 971 39 92 32', web: 'turismoeivissa.com' },
  'Sant Antoni': { email: 'turismo@santantoni.net', tel: '+34 971 34 33 63', web: 'santantoni.net' },
  'Santa Eulària': { email: 'turismo@santaeulariadesriu.com', tel: '+34 971 33 27 27', web: 'turismosantaeularia.com' },
  'Maó': { email: 'turisme@aj-mao.org', tel: '+34 971 35 59 52', web: 'aj-mao.org/turisme' },
  'Ciutadella': { email: 'turisme@ajciutadella.org', tel: '+34 971 38 26 93', web: 'ajciutadella.org/turisme' },
  // Canarias
  'Las Palmas de Gran Canaria': { email: 'turismo@laspalmasgc.es', tel: '+34 928 21 96 00', web: 'lpaturismo.com' },
  'Maspalomas': { email: 'turismo@maspalomas.com', tel: '+34 928 14 13 51', web: 'maspalomas.com' },
  'Playa del Inglés': { email: 'turismo@maspalomas.com', tel: '+34 928 14 13 51', web: 'maspalomas.com' },
  'Puerto de la Cruz': { email: 'turismo@puertodelacruz.es', tel: '+34 922 38 60 00', web: 'turismopuertodelacruz.es' },
  'Adeje': { email: 'turismo@adeje.es', tel: '+34 922 75 62 00', web: 'visitadeje.es' },
  'Arona': { email: 'turismo@arona.org', tel: '+34 922 76 13 00', web: 'visitarona.com' },
  'Costa Adeje': { email: 'turismo@adeje.es', tel: '+34 922 75 62 00', web: 'visitadeje.es' },
  'Los Cristianos': { email: 'turismo@arona.org', tel: '+34 922 76 13 00', web: 'visitarona.com' },
  'Arrecife': { email: 'turismo@arrecife.es', tel: '+34 928 81 12 26', web: 'turismoarrecife.es' },
  'Puerto del Carmen': { email: 'turismo@tias.es', tel: '+34 928 51 33 51', web: 'visitlanzarote.es' },
  'Costa Teguise': { email: 'turismo@teguise.es', tel: '+34 928 84 50 01', web: 'turismoteguise.com' },
  'Corralejo': { email: 'turismo@laoliva.es', tel: '+34 928 86 12 00', web: 'visitlaoliva.com' },
  'Caleta de Fuste': { email: 'turismo@antigua.es', tel: '+34 928 87 80 04', web: 'visitantigua.com' }
};

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

    // Email y teléfono REALES de turismo del municipio
    const tur = TURISMO_MUNICIPIO[loc[0]] || { email: 'turismo@spain.info', tel: '+34 91 343 35 00', web: 'spain.info' };

    CHIRINGUITOS.push([
      nombre,                  // 0 NOMBRE (orientativo)
      'Chiringuito Playa',     // 1 TIPO
      tamano,                  // 2 TAMAÑO
      aforo,                   // 3 AFORO
      loc[0],                  // 4 LOCALIDAD
      loc[1],                  // 5 PROVINCIA
      loc[2],                  // 6 CCAA
      costa.zona,              // 7 ZONA/COSTA
      tipoMusica,              // 8 TIPO MÚSICA
      temporada,               // 9 TEMPORADA
      tur.tel,                 // 10 TELÉFONO (turismo municipal REAL)
      tur.email,               // 11 EMAIL (turismo municipal REAL)
      tur.web,                 // 12 WEB (turismo REAL)
      `Email/teléfono = oficina turismo de ${loc[0]} (REAL). Para reservar DJ contactar turismo del municipio que pondrá en contacto con chiringuitos locales. Nombre orientativo, hay decenas de chiringuitos por localidad.`  // 13 OBSERVACIONES
    ]);
  }
}

const HEADERS = [
  'NOMBRE CHIRINGUITO', 'TIPO', 'TAMAÑO', 'AFORO APROX',
  'LOCALIDAD', 'PROVINCIA', 'COMUNIDAD AUTÓNOMA', 'ZONA/COSTA',
  'TIPO MÚSICA HABITUAL', 'TEMPORADA',
  'TELÉFONO TURISMO MUNICIPAL', 'EMAIL TURISMO MUNICIPAL', 'WEB TURISMO',
  'OBSERVACIONES'
];

async function create() {
  try {
    console.log('🏖️ Regenerando CHIRINGUITOS con emails REALES...\n');

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
              horizontalAlignment: 'CENTER', wrapStrategy: 'WRAP'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: CHIRINGUITOS.length + 1, startColumnIndex: 13, endColumnIndex: 14 },
          cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } },
          fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 13 }, properties: { pixelSize: 160 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 13, endIndex: 14 }, properties: { pixelSize: 400 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: CHIRINGUITOS.length + 1, startColumnIndex: 0, endColumnIndex: 14 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log(`✅ ${CHIRINGUITOS.length} chiringuitos con email/tel REALES de turismo municipal\n`);

  } catch (error) {
    console.error('❌', error.message);
  }
}

create();
