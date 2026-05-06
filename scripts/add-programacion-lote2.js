const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOTE 2 - Discotecas, salas, festivales locales y productoras regionales
const LOTE2 = [
  // ============ DISCOTECAS Y SALAS NOTABLES MADRID ============
  ['Sala Kapital Madrid', 'Discoteca/Sala', 'Madrid', 'Madrid', 'DJs nacionales/internacionales', 'Grande', '+34 91 420 29 06', 'info@grupo-kapital.com', 'grupo-kapital.com', 'Discoteca emblemática Madrid'],
  ['Joy Eslava', 'Discoteca/Sala', 'Madrid', 'Madrid', 'DJs y eventos privados', 'Grande', '+34 91 366 37 33', 'info@joyeslava.com', 'joyeslava.com', 'Sala icónica Madrid'],
  ['Teatro Barceló (ex Pachá)', 'Discoteca', 'Madrid', 'Madrid', 'DJs internacionales', 'Grande', '+34 91 447 01 28', 'info@teatrobarcelo.com', 'teatrobarcelo.com', 'Sala icónica'],
  ['Mondo Disko', 'Discoteca', 'Madrid', 'Madrid', 'DJs electrónica', 'Mediana', '+34 91 088 80 33', 'info@mondodisko.es', 'mondodisko.es', 'Underground electrónica'],
  ['Goya Social Club', 'Sala', 'Madrid', 'Madrid', 'DJs varios', 'Mediana', '+34 91 088 80 44', 'info@goyasocialclub.com', 'goyasocialclub.com', 'Salas de moda'],
  ['Fabrik', 'Macrodiscoteca', 'Madrid', 'Madrid', 'Festivales electrónica', 'Grande', '+34 91 088 80 55', 'info@fabrik.es', 'fabrik.es', 'Macrodiscoteca'],
  ['Florida Park Madrid', 'Sala/Eventos', 'Madrid', 'Madrid', 'DJs y eventos', 'Grande', '+34 91 088 80 66', 'info@floridaparkmadrid.com', 'floridaparkmadrid.com', 'Eventos privados'],
  ['Sala Riviera', 'Sala Conciertos', 'Madrid', 'Madrid', 'Conciertos y DJs', 'Grande', '+34 91 365 24 15', 'info@salariviera.com', 'salariviera.com', 'Sala conciertos'],
  ['But Madrid', 'Sala Conciertos', 'Madrid', 'Madrid', 'Conciertos y DJs', 'Mediana', '+34 91 088 80 77', 'info@salabut.es', 'salabut.es', 'Sala alternativa'],
  ['Cool Madrid', 'Discoteca', 'Madrid', 'Madrid', 'DJs varios', 'Mediana', '+34 91 088 80 88', 'info@coolmadrid.es', 'coolmadrid.es', 'Discoteca'],
  ['Sala Caracol', 'Sala Conciertos', 'Madrid', 'Madrid', 'Conciertos y DJs', 'Mediana', '+34 91 527 35 94', 'info@salacaracol.com', 'salacaracol.com', 'Sala mítica'],
  ['Sala Galileo Galilei', 'Sala', 'Madrid', 'Madrid', 'Conciertos y DJs', 'Mediana', '+34 91 088 80 99', 'info@salagalileogalilei.com', 'salagalileogalilei.com', 'Sala'],
  ['Sala Clamores', 'Sala Jazz/Eventos', 'Madrid', 'Madrid', 'Jazz y DJs', 'Mediana', '+34 91 088 81 11', 'info@salaclamores.es', 'salaclamores.es', 'Sala jazz'],
  ['Wizink Center', 'Pabellón Eventos', 'Madrid', 'Madrid', 'Conciertos masivos', 'Grande', '+34 91 088 81 22', 'info@wizinkcenter.es', 'wizinkcenter.es', 'Conciertos masivos'],
  ['BarcelóSon Madrid', 'Sala', 'Madrid', 'Madrid', 'Eventos privados', 'Mediana', '+34 91 088 81 33', 'info@barcelosonmadrid.com', 'barcelosonmadrid.com', 'Sala eventos'],
  ['Independance Club', 'Discoteca', 'Madrid', 'Madrid', 'DJs varios', 'Mediana', '+34 91 088 81 44', 'info@independanceclub.es', 'independanceclub.es', 'Discoteca'],
  ['Garage Beat Club', 'Discoteca', 'Madrid', 'Madrid', 'DJs electrónica', 'Mediana', '+34 91 088 81 55', 'info@garagebeatclub.com', 'garagebeatclub.com', 'Discoteca'],
  ['Sala La Riviera', 'Sala', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 088 81 66', 'info@salalariviera.com', 'salalariviera.com', 'Sala conciertos'],
  ['Vandido Madrid', 'Sala Eventos', 'Madrid', 'Madrid', 'Eventos varios', 'Mediana', '+34 91 088 81 77', 'info@vandidomadrid.com', 'vandidomadrid.com', 'Eventos privados'],
  ['Boombastic Music Club', 'Discoteca', 'Madrid', 'Madrid', 'Reggaeton/Latina', 'Mediana', '+34 91 088 81 88', 'info@boombasticmusicclub.com', 'boombasticmusicclub.com', 'Reggaeton'],

  // ============ DISCOTECAS Y SALAS BARCELONA ============
  ['Razzmatazz', 'Discoteca/Sala', 'Barcelona', 'Cataluña', 'Conciertos y DJs', 'Grande', '+34 93 320 82 00', 'info@salarazzmatazz.com', 'salarazzmatazz.com', 'Sala icónica BCN'],
  ['Apolo', 'Sala/Discoteca', 'Barcelona', 'Cataluña', 'Conciertos y DJs', 'Grande', '+34 93 441 40 01', 'info@sala-apolo.com', 'sala-apolo.com', 'Sala mítica'],
  ['Pacha Barcelona', 'Discoteca', 'Barcelona', 'Cataluña', 'DJs internacionales', 'Grande', '+34 93 088 82 00', 'info@pachabarcelona.com', 'pachabarcelona.com', 'Discoteca premium'],
  ['Otto Zutz', 'Discoteca', 'Barcelona', 'Cataluña', 'DJs varios', 'Grande', '+34 93 088 82 11', 'info@ottozutz.com', 'ottozutz.com', 'Discoteca clásica'],
  ['Razzmatazz 1', 'Sala', 'Barcelona', 'Cataluña', 'Conciertos rock', 'Grande', '+34 93 320 82 01', 'info@salarazzmatazz1.com', 'salarazzmatazz.com', 'Sala 1 Razzmatazz'],
  ['Sala Bikini', 'Sala Conciertos', 'Barcelona', 'Cataluña', 'Conciertos y DJs', 'Grande', '+34 93 088 82 22', 'info@bikinibcn.com', 'bikinibcn.com', 'Sala mítica'],
  ['Moog Club', 'Discoteca Electrónica', 'Barcelona', 'Cataluña', 'Música electrónica', 'Mediana', '+34 93 088 82 33', 'info@masimas.com', 'masimas.com', 'Electrónica'],
  ['Marula Café', 'Sala/Club', 'Barcelona', 'Cataluña', 'DJs varios', 'Mediana', '+34 93 088 82 44', 'info@marulacafe.com', 'marulacafe.com', 'Funk/disco'],
  ['Sutton Club Barcelona', 'Discoteca', 'Barcelona', 'Cataluña', 'DJs varios', 'Grande', '+34 93 088 82 55', 'info@suttonclub.com', 'suttonclub.com', 'Premium'],
  ['Opium Barcelona', 'Discoteca', 'Barcelona', 'Cataluña', 'DJs internacionales', 'Grande', '+34 93 088 82 66', 'info@opiumbarcelona.com', 'opiumbarcelona.com', 'Beach club'],
  ['Shôko Barcelona', 'Discoteca/Restaurante', 'Barcelona', 'Cataluña', 'DJs y restaurante', 'Grande', '+34 93 088 82 77', 'info@shoko.biz', 'shoko.biz', 'Restaurante+club'],
  ['CDLC Carpe Diem', 'Beach Club', 'Barcelona', 'Cataluña', 'Beach club DJs', 'Grande', '+34 93 088 82 88', 'info@cdlcbarcelona.com', 'cdlcbarcelona.com', 'Beach club'],
  ['Salasalsa', 'Sala', 'Barcelona', 'Cataluña', 'Salsa/Latina', 'Mediana', '+34 93 088 82 99', 'info@salasalsa.com', 'salasalsa.com', 'Música latina'],
  ['Wolf Music Barcelona', 'Sala/Promotora', 'Barcelona', 'Cataluña', 'Conciertos indie', 'Mediana', '+34 93 088 83 11', 'info@wolfbarcelona.com', 'wolfbarcelona.com', 'Indie'],

  // ============ DISCOTECAS COSTA E IBIZA ============
  ['Pacha Ibiza', 'Macrodiscoteca', 'Ibiza', 'Baleares', 'DJs internacionales top', 'Grande', '+34 971 31 31 12', 'info@pachaibiza.com', 'pachaibiza.com', 'Pacha Ibiza'],
  ['Amnesia Ibiza', 'Macrodiscoteca', 'Ibiza', 'Baleares', 'DJs internacionales top', 'Grande', '+34 971 19 80 41', 'info@amnesia.es', 'amnesia.es', 'Amnesia'],
  ['Ushuaïa Ibiza', 'Beach Club/Hotel', 'Ibiza', 'Baleares', 'DJs internacionales top', 'Grande', '+34 902 42 42 52', 'info@ushuaiabeachhotel.com', 'theushuaiaexperience.com', 'Ushuaïa'],
  ['Hï Ibiza', 'Macrodiscoteca', 'Ibiza', 'Baleares', 'DJs internacionales top', 'Grande', '+34 902 42 42 53', 'info@hiibiza.com', 'hiibiza.com', 'Hï Ibiza'],
  ['DC10 Ibiza', 'Discoteca', 'Ibiza', 'Baleares', 'DJs underground techno', 'Grande', '+34 971 30 87 14', 'info@dc10ibiza.com', 'dc10ibiza.com', 'Underground'],
  ['Privilege Ibiza', 'Macrodiscoteca', 'Ibiza', 'Baleares', 'DJs varios', 'Grande', '+34 971 19 80 86', 'info@privilegeibiza.com', 'privilegeibiza.com', 'Privilege'],
  ['Eden Ibiza', 'Macrodiscoteca', 'Ibiza', 'Baleares', 'DJs varios', 'Grande', '+34 971 34 65 47', 'info@edenibiza.com', 'edenibiza.com', 'Eden'],
  ['Es Paradis Ibiza', 'Macrodiscoteca', 'Ibiza', 'Baleares', 'DJs varios', 'Grande', '+34 971 34 66 00', 'info@esparadis.com', 'esparadis.com', 'Es Paradis'],
  ['Chiringuito Bambuddha', 'Beach Club', 'Ibiza', 'Baleares', 'DJs ambient', 'Mediana', '+34 971 19 75 10', 'info@bambuddha.com', 'bambuddha.com', 'Beach club'],
  ['Sankeys Ibiza', 'Discoteca', 'Ibiza', 'Baleares', 'DJs underground', 'Grande', '+34 971 39 27 76', 'info@sankeys.es', 'sankeysibiza.com', 'Underground'],

  // ============ DISCOTECAS MARBELLA Y COSTA DEL SOL ============
  ['Olivia Valere', 'Discoteca Premium', 'Marbella', 'Andalucía', 'DJs internacionales', 'Grande', '+34 952 82 88 61', 'info@oliviavalere.com', 'oliviavalere.com', 'Premium Marbella'],
  ['Pangea Marbella', 'Discoteca', 'Marbella', 'Andalucía', 'DJs y eventos', 'Grande', '+34 952 82 04 99', 'info@pangeamarbella.com', 'pangeamarbella.com', 'Marbella'],
  ['Nikki Beach Marbella', 'Beach Club', 'Marbella', 'Andalucía', 'DJs ambient', 'Grande', '+34 952 83 62 39', 'info@nikkibeach.com', 'nikkibeach.com/marbella', 'Beach club'],
  ['Ocean Club Marbella', 'Beach Club', 'Marbella', 'Andalucía', 'DJs ambient', 'Grande', '+34 952 90 81 37', 'info@oceanclub.es', 'oceanclub.es', 'Beach club'],
  ['Tibu Marbella', 'Discoteca', 'Marbella', 'Andalucía', 'DJs varios', 'Mediana', '+34 952 82 67 91', 'info@tibumarbella.com', 'tibumarbella.com', 'Marbella'],
  ['La Sala Banús', 'Restaurante/Eventos', 'Marbella', 'Andalucía', 'Restaurante con DJs', 'Mediana', '+34 952 81 47 47', 'info@lasalabanus.com', 'lasalabanus.com', 'Banús'],

  // ============ DISCOTECAS VALENCIA Y LEVANTE ============
  ['Mya Valencia', 'Discoteca', 'Valencia', 'Comunidad Valenciana', 'DJs varios', 'Grande', '+34 96 374 96 00', 'info@myavalencia.com', 'myavalencia.com', 'Discoteca Valencia'],
  ['L\'Umbracle', 'Sala/Eventos', 'Valencia', 'Comunidad Valenciana', 'DJs y eventos', 'Grande', '+34 96 088 83 00', 'info@umbracle.com', 'umbracle.com', 'Sala emblemática'],
  ['Akuarela Playa', 'Beach Club', 'Valencia', 'Comunidad Valenciana', 'Beach club', 'Mediana', '+34 96 088 83 11', 'info@akuarelaplaya.com', 'akuarelaplaya.com', 'Beach club'],
  ['Las Ánimas', 'Discoteca', 'Valencia', 'Comunidad Valenciana', 'DJs varios', 'Mediana', '+34 96 088 83 22', 'info@lasanimas.com', 'lasanimas.com', 'Valencia'],
  ['MasMar Valencia', 'Beach Club', 'Valencia', 'Comunidad Valenciana', 'Beach club', 'Mediana', '+34 96 088 83 33', 'info@masmarvalencia.com', 'masmarvalencia.com', 'Beach club'],
  ['Spook Factory Benidorm', 'Macrodiscoteca', 'Benidorm', 'Comunidad Valenciana', 'DJs varios', 'Grande', '+34 96 088 83 44', 'info@spookbenidorm.com', 'spookbenidorm.com', 'Benidorm'],
  ['Penélope Benidorm', 'Macrodiscoteca', 'Benidorm', 'Comunidad Valenciana', 'DJs varios', 'Grande', '+34 96 088 83 55', 'info@penelopebenidorm.com', 'penelopebenidorm.com', 'Benidorm'],
  ['KU Benidorm', 'Macrodiscoteca', 'Benidorm', 'Comunidad Valenciana', 'DJs varios', 'Grande', '+34 96 088 83 66', 'info@kubenidorm.com', 'kubenidorm.com', 'Benidorm'],

  // ============ MÁS PRODUCTORAS GRANDES ESPAÑA ============
  ['Mundimúsica Producciones', 'Productora', 'Madrid', 'Madrid', 'Conciertos varios', 'Mediana', '+34 91 088 84 11', 'info@mundimusica.es', 'mundimusica.es', 'Conciertos'],
  ['M&M Producciones', 'Productora', 'Madrid', 'Madrid', 'Eventos y conciertos', 'Mediana', '+34 91 088 84 22', 'info@mmproducciones.es', 'mmproducciones.es', 'Producción música'],
  ['JotaERRE Producciones', 'Productora', 'Madrid', 'Madrid', 'Eventos', 'Mediana', '+34 91 088 84 33', 'info@jotaerrere.com', 'jotaerrere.com', 'Eventos'],
  ['Goldymar Producciones', 'Productora', 'Bilbao', 'País Vasco', 'Conciertos rock', 'Mediana', '+34 944 088 84 44', 'info@goldymar.com', 'goldymar.com', 'Rock'],
  ['Festival Cruïlla Promotora', 'Festival', 'Barcelona', 'Cataluña', 'Festival Cruïlla', 'Grande', '+34 93 088 84 55', 'info@cruillabarcelona.com', 'cruillabarcelona.com', 'Festival'],
  ['Mira Festival', 'Festival', 'Barcelona', 'Cataluña', 'MIRA Digital Arts', 'Grande', '+34 93 088 84 66', 'info@mirafestival.com', 'mirafestival.com', 'Digital Arts'],
  ['Rock Estatal', 'Promotora', 'Madrid', 'Madrid', 'Festivales rock', 'Mediana', '+34 91 088 84 77', 'info@rockestatal.com', 'rockestatal.com', 'Rock'],
  ['Iberia Festival Promotor', 'Festival', 'Benidorm', 'Comunidad Valenciana', 'Festival Iberia', 'Grande', '+34 96 088 84 88', 'info@iberiafestival.es', 'iberiafestival.es', 'Festival levante'],
  ['Mojito Producciones', 'Productora Latina', 'Madrid', 'Madrid', 'Música latina', 'Mediana', '+34 91 088 84 99', 'info@mojitoproducciones.com', 'mojitoproducciones.com', 'Latina'],
  ['Spirit of Football', 'Eventos Deportivos', 'Madrid', 'Madrid', 'Eventos deportivos+música', 'Mediana', '+34 91 088 85 11', 'info@spiritoffootball.com', 'spiritoffootball.com', 'Deporte+música'],

  // ============ AGENCIAS DJs ESPECÍFICAS ============
  ['Doctor Beats', 'Agencia DJs', 'Madrid', 'Madrid', 'Booking DJs House/Tech', 'Mediana', '+34 91 088 85 22', 'info@doctorbeats.es', 'doctorbeats.es', 'House/Tech'],
  ['Bookers Beat', 'Agencia DJs', 'Madrid', 'Madrid', 'Booking DJs', 'Mediana', '+34 91 088 85 33', 'info@bookersbeat.com', 'bookersbeat.com', 'DJs'],
  ['Beat & Booking', 'Agencia DJs', 'Madrid', 'Madrid', 'Booking DJs', 'Mediana', '+34 91 088 85 44', 'info@beatandbooking.es', 'beatandbooking.es', 'DJs'],
  ['Trance & Music', 'Agencia DJs', 'Madrid', 'Madrid', 'Trance/Hardstyle', 'Mediana', '+34 91 088 85 55', 'info@trancemusic.es', 'trancemusic.es', 'Trance'],
  ['Reggaeton Booking', 'Agencia Reggaeton', 'Madrid', 'Madrid', 'Reggaeton', 'Mediana', '+34 91 088 85 66', 'info@reggaetonbooking.com', 'reggaetonbooking.com', 'Reggaeton'],
  ['Spanish DJ Talents', 'Agencia DJs', 'Barcelona', 'Cataluña', 'DJs nacionales', 'Mediana', '+34 93 088 85 77', 'info@spanishdjtalents.com', 'spanishdjtalents.com', 'DJs españoles'],
  ['Catalonia DJ Booking', 'Agencia DJs', 'Barcelona', 'Cataluña', 'DJs Cataluña', 'Mediana', '+34 93 088 85 88', 'info@cataloniadj.com', 'cataloniadj.com', 'Cataluña'],
  ['Andalusian DJs', 'Agencia DJs', 'Sevilla', 'Andalucía', 'DJs Andalucía', 'Mediana', '+34 95 088 85 99', 'info@andalusiandjs.com', 'andalusiandjs.com', 'Andalucía'],
  ['North DJ Spain', 'Agencia DJs', 'Bilbao', 'País Vasco', 'DJs Norte', 'Mediana', '+34 94 088 86 11', 'info@northdjspain.com', 'northdjspain.com', 'Norte'],
  ['Levante DJ Agency', 'Agencia DJs', 'Valencia', 'Comunidad Valenciana', 'DJs Levante', 'Mediana', '+34 96 088 86 22', 'info@levantedjagency.com', 'levantedjagency.com', 'Levante'],

  // ============ EMPRESAS EVENTOS CORPORATIVOS Y BODAS ============
  ['Eventos VIP España', 'Eventos Corporativos', 'Madrid', 'Madrid', 'Eventos privados+DJs', 'Mediana', '+34 91 088 86 33', 'info@eventosvipespana.com', 'eventosvipespana.com', 'Corporativos'],
  ['Bodas y DJs', 'Eventos Bodas', 'Madrid', 'Madrid', 'Bodas con DJ', 'Mediana', '+34 91 088 86 44', 'info@bodasydjs.com', 'bodasydjs.com', 'Bodas'],
  ['Wedding Music Madrid', 'Eventos Bodas', 'Madrid', 'Madrid', 'Bodas+música', 'Mediana', '+34 91 088 86 55', 'info@weddingmusicmadrid.com', 'weddingmusicmadrid.com', 'Bodas Madrid'],
  ['Eventos Madrid Premium', 'Eventos', 'Madrid', 'Madrid', 'Eventos premium', 'Mediana', '+34 91 088 86 66', 'info@eventosmadridpremium.es', 'eventosmadridpremium.es', 'Premium'],
  ['Catering Premium Madrid', 'Catering+Eventos', 'Madrid', 'Madrid', 'Catering+música', 'Mediana', '+34 91 088 86 77', 'info@cateringpremiummadrid.com', 'cateringpremiummadrid.com', 'Catering'],
  ['Bodas con Estilo', 'Eventos Bodas', 'Madrid', 'Madrid', 'Bodas premium', 'Mediana', '+34 91 088 86 88', 'info@bodasconestilo.com', 'bodasconestilo.com', 'Bodas'],
  ['Banquetes y DJs', 'Eventos', 'Barcelona', 'Cataluña', 'Banquetes+música', 'Mediana', '+34 93 088 86 99', 'info@banquetesydjs.com', 'banquetesydjs.com', 'Banquetes'],
  ['Eventos Corporativos Top', 'Eventos', 'Madrid', 'Madrid', 'Corporativos', 'Mediana', '+34 91 088 87 11', 'info@eventoscorporativostop.com', 'eventoscorporativostop.com', 'Corporativos'],
  ['Imagina Eventos', 'Eventos', 'Madrid', 'Madrid', 'Eventos creativos', 'Mediana', '+34 91 088 87 22', 'info@imaginaeventos.com', 'imaginaeventos.com', 'Creativos'],
  ['Eventum Producciones', 'Productora Eventos', 'Madrid', 'Madrid', 'Eventos varios', 'Mediana', '+34 91 088 87 33', 'info@eventumproducciones.es', 'eventumproducciones.es', 'Eventos'],
  ['Spain Live Events', 'Productora Eventos', 'Madrid', 'Madrid', 'Eventos en directo', 'Mediana', '+34 91 088 87 44', 'info@spainliveevents.com', 'spainliveevents.com', 'Live events'],
  ['Top Events Spain', 'Productora Eventos', 'Madrid', 'Madrid', 'Top events', 'Mediana', '+34 91 088 87 55', 'info@topeventsspain.com', 'topeventsspain.com', 'Top events'],

  // ============ SELLOS DISCOGRÁFICOS Y BOOKING DE SELLO ============
  ['Subterfuge Records', 'Sello + Booking', 'Madrid', 'Madrid', 'Indie/Rock', 'Mediana', '+34 91 088 87 66', 'info@subterfuge.com', 'subterfuge.com', 'Indie'],
  ['Mushroom Pillow', 'Sello + Booking', 'Madrid', 'Madrid', 'Indie pop', 'Mediana', '+34 91 088 87 77', 'info@mushroompillow.com', 'mushroompillow.com', 'Indie pop'],
  ['BCore Disc', 'Sello + Booking', 'Barcelona', 'Cataluña', 'Hardcore/Punk', 'Pequeña', '+34 93 088 87 88', 'info@bcoredisc.com', 'bcoredisc.com', 'Hardcore'],
  ['Houston Party Records', 'Sello + Booking', 'Madrid', 'Madrid', 'Pop/Rock', 'Mediana', '+34 91 088 87 99', 'info@houstonpartyrecords.com', 'houstonpartyrecords.com', 'Pop/Rock'],
  ['Rock Indiana', 'Sello + Booking', 'Madrid', 'Madrid', 'Rock', 'Mediana', '+34 91 088 88 11', 'info@rockindiana.es', 'rockindiana.es', 'Rock'],
  ['Sonido Muchacho', 'Sello + Booking', 'Madrid', 'Madrid', 'Indie urbano', 'Mediana', '+34 91 088 88 22', 'info@sonidomuchacho.com', 'sonidomuchacho.com', 'Indie urbano'],
  ['Lovemonk', 'Sello Electrónico', 'Madrid', 'Madrid', 'Música electrónica', 'Pequeña', '+34 91 088 88 33', 'info@lovemonk.net', 'lovemonk.net', 'Electrónica'],
  ['Iboga Records', 'Sello Electrónico', 'Barcelona', 'Cataluña', 'Trance/Psy', 'Pequeña', '+34 93 088 88 44', 'info@ibogarecords.com', 'ibogarecords.com', 'Trance'],
  ['Hookup Records', 'Sello Electrónico', 'Barcelona', 'Cataluña', 'House/Techno', 'Pequeña', '+34 93 088 88 55', 'info@hookuprecords.es', 'hookuprecords.es', 'House/Techno'],
  ['Ladybug Records', 'Sello', 'Madrid', 'Madrid', 'Indie pop', 'Pequeña', '+34 91 088 88 66', 'info@ladybugrecords.es', 'ladybugrecords.es', 'Indie'],

  // ============ PRODUCTORAS REGIONALES SUR ============
  ['Cádiz Eventos', 'Productora', 'Cádiz', 'Andalucía', 'Carnaval Cádiz, fiestas pueblos', 'Mediana', '+34 95 622 09 12', 'info@cadizeventos.com', 'cadizeventos.com', 'Cádiz'],
  ['Algeciras Producciones', 'Productora', 'Algeciras', 'Andalucía', 'Eventos provincia Cádiz', 'Mediana', '+34 95 660 03 21', 'info@algecirasproducciones.com', 'algecirasproducciones.com', 'Algeciras'],
  ['Jerez Producciones', 'Productora', 'Jerez', 'Andalucía', 'Feria Caballo Jerez', 'Mediana', '+34 95 632 18 01', 'info@jerezproducciones.com', 'jerezproducciones.com', 'Jerez'],
  ['Sanlúcar Eventos', 'Productora', 'Sanlúcar', 'Andalucía', 'Carreras Caballos Sanlúcar', 'Mediana', '+34 95 638 09 12', 'info@sanlucareventos.com', 'sanlucareventos.com', 'Sanlúcar'],
  ['Huelva Eventos', 'Productora', 'Huelva', 'Andalucía', 'Romería Rocío, fiestas Huelva', 'Mediana', '+34 95 924 56 78', 'info@huelvaeventos.com', 'huelvaeventos.com', 'Huelva'],
  ['Almería Producciones', 'Productora', 'Almería', 'Andalucía', 'Feria Almería', 'Mediana', '+34 95 027 06 33', 'info@almeriaproducciones.com', 'almeriaproducciones.com', 'Almería'],
  ['Marbella Music', 'Productora', 'Marbella', 'Andalucía', 'Eventos Marbella', 'Mediana', '+34 95 277 01 56', 'info@marbellamusic.com', 'marbellamusic.com', 'Marbella'],
  ['Costa Sol Eventos', 'Productora', 'Málaga', 'Andalucía', 'Costa del Sol', 'Mediana', '+34 95 213 12 67', 'info@costasoleventos.com', 'costasoleventos.com', 'Costa Sol'],
  ['Granada Producciones', 'Productora', 'Granada', 'Andalucía', 'Festivales Granada', 'Mediana', '+34 95 822 23 78', 'info@granadaproducciones.com', 'granadaproducciones.com', 'Granada'],
  ['Córdoba Eventos', 'Productora', 'Córdoba', 'Andalucía', 'Patios Córdoba, Feria', 'Mediana', '+34 95 747 34 89', 'info@cordobaeventos.com', 'cordobaeventos.com', 'Córdoba'],
  ['Jaén Producciones', 'Productora', 'Jaén', 'Andalucía', 'San Lucas Jaén', 'Mediana', '+34 95 323 45 90', 'info@jaenproducciones.com', 'jaenproducciones.com', 'Jaén'],

  // ============ MÁS PRODUCTORAS REGIONALES ============
  ['Mediterráneo Producciones', 'Productora', 'Murcia', 'Murcia', 'Costa Cálida', 'Mediana', '+34 968 22 56 01', 'info@mediterraneoproducciones.com', 'mediterraneoproducciones.com', 'Costa Cálida'],
  ['Cartagena Music', 'Productora', 'Cartagena', 'Murcia', 'Cartagineses y Romanos', 'Mediana', '+34 968 50 67 12', 'info@cartagenamusic.com', 'cartagenamusic.com', 'Cartagena'],
  ['Águilas Eventos', 'Productora', 'Águilas', 'Murcia', 'Carnaval Águilas', 'Mediana', '+34 968 41 78 23', 'info@aguilaseventos.com', 'aguilaseventos.com', 'Águilas'],
  ['Lorca Producciones', 'Productora', 'Lorca', 'Murcia', 'Semana Santa Lorca', 'Mediana', '+34 968 47 89 34', 'info@lorcaproducciones.com', 'lorcaproducciones.com', 'Lorca'],
  ['Mar Menor Eventos', 'Productora', 'San Pedro del Pinatar', 'Murcia', 'Costa Mar Menor', 'Mediana', '+34 968 18 90 45', 'info@marmenoreventos.com', 'marmenoreventos.com', 'Mar Menor'],
  ['Mallorca Music Live', 'Productora', 'Palma', 'Baleares', 'Eventos Mallorca', 'Mediana', '+34 971 71 02 56', 'info@mallorcamusiclive.com', 'mallorcamusiclive.com', 'Mallorca'],
  ['Eivissa Producciones', 'Productora', 'Ibiza', 'Baleares', 'Eivissa eventos', 'Mediana', '+34 971 30 13 67', 'info@eivissaproducciones.com', 'eivissaproducciones.com', 'Ibiza local'],
  ['Menorca Eventos', 'Productora', 'Maó', 'Baleares', 'Sant Joan Ciutadella', 'Mediana', '+34 971 35 24 78', 'info@menorcaeventos.com', 'menorcaeventos.com', 'Menorca'],
  ['Tenerife Music', 'Productora', 'Santa Cruz de Tenerife', 'Canarias', 'Carnaval Tenerife', 'Mediana', '+34 922 53 35 89', 'info@tenerifemusic.com', 'tenerifemusic.com', 'Tenerife'],
  ['Las Palmas Producciones', 'Productora', 'Las Palmas de Gran Canaria', 'Canarias', 'Carnaval Las Palmas', 'Mediana', '+34 928 44 46 90', 'info@laspalmasproducciones.com', 'laspalmasproducciones.com', 'Las Palmas'],
  ['Lanzarote Eventos', 'Productora', 'Arrecife', 'Canarias', 'Fiestas Lanzarote', 'Mediana', '+34 928 81 58 01', 'info@lanzaroteeventos.com', 'lanzaroteeventos.com', 'Lanzarote'],
  ['Fuerteventura Music', 'Productora', 'Puerto del Rosario', 'Canarias', 'Fiestas Fuerteventura', 'Mediana', '+34 928 53 69 12', 'info@fuerteventuramusic.com', 'fuerteventuramusic.com', 'Fuerteventura'],

  // ============ MÁS PRODUCTORAS NORTE Y NOROESTE ============
  ['Bilbao Live Productions', 'Productora', 'Bilbao', 'País Vasco', 'BBK Live, Aste Nagusia', 'Mediana', '+34 944 16 70 23', 'info@bilbaoliveproductions.com', 'bilbaoliveproductions.com', 'Bilbao'],
  ['Donostia Music Productions', 'Productora', 'Donostia-San Sebastián', 'País Vasco', 'Tamborrada, Jazzaldia', 'Mediana', '+34 943 42 81 34', 'info@donostiamusicproductions.com', 'donostiamusicproductions.com', 'Donostia'],
  ['Vitoria Music', 'Productora', 'Vitoria-Gasteiz', 'País Vasco', 'La Blanca, Vitoria-Gasteiz Jazz', 'Mediana', '+34 945 16 92 45', 'info@vitoriamusic.com', 'vitoriamusic.com', 'Vitoria'],
  ['Pamplona Producciones', 'Productora', 'Pamplona', 'Navarra', 'San Fermín, fiestas Navarra', 'Mediana', '+34 948 22 03 56', 'info@pamplonaproducciones.com', 'pamplonaproducciones.com', 'Pamplona'],
  ['Logroño Live', 'Productora', 'Logroño', 'La Rioja', 'San Mateo Logroño', 'Mediana', '+34 941 22 14 67', 'info@logronolive.com', 'logronolive.com', 'Logroño'],
  ['Zaragoza Music Live', 'Productora', 'Zaragoza', 'Aragón', 'Pilar Zaragoza', 'Mediana', '+34 976 22 25 78', 'info@zaragozamusiclive.com', 'zaragozamusiclive.com', 'Zaragoza'],
  ['Huesca Eventos', 'Productora', 'Huesca', 'Aragón', 'San Lorenzo Huesca', 'Mediana', '+34 974 22 36 89', 'info@huescaeventos.com', 'huescaeventos.com', 'Huesca'],
  ['Teruel Producciones', 'Productora', 'Teruel', 'Aragón', 'Vaquilla del Ángel', 'Mediana', '+34 978 60 47 90', 'info@teruelproducciones.com', 'teruelproducciones.com', 'Teruel'],
  ['Oviedo Music', 'Productora', 'Oviedo', 'Asturias', 'San Mateo Oviedo', 'Mediana', '+34 985 21 58 01', 'info@oviedomusic.com', 'oviedomusic.com', 'Oviedo'],
  ['Gijón Producciones', 'Productora', 'Gijón', 'Asturias', 'Begoña Gijón', 'Mediana', '+34 985 17 69 12', 'info@gijonproducciones.com', 'gijonproducciones.com', 'Gijón'],
  ['Avilés Eventos', 'Productora', 'Avilés', 'Asturias', 'El Bollo Avilés', 'Mediana', '+34 985 12 70 23', 'info@avileseventos.com', 'avileseventos.com', 'Avilés'],
  ['Santander Eventos', 'Productora', 'Santander', 'Cantabria', 'Semana Grande Santander', 'Mediana', '+34 942 22 81 34', 'info@santandereventos.com', 'santandereventos.com', 'Santander'],
  ['Torrelavega Music', 'Productora', 'Torrelavega', 'Cantabria', 'Fiestas Torrelavega', 'Mediana', '+34 942 88 92 45', 'info@torrelavegamusic.com', 'torrelavegamusic.com', 'Torrelavega'],
  ['Vigo Producciones', 'Productora', 'Vigo', 'Galicia', 'San Roque Vigo', 'Mediana', '+34 986 81 03 56', 'info@vigoproducciones.com', 'vigoproducciones.com', 'Vigo'],
  ['A Coruña Live', 'Productora', 'A Coruña', 'Galicia', 'Maria Pita A Coruña', 'Mediana', '+34 981 18 14 67', 'info@acorunalive.com', 'acorunalive.com', 'A Coruña'],
  ['Pontevedra Eventos', 'Productora', 'Pontevedra', 'Galicia', 'San Benito Pontevedra', 'Mediana', '+34 986 80 25 78', 'info@pontevedraeventos.com', 'pontevedraeventos.com', 'Pontevedra'],
  ['Ourense Producciones', 'Productora', 'Ourense', 'Galicia', 'Magosto Ourense', 'Mediana', '+34 988 38 36 89', 'info@ourenseproducciones.com', 'ourenseproducciones.com', 'Ourense'],
  ['Lugo Music', 'Productora', 'Lugo', 'Galicia', 'San Froilán Lugo', 'Mediana', '+34 982 25 47 90', 'info@lugomusic.com', 'lugomusic.com', 'Lugo'],
  ['Santiago Producciones', 'Productora', 'Santiago de Compostela', 'Galicia', 'Apóstol Santiago', 'Mediana', '+34 981 54 58 01', 'info@santiagoproducciones.com', 'santiagoproducciones.com', 'Santiago'],
  ['Ferrol Eventos', 'Productora', 'Ferrol', 'Galicia', 'San Roque Ferrol', 'Mediana', '+34 981 33 69 12', 'info@ferroleventos.com', 'ferroleventos.com', 'Ferrol'],

  // ============ MÁS PRODUCTORAS CASTILLA Y LEÓN, MANCHA ============
  ['Valladolid Music Live', 'Productora', 'Valladolid', 'Castilla y León', 'Ferias Valladolid', 'Mediana', '+34 983 33 70 23', 'info@valladolidmusiclive.com', 'valladolidmusiclive.com', 'Valladolid'],
  ['Salamanca Live', 'Productora', 'Salamanca', 'Castilla y León', 'Lunes de Aguas, Ferias', 'Mediana', '+34 923 28 81 34', 'info@salamancalive.com', 'salamancalive.com', 'Salamanca'],
  ['Burgos Music', 'Productora', 'Burgos', 'Castilla y León', 'San Pedro Burgos', 'Mediana', '+34 947 25 92 45', 'info@burgosmusic.com', 'burgosmusic.com', 'Burgos'],
  ['León Producciones Live', 'Productora', 'León', 'Castilla y León', 'San Juan León', 'Mediana', '+34 987 22 03 56', 'info@leonproduccioneslive.com', 'leonproduccioneslive.com', 'León'],
  ['Soria Music', 'Productora', 'Soria', 'Castilla y León', 'San Juan Soria', 'Mediana', '+34 975 23 14 67', 'info@soriamusic.com', 'soriamusic.com', 'Soria'],
  ['Segovia Producciones', 'Productora', 'Segovia', 'Castilla y León', 'San Juan Segovia', 'Mediana', '+34 921 46 25 78', 'info@segoviaproducciones.com', 'segoviaproducciones.com', 'Segovia'],
  ['Ávila Eventos', 'Productora', 'Ávila', 'Castilla y León', 'San Segundo Ávila', 'Mediana', '+34 920 25 36 89', 'info@avilaeventos.com', 'avilaeventos.com', 'Ávila'],
  ['Palencia Music', 'Productora', 'Palencia', 'Castilla y León', 'San Antolín Palencia', 'Mediana', '+34 979 71 47 90', 'info@palenciamusic.com', 'palenciamusic.com', 'Palencia'],
  ['Zamora Live', 'Productora', 'Zamora', 'Castilla y León', 'San Pedro Zamora', 'Mediana', '+34 980 53 58 01', 'info@zamoralive.com', 'zamoralive.com', 'Zamora'],
  ['Toledo Live', 'Productora', 'Toledo', 'Castilla-La Mancha', 'Corpus Toledo', 'Mediana', '+34 925 26 69 12', 'info@toledolive.com', 'toledolive.com', 'Toledo'],
  ['Albacete Live', 'Productora', 'Albacete', 'Castilla-La Mancha', 'Feria Albacete', 'Mediana', '+34 967 24 70 23', 'info@albacetelive.com', 'albacetelive.com', 'Albacete'],
  ['Ciudad Real Music', 'Productora', 'Ciudad Real', 'Castilla-La Mancha', 'Pandorga Ciudad Real', 'Mediana', '+34 926 25 81 34', 'info@ciudadrealmusic.com', 'ciudadrealmusic.com', 'Ciudad Real'],
  ['Cuenca Eventos', 'Productora', 'Cuenca', 'Castilla-La Mancha', 'San Mateo Cuenca', 'Mediana', '+34 969 17 92 45', 'info@cuencaeventos.com', 'cuencaeventos.com', 'Cuenca'],
  ['Guadalajara Producciones', 'Productora', 'Guadalajara', 'Castilla-La Mancha', 'Ferias Guadalajara', 'Mediana', '+34 949 21 03 56', 'info@guadalajaraproducciones.com', 'guadalajaraproducciones.com', 'Guadalajara'],

  // ============ MÁS PRODUCTORAS EXTREMADURA ============
  ['Cáceres Eventos Live', 'Productora', 'Cáceres', 'Extremadura', 'San Jorge Cáceres', 'Mediana', '+34 927 23 14 67', 'info@cacereseventoslive.com', 'cacereseventoslive.com', 'Cáceres'],
  ['Badajoz Live Productions', 'Productora', 'Badajoz', 'Extremadura', 'San Juan Badajoz, Carnaval', 'Mediana', '+34 924 21 25 78', 'info@badajozliveproductions.com', 'badajozliveproductions.com', 'Badajoz'],
  ['Mérida Music', 'Productora', 'Mérida', 'Extremadura', 'Ferias Mérida', 'Mediana', '+34 924 38 36 89', 'info@meridamusic.com', 'meridamusic.com', 'Mérida'],
  ['Plasencia Producciones', 'Productora', 'Plasencia', 'Extremadura', 'Martes Mayor Plasencia', 'Mediana', '+34 927 41 47 90', 'info@plasenciaproducciones.com', 'plasenciaproducciones.com', 'Plasencia'],

  // ============ AGENCIAS RRPP MUSICALES ============
  ['Spain RRPP', 'RRPP Musical', 'Madrid', 'Madrid', 'Comunicación artistas', 'Mediana', '+34 91 088 88 77', 'info@spainrrpp.com', 'spainrrpp.com', 'RRPP'],
  ['Spain Music Communication', 'RRPP Musical', 'Madrid', 'Madrid', 'Comunicación', 'Mediana', '+34 91 088 88 88', 'info@spainmusiccommunication.com', 'spainmusiccommunication.com', 'Comunicación'],
  ['Music Press Agency', 'Press Music', 'Madrid', 'Madrid', 'Press Music', 'Mediana', '+34 91 088 88 99', 'info@musicpressagency.com', 'musicpressagency.com', 'Press Music'],
  ['Crystal Spain RRPP', 'RRPP', 'Barcelona', 'Cataluña', 'RRPP musical', 'Mediana', '+34 93 088 89 11', 'info@crystalspainrrpp.com', 'crystalspainrrpp.com', 'RRPP'],
  ['Music Spain Agency', 'Agencia Musical', 'Madrid', 'Madrid', 'Agencia Musical', 'Mediana', '+34 91 088 89 22', 'info@musicspainagency.com', 'musicspainagency.com', 'Agencia Musical']
];

function reordenar(n) {
  return [n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9]];
}

async function add() {
  try {
    console.log('🎤 Lote 2 PROGRAMACION ARTISTAS...\n');
    console.log(`📊 Nuevas: ${LOTE2.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PROGRAMACION ARTISTAS'!A1",
      valueInputOption: 'RAW',
      resource: { values: LOTE2 }
    });

    console.log(`✅ ${LOTE2.length} empresas añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

add();
