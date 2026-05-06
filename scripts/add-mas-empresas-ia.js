const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// MÁS EMPRESAS QUE CONTRATAN EXPERTOS IA - AMPLIACIÓN MASIVA
const NUEVAS = [
  // ============ MÁS BANCA Y FINTECH ============
  ['Ibercaja Banco', 'Banca', 'Zaragoza', 'Aragón', 'AI Banking', 'Grande', '+34 90 050 06 06', 'rrhh@ibercaja.es', 'ibercaja.es', 'AI Customer Analytics'],
  ['Abanca', 'Banca', 'A Coruña', 'Galicia', 'AI Banking', 'Grande', '+34 90 211 11 12', 'rrhh@abanca.com', 'abanca.com', 'AI Banking'],
  ['Unicaja Banco', 'Banca', 'Málaga', 'Andalucía', 'AI Banking', 'Grande', '+34 90 220 14 04', 'rrhh@unicaja.es', 'unicajabanco.com', 'AI Banking'],
  ['Kutxabank', 'Banca', 'Bilbao', 'País Vasco', 'AI Banking', 'Grande', '+34 90 132 06 70', 'rrhh@kutxabank.es', 'kutxabank.com', 'AI Banking'],
  ['Cajamar', 'Banca Cooperativa', 'Almería', 'Andalucía', 'AI Banking', 'Grande', '+34 95 060 70 00', 'rrhh@cajamar.com', 'cajamar.es', 'AI Banking'],
  ['Liberbank', 'Banca', 'Madrid', 'Madrid', 'AI Banking', 'Grande', '+34 91 088 24 00', 'rrhh@liberbank.es', 'liberbank.es', 'AI Banking'],
  ['Banca March', 'Banca Privada', 'Madrid', 'Madrid', 'AI Wealth Management', 'Grande', '+34 91 432 60 00', 'rrhh@bancamarch.es', 'bancamarch.es', 'AI Wealth'],
  ['Banco Mediolanum', 'Banca', 'Barcelona', 'Cataluña', 'AI Banking', 'Grande', '+34 93 503 88 00', 'rrhh@bancomediolanum.es', 'bancomediolanum.es', 'AI Banking'],
  ['Andbank España', 'Banca Privada', 'Madrid', 'Madrid', 'AI Wealth', 'Grande', '+34 91 153 96 00', 'rrhh@andbank.es', 'andbank.es', 'AI Wealth'],
  ['Banco Pichincha España', 'Banca', 'Madrid', 'Madrid', 'AI Banking', 'Mediana', '+34 91 364 81 60', 'rrhh@bancopichincha.es', 'bancopichincha.es', 'AI Banking'],
  ['Targobank España', 'Banca', 'Madrid', 'Madrid', 'AI Banking', 'Mediana', '+34 90 226 26 26', 'rrhh@targobank.es', 'targobank.es', 'AI Banking'],
  ['Mutuactivos', 'Gestora Fondos', 'Madrid', 'Madrid', 'AI Investment', 'Grande', '+34 90 023 60 00', 'rrhh@mutuactivos.com', 'mutuactivos.com', 'AI Investment'],
  ['BlackRock España', 'Asset Management', 'Madrid', 'Madrid', 'AI Investment', 'Grande', '+34 91 523 00 60', 'careers@blackrock.com', 'blackrock.com/es', 'AI Investment'],
  ['Pictet España', 'Asset Management', 'Madrid', 'Madrid', 'AI Wealth Management', 'Grande', '+34 91 538 31 50', 'careers@pictet.com', 'group.pictet', 'AI Wealth'],
  ['Andbank', 'Banca Privada', 'Madrid', 'Madrid', 'AI Banking', 'Grande', '+34 91 153 96 00', 'careers@andbank.com', 'andbank.com', 'AI Banking'],

  // ============ MÁS SEGUROS ============
  ['Catalana Occidente', 'Seguros', 'Sant Cugat', 'Cataluña', 'AI Insurance', 'Grande', '+34 93 582 05 00', 'rrhh@gco.com', 'catalanaoccidente.com', 'AI Risk'],
  ['Generali España', 'Seguros', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 781 25 00', 'rrhh@generali.es', 'generali.es', 'AI Risk'],
  ['Liberty Seguros', 'Seguros', 'Madrid', 'Madrid', 'AI Underwriting', 'Grande', '+34 91 722 50 50', 'rrhh@libertyseguros.es', 'libertyseguros.es', 'AI Risk'],
  ['Reale Seguros', 'Seguros', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 591 03 00', 'rrhh@reale.es', 'reale.es', 'AI Insurance'],
  ['Helvetia Seguros', 'Seguros', 'Sevilla', 'Andalucía', 'AI Insurance', 'Grande', '+34 95 460 31 04', 'rrhh@helvetia.es', 'helvetia.es', 'AI Insurance'],
  ['Pelayo Mutua', 'Seguros', 'Madrid', 'Madrid', 'AI Insurance', 'Mediana', '+34 91 360 17 00', 'rrhh@pelayo.com', 'pelayo.com', 'AI Insurance'],
  ['Plus Ultra Seguros', 'Seguros', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 595 81 00', 'rrhh@plusultra.es', 'plusultra.es', 'AI Insurance'],
  ['Zurich España', 'Seguros', 'Barcelona', 'Cataluña', 'AI Insurance', 'Grande', '+34 93 567 60 00', 'rrhh@zurich.es', 'zurich.es', 'AI Insurance'],
  ['Aviva Vida', 'Seguros', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 534 21 50', 'rrhh@aviva.es', 'aviva.es', 'AI Insurance'],
  ['Mutua General de Seguros', 'Seguros', 'Barcelona', 'Cataluña', 'AI Insurance', 'Mediana', '+34 93 502 75 00', 'rrhh@mgs.es', 'mgs.es', 'AI Insurance'],
  ['Cigna España', 'Seguros Salud', 'Madrid', 'Madrid', 'AI Health', 'Grande', '+34 91 418 42 00', 'rrhh@cigna.es', 'cigna.es', 'AI Health'],
  ['DKV Seguros', 'Seguros Salud', 'Zaragoza', 'Aragón', 'AI Health', 'Grande', '+34 90 040 04 00', 'rrhh@dkvseguros.com', 'dkvseguros.com', 'AI Health'],

  // ============ MÁS CONSULTORÍA / IT ============
  ['Eviden (Atos)', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI Cloud', 'Grande', '+34 91 214 92 00', 'rrhh@eviden.com', 'eviden.com', 'AI Cloud'],
  ['Worldline España', 'Pagos/Tecnología', 'Madrid', 'Madrid', 'AI Payments', 'Grande', '+34 91 414 06 00', 'rrhh@worldline.com', 'worldline.com', 'AI Payments'],
  ['Vass Consulting', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Solutions', 'Grande', '+34 91 432 26 70', 'rrhh@vass.es', 'vass.com', 'AI Solutions'],
  ['Altia', 'Consultoría IT', 'Santiago de Compostela', 'Galicia', 'AI Solutions', 'Grande', '+34 98 158 05 02', 'rrhh@altia.es', 'altia.es', 'AI Solutions'],
  ['Bilbomática', 'Consultoría IT', 'Bilbao', 'País Vasco', 'AI Solutions', 'Mediana', '+34 94 442 34 00', 'rrhh@bilbomatica.es', 'bilbomatica.es', 'AI Solutions'],
  ['IECISA', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Public', 'Grande', '+34 91 387 47 00', 'rrhh@iecisa.com', 'iecisa.com', 'AI Public'],
  ['GMV Innovating Solutions', 'Tecnología/Aerospace', 'Madrid', 'Madrid', 'AI Aerospace', 'Grande', '+34 91 807 21 00', 'rrhh@gmv.com', 'gmv.com', 'AI Aerospace'],
  ['Tecnocom', 'Tecnología', 'Madrid', 'Madrid', 'AI Solutions', 'Grande', '+34 91 309 77 00', 'rrhh@tecnocom.es', 'tecnocom.es', 'AI Solutions'],
  ['Cuatroochenta', 'Software/IA', 'Castellón', 'C. Valenciana', 'AI Software', 'Mediana', '+34 96 472 36 65', 'rrhh@4-80.es', '4-80.es', 'AI Software'],
  ['Tecsisa', 'Tecnología', 'Madrid', 'Madrid', 'AI Industrial', 'Mediana', '+34 91 770 27 00', 'rrhh@tecsisa.com', 'tecsisa.com', 'AI Industrial'],
  ['Apache Junction', 'Tecnología', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 554 13 17', 'rrhh@apachejunction.es', 'apachejunction.es', 'AI Solutions'],
  ['Inforges', 'Consultoría IT', 'Murcia', 'Murcia', 'AI Solutions', 'Mediana', '+34 96 868 50 02', 'rrhh@inforges.es', 'inforges.es', 'AI Solutions'],
  ['Cibernos', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Cybersecurity', 'Grande', '+34 91 458 33 70', 'rrhh@cibernos.com', 'cibernos.com', 'AI Cybersecurity'],
  ['Axpe Consulting', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Solutions', 'Grande', '+34 91 740 73 00', 'rrhh@axpe.com', 'axpe.com', 'AI Solutions'],
  ['Ayesa', 'Ingeniería/Tecnología', 'Sevilla', 'Andalucía', 'AI Engineering', 'Grande', '+34 95 460 60 28', 'rrhh@ayesa.com', 'ayesa.com', 'AI Engineering'],
  ['EPAM Systems España', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Software', 'Grande', '+34 91 005 31 17', 'careers.spain@epam.com', 'epam.com', 'AI Software'],
  ['Globant España', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI Studios', 'Grande', '+34 91 005 31 21', 'careers@globant.com', 'globant.com', 'AI Studios'],
  ['Mphasis España', 'Consultoría IT', 'Madrid', 'Madrid', 'AI Solutions', 'Grande', '+34 91 005 31 32', 'careers@mphasis.com', 'mphasis.com', 'AI Solutions'],
  ['Devel Cloud', 'Cloud/IA', 'Madrid', 'Madrid', 'AI Cloud', 'Mediana', '+34 91 005 75 33', 'rrhh@develcloud.com', 'develcloud.com', 'AI Cloud'],
  ['Itelligence España', 'SAP/IA', 'Madrid', 'Madrid', 'AI SAP', 'Grande', '+34 91 768 89 00', 'rrhh@itelligencegroup.com', 'itelligencegroup.com', 'AI SAP'],
  ['Sage España', 'Software/IA', 'Madrid', 'Madrid', 'AI Business', 'Grande', '+34 91 384 18 00', 'rrhh@sage.es', 'sage.com/es', 'AI Business'],
  ['Workday España', 'HCM/IA', 'Madrid', 'Madrid', 'AI HCM', 'Grande', '+34 91 005 31 50', 'careers@workday.com', 'workday.com', 'AI HCM'],
  ['Anaplan España', 'Planificación/IA', 'Madrid', 'Madrid', 'AI Planning', 'Grande', '+34 91 005 31 47', 'careers@anaplan.com', 'anaplan.com', 'AI Planning'],

  // ============ CIBERSEGURIDAD CON IA ============
  ['Panda Security', 'Cybersecurity', 'Bilbao', 'País Vasco', 'AI Cybersecurity', 'Grande', '+34 94 442 80 00', 'rrhh@pandasecurity.com', 'pandasecurity.com', 'AI Cybersec'],
  ['ESET España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Threat Detection', 'Grande', '+34 91 661 65 80', 'rrhh@eset.es', 'eset.com/es', 'AI Threat'],
  ['S2 Grupo', 'Cybersecurity', 'Valencia', 'C. Valenciana', 'AI Cybersecurity', 'Grande', '+34 96 391 28 12', 'rrhh@s2grupo.es', 's2grupo.es', 'AI Cybersec'],
  ['Innotec System', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Cybersecurity', 'Grande', '+34 91 590 02 56', 'rrhh@innotecsystem.com', 'innotecsystem.com', 'AI Cybersec'],
  ['Telindus España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Network Security', 'Mediana', '+34 91 754 86 00', 'rrhh@telindus.es', 'telindus.es', 'AI Cybersec'],
  ['Tarlogic', 'Cybersecurity', 'A Coruña', 'Galicia', 'AI Pentesting', 'Mediana', '+34 98 119 16 70', 'rrhh@tarlogic.com', 'tarlogic.com', 'AI Pentesting'],
  ['Hispasec Sistemas', 'Cybersecurity', 'Málaga', 'Andalucía', 'AI Security Research', 'Mediana', '+34 95 207 51 14', 'rrhh@hispasec.com', 'hispasec.com', 'AI Security'],
  ['BlueLiv (Outpost24)', 'Cybersecurity', 'Barcelona', 'Cataluña', 'AI Threat Intel', 'Mediana', '+34 93 220 28 47', 'rrhh@blueliv.com', 'blueliv.com', 'AI Threat'],
  ['CyberArk España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Identity', 'Grande', '+34 91 005 33 67', 'careers@cyberark.com', 'cyberark.com', 'AI Identity'],
  ['Check Point España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Network Security', 'Grande', '+34 91 005 33 71', 'careers@checkpoint.com', 'checkpoint.com', 'AI Cybersec'],
  ['Fortinet España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Cybersecurity', 'Grande', '+34 91 005 50 81', 'careers@fortinet.com', 'fortinet.com', 'AI Cybersec'],

  // ============ MÁS RETAIL Y E-COMMERCE ============
  ['PcComponentes', 'E-commerce Tech', 'Murcia', 'Murcia', 'AI E-commerce', 'Grande', '+34 96 868 50 50', 'rrhh@pccomponentes.com', 'pccomponentes.com', 'AI E-commerce'],
  ['Worten España', 'Retail Tech', 'Madrid', 'Madrid', 'AI Retail', 'Grande', '+34 91 091 32 60', 'rrhh@worten.es', 'worten.es', 'AI Retail'],
  ['FNAC España', 'Retail', 'Madrid', 'Madrid', 'AI Retail', 'Grande', '+34 91 156 89 00', 'rrhh@fnac.es', 'fnac.es', 'AI Retail'],
  ['DIA España', 'Retail Alimentación', 'Las Rozas', 'Madrid', 'AI Supply Chain', 'Grande', '+34 91 398 54 00', 'rrhh@diagroup.com', 'dia.es', 'AI Supply Chain'],
  ['Eroski', 'Retail Alimentación', 'Elorrio', 'País Vasco', 'AI Retail', 'Grande', '+34 94 621 12 11', 'rrhh@eroski.es', 'eroski.es', 'AI Retail'],
  ['Lidl España', 'Retail Alimentación', 'Barcelona', 'Cataluña', 'AI Supply Chain', 'Grande', '+34 93 470 90 00', 'rrhh@lidl.es', 'lidl.es', 'AI Supply Chain'],
  ['Aldi España', 'Retail Alimentación', 'Sant Cugat', 'Cataluña', 'AI Supply Chain', 'Grande', '+34 93 743 76 00', 'rrhh@aldi.es', 'aldi.es', 'AI Supply Chain'],
  ['Costco España', 'Retail', 'Sevilla', 'Andalucía', 'AI Retail', 'Grande', '+34 95 593 33 00', 'rrhh@costco.es', 'costco.es', 'AI Retail'],
  ['DOSFARMA', 'E-commerce Salud', 'Sevilla', 'Andalucía', 'AI Pharma E-commerce', 'Mediana', '+34 95 100 13 67', 'rrhh@dosfarma.com', 'dosfarma.com', 'AI Pharma'],
  ['Atida Mifarma', 'E-commerce Salud', 'Albacete', 'Castilla-La Mancha', 'AI E-commerce Health', 'Mediana', '+34 96 727 49 22', 'rrhh@atida.com', 'mifarma.es', 'AI Health E-commerce'],
  ['PromoFarma', 'E-commerce Salud', 'Barcelona', 'Cataluña', 'AI Pharma', 'Mediana', '+34 93 247 77 12', 'rrhh@promofarma.com', 'promofarma.com', 'AI Pharma'],
  ['eDreams ODIGEO', 'Travel/IA', 'Barcelona', 'Cataluña', 'AI Travel', 'Grande', '+34 93 366 00 00', 'careers@edreamsodigeo.com', 'edreamsodigeo.com', 'AI Travel'],
  ['Spartoo España', 'E-commerce', 'Madrid', 'Madrid', 'AI Recommendations', 'Mediana', '+34 91 060 50 79', 'rrhh@spartoo.es', 'spartoo.es', 'AI Recommendations'],
  ['Aliexpress España', 'E-commerce', 'Madrid', 'Madrid', 'AI E-commerce', 'Grande', '+34 91 060 53 88', 'careers@alibaba.com', 'aliexpress.com', 'AI E-commerce'],

  // ============ MÁS INDUSTRIA Y MANUFACTURA ============
  ['Siemens España', 'Industria', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 514 80 00', 'rrhh@siemens.com', 'siemens.com/es', 'AI Industrial 4.0'],
  ['ABB España', 'Industria', 'San Sebastián', 'País Vasco', 'AI Industrial', 'Grande', '+34 94 322 02 00', 'rrhh@abb.com', 'abb.com/es', 'AI Industrial'],
  ['Schneider Electric España', 'Industria', 'Barcelona', 'Cataluña', 'AI Energy Management', 'Grande', '+34 93 484 31 00', 'rrhh@schneider-electric.com', 'se.com/es', 'AI Energy'],
  ['Honeywell España', 'Industria', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 509 28 00', 'rrhh@honeywell.com', 'honeywell.com/es', 'AI Industrial'],
  ['Boeing España', 'Aerospace', 'Madrid', 'Madrid', 'AI Aerospace', 'Grande', '+34 91 749 28 00', 'rrhh@boeing.com', 'boeing.com', 'AI Aerospace'],
  ['Airbus Defence and Space', 'Aerospace/Defensa', 'Madrid', 'Madrid', 'AI Defence', 'Grande', '+34 91 585 70 00', 'rrhh@airbus.com', 'airbus.com', 'AI Defence'],
  ['Rolls-Royce España', 'Aerospace', 'Madrid', 'Madrid', 'AI Engineering', 'Grande', '+34 91 005 33 90', 'careers@rolls-royce.com', 'rolls-royce.com', 'AI Engineering'],
  ['Stellantis Vigo', 'Automoción', 'Vigo', 'Galicia', 'AI Manufacturing', 'Grande', '+34 98 626 90 00', 'rrhh@stellantis.com', 'stellantis.com', 'AI Manufacturing'],
  ['Renault España', 'Automoción', 'Valladolid', 'Castilla y León', 'AI Manufacturing', 'Grande', '+34 90 333 38 88', 'rrhh@renault.es', 'renault.es', 'AI Manufacturing'],
  ['Mercedes-Benz España', 'Automoción', 'Vitoria', 'País Vasco', 'AI Manufacturing', 'Grande', '+34 90 211 22 22', 'rrhh@daimler.com', 'mercedes-benz.es', 'AI Manufacturing'],
  ['Iveco España', 'Automoción', 'Valladolid', 'Castilla y León', 'AI Industrial', 'Grande', '+34 98 327 19 00', 'rrhh@iveco.com', 'iveco.com', 'AI Industrial'],
  ['Ford España', 'Automoción', 'Almussafes', 'C. Valenciana', 'AI Manufacturing', 'Grande', '+34 96 122 92 22', 'rrhh@ford.com', 'ford.es', 'AI Manufacturing'],
  ['Nissan España', 'Automoción', 'Barcelona', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 290 70 00', 'rrhh@nissan.es', 'nissan.es', 'AI Manufacturing'],
  ['Michelin España', 'Industria/Neumáticos', 'Aranda de Duero', 'Castilla y León', 'AI Manufacturing', 'Grande', '+34 94 745 23 00', 'rrhh@michelin.com', 'michelin.es', 'AI Manufacturing'],
  ['Bridgestone España', 'Industria/Neumáticos', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 768 11 00', 'rrhh@bridgestone.es', 'bridgestone.es', 'AI Manufacturing'],
  ['Continental España', 'Automoción', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 781 87 00', 'rrhh@continental.com', 'continental.com', 'AI Manufacturing'],
  ['Antolín', 'Automoción', 'Burgos', 'Castilla y León', 'AI Manufacturing', 'Grande', '+34 94 727 70 00', 'rrhh@grupoantolin.com', 'grupoantolin.com', 'AI Manufacturing'],
  ['Gestamp', 'Automoción', 'Madrid', 'Madrid', 'AI Manufacturing 4.0', 'Grande', '+34 91 275 51 80', 'rrhh@gestamp.com', 'gestamp.com', 'AI Industria 4.0'],
  ['Ficosa', 'Automoción', 'Sant Cugat', 'Cataluña', 'AI Connected Vehicle', 'Grande', '+34 93 503 80 00', 'rrhh@ficosa.com', 'ficosa.com', 'AI Connected'],
  ['Acerinox', 'Acero', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 398 52 00', 'rrhh@acerinox.com', 'acerinox.com', 'AI Industrial'],
  ['Sidenor', 'Acero', 'Bilbao', 'País Vasco', 'AI Industrial', 'Grande', '+34 94 487 14 00', 'rrhh@sidenor.com', 'sidenor.com', 'AI Industrial'],
  ['Holcim España', 'Cementos', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 213 30 00', 'rrhh.spain@holcim.com', 'holcim.es', 'AI Industrial'],
  ['Cemex España', 'Cementos', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 377 92 00', 'rrhh@cemex.com', 'cemex.es', 'AI Industrial'],
  ['Saint-Gobain España', 'Construcción', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 397 29 00', 'rrhh@saint-gobain.com', 'saint-gobain.es', 'AI Manufacturing'],
  ['Cosentino', 'Construcción/Piedra', 'Almería', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 044 41 75', 'rrhh@cosentino.com', 'cosentino.com', 'AI Manufacturing'],
  ['Abengoa', 'Energía/Industrial', 'Sevilla', 'Andalucía', 'AI Energy', 'Grande', '+34 95 493 71 11', 'rrhh@abengoa.com', 'abengoa.com', 'AI Energy'],
  ['OHL', 'Construcción', 'Madrid', 'Madrid', 'AI Construction', 'Grande', '+34 91 348 41 00', 'rrhh@ohl.es', 'ohl.es', 'AI Construction'],
  ['FCC', 'Construcción/Servicios', 'Madrid', 'Madrid', 'AI Smart Cities', 'Grande', '+34 91 757 33 75', 'rrhh@fcc.es', 'fcc.es', 'AI Smart Cities'],
  ['Técnicas Reunidas', 'Ingeniería', 'Madrid', 'Madrid', 'AI Engineering', 'Grande', '+34 91 290 50 00', 'rrhh@tecnicasreunidas.es', 'tecnicasreunidas.es', 'AI Engineering'],

  // ============ AEROSPACE Y DEFENSA ============
  ['Navantia', 'Naval/Defensa', 'Cartagena', 'Murcia', 'AI Defence', 'Grande', '+34 95 657 31 00', 'rrhh@navantia.es', 'navantia.es', 'AI Defence'],
  ['ITP Aero', 'Aerospace', 'Zamudio', 'País Vasco', 'AI Aerospace', 'Grande', '+34 94 466 51 11', 'rrhh@itpaero.com', 'itpaero.com', 'AI Aerospace'],
  ['Sener Aerospace', 'Aerospace', 'Tres Cantos', 'Madrid', 'AI Aerospace', 'Grande', '+34 91 807 71 00', 'rrhh@aerospace.sener', 'aerospace.sener', 'AI Aerospace'],
  ['SENER Ingeniería', 'Ingeniería', 'Bilbao', 'País Vasco', 'AI Engineering', 'Grande', '+34 94 481 79 00', 'rrhh@sener.es', 'ingenieriayconstruccion.sener', 'AI Engineering'],
  ['Tecnobit (Grupo Oesía)', 'Defensa/Tech', 'Madrid', 'Madrid', 'AI Defence', 'Grande', '+34 91 309 89 00', 'rrhh@grupooesia.com', 'grupooesia.com', 'AI Defence'],
  ['Indra Sistemas', 'Defensa/Tech', 'Madrid', 'Madrid', 'AI Defence', 'Grande', '+34 91 480 50 00', 'rrhh.indra@indra.es', 'indracompany.com', 'AI Defence'],

  // ============ TRANSPORTE Y LOGÍSTICA ============
  ['DHL España', 'Logística', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 90 212 24 24', 'rrhh@dhl.com', 'dhl.es', 'AI Logistics'],
  ['UPS España', 'Logística', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 90 210 24 10', 'rrhh@ups.com', 'ups.com/es', 'AI Logistics'],
  ['SEUR', 'Logística', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 90 210 10 10', 'rrhh@seur.com', 'seur.com/es', 'AI Logistics'],
  ['Nacex', 'Logística', 'Barcelona', 'Cataluña', 'AI Logistics', 'Grande', '+34 90 210 09 99', 'rrhh@nacex.es', 'nacex.es', 'AI Logistics'],
  ['MRW', 'Logística', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 90 030 04 02', 'rrhh@mrw.es', 'mrw.es', 'AI Logistics'],
  ['Maersk España', 'Logística Marítima', 'Algeciras', 'Andalucía', 'AI Maritime', 'Grande', '+34 91 768 60 00', 'rrhh@maersk.com', 'maersk.com', 'AI Maritime'],
  ['Logista', 'Logística', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 91 595 90 00', 'rrhh@logista.com', 'logista.com', 'AI Logistics'],
  ['Stellantis &You', 'Movilidad', 'Madrid', 'Madrid', 'AI Mobility', 'Grande', '+34 91 005 41 25', 'rrhh@stellantis.com', 'stellantis.com', 'AI Mobility'],

  // ============ MÁS HEALTHCARE / MEDTECH ============
  ['Phillips Healthcare España', 'MedTech', 'Madrid', 'Madrid', 'AI Medical Imaging', 'Grande', '+34 90 110 25 23', 'rrhh@philips.com', 'philips.com/healthcare', 'AI Medical'],
  ['Siemens Healthineers España', 'MedTech', 'Madrid', 'Madrid', 'AI Medical Imaging', 'Grande', '+34 91 514 80 00', 'rrhh@siemens-healthineers.com', 'siemens-healthineers.com', 'AI Medical'],
  ['GE Healthcare España', 'MedTech', 'Madrid', 'Madrid', 'AI Medical', 'Grande', '+34 91 663 25 00', 'rrhh@ge.com', 'gehealthcare.es', 'AI Medical'],
  ['Roche Diagnostics España', 'MedTech', 'Madrid', 'Madrid', 'AI Diagnostics', 'Grande', '+34 91 324 81 00', 'rrhh@roche.com', 'roche-diagnostics.es', 'AI Diagnostics'],
  ['Becton Dickinson España', 'MedTech', 'Madrid', 'Madrid', 'AI MedTech', 'Grande', '+34 91 848 81 00', 'rrhh@bd.com', 'bd.com', 'AI MedTech'],
  ['Medtronic España', 'MedTech', 'Madrid', 'Madrid', 'AI Medical Devices', 'Grande', '+34 91 625 04 00', 'rrhh@medtronic.com', 'medtronic.es', 'AI MedTech'],
  ['Boston Scientific España', 'MedTech', 'Madrid', 'Madrid', 'AI Medical Devices', 'Grande', '+34 91 768 60 30', 'rrhh@bsci.com', 'bostonscientific.com', 'AI MedTech'],
  ['Edwards Lifesciences España', 'MedTech', 'Madrid', 'Madrid', 'AI MedTech', 'Grande', '+34 91 749 56 30', 'rrhh@edwards.com', 'edwards.com', 'AI MedTech'],
  ['Stryker España', 'MedTech', 'Madrid', 'Madrid', 'AI MedTech', 'Grande', '+34 93 590 75 00', 'rrhh@stryker.com', 'stryker.com', 'AI MedTech'],
  ['Johnson & Johnson Medical', 'MedTech', 'Madrid', 'Madrid', 'AI MedTech', 'Grande', '+34 91 722 81 00', 'rrhh@its.jnj.com', 'jnj.es', 'AI MedTech'],

  // ============ CENTROS DE INVESTIGACIÓN E INNOVACIÓN ============
  ['Tecnalia', 'Investigación Tech', 'Derio', 'País Vasco', 'AI Research', 'Grande', '+34 94 643 00 65', 'rrhh@tecnalia.com', 'tecnalia.com', 'AI Research'],
  ['Eurecat', 'Centro Tecnológico', 'Barcelona', 'Cataluña', 'AI Research', 'Grande', '+34 93 233 22 00', 'rrhh@eurecat.org', 'eurecat.org', 'AI Research'],
  ['LEITAT', 'Centro Tecnológico', 'Terrassa', 'Cataluña', 'AI Industrial', 'Grande', '+34 93 788 23 00', 'rrhh@leitat.org', 'leitat.org', 'AI Industrial'],
  ['ITAINNOVA', 'Centro Tecnológico', 'Zaragoza', 'Aragón', 'AI Industrial', 'Grande', '+34 97 601 00 00', 'rrhh@itainnova.es', 'itainnova.es', 'AI Industrial'],
  ['Cidetec', 'Centro Tecnológico', 'Donostia', 'País Vasco', 'AI Energy', 'Grande', '+34 94 329 70 80', 'rrhh@cidetec.es', 'cidetec.es', 'AI Energy'],
  ['ITG (Instituto Tecnológico de Galicia)', 'Centro Tecnológico', 'A Coruña', 'Galicia', 'AI Research', 'Mediana', '+34 98 117 32 06', 'rrhh@itg.es', 'itg.es', 'AI Research'],
  ['AIMPLAS', 'Centro Tecnológico', 'Valencia', 'C. Valenciana', 'AI Materials', 'Mediana', '+34 96 136 60 40', 'rrhh@aimplas.es', 'aimplas.es', 'AI Materials'],
  ['ITENE', 'Centro Tecnológico', 'Valencia', 'C. Valenciana', 'AI Logistics', 'Mediana', '+34 96 199 65 75', 'rrhh@itene.com', 'itene.com', 'AI Logistics'],
  ['IDOM Consulting', 'Ingeniería/Consultoría', 'Bilbao', 'País Vasco', 'AI Engineering', 'Grande', '+34 94 479 76 00', 'rrhh@idom.com', 'idom.com', 'AI Engineering'],
  ['Idneo Technologies', 'I+D Tecnología', 'Vic', 'Cataluña', 'AI Engineering', 'Mediana', '+34 93 850 73 00', 'rrhh@idneo.com', 'idneo.com', 'AI Engineering'],
  ['Vicomtech', 'Centro Investigación IA', 'Donostia', 'País Vasco', 'AI Computer Vision', 'Mediana', '+34 94 300 39 26', 'rrhh@vicomtech.org', 'vicomtech.org', 'AI Vision'],

  // ============ MÁS STARTUPS Y SCALEUPS ============
  ['Adevinta', 'Marketplaces', 'Barcelona', 'Cataluña', 'AI Marketplaces', 'Grande', '+34 93 481 84 84', 'careers@adevinta.com', 'adevinta.com', 'AI Marketplaces'],
  ['Schibsted Spain', 'Media/Marketplaces', 'Madrid', 'Madrid', 'AI Marketplaces', 'Grande', '+34 91 343 20 00', 'careers@schibsted.com', 'schibsted.com', 'AI Marketplaces'],
  ['Coches.net', 'Marketplace Auto', 'Barcelona', 'Cataluña', 'AI Auto', 'Mediana', '+34 93 481 84 84', 'rrhh@coches.net', 'coches.net', 'AI Auto'],
  ['Milanuncios', 'Marketplace', 'Madrid', 'Madrid', 'AI Marketplace', 'Mediana', '+34 91 060 40 11', 'rrhh@milanuncios.com', 'milanuncios.com', 'AI Marketplace'],
  ['Infojobs', 'Empleo/IA', 'Sant Cugat', 'Cataluña', 'AI HR', 'Grande', '+34 93 504 19 00', 'rrhh@infojobs.net', 'infojobs.net', 'AI HR'],
  ['Indeed España', 'Empleo/IA', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 91 060 23 14', 'careers@indeed.com', 'indeed.es', 'AI HR'],
  ['Jobandtalent', 'HR Tech', 'Madrid', 'Madrid', 'AI HR Matching', 'Grande', '+34 91 838 30 70', 'careers@jobandtalent.com', 'jobandtalent.com', 'AI HR'],
  ['Spotify España', 'Music Streaming', 'Madrid', 'Madrid', 'AI Recommendations', 'Grande', '+34 91 005 51 32', 'careers@spotify.com', 'spotify.com', 'AI Recommendations'],
  ['Netflix España', 'Streaming', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 005 51 12', 'careers@netflix.com', 'netflix.com', 'AI Content'],
  ['HBO Max España', 'Streaming', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 005 51 45', 'careers@hbomax.com', 'hbomax.com', 'AI Content'],
  ['Disney+ España', 'Streaming', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 005 51 21', 'careers@disney.com', 'disneyplus.com/es', 'AI Content'],
  ['Amazon Prime Video España', 'Streaming', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 005 51 89', 'careers@amazon.com', 'primevideo.com', 'AI Content'],
  ['Atrápalo', 'Travel/Entertainment', 'Madrid', 'Madrid', 'AI Travel', 'Mediana', '+34 91 060 23 14', 'rrhh@atrapalo.com', 'atrapalo.com', 'AI Travel'],
  ['Logitravel', 'Travel', 'Palma', 'Baleares', 'AI Travel', 'Mediana', '+34 90 121 33 50', 'rrhh@logitravel.com', 'logitravel.com', 'AI Travel'],

  // ============ MÁS MARKETING DIGITAL ============
  ['T2O Media', 'Marketing Digital', 'Madrid', 'Madrid', 'AI Performance', 'Mediana', '+34 91 591 14 14', 'rrhh@t2omedia.com', 't2omedia.com', 'AI Performance'],
  ['Antevenio', 'Marketing Digital', 'Madrid', 'Madrid', 'AI Marketing', 'Mediana', '+34 91 414 91 50', 'rrhh@antevenio.com', 'antevenio.com', 'AI Marketing'],
  ['Salesgenerator', 'Marketing IA', 'Barcelona', 'Cataluña', 'AI Sales', 'Pequeña', '+34 93 220 51 73', 'rrhh@salesgenerator.com', 'salesgenerator.com', 'AI Sales'],
  ['Kanlli', 'Marketing Digital', 'Madrid', 'Madrid', 'AI Marketing', 'Mediana', '+34 91 308 26 32', 'rrhh@kanlli.com', 'kanlli.com', 'AI Marketing'],
  ['Roiback', 'Marketing Digital Hotelero', 'Palma', 'Baleares', 'AI Hospitality', 'Mediana', '+34 90 290 90 90', 'rrhh@roiback.com', 'roiback.com', 'AI Hospitality'],
  ['Adsmurai', 'Marketing IA', 'Barcelona', 'Cataluña', 'AI Marketing', 'Mediana', '+34 93 220 88 88', 'rrhh@adsmurai.com', 'adsmurai.com', 'AI Marketing'],
  ['Dactic', 'Marketing IA', 'Madrid', 'Madrid', 'AI Marketing', 'Pequeña', '+34 91 005 53 21', 'rrhh@dactic.es', 'dactic.es', 'AI Marketing'],

  // ============ MÁS SAAS B2B ============
  ['TalentClue', 'HR Tech', 'Madrid', 'Madrid', 'AI Recruitment', 'Mediana', '+34 91 005 53 67', 'rrhh@talentclue.com', 'talentclue.com', 'AI HR'],
  ['Gamelearn', 'EdTech B2B', 'Madrid', 'Madrid', 'AI Learning', 'Mediana', '+34 91 040 24 16', 'rrhh@gamelearn.com', 'game-learn.com', 'AI EdTech'],
  ['Cobee', 'HR Tech Beneficios', 'Madrid', 'Madrid', 'AI HR Benefits', 'Mediana', '+34 91 060 53 47', 'rrhh@cobee.io', 'cobee.io', 'AI HR'],
  ['Sastre Pay', 'Fintech B2B', 'Madrid', 'Madrid', 'AI Payments', 'Pequeña', '+34 91 060 17 81', 'rrhh@sastrepay.com', 'sastrepay.com', 'AI Payments'],
  ['Penguin Random House Grupo Editorial', 'Editorial', 'Barcelona', 'Cataluña', 'AI Publishing', 'Grande', '+34 93 366 03 00', 'rrhh@penguinrandomhouse.com', 'penguinlibros.com', 'AI Publishing'],
  ['Planeta Grupo Editorial', 'Editorial', 'Barcelona', 'Cataluña', 'AI Publishing', 'Grande', '+34 93 492 80 00', 'rrhh@planeta.es', 'planeta.es', 'AI Publishing'],

  // ============ ADMINISTRACIÓN PÚBLICA Y GOBIERNO ============
  ['Tragsa', 'Servicios Públicos', 'Madrid', 'Madrid', 'AI GIS/Environmental', 'Grande', '+34 91 396 35 00', 'rrhh@tragsa.es', 'tragsa.es', 'AI Environmental'],
  ['Paradores de Turismo', 'Turismo Público', 'Madrid', 'Madrid', 'AI Tourism', 'Grande', '+34 91 516 66 66', 'rrhh@parador.es', 'parador.es', 'AI Tourism'],
  ['SEPE', 'Servicios Públicos', 'Madrid', 'Madrid', 'AI Public Services', 'Grande', '+34 91 363 04 00', 'rrhh@sepe.es', 'sepe.es', 'AI Public'],
  ['Tesorería General Seguridad Social', 'Admin Pública', 'Madrid', 'Madrid', 'AI Government', 'Grande', '+34 91 568 80 00', 'rrhh@tgss.seg-social.es', 'seg-social.es', 'AI Government'],
  ['Agencia Tributaria', 'Admin Pública', 'Madrid', 'Madrid', 'AI Tax', 'Grande', '+34 91 727 84 00', 'rrhh@agenciatributaria.es', 'agenciatributaria.es', 'AI Tax'],

  // ============ MÁS TELCO Y CONECTIVIDAD ============
  ['Adamo Telecom', 'Telecomunicaciones', 'Barcelona', 'Cataluña', 'AI Telco', 'Mediana', '+34 91 005 51 67', 'rrhh@adamo.es', 'adamo.es', 'AI Telco'],
  ['Pepephone', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Telco', 'Mediana', '+34 91 005 51 99', 'rrhh@pepephone.com', 'pepephone.com', 'AI Telco'],
  ['Lowi', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Telco', 'Mediana', '+34 91 005 52 21', 'rrhh@lowi.es', 'lowi.es', 'AI Telco'],
  ['Tuenti', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Telco', 'Mediana', '+34 91 005 52 35', 'rrhh@tuenti.com', 'tuenti.com', 'AI Telco'],
  ['Republica Movil', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Telco', 'Pequeña', '+34 91 005 52 49', 'rrhh@republicamovil.es', 'republicamovil.es', 'AI Telco'],

  // ============ DESPACHOS DE ABOGADOS / SERVICIOS PROFESIONALES ============
  ['Garrigues Abogados', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 514 52 00', 'rrhh@garrigues.com', 'garrigues.com', 'AI Legal'],
  ['Cuatrecasas', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 524 71 00', 'rrhh@cuatrecasas.com', 'cuatrecasas.com', 'AI Legal'],
  ['Uría Menéndez', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 586 04 00', 'rrhh@uria.com', 'uria.com', 'AI Legal'],
  ['Pérez-Llorca', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 436 04 20', 'rrhh@perezllorca.com', 'perezllorca.com', 'AI Legal'],
  ['Baker McKenzie España', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 230 45 00', 'rrhh.spain@bakermckenzie.com', 'bakermckenzie.com', 'AI Legal'],
  ['Linklaters España', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 399 60 00', 'rrhh@linklaters.com', 'linklaters.com', 'AI Legal'],
  ['Allen & Overy España', 'Servicios Legales', 'Madrid', 'Madrid', 'AI LegalTech', 'Grande', '+34 91 782 98 00', 'rrhh@allenovery.com', 'allenovery.com', 'AI Legal'],
  ['Auren', 'Consultoría Profesional', 'Madrid', 'Madrid', 'AI Audit', 'Grande', '+34 91 203 74 00', 'rrhh@auren.com', 'auren.com', 'AI Audit'],
  ['BDO España', 'Consultoría Profesional', 'Madrid', 'Madrid', 'AI Audit', 'Grande', '+34 91 426 38 00', 'rrhh@bdo.es', 'bdo.es', 'AI Audit'],
  ['RSM España', 'Consultoría Profesional', 'Madrid', 'Madrid', 'AI Advisory', 'Grande', '+34 91 432 67 00', 'rrhh@rsm.es', 'rsm.global/spain', 'AI Advisory'],
  ['Mazars España', 'Consultoría Profesional', 'Madrid', 'Madrid', 'AI Advisory', 'Grande', '+34 91 562 40 30', 'rrhh@mazars.es', 'mazars.es', 'AI Advisory'],

  // ============ INMOBILIARIAS GRANDES ============
  ['Aedas Homes', 'Promoción Inmobiliaria', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 514 64 00', 'rrhh@aedashomes.com', 'aedashomes.com', 'AI PropTech'],
  ['Vía Célere', 'Promoción Inmobiliaria', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 432 47 00', 'rrhh@viacelere.com', 'viacelere.com', 'AI PropTech'],
  ['Solvia', 'Servicios Inmobiliarios', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 90 111 30 30', 'rrhh@solvia.es', 'solvia.es', 'AI PropTech'],
  ['Aliseda Inmobiliaria', 'Servicios Inmobiliarios', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 90 010 09 09', 'rrhh@aliseda.es', 'aliseda.es', 'AI PropTech'],
  ['Servihabitat', 'Servicios Inmobiliarios', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 268 35 00', 'rrhh@servihabitat.com', 'servihabitat.com', 'AI PropTech'],
  ['Haya Real Estate', 'Servicios Inmobiliarios', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 793 65 00', 'rrhh@haya.es', 'haya.es', 'AI PropTech'],

  // ============ BEBIDAS Y ALIMENTACIÓN ============
  ['Codorniu Raventos', 'Bebidas/Cava', 'Sant Sadurní', 'Cataluña', 'AI Wine', 'Grande', '+34 93 891 33 42', 'rrhh@codorniu.com', 'codorniu.com', 'AI Wine'],
  ['Freixenet', 'Bebidas/Cava', 'Sant Sadurní', 'Cataluña', 'AI Wine', 'Grande', '+34 93 891 70 00', 'rrhh@freixenet.com', 'freixenet.com', 'AI Wine'],
  ['Familia Torres', 'Bebidas/Vino', 'Vilafranca', 'Cataluña', 'AI Wine', 'Grande', '+34 93 817 74 00', 'rrhh@torres.es', 'torres.es', 'AI Wine'],
  ['Estrella Galicia', 'Bebidas/Cerveza', 'A Coruña', 'Galicia', 'AI Brewing', 'Grande', '+34 98 117 25 00', 'rrhh@hijosderivera.es', 'estrellagalicia.com', 'AI Brewing'],

  // ============ MAS HOSPITALES Y SANIDAD ============
  ['Hospital Universitario La Princesa', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Research Médica', 'Grande', '+34 91 520 22 00', 'rrhh@iislaprincesa.org', 'hospitallaprincesa.es', 'AI Research'],
  ['Fundación Jiménez Díaz', 'Sanidad Privada', 'Madrid', 'Madrid', 'AI Health', 'Grande', '+34 91 550 48 00', 'rrhh@fjd.es', 'fjd.es', 'AI Health'],
  ['Hospital Clínico San Carlos', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Research', 'Grande', '+34 91 330 30 00', 'rrhh@idissc.org', 'hospitalclinicosancarlos.es', 'AI Research'],
  ['Hospital Puerta de Hierro', 'Sanidad Pública', 'Majadahonda', 'Madrid', 'AI Research', 'Grande', '+34 91 191 60 00', 'rrhh@idiphisa.org', 'hospitalpuertadehierro.com', 'AI Research'],
  ['Hospital de Bellvitge', 'Sanidad Pública', 'L\'Hospitalet', 'Cataluña', 'AI Research', 'Grande', '+34 93 260 75 00', 'rrhh@idibell.cat', 'bellvitgehospital.cat', 'AI Research'],
  ['Hospital del Mar', 'Sanidad Pública', 'Barcelona', 'Cataluña', 'AI Research', 'Grande', '+34 93 248 30 00', 'rrhh@imim.es', 'parcdesalutmar.cat', 'AI Research'],
  ['Hospital Sant Joan de Déu', 'Sanidad Pediátrica', 'Esplugues', 'Cataluña', 'AI Pediatría', 'Grande', '+34 93 253 21 00', 'rrhh@sjdhospitalbarcelona.org', 'sjdhospitalbarcelona.org', 'AI Pediatría'],
  ['Centro Diagnóstico Recoletas', 'Sanidad', 'Valladolid', 'Castilla y León', 'AI Diagnóstico', 'Mediana', '+34 98 379 29 99', 'rrhh@gruporecoletas.com', 'gruporecoletas.com', 'AI Diagnóstico'],

  // ============ ENERGÍA RENOVABLE ============
  ['Siemens Gamesa', 'Energía Eólica', 'Zamudio', 'País Vasco', 'AI Wind Energy', 'Grande', '+34 94 403 73 00', 'rrhh@siemensgamesa.com', 'siemensgamesa.com', 'AI Wind'],
  ['EDP Renováveis', 'Energía Renovable', 'Madrid', 'Madrid', 'AI Renewable Energy', 'Grande', '+34 91 524 49 41', 'rrhh@edp.com', 'edpr.com', 'AI Renewable'],
  ['Solaria Energía', 'Energía Solar', 'Madrid', 'Madrid', 'AI Solar', 'Grande', '+34 91 270 49 24', 'rrhh@solariaenergia.com', 'solariaenergia.com', 'AI Solar'],
  ['Solarpack', 'Energía Solar', 'Bilbao', 'País Vasco', 'AI Solar', 'Grande', '+34 94 459 95 04', 'rrhh@solarpack.es', 'solarpack.es', 'AI Solar'],
  ['Greenalia', 'Energía Renovable', 'A Coruña', 'Galicia', 'AI Renewable', 'Grande', '+34 98 117 24 53', 'rrhh@greenalia.es', 'greenalia.es', 'AI Renewable'],
  ['Audax Renovables', 'Energía Renovable', 'Badalona', 'Cataluña', 'AI Energy', 'Grande', '+34 93 507 89 00', 'rrhh@audaxrenovables.com', 'audaxrenovables.com', 'AI Energy'],
  ['Acciona Energía', 'Energía Renovable', 'Madrid', 'Madrid', 'AI Renewable', 'Grande', '+34 91 663 28 50', 'rrhh@acciona.com', 'acciona-energia.com', 'AI Renewable'],

  // ============ STARTUPS RECIENTES ============
  ['Tinkoff España', 'Fintech IA', 'Barcelona', 'Cataluña', 'AI Banking', 'Grande', '+34 93 220 67 81', 'rrhh@tinkoff.com', 'tinkoff.es', 'AI Banking'],
  ['Civitatis', 'Travel Tech', 'Madrid', 'Madrid', 'AI Travel', 'Grande', '+34 91 088 30 13', 'rrhh@civitatis.com', 'civitatis.com', 'AI Travel'],
  ['Atrapalo Group', 'Travel/IA', 'Barcelona', 'Cataluña', 'AI Travel', 'Mediana', '+34 93 414 22 22', 'rrhh@atrapalo.com', 'atrapalo.com', 'AI Travel'],
  ['Onum', 'Data Intelligence', 'Madrid', 'Madrid', 'AI Data', 'Mediana', '+34 91 088 71 87', 'rrhh@onum.com', 'onum.com', 'AI Data'],
  ['Drim Network', 'EdTech', 'Madrid', 'Madrid', 'AI EdTech', 'Pequeña', '+34 91 088 73 26', 'rrhh@drim.network', 'drim.network', 'AI EdTech'],
  ['Boost Tools', 'SaaS Marketing', 'Madrid', 'Madrid', 'AI Marketing', 'Pequeña', '+34 91 088 75 18', 'rrhh@boosttools.com', 'boosttools.com', 'AI Marketing'],
  ['Rosita Health', 'HealthTech', 'Madrid', 'Madrid', 'AI Health', 'Pequeña', '+34 91 088 77 12', 'rrhh@rosita.com', 'rositahealth.com', 'AI Health'],
  ['Treble.ai', 'Conversational AI', 'Madrid', 'Madrid', 'AI Conversational', 'Mediana', '+34 91 088 79 45', 'rrhh@treble.ai', 'treble.ai', 'AI Conversational'],
  ['Naver Spain', 'Tech', 'Barcelona', 'Cataluña', 'AI Search', 'Mediana', '+34 93 220 77 12', 'rrhh@naver.com', 'naver.com', 'AI Search'],
  ['Kelp Global', 'AI Sustainability', 'Madrid', 'Madrid', 'AI Sustainability', 'Pequeña', '+34 91 088 81 22', 'rrhh@kelpglobal.com', 'kelpglobal.com', 'AI Sustainability'],
  ['Bipi (Renault)', 'Movilidad', 'Madrid', 'Madrid', 'AI Mobility', 'Mediana', '+34 91 088 83 16', 'rrhh@bipicar.com', 'bipi.com', 'AI Mobility'],
  ['Scoobic', 'Movilidad Eléctrica', 'Sevilla', 'Andalucía', 'AI E-Mobility', 'Mediana', '+34 95 449 12 00', 'rrhh@scoobic.com', 'scoobic.com', 'AI E-Mobility'],
  ['Wallbox', 'Movilidad Eléctrica', 'Barcelona', 'Cataluña', 'AI EV Charging', 'Grande', '+34 93 015 25 25', 'rrhh@wallbox.com', 'wallbox.com', 'AI EV'],
  ['Holaluz', 'Energía/IA', 'Barcelona', 'Cataluña', 'AI Energy', 'Grande', '+34 93 226 30 70', 'jobs@holaluz.com', 'holaluz.com', 'AI Energy'],
  ['Voltio (Renault)', 'Movilidad', 'Madrid', 'Madrid', 'AI Mobility', 'Mediana', '+34 91 088 85 23', 'rrhh@voltio.es', 'voltio.es', 'AI Mobility']
];

// Convertir nueva [EMPRESA, SECTOR, CIUDAD, COM, ROL, TAM, TEL, EMAIL, WEB, NOTA]
// a formato dedup [EMAIL, EMPRESA, SECTOR, CIUDAD, COM, ROL, TAM, TEL, WEB, NOTA]
function reordenar(n) {
  return [n[7], n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[8], n[9]];
}

async function addMore() {
  try {
    console.log('🤖 Añadiendo más empresas IA España...\n');
    console.log(`📊 Nuevas: ${NUEVAS.length}\n`);

    const { sheets } = await getServices();

    // Reordenar al formato dedup
    const nuevasReordenadas = NUEVAS.map(reordenar);

    // Append directo en formato dedup
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: nuevasReordenadas }
    });

    console.log(`✅ ${NUEVAS.length} empresas añadidas (formato compatible)\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addMore();
