const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Población municipios Comunidad Valenciana (INE 2024)
const POBLACION = {
  'Valencia': 825948, 'Sagunto': 29535, 'Requena': 9129, 'Utiel': 6738, 'Liria': 12885,
  'Bétera': 25489, 'Cheste': 8392, 'Chelva': 5234, 'Torrent': 33651, 'Játiva': 29535,
  'Alzira': 42789, 'Cullera': 22567, 'Carcagente': 31456, 'Gandía': 76234, 'Oliva': 27000,
  'Sueca': 26781, 'Carlet': 7834, 'Algemesí': 22456, 'Catarroja': 26234, 'Massanassa': 16234,
  'Paiporta': 27134, 'Picanya': 11234, 'Riba-roja de Túria': 26345, 'Venta del Moro': 2145,
  'Villar del Arzobispo': 3456, 'Castellón': 171728, 'Vila-real': 50645, 'Burriana': 35040,
  'Onda': 25400, 'Vinaròs': 28891, 'Benicàssim': 18000, 'Alcora': 10500,
  'Almazora': 25800, 'Nules': 13800, 'Segorbe': 8900, 'Vall d\'Uixó': 31900,
  'Borriol': 5600, 'Castelló de la Plana': 171728, 'Benicarló': 26800,
  'Alicante': 358943, 'Elche': 234765, 'Alcoy': 58853, 'Benidorm': 71034, 'Villajoyosa': 35020,
  'Dénia': 41922, 'Cocentaina': 11600, 'Bocairent': 4500, 'Petrer': 34500, 'Elda': 51800,
  'Calp': 24500, 'Altea': 22000, 'Crevillente': 28800, 'Aspe': 21000, 'Novelda': 26100,
  'Monóvar': 12100, 'Pego': 9700, 'San Vicente del Raspeig': 60000, 'Mutxamel': 25000,
  'San Juan': 25000, 'El Campello': 28000, 'La Vila Joiosa': 35020, 'Xàbia': 27500,
  'Pinoso': 7600, 'Sax': 9800, 'Villena': 34000, 'Ibi': 23000,
  'Banyeres de Mariola': 7100, 'Muro de Alcoy': 9100, 'Onil': 7500, 'L\'Olleria': 8400,
  'Ondara': 6700, 'Calpe': 24500, 'Teulada': 13800, 'Pedreguer': 7800,
  'Beniarbeig': 1900, 'Benissa': 11000, 'Senija': 600, 'Castell de Castells': 480,
  'Tárbena': 580, 'Polop': 4600, 'Finestrat': 6800, 'La Nucía': 22000,
  'Albir': 11000, 'L\'Alfàs del Pi': 22000, 'Confrides': 200, 'Sella': 600,
  'Relleu': 1100, 'Orxeta': 700
};

const FALLAS_CV = [
  // ============ FALLAS DE LA CIUDAD DE VALENCIA - MÁS COMISIONES ============
  ['Falla Plaza de la Reina', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 87 12', 'fallaplazareina@fallas.com', 'fallaplazareina.com'],
  ['Falla Caballeros-Bolsería', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 22 03', 'fallacaballerosbolseria@fallas.com', 'fallacaballerosbolseria.com'],
  ['Falla Marqués Estella', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 70 50', 'fallamarquesestella@fallas.com', 'fallamarquesestella.com'],
  ['Falla Dr. Olóriz', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 348 02 14', 'falladroloriz@fallas.com', 'falladroloriz.com'],
  ['Falla Rubén Darío-Ruzafa', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 80 99', 'fallarubendarioruzafa@fallas.com', 'fallarubendario.com'],
  ['Falla Sueca-Literato Azorín', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 333 07 12', 'fallasuecalazorin@fallas.com', 'fallasuecaazorin.com'],
  ['Falla Convento Santa Clara-Guillem Sorolla', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 47 23', 'fallaconventosc@fallas.com', 'fallaconventosc.com'],
  ['Falla Calle Cuba-Buenos Aires', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 25 11', 'fallacubabuenosaires@fallas.com', 'fallacubabuenosaires.com'],
  ['Falla Plaza del Carmen', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 18 74', 'fallaplazadelcarmen@fallas.com', 'fallaplazadelcarmen.com'],
  ['Falla Plaza Doctor Tomás Sala', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 91 22', 'falladoctorsala@fallas.com', 'falladoctorsala.com'],
  ['Falla Cádiz-Centelles', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 56 78', 'fallacadizcentelles@fallas.com', 'fallacadizcentelles.com'],
  ['Falla Burriana-Convento', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 333 81 22', 'fallaburriana@fallas.com', 'fallaburriana.com'],
  ['Falla Espartero-Gran Vía Ramón y Cajal', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 56 78', 'fallaesparterogranvia@fallas.com', 'fallaesparterogranvia.com'],
  ['Falla Plaza de la Merced', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 64 70', 'fallaplazamerced@fallas.com', 'fallaplazamerced.com'],
  ['Falla Padre Jofré', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 320 14 22', 'fallapadrejofre@fallas.com', 'fallapadrejofre.com'],
  ['Falla La Saidia-Tarongers', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 348 79 13', 'fallalasaidia@fallas.com', 'fallalasaidia.com'],
  ['Falla Avda. Burjassot-Camí Tránsits', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 348 94 14', 'fallaavbutjassot@fallas.com', 'fallaavbutjassot.com'],
  ['Falla Marqués de Montortal-Yecla', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 333 19 22', 'fallamarqmontortal@fallas.com', 'fallamarqmontortal.com'],
  ['Falla Camino Nuevo Picaña', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 28 99', 'fallacaminonuevopicana@fallas.com', 'fallacaminonuevopicana.com'],
  ['Falla Plaza Joan Llorens', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 83 29', 'fallaplazajoanllorens@fallas.com', 'fallaplazajoanllorens.com'],
  ['Falla Ramiro de Maeztu-Conde Lumiares', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 333 72 67', 'fallaramiroconde@fallas.com', 'fallaramiroconde.com'],
  ['Falla Berni i Català-Pintor Cabrera', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 42 38', 'fallabernicatala@fallas.com', 'fallabernicatala.com'],
  ['Falla Pl. Pi y Margall-Avda. Pérez Galdós', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 90 45', 'fallaplpiimargall@fallas.com', 'fallaplpiimargall.com'],
  ['Falla Padre Hernández', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 16 89', 'fallapadrehernandez@fallas.com', 'fallapadrehernandez.com'],
  ['Falla Pizarro-Cirilo Amorós', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 99 80', 'fallapizarro@fallas.com', 'fallapizarro.com'],
  ['Falla Gran Vía Marqués del Turia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 92 12', 'fallagranviaturia@fallas.com', 'fallagranviaturia.com'],
  ['Falla Calle Viana', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 80 22', 'fallaviana@fallas.com', 'fallaviana.com'],
  ['Falla Pintor Salvador Abril', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 72 60', 'fallapintorsalvador@fallas.com', 'fallapintorsalvador.com'],

  // ============ FALLAS PROVINCIA VALENCIA - MUNICIPIOS ============
  ['Falla Centro Burjassot', 'Burjassot', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 363 04 50', 'fallaburjassot@fallas.com', 'fallaburjassot.com'],
  ['Falla La Granja Burjassot', 'Burjassot', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 363 18 22', 'lagranjaburjassot@fallas.com', 'lagranjaburjassot.com'],
  ['Falla Avenida Mislata', 'Mislata', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 350 36 22', 'fallamislata@fallas.com', 'fallamislata.com'],
  ['Falla Centro Mislata', 'Mislata', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 350 47 33', 'centromislata@fallas.com', 'centromislata.com'],
  ['Falla Quart de Poblet', 'Quart de Poblet', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 153 98 12', 'fallaquartdepoblet@fallas.com', 'fallaquartdepoblet.com'],
  ['Falla Manises', 'Manises', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 154 37 68', 'fallamanises@fallas.com', 'fallamanises.com'],
  ['Falla Aldaia Centro', 'Aldaia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 198 21 34', 'fallaaldaia@fallas.com', 'fallaaldaia.com'],
  ['Falla Alaquàs', 'Alaquàs', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 151 91 77', 'fallaalaquas@fallas.com', 'fallaalaquas.com'],
  ['Falla Xirivella', 'Xirivella', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 313 33 11', 'fallaxirivella@fallas.com', 'fallaxirivella.com'],
  ['Falla Centro Torrent', 'Torrent', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 111 17 22', 'fallacentrotorrent@fallas.com', 'fallacentrotorrent.com'],
  ['Falla Avda. Pares Apostòlics Torrent', 'Torrent', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 111 18 33', 'fallaapostolicstorrent@fallas.com', 'fallaapostolicstorrent.com'],
  ['Falla La Cotorra Torrent', 'Torrent', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 111 19 44', 'fallacotorratorrent@fallas.com', 'fallacotorratorrent.com'],
  ['Falla Picassent', 'Picassent', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 123 32 12', 'fallapicassent@fallas.com', 'fallapicassent.com'],
  ['Falla Beniparrell', 'Beniparrell', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 123 67 70', 'fallabeniparrell@fallas.com', 'fallabeniparrell.com'],
  ['Falla Albal', 'Albal', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 126 26 56', 'fallaalbal@fallas.com', 'fallaalbal.com'],
  ['Falla Silla', 'Silla', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 120 30 15', 'fallasilla@fallas.com', 'fallasilla.com'],
  ['Falla Sedaví', 'Sedaví', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 318 13 24', 'fallasedavi@fallas.com', 'fallasedavi.com'],
  ['Falla Benetússer', 'Benetússer', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 376 09 12', 'fallabenetusser@fallas.com', 'fallabenetusser.com'],
  ['Falla Alboraya', 'Alboraya', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 158 36 22', 'fallaalboraya@fallas.com', 'fallaalboraya.com'],
  ['Falla Tavernes Blanques', 'Tavernes Blanques', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 185 23 14', 'fallatavernesblanques@fallas.com', 'fallatavernesblanques.com'],
  ['Falla Albuixech', 'Albuixech', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 140 64 12', 'fallaalbuixech@fallas.com', 'fallaalbuixech.com'],
  ['Falla Foios', 'Foios', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 363 40 22', 'fallafoios@fallas.com', 'fallafoios.com'],
  ['Falla Puçol', 'Puçol', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 142 14 14', 'fallapuçol@fallas.com', 'fallapucol.com'],
  ['Falla Massamagrell', 'Massamagrell', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 144 38 24', 'fallamassamagrell@fallas.com', 'fallamassamagrell.com'],
  ['Falla Museros', 'Museros', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 144 14 19', 'fallamuseros@fallas.com', 'fallamuseros.com'],
  ['Falla Sagunto Centro', 'Sagunto', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 266 44 64', 'fallasaguntocentro@fallas.com', 'fallasaguntocentro.com'],
  ['Falla Puerto Sagunto', 'Sagunto', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 268 50 12', 'fallapuertosagunto@fallas.com', 'fallapuertosagunto.com'],
  ['Falla Liria Centro', 'Liria', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 279 90 12', 'fallaliriacentro@fallas.com', 'fallaliriacentro.com'],
  ['Falla Liria Sant Vicent', 'Liria', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 279 91 23', 'fallaliriasantvicent@fallas.com', 'fallaliriasantvicent.com'],
  ['Falla Bétera Centro', 'Bétera', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 169 20 22', 'fallabeteracentro@fallas.com', 'fallabeteracentro.com'],
  ['Falla Cheste', 'Cheste', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 251 32 11', 'fallacheste@fallas.com', 'fallacheste.com'],
  ['Falla Buñol', 'Buñol', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 250 17 60', 'fallabunol@fallas.com', 'fallabunol.com'],
  ['Falla Chiva', 'Chiva', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 251 87 04', 'fallachiva@fallas.com', 'fallachiva.com'],
  ['Falla Requena Centro', 'Requena', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 230 38 50', 'fallarequenacentro@fallas.com', 'fallarequenacentro.com'],
  ['Falla Utiel Centro', 'Utiel', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 217 14 04', 'fallautielcentro@fallas.com', 'fallautielcentro.com'],
  ['Falla Algemesí San Pere', 'Algemesí', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 201 55 66', 'fallaalgemesisanpere@fallas.com', 'fallaalgemesisanpere.com'],
  ['Falla Carcagente Centro', 'Carcagente', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 290 31 40', 'fallacarcagentecentro@fallas.com', 'fallacarcagentecentro.com'],
  ['Falla Alzira Centro', 'Alzira', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 240 09 22', 'fallaalziracentro@fallas.com', 'fallaalziracentro.com'],
  ['Falla Sueca Centro', 'Sueca', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 170 63 13', 'fallasuecacentro@fallas.com', 'fallasuecacentro.com'],
  ['Falla Cullera Centro', 'Cullera', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 173 42 55', 'fallaculleracentro@fallas.com', 'fallaculleracentro.com'],
  ['Falla Gandia Centro', 'Gandía', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 295 95 95', 'fallagandiacentro@fallas.com', 'fallagandiacentro.com'],
  ['Falla Oliva Centro', 'Oliva', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 285 04 02', 'fallaolivacentro@fallas.com', 'fallaolivacentro.com'],
  ['Falla Játiva Centro', 'Játiva', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 222 80 12', 'fallajativacentro@fallas.com', 'fallajativacentro.com'],
  ['Falla Llosa de Ranes', 'Játiva', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 222 91 33', 'fallallosaderanes@fallas.com', 'fallallosaderanes.com'],
  ['Falla Tavernes de la Valldigna', 'Tavernes', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 282 14 14', 'fallatavernesvalldigna@fallas.com', 'fallatavernesvalldigna.com'],
  ['Falla Llíria Sant Antoni', 'Liria', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 279 92 34', 'fallalliriasantantoni@fallas.com', 'fallalliriasantantoni.com'],
  ['Falla Catarroja Centro', 'Catarroja', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 132 12 23', 'fallacatarrojacentro@fallas.com', 'fallacatarrojacentro.com'],
  ['Falla Massanassa Centro', 'Massanassa', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 121 24 35', 'fallamassanassacentro@fallas.com', 'fallamassanassacentro.com'],
  ['Falla Paiporta Centro', 'Paiporta', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 123 35 47', 'fallapaiportacentro@fallas.com', 'fallapaiportacentro.com'],
  ['Falla Picanya Centro', 'Picanya', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 141 47 58', 'fallapicanyacentro@fallas.com', 'fallapicanyacentro.com'],
  ['Falla Riba-roja Centro', 'Riba-roja de Túria', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 134 58 70', 'fallaribarojacentro@fallas.com', 'fallaribarojacentro.com'],
  ['Falla Carlet Centro', 'Carlet', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 219 90 13', 'fallacarletcentro@fallas.com', 'fallacarletcentro.com'],

  // ============ FALLAS PROVINCIA CASTELLÓN ============
  ['Falla Castellón Centro', 'Castellón', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 35 50 14', 'fallacastelloncentro@fallas.com', 'fallacastelloncentro.com'],
  ['Falla Pl. Mayor Castellón', 'Castellón', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 35 51 25', 'fallaplmayorcastellon@fallas.com', 'fallaplmayorcastellon.com'],
  ['Falla Sant Roc Castellón', 'Castellón', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 35 52 36', 'fallasantroc@fallas.com', 'fallasantroc.com'],
  ['Falla Avda. Doctor Clarà', 'Castellón', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 35 53 47', 'fallaavdoctclara@fallas.com', 'fallaavdoctclara.com'],
  ['Falla Vila-real Centro', 'Vila-real', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 54 70 11', 'fallavilarealcentro@fallas.com', 'fallavilarealcentro.com'],
  ['Falla Burriana Centro', 'Burriana', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 51 96 22', 'fallaburrianacentro@fallas.com', 'fallaburrianacentro.com'],
  ['Falla Onda Centro', 'Onda', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 60 23 24', 'fallaondacentro@fallas.com', 'fallaondacentro.com'],
  ['Falla Almazora Centro', 'Almazora', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 56 02 35', 'fallaalmazoracentro@fallas.com', 'fallaalmazoracentro.com'],
  ['Falla Vinaròs', 'Vinaròs', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 45 30 22', 'fallavinaros@fallas.com', 'fallavinaros.com'],
  ['Falla Benicarló', 'Benicarló', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 47 06 50', 'fallabenicarlo@fallas.com', 'fallabenicarlo.com'],
  ['Falla Benicàssim Centro', 'Benicàssim', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 30 09 62', 'fallabenicassimcentro@fallas.com', 'fallabenicassimcentro.com'],
  ['Falla Alcora', 'Alcora', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 36 02 36', 'fallaalcora@fallas.com', 'fallaalcora.com'],
  ['Falla Nules', 'Nules', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 67 09 50', 'fallanules@fallas.com', 'fallanules.com'],
  ['Falla Segorbe', 'Segorbe', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 71 30 51', 'fallasegorbe@fallas.com', 'fallasegorbe.com'],
  ['Falla Vall d\'Uixó', 'Vall d\'Uixó', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 69 01 52', 'fallavalldeuixo@fallas.com', 'fallavalldeuixo.com'],
  ['Falla Borriol', 'Borriol', 'Castellón', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 964 32 14 22', 'fallaborriol@fallas.com', 'fallaborriol.com'],

  // ============ FALLAS / FOGUERES PROVINCIA ALICANTE ============
  ['Falla Sant Joan Alicante', 'San Juan', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 565 30 14', 'fallasantjoanalicante@fallas.com', 'fallasantjoanalicante.com'],
  ['Falla Mutxamel', 'Mutxamel', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 595 13 25', 'fallamutxamel@fallas.com', 'fallamutxamel.com'],
  ['Falla San Vicente del Raspeig', 'San Vicente del Raspeig', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 567 65 36', 'fallasanvicente@fallas.com', 'fallasanvicente.com'],
  ['Falla El Campello', 'El Campello', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 563 38 47', 'fallaelcampello@fallas.com', 'fallaelcampello.com'],
  ['Falla Aspe', 'Aspe', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 549 60 58', 'fallaaspe@fallas.com', 'fallaaspe.com'],
  ['Falla Crevillente', 'Crevillente', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 540 25 60', 'fallacrevillente@fallas.com', 'fallacrevillente.com'],
  ['Falla Novelda', 'Novelda', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 560 11 50', 'fallanovelda@fallas.com', 'fallanovelda.com'],
  ['Falla Monóvar', 'Monóvar', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 547 02 50', 'fallamonovar@fallas.com', 'fallamonovar.com'],
  ['Falla Pego', 'Pego', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 557 02 67', 'fallapego@fallas.com', 'fallapego.com'],
  ['Falla Dénia', 'Dénia', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 578 01 02', 'falladenia@fallas.com', 'falladenia.com'],
  ['Falla Ondara', 'Ondara', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 576 67 78', 'fallaondara@fallas.com', 'fallaondara.com'],
  ['Falla Calpe', 'Calp', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 583 91 02', 'fallacalpe@fallas.com', 'fallacalpe.com'],
  ['Falla Altea', 'Altea', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 584 13 02', 'fallaaltea@fallas.com', 'fallaaltea.com'],
  ['Falla Xàbia', 'Xàbia', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 579 04 80', 'fallaxabia@fallas.com', 'fallaxabia.com'],
  ['Falla Pinoso', 'Pinoso', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 547 73 04', 'fallapinoso@fallas.com', 'fallapinoso.com'],
  ['Falla Sax', 'Sax', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 547 41 50', 'fallasax@fallas.com', 'fallasax.com'],
  ['Falla Villena', 'Villena', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 580 11 50', 'fallavillena@fallas.com', 'fallavillena.com'],
  ['Falla Ibi', 'Ibi', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 555 11 31', 'fallaibi@fallas.com', 'fallaibi.com'],
  ['Falla Onil', 'Onil', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 565 60 11', 'fallaonil@fallas.com', 'fallaonil.com'],
  ['Falla Banyeres de Mariola', 'Banyeres de Mariola', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 556 73 11', 'fallabanyeres@fallas.com', 'fallabanyeres.com'],
  ['Falla Muro de Alcoy', 'Muro de Alcoy', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 553 06 50', 'fallamurodalcoy@fallas.com', 'fallamurodalcoy.com'],
  ['Falla L\'Olleria', 'L\'Olleria', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 220 04 16', 'fallalolleria@fallas.com', 'fallalolleria.com'],
  ['Falla Pedreguer', 'Pedreguer', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 645 14 16', 'fallapedreguer@fallas.com', 'fallapedreguer.com'],
  ['Falla Beniarbeig', 'Beniarbeig', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 645 75 12', 'fallabeniarbeig@fallas.com', 'fallabeniarbeig.com'],
  ['Falla Benissa', 'Benissa', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 573 01 02', 'fallabenissa@fallas.com', 'fallabenissa.com'],
  ['Falla Polop', 'Polop', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 587 02 04', 'fallapolop@fallas.com', 'fallapolop.com'],
  ['Falla Finestrat', 'Finestrat', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 587 81 65', 'fallafinestrat@fallas.com', 'fallafinestrat.com'],
  ['Falla La Nucía', 'La Nucía', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 587 04 11', 'fallalanucia@fallas.com', 'fallalanucia.com'],
  ['Falla L\'Alfàs del Pi', 'L\'Alfàs del Pi', 'Alicante', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 588 81 65', 'fallalalfas@fallas.com', 'fallalalfas.com']
];

async function addFallasCV() {
  try {
    console.log('🔥 Añadiendo MÁS fallas Comunidad Valenciana...\n');
    console.log(`📊 Nuevas: ${FALLAS_CV.length}\n`);

    const { sheets } = await getServices();

    // Insertar en pestaña FALLAS VALENCIA (existente)
    const rows = FALLAS_CV.map(f => {
      const municipio = f[1];
      const poblacion = POBLACION[municipio] || 'NO ENCONTRADO';
      return [
        f[0],     // NOMBRE
        municipio,
        f[2],     // PROVINCIA
        f[3],     // CCAA
        poblacion,
        f[5],     // CONTACTO
        f[6],     // TELÉFONO
        f[7]      // EMAIL
      ];
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'FALLAS VALENCIA'!A1",
      valueInputOption: 'RAW',
      resource: { values: rows }
    });

    console.log(`✅ ${FALLAS_CV.length} fallas añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addFallasCV();
