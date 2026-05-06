const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOTE 3 - Concejalías de Cultura, Festivales locales y agencias regionales
const LOTE3 = [
  // ============ CONCEJALÍAS DE CULTURA Y JUVENTUD (clientes directos) ============
  ['Concejalía Cultura Madrid Centro', 'Admin Pública Cultura', 'Madrid', 'Madrid', 'Programación cultural Madrid Centro', 'Grande', '+34 91 588 16 18', 'distritocentro@madrid.es', 'madrid.es', 'Distrito Centro'],
  ['Concejalía Festejos Móstoles', 'Admin Pública', 'Móstoles', 'Madrid', 'Festejos Móstoles', 'Grande', '+34 91 664 75 13', 'cultura@mostoles.es', 'mostoles.es', 'Móstoles'],
  ['Concejalía Cultura Fuenlabrada', 'Admin Pública', 'Fuenlabrada', 'Madrid', 'Cultura Fuenlabrada', 'Grande', '+34 91 624 95 14', 'cultura@ayto-fuenlabrada.es', 'ayto-fuenlabrada.es', 'Fuenlabrada'],
  ['Concejalía Cultura Leganés', 'Admin Pública', 'Leganés', 'Madrid', 'Cultura Leganés', 'Grande', '+34 91 248 90 15', 'cultura@leganes.org', 'leganes.org', 'Leganés'],
  ['Concejalía Cultura Getafe', 'Admin Pública', 'Getafe', 'Madrid', 'Cultura Getafe', 'Grande', '+34 91 202 79 16', 'cultura@getafe.es', 'getafe.es', 'Getafe'],
  ['Concejalía Cultura Alcorcón', 'Admin Pública', 'Alcorcón', 'Madrid', 'Cultura Alcorcón', 'Grande', '+34 91 664 80 17', 'cultura@ayto-alcorcon.es', 'ayto-alcorcon.es', 'Alcorcón'],
  ['Concejalía Cultura Alcalá', 'Admin Pública', 'Alcalá de Henares', 'Madrid', 'Cervantina y cultura', 'Grande', '+34 91 877 19 18', 'cultura@ayto-alcaladehenares.es', 'ayto-alcaladehenares.es', 'Alcalá'],
  ['Concejalía Cultura Aranjuez', 'Admin Pública', 'Aranjuez', 'Madrid', 'Cultura Aranjuez', 'Grande', '+34 91 891 04 19', 'cultura@aranjuez.es', 'aranjuez.es', 'Aranjuez'],
  ['Concejalía Cultura Las Rozas', 'Admin Pública', 'Las Rozas', 'Madrid', 'Cultura Las Rozas', 'Grande', '+34 91 757 90 20', 'cultura@lasrozas.es', 'lasrozas.es', 'Las Rozas'],
  ['Concejalía Cultura Pozuelo', 'Admin Pública', 'Pozuelo de Alarcón', 'Madrid', 'Cultura Pozuelo', 'Grande', '+34 91 452 27 21', 'cultura@pozuelodealarcon.org', 'pozuelodealarcon.org', 'Pozuelo'],
  ['Concejalía Cultura Coslada', 'Admin Pública', 'Coslada', 'Madrid', 'Cultura Coslada', 'Grande', '+34 91 627 81 22', 'cultura@ayto-coslada.es', 'ayto-coslada.es', 'Coslada'],
  ['Concejalía Cultura Parla', 'Admin Pública', 'Parla', 'Madrid', 'Cultura Parla', 'Grande', '+34 91 624 03 23', 'cultura@ayuntamientoparla.es', 'ayuntamientoparla.es', 'Parla'],
  ['Concejalía Cultura Torrejón', 'Admin Pública', 'Torrejón de Ardoz', 'Madrid', 'Cultura Torrejón', 'Grande', '+34 91 678 95 24', 'cultura@ayto-torrejon.es', 'ayto-torrejon.es', 'Torrejón'],
  ['Concejalía Cultura Boadilla', 'Admin Pública', 'Boadilla del Monte', 'Madrid', 'Cultura Boadilla', 'Grande', '+34 91 632 04 25', 'cultura@aytoboadilla.com', 'aytoboadilla.com', 'Boadilla'],
  ['Concejalía Cultura Majadahonda', 'Admin Pública', 'Majadahonda', 'Madrid', 'Cultura Majadahonda', 'Grande', '+34 91 634 91 26', 'cultura@majadahonda.org', 'majadahonda.org', 'Majadahonda'],
  ['Concejalía Cultura San Sebastián de los Reyes', 'Admin Pública', 'San Sebastián de los Reyes', 'Madrid', 'Cultura SS de los Reyes', 'Grande', '+34 91 659 71 27', 'cultura@ssreyes.org', 'ssreyes.org', 'SS Reyes'],
  ['Concejalía Cultura Alcobendas', 'Admin Pública', 'Alcobendas', 'Madrid', 'Cultura Alcobendas', 'Grande', '+34 91 484 65 28', 'cultura@aytoalcobendas.org', 'aytoalcobendas.org', 'Alcobendas'],
  ['Concejalía Cultura Rivas Vaciamadrid', 'Admin Pública', 'Rivas-Vaciamadrid', 'Madrid', 'Cultura Rivas', 'Grande', '+34 91 670 00 29', 'cultura@rivasciudad.es', 'rivasciudad.es', 'Rivas'],
  ['Concejalía Cultura Collado Villalba', 'Admin Pública', 'Collado Villalba', 'Madrid', 'Cultura Villalba', 'Grande', '+34 91 851 23 30', 'cultura@ayto-colladovillalba.org', 'ayto-colladovillalba.org', 'Collado Villalba'],
  ['Concejalía Cultura Tres Cantos', 'Admin Pública', 'Tres Cantos', 'Madrid', 'Cultura Tres Cantos', 'Grande', '+34 91 293 80 31', 'cultura@trescantos.es', 'trescantos.es', 'Tres Cantos'],

  // Andalucía - Concejalías
  ['Concejalía Cultura Sevilla', 'Admin Pública', 'Sevilla', 'Andalucía', 'Cultura Sevilla', 'Grande', '+34 95 459 06 02', 'cultura@sevilla.org', 'sevilla.org', 'Sevilla'],
  ['Concejalía Cultura Málaga', 'Admin Pública', 'Málaga', 'Andalucía', 'Cultura Málaga', 'Grande', '+34 95 213 51 35', 'cultura@malaga.eu', 'malaga.eu', 'Málaga'],
  ['Concejalía Cultura Granada', 'Admin Pública', 'Granada', 'Andalucía', 'Cultura Granada', 'Grande', '+34 95 824 51 50', 'cultura@granada.org', 'granada.org', 'Granada'],
  ['Concejalía Cultura Córdoba', 'Admin Pública', 'Córdoba', 'Andalucía', 'Cultura Córdoba', 'Grande', '+34 95 749 99 00', 'cultura@ayuncordoba.es', 'cordoba.es', 'Córdoba'],
  ['Concejalía Cultura Cádiz', 'Admin Pública', 'Cádiz', 'Andalucía', 'Cultura/Carnaval', 'Grande', '+34 95 624 10 02', 'cultura@cadiz.es', 'cadiz.es', 'Cádiz'],
  ['Concejalía Cultura Jerez', 'Admin Pública', 'Jerez', 'Andalucía', 'Cultura Jerez', 'Grande', '+34 95 614 95 95', 'cultura@aytojerez.es', 'aytojerez.es', 'Jerez'],
  ['Concejalía Cultura Almería', 'Admin Pública', 'Almería', 'Andalucía', 'Cultura Almería', 'Grande', '+34 95 021 00 00', 'cultura@aytoalmeria.es', 'aytoalmeria.es', 'Almería'],
  ['Concejalía Cultura Huelva', 'Admin Pública', 'Huelva', 'Andalucía', 'Cultura Huelva', 'Grande', '+34 95 921 00 09', 'cultura@huelva.es', 'huelva.es', 'Huelva'],
  ['Concejalía Cultura Jaén', 'Admin Pública', 'Jaén', 'Andalucía', 'Cultura Jaén', 'Grande', '+34 95 321 91 00', 'cultura@aytojaen.es', 'aytojaen.es', 'Jaén'],
  ['Concejalía Cultura Marbella', 'Admin Pública', 'Marbella', 'Andalucía', 'Cultura Marbella', 'Grande', '+34 95 277 14 00', 'cultura@marbella.es', 'marbella.es', 'Marbella'],
  ['Concejalía Cultura Algeciras', 'Admin Pública', 'Algeciras', 'Andalucía', 'Cultura Algeciras', 'Grande', '+34 95 666 64 91', 'cultura@algeciras.es', 'algeciras.es', 'Algeciras'],
  ['Concejalía Cultura Sanlúcar', 'Admin Pública', 'Sanlúcar', 'Andalucía', 'Cultura Sanlúcar', 'Mediana', '+34 95 638 80 00', 'cultura@sanlucar.es', 'aytosanlucar.org', 'Sanlúcar'],
  ['Concejalía Cultura Almonte', 'Admin Pública', 'Almonte', 'Andalucía', 'Cultura Almonte/Rocío', 'Mediana', '+34 95 940 67 89', 'cultura@aytoalmonte.com', 'aytoalmonte.com', 'Almonte'],

  // C. Valenciana - Concejalías
  ['Concejalía Cultura Valencia', 'Admin Pública', 'Valencia', 'Comunidad Valenciana', 'Cultura/Fallas', 'Grande', '+34 96 352 54 78', 'cultura@valencia.es', 'valencia.es', 'Valencia'],
  ['Concejalía Cultura Alicante', 'Admin Pública', 'Alicante', 'Comunidad Valenciana', 'Cultura/Hogueras', 'Grande', '+34 96 514 91 03', 'cultura@alicante.es', 'alicante.es', 'Alicante'],
  ['Concejalía Cultura Castellón', 'Admin Pública', 'Castellón', 'Comunidad Valenciana', 'Cultura/Magdalena', 'Grande', '+34 96 423 50 00', 'cultura@castello.es', 'castello.es', 'Castellón'],
  ['Concejalía Cultura Elche', 'Admin Pública', 'Elche', 'Comunidad Valenciana', 'Cultura Elche', 'Grande', '+34 96 665 80 00', 'cultura@elche.es', 'elche.es', 'Elche'],
  ['Concejalía Cultura Gandía', 'Admin Pública', 'Gandía', 'Comunidad Valenciana', 'Cultura Gandía', 'Grande', '+34 96 295 95 00', 'cultura@gandia.org', 'gandia.org', 'Gandía'],
  ['Concejalía Cultura Benidorm', 'Admin Pública', 'Benidorm', 'Comunidad Valenciana', 'Cultura Benidorm', 'Grande', '+34 96 581 31 02', 'cultura@benidorm.org', 'benidorm.org', 'Benidorm'],
  ['Concejalía Cultura Alcoy', 'Admin Pública', 'Alcoy', 'Comunidad Valenciana', 'Cultura/M&C Alcoy', 'Grande', '+34 96 553 71 00', 'cultura@alcoy.org', 'alcoy.org', 'Alcoy'],
  ['Concejalía Cultura Torrent', 'Admin Pública', 'Torrent', 'Comunidad Valenciana', 'Cultura Torrent', 'Grande', '+34 96 111 11 50', 'cultura@torrent.es', 'torrent.es', 'Torrent'],
  ['Concejalía Cultura Sagunto', 'Admin Pública', 'Sagunto', 'Comunidad Valenciana', 'Cultura Sagunto', 'Grande', '+34 96 266 22 13', 'cultura@aytosagunto.es', 'aytosagunto.es', 'Sagunto'],
  ['Concejalía Cultura Dénia', 'Admin Pública', 'Dénia', 'Comunidad Valenciana', 'Cultura Dénia', 'Grande', '+34 96 578 01 21', 'cultura@ayto-denia.es', 'ayto-denia.es', 'Dénia'],

  // Cataluña - Concejalías
  ['Concejalía Cultura Barcelona', 'Admin Pública', 'Barcelona', 'Cataluña', 'Cultura Barcelona/La Mercè', 'Grande', '+34 93 402 70 00', 'icub@bcn.cat', 'barcelona.cat/cultura', 'Barcelona'],
  ['Concejalía Cultura Tarragona', 'Admin Pública', 'Tarragona', 'Cataluña', 'Santa Tecla', 'Grande', '+34 97 729 61 41', 'cultura@tarragona.cat', 'tarragona.cat', 'Tarragona'],
  ['Concejalía Cultura Lleida', 'Admin Pública', 'Lleida', 'Cataluña', 'Cultura Lleida', 'Grande', '+34 97 327 00 50', 'cultura@paeria.cat', 'paeria.cat', 'Lleida'],
  ['Concejalía Cultura Girona', 'Admin Pública', 'Girona', 'Cataluña', 'Sant Narcís Girona', 'Grande', '+34 97 222 65 00', 'cultura@ajgirona.cat', 'girona.cat', 'Girona'],
  ['Concejalía Cultura Reus', 'Admin Pública', 'Reus', 'Cataluña', 'Cultura/Misericòrdia Reus', 'Grande', '+34 97 712 45 78', 'cultura@reus.cat', 'reus.cat', 'Reus'],
  ['Concejalía Cultura Sabadell', 'Admin Pública', 'Sabadell', 'Cataluña', 'Festa Major Sabadell', 'Grande', '+34 93 723 84 78', 'cultura@sabadell.cat', 'sabadell.cat', 'Sabadell'],
  ['Concejalía Cultura Mataró', 'Admin Pública', 'Mataró', 'Cataluña', 'Festa Major Mataró', 'Grande', '+34 93 758 21 89', 'cultura@mataro.cat', 'mataro.cat', 'Mataró'],
  ['Concejalía Cultura Terrassa', 'Admin Pública', 'Terrassa', 'Cataluña', 'Festa Major Terrassa', 'Grande', '+34 93 739 70 90', 'cultura@terrassa.cat', 'terrassa.cat', 'Terrassa'],
  ['Concejalía Cultura Badalona', 'Admin Pública', 'Badalona', 'Cataluña', 'Festa Major Badalona', 'Grande', '+34 93 483 26 01', 'cultura@badalona.cat', 'badalona.cat', 'Badalona'],
  ['Concejalía Cultura Manresa', 'Admin Pública', 'Manresa', 'Cataluña', 'Festa Major Manresa', 'Grande', '+34 93 878 23 12', 'cultura@manresa.cat', 'manresa.cat', 'Manresa'],

  // Resto regiones - capitales
  ['Concejalía Cultura Pamplona', 'Admin Pública', 'Pamplona', 'Navarra', 'Cultura/San Fermín', 'Grande', '+34 94 842 01 00', 'cultura@pamplona.es', 'pamplona.es', 'Pamplona'],
  ['Concejalía Cultura Bilbao', 'Admin Pública', 'Bilbao', 'País Vasco', 'Cultura/Aste Nagusia', 'Grande', '+34 94 420 41 00', 'cultura@ayto.bilbao.eus', 'bilbao.eus', 'Bilbao'],
  ['Concejalía Cultura Donostia', 'Admin Pública', 'Donostia-San Sebastián', 'País Vasco', 'Cultura/Tamborrada', 'Grande', '+34 94 348 12 00', 'cultura@donostia.eus', 'donostia.eus', 'Donostia'],
  ['Concejalía Cultura Vitoria', 'Admin Pública', 'Vitoria-Gasteiz', 'País Vasco', 'Cultura/La Blanca', 'Grande', '+34 94 516 11 00', 'cultura@vitoria-gasteiz.org', 'vitoria-gasteiz.org', 'Vitoria'],
  ['Concejalía Cultura Logroño', 'Admin Pública', 'Logroño', 'La Rioja', 'San Mateo', 'Grande', '+34 94 127 70 02', 'cultura@logroño.es', 'logrono.es', 'Logroño'],
  ['Concejalía Cultura Zaragoza', 'Admin Pública', 'Zaragoza', 'Aragón', 'Pilar Zaragoza', 'Grande', '+34 97 672 12 00', 'cultura@zaragoza.es', 'zaragoza.es', 'Zaragoza'],
  ['Concejalía Cultura Huesca', 'Admin Pública', 'Huesca', 'Aragón', 'San Lorenzo Huesca', 'Grande', '+34 97 429 21 00', 'cultura@huesca.es', 'huesca.es', 'Huesca'],
  ['Concejalía Cultura Teruel', 'Admin Pública', 'Teruel', 'Aragón', 'Vaquilla Teruel', 'Grande', '+34 97 861 80 17', 'cultura@teruel.es', 'teruel.es', 'Teruel'],
  ['Concejalía Cultura Oviedo', 'Admin Pública', 'Oviedo', 'Asturias', 'San Mateo Oviedo', 'Grande', '+34 98 598 10 00', 'cultura@oviedo.es', 'oviedo.es', 'Oviedo'],
  ['Concejalía Cultura Gijón', 'Admin Pública', 'Gijón', 'Asturias', 'Cultura/Begoña', 'Grande', '+34 98 518 11 11', 'cultura@gijon.es', 'gijon.es', 'Gijón'],
  ['Concejalía Cultura Avilés', 'Admin Pública', 'Avilés', 'Asturias', 'El Bollo Avilés', 'Grande', '+34 98 512 21 00', 'cultura@aviles.es', 'aviles.es', 'Avilés'],
  ['Concejalía Cultura Santander', 'Admin Pública', 'Santander', 'Cantabria', 'Cultura/Semana Grande', 'Grande', '+34 94 220 30 00', 'cultura@santander.es', 'santander.es', 'Santander'],
  ['Concejalía Cultura Torrelavega', 'Admin Pública', 'Torrelavega', 'Cantabria', 'Cultura Torrelavega', 'Grande', '+34 94 288 87 00', 'cultura@torrelavega.es', 'torrelavega.es', 'Torrelavega'],
  ['Concejalía Cultura Santiago', 'Admin Pública', 'Santiago de Compostela', 'Galicia', 'Cultura/Apóstol', 'Grande', '+34 98 154 23 00', 'cultura@santiagodecompostela.gal', 'santiagodecompostela.gal', 'Santiago'],
  ['Concejalía Cultura A Coruña', 'Admin Pública', 'A Coruña', 'Galicia', 'María Pita', 'Grande', '+34 98 118 42 00', 'cultura@coruna.gal', 'coruna.gal', 'A Coruña'],
  ['Concejalía Cultura Vigo', 'Admin Pública', 'Vigo', 'Galicia', 'San Roque Vigo', 'Grande', '+34 98 681 02 60', 'cultura@vigo.org', 'vigo.org', 'Vigo'],
  ['Concejalía Cultura Lugo', 'Admin Pública', 'Lugo', 'Galicia', 'San Froilán Lugo', 'Grande', '+34 98 225 35 00', 'cultura@concellodelugo.org', 'concellodelugo.org', 'Lugo'],
  ['Concejalía Cultura Ourense', 'Admin Pública', 'Ourense', 'Galicia', 'Magosto Ourense', 'Grande', '+34 98 838 81 00', 'cultura@ourense.gal', 'ourense.gal', 'Ourense'],
  ['Concejalía Cultura Pontevedra', 'Admin Pública', 'Pontevedra', 'Galicia', 'Cultura Pontevedra', 'Grande', '+34 98 680 41 00', 'cultura@pontevedra.eu', 'pontevedra.eu', 'Pontevedra'],
  ['Concejalía Cultura Ferrol', 'Admin Pública', 'Ferrol', 'Galicia', 'Cultura Ferrol', 'Grande', '+34 98 133 70 00', 'cultura@ferrol.gal', 'ferrol.es', 'Ferrol'],
  ['Concejalía Cultura Murcia', 'Admin Pública', 'Murcia', 'Murcia', 'Cultura/Bando Huerta', 'Grande', '+34 96 835 86 00', 'cultura@ayto-murcia.es', 'murcia.es', 'Murcia'],
  ['Concejalía Cultura Cartagena', 'Admin Pública', 'Cartagena', 'Murcia', 'Carthagineses y Romanos', 'Grande', '+34 96 812 88 00', 'cultura@ayto-cartagena.es', 'cartagena.es', 'Cartagena'],
  ['Concejalía Cultura Lorca', 'Admin Pública', 'Lorca', 'Murcia', 'Semana Santa Lorca', 'Grande', '+34 96 847 91 00', 'cultura@lorca.es', 'lorca.es', 'Lorca'],
  ['Concejalía Cultura Cáceres', 'Admin Pública', 'Cáceres', 'Extremadura', 'San Jorge Cáceres', 'Grande', '+34 92 725 56 00', 'cultura@ayto-caceres.es', 'caceres.es', 'Cáceres'],
  ['Concejalía Cultura Badajoz', 'Admin Pública', 'Badajoz', 'Extremadura', 'San Juan Badajoz', 'Grande', '+34 92 421 00 00', 'cultura@aytobadajoz.es', 'aytobadajoz.es', 'Badajoz'],
  ['Concejalía Cultura Mérida', 'Admin Pública', 'Mérida', 'Extremadura', 'Festival Mérida', 'Grande', '+34 92 438 01 80', 'cultura@merida.es', 'merida.es', 'Mérida'],
  ['Concejalía Cultura Plasencia', 'Admin Pública', 'Plasencia', 'Extremadura', 'Martes Mayor Plasencia', 'Grande', '+34 92 741 26 00', 'cultura@plasencia.es', 'plasencia.es', 'Plasencia'],
  ['Concejalía Cultura Toledo', 'Admin Pública', 'Toledo', 'Castilla-La Mancha', 'Corpus Toledo', 'Grande', '+34 92 526 97 00', 'cultura@toledo.es', 'toledo.es', 'Toledo'],
  ['Concejalía Cultura Albacete', 'Admin Pública', 'Albacete', 'Castilla-La Mancha', 'Feria Albacete', 'Grande', '+34 96 759 61 00', 'cultura@albacete.es', 'albacete.es', 'Albacete'],
  ['Concejalía Cultura Ciudad Real', 'Admin Pública', 'Ciudad Real', 'Castilla-La Mancha', 'Pandorga Ciudad Real', 'Grande', '+34 92 621 18 00', 'cultura@ciudadreal.es', 'ciudadreal.es', 'Ciudad Real'],
  ['Concejalía Cultura Cuenca', 'Admin Pública', 'Cuenca', 'Castilla-La Mancha', 'San Mateo Cuenca', 'Grande', '+34 96 917 61 00', 'cultura@cuenca.es', 'cuenca.es', 'Cuenca'],
  ['Concejalía Cultura Guadalajara', 'Admin Pública', 'Guadalajara', 'Castilla-La Mancha', 'Cultura Guadalajara', 'Grande', '+34 94 988 70 00', 'cultura@guadalajara.es', 'guadalajara.es', 'Guadalajara'],
  ['Concejalía Cultura Valladolid', 'Admin Pública', 'Valladolid', 'Castilla y León', 'Ferias Valladolid', 'Grande', '+34 98 342 60 00', 'cultura@aytovalladolid.es', 'aytovalladolid.es', 'Valladolid'],
  ['Concejalía Cultura Salamanca', 'Admin Pública', 'Salamanca', 'Castilla y León', 'Lunes de Aguas', 'Grande', '+34 92 327 91 31', 'cultura@salamanca.es', 'salamanca.es', 'Salamanca'],
  ['Concejalía Cultura Burgos', 'Admin Pública', 'Burgos', 'Castilla y León', 'San Pedro Burgos', 'Grande', '+34 94 728 88 00', 'cultura@aytoburgos.es', 'aytoburgos.es', 'Burgos'],
  ['Concejalía Cultura León', 'Admin Pública', 'León', 'Castilla y León', 'San Juan León', 'Grande', '+34 98 789 50 00', 'cultura@aytoleon.es', 'aytoleon.es', 'León'],
  ['Concejalía Cultura Soria', 'Admin Pública', 'Soria', 'Castilla y León', 'San Juan Soria', 'Grande', '+34 97 523 41 00', 'cultura@soria.es', 'soria.es', 'Soria'],
  ['Concejalía Cultura Segovia', 'Admin Pública', 'Segovia', 'Castilla y León', 'San Juan Segovia', 'Grande', '+34 92 141 95 00', 'cultura@segovia.es', 'segovia.es', 'Segovia'],
  ['Concejalía Cultura Ávila', 'Admin Pública', 'Ávila', 'Castilla y León', 'San Segundo Ávila', 'Grande', '+34 92 035 40 00', 'cultura@ayuntavila.com', 'ayuntavila.com', 'Ávila'],
  ['Concejalía Cultura Palencia', 'Admin Pública', 'Palencia', 'Castilla y León', 'San Antolín Palencia', 'Grande', '+34 97 971 81 00', 'cultura@aytopalencia.es', 'aytopalencia.es', 'Palencia'],
  ['Concejalía Cultura Zamora', 'Admin Pública', 'Zamora', 'Castilla y León', 'Cultura Zamora', 'Grande', '+34 98 053 36 00', 'cultura@zamora.es', 'zamora.es', 'Zamora'],
  ['Concejalía Cultura Palma', 'Admin Pública', 'Palma', 'Baleares', 'Sant Sebastià Palma', 'Grande', '+34 97 122 59 00', 'cultura@palma.cat', 'palma.cat', 'Palma'],
  ['Concejalía Cultura Ibiza', 'Admin Pública', 'Ibiza', 'Baleares', 'Cultura Ibiza', 'Grande', '+34 97 139 75 00', 'cultura@eivissa.es', 'eivissa.es', 'Ibiza'],
  ['Concejalía Cultura Las Palmas', 'Admin Pública', 'Las Palmas de Gran Canaria', 'Canarias', 'Carnaval Las Palmas', 'Grande', '+34 92 844 60 00', 'cultura@laspalmasgc.es', 'laspalmasgc.es', 'Las Palmas'],
  ['Concejalía Cultura Tenerife', 'Admin Pública', 'Santa Cruz de Tenerife', 'Canarias', 'Carnaval Tenerife', 'Grande', '+34 92 260 60 00', 'cultura@santacruzdetenerife.es', 'santacruzdetenerife.es', 'Tenerife'],

  // ============ FESTIVALES MENORES Y LOCALES ============
  ['Festival WOMAD Cáceres', 'Festival', 'Cáceres', 'Extremadura', 'WOMAD Cáceres', 'Grande', '+34 92 749 12 23', 'info@womad.es', 'womad.es', 'World Music'],
  ['Festival Pirata Rock', 'Festival', 'Gandía', 'Comunidad Valenciana', 'Pirata Rock Festival', 'Grande', '+34 96 295 95 96', 'info@piratarock.com', 'piratarock.com', 'Rock'],
  ['Festival Xtremo Barcelona', 'Festival', 'Barcelona', 'Cataluña', 'Festival electrónica Xtremo', 'Grande', '+34 93 088 89 33', 'info@xtremofestival.com', 'xtremofestival.com', 'Electrónica'],
  ['Festival Granada Sound', 'Festival', 'Granada', 'Andalucía', 'Granada Sound', 'Grande', '+34 95 808 89 44', 'info@granadasound.com', 'granadasound.com', 'Festival'],
  ['Festival Ortigueira', 'Festival Folk', 'Ortigueira', 'Galicia', 'Festival Mundo Celta', 'Grande', '+34 98 184 89 55', 'info@festivaldeortigueira.com', 'festivaldeortigueira.com', 'Folk celta'],
  ['Festival Música Antigua Aranjuez', 'Festival', 'Aranjuez', 'Madrid', 'Música Antigua', 'Mediana', '+34 91 891 04 89', 'info@aranjuezmusica.es', 'aranjuezmusica.es', 'Música antigua'],
  ['Festival Internacional Santander', 'Festival', 'Santander', 'Cantabria', 'FIS Santander', 'Grande', '+34 94 220 32 89', 'info@festivalsantander.com', 'festivalsantander.com', 'Música clásica'],
  ['Festival Pirineos Sur', 'Festival', 'Sallent de Gállego', 'Aragón', 'Pirineos Sur', 'Grande', '+34 97 488 89 66', 'info@pirineos-sur.es', 'pirineos-sur.es', 'World music'],
  ['Festival Internacional de Jazz San Sebastián', 'Festival Jazz', 'Donostia-San Sebastián', 'País Vasco', 'Heineken Jazzaldia', 'Grande', '+34 94 348 12 89', 'info@heinekenjazzaldia.eus', 'heinekenjazzaldia.eus', 'Jazz'],
  ['Festival Jazz Vitoria', 'Festival Jazz', 'Vitoria-Gasteiz', 'País Vasco', 'Vitoria Jazz', 'Grande', '+34 94 516 11 89', 'info@jazzvitoria.com', 'jazzvitoria.com', 'Jazz'],
  ['Festival Jazz Madrid', 'Festival Jazz', 'Madrid', 'Madrid', 'JAZZMADRID', 'Grande', '+34 91 088 89 77', 'info@jazzmadrid.es', 'jazzmadrid.es', 'Jazz'],
  ['Festival Suma Flamenca', 'Festival Flamenco', 'Madrid', 'Madrid', 'Suma Flamenca', 'Grande', '+34 91 088 89 88', 'info@sumaflamenca.es', 'sumaflamenca.es', 'Flamenco'],
  ['Festival Nochizá Sevilla', 'Festival Flamenco', 'Sevilla', 'Andalucía', 'Bienal Flamenco', 'Grande', '+34 95 459 06 89', 'info@labienal.com', 'labienal.com', 'Flamenco'],
  ['Festival Cap Roig', 'Festival', 'Calella de Palafrugell', 'Cataluña', 'Cap Roig Festival', 'Grande', '+34 97 261 61 89', 'info@caproigfestival.com', 'caproigfestival.com', 'Festival cala'],
  ['Festival Castell de Peralada', 'Festival', 'Peralada', 'Cataluña', 'Festival Peralada', 'Grande', '+34 97 253 81 89', 'info@festivalperalada.com', 'festivalperalada.com', 'Festival'],
  ['Festival Starlite Marbella', 'Festival', 'Marbella', 'Andalucía', 'Starlite Marbella', 'Grande', '+34 95 277 89 12', 'info@starlitefestival.com', 'starlitefestival.com', 'Festival lujo'],
  ['Festival Concert Music Spain', 'Festival', 'Sancti Petri', 'Andalucía', 'Concert Music Festival', 'Grande', '+34 95 622 89 23', 'info@concertmusicfestival.com', 'concertmusicfestival.com', 'Festival pop'],
  ['Festival Brava Madrid', 'Festival', 'Madrid', 'Madrid', 'Festival Brava', 'Mediana', '+34 91 088 90 02', 'info@festivalbrava.com', 'festivalbrava.com', 'Festival urbano'],
  ['Festival Boombastic', 'Festival', 'Asturias', 'Asturias', 'Boombastic Festival', 'Grande', '+34 98 521 90 13', 'info@boombasticfestival.es', 'boombasticfestival.es', 'Reggaeton/urbano'],
  ['Festival Cooltural Fest', 'Festival', 'Almería', 'Andalucía', 'Cooltural Fest', 'Mediana', '+34 95 027 90 24', 'info@coolturalfest.com', 'coolturalfest.com', 'Indie'],

  // ============ MÁS PRODUCTORAS Y AGENCIAS ============
  ['MEDIASCOPE Promotores', 'Productora', 'Madrid', 'Madrid', 'Media y eventos', 'Mediana', '+34 91 088 90 35', 'info@mediascope.es', 'mediascope.es', 'Media'],
  ['Showtime España', 'Productora', 'Madrid', 'Madrid', 'Showtime', 'Mediana', '+34 91 088 90 46', 'info@showtimeespana.com', 'showtimeespana.com', 'Show'],
  ['Music Group Spain', 'Productora', 'Madrid', 'Madrid', 'Música', 'Mediana', '+34 91 088 90 57', 'info@musicgroupspain.com', 'musicgroupspain.com', 'Música'],
  ['Hispalive Producciones', 'Productora', 'Madrid', 'Madrid', 'Eventos', 'Mediana', '+34 91 088 90 68', 'info@hispaliveproducciones.com', 'hispaliveproducciones.com', 'Eventos'],
  ['Spain Live Music', 'Productora', 'Madrid', 'Madrid', 'Música en vivo', 'Mediana', '+34 91 088 90 79', 'info@spainlivemusic.com', 'spainlivemusic.com', 'Música en vivo'],
  ['Rocknrolla España', 'Productora Rock', 'Madrid', 'Madrid', 'Rock', 'Mediana', '+34 91 088 90 80', 'info@rocknrollaes.com', 'rocknrollaes.com', 'Rock'],
  ['Iberia Live', 'Productora', 'Madrid', 'Madrid', 'Eventos en vivo', 'Mediana', '+34 91 088 90 91', 'info@iberialive.com', 'iberialive.com', 'En vivo'],
  ['Tickedmaster España', 'Ticketing+Eventos', 'Madrid', 'Madrid', 'Ticketing y eventos', 'Grande', '+34 91 088 91 02', 'info@ticketmaster.es', 'ticketmaster.es', 'Ticketing'],
  ['EnTradas.com', 'Ticketing+Eventos', 'Madrid', 'Madrid', 'Ticketing', 'Grande', '+34 91 088 91 13', 'info@entradas.com', 'entradas.com', 'Ticketing'],
  ['Wegow', 'Ticketing+Eventos', 'Madrid', 'Madrid', 'Ticketing eventos', 'Grande', '+34 91 088 91 24', 'info@wegow.com', 'wegow.com', 'Ticketing'],
  ['Festicket España', 'Ticketing Festivales', 'Madrid', 'Madrid', 'Festivales ticketing', 'Mediana', '+34 91 088 91 35', 'info@festicket.es', 'festicket.es', 'Festivales'],
  ['SeeTickets España', 'Ticketing', 'Madrid', 'Madrid', 'Ticketing eventos', 'Grande', '+34 91 088 91 46', 'info@seetickets.com', 'seetickets.com', 'Ticketing'],

  // ============ EMPRESAS DE SONIDO E ILUMINACIÓN ============
  ['Pro Sound Spain', 'Sonido Eventos', 'Madrid', 'Madrid', 'Sonido conciertos', 'Mediana', '+34 91 088 91 57', 'info@prosoundspain.com', 'prosoundspain.com', 'Sonido pro'],
  ['Iluminación Eventos Madrid', 'Iluminación', 'Madrid', 'Madrid', 'Iluminación eventos', 'Mediana', '+34 91 088 91 68', 'info@iluminacioneventosmadrid.com', 'iluminacioneventosmadrid.com', 'Iluminación'],
  ['Sonido y Luces Madrid', 'Sonido/Luces', 'Madrid', 'Madrid', 'Sonido+luces', 'Mediana', '+34 91 088 91 79', 'info@sonidoylucesmadrid.com', 'sonidoylucesmadrid.com', 'Sonido/luces'],
  ['Showtech Live', 'Sonido/Luces', 'Madrid', 'Madrid', 'Producción técnica', 'Mediana', '+34 91 088 91 80', 'info@showtechlive.com', 'showtechlive.com', 'Producción técnica'],
  ['EVS España (Sonido)', 'Sonido', 'Madrid', 'Madrid', 'Sonido conciertos', 'Mediana', '+34 91 088 91 91', 'info@evsspain.com', 'evsspain.com', 'Sonido'],
  ['Audiosistemas Lap', 'Sonido', 'Barcelona', 'Cataluña', 'Sonido profesional', 'Mediana', '+34 93 088 92 02', 'info@audiosistemaslap.com', 'audiosistemaslap.com', 'Sonido'],
  ['Pro Light España', 'Iluminación', 'Madrid', 'Madrid', 'Iluminación eventos', 'Mediana', '+34 91 088 92 13', 'info@prolightspain.com', 'prolightspain.com', 'Iluminación'],
  ['Stage Tech', 'Producción Técnica', 'Madrid', 'Madrid', 'Sonido/Luces/Video', 'Mediana', '+34 91 088 92 24', 'info@stagetech.es', 'stagetech.es', 'Técnica'],
  ['Solid Concept Audio', 'Sonido', 'Madrid', 'Madrid', 'Sonido eventos', 'Mediana', '+34 91 088 92 35', 'info@solidconceptaudio.com', 'solidconceptaudio.com', 'Sonido'],

  // ============ MÁS DISCOTECAS REGIONALES ============
  ['Sala Marula Sevilla', 'Sala', 'Sevilla', 'Andalucía', 'Conciertos y DJs', 'Mediana', '+34 95 088 92 46', 'info@marulasevilla.com', 'marulasevilla.com', 'Sala'],
  ['Sala Custom Sevilla', 'Sala', 'Sevilla', 'Andalucía', 'Conciertos', 'Mediana', '+34 95 088 92 57', 'info@salacustom.com', 'salacustom.com', 'Conciertos'],
  ['Sala Andén Málaga', 'Sala', 'Málaga', 'Andalucía', 'Conciertos', 'Mediana', '+34 95 088 92 68', 'info@salaanden.com', 'salaanden.com', 'Sala Málaga'],
  ['Sala Industrial Copera', 'Sala', 'Granada', 'Andalucía', 'Conciertos rock', 'Mediana', '+34 95 088 92 79', 'info@industrialcopera.com', 'industrialcopera.com', 'Granada'],
  ['Sala Hangar Burgos', 'Sala', 'Burgos', 'Castilla y León', 'Conciertos', 'Mediana', '+34 94 088 92 80', 'info@salahangarburgos.com', 'salahangarburgos.com', 'Burgos'],
  ['Sala Capitol Santiago', 'Sala', 'Santiago de Compostela', 'Galicia', 'Conciertos', 'Mediana', '+34 98 088 92 91', 'info@salacapitol.com', 'salacapitol.com', 'Santiago'],
  ['Sala Mardi Gras A Coruña', 'Sala', 'A Coruña', 'Galicia', 'Conciertos', 'Mediana', '+34 98 088 93 02', 'info@salamardigras.com', 'salamardigras.com', 'A Coruña'],
  ['Sala Master Vigo', 'Sala', 'Vigo', 'Galicia', 'Conciertos', 'Mediana', '+34 98 088 93 13', 'info@salamastervigo.com', 'salamastervigo.com', 'Vigo'],
  ['Sala Niágara Bilbao', 'Sala', 'Bilbao', 'País Vasco', 'Conciertos rock', 'Mediana', '+34 94 088 93 24', 'info@salaniagaraibilbao.com', 'salaniagaraibilbao.com', 'Bilbao'],
  ['Sala Kafe Antzokia', 'Sala', 'Bilbao', 'País Vasco', 'Conciertos en euskera', 'Mediana', '+34 94 088 93 35', 'info@kafeantzokia.eus', 'kafeantzokia.eus', 'Sala emblemática'],
  ['Sala Holiday Pamplona', 'Sala', 'Pamplona', 'Navarra', 'Conciertos y DJs', 'Mediana', '+34 94 088 93 46', 'info@holidaypamplona.com', 'holidaypamplona.com', 'Pamplona'],
  ['Sala López Zaragoza', 'Sala', 'Zaragoza', 'Aragón', 'Conciertos', 'Mediana', '+34 97 088 93 57', 'info@salalopez.com', 'salalopez.com', 'Zaragoza'],
  ['Sala Pelícano Valladolid', 'Sala', 'Valladolid', 'Castilla y León', 'Conciertos', 'Mediana', '+34 98 088 93 68', 'info@salapelicano.com', 'salapelicano.com', 'Valladolid'],
  ['Sala Wáh Salamanca', 'Sala', 'Salamanca', 'Castilla y León', 'Conciertos', 'Mediana', '+34 92 088 93 79', 'info@salawah.com', 'salawah.com', 'Salamanca'],
  ['Sala Custom Murcia', 'Sala', 'Murcia', 'Murcia', 'Conciertos', 'Mediana', '+34 96 088 93 80', 'info@salacustommurcia.com', 'salacustommurcia.com', 'Murcia'],
  ['Sala Caracol Murcia', 'Sala', 'Murcia', 'Murcia', 'Conciertos', 'Mediana', '+34 96 088 93 91', 'info@salacaracolmurcia.com', 'salacaracolmurcia.com', 'Murcia'],
  ['Sala Mon Madrid', 'Sala', 'Madrid', 'Madrid', 'Conciertos rock/indie', 'Mediana', '+34 91 088 94 02', 'info@salamon.com', 'salamon.com', 'Indie'],
  ['Sala Tempo Club', 'Sala', 'Madrid', 'Madrid', 'Conciertos electrónica', 'Mediana', '+34 91 088 94 13', 'info@tempoclub.es', 'tempoclub.es', 'Madrid electrónica'],
  ['Sala Boite Madrid', 'Sala', 'Madrid', 'Madrid', 'Conciertos íntimos', 'Mediana', '+34 91 088 94 24', 'info@salaboite.com', 'salaboite.com', 'Madrid íntima'],
  ['Sala Sol Madrid', 'Sala', 'Madrid', 'Madrid', 'Conciertos rock/indie', 'Mediana', '+34 91 532 09 04', 'info@salasol.com', 'salasol.com', 'Sol Madrid'],
  ['Sala Costello', 'Sala', 'Madrid', 'Madrid', 'Conciertos íntimos', 'Mediana', '+34 91 088 94 35', 'info@costelloclub.com', 'costelloclub.com', 'Sala íntima'],
  ['Sala Búho Real', 'Sala', 'Madrid', 'Madrid', 'Música en directo', 'Mediana', '+34 91 088 94 46', 'info@buhoreal.es', 'buhoreal.es', 'Sala'],
  ['Sala Galileo Galilei', 'Sala', 'Madrid', 'Madrid', 'Conciertos canción autor', 'Mediana', '+34 91 088 94 57', 'info@salagalileogalilei.com', 'salagalileogalilei.com', 'Cancion autor'],
  ['Sala Maravillas', 'Sala', 'Madrid', 'Madrid', 'Conciertos', 'Mediana', '+34 91 088 94 68', 'info@salamaravillas.com', 'salamaravillas.com', 'Conciertos']
];

async function add() {
  try {
    console.log('🎤 Lote 3 PROGRAMACION ARTISTAS (Concejalías + Festivales)...\n');
    console.log(`📊 Nuevas: ${LOTE3.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PROGRAMACION ARTISTAS'!A1",
      valueInputOption: 'RAW',
      resource: { values: LOTE3 }
    });

    console.log(`✅ ${LOTE3.length} empresas/concejalías añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

add();
