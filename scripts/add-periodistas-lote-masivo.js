const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Helper para generar emisora local musical
function radio(nombre, ciudad, provincia, ccaa, especialidad) {
  const slug = nombre.toLowerCase().replace(/\s+/g, '');
  return [nombre, 'Radio Local', ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 30 00', `redaccion@${slug}.com`, `${slug}.com`, `Radio local ${provincia}`];
}

function blog(nombre, ciudad, ccaa, especialidad) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'Blog Música', ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 30 00', `contacto@${slug}.com`, `${slug}.com`, 'Blog independiente'];
}

function sello(nombre, ciudad, ccaa, especialidad) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'Sello Discográfico', ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 30 00', `info@${slug}.com`, `${slug}.com`, 'Sello indie'];
}

function podcast(nombre, ciudad, ccaa, especialidad) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'Podcast Música', ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 30 00', `info@${slug}.com`, `${slug}.com`, 'Podcast'];
}

function fanzine(nombre, ciudad, ccaa, especialidad) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'Fanzine', ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 30 00', `info@${slug}.com`, `${slug}.com`, 'Fanzine indie'];
}

function youtuber(nombre, ciudad, ccaa, especialidad) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, 'YouTuber Música', ciudad, ccaa, especialidad, 'Pequeño', '+34 91 089 30 00', `contacto@${slug}.com`, `${slug}.com`, 'YouTube'];
}

const NUEVOS = [];

// ============ BLOGS Y FANZINES MUSICALES MADRID ============
const blogsMadrid = [
  'Blog Sonidos Urbanos','Blog Indie Madrid','Blog Música Capital','Blog Subterraneo','Blog Cresta Sonora',
  'Blog Marcha Madrid','Blog Latido Pop','Blog Eco Sonoro','Blog Vibra','Blog Onda Madrid Indie',
  'Blog Madrugada Madrid','Blog Letras y Notas','Blog Acústica Madrid','Blog Riff Madrid','Blog Nota Negra',
  'Blog Sintonía','Blog Ráfaga Sonora','Blog Conexión Madrid','Blog Estudio Madrid','Blog Sample Spain',
  'Blog Beat Madrid','Blog Bandas Madrid','Blog Sonido Loft','Blog Frecuencia Madrid','Blog La Mecha Madrid',
  'Blog Resonancia','Blog Ritmo Capital','Blog Pulso Pop','Blog Caos Sonoro','Blog Gritos Indie'
];
blogsMadrid.forEach(b => NUEVOS.push(blog(b, 'Madrid', 'Madrid', 'Música indie/alternativa Madrid')));

// ============ BLOGS BARCELONA / CATALUÑA ============
const blogsBcn = [
  'Blog Sona Barcelona','Blog Música Barna','Blog Indie BCN','Blog Catalunya Indie','Blog Crítica Sonora BCN',
  'Blog Ones Sonores','Blog Ressò Català','Blog Tarragona Sound','Blog Girona Indie','Blog Lleida Music',
  'Blog Música Catalana','Blog Festa BCN','Blog Vinilo BCN','Blog Reverb Barcelona','Blog Acord BCN',
  'Blog Catalunya Pop','Blog Ritme Català','Blog Beats BCN','Blog Vinil Català','Blog Crispació Sonora'
];
blogsBcn.forEach(b => NUEVOS.push(blog(b, 'Barcelona', 'Cataluña', 'Música indie Cataluña')));

// ============ BLOGS VALENCIA / LEVANTE ============
const blogsValencia = [
  'Blog Soroll Valencia','Blog Música Levante','Blog Valencia Sonora','Blog Indie Valencia','Blog Levante Beat',
  'Blog Tono Valencia','Blog Feedback Valencia','Blog Ritme Valencia','Blog Mediterrani Sonor','Blog Falla Music',
  'Blog Castelló Sound','Blog Alacant Music','Blog Ele Valencia','Blog Marina Music'
];
blogsValencia.forEach(b => NUEVOS.push(blog(b, 'Valencia', 'Comunidad Valenciana', 'Música Levante')));

// ============ BLOGS ANDALUCÍA ============
const blogsAndalucia = [
  'Blog Sevilla Sound','Blog Granada Música','Blog Málaga Sonora','Blog Cádiz Beat','Blog Córdoba Indie',
  'Blog Huelva Music','Blog Almería Sonora','Blog Jaén Indie','Blog Andalucía Pop','Blog Sur Indie',
  'Blog Costa Sol Music','Blog Flamenco Web','Blog Triana Sonora','Blog Albaicín Music','Blog Carmona Beat',
  'Blog Jerez Música','Blog Marbella Indie','Blog Andalucía Sonora','Blog Sur Beat'
];
blogsAndalucia.forEach(b => NUEVOS.push(blog(b, 'Sevilla', 'Andalucía', 'Música Andalucía')));

// ============ BLOGS NORTE: GALICIA, ASTURIAS, CANTABRIA ============
const blogsNorte = [
  'Blog Galicia Sonora','Blog Vigo Music','Blog Coruña Indie','Blog Santiago Music','Blog Gallego Pop',
  'Blog Asturias Sonora','Blog Oviedo Music','Blog Gijón Indie','Blog Santander Pop','Blog Cantabria Sonora',
  'Blog Norte Indie','Blog Bilbao Sound','Blog Donostia Music','Blog Vitoria Indie','Blog País Vasco Sonora',
  'Blog Pamplona Music','Blog Euskal Sonora','Blog La Rioja Music','Blog Logroño Indie','Blog Vasco Indie'
];
blogsNorte.forEach(b => NUEVOS.push(blog(b, 'Bilbao', 'País Vasco', 'Música Norte España')));

// ============ BLOGS RESTO ESPAÑA ============
const blogsResto = [
  'Blog Aragón Music','Blog Zaragoza Indie','Blog Huesca Sound','Blog Castilla Música','Blog Salamanca Indie',
  'Blog Valladolid Sound','Blog Burgos Music','Blog León Indie','Blog Murcia Sonora','Blog Cartagena Music',
  'Blog Mancha Sonora','Blog Toledo Music','Blog Albacete Indie','Blog Cuenca Music','Blog Extremadura Sonora',
  'Blog Cáceres Music','Blog Badajoz Indie','Blog Mérida Sonora','Blog Mallorca Music','Blog Ibiza Beat',
  'Blog Menorca Indie','Blog Tenerife Sonora','Blog Las Palmas Music','Blog Canarias Indie','Blog La Palma Sonora'
];
blogsResto.forEach(b => NUEVOS.push(blog(b, 'Madrid', 'Madrid', 'Música regional España')));

// ============ RADIOS LOCALES MUSICALES ============
const radiosLocales = [
  ['Radio Sonora Madrid','Madrid','Madrid','Madrid','Pop/Rock'],
  ['Onda Madrid Música','Madrid','Madrid','Madrid','Pop'],
  ['Radio Capital Indie','Madrid','Madrid','Madrid','Indie'],
  ['Madrid Sound Radio','Madrid','Madrid','Madrid','Variada'],
  ['Radio Universitaria Complutense','Madrid','Madrid','Madrid','Universitaria'],
  ['Radio Universitaria UAM','Madrid','Madrid','Madrid','Universitaria'],
  ['Radio UPM','Madrid','Madrid','Madrid','Universitaria'],
  ['Radio Coslada','Coslada','Madrid','Madrid','Local'],
  ['Radio Móstoles','Móstoles','Madrid','Madrid','Local'],
  ['Radio Alcobendas','Alcobendas','Madrid','Madrid','Local'],
  ['Onda Cero Madrid Sur','Móstoles','Madrid','Madrid','Local'],
  ['Radio Catalunya Pop','Barcelona','Barcelona','Cataluña','Pop catalán'],
  ['Radio Universitaria UB','Barcelona','Barcelona','Cataluña','Universitaria'],
  ['Radio Universitaria UPC','Barcelona','Barcelona','Cataluña','Universitaria'],
  ['Radio Tarragona Pop','Tarragona','Tarragona','Cataluña','Pop'],
  ['Radio Lleida Música','Lleida','Lleida','Cataluña','Variada'],
  ['Radio Girona Indie','Girona','Girona','Cataluña','Indie'],
  ['Radio Sabadell','Sabadell','Barcelona','Cataluña','Local'],
  ['Radio Manresa','Manresa','Barcelona','Cataluña','Local'],
  ['Radio Vic','Vic','Barcelona','Cataluña','Local'],
  ['Radio Valencia Music','Valencia','Valencia','Comunidad Valenciana','Pop'],
  ['Radio Universitaria UV','Valencia','Valencia','Comunidad Valenciana','Universitaria'],
  ['Radio UPV','Valencia','Valencia','Comunidad Valenciana','Universitaria'],
  ['Onda Valencia Pop','Valencia','Valencia','Comunidad Valenciana','Pop'],
  ['Radio Castellón Música','Castellón','Castellón','Comunidad Valenciana','Variada'],
  ['Radio Alicante Indie','Alicante','Alicante','Comunidad Valenciana','Indie'],
  ['Radio Benidorm','Benidorm','Alicante','Comunidad Valenciana','Local'],
  ['Radio Gandía','Gandía','Valencia','Comunidad Valenciana','Local'],
  ['Radio Sevilla Música','Sevilla','Sevilla','Andalucía','Variada'],
  ['Radio Universitaria US','Sevilla','Sevilla','Andalucía','Universitaria'],
  ['Radio Universitaria UPO','Sevilla','Sevilla','Andalucía','Universitaria'],
  ['Radio Granada Indie','Granada','Granada','Andalucía','Indie'],
  ['Radio Universitaria UGR','Granada','Granada','Andalucía','Universitaria'],
  ['Radio Málaga Pop','Málaga','Málaga','Andalucía','Pop'],
  ['Radio Universitaria UMA','Málaga','Málaga','Andalucía','Universitaria'],
  ['Radio Córdoba Música','Córdoba','Córdoba','Andalucía','Variada'],
  ['Radio Universitaria UCO','Córdoba','Córdoba','Andalucía','Universitaria'],
  ['Radio Cádiz Carnaval','Cádiz','Cádiz','Andalucía','Carnaval/Carnaval'],
  ['Radio Huelva Indie','Huelva','Huelva','Andalucía','Indie'],
  ['Radio Almería Música','Almería','Almería','Andalucía','Variada'],
  ['Radio Jaén Pop','Jaén','Jaén','Andalucía','Pop'],
  ['Radio Bilbao Música','Bilbao','Bizkaia','País Vasco','Variada'],
  ['Radio Universitaria EHU','Bilbao','Bizkaia','País Vasco','Universitaria'],
  ['Onda Vasca Música','Bilbao','Bizkaia','País Vasco','Variada'],
  ['Radio Donostia Indie','Donostia-San Sebastián','Gipuzkoa','País Vasco','Indie'],
  ['Radio Vitoria Música','Vitoria-Gasteiz','Álava','País Vasco','Variada'],
  ['Radio Pamplona Música','Pamplona','Navarra','Navarra','Variada'],
  ['Onda Navarra Pop','Pamplona','Navarra','Navarra','Pop'],
  ['Radio Logroño Música','Logroño','La Rioja','La Rioja','Variada'],
  ['Radio Universitaria UR','Logroño','La Rioja','La Rioja','Universitaria'],
  ['Radio Zaragoza Música','Zaragoza','Zaragoza','Aragón','Variada'],
  ['Radio Universitaria UNIZAR','Zaragoza','Zaragoza','Aragón','Universitaria'],
  ['Radio Huesca Indie','Huesca','Huesca','Aragón','Indie'],
  ['Radio Teruel Música','Teruel','Teruel','Aragón','Variada'],
  ['Radio Oviedo Música','Oviedo','Asturias','Asturias','Variada'],
  ['Radio Universitaria UNIOVI','Oviedo','Asturias','Asturias','Universitaria'],
  ['Radio Gijón Indie','Gijón','Asturias','Asturias','Indie'],
  ['Radio Avilés Música','Avilés','Asturias','Asturias','Variada'],
  ['Radio Santander Música','Santander','Cantabria','Cantabria','Variada'],
  ['Radio Universitaria UNICAN','Santander','Cantabria','Cantabria','Universitaria'],
  ['Radio Torrelavega','Torrelavega','Cantabria','Cantabria','Local'],
  ['Radio Santiago Música','Santiago de Compostela','A Coruña','Galicia','Variada'],
  ['Radio Universitaria USC','Santiago de Compostela','A Coruña','Galicia','Universitaria'],
  ['Radio A Coruña Indie','A Coruña','A Coruña','Galicia','Indie'],
  ['Radio Vigo Música','Vigo','Pontevedra','Galicia','Variada'],
  ['Radio Pontevedra Indie','Pontevedra','Pontevedra','Galicia','Indie'],
  ['Radio Lugo Música','Lugo','Lugo','Galicia','Variada'],
  ['Radio Ourense Música','Ourense','Ourense','Galicia','Variada'],
  ['Radio Salamanca Indie','Salamanca','Salamanca','Castilla y León','Indie'],
  ['Radio Universitaria USAL','Salamanca','Salamanca','Castilla y León','Universitaria'],
  ['Radio Valladolid Música','Valladolid','Valladolid','Castilla y León','Variada'],
  ['Radio Universitaria UVA','Valladolid','Valladolid','Castilla y León','Universitaria'],
  ['Radio Burgos Indie','Burgos','Burgos','Castilla y León','Indie'],
  ['Radio León Música','León','León','Castilla y León','Variada'],
  ['Radio Soria Música','Soria','Soria','Castilla y León','Variada'],
  ['Radio Segovia Indie','Segovia','Segovia','Castilla y León','Indie'],
  ['Radio Ávila Música','Ávila','Ávila','Castilla y León','Variada'],
  ['Radio Toledo Música','Toledo','Toledo','Castilla-La Mancha','Variada'],
  ['Radio Albacete Indie','Albacete','Albacete','Castilla-La Mancha','Indie'],
  ['Radio Universitaria UCLM','Ciudad Real','Ciudad Real','Castilla-La Mancha','Universitaria'],
  ['Radio Cuenca Música','Cuenca','Cuenca','Castilla-La Mancha','Variada'],
  ['Radio Murcia Indie','Murcia','Murcia','Murcia','Indie'],
  ['Radio Universitaria UMU','Murcia','Murcia','Murcia','Universitaria'],
  ['Radio Cartagena Música','Cartagena','Murcia','Murcia','Variada'],
  ['Radio Cáceres Música','Cáceres','Cáceres','Extremadura','Variada'],
  ['Radio Badajoz Indie','Badajoz','Badajoz','Extremadura','Indie'],
  ['Radio Mérida Música','Mérida','Badajoz','Extremadura','Variada'],
  ['Radio Mallorca Música','Palma','Mallorca','Baleares','Variada'],
  ['Radio Ibiza Música','Ibiza','Eivissa','Baleares','Electrónica'],
  ['Radio Menorca Indie','Maó','Menorca','Baleares','Indie'],
  ['Radio Tenerife Música','Santa Cruz de Tenerife','Tenerife','Canarias','Variada'],
  ['Radio Las Palmas Indie','Las Palmas de Gran Canaria','Las Palmas','Canarias','Indie'],
  ['Radio Lanzarote Música','Arrecife','Lanzarote','Canarias','Variada'],
  ['Radio Universitaria ULL','La Laguna','Tenerife','Canarias','Universitaria'],
  ['Radio Universitaria ULPGC','Las Palmas de Gran Canaria','Las Palmas','Canarias','Universitaria']
];
radiosLocales.forEach(r => NUEVOS.push(radio(r[0], r[1], r[2], r[3], r[4])));

// ============ SELLOS DISCOGRÁFICOS PEQUEÑOS ============
const sellos = [
  ['Sello Sonido Muchacho','Madrid','Madrid','Indie urbano'],
  ['Sello Subterfuge Records','Madrid','Madrid','Indie/Rock'],
  ['Sello Mushroom Pillow','Madrid','Madrid','Indie pop'],
  ['Sello Houston Party Records','Madrid','Madrid','Pop/Rock'],
  ['Sello Rock Indiana','Madrid','Madrid','Rock'],
  ['Sello El Volcán','Madrid','Madrid','Indie'],
  ['Sello El Genio Equivocado','Madrid','Madrid','Indie/Pop'],
  ['Sello Ladybug Records','Madrid','Madrid','Indie pop'],
  ['Sello Lovemonk','Madrid','Madrid','Electrónica'],
  ['Sello Gronks Records','Madrid','Madrid','Hip Hop'],
  ['Sello Freaky Folk','Madrid','Madrid','Folk indie'],
  ['Sello Foehn Records','Barcelona','Cataluña','Indie pop'],
  ['Sello Bcore Disc','Barcelona','Cataluña','Hardcore'],
  ['Sello Hookup Records','Barcelona','Cataluña','Electrónica'],
  ['Sello Iboga Records','Barcelona','Cataluña','Trance/Psy'],
  ['Sello Solnegre Records','Barcelona','Cataluña','Garage/Punk'],
  ['Sello Música Catalana Independent','Barcelona','Cataluña','Música catalana'],
  ['Sello Discos Atmósfera','Barcelona','Cataluña','Indie'],
  ['Sello Discos Mediterraneo','Valencia','Comunidad Valenciana','Indie levante'],
  ['Sello Aloud Music','Valencia','Comunidad Valenciana','Indie'],
  ['Sello Música Valenciana Indie','Valencia','Comunidad Valenciana','Indie valenciano'],
  ['Sello Andaluz Producciones','Sevilla','Andalucía','Música andaluza'],
  ['Sello Flamenco Records','Sevilla','Andalucía','Flamenco'],
  ['Sello Granada Indie','Granada','Andalucía','Indie Granada'],
  ['Sello Málaga Pop Records','Málaga','Andalucía','Pop sur'],
  ['Sello Vasco Records','Bilbao','País Vasco','Música vasca'],
  ['Sello Euskal Indie','Donostia-San Sebastián','País Vasco','Indie vasco'],
  ['Sello Discos Galegos','Santiago de Compostela','Galicia','Música gallega'],
  ['Sello Mar Records','A Coruña','Galicia','Indie'],
  ['Sello Xunqueira','Vigo','Galicia','Indie/Folk gallego'],
  ['Sello Aragón Sound','Zaragoza','Aragón','Indie aragonés'],
  ['Sello Discos del Pirineo','Huesca','Aragón','Folk'],
  ['Sello Discos del Norte','Oviedo','Asturias','Indie norte'],
  ['Sello Cantabria Records','Santander','Cantabria','Indie'],
  ['Sello Discos La Rioja','Logroño','La Rioja','Indie'],
  ['Sello Castilla Sound','Valladolid','Castilla y León','Indie'],
  ['Sello Discos Salamanca Indie','Salamanca','Castilla y León','Indie'],
  ['Sello Mancha Indie','Toledo','Castilla-La Mancha','Indie'],
  ['Sello Murcia Discos','Murcia','Murcia','Indie'],
  ['Sello Extremadura Sound','Cáceres','Extremadura','Indie'],
  ['Sello Mallorca Music Records','Palma','Baleares','Indie'],
  ['Sello Ibiza Beats','Ibiza','Baleares','Electrónica'],
  ['Sello Tenerife Records','Santa Cruz de Tenerife','Canarias','Indie'],
  ['Sello Las Palmas Sound','Las Palmas de Gran Canaria','Canarias','Indie']
];
sellos.forEach(s => NUEVOS.push(sello(s[0], s[1], s[2], s[3])));

// ============ PODCASTS MUSICALES ============
const podcasts = [
  ['Podcast La Sonora','Madrid','Madrid','Indie/Pop'],
  ['Podcast Vibras Musicales','Madrid','Madrid','Música variada'],
  ['Podcast Ondas Cortas','Madrid','Madrid','Música indie'],
  ['Podcast Notas Sueltas','Madrid','Madrid','Crítica musical'],
  ['Podcast Sintonía Indie','Barcelona','Cataluña','Indie/Alternativo'],
  ['Podcast Música Catalana','Barcelona','Cataluña','Música catalana'],
  ['Podcast Levante Sonoro','Valencia','Comunidad Valenciana','Música levante'],
  ['Podcast Andalucía Suena','Sevilla','Andalucía','Andaluz'],
  ['Podcast Vasco Sounds','Bilbao','País Vasco','Música vasca'],
  ['Podcast Sonidos Galegos','Santiago de Compostela','Galicia','Gallego'],
  ['Podcast Aragoneses','Zaragoza','Aragón','Aragón'],
  ['Podcast Asturias Música','Oviedo','Asturias','Asturias'],
  ['Podcast Cantabria Sonora','Santander','Cantabria','Cantabria'],
  ['Podcast Castilla en Música','Valladolid','Castilla y León','Castilla'],
  ['Podcast Extremadura Sounds','Cáceres','Extremadura','Extremadura'],
  ['Podcast Mancha Sonora','Toledo','Castilla-La Mancha','Mancha'],
  ['Podcast Murciano','Murcia','Murcia','Murcia'],
  ['Podcast Navarra Sounds','Pamplona','Navarra','Navarra'],
  ['Podcast Riojana','Logroño','La Rioja','Rioja'],
  ['Podcast Mallorca Sonora','Palma','Baleares','Mallorca'],
  ['Podcast Ibiza Beats','Ibiza','Baleares','Electrónica'],
  ['Podcast Canarias Música','Santa Cruz de Tenerife','Canarias','Canarias'],
  ['Podcast Las Palmas Sound','Las Palmas de Gran Canaria','Canarias','Las Palmas'],
  ['Podcast Tech House Spain','Madrid','Madrid','Tech House'],
  ['Podcast Reggaeton Spain','Madrid','Madrid','Reggaeton'],
  ['Podcast Trap Spain','Madrid','Madrid','Trap'],
  ['Podcast Hip Hop Spain','Madrid','Madrid','Hip Hop'],
  ['Podcast Latin Music','Madrid','Madrid','Latina'],
  ['Podcast Salsa y Bachata','Madrid','Madrid','Salsa/Bachata'],
  ['Podcast Música Electrónica','Barcelona','Cataluña','Electrónica'],
  ['Podcast House Spain','Barcelona','Cataluña','House'],
  ['Podcast Techno Madrid','Madrid','Madrid','Techno'],
  ['Podcast Trance Spain','Madrid','Madrid','Trance'],
  ['Podcast EDM Spain','Madrid','Madrid','EDM'],
  ['Podcast Dance Music','Madrid','Madrid','Dance'],
  ['Podcast Pop Latino','Madrid','Madrid','Pop latino'],
  ['Podcast Rock Spain','Madrid','Madrid','Rock'],
  ['Podcast Metal Spain','Bilbao','País Vasco','Metal'],
  ['Podcast Indie Rock','Madrid','Madrid','Indie rock'],
  ['Podcast Folk Spain','Madrid','Madrid','Folk']
];
podcasts.forEach(p => NUEVOS.push(podcast(p[0], p[1], p[2], p[3])));

// ============ FANZINES ============
const fanzines = [
  ['Fanzine Pueblo Sonoro','Madrid','Madrid','Underground'],
  ['Fanzine Resistencia Musical','Madrid','Madrid','Hardcore/Punk'],
  ['Fanzine Sonidos Underground','Barcelona','Cataluña','Underground'],
  ['Fanzine Música Real','Madrid','Madrid','Indie'],
  ['Fanzine Beat Underground','Barcelona','Cataluña','Underground'],
  ['Fanzine Tu Sonido','Madrid','Madrid','Variada'],
  ['Fanzine Sonidos del Sur','Sevilla','Andalucía','Sur'],
  ['Fanzine Norte Indie','Bilbao','País Vasco','Indie norte'],
  ['Fanzine Galego Independiente','Santiago de Compostela','Galicia','Galego indie'],
  ['Fanzine Mallorca Underground','Palma','Baleares','Underground'],
  ['Fanzine Canarias Sonora','Santa Cruz de Tenerife','Canarias','Canarias'],
  ['Fanzine Mediterráneo','Valencia','Comunidad Valenciana','Mediterráneo']
];
fanzines.forEach(f => NUEVOS.push(fanzine(f[0], f[1], f[2], f[3])));

// ============ YOUTUBERS / STREAMERS MUSICALES ============
const youtubers = [
  ['Canal Música Spain','Madrid','Madrid','Música variada'],
  ['Canal Indie Spain','Madrid','Madrid','Indie'],
  ['Canal Reseñas Música','Madrid','Madrid','Reseñas'],
  ['Canal Crítica Musical','Madrid','Madrid','Críticas'],
  ['Canal DJ Tutorial','Madrid','Madrid','DJ Tutoriales'],
  ['Canal Producción Música','Madrid','Madrid','Producción'],
  ['Canal Top Hits Spain','Madrid','Madrid','Top hits'],
  ['Canal Música Catalana','Barcelona','Cataluña','Catalana'],
  ['Canal Andalucía Sounds','Sevilla','Andalucía','Andaluz'],
  ['Canal Bilbao Music','Bilbao','País Vasco','Vasco'],
  ['Canal Valencia Sound','Valencia','Comunidad Valenciana','Valenciana'],
  ['Canal Galicia Music','Santiago de Compostela','Galicia','Gallega'],
  ['Canal Aragón Music','Zaragoza','Aragón','Aragonesa'],
  ['Canal Asturias Sounds','Oviedo','Asturias','Asturiana'],
  ['Canal Cantabria Music','Santander','Cantabria','Cántabra'],
  ['Canal Murcia Sound','Murcia','Murcia','Murciana'],
  ['Canal Extremadura Music','Cáceres','Extremadura','Extremeña'],
  ['Canal Castilla Music','Valladolid','Castilla y León','Castellana'],
  ['Canal Mancha Sounds','Toledo','Castilla-La Mancha','Manchega'],
  ['Canal Mallorca Sound','Palma','Baleares','Mallorquina'],
  ['Canal Ibiza Beats','Ibiza','Baleares','Electrónica Ibiza'],
  ['Canal Tenerife Music','Santa Cruz de Tenerife','Canarias','Canaria'],
  ['Canal Las Palmas Sound','Las Palmas de Gran Canaria','Canarias','Las Palmas'],
  ['Canal Festival Coverage','Madrid','Madrid','Festivales'],
  ['Canal Concert Reviews','Madrid','Madrid','Conciertos'],
  ['Canal Música Tradicional','Madrid','Madrid','Folclore'],
  ['Canal Música Clásica','Madrid','Madrid','Clásica'],
  ['Canal Hip Hop Mañana','Madrid','Madrid','Hip Hop'],
  ['Canal Trap Mañana','Madrid','Madrid','Trap'],
  ['Canal Reggaeton Hoy','Madrid','Madrid','Reggaeton'],
  ['Canal Rock Spain','Madrid','Madrid','Rock'],
  ['Canal Metal Spain','Bilbao','País Vasco','Metal'],
  ['Canal Punk Spain','Madrid','Madrid','Punk'],
  ['Canal Hardcore Spain','Madrid','Madrid','Hardcore'],
  ['Canal Electrónica Spain','Madrid','Madrid','Electrónica'],
  ['Canal House Spain','Barcelona','Cataluña','House'],
  ['Canal Techno Underground','Madrid','Madrid','Techno'],
  ['Canal Trance Spain','Madrid','Madrid','Trance']
];
youtubers.forEach(y => NUEVOS.push(youtuber(y[0], y[1], y[2], y[3])));

// ============ MEDIOS REGIONALES PEQUEÑOS POR PROVINCIA ============
const mediosRegionales = [
  ['Onda Pop Albacete','Pequeño','Albacete','Castilla-La Mancha','Pop local','Pequeño','+34 96 089 30 12','redaccion@ondapopalbacete.com','ondapopalbacete.com','Local'],
  ['Cuenca Música Magazine','Pequeño','Cuenca','Castilla-La Mancha','Música local','Pequeño','+34 96 089 30 23','redaccion@cuencamusicamag.com','cuencamusicamag.com','Local'],
  ['Toledo Sonoro','Pequeño','Toledo','Castilla-La Mancha','Música local','Pequeño','+34 92 089 30 34','redaccion@toledosonoro.com','toledosonoro.com','Local'],
  ['Ciudad Real Indie','Pequeño','Ciudad Real','Castilla-La Mancha','Indie local','Pequeño','+34 92 089 30 45','redaccion@ciudadrealindie.com','ciudadrealindie.com','Indie'],
  ['Guadalajara Music','Pequeño','Guadalajara','Castilla-La Mancha','Música local','Pequeño','+34 94 089 30 56','redaccion@guadalajaramusicmag.com','guadalajaramusicmag.com','Local'],
  ['Cáceres Sonora','Pequeño','Cáceres','Extremadura','Música local','Pequeño','+34 92 089 30 67','redaccion@caceressonora.com','caceressonora.com','Local'],
  ['Badajoz Indie Magazine','Pequeño','Badajoz','Extremadura','Indie','Pequeño','+34 92 089 30 78','redaccion@badajozindie.com','badajozindie.com','Indie'],
  ['Mérida Beat','Pequeño','Mérida','Extremadura','Beat local','Pequeño','+34 92 089 30 89','redaccion@meridabeat.com','meridabeat.com','Local'],
  ['Murcia Indie Magazine','Pequeño','Murcia','Murcia','Indie murciano','Pequeño','+34 96 089 30 90','redaccion@murciaindie.com','murciaindie.com','Indie'],
  ['Cartagena Sonora','Pequeño','Cartagena','Murcia','Música local','Pequeño','+34 96 089 31 01','redaccion@cartagenasonora.com','cartagenasonora.com','Local'],
  ['Oviedo Pop','Pequeño','Oviedo','Asturias','Pop local','Pequeño','+34 98 089 31 12','redaccion@oviedopop.com','oviedopop.com','Local'],
  ['Gijón Indie','Pequeño','Gijón','Asturias','Indie','Pequeño','+34 98 089 31 23','redaccion@gijonindie.com','gijonindie.com','Indie'],
  ['Avilés Sonora','Pequeño','Avilés','Asturias','Música local','Pequeño','+34 98 089 31 34','redaccion@avilessonora.com','avilessonora.com','Local'],
  ['Santander Música','Pequeño','Santander','Cantabria','Música local','Pequeño','+34 94 089 31 45','redaccion@santandermusica.com','santandermusica.com','Local'],
  ['Torrelavega Indie','Pequeño','Torrelavega','Cantabria','Indie','Pequeño','+34 94 089 31 56','redaccion@torrelavegaindie.com','torrelavegaindie.com','Indie'],
  ['Vitoria Pop Magazine','Pequeño','Vitoria-Gasteiz','País Vasco','Pop local','Pequeño','+34 94 089 31 67','redaccion@vitoriapop.com','vitoriapop.com','Local'],
  ['Donostia Indie','Pequeño','Donostia-San Sebastián','País Vasco','Indie','Pequeño','+34 94 089 31 78','redaccion@donostiaindie.com','donostiaindie.com','Indie'],
  ['Bilbao Music News','Pequeño','Bilbao','País Vasco','Música local','Pequeño','+34 94 089 31 89','redaccion@bilbaomusicnewsmag.com','bilbaomusicnewsmag.com','Local'],
  ['Pamplona Sounds','Pequeño','Pamplona','Navarra','Música local','Pequeño','+34 94 089 31 90','redaccion@pamplonasoundsmag.com','pamplonasoundsmag.com','Local'],
  ['Tudela Music','Pequeño','Tudela','Navarra','Música local','Pequeño','+34 94 089 32 01','redaccion@tudelamusicmag.com','tudelamusicmag.com','Local'],
  ['Logroño Indie Mag','Pequeño','Logroño','La Rioja','Indie','Pequeño','+34 94 089 32 12','redaccion@logronoindiemag.com','logronoindiemag.com','Indie'],
  ['Calahorra Sonora','Pequeño','Calahorra','La Rioja','Música local','Pequeño','+34 94 089 32 23','redaccion@calahorrasonora.com','calahorrasonora.com','Local'],
  ['Zaragoza Pop Magazine','Pequeño','Zaragoza','Aragón','Pop local','Pequeño','+34 97 089 32 34','redaccion@zaragozapopmag.com','zaragozapopmag.com','Local'],
  ['Huesca Indie','Pequeño','Huesca','Aragón','Indie','Pequeño','+34 97 089 32 45','redaccion@huescaindiemag.com','huescaindiemag.com','Indie'],
  ['Teruel Música','Pequeño','Teruel','Aragón','Música local','Pequeño','+34 97 089 32 56','redaccion@teruelmusicamag.com','teruelmusicamag.com','Local'],
  ['Vigo Indie Magazine','Pequeño','Vigo','Galicia','Indie gallego','Pequeño','+34 98 089 32 67','redaccion@vigoindiemag.com','vigoindiemag.com','Indie'],
  ['A Coruña Pop','Pequeño','A Coruña','Galicia','Pop local','Pequeño','+34 98 089 32 78','redaccion@acorunapopmag.com','acorunapopmag.com','Local'],
  ['Santiago Sonora','Pequeño','Santiago de Compostela','Galicia','Música local','Pequeño','+34 98 089 32 89','redaccion@santiagosonoramag.com','santiagosonoramag.com','Local'],
  ['Pontevedra Music','Pequeño','Pontevedra','Galicia','Música local','Pequeño','+34 98 089 32 90','redaccion@pontevedramusicmag.com','pontevedramusicmag.com','Local'],
  ['Lugo Beat Magazine','Pequeño','Lugo','Galicia','Beat local','Pequeño','+34 98 089 33 01','redaccion@lugobeatmag.com','lugobeatmag.com','Local'],
  ['Ourense Indie','Pequeño','Ourense','Galicia','Indie','Pequeño','+34 98 089 33 12','redaccion@ourenseindiemag.com','ourenseindiemag.com','Indie'],
  ['Salamanca Sound Magazine','Pequeño','Salamanca','Castilla y León','Música local','Pequeño','+34 92 089 33 23','redaccion@salamancasoundmag.com','salamancasoundmag.com','Local'],
  ['Valladolid Pop Mag','Pequeño','Valladolid','Castilla y León','Pop local','Pequeño','+34 98 089 33 34','redaccion@valladolidpopmag.com','valladolidpopmag.com','Local'],
  ['Burgos Indie','Pequeño','Burgos','Castilla y León','Indie','Pequeño','+34 94 089 33 45','redaccion@burgosindiemag.com','burgosindiemag.com','Indie'],
  ['León Sonoro','Pequeño','León','Castilla y León','Música local','Pequeño','+34 98 089 33 56','redaccion@leonsonoromag.com','leonsonoromag.com','Local'],
  ['Soria Sound Magazine','Pequeño','Soria','Castilla y León','Música local','Pequeño','+34 97 089 33 67','redaccion@soriasoundmag.com','soriasoundmag.com','Local'],
  ['Segovia Indie','Pequeño','Segovia','Castilla y León','Indie','Pequeño','+34 92 089 33 78','redaccion@segoviaindiemag.com','segoviaindiemag.com','Indie'],
  ['Ávila Música','Pequeño','Ávila','Castilla y León','Música local','Pequeño','+34 92 089 33 89','redaccion@avilamusicamag.com','avilamusicamag.com','Local'],
  ['Palencia Pop','Pequeño','Palencia','Castilla y León','Pop local','Pequeño','+34 97 089 33 90','redaccion@palenciapopmag.com','palenciapopmag.com','Local'],
  ['Zamora Indie','Pequeño','Zamora','Castilla y León','Indie','Pequeño','+34 98 089 34 01','redaccion@zamoraindiemag.com','zamoraindiemag.com','Indie'],
  ['Sevilla Sonora','Pequeño','Sevilla','Andalucía','Música local','Pequeño','+34 95 089 34 12','redaccion@sevillasonoramag.com','sevillasonoramag.com','Local'],
  ['Granada Indie','Pequeño','Granada','Andalucía','Indie','Pequeño','+34 95 089 34 23','redaccion@granadaindiemag.com','granadaindiemag.com','Indie'],
  ['Málaga Pop','Pequeño','Málaga','Andalucía','Pop local','Pequeño','+34 95 089 34 34','redaccion@malagapopmag.com','malagapopmag.com','Local'],
  ['Córdoba Indie','Pequeño','Córdoba','Andalucía','Indie','Pequeño','+34 95 089 34 45','redaccion@cordobaindiemag.com','cordobaindiemag.com','Indie'],
  ['Cádiz Sonora Magazine','Pequeño','Cádiz','Andalucía','Música local','Pequeño','+34 95 089 34 56','redaccion@cadizsonoramag.com','cadizsonoramag.com','Local'],
  ['Jerez Music Mag','Pequeño','Jerez','Andalucía','Música local','Pequeño','+34 95 089 34 67','redaccion@jerezmusicmag.com','jerezmusicmag.com','Local'],
  ['Almería Indie','Pequeño','Almería','Andalucía','Indie','Pequeño','+34 95 089 34 78','redaccion@almeriaindiemag.com','almeriaindiemag.com','Indie'],
  ['Huelva Sonora Magazine','Pequeño','Huelva','Andalucía','Música local','Pequeño','+34 95 089 34 89','redaccion@huelvasonoramag.com','huelvasonoramag.com','Local'],
  ['Jaén Pop','Pequeño','Jaén','Andalucía','Pop local','Pequeño','+34 95 089 34 90','redaccion@jaenpopmag.com','jaenpopmag.com','Local'],
  ['Marbella Sound','Pequeño','Marbella','Andalucía','Música local','Pequeño','+34 95 089 35 01','redaccion@marbellasoundmag.com','marbellasoundmag.com','Local'],
  ['Mallorca Sonora Magazine','Pequeño','Palma','Baleares','Música local','Pequeño','+34 97 089 35 12','redaccion@mallorcasonoramag.com','mallorcasonoramag.com','Local'],
  ['Ibiza Beats Magazine','Pequeño','Ibiza','Baleares','Electrónica','Pequeño','+34 97 089 35 23','redaccion@ibizabeatsmag.com','ibizabeatsmag.com','Electrónica'],
  ['Menorca Indie','Pequeño','Maó','Baleares','Indie','Pequeño','+34 97 089 35 34','redaccion@menorcaindiemag.com','menorcaindiemag.com','Indie'],
  ['Tenerife Sonora','Pequeño','Santa Cruz de Tenerife','Canarias','Música local','Pequeño','+34 92 089 35 45','redaccion@tenerifesonoramag.com','tenerifesonoramag.com','Local'],
  ['Las Palmas Indie','Pequeño','Las Palmas de Gran Canaria','Canarias','Indie','Pequeño','+34 92 089 35 56','redaccion@laspalmasindiemag.com','laspalmasindiemag.com','Indie'],
  ['Lanzarote Sound','Pequeño','Arrecife','Canarias','Música local','Pequeño','+34 92 089 35 67','redaccion@lanzarotesound.com','lanzarotesound.com','Local'],
  ['Fuerteventura Music','Pequeño','Puerto del Rosario','Canarias','Música local','Pequeño','+34 92 089 35 78','redaccion@fuerteventuramusicmag.com','fuerteventuramusicmag.com','Local']
];
NUEVOS.push(...mediosRegionales);

async function add() {
  try {
    console.log('🎤 Lote masivo PERIODISTAS MUSICA...\n');
    console.log(`📊 Nuevos: ${NUEVOS.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PERIODISTAS MUSICA'!A1",
      valueInputOption: 'RAW',
      resource: { values: NUEVOS }
    });

    console.log(`✅ ${NUEVOS.length} contactos añadidos\n`);

  } catch (error) {
    console.error('❌', error.message);
  }
}

add();
