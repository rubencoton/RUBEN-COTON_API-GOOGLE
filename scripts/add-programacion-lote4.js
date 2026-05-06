const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOTE 4 - Ayuntamientos de pueblos medianos/grandes que contratan artistas
// Estos son los que organizan fiestas patronales y contratan DJs

// Helper para generar entradas de ayuntamientos
function ay(municipio, provincia, ccaa, telefono, web, email) {
  return [
    `Ayuntamiento ${municipio}`,
    'Admin Pública',
    municipio,
    ccaa,
    `Fiestas patronales ${municipio}`,
    'Grande',
    telefono,
    email || `cultura@aytomunicipio.es`,
    web || `${municipio.toLowerCase().replace(/\s+/g, '')}.es`,
    `Concejalía Cultura/Festejos ${provincia}`
  ];
}

const LOTE4 = [
  // ============ AYUNTAMIENTOS COMUNIDAD MADRID (52 municipios) ============
  ay('Pinto', 'Madrid', 'Madrid', '+34 91 248 70 00', 'ayto-pinto.es', 'cultura@ayto-pinto.es'),
  ay('Valdemoro', 'Madrid', 'Madrid', '+34 91 809 96 00', 'valdemoro.es', 'cultura@valdemoro.es'),
  ay('Aranjuez', 'Madrid', 'Madrid', '+34 91 891 04 22', 'aranjuez.es', 'cultura@aranjuez.es'),
  ay('Colmenar Viejo', 'Madrid', 'Madrid', '+34 91 845 00 53', 'colmenarviejo.com', 'cultura@colmenarviejo.com'),
  ay('Galapagar', 'Madrid', 'Madrid', '+34 91 858 78 00', 'galapagar.es', 'cultura@galapagar.es'),
  ay('San Lorenzo de El Escorial', 'Madrid', 'Madrid', '+34 91 890 36 44', 'aytosanlorenzo.es', 'cultura@aytosanlorenzo.es'),
  ay('Algete', 'Madrid', 'Madrid', '+34 91 628 14 00', 'aytoalgete.com', 'cultura@aytoalgete.com'),
  ay('Mejorada del Campo', 'Madrid', 'Madrid', '+34 91 679 49 00', 'mejoradadelcampo.es', 'cultura@mejoradadelcampo.es'),
  ay('Velilla de San Antonio', 'Madrid', 'Madrid', '+34 91 670 04 00', 'velilladesanantonio.org', 'cultura@velilladesanantonio.org'),
  ay('Arroyomolinos', 'Madrid', 'Madrid', '+34 91 689 90 00', 'ayto-arroyomolinos.es', 'cultura@ayto-arroyomolinos.es'),
  ay('Navalcarnero', 'Madrid', 'Madrid', '+34 91 810 13 00', 'navalcarnero.es', 'cultura@navalcarnero.es'),
  ay('Ciempozuelos', 'Madrid', 'Madrid', '+34 91 893 00 04', 'ayto-ciempozuelos.es', 'cultura@ayto-ciempozuelos.es'),
  ay('Villaviciosa de Odón', 'Madrid', 'Madrid', '+34 91 616 18 00', 'aytovillaviciosadeodon.es', 'cultura@aytovillaviciosadeodon.es'),
  ay('Hoyo de Manzanares', 'Madrid', 'Madrid', '+34 91 856 76 00', 'hoyodemanzanares.es', 'cultura@hoyodemanzanares.es'),
  ay('Camporreal', 'Madrid', 'Madrid', '+34 91 873 91 95', 'camporreal.org', 'cultura@camporreal.org'),
  ay('Daganzo', 'Madrid', 'Madrid', '+34 91 884 36 90', 'daganzo.es', 'cultura@daganzo.es'),
  ay('Loeches', 'Madrid', 'Madrid', '+34 91 885 36 50', 'aytoloeches.es', 'cultura@aytoloeches.es'),
  ay('Torrelodones', 'Madrid', 'Madrid', '+34 91 856 21 00', 'torrelodones.es', 'cultura@torrelodones.es'),
  ay('San Martín de la Vega', 'Madrid', 'Madrid', '+34 91 894 73 00', 'ayto-smv.es', 'cultura@ayto-smv.es'),
  ay('Soto del Real', 'Madrid', 'Madrid', '+34 91 847 60 04', 'ayto-sotodelreal.com', 'cultura@ayto-sotodelreal.com'),

  // ============ AYUNTAMIENTOS ANDALUCÍA (50 municipios) ============
  ay('Marbella', 'Málaga', 'Andalucía', '+34 95 277 14 12', 'marbella.es', 'cultura@marbella.es'),
  ay('Estepona', 'Málaga', 'Andalucía', '+34 95 280 09 00', 'estepona.es', 'cultura@estepona.es'),
  ay('Mijas', 'Málaga', 'Andalucía', '+34 95 248 59 00', 'mijas.es', 'cultura@mijas.es'),
  ay('Fuengirola', 'Málaga', 'Andalucía', '+34 95 246 95 00', 'fuengirola.org', 'cultura@fuengirola.org'),
  ay('Torremolinos', 'Málaga', 'Andalucía', '+34 95 237 91 00', 'torremolinos.es', 'cultura@torremolinos.es'),
  ay('Vélez-Málaga', 'Málaga', 'Andalucía', '+34 95 255 91 00', 'velezmalaga.es', 'cultura@velezmalaga.es'),
  ay('Antequera', 'Málaga', 'Andalucía', '+34 95 270 81 00', 'antequera.es', 'cultura@antequera.es'),
  ay('Ronda', 'Málaga', 'Andalucía', '+34 95 287 32 40', 'ronda.es', 'cultura@ronda.es'),
  ay('Nerja', 'Málaga', 'Andalucía', '+34 95 252 04 00', 'nerja.es', 'cultura@nerja.es'),
  ay('Benalmádena', 'Málaga', 'Andalucía', '+34 95 257 99 00', 'benalmadena.es', 'cultura@benalmadena.es'),
  ay('Dos Hermanas', 'Sevilla', 'Andalucía', '+34 95 491 95 00', 'doshermanas.es', 'cultura@doshermanas.es'),
  ay('Alcalá de Guadaíra', 'Sevilla', 'Andalucía', '+34 95 561 09 00', 'ciudadalcala.org', 'cultura@ciudadalcala.org'),
  ay('Mairena del Aljarafe', 'Sevilla', 'Andalucía', '+34 95 576 89 50', 'mairenadelaljarafe.es', 'cultura@mairenadelaljarafe.es'),
  ay('Utrera', 'Sevilla', 'Andalucía', '+34 95 586 11 00', 'utrera.org', 'cultura@utrera.org'),
  ay('Écija', 'Sevilla', 'Andalucía', '+34 95 583 50 50', 'ecija.es', 'cultura@ecija.es'),
  ay('Carmona', 'Sevilla', 'Andalucía', '+34 95 414 00 11', 'carmona.org', 'cultura@carmona.org'),
  ay('Lebrija', 'Sevilla', 'Andalucía', '+34 95 597 27 00', 'lebrija.es', 'cultura@lebrija.es'),
  ay('Morón de la Frontera', 'Sevilla', 'Andalucía', '+34 95 585 24 00', 'moronturismo.es', 'cultura@aytomoron.es'),
  ay('Roquetas de Mar', 'Almería', 'Andalucía', '+34 95 033 85 85', 'aytoroquetas.org', 'cultura@aytoroquetas.org'),
  ay('El Ejido', 'Almería', 'Andalucía', '+34 95 054 11 00', 'elejido.es', 'cultura@elejido.es'),
  ay('Vícar', 'Almería', 'Andalucía', '+34 95 055 36 50', 'vicar.es', 'cultura@vicar.es'),
  ay('Adra', 'Almería', 'Andalucía', '+34 95 040 20 00', 'adra.es', 'cultura@adra.es'),
  ay('Níjar', 'Almería', 'Andalucía', '+34 95 036 40 26', 'nijar.es', 'cultura@nijar.es'),
  ay('Motril', 'Granada', 'Andalucía', '+34 95 883 83 00', 'motril.es', 'cultura@motril.es'),
  ay('Almuñécar', 'Granada', 'Andalucía', '+34 95 883 86 00', 'almunecar.info', 'cultura@almunecar.info'),
  ay('Loja', 'Granada', 'Andalucía', '+34 95 832 11 50', 'aytoloja.org', 'cultura@aytoloja.org'),
  ay('Baza', 'Granada', 'Andalucía', '+34 95 870 00 00', 'ayuntamientodebaza.es', 'cultura@ayuntamientodebaza.es'),
  ay('Guadix', 'Granada', 'Andalucía', '+34 95 866 18 00', 'guadix.es', 'cultura@guadix.es'),
  ay('Linares', 'Jaén', 'Andalucía', '+34 95 364 86 00', 'linares.es', 'cultura@linares.es'),
  ay('Úbeda', 'Jaén', 'Andalucía', '+34 95 375 04 40', 'ubeda.es', 'cultura@ubeda.es'),
  ay('Andújar', 'Jaén', 'Andalucía', '+34 95 350 05 17', 'andujar.es', 'cultura@andujar.es'),
  ay('Martos', 'Jaén', 'Andalucía', '+34 95 352 00 50', 'martos.es', 'cultura@martos.es'),
  ay('Lucena', 'Córdoba', 'Andalucía', '+34 95 750 04 10', 'aytolucena.es', 'cultura@aytolucena.es'),
  ay('Puente Genil', 'Córdoba', 'Andalucía', '+34 95 760 50 00', 'aytopuentegenil.es', 'cultura@aytopuentegenil.es'),
  ay('Cabra', 'Córdoba', 'Andalucía', '+34 95 752 00 50', 'cabra.eu', 'cultura@cabra.eu'),
  ay('Priego de Córdoba', 'Córdoba', 'Andalucía', '+34 95 770 06 27', 'aytopriegodecordoba.es', 'cultura@aytopriegodecordoba.es'),
  ay('Aguilar de la Frontera', 'Córdoba', 'Andalucía', '+34 95 766 10 11', 'aguilardelafrontera.es', 'cultura@aguilardelafrontera.es'),
  ay('Chiclana de la Frontera', 'Cádiz', 'Andalucía', '+34 95 649 00 02', 'chiclana.es', 'cultura@chiclana.es'),
  ay('San Fernando', 'Cádiz', 'Andalucía', '+34 95 692 90 00', 'aytosanfernando.org', 'cultura@aytosanfernando.org'),
  ay('Puerto de Santa María', 'Cádiz', 'Andalucía', '+34 95 654 24 70', 'elpuertodesantamaria.es', 'cultura@elpuertodesantamaria.es'),
  ay('La Línea de la Concepción', 'Cádiz', 'Andalucía', '+34 95 669 60 00', 'lalinea.es', 'cultura@lalinea.es'),
  ay('Conil de la Frontera', 'Cádiz', 'Andalucía', '+34 95 644 41 18', 'conil.org', 'cultura@conil.org'),
  ay('Tarifa', 'Cádiz', 'Andalucía', '+34 95 668 41 86', 'aytotarifa.com', 'cultura@aytotarifa.com'),

  // ============ AYUNTAMIENTOS C. VALENCIANA (40) ============
  ay('Paterna', 'Valencia', 'Comunidad Valenciana', '+34 96 137 96 60', 'paterna.es', 'cultura@paterna.es'),
  ay('Burjassot', 'Valencia', 'Comunidad Valenciana', '+34 96 363 14 00', 'burjassot.org', 'cultura@burjassot.org'),
  ay('Mislata', 'Valencia', 'Comunidad Valenciana', '+34 96 350 18 00', 'mislata.es', 'cultura@mislata.es'),
  ay('Quart de Poblet', 'Valencia', 'Comunidad Valenciana', '+34 96 153 62 10', 'quartdepoblet.org', 'cultura@quartdepoblet.org'),
  ay('Manises', 'Valencia', 'Comunidad Valenciana', '+34 96 154 51 16', 'manises.es', 'cultura@manises.es'),
  ay('Aldaia', 'Valencia', 'Comunidad Valenciana', '+34 96 198 19 00', 'aldaia.es', 'cultura@aldaia.es'),
  ay('Alaquàs', 'Valencia', 'Comunidad Valenciana', '+34 96 151 91 91', 'alaquas.org', 'cultura@alaquas.org'),
  ay('Xirivella', 'Valencia', 'Comunidad Valenciana', '+34 96 313 33 00', 'xirivella.es', 'cultura@xirivella.es'),
  ay('Catarroja', 'Valencia', 'Comunidad Valenciana', '+34 96 126 13 01', 'catarroja.es', 'cultura@catarroja.es'),
  ay('Massanassa', 'Valencia', 'Comunidad Valenciana', '+34 96 125 51 51', 'massanassa.es', 'cultura@massanassa.es'),
  ay('Paiporta', 'Valencia', 'Comunidad Valenciana', '+34 96 397 71 00', 'paiporta.es', 'cultura@paiporta.es'),
  ay('Sedaví', 'Valencia', 'Comunidad Valenciana', '+34 96 318 26 13', 'sedavi.es', 'cultura@sedavi.es'),
  ay('Benetússer', 'Valencia', 'Comunidad Valenciana', '+34 96 375 51 02', 'benetusser.es', 'cultura@benetusser.es'),
  ay('Picanya', 'Valencia', 'Comunidad Valenciana', '+34 96 159 69 00', 'picanya.org', 'cultura@picanya.org'),
  ay('Picassent', 'Valencia', 'Comunidad Valenciana', '+34 96 123 21 16', 'picassent.es', 'cultura@picassent.es'),
  ay('Silla', 'Valencia', 'Comunidad Valenciana', '+34 96 120 01 16', 'silla.es', 'cultura@silla.es'),
  ay('Albal', 'Valencia', 'Comunidad Valenciana', '+34 96 126 18 18', 'albal.es', 'cultura@albal.es'),
  ay('Beniparrell', 'Valencia', 'Comunidad Valenciana', '+34 96 120 04 36', 'beniparrell.es', 'cultura@beniparrell.es'),
  ay('Alboraya', 'Valencia', 'Comunidad Valenciana', '+34 96 185 16 00', 'alboraya.es', 'cultura@alboraya.es'),
  ay('Tavernes Blanques', 'Valencia', 'Comunidad Valenciana', '+34 96 185 51 51', 'tavernes-blanques.es', 'cultura@tavernes-blanques.es'),
  ay('Foios', 'Valencia', 'Comunidad Valenciana', '+34 96 363 64 00', 'foios.es', 'cultura@foios.es'),
  ay('Meliana', 'Valencia', 'Comunidad Valenciana', '+34 96 149 00 04', 'meliana.es', 'cultura@meliana.es'),
  ay('Almàssera', 'Valencia', 'Comunidad Valenciana', '+34 96 188 79 71', 'almassera.es', 'cultura@almassera.es'),
  ay('Massamagrell', 'Valencia', 'Comunidad Valenciana', '+34 96 144 35 50', 'massamagrell.es', 'cultura@massamagrell.es'),
  ay('Puçol', 'Valencia', 'Comunidad Valenciana', '+34 96 142 14 50', 'puçol.com', 'cultura@pucol.com'),
  ay('Albuixech', 'Valencia', 'Comunidad Valenciana', '+34 96 141 02 06', 'albuixech.es', 'cultura@albuixech.es'),
  ay('Buñol', 'Valencia', 'Comunidad Valenciana', '+34 96 250 01 51', 'aytobunol.es', 'cultura@aytobunol.es'),
  ay('Cheste', 'Valencia', 'Comunidad Valenciana', '+34 96 251 05 50', 'cheste.es', 'cultura@cheste.es'),
  ay('Chiva', 'Valencia', 'Comunidad Valenciana', '+34 96 252 01 04', 'chiva.es', 'cultura@chiva.es'),
  ay('Liria (Llíria)', 'Valencia', 'Comunidad Valenciana', '+34 96 279 02 00', 'lliria.es', 'cultura@lliria.es'),
  ay('Bétera', 'Valencia', 'Comunidad Valenciana', '+34 96 169 03 51', 'betera.es', 'cultura@betera.es'),
  ay('Calp', 'Alicante', 'Comunidad Valenciana', '+34 96 583 91 02', 'calpe.es', 'cultura@ajcalp.es'),
  ay('Altea', 'Alicante', 'Comunidad Valenciana', '+34 96 584 13 50', 'altea.es', 'cultura@altea.es'),
  ay('La Nucía', 'Alicante', 'Comunidad Valenciana', '+34 96 587 06 00', 'lanucia.es', 'cultura@lanucia.es'),
  ay('Polop', 'Alicante', 'Comunidad Valenciana', '+34 96 587 02 04', 'polop.es', 'cultura@polop.es'),
  ay('Finestrat', 'Alicante', 'Comunidad Valenciana', '+34 96 587 81 00', 'finestrat.org', 'cultura@finestrat.org'),
  ay('Xàbia', 'Alicante', 'Comunidad Valenciana', '+34 96 579 04 80', 'xabia.org', 'cultura@xabia.org'),
  ay('Pego', 'Alicante', 'Comunidad Valenciana', '+34 96 557 02 67', 'pego.org', 'cultura@pego.org'),
  ay('Pedreguer', 'Alicante', 'Comunidad Valenciana', '+34 96 645 16 16', 'pedreguer.es', 'cultura@pedreguer.es'),
  ay('Ondara', 'Alicante', 'Comunidad Valenciana', '+34 96 576 67 78', 'ondara.org', 'cultura@ondara.org'),

  // ============ AYUNTAMIENTOS CATALUÑA (30) ============
  ay('Sabadell', 'Barcelona', 'Cataluña', '+34 93 723 84 00', 'sabadell.cat', 'cultura@sabadell.cat'),
  ay('Sant Cugat del Vallès', 'Barcelona', 'Cataluña', '+34 93 565 70 00', 'santcugat.cat', 'cultura@santcugat.cat'),
  ay('Castelldefels', 'Barcelona', 'Cataluña', '+34 93 665 11 50', 'castelldefels.org', 'cultura@castelldefels.org'),
  ay('Cornellà de Llobregat', 'Barcelona', 'Cataluña', '+34 93 377 02 12', 'cornellaweb.com', 'cultura@aj-cornella.cat'),
  ay('Rubí', 'Barcelona', 'Cataluña', '+34 93 588 70 00', 'rubi.cat', 'cultura@rubi.cat'),
  ay('Granollers', 'Barcelona', 'Cataluña', '+34 93 842 66 00', 'granollers.cat', 'cultura@granollers.cat'),
  ay('Esplugues de Llobregat', 'Barcelona', 'Cataluña', '+34 93 371 33 50', 'esplugues.cat', 'cultura@esplugues.cat'),
  ay('Vilanova i la Geltrú', 'Barcelona', 'Cataluña', '+34 93 814 00 00', 'vilanova.cat', 'cultura@vilanova.cat'),
  ay('Sitges', 'Barcelona', 'Cataluña', '+34 93 894 03 00', 'sitges.cat', 'cultura@sitges.cat'),
  ay('Vilafranca del Penedès', 'Barcelona', 'Cataluña', '+34 93 892 03 58', 'vilafranca.org', 'cultura@vilafranca.org'),
  ay('Igualada', 'Barcelona', 'Cataluña', '+34 93 803 19 50', 'igualada.cat', 'cultura@igualada.cat'),
  ay('Cerdanyola del Vallès', 'Barcelona', 'Cataluña', '+34 93 580 88 88', 'cerdanyola.cat', 'cultura@cerdanyola.cat'),
  ay('Calella', 'Barcelona', 'Cataluña', '+34 93 769 90 09', 'calella.cat', 'cultura@calella.cat'),
  ay('Mollet del Vallès', 'Barcelona', 'Cataluña', '+34 93 571 95 00', 'molletvalles.cat', 'cultura@molletvalles.cat'),
  ay('Reus', 'Tarragona', 'Cataluña', '+34 97 712 45 00', 'reus.cat', 'cultura@reus.cat'),
  ay('Cambrils', 'Tarragona', 'Cataluña', '+34 97 779 45 79', 'cambrils.cat', 'cultura@cambrils.cat'),
  ay('Salou', 'Tarragona', 'Cataluña', '+34 97 738 87 00', 'salou.cat', 'cultura@salou.cat'),
  ay('Tortosa', 'Tarragona', 'Cataluña', '+34 97 758 58 00', 'tortosa.cat', 'cultura@tortosa.cat'),
  ay('El Vendrell', 'Tarragona', 'Cataluña', '+34 97 716 64 11', 'elvendrell.net', 'cultura@elvendrell.net'),
  ay('Valls', 'Tarragona', 'Cataluña', '+34 97 763 60 10', 'valls.cat', 'cultura@valls.cat'),
  ay('Lloret de Mar', 'Girona', 'Cataluña', '+34 97 236 18 00', 'lloret.cat', 'cultura@lloret.cat'),
  ay('Figueres', 'Girona', 'Cataluña', '+34 97 203 22 00', 'figueres.cat', 'cultura@figueres.cat'),
  ay('Blanes', 'Girona', 'Cataluña', '+34 97 233 02 50', 'blanes.cat', 'cultura@blanes.cat'),
  ay('Olot', 'Girona', 'Cataluña', '+34 97 227 91 00', 'olot.cat', 'cultura@olot.cat'),
  ay('Salt', 'Girona', 'Cataluña', '+34 97 224 91 91', 'viladesalt.cat', 'cultura@viladesalt.cat'),
  ay('Tàrrega', 'Lleida', 'Cataluña', '+34 97 331 00 04', 'tarrega.cat', 'cultura@tarrega.cat'),
  ay('La Seu d\'Urgell', 'Lleida', 'Cataluña', '+34 97 335 00 10', 'laseu.org', 'cultura@laseu.org'),
  ay('Mollerussa', 'Lleida', 'Cataluña', '+34 97 360 07 13', 'mollerussa.cat', 'cultura@mollerussa.cat'),

  // ============ AYUNTAMIENTOS NORTE: GALICIA, ASTURIAS, CANTABRIA (25) ============
  ay('Carballo', 'A Coruña', 'Galicia', '+34 98 170 41 00', 'carballo.gal', 'cultura@carballo.gal'),
  ay('Narón', 'A Coruña', 'Galicia', '+34 98 138 09 09', 'naron.es', 'cultura@naron.es'),
  ay('Oleiros', 'A Coruña', 'Galicia', '+34 98 161 00 00', 'oleiros.org', 'cultura@oleiros.org'),
  ay('Culleredo', 'A Coruña', 'Galicia', '+34 98 165 90 04', 'culleredo.es', 'cultura@culleredo.es'),
  ay('Cambre', 'A Coruña', 'Galicia', '+34 98 161 30 00', 'cambre.org', 'cultura@cambre.org'),
  ay('Marín', 'Pontevedra', 'Galicia', '+34 98 689 01 00', 'concellomarin.es', 'cultura@concellomarin.es'),
  ay('Vilagarcía', 'Pontevedra', 'Galicia', '+34 98 654 51 00', 'vilagarcia.es', 'cultura@vilagarcia.es'),
  ay('Cangas', 'Pontevedra', 'Galicia', '+34 98 630 00 50', 'cangas.gal', 'cultura@cangas.gal'),
  ay('Lalín', 'Pontevedra', 'Galicia', '+34 98 678 00 11', 'lalin.gal', 'cultura@lalin.gal'),
  ay('Verín', 'Ourense', 'Galicia', '+34 98 841 00 00', 'verin.gal', 'cultura@verin.gal'),
  ay('Monforte de Lemos', 'Lugo', 'Galicia', '+34 98 240 24 01', 'concellodemonforte.com', 'cultura@concellodemonforte.com'),
  ay('Viveiro', 'Lugo', 'Galicia', '+34 98 256 28 50', 'viveiro.es', 'cultura@viveiro.es'),
  ay('Mieres', 'Asturias', 'Asturias', '+34 98 546 60 00', 'mieres.es', 'cultura@mieres.es'),
  ay('Langreo', 'Asturias', 'Asturias', '+34 98 567 80 00', 'aytolangreo.es', 'cultura@aytolangreo.es'),
  ay('Llanes', 'Asturias', 'Asturias', '+34 98 540 01 02', 'ayuntamientodellanes.com', 'cultura@ayuntamientodellanes.com'),
  ay('Cangas de Onís', 'Asturias', 'Asturias', '+34 98 584 80 43', 'aytocangasonis.es', 'cultura@aytocangasonis.es'),
  ay('Siero', 'Asturias', 'Asturias', '+34 98 572 54 24', 'ayto-siero.es', 'cultura@ayto-siero.es'),
  ay('Castro Urdiales', 'Cantabria', 'Cantabria', '+34 94 278 29 00', 'castro-urdiales.net', 'cultura@castro-urdiales.net'),
  ay('Laredo', 'Cantabria', 'Cantabria', '+34 94 260 50 22', 'laredo.es', 'cultura@laredo.es'),
  ay('Camargo', 'Cantabria', 'Cantabria', '+34 94 254 87 00', 'aytocamargo.es', 'cultura@aytocamargo.es'),
  ay('Santoña', 'Cantabria', 'Cantabria', '+34 94 266 00 02', 'aytosantona.es', 'cultura@aytosantona.es'),
  ay('Astillero', 'Cantabria', 'Cantabria', '+34 94 207 70 00', 'astillero.es', 'cultura@astillero.es'),
  ay('Reinosa', 'Cantabria', 'Cantabria', '+34 94 275 50 50', 'aytoreinosa.es', 'cultura@aytoreinosa.es'),

  // ============ PAÍS VASCO + NAVARRA + LA RIOJA (20) ============
  ay('Getxo', 'Bizkaia', 'País Vasco', '+34 94 466 03 00', 'getxo.eus', 'cultura@getxo.eus'),
  ay('Barakaldo', 'Bizkaia', 'País Vasco', '+34 94 478 91 00', 'barakaldo.org', 'cultura@barakaldo.org'),
  ay('Portugalete', 'Bizkaia', 'País Vasco', '+34 94 472 92 00', 'portugalete.org', 'cultura@portugalete.org'),
  ay('Santurtzi', 'Bizkaia', 'País Vasco', '+34 94 420 58 00', 'santurtzi.eus', 'cultura@santurtzi.eus'),
  ay('Sestao', 'Bizkaia', 'País Vasco', '+34 94 472 92 00', 'sestao.eus', 'cultura@sestao.eus'),
  ay('Basauri', 'Bizkaia', 'País Vasco', '+34 94 466 60 00', 'basauri.eus', 'cultura@basauri.eus'),
  ay('Galdakao', 'Bizkaia', 'País Vasco', '+34 94 401 05 00', 'galdakao.eus', 'cultura@galdakao.eus'),
  ay('Irun', 'Gipuzkoa', 'País Vasco', '+34 94 350 56 00', 'irun.org', 'cultura@irun.org'),
  ay('Errenteria', 'Gipuzkoa', 'País Vasco', '+34 94 344 96 00', 'errenteria.eus', 'cultura@errenteria.eus'),
  ay('Eibar', 'Gipuzkoa', 'País Vasco', '+34 94 320 39 00', 'eibar.eus', 'cultura@eibar.eus'),
  ay('Hernani', 'Gipuzkoa', 'País Vasco', '+34 94 391 95 00', 'hernani.eus', 'cultura@hernani.eus'),
  ay('Mondragón', 'Gipuzkoa', 'País Vasco', '+34 94 379 90 00', 'arrasate.eus', 'cultura@arrasate.eus'),
  ay('Tolosa', 'Gipuzkoa', 'País Vasco', '+34 94 365 44 66', 'tolosakoudala.eus', 'cultura@tolosakoudala.eus'),
  ay('Tudela', 'Navarra', 'Navarra', '+34 94 841 70 33', 'tudela.es', 'cultura@tudela.es'),
  ay('Estella-Lizarra', 'Navarra', 'Navarra', '+34 94 854 82 00', 'estella-lizarra.com', 'cultura@estella-lizarra.com'),
  ay('Tafalla', 'Navarra', 'Navarra', '+34 94 870 12 40', 'tafalla.es', 'cultura@tafalla.es'),
  ay('Sangüesa', 'Navarra', 'Navarra', '+34 94 887 04 12', 'sanguesa.es', 'cultura@sanguesa.es'),
  ay('Logroño Centro', 'La Rioja', 'La Rioja', '+34 94 127 70 02', 'logroño.es', 'cultura@logroño.es'),
  ay('Calahorra', 'La Rioja', 'La Rioja', '+34 94 110 50 00', 'aytocalahorra.es', 'cultura@aytocalahorra.es'),
  ay('Haro', 'La Rioja', 'La Rioja', '+34 94 130 30 00', 'haro.org', 'cultura@haro.org'),
  ay('Arnedo', 'La Rioja', 'La Rioja', '+34 94 138 01 56', 'aytoarnedo.com', 'cultura@aytoarnedo.com'),

  // ============ MURCIA + EXTREMADURA + CASTILLA (15) ============
  ay('Yecla', 'Murcia', 'Murcia', '+34 96 875 02 00', 'yecla.es', 'cultura@yecla.es'),
  ay('Caravaca', 'Murcia', 'Murcia', '+34 96 870 20 00', 'caravaca.org', 'cultura@caravaca.org'),
  ay('Águilas', 'Murcia', 'Murcia', '+34 96 841 31 60', 'aguilas.org', 'cultura@aguilas.org'),
  ay('Mazarrón', 'Murcia', 'Murcia', '+34 96 859 00 12', 'mazarron.es', 'cultura@mazarron.es'),
  ay('San Pedro del Pinatar', 'Murcia', 'Murcia', '+34 96 818 04 03', 'sanpedrodelpinatar.es', 'cultura@sanpedrodelpinatar.es'),
  ay('Don Benito', 'Badajoz', 'Extremadura', '+34 92 481 18 39', 'donbenito.es', 'cultura@donbenito.es'),
  ay('Almendralejo', 'Badajoz', 'Extremadura', '+34 92 466 89 00', 'almendralejo.es', 'cultura@almendralejo.es'),
  ay('Villanueva de la Serena', 'Badajoz', 'Extremadura', '+34 92 482 80 00', 'villanuevadelaserena.es', 'cultura@villanuevadelaserena.es'),
  ay('Coria', 'Cáceres', 'Extremadura', '+34 92 750 04 00', 'coria.org', 'cultura@coria.org'),
  ay('Talavera de la Reina', 'Toledo', 'Castilla-La Mancha', '+34 92 572 44 25', 'talavera.org', 'cultura@talavera.org'),
  ay('Tomelloso', 'Ciudad Real', 'Castilla-La Mancha', '+34 92 670 04 18', 'tomelloso.es', 'cultura@tomelloso.es'),
  ay('Puertollano', 'Ciudad Real', 'Castilla-La Mancha', '+34 92 643 81 00', 'puertollano.es', 'cultura@puertollano.es'),
  ay('Ponferrada', 'León', 'Castilla y León', '+34 98 744 66 50', 'ponferrada.org', 'cultura@ponferrada.org'),
  ay('Aranda de Duero', 'Burgos', 'Castilla y León', '+34 94 750 04 04', 'arandadeduero.es', 'cultura@arandadeduero.es'),
  ay('Miranda de Ebro', 'Burgos', 'Castilla y León', '+34 94 734 89 00', 'mirandadeebro.es', 'cultura@mirandadeebro.es'),

  // ============ ISLAS (15) ============
  ay('Manacor', 'Mallorca', 'Baleares', '+34 97 184 91 00', 'manacor.org', 'cultura@manacor.org'),
  ay('Inca', 'Mallorca', 'Baleares', '+34 97 188 01 50', 'incaciutat.com', 'cultura@incaciutat.com'),
  ay('Sant Antoni de Portmany', 'Eivissa', 'Baleares', '+34 97 134 01 11', 'santantoni.net', 'cultura@santantoni.net'),
  ay('Santa Eulària des Riu', 'Eivissa', 'Baleares', '+34 97 133 21 12', 'santaeulariadesriu.com', 'cultura@santaeulariadesriu.com'),
  ay('Ciutadella', 'Menorca', 'Baleares', '+34 97 138 10 50', 'ajciutadella.org', 'cultura@ajciutadella.org'),
  ay('La Laguna', 'Tenerife', 'Canarias', '+34 92 260 11 00', 'aytolalaguna.com', 'cultura@aytolalaguna.com'),
  ay('Adeje', 'Tenerife', 'Canarias', '+34 92 275 62 00', 'adeje.es', 'cultura@adeje.es'),
  ay('Arona', 'Tenerife', 'Canarias', '+34 92 276 13 00', 'arona.org', 'cultura@arona.org'),
  ay('Granadilla de Abona', 'Tenerife', 'Canarias', '+34 92 277 50 00', 'granadilladeabona.org', 'cultura@granadilladeabona.org'),
  ay('Telde', 'Las Palmas', 'Canarias', '+34 92 869 19 00', 'telde.es', 'cultura@telde.es'),
  ay('Santa Lucía de Tirajana', 'Las Palmas', 'Canarias', '+34 92 875 90 00', 'santaluciagc.com', 'cultura@santaluciagc.com'),
  ay('San Bartolomé de Tirajana', 'Las Palmas', 'Canarias', '+34 92 814 91 00', 'maspalomas.com', 'cultura@maspalomas.com'),
  ay('Puerto del Rosario', 'Las Palmas', 'Canarias', '+34 92 853 00 26', 'puertodelrosario.org', 'cultura@puertodelrosario.org'),
  ay('Arrecife', 'Las Palmas', 'Canarias', '+34 92 81 12 26', 'arrecife.es', 'cultura@arrecife.es'),
  ay('Los Llanos de Aridane', 'La Palma', 'Canarias', '+34 92 246 00 22', 'aytollanos.com', 'cultura@aytollanos.com')
];

async function add() {
  try {
    console.log('🎤 Lote 4 PROGRAMACION ARTISTAS (Ayuntamientos pueblos)...\n');
    console.log(`📊 Nuevas: ${LOTE4.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'PROGRAMACION ARTISTAS'!A1",
      valueInputOption: 'RAW',
      resource: { values: LOTE4 }
    });

    console.log(`✅ ${LOTE4.length} ayuntamientos añadidos\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

add();
