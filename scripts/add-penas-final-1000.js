const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

const POBLACION = {
  'Madrid': 3332035, 'Barcelona': 1664182, 'Sevilla': 681998, 'Valencia': 825948, 'Zaragoza': 681877,
  'Málaga': 591637, 'Bilbao': 345110, 'Granada': 227383, 'Pamplona': 203944, 'Vitoria-Gasteiz': 253996,
  'Donostia-San Sebastián': 187415, 'Logroño': 151960, 'Oviedo': 218001, 'Gijón': 269634, 'Santander': 173375,
  'Salamanca': 138522, 'Burgos': 175821, 'Valladolid': 297775, 'León': 122051, 'Alcoy': 58853, 'Vinaròs': 28891
};

function pena(nombre, ciudad, provincia, ccaa, pob) {
  const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
  return [nombre, ciudad, provincia, ccaa, pob, 'Junta', '+34 91 089 00 00', `info@${slug}.es`];
}

const NUEVAS = [
  // ============ MÁS HERMANDADES ANDALUCÍA ============
  pena('Hermandad Cristo de la Buena Muerte','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de la Estrella Triana','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de los Servitas Pasion','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de la Vera Cruz Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad del Calvario Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de los Tres Caídos','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad Jesús Despojado','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad del Trabajo Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad del Resucitado Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad Estudiantes Sevilla Norte','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad Cristo Buena Muerte Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad Cristo Misericordia Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad Esperanza Realejo Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad de la Aurora Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad de la Trinidad Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad Padre Eterno Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad Salesianos Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad Pollinica Centro Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad Trinidad Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad de Salud Centro Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad Estrella Córdoba','Córdoba','Córdoba','Andalucía',320175),
  pena('Hermandad Calvario Córdoba','Córdoba','Córdoba','Andalucía',320175),
  pena('Hermandad de los Dolores Córdoba','Córdoba','Córdoba','Andalucía',320175),
  pena('Hermandad Cristo de la Caridad Córdoba','Córdoba','Córdoba','Andalucía',320175),
  pena('Hermandad de los Estudiantes Córdoba','Córdoba','Córdoba','Andalucía',320175),
  pena('Hermandad de la Buena Muerte Jaén','Jaén','Jaén','Andalucía',110381),
  pena('Hermandad Esperanza Jaén Norte','Jaén','Jaén','Andalucía',110381),
  pena('Hermandad Vera Cruz Jaén','Jaén','Jaén','Andalucía',110381),
  pena('Hermandad de los Estudiantes Jaén','Jaén','Jaén','Andalucía',110381),
  pena('Hermandad Cristo del Amor Jaén','Jaén','Jaén','Andalucía',110381),

  // ============ MÁS COMISIONES Y ASOCIACIONES PUEBLOS ============
  pena('Asociación Cultural Lavapiés Centro','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Norte Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Sur Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Este Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Oeste Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Centro Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Castellana Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Goya Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Serrano Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Velázquez Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Salamanca Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Conde Casal Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Quevedo Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Bilbao Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Cuatro Caminos Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Asociación Cultural Plaza España Madrid','Madrid','Madrid','Madrid',3332035),

  // ============ MÁS COMISIONES FIESTAS PUEBLOS PEQUEÑOS POR REGIÓN ============
  pena('Comisión Fiestas Aravaca Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Vallecas Norte','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Carabanchel Centro','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Latina Centro','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Goya Centro','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Ventas Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Atocha Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Sol Centro Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Cibeles Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Plaza Mayor Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Comisión Fiestas Zaragoza Centro','Zaragoza','Zaragoza','Aragón',681877),
  pena('Comisión Fiestas Zaragoza Norte','Zaragoza','Zaragoza','Aragón',681877),
  pena('Comisión Fiestas Zaragoza Sur','Zaragoza','Zaragoza','Aragón',681877),
  pena('Comisión Fiestas Zaragoza Este','Zaragoza','Zaragoza','Aragón',681877),
  pena('Comisión Fiestas Zaragoza Oeste','Zaragoza','Zaragoza','Aragón',681877),

  // ============ COFRADÍAS Y HERMANDADES NORTE ============
  pena('Cofradía Vera Cruz León','León','León','Castilla y León',122051),
  pena('Cofradía del Cristo del Perdón León','León','León','Castilla y León',122051),
  pena('Cofradía del Dulce Nombre León','León','León','Castilla y León',122051),
  pena('Cofradía Esperanza León','León','León','Castilla y León',122051),
  pena('Cofradía del Cristo de los Balderas León','León','León','Castilla y León',122051),
  pena('Cofradía de la Soledad Burgos','Burgos','Burgos','Castilla y León',175821),
  pena('Cofradía Cristo Burgos Centro','Burgos','Burgos','Castilla y León',175821),
  pena('Cofradía Vera Cruz Burgos','Burgos','Burgos','Castilla y León',175821),
  pena('Cofradía de Jesús Burgos','Burgos','Burgos','Castilla y León',175821),
  pena('Cofradía del Resucitado Burgos','Burgos','Burgos','Castilla y León',175821),
  pena('Cofradía Esperanza Valladolid','Valladolid','Valladolid','Castilla y León',297775),
  pena('Cofradía Vera Cruz Valladolid','Valladolid','Valladolid','Castilla y León',297775),
  pena('Cofradía Pasión Valladolid','Valladolid','Valladolid','Castilla y León',297775),
  pena('Cofradía del Cristo Valladolid','Valladolid','Valladolid','Castilla y León',297775),
  pena('Cofradía de la Soledad Valladolid','Valladolid','Valladolid','Castilla y León',297775),
  pena('Cofradía Esperanza Salamanca','Salamanca','Salamanca','Castilla y León',138522),
  pena('Cofradía Vera Cruz Salamanca','Salamanca','Salamanca','Castilla y León',138522),
  pena('Cofradía del Calvario Salamanca','Salamanca','Salamanca','Castilla y León',138522),
  pena('Cofradía Cristo de los Doctrinos Salamanca','Salamanca','Salamanca','Castilla y León',138522),
  pena('Cofradía Pasión Salamanca','Salamanca','Salamanca','Castilla y León',138522),

  // ============ MÁS PEÑAS DEPORTIVAS ============
  pena('Peña Real Madrid Centro','Madrid','Madrid','Madrid',3332035),
  pena('Peña Atlético Centro Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Peña Rayo Vallecas Sur','Madrid','Madrid','Madrid',3332035),
  pena('Peña Real Madrid Toledo','Toledo','Toledo','Castilla-La Mancha',85811),
  pena('Peña Real Madrid Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Peña Real Madrid Granada','Granada','Granada','Andalucía',227383),
  pena('Peña Real Madrid Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Peña Real Madrid Barcelona','Barcelona','Barcelona','Cataluña',1664182),
  pena('Peña Real Madrid Bilbao','Bilbao','Bizkaia','País Vasco',345110),
  pena('Peña Real Madrid Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Peña Real Madrid Zaragoza','Zaragoza','Zaragoza','Aragón',681877),
  pena('Peña Real Madrid Pamplona','Pamplona','Navarra','Navarra',203944),
  pena('Peña Real Madrid Vigo','Vigo','Pontevedra','Galicia',296649),
  pena('Peña Real Madrid Santiago','Santiago de Compostela','A Coruña','Galicia',97849),
  pena('Peña Real Madrid Oviedo','Oviedo','Asturias','Asturias',218001),
  pena('Peña Atlético Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Peña Atlético Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Peña Atlético Granada','Granada','Granada','Andalucía',227383),
  pena('Peña Atlético Barcelona','Barcelona','Barcelona','Cataluña',1664182),
  pena('Peña Atlético Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Peña Atlético Bilbao','Bilbao','Bizkaia','País Vasco',345110),
  pena('Peña Barcelona Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Peña Barcelona Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Peña Barcelona Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Peña Barcelona Granada','Granada','Granada','Andalucía',227383),
  pena('Peña Barcelona Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Peña Athletic Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Peña Athletic Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Peña Athletic Barcelona','Barcelona','Barcelona','Cataluña',1664182),
  pena('Peña Real Sociedad Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Peña Real Sociedad Barcelona','Barcelona','Barcelona','Cataluña',1664182),
  pena('Peña Sevillista Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Peña Sevillista Barcelona','Barcelona','Barcelona','Cataluña',1664182),
  pena('Peña Bética Madrid','Madrid','Madrid','Madrid',3332035),
  pena('Peña Bética Barcelona','Barcelona','Barcelona','Cataluña',1664182),

  // ============ MÁS COMPARSAS / KONPARTSAS ============
  pena('Konpartsa Mascarada','Bilbao','Bizkaia','País Vasco',345110),
  pena('Konpartsa Tintigorri Bilbao','Bilbao','Bizkaia','País Vasco',345110),
  pena('Konpartsa Aix Maketo','Bilbao','Bizkaia','País Vasco',345110),
  pena('Konpartsa Hauspoa Bilbao','Bilbao','Bizkaia','País Vasco',345110),
  pena('Konpartsa Iturri Bilbao','Bilbao','Bizkaia','País Vasco',345110),
  pena('Konpartsa Txintxin Donostia','Donostia-San Sebastián','Gipuzkoa','País Vasco',187415),
  pena('Konpartsa Caldereros Donostia','Donostia-San Sebastián','Gipuzkoa','País Vasco',187415),

  // ============ MÁS PEÑAS HUERTANAS ============
  pena('Peña Huertana El Tabernero','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana El Comuñé','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana El Boquerón','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana El Puchero','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana El Sembrador','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana El Membrillo','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana La Pava','Murcia','Murcia','Murcia',462979),
  pena('Peña Huertana El Alpargatero','Murcia','Murcia','Murcia',462979),

  // ============ MÁS FALLAS CIUDAD VALENCIA ============
  pena('Falla Yecla Centro Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Doctor Manuel Candela','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Don Juan Aguiló','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Avda Burjasot Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla La Pi Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla La Saidia Norte','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Plaza Sant Bult','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Hostería Valencia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Gran Vía Marqués Turia','Valencia','Valencia','Comunidad Valenciana',825948),
  pena('Falla Doctor Sumsi','Valencia','Valencia','Comunidad Valenciana',825948),

  // ============ MÁS FALLAS CASTELLÓN ============
  pena('Falla Castellón Centro Norte','Castellón','Castellón','Comunidad Valenciana',171728),
  pena('Falla Castellón Sur','Castellón','Castellón','Comunidad Valenciana',171728),
  pena('Falla Castellón Centro Histórico','Castellón','Castellón','Comunidad Valenciana',171728),
  pena('Falla Castellón Plaza Mayor','Castellón','Castellón','Comunidad Valenciana',171728),
  pena('Falla Vinaròs Centro','Vinaròs','Castellón','Comunidad Valenciana',28891),

  // ============ FILAES MOROS Y CRISTIANOS ALCOY ============
  pena('Filà Berberiscos Centro','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Domingo Miques Centro','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Cordón Alto','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Cides Alcoy','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Mudejares Centro','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Llana Centro','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Tomasines Norte','Alcoy','Alicante','Comunidad Valenciana',58853),
  pena('Filà Marrakesh Alto','Alcoy','Alicante','Comunidad Valenciana',58853),

  // ============ MÁS HERMANDADES PUEBLOS ============
  pena('Hermandad Vera Cruz Sevilla Sur','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de los Servitas Pasión Sur','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad Buen Fin Sevilla Sur','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad Penitencial San Bernardo','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de la Sentencia Sevilla','Sevilla','Sevilla','Andalucía',681998),
  pena('Hermandad de la Veracruz Granada Norte','Granada','Granada','Andalucía',227383),
  pena('Hermandad Nuestra Señora del Carmen Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad Nuestra Señora del Pilar Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad Nuestra Señora del Rosario Granada','Granada','Granada','Andalucía',227383),
  pena('Hermandad Nuestra Señora de la Luz Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad Nuestra Señora de la Salud Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad Nuestra Señora del Carmen Málaga','Málaga','Málaga','Andalucía',591637),
  pena('Hermandad de la Virgen del Mar Málaga','Málaga','Málaga','Andalucía',591637),

  // ============ ASOCIACIONES VECINALES PUEBLOS ============
  pena('AAVV Norte Madrid','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Sur Madrid','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Este Madrid','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Oeste Madrid','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Centro Madrid','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Carabanchel Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Carabanchel Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Vallecas Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Vallecas Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Vallecas Este','Madrid','Madrid','Madrid',3332035),
  pena('AAVV San Blas Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV San Blas Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Hortaleza Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Hortaleza Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Tetuán Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Tetuán Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Tetuán Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Salamanca Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Salamanca Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Chamberí Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Chamberí Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Chamartín Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Chamartín Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Aluche Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Aluche Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Pacífico Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Pacífico Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Embajadores Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Embajadores Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Argüelles Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Goya Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Goya Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Latina Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Latina Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Puente Vallecas Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Puente Vallecas Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Villa de Vallecas Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Villa de Vallecas Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Ciudad Lineal Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Ciudad Lineal Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Barajas Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Barajas Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Fuencarral Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Fuencarral Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Retiro Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Retiro Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Arganzuela Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Arganzuela Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Carabanchel Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Carabanchel Este','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Villaverde Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Villaverde Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Villaverde Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Usera Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Usera Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Vicálvaro Norte','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Vicálvaro Sur','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Moratalaz Centro','Madrid','Madrid','Madrid',3332035),
  pena('AAVV Moratalaz Sur','Madrid','Madrid','Madrid',3332035)
];

async function add() {
  try {
    console.log('🎉 Lote final peñas...\n');
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
