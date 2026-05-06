const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOTE 2 - Más empresas: hoteles, farma, industrial, regional, biotech, etc.
// Formato: [EMPRESA, SECTOR, CIUDAD, COMUNIDAD, ROL, TAMAÑO, TEL, EMAIL, WEB, NOTA]

const LOTE2 = [
  // ============ HOTELES Y TURISMO ============
  ['Meliá Hotels International', 'Hotelero', 'Palma', 'Baleares', 'AI Hospitality', 'Grande', '+34 97 122 44 64', 'rrhh@melia.com', 'meliahotelsinternational.com', 'AI Customer Experience'],
  ['NH Hotel Group', 'Hotelero', 'Madrid', 'Madrid', 'AI Pricing/Customer', 'Grande', '+34 91 451 97 18', 'rrhh@nh-hotels.com', 'nh-hotels.com', 'AI Pricing'],
  ['RIU Hotels', 'Hotelero', 'Palma', 'Baleares', 'AI Hospitality', 'Grande', '+34 97 174 30 30', 'rrhh@riu.com', 'riu.com', 'AI Hospitality'],
  ['Iberostar', 'Hotelero', 'Palma', 'Baleares', 'AI Hospitality', 'Grande', '+34 97 122 44 60', 'rrhh@iberostar.com', 'iberostar.com', 'AI Hospitality'],
  ['Barceló Hotel Group', 'Hotelero', 'Palma', 'Baleares', 'AI Hospitality', 'Grande', '+34 97 122 19 00', 'rrhh@barcelo.com', 'barcelo.com', 'AI Hospitality'],
  ['H10 Hotels', 'Hotelero', 'Barcelona', 'Cataluña', 'AI Hospitality', 'Grande', '+34 90 010 09 06', 'rrhh@h10hotels.com', 'h10hotels.com', 'AI Hospitality'],
  ['Hotusa Group', 'Hotelero', 'Barcelona', 'Cataluña', 'AI Hospitality', 'Grande', '+34 93 268 18 00', 'rrhh@hotusa.com', 'hotusa.com', 'AI Hospitality'],
  ['Vincci Hoteles', 'Hotelero', 'Madrid', 'Madrid', 'AI Hospitality', 'Grande', '+34 91 432 10 50', 'rrhh@vinccihoteles.com', 'vinccihoteles.com', 'AI Hospitality'],
  ['ILUNION Hoteles', 'Hotelero', 'Madrid', 'Madrid', 'AI Hospitality', 'Grande', '+34 91 312 86 00', 'rrhh@ilunion.com', 'ilunionhotels.com', 'AI Hospitality'],
  ['Catalonia Hotels', 'Hotelero', 'Barcelona', 'Cataluña', 'AI Hospitality', 'Grande', '+34 93 318 64 22', 'rrhh@cataloniahotels.com', 'cataloniahotels.com', 'AI Hospitality'],
  ['Be Live Hotels', 'Hotelero', 'Madrid', 'Madrid', 'AI Hospitality', 'Grande', '+34 91 088 17 17', 'rrhh@belivehotels.com', 'belivehotels.com', 'AI Hospitality'],
  ['Hesperia Hotels', 'Hotelero', 'Barcelona', 'Cataluña', 'AI Hospitality', 'Grande', '+34 93 320 76 36', 'rrhh@hesperia.com', 'hesperia.com', 'AI Hospitality'],

  // ============ FARMA / BIOTECH ADICIONAL ============
  ['AstraZeneca España', 'Farma', 'Madrid', 'Madrid', 'AI R&D', 'Grande', '+34 91 301 91 00', 'rrhh@astrazeneca.com', 'astrazeneca.es', 'AI R&D'],
  ['Merck España', 'Farma', 'Madrid', 'Madrid', 'AI Pharma', 'Grande', '+34 91 745 44 00', 'rrhh.spain@merck.com', 'merck.es', 'AI Pharma'],
  ['Bristol Myers Squibb', 'Farma', 'Madrid', 'Madrid', 'AI Drug Discovery', 'Grande', '+34 91 456 53 00', 'rrhh.spain@bms.com', 'bms.com', 'AI Discovery'],
  ['GlaxoSmithKline España', 'Farma', 'Tres Cantos', 'Madrid', 'AI Pharma', 'Grande', '+34 91 807 03 00', 'rrhh.spain@gsk.com', 'gsk.es', 'AI Pharma'],
  ['Janssen España', 'Farma', 'Madrid', 'Madrid', 'AI Drug Research', 'Grande', '+34 91 722 81 00', 'rrhh.spain@janssen.com', 'janssen.com', 'AI Pharma'],
  ['Novo Nordisk España', 'Farma', 'Madrid', 'Madrid', 'AI Diabetes', 'Grande', '+34 91 522 04 80', 'rrhh.spain@novonordisk.com', 'novonordisk.es', 'AI Health'],
  ['Eli Lilly España', 'Farma', 'Alcobendas', 'Madrid', 'AI Pharma', 'Grande', '+34 91 663 50 00', 'rrhh.spain@lilly.com', 'lilly.es', 'AI Pharma'],
  ['Teva Pharma España', 'Farma', 'Madrid', 'Madrid', 'AI Pharma', 'Grande', '+34 91 387 32 80', 'rrhh.spain@teva.com', 'tevafarmaceutica.es', 'AI Pharma'],
  ['Esteve Pharmaceuticals', 'Farma', 'Barcelona', 'Cataluña', 'AI Pharma', 'Grande', '+34 93 446 60 00', 'rrhh@esteve.com', 'esteve.com', 'AI Pharma'],
  ['Lacer España', 'Farma', 'Barcelona', 'Cataluña', 'AI Pharma', 'Grande', '+34 93 297 35 00', 'rrhh@lacer.es', 'lacer.es', 'AI Pharma'],
  ['Cinfa', 'Farma', 'Pamplona', 'Navarra', 'AI Pharma', 'Grande', '+34 94 833 88 88', 'rrhh@cinfa.com', 'cinfa.com', 'AI Pharma'],
  ['Kern Pharma', 'Farma', 'Terrassa', 'Cataluña', 'AI Pharma', 'Grande', '+34 93 700 25 25', 'rrhh@kernpharma.com', 'kernpharma.com', 'AI Pharma'],
  ['Normon', 'Farma', 'Tres Cantos', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 806 25 23', 'rrhh@normon.es', 'normon.es', 'AI Manufacturing'],
  ['Oryzon Genomics', 'Biotech', 'Cornellà', 'Cataluña', 'AI Drug Discovery', 'Mediana', '+34 93 515 13 13', 'rrhh@oryzon.com', 'oryzon.com', 'AI Discovery'],
  ['Pharmamar', 'Biotech', 'Colmenar Viejo', 'Madrid', 'AI Drug Research', 'Grande', '+34 91 823 46 00', 'rrhh@pharmamar.com', 'pharmamar.com', 'AI Research'],
  ['Reig Jofre', 'Farma', 'Sant Joan Despí', 'Cataluña', 'AI Pharma', 'Grande', '+34 93 480 67 10', 'rrhh@reigjofre.com', 'reigjofre.com', 'AI Pharma'],

  // ============ INDUSTRIA QUÍMICA Y MATERIALES ============
  ['Solvay España', 'Química', 'Barcelona', 'Cataluña', 'AI Chemical', 'Grande', '+34 93 247 60 00', 'rrhh.spain@solvay.com', 'solvay.com', 'AI Chemistry'],
  ['BASF España', 'Química', 'Tarragona', 'Cataluña', 'AI Chemical', 'Grande', '+34 93 496 40 00', 'rrhh.spain@basf.com', 'basf.com/es', 'AI Chemistry'],
  ['Repsol Química', 'Química', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 753 80 00', 'rrhh@repsol.com', 'repsol.com/quimica', 'AI Industrial'],
  ['Akzo Nobel España', 'Química/Pinturas', 'Barcelona', 'Cataluña', 'AI Chemical', 'Grande', '+34 93 484 41 00', 'rrhh.spain@akzonobel.com', 'akzonobel.com', 'AI Chemical'],
  ['Ercros', 'Química', 'Barcelona', 'Cataluña', 'AI Chemical', 'Grande', '+34 93 439 30 09', 'rrhh@ercros.es', 'ercros.es', 'AI Chemical'],
  ['DuPont España', 'Química/Materiales', 'Barcelona', 'Cataluña', 'AI Materials', 'Grande', '+34 93 227 60 00', 'rrhh.spain@dupont.com', 'dupont.es', 'AI Materials'],
  ['Henkel Ibérica', 'Química/CPG', 'Barcelona', 'Cataluña', 'AI Industrial', 'Grande', '+34 93 290 41 00', 'rrhh.iberica@henkel.com', 'henkel.es', 'AI Industrial'],
  ['Smurfit Kappa España', 'Papelera', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 564 19 00', 'rrhh.spain@smurfitkappa.com', 'smurfitkappa.es', 'AI Manufacturing'],
  ['DS Smith España', 'Papelera', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 663 91 00', 'rrhh.spain@dssmith.com', 'dssmith.com', 'AI Manufacturing'],
  ['Saica Group', 'Papelera/Cartón', 'Zaragoza', 'Aragón', 'AI Manufacturing', 'Grande', '+34 97 651 00 00', 'rrhh@saica.com', 'saica.com', 'AI Manufacturing'],
  ['Ence Energía y Celulosa', 'Papelera/Energía', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 392 09 50', 'rrhh@ence.es', 'ence.es', 'AI Industrial'],
  ['Roca Sanitario', 'Cerámica/Sanitarios', 'Barcelona', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 366 12 00', 'rrhh@roca.net', 'roca.es', 'AI Manufacturing'],
  ['Porcelanosa Grupo', 'Cerámica', 'Vila-real', 'C. Valenciana', 'AI Manufacturing', 'Grande', '+34 96 450 70 00', 'rrhh@porcelanosa.com', 'porcelanosa.com', 'AI Manufacturing'],
  ['Tau Cerámica', 'Cerámica', 'Castellón', 'C. Valenciana', 'AI Manufacturing', 'Grande', '+34 96 422 56 00', 'rrhh@tauceramica.com', 'tauceramica.com', 'AI Manufacturing'],
  ['Fluidra', 'Industrial/Piscinas', 'Sabadell', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 724 39 00', 'rrhh@fluidra.com', 'fluidra.com', 'AI Manufacturing'],
  ['Cementos Molins', 'Cementos', 'Sant Vicenç dels Horts', 'Cataluña', 'AI Industrial', 'Grande', '+34 93 680 60 00', 'rrhh@cmolins.es', 'cmolins.es', 'AI Industrial'],

  // ============ AUTOMATIZACIÓN, ROBÓTICA E INDUSTRIA 4.0 ============
  ['Asti Mobile Robotics', 'Robótica', 'Burgos', 'Castilla y León', 'AI Robotics', 'Grande', '+34 94 727 75 03', 'rrhh@asti.es', 'asti.es', 'AI Robotics'],
  ['Robotnik Automation', 'Robótica', 'Valencia', 'C. Valenciana', 'AI Robotics', 'Mediana', '+34 96 311 04 09', 'rrhh@robotnik.es', 'robotnik.es', 'AI Robotics'],
  ['Pal Robotics', 'Robótica', 'Barcelona', 'Cataluña', 'AI Humanoid Robotics', 'Mediana', '+34 93 319 64 80', 'rrhh@pal-robotics.com', 'pal-robotics.com', 'AI Robotics'],
  ['Schunk Intec España', 'Automatización', 'Sant Just Desvern', 'Cataluña', 'AI Industrial', 'Grande', '+34 93 480 17 80', 'rrhh@schunk.com', 'schunk.com', 'AI Industrial'],
  ['Fagor Automation', 'Automatización', 'Mondragón', 'País Vasco', 'AI Industrial', 'Grande', '+34 94 371 92 00', 'rrhh@fagorautomation.com', 'fagorautomation.com', 'AI Industrial'],
  ['Mondragon Corporación', 'Industria/Cooperativa', 'Mondragón', 'País Vasco', 'AI Industria 4.0', 'Grande', '+34 94 379 90 00', 'rrhh@mondragoncorporation.com', 'mondragon-corporation.com', 'AI Industria'],
  ['Tekniker', 'I+D Industrial', 'Eibar', 'País Vasco', 'AI Industrial Research', 'Grande', '+34 94 320 27 44', 'rrhh@tekniker.es', 'tekniker.es', 'AI Industrial'],
  ['Idemia España', 'Identidad/Seguridad', 'Madrid', 'Madrid', 'AI Identity', 'Grande', '+34 91 005 60 12', 'rrhh.spain@idemia.com', 'idemia.com', 'AI Identity'],

  // ============ CRYPTO Y BLOCKCHAIN ============
  ['Bit2Me', 'Crypto/Blockchain', 'Castellón', 'C. Valenciana', 'AI Blockchain', 'Mediana', '+34 96 470 36 39', 'rrhh@bit2me.com', 'bit2me.com', 'AI Blockchain'],
  ['Onyze', 'Crypto Custody', 'Madrid', 'Madrid', 'AI Crypto', 'Pequeña', '+34 91 088 92 21', 'rrhh@onyze.com', 'onyze.com', 'AI Crypto'],
  ['Bitnovo', 'Crypto', 'Madrid', 'Madrid', 'AI Crypto', 'Mediana', '+34 91 088 94 18', 'rrhh@bitnovo.com', 'bitnovo.com', 'AI Crypto'],
  ['Crypto Plaza', 'Crypto Hub', 'Madrid', 'Madrid', 'AI Blockchain', 'Pequeña', '+34 91 088 95 70', 'rrhh@cryptoplaza.es', 'cryptoplaza.es', 'AI Blockchain'],
  ['Pibank', 'Fintech Crypto', 'Madrid', 'Madrid', 'AI Banking/Crypto', 'Mediana', '+34 91 088 97 30', 'rrhh@pibank.es', 'pibank.es', 'AI Banking'],

  // ============ EDITORIALES ============
  ['SM Ediciones', 'Editorial', 'Madrid', 'Madrid', 'AI EdTech Publishing', 'Grande', '+34 91 422 88 00', 'rrhh@grupo-sm.com', 'grupo-sm.com', 'AI EdTech'],
  ['Anaya', 'Editorial', 'Madrid', 'Madrid', 'AI Publishing', 'Grande', '+34 91 393 87 00', 'rrhh@anaya.es', 'anaya.es', 'AI Publishing'],
  ['Santillana', 'Editorial', 'Madrid', 'Madrid', 'AI Publishing', 'Grande', '+34 91 744 93 00', 'rrhh@santillana.com', 'santillana.com', 'AI Publishing'],
  ['Vicens-Vives', 'Editorial', 'Barcelona', 'Cataluña', 'AI Publishing', 'Grande', '+34 93 252 37 00', 'rrhh@vicensvives.com', 'vicensvives.com', 'AI Publishing'],
  ['Edebe', 'Editorial', 'Barcelona', 'Cataluña', 'AI EdTech', 'Grande', '+34 93 220 33 00', 'rrhh@edebe.com', 'edebe.com', 'AI EdTech'],
  ['McGraw-Hill España', 'Editorial', 'Madrid', 'Madrid', 'AI EdTech', 'Grande', '+34 91 180 30 00', 'rrhh.spain@mheducation.com', 'mheducation.es', 'AI EdTech'],
  ['Pearson Educación', 'Editorial', 'Madrid', 'Madrid', 'AI EdTech', 'Grande', '+34 91 590 71 30', 'rrhh.spain@pearson.com', 'pearson.es', 'AI EdTech'],

  // ============ MÁS STARTUPS Y SCALEUPS ============
  ['Embat', 'Fintech B2B', 'Madrid', 'Madrid', 'AI Treasury', 'Mediana', '+34 91 005 78 23', 'rrhh@embat.com', 'embat.com', 'AI Treasury'],
  ['Reby', 'Mobility', 'Barcelona', 'Cataluña', 'AI Mobility', 'Mediana', '+34 91 005 78 30', 'rrhh@reby.es', 'reby.es', 'AI Mobility'],
  ['Heepsy', 'MarTech IA', 'Bilbao', 'País Vasco', 'AI Influencer', 'Mediana', '+34 91 005 78 47', 'rrhh@heepsy.com', 'heepsy.com', 'AI Influencer'],
  ['Aplazame Pago', 'Fintech BNPL', 'Madrid', 'Madrid', 'AI Credit Scoring', 'Mediana', '+34 91 829 12 26', 'rrhh@aplazame.com', 'aplazame.com', 'AI Credit'],
  ['Novicap', 'Fintech', 'Barcelona', 'Cataluña', 'AI Lending', 'Mediana', '+34 93 220 50 21', 'rrhh@novicap.com', 'novicap.com', 'AI Lending'],
  ['Lendix España (October)', 'Fintech', 'Madrid', 'Madrid', 'AI Lending', 'Mediana', '+34 91 005 78 78', 'rrhh@october.eu', 'october.eu', 'AI Lending'],
  ['Ebury', 'Fintech B2B', 'Madrid', 'Madrid', 'AI FX', 'Grande', '+34 91 005 79 11', 'rrhh@ebury.com', 'ebury.es', 'AI FX'],
  ['DPoint', 'Fintech', 'Madrid', 'Madrid', 'AI Trading', 'Mediana', '+34 91 088 22 70', 'rrhh@dpoint.es', 'dpoint.es', 'AI Trading'],
  ['Saving Republic', 'Fintech', 'Barcelona', 'Cataluña', 'AI Investments', 'Mediana', '+34 93 220 53 17', 'rrhh@savingrepublic.com', 'savingrepublic.com', 'AI Investments'],
  ['Goin', 'Fintech', 'Barcelona', 'Cataluña', 'AI Savings', 'Mediana', '+34 93 220 53 28', 'rrhh@goin.io', 'goin.io', 'AI Savings'],
  ['Twinco Capital', 'Fintech', 'Madrid', 'Madrid', 'AI Finance', 'Mediana', '+34 91 088 22 82', 'rrhh@twincocapital.com', 'twincocapital.com', 'AI Finance'],

  // ============ EDTECH ESPAÑA ============
  ['Acceptio', 'EdTech IA', 'Barcelona', 'Cataluña', 'AI Learning', 'Pequeña', '+34 93 220 49 12', 'rrhh@acceptio.com', 'acceptio.com', 'AI EdTech'],
  ['Edpuzzle', 'EdTech IA', 'Barcelona', 'Cataluña', 'AI Video Learning', 'Mediana', '+34 91 005 80 40', 'rrhh@edpuzzle.com', 'edpuzzle.com', 'AI EdTech'],
  ['Innovamat', 'EdTech IA', 'Barcelona', 'Cataluña', 'AI Math Learning', 'Mediana', '+34 93 220 49 27', 'rrhh@innovamat.com', 'innovamat.com', 'AI EdTech'],
  ['Cuídate Plus EdTech', 'EdTech', 'Madrid', 'Madrid', 'AI Health Learning', 'Pequeña', '+34 91 005 80 45', 'rrhh@cuidateplus.com', 'cuidateplus.com', 'AI EdTech'],
  ['Bilingüe Easy', 'EdTech IA', 'Madrid', 'Madrid', 'AI Languages', 'Pequeña', '+34 91 005 80 50', 'rrhh@bilingueeasy.com', 'bilingueeasy.com', 'AI Languages'],

  // ============ MÁS PROPTECH Y REAL ESTATE ============
  ['Tinsa', 'PropTech Tasaciones', 'Madrid', 'Madrid', 'AI Property Valuation', 'Grande', '+34 91 372 75 00', 'rrhh@tinsa.es', 'tinsa.es', 'AI PropTech'],
  ['CBRE España', 'Real Estate', 'Madrid', 'Madrid', 'AI Real Estate', 'Grande', '+34 91 588 14 00', 'rrhh.spain@cbre.com', 'cbre.es', 'AI Real Estate'],
  ['JLL España', 'Real Estate', 'Madrid', 'Madrid', 'AI Real Estate Analytics', 'Grande', '+34 91 789 11 00', 'rrhh.spain@jll.com', 'jll.es', 'AI Real Estate'],
  ['Cushman & Wakefield España', 'Real Estate', 'Madrid', 'Madrid', 'AI Real Estate', 'Grande', '+34 91 781 14 00', 'rrhh.spain@cushwake.com', 'cushmanwakefield.com', 'AI Real Estate'],
  ['Engel & Völkers España', 'Real Estate', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 700 62 32', 'rrhh@engelvoelkers.com', 'engelvoelkers.com', 'AI PropTech'],
  ['Avenida Capital', 'Real Estate', 'Madrid', 'Madrid', 'AI PropTech', 'Mediana', '+34 91 088 24 78', 'rrhh@avenidacapital.com', 'avenidacapital.com', 'AI PropTech'],

  // ============ CONSUMO MASIVO Y DISTRIBUCIÓN ============
  ['Procter & Gamble España', 'CPG', 'Alcobendas', 'Madrid', 'AI Marketing', 'Grande', '+34 91 722 80 00', 'rrhh.spain@pg.com', 'pg.es', 'AI Marketing'],
  ['Reckitt Benckiser España', 'CPG', 'Granollers', 'Cataluña', 'AI Consumer', 'Grande', '+34 93 870 09 00', 'rrhh.spain@reckitt.com', 'reckitt.com', 'AI Consumer'],
  ['Unilever España', 'CPG', 'Barcelona', 'Cataluña', 'AI Marketing', 'Grande', '+34 93 290 30 00', 'rrhh.spain@unilever.com', 'unilever.es', 'AI Marketing'],
  ['Colgate-Palmolive España', 'CPG', 'Madrid', 'Madrid', 'AI Consumer', 'Grande', '+34 91 558 04 00', 'rrhh.spain@colgate.com', 'colgate.es', 'AI Consumer'],
  ['Nestlé España', 'Alimentación', 'Esplugues', 'Cataluña', 'AI Food', 'Grande', '+34 93 480 50 00', 'rrhh.spain@nestle.com', 'empresa.nestle.es', 'AI Food'],
  ['Danone España', 'Alimentación', 'Barcelona', 'Cataluña', 'AI Food', 'Grande', '+34 93 419 02 00', 'rrhh.spain@danone.com', 'danone.es', 'AI Food'],
  ['Kellogg\'s España', 'Alimentación', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 769 92 00', 'rrhh.spain@kellogg.com', 'kelloggs.es', 'AI Marketing'],
  ['Mondelēz España', 'Alimentación', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 538 09 00', 'rrhh.spain@mdlz.com', 'mondelezinternational.com', 'AI Marketing'],
  ['L\'Oréal España', 'Cosmética', 'Madrid', 'Madrid', 'AI Beauty', 'Grande', '+34 91 524 25 00', 'rrhh.spain@loreal.com', 'loreal.es', 'AI Beauty'],
  ['Puig', 'Cosmética/Moda', 'Barcelona', 'Cataluña', 'AI Beauty', 'Grande', '+34 93 322 87 00', 'rrhh@puig.com', 'puig.com', 'AI Beauty'],

  // ============ MEDIA Y PUBLICIDAD ============
  ['Antena 3 Noticias', 'Media/TV', 'Madrid', 'Madrid', 'AI Newsroom', 'Grande', '+34 91 623 06 00', 'rrhh@antena3.com', 'antena3.com', 'AI Newsroom'],
  ['Cadena SER', 'Radio', 'Madrid', 'Madrid', 'AI Audio', 'Grande', '+34 91 347 77 00', 'rrhh@cadenaser.com', 'cadenaser.com', 'AI Audio'],
  ['COPE', 'Radio', 'Madrid', 'Madrid', 'AI Audio', 'Grande', '+34 91 595 96 96', 'rrhh@cope.es', 'cope.es', 'AI Audio'],
  ['Onda Cero', 'Radio', 'Madrid', 'Madrid', 'AI Audio', 'Grande', '+34 91 591 75 00', 'rrhh@ondacero.es', 'ondacero.es', 'AI Audio'],
  ['Spainmedia (Forbes)', 'Editorial Tech', 'Madrid', 'Madrid', 'AI Media', 'Mediana', '+34 91 088 46 17', 'rrhh@spainmedia.es', 'spainmedia.es', 'AI Media'],
  ['Vibbo', 'Marketplace', 'Madrid', 'Madrid', 'AI Marketplace', 'Mediana', '+34 91 088 49 22', 'rrhh@vibbo.com', 'vibbo.com', 'AI Marketplace'],
  ['McCann España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 339 56 00', 'rrhh@mccann.es', 'mccann.com', 'AI Creative'],
  ['LOLA MullenLowe', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Mediana', '+34 91 700 03 27', 'rrhh@lolamullenlowe.com', 'lolamullenlowe.com', 'AI Creative'],
  ['Sra Rushmore', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Mediana', '+34 91 432 49 50', 'rrhh@srarushmore.com', 'srarushmore.com', 'AI Creative'],
  ['DDB España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 561 04 00', 'rrhh@ddb.es', 'ddb.es', 'AI Creative'],
  ['Bbdo España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 781 90 00', 'rrhh@bbdo.es', 'bbdo.es', 'AI Creative'],

  // ============ ENERGÍA ADICIONAL Y SOSTENIBILIDAD ============
  ['Acciona Inmobiliaria', 'Real Estate Sostenible', 'Madrid', 'Madrid', 'AI Construction', 'Grande', '+34 91 663 28 50', 'rrhh@acciona.com', 'acciona-inmobiliaria.com', 'AI Construction'],
  ['EDP España', 'Energía', 'Madrid', 'Madrid', 'AI Energy', 'Grande', '+34 90 286 08 60', 'rrhh.spain@edp.com', 'edp.com/es', 'AI Energy'],
  ['Enagás Renovable', 'Energía Renovable', 'Madrid', 'Madrid', 'AI Hydrogen', 'Grande', '+34 91 709 92 00', 'rrhh@enagasrenovable.com', 'enagasrenovable.com', 'AI Hydrogen'],
  ['BP España', 'Energía/Petróleo', 'Madrid', 'Madrid', 'AI Energy', 'Grande', '+34 91 537 19 00', 'rrhh.spain@bp.com', 'bp.com', 'AI Energy'],
  ['Shell España', 'Energía/Petróleo', 'Madrid', 'Madrid', 'AI Energy', 'Grande', '+34 91 597 65 00', 'rrhh.spain@shell.com', 'shell.es', 'AI Energy'],
  ['ENI Iberia', 'Energía/Petróleo', 'Madrid', 'Madrid', 'AI Energy', 'Grande', '+34 91 700 32 00', 'rrhh.spain@eni.com', 'eni.com/es', 'AI Energy'],
  ['Galp España', 'Energía', 'Madrid', 'Madrid', 'AI Energy', 'Grande', '+34 91 432 47 00', 'rrhh.spain@galp.com', 'galp.com', 'AI Energy'],

  // ============ TECH REGIONAL (SUR / NORTE / LEVANTE) ============
  ['Power Electronics', 'Industria Energética', 'Llíria', 'C. Valenciana', 'AI Energy', 'Grande', '+34 96 136 68 18', 'rrhh@power-electronics.com', 'power-electronics.com', 'AI Energy'],
  ['Aitana Soluciones', 'Software/IA', 'Valencia', 'C. Valenciana', 'AI ERP', 'Grande', '+34 96 274 10 99', 'rrhh@aitana.es', 'aitana.es', 'AI ERP'],
  ['PLD Space', 'Aerospace', 'Elche', 'C. Valenciana', 'AI Aerospace', 'Mediana', '+34 96 642 79 28', 'rrhh@pldspace.com', 'pldspace.com', 'AI Aerospace'],
  ['Embention', 'Aerospace/Drones', 'Alicante', 'C. Valenciana', 'AI Drones', 'Mediana', '+34 96 510 13 17', 'rrhh@embention.com', 'embention.com', 'AI Drones'],
  ['Genaker', 'Software', 'Castellón', 'C. Valenciana', 'AI Communications', 'Mediana', '+34 96 472 35 41', 'rrhh@genaker.com', 'genaker.com', 'AI Communications'],
  ['Imatia Innovation', 'Software', 'Vigo', 'Galicia', 'AI Solutions', 'Mediana', '+34 98 612 25 06', 'rrhh@imatia.com', 'imatia.com', 'AI Solutions'],
  ['Imaginarium IT', 'IT Solutions', 'Zaragoza', 'Aragón', 'AI Solutions', 'Mediana', '+34 97 627 54 00', 'rrhh@imaginarium.es', 'imaginarium.es', 'AI Solutions'],
  ['Hibox Systems', 'Software', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 088 51 23', 'rrhh@hibox.es', 'hibox.es', 'AI Solutions'],
  ['Itactic', 'Tech', 'Bilbao', 'País Vasco', 'AI Solutions', 'Pequeña', '+34 94 401 17 70', 'rrhh@itactic.com', 'itactic.com', 'AI Solutions'],
  ['Adasa Sistemas', 'Tech Industrial', 'Barcelona', 'Cataluña', 'AI Industrial', 'Mediana', '+34 93 320 84 18', 'rrhh@adasasistemas.com', 'adasasistemas.com', 'AI Industrial'],
  ['Tarmac Networks', 'Tech IA', 'Madrid', 'Madrid', 'AI Networking', 'Pequeña', '+34 91 088 53 27', 'rrhh@tarmac.es', 'tarmac.es', 'AI Networking'],
  ['Cuatro Ochenta', 'Software/IA', 'Castellón', 'C. Valenciana', 'AI Software', 'Mediana', '+34 96 472 36 65', 'rrhh@cuatroochenta.com', 'cuatroochenta.com', 'AI Software'],

  // ============ DRONES Y NUEVAS TECNOLOGÍAS ============
  ['AirHopping', 'Travel/IA', 'Madrid', 'Madrid', 'AI Travel', 'Pequeña', '+34 91 088 55 14', 'rrhh@airhopping.com', 'airhopping.com', 'AI Travel'],
  ['Aerocamaras', 'Drones', 'A Coruña', 'Galicia', 'AI Drones', 'Mediana', '+34 98 117 24 11', 'rrhh@aerocamaras.es', 'aerocamaras.es', 'AI Drones'],
  ['Hemav', 'Drones AgroTech', 'Barcelona', 'Cataluña', 'AI Drones', 'Mediana', '+34 93 220 56 12', 'rrhh@hemav.com', 'hemav.com', 'AI Drones'],
  ['Quantum Aviation', 'Aerospace IA', 'Madrid', 'Madrid', 'AI Aviation', 'Pequeña', '+34 91 088 57 23', 'rrhh@quantumaviation.es', 'quantumaviation.es', 'AI Aviation'],

  // ============ BIOTECH ADICIONAL ============
  ['Amadix', 'Biotech IA', 'Valladolid', 'Castilla y León', 'AI Drug Discovery', 'Mediana', '+34 98 318 49 27', 'rrhh@amadix.com', 'amadix.com', 'AI Discovery'],
  ['Neuron Bio', 'Biotech IA', 'Granada', 'Andalucía', 'AI Biotech', 'Mediana', '+34 95 859 79 03', 'rrhh@neuronbio.com', 'neuronbio.com', 'AI Biotech'],
  ['Atrys Health', 'HealthTech IA', 'Barcelona', 'Cataluña', 'AI Oncology', 'Grande', '+34 93 488 04 04', 'rrhh@atryshealth.com', 'atryshealth.com', 'AI Oncology'],
  ['Anaconda Biomed', 'MedTech IA', 'Barcelona', 'Cataluña', 'AI MedTech', 'Mediana', '+34 93 220 49 87', 'rrhh@anacondabiomed.com', 'anacondabiomed.com', 'AI MedTech'],

  // ============ SOFTWARE EMPRESARIAL ============
  ['Wolters Kluwer A3', 'Software Empresarial', 'Madrid', 'Madrid', 'AI ERP', 'Grande', '+34 91 602 00 00', 'rrhh.spain@wolterskluwer.com', 'wolterskluwer.com/es', 'AI ERP'],
  ['Microstrategy España', 'BI/Analytics', 'Madrid', 'Madrid', 'AI BI', 'Grande', '+34 91 005 60 78', 'careers.spain@microstrategy.com', 'microstrategy.com', 'AI BI'],
  ['Zucchetti España', 'Software Empresarial', 'Madrid', 'Madrid', 'AI ERP', 'Grande', '+34 91 005 61 12', 'rrhh.spain@zucchetti.com', 'zucchetti.es', 'AI ERP'],
  ['Software DELSOL', 'Software Empresarial', 'Mengíbar', 'Andalucía', 'AI ERP', 'Mediana', '+34 95 397 20 00', 'rrhh@sdelsol.com', 'sdelsol.com', 'AI ERP'],
  ['Cegid Spain', 'Software Empresarial', 'Madrid', 'Madrid', 'AI ERP', 'Grande', '+34 91 740 89 90', 'rrhh.spain@cegid.com', 'cegid.com/es', 'AI ERP'],
  ['Visma España', 'Software Empresarial', 'Madrid', 'Madrid', 'AI Business', 'Grande', '+34 91 451 28 14', 'rrhh.spain@visma.com', 'visma.com', 'AI Business'],
  ['Citrix España', 'Cloud/Tech', 'Madrid', 'Madrid', 'AI Workspace', 'Grande', '+34 91 005 61 60', 'careers.spain@citrix.com', 'citrix.es', 'AI Workspace'],

  // ============ FOOD TECH Y QUICK COMMERCE ============
  ['Getir España', 'Quick Commerce', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 91 005 64 89', 'rrhh.spain@getir.com', 'getir.es', 'AI Logistics'],
  ['Gorillas España', 'Quick Commerce', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 91 005 65 06', 'rrhh.spain@gorillas.io', 'gorillas.io', 'AI Logistics'],
  ['Telepizza', 'Food Delivery', 'Madrid', 'Madrid', 'AI Operations', 'Grande', '+34 91 657 65 00', 'rrhh@telepizza.com', 'telepizza.com', 'AI Operations'],
  ['Domino\'s Pizza España', 'Food Delivery', 'Madrid', 'Madrid', 'AI Operations', 'Grande', '+34 91 091 03 30', 'rrhh@dominospizza.es', 'dominospizza.es', 'AI Operations'],
  ['Restaurant Brands Iberia', 'Food/Burger King', 'Madrid', 'Madrid', 'AI Operations', 'Grande', '+34 91 432 36 50', 'rrhh@rbi.com', 'rbiberia.com', 'AI Operations'],
  ['McDonalds España', 'Food', 'Madrid', 'Madrid', 'AI Operations', 'Grande', '+34 91 567 13 00', 'rrhh.spain@mcdonalds.com', 'mcdonalds.es', 'AI Operations'],
  ['Foodora España', 'Food Tech', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 91 005 65 22', 'rrhh.spain@foodora.com', 'foodora.es', 'AI Logistics'],

  // ============ FASHION TECH ============
  ['Pompeii Brand', 'Fashion Tech', 'Madrid', 'Madrid', 'AI Fashion', 'Mediana', '+34 91 088 60 02', 'rrhh@pompeiibrand.com', 'pompeiibrand.com', 'AI Fashion'],
  ['Singularu', 'Fashion E-commerce', 'Valencia', 'C. Valenciana', 'AI Fashion', 'Mediana', '+34 96 049 04 12', 'rrhh@singularu.com', 'singularu.com', 'AI Fashion'],
  ['Sneakerbar', 'Fashion E-commerce', 'Madrid', 'Madrid', 'AI Fashion', 'Pequeña', '+34 91 088 61 38', 'rrhh@sneakerbar.com', 'sneakerbar.com', 'AI Fashion'],
  ['Ecoalf', 'Fashion Sostenible', 'Madrid', 'Madrid', 'AI Sustainability', 'Mediana', '+34 91 308 21 00', 'rrhh@ecoalf.com', 'ecoalf.com', 'AI Sustainability'],
  ['Brunello Cucinelli España', 'Fashion Lujo', 'Madrid', 'Madrid', 'AI Fashion', 'Grande', '+34 91 005 66 12', 'rrhh.spain@brunellocucinelli.com', 'brunellocucinelli.com', 'AI Fashion'],
  ['Hispanitas', 'Fashion Calzado', 'Elche', 'C. Valenciana', 'AI Fashion', 'Mediana', '+34 96 661 84 71', 'rrhh@hispanitas.com', 'hispanitas.com', 'AI Fashion'],

  // ============ INVESTIGACIÓN Y DESARROLLO ============
  ['IK4 Research Alliance', 'Investigación', 'Donostia', 'País Vasco', 'AI R&D', 'Grande', '+34 94 300 27 30', 'rrhh@ik4.es', 'ik4.es', 'AI R&D'],
  ['LEITAT', 'Centro Tecnológico', 'Terrassa', 'Cataluña', 'AI Materials', 'Grande', '+34 93 788 23 00', 'rrhh@leitat.org', 'leitat.org', 'AI Materials'],
  ['CTAG (Centro Automoción Galicia)', 'I+D Automoción', 'O Porriño', 'Galicia', 'AI Automotive', 'Grande', '+34 98 634 50 00', 'rrhh@ctag.com', 'ctag.com', 'AI Automotive'],
  ['CARTIF', 'Centro Tecnológico', 'Boecillo', 'Castilla y León', 'AI Industrial', 'Mediana', '+34 98 354 65 04', 'rrhh@cartif.es', 'cartif.es', 'AI Industrial'],
  ['CIDETEC Energy Storage', 'Centro Tecnológico', 'Donostia', 'País Vasco', 'AI Energy Storage', 'Mediana', '+34 94 329 70 80', 'rrhh@cidetec.es', 'cidetec.es', 'AI Energy'],
  ['ITP Aero Research', 'Aerospace', 'Zamudio', 'País Vasco', 'AI Aerospace', 'Grande', '+34 94 466 51 11', 'rrhh@itpaero.com', 'itpaero.com', 'AI Aerospace'],
  ['Innovae', 'AR/VR/IA', 'Donostia', 'País Vasco', 'AI AR/VR', 'Mediana', '+34 94 322 42 14', 'rrhh@innovae.eu', 'innovae.eu', 'AI AR/VR'],

  // ============ FINANZAS / TRADING IA ============
  ['BME (Bolsa Madrid)', 'Bolsa', 'Madrid', 'Madrid', 'AI Trading', 'Grande', '+34 91 709 50 00', 'rrhh@grupobme.es', 'bolsasymercados.es', 'AI Trading'],
  ['CNMV', 'Regulador Financiero', 'Madrid', 'Madrid', 'AI Compliance', 'Grande', '+34 91 585 15 00', 'rrhh@cnmv.es', 'cnmv.es', 'AI Compliance'],
  ['Iberclear', 'Servicios Financieros', 'Madrid', 'Madrid', 'AI Settlement', 'Grande', '+34 91 709 50 00', 'rrhh@iberclear.es', 'iberclear.es', 'AI Settlement'],
  ['Bursaprime', 'Trading IA', 'Madrid', 'Madrid', 'AI Trading', 'Pequeña', '+34 91 088 71 41', 'rrhh@bursaprime.com', 'bursaprime.com', 'AI Trading'],
  ['Trading 212 España', 'Trading IA', 'Madrid', 'Madrid', 'AI Trading', 'Mediana', '+34 91 005 67 71', 'rrhh.spain@trading212.com', 'trading212.com', 'AI Trading'],

  // ============ AUTOMOCIÓN ELÉCTRICA Y MOVILIDAD ============
  ['Cooltra Motos', 'Movilidad Compartida', 'Barcelona', 'Cataluña', 'AI Mobility', 'Mediana', '+34 93 444 32 33', 'rrhh@cooltra.com', 'cooltra.com', 'AI Mobility'],
  ['Bici1MAS', 'Movilidad Eléctrica', 'Madrid', 'Madrid', 'AI Mobility', 'Pequeña', '+34 91 088 72 11', 'rrhh@bici1mas.com', 'bici1mas.com', 'AI Mobility'],
  ['Ampere Energy', 'Almacenamiento Energía', 'Valencia', 'C. Valenciana', 'AI Energy Storage', 'Mediana', '+34 96 049 35 30', 'rrhh@ampere-energy.com', 'ampere-energy.com', 'AI Energy'],
  ['Wallbox Charger', 'EV Charging', 'Barcelona', 'Cataluña', 'AI EV Infrastructure', 'Grande', '+34 93 015 25 25', 'rrhh@wallbox.com', 'wallbox.com', 'AI EV'],
  ['EVRouting', 'Movilidad EV', 'Barcelona', 'Cataluña', 'AI EV Routing', 'Pequeña', '+34 93 220 65 41', 'rrhh@evrouting.com', 'evrouting.com', 'AI EV'],

  // ============ MEDIO AMBIENTE Y CIRCULAR ECONOMY ============
  ['Ecoembes', 'Reciclaje', 'Madrid', 'Madrid', 'AI Recycling', 'Grande', '+34 91 567 24 03', 'rrhh@ecoembes.com', 'ecoembes.com', 'AI Recycling'],
  ['Veolia España', 'Medio Ambiente', 'Madrid', 'Madrid', 'AI Water/Waste', 'Grande', '+34 91 590 16 00', 'rrhh.spain@veolia.com', 'veolia.es', 'AI Environmental'],
  ['SUEZ Spain', 'Agua/Medio Ambiente', 'Barcelona', 'Cataluña', 'AI Water', 'Grande', '+34 93 342 25 35', 'rrhh.spain@suez.com', 'suez.es', 'AI Water'],
  ['Aqualia', 'Agua', 'Madrid', 'Madrid', 'AI Water Management', 'Grande', '+34 91 591 33 00', 'rrhh@aqualia.com', 'aqualia.com', 'AI Water'],
  ['Acuamed', 'Agua', 'Madrid', 'Madrid', 'AI Water', 'Grande', '+34 91 781 84 00', 'rrhh@acuamed.es', 'acuamed.es', 'AI Water'],

  // ============ MÁS STARTUPS DE IA ============
  ['Onyze Crypto', 'Crypto/Blockchain', 'Madrid', 'Madrid', 'AI Blockchain', 'Mediana', '+34 91 088 92 21', 'rrhh@onyze.com', 'onyze.com', 'AI Blockchain'],
  ['Coda Footwear', 'Fashion Tech', 'Madrid', 'Madrid', 'AI Fashion', 'Pequeña', '+34 91 088 73 92', 'rrhh@codafootwear.com', 'codafootwear.com', 'AI Fashion'],
  ['Tactalia', 'IoT IA', 'Bilbao', 'País Vasco', 'AI IoT', 'Mediana', '+34 94 488 11 19', 'rrhh@tactalia.com', 'tactalia.com', 'AI IoT'],
  ['Predictive Layer', 'Predictive IA', 'Madrid', 'Madrid', 'AI Predictive', 'Pequeña', '+34 91 088 75 67', 'rrhh@predictivelayer.com', 'predictivelayer.com', 'AI Predictive'],
  ['Predictland', 'Big Data IA', 'Madrid', 'Madrid', 'AI Big Data', 'Mediana', '+34 91 088 77 12', 'rrhh@predictland.com', 'predictland.com', 'AI Big Data'],
  ['Klue Spain', 'CompTech', 'Madrid', 'Madrid', 'AI Competitive Intelligence', 'Mediana', '+34 91 088 78 54', 'rrhh.spain@klue.com', 'klue.com', 'AI Intelligence'],
  ['Talently', 'HR Tech IA', 'Barcelona', 'Cataluña', 'AI Hiring', 'Pequeña', '+34 93 220 67 02', 'rrhh@talently.com', 'talently.com', 'AI Hiring'],
  ['Mailtrack', 'SaaS', 'Barcelona', 'Cataluña', 'AI Email', 'Mediana', '+34 93 220 68 17', 'rrhh@mailtrack.io', 'mailtrack.io', 'AI Email'],
  ['Typeform', 'SaaS', 'Barcelona', 'Cataluña', 'AI Forms', 'Grande', '+34 93 220 71 32', 'careers@typeform.com', 'typeform.com', 'AI Forms'],
  ['Marfeel', 'AdTech', 'Barcelona', 'Cataluña', 'AI Publishing', 'Mediana', '+34 93 220 72 56', 'rrhh@marfeel.com', 'marfeel.com', 'AI Publishing'],
  ['Hocelot', 'Validation IA', 'Madrid', 'Madrid', 'AI ID Validation', 'Mediana', '+34 91 088 80 78', 'rrhh@hocelot.com', 'hocelot.com', 'AI Validation'],
  ['Predictiva España', 'Predictive IA', 'Valencia', 'C. Valenciana', 'AI Predictive', 'Mediana', '+34 96 049 50 12', 'rrhh@predictiva.es', 'predictiva.es', 'AI Predictive'],
  ['Klikin', 'Hospitality Tech', 'Madrid', 'Madrid', 'AI Hospitality', 'Mediana', '+34 91 088 82 30', 'rrhh@klikin.com', 'klikin.com', 'AI Hospitality'],
  ['Velca', 'Movilidad Eléctrica', 'Sevilla', 'Andalucía', 'AI Mobility', 'Mediana', '+34 95 122 67 12', 'rrhh@velca.com', 'velca.com', 'AI Mobility']
];

function reordenar(n) {
  return [n[7], n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[8], n[9]];
}

async function addLote2() {
  try {
    console.log('🤖 Lote 2 empresas IA...\n');
    console.log(`📊 Nuevas: ${LOTE2.length}\n`);

    const { sheets } = await getServices();
    const reord = LOTE2.map(reordenar);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: reord }
    });

    console.log(`✅ ${LOTE2.length} empresas añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addLote2();
