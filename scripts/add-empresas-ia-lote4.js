const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const LOTE4 = [
  // ============ EMPRESAS REGIONALES NORTE ============
  ['Hidroeléctrica del Cantábrico', 'Energía', 'Oviedo', 'Asturias', 'AI Energy', 'Grande', '+34 98 510 50 00', 'rrhh@hcenergia.com', 'hcenergia.com', 'AI Energy'],
  ['SOGEPSA', 'Inmobiliaria/Pública', 'Oviedo', 'Asturias', 'AI Real Estate', 'Mediana', '+34 98 521 21 00', 'rrhh@sogepsa.com', 'sogepsa.com', 'AI Real Estate'],
  ['Cantabria Labs', 'Farma/Cosmética', 'Madrid', 'Madrid', 'AI Skincare', 'Grande', '+34 91 760 91 00', 'rrhh@cantabrialabs.com', 'cantabrialabs.com', 'AI Skincare'],
  ['Iberdrola Renovables', 'Energía Renovable', 'Bilbao', 'País Vasco', 'AI Renewable', 'Grande', '+34 94 466 39 00', 'rrhh@iberdrolarenovables.com', 'iberdrolarenovables.com', 'AI Renewable'],
  ['CIE Automotive', 'Automoción', 'Bilbao', 'País Vasco', 'AI Manufacturing', 'Grande', '+34 94 405 84 30', 'rrhh@cieautomotive.com', 'cieautomotive.com', 'AI Manufacturing'],
  ['Ulma Group', 'Industrial/Cooperativa', 'Oñati', 'País Vasco', 'AI Industrial', 'Grande', '+34 94 379 50 00', 'rrhh@ulma.com', 'ulma.com', 'AI Industrial'],
  ['Fagor Industrial', 'Electrodomésticos', 'Oñati', 'País Vasco', 'AI Manufacturing', 'Grande', '+34 94 371 90 00', 'rrhh@fagorindustrial.com', 'fagorindustrial.com', 'AI Manufacturing'],
  ['Petronor', 'Refinería', 'Muskiz', 'País Vasco', 'AI Industrial', 'Grande', '+34 94 670 88 00', 'rrhh@petronor.com', 'petronor.com', 'AI Industrial'],
  ['Vitalsek', 'Industrial', 'Pamplona', 'Navarra', 'AI Industrial', 'Mediana', '+34 94 838 18 88', 'rrhh@vitalsek.com', 'vitalsek.com', 'AI Industrial'],
  ['Inkoa Sistemas', 'Tech Industrial', 'Bilbao', 'País Vasco', 'AI Engineering', 'Mediana', '+34 94 488 27 00', 'rrhh@inkoa.com', 'inkoa.com', 'AI Engineering'],
  ['AGP Eglasses', 'Industrial Vidrio', 'Pamplona', 'Navarra', 'AI Manufacturing', 'Mediana', '+34 94 838 19 80', 'rrhh@agpglass.com', 'agpglass.com', 'AI Manufacturing'],

  // ============ EMPRESAS REGIONALES GALICIA ============
  ['R Cable y Telecable', 'Telecomunicaciones', 'A Coruña', 'Galicia', 'AI Telco', 'Grande', '+34 90 020 03 33', 'rrhh@mundo-r.com', 'mundo-r.com', 'AI Telco'],
  ['Coren', 'Alimentación/Cárnicos', 'Ourense', 'Galicia', 'AI Manufacturing', 'Grande', '+34 98 838 30 00', 'rrhh@coren.es', 'coren.es', 'AI Manufacturing'],
  ['Inveravante', 'Holding', 'A Coruña', 'Galicia', 'AI Strategy', 'Grande', '+34 98 117 73 00', 'rrhh@inveravante.com', 'inveravante.com', 'AI Strategy'],
  ['Gadisa', 'Distribución Alimentación', 'A Coruña', 'Galicia', 'AI Retail', 'Grande', '+34 98 119 73 00', 'rrhh@gadis.es', 'gadis.es', 'AI Retail'],
  ['Vegalsa-Eroski', 'Distribución', 'A Coruña', 'Galicia', 'AI Retail', 'Grande', '+34 98 117 16 00', 'rrhh@vegalsa.es', 'vegalsa.es', 'AI Retail'],
  ['Gestnova', 'Tech Galicia', 'A Coruña', 'Galicia', 'AI IT', 'Mediana', '+34 98 124 52 12', 'rrhh@gestnova.es', 'gestnova.es', 'AI IT'],
  ['Tedis Net', 'Tech', 'Vigo', 'Galicia', 'AI IT', 'Mediana', '+34 98 626 16 28', 'rrhh@tedis.com', 'tedis.com', 'AI IT'],
  ['Quimicos del Noroeste', 'Química', 'O Porriño', 'Galicia', 'AI Chemical', 'Grande', '+34 98 633 19 00', 'rrhh@quimicosdelnoroeste.com', 'quimicosdelnoroeste.com', 'AI Chemical'],

  // ============ EMPRESAS REGIONALES ARAGÓN ============
  ['Schindler España', 'Ascensores', 'Zaragoza', 'Aragón', 'AI Industrial', 'Grande', '+34 97 670 11 00', 'rrhh.spain@schindler.com', 'schindler.es', 'AI Industrial'],
  ['Pikolin', 'Mobiliario/Colchones', 'Zaragoza', 'Aragón', 'AI Manufacturing', 'Grande', '+34 97 645 50 00', 'rrhh@pikolin.com', 'pikolin.com', 'AI Manufacturing'],
  ['BSH Electrodomésticos', 'Electrodomésticos', 'Zaragoza', 'Aragón', 'AI Industrial', 'Grande', '+34 97 689 19 50', 'rrhh.spain@bshg.com', 'bsh-group.com', 'AI Industrial'],
  ['Tudor Arma', 'Industrial', 'Tudela', 'Navarra', 'AI Manufacturing', 'Mediana', '+34 94 882 62 00', 'rrhh@tudorarma.com', 'tudorarma.com', 'AI Manufacturing'],
  ['Aramón', 'Turismo Nieve', 'Zaragoza', 'Aragón', 'AI Tourism', 'Mediana', '+34 97 626 60 41', 'rrhh@aramon.es', 'aramon.com', 'AI Tourism'],

  // ============ EMPRESAS REGIONALES CASTILLA Y LEÓN ============
  ['Pradera Rural', 'Alimentación', 'Salamanca', 'Castilla y León', 'AI Manufacturing', 'Mediana', '+34 92 322 12 12', 'rrhh@pradera.es', 'pradera.es', 'AI Manufacturing'],
  ['Embutidos Argal', 'Cárnicos', 'Burgos', 'Castilla y León', 'AI Manufacturing', 'Mediana', '+34 94 700 22 00', 'rrhh@argal.es', 'argal.es', 'AI Manufacturing'],
  ['Iberebro', 'Energía Renovable', 'Valladolid', 'Castilla y León', 'AI Renewable', 'Mediana', '+34 98 318 53 12', 'rrhh@iberebro.com', 'iberebro.com', 'AI Renewable'],
  ['Bodegas Vega Sicilia', 'Vinos', 'Valbuena de Duero', 'Castilla y León', 'AI Wine', 'Grande', '+34 98 368 01 47', 'rrhh@vega-sicilia.com', 'vega-sicilia.com', 'AI Wine'],

  // ============ EMPRESAS REGIONALES ANDALUCÍA ============
  ['Persán', 'CPG Detergentes', 'Sevilla', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 467 50 00', 'rrhh@persan.com', 'persan.com', 'AI Manufacturing'],
  ['Heineken España', 'Bebidas/Cerveza', 'Sevilla', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 400 80 00', 'rrhh.spain@heineken.com', 'heineken.es', 'AI Manufacturing'],
  ['Salinas Magrabí', 'Industrial', 'Cádiz', 'Andalucía', 'AI Industrial', 'Mediana', '+34 95 654 12 12', 'rrhh@salinasmagrabi.com', 'salinasmagrabi.com', 'AI Industrial'],
  ['Migasa', 'Aceites Oliva', 'Sevilla', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 467 95 96', 'rrhh.empresa@migasa.com', 'migasa.com', 'AI Manufacturing'],
  ['Caja Rural del Sur', 'Banca Cooperativa', 'Sevilla', 'Andalucía', 'AI Banking', 'Grande', '+34 95 511 22 33', 'rrhh@cajaruraldelsur.es', 'cajaruraldelsur.es', 'AI Banking'],
  ['Caja Rural Granada', 'Banca Cooperativa', 'Granada', 'Andalucía', 'AI Banking', 'Grande', '+34 95 821 50 00', 'rrhh@cajagranada.es', 'cajagranada.es', 'AI Banking'],
  ['Aluminios Cortizo', 'Industrial Aluminio', 'A Coruña', 'Galicia', 'AI Manufacturing', 'Grande', '+34 98 174 70 35', 'rrhh@cortizo.com', 'cortizo.com', 'AI Manufacturing'],

  // ============ EMPRESAS REGIONALES LEVANTE ============
  ['Hero España', 'Alimentación Conservas', 'Alcantarilla', 'Murcia', 'AI Manufacturing', 'Grande', '+34 96 880 80 00', 'rrhh@hero.es', 'hero.es', 'AI Manufacturing'],
  ['Riberebro', 'Conservas Vegetales', 'Calahorra', 'La Rioja', 'AI Manufacturing', 'Grande', '+34 94 113 41 00', 'rrhh@riberebro.com', 'riberebro.com', 'AI Manufacturing'],
  ['Cofaga', 'Alimentación', 'Murcia', 'Murcia', 'AI Manufacturing', 'Grande', '+34 96 869 33 11', 'rrhh@cofaga.com', 'cofaga.com', 'AI Manufacturing'],
  ['Fertinagro Biotech', 'AgroBiotech', 'Teruel', 'Aragón', 'AI Agri', 'Mediana', '+34 97 860 60 80', 'rrhh@fertinagro.com', 'fertinagro.com', 'AI Agri'],
  ['Acuamed Levante', 'Agua/Desalación', 'Valencia', 'C. Valenciana', 'AI Water', 'Grande', '+34 96 393 38 00', 'rrhh@acuamed-levante.es', 'acuamed-levante.es', 'AI Water'],
  ['Pamesa Cerámica', 'Cerámica', 'Castellón', 'C. Valenciana', 'AI Manufacturing', 'Grande', '+34 96 451 10 50', 'rrhh@pamesa.com', 'pamesa.com', 'AI Manufacturing'],
  ['Stenger Cerámica', 'Cerámica', 'Castellón', 'C. Valenciana', 'AI Manufacturing', 'Mediana', '+34 96 472 50 00', 'rrhh@stenger.es', 'stenger.es', 'AI Manufacturing'],

  // ============ EMPRESAS BALEARES Y CANARIAS ============
  ['Loro Parque', 'Turismo/Zoo', 'Tenerife', 'Canarias', 'AI Tourism', 'Grande', '+34 92 237 30 38', 'rrhh@loroparque.com', 'loroparque.com', 'AI Tourism'],
  ['Domingo Alonso Group', 'Automoción', 'Las Palmas', 'Canarias', 'AI Automotive', 'Grande', '+34 92 845 26 00', 'rrhh@domingoalonso.com', 'domingoalonso.com', 'AI Automotive'],
  ['Mercadosa', 'Distribución Canarias', 'Tenerife', 'Canarias', 'AI Retail', 'Grande', '+34 92 220 60 60', 'rrhh@mercadosa.com', 'mercadosa.com', 'AI Retail'],
  ['Hiperdino', 'Distribución Canarias', 'Las Palmas', 'Canarias', 'AI Retail', 'Grande', '+34 92 805 06 00', 'rrhh@hiperdino.com', 'hiperdino.com', 'AI Retail'],
  ['DISA Group', 'Energía Canarias', 'Tenerife', 'Canarias', 'AI Energy', 'Grande', '+34 92 220 86 86', 'rrhh@disagroup.com', 'disagroup.com', 'AI Energy'],
  ['Binter Canarias', 'Aviación Regional', 'Las Palmas', 'Canarias', 'AI Aviation', 'Grande', '+34 92 280 04 09', 'rrhh@bintercanarias.com', 'bintercanarias.com', 'AI Aviation'],
  ['Air Nostrum Mediterránea', 'Aviación', 'Palma', 'Baleares', 'AI Aviation', 'Grande', '+34 90 280 64 11', 'rrhh@airnostrum.es', 'airnostrum.es', 'AI Aviation'],

  // ============ MÚSICA Y ENTRETENIMIENTO ============
  ['Universal Music España', 'Música', 'Madrid', 'Madrid', 'AI Music', 'Grande', '+34 91 005 95 12', 'rrhh.spain@umusic.com', 'umusic.com', 'AI Music'],
  ['Sony Music España', 'Música', 'Madrid', 'Madrid', 'AI Music', 'Grande', '+34 91 005 95 36', 'rrhh.spain@sonymusic.com', 'sonymusic.com', 'AI Music'],
  ['Warner Music España', 'Música', 'Madrid', 'Madrid', 'AI Music', 'Grande', '+34 91 005 95 60', 'rrhh.spain@wmg.com', 'wmg.com', 'AI Music'],
  ['Stage Entertainment España', 'Musicales', 'Madrid', 'Madrid', 'AI Theatre', 'Grande', '+34 91 091 47 91', 'rrhh.spain@stage-entertainment.com', 'stage-entertainment.com', 'AI Theatre'],
  ['Cinesa', 'Cines', 'Madrid', 'Madrid', 'AI Cinema', 'Grande', '+34 91 412 53 64', 'rrhh@cinesa.es', 'cinesa.es', 'AI Cinema'],
  ['Yelmo Cines', 'Cines', 'Madrid', 'Madrid', 'AI Cinema', 'Grande', '+34 91 005 95 92', 'rrhh@yelmocines.es', 'yelmocines.es', 'AI Cinema'],
  ['Kinepolis España', 'Cines', 'Madrid', 'Madrid', 'AI Cinema', 'Grande', '+34 91 005 96 14', 'rrhh.spain@kinepolis.com', 'kinepolis.com', 'AI Cinema'],

  // ============ APUESTAS Y JUEGOS ============
  ['Cirsa', 'Apuestas', 'Terrassa', 'Cataluña', 'AI Gaming', 'Grande', '+34 93 736 43 00', 'rrhh@cirsa.com', 'cirsa.com', 'AI Gaming'],
  ['Codere', 'Apuestas', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 354 28 00', 'rrhh@codere.com', 'codere.com', 'AI Gaming'],
  ['Casino Madrid', 'Casino', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 856 11 00', 'rrhh@casinogranmadrid.es', 'casinogranmadrid.es', 'AI Gaming'],
  ['Sportium España', 'Apuestas Online', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 005 96 32', 'rrhh@sportium.es', 'sportium.es', 'AI Gaming'],
  ['William Hill España', 'Apuestas', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 005 96 50', 'rrhh.spain@williamhill.com', 'williamhill.es', 'AI Gaming'],
  ['Bwin España', 'Apuestas', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 005 96 71', 'rrhh.spain@bwin.com', 'bwin.es', 'AI Gaming'],
  ['Bet365 España', 'Apuestas', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 005 96 91', 'rrhh.spain@bet365.com', 'bet365.es', 'AI Gaming'],
  ['Pokerstars España', 'Poker Online', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 005 97 11', 'rrhh.spain@pokerstars.es', 'pokerstars.es', 'AI Gaming'],

  // ============ AGROINDUSTRIA Y BIOTECH RURAL ============
  ['Cosgaya', 'Agroindustria', 'Burgos', 'Castilla y León', 'AI Manufacturing', 'Mediana', '+34 94 752 50 00', 'rrhh@cosgaya.com', 'cosgaya.com', 'AI Manufacturing'],
  ['Acorex', 'Cooperativa Cárnicos', 'Mérida', 'Extremadura', 'AI Manufacturing', 'Grande', '+34 92 437 95 00', 'rrhh@acorex.es', 'acorex.es', 'AI Manufacturing'],
  ['Forarom', 'Aromas y Esencias', 'Cáceres', 'Extremadura', 'AI Manufacturing', 'Mediana', '+34 92 723 92 00', 'rrhh@forarom.com', 'forarom.com', 'AI Manufacturing'],
  ['Naturgest', 'Agroindustria', 'Murcia', 'Murcia', 'AI Agri', 'Mediana', '+34 96 870 09 36', 'rrhh@naturgest.com', 'naturgest.com', 'AI Agri'],
  ['Frutas E. Sánchez', 'Agroindustria', 'Almería', 'Andalucía', 'AI Agri', 'Mediana', '+34 95 048 67 00', 'rrhh@frutaseSanchez.com', 'frutasesanchez.com', 'AI Agri'],
  ['Onubafruit', 'Cooperativa Frutas', 'Huelva', 'Andalucía', 'AI Agri', 'Grande', '+34 95 956 11 00', 'rrhh@onubafruit.com', 'onubafruit.com', 'AI Agri'],

  // ============ MAS STARTUPS Y TECNOLOGÍAS EMERGENTES ============
  ['Netcheck', 'Identity Verification IA', 'Madrid', 'Madrid', 'AI Verification', 'Pequeña', '+34 91 088 99 26', 'rrhh@netcheck.es', 'netcheck.es', 'AI Verification'],
  ['Veridas', 'Biometría IA', 'Pamplona', 'Navarra', 'AI Biometrics', 'Mediana', '+34 94 866 26 16', 'rrhh@veridas.com', 'veridas.com', 'AI Biometrics'],
  ['Mocyc', 'Crypto Tech', 'Madrid', 'Madrid', 'AI Crypto', 'Pequeña', '+34 91 088 99 47', 'rrhh@mocyc.io', 'mocyc.io', 'AI Crypto'],
  ['Pibank', 'Fintech Crypto', 'Madrid', 'Madrid', 'AI Crypto', 'Mediana', '+34 91 088 99 68', 'rrhh.empresa@pibank.es', 'pibank.es', 'AI Crypto'],
  ['Sherpa.AI Health', 'HealthTech IA', 'Bilbao', 'País Vasco', 'AI Health', 'Mediana', '+34 94 488 28 00', 'rrhh@sherpahealth.ai', 'sherpahealth.ai', 'AI Health'],
  ['IriusRisk', 'Cybersecurity IA', 'Bilbao', 'País Vasco', 'AI Security', 'Mediana', '+34 94 488 30 17', 'rrhh@iriusrisk.com', 'iriusrisk.com', 'AI Security'],
  ['Open Sistemas', 'IA Soluciones', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 088 12 14', 'rrhh@opensistemas.com', 'opensistemas.com', 'AI Solutions'],
  ['Jakala España', 'Marketing IA', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 088 13 26', 'rrhh.spain@jakala.com', 'jakala.com', 'AI Marketing'],
  ['Naps', 'IA Sleep Tech', 'Madrid', 'Madrid', 'AI Wellness', 'Pequeña', '+34 91 088 14 38', 'rrhh@naps.com', 'naps.com', 'AI Wellness'],
  ['Beewi', 'IoT IA', 'Madrid', 'Madrid', 'AI IoT', 'Pequeña', '+34 91 088 15 44', 'rrhh@beewi.es', 'beewi.es', 'AI IoT'],
  ['Tucandil', 'Smart Cities IA', 'Madrid', 'Madrid', 'AI Smart City', 'Pequeña', '+34 91 088 16 18', 'rrhh@tucandil.com', 'tucandil.com', 'AI Smart City'],
  ['IOmob', 'Mobility IA', 'Madrid', 'Madrid', 'AI Mobility', 'Mediana', '+34 91 088 17 22', 'rrhh@iomob.net', 'iomob.net', 'AI Mobility'],
  ['MotorK España', 'AutoTech', 'Madrid', 'Madrid', 'AI Automotive', 'Grande', '+34 91 088 18 38', 'rrhh.spain@motork.io', 'motork.io', 'AI Automotive'],
  ['Smartick Pro', 'EdTech IA', 'Madrid', 'Madrid', 'AI Education', 'Mediana', '+34 90 211 33 50', 'rrhh@smartickpro.com', 'smartick.com', 'AI Education'],
  ['Nilogy', 'Tech IA', 'Madrid', 'Madrid', 'AI Solutions', 'Pequeña', '+34 91 088 19 41', 'rrhh@nilogy.com', 'nilogy.com', 'AI Solutions'],
  ['Bionic Robotics', 'Robótica IA', 'Madrid', 'Madrid', 'AI Robotics', 'Pequeña', '+34 91 088 20 02', 'rrhh@bionicrobotics.es', 'bionicrobotics.es', 'AI Robotics'],

  // ============ ENERGÉTICAS REGIONALES Y ALTERNATIVAS ============
  ['Naturgy Generación Eléctrica', 'Energía', 'Madrid', 'Madrid', 'AI Energy', 'Grande', '+34 91 210 70 00', 'rrhh.energia@naturgy.com', 'naturgy.com', 'AI Energy'],
  ['Energy Generación', 'Energía Solar', 'Madrid', 'Madrid', 'AI Solar', 'Mediana', '+34 91 088 21 14', 'rrhh@energy-generacion.com', 'energy-generacion.com', 'AI Solar'],
  ['Aldro Energía', 'Energía Renovable', 'Santander', 'Cantabria', 'AI Energy', 'Mediana', '+34 90 020 25 25', 'rrhh@aldro.es', 'aldro.es', 'AI Energy'],
  ['Holaluz Renewables', 'Energía Renovable', 'Barcelona', 'Cataluña', 'AI Energy', 'Grande', '+34 93 226 30 70', 'rrhh.empresa@holaluz.com', 'holaluz.com', 'AI Energy'],
  ['Som Energia', 'Cooperativa Energía', 'Girona', 'Cataluña', 'AI Energy', 'Grande', '+34 87 252 38 17', 'rrhh@somenergia.coop', 'somenergia.coop', 'AI Energy'],
  ['EnergyControl', 'Energía Eficiencia', 'Bilbao', 'País Vasco', 'AI Energy', 'Mediana', '+34 94 488 32 78', 'rrhh@energycontrol.es', 'energycontrol.es', 'AI Energy'],

  // ============ CONSULTORÍA TECNOLÓGICA ESPECÍFICA ============
  ['BOSONIT', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 088 22 78', 'rrhh@bosonit.com', 'bosonit.com', 'AI Solutions'],
  ['Vass Spain', 'Consultoría IA', 'Madrid', 'Madrid', 'AI Banking', 'Grande', '+34 91 432 26 70', 'rrhh.empresa@vass.es', 'vass.com', 'AI Banking'],
  ['Tinsa Digital', 'PropTech IA', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 372 75 00', 'rrhh.digital@tinsa.es', 'tinsa.es', 'AI PropTech'],
  ['Treelogic', 'IA/Tech', 'Asturias', 'Asturias', 'AI Solutions', 'Mediana', '+34 98 526 70 87', 'rrhh@treelogic.com', 'treelogic.com', 'AI Solutions'],
  ['Optos', 'IA Soluciones', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 088 23 56', 'rrhh@optos.es', 'optos.es', 'AI Solutions'],
  ['Pexlife', 'IA Software', 'Madrid', 'Madrid', 'AI Software', 'Pequeña', '+34 91 088 24 12', 'rrhh@pexlife.com', 'pexlife.com', 'AI Software'],
  ['Cloud Champion España', 'Cloud IA', 'Barcelona', 'Cataluña', 'AI Cloud', 'Mediana', '+34 93 220 99 92', 'rrhh@cloudchampion.es', 'cloudchampion.es', 'AI Cloud'],
  ['Naranja Capital', 'Tech IA', 'Madrid', 'Madrid', 'AI Investment', 'Pequeña', '+34 91 088 25 17', 'rrhh@naranjacapital.com', 'naranjacapital.com', 'AI Investment'],
  ['Plain Concepts Cloud', 'Cloud Microsoft IA', 'Bilbao', 'País Vasco', 'AI Cloud', 'Grande', '+34 94 488 35 92', 'rrhh.cloud@plainconcepts.com', 'plainconcepts.com', 'AI Cloud Microsoft'],
  ['Inerco', 'Ingeniería IA', 'Sevilla', 'Andalucía', 'AI Engineering', 'Grande', '+34 95 446 80 00', 'rrhh@inerco.com', 'inerco.com', 'AI Engineering'],
  ['Ingeteam', 'Ingeniería IA', 'Bilbao', 'País Vasco', 'AI Engineering', 'Grande', '+34 94 489 70 00', 'rrhh@ingeteam.com', 'ingeteam.com', 'AI Engineering'],

  // ============ SECTOR PÚBLICO REGIONAL ============
  ['Castilla y León - Junta', 'Admin Pública', 'Valladolid', 'Castilla y León', 'AI Government', 'Grande', '+34 90 022 22 11', 'rrhh@jcyl.es', 'jcyl.es', 'AI Government'],
  ['Generalitat de Catalunya', 'Admin Pública', 'Barcelona', 'Cataluña', 'AI Government', 'Grande', '+34 93 402 46 00', 'rrhh@gencat.cat', 'gencat.cat', 'AI Government'],
  ['Generalitat Valenciana', 'Admin Pública', 'Valencia', 'C. Valenciana', 'AI Government', 'Grande', '+34 96 386 60 00', 'rrhh@gva.es', 'gva.es', 'AI Government'],
  ['Junta de Galicia - Xunta', 'Admin Pública', 'Santiago', 'Galicia', 'AI Government', 'Grande', '+34 88 199 99 99', 'rrhh@xunta.gal', 'xunta.gal', 'AI Government'],
  ['Gobierno Vasco', 'Admin Pública', 'Vitoria', 'País Vasco', 'AI Government', 'Grande', '+34 94 501 80 00', 'rrhh@euskadi.eus', 'euskadi.eus', 'AI Government'],
  ['Gobierno de Navarra', 'Admin Pública', 'Pamplona', 'Navarra', 'AI Government', 'Grande', '+34 94 842 70 00', 'rrhh@navarra.es', 'navarra.es', 'AI Government'],
  ['Junta de Extremadura', 'Admin Pública', 'Mérida', 'Extremadura', 'AI Government', 'Grande', '+34 92 400 50 00', 'rrhh@juntaex.es', 'juntaex.es', 'AI Government'],
  ['Govern Balear', 'Admin Pública', 'Palma', 'Baleares', 'AI Government', 'Grande', '+34 97 117 65 65', 'rrhh@caib.es', 'caib.es', 'AI Government'],
  ['Gobierno de Canarias', 'Admin Pública', 'Las Palmas', 'Canarias', 'AI Government', 'Grande', '+34 92 845 55 55', 'rrhh@gobiernodecanarias.org', 'gobiernodecanarias.org', 'AI Government'],
  ['Gobierno de La Rioja', 'Admin Pública', 'Logroño', 'La Rioja', 'AI Government', 'Grande', '+34 94 129 11 00', 'rrhh@larioja.org', 'larioja.org', 'AI Government'],
  ['Gobierno de Aragón', 'Admin Pública', 'Zaragoza', 'Aragón', 'AI Government', 'Grande', '+34 97 671 40 00', 'rrhh@aragon.es', 'aragon.es', 'AI Government'],
  ['Gobierno del Principado de Asturias', 'Admin Pública', 'Oviedo', 'Asturias', 'AI Government', 'Grande', '+34 98 510 50 00', 'rrhh@asturias.es', 'asturias.es', 'AI Government'],

  // ============ MAS BIG TECH STARTUPS NICHO ============
  ['Smarttek IA', 'IA SaaS', 'Madrid', 'Madrid', 'AI Industrial', 'Pequeña', '+34 91 088 26 41', 'rrhh@smarttek.io', 'smarttek.io', 'AI Industrial'],
  ['Cocoon Mobile', 'AppDev IA', 'Madrid', 'Madrid', 'AI Mobile Apps', 'Pequeña', '+34 91 088 27 84', 'rrhh@cocoonmobile.com', 'cocoonmobile.com', 'AI Mobile Apps'],
  ['Atticus IA', 'LegalTech IA', 'Madrid', 'Madrid', 'AI Legal', 'Pequeña', '+34 91 088 28 96', 'rrhh@atticus.es', 'atticus.es', 'AI Legal'],
  ['Lawyerd', 'LegalTech', 'Madrid', 'Madrid', 'AI Legal', 'Pequeña', '+34 91 088 30 14', 'rrhh@lawyerd.com', 'lawyerd.com', 'AI Legal'],
  ['Kuona', 'Big Data IA', 'Barcelona', 'Cataluña', 'AI Big Data', 'Mediana', '+34 93 020 12 11', 'rrhh@kuona.io', 'kuona.io', 'AI Big Data'],
  ['Nubity', 'Cloud IA', 'Barcelona', 'Cataluña', 'AI Cloud', 'Mediana', '+34 93 020 13 28', 'rrhh@nubity.com', 'nubity.com', 'AI Cloud'],
  ['Vortx Tech', 'IA SaaS', 'Madrid', 'Madrid', 'AI SaaS', 'Pequeña', '+34 91 088 31 78', 'rrhh@vortxtech.com', 'vortxtech.com', 'AI SaaS'],
  ['CleverPy IA', 'IA Solutions', 'Madrid', 'Madrid', 'AI Solutions', 'Pequeña', '+34 91 088 32 90', 'rrhh@cleverpy.com', 'cleverpy.com', 'AI Solutions'],
  ['SigmaTechnology España', 'Consultoría IA', 'Madrid', 'Madrid', 'AI Consultancy', 'Mediana', '+34 91 088 34 02', 'rrhh.spain@sigmatechnology.com', 'sigmatechnology.com', 'AI Consultancy'],
  ['Avanzo Networks', 'Cloud IA', 'Madrid', 'Madrid', 'AI Cloud', 'Mediana', '+34 91 088 35 14', 'rrhh@avanzonetworks.com', 'avanzonetworks.com', 'AI Cloud'],
  ['ServiTech Madrid', 'Tech', 'Madrid', 'Madrid', 'AI IT', 'Mediana', '+34 91 088 36 26', 'rrhh@servitech.es', 'servitech.es', 'AI IT'],
  ['BTSA', 'IA Sector Energético', 'Madrid', 'Madrid', 'AI Energy', 'Mediana', '+34 91 088 37 38', 'rrhh@btsa.es', 'btsa.es', 'AI Energy'],
  ['Globaltech Spain', 'Consultoría IA', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 088 38 50', 'rrhh@globaltech.es', 'globaltech.es', 'AI Solutions'],

  // ============ ECONOMIA CIRCULAR Y SOSTENIBILIDAD ============
  ['Ecovidrio', 'Reciclaje', 'Madrid', 'Madrid', 'AI Recycling', 'Grande', '+34 91 411 02 56', 'rrhh@ecovidrio.es', 'ecovidrio.es', 'AI Recycling'],
  ['Ecotic', 'Reciclaje Eléctrico', 'Madrid', 'Madrid', 'AI E-waste', 'Grande', '+34 91 426 78 00', 'rrhh@ecotic.es', 'ecotic.es', 'AI E-waste'],
  ['Ecovalia', 'Agricultura Ecológica', 'Sevilla', 'Andalucía', 'AI Eco', 'Mediana', '+34 95 568 92 13', 'rrhh@ecovalia.org', 'ecovalia.org', 'AI Eco'],
  ['Greenpeace España', 'ONG Medioambiental', 'Madrid', 'Madrid', 'AI Environmental', 'Grande', '+34 91 444 14 00', 'rrhh@greenpeace.es', 'greenpeace.org/es', 'AI Environmental'],
  ['WWF España', 'ONG Medioambiental', 'Madrid', 'Madrid', 'AI Environmental', 'Grande', '+34 91 354 05 78', 'rrhh@wwf.es', 'wwf.es', 'AI Environmental'],

  // ============ MAS HEALTHTECH/MEDTECH ============
  ['SaludOnline', 'HealthTech', 'Madrid', 'Madrid', 'AI Health', 'Mediana', '+34 91 088 39 62', 'rrhh@saludonline.es', 'saludonline.es', 'AI Health'],
  ['Tucuvi', 'HealthTech IA Voz', 'Madrid', 'Madrid', 'AI Voice Health', 'Mediana', '+34 91 088 41 78', 'rrhh@tucuvi.com', 'tucuvi.com', 'AI Voice Health'],
  ['Amalfi Analytics', 'HealthTech IA', 'Madrid', 'Madrid', 'AI Health Analytics', 'Mediana', '+34 91 088 42 90', 'rrhh@amalfianalytics.com', 'amalfianalytics.com', 'AI Health'],
  ['Made Of Genes', 'Genética IA', 'Madrid', 'Madrid', 'AI Genomics', 'Mediana', '+34 91 088 44 02', 'rrhh@madeofgenes.com', 'madeofgenes.com', 'AI Genomics'],
  ['Quibim Spain', 'MedTech IA', 'Valencia', 'C. Valenciana', 'AI Medical Imaging', 'Mediana', '+34 96 332 75 41', 'rrhh.empresa@quibim.com', 'quibim.com', 'AI Medical Imaging'],
  ['Genesy AI', 'AgroTech IA', 'Madrid', 'Madrid', 'AI Agri', 'Mediana', '+34 91 088 45 14', 'rrhh@genesy.ai', 'genesy.ai', 'AI Agri'],

  // ============ VERTICALES NICHO ============
  ['Linguistic Solutions', 'NLP IA', 'Madrid', 'Madrid', 'AI NLP', 'Pequeña', '+34 91 088 46 26', 'rrhh@linguisticsolutions.com', 'linguisticsolutions.com', 'AI NLP'],
  ['SQA Iberia', 'QA IA', 'Madrid', 'Madrid', 'AI QA', 'Mediana', '+34 91 088 47 38', 'rrhh@sqaiberia.com', 'sqaiberia.com', 'AI QA'],
  ['Inversis', 'Fintech B2B', 'Madrid', 'Madrid', 'AI Banking', 'Grande', '+34 91 426 76 00', 'rrhh@inversis.com', 'inversis.com', 'AI Banking'],
  ['Allfunds', 'Fintech B2B', 'Madrid', 'Madrid', 'AI WealthTech', 'Grande', '+34 91 308 60 00', 'rrhh@allfunds.com', 'allfunds.com', 'AI WealthTech'],
  ['Savana Health', 'HealthTech IA', 'Madrid', 'Madrid', 'AI Health', 'Mediana', '+34 91 088 49 50', 'rrhh.empresa@savanamed.com', 'savanamed.com', 'AI Health'],
  ['DerbyJobs', 'HR Tech IA', 'Madrid', 'Madrid', 'AI HR', 'Mediana', '+34 91 088 50 62', 'rrhh@derbyjobs.com', 'derbyjobs.com', 'AI HR'],

  // ============ ASOCIACIONES PROFESIONALES IA ============
  ['Asociación Española IA', 'Asociación', 'Madrid', 'Madrid', 'AI Asociación', 'Pequeña', '+34 91 088 51 74', 'rrhh@aepia.org', 'aepia.org', 'AI Asociación'],
  ['Adigital - Economía Digital', 'Asociación Empresarial', 'Madrid', 'Madrid', 'AI Digital Economy', 'Mediana', '+34 91 088 52 86', 'rrhh@adigital.org', 'adigital.org', 'AI Economy'],
  ['Ametic - Tecnología Digital', 'Asociación Tech', 'Madrid', 'Madrid', 'AI Industry', 'Grande', '+34 91 590 23 00', 'rrhh@ametic.es', 'ametic.es', 'AI Industry'],
  ['CIRCULO de Empresarios', 'Asociación Empresarial', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 578 14 72', 'rrhh@circulodeempresarios.org', 'circulodeempresarios.org', 'AI Strategy'],
  ['CEOE - Confederación Empresarios', 'Asociación Empresarial', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 566 34 00', 'rrhh@ceoe.es', 'ceoe.es', 'AI Strategy'],
  ['CEPYME', 'Asociación PYME', 'Madrid', 'Madrid', 'AI SME', 'Grande', '+34 91 411 61 61', 'rrhh@cepyme.es', 'cepyme.es', 'AI SME']
];

function reordenar(n) {
  return [n[7], n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[8], n[9]];
}

async function add() {
  try {
    console.log('🤖 Lote 4 empresas IA (regional + nicho)...\n');
    console.log(`📊 Nuevas: ${LOTE4.length}\n`);

    const { sheets } = await getServices();
    const reord = LOTE4.map(reordenar);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: reord }
    });

    console.log(`✅ ${LOTE4.length} empresas añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

add();
