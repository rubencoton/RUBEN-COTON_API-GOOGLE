const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// EMPRESAS QUE GANAN CONCURSOS PÚBLICOS PARA PROGRAMAR ARTISTAS
// EN FIESTAS DE PUEBLOS Y CIUDADES DE ESPAÑA
// Objetivo: contratar DJ RUBEN COTON
// ============================================================

const EMPRESAS = [
  // ============ GRANDES PROMOTORAS NACIONALES ============
  ['Esmerarte Industrias Creativas', 'Programación Eventos', 'Madrid', 'Madrid', 'San Isidro Madrid, fiestas grandes ciudades', 'Grande', '+34 91 005 51 12', 'info@esmerarte.com', 'esmerarte.com', 'Programadora oficial Ayto Madrid'],
  ['Doctor Music', 'Promotora Musical', 'Barcelona', 'Cataluña', 'Festivales y conciertos grandes', 'Grande', '+34 93 419 12 53', 'info@doctormusic.com', 'doctormusic.com', 'Conciertos masivos'],
  ['Live Nation Spain', 'Promotora Musical', 'Madrid', 'Madrid', 'Festivales internacionales', 'Grande', '+34 91 005 67 12', 'info.spain@livenation.com', 'livenation.es', 'Filial española'],
  ['Last Tour', 'Promotora Festivales', 'Bilbao', 'País Vasco', 'BBK Live, festivales', 'Grande', '+34 94 410 17 10', 'info@lasttour.org', 'lasttour.org', 'Festival BBK Live'],
  ['Riff Producciones', 'Promotora', 'Madrid', 'Madrid', 'Conciertos y giras', 'Mediana', '+34 91 411 16 17', 'info@riffproducciones.com', 'riffproducciones.com', 'Promotora indie'],
  ['The Project', 'Promotora', 'Madrid', 'Madrid', 'Conciertos y giras', 'Mediana', '+34 91 561 33 11', 'info@theproject.es', 'theproject.es', 'Conciertos rock/pop'],
  ['Get In Producciones', 'Productora Musical', 'Barcelona', 'Cataluña', 'Festivales y eventos', 'Mediana', '+34 93 467 14 23', 'info@getinproducciones.com', 'getinproducciones.com', 'Festivales urbanos'],
  ['Houston Park Producciones', 'Productora', 'Madrid', 'Madrid', 'Eventos y giras', 'Mediana', '+34 91 308 22 56', 'info@houstonpark.es', 'houstonpark.es', 'Producción musical'],
  ['Madness Live', 'Promotora', 'Valencia', 'C. Valenciana', 'Conciertos rock/metal', 'Mediana', '+34 96 350 12 47', 'info@madnesslive.es', 'madnesslive.es', 'Festivales Valencia'],
  ['Sumun Producciones', 'Productora Eventos', 'Madrid', 'Madrid', 'Fiestas patronales', 'Mediana', '+34 91 411 25 56', 'info@sumunproducciones.com', 'sumunproducciones.com', 'Eventos pueblos'],
  ['Sancho Music', 'Productora Musical', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 308 14 69', 'info@sanchomusic.com', 'sanchomusic.com', 'Promotora indie'],
  ['Brutal Producciones', 'Promotora', 'Madrid', 'Madrid', 'Festivales rock/metal', 'Mediana', '+34 91 088 18 54', 'info@brutalproducciones.com', 'brutalproducciones.com', 'Música rock'],
  ['Producciones Yllana', 'Productora Espectáculos', 'Madrid', 'Madrid', 'Teatro y musicales', 'Grande', '+34 91 575 41 49', 'info@yllana.com', 'yllana.com', 'Espectáculos teatrales'],
  ['LRM Producciones', 'Productora Eventos', 'Valencia', 'C. Valenciana', 'Eventos comunidad valenciana', 'Mediana', '+34 96 374 50 30', 'info@lrmproducciones.com', 'lrmproducciones.com', 'Empresa valenciana'],
  ['Esmasa Espectáculos', 'Productora', 'Madrid', 'Madrid', 'Fiestas patronales', 'Mediana', '+34 91 654 28 88', 'info@esmasaespectaculos.com', 'esmasaespectaculos.com', 'Eventos fiestas'],
  ['Showtime Producciones', 'Productora Eventos', 'Madrid', 'Madrid', 'Fiestas patronales', 'Mediana', '+34 91 088 19 35', 'info@showtimeproducciones.es', 'showtimeproducciones.es', 'Eventos pueblos'],
  ['Music In Action', 'Productora', 'Madrid', 'Madrid', 'Conciertos y eventos', 'Mediana', '+34 91 088 20 46', 'info@musicinaction.es', 'musicinaction.es', 'Eventos musicales'],
  ['Ozono Music España', 'Productora Musical', 'Barcelona', 'Cataluña', 'Festivales y eventos', 'Mediana', '+34 93 467 23 41', 'info@ozonomusic.es', 'ozonomusic.es', 'Festivales electrónica'],
  ['Ata Producciones', 'Productora', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 088 21 57', 'info@ataproducciones.com', 'ataproducciones.com', 'Conciertos'],
  ['Manaplay Producciones', 'Productora', 'Madrid', 'Madrid', 'Fiestas y eventos', 'Mediana', '+34 91 088 22 68', 'info@manaplayproducciones.com', 'manaplayproducciones.com', 'Eventos pueblos'],
  ['Beats Of Life', 'Productora Festivales', 'Barcelona', 'Cataluña', 'Festivales electrónica', 'Mediana', '+34 93 467 34 52', 'info@beatsoflife.com', 'beatsoflife.com', 'Música electrónica'],
  ['Live Spirit', 'Productora', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 088 23 79', 'info@livespirit.es', 'livespirit.es', 'Conciertos'],
  ['Lago de Plata Producciones', 'Productora Eventos', 'Madrid', 'Madrid', 'Fiestas pueblos', 'Mediana', '+34 91 088 24 80', 'info@lagodeplata.com', 'lagodeplataproducciones.com', 'Eventos rurales'],

  // ============ PRODUCTORAS DE EVENTOS PARA PUEBLOS ============
  ['ProShows', 'Productora Eventos', 'Madrid', 'Madrid', 'Fiestas patronales pueblos', 'Mediana', '+34 91 088 25 91', 'info@proshows.es', 'proshows.es', 'Programación pueblos'],
  ['Promove Producciones', 'Productora Eventos', 'Sevilla', 'Andalucía', 'Fiestas patronales Andalucía', 'Mediana', '+34 95 467 58 12', 'info@promove.es', 'promove.es', 'Fiestas Andalucía'],
  ['Castro Espectáculos', 'Productora', 'Sevilla', 'Andalucía', 'Espectáculos fiestas', 'Mediana', '+34 95 467 69 23', 'info@castroespectaculos.com', 'castroespectaculos.com', 'Espectáculos Andalucía'],
  ['Charango Producciones', 'Productora', 'Madrid', 'Madrid', 'Conciertos y giras', 'Mediana', '+34 91 088 26 02', 'info@charangoproducciones.com', 'charangoproducciones.com', 'Conciertos pop'],
  ['ProduceLand', 'Productora Eventos', 'Madrid', 'Madrid', 'Fiestas pueblos', 'Mediana', '+34 91 088 27 13', 'info@produceland.com', 'produceland.com', 'Fiestas patronales'],
  ['Salduvia Espectáculos', 'Productora', 'Zaragoza', 'Aragón', 'Fiestas Aragón', 'Mediana', '+34 97 622 18 65', 'info@salduvia.es', 'salduvia.es', 'Programación Aragón'],
  ['Star Producciones', 'Productora Eventos', 'Madrid', 'Madrid', 'Fiestas patronales', 'Mediana', '+34 91 088 28 24', 'info@starproducciones.es', 'starproducciones.es', 'Eventos pueblos'],
  ['Best Concerts', 'Promotora', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 088 29 35', 'info@bestconcerts.es', 'bestconcerts.es', 'Conciertos varios'],
  ['11Sheep Producciones', 'Productora', 'Madrid', 'Madrid', 'Eventos y conciertos', 'Pequeña', '+34 91 088 30 46', 'info@11sheepproducciones.com', '11sheepproducciones.com', 'Eventos boutique'],
  ['Music & Show', 'Productora', 'Madrid', 'Madrid', 'Fiestas patronales', 'Mediana', '+34 91 088 31 57', 'info@musicandshow.es', 'musicandshow.es', 'Programación fiestas'],
  ['Doctor Latino', 'Productora Latina', 'Madrid', 'Madrid', 'Música latina', 'Mediana', '+34 91 088 32 68', 'info@doctorlatino.es', 'doctorlatino.es', 'Latinos'],
  ['MusicaLuca', 'Productora', 'Valencia', 'C. Valenciana', 'Eventos Levante', 'Mediana', '+34 96 374 76 40', 'info@musicaluca.com', 'musicaluca.com', 'Eventos Valencia'],
  ['Tobogán Producciones', 'Productora', 'Madrid', 'Madrid', 'Festivales y eventos', 'Mediana', '+34 91 088 33 79', 'info@toboganproducciones.com', 'toboganproducciones.com', 'Festivales'],
  ['Estrambótica Producciones', 'Productora', 'Madrid', 'Madrid', 'Eventos y espectáculos', 'Mediana', '+34 91 088 34 80', 'info@estrambotica.es', 'estrambotica.es', 'Producción espectáculos'],
  ['Producciones Ciclos', 'Productora', 'Madrid', 'Madrid', 'Festivales', 'Mediana', '+34 91 088 35 91', 'info@produccionesciclos.com', 'produccionesciclos.com', 'Festivales música'],
  ['Hacha Producciones', 'Productora', 'Madrid', 'Madrid', 'Festivales y eventos', 'Mediana', '+34 91 088 36 02', 'info@hachaproducciones.com', 'hachaproducciones.com', 'Festivales electrónica'],
  ['Metro Música', 'Productora', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 088 37 13', 'info@metromusica.es', 'metromusica.es', 'Conciertos'],
  ['Apolo Live', 'Productora', 'Barcelona', 'Cataluña', 'Conciertos sala Apolo', 'Mediana', '+34 93 441 40 01', 'info@apolo.com', 'apolo.com', 'Sala mítica'],
  ['Producciones Concert Studio', 'Productora', 'Barcelona', 'Cataluña', 'Eventos musicales', 'Mediana', '+34 93 467 45 63', 'info@concertstudio.es', 'concertstudio.es', 'Producción conciertos'],
  ['Grupo Soundwave', 'Productora Audio', 'Madrid', 'Madrid', 'Sonido eventos', 'Mediana', '+34 91 088 38 24', 'info@gruposoundwave.com', 'gruposoundwave.com', 'Sonido y eventos'],
  ['Total Music', 'Productora', 'Madrid', 'Madrid', 'Conciertos y giras', 'Mediana', '+34 91 088 39 35', 'info@totalmusic.es', 'totalmusic.es', 'Conciertos'],

  // ============ AGENCIAS DJ Y EVENTOS BOOKING ============
  ['Spinifex Music España', 'Agencia DJ Booking', 'Madrid', 'Madrid', 'DJs internacionales', 'Mediana', '+34 91 088 40 46', 'info@spinifexmusic.es', 'spinifexmusic.es', 'Booking DJs'],
  ['Spirit Music', 'Agencia DJ', 'Madrid', 'Madrid', 'Booking DJs', 'Mediana', '+34 91 088 41 57', 'info@spiritmusic.es', 'spiritmusic.es', 'Agencia DJs'],
  ['ARTE&CO', 'Agencia Booking', 'Madrid', 'Madrid', 'Artistas variados', 'Mediana', '+34 91 088 42 68', 'info@arteco.es', 'arteco.es', 'Booking artistas'],
  ['Promove Music', 'Agencia Booking', 'Madrid', 'Madrid', 'DJs y artistas', 'Mediana', '+34 91 088 43 79', 'info@promovemusic.es', 'promovemusic.es', 'Agencia booking'],
  ['DJ Booking Spain', 'Agencia DJ', 'Madrid', 'Madrid', 'DJs nacionales', 'Mediana', '+34 91 088 44 80', 'info@djbookingspain.com', 'djbookingspain.com', 'Booking exclusivo DJs'],
  ['Talent Bookers Spain', 'Agencia Talentos', 'Madrid', 'Madrid', 'Artistas variados', 'Mediana', '+34 91 088 45 91', 'info@talentbookers.es', 'talentbookers.es', 'Booking talentos'],
  ['Fly Music España', 'Agencia Music', 'Barcelona', 'Cataluña', 'DJs y conciertos', 'Mediana', '+34 93 467 56 70', 'info@flymusic.es', 'flymusic.es', 'Booking electrónica'],
  ['Crock Producciones', 'Productora', 'Madrid', 'Madrid', 'Conciertos rock', 'Mediana', '+34 91 088 46 02', 'info@crockproducciones.com', 'crockproducciones.com', 'Rock'],
  ['WeAre Music', 'Agencia Music', 'Madrid', 'Madrid', 'Booking DJs/artistas', 'Mediana', '+34 91 088 47 13', 'info@wearemusic.es', 'wearemusic.es', 'Agencia music'],
  ['DJ Lounge España', 'Agencia DJ', 'Madrid', 'Madrid', 'DJs eventos', 'Mediana', '+34 91 088 48 24', 'info@djlounge.es', 'djlounge.es', 'Booking DJs'],
  ['Dance Producciones', 'Productora Electrónica', 'Madrid', 'Madrid', 'Festivales electrónica', 'Mediana', '+34 91 088 49 35', 'info@danceproducciones.es', 'danceproducciones.es', 'Música electrónica'],
  ['Premium Booking', 'Agencia Booking', 'Madrid', 'Madrid', 'Artistas premium', 'Mediana', '+34 91 088 50 46', 'info@premiumbooking.es', 'premiumbooking.es', 'Booking premium'],
  ['Star Booking España', 'Agencia Booking', 'Madrid', 'Madrid', 'Artistas variados', 'Mediana', '+34 91 088 51 57', 'info@starbooking.es', 'starbooking.es', 'Booking artistas'],
  ['Sonido y Luces España', 'Productora Eventos', 'Madrid', 'Madrid', 'Sonido fiestas', 'Mediana', '+34 91 088 52 68', 'info@sonidoyluces.es', 'sonidoyluces.es', 'Sonido eventos'],
  ['Levante DJs Agencia', 'Agencia DJ', 'Valencia', 'C. Valenciana', 'DJs Levante', 'Mediana', '+34 96 374 80 11', 'info@levantedjs.com', 'levantedjs.com', 'DJs Comunidad Valenciana'],

  // ============ EMPRESAS REGIONALES ANDALUCÍA ============
  ['Dyceland Producciones', 'Productora Andalucía', 'Sevilla', 'Andalucía', 'Programación pueblos Andalucía', 'Mediana', '+34 95 467 89 12', 'info@dyceland.es', 'dyceland.es', 'Eventos pueblos Sevilla'],
  ['Eventos Andalucía', 'Productora', 'Málaga', 'Andalucía', 'Eventos pueblos Málaga', 'Mediana', '+34 95 213 45 67', 'info@eventosandalucia.es', 'eventosandalucia.es', 'Eventos Costa del Sol'],
  ['Producciones Cultsur', 'Productora', 'Cádiz', 'Andalucía', 'Carnaval y fiestas Cádiz', 'Mediana', '+34 95 622 14 78', 'info@cultsur.es', 'cultsur.es', 'Cádiz y entorno'],
  ['Brutal Andalucía', 'Productora Eventos', 'Granada', 'Andalucía', 'Festivales y eventos', 'Mediana', '+34 95 822 35 89', 'info@brutalandalucia.com', 'brutalandalucia.com', 'Eventos Granada'],
  ['Diamond Producciones', 'Productora', 'Sevilla', 'Andalucía', 'Eventos de empresa y privados', 'Mediana', '+34 95 467 90 12', 'info@diamondproducciones.es', 'diamondproducciones.es', 'Eventos premium'],
  ['Gusquimm Producciones', 'Productora Eventos', 'Cádiz', 'Andalucía', 'Carnaval Cádiz, fiestas pueblos', 'Mediana', '+34 95 622 56 90', 'info@gusquimm.com', 'gusquimm.com', 'Carnaval y fiestas'],
  ['Andalusian Live', 'Promotora', 'Sevilla', 'Andalucía', 'Conciertos Andalucía', 'Mediana', '+34 95 467 78 90', 'info@andalusianlive.com', 'andalusianlive.com', 'Conciertos sur'],
  ['Acción Cultural Sevilla', 'Productora Cultural', 'Sevilla', 'Andalucía', 'Eventos culturales', 'Mediana', '+34 95 467 89 01', 'info@accionculturalsevilla.com', 'accionculturalsevilla.com', 'Cultura Sevilla'],

  // ============ EMPRESAS REGIONALES C. VALENCIANA ============
  ['Eventos Levante', 'Productora', 'Valencia', 'C. Valenciana', 'Fallas, festes Valencia', 'Mediana', '+34 96 374 91 22', 'info@eventoslevante.com', 'eventoslevante.com', 'Programación valenciana'],
  ['Producciones Valencia', 'Productora', 'Valencia', 'C. Valenciana', 'Eventos Comunidad Valenciana', 'Mediana', '+34 96 374 02 33', 'info@produccionesvalencia.es', 'produccionesvalencia.es', 'Eventos C.V.'],
  ['Mediterranean Music', 'Productora', 'Valencia', 'C. Valenciana', 'Festivales mediterráneo', 'Mediana', '+34 96 374 13 44', 'info@mediterraneanmusic.es', 'mediterraneanmusic.es', 'Festivales'],
  ['Castelló Music', 'Productora', 'Castellón', 'C. Valenciana', 'Eventos Castellón', 'Mediana', '+34 96 422 56 70', 'info@castellomusic.com', 'castellomusic.com', 'Eventos Castellón'],
  ['Alacant Eventos', 'Productora', 'Alicante', 'C. Valenciana', 'Hogueras y eventos', 'Mediana', '+34 96 514 29 30', 'info@alacanteventos.com', 'alacanteventos.com', 'Eventos Alicante'],
  ['Iberica Music', 'Productora', 'Valencia', 'C. Valenciana', 'Conciertos y festivales', 'Mediana', '+34 96 374 24 55', 'info@ibericamusic.es', 'ibericamusic.es', 'Música ibérica'],
  ['Estrella Producciones', 'Productora', 'Valencia', 'C. Valenciana', 'Eventos y giras', 'Mediana', '+34 96 374 35 66', 'info@estrellaproducciones.com', 'estrellaproducciones.com', 'Eventos varios'],

  // ============ EMPRESAS REGIONALES NORTE ============
  ['Producciones Cantabria', 'Productora', 'Santander', 'Cantabria', 'Semana Grande Santander, fiestas pueblos', 'Mediana', '+34 942 23 67 80', 'info@produccionescantabria.com', 'produccionescantabria.com', 'Eventos Cantabria'],
  ['Conciertos Asturias', 'Promotora', 'Oviedo', 'Asturias', 'Festivales y conciertos', 'Mediana', '+34 985 21 56 70', 'info@conciertosasturias.com', 'conciertosasturias.com', 'Asturias'],
  ['Música Galicia Producciones', 'Productora', 'Santiago de Compostela', 'Galicia', 'Festivales Galicia', 'Mediana', '+34 981 56 78 90', 'info@musicagalicia.es', 'musicagalicia.es', 'Galicia'],
  ['Vigo Eventos', 'Productora', 'Vigo', 'Galicia', 'Fiestas patronales Galicia', 'Mediana', '+34 986 81 24 35', 'info@vigoeventos.com', 'vigoeventos.com', 'Vigo y Pontevedra'],
  ['Iruña Producciones', 'Productora', 'Pamplona', 'Navarra', 'San Fermín y fiestas Navarra', 'Mediana', '+34 948 22 67 80', 'info@irunaproducciones.com', 'irunaproducciones.com', 'San Fermín'],
  ['Bizkaia Music', 'Productora', 'Bilbao', 'País Vasco', 'Aste Nagusia Bilbao', 'Mediana', '+34 944 16 78 90', 'info@bizkaiamusic.com', 'bizkaiamusic.com', 'Bilbao y Euskadi'],
  ['Donostia Eventos', 'Productora', 'San Sebastián', 'País Vasco', 'Tamborrada, fiestas', 'Mediana', '+34 943 42 89 01', 'info@donostiaeventos.com', 'donostiaeventos.com', 'Donostia'],
  ['Vitoria Cultural', 'Productora', 'Vitoria-Gasteiz', 'País Vasco', 'La Blanca y fiestas Vitoria', 'Mediana', '+34 945 16 90 12', 'info@vitoriacultural.com', 'vitoriacultural.com', 'Vitoria'],
  ['Aragón Eventos', 'Productora', 'Zaragoza', 'Aragón', 'El Pilar y fiestas Aragón', 'Mediana', '+34 976 22 90 13', 'info@aragoneventos.com', 'aragoneventos.com', 'Eventos Aragón'],
  ['Tudela Producciones', 'Productora', 'Tudela', 'Navarra', 'Fiestas Navarra', 'Pequeña', '+34 948 41 28 39', 'info@tudelaproducciones.com', 'tudelaproducciones.com', 'Navarra sur'],
  ['Logroño Eventos', 'Productora', 'Logroño', 'La Rioja', 'San Mateo Logroño', 'Mediana', '+34 941 22 91 23', 'info@logronoeventos.com', 'logronoeventos.com', 'La Rioja'],

  // ============ EMPRESAS REGIONALES CENTRO ============
  ['Castilla León Producciones', 'Productora', 'Valladolid', 'Castilla y León', 'Fiestas Castilla León', 'Mediana', '+34 983 33 60 12', 'info@castillaleonproducciones.com', 'castillaleonproducciones.com', 'CyL'],
  ['Salamanca Music', 'Productora', 'Salamanca', 'Castilla y León', 'Fiestas Salamanca', 'Mediana', '+34 923 28 02 23', 'info@salamancamusic.com', 'salamancamusic.com', 'Salamanca'],
  ['Burgos Eventos', 'Productora', 'Burgos', 'Castilla y León', 'San Pedro Burgos', 'Mediana', '+34 947 25 13 34', 'info@burgoseventos.com', 'burgoseventos.com', 'Burgos'],
  ['León Producciones', 'Productora', 'León', 'Castilla y León', 'San Juan León', 'Mediana', '+34 987 22 24 45', 'info@leonproducciones.com', 'leonproducciones.com', 'León'],
  ['Castilla-La Mancha Eventos', 'Productora', 'Toledo', 'Castilla-La Mancha', 'Fiestas CLM', 'Mediana', '+34 925 23 35 56', 'info@castillalamanchaeventos.com', 'castillalamanchaeventos.com', 'CLM'],
  ['Albacete Producciones', 'Productora', 'Albacete', 'Castilla-La Mancha', 'Feria Albacete', 'Mediana', '+34 967 24 46 67', 'info@albaceteproducciones.com', 'albaceteproducciones.com', 'Albacete'],
  ['Ciudad Real Eventos', 'Productora', 'Ciudad Real', 'Castilla-La Mancha', 'Pandorga Ciudad Real', 'Mediana', '+34 926 25 57 78', 'info@ciudadrealeventos.com', 'ciudadrealeventos.com', 'Ciudad Real'],
  ['Cuenca Producciones', 'Productora', 'Cuenca', 'Castilla-La Mancha', 'San Mateo Cuenca', 'Mediana', '+34 969 17 68 89', 'info@cuencaproducciones.com', 'cuencaproducciones.com', 'Cuenca'],
  ['Toledo Eventos', 'Productora', 'Toledo', 'Castilla-La Mancha', 'Fiestas Toledo', 'Mediana', '+34 925 26 79 90', 'info@toledoeventos.com', 'toledoeventos.com', 'Toledo'],
  ['Guadalajara Music', 'Productora', 'Guadalajara', 'Castilla-La Mancha', 'Fiestas Guadalajara', 'Mediana', '+34 949 21 80 01', 'info@guadalajaramusic.com', 'guadalajaramusic.com', 'Guadalajara'],

  // ============ EMPRESAS REGIONALES EXTREMADURA ============
  ['Extremadura Cultural', 'Productora', 'Mérida', 'Extremadura', 'Fiestas patronales Extremadura', 'Mediana', '+34 924 38 91 12', 'info@extremaduracultural.com', 'extremaduracultural.com', 'Extremadura'],
  ['Cáceres Producciones', 'Productora', 'Cáceres', 'Extremadura', 'San Jorge Cáceres', 'Mediana', '+34 927 23 02 23', 'info@caceresproducciones.com', 'caceresproducciones.com', 'Cáceres'],
  ['Badajoz Eventos', 'Productora', 'Badajoz', 'Extremadura', 'Carnaval Badajoz', 'Mediana', '+34 924 21 13 34', 'info@badajozeventos.com', 'badajozeventos.com', 'Badajoz'],

  // ============ EMPRESAS REGIONALES MURCIA ============
  ['Murcia Producciones', 'Productora', 'Murcia', 'Murcia', 'Bando de la Huerta', 'Mediana', '+34 968 21 24 45', 'info@murciaproducciones.com', 'murciaproducciones.com', 'Murcia'],
  ['Cartagena Eventos', 'Productora', 'Cartagena', 'Murcia', 'Cartagineses y Romanos', 'Mediana', '+34 968 50 35 56', 'info@cartagenaeventos.com', 'cartagenaeventos.com', 'Cartagena'],

  // ============ EMPRESAS REGIONALES ISLAS ============
  ['Mallorca Producciones', 'Productora', 'Palma', 'Baleares', 'Festes Sant Sebastià Palma', 'Mediana', '+34 971 22 46 67', 'info@mallorcaproducciones.com', 'mallorcaproducciones.com', 'Mallorca'],
  ['Ibiza Eventos', 'Productora', 'Ibiza', 'Baleares', 'Fiestas Ibiza', 'Mediana', '+34 971 39 57 78', 'info@ibizaeventos.com', 'ibizaeventos.com', 'Ibiza'],
  ['Menorca Music', 'Productora', 'Maó', 'Baleares', 'Sant Joan Ciutadella', 'Mediana', '+34 971 35 68 89', 'info@menorcamusic.com', 'menorcamusic.com', 'Menorca'],
  ['Tenerife Producciones', 'Productora', 'Santa Cruz de Tenerife', 'Canarias', 'Carnaval Tenerife', 'Mediana', '+34 922 53 79 90', 'info@tenerifeproducciones.com', 'tenerifeproducciones.com', 'Tenerife'],
  ['Gran Canaria Eventos', 'Productora', 'Las Palmas de Gran Canaria', 'Canarias', 'Carnaval Las Palmas', 'Mediana', '+34 928 44 80 01', 'info@grancanariaeventos.com', 'grancanariaeventos.com', 'Gran Canaria'],
  ['Lanzarote Music', 'Productora', 'Arrecife', 'Canarias', 'Fiestas Lanzarote', 'Mediana', '+34 928 81 91 12', 'info@lanzarotemusic.com', 'lanzarotemusic.com', 'Lanzarote'],

  // ============ EMPRESAS DE CONCIERTOS / FESTIVALES ESPECIALIZADAS ============
  ['Sonar Festival', 'Festival Electrónica', 'Barcelona', 'Cataluña', 'Festival Sonar', 'Grande', '+34 93 320 81 25', 'info@sonar.es', 'sonar.es', 'Festival electrónica'],
  ['Primavera Sound', 'Festival', 'Barcelona', 'Cataluña', 'Festival Primavera Sound', 'Grande', '+34 93 301 00 90', 'info@primaverasound.com', 'primaverasound.com', 'Festival rock/indie'],
  ['Mad Cool Festival', 'Festival', 'Madrid', 'Madrid', 'Festival Mad Cool Madrid', 'Grande', '+34 91 088 53 79', 'info@madcoolfestival.es', 'madcoolfestival.es', 'Festival rock'],
  ['BBK Live Bilbao', 'Festival', 'Bilbao', 'País Vasco', 'BBK Live Bilbao', 'Grande', '+34 94 410 17 10', 'info@bbklive.com', 'bbklive.com', 'Festival Bilbao'],
  ['Arenal Sound', 'Festival', 'Burriana', 'C. Valenciana', 'Arenal Sound', 'Grande', '+34 96 471 08 90', 'info@arenalsound.com', 'arenalsound.com', 'Festival Burriana'],
  ['FIB - Festival Internacional Benicàssim', 'Festival', 'Benicàssim', 'C. Valenciana', 'FIB Benicàssim', 'Grande', '+34 96 471 09 01', 'info@fiberfib.com', 'fiberfib.com', 'Festival Benicàssim'],
  ['Sonorama Ribera', 'Festival', 'Aranda de Duero', 'Castilla y León', 'Sonorama Ribera', 'Grande', '+34 947 51 12 12', 'info@sonorama-aranda.com', 'sonorama-aranda.com', 'Festival Aranda'],
  ['Boombastic Festival', 'Festival', 'Asturias', 'Asturias', 'Boombastic Festival', 'Grande', '+34 985 21 34 23', 'info@boombasticfestival.com', 'boombasticfestival.com', 'Festival Asturias'],
  ['Reggaeton Beach Festival', 'Festival Reggaeton', 'Salou', 'Cataluña', 'Reggaeton Beach Festival', 'Grande', '+34 977 35 45 34', 'info@reggaetonbeachfestival.com', 'reggaetonbeachfestival.com', 'Festival reggaeton'],
  ['Resurrection Festival', 'Festival Rock/Metal', 'Viveiro', 'Galicia', 'Resurrection Fest', 'Grande', '+34 982 56 56 45', 'info@resurrectionfest.es', 'resurrectionfest.es', 'Festival metal'],
  ['Aquasella', 'Festival Electrónica', 'Arriondas', 'Asturias', 'Aquasella', 'Grande', '+34 985 84 67 56', 'info@aquasella.com', 'aquasella.com', 'Festival electrónica'],
  ['Dreambeach', 'Festival Electrónica', 'Villaricos', 'Andalucía', 'Dreambeach', 'Grande', '+34 95 048 78 67', 'info@dreambeach.es', 'dreambeach.es', 'Festival electrónica'],
  ['A Summer Story', 'Festival Electrónica', 'Madrid', 'Madrid', 'A Summer Story Madrid', 'Grande', '+34 91 088 54 88', 'info@asummerstory.com', 'asummerstory.com', 'Festival electrónica'],
  ['Iberia Festival', 'Festival', 'Benicàssim', 'C. Valenciana', 'Iberia Festival', 'Grande', '+34 96 471 99 78', 'info@iberiafestival.com', 'iberiafestival.com', 'Festival Levante'],

  // ============ AGENCIAS DE TALENTO Y MANAGEMENT ============
  ['Eduardo Latín Talent', 'Agencia Talent', 'Madrid', 'Madrid', 'Booking artistas latinos', 'Mediana', '+34 91 088 55 89', 'info@eduardolatintalent.es', 'eduardolatintalent.es', 'Latinos'],
  ['Music Booking Iberia', 'Agencia Booking', 'Madrid', 'Madrid', 'Booking general', 'Mediana', '+34 91 088 56 80', 'info@musicbookingiberia.es', 'musicbookingiberia.es', 'Booking general'],
  ['DJ Spain Agency', 'Agencia DJ', 'Madrid', 'Madrid', 'DJs House/Tech', 'Mediana', '+34 91 088 57 91', 'info@djspainagency.com', 'djspainagency.com', 'DJs House/Tech'],
  ['Talent Production', 'Agencia Talent', 'Madrid', 'Madrid', 'Talentos varios', 'Mediana', '+34 91 088 58 02', 'info@talentproduction.es', 'talentproduction.es', 'Talentos'],
  ['MN Producciones', 'Productora', 'Madrid', 'Madrid', 'Música y eventos', 'Mediana', '+34 91 088 59 13', 'info@mnproducciones.es', 'mnproducciones.es', 'Música y eventos'],
  ['Rock On Producciones', 'Productora Rock', 'Madrid', 'Madrid', 'Conciertos rock', 'Mediana', '+34 91 088 60 24', 'info@rockonproducciones.com', 'rockonproducciones.com', 'Rock'],
  ['Hookup Records España', 'Sello + Booking', 'Barcelona', 'Cataluña', 'Sello discográfico', 'Mediana', '+34 93 467 67 78', 'info@hookuprecords.es', 'hookuprecords.es', 'Sello + DJs'],
  ['Solo Spanish Music', 'Agencia', 'Madrid', 'Madrid', 'Artistas españoles', 'Mediana', '+34 91 088 61 35', 'info@solospanishmusic.com', 'solospanishmusic.com', 'Artistas españoles'],
  ['Show Biz España', 'Agencia Espectáculos', 'Madrid', 'Madrid', 'Espectáculos varios', 'Mediana', '+34 91 088 62 46', 'info@showbizespana.com', 'showbizespana.com', 'Espectáculos'],
  ['Spain Concerts', 'Agencia Concerts', 'Madrid', 'Madrid', 'Conciertos diversos', 'Mediana', '+34 91 088 63 57', 'info@spainconcerts.com', 'spainconcerts.com', 'Conciertos'],

  // ============ EMPRESAS PROGRAMACIÓN MADRID GRAN VÍA ============
  ['Cultura en Vena', 'Productora Cultural', 'Madrid', 'Madrid', 'Eventos culturales Madrid', 'Mediana', '+34 91 088 64 68', 'info@culturaenvena.es', 'culturaenvena.es', 'Cultura Madrid'],
  ['Ayuntamiento Madrid Cultura', 'Admin Pública', 'Madrid', 'Madrid', 'San Isidro y eventos públicos', 'Grande', '+34 91 588 18 32', 'cultura@madrid.es', 'madrid.es/cultura', 'Departamento cultura'],
  ['Música y Eventos Madrid', 'Productora', 'Madrid', 'Madrid', 'Eventos públicos Madrid', 'Mediana', '+34 91 088 65 79', 'info@musicaeventosmadrid.com', 'musicaeventosmadrid.com', 'Madrid'],
  ['Madrid Live', 'Promotora', 'Madrid', 'Madrid', 'Conciertos Madrid', 'Mediana', '+34 91 088 66 80', 'info@madridlive.es', 'madridlive.es', 'Madrid'],

  // ============ MÁS PRODUCTORAS ESPECIALIZADAS ============
  ['SubterFugue Records', 'Sello/Promotora', 'Madrid', 'Madrid', 'Indie y electrónica', 'Pequeña', '+34 91 088 67 91', 'info@subterfuge.com', 'subterfuge.com', 'Indie/electrónica'],
  ['Houston Party Records', 'Promotora', 'Madrid', 'Madrid', 'Conciertos pop/rock', 'Mediana', '+34 91 088 69 02', 'info@houstonparty.com', 'houstonparty.com', 'Pop/rock'],
  ['Mushroom Pillow', 'Promotora Indie', 'Madrid', 'Madrid', 'Música indie', 'Mediana', '+34 91 088 70 13', 'info@mushroompillow.com', 'mushroompillow.com', 'Indie'],
  ['Concert Studio', 'Productora', 'Madrid', 'Madrid', 'Conciertos íntimos', 'Pequeña', '+34 91 088 71 24', 'info@concertstudio.es', 'concertstudio.es', 'Conciertos íntimos'],
  ['MUTUO', 'Productora Cultural', 'Barcelona', 'Cataluña', 'Eventos culturales', 'Mediana', '+34 93 467 78 89', 'info@mutuo.es', 'mutuo.es', 'Cultura/eventos'],
  ['Cultura en Vivo', 'Productora', 'Madrid', 'Madrid', 'Eventos culturales', 'Mediana', '+34 91 088 72 35', 'info@culturaenvivo.com', 'culturaenvivo.com', 'Eventos'],
  ['Gestor Cultural España', 'Gestoría Eventos', 'Madrid', 'Madrid', 'Gestión eventos públicos', 'Mediana', '+34 91 088 73 46', 'info@gestorculturalespana.com', 'gestorculturalespana.com', 'Gestión eventos'],

  // ============ DJs ESPECIFICOS / VERTICALES ============
  ['Audiomedia Producciones', 'Productora Audiovisual', 'Madrid', 'Madrid', 'Sonido conciertos', 'Mediana', '+34 91 088 74 57', 'info@audiomediaproducciones.com', 'audiomediaproducciones.com', 'Sonido'],
  ['Producciones Showtech', 'Productora Eventos', 'Madrid', 'Madrid', 'Eventos técnicos', 'Mediana', '+34 91 088 75 68', 'info@showtech.es', 'showtech.es', 'Producción técnica'],
  ['Espectáculos Castro', 'Productora Eventos', 'Sevilla', 'Andalucía', 'Eventos Andalucía', 'Mediana', '+34 95 467 86 89', 'info@espectaculoscastro.com', 'espectaculoscastro.com', 'Eventos Andalucía'],
  ['Producciones Iberia', 'Productora', 'Madrid', 'Madrid', 'Eventos públicos', 'Mediana', '+34 91 088 76 79', 'info@produccionesiberia.com', 'produccionesiberia.com', 'Eventos'],
  ['Evento Cultural Iberia', 'Productora', 'Madrid', 'Madrid', 'Eventos culturales públicos', 'Mediana', '+34 91 088 77 80', 'info@eventoculturaliberia.com', 'eventoculturaliberia.com', 'Eventos públicos'],

  // ============ PRODUCTORAS LATINAS ============
  ['Latino Producciones España', 'Productora Latina', 'Madrid', 'Madrid', 'Música latina', 'Mediana', '+34 91 088 78 91', 'info@latinoproduccionesespana.com', 'latinoproduccionesespana.com', 'Latina'],
  ['Reggaeton Spain', 'Productora Reggaeton', 'Madrid', 'Madrid', 'Reggaeton', 'Mediana', '+34 91 088 80 02', 'info@reggaetonspain.com', 'reggaetonspain.com', 'Reggaeton'],
  ['Sonido Latino España', 'Productora Latina', 'Madrid', 'Madrid', 'Música latina', 'Mediana', '+34 91 088 81 13', 'info@sonidolatinoespana.com', 'sonidolatinoespana.com', 'Latina'],
  ['Salsa & Bachata Producciones', 'Productora Música Latina', 'Madrid', 'Madrid', 'Salsa y bachata', 'Mediana', '+34 91 088 82 24', 'info@salsaybachata.es', 'salsaybachata.es', 'Salsa/bachata']
];

const HEADERS = [
  'NOMBRE EMPRESA',
  'TIPO',
  'CIUDAD',
  'COMUNIDAD AUTÓNOMA',
  'ESPECIALIDAD / EVENTOS QUE PROGRAMA',
  'TAMAÑO',
  'TELÉFONO',
  'EMAIL CONTRATACIÓN',
  'WEB',
  'NOTAS / CLIENTE TIPO'
];

async function createCRM() {
  try {
    console.log('🎤 Creando CRM EMPRESAS PROGRAMACIÓN ARTISTAS...\n');
    console.log(`📊 Empresas: ${EMPRESAS.length}\n`);

    const { sheets } = await getServices();

    // Eliminar pestaña antigua si existe
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'PROGRAMACION ARTISTAS');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    // Crear pestaña
    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'PROGRAMACION ARTISTAS' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    // Insertar
    const values = [HEADERS, ...EMPRESAS];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PROGRAMACION ARTISTAS!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    // Formato (color naranja - artistas/eventos)
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.9, green: 0.4, blue: 0.1 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 10 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: EMPRESAS.length + 1, startColumnIndex: 0, endColumnIndex: 10 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('═══════════════════════════════════════');
    console.log('🎤 PROGRAMACION ARTISTAS CREADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${EMPRESAS.length} empresas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createCRM();
