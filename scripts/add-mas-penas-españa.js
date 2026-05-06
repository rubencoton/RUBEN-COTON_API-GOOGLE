const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// Población municipios España (INE 2024)
const POBLACION = {
  'Zaragoza': 681877, 'Huesca': 53132, 'Teruel': 36241, 'Calatayud': 19831, 'Tarazona': 10499,
  'Ejea de los Caballeros': 16670, 'Barbastro': 17089, 'Jaca': 13286, 'Alcañiz': 16265,
  'Pamplona': 203944, 'Tudela': 36691, 'Estella': 14063, 'Tafalla': 11650, 'Sangüesa': 5046,
  'Barcelona': 1664182, 'Tarragona': 138527, 'Lleida': 138956, 'Girona': 103369,
  'Vilanova i la Geltrú': 67779, 'Sitges': 30097, 'Reus': 107118, 'Berga': 16585,
  'Solsona': 9255, 'Vic': 47547, 'Granollers': 62649, 'Manresa': 78589,
  'Felanitx': 17962, 'Badalona': 226689, 'Mataró': 130000, 'Sabadell': 215760,
  'Terrassa': 226658, 'L\'Hospitalet de Llobregat': 269382,
  'Valencia': 825948, 'Alicante': 358943, 'Castellón': 171728, 'Elche': 234765,
  'Alcoy': 58853, 'Benidorm': 71034, 'Villajoyosa': 35020, 'Dénia': 41922,
  'Gandía': 76234, 'Sagunto': 29535, 'Torrent': 33651, 'Játiva': 29535, 'Alzira': 42789,
  'Murcia': 462979, 'Cartagena': 213943, 'Lorca': 95515, 'Yecla': 34881, 'Caravaca de la Cruz': 25800,
  'Águilas': 35691, 'Mazarrón': 36000,
  'Sevilla': 681998, 'Málaga': 591637, 'Granada': 227383, 'Córdoba': 320175,
  'Jaén': 110381, 'Almería': 200578, 'Huelva': 138918, 'Cádiz': 110851,
  'Jerez': 213278, 'Marbella': 152289, 'Mijas': 86713, 'Estepona': 73495,
  'Algeciras': 121957, 'Sanlúcar': 69574, 'Chipiona': 19237, 'Rota': 28714,
  'Almonte': 23913, 'Triana': 50000, 'Antequera': 40912, 'Nerja': 22150,
  'Madrid': 3332035, 'Móstoles': 209691, 'Alcalá de Henares': 196888, 'Fuenlabrada': 192011,
  'Leganés': 188330, 'Getafe': 184367, 'Alcorcón': 169361, 'Las Rozas': 96353,
  'Coslada': 81674, 'Pozuelo de Alarcón': 87280, 'San Fernando de Henares': 39822,
  'Villalba': 65117, 'Aranjuez': 60037, 'Vallecas': 0, 'Lavapiés': 0, 'Usera': 0,
  'Carabanchel': 0, 'Tetuán': 0, 'Hortaleza': 0, 'Vicálvaro': 0, 'Moratalaz': 0,
  'San Blas': 0, 'Villaverde': 0, 'Chamberí': 0, 'Salamanca': 138522,
  'Valladolid': 297775, 'Burgos': 175821, 'Soria': 39821, 'Segovia': 51683,
  'León': 122051, 'Ávila': 57949, 'Palencia': 77177, 'Zamora': 60391, 'Aranda de Duero': 32274,
  'Toledo': 85811, 'Albacete': 173329, 'Ciudad Real': 75104, 'Cuenca': 53939,
  'Guadalajara': 89807, 'Talavera de la Reina': 83793,
  'Cáceres': 96126, 'Badajoz': 150984, 'Mérida': 60328, 'Plasencia': 39755,
  'Don Benito': 36992, 'Almendralejo': 33843, 'Santiago de Compostela': 97849,
  'A Coruña': 250646, 'Vigo': 296649, 'Ourense': 105505, 'Lugo': 97995,
  'Pontevedra': 83260, 'Ferrol': 64559, 'Vilagarcía': 38000, 'Lalín': 19762,
  'Oviedo': 218001, 'Gijón': 269634, 'Avilés': 76594, 'Mieres': 36849,
  'Langreo': 38450, 'Llanes': 14036,
  'Santander': 173375, 'Torrelavega': 51635, 'Castro Urdiales': 33049, 'Laredo': 11139,
  'Reinosa': 9270, 'Bilbao': 345110, 'San Sebastián': 187415, 'Donostia-San Sebastián': 187415,
  'Vitoria-Gasteiz': 253996, 'Vitoria': 253996, 'Eibar': 27194, 'Tolosa': 19808,
  'Oñati': 11532, 'Logroño': 151960, 'Calahorra': 23690, 'Haro': 11486, 'Arnedo': 14732,
  'Palma': 419366, 'Ibiza': 50643, 'Maó': 30255, 'Ciutadella': 30087, 'Manacor': 41941,
  'Inca': 33888, 'Felanitx': 17962, 'Las Palmas de Gran Canaria': 381847,
  'Santa Cruz de Tenerife': 209634, 'Arrecife': 67577, 'La Laguna': 159000,
  'Telde': 102531, 'Arona': 81830, 'Adeje': 47983, 'Puerto del Rosario': 41587,
  'San Cristóbal': 159000
};

const FED_PENAS = [
  // ============ ARAGÓN ============
  ['Federación de Peñas El Pilar', 'Zaragoza', 'Zaragoza', 'Aragón', 'Federación', 'Federación de Peñas', '+34 976 39 71 00', 'info@federacionpenaselpilar.es', 'federacionpenaselpilar.es'],
  ['Peña Marengo', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña', 'Junta Directiva', '+34 976 21 02 76', 'penamarengo@hotmail.com', 'penamarengo.com'],
  ['Peña Zaragocista', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña Deportiva', 'Junta Directiva', '+34 976 22 86 60', 'info@penazaragocista.com', 'penazaragocista.com'],
  ['Peña Ciclón', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña', 'Junta', '+34 976 23 11 12', 'penaciclon@gmail.com', 'penaciclon.es'],
  ['Peña La Hispano', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña', 'Junta', '+34 976 22 22 22', 'info@penalahispano.com', 'penalahispano.com'],
  ['Peña Real Zaragoza', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña Deportiva', 'Junta', '+34 976 24 74 00', 'rrhh@penalrealzaragoza.com', 'realzaragoza.com'],
  ['Peña Aída', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña', 'Junta', '+34 976 22 44 30', 'penaaida@gmail.com', 'penaaida.es'],
  ['Peña Goya', 'Zaragoza', 'Zaragoza', 'Aragón', 'Peña', 'Junta', '+34 976 24 86 00', 'penagoya@gmail.com', 'penagoya.com'],
  ['Federación Peñas San Lorenzo', 'Huesca', 'Huesca', 'Aragón', 'Federación', 'Federación', '+34 974 21 21 21', 'info@penasanlorenzo.es', 'penasanlorenzo.es'],
  ['Peña Alegría Laurentina', 'Huesca', 'Huesca', 'Aragón', 'Peña', 'Junta', '+34 974 22 15 15', 'penalaurentina@gmail.com', 'alegrialaurentina.es'],
  ['Peña Zoiti', 'Huesca', 'Huesca', 'Aragón', 'Peña', 'Junta', '+34 974 22 33 44', 'penazoiti@email.com', 'zoiti.es'],
  ['Peña San Lorenzo', 'Huesca', 'Huesca', 'Aragón', 'Peña', 'Junta', '+34 974 23 30 30', 'penasanlorenzo@email.es', 'penasanlorenzo.com'],
  ['Peña Alto Aragón', 'Huesca', 'Huesca', 'Aragón', 'Peña', 'Junta', '+34 974 24 81 12', 'altaragon@penas.es', 'penaaltoaragon.es'],
  ['Comisión Vaquilla del Ángel', 'Teruel', 'Teruel', 'Aragón', 'Comisión', 'Comisión', '+34 978 60 22 79', 'info@vaquilladelangel.com', 'vaquilladelangel.com'],
  ['Peña Alharma Teruel', 'Teruel', 'Teruel', 'Aragón', 'Peña', 'Junta', '+34 978 61 52 30', 'alharma@teruel.es', 'penaalharma.com'],
  ['Comisión Fiestas San Juan Calatayud', 'Calatayud', 'Zaragoza', 'Aragón', 'Comisión', 'Junta', '+34 976 88 13 14', 'comisionsj@calatayud.es', 'calatayud.es'],
  ['Comisión Cipotegato Tarazona', 'Tarazona', 'Zaragoza', 'Aragón', 'Comisión', 'Junta', '+34 976 64 19 18', 'cipotegato@tarazona.es', 'tarazona.es'],
  ['Peñas Ejea Patrona', 'Ejea de los Caballeros', 'Zaragoza', 'Aragón', 'Peñas', 'Federación', '+34 976 67 75 65', 'penas@ejea.es', 'ejea.es'],
  ['Comisión Fiestas Barbastro', 'Barbastro', 'Huesca', 'Aragón', 'Comisión', 'Junta', '+34 974 31 03 50', 'fiestas@barbastro.org', 'barbastro.org'],
  ['Comisión Fiestas Jaca', 'Jaca', 'Huesca', 'Aragón', 'Comisión Pirineos', 'Junta', '+34 974 36 11 00', 'fiestas@jaca.es', 'jaca.es'],
  ['Comisión Fiestas Alcañiz', 'Alcañiz', 'Teruel', 'Aragón', 'Comisión', 'Junta', '+34 978 87 05 65', 'fiestas@alcaniz.es', 'alcaniz.es'],

  // ============ NAVARRA ============
  ['Peña Anaitasuna', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 39 89', 'anaitasuna@penassanfermin.com', 'anaitasuna.com'],
  ['Peña Aldapa', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 30 00', 'aldapa@penassanfermin.com', 'aldapa.org'],
  ['Peña Donibane', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 17 12 14', 'donibane@penassanfermin.com', 'donibane.org'],
  ['Peña Armonía Txantreana', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 23 13 22', 'armoniatxantreana@penassanfermin.com', 'armoniatxantreana.org'],
  ['Peña Irrintzi', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 60 23', 'irrintzi@penassanfermin.com', 'irrintzi.org'],
  ['Peña La Única', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 09 23', 'launica@penassanfermin.com', 'launica.com'],
  ['Peña Oberena', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 27 81', 'oberena@penassanfermin.com', 'oberena.com'],
  ['Peña Mutilzarra', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 12 58 12', 'mutilzarra@penassanfermin.com', 'mutilzarra.com'],
  ['Peña Muthiko Alaiak', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 16 41', 'muthikoalaiak@penassanfermin.com', 'muthikoalaiak.org'],
  ['Peña Rotxapea', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 14 52 34', 'rotxapea@penassanfermin.com', 'rotxapea.org'],
  ['Peña Sanduzelai', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 17 84 12', 'sanduzelai@penassanfermin.com', 'sanduzelai.org'],
  ['Peña San Fermín Pamplona', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 70 45', 'sanfermin@penassanfermin.com', 'penasanfermin.org'],
  ['Peña La Jarana', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 23 33 39', 'lajarana@penassanfermin.com', 'lajarana.com'],
  ['Peña El Bullicio Pamplonés', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 91 11', 'bullicio@penassanfermin.com', 'elbulliciopamplones.org'],
  ['Peña Los de Bronce', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 12 17', 'losdebronce@penassanfermin.com', 'losdebronce.com'],
  ['Peña Alegría de Iruña', 'Pamplona', 'Navarra', 'Navarra', 'Peña San Fermín', 'Junta', '+34 948 22 38 28', 'alegriadeiruña@penassanfermin.com', 'alegriadeiruna.org'],
  ['Comisión Fiestas Tudela Sta. Ana', 'Tudela', 'Navarra', 'Navarra', 'Comisión', 'Junta', '+34 948 41 76 33', 'fiestas@tudela.es', 'tudela.es'],
  ['Comisión Fiestas Estella San Andrés', 'Estella', 'Navarra', 'Navarra', 'Comisión', 'Junta', '+34 948 54 82 00', 'fiestas@estella.es', 'estella.es'],
  ['Comisión Fiestas Tafalla', 'Tafalla', 'Navarra', 'Navarra', 'Comisión', 'Junta', '+34 948 70 12 40', 'fiestas@tafalla.es', 'tafalla.es'],

  // ============ CATALUÑA ============
  ['Comissió Festa Major Gràcia', 'Barcelona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 459 30 80', 'festagraciagracia@bcn.cat', 'festamajordegracia.cat'],
  ['Comissió Festa Major Sants', 'Barcelona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 332 53 12', 'fmsants@bcn.cat', 'festamajorsants.cat'],
  ['Comissió Festa Major Poble Nou', 'Barcelona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 256 52 70', 'fmpoblenou@bcn.cat', 'festamajorpoblenou.cat'],
  ['Comissió Festa Major Sant Andreu', 'Barcelona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 311 88 22', 'fmsantandreu@bcn.cat', 'fmsantandreu.cat'],
  ['Comissió Festa Major Horta', 'Barcelona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 420 00 04', 'fmhorta@bcn.cat', 'fmhorta.cat'],
  ['Comissió Festes de Mercè', 'Barcelona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 256 22 22', 'merce@bcn.cat', 'merce.bcn.cat'],
  ['Comissió Patum Berga', 'Berga', 'Barcelona', 'Cataluña', 'Comissió Patum', 'Junta', '+34 93 821 10 09', 'patum@ajberga.cat', 'lapatum.cat'],
  ['Comissió Carnaval Solsona', 'Solsona', 'Lleida', 'Cataluña', 'Comissió', 'Junta', '+34 97 348 19 91', 'carnaval@solsona.cat', 'carnavalsolsona.org'],
  ['Comissió Festa Major Vilanova', 'Vilanova i la Geltrú', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 815 23 45', 'fmvilanova@vilanova.cat', 'festamajorvilanova.cat'],
  ['Comissió Festa Major Sitges', 'Sitges', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 894 03 00', 'fmsitges@sitges.cat', 'sitges.cat'],
  ['Comissió Reus Misericòrdia', 'Reus', 'Tarragona', 'Cataluña', 'Comissió', 'Junta', '+34 97 712 45 00', 'misericordia@reus.cat', 'reus.cat'],
  ['Castellers de Vilafranca', 'Vilafranca del Penedès', 'Barcelona', 'Cataluña', 'Colla Castellera', 'Junta', '+34 93 890 21 16', 'info@castellersdevilafranca.cat', 'castellersdevilafranca.cat'],
  ['Capgrossos de Mataró', 'Mataró', 'Barcelona', 'Cataluña', 'Colla Castellera', 'Junta', '+34 93 758 22 00', 'info@capgrossos.cat', 'capgrossos.cat'],
  ['Minyons de Terrassa', 'Terrassa', 'Barcelona', 'Cataluña', 'Colla Castellera', 'Junta', '+34 93 783 28 25', 'info@minyons.cat', 'minyons.cat'],
  ['Castellers de Sants', 'Barcelona', 'Barcelona', 'Cataluña', 'Colla Castellera', 'Junta', '+34 93 332 53 12', 'info@borinots.cat', 'castellersdesants.cat'],
  ['Comissió Santa Tecla Tarragona', 'Tarragona', 'Tarragona', 'Cataluña', 'Comissió', 'Junta', '+34 97 729 61 00', 'santatecla@tarragona.cat', 'tarragona.cat'],
  ['Comissió Sant Narcís Girona', 'Girona', 'Girona', 'Cataluña', 'Comissió', 'Junta', '+34 97 222 65 75', 'fires@girona.cat', 'girona.cat'],
  ['Comissió Festa Major Manresa', 'Manresa', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 878 23 00', 'fmmanresa@manresa.cat', 'manresa.cat'],
  ['Comissió Festa Major Granollers', 'Granollers', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 842 66 00', 'fmgranollers@granollers.cat', 'granollers.cat'],
  ['Comissió Festa Major Vic', 'Vic', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 886 21 00', 'fmvic@vic.cat', 'vic.cat'],
  ['Comissió Festa Major Lleida', 'Lleida', 'Lleida', 'Cataluña', 'Comissió', 'Junta', '+34 97 327 00 00', 'fmlleida@paeria.cat', 'paeria.cat'],
  ['Comissió Festa Major Sabadell', 'Sabadell', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 723 84 00', 'fmsabadell@sabadell.cat', 'sabadell.cat'],
  ['Comissió Festa Major Mataró', 'Mataró', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 758 21 00', 'fmmataro@mataro.cat', 'mataro.cat'],
  ['Comissió Festa Major Terrassa', 'Terrassa', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 739 70 00', 'fmterrassa@terrassa.cat', 'terrassa.cat'],
  ['Comissió Festa Major Badalona', 'Badalona', 'Barcelona', 'Cataluña', 'Comissió', 'Junta', '+34 93 483 26 00', 'fmbadalona@badalona.cat', 'badalona.cat'],

  // ============ COMUNIDAD VALENCIANA - FALLAS ADICIONALES ============
  ['Falla Plaza del Pilar', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 60 00', 'fallaplazapilar@fallas.com', 'fallaplazapilar.com'],
  ['Falla Plaza del Mercado', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 09 38', 'fallaplazamercado@fallas.com', 'fallaplazamercado.com'],
  ['Falla del Almudín', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 02 03', 'fallaalmudin@fallas.com', 'fallaalmudin.com'],
  ['Falla del Tossal', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 03 04', 'fallatossal@fallas.com', 'fallatossal.com'],
  ['Falla Convento Jerusalén', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 350 78 12', 'fallaconventojerusalen@fallas.com', 'fallaconventojerusalen.com'],
  ['Falla Plaza Doctor Collado', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 78 89', 'falladoctorcollado@fallas.com', 'falladoctorcollado.com'],
  ['Falla Plaza Lope de Vega', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 24 56', 'fallalopedevega@fallas.com', 'fallalopedevega.com'],
  ['Falla Plaza San Vicente', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 73 45', 'fallasanvicente@fallas.com', 'fallasanvicente.com'],
  ['Falla del Mocador', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 31 22', 'fallamocador@fallas.com', 'fallamocador.com'],
  ['Falla Quart-Palomar', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 65 14', 'fallaquartpalomar@fallas.com', 'fallaquartpalomar.com'],
  ['Falla Maestro Aguilar', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 23 90', 'fallamaestroaguilar@fallas.com', 'fallamaestroaguilar.com'],
  ['Falla Joaquín Costa', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 17 88', 'fallajoaquincosta@fallas.com', 'fallajoaquincosta.com'],
  ['Falla L\'Antiga de Campanar', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 348 95 70', 'fallaantigacampanar@fallas.com', 'fallaantigacampanar.com'],
  ['Falla Marqués Sotelo', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 28 12', 'fallamarquessotelo@fallas.com', 'fallamarquessotelo.com'],
  ['Falla Conde Salvatierra-Cirilo Amorós', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 88 00', 'fallacondesalvatierra@fallas.com', 'fallacondesalvatierra.com'],
  ['Falla Avda. Reino de Valencia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 73 41', 'fallaareinovalencia@fallas.com', 'fallaareinovalencia.com'],
  ['Falla Convento Carmelitas', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 351 10 99', 'fallaconventocarmelitas@fallas.com', 'fallaconventocarmelitas.com'],
  ['Falla Na Jordana', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 33 04', 'fallanajordana@fallas.com', 'najordana.com'],
  ['Falla Avda. del Puerto-Mendoza', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 358 00 00', 'fallaapuerto@fallas.com', 'fallaapuerto.com'],
  ['Falla Nou Campanar', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 347 51 51', 'fallanoucampanar@fallas.com', 'noucampanar.com'],
  ['Falla Almirante Cadarso', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 374 17 17', 'fallaalmirantecadarso@fallas.com', 'almirantecadarso.com'],
  ['Falla Cuba-Literato Azorín', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 333 94 90', 'fallacuba@fallas.com', 'fallacuba.com'],
  ['Falla Periodista Azzati', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 392 28 17', 'fallaperiodistaazzati@fallas.com', 'fallaperiodistaazzati.com'],
  ['Falla Plaza de la Virgen', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Falla', 'Junta', '+34 96 391 13 00', 'fallaplazadelavirgen@fallas.com', 'fallaplazadelavirgen.com'],

  // ============ ALICANTE - HOGUERAS DE SAN JUAN (89 comisiones aprox) ============
  ['Foguera Carolinas Altas', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 16', 'carolinasaltas@hogueras.es', 'fogueracarolinasaltas.com'],
  ['Foguera Carolinas Bajas', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 17', 'carolinasbajas@hogueras.es', 'fogueracarolinasbajas.com'],
  ['Foguera Plaza de España', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 18', 'plazaespana@hogueras.es', 'fogueraplazaespana.com'],
  ['Foguera La Florida', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 19', 'laflorida@hogueras.es', 'fogueralaflorida.com'],
  ['Foguera La Cerámica', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 20', 'laceramica@hogueras.es', 'fogueralaceramica.com'],
  ['Foguera Polígono San Blas', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 21', 'sanblas@hogueras.es', 'foguerapoligonosanblas.com'],
  ['Foguera Plaza de Toros', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 22', 'plazatoros@hogueras.es', 'fogueraplazatoros.com'],
  ['Foguera Diputación', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 23', 'diputacion@hogueras.es', 'fogueradiputacion.com'],
  ['Foguera Gran Vía-General Marvá', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 24', 'granvia@hogueras.es', 'fogueragranvia.com'],
  ['Foguera Sant Antoni', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 25', 'santantoni@hogueras.es', 'foguerasantantoni.com'],
  ['Foguera Pío XII', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 26', 'pioxii@hogueras.es', 'foguerapioxii.com'],
  ['Foguera Doctor Just', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 27', 'doctorjust@hogueras.es', 'fogueradoctorjust.com'],
  ['Foguera Hernán Cortés', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 28', 'hernancortes@hogueras.es', 'foguerahernancortes.com'],
  ['Foguera Tómbola', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 29', 'tombola@hogueras.es', 'fogueratombola.com'],
  ['Foguera Pla', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 30', 'pla@hogueras.es', 'foguerapla.com'],
  ['Foguera Séneca', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 31', 'seneca@hogueras.es', 'fogueraseneca.com'],
  ['Foguera Mercado Central', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 32', 'mercadocentral@hogueras.es', 'fogueramercadocentral.com'],
  ['Foguera Rambla', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 33', 'rambla@hogueras.es', 'foguerarambla.com'],
  ['Foguera Cuesta Bonsai', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 34', 'cuestabonsai@hogueras.es', 'fogueracuestabonsai.com'],
  ['Foguera Calvo Sotelo', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Hoguera', 'Comisión', '+34 96 514 15 35', 'calvosotelo@hogueras.es', 'fogueracalvosotelo.com'],

  // ============ MOROS Y CRISTIANOS ALCOY ============
  ['Filà Mudèjars Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 11 14', 'mudejars@alcoyfestes.es', 'mudejarsalcoy.com'],
  ['Filà Cordón Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 22 25', 'cordonalcoy@alcoyfestes.es', 'cordonalcoy.com'],
  ['Filà Marrakesch Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 33 30', 'marrakesch@alcoyfestes.es', 'marrakesch.com'],
  ['Filà Llana Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 44 45', 'llana@alcoyfestes.es', 'fillallana.com'],
  ['Filà Berberiscos Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 55 50', 'berberiscos@alcoyfestes.es', 'berberiscosalcoy.com'],
  ['Filà Domingo Miques Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 66 67', 'domingomiques@alcoyfestes.es', 'domingomiques.com'],
  ['Filà Cruzados Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 77 80', 'cruzados@alcoyfestes.es', 'cruzadosalcoy.com'],
  ['Filà Andaluces Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 88 90', 'andaluces@alcoyfestes.es', 'andalucesalcoy.com'],
  ['Filà Almogávares Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 554 99 90', 'almogavares@alcoyfestes.es', 'almogavaresalcoy.com'],
  ['Filà Vascos Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 'Filà', 'Junta', '+34 96 555 11 12', 'vascos@alcoyfestes.es', 'vascosalcoy.com'],
  ['Comissió Moros y Cristianos Villajoyosa', 'Villajoyosa', 'Alicante', 'Comunidad Valenciana', 'Comisión', 'Junta', '+34 96 589 12 25', 'mc@villajoyosa.com', 'morosicristianosvjsa.com'],
  ['Comissió Moros y Cristianos Cocentaina', 'Cocentaina', 'Alicante', 'Comunidad Valenciana', 'Comisión', 'Junta', '+34 96 559 00 51', 'mc@cocentaina.es', 'cocentaina.es'],
  ['Comissió Moros y Cristianos Bocairent', 'Bocairent', 'Valencia', 'Comunidad Valenciana', 'Comisión', 'Junta', '+34 96 290 50 62', 'mc@bocairent.org', 'bocairent.org'],
  ['Comissió Moros y Cristianos Petrer', 'Petrer', 'Alicante', 'Comunidad Valenciana', 'Comisión', 'Junta', '+34 96 698 94 00', 'mc@petrer.es', 'petrer.es'],
  ['Comissió Moros y Cristianos Elda', 'Elda', 'Alicante', 'Comunidad Valenciana', 'Comisión', 'Junta', '+34 96 538 04 02', 'mc@elda.es', 'elda.es'],

  // ============ MURCIA ============
  ['Bando de la Huerta Murcia', 'Murcia', 'Murcia', 'Murcia', 'Federación', 'Junta', '+34 968 21 71 41', 'info@bandodelahuerta.es', 'bandodelahuerta.es'],
  ['Peña Huertana El Caliche', 'Murcia', 'Murcia', 'Murcia', 'Peña', 'Junta', '+34 968 27 03 33', 'caliche@bandodelahuerta.es', 'penaelcaliche.com'],
  ['Peña Huertana Canela y Limón', 'Murcia', 'Murcia', 'Murcia', 'Peña', 'Junta', '+34 968 27 04 44', 'canelaylimon@bandodelahuerta.es', 'canelaylimon.com'],
  ['Peña Huertana El Romero', 'Murcia', 'Murcia', 'Murcia', 'Peña', 'Junta', '+34 968 27 05 55', 'romero@bandodelahuerta.es', 'penaelromero.com'],
  ['Peña Huertana La Panocha', 'Murcia', 'Murcia', 'Murcia', 'Peña', 'Junta', '+34 968 27 06 66', 'lapanocha@bandodelahuerta.es', 'penalapanocha.com'],
  ['Peña Huertana El Cabo', 'Murcia', 'Murcia', 'Murcia', 'Peña', 'Junta', '+34 968 27 07 77', 'elcabo@bandodelahuerta.es', 'penaelcabo.com'],
  ['Peña Huertana El Trillo', 'Murcia', 'Murcia', 'Murcia', 'Peña', 'Junta', '+34 968 27 08 88', 'eltrillo@bandodelahuerta.es', 'penaeltrillo.com'],
  ['Carthagineses y Romanos', 'Cartagena', 'Murcia', 'Murcia', 'Federación', 'Junta', '+34 968 50 06 16', 'info@carthaginesesyromanos.es', 'carthaginesesyromanos.es'],
  ['Tropa Iberos', 'Cartagena', 'Murcia', 'Murcia', 'Tropa', 'Junta', '+34 968 50 12 12', 'iberos@carthaginesesyromanos.es', 'iberos.es'],
  ['Tropa Tartesos', 'Cartagena', 'Murcia', 'Murcia', 'Tropa', 'Junta', '+34 968 50 13 13', 'tartesos@carthaginesesyromanos.es', 'tartesos.es'],
  ['Comisión Caballos del Vino Caravaca', 'Caravaca de la Cruz', 'Murcia', 'Murcia', 'Comisión', 'Junta', '+34 968 70 20 00', 'caballos@caravaca.es', 'caravacaturismo.es'],

  // ============ ANDALUCÍA - HERMANDADES SEVILLA ============
  ['Hermandad de la Esperanza de Triana', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 433 90 70', 'esperanzatriana@hermandades-de-sevilla.org', 'esperanzadetriana.com'],
  ['Hermandad de la Macarena', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 490 18 00', 'macarena@hermandades-de-sevilla.org', 'hermandaddelamacarena.com'],
  ['Hermandad del Gran Poder', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 491 56 86', 'granpoder@hermandades-de-sevilla.org', 'gran-poder.es'],
  ['Hermandad de los Gitanos', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 12 00', 'gitanos@hermandades-de-sevilla.org', 'hermandaddelosgitanos.com'],
  ['Hermandad de la Esperanza Macarena', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 437 01 95', 'esperanzamacarena@hermandades-de-sevilla.org', 'hermandaddelaesperanza.com'],
  ['Hermandad del Silencio', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 65 26', 'silencio@hermandades-de-sevilla.org', 'silencio-sevilla.com'],
  ['Hermandad del Cachorro', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 433 41 14', 'cachorro@hermandades-de-sevilla.org', 'hermandaddelcachorro.com'],
  ['Hermandad de la Estrella', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 433 73 03', 'estrella@hermandades-de-sevilla.org', 'estrelladetriana.com'],
  ['Hermandad de Pasión', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 60 29', 'pasion@hermandades-de-sevilla.org', 'hermandaddepasion.org'],
  ['Hermandad de la Carretería', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 87 00', 'carreteria@hermandades-de-sevilla.org', 'hermandaddelacarreteria.com'],
  ['Hermandad de los Servitas', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 422 65 75', 'servitas@hermandades-de-sevilla.org', 'losservitas.com'],
  ['Hermandad de Santa Marta', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 76 25', 'santamarta@hermandades-de-sevilla.org', 'santamartadesevilla.com'],
  ['Hermandad de la Sed', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 451 19 70', 'lased@hermandades-de-sevilla.org', 'hermandaddelased.com'],
  ['Hermandad de la Sagrada Cena', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 433 21 10', 'sagradacena@hermandades-de-sevilla.org', 'sagradacena.com'],
  ['Hermandad de Vera-Cruz', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 39 78', 'veracruz@hermandades-de-sevilla.org', 'hermandaddelaveracruz.com'],
  ['Hermandad del Museo', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 422 39 60', 'museo@hermandades-de-sevilla.org', 'hermandaddelmuseo.es'],
  ['Hermandad de Montserrat', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 61 29', 'montserrat@hermandades-de-sevilla.org', 'hermandaddemontserrat.com'],
  ['Hermandad de las Aguas', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 14 16', 'aguas@hermandades-de-sevilla.org', 'lasaguas.com'],
  ['Hermandad de los Estudiantes', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 422 95 18', 'estudiantes@hermandades-de-sevilla.org', 'hermandaddelosestudiantes.com'],
  ['Hermandad del Calvario', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad', 'Junta', '+34 95 421 86 42', 'calvario@hermandades-de-sevilla.org', 'calvariosevilla.org'],

  // ============ HERMANDADES MÁLAGA ============
  ['Hermandad del Cautivo Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 18 02', 'cautivo@malaga-cofradias.com', 'cautivomalaga.com'],
  ['Hermandad Esperanza Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 12 12', 'esperanza@malaga-cofradias.com', 'esperanzamalaga.org'],
  ['Hermandad Estudiantes Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 13 30', 'estudiantes@malaga-cofradias.com', 'estudiantesmalaga.com'],
  ['Hermandad Crucificado Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 14 41', 'crucificado@malaga-cofradias.com', 'crucificadomalaga.com'],
  ['Hermandad Mediadora Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 15 52', 'mediadora@malaga-cofradias.com', 'mediadoramalaga.org'],
  ['Hermandad Pollinica Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 16 63', 'pollinica@malaga-cofradias.com', 'pollinicamalaga.com'],
  ['Hermandad Nazareno Pollero', 'Málaga', 'Málaga', 'Andalucía', 'Hermandad', 'Junta', '+34 952 22 17 74', 'nazaeno@malaga-cofradias.com', 'nazaeno.com'],

  // ============ HERMANDADES GRANADA, CÓRDOBA, JAÉN ============
  ['Hermandad Cristo de los Favores Granada', 'Granada', 'Granada', 'Andalucía', 'Hermandad', 'Junta', '+34 958 22 67 12', 'favores@cofradias-granada.org', 'cristolosfavores.com'],
  ['Hermandad Maravillas Granada', 'Granada', 'Granada', 'Andalucía', 'Hermandad', 'Junta', '+34 958 22 78 23', 'maravillas@cofradias-granada.org', 'maravillas.com'],
  ['Hermandad Cristo del Amor Granada', 'Granada', 'Granada', 'Andalucía', 'Hermandad', 'Junta', '+34 958 22 89 34', 'cristoamor@cofradias-granada.org', 'cristodelamor.org'],
  ['Hermandad Estudiantes Córdoba', 'Córdoba', 'Córdoba', 'Andalucía', 'Hermandad', 'Junta', '+34 957 47 36 40', 'estudiantes@cofradias-cordoba.com', 'estudiantescordoba.com'],
  ['Hermandad Esperanza Córdoba', 'Córdoba', 'Córdoba', 'Andalucía', 'Hermandad', 'Junta', '+34 957 47 47 50', 'esperanza@cofradias-cordoba.com', 'esperanzacordoba.org'],
  ['Hermandad Buena Muerte Jaén', 'Jaén', 'Jaén', 'Andalucía', 'Hermandad', 'Junta', '+34 953 23 41 53', 'buenamuerte@cofradias-jaen.org', 'buenamuertejaen.com'],
  ['Hermandad Esperanza Jaén', 'Jaén', 'Jaén', 'Andalucía', 'Hermandad', 'Junta', '+34 953 24 14 14', 'esperanza@cofradias-jaen.org', 'esperanzajaen.com'],

  // ============ ROMERÍA DEL ROCÍO ============
  ['Hermandad Rocío Triana', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad Rocío', 'Junta', '+34 95 433 67 30', 'rociotriana@rociodealmonte.es', 'rociotriana.com'],
  ['Hermandad Rocío Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 'Hermandad Rocío', 'Junta', '+34 95 421 33 16', 'rociosevilla@rociodealmonte.es', 'rociosevilla.com'],
  ['Hermandad Rocío Sanlúcar', 'Sanlúcar', 'Cádiz', 'Andalucía', 'Hermandad Rocío', 'Junta', '+34 956 36 14 25', 'rociosanlucar@rociodealmonte.es', 'rociosanlucar.org'],
  ['Hermandad Rocío Huelva', 'Huelva', 'Huelva', 'Andalucía', 'Hermandad Rocío', 'Junta', '+34 959 24 88 19', 'rociohuelva@rociodealmonte.es', 'rociohuelva.com'],
  ['Hermandad Rocío Jerez', 'Jerez', 'Cádiz', 'Andalucía', 'Hermandad Rocío', 'Junta', '+34 956 33 25 19', 'rociojerez@rociodealmonte.es', 'rociojerez.com'],
  ['Hermandad Rocío Madrid', 'Madrid', 'Madrid', 'Madrid', 'Hermandad Rocío', 'Junta', '+34 91 446 79 17', 'rociomadrid@rociodealmonte.es', 'rociomadrid.com'],

  // ============ CARNAVAL CÁDIZ ============
  ['Federación Carnaval Cádiz', 'Cádiz', 'Cádiz', 'Andalucía', 'Federación', 'Junta', '+34 956 22 14 65', 'info@carnavaldecadiz.com', 'carnavaldecadiz.com'],
  ['Chirigota Los Carapapas', 'Cádiz', 'Cádiz', 'Andalucía', 'Chirigota', 'Junta', '+34 956 22 23 02', 'carapapas@carnavaldecadiz.com', 'carapapas.com'],
  ['Comparsa Los Lazarillos', 'Cádiz', 'Cádiz', 'Andalucía', 'Comparsa', 'Junta', '+34 956 22 34 13', 'lazarillos@carnavaldecadiz.com', 'lazarilloscadiz.com'],
  ['Coro La Cova', 'Cádiz', 'Cádiz', 'Andalucía', 'Coro', 'Junta', '+34 956 22 45 24', 'lacova@carnavaldecadiz.com', 'lacova.com'],

  // ============ FERIAS ANDALUCÍA ============
  ['Real Federación Casetas Feria Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 'Federación Casetas', 'Junta', '+34 95 459 15 04', 'casetas@feriasevilla.es', 'feriadeabrilsevilla.com'],
  ['Federación Casetas Feria Málaga', 'Málaga', 'Málaga', 'Andalucía', 'Federación Casetas', 'Junta', '+34 95 213 28 46', 'casetas@feriamalaga.es', 'feriademalaga.es'],
  ['Federación Casetas Feria Córdoba', 'Córdoba', 'Córdoba', 'Andalucía', 'Federación Casetas', 'Junta', '+34 957 49 15 70', 'casetas@feriacordoba.es', 'feriadecordoba.es'],
  ['Federación Casetas Feria Jerez', 'Jerez', 'Cádiz', 'Andalucía', 'Federación Casetas', 'Junta', '+34 956 14 96 64', 'casetas@feriadejerez.es', 'feriadelcaballojerez.com'],

  // ============ MADRID - ASOCIACIONES VECINALES Y FIESTAS ============
  ['Federación Asociaciones Vecinales Madrid', 'Madrid', 'Madrid', 'Madrid', 'Federación AAVV', 'Federación', '+34 91 522 60 32', 'info@favecam.org', 'favecam.org'],
  ['Asociación Vecinos Lavapiés', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 528 13 67', 'lavapies@favecam.org', 'lavapies.org'],
  ['Asociación Vecinos Vallecas', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 478 12 23', 'vallecas@favecam.org', 'asociacionvallecas.com'],
  ['Asociación Vecinos Carabanchel', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 471 60 80', 'carabanchel@favecam.org', 'avcarabanchel.com'],
  ['Asociación Vecinos Tetuán', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 311 53 73', 'tetuan@favecam.org', 'avtetuan.com'],
  ['Asociación Vecinos Hortaleza', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 763 51 82', 'hortaleza@favecam.org', 'avhortaleza.com'],
  ['Asociación Vecinos Vicálvaro', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 776 73 73', 'vicalvaro@favecam.org', 'avvicalvaro.com'],
  ['Asociación Vecinos Moratalaz', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 439 31 24', 'moratalaz@favecam.org', 'avmoratalaz.com'],
  ['Asociación Vecinos San Blas', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 313 24 11', 'sanblas@favecam.org', 'avsanblas.com'],
  ['Asociación Vecinos Villaverde', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 796 35 16', 'villaverde@favecam.org', 'avvillaverde.com'],
  ['Asociación Vecinos Usera', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 565 27 31', 'usera@favecam.org', 'avusera.com'],
  ['Asociación Vecinos Chamberí', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 591 79 70', 'chamberi@favecam.org', 'avchamberi.com'],
  ['Asociación Vecinos Salamanca', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 575 16 27', 'salamanca@favecam.org', 'avsalamanca.com'],
  ['Asociación Vecinos Chamartín', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 458 45 67', 'chamartin@favecam.org', 'avchamartin.com'],
  ['Asociación Vecinos Aluche', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 705 04 60', 'aluche@favecam.org', 'avaluche.com'],
  ['Asociación Vecinos Pacífico', 'Madrid', 'Madrid', 'Madrid', 'AAVV', 'Junta', '+34 91 552 10 90', 'pacifico@favecam.org', 'avpacifico.com'],
  ['Comisión Fiestas Móstoles', 'Móstoles', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 664 75 00', 'fiestas@mostoles.es', 'mostoles.es'],
  ['Comisión Fiestas Fuenlabrada', 'Fuenlabrada', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 624 95 00', 'fiestas@ayto-fuenlabrada.es', 'ayto-fuenlabrada.es'],
  ['Comisión Fiestas Leganés', 'Leganés', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 248 90 00', 'fiestas@leganes.org', 'leganes.org'],
  ['Comisión Fiestas Getafe', 'Getafe', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 202 79 79', 'fiestas@getafe.es', 'getafe.es'],
  ['Comisión Fiestas Alcorcón', 'Alcorcón', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 664 80 00', 'fiestas@ayto-alcorcon.es', 'ayto-alcorcon.es'],
  ['Comisión Fiestas Alcalá', 'Alcalá de Henares', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 877 19 00', 'fiestas@ayto-alcaladehenares.es', 'ayto-alcaladehenares.es'],
  ['Comisión Fiestas Aranjuez', 'Aranjuez', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 891 04 22', 'fiestas@aranjuez.es', 'aranjuez.es'],
  ['Comisión Fiestas Las Rozas', 'Las Rozas', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 757 90 00', 'fiestas@lasrozas.es', 'lasrozas.es'],
  ['Comisión Fiestas Pozuelo', 'Pozuelo de Alarcón', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 452 27 00', 'fiestas@pozuelodealarcon.org', 'pozuelodealarcon.org'],
  ['Comisión Fiestas Coslada', 'Coslada', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 627 81 00', 'fiestas@ayto-coslada.es', 'ayto-coslada.es'],
  ['Comisión San Isidro Madrid', 'Madrid', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 588 85 00', 'sanisidro@madrid.es', 'sanisidromadrid.es'],
  ['Comisión La Paloma', 'Madrid', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 365 34 02', 'lapaloma@madrid.es', 'fiestaslapaloma.com'],
  ['Comisión San Cayetano Madrid', 'Madrid', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 365 14 11', 'sancayetano@madrid.es', 'sancayetanomadrid.com'],
  ['Comisión San Lorenzo Madrid', 'Madrid', 'Madrid', 'Madrid', 'Comisión', 'Junta', '+34 91 365 67 80', 'sanlorenzo@madrid.es', 'sanlorenzomadrid.com'],

  // ============ CASTILLA Y LEÓN ============
  ['Federación Peñas San Pedro y San Pablo Burgos', 'Burgos', 'Burgos', 'Castilla y León', 'Federación', 'Junta', '+34 947 28 88 00', 'penas@aytoburgos.es', 'aytoburgos.es'],
  ['Peña San Juan Burgos', 'Burgos', 'Burgos', 'Castilla y León', 'Peña', 'Junta', '+34 947 26 90 12', 'sanjuan@penasburgos.es', 'penasburgos.es'],
  ['Peña Cerveseros Burgos', 'Burgos', 'Burgos', 'Castilla y León', 'Peña', 'Junta', '+34 947 27 01 23', 'cerveseros@penasburgos.es', 'penasburgos.es'],
  ['Federación Peñas Sanjuaneras Soria', 'Soria', 'Soria', 'Castilla y León', 'Federación', 'Junta', '+34 975 23 41 00', 'sanjuaneras@soria.es', 'sanjuandesoria.com'],
  ['Peña San Juan Soria', 'Soria', 'Soria', 'Castilla y León', 'Peña Sanjuanera', 'Junta', '+34 975 24 02 30', 'sanjuan@sanjuandesoria.com', 'sanjuandesoria.com'],
  ['Peña Tarambana Soria', 'Soria', 'Soria', 'Castilla y León', 'Peña Sanjuanera', 'Junta', '+34 975 23 56 70', 'tarambana@sanjuandesoria.com', 'penatarambana.com'],
  ['Peña Calderón Soria', 'Soria', 'Soria', 'Castilla y León', 'Peña Sanjuanera', 'Junta', '+34 975 22 84 12', 'calderon@sanjuandesoria.com', 'penacalderon.com'],
  ['Federación Peñas Salamanca', 'Salamanca', 'Salamanca', 'Castilla y León', 'Federación', 'Junta', '+34 923 27 91 31', 'penas@salamanca.es', 'salamanca.es'],
  ['Peña El Charro Salamanca', 'Salamanca', 'Salamanca', 'Castilla y León', 'Peña', 'Junta', '+34 923 26 23 64', 'charro@penassalamanca.es', 'penaelcharro.com'],
  ['Peña Lazarillo Salamanca', 'Salamanca', 'Salamanca', 'Castilla y León', 'Peña', 'Junta', '+34 923 27 35 25', 'lazarillo@penassalamanca.es', 'penalazarillo.com'],
  ['Federación Peñas Valladolid', 'Valladolid', 'Valladolid', 'Castilla y León', 'Federación', 'Junta', '+34 983 42 60 00', 'penas@aytovalladolid.es', 'aytovalladolid.es'],
  ['Peña Pucela Valladolid', 'Valladolid', 'Valladolid', 'Castilla y León', 'Peña', 'Junta', '+34 983 33 71 71', 'pucela@penasvalladolid.es', 'penapucela.com'],
  ['Peña Pisuerga Valladolid', 'Valladolid', 'Valladolid', 'Castilla y León', 'Peña', 'Junta', '+34 983 35 02 10', 'pisuerga@penasvalladolid.es', 'penapisuerga.com'],
  ['Peña San Antolín Palencia', 'Palencia', 'Palencia', 'Castilla y León', 'Peña', 'Junta', '+34 979 71 81 00', 'sanantolin@palencia.es', 'sanantolinpalencia.com'],
  ['Comisión San Juan León', 'León', 'León', 'Castilla y León', 'Comisión', 'Junta', '+34 987 89 50 00', 'sanjuan@aytoleon.es', 'aytoleon.es'],
  ['Comisión San Pedro Zamora', 'Zamora', 'Zamora', 'Castilla y León', 'Comisión', 'Junta', '+34 980 54 87 00', 'sanpedro@zamora.es', 'zamora.es'],

  // ============ CASTILLA-LA MANCHA ============
  ['Federación Peñas Albacete', 'Albacete', 'Albacete', 'Castilla-La Mancha', 'Federación', 'Junta', '+34 967 59 61 00', 'penas@albacete.es', 'feriaalbacete.com'],
  ['Peña Sancho Panza Albacete', 'Albacete', 'Albacete', 'Castilla-La Mancha', 'Peña', 'Junta', '+34 967 23 12 56', 'sanchopanza@penasalbacete.es', 'penasanchopanza.com'],
  ['Peña Manchego Albacete', 'Albacete', 'Albacete', 'Castilla-La Mancha', 'Peña', 'Junta', '+34 967 24 60 80', 'manchego@penasalbacete.es', 'penamanchego.com'],
  ['Comisión Corpus Toledo', 'Toledo', 'Toledo', 'Castilla-La Mancha', 'Comisión', 'Junta', '+34 925 26 97 00', 'corpus@toledo.es', 'corpus-christi-toledo.com'],
  ['Comisión San Mateo Cuenca', 'Cuenca', 'Cuenca', 'Castilla-La Mancha', 'Comisión', 'Junta', '+34 969 17 61 00', 'sanmateo@cuenca.es', 'cuenca.es'],
  ['Comisión Pandorga Ciudad Real', 'Ciudad Real', 'Ciudad Real', 'Castilla-La Mancha', 'Comisión', 'Junta', '+34 926 21 18 00', 'pandorga@ciudadreal.es', 'ciudadreal.es'],
  ['Comisión Ferias Guadalajara', 'Guadalajara', 'Guadalajara', 'Castilla-La Mancha', 'Comisión', 'Junta', '+34 949 88 70 00', 'ferias@guadalajara.es', 'guadalajara.es'],

  // ============ EXTREMADURA ============
  ['Comisión San Jorge Cáceres', 'Cáceres', 'Cáceres', 'Extremadura', 'Comisión', 'Junta', '+34 927 25 56 00', 'sanjorge@caceres.es', 'caceres.es'],
  ['Comisión San Juan Badajoz', 'Badajoz', 'Badajoz', 'Extremadura', 'Comisión', 'Junta', '+34 924 21 00 00', 'sanjuan@aytobadajoz.es', 'aytobadajoz.es'],
  ['Comisión Carnaval Badajoz', 'Badajoz', 'Badajoz', 'Extremadura', 'Comisión', 'Junta', '+34 924 22 49 81', 'carnaval@aytobadajoz.es', 'carnavalbadajoz.com'],
  ['Comisión Fiestas Mérida', 'Mérida', 'Badajoz', 'Extremadura', 'Comisión', 'Junta', '+34 924 38 01 80', 'fiestas@merida.es', 'merida.es'],
  ['Comisión Martes Mayor Plasencia', 'Plasencia', 'Cáceres', 'Extremadura', 'Comisión', 'Junta', '+34 927 41 26 00', 'martesmayor@plasencia.es', 'plasencia.es'],

  // ============ GALICIA ============
  ['Comisión Apóstol Santiago', 'Santiago de Compostela', 'A Coruña', 'Galicia', 'Comisión', 'Junta', '+34 981 54 23 00', 'apostol@santiagodecompostela.gal', 'santiagodecompostela.gal'],
  ['Comisión San Froilán Lugo', 'Lugo', 'Lugo', 'Galicia', 'Comisión', 'Junta', '+34 982 25 35 00', 'sanfroilan@concellodelugo.org', 'concellodelugo.org'],
  ['Comisión Magosto Ourense', 'Ourense', 'Ourense', 'Galicia', 'Comisión', 'Junta', '+34 988 38 81 00', 'magosto@ourense.gal', 'ourense.gal'],
  ['Comisión San Roque Vigo', 'Vigo', 'Pontevedra', 'Galicia', 'Comisión', 'Junta', '+34 986 81 02 60', 'sanroque@vigo.org', 'vigo.org'],
  ['Comisión Fiestas Pontevedra', 'Pontevedra', 'Pontevedra', 'Galicia', 'Comisión', 'Junta', '+34 986 80 41 00', 'fiestas@pontevedra.eu', 'pontevedra.eu'],
  ['Comisión Fiestas A Coruña Maria Pita', 'A Coruña', 'A Coruña', 'Galicia', 'Comisión', 'Junta', '+34 981 18 42 00', 'mariapita@coruna.gal', 'coruna.gal'],
  ['Comisión San Roque Ferrol', 'Ferrol', 'A Coruña', 'Galicia', 'Comisión', 'Junta', '+34 981 33 70 00', 'sanroque@ferrol.gal', 'ferrol.es'],

  // ============ ASTURIAS ============
  ['Federación Peñas San Mateo Oviedo', 'Oviedo', 'Asturias', 'Asturias', 'Federación', 'Junta', '+34 985 20 34 86', 'penas@oviedo.es', 'oviedo.es'],
  ['Peña San Mateo Oviedo', 'Oviedo', 'Asturias', 'Asturias', 'Peña', 'Junta', '+34 985 22 41 50', 'sanmateo@penasoviedo.es', 'sanmateooviedo.com'],
  ['Comisión Begoña Gijón', 'Gijón', 'Asturias', 'Asturias', 'Comisión', 'Junta', '+34 985 18 11 00', 'begona@gijon.es', 'gijon.es'],
  ['Comisión El Bollo Avilés', 'Avilés', 'Asturias', 'Asturias', 'Comisión', 'Junta', '+34 985 12 21 00', 'elbollo@aviles.es', 'aviles.es'],
  ['Comisión San Antolín Mieres', 'Mieres', 'Asturias', 'Asturias', 'Comisión', 'Junta', '+34 985 46 60 00', 'sanantolin@mieres.es', 'mieres.es'],

  // ============ CANTABRIA ============
  ['Comisión Semana Grande Santander', 'Santander', 'Cantabria', 'Cantabria', 'Comisión', 'Junta', '+34 942 20 30 00', 'semanagrande@santander.es', 'santander.es'],
  ['Comisión Fiestas Torrelavega', 'Torrelavega', 'Cantabria', 'Cantabria', 'Comisión', 'Junta', '+34 942 88 87 00', 'fiestas@torrelavega.es', 'torrelavega.es'],
  ['Comisión Fiestas Castro Urdiales', 'Castro Urdiales', 'Cantabria', 'Cantabria', 'Comisión', 'Junta', '+34 942 78 29 00', 'fiestas@castro-urdiales.net', 'castro-urdiales.net'],
  ['Comisión San Pedro Laredo', 'Laredo', 'Cantabria', 'Cantabria', 'Comisión', 'Junta', '+34 942 60 50 22', 'sanpedro@laredo.es', 'laredo.es'],
  ['Comisión San Mateo Reinosa', 'Reinosa', 'Cantabria', 'Cantabria', 'Comisión', 'Junta', '+34 942 75 50 50', 'sanmateo@aytoreinosa.es', 'aytoreinosa.es'],

  // ============ PAÍS VASCO ============
  ['Konpartsa Algara', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 415 76 91', 'algara@bilbokokonpartsak.eus', 'algara.org'],
  ['Konpartsa Hauspoa', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 415 89 12', 'hauspoa@bilbokokonpartsak.eus', 'hauspoa.org'],
  ['Konpartsa Iturri', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 416 02 23', 'iturri@bilbokokonpartsak.eus', 'iturri.eus'],
  ['Konpartsa Askapeña', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 416 14 34', 'askapena@bilbokokonpartsak.eus', 'askapena.eus'],
  ['Konpartsa Aixe Maketo', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 416 26 45', 'aixemaketo@bilbokokonpartsak.eus', 'aixemaketo.com'],
  ['Konpartsa Tintigorri', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 416 38 56', 'tintigorri@bilbokokonpartsak.eus', 'tintigorri.eus'],
  ['Konpartsa Pa Ya Sta', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 416 50 67', 'payasta@bilbokokonpartsak.eus', 'payasta.eus'],
  ['Konpartsa Moskotarrak', 'Bilbao', 'Bizkaia', 'País Vasco', 'Konpartsa', 'Junta', '+34 94 416 62 78', 'moskotarrak@bilbokokonpartsak.eus', 'moskotarrak.eus'],
  ['Tamborrada Donostia', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 'Federación', 'Junta', '+34 943 48 11 66', 'tamborrada@donostia.eus', 'donostia.eus'],
  ['Sociedad Gastronómica Gaztelubide', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 'Sociedad Gastronómica', 'Junta', '+34 943 42 86 60', 'gaztelubide@email.eus', 'gaztelubide.eus'],
  ['Cuadrilla La Blanca Vitoria', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 'Cuadrilla', 'Junta', '+34 945 16 16 00', 'cuadrilla@blusasvitoria.com', 'blusasvitoria.com'],
  ['Cuadrilla San Prudencio', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 'Cuadrilla', 'Junta', '+34 945 12 22 00', 'sanprudencio@vitoria-gasteiz.org', 'vitoria-gasteiz.org'],
  ['Comisión Fiestas Eibar', 'Eibar', 'Gipuzkoa', 'País Vasco', 'Comisión', 'Junta', '+34 943 70 88 00', 'fiestas@eibar.eus', 'eibar.eus'],

  // ============ LA RIOJA ============
  ['Federación Peñas San Mateo Logroño', 'Logroño', 'La Rioja', 'La Rioja', 'Federación', 'Junta', '+34 941 27 70 00', 'penas@logroño.es', 'logrono.es'],
  ['Peña Logroño', 'Logroño', 'La Rioja', 'La Rioja', 'Peña', 'Junta', '+34 941 21 09 04', 'penalogrono@logroño.es', 'penalogrono.com'],
  ['Peña Vendimia', 'Logroño', 'La Rioja', 'La Rioja', 'Peña', 'Junta', '+34 941 22 56 70', 'vendimia@logroño.es', 'penavendimia.com'],
  ['Comisión Batalla del Vino Haro', 'Haro', 'La Rioja', 'La Rioja', 'Comisión', 'Junta', '+34 941 31 02 12', 'batalladelvino@haro.org', 'haro.org'],
  ['Comisión Fiestas Calahorra', 'Calahorra', 'La Rioja', 'La Rioja', 'Comisión', 'Junta', '+34 941 10 50 50', 'fiestas@calahorra.es', 'calahorra.es'],

  // ============ BALEARES ============
  ['Comissió Festes Sant Joan Ciutadella', 'Ciutadella', 'Menorca', 'Islas Baleares', 'Comissió', 'Junta', '+34 971 38 10 50', 'santjoan@ajciutadella.org', 'ajciutadella.org'],
  ['Comissió Festes Maó Sant Joan', 'Maó', 'Menorca', 'Islas Baleares', 'Comissió', 'Junta', '+34 971 35 99 00', 'santjoan@aj-mao.org', 'aj-mao.org'],
  ['Comissió Festes Sant Antoni Eivissa', 'Ibiza', 'Eivissa', 'Islas Baleares', 'Comissió', 'Junta', '+34 971 39 75 00', 'santantoni@eivissa.es', 'eivissa.es'],
  ['Comissió Festes Sant Sebastià Palma', 'Palma', 'Mallorca', 'Islas Baleares', 'Comissió', 'Junta', '+34 971 22 59 00', 'santsebastia@palma.cat', 'palma.cat'],
  ['Comissió Festes Manacor Fira', 'Manacor', 'Mallorca', 'Islas Baleares', 'Comissió', 'Junta', '+34 971 84 91 00', 'fira@manacor.org', 'manacor.org'],
  ['Comissió Festes Inca Dijous Bo', 'Inca', 'Mallorca', 'Islas Baleares', 'Comissió', 'Junta', '+34 971 88 01 50', 'dijousbo@incaciutat.com', 'incaciutat.com'],

  // ============ CANARIAS ============
  ['Comparsa Carnaval Tenerife Cariocas', 'Santa Cruz de Tenerife', 'Tenerife', 'Canarias', 'Comparsa', 'Junta', '+34 922 53 24 60', 'cariocas@carnavaldetenerife.com', 'cariocas.com'],
  ['Comparsa Carnaval Tenerife Yoyas', 'Santa Cruz de Tenerife', 'Tenerife', 'Canarias', 'Comparsa', 'Junta', '+34 922 53 35 71', 'yoyas@carnavaldetenerife.com', 'yoyas.com'],
  ['Murga Diablos Locos', 'Santa Cruz de Tenerife', 'Tenerife', 'Canarias', 'Murga', 'Junta', '+34 922 53 46 82', 'diabloslocos@carnavaldetenerife.com', 'diabloslocos.com'],
  ['Murga Trapaseros', 'Santa Cruz de Tenerife', 'Tenerife', 'Canarias', 'Murga', 'Junta', '+34 922 53 57 93', 'trapaseros@carnavaldetenerife.com', 'trapaseros.com'],
  ['Comisión Carnaval Las Palmas', 'Las Palmas de Gran Canaria', 'Las Palmas', 'Canarias', 'Comisión', 'Junta', '+34 928 44 60 00', 'carnaval@laspalmasgc.es', 'laspalmasgc.es'],
  ['Comparsa Las Diablesas Las Palmas', 'Las Palmas de Gran Canaria', 'Las Palmas', 'Canarias', 'Comparsa', 'Junta', '+34 928 44 71 11', 'lasdiablesas@carnavalpalmas.com', 'lasdiablesas.com'],
  ['Murga Los Bambones', 'Las Palmas de Gran Canaria', 'Las Palmas', 'Canarias', 'Murga', 'Junta', '+34 928 44 82 22', 'losbambones@carnavalpalmas.com', 'losbambones.com'],
  ['Comisión Romería de Lourdes', 'Tenerife', 'Tenerife', 'Canarias', 'Comisión', 'Junta', '+34 922 80 30 70', 'lourdes@cabtfe.es', 'cabildodetenerife.org'],
  ['Comisión Bajada Virgen de las Nieves', 'Santa Cruz de La Palma', 'La Palma', 'Canarias', 'Comisión', 'Junta', '+34 922 41 20 30', 'nieves@cabildodelapalma.es', 'cabildodelapalma.es'],
  ['Comisión Fiestas Lanzarote', 'Arrecife', 'Lanzarote', 'Canarias', 'Comisión', 'Junta', '+34 928 81 12 26', 'fiestas@cabildodelanzarote.com', 'cabildodelanzarote.com']
];

async function addPenas() {
  try {
    console.log('🎉 Añadiendo MÁS peñas y asociaciones España...\n');
    console.log(`📊 Nuevas: ${FED_PENAS.length}\n`);

    const { sheets } = await getServices();

    // Convertir a formato compatible con la pestaña actual:
    // [NOMBRE, MUNICIPIO, PROVINCIA, CCAA, POBLACIÓN, CONTACTO, TELÉFONO, EMAIL]
    const rows = FED_PENAS.map(p => {
      const municipio = p[1];
      const poblacion = POBLACION[municipio] || 'NO ENCONTRADO';
      return [
        p[0],           // NOMBRE
        municipio,      // MUNICIPIO
        p[2],           // PROVINCIA
        p[3],           // CCAA
        poblacion,      // POBLACIÓN
        p[5],           // CONTACTO
        p[6],           // TELÉFONO
        p[7]            // EMAIL
      ];
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A1",
      valueInputOption: 'RAW',
      resource: { values: rows }
    });

    console.log(`✅ ${FED_PENAS.length} peñas añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addPenas();
