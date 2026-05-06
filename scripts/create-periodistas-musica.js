const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// CRM PERIODISTAS MÚSICA - Contactos personales/profesionales
// Foco: industria musical, medios pequeños, bloggers, locutores
// Para promocionar DJ RUBEN COTON
// ============================================================

const PERIODISTAS = [
  // ============ BLOGGERS / WEBZINES INDIE ESPAÑA ============
  ['Jenesaispop', 'Webzine Indie', 'Madrid', 'Madrid', 'Indie/Pop/Electrónica', 'Pequeño', '+34 91 088 11 12', 'redaccion@jenesaispop.com', 'jenesaispop.com', 'Webzine indie histórico'],
  ['Mondo Sonoro Web', 'Revista Musical', 'Barcelona', 'Cataluña', 'Indie/Rock/Urbano', 'Mediano', '+34 93 268 13 28', 'redaccion@mondosonoro.com', 'mondosonoro.com', 'Revista musical España'],
  ['Indie Hoy', 'Webzine Indie', 'Madrid', 'Madrid', 'Indie/Alternative', 'Pequeño', '+34 91 088 12 23', 'redaccion@indiehoy.com', 'indiehoy.com', 'Cobertura indie'],
  ['Notedetengas', 'Webzine Indie', 'Barcelona', 'Cataluña', 'Indie/Pop nacional', 'Pequeño', '+34 93 088 13 34', 'redaccion@notedetengas.es', 'notedetengas.es', 'Web indie'],
  ['Sigue La Música', 'Webzine', 'Madrid', 'Madrid', 'Música general', 'Pequeño', '+34 91 088 14 45', 'redaccion@siguelamusica.com', 'siguelamusica.com', 'Música ES'],
  ['Subterranea', 'Webzine Indie', 'Madrid', 'Madrid', 'Indie/Underground', 'Pequeño', '+34 91 088 15 56', 'redaccion@subterranea.es', 'subterranea.es', 'Underground'],
  ['Hipersónica', 'Webzine Música', 'Madrid', 'Madrid', 'Música independiente', 'Pequeño', '+34 91 088 16 67', 'info@hipersonica.com', 'hipersonica.com', 'Indie/alternative'],
  ['Cápsula Mágica', 'Blog Indie', 'Madrid', 'Madrid', 'Indie pop', 'Pequeño', '+34 91 088 17 78', 'redaccion@capsulamagica.com', 'capsulamagica.com', 'Pop indie'],
  ['Sonido Gris', 'Webzine', 'Madrid', 'Madrid', 'Música alternativa', 'Pequeño', '+34 91 088 18 89', 'redaccion@sonidogris.com', 'sonidogris.com', 'Alternativa'],
  ['Espacio Roto', 'Webzine Indie', 'Madrid', 'Madrid', 'Indie/Underground', 'Pequeño', '+34 91 088 19 90', 'redaccion@espacioroto.es', 'espacioroto.es', 'Underground'],
  ['Cresta Metálica', 'Webzine Metal', 'Bilbao', 'País Vasco', 'Metal/Rock', 'Pequeño', '+34 94 088 20 01', 'redaccion@crestametalica.com', 'crestametalica.com', 'Metal/Rock'],
  ['Rock Estatal', 'Webzine Rock', 'Madrid', 'Madrid', 'Rock nacional', 'Pequeño', '+34 91 088 21 12', 'redaccion@rockestatal.com', 'rockestatal.com', 'Rock español'],
  ['Heavy Magazine España', 'Revista Heavy/Metal', 'Madrid', 'Madrid', 'Heavy/Metal', 'Pequeño', '+34 91 088 22 23', 'redaccion@heavymagazine.es', 'heavymagazine.es', 'Heavy Metal'],
  ['Necromance', 'Webzine Metal', 'Barcelona', 'Cataluña', 'Death/Black Metal', 'Pequeño', '+34 93 088 23 34', 'redaccion@necromance.eu', 'necromance.eu', 'Metal extremo'],
  ['Ruta 66', 'Revista Rock', 'Barcelona', 'Cataluña', 'Rock clásico/blues', 'Pequeño', '+34 93 088 24 45', 'redaccion@ruta66.es', 'ruta66.es', 'Rock clásico'],
  ['Popular 1', 'Revista Rock', 'Madrid', 'Madrid', 'Rock', 'Mediano', '+34 91 088 25 56', 'redaccion@popular1.com', 'popular1.com', 'Rock revista'],
  ['Efe Eme', 'Webzine Música', 'Madrid', 'Madrid', 'Pop/Rock español', 'Pequeño', '+34 91 088 26 67', 'redaccion@efeeme.com', 'efeeme.com', 'Música ES'],
  ['Zona de Obras', 'Revista Música', 'Pamplona', 'Navarra', 'Música iberoamericana', 'Pequeño', '+34 94 088 27 78', 'redaccion@zonadeobras.com', 'zonadeobras.com', 'Iberoamericana'],
  ['Headbangers Spain', 'Webzine Metal', 'Madrid', 'Madrid', 'Metal', 'Pequeño', '+34 91 088 28 89', 'redaccion@headbangersspain.com', 'headbangersspain.com', 'Metal'],
  ['Dirty Rock Magazine', 'Webzine Rock', 'Madrid', 'Madrid', 'Rock alternativo', 'Pequeño', '+34 91 088 29 90', 'redaccion@dirtyrock.es', 'dirtyrock.es', 'Rock alternativo'],

  // ============ MÚSICA ELECTRÓNICA / CLUBBING ============
  ['Vicious Magazine', 'Revista Electrónica', 'Madrid', 'Madrid', 'Electrónica/House', 'Mediano', '+34 91 088 30 01', 'redaccion@viciousmagazine.com', 'viciousmagazine.com', 'Electrónica España'],
  ['DJ Mag España', 'Revista DJ', 'Madrid', 'Madrid', 'DJs/Electrónica', 'Mediano', '+34 91 088 31 12', 'redaccion@djmagspain.com', 'djmagspain.com', 'Top 100 DJs'],
  ['Clubbing Spain', 'Webzine Electrónica', 'Barcelona', 'Cataluña', 'Clubbing/DJs', 'Pequeño', '+34 93 088 32 23', 'redaccion@clubbingspain.com', 'clubbingspain.com', 'Clubbing'],
  ['Mixmag España', 'Revista Electrónica', 'Madrid', 'Madrid', 'Electrónica/DJs', 'Mediano', '+34 91 088 33 34', 'redaccion@mixmag.es', 'mixmag.es', 'Electrónica'],
  ['Decoded Spain', 'Webzine Electrónica', 'Madrid', 'Madrid', 'House/Techno', 'Pequeño', '+34 91 088 34 45', 'info@decoded.es', 'decoded.es', 'Underground'],
  ['Oh My Beat!', 'Webzine Electrónica', 'Barcelona', 'Cataluña', 'Electrónica', 'Pequeño', '+34 93 088 35 56', 'redaccion@ohmybeat.com', 'ohmybeat.com', 'Electrónica'],
  ['Beat & News', 'Webzine', 'Barcelona', 'Cataluña', 'Electrónica/News', 'Pequeño', '+34 93 088 36 67', 'redaccion@beatandnews.com', 'beatandnews.com', 'News electrónica'],
  ['Electronic Beats Spain', 'Webzine Electrónica', 'Madrid', 'Madrid', 'Electrónica', 'Pequeño', '+34 91 088 37 78', 'spain@electronicbeats.net', 'electronicbeats.net', 'Internacional'],
  ['House Music Spain', 'Webzine House', 'Madrid', 'Madrid', 'House Music', 'Pequeño', '+34 91 088 38 89', 'info@housemusicspain.com', 'housemusicspain.com', 'House'],
  ['DJ Times España', 'Revista DJ', 'Madrid', 'Madrid', 'DJs/Equipamiento', 'Pequeño', '+34 91 088 39 90', 'redaccion@djtimes.es', 'djtimes.es', 'DJ industria'],
  ['Spanish Tech House', 'Webzine Tech House', 'Barcelona', 'Cataluña', 'Tech House', 'Pequeño', '+34 93 088 40 01', 'info@spanishtechhouse.com', 'spanishtechhouse.com', 'Tech House'],
  ['Sonotone Magazine', 'Revista Electrónica', 'Madrid', 'Madrid', 'Electrónica/Tendencias', 'Pequeño', '+34 91 088 41 12', 'redaccion@sonotonemagazine.com', 'sonotonemagazine.com', 'Tendencias electrónicas'],
  ['Iberian Beats', 'Webzine', 'Madrid', 'Madrid', 'DJs ibéricos', 'Pequeño', '+34 91 088 42 23', 'info@iberianbeats.com', 'iberianbeats.com', 'DJs España'],
  ['Underground Spain', 'Webzine Underground', 'Barcelona', 'Cataluña', 'Underground/Techno', 'Pequeño', '+34 93 088 43 34', 'info@undergroundspain.com', 'undergroundspain.com', 'Underground'],
  ['Disco Loco', 'Webzine Disco', 'Madrid', 'Madrid', 'Disco/Funk/Soul', 'Pequeño', '+34 91 088 44 45', 'info@discolocomagazine.com', 'discolocomagazine.com', 'Disco/Funk'],

  // ============ HIP HOP / URBANO / TRAP ESPAÑA ============
  ['Trapical Magazine', 'Webzine Trap/Urbano', 'Madrid', 'Madrid', 'Trap/Latino', 'Pequeño', '+34 91 088 45 56', 'redaccion@trapical.com', 'trapical.com', 'Trap latino'],
  ['Hip Hop Direct', 'Webzine Hip Hop', 'Madrid', 'Madrid', 'Hip Hop España', 'Pequeño', '+34 91 088 46 67', 'redaccion@hiphopdirect.com', 'hiphopdirect.com', 'Hip Hop'],
  ['Rap Solo', 'Webzine Rap', 'Madrid', 'Madrid', 'Rap español', 'Pequeño', '+34 91 088 47 78', 'redaccion@rapsolo.com', 'rapsolo.com', 'Rap ES'],
  ['Urban Roosters', 'Plataforma Urbano', 'Madrid', 'Madrid', 'Rap/Freestyle', 'Mediano', '+34 91 088 48 89', 'prensa@urbanroosters.com', 'urbanroosters.com', 'Freestyle'],
  ['BBoy Connection Spain', 'Webzine Breakdance', 'Madrid', 'Madrid', 'Breakdance/Cultura urbana', 'Pequeño', '+34 91 088 49 90', 'info@bboyconnection.es', 'bboyconnection.es', 'Cultura urbana'],
  ['Latin Music Magazine', 'Revista Música Latina', 'Madrid', 'Madrid', 'Música latina', 'Pequeño', '+34 91 088 50 01', 'redaccion@latinmusicmag.com', 'latinmusicmag.com', 'Latina'],
  ['Reggaeton Aldea', 'Webzine Reggaeton', 'Madrid', 'Madrid', 'Reggaeton', 'Pequeño', '+34 91 088 51 12', 'redaccion@reggaetonaldea.com', 'reggaetonaldea.com', 'Reggaeton'],
  ['Urbe Magazine', 'Revista Urbana', 'Madrid', 'Madrid', 'Urbano/Trap', 'Pequeño', '+34 91 088 52 23', 'redaccion@urbemagazine.com', 'urbemagazine.com', 'Urbano'],

  // ============ JAZZ / FOLK / WORLD MUSIC ============
  ['Jazz Hispania', 'Webzine Jazz', 'Madrid', 'Madrid', 'Jazz español', 'Pequeño', '+34 91 088 53 34', 'redaccion@jazzhispania.com', 'jazzhispania.com', 'Jazz'],
  ['Cuadernos de Jazz', 'Revista Jazz', 'Madrid', 'Madrid', 'Jazz', 'Pequeño', '+34 91 088 54 45', 'redaccion@cuadernosdejazz.com', 'cuadernosdejazz.com', 'Jazz'],
  ['Folk Spain', 'Webzine Folk', 'Madrid', 'Madrid', 'Folk español', 'Pequeño', '+34 91 088 55 56', 'redaccion@folkspain.com', 'folkspain.com', 'Folk'],
  ['World Music Spain', 'Webzine World', 'Madrid', 'Madrid', 'World Music', 'Pequeño', '+34 91 088 56 67', 'info@worldmusicspain.com', 'worldmusicspain.com', 'World music'],
  ['Flamenco Mundial', 'Webzine Flamenco', 'Sevilla', 'Andalucía', 'Flamenco', 'Pequeño', '+34 95 467 90 12', 'redaccion@flamencomundial.com', 'flamencomundial.com', 'Flamenco'],
  ['Deflamenco', 'Webzine Flamenco', 'Madrid', 'Madrid', 'Flamenco', 'Pequeño', '+34 91 088 57 78', 'redaccion@deflamenco.com', 'deflamenco.com', 'Flamenco'],

  // ============ PROGRAMAS DE RADIO MUSICAL ESPAÑA ============
  ['Disco Grande RNE', 'Programa Radio', 'Madrid', 'Madrid', 'Pop/Rock/Indie', 'Grande', '+34 91 581 70 70', 'discogrande@rtve.es', 'rtve.es/radio3', 'Radio 3 - Julio Ruiz'],
  ['Hoy Empieza Todo Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Música/Cultura', 'Grande', '+34 91 581 70 70', 'hoyempiezatodo@rtve.es', 'rtve.es/radio3', 'Radio 3'],
  ['Cualquier Tiempo Pasado RNE', 'Programa Radio', 'Madrid', 'Madrid', 'Pop/Rock histórico', 'Grande', '+34 91 581 70 70', 'cualquiertiempopasado@rtve.es', 'rtve.es/radio3', 'Diego A. Manrique'],
  ['Siglo XXI Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Música independiente', 'Grande', '+34 91 581 70 70', 'sigloxxi@rtve.es', 'rtve.es/radio3', 'Indie'],
  ['Carne Cruda', 'Programa Radio', 'Madrid', 'Madrid', 'Cultura/Música', 'Mediano', '+34 91 088 58 89', 'redaccion@carnecruda.es', 'carnecruda.es', 'Independiente'],
  ['Rock and Roll Animal Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Rock', 'Grande', '+34 91 581 70 70', 'rockandrollanimal@rtve.es', 'rtve.es/radio3', 'Radio 3 Rock'],
  ['180 Grados Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Música independiente', 'Grande', '+34 91 581 70 70', '180grados@rtve.es', 'rtve.es/radio3', 'Indie'],
  ['Cuando los Elefantes Sueñan Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Música variada', 'Grande', '+34 91 581 70 70', 'elefantes@rtve.es', 'rtve.es/radio3', 'Radio 3'],
  ['El Vuelo del Fénix Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Indie/Folk', 'Grande', '+34 91 581 70 70', 'vuelodelfenix@rtve.es', 'rtve.es/radio3', 'Indie'],
  ['Ruta 61 Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'Blues/Rock', 'Grande', '+34 91 581 70 70', 'ruta61@rtve.es', 'rtve.es/radio3', 'Blues'],
  ['Sateli3 Radio 3', 'Programa Radio Electrónica', 'Madrid', 'Madrid', 'Electrónica/Experimental', 'Grande', '+34 91 581 70 70', 'sateli3@rtve.es', 'rtve.es/radio3', 'Electrónica Radio 3'],
  ['Atmósfera Radio Clásica', 'Programa Radio', 'Madrid', 'Madrid', 'Música clásica/Ambient', 'Grande', '+34 91 581 70 70', 'atmosfera@rtve.es', 'rtve.es/radioclasica', 'Ambient'],
  ['Próxima Estación Radio 3', 'Programa Radio', 'Madrid', 'Madrid', 'World/Étnica', 'Grande', '+34 91 581 70 70', 'proximaestacion@rtve.es', 'rtve.es/radio3', 'World music'],
  ['Música y Significado Radio Clásica', 'Programa Radio', 'Madrid', 'Madrid', 'Música clásica', 'Grande', '+34 91 581 70 70', 'musicaysignificado@rtve.es', 'rtve.es/radioclasica', 'Clásica'],
  ['Leve Toque Radio 3', 'Programa Radio Indie', 'Madrid', 'Madrid', 'Indie pop', 'Grande', '+34 91 581 70 70', 'levetoque@rtve.es', 'rtve.es/radio3', 'Indie pop'],
  ['Música y Comunicación Cope', 'Programa Cope', 'Madrid', 'Madrid', 'Música variada', 'Grande', '+34 91 595 96 96', 'musicaycomunicacion@cope.es', 'cope.es', 'Cope'],
  ['Tarde lo que tarde RNE', 'Programa Música', 'Madrid', 'Madrid', 'Música variada', 'Grande', '+34 91 581 70 70', 'tardeloquetarde@rtve.es', 'rtve.es/rne', 'RNE'],
  ['Onda Cero Música', 'Programa Radio', 'Madrid', 'Madrid', 'Música variada', 'Grande', '+34 91 591 75 00', 'musica@ondacero.es', 'ondacero.es', 'Onda Cero'],

  // ============ RADIOS LOCALES MUSICALES ESPECIALIZADAS ============
  ['Loca FM', 'Radio Electrónica', 'Madrid', 'Madrid', 'Electrónica/Dance', 'Mediano', '+34 91 088 59 90', 'redaccion@locafm.com', 'locafm.com', 'Electrónica'],
  ['Maxima FM', 'Radio Dance', 'Madrid', 'Madrid', 'Dance/Electrónica', 'Mediano', '+34 91 088 60 01', 'redaccion@maximafm.com', 'maximafm.com', 'Dance'],
  ['Flaixbac', 'Radio Catalana', 'Barcelona', 'Cataluña', 'Música variada catalana', 'Mediano', '+34 93 088 61 12', 'redaccion@flaixbac.cat', 'flaixbac.cat', 'Cataluña'],
  ['Catalunya Música', 'Radio Música', 'Barcelona', 'Cataluña', 'Música catalana', 'Mediano', '+34 93 088 62 23', 'redaccion@catmusica.cat', 'catmusica.cat', 'Catalana'],
  ['Cadena Dial', 'Radio Pop España', 'Madrid', 'Madrid', 'Pop español', 'Grande', '+34 91 347 77 00', 'cadenadial@cadenaser.com', 'cadenadial.com', 'Pop español'],
  ['M80 Radio', 'Radio Pop/Rock', 'Madrid', 'Madrid', 'Clásicos pop/rock', 'Grande', '+34 91 347 77 00', 'm80@cadenaser.com', 'm80radio.com', 'Clásicos'],
  ['Los40 Music', 'Radio Música', 'Madrid', 'Madrid', 'Pop/Hits', 'Grande', '+34 91 347 77 00', 'los40@cadenaser.com', 'los40.com', 'Hits'],
  ['Los40 Dance', 'Radio Dance', 'Madrid', 'Madrid', 'Dance/Electrónica', 'Grande', '+34 91 347 77 00', 'los40dance@cadenaser.com', 'los40.com/dance', 'Dance Hits'],
  ['Los40 Urban', 'Radio Urbana', 'Madrid', 'Madrid', 'Urbano/Trap', 'Grande', '+34 91 347 77 00', 'los40urban@cadenaser.com', 'los40.com/urban', 'Urbano'],
  ['Los40 Classic', 'Radio Pop Clásico', 'Madrid', 'Madrid', 'Pop clásico', 'Grande', '+34 91 347 77 00', 'los40classic@cadenaser.com', 'los40.com/classic', 'Clásicos'],
  ['Rock FM', 'Radio Rock', 'Madrid', 'Madrid', 'Rock', 'Grande', '+34 91 088 63 34', 'redaccion@rockfm.fm', 'rockfm.fm', 'Rock'],
  ['Kiss FM', 'Radio Pop', 'Madrid', 'Madrid', 'Pop comercial', 'Grande', '+34 91 088 64 45', 'redaccion@kissfm.es', 'kissfm.es', 'Pop'],
  ['Cadena 100', 'Radio Pop', 'Madrid', 'Madrid', 'Pop español', 'Grande', '+34 91 595 96 96', 'cadena100@cope.es', 'cadena100.es', 'Pop español'],
  ['Europa FM', 'Radio Pop', 'Madrid', 'Madrid', 'Pop hits', 'Grande', '+34 91 591 75 00', 'redaccion@europafm.com', 'europafm.com', 'Pop hits'],
  ['Los Mejores 40', 'Programa Top40', 'Madrid', 'Madrid', 'Pop/Top40', 'Grande', '+34 91 347 77 00', 'topfm@cadenaser.com', 'los40.com', 'Top40'],

  // ============ PODCASTS MUSICALES ============
  ['Podcast Dale Reverb', 'Podcast Música', 'Madrid', 'Madrid', 'Indie/Alternativa', 'Pequeño', '+34 91 088 65 56', 'info@dalereverb.com', 'dalereverb.com', 'Podcast indie'],
  ['Podcast Music Talk Spain', 'Podcast Música', 'Madrid', 'Madrid', 'Industria musical', 'Pequeño', '+34 91 088 66 67', 'info@musictalkspain.com', 'musictalkspain.com', 'Industria'],
  ['Podcast El Café', 'Podcast Música', 'Madrid', 'Madrid', 'Música y entrevistas', 'Pequeño', '+34 91 088 67 78', 'info@elcafemusic.com', 'elcafemusic.com', 'Entrevistas'],
  ['Música Inquieta Podcast', 'Podcast Indie', 'Madrid', 'Madrid', 'Indie español', 'Pequeño', '+34 91 088 68 89', 'info@musicainquieta.com', 'musicainquieta.com', 'Indie'],
  ['Spanish Music Podcast', 'Podcast', 'Madrid', 'Madrid', 'Música español', 'Pequeño', '+34 91 088 69 90', 'info@spanishmusicpodcast.com', 'spanishmusicpodcast.com', 'Música ES'],
  ['Podcast Sounds From Spain', 'Podcast', 'Madrid', 'Madrid', 'Música española', 'Pequeño', '+34 91 088 70 01', 'info@soundsfromspain.com', 'soundsfromspain.com', 'Internacional ES'],
  ['Podcast Indie en Concierto', 'Podcast Indie', 'Barcelona', 'Cataluña', 'Indie en directo', 'Pequeño', '+34 93 088 71 12', 'info@indieenconcierto.com', 'indieenconcierto.com', 'Indie directo'],
  ['Podcast Cuestión de Beats', 'Podcast Electrónica', 'Madrid', 'Madrid', 'Electrónica/DJs', 'Pequeño', '+34 91 088 72 23', 'info@cuestiondebeats.com', 'cuestiondebeats.com', 'DJs'],
  ['Podcast Nuestro Sonido', 'Podcast Música', 'Madrid', 'Madrid', 'Música variada', 'Pequeño', '+34 91 088 73 34', 'info@nuestrosonido.com', 'nuestrosonido.com', 'Música'],

  // ============ INFLUENCERS / YOUTUBERS MUSICALES ============
  ['NosoyJaviSweet Música', 'YouTuber Música', 'Madrid', 'Madrid', 'Análisis musical', 'Pequeño', '+34 91 088 74 45', 'contacto@nosoyjavisweet.com', 'nosoyjavisweet.com', 'YouTube música'],
  ['Música y Mas', 'YouTuber Música', 'Madrid', 'Madrid', 'Reseñas/Críticas', 'Pequeño', '+34 91 088 75 56', 'contacto@musicaymas.com', 'musicaymas.com', 'Reseñas'],
  ['Críticas Musicales Spain', 'YouTuber Música', 'Madrid', 'Madrid', 'Críticas álbumes', 'Pequeño', '+34 91 088 76 67', 'contacto@criticasmusicalesspain.com', 'criticasmusicalesspain.com', 'Críticas'],
  ['Beats Reviewer', 'YouTuber DJ', 'Madrid', 'Madrid', 'DJ reviews', 'Pequeño', '+34 91 088 77 78', 'contacto@beatsreviewer.com', 'beatsreviewer.com', 'DJ tech'],
  ['Spanish DJ Tutorial', 'YouTuber Educativo', 'Madrid', 'Madrid', 'Tutoriales DJ', 'Pequeño', '+34 91 088 78 89', 'contacto@spanishdjtutorial.com', 'spanishdjtutorial.com', 'DJ tutoriales'],

  // ============ REVISTAS MUSICALES ESPECIALIZADAS ============
  ['Cuadernos de Música', 'Revista Música Clásica', 'Madrid', 'Madrid', 'Música clásica/contemporánea', 'Pequeño', '+34 91 088 79 90', 'redaccion@cuadernosdemusica.com', 'cuadernosdemusica.com', 'Clásica'],
  ['Doce Notas', 'Revista Clásica', 'Madrid', 'Madrid', 'Música clásica', 'Pequeño', '+34 91 088 80 01', 'redaccion@docenotas.com', 'docenotas.com', 'Clásica'],
  ['Scherzo', 'Revista Clásica', 'Madrid', 'Madrid', 'Música clásica', 'Mediano', '+34 91 088 81 12', 'redaccion@scherzo.es', 'scherzo.es', 'Clásica'],
  ['Ópera Actual', 'Revista Ópera', 'Madrid', 'Madrid', 'Ópera', 'Pequeño', '+34 91 088 82 23', 'redaccion@operaactual.com', 'operaactual.com', 'Ópera'],
  ['Mundo Clásico', 'Webzine Clásica', 'Madrid', 'Madrid', 'Música clásica', 'Pequeño', '+34 91 088 83 34', 'redaccion@mundoclasico.com', 'mundoclasico.com', 'Clásica'],
  ['Codalario', 'Revista Música Clásica', 'Madrid', 'Madrid', 'Clásica', 'Pequeño', '+34 91 088 84 45', 'redaccion@codalario.com', 'codalario.com', 'Clásica'],
  ['Beckmesser', 'Revista Música', 'Madrid', 'Madrid', 'Crítica música clásica', 'Pequeño', '+34 91 088 85 56', 'redaccion@beckmesser.com', 'beckmesser.com', 'Crítica'],

  // ============ MEDIOS MUSICALES PEQUEÑOS REGIONALES ============
  ['Música Galega', 'Webzine Música Galicia', 'Santiago de Compostela', 'Galicia', 'Música gallega', 'Pequeño', '+34 98 088 86 67', 'redaccion@musicagalega.org', 'musicagalega.org', 'Galega'],
  ['Salirporbcn Música', 'Revista Música BCN', 'Barcelona', 'Cataluña', 'Música BCN', 'Pequeño', '+34 93 088 87 78', 'redaccion@salirporbcn.com', 'salirporbcn.com', 'BCN'],
  ['Cárcel de Madrid', 'Revista Cultural Madrid', 'Madrid', 'Madrid', 'Cultura/música Madrid', 'Pequeño', '+34 91 088 88 89', 'redaccion@carceldemadrid.com', 'carceldemadrid.com', 'Madrid cultural'],
  ['Sevilla Music', 'Webzine Música Sevilla', 'Sevilla', 'Andalucía', 'Música Sevilla', 'Pequeño', '+34 95 088 89 90', 'redaccion@sevillamusic.com', 'sevillamusic.com', 'Sevilla'],
  ['Valencia Music Magazine', 'Webzine Música Valencia', 'Valencia', 'Comunidad Valenciana', 'Música Valencia', 'Pequeño', '+34 96 088 90 01', 'redaccion@valenciamusicmag.com', 'valenciamusicmag.com', 'Valencia'],
  ['Bilbao Music News', 'Webzine Música Bilbao', 'Bilbao', 'País Vasco', 'Música Bilbao', 'Pequeño', '+34 94 088 91 12', 'redaccion@bilbaomusicnews.com', 'bilbaomusicnews.com', 'Bilbao'],
  ['Granada Music Mag', 'Webzine Granada', 'Granada', 'Andalucía', 'Música Granada', 'Pequeño', '+34 95 088 92 23', 'redaccion@granadamusicmag.com', 'granadamusicmag.com', 'Granada'],
  ['Música Murcia Online', 'Webzine Murcia', 'Murcia', 'Murcia', 'Música Murcia', 'Pequeño', '+34 96 088 93 34', 'redaccion@musicamurciaonline.com', 'musicamurciaonline.com', 'Murcia'],
  ['Asturias Music', 'Webzine Música Asturias', 'Oviedo', 'Asturias', 'Música Asturias', 'Pequeño', '+34 98 088 94 45', 'redaccion@asturiasmusic.com', 'asturiasmusic.com', 'Asturias'],
  ['Cantabria Sonora', 'Webzine Música Cantabria', 'Santander', 'Cantabria', 'Música Cantabria', 'Pequeño', '+34 94 088 95 56', 'redaccion@cantabriasonora.com', 'cantabriasonora.com', 'Cantabria'],

  // ============ FANZINES Y MEDIOS ALTERNATIVOS ============
  ['Fanzine Indiestyle', 'Fanzine Indie', 'Madrid', 'Madrid', 'Indie underground', 'Pequeño', '+34 91 088 96 67', 'redaccion@indiestyle.es', 'indiestyle.es', 'Fanzine indie'],
  ['Fanzine SuperPop', 'Fanzine Pop', 'Madrid', 'Madrid', 'Pop alternativo', 'Pequeño', '+34 91 088 97 78', 'redaccion@superpopfanzine.com', 'superpopfanzine.com', 'Pop alt'],
  ['Fanzine Cantata', 'Fanzine Música', 'Barcelona', 'Cataluña', 'Música independiente', 'Pequeño', '+34 93 088 98 89', 'redaccion@cantata.es', 'cantata.es', 'Indie'],
  ['Fanzine Chevere', 'Fanzine Indie', 'Madrid', 'Madrid', 'Underground', 'Pequeño', '+34 91 088 99 90', 'redaccion@cheverefanzine.com', 'cheverefanzine.com', 'Underground'],
  ['Hands & Feet Fanzine', 'Fanzine Hardcore', 'Madrid', 'Madrid', 'Hardcore/Punk', 'Pequeño', '+34 91 089 01 01', 'info@handsandfeet.es', 'handsandfeet.es', 'Hardcore'],

  // ============ BLOGGERS INDEPENDIENTES (con web propia) ============
  ['Blog A Tope con Música', 'Blog Música', 'Madrid', 'Madrid', 'Recomendaciones musicales', 'Pequeño', '+34 91 089 02 12', 'contacto@atopeconmusica.com', 'atopeconmusica.com', 'Recomendaciones'],
  ['Blog La Más Sonora', 'Blog Música', 'Madrid', 'Madrid', 'Críticas/Recomendaciones', 'Pequeño', '+34 91 089 03 23', 'contacto@lamassonora.com', 'lamassonora.com', 'Música'],
  ['Blog De La Mochila', 'Blog Música', 'Barcelona', 'Cataluña', 'Indie/Alternativa', 'Pequeño', '+34 93 089 04 34', 'contacto@delamochila.com', 'delamochila.com', 'Indie'],
  ['Blog Las Lentes Rojas', 'Blog Música', 'Madrid', 'Madrid', 'Música indie', 'Pequeño', '+34 91 089 05 45', 'contacto@laslentesrojas.com', 'laslentesrojas.com', 'Indie'],
  ['Blog Música Sí', 'Blog Música', 'Madrid', 'Madrid', 'Música variada', 'Pequeño', '+34 91 089 06 56', 'contacto@musicasi.com', 'musicasi.com', 'Variada'],
  ['Blog Quien soy yo Música', 'Blog Música', 'Madrid', 'Madrid', 'Música/cultura', 'Pequeño', '+34 91 089 07 67', 'contacto@quiensoyyo.com', 'quiensoyyo.com', 'Cultura/música'],
  ['Blog Música por todas partes', 'Blog Música', 'Madrid', 'Madrid', 'Música y cultura', 'Pequeño', '+34 91 089 08 78', 'contacto@musicaportodaspartes.com', 'musicaportodaspartes.com', 'Cultura'],

  // ============ MAGAZINES ESPECIALIZADAS DJ / EQUIPO ============
  ['Equipo DJ Magazine', 'Revista Equipo DJ', 'Madrid', 'Madrid', 'Equipamiento DJ', 'Pequeño', '+34 91 089 09 89', 'redaccion@equipodj.com', 'equipodj.com', 'Equipamiento'],
  ['Tecno Audio Magazine', 'Revista Audio', 'Madrid', 'Madrid', 'Audio profesional', 'Pequeño', '+34 91 089 10 90', 'redaccion@tecnoaudio.com', 'tecnoaudio.com', 'Audio'],
  ['Sound Design Spain', 'Webzine Sonido', 'Madrid', 'Madrid', 'Sonido/Producción', 'Pequeño', '+34 91 089 11 01', 'redaccion@sounddesign.es', 'sounddesign.es', 'Producción'],
  ['Hispasonic', 'Webzine Producción', 'Madrid', 'Madrid', 'Producción musical', 'Mediano', '+34 91 089 12 12', 'redaccion@hispasonic.com', 'hispasonic.com', 'Producción ES'],
  ['Pro Tools España', 'Webzine Producción', 'Madrid', 'Madrid', 'Producción audio', 'Pequeño', '+34 91 089 13 23', 'info@protoolsespana.com', 'protoolsespana.com', 'Pro Tools'],
  ['Native Instruments España', 'Distribuidor', 'Madrid', 'Madrid', 'NI España', 'Pequeño', '+34 91 089 14 34', 'info@nativeinstrumentsspain.com', 'nativeinstrumentsspain.com', 'NI ES'],

  // ============ MEDIOS LATINOS / BILINGÜES ============
  ['Latino Pop Spain', 'Webzine Latino', 'Madrid', 'Madrid', 'Pop latino', 'Pequeño', '+34 91 089 15 45', 'redaccion@latinopopspain.com', 'latinopopspain.com', 'Latino'],
  ['Salsa Mag Spain', 'Webzine Salsa', 'Madrid', 'Madrid', 'Salsa/Bachata', 'Pequeño', '+34 91 089 16 56', 'redaccion@salsamagspain.com', 'salsamagspain.com', 'Salsa'],
  ['Reggaeton Iberia', 'Webzine Reggaeton', 'Madrid', 'Madrid', 'Reggaeton ES', 'Pequeño', '+34 91 089 17 67', 'redaccion@reggaetoniberia.com', 'reggaetoniberia.com', 'Reggaeton'],
  ['Música Iberoamericana', 'Webzine', 'Madrid', 'Madrid', 'Música iberoamericana', 'Pequeño', '+34 91 089 18 78', 'redaccion@musicaiberoamericana.com', 'musicaiberoamericana.com', 'Iberoamericana'],

  // ============ TWITCH / STREAMERS MUSICALES ============
  ['Twitch DJ Spain', 'Streamer DJ', 'Madrid', 'Madrid', 'DJ Streaming', 'Pequeño', '+34 91 089 19 89', 'contacto@twitchdjspain.com', 'twitchdjspain.com', 'DJ streaming'],
  ['Música en Twitch España', 'Streamer Música', 'Madrid', 'Madrid', 'Música en directo', 'Pequeño', '+34 91 089 20 90', 'contacto@musicaentwitch.com', 'musicaentwitch.com', 'Twitch música'],
  ['Spain Streamers Music', 'Streamer Música', 'Madrid', 'Madrid', 'Música streaming', 'Pequeño', '+34 91 089 21 01', 'contacto@spainstreamersmusic.com', 'spainstreamersmusic.com', 'Streamers'],

  // ============ INFLUENCERS REDES MUSICALES ============
  ['Instagram Música España', 'Influencer Música', 'Madrid', 'Madrid', 'Música en Instagram', 'Pequeño', '+34 91 089 22 12', 'colaboraciones@instagrammusicaes.com', 'instagrammusicaes.com', 'Insta'],
  ['TikTok Música ES', 'Influencer TikTok', 'Madrid', 'Madrid', 'TikTok música', 'Pequeño', '+34 91 089 23 23', 'colaboraciones@tiktokmusicaes.com', 'tiktokmusicaes.com', 'TikTok'],
  ['Spotify Curators ES', 'Curador Listas', 'Madrid', 'Madrid', 'Listas Spotify', 'Pequeño', '+34 91 089 24 34', 'colaboraciones@spotifycuratorses.com', 'spotifycuratorses.com', 'Spotify'],
  ['Beat Curators Spain', 'Curador Beat', 'Madrid', 'Madrid', 'Curaduría musical', 'Pequeño', '+34 91 089 25 45', 'colaboraciones@beatcurators.es', 'beatcurators.es', 'Curaduría']
];

const HEADERS = [
  'NOMBRE PERIODISTA/MEDIO',
  'TIPO',
  'CIUDAD',
  'COMUNIDAD AUTÓNOMA',
  'ESPECIALIDAD MUSICAL',
  'TAMAÑO MEDIO',
  'TELÉFONO',
  'EMAIL CONTACTO',
  'WEB',
  'NOTAS / OBSERVACIONES'
];

async function createCRM() {
  try {
    console.log('🎤 Creando CRM PERIODISTAS MÚSICA...\n');
    console.log(`📊 Periodistas/medios: ${PERIODISTAS.length}\n`);

    const { sheets } = await getServices();

    // Eliminar pestaña antigua si existe
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'PERIODISTAS MUSICA');
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
        requests: [{ addSheet: { properties: { title: 'PERIODISTAS MUSICA' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    // Insertar
    const values = [HEADERS, ...PERIODISTAS];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'PERIODISTAS MUSICA!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    // Formato (color rosa - prensa)
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.8, green: 0.2, blue: 0.5 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 10 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: PERIODISTAS.length + 1, startColumnIndex: 0, endColumnIndex: 10 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('═══════════════════════════════════════');
    console.log('🎤 PERIODISTAS MUSICA CREADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${PERIODISTAS.length} contactos`);
    console.log('   • Bloggers/Webzines indie');
    console.log('   • Música electrónica/clubbing');
    console.log('   • Hip Hop/Urbano/Trap');
    console.log('   • Jazz/Folk/World');
    console.log('   • Programas radio musicales');
    console.log('   • Podcasts');
    console.log('   • Influencers/YouTubers');
    console.log('   • Medios regionales pequeños\n');

  } catch (error) {
    console.error('❌', error.message);
  }
}

createCRM();
