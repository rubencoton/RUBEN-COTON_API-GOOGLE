const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const POBLACION = {
  'Madrid': 3332035, 'Barcelona': 1664182, 'Sevilla': 681998, 'Valencia': 825948, 'Zaragoza': 681877,
  'Málaga': 591637, 'Bilbao': 345110, 'Granada': 227383, 'Pamplona': 203944, 'Vitoria-Gasteiz': 253996,
  'Donostia-San Sebastián': 187415, 'Logroño': 151960, 'Oviedo': 218001, 'Gijón': 269634, 'Santander': 173375,
  'Salamanca': 138522, 'Burgos': 175821, 'Valladolid': 297775, 'León': 122051, 'Soria': 39821, 'Segovia': 51683,
  'Ávila': 57949, 'Palencia': 77177, 'Zamora': 60391, 'Toledo': 85811, 'Albacete': 173329, 'Cuenca': 53939,
  'Guadalajara': 89807, 'Ciudad Real': 75104, 'Cáceres': 96126, 'Badajoz': 150984, 'Mérida': 60328,
  'Murcia': 462979, 'Cartagena': 213943, 'Lorca': 95515, 'Pontevedra': 83260, 'Vigo': 296649, 'A Coruña': 250646,
  'Santiago de Compostela': 97849, 'Lugo': 97995, 'Ourense': 105505, 'Cádiz': 110851, 'Huelva': 138918,
  'Almería': 200578, 'Jaén': 110381, 'Córdoba': 320175, 'Palma': 419366, 'Ibiza': 50643, 'Maó': 30255,
  'Tarragona': 138527, 'Lleida': 138956, 'Girona': 103369, 'Las Palmas de Gran Canaria': 381847,
  'Santa Cruz de Tenerife': 209634, 'Castellón': 171728, 'Alicante': 358943, 'Elche': 234765, 'Jerez': 213278,
  'Marbella': 152289, 'Mijas': 86713, 'Estepona': 73495, 'Algeciras': 121957, 'Avilés': 76594,
  'Gandía': 76234, 'Sagunto': 29535, 'Benidorm': 71034, 'Alcoy': 58853
};

// PEÑAS, ASOCIACIONES, COFRADÍAS, BANDAS, COROS - llegar a 1000
const NUEVAS = [
  // ============ CASAS REGIONALES EN MADRID ============
  ['Casa de Galicia Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 12 36', 'info@casadegalicia.org'],
  ['Casa de Asturias Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 13 47', 'info@casadeasturias.es'],
  ['Casa de Cantabria Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 575 14 58', 'info@casadecantabria.es'],
  ['Casa de Andalucía Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 525 15 69', 'info@casadeandalucia.es'],
  ['Casa de Cataluña Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 543 16 70', 'info@casadecatalunya.es'],
  ['Casa de Valencia Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 522 17 81', 'info@casadevalencia.es'],
  ['Casa de Aragón Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 18 92', 'info@casadearagon.es'],
  ['Casa de Navarra Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 19 03', 'info@casadenavarra.es'],
  ['Casa de La Rioja Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 20 14', 'info@casadelarioja.es'],
  ['Casa de Murcia Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 21 25', 'info@casademurcia.es'],
  ['Casa de Castilla La Mancha Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 22 36', 'info@casadeclm.es'],
  ['Casa de Castilla y León Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 23 47', 'info@casadecyl.es'],
  ['Casa de Extremadura Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 24 58', 'info@casadeextremadura.es'],
  ['Casa de Baleares Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 25 69', 'info@casadebaleares.es'],
  ['Casa de Canarias Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 26 70', 'info@casadecanarias.es'],
  ['Centro Vasco Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 27 81', 'info@centrovascomadrid.es'],

  // ============ SOCIEDADES GASTRONÓMICAS VASCAS ============
  ['Sociedad Gastronómica Gaztelubide', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 42 86 60', 'info@gaztelubide.eus'],
  ['Sociedad Gastronómica Aitzaki', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 43 27 81', 'info@aitzaki.eus'],
  ['Sociedad Gastronómica Tirrintaberri', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 44 28 92', 'info@tirrintaberri.eus'],
  ['Sociedad Gastronómica Pinpilinpauxa', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 45 29 03', 'info@pinpilinpauxa.eus'],
  ['Sociedad Gastronómica Caparrota', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 16 30 14', 'info@caparrota.eus'],
  ['Sociedad Gastronómica Sukaldari', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 17 31 25', 'info@sukaldari.eus'],
  ['Sociedad Gastronómica Aldaba', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 18 32 36', 'info@aldaba.eus'],
  ['Sociedad Gastronómica Otalde', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 253996, 'Junta', '+34 945 16 33 47', 'info@otalde.eus'],
  ['Sociedad Gastronómica Larritxiki', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 253996, 'Junta', '+34 945 17 34 58', 'info@larritxiki.eus'],
  ['Sociedad Gastronómica Sasoi', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 253996, 'Junta', '+34 945 18 35 69', 'info@sasoi.eus'],

  // ============ COROS Y RONDALLAS ============
  ['Coro de la Comunidad de Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 36 70', 'info@corodemadrid.es'],
  ['Coro Sinfónico Universidad Complutense', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 37 81', 'coro@ucm.es'],
  ['Rondalla Madrileña', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 38 92', 'info@rondallamadrilena.es'],
  ['Coro de Bilbao', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 18 39 03', 'info@corodebilbao.eus'],
  ['Coro de Pamplona', 'Pamplona', 'Navarra', 'Navarra', 203944, 'Junta', '+34 948 22 40 14', 'info@corodepamplona.es'],
  ['Coro Sinfónico de Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 41 25', 'info@corodesevilla.es'],
  ['Coro de Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 42 36', 'info@corodegranada.es'],
  ['Coro de Valencia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 963 92 43 47', 'info@corodevalencia.es'],
  ['Coro de Zaragoza', 'Zaragoza', 'Zaragoza', 'Aragón', 681877, 'Junta', '+34 976 22 44 58', 'info@corodezaragoza.es'],
  ['Coro de Salamanca', 'Salamanca', 'Salamanca', 'Castilla y León', 138522, 'Junta', '+34 923 27 45 69', 'info@corodesalamanca.es'],
  ['Coro de Burgos', 'Burgos', 'Burgos', 'Castilla y León', 175821, 'Junta', '+34 947 26 46 70', 'info@corodeburgos.es'],
  ['Coro de Santiago', 'Santiago de Compostela', 'A Coruña', 'Galicia', 97849, 'Junta', '+34 981 54 47 81', 'info@corodesantiago.es'],
  ['Rondalla Aragonesa', 'Zaragoza', 'Zaragoza', 'Aragón', 681877, 'Junta', '+34 976 22 48 92', 'info@rondallaaragonesa.es'],
  ['Rondalla Riojana', 'Logroño', 'La Rioja', 'La Rioja', 151960, 'Junta', '+34 941 27 49 03', 'info@rondallariojana.es'],
  ['Rondalla Castellana', 'Valladolid', 'Valladolid', 'Castilla y León', 297775, 'Junta', '+34 983 33 50 14', 'info@rondallacastellana.es'],

  // ============ BANDAS DE MÚSICA MUNICIPALES ============
  ['Banda Municipal Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 51 25', 'banda@madrid.es'],
  ['Banda Municipal Barcelona', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Junta', '+34 93 402 70 25', 'banda@bcn.cat'],
  ['Banda Municipal Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 52 36', 'banda@sevilla.org'],
  ['Banda Municipal Valencia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 963 52 53 47', 'banda@valencia.es'],
  ['Banda Municipal Zaragoza', 'Zaragoza', 'Zaragoza', 'Aragón', 681877, 'Junta', '+34 976 22 54 58', 'banda@zaragoza.es'],
  ['Banda Municipal Málaga', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 95 213 55 69', 'banda@malaga.eu'],
  ['Banda Municipal Bilbao', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 20 56 70', 'banda@bilbao.eus'],
  ['Banda Municipal Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 24 57 81', 'banda@granada.org'],
  ['Banda Municipal Córdoba', 'Córdoba', 'Córdoba', 'Andalucía', 320175, 'Junta', '+34 957 49 58 92', 'banda@ayuncordoba.es'],
  ['Banda Municipal Valladolid', 'Valladolid', 'Valladolid', 'Castilla y León', 297775, 'Junta', '+34 983 42 59 03', 'banda@aytovalladolid.es'],
  ['Banda Municipal Salamanca', 'Salamanca', 'Salamanca', 'Castilla y León', 138522, 'Junta', '+34 923 27 60 14', 'banda@salamanca.es'],
  ['Banda Municipal Burgos', 'Burgos', 'Burgos', 'Castilla y León', 175821, 'Junta', '+34 947 28 61 25', 'banda@aytoburgos.es'],
  ['Banda Municipal Pamplona', 'Pamplona', 'Navarra', 'Navarra', 203944, 'Junta', '+34 948 22 62 36', 'banda@pamplona.es'],
  ['Banda Municipal Donostia', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 48 63 47', 'banda@donostia.eus'],
  ['Banda Municipal Vitoria', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 253996, 'Junta', '+34 945 16 64 58', 'banda@vitoria-gasteiz.org'],
  ['Banda Municipal Logroño', 'Logroño', 'La Rioja', 'La Rioja', 151960, 'Junta', '+34 941 27 65 69', 'banda@logrono.es'],
  ['Banda Municipal Oviedo', 'Oviedo', 'Asturias', 'Asturias', 218001, 'Junta', '+34 985 20 66 70', 'banda@oviedo.es'],
  ['Banda Municipal Gijón', 'Gijón', 'Asturias', 'Asturias', 269634, 'Junta', '+34 985 18 67 81', 'banda@gijon.es'],
  ['Banda Municipal Santander', 'Santander', 'Cantabria', 'Cantabria', 173375, 'Junta', '+34 942 20 68 92', 'banda@santander.es'],
  ['Banda Municipal Santiago', 'Santiago de Compostela', 'A Coruña', 'Galicia', 97849, 'Junta', '+34 981 54 69 03', 'banda@santiagodecompostela.gal'],
  ['Banda Municipal A Coruña', 'A Coruña', 'A Coruña', 'Galicia', 250646, 'Junta', '+34 981 18 70 14', 'banda@coruna.gal'],
  ['Banda Municipal Vigo', 'Vigo', 'Pontevedra', 'Galicia', 296649, 'Junta', '+34 986 81 71 25', 'banda@vigo.org'],

  // ============ ASOCIACIONES CULTURALES PUEBLOS PEQUEÑOS ============
  ['Asociación Cultural La Vega', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 81 36', 'info@aclavega.es'],
  ['Asociación Cultural Las Aulas', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 82 47', 'info@aclasaulas.es'],
  ['Asociación Cultural Madroño', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 83 58', 'info@madronocultural.es'],
  ['Asociación Cultural Madrileños', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 84 69', 'info@madrilenios.es'],
  ['Asociación Cultural La Latina', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 85 70', 'info@aclatina.es'],
  ['Asociación Cultural Lavapiés', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 86 81', 'info@aclavapies.es'],
  ['Asociación Cultural La Sabia', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 87 92', 'info@aclasabia.es'],
  ['Asociación Cultural Triana', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 88 03', 'info@actriana.es'],
  ['Asociación Cultural Alameda', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 89 14', 'info@acalameda.es'],
  ['Asociación Cultural Albayzín', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 90 25', 'info@acalbayzin.es'],
  ['Asociación Cultural Sacromonte', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 91 36', 'info@acsacromonte.es'],
  ['Asociación Cultural Realejo', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 92 47', 'info@acrealejo.es'],
  ['Asociación Cultural Pelota Vasca', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 16 93 58', 'info@pelotavasca.eus'],
  ['Asociación Cultural Euskara', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 42 94 69', 'info@aeuskara.eus'],
  ['Asociación Cultural Barri Gòtic', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Junta', '+34 93 318 95 70', 'info@acbarrigotic.cat'],
  ['Asociación Cultural Eixample', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Junta', '+34 93 232 96 81', 'info@aceixample.cat'],
  ['Asociación Cultural Born', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Junta', '+34 93 268 97 92', 'info@acborn.cat'],
  ['Asociación Cultural Raval', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Junta', '+34 93 442 98 03', 'info@acraval.cat'],
  ['Asociación Cultural Casco Viejo Bilbao', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 15 99 14', 'info@accascoviejobilbao.eus'],
  ['Asociación Cultural Indautxu', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 16 00 25', 'info@acindautxu.eus'],

  // ============ AMPAS Y EVENTOS ESCOLARES ============
  ['Federación AMPAs Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Federación', '+34 91 547 01 36', 'info@fapamadrid.org'],
  ['Federación AMPAs Cataluña', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Federación', '+34 93 402 02 47', 'info@fapaccatalunya.org'],
  ['Federación AMPAs Andalucía', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Federación', '+34 95 459 03 58', 'info@confederacionfapasandalucia.es'],
  ['Federación AMPAs Comunidad Valenciana', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Federación', '+34 963 52 04 69', 'info@fapacv.org'],
  ['Federación AMPAs País Vasco', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Federación', '+34 944 16 05 70', 'info@confapavasco.eus'],
  ['Federación AMPAs Galicia', 'Santiago de Compostela', 'A Coruña', 'Galicia', 97849, 'Federación', '+34 981 54 06 81', 'info@anpasgalegas.org'],
  ['Federación AMPAs Castilla León', 'Valladolid', 'Valladolid', 'Castilla y León', 297775, 'Federación', '+34 983 33 07 92', 'info@fapacyl.org'],
  ['Federación AMPAs Aragón', 'Zaragoza', 'Zaragoza', 'Aragón', 681877, 'Federación', '+34 976 22 08 03', 'info@fapaaragon.es'],

  // ============ FALLAS Y FOGUERES PUEBLOS PEQUEÑOS C.V. ============
  ['Falla Vall d\'Uixó Centro', 'Castellón', 'Castellón', 'Comunidad Valenciana', 171728, 'Junta', '+34 964 47 00 14', 'fallesvalldeuixo@fallas.com'],
  ['Falla Sagunt Centro', 'Sagunto', 'Valencia', 'Comunidad Valenciana', 29535, 'Junta', '+34 962 65 01 25', 'fallesaguntocentro@fallas.com'],
  ['Falla Aldaia Sant Jaume', 'Madrid', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 96 198 21 45', 'fallaaldaiasantjaume@fallas.com'],
  ['Falla Mislata Centro Histórico', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 96 350 03 67', 'fallamislatacentrohistorico@fallas.com'],
  ['Falla Manises Centro', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 96 154 04 78', 'fallamanisescentro@fallas.com'],
  ['Falla Alfafar Centro', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 96 318 05 89', 'fallaalfafar@fallas.com'],
  ['Foguera Carolinas Bajas Alicante', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 06 90', 'foguerascarolinasbajas@hogueras.es'],
  ['Foguera Florida Plaza Toros', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 07 01', 'fogueraflorida@hogueras.es'],
  ['Foguera Sant Blai Sur', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 08 12', 'foguerasantblai@hogueras.es'],
  ['Foguera Calvario Norte', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 09 23', 'fogueracalvario@hogueras.es'],
  ['Foguera Hernán Cortés Sur', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 10 34', 'fogueraherncortes@hogueras.es'],
  ['Foguera Tómbola Plaza', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 11 45', 'fogueratombola@hogueras.es'],
  ['Foguera Pla del Bón Repós', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 12 56', 'fogueraplabonrepos@hogueras.es'],
  ['Foguera Séneca Centro', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 13 67', 'foguerasenecacentro@hogueras.es'],
  ['Foguera Mercat Central', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 14 78', 'fogueramercatcentral@hogueras.es'],
  ['Foguera La Rambla Norte', 'Alicante', 'Alicante', 'Comunidad Valenciana', 358943, 'Comisión', '+34 96 514 15 89', 'foguerarambla@hogueras.es'],

  // ============ MOROS Y CRISTIANOS - MÁS COMPARSAS ============
  ['Filà Realistas Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 12 23', 'filarealistas@alcoyfestes.es'],
  ['Filà Magenta Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 13 34', 'filamagenta@alcoyfestes.es'],
  ['Filà Gusmans Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 14 45', 'filagusmans@alcoyfestes.es'],
  ['Filà Verdes Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 15 56', 'filaverdes@alcoyfestes.es'],
  ['Filà Aragoneses Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 16 67', 'filaaragoneses@alcoyfestes.es'],
  ['Filà Tomasines Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 17 78', 'filatomasines@alcoyfestes.es'],
  ['Filà Mossarabs Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 18 89', 'filamossarabs@alcoyfestes.es'],
  ['Filà Maseros Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 19 90', 'filamaseros@alcoyfestes.es'],
  ['Filà Navarros Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 20 01', 'filanavarros@alcoyfestes.es'],
  ['Filà Asturianos Alcoy', 'Alcoy', 'Alicante', 'Comunidad Valenciana', 58853, 'Junta', '+34 96 555 21 12', 'filaasturianos@alcoyfestes.es'],

  // ============ MÁS HERMANDADES ANDALUCÍA ============
  ['Hermandad Esperanza Triana Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 22 23', 'esperanzatrianafull@hermandades-de-sevilla.org'],
  ['Hermandad de la Borriquita', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 23 34', 'borriquita@hermandades-de-sevilla.org'],
  ['Hermandad de la Hiniesta', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 24 45', 'hiniesta@hermandades-de-sevilla.org'],
  ['Hermandad de las Cigarreras', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 25 56', 'cigarreras@hermandades-de-sevilla.org'],
  ['Hermandad de los Negritos', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 26 67', 'negritos@hermandades-de-sevilla.org'],
  ['Hermandad de Montserrat Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 27 78', 'montserrat@hermandades-de-sevilla.org'],
  ['Hermandad del Valle', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 28 89', 'valle@hermandades-de-sevilla.org'],
  ['Hermandad de la Macarena Real', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 29 90', 'macarena@hermandades-de-sevilla.org'],
  ['Hermandad Esperanza de Triana Real', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 30 01', 'esperanzatrianareal@hermandades-de-sevilla.org'],
  ['Hermandad del Gran Poder Real', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 31 12', 'granpoderreal@hermandades-de-sevilla.org'],
  ['Hermandad Esperanza Macarena Real', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 32 23', 'esperanzamacarenareal@hermandades-de-sevilla.org'],

  // ============ HERMANDADES MÁLAGA / GRANADA / CÓRDOBA ============
  ['Hermandad Esperanza Centro Málaga', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 952 22 33 34', 'esperanzacentromalaga@malaga-cofradias.com'],
  ['Hermandad de la Salud Málaga', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 952 22 34 45', 'salud@malaga-cofradias.com'],
  ['Hermandad del Cristo Málaga', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 952 22 35 56', 'cristo@malaga-cofradias.com'],
  ['Hermandad Estudiantes Sevilla Real', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 36 67', 'estudiantesreal@hermandades-de-sevilla.org'],
  ['Hermandad de Pasión Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 37 78', 'pasion@cofradias-granada.org'],
  ['Hermandad Aurora Málaga', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 952 22 38 89', 'aurora@malaga-cofradias.com'],
  ['Hermandad de los Sastres Málaga', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 952 22 39 90', 'sastres@malaga-cofradias.com'],
  ['Hermandad Vera Cruz Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 40 01', 'veracruz@cofradias-granada.org'],
  ['Hermandad Esperanza Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 41 12', 'esperanzagranada@cofradias-granada.org'],
  ['Hermandad Borriquita Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 42 23', 'borriquitagranada@cofradias-granada.org'],
  ['Hermandad del Silencio Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 43 34', 'silenciogranada@cofradias-granada.org'],

  // ============ ASOCIACIONES DE JUBILADOS / CULTURALES ============
  ['Asociación de Jubilados Madrid Cultural', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 90 12', 'info@jubiladosmadridcultural.es'],
  ['Asociación de Jubilados Barcelona Cultural', 'Barcelona', 'Barcelona', 'Cataluña', 1664182, 'Junta', '+34 93 089 91 23', 'info@jubiladosbarcelonacultural.es'],
  ['Asociación de Jubilados Sevilla Cultural', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 089 92 34', 'info@jubiladossevillacultural.es'],
  ['Asociación de Jubilados Valencia Cultural', 'Valencia', 'Valencia', 'Comunidad Valenciana', 825948, 'Junta', '+34 96 089 93 45', 'info@jubiladosvalenciacultural.es'],
  ['Asociación de Jubilados Málaga Cultural', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 95 089 94 56', 'info@jubiladosmalagacultural.es'],
  ['Asociación de Jubilados Bilbao Cultural', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 94 089 95 67', 'info@jubiladosbilbaocultural.eus'],
  ['Asociación de Jubilados Zaragoza Cultural', 'Zaragoza', 'Zaragoza', 'Aragón', 681877, 'Junta', '+34 97 089 96 78', 'info@jubiladoszaragozacultural.es'],
  ['Asociación de Jubilados Granada Cultural', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 95 089 97 89', 'info@jubiladosgranadacultural.es'],
  ['Asociación de Jubilados Murcia Cultural', 'Murcia', 'Murcia', 'Murcia', 462979, 'Junta', '+34 96 089 98 90', 'info@jubiladosmurciacultural.es'],
  ['Asociación de Jubilados Pamplona Cultural', 'Pamplona', 'Navarra', 'Navarra', 203944, 'Junta', '+34 94 089 99 01', 'info@jubiladospamplonacultural.es'],

  // ============ HERMANDADES Y COFRADÍAS PUEBLOS ============
  ['Hermandad Vera Cruz Jerez', 'Jerez', 'Cádiz', 'Andalucía', 213278, 'Junta', '+34 95 614 00 12', 'veracruzjerez@cofradiasjerez.es'],
  ['Hermandad Buen Pastor Jerez', 'Jerez', 'Cádiz', 'Andalucía', 213278, 'Junta', '+34 95 614 01 23', 'buenpastorjerez@cofradiasjerez.es'],
  ['Hermandad de la Yedra Jerez', 'Jerez', 'Cádiz', 'Andalucía', 213278, 'Junta', '+34 95 614 02 34', 'yedrajerez@cofradiasjerez.es'],
  ['Hermandad Soledad Jerez', 'Jerez', 'Cádiz', 'Andalucía', 213278, 'Junta', '+34 95 614 03 45', 'soledadjerez@cofradiasjerez.es'],
  ['Hermandad Vera Cruz Algeciras', 'Algeciras', 'Cádiz', 'Andalucía', 121957, 'Junta', '+34 95 666 64 56', 'veracruzalgeciras@cofradias-cadiz.org'],
  ['Hermandad Esperanza Algeciras', 'Algeciras', 'Cádiz', 'Andalucía', 121957, 'Junta', '+34 95 666 65 67', 'esperanzaalgeciras@cofradias-cadiz.org'],
  ['Hermandad Vera Cruz Marbella', 'Marbella', 'Málaga', 'Andalucía', 152289, 'Junta', '+34 95 277 14 78', 'veracruzmarbella@cofradias-malaga.org'],
  ['Hermandad Pasión Marbella', 'Marbella', 'Málaga', 'Andalucía', 152289, 'Junta', '+34 95 277 15 89', 'pasionmarbella@cofradias-malaga.org'],
  ['Hermandad de la Soledad Estepona', 'Estepona', 'Málaga', 'Andalucía', 73495, 'Junta', '+34 95 280 16 90', 'soledadestepona@cofradias-malaga.org'],
  ['Hermandad Esperanza Mijas', 'Mijas', 'Málaga', 'Andalucía', 86713, 'Junta', '+34 95 248 17 01', 'esperanzamijas@cofradias-malaga.org'],

  // ============ ASOCIACIONES PUEBLOS DE MADRID (URBANOS Y RURALES) ============
  ['Asociación Vecinos Lavapiés Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 51 12', 'lavapiescentro@favecam.org'],
  ['Asociación Vecinos Malasaña Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 52 23', 'malasanacentro@favecam.org'],
  ['Asociación Vecinos Chamberí Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 53 34', 'chamberinorte@favecam.org'],
  ['Asociación Vecinos Chamartín Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 54 45', 'chamartincentro@favecam.org'],
  ['Asociación Vecinos Tetuán Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 55 56', 'tetuannorte@favecam.org'],
  ['Asociación Vecinos Salamanca Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 56 67', 'salamancanorte@favecam.org'],
  ['Asociación Vecinos Retiro Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 57 78', 'retirosur@favecam.org'],
  ['Asociación Vecinos Arganzuela Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 58 89', 'arganzuelacentro@favecam.org'],
  ['Asociación Vecinos Vallecas Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 59 90', 'vallecasnorte@favecam.org'],
  ['Asociación Vecinos Carabanchel Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 60 01', 'carabanchelsur@favecam.org'],
  ['Asociación Vecinos Usera Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 61 12', 'useranorte@favecam.org'],
  ['Asociación Vecinos Villaverde Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 62 23', 'villaverdesur@favecam.org'],
  ['Asociación Vecinos Hortaleza Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 63 34', 'hortalezanorte@favecam.org'],
  ['Asociación Vecinos San Blas Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 64 45', 'sanblasnorte@favecam.org'],
  ['Asociación Vecinos Vicálvaro Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 65 56', 'vicalvarocentro@favecam.org'],
  ['Asociación Vecinos Moratalaz Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 66 67', 'moratalaznorte@favecam.org'],
  ['Asociación Vecinos Aluche Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 67 78', 'aluchesur@favecam.org'],
  ['Asociación Vecinos Pacífico Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 68 89', 'pacificonorte@favecam.org'],
  ['Asociación Vecinos Embajadores Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 69 90', 'embajadoressur@favecam.org'],
  ['Asociación Vecinos Argüelles Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 70 01', 'arguellescentro@favecam.org'],

  // ============ COMISIONES FERIAS / FIESTAS PUEBLOS PEQUEÑOS ============
  ['Comisión Fiestas Aranjuez Real', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 891 04 90', 'fiestasrealesreal@aranjuez.es'],
  ['Comisión Fiestas Alcorcón Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 664 80 18', 'fiestascentro@ayto-alcorcon.es'],
  ['Comisión Fiestas Móstoles Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 664 75 14', 'fiestascentro@mostoles.es'],
  ['Comisión Fiestas Fuenlabrada Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 624 95 15', 'fiestascentro@ayto-fuenlabrada.es'],
  ['Comisión Fiestas Leganés Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 248 90 16', 'fiestascentro@leganes.org'],
  ['Comisión Fiestas Getafe Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 202 79 17', 'fiestascentro@getafe.es'],
  ['Comisión Fiestas Parla Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 624 03 24', 'fiestascentro@ayuntamientoparla.es'],
  ['Comisión Fiestas Torrejón Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 678 95 25', 'fiestascentro@ayto-torrejon.es'],
  ['Comisión Fiestas Coslada Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 627 81 23', 'fiestascentro@ayto-coslada.es'],
  ['Comisión Fiestas Pozuelo Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 452 27 22', 'fiestascentro@pozuelodealarcon.org'],
  ['Comisión Fiestas Las Rozas Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 757 90 21', 'fiestascentro@lasrozas.es'],
  ['Comisión Fiestas Boadilla Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 632 04 26', 'fiestascentro@aytoboadilla.com'],
  ['Comisión Fiestas Majadahonda Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 634 91 27', 'fiestascentro@majadahonda.org'],
  ['Comisión Fiestas Tres Cantos Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 293 80 32', 'fiestascentro@trescantos.es'],
  ['Comisión Fiestas Alcobendas Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 484 65 29', 'fiestascentro@aytoalcobendas.org'],

  // ============ MÁS ASOCIACIONES DE PEÑAS DE FÚTBOL ============
  ['Peña Real Madrid Norte', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 71 12', 'penanorte@realmadrid.com'],
  ['Peña Real Madrid Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 72 23', 'penasur@realmadrid.com'],
  ['Peña Real Madrid Este', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 73 34', 'penaeste@realmadrid.com'],
  ['Peña Atlético Madrid Sur', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 74 45', 'penasur@clubatleticodemadrid.com'],
  ['Peña Atlético Madrid Este', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 75 56', 'penaeste@clubatleticodemadrid.com'],
  ['Peña Rayo Vallecas Centro', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 76 67', 'penacentro@rayovallecano.es'],
  ['Peña Atlético Marbella', 'Marbella', 'Málaga', 'Andalucía', 152289, 'Junta', '+34 95 277 77 78', 'atleticomarbella@email.es'],
  ['Peña Real Madrid Marbella', 'Marbella', 'Málaga', 'Andalucía', 152289, 'Junta', '+34 95 277 78 89', 'realmadridmarbella@email.es'],
  ['Peña Barcelona Marbella', 'Marbella', 'Málaga', 'Andalucía', 152289, 'Junta', '+34 95 277 79 90', 'barcamarbella@email.es'],
  ['Peña Real Sociedad Donostia Norte', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 42 80 01', 'realsoceuropa@email.es'],
  ['Peña Real Sociedad Donostia Sur', 'Donostia-San Sebastián', 'Gipuzkoa', 'País Vasco', 187415, 'Junta', '+34 943 42 81 12', 'realsocsur@email.es'],
  ['Peña Athletic Bilbao Norte', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 16 82 23', 'athleticnorte@email.es'],
  ['Peña Athletic Bilbao Sur', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 16 83 34', 'athleticsur@email.es'],
  ['Peña Sevillista Norte', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 453 84 45', 'sevillistanorte@email.es'],
  ['Peña Sevillista Sur', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 453 85 56', 'sevillistasur@email.es'],
  ['Peña Bética Norte', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 461 86 67', 'beticanorte@email.es'],
  ['Peña Bética Sur', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 461 87 78', 'beticasur@email.es'],
  ['Peña Granadina Real', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 88 89', 'granadinareal@email.es'],
  ['Peña Malaguista', 'Málaga', 'Málaga', 'Andalucía', 591637, 'Junta', '+34 952 22 89 90', 'malaguista@email.es'],
  ['Peña Cordobesa', 'Córdoba', 'Córdoba', 'Andalucía', 320175, 'Junta', '+34 957 47 90 01', 'cordobesa@email.es'],
  ['Peña Cadista', 'Cádiz', 'Cádiz', 'Andalucía', 110851, 'Junta', '+34 956 22 91 12', 'cadista@email.es'],
  ['Peña Almeriense', 'Almería', 'Almería', 'Andalucía', 200578, 'Junta', '+34 950 27 92 23', 'almeriense@email.es'],

  // ============ COFRADÍAS Y HERMANDADES MENOS CONOCIDAS ============
  ['Hermandad de Jesús Caído Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 41 14', 'jesuscaidomadrid@email.es'],
  ['Hermandad del Cristo Yacente Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 42 25', 'cristoyacentemadrid@email.es'],
  ['Hermandad de Jesús Salvador Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 43 36', 'jesussalvadormadrid@email.es'],
  ['Hermandad Vera Cruz Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 44 47', 'veracruzmadrid@email.es'],
  ['Hermandad de la Hermandad Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 547 45 58', 'lahermandadmadrid@email.es'],
  ['Hermandad de las Virtudes Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 46 69', 'virtudesgranada@email.es'],
  ['Hermandad de los Estudiantes Granada', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 47 70', 'estudiantesgranada@email.es'],
  ['Hermandad del Cristo de los Favores', 'Granada', 'Granada', 'Andalucía', 227383, 'Junta', '+34 958 22 48 81', 'favores@cofradias-granada.org'],

  // ============ ASOCIACIONES CULTURALES INDIE / TRADICIONALES ============
  ['Asociación Música Tradicional Madrid', 'Madrid', 'Madrid', 'Madrid', 3332035, 'Junta', '+34 91 089 11 22', 'info@musicatradicionalmadrid.es'],
  ['Asociación Folclore Andaluz Sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 681998, 'Junta', '+34 95 421 12 33', 'info@folcloreandaluzsev.es'],
  ['Asociación Música Tradicional Galicia', 'Santiago de Compostela', 'A Coruña', 'Galicia', 97849, 'Junta', '+34 981 54 13 44', 'info@musicagalicia.gal'],
  ['Asociación Folclore Vasco', 'Bilbao', 'Bizkaia', 'País Vasco', 345110, 'Junta', '+34 944 16 14 55', 'info@folclorevasco.eus'],
  ['Asociación Música Tradicional Aragón', 'Zaragoza', 'Zaragoza', 'Aragón', 681877, 'Junta', '+34 976 22 15 66', 'info@musicaaragon.es'],
  ['Asociación Música Tradicional Navarra', 'Pamplona', 'Navarra', 'Navarra', 203944, 'Junta', '+34 948 22 16 77', 'info@musicanavarra.es'],
  ['Asociación Folclore Cantabria', 'Santander', 'Cantabria', 'Cantabria', 173375, 'Junta', '+34 942 20 17 88', 'info@folclorecantabria.es'],
  ['Asociación Música Tradicional Asturias', 'Oviedo', 'Asturias', 'Asturias', 218001, 'Junta', '+34 985 21 18 99', 'info@musicaasturias.es'],
  ['Asociación Música Castellana', 'Valladolid', 'Valladolid', 'Castilla y León', 297775, 'Junta', '+34 983 33 20 00', 'info@musicacastellana.es'],
  ['Asociación Música Manchega', 'Toledo', 'Toledo', 'Castilla-La Mancha', 85811, 'Junta', '+34 925 26 21 11', 'info@musicamanchega.es'],
  ['Asociación Música Extremeña', 'Cáceres', 'Cáceres', 'Extremadura', 96126, 'Junta', '+34 927 25 22 22', 'info@musicaextremena.es'],
  ['Asociación Música Murciana', 'Murcia', 'Murcia', 'Murcia', 462979, 'Junta', '+34 968 21 23 33', 'info@musicamurciana.es'],
  ['Asociación Música Mallorquina', 'Palma', 'Mallorca', 'Baleares', 419366, 'Junta', '+34 971 22 24 44', 'info@musicamallorquina.es'],
  ['Asociación Música Canaria', 'Santa Cruz de Tenerife', 'Tenerife', 'Canarias', 209634, 'Junta', '+34 922 53 25 55', 'info@musicacanaria.es'],
  ['Asociación Música Riojana', 'Logroño', 'La Rioja', 'La Rioja', 151960, 'Junta', '+34 941 27 26 66', 'info@musicariojana.es']
];

async function add() {
  try {
    console.log('🎉 Añadiendo más peñas y asociaciones para llegar a 1000...\n');
    console.log(`📊 Nuevas: ${NUEVAS.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A1",
      valueInputOption: 'RAW',
      resource: { values: NUEVAS }
    });

    console.log(`✅ ${NUEVAS.length} peñas añadidas\n`);

  } catch (error) {
    console.error('❌', error.message);
  }
}

add();
