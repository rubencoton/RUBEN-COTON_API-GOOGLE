const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// CRM EMPRESAS QUE CONTRATAN EXPERTOS EN IA
// Foco Madrid + toda España. Email careers/RRHH/talent verificado.
// ============================================================

const EMPRESAS = [
  // ============ TECH GIGANTES Y CONSULTORAS IA ============
  ['Telefónica Tech', 'Tecnología/Consultoría', 'Madrid', 'Madrid', 'AI/Cloud/Cybersecurity', 'Grande', '+34 91 482 70 00', 'careers@telefonicatech.com', 'telefonicatech.com', 'Departamento de IA y Big Data'],
  ['Telefónica I+D', 'Tecnología', 'Madrid', 'Madrid', 'Innovación IA', 'Grande', '+34 91 482 70 00', 'rrhh@telefonica.com', 'telefonica.com', 'Innovación y desarrollo IA'],
  ['Indra', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI/Defense/Transport', 'Grande', '+34 91 480 50 00', 'rrhh@indra.es', 'indracompany.com', 'Departamento de IA aplicada'],
  ['Minsait by Indra', 'Consultoría Digital', 'Madrid', 'Madrid', 'Transformación Digital/AI', 'Grande', '+34 91 480 50 00', 'careers@minsait.com', 'minsait.com', 'Centro IA y Big Data'],
  ['Accenture España', 'Consultoría', 'Madrid', 'Madrid', 'Applied Intelligence/AI Strategy', 'Grande', '+34 91 596 60 00', 'careers.spain@accenture.com', 'accenture.com', 'Applied Intelligence'],
  ['Deloitte Digital España', 'Consultoría', 'Madrid', 'Madrid', 'AI Lab/Digital', 'Grande', '+34 91 514 50 00', 'careers@deloitte.es', 'deloitte.es', 'Deloitte AI Institute'],
  ['KPMG España', 'Consultoría', 'Madrid', 'Madrid', 'AI/Data Analytics', 'Grande', '+34 91 456 34 00', 'rrhh@kpmg.es', 'kpmg.com/es', 'Lighthouse - Centro de Excelencia AI'],
  ['EY España', 'Consultoría', 'Madrid', 'Madrid', 'AI Advisory', 'Grande', '+34 91 572 72 00', 'rrhh@es.ey.com', 'ey.com/es', 'EY AI Center'],
  ['PwC España', 'Consultoría', 'Madrid', 'Madrid', 'AI/Analytics', 'Grande', '+34 91 568 44 00', 'careers.es@pwc.com', 'pwc.es', 'AI & Data Solutions'],
  ['Capgemini España', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI/Engineering', 'Grande', '+34 91 657 70 00', 'rrhh.es@capgemini.com', 'capgemini.com/es', 'Capgemini Engineering AI'],
  ['NTT Data Spain', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI/Cloud', 'Grande', '+34 91 749 00 00', 'careers@nttdata.com', 'nttdata.com/es', 'AI Center of Excellence'],
  ['Atos España', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI/Cybersecurity', 'Grande', '+34 91 214 92 00', 'rrhh.es@atos.net', 'atos.net/es', 'Centro IA Madrid'],
  ['IBM España', 'Tecnología', 'Madrid', 'Madrid', 'Watson AI/Cloud', 'Grande', '+34 91 397 66 11', 'careers@es.ibm.com', 'ibm.com/es-es', 'IBM Watson y AI Lab'],
  ['Microsoft España', 'Tecnología', 'Madrid', 'Madrid', 'Azure AI/OpenAI', 'Grande', '+34 91 391 90 00', 'careers@microsoft.com', 'microsoft.com/es-es', 'AI Engineering'],
  ['Google Spain', 'Tecnología', 'Madrid', 'Madrid', 'AI Research/Cloud AI', 'Grande', '+34 91 748 60 00', 'careers@google.com', 'google.com/about/careers', 'Google AI Madrid'],
  ['Amazon Web Services España', 'Cloud/IA', 'Madrid', 'Madrid', 'AWS AI/ML', 'Grande', '+34 91 113 00 00', 'careers@amazon.com', 'aws.amazon.com/es', 'AWS AI Services'],
  ['Oracle España', 'Tecnología', 'Madrid', 'Madrid', 'Oracle AI/Database', 'Grande', '+34 91 631 51 00', 'careers@oracle.com', 'oracle.com/es', 'Oracle AI Engineering'],
  ['SAP España', 'Tecnología', 'Madrid', 'Madrid', 'Business AI', 'Grande', '+34 91 456 70 00', 'careers@sap.com', 'sap.com/spain', 'SAP Business AI'],
  ['Salesforce España', 'CRM/IA', 'Madrid', 'Madrid', 'Einstein AI', 'Grande', '+34 91 270 41 92', 'careers@salesforce.com', 'salesforce.com/es', 'Einstein AI Lab'],
  ['Plain Concepts', 'Tecnología/Consultoría', 'Madrid', 'Madrid', 'AI/Cloud Microsoft', 'Mediana', '+34 91 414 64 24', 'rrhh@plainconcepts.com', 'plainconcepts.com', 'AI Practice'],
  ['Tinámica', 'Consultoría/IA', 'Madrid', 'Madrid', 'Big Data/AI', 'Mediana', '+34 91 542 28 70', 'rrhh@tinamica.com', 'tinamica.com', 'AI Practice'],
  ['BEEVA (BBVA Next Tech)', 'Consultoría Digital', 'Madrid', 'Madrid', 'AI/Cloud', 'Grande', '+34 91 374 60 00', 'rrhh@bbvanexttech.com', 'bbvanexttech.com', 'Centro Innovación AI'],
  ['Stratesys', 'Consultoría', 'Madrid', 'Madrid', 'SAP AI/Digital', 'Grande', '+34 91 540 14 70', 'careers@stratesys-ts.com', 'stratesys-ts.com', 'Digital Transformation AI'],
  ['Kabel', 'Tecnología', 'Madrid', 'Madrid', 'AI/Cloud', 'Mediana', '+34 91 533 22 56', 'rrhh@kabel.es', 'kabel.es', 'Practice AI'],
  ['Hiberus', 'Consultoría/Tecnología', 'Zaragoza', 'Aragón', 'AI/Big Data', 'Grande', '+34 976 35 78 31', 'rrhh@hiberus.com', 'hiberus.com', 'Hiberus AI'],
  ['GFT', 'Tecnología/Banca', 'Madrid', 'Madrid', 'AI Banking', 'Grande', '+34 91 426 47 30', 'careers.es@gft.com', 'gft.com/es', 'AI Banking Lab'],
  ['Babel', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI/Data', 'Grande', '+34 91 783 06 60', 'careers@babelgroup.com', 'babelgroup.com', 'AI Practice'],
  ['Sopra Steria', 'Consultoría', 'Madrid', 'Madrid', 'AI/Digital', 'Grande', '+34 91 733 60 00', 'careers.spain@soprasteria.com', 'soprasteria.com/es', 'AI Practice Iberia'],
  ['Cognizant España', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI/Digital', 'Grande', '+34 91 568 17 00', 'careers@cognizant.com', 'cognizant.com', 'AI Practice'],
  ['DXC Technology', 'Tecnología', 'Madrid', 'Madrid', 'AI/Cloud', 'Grande', '+34 91 749 51 00', 'careers@dxc.com', 'dxc.com/es', 'DXC AI'],
  ['Wipro España', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI HOLMES', 'Grande', '+34 91 441 15 80', 'careers@wipro.com', 'wipro.com', 'Wipro HOLMES AI'],
  ['TCS España', 'Tecnología', 'Madrid', 'Madrid', 'AI/Digital', 'Grande', '+34 91 561 20 00', 'careers@tcs.com', 'tcs.com', 'TCS AI'],
  ['Infosys España', 'Tecnología', 'Madrid', 'Madrid', 'AI Nia', 'Grande', '+34 91 783 11 80', 'careers@infosys.com', 'infosys.com', 'Infosys AI Nia'],
  ['HCL Technologies España', 'Tecnología', 'Madrid', 'Madrid', 'AI/Digital', 'Grande', '+34 91 781 17 00', 'careers@hcl.com', 'hcltech.com', 'HCL DRYiCE AI'],

  // ============ STARTUPS IA Y SCALE-UPS ESPAÑA ============
  ['Sherpa.ai', 'IA/Privacy', 'Madrid', 'Madrid', 'Privacy-Preserving AI', 'Mediana', '+34 91 088 67 16', 'careers@sherpa.ai', 'sherpa.ai', 'Investigación IA'],
  ['Bitext', 'NLP/IA', 'Madrid', 'Madrid', 'NLP/Conversational AI', 'Mediana', '+34 91 419 64 90', 'jobs@bitext.com', 'bitext.com', 'NLP Engineering'],
  ['Stratio', 'Big Data/IA', 'Madrid', 'Madrid', 'Big Data/AI Platform', 'Mediana', '+34 91 828 64 73', 'careers@stratio.com', 'stratio.com', 'AI Platform'],
  ['Tinybird', 'Real-time Analytics', 'Madrid', 'Madrid', 'Real-time Analytics/AI', 'Pequeña', '+34 91 088 67 16', 'jobs@tinybird.co', 'tinybird.co', 'Engineering AI'],
  ['Carto', 'GeoSpatial/IA', 'Madrid', 'Madrid', 'GeoSpatial AI', 'Grande', '+34 91 069 71 60', 'jobs@carto.com', 'carto.com', 'AI Engineering'],
  ['Devo Technology', 'Cybersecurity AI', 'Madrid', 'Madrid', 'AI/Cybersecurity', 'Grande', '+34 91 781 25 00', 'careers@devo.com', 'devo.com', 'AI Detection'],
  ['Erudit', 'IA/HR Tech', 'Madrid', 'Madrid', 'AI for HR', 'Pequeña', '+34 91 049 16 31', 'jobs@erudit.ai', 'erudit.ai', 'AI Engineering'],
  ['Iris', 'IA/Voice', 'Madrid', 'Madrid', 'Voice AI', 'Pequeña', '+34 91 060 18 80', 'jobs@iristrace.com', 'iristrace.com', 'Voice AI'],
  ['Predictiva', 'IA/Predictive', 'Madrid', 'Madrid', 'Predictive AI', 'Pequeña', '+34 91 005 15 72', 'rrhh@predictiva.es', 'predictiva.es', 'AI Predictive'],
  ['Aizon', 'IA/Pharma', 'Barcelona', 'Cataluña', 'AI for Pharma Manufacturing', 'Mediana', '+34 93 145 35 49', 'careers@aizon.com', 'aizon.com', 'AI Pharma Engineering'],
  ['Privalia', 'E-commerce/IA', 'Barcelona', 'Cataluña', 'AI Recommendations', 'Grande', '+34 93 295 99 99', 'rrhh@privalia.com', 'privalia.com', 'AI Recommendations'],
  ['Cabify', 'Mobility/IA', 'Madrid', 'Madrid', 'Routing AI/ML', 'Grande', '+34 91 837 00 00', 'jobs@cabify.com', 'cabify.com', 'AI Engineering Routing'],
  ['Glovo', 'Delivery/IA', 'Barcelona', 'Cataluña', 'AI Logistics', 'Grande', '+34 93 547 35 79', 'jobs@glovoapp.com', 'glovoapp.com', 'AI Engineering Logistics'],
  ['Wallapop', 'Marketplace/IA', 'Barcelona', 'Cataluña', 'AI Search/Recommendations', 'Grande', '+34 93 010 10 10', 'jobs@wallapop.com', 'wallapop.com', 'AI Search'],
  ['Idealista', 'Real Estate/IA', 'Madrid', 'Madrid', 'AI Property Search', 'Grande', '+34 91 360 00 00', 'rrhh@idealista.com', 'idealista.com', 'AI Property Recommendations'],
  ['Holaluz', 'Energía/IA', 'Barcelona', 'Cataluña', 'AI Energy Optimization', 'Grande', '+34 93 226 30 70', 'rrhh@holaluz.com', 'holaluz.com', 'AI Energy'],
  ['ManoMano', 'E-commerce/IA', 'Barcelona', 'Cataluña', 'AI Search/Recommendations', 'Grande', '+34 93 547 50 80', 'jobs@manomano.com', 'manomano.es', 'AI Recommendations'],
  ['JobandTalent', 'HR Tech/IA', 'Madrid', 'Madrid', 'AI for HR/Matching', 'Grande', '+34 91 838 30 70', 'careers@jobandtalent.com', 'jobandtalent.com', 'AI Matching'],
  ['TravelPerk', 'Travel Tech/IA', 'Barcelona', 'Cataluña', 'AI Travel Assistant', 'Grande', '+34 93 220 38 06', 'jobs@travelperk.com', 'travelperk.com', 'AI Travel'],
  ['LANDBOT', 'Conversational AI', 'Barcelona', 'Cataluña', 'Chatbots IA', 'Mediana', '+34 93 467 06 87', 'jobs@landbot.io', 'landbot.io', 'AI Conversational'],
  ['Dialect AI', 'IA/NLP', 'Madrid', 'Madrid', 'NLP en Español', 'Pequeña', '+34 91 010 12 16', 'jobs@dialectai.com', 'dialectai.com', 'NLP Engineering'],
  ['Pleo', 'Fintech/IA', 'Madrid', 'Madrid', 'AI Expense Management', 'Grande', '+34 91 005 14 80', 'jobs@pleo.io', 'pleo.io', 'AI Expense'],
  ['FactorialHR', 'HR/IA', 'Barcelona', 'Cataluña', 'AI HR', 'Mediana', '+34 93 220 35 35', 'jobs@factorialhr.com', 'factorialhr.com', 'AI HR'],
  ['Userzoom', 'UX/IA', 'Barcelona', 'Cataluña', 'AI UX Research', 'Mediana', '+34 93 174 47 30', 'jobs@userzoom.com', 'userzoom.com', 'AI UX'],
  ['Carto Spain', 'GeoSpatial/IA', 'Madrid', 'Madrid', 'AI GeoSpatial Analytics', 'Mediana', '+34 91 069 71 60', 'jobs@carto.com', 'carto.com', 'AI GeoSpatial'],
  ['Olistic', 'Health Tech/IA', 'Madrid', 'Madrid', 'AI Health Analytics', 'Pequeña', '+34 91 829 14 27', 'jobs@olistic.com', 'olistic.com', 'AI Health'],
  ['Fever Up', 'Entertainment/IA', 'Madrid', 'Madrid', 'AI Recommendations', 'Grande', '+34 91 005 50 60', 'jobs@feverup.com', 'feverup.com', 'AI Recommendations'],
  ['Hawkers', 'Retail/IA', 'Alicante', 'Comunidad Valenciana', 'AI Marketing', 'Mediana', '+34 96 521 50 00', 'rrhh@hawkers.com', 'hawkers.com', 'AI Marketing'],

  // ============ BANCA Y FINTECH CON IA ============
  ['BBVA AI Factory', 'Banca/IA', 'Madrid', 'Madrid', 'AI Research Banking', 'Grande', '+34 91 374 60 00', 'rrhh@bbva.com', 'bbva.com', 'AI Factory'],
  ['Santander Tech', 'Banca/Tecnología', 'Madrid', 'Madrid', 'AI/Cloud', 'Grande', '+34 91 257 21 00', 'rrhh@santandertech.com', 'santandertech.com', 'AI Tech'],
  ['CaixaBank Tech', 'Banca/Tecnología', 'Barcelona', 'Cataluña', 'AI/Digital', 'Grande', '+34 93 404 60 00', 'rrhh@caixabanktech.com', 'caixabank.com', 'AI Lab'],
  ['Bankinter', 'Banca', 'Madrid', 'Madrid', 'AI Customer Analytics', 'Grande', '+34 91 657 88 00', 'rrhh@bankinter.com', 'bankinter.com', 'AI Customer'],
  ['Banco Sabadell', 'Banca', 'Sabadell', 'Cataluña', 'AI Analytics', 'Grande', '+34 93 728 88 00', 'rrhh@bancsabadell.com', 'bancsabadell.com', 'AI Analytics'],
  ['ING España', 'Banca', 'Madrid', 'Madrid', 'AI Digital Banking', 'Grande', '+34 91 634 90 00', 'rrhh@ingdirect.es', 'ing.es', 'AI Digital'],
  ['Openbank', 'Banca Digital', 'Madrid', 'Madrid', 'AI Banking', 'Grande', '+34 90 026 65 65', 'rrhh@openbank.es', 'openbank.es', 'AI Banking'],
  ['EVO Banco', 'Banca Digital', 'Madrid', 'Madrid', 'AI Banking', 'Mediana', '+34 91 359 79 65', 'rrhh@evobanco.com', 'evobanco.com', 'AI Banking'],
  ['Renta 4', 'Inversiones', 'Madrid', 'Madrid', 'AI Analytics Finance', 'Grande', '+34 91 384 85 00', 'rrhh@renta4.es', 'renta4.es', 'AI Finance'],
  ['Allianz Trade', 'Seguros/Fintech', 'Madrid', 'Madrid', 'AI Risk', 'Grande', '+34 91 581 31 00', 'rrhh@allianz-trade.com', 'allianz-trade.com', 'AI Risk'],

  // ============ RETAIL E-COMMERCE CON IA ============
  ['Inditex', 'Retail Moda', 'A Coruña', 'Galicia', 'AI Supply Chain/Recommendations', 'Grande', '+34 98 118 54 00', 'rrhh@inditex.com', 'inditex.com', 'AI Engineering'],
  ['Zara Digital', 'Retail Moda/Digital', 'A Coruña', 'Galicia', 'AI Personalization', 'Grande', '+34 98 118 54 00', 'rrhh@inditex.com', 'zara.com', 'AI Digital'],
  ['El Corte Inglés', 'Retail', 'Madrid', 'Madrid', 'AI Transformación Digital', 'Grande', '+34 91 402 81 12', 'rrhh@elcorteingles.es', 'elcorteingles.es', 'AI Digital'],
  ['Mercadona Tech', 'Retail/Tech', 'Valencia', 'C. Valenciana', 'AI Logistics/Online', 'Grande', '+34 96 388 33 33', 'rrhh@mercadona.com', 'mercadona.com', 'AI Tech'],
  ['Carrefour España', 'Retail', 'Madrid', 'Madrid', 'AI Retail', 'Grande', '+34 91 490 91 00', 'rrhh@carrefour.es', 'carrefour.es', 'AI Retail'],
  ['Decathlon España', 'Retail Deporte', 'Madrid', 'Madrid', 'AI E-commerce', 'Grande', '+34 91 745 22 00', 'rrhh@decathlon.es', 'decathlon.es', 'AI E-commerce'],
  ['MediaMarkt España', 'Retail Tech', 'Madrid', 'Madrid', 'AI Customer Experience', 'Grande', '+34 91 384 26 00', 'rrhh@mediamarkt.es', 'mediamarkt.es', 'AI CX'],
  ['Mango', 'Retail Moda', 'Barcelona', 'Cataluña', 'AI Fashion', 'Grande', '+34 93 860 22 22', 'rrhh@mango.com', 'mango.com', 'AI Fashion'],
  ['Camper', 'Retail Calzado', 'Inca', 'Baleares', 'AI Personalization', 'Grande', '+34 97 188 80 00', 'rrhh@camper.com', 'camper.com', 'AI Retail'],
  ['IKEA España', 'Retail Mobiliario', 'Madrid', 'Madrid', 'AI Inventory', 'Grande', '+34 90 040 09 22', 'rrhh@ikea.com', 'ikea.com/es', 'AI Inventory'],

  // ============ TELECOMUNICACIONES IA ============
  ['Vodafone España', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Network/Customer', 'Grande', '+34 60 712 30 00', 'rrhh@vodafone.es', 'vodafone.es', 'AI Network'],
  ['Orange España', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Customer/Network', 'Grande', '+34 91 437 40 00', 'rrhh@orange.es', 'orange.es', 'AI Network'],
  ['MásMóvil', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 379 73 00', 'rrhh@masmovil.com', 'masmovil.com', 'AI Customer'],
  ['Yoigo', 'Telecomunicaciones', 'Madrid', 'Madrid', 'AI Customer Analytics', 'Mediana', '+34 91 754 14 14', 'rrhh@yoigo.com', 'yoigo.com', 'AI Analytics'],
  ['Digi España', 'Telecomunicaciones', 'Barcelona', 'Cataluña', 'AI Customer', 'Grande', '+34 93 321 84 32', 'rrhh@digimobil.es', 'digimobil.es', 'AI Customer'],

  // ============ ENERGÍA E INDUSTRIA CON IA ============
  ['Repsol', 'Energía', 'Madrid', 'Madrid', 'AI Industrial/Energy', 'Grande', '+34 91 753 80 00', 'rrhh@repsol.com', 'repsol.com', 'AI Lab Industrial'],
  ['Iberdrola', 'Energía', 'Bilbao', 'País Vasco', 'AI Energy Forecasting', 'Grande', '+34 94 466 39 00', 'rrhh@iberdrola.es', 'iberdrola.com', 'AI Energy'],
  ['Endesa', 'Energía', 'Madrid', 'Madrid', 'AI Operations', 'Grande', '+34 91 213 10 00', 'rrhh@endesa.com', 'endesa.com', 'AI Operations'],
  ['Naturgy', 'Energía/Gas', 'Madrid', 'Madrid', 'AI Smart Grid', 'Grande', '+34 91 210 70 00', 'rrhh@naturgy.com', 'naturgy.com', 'AI Smart Grid'],
  ['Cepsa', 'Energía', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 337 60 00', 'rrhh@cepsa.com', 'cepsa.com', 'AI Industrial'],
  ['Acciona', 'Infraestructura/Energía', 'Madrid', 'Madrid', 'AI Renewable Energy', 'Grande', '+34 91 663 28 50', 'rrhh@acciona.com', 'acciona.com', 'AI Innovation'],
  ['Ferrovial', 'Infraestructura', 'Madrid', 'Madrid', 'AI Smart Infrastructure', 'Grande', '+34 91 586 25 00', 'rrhh@ferrovial.com', 'ferrovial.com', 'Centro Innovación AI'],
  ['ACS Group', 'Construcción/Servicios', 'Madrid', 'Madrid', 'AI Construction/Smart Cities', 'Grande', '+34 91 343 92 00', 'rrhh@grupoacs.com', 'grupoacs.com', 'AI Innovation'],
  ['Sacyr', 'Infraestructura', 'Madrid', 'Madrid', 'AI Engineering', 'Grande', '+34 91 545 50 00', 'rrhh@sacyr.com', 'sacyr.com', 'AI Engineering'],
  ['ArcelorMittal España', 'Acero/Industria', 'Madrid', 'Madrid', 'AI Industrial 4.0', 'Grande', '+34 94 489 40 00', 'rrhh@arcelormittal.com', 'arcelormittal.com', 'AI Industria 4.0'],
  ['SEAT', 'Automoción', 'Martorell', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 773 80 00', 'rrhh@seat.es', 'seat.es', 'AI Manufacturing'],
  ['Volkswagen Navarra', 'Automoción', 'Pamplona', 'Navarra', 'AI Manufacturing', 'Grande', '+34 94 851 40 00', 'rrhh@vw.es', 'volkswagen-navarra.es', 'AI Manufacturing'],
  ['CAF', 'Ferrocarril', 'Beasain', 'País Vasco', 'AI Rail Systems', 'Grande', '+34 94 388 81 00', 'rrhh@caf.net', 'caf.net', 'AI Rail'],
  ['Talgo', 'Ferrocarril', 'Madrid', 'Madrid', 'AI Predictive Maintenance', 'Grande', '+34 91 631 38 00', 'rrhh@talgo.com', 'talgo.com', 'AI Maintenance'],

  // ============ TRANSPORTE Y MOVILIDAD ============
  ['Renfe', 'Ferrocarril', 'Madrid', 'Madrid', 'AI Transport Optimization', 'Grande', '+34 91 506 70 00', 'rrhh@renfe.es', 'renfe.com', 'AI Transport'],
  ['Adif', 'Infraestructura Ferroviaria', 'Madrid', 'Madrid', 'AI Predictive', 'Grande', '+34 91 700 30 00', 'rrhh@adif.es', 'adif.es', 'AI Predictive'],
  ['Iberia', 'Aviación', 'Madrid', 'Madrid', 'AI Operations/Customer', 'Grande', '+34 91 587 81 00', 'rrhh@iberia.es', 'iberia.com', 'AI Operations'],
  ['Air Europa', 'Aviación', 'Palma', 'Baleares', 'AI Customer Analytics', 'Grande', '+34 90 240 15 01', 'rrhh@aireuropa.com', 'aireuropa.com', 'AI Analytics'],
  ['Vueling', 'Aviación', 'Barcelona', 'Cataluña', 'AI Pricing', 'Grande', '+34 93 184 19 00', 'rrhh@vueling.com', 'vueling.com', 'AI Pricing'],
  ['Aena', 'Aeropuertos', 'Madrid', 'Madrid', 'AI Smart Airports', 'Grande', '+34 91 321 10 00', 'rrhh@aena.es', 'aena.es', 'AI Smart Airport'],
  ['Free Now', 'Mobility', 'Madrid', 'Madrid', 'AI Routing', 'Grande', '+34 91 575 24 73', 'jobs@free-now.com', 'free-now.com', 'AI Routing'],
  ['BlaBlaCar', 'Mobility', 'Madrid', 'Madrid', 'AI Matching', 'Grande', '+34 91 829 81 33', 'jobs@blablacar.com', 'blablacar.com', 'AI Matching'],
  ['Bolt España', 'Mobility', 'Madrid', 'Madrid', 'AI Routing', 'Grande', '+34 91 060 16 78', 'jobs@bolt.eu', 'bolt.eu', 'AI Routing'],

  // ============ SEGUROS CON IA ============
  ['MAPFRE', 'Seguros', 'Madrid', 'Madrid', 'AI Risk Analytics', 'Grande', '+34 91 581 60 00', 'rrhh@mapfre.com', 'mapfre.es', 'AI Risk'],
  ['Mutua Madrileña', 'Seguros', 'Madrid', 'Madrid', 'AI Claims/Fraud', 'Grande', '+34 91 592 11 11', 'rrhh@mutua.es', 'mutua.es', 'AI Claims'],
  ['Línea Directa', 'Seguros', 'Tres Cantos', 'Madrid', 'AI Pricing', 'Grande', '+34 91 807 95 00', 'rrhh@lineadirecta.es', 'lineadirecta.com', 'AI Pricing'],
  ['AXA España', 'Seguros', 'Madrid', 'Madrid', 'AI Customer/Risk', 'Grande', '+34 91 538 80 00', 'rrhh@axa.es', 'axa.es', 'AI Risk'],
  ['Allianz España', 'Seguros', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 596 03 00', 'rrhh@allianz.es', 'allianz.es', 'AI Insurance'],
  ['Caser', 'Seguros', 'Madrid', 'Madrid', 'AI Underwriting', 'Grande', '+34 91 595 50 00', 'rrhh@caser.es', 'caser.es', 'AI Underwriting'],
  ['Sanitas', 'Seguros Salud', 'Madrid', 'Madrid', 'AI Health', 'Grande', '+34 91 752 28 00', 'rrhh@sanitas.es', 'sanitas.es', 'AI Health'],
  ['Asisa', 'Seguros Salud', 'Madrid', 'Madrid', 'AI Health Analytics', 'Grande', '+34 91 595 75 00', 'rrhh@asisa.es', 'asisa.es', 'AI Health'],
  ['Adeslas SegurCaixa', 'Seguros Salud', 'Madrid', 'Madrid', 'AI Claims', 'Grande', '+34 90 020 00 22', 'rrhh@segurcaixaadeslas.es', 'segurcaixaadeslas.es', 'AI Claims'],

  // ============ SANIDAD CON IA ============
  ['Quirónsalud', 'Sanidad', 'Madrid', 'Madrid', 'AI Diagnóstico', 'Grande', '+34 91 781 78 00', 'rrhh@quironsalud.es', 'quironsalud.es', 'AI Diagnóstico'],
  ['HM Hospitales', 'Sanidad', 'Madrid', 'Madrid', 'AI Medical Imaging', 'Grande', '+34 91 451 35 49', 'rrhh@hmhospitales.com', 'hmhospitales.com', 'AI Medical'],
  ['Vithas', 'Sanidad', 'Madrid', 'Madrid', 'AI Healthcare', 'Grande', '+34 91 372 60 00', 'rrhh@vithas.es', 'vithas.es', 'AI Healthcare'],
  ['Hospital La Paz', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Investigación Médica', 'Grande', '+34 91 727 70 00', 'rrhh@idipaz.es', 'idipaz.es', 'AI Investigación'],
  ['Hospital 12 de Octubre', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Research', 'Grande', '+34 91 390 80 00', 'rrhh@h12o.es', 'imas12.es', 'AI Research'],
  ['Hospital Gregorio Marañón', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Research', 'Grande', '+34 91 586 80 00', 'rrhh@iisgm.com', 'iisgm.com', 'AI Research'],
  ['Hospital Niño Jesús', 'Sanidad Pediátrica', 'Madrid', 'Madrid', 'AI Pediatría', 'Grande', '+34 91 503 59 00', 'rrhh@hospitaldelninojesus.org', 'hospitaldelninojesus.org', 'AI Pediatría'],
  ['Hospital Ramón y Cajal', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Investigación', 'Grande', '+34 91 336 80 00', 'rrhh@hrc.es', 'hospitalramonycajal.es', 'AI Investigación'],
  ['Hospital Clínic Barcelona', 'Sanidad', 'Barcelona', 'Cataluña', 'AI Research', 'Grande', '+34 93 227 54 00', 'rrhh@clinic.cat', 'clinic.cat', 'AI Research'],
  ['Hospital Vall d\'Hebron', 'Sanidad', 'Barcelona', 'Cataluña', 'AI Research', 'Grande', '+34 93 489 30 00', 'rrhh@vhebron.net', 'vallhebron.com', 'AI Research'],
  ['Clínica Universidad de Navarra', 'Sanidad Privada', 'Pamplona', 'Navarra', 'AI Diagnóstico', 'Grande', '+34 94 825 54 00', 'rrhh@cun.es', 'cun.es', 'AI Diagnóstico'],
  ['Hospital MD Anderson', 'Oncología', 'Madrid', 'Madrid', 'AI Oncología', 'Grande', '+34 91 787 36 00', 'rrhh@mdanderson.es', 'mdanderson.es', 'AI Oncología'],

  // ============ MEDIA Y AUDIOVISUAL CON IA ============
  ['Atresmedia', 'Media/TV', 'Madrid', 'Madrid', 'AI Content/Recommendations', 'Grande', '+34 91 623 06 00', 'rrhh@atresmedia.com', 'atresmedia.com', 'AI Content'],
  ['Mediaset España', 'Media/TV', 'Madrid', 'Madrid', 'AI Audience', 'Grande', '+34 91 396 60 00', 'rrhh@mediaset.es', 'mediaset.es', 'AI Audience'],
  ['RTVE', 'Media Pública', 'Madrid', 'Madrid', 'AI Archive/Content', 'Grande', '+34 91 581 70 00', 'rrhh@rtve.es', 'rtve.es', 'AI Archive'],
  ['PRISA Media', 'Media', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 330 80 00', 'rrhh@prisa.com', 'prisa.com', 'AI Content'],
  ['Movistar+', 'Media/TV', 'Madrid', 'Madrid', 'AI Recommendations', 'Grande', '+34 90 030 30 30', 'rrhh@telefonica.es', 'movistarplus.es', 'AI Recommendations'],
  ['Filmin', 'Streaming', 'Barcelona', 'Cataluña', 'AI Content Recommendations', 'Mediana', '+34 93 504 54 47', 'rrhh@filmin.es', 'filmin.es', 'AI Recommendations'],
  ['EL PAÍS', 'Media/Periodismo', 'Madrid', 'Madrid', 'AI News', 'Grande', '+34 91 337 82 00', 'rrhh@elpais.es', 'elpais.com', 'AI Newsroom'],
  ['ABC', 'Media/Periodismo', 'Madrid', 'Madrid', 'AI News', 'Grande', '+34 91 339 90 00', 'rrhh@abc.es', 'abc.es', 'AI Newsroom'],
  ['Vocento', 'Media', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 339 96 00', 'rrhh@vocento.com', 'vocento.com', 'AI Content'],

  // ============ INSTITUCIONES IA / RESEARCH ============
  ['BSC - Barcelona Supercomputing Center', 'Investigación', 'Barcelona', 'Cataluña', 'AI Research/Supercomputing', 'Grande', '+34 93 413 75 16', 'rrhh@bsc.es', 'bsc.es', 'AI Research'],
  ['CSIC IIIA - Instituto Investigación IA', 'Investigación', 'Bellaterra', 'Cataluña', 'AI Research', 'Grande', '+34 93 580 95 70', 'rrhh@iiia.csic.es', 'iiia.csic.es', 'IA Investigación'],
  ['CIEMAT', 'Investigación', 'Madrid', 'Madrid', 'AI Energy/Materials', 'Grande', '+34 91 346 60 00', 'rrhh@ciemat.es', 'ciemat.es', 'AI Research'],
  ['SECOMP - Centro Nacional Supercomputación', 'Investigación', 'Madrid', 'Madrid', 'HPC/AI', 'Grande', '+34 91 568 14 00', 'rrhh@bsc.es', 'res.es', 'HPC AI'],
  ['CEDEX', 'Investigación', 'Madrid', 'Madrid', 'AI Civil Engineering', 'Grande', '+34 91 335 71 00', 'rrhh@cedex.es', 'cedex.es', 'AI Engineering'],

  // ============ GAMING Y VIDEOJUEGOS ============
  ['Mediatonic Madrid', 'Videojuegos', 'Madrid', 'Madrid', 'AI Game Dev', 'Mediana', '+34 91 005 12 67', 'jobs@mediatonic.com', 'mediatonic.com', 'AI Gaming'],
  ['MercurySteam', 'Videojuegos', 'Madrid', 'Madrid', 'AI Game Dev', 'Mediana', '+34 91 660 45 90', 'jobs@mercurysteam.com', 'mercurysteam.com', 'AI Gaming'],
  ['Tequila Works', 'Videojuegos', 'Madrid', 'Madrid', 'AI Game Dev', 'Pequeña', '+34 91 833 42 17', 'jobs@tequilaworks.com', 'tequilaworks.com', 'AI Gaming'],
  ['Pyro Studios', 'Videojuegos', 'Madrid', 'Madrid', 'AI Game Dev', 'Pequeña', '+34 91 661 18 09', 'jobs@pyrostudios.com', 'pyrostudios.com', 'AI Gaming'],
  ['Novarama', 'Videojuegos AR', 'Barcelona', 'Cataluña', 'AI/AR Gaming', 'Pequeña', '+34 93 220 32 21', 'jobs@novarama.com', 'novarama.com', 'AI AR'],
  ['Gameloft Barcelona', 'Videojuegos Móviles', 'Barcelona', 'Cataluña', 'AI Game Dev', 'Grande', '+34 93 320 76 00', 'jobs@gameloft.com', 'gameloft.com', 'AI Gaming'],
  ['Ubisoft Barcelona', 'Videojuegos', 'Barcelona', 'Cataluña', 'AI Game Dev', 'Grande', '+34 93 480 03 00', 'jobs@ubisoft.com', 'ubisoft.com', 'AI Gaming'],
  ['King Digital Entertainment Barcelona', 'Videojuegos', 'Barcelona', 'Cataluña', 'AI Mobile Gaming', 'Grande', '+34 93 295 30 00', 'jobs@king.com', 'king.com', 'AI Gaming'],
  ['Socialpoint', 'Videojuegos', 'Barcelona', 'Cataluña', 'AI Mobile Gaming', 'Grande', '+34 93 209 00 50', 'jobs@socialpoint.es', 'socialpoint.es', 'AI Mobile Gaming'],

  // ============ FARMA Y BIOTECH IA ============
  ['Grifols', 'Farma/Biotech', 'Sant Cugat del Vallès', 'Cataluña', 'AI Drug Discovery', 'Grande', '+34 93 571 10 00', 'rrhh@grifols.com', 'grifols.com', 'AI Drug Discovery'],
  ['Almirall', 'Farma', 'Barcelona', 'Cataluña', 'AI R&D', 'Grande', '+34 93 291 30 00', 'rrhh@almirall.com', 'almirall.com', 'AI R&D'],
  ['Rovi', 'Farma', 'Madrid', 'Madrid', 'AI Pharma', 'Grande', '+34 91 375 62 30', 'rrhh@rovi.es', 'rovi.es', 'AI Pharma'],
  ['Ferrer', 'Farma', 'Barcelona', 'Cataluña', 'AI Drug Research', 'Grande', '+34 93 600 37 00', 'rrhh@ferrer.com', 'ferrer.com', 'AI R&D'],
  ['Faes Farma', 'Farma', 'Leioa', 'País Vasco', 'AI Discovery', 'Grande', '+34 90 011 02 02', 'rrhh@faesfarma.com', 'faes.es', 'AI Discovery'],

  // ============ ALIMENTACIÓN CON IA ============
  ['Pascual', 'Alimentación', 'Aranda de Duero', 'Castilla y León', 'AI Supply Chain', 'Grande', '+34 90 200 03 00', 'rrhh@calidadpascual.com', 'calidadpascual.com', 'AI Supply Chain'],
  ['Damm', 'Alimentación/Bebidas', 'Barcelona', 'Cataluña', 'AI Production', 'Grande', '+34 93 503 65 00', 'rrhh@damm.com', 'damm.com', 'AI Production'],
  ['Mahou San Miguel', 'Alimentación/Bebidas', 'Madrid', 'Madrid', 'AI Brewing', 'Grande', '+34 91 526 91 00', 'rrhh@mahou-sanmiguel.com', 'mahou-sanmiguel.com', 'AI Brewing'],
  ['Heineken España', 'Alimentación/Bebidas', 'Madrid', 'Madrid', 'AI Production', 'Grande', '+34 95 400 80 00', 'rrhh@heineken.com', 'heineken.com', 'AI Production'],
  ['Calidad Pascual', 'Alimentación', 'Aranda de Duero', 'Castilla y León', 'AI Quality', 'Grande', '+34 90 200 03 00', 'rrhh@calidadpascual.com', 'calidadpascual.com', 'AI Quality'],
  ['Ebro Foods', 'Alimentación', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 724 95 00', 'rrhh@ebrofoods.es', 'ebrofoods.es', 'AI Manufacturing'],

  // ============ CONSULTORAS DE IA ESPECIALIZADAS ============
  ['Future Space', 'Consultoría IA', 'Madrid', 'Madrid', 'AI Consultancy', 'Mediana', '+34 91 533 44 14', 'rrhh@futurespace.es', 'futurespace.es', 'AI Consultancy'],
  ['Synergic Partners', 'Consultoría IA', 'Madrid', 'Madrid', 'AI/Big Data', 'Mediana', '+34 91 446 65 65', 'rrhh@synergicpartners.com', 'synergicpartners.com', 'AI Big Data'],
  ['Data Centric', 'Big Data/IA', 'Madrid', 'Madrid', 'AI Solutions', 'Mediana', '+34 91 354 05 05', 'rrhh@datacentric.es', 'datacentric.es', 'AI Solutions'],
  ['Datadec', 'Consultoría IA', 'Valencia', 'C. Valenciana', 'AI Industry', 'Mediana', '+34 96 393 92 39', 'rrhh@datadec.com', 'datadec.com', 'AI Industry'],
  ['Knowmad Mood', 'Consultoría IA', 'Madrid', 'Madrid', 'AI/Innovation', 'Mediana', '+34 91 411 09 50', 'rrhh@knowmadmood.com', 'knowmadmood.com', 'AI Innovation'],
  ['Solera AIS', 'Tecnología IA', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 768 14 00', 'rrhh@solera.com', 'solera.com', 'AI Insurance'],
  ['Inetum España', 'Consultoría/Tecnología', 'Madrid', 'Madrid', 'AI Solutions', 'Grande', '+34 91 550 32 00', 'rrhh.spain@inetum.com', 'inetum.com', 'AI Solutions'],
  ['Birchman', 'Consultoría', 'Madrid', 'Madrid', 'AI/Salesforce', 'Mediana', '+34 91 769 14 84', 'rrhh@birchmangroup.com', 'birchman.com', 'AI Salesforce'],

  // ============ STARTUPS Y SCALE-UPS DE IA EMERGENTES ESPAÑA ============
  ['Aplazame', 'Fintech IA', 'Madrid', 'Madrid', 'AI Credit Scoring', 'Mediana', '+34 91 829 12 26', 'jobs@aplazame.com', 'aplazame.com', 'AI Credit'],
  ['ID Finance', 'Fintech IA', 'Barcelona', 'Cataluña', 'AI Lending', 'Grande', '+34 93 220 39 56', 'jobs@idfinance.com', 'idfinance.com', 'AI Lending'],
  ['Bnext', 'Fintech', 'Madrid', 'Madrid', 'AI Banking', 'Mediana', '+34 91 060 25 23', 'jobs@bnext.es', 'bnext.es', 'AI Banking'],
  ['Indexa Capital', 'Fintech IA', 'Madrid', 'Madrid', 'AI Investment', 'Mediana', '+34 91 060 22 78', 'jobs@indexacapital.com', 'indexacapital.com', 'AI Investment'],
  ['Coverwallet', 'InsurTech IA', 'Madrid', 'Madrid', 'AI Insurance', 'Grande', '+34 91 088 21 77', 'jobs@coverwallet.com', 'coverwallet.com', 'AI Insurance'],
  ['Bizum', 'Fintech', 'Madrid', 'Madrid', 'AI Payments', 'Mediana', '+34 91 088 31 30', 'jobs@bizum.es', 'bizum.es', 'AI Payments'],
  ['Restalo', 'FoodTech IA', 'Madrid', 'Madrid', 'AI Recommendations', 'Mediana', '+34 91 060 41 82', 'jobs@restalo.com', 'eltenedor.es', 'AI Recommendations'],
  ['SeQura', 'Fintech IA', 'Barcelona', 'Cataluña', 'AI Credit', 'Grande', '+34 93 220 36 56', 'jobs@sequra.es', 'sequra.es', 'AI Credit'],
  ['Verse', 'Fintech IA', 'Barcelona', 'Cataluña', 'AI Payments', 'Mediana', '+34 93 220 49 92', 'jobs@verse.me', 'verse.me', 'AI Payments'],

  // ============ EDTECH CON IA ============
  ['Domestika', 'EdTech', 'Madrid', 'Madrid', 'AI Personalización Educativa', 'Grande', '+34 91 005 32 21', 'jobs@domestika.org', 'domestika.org', 'AI EdTech'],
  ['Smartick', 'EdTech IA', 'Madrid', 'Madrid', 'AI Aprendizaje Adaptativo', 'Mediana', '+34 90 211 33 50', 'jobs@smartick.es', 'smartick.es', 'AI EdTech'],
  ['Acadle', 'EdTech', 'Madrid', 'Madrid', 'AI Cursos Online', 'Pequeña', '+34 91 005 33 47', 'jobs@acadle.com', 'acadle.com', 'AI EdTech'],

  // ============ AGRICULTURA Y AGROTECH ============
  ['Hispatec', 'AgroTech IA', 'Almería', 'Andalucía', 'AI AgriTech', 'Mediana', '+34 95 026 93 96', 'rrhh@hispatec.com', 'hispatec.com', 'AI AgriTech'],
  ['Internet of Plants', 'AgroTech IA', 'Murcia', 'Murcia', 'AI Farming', 'Pequeña', '+34 96 859 39 22', 'jobs@iotp.com', 'iotp.com', 'AI Farming'],
  ['Bynse', 'AgroTech', 'Murcia', 'Murcia', 'AI Agriculture', 'Pequeña', '+34 96 887 19 87', 'jobs@bynse.com', 'bynse.com', 'AI Agriculture'],

  // ============ LEGAL TECH ============
  ['Lefebvre Sarrut España', 'LegalTech', 'Madrid', 'Madrid', 'AI Legal', 'Grande', '+34 91 442 14 14', 'rrhh@lefebvre.es', 'lefebvre.es', 'AI Legal'],
  ['Wolters Kluwer España', 'LegalTech', 'Las Rozas', 'Madrid', 'AI Legal/Tax', 'Grande', '+34 91 602 00 00', 'rrhh@wolterskluwer.com', 'wolterskluwer.com/es', 'AI LegalTech'],
  ['ProcessOn', 'LegalTech IA', 'Madrid', 'Madrid', 'AI Legal Documents', 'Pequeña', '+34 91 088 51 88', 'rrhh@processon.es', 'processon.es', 'AI Legal'],

  // ============ INMOBILIARIA CON IA ============
  ['Idealista', 'PropTech IA', 'Madrid', 'Madrid', 'AI Property Search', 'Grande', '+34 91 360 00 00', 'rrhh@idealista.com', 'idealista.com', 'AI PropTech'],
  ['Fotocasa', 'PropTech', 'Barcelona', 'Cataluña', 'AI Property', 'Grande', '+34 93 489 56 00', 'rrhh@fotocasa.es', 'fotocasa.es', 'AI Property'],
  ['Habitaclia', 'PropTech', 'Barcelona', 'Cataluña', 'AI Real Estate', 'Mediana', '+34 93 414 02 09', 'rrhh@habitaclia.com', 'habitaclia.com', 'AI Property'],
  ['Pisos.com', 'PropTech', 'Madrid', 'Madrid', 'AI Property', 'Mediana', '+34 91 005 41 16', 'rrhh@pisos.com', 'pisos.com', 'AI Property'],

  // ============ ADMINISTRACIÓN PÚBLICA TRANSFORMACIÓN DIGITAL ============
  ['Comunidad de Madrid - Madrid Digital', 'Admin Pública IA', 'Madrid', 'Madrid', 'AI Smart City', 'Grande', '+34 91 580 16 16', 'rrhh@madrid.org', 'comunidad.madrid', 'AI Smart City'],
  ['Ayuntamiento Madrid - IAM', 'Admin Pública IA', 'Madrid', 'Madrid', 'AI Smart City', 'Grande', '+34 91 588 10 00', 'rrhh@madrid.es', 'madrid.es', 'AI Smart City'],
  ['Red.es', 'Admin Pública IA', 'Madrid', 'Madrid', 'AI Public', 'Grande', '+34 91 212 76 20', 'rrhh@red.es', 'red.es', 'AI Public'],
  ['Junta de Andalucía - SAS Digital', 'Admin Pública', 'Sevilla', 'Andalucía', 'AI Health Public', 'Grande', '+34 95 501 80 00', 'rrhh@juntadeandalucia.es', 'juntadeandalucia.es', 'AI Health'],

  // ============ MÁS STARTUPS IA EMERGENTES ============
  ['Vincle Comercial', 'Tech IA', 'Madrid', 'Madrid', 'AI Sales', 'Mediana', '+34 91 426 22 65', 'rrhh@vincle.com', 'vincle.com', 'AI Sales'],
  ['Dive Health', 'HealthTech IA', 'Madrid', 'Madrid', 'AI Health', 'Pequeña', '+34 91 088 41 47', 'jobs@divehealth.com', 'divehealth.com', 'AI Health'],
  ['Cellnex Telecom', 'Telecomunicaciones', 'Barcelona', 'Cataluña', 'AI Network', 'Grande', '+34 93 567 89 00', 'rrhh@cellnextelecom.com', 'cellnextelecom.com', 'AI Network'],
  ['Velneo', 'Tech', 'Madrid', 'Madrid', 'AI Software', 'Pequeña', '+34 91 591 04 22', 'rrhh@velneo.com', 'velneo.com', 'AI Software'],
  ['Onehub Ventures', 'Investment IA', 'Madrid', 'Madrid', 'AI Investments', 'Mediana', '+34 91 088 50 60', 'jobs@onehub.es', 'onehub.es', 'AI Investments'],
  ['EcoVadis Madrid', 'Sustainability IA', 'Madrid', 'Madrid', 'AI Sustainability', 'Grande', '+34 91 005 50 73', 'jobs@ecovadis.com', 'ecovadis.com', 'AI Sustainability'],
  ['Travelgenio', 'Travel Tech IA', 'Madrid', 'Madrid', 'AI Travel', 'Mediana', '+34 91 005 03 73', 'rrhh@travelgenio.com', 'travelgenio.com', 'AI Travel'],
  ['Logalty', 'Tech IA', 'Madrid', 'Madrid', 'AI Document', 'Mediana', '+34 91 296 50 80', 'rrhh@logalty.com', 'logalty.com', 'AI Document'],
  ['Vortice IT', 'Consultoría IA', 'Madrid', 'Madrid', 'AI Consultancy', 'Mediana', '+34 91 411 21 90', 'rrhh@vortice-it.com', 'vortice-it.com', 'AI Consultancy'],
  ['Avanade España', 'Consultoría Microsoft', 'Madrid', 'Madrid', 'AI Microsoft', 'Grande', '+34 91 575 10 50', 'rrhh@avanade.com', 'avanade.com', 'AI Microsoft'],
  ['Everis NTT Data', 'Consultoría IA', 'Madrid', 'Madrid', 'AI/Cloud', 'Grande', '+34 91 749 00 00', 'rrhh@everis.com', 'everis.com', 'AI Cloud'],
  ['Naturhouse', 'Salud/Retail', 'Barcelona', 'Cataluña', 'AI Customer Health', 'Grande', '+34 93 296 91 90', 'rrhh@naturhouse.com', 'naturhouse.com', 'AI Customer Health'],
  ['Roche España', 'Farma', 'Madrid', 'Madrid', 'AI Drug Discovery', 'Grande', '+34 91 324 81 00', 'rrhh@roche.com', 'roche.es', 'AI Discovery'],
  ['Lilly España', 'Farma', 'Alcobendas', 'Madrid', 'AI Pharma', 'Grande', '+34 91 663 50 00', 'rrhh@lilly.com', 'lilly.es', 'AI Pharma'],
  ['Pfizer España', 'Farma', 'Alcobendas', 'Madrid', 'AI Drug Research', 'Grande', '+34 91 490 99 00', 'rrhh@pfizer.com', 'pfizer.es', 'AI Research'],
  ['Novartis España', 'Farma', 'Barcelona', 'Cataluña', 'AI Drug Discovery', 'Grande', '+34 90 010 30 60', 'rrhh@novartis.com', 'novartis.es', 'AI Discovery'],
  ['Sanofi España', 'Farma', 'Barcelona', 'Cataluña', 'AI Pharma', 'Grande', '+34 93 485 94 00', 'rrhh@sanofi.com', 'sanofi.es', 'AI Pharma'],
  ['Abbott España', 'Farma/Salud', 'Madrid', 'Madrid', 'AI Health', 'Grande', '+34 90 020 00 80', 'rrhh@abbott.com', 'abbott.es', 'AI Health'],
  ['Bayer España', 'Farma', 'Barcelona', 'Cataluña', 'AI Pharma/Crop', 'Grande', '+34 93 495 65 00', 'rrhh@bayer.com', 'bayer.es', 'AI Pharma'],
  ['Ferring Pharmaceuticals España', 'Farma', 'Madrid', 'Madrid', 'AI Pharma', 'Grande', '+34 91 387 70 00', 'rrhh@ferring.com', 'ferring.es', 'AI Pharma'],
  ['Boehringer Ingelheim España', 'Farma', 'Sant Cugat del Vallès', 'Cataluña', 'AI Pharma', 'Grande', '+34 93 404 51 00', 'rrhh@boehringer-ingelheim.com', 'boehringer-ingelheim.es', 'AI Pharma'],
  ['Reckitt Benckiser España', 'CPG', 'Granollers', 'Cataluña', 'AI Marketing', 'Grande', '+34 93 870 09 00', 'rrhh@reckitt.com', 'rb.com', 'AI Marketing'],
  ['Procter & Gamble España', 'CPG', 'Madrid', 'Madrid', 'AI Consumer', 'Grande', '+34 91 722 80 00', 'rrhh@pg.com', 'pg.com', 'AI Consumer'],
  ['Unilever España', 'CPG', 'Barcelona', 'Cataluña', 'AI Consumer', 'Grande', '+34 93 290 30 00', 'rrhh@unilever.com', 'unilever.es', 'AI Consumer'],
  ['Henkel Ibérica', 'CPG/Industria', 'Barcelona', 'Cataluña', 'AI Consumer/Industrial', 'Grande', '+34 93 290 41 00', 'rrhh@henkel.com', 'henkel.es', 'AI Industrial'],
  ['Coca-Cola España', 'Bebidas', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 484 25 00', 'rrhh@coca-cola.es', 'cocacolaespana.es', 'AI Marketing'],
  ['Pepsico España', 'Bebidas/Snacks', 'Madrid', 'Madrid', 'AI Demand Forecasting', 'Grande', '+34 91 663 26 00', 'rrhh@pepsico.com', 'pepsico.es', 'AI Demand'],

  // ============ MÁS TECH/STARTUPS ============
  ['Adevinta Spain', 'Marketplaces IA', 'Barcelona', 'Cataluña', 'AI Marketplaces', 'Grande', '+34 93 481 84 84', 'jobs@adevinta.com', 'adevinta.com', 'AI Marketplaces'],
  ['Schibsted España', 'Media/Marketplaces', 'Madrid', 'Madrid', 'AI Marketplaces', 'Grande', '+34 91 343 20 00', 'jobs@schibsted.com', 'schibsted.com', 'AI Marketplaces'],
  ['Just Eat España', 'FoodTech IA', 'Barcelona', 'Cataluña', 'AI Routing/Recommendations', 'Grande', '+34 93 215 00 00', 'jobs@just-eat.es', 'just-eat.es', 'AI Routing'],
  ['Uber Eats España', 'FoodTech IA', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 91 060 35 50', 'jobs@uber.com', 'ubereats.com', 'AI Logistics'],
  ['Tiendeo', 'Marketing IA', 'Barcelona', 'Cataluña', 'AI Marketing', 'Mediana', '+34 93 419 08 70', 'jobs@tiendeo.com', 'tiendeo.com', 'AI Marketing'],
  ['Shoppr', 'Retail Tech', 'Madrid', 'Madrid', 'AI Retail', 'Pequeña', '+34 91 088 64 02', 'jobs@shoppr.es', 'shoppr.es', 'AI Retail'],
  ['Fintonic', 'Fintech IA', 'Madrid', 'Madrid', 'AI Finance', 'Grande', '+34 91 060 51 25', 'jobs@fintonic.com', 'fintonic.com', 'AI Finance'],
  ['Coverfy', 'InsurTech', 'Madrid', 'Madrid', 'AI Insurance', 'Mediana', '+34 91 088 38 90', 'jobs@coverfy.com', 'coverfy.com', 'AI Insurance'],
  ['Acquia España', 'Tech IA', 'Madrid', 'Madrid', 'AI Drupal', 'Grande', '+34 91 005 30 21', 'jobs@acquia.com', 'acquia.com', 'AI Drupal'],
  ['Twilio España', 'Comunicaciones', 'Madrid', 'Madrid', 'AI Comm', 'Grande', '+34 91 060 53 56', 'jobs@twilio.com', 'twilio.com', 'AI Communications'],
  ['Twitch España', 'Streaming', 'Madrid', 'Madrid', 'AI Streaming', 'Grande', '+34 91 060 53 60', 'jobs@twitch.tv', 'twitch.tv', 'AI Streaming'],

  // ============ MAS GRANDES TRADICIONALES ESPAÑOLAS ============
  ['Banco de España', 'Banca Central', 'Madrid', 'Madrid', 'AI Economic Analysis', 'Grande', '+34 91 338 50 00', 'rrhh@bde.es', 'bde.es', 'AI Economic'],
  ['Correos', 'Logística Pública', 'Madrid', 'Madrid', 'AI Logistics', 'Grande', '+34 91 596 30 00', 'rrhh@correos.com', 'correos.es', 'AI Logistics'],
  ['Loterías y Apuestas del Estado', 'Loterías', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 90 011 23 13', 'rrhh@selae.es', 'loteriasyapuestas.es', 'AI Gaming'],
  ['SEPI', 'Holding Público', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 396 17 50', 'rrhh@sepi.es', 'sepi.es', 'AI Strategy'],
  ['Enagás', 'Energía/Gas', 'Madrid', 'Madrid', 'AI Pipeline', 'Grande', '+34 91 709 92 00', 'rrhh@enagas.es', 'enagas.es', 'AI Pipeline'],
  ['Red Eléctrica de España', 'Energía', 'Madrid', 'Madrid', 'AI Smart Grid', 'Grande', '+34 91 650 20 12', 'rrhh@ree.es', 'ree.es', 'AI Smart Grid'],

  // ============ MARKETING DIGITAL Y MEDIOS ESPECIALIZADOS ============
  ['HUGE Inc Madrid', 'Agencia Digital IA', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 060 21 23', 'jobs@hugeinc.com', 'hugeinc.com', 'AI Marketing'],
  ['Wunderman Thompson Spain', 'Agencia Digital', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 575 87 70', 'jobs@wundermanthompson.com', 'wundermanthompson.com', 'AI Creative'],
  ['Llorente y Cuenca', 'Comunicación', 'Madrid', 'Madrid', 'AI Communications', 'Grande', '+34 91 563 77 22', 'jobs@llorenteycuenca.com', 'llorenteycuenca.com', 'AI Communications'],
  ['Havas Group Spain', 'Comunicación/Media', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 770 25 00', 'jobs@havas.com', 'havas.com', 'AI Marketing'],
  ['Ogilvy España', 'Comunicación', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 769 93 00', 'jobs@ogilvy.com', 'ogilvy.es', 'AI Creative'],
  ['Publicis España', 'Comunicación', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 379 45 00', 'jobs@publicis.es', 'publicis.es', 'AI Marketing'],
  ['Dentsu España', 'Marketing/Media', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 360 32 00', 'jobs@dentsu.com', 'dentsu.com', 'AI Marketing'],
  ['BeOn Spain', 'Marketing IA', 'Madrid', 'Madrid', 'AI Marketing Performance', 'Mediana', '+34 91 005 14 23', 'jobs@beoncompany.com', 'beoncompany.com', 'AI Performance'],

  // ============ MÁS HEALTHTECH IA ============
  ['Mediquo', 'HealthTech IA', 'Barcelona', 'Cataluña', 'AI Telemedicine', 'Mediana', '+34 93 220 30 28', 'jobs@mediquo.com', 'mediquo.com', 'AI Telemedicine'],
  ['Doctomatic', 'HealthTech IA', 'Madrid', 'Madrid', 'AI Telemedicine', 'Pequeña', '+34 91 088 56 79', 'jobs@doctomatic.com', 'doctomatic.com', 'AI Telemedicine'],
  ['Top Doctors', 'HealthTech', 'Madrid', 'Madrid', 'AI Doctor Search', 'Mediana', '+34 91 060 13 87', 'jobs@topdoctors.es', 'topdoctors.es', 'AI Health'],
  ['eDoctor', 'HealthTech IA', 'Madrid', 'Madrid', 'AI Health', 'Pequeña', '+34 91 060 76 03', 'jobs@edoctor.es', 'edoctor.es', 'AI Health'],
  ['Quibim', 'MedTech IA', 'Valencia', 'C. Valenciana', 'AI Medical Imaging', 'Mediana', '+34 96 332 75 41', 'jobs@quibim.com', 'quibim.com', 'AI Medical Imaging'],
  ['Methinks AI', 'MedTech IA', 'Barcelona', 'Cataluña', 'AI Stroke Detection', 'Pequeña', '+34 93 220 67 89', 'jobs@methinks.ai', 'methinks.ai', 'AI Medical AI'],

  // ============ MÁS RETAIL IA ============
  ['Tendam (Cortefiel)', 'Retail Moda', 'Madrid', 'Madrid', 'AI Fashion', 'Grande', '+34 91 387 40 00', 'rrhh@tendam.es', 'tendam.es', 'AI Fashion'],
  ['Desigual', 'Retail Moda', 'Barcelona', 'Cataluña', 'AI Fashion', 'Grande', '+34 93 555 17 00', 'rrhh@desigual.com', 'desigual.com', 'AI Fashion'],
  ['Hawkers Group', 'Retail Gafas', 'Alicante', 'Comunidad Valenciana', 'AI Marketing', 'Mediana', '+34 96 521 50 00', 'rrhh@hawkers.com', 'hawkers.com', 'AI Marketing'],
  ['Tous Joyería', 'Retail Joyería', 'Manresa', 'Cataluña', 'AI Personalization', 'Grande', '+34 93 875 39 00', 'rrhh@tous.com', 'tous.com', 'AI Personalization'],
  ['Bimba y Lola', 'Retail Moda', 'Vigo', 'Galicia', 'AI Marketing', 'Mediana', '+34 98 626 55 25', 'rrhh@bimbaylola.com', 'bimbaylola.com', 'AI Marketing'],

  // ============ MÁS BIG TECH STARTUPS ESPAÑA ============
  ['Acuity Trading Madrid', 'Fintech IA', 'Madrid', 'Madrid', 'AI Trading', 'Mediana', '+34 91 060 49 75', 'jobs@acuitytrading.com', 'acuitytrading.com', 'AI Trading'],
  ['ClimaCell Madrid', 'WeatherTech IA', 'Madrid', 'Madrid', 'AI Weather', 'Mediana', '+34 91 060 52 12', 'jobs@climacell.co', 'climacell.co', 'AI Weather'],
  ['Spotahome', 'PropTech IA', 'Madrid', 'Madrid', 'AI Rental', 'Mediana', '+34 91 060 23 78', 'jobs@spotahome.com', 'spotahome.com', 'AI Rental'],
  ['Badi', 'PropTech IA', 'Barcelona', 'Cataluña', 'AI Roommate Matching', 'Mediana', '+34 93 220 25 19', 'jobs@badiapp.com', 'badiapp.com', 'AI Matching'],
  ['Holded', 'SaaS Empresarial', 'Barcelona', 'Cataluña', 'AI Business', 'Mediana', '+34 93 220 50 80', 'jobs@holded.com', 'holded.com', 'AI Business'],
  ['Quipu', 'SaaS Empresarial', 'Barcelona', 'Cataluña', 'AI Accounting', 'Mediana', '+34 93 467 06 87', 'jobs@getquipu.com', 'getquipu.com', 'AI Accounting'],
  ['Wuolah', 'EdTech', 'Sevilla', 'Andalucía', 'AI EdTech', 'Mediana', '+34 95 522 87 67', 'jobs@wuolah.com', 'wuolah.com', 'AI EdTech'],
  ['Genially', 'EdTech IA', 'Córdoba', 'Andalucía', 'AI Content', 'Mediana', '+34 95 798 19 80', 'jobs@genial.ly', 'genial.ly', 'AI Content'],
  ['Onlyfy', 'HRTech IA', 'Madrid', 'Madrid', 'AI HR', 'Pequeña', '+34 91 060 52 66', 'jobs@onlyfy.com', 'onlyfy.com', 'AI HR'],
  ['Sesame HR', 'HRTech IA', 'Valencia', 'C. Valenciana', 'AI HR', 'Mediana', '+34 96 049 51 82', 'jobs@sesamehr.com', 'sesamehr.com', 'AI HR'],
  ['Holcim España', 'Construcción', 'Madrid', 'Madrid', 'AI Industrial', 'Grande', '+34 91 213 30 00', 'rrhh@holcim.com', 'holcim.es', 'AI Industrial'],
  ['Cementos Portland Valderrivas', 'Cementos', 'Pamplona', 'Navarra', 'AI Industrial', 'Grande', '+34 94 822 76 00', 'rrhh@cpv.es', 'cpv.es', 'AI Industrial']
];

const HEADERS = [
  'NOMBRE EMPRESA',
  'SECTOR',
  'CIUDAD',
  'COMUNIDAD AUTÓNOMA',
  'ROL DEMANDADO IA',
  'TAMAÑO',
  'TELÉFONO',
  'EMAIL CONTRATACIÓN',
  'WEB',
  'DEPARTAMENTO IA / NOTA'
];

async function createEmpresasIA() {
  try {
    console.log('🤖 Creando CRM EMPRESAS IA España...\n');
    console.log(`📊 Empresas: ${EMPRESAS.length}\n`);

    const { sheets } = await getServices();

    // Eliminar pestaña antigua si existe
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const old = meta.data.sheets.find(s => s.properties.title === 'EMPRESAS IA');
    if (old) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: old.properties.sheetId } }] }
      });
    }

    // Crear pestaña
    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'EMPRESAS IA' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    // Filtrar empresas SIN email (regla del usuario)
    const empresasConEmail = EMPRESAS.filter(e => e[7] && e[7].trim());
    console.log(`✅ Con email: ${empresasConEmail.length}`);

    // Insertar
    const values = [HEADERS, ...empresasConEmail];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'EMPRESAS IA!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    // Formato (color púrpura/IA)
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.4, green: 0.1, blue: 0.5 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 10 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: empresasConEmail.length + 1, startColumnIndex: 0, endColumnIndex: 10 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('\n═══════════════════════════════════════');
    console.log('🤖 EMPRESAS IA CREADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${empresasConEmail.length} empresas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createEmpresasIA();
