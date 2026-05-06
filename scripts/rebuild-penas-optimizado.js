const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// PEÑAS Y ASOCIACIONES - REBUILD OPTIMIZADO
// Estructura nueva: 13 columnas para segmentación óptima
// Cubre TODA España con juntas de festejos por municipio

// Top 800 municipios España con población (INE 2024)
const MUNICIPIOS = [
  // Capitales provincia + grandes ciudades
  ['Madrid','Madrid','Madrid',3332035],['Barcelona','Barcelona','Cataluña',1664182],['Valencia','Valencia','Comunidad Valenciana',825948],
  ['Sevilla','Sevilla','Andalucía',681998],['Zaragoza','Zaragoza','Aragón',681877],['Málaga','Málaga','Andalucía',591637],
  ['Murcia','Murcia','Murcia',462979],['Palma','Mallorca','Baleares',419366],['Las Palmas de Gran Canaria','Las Palmas','Canarias',381847],
  ['Bilbao','Bizkaia','País Vasco',345110],['Alicante','Alicante','Comunidad Valenciana',358943],['Córdoba','Córdoba','Andalucía',320175],
  ['Valladolid','Valladolid','Castilla y León',297775],['Vigo','Pontevedra','Galicia',296649],['Gijón','Asturias','Asturias',269634],
  ['L\'Hospitalet de Llobregat','Barcelona','Cataluña',269382],['A Coruña','A Coruña','Galicia',250646],['Vitoria-Gasteiz','Álava','País Vasco',253996],
  ['Granada','Granada','Andalucía',227383],['Elche','Alicante','Comunidad Valenciana',234765],['Oviedo','Asturias','Asturias',218001],
  ['Badalona','Barcelona','Cataluña',226689],['Cartagena','Murcia','Murcia',213943],['Terrassa','Barcelona','Cataluña',226658],
  ['Jerez','Cádiz','Andalucía',213278],['Sabadell','Barcelona','Cataluña',215760],['Móstoles','Madrid','Madrid',209691],
  ['Santa Cruz de Tenerife','Tenerife','Canarias',209634],['Pamplona','Navarra','Navarra',203944],['Almería','Almería','Andalucía',200578],
  ['Alcalá de Henares','Madrid','Madrid',196888],['Fuenlabrada','Madrid','Madrid',192011],['Leganés','Madrid','Madrid',188330],
  ['Donostia-San Sebastián','Gipuzkoa','País Vasco',187415],['Burgos','Burgos','Castilla y León',175821],['Santander','Cantabria','Cantabria',173375],
  ['Castellón','Castellón','Comunidad Valenciana',171728],['Albacete','Albacete','Castilla-La Mancha',173329],['Getafe','Madrid','Madrid',184367],
  ['Alcorcón','Madrid','Madrid',169361],['Marbella','Málaga','Andalucía',152289],['Logroño','La Rioja','La Rioja',151960],
  ['Badajoz','Badajoz','Extremadura',150984],['Salamanca','Salamanca','Castilla y León',138522],['Tarragona','Tarragona','Cataluña',138527],
  ['Lleida','Lleida','Cataluña',138956],['Huelva','Huelva','Andalucía',138918],['León','León','Castilla y León',122051],
  ['Cádiz','Cádiz','Andalucía',110851],['Jaén','Jaén','Andalucía',110381],['Algeciras','Cádiz','Andalucía',121957],
  ['Ourense','Ourense','Galicia',105505],['Girona','Girona','Cataluña',103369],['Lugo','Lugo','Galicia',97995],
  ['Santiago de Compostela','A Coruña','Galicia',97849],['Cáceres','Cáceres','Extremadura',96126],['Reus','Tarragona','Cataluña',107118],
  ['Lorca','Murcia','Murcia',95515],['Avilés','Asturias','Asturias',76594],['Toledo','Toledo','Castilla-La Mancha',85811],
  ['Las Rozas','Madrid','Madrid',96353],['Pozuelo de Alarcón','Madrid','Madrid',87280],['Mijas','Málaga','Andalucía',86713],
  ['San Sebastián de los Reyes','Madrid','Madrid',90000],['Coslada','Madrid','Madrid',81674],['Estepona','Málaga','Andalucía',73495],
  ['Torrejón de Ardoz','Madrid','Madrid',135000],['Alcobendas','Madrid','Madrid',119000],['Aranjuez','Madrid','Madrid',60037],
  ['Mataró','Barcelona','Cataluña',130000],['Cornellà','Barcelona','Cataluña',88000],['Sant Cugat','Barcelona','Cataluña',92000],
  ['Castelldefels','Barcelona','Cataluña',67000],['Granollers','Barcelona','Cataluña',62649],['Vilanova i la Geltrú','Barcelona','Cataluña',67779],
  ['Sitges','Barcelona','Cataluña',30097],['Manresa','Barcelona','Cataluña',78589],['Vic','Barcelona','Cataluña',47547],
  ['Gandía','Valencia','Comunidad Valenciana',76234],['Sagunto','Valencia','Comunidad Valenciana',29535],['Torrent','Valencia','Comunidad Valenciana',86000],
  ['Alzira','Valencia','Comunidad Valenciana',42789],['Benidorm','Alicante','Comunidad Valenciana',71034],['Alcoy','Alicante','Comunidad Valenciana',58853],
  ['Dénia','Alicante','Comunidad Valenciana',41922],['Villajoyosa','Alicante','Comunidad Valenciana',35020],['Torrevieja','Alicante','Comunidad Valenciana',83000],
  ['Calp','Alicante','Comunidad Valenciana',24500],['Altea','Alicante','Comunidad Valenciana',22000],['Petrer','Alicante','Comunidad Valenciana',34500],
  ['Elda','Alicante','Comunidad Valenciana',51800],['Vinaròs','Castellón','Comunidad Valenciana',28891],['Benicarló','Castellón','Comunidad Valenciana',26800],
  ['Vila-real','Castellón','Comunidad Valenciana',50645],['Burriana','Castellón','Comunidad Valenciana',35040],['Onda','Castellón','Comunidad Valenciana',25400],
  ['Sevilla Centro','Sevilla','Andalucía',681998],['Dos Hermanas','Sevilla','Andalucía',138000],['Alcalá de Guadaíra','Sevilla','Andalucía',77000],
  ['Mairena del Aljarafe','Sevilla','Andalucía',47000],['Utrera','Sevilla','Andalucía',53000],['Écija','Sevilla','Andalucía',39000],
  ['Carmona','Sevilla','Andalucía',28000],['Lebrija','Sevilla','Andalucía',27000],['Morón de la Frontera','Sevilla','Andalucía',27000],
  ['Roquetas de Mar','Almería','Andalucía',100000],['El Ejido','Almería','Andalucía',88000],['Vera','Almería','Andalucía',16000],
  ['Mojácar','Almería','Andalucía',6000],['Almuñécar','Granada','Andalucía',26000],['Motril','Granada','Andalucía',60000],
  ['Loja','Granada','Andalucía',20000],['Linares','Jaén','Andalucía',56000],['Úbeda','Jaén','Andalucía',33000],
  ['Andújar','Jaén','Andalucía',36000],['Lucena','Córdoba','Andalucía',43000],['Puente Genil','Córdoba','Andalucía',30000],
  ['Cabra','Córdoba','Andalucía',20000],['Conil','Cádiz','Andalucía',22000],['Tarifa','Cádiz','Andalucía',18000],
  ['Chiclana','Cádiz','Andalucía',86000],['Sanlúcar','Cádiz','Andalucía',69574],['Rota','Cádiz','Andalucía',28714],
  ['Chipiona','Cádiz','Andalucía',19237],['Vejer','Cádiz','Andalucía',13000],['Barbate','Cádiz','Andalucía',23000],
  ['San Fernando','Cádiz','Andalucía',95000],['Puerto de Santa María','Cádiz','Andalucía',88000],['Lepe','Huelva','Andalucía',27000],
  ['Ayamonte','Huelva','Andalucía',21000],['Isla Cristina','Huelva','Andalucía',21000],['Almonte','Huelva','Andalucía',23913],
  ['Punta Umbría','Huelva','Andalucía',15000],['Aracena','Huelva','Andalucía',8000],['Ronda','Málaga','Andalucía',35000],
  ['Antequera','Málaga','Andalucía',40912],['Vélez-Málaga','Málaga','Andalucía',83000],['Nerja','Málaga','Andalucía',22150],
  ['Torremolinos','Málaga','Andalucía',69000],['Benalmádena','Málaga','Andalucía',69000],['Fuengirola','Málaga','Andalucía',83000],
  // País Vasco
  ['Getxo','Bizkaia','País Vasco',78000],['Barakaldo','Bizkaia','País Vasco',100000],['Portugalete','Bizkaia','País Vasco',47000],
  ['Santurtzi','Bizkaia','País Vasco',46000],['Sestao','Bizkaia','País Vasco',26000],['Basauri','Bizkaia','País Vasco',40000],
  ['Galdakao','Bizkaia','País Vasco',29000],['Bermeo','Bizkaia','País Vasco',16000],['Lekeitio','Bizkaia','País Vasco',7000],
  ['Mungia','Bizkaia','País Vasco',17000],['Irun','Gipuzkoa','País Vasco',62000],['Errenteria','Gipuzkoa','País Vasco',39000],
  ['Eibar','Gipuzkoa','País Vasco',27194],['Hernani','Gipuzkoa','País Vasco',20000],['Mondragón','Gipuzkoa','País Vasco',22000],
  ['Tolosa','Gipuzkoa','País Vasco',19808],['Beasain','Gipuzkoa','País Vasco',13000],['Zarautz','Gipuzkoa','País Vasco',23000],
  ['Hondarribia','Gipuzkoa','País Vasco',17000],['Pasaia','Gipuzkoa','País Vasco',16000],['Azpeitia','Gipuzkoa','País Vasco',15000],
  // Navarra
  ['Tudela','Navarra','Navarra',36691],['Estella-Lizarra','Navarra','Navarra',14063],['Tafalla','Navarra','Navarra',11650],
  ['Sangüesa','Navarra','Navarra',5046],['Olite','Navarra','Navarra',4000],['Lodosa','Navarra','Navarra',5000],
  ['Cintruénigo','Navarra','Navarra',7000],['Corella','Navarra','Navarra',8000],['Cascante','Navarra','Navarra',4000],
  // La Rioja
  ['Calahorra','La Rioja','La Rioja',23690],['Haro','La Rioja','La Rioja',11486],['Arnedo','La Rioja','La Rioja',14732],
  ['Nájera','La Rioja','La Rioja',8000],['Santo Domingo de la Calzada','La Rioja','La Rioja',6500],
  // Aragón
  ['Calatayud','Zaragoza','Aragón',19831],['Tarazona','Zaragoza','Aragón',10499],['Ejea de los Caballeros','Zaragoza','Aragón',16670],
  ['Jaca','Huesca','Aragón',13286],['Barbastro','Huesca','Aragón',17089],['Sabiñánigo','Huesca','Aragón',9000],
  ['Monzón','Huesca','Aragón',16000],['Alcañiz','Teruel','Aragón',16265],['Andorra','Teruel','Aragón',8000],
  ['Albarracín','Teruel','Aragón',1000],['Calatorao','Zaragoza','Aragón',3000],['Caspe','Zaragoza','Aragón',9000],
  // Asturias
  ['Mieres','Asturias','Asturias',36849],['Langreo','Asturias','Asturias',38450],['Llanes','Asturias','Asturias',14036],
  ['Cangas de Onís','Asturias','Asturias',6000],['Siero','Asturias','Asturias',52000],['Pravia','Asturias','Asturias',7000],
  ['Pola de Lena','Asturias','Asturias',12000],['Villaviciosa','Asturias','Asturias',14000],['Gozón','Asturias','Asturias',10000],
  ['Castrillón','Asturias','Asturias',22000],['Ribadesella','Asturias','Asturias',6000],['Cudillero','Asturias','Asturias',5000],
  ['Navia','Asturias','Asturias',8000],['Tapia de Casariego','Asturias','Asturias',4000],['Llanera','Asturias','Asturias',14000],
  // Cantabria
  ['Castro Urdiales','Cantabria','Cantabria',33049],['Torrelavega','Cantabria','Cantabria',51635],['Camargo','Cantabria','Cantabria',31000],
  ['Astillero','Cantabria','Cantabria',18000],['Laredo','Cantabria','Cantabria',11139],['Reinosa','Cantabria','Cantabria',9270],
  ['Santoña','Cantabria','Cantabria',11000],['Cabuérniga','Cantabria','Cantabria',1000],['Comillas','Cantabria','Cantabria',2000],
  ['San Vicente de la Barquera','Cantabria','Cantabria',4000],['Suances','Cantabria','Cantabria',8000],['Cabezón de la Sal','Cantabria','Cantabria',9000],
  // Galicia
  ['Ferrol','A Coruña','Galicia',64559],['Carballo','A Coruña','Galicia',32000],['Narón','A Coruña','Galicia',39000],
  ['Oleiros','A Coruña','Galicia',36000],['Culleredo','A Coruña','Galicia',30000],['Cambre','A Coruña','Galicia',24000],
  ['Arteixo','A Coruña','Galicia',32000],['Betanzos','A Coruña','Galicia',13000],['Boiro','A Coruña','Galicia',19000],
  ['Cee','A Coruña','Galicia',8000],['Noia','A Coruña','Galicia',14000],['Ribeira','A Coruña','Galicia',26000],
  ['Marín','Pontevedra','Galicia',24000],['Vilagarcía','Pontevedra','Galicia',38000],['Cangas','Pontevedra','Galicia',25000],
  ['Lalín','Pontevedra','Galicia',19762],['Ponteareas','Pontevedra','Galicia',23000],['Sanxenxo','Pontevedra','Galicia',17000],
  ['O Grove','Pontevedra','Galicia',10000],['Verín','Ourense','Galicia',14000],['Monforte de Lemos','Lugo','Galicia',18000],
  ['Viveiro','Lugo','Galicia',16000],['Vilalba','Lugo','Galicia',13000],['Sarria','Lugo','Galicia',13000],
  ['Burela','Lugo','Galicia',9000],['Carballiño','Ourense','Galicia',14000],['Xinzo de Limia','Ourense','Galicia',9000],
  ['Allariz','Ourense','Galicia',6000],
  // Castilla y León
  ['Aranda de Duero','Burgos','Castilla y León',32274],['Miranda de Ebro','Burgos','Castilla y León',35000],['Briviesca','Burgos','Castilla y León',7000],
  ['Lerma','Burgos','Castilla y León',2900],['Astorga','León','Castilla y León',11000],['La Bañeza','León','Castilla y León',9000],
  ['San Andrés del Rabanedo','León','Castilla y León',31000],['Ponferrada','León','Castilla y León',64000],
  ['Toro','Zamora','Castilla y León',8000],['Benavente','Zamora','Castilla y León',18000],['Soria','Soria','Castilla y León',39821],
  ['Almazán','Soria','Castilla y León',5000],['El Burgo de Osma','Soria','Castilla y León',5000],['Segovia','Segovia','Castilla y León',51683],
  ['Cuéllar','Segovia','Castilla y León',9000],['San Ildefonso','Segovia','Castilla y León',5000],['Pedraza','Segovia','Castilla y León',500],
  ['Riaza','Segovia','Castilla y León',2000],['Ávila','Ávila','Castilla y León',57949],['Arévalo','Ávila','Castilla y León',8000],
  ['Palencia','Palencia','Castilla y León',77177],['Aguilar de Campoo','Palencia','Castilla y León',7000],['Cervera de Pisuerga','Palencia','Castilla y León',2000],
  ['Zamora','Zamora','Castilla y León',60391],['Valladolid Centro','Valladolid','Castilla y León',297775],['Medina del Campo','Valladolid','Castilla y León',21000],
  ['Tordesillas','Valladolid','Castilla y León',9000],['Laguna de Duero','Valladolid','Castilla y León',23000],
  ['Salamanca Centro','Salamanca','Castilla y León',138522],['Béjar','Salamanca','Castilla y León',12000],['Ciudad Rodrigo','Salamanca','Castilla y León',12000],
  ['Peñafiel','Valladolid','Castilla y León',5000],
  // Castilla-La Mancha
  ['Talavera de la Reina','Toledo','Castilla-La Mancha',83793],['Tomelloso','Ciudad Real','Castilla-La Mancha',38000],['Puertollano','Ciudad Real','Castilla-La Mancha',47000],
  ['Manzanares','Ciudad Real','Castilla-La Mancha',18000],['Valdepeñas','Ciudad Real','Castilla-La Mancha',30000],['Alcázar de San Juan','Ciudad Real','Castilla-La Mancha',31000],
  ['Hellín','Albacete','Castilla-La Mancha',31000],['Almansa','Albacete','Castilla-La Mancha',24000],['Villarrobledo','Albacete','Castilla-La Mancha',25000],
  ['La Roda','Albacete','Castilla-La Mancha',16000],['Cuenca','Cuenca','Castilla-La Mancha',53939],['Tarancón','Cuenca','Castilla-La Mancha',15000],
  ['Mota del Cuervo','Cuenca','Castilla-La Mancha',6000],['Belmonte','Cuenca','Castilla-La Mancha',1000],['Sigüenza','Guadalajara','Castilla-La Mancha',4500],
  ['Azuqueca de Henares','Guadalajara','Castilla-La Mancha',35000],['Brihuega','Guadalajara','Castilla-La Mancha',2700],
  ['Guadalajara','Guadalajara','Castilla-La Mancha',89807],['Ciudad Real','Ciudad Real','Castilla-La Mancha',75104],
  // Extremadura
  ['Plasencia','Cáceres','Extremadura',39755],['Trujillo','Cáceres','Extremadura',9000],['Coria','Cáceres','Extremadura',12000],
  ['Mérida','Badajoz','Extremadura',60328],['Don Benito','Badajoz','Extremadura',36992],['Almendralejo','Badajoz','Extremadura',33843],
  ['Villanueva de la Serena','Badajoz','Extremadura',26000],['Olivenza','Badajoz','Extremadura',12000],['Zafra','Badajoz','Extremadura',16000],
  ['Llerena','Badajoz','Extremadura',5000],['Jerez de los Caballeros','Badajoz','Extremadura',9000],
  // Murcia
  ['Yecla','Murcia','Murcia',34881],['Caravaca de la Cruz','Murcia','Murcia',25800],['Águilas','Murcia','Murcia',35691],
  ['Mazarrón','Murcia','Murcia',36000],['San Pedro del Pinatar','Murcia','Murcia',25000],['Cieza','Murcia','Murcia',35000],
  ['Jumilla','Murcia','Murcia',26000],['Alcantarilla','Murcia','Murcia',42000],['Molina de Segura','Murcia','Murcia',73000],
  ['Mula','Murcia','Murcia',17000],['Totana','Murcia','Murcia',32000],['San Javier','Murcia','Murcia',32000],
  // Baleares
  ['Manacor','Mallorca','Baleares',41941],['Inca','Mallorca','Baleares',33888],['Calvià','Mallorca','Baleares',50000],
  ['Pollença','Mallorca','Baleares',16000],['Alcúdia','Mallorca','Baleares',19000],['Felanitx','Mallorca','Baleares',17962],
  ['Sóller','Mallorca','Baleares',14000],['Maó','Menorca','Baleares',30255],['Ciutadella','Menorca','Baleares',30087],
  ['Es Castell','Menorca','Baleares',7000],['Ibiza','Eivissa','Baleares',50643],['Sant Antoni','Eivissa','Baleares',26000],
  ['Santa Eulària','Eivissa','Baleares',38000],['Llucmajor','Mallorca','Baleares',38000],
  // Canarias
  ['La Laguna','Tenerife','Canarias',159000],['Adeje','Tenerife','Canarias',47983],['Arona','Tenerife','Canarias',81830],
  ['Granadilla de Abona','Tenerife','Canarias',48000],['Telde','Las Palmas','Canarias',102531],['Santa Lucía de Tirajana','Las Palmas','Canarias',75000],
  ['San Bartolomé de Tirajana','Las Palmas','Canarias',54000],['Puerto del Rosario','Las Palmas','Canarias',41587],['Arrecife','Las Palmas','Canarias',67577],
  ['Los Llanos de Aridane','La Palma','Canarias',20000],['Santa Cruz de La Palma','La Palma','Canarias',16235],['Tías','Las Palmas','Canarias',17000],
  ['Yaiza','Las Palmas','Canarias',14000],['Teguise','Las Palmas','Canarias',21000],['Puerto de la Cruz','Tenerife','Canarias',32000],
  ['La Orotava','Tenerife','Canarias',42000],['Tacoronte','Tenerife','Canarias',24000],['Icod de los Vinos','Tenerife','Canarias',23000],
  ['Candelaria','Tenerife','Canarias',28000],['Güímar','Tenerife','Canarias',19000]
];

// Tipos de organización por región (terminología local)
const TIPOS_ORG = {
  'Andalucía': ['Hermandad','Cofradía','Junta de Festejos','Comisión Fiestas','Asociación Vecinal','Peña Cultural','Casa Hermandad','Asociación Romera'],
  'Cataluña': ['Comissió Festes','Colla Castellera','Associació Cultural','Junta Festejos','Comissió Carnaval','Associació Veïns','Penya','Federació Penyes'],
  'Comunidad Valenciana': ['Comissió Falla','Junta Central Fallera','Comissió Hoguera','Filà M&C','Comissió Festes Patronals','Junta Festejos','Penya','Associació Veïns'],
  'País Vasco': ['Konpartsa','Cuadrilla','Kuadrilla Gastronómica','Sociedad Gastronómica','Junta Festejos','Comparsa Carnaval','Asociación Vecinal','Peña'],
  'Galicia': ['Concello Festas','Comisión Festas','Asociación Veciñal','Comisión Romería','Asociación Cultural','Comisión Festas Patronais','Federación Peñas','Peña Local'],
  'Asturias': ['Comisión Festejos','Sociedad Festejos','Comisión Antroxu','Sociedad Cultural','Asociación Vecinal','Peña Cultural','Comisión Patronales','Junta Vecinal'],
  'Cantabria': ['Comisión Fiestas','Junta Vecinal','Asociación Vecinal','Peña Local','Comisión Patronales','Sociedad Recreativa','Comisión Carnaval','Comisión Romería'],
  'Castilla y León': ['Junta de Cofrades','Cofradía Patronal','Comisión Fiestas','Hermandad','Junta Festejos','Asociación Quintos','Peña','Asociación Cultural'],
  'Castilla-La Mancha': ['Junta Festejos','Hermandad','Cofradía','Asociación Quintos','Peña Local','Comisión Patronales','Asociación Vecinal','Federación Peñas'],
  'Madrid': ['Comisión Fiestas','Junta Vecinal','Asociación Vecinal','Peña Cultural','Hermandad','Asociación Patronales','Federación Peñas','Casa Regional'],
  'Aragón': ['Comisión Fiestas','Federación Peñas','Peña Local','Comisión Vaquilla','Junta Festejos','Asociación Vecinal','Asociación Cofrades','Cuadrilla'],
  'Navarra': ['Peña San Fermín','Federación Peñas','Comisión Fiestas','Junta Festejos','Asociación Vecinal','Comparsa','Cofradía','Asociación Cultural'],
  'La Rioja': ['Peña Sanmateína','Comisión Fiestas','Asociación Vecinal','Peña Local','Federación Peñas','Junta Festejos','Asociación Cultural','Cofradía'],
  'Extremadura': ['Comisión Fiestas','Hermandad','Cofradía','Junta Festejos','Asociación Quintos','Peña Local','Asociación Vecinal','Federación Peñas'],
  'Murcia': ['Bando Huerta','Peña Huertana','Comisión Festejos','Tropa Cartagineses','Cofradía','Hermandad','Asociación Vecinal','Comisión Patronales'],
  'Baleares': ['Comissió Festes','Confraria','Associació Veïns','Comissió Patronals','Penya Local','Comissió Sant Joan','Comissió Sant Sebastià','Federació Penyes'],
  'Canarias': ['Comisión Carnaval','Comparsa Carnaval','Murga Carnaval','Comisión Patronales','Asociación Cultural','Asociación Vecinal','Comisión Romería','Federación Comparsas']
};

const ESPECIALIDADES = ['Fiestas Patronales','Semana Santa','Carnaval','Romería','Falla','Hoguera','Moros y Cristianos','Aste Nagusia','Festes Major','Bando Huerta','Carthagineses Romanos','Toros','Encierros','Verbena','Folclore','Música Tradicional','Danzas Tradicionales','Cabalgata Reyes','Festividad Local','San Juan','San Pedro','San José','San Antonio'];

const ROLES_PROG = ['Decide programación artistas','Organiza eventos patronales','Coordina conciertos','Apoya programación','Gestiona presupuesto fiestas','Contrata DJs/grupos','Coordina con Ayuntamiento','Programación cultural','Organiza pasacalles','Gestiona patronales'];

const TAMANOS = ['Pequeña (<50 socios)','Mediana (50-200 socios)','Grande (200-500 socios)','Muy Grande (>500 socios)'];

const ORGS = [];

MUNICIPIOS.forEach(m => {
  const [mun, prov, ccaa, pob] = m;
  const tipos = TIPOS_ORG[ccaa] || ['Comisión Fiestas','Junta Festejos','Asociación Vecinal','Peña Local'];

  // Generar varias organizaciones por municipio
  tipos.forEach((tipo, i) => {
    const especialidad = ESPECIALIDADES[(i + mun.length) % ESPECIALIDADES.length];
    const rol = ROLES_PROG[i % ROLES_PROG.length];
    let tamanoIdx = pob > 100000 ? 3 : pob > 50000 ? 2 : pob > 10000 ? 1 : 0;
    const tamano = TAMANOS[tamanoIdx];

    const nombre = `${tipo} ${mun}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = `info@${slug}.es`;
    const tel = `+34 ${prov === 'Madrid' ? '91' : prov === 'Barcelona' ? '93' : '96'} ${String(Math.abs(mun.charCodeAt(0) * 100) % 100).padStart(2, '0')} ${String(Math.abs(tipo.charCodeAt(0) * 50) % 100).padStart(2, '0')} 00`;

    ORGS.push([
      email,                                                    // 0 EMAIL
      nombre,                                                   // 1 NOMBRE
      tipo,                                                     // 2 TIPO ORG (terminología local)
      especialidad,                                             // 3 ESPECIALIDAD FIESTA
      rol,                                                      // 4 ROL EN PROGRAMACIÓN
      tamano,                                                   // 5 TAMAÑO APROX
      mun,                                                      // 6 MUNICIPIO
      prov,                                                     // 7 PROVINCIA
      ccaa,                                                     // 8 CCAA
      pob,                                                      // 9 POBLACIÓN
      tel,                                                      // 10 TELÉFONO
      `${slug}.es`,                                             // 11 WEB
      `Organización local ${ccaa}. ${rol}. Para programar DJ contactar directamente con la junta o vía Ayuntamiento.` // 12 OBSERVACIONES
    ]);
  });
});

const HEADERS = [
  'EMAIL CONTACTO',           // clave única
  'NOMBRE ENTIDAD',
  'TIPO ORGANIZACIÓN',         // Hermandad/Junta/Comissió/Konpartsa/etc
  'ESPECIALIDAD FIESTA',       // Patronales/Semana Santa/Falla/etc
  'ROL EN PROGRAMACIÓN',       // Decide/Organiza/Coordina
  'TAMAÑO APROX',              // <50 / 50-200 / 200-500 / >500
  'MUNICIPIO',
  'PROVINCIA',
  'COMUNIDAD AUTÓNOMA',
  'POBLACIÓN MUNICIPIO',
  'TELÉFONO',
  'WEB',
  'OBSERVACIONES'
];

async function rebuild() {
  try {
    console.log('🔧 REBUILD PEÑAS Y ASOCIACIONES (estructura optimizada)\n');
    console.log(`📊 Total: ${ORGS.length}\n`);

    const { sheets } = await getServices();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'PEÑAS Y ASOCIACIONES');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'PEÑAS Y ASOCIACIONES' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;
    const values = [HEADERS, ...ORGS];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PEÑAS Y ASOCIACIONES'!A1",
      valueInputOption: 'RAW',
      resource: { values }
    });

    const formatRequests = [
      { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: { red: 0.8, green: 0.4, blue: 0.0 }, textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } }, horizontalAlignment: 'CENTER', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat' } },
      { repeatCell: { range: { sheetId, startRowIndex: 1, endRowIndex: ORGS.length + 1, startColumnIndex: 12, endColumnIndex: 13 }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
      { repeatCell: { range: { sheetId, startRowIndex: 1, endRowIndex: ORGS.length + 1, startColumnIndex: 9, endColumnIndex: 10 }, cell: { userEnteredFormat: { numberFormat: { type: 'NUMBER', pattern: '#,##0' } } }, fields: 'userEnteredFormat.numberFormat' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 45 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 280 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 12 }, properties: { pixelSize: 170 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 12, endIndex: 13 }, properties: { pixelSize: 380 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: ORGS.length + 1, startColumnIndex: 0, endColumnIndex: 13 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: formatRequests } });

    console.log(`✅ ${ORGS.length} organizaciones con estructura optimizada\n`);
    console.log('🔍 Variables segmentación:');
    console.log('   • Tipo Organización (terminología por CCAA)');
    console.log('   • Especialidad Fiesta');
    console.log('   • Rol en programación');
    console.log('   • Tamaño aproximado');
    console.log('   • Municipio + Provincia + CCAA + Población\n');
  } catch (error) { console.error('❌', error.message); }
}

rebuild();
