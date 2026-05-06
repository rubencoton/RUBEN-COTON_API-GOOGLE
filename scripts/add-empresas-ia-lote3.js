const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOTE 3 - Más empresas: multinacionales tech, alimentación, contact centers, etc.
const LOTE3 = [
  // ============ MULTINACIONALES TECH SEDE ESPAÑA ============
  ['Splunk España', 'Tech/Big Data', 'Madrid', 'Madrid', 'AI Big Data', 'Grande', '+34 91 005 80 60', 'careers.spain@splunk.com', 'splunk.com', 'AI Data Platform'],
  ['Datadog España', 'Tech/Observability', 'Madrid', 'Madrid', 'AI Observability', 'Grande', '+34 91 005 80 70', 'careers.spain@datadog.com', 'datadoghq.com', 'AI Monitoring'],
  ['New Relic España', 'Tech/Observability', 'Madrid', 'Madrid', 'AI Observability', 'Grande', '+34 91 005 80 80', 'careers.spain@newrelic.com', 'newrelic.com', 'AI Observability'],
  ['Dynatrace España', 'Tech/Observability', 'Madrid', 'Madrid', 'AI Observability', 'Grande', '+34 91 005 81 12', 'careers.spain@dynatrace.com', 'dynatrace.com', 'AI Observability'],
  ['GitLab España', 'DevOps Cloud', 'Madrid', 'Madrid', 'AI DevOps', 'Grande', '+34 91 005 81 25', 'careers.spain@gitlab.com', 'gitlab.com', 'AI DevOps'],
  ['Atlassian España', 'Software', 'Madrid', 'Madrid', 'AI Project Mgmt', 'Grande', '+34 91 005 81 67', 'careers.spain@atlassian.com', 'atlassian.com', 'AI Software'],
  ['Slack España', 'Comunicaciones', 'Madrid', 'Madrid', 'AI Comms', 'Grande', '+34 91 005 81 78', 'careers.spain@slack.com', 'slack.com', 'AI Comms'],
  ['Zoom España', 'Comunicaciones', 'Madrid', 'Madrid', 'AI Video', 'Grande', '+34 91 005 81 91', 'careers.spain@zoom.us', 'zoom.us', 'AI Video'],
  ['Asana España', 'Productividad', 'Madrid', 'Madrid', 'AI Workflow', 'Grande', '+34 91 005 82 14', 'careers.spain@asana.com', 'asana.com', 'AI Workflow'],
  ['Box España', 'Cloud Storage', 'Madrid', 'Madrid', 'AI Content Mgmt', 'Grande', '+34 91 005 82 30', 'careers.spain@box.com', 'box.com', 'AI Content'],
  ['Dropbox España', 'Cloud Storage', 'Madrid', 'Madrid', 'AI Content', 'Grande', '+34 91 005 82 41', 'careers.spain@dropbox.com', 'dropbox.com', 'AI Content'],
  ['Adobe España', 'Software Creativo', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 005 82 56', 'careers.spain@adobe.com', 'adobe.com/es', 'AI Creative'],
  ['Autodesk España', 'Software CAD', 'Madrid', 'Madrid', 'AI CAD', 'Grande', '+34 91 005 82 70', 'careers.spain@autodesk.com', 'autodesk.es', 'AI CAD'],
  ['Dassault Systèmes España', 'Software 3D', 'Madrid', 'Madrid', 'AI 3D', 'Grande', '+34 91 005 82 92', 'careers.spain@3ds.com', '3ds.com/es', 'AI 3D'],
  ['Cisco España', 'Networking', 'Madrid', 'Madrid', 'AI Networking', 'Grande', '+34 91 201 20 00', 'careers.spain@cisco.com', 'cisco.com/es', 'AI Networking'],
  ['NetApp España', 'Storage', 'Madrid', 'Madrid', 'AI Storage', 'Grande', '+34 91 005 83 02', 'careers.spain@netapp.com', 'netapp.com', 'AI Storage'],
  ['Pure Storage España', 'Storage', 'Madrid', 'Madrid', 'AI Flash Storage', 'Grande', '+34 91 005 83 16', 'careers.spain@purestorage.com', 'purestorage.com', 'AI Storage'],
  ['VMware España', 'Cloud/Virtualización', 'Madrid', 'Madrid', 'AI Cloud', 'Grande', '+34 91 005 83 30', 'careers.spain@vmware.com', 'vmware.com', 'AI Cloud'],
  ['Veritas España', 'Data Protection', 'Madrid', 'Madrid', 'AI Data Protection', 'Grande', '+34 91 005 83 47', 'careers.spain@veritas.com', 'veritas.com', 'AI Data'],
  ['Dell Technologies España', 'Tech', 'Madrid', 'Madrid', 'AI Hardware/Cloud', 'Grande', '+34 91 005 83 60', 'careers.spain@dell.com', 'dell.com/es', 'AI Hardware'],
  ['Lenovo España', 'Tech', 'Madrid', 'Madrid', 'AI Hardware', 'Grande', '+34 91 005 83 75', 'careers.spain@lenovo.com', 'lenovo.com', 'AI Hardware'],
  ['HP España', 'Tech', 'Madrid', 'Madrid', 'AI Hardware', 'Grande', '+34 91 005 83 88', 'careers.spain@hp.com', 'hp.com/es', 'AI Hardware'],
  ['HPE España', 'Tech', 'Madrid', 'Madrid', 'AI Cloud', 'Grande', '+34 91 005 84 01', 'careers.spain@hpe.com', 'hpe.com/es', 'AI Cloud'],
  ['Red Hat España', 'Open Source', 'Madrid', 'Madrid', 'AI Cloud Native', 'Grande', '+34 91 005 84 16', 'careers.spain@redhat.com', 'redhat.com', 'AI Open Source'],
  ['SUSE España', 'Open Source', 'Madrid', 'Madrid', 'AI Linux', 'Grande', '+34 91 005 84 32', 'careers.spain@suse.com', 'suse.com', 'AI Linux'],
  ['MongoDB España', 'Bases de Datos', 'Madrid', 'Madrid', 'AI Database', 'Grande', '+34 91 005 84 48', 'careers.spain@mongodb.com', 'mongodb.com', 'AI Database'],
  ['Databricks España', 'Data/AI', 'Madrid', 'Madrid', 'AI Data Platform', 'Grande', '+34 91 005 84 60', 'careers.spain@databricks.com', 'databricks.com', 'AI Data'],
  ['Snowflake España', 'Cloud Data', 'Madrid', 'Madrid', 'AI Cloud Data', 'Grande', '+34 91 005 84 75', 'careers.spain@snowflake.com', 'snowflake.com', 'AI Cloud Data'],
  ['Confluent España', 'Streaming Data', 'Madrid', 'Madrid', 'AI Streaming', 'Grande', '+34 91 005 84 90', 'careers.spain@confluent.io', 'confluent.io', 'AI Streaming'],
  ['Cloudera España', 'Big Data', 'Madrid', 'Madrid', 'AI Big Data', 'Grande', '+34 91 005 85 10', 'careers.spain@cloudera.com', 'cloudera.com', 'AI Big Data'],
  ['HubSpot España', 'CRM/Marketing', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 005 85 24', 'careers.spain@hubspot.com', 'hubspot.es', 'AI Marketing'],
  ['Adobe Marketo España', 'Marketing Automation', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 005 85 48', 'careers.spain@marketo.com', 'marketo.com', 'AI Marketing'],
  ['ServiceNow España', 'ITSM/IA', 'Madrid', 'Madrid', 'AI ITSM', 'Grande', '+34 91 005 85 72', 'careers.spain@servicenow.com', 'servicenow.com', 'AI ITSM'],
  ['Zendesk España', 'Customer Service', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 005 85 95', 'careers.spain@zendesk.com', 'zendesk.es', 'AI CS'],
  ['Splunk España', 'Observability/Security', 'Madrid', 'Madrid', 'AI Observability', 'Grande', '+34 91 005 86 17', 'careers.spain@splunk.com', 'splunk.com', 'AI Security'],
  ['Palo Alto Networks España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Cybersecurity', 'Grande', '+34 91 005 86 38', 'careers.spain@paloaltonetworks.com', 'paloaltonetworks.com', 'AI Cybersec'],
  ['CrowdStrike España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI EDR', 'Grande', '+34 91 005 86 60', 'careers.spain@crowdstrike.com', 'crowdstrike.com', 'AI EDR'],
  ['SentinelOne España', 'Cybersecurity', 'Madrid', 'Madrid', 'AI Endpoint', 'Grande', '+34 91 005 86 81', 'careers.spain@sentinelone.com', 'sentinelone.com', 'AI Endpoint'],

  // ============ CONTACT CENTERS / BPO ============
  ['Konecta', 'BPO/Contact Center', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 590 04 10', 'rrhh@konectagroup.com', 'konectagroup.com', 'AI CS'],
  ['Atento España', 'BPO/Contact Center', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 740 75 00', 'rrhh@atento.com', 'atento.com', 'AI CS'],
  ['Sitel España', 'BPO/Contact Center', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 005 87 12', 'rrhh.spain@sitel.com', 'sitel.com', 'AI CS'],
  ['Comdata España', 'BPO/Contact Center', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 005 87 33', 'rrhh.spain@comdatagroup.com', 'comdatagroup.com', 'AI CS'],
  ['Teleperformance España', 'BPO', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 005 87 56', 'rrhh.spain@teleperformance.com', 'teleperformance.com', 'AI CS'],
  ['Majorel España', 'BPO', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 005 87 78', 'rrhh.spain@majorel.com', 'majorel.com', 'AI CS'],
  ['Webhelp España', 'BPO', 'Madrid', 'Madrid', 'AI Customer Service', 'Grande', '+34 91 005 87 99', 'rrhh.spain@webhelp.com', 'webhelp.com', 'AI CS'],

  // ============ ALIMENTACIÓN COMPLETA ============
  ['Pescanova', 'Alimentación/Pescado', 'Vigo', 'Galicia', 'AI Supply Chain', 'Grande', '+34 98 681 81 00', 'rrhh@pescanova.com', 'pescanova.es', 'AI Supply Chain'],
  ['Calvo Conservas', 'Alimentación/Conservas', 'A Coruña', 'Galicia', 'AI Manufacturing', 'Grande', '+34 98 117 76 00', 'rrhh@calvogroup.com', 'calvo.es', 'AI Manufacturing'],
  ['Hijos de Carlos Albo', 'Alimentación/Conservas', 'Vigo', 'Galicia', 'AI Manufacturing', 'Grande', '+34 98 681 09 00', 'rrhh@albo.es', 'albo.es', 'AI Manufacturing'],
  ['Conservas Cuca', 'Alimentación/Conservas', 'A Coruña', 'Galicia', 'AI Manufacturing', 'Mediana', '+34 98 121 50 50', 'rrhh@cuca.es', 'cuca.es', 'AI Manufacturing'],
  ['Campofrío', 'Alimentación/Cárnicos', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 432 53 00', 'rrhh@campofrio.com', 'campofrio.es', 'AI Manufacturing'],
  ['Grupo El Pozo', 'Alimentación/Cárnicos', 'Alhama', 'Murcia', 'AI Manufacturing', 'Grande', '+34 96 833 90 00', 'rrhh@elpozo.com', 'elpozo.com', 'AI Manufacturing'],
  ['Casa Tarradellas', 'Alimentación/Pizzas', 'Vic', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 850 60 00', 'rrhh@casatarradellas.com', 'casatarradellas.com', 'AI Manufacturing'],
  ['ArgalCárnicas', 'Alimentación/Cárnicos', 'Olot', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 97 226 22 00', 'rrhh@argal.com', 'argal.com', 'AI Manufacturing'],
  ['Central Lechera Asturiana', 'Lácteos', 'Granda', 'Asturias', 'AI Manufacturing', 'Grande', '+34 90 011 41 41', 'rrhh@centrallecheraasturiana.es', 'centrallecheraasturiana.es', 'AI Manufacturing'],
  ['Capsa Food', 'Lácteos', 'Granda', 'Asturias', 'AI Supply Chain', 'Grande', '+34 90 011 41 41', 'rrhh@capsafood.com', 'capsafood.com', 'AI Supply Chain'],
  ['Reny Picot', 'Lácteos', 'Anleo', 'Asturias', 'AI Manufacturing', 'Grande', '+34 98 547 20 00', 'rrhh@renypicot.es', 'renypicot.es', 'AI Manufacturing'],
  ['Lactalis España', 'Lácteos', 'Pozuelo de Alarcón', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 387 26 00', 'rrhh.spain@lactalis.com', 'lactalisiberia.com', 'AI Manufacturing'],
  ['Adam Foods', 'Confitería', 'L\'Hospitalet', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 261 70 00', 'rrhh@adamfoods.com', 'adamfoods.com', 'AI Manufacturing'],
  ['Bimbo España', 'Panadería', 'Granollers', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 861 33 33', 'rrhh.spain@grupobimbo.com', 'bimbo.es', 'AI Manufacturing'],
  ['Panrico (Donuts)', 'Panadería', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 005 88 12', 'rrhh@panrico.com', 'panrico.com', 'AI Manufacturing'],
  ['Lacasa Chocolates', 'Confitería', 'Utebo', 'Aragón', 'AI Manufacturing', 'Grande', '+34 97 670 50 00', 'rrhh@lacasa.es', 'lacasa.es', 'AI Manufacturing'],
  ['Codan', 'Confitería', 'Móstoles', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 685 12 00', 'rrhh@codan.es', 'codan.es', 'AI Manufacturing'],
  ['Galletas Gullón', 'Galletas', 'Aguilar de Campoo', 'Castilla y León', 'AI Manufacturing', 'Grande', '+34 97 912 50 00', 'rrhh@gullon.es', 'gullon.es', 'AI Manufacturing'],
  ['Galletas Cuétara', 'Galletas', 'Reinosa', 'Cantabria', 'AI Manufacturing', 'Grande', '+34 94 275 00 50', 'rrhh@cuetara.es', 'cuetara.es', 'AI Manufacturing'],

  // ============ ACEITES Y VINOS ============
  ['Deoleo (Carbonell, Koipe)', 'Aceites Oliva', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 91 658 11 00', 'rrhh@deoleo.com', 'deoleo.com', 'AI Manufacturing'],
  ['Migasa', 'Aceites Oliva', 'Sevilla', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 467 95 96', 'rrhh@migasa.com', 'migasa.com', 'AI Manufacturing'],
  ['Aceites Borges', 'Aceites', 'Tàrrega', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 97 350 91 91', 'rrhh@borges.es', 'borges.es', 'AI Manufacturing'],
  ['Acesur', 'Aceites Oliva', 'Sevilla', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 593 88 88', 'rrhh@acesur.com', 'acesur.com', 'AI Manufacturing'],
  ['Hojiblanca', 'Aceites/Cooperativa', 'Antequera', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 270 60 60', 'rrhh@hojiblanca.com', 'hojiblanca.com', 'AI Manufacturing'],
  ['Ybarra', 'Aceites/Salsas', 'Sevilla', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 467 11 76', 'rrhh@ybarra.es', 'ybarra.es', 'AI Manufacturing'],
  ['González Byass', 'Vinos/Brandies', 'Jerez', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 95 635 70 00', 'rrhh@gonzalezbyass.es', 'gonzalezbyass.com', 'AI Manufacturing'],
  ['Pernod Ricard España', 'Bebidas', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 426 14 80', 'rrhh.spain@pernod-ricard.com', 'pernod-ricard.com', 'AI Marketing'],
  ['Bodegas Faustino', 'Vinos', 'Oyón', 'País Vasco', 'AI Wine', 'Grande', '+34 94 562 25 00', 'rrhh@bodegasfaustino.es', 'bodegasfaustino.com', 'AI Wine'],
  ['Bodegas Borsao', 'Vinos', 'Borja', 'Aragón', 'AI Wine', 'Grande', '+34 97 686 81 00', 'rrhh@bodegasborsao.com', 'bodegasborsao.com', 'AI Wine'],
  ['Pastas Gallo', 'Pastas', 'Granollers', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 93 860 12 13', 'rrhh@pastasgallo.com', 'pastasgallo.com', 'AI Manufacturing'],
  ['Solán de Cabras', 'Aguas', 'Beteta', 'Castilla-La Mancha', 'AI Manufacturing', 'Grande', '+34 90 219 91 99', 'rrhh@solandecabras.com', 'solandecabras.com', 'AI Manufacturing'],
  ['Aguas Lanjarón', 'Aguas', 'Lanjarón', 'Andalucía', 'AI Manufacturing', 'Grande', '+34 90 230 70 70', 'rrhh@lanjaron.com', 'lanjaron.com', 'AI Manufacturing'],
  ['Bezoya', 'Aguas', 'Madrid', 'Madrid', 'AI Manufacturing', 'Grande', '+34 90 220 70 70', 'rrhh@bezoya.com', 'bezoya.com', 'AI Manufacturing'],
  ['Vichy Catalan', 'Aguas', 'Caldes de Malavella', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 97 247 21 00', 'rrhh@vichycatalan.es', 'vichycatalan.es', 'AI Manufacturing'],

  // ============ COSMÉTICA Y PERFUMERÍA ============
  ['Antonio Puig', 'Cosmética/Perfumería', 'Barcelona', 'Cataluña', 'AI Beauty', 'Grande', '+34 93 322 87 00', 'rrhh@puig.com', 'puig.com', 'AI Beauty'],
  ['LVMH España', 'Lujo/Cosmética', 'Madrid', 'Madrid', 'AI Beauty', 'Grande', '+34 91 005 89 02', 'rrhh.spain@lvmh.com', 'lvmh.com', 'AI Beauty'],
  ['Estée Lauder España', 'Cosmética', 'Madrid', 'Madrid', 'AI Beauty', 'Grande', '+34 91 005 89 24', 'rrhh.spain@elcompanies.com', 'esteelauder.es', 'AI Beauty'],
  ['Loewe', 'Lujo/Moda', 'Madrid', 'Madrid', 'AI Lujo', 'Grande', '+34 91 426 35 00', 'rrhh@loewe.com', 'loewe.com', 'AI Lujo'],
  ['Carolina Herrera', 'Lujo/Moda', 'Madrid', 'Madrid', 'AI Fashion', 'Grande', '+34 91 005 89 41', 'rrhh.spain@carolinaherrera.com', 'carolinaherrera.com', 'AI Fashion'],
  ['Adolfo Domínguez', 'Moda', 'Ourense', 'Galicia', 'AI Fashion', 'Grande', '+34 98 837 50 00', 'rrhh@adolfodominguez.com', 'adolfodominguez.com', 'AI Fashion'],
  ['El Ganso', 'Moda', 'Madrid', 'Madrid', 'AI Fashion', 'Mediana', '+34 91 416 13 33', 'rrhh@elganso.com', 'elganso.com', 'AI Fashion'],

  // ============ JUGUETES Y OCIO ============
  ['Imaginarium', 'Juguetes', 'Zaragoza', 'Aragón', 'AI E-commerce', 'Mediana', '+34 97 627 54 00', 'rrhh@imaginarium.es', 'imaginarium.es', 'AI E-commerce'],
  ['Famosa', 'Juguetes', 'Alicante', 'C. Valenciana', 'AI Manufacturing', 'Grande', '+34 96 549 06 00', 'rrhh@famosa.com', 'famosa.com', 'AI Manufacturing'],
  ['Smoby España', 'Juguetes', 'Madrid', 'Madrid', 'AI Toy', 'Grande', '+34 91 005 89 60', 'rrhh.spain@smoby.com', 'smoby.com', 'AI Toy'],
  ['Mattel España', 'Juguetes', 'Madrid', 'Madrid', 'AI Toy', 'Grande', '+34 91 005 89 78', 'rrhh.spain@mattel.com', 'mattel.com', 'AI Toy'],
  ['Hasbro España', 'Juguetes', 'Madrid', 'Madrid', 'AI Toy', 'Grande', '+34 91 005 89 92', 'rrhh.spain@hasbro.com', 'hasbro.com', 'AI Toy'],
  ['LEGO España', 'Juguetes', 'Madrid', 'Madrid', 'AI Toy', 'Grande', '+34 91 005 90 12', 'rrhh.spain@lego.com', 'lego.es', 'AI Toy'],

  // ============ INMOBILIARIAS ADICIONALES ============
  ['Neinor Homes', 'Promoción Inmobiliaria', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 432 49 00', 'rrhh@neinorhomes.com', 'neinorhomes.com', 'AI PropTech'],
  ['Insur', 'Promoción Inmobiliaria', 'Sevilla', 'Andalucía', 'AI PropTech', 'Grande', '+34 95 449 02 80', 'rrhh@grupoinsur.com', 'grupoinsur.com', 'AI PropTech'],
  ['Inmobiliaria del Sur', 'Promoción Inmobiliaria', 'Sevilla', 'Andalucía', 'AI PropTech', 'Grande', '+34 95 433 80 38', 'rrhh@inmosur.com', 'inmosur.com', 'AI PropTech'],
  ['Realia Business', 'Inmobiliaria', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 353 44 00', 'rrhh@realia.es', 'realia.es', 'AI PropTech'],
  ['Quabit Inmobiliaria', 'Inmobiliaria', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 535 68 00', 'rrhh@quabit.com', 'quabit.com', 'AI PropTech'],
  ['Metrovacesa', 'Inmobiliaria', 'Madrid', 'Madrid', 'AI PropTech', 'Grande', '+34 91 545 09 00', 'rrhh@metrovacesa.com', 'metrovacesa.com', 'AI PropTech'],
  ['Lar España', 'Inmobiliaria/REIT', 'Madrid', 'Madrid', 'AI Real Estate', 'Grande', '+34 91 436 04 37', 'rrhh@larespana.com', 'larespana.com', 'AI Real Estate'],

  // ============ CONSULTORÍA ESTRATÉGICA ============
  ['McKinsey & Company España', 'Consultoría Estratégica', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 580 80 00', 'rrhh.spain@mckinsey.com', 'mckinsey.com', 'AI Strategy'],
  ['BCG España', 'Consultoría Estratégica', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 700 90 00', 'rrhh.spain@bcg.com', 'bcg.com', 'AI Strategy'],
  ['Bain & Company España', 'Consultoría Estratégica', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 343 00 00', 'rrhh.spain@bain.com', 'bain.com', 'AI Strategy'],
  ['Roland Berger España', 'Consultoría', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 564 65 31', 'rrhh.spain@rolandberger.com', 'rolandberger.com', 'AI Strategy'],
  ['Oliver Wyman España', 'Consultoría', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 432 30 00', 'rrhh.spain@oliverwyman.com', 'oliverwyman.com', 'AI Strategy'],
  ['Arthur D. Little España', 'Consultoría', 'Madrid', 'Madrid', 'AI Strategy', 'Grande', '+34 91 005 90 35', 'rrhh.spain@adlittle.com', 'adlittle.com', 'AI Strategy'],
  ['Mercer España', 'Consultoría HR', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 91 432 90 00', 'rrhh.spain@mercer.com', 'mercer.es', 'AI HR'],
  ['Willis Towers Watson España', 'Consultoría HR/Risk', 'Madrid', 'Madrid', 'AI Risk', 'Grande', '+34 91 423 71 00', 'rrhh.spain@wtwco.com', 'wtwco.com', 'AI Risk'],
  ['Aon España', 'Consultoría Risk', 'Madrid', 'Madrid', 'AI Risk', 'Grande', '+34 91 700 47 00', 'rrhh.spain@aon.com', 'aon.es', 'AI Risk'],
  ['Marsh España', 'Consultoría Risk', 'Madrid', 'Madrid', 'AI Risk', 'Grande', '+34 91 514 22 00', 'rrhh.spain@marsh.com', 'marsh.com', 'AI Risk'],
  ['ICEX España', 'Comercio Exterior', 'Madrid', 'Madrid', 'AI Trade', 'Grande', '+34 91 349 61 00', 'rrhh@icex.es', 'icex.es', 'AI Trade'],

  // ============ TURISMO Y VIAJES ============
  ['Halcón Viajes', 'Agencia Viajes', 'Madrid', 'Madrid', 'AI Travel', 'Grande', '+34 90 230 02 02', 'rrhh@halconviajes.com', 'halconviajes.com', 'AI Travel'],
  ['Viajes El Corte Inglés', 'Agencia Viajes', 'Madrid', 'Madrid', 'AI Travel', 'Grande', '+34 91 506 80 00', 'rrhh@viajeseci.es', 'viajeseci.es', 'AI Travel'],
  ['B Travel Group', 'Agencia Viajes', 'Madrid', 'Madrid', 'AI Travel', 'Grande', '+34 90 224 33 24', 'rrhh@btravelgroup.com', 'btravelgroup.com', 'AI Travel'],
  ['Air Nostrum', 'Aviación Regional', 'Valencia', 'C. Valenciana', 'AI Aviation', 'Grande', '+34 96 196 02 00', 'rrhh@airnostrum.es', 'airnostrum.es', 'AI Aviation'],
  ['Iberia Express', 'Aviación', 'Madrid', 'Madrid', 'AI Aviation', 'Grande', '+34 90 042 04 21', 'rrhh@iberia.com', 'iberiaexpress.com', 'AI Aviation'],
  ['Volotea', 'Aviación', 'Asturias', 'Asturias', 'AI Aviation', 'Grande', '+34 80 204 65 65', 'rrhh@volotea.com', 'volotea.com', 'AI Aviation'],
  ['Globalia', 'Turismo Holding', 'Llucmajor', 'Baleares', 'AI Travel', 'Grande', '+34 90 240 15 01', 'rrhh@globalia.com', 'globalia.com', 'AI Travel'],

  // ============ FUNDACIONES Y ONG ============
  ['Fundación Telefónica', 'Fundación Tech', 'Madrid', 'Madrid', 'AI Innovation', 'Grande', '+34 90 050 84 12', 'rrhh@fundaciontelefonica.com', 'espacio.fundaciontelefonica.com', 'AI Innovation'],
  ['Fundación BBVA', 'Fundación', 'Madrid', 'Madrid', 'AI Research', 'Grande', '+34 91 374 60 00', 'rrhh@fbbva.es', 'fbbva.es', 'AI Research'],
  ['Fundación La Caixa', 'Fundación', 'Barcelona', 'Cataluña', 'AI Education/Research', 'Grande', '+34 93 404 60 00', 'rrhh@fundacionlacaixa.org', 'fundacionlacaixa.org', 'AI Research'],
  ['Fundación Cellex', 'Fundación Investigación', 'Barcelona', 'Cataluña', 'AI Research', 'Mediana', '+34 93 220 99 12', 'rrhh@fundaciocellex.org', 'fundaciocellex.org', 'AI Research'],
  ['Fundación Botín', 'Fundación', 'Santander', 'Cantabria', 'AI Innovation', 'Grande', '+34 94 222 60 72', 'rrhh@fundacionbotin.org', 'fundacionbotin.org', 'AI Innovation'],

  // ============ MÁS STARTUPS ESPAÑOLAS RECIENTES ============
  ['Cafler', 'Mobility', 'Madrid', 'Madrid', 'AI Mobility', 'Mediana', '+34 91 088 95 41', 'rrhh@cafler.com', 'cafler.com', 'AI Mobility'],
  ['Lola Market', 'Quick Commerce', 'Madrid', 'Madrid', 'AI Logistics', 'Mediana', '+34 91 088 95 60', 'rrhh@lolamarket.com', 'lolamarket.com', 'AI Logistics'],
  ['Colvin', 'E-commerce Flores', 'Barcelona', 'Cataluña', 'AI E-commerce', 'Mediana', '+34 93 220 99 32', 'rrhh@colvin.com', 'colvin.com', 'AI E-commerce'],
  ['Ally Mind', 'Wellness IA', 'Madrid', 'Madrid', 'AI Wellness', 'Pequeña', '+34 91 088 96 14', 'rrhh@allymind.com', 'allymind.com', 'AI Wellness'],
  ['11Sheep', 'IA Insurance', 'Madrid', 'Madrid', 'AI Insurance', 'Pequeña', '+34 91 088 96 30', 'rrhh@11sheep.com', '11sheep.com', 'AI Insurance'],
  ['Cyclic.io España', 'DevTools IA', 'Madrid', 'Madrid', 'AI DevOps', 'Pequeña', '+34 91 088 96 47', 'rrhh@cyclic.sh', 'cyclic.sh', 'AI DevOps'],
  ['Lucca España', 'HR Tech', 'Madrid', 'Madrid', 'AI HR', 'Mediana', '+34 91 088 96 65', 'rrhh@lucca.es', 'lucca.es', 'AI HR'],
  ['Streep', 'Marketing IA', 'Barcelona', 'Cataluña', 'AI Marketing', 'Pequeña', '+34 93 220 99 78', 'rrhh@streep.io', 'streep.io', 'AI Marketing'],
  ['UALett', 'Fintech IA', 'Madrid', 'Madrid', 'AI Banking', 'Mediana', '+34 91 088 97 02', 'rrhh@ualett.com', 'ualett.com', 'AI Banking'],
  ['Spinpedo', 'Mobility IA', 'Madrid', 'Madrid', 'AI Mobility', 'Pequeña', '+34 91 088 97 26', 'rrhh@spinpedo.com', 'spinpedo.com', 'AI Mobility'],
  ['Tooltip Studio', 'AdTech IA', 'Madrid', 'Madrid', 'AI Advertising', 'Pequeña', '+34 91 088 97 48', 'rrhh@tooltipstudio.com', 'tooltipstudio.com', 'AI Advertising'],
  ['Dotmunity', 'IA SaaS', 'Bilbao', 'País Vasco', 'AI SaaS', 'Pequeña', '+34 94 488 22 17', 'rrhh@dotmunity.com', 'dotmunity.com', 'AI SaaS'],
  ['Hispasing', 'Tech Industrial', 'Bilbao', 'País Vasco', 'AI Industrial', 'Mediana', '+34 94 488 24 08', 'rrhh@hispasing.com', 'hispasing.com', 'AI Industrial'],

  // ============ MÁS BIG TECH/STARTUPS GLOBALES SEDE BARCELONA / MADRID ============
  ['N26 España', 'Fintech', 'Barcelona', 'Cataluña', 'AI Banking', 'Grande', '+34 93 220 60 12', 'careers.spain@n26.com', 'n26.com/es', 'AI Banking'],
  ['Revolut España', 'Fintech', 'Barcelona', 'Cataluña', 'AI Banking', 'Grande', '+34 93 220 60 38', 'careers.spain@revolut.com', 'revolut.com/es', 'AI Banking'],
  ['Stripe España', 'Pagos', 'Madrid', 'Madrid', 'AI Payments', 'Grande', '+34 91 005 91 12', 'careers.spain@stripe.com', 'stripe.com', 'AI Payments'],
  ['Adyen España', 'Pagos', 'Madrid', 'Madrid', 'AI Payments', 'Grande', '+34 91 005 91 36', 'careers.spain@adyen.com', 'adyen.com', 'AI Payments'],
  ['Klarna España', 'Fintech BNPL', 'Barcelona', 'Cataluña', 'AI BNPL', 'Grande', '+34 93 220 60 52', 'careers.spain@klarna.com', 'klarna.com', 'AI BNPL'],
  ['PayPal España', 'Pagos', 'Madrid', 'Madrid', 'AI Payments', 'Grande', '+34 91 005 91 60', 'careers.spain@paypal.com', 'paypal.com/es', 'AI Payments'],
  ['Shopify España', 'E-commerce', 'Madrid', 'Madrid', 'AI E-commerce', 'Grande', '+34 91 005 91 88', 'careers.spain@shopify.com', 'shopify.es', 'AI E-commerce'],
  ['BigCommerce España', 'E-commerce', 'Madrid', 'Madrid', 'AI E-commerce', 'Grande', '+34 91 005 92 12', 'careers.spain@bigcommerce.com', 'bigcommerce.com', 'AI E-commerce'],
  ['Doctolib España', 'HealthTech', 'Madrid', 'Madrid', 'AI Health', 'Grande', '+34 91 005 92 34', 'careers.spain@doctolib.com', 'doctolib.es', 'AI Health'],

  // ============ MÁS HEALTHTECH ESPAÑOLA ============
  ['eDoctor España', 'HealthTech', 'Madrid', 'Madrid', 'AI Telemedicine', 'Pequeña', '+34 91 088 97 70', 'rrhh@edoctorspain.es', 'edoctorspain.es', 'AI Telemedicine'],
  ['Savana Medica', 'HealthTech IA', 'Madrid', 'Madrid', 'AI Medical Records', 'Mediana', '+34 91 088 97 92', 'rrhh@savanamed.com', 'savanamed.com', 'AI Medical Records'],
  ['Pulsoone', 'HealthTech', 'Madrid', 'Madrid', 'AI Health', 'Pequeña', '+34 91 088 98 14', 'rrhh@pulsoone.com', 'pulsoone.com', 'AI Health'],
  ['SaludOnNet', 'HealthTech', 'Madrid', 'Madrid', 'AI Health', 'Mediana', '+34 91 088 98 36', 'rrhh@saludonnet.com', 'saludonnet.com', 'AI Health'],
  ['Quirón Prevención', 'Sanidad/Prevención', 'Madrid', 'Madrid', 'AI Prevention', 'Grande', '+34 90 027 22 02', 'rrhh@quironprevencion.com', 'quironprevencion.com', 'AI Prevention'],
  ['IVI - Instituto Valenciano Infertilidad', 'Sanidad', 'Valencia', 'C. Valenciana', 'AI Fertility', 'Grande', '+34 96 305 09 00', 'rrhh@ivi.es', 'ivi.es', 'AI Fertility'],
  ['Eugin (Reproducción)', 'Sanidad/Reproducción', 'Barcelona', 'Cataluña', 'AI Fertility', 'Grande', '+34 93 322 27 22', 'rrhh@eugin.es', 'eugin.es', 'AI Fertility'],
  ['Roche Farma España', 'Farma', 'Madrid', 'Madrid', 'AI Pharma', 'Grande', '+34 91 324 81 00', 'rrhh@roche.com', 'roche.es', 'AI Pharma'],
  ['SaludMadrid', 'Sanidad Pública', 'Madrid', 'Madrid', 'AI Health Public', 'Grande', '+34 91 426 50 00', 'rrhh@madrid.org', 'madrid.org/sanidad', 'AI Health Public'],

  // ============ TRANSPORTE LOGÍSTICA ============
  ['EMT Madrid', 'Transporte Público', 'Madrid', 'Madrid', 'AI Smart Mobility', 'Grande', '+34 91 209 00 00', 'rrhh@emtmadrid.es', 'emtmadrid.es', 'AI Smart Mobility'],
  ['Metro Madrid', 'Transporte Público', 'Madrid', 'Madrid', 'AI Smart Transport', 'Grande', '+34 91 779 60 00', 'rrhh@metromadrid.es', 'metromadrid.es', 'AI Smart Transport'],
  ['ALSA', 'Autobuses', 'Asturias', 'Asturias', 'AI Transport', 'Grande', '+34 90 242 22 42', 'rrhh@alsa.es', 'alsa.com', 'AI Transport'],
  ['Avanza Spain', 'Transporte', 'Madrid', 'Madrid', 'AI Transport', 'Grande', '+34 91 272 28 00', 'rrhh@avanzagrupo.com', 'avanzagrupo.com', 'AI Transport'],
  ['Transportes Vázquez', 'Logística', 'Madrid', 'Madrid', 'AI Logistics', 'Mediana', '+34 91 005 92 78', 'rrhh@transportesvazquez.com', 'transportesvazquez.com', 'AI Logistics'],
  ['Transportes Souto', 'Logística', 'A Coruña', 'Galicia', 'AI Logistics', 'Mediana', '+34 98 117 35 27', 'rrhh@transportessouto.com', 'transportessouto.com', 'AI Logistics'],

  // ============ DEFENSA Y SEGURIDAD ============
  ['Expal Systems', 'Defensa', 'Madrid', 'Madrid', 'AI Defence', 'Grande', '+34 91 305 86 00', 'rrhh@expal.es', 'expal.com', 'AI Defence'],
  ['SAPA Operaciones', 'Defensa', 'Andoain', 'País Vasco', 'AI Defence', 'Grande', '+34 94 359 18 28', 'rrhh@sapa.es', 'sapa-operaciones.com', 'AI Defence'],
  ['Escribano Mechanical Engineering', 'Defensa', 'Alcalá de Henares', 'Madrid', 'AI Defence', 'Grande', '+34 91 877 19 75', 'rrhh@escribano.com', 'escribanome.com', 'AI Defence'],
  ['Prosegur', 'Seguridad', 'Madrid', 'Madrid', 'AI Security', 'Grande', '+34 91 589 80 00', 'rrhh@prosegur.com', 'prosegur.com', 'AI Security'],
  ['Securitas España', 'Seguridad', 'Madrid', 'Madrid', 'AI Security', 'Grande', '+34 91 277 82 00', 'rrhh.spain@securitas.com', 'securitas.es', 'AI Security'],
  ['Eulen Group', 'Servicios', 'Madrid', 'Madrid', 'AI Services', 'Grande', '+34 91 631 08 00', 'rrhh@eulen.com', 'eulen.com', 'AI Services'],
  ['ISS Facility Services', 'Servicios', 'Madrid', 'Madrid', 'AI Services', 'Grande', '+34 91 005 93 12', 'rrhh.spain@iss-services.com', 'iss-services.com', 'AI Services'],

  // ============ CASTING / RRHH SECTORIAL ============
  ['Adecco España', 'RRHH', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 90 011 24 24', 'rrhh@adecco.es', 'adecco.es', 'AI HR'],
  ['Randstad España', 'RRHH', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 90 098 20 50', 'rrhh@randstad.es', 'randstad.es', 'AI HR'],
  ['Manpower España', 'RRHH', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 90 232 32 32', 'rrhh@manpower.es', 'manpower.es', 'AI HR'],
  ['Hays España', 'RRHH', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 91 432 17 50', 'rrhh@hays.es', 'hays.es', 'AI HR'],
  ['Michael Page España', 'RRHH Ejecutivo', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 91 056 24 00', 'rrhh@michaelpage.es', 'michaelpage.es', 'AI HR'],
  ['Robert Walters España', 'RRHH Ejecutivo', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 91 309 30 00', 'rrhh@robertwalters.es', 'robertwalters.es', 'AI HR'],
  ['Spring Professional España', 'RRHH IT', 'Madrid', 'Madrid', 'AI HR', 'Grande', '+34 91 005 93 28', 'rrhh.spain@springprofessional.com', 'springprofessional.es', 'AI HR'],

  // ============ AGENCIAS DE PUBLICIDAD ESPECIALIZADAS ============
  ['Saatchi & Saatchi España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 360 00 00', 'rrhh.spain@saatchi.com', 'saatchi.com', 'AI Creative'],
  ['JWT Spain', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 005 93 50', 'rrhh.spain@jwt.com', 'jwt.com', 'AI Creative'],
  ['Leo Burnett España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 005 93 78', 'rrhh.spain@leoburnett.com', 'leoburnett.com', 'AI Creative'],
  ['Y&R España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 005 93 96', 'rrhh.spain@yr.com', 'yr.com', 'AI Creative'],
  ['MullenLowe España', 'Publicidad', 'Madrid', 'Madrid', 'AI Creative', 'Grande', '+34 91 700 03 27', 'rrhh@mullenlowe.es', 'mullenlowe.es', 'AI Creative'],
  ['Iberian Sports Reach', 'Marketing Deportivo', 'Madrid', 'Madrid', 'AI Sports Marketing', 'Mediana', '+34 91 088 99 12', 'rrhh@iberiansportsreach.com', 'iberiansportsreach.com', 'AI Sports'],
  ['Mediabrands España', 'Media', 'Madrid', 'Madrid', 'AI Marketing', 'Grande', '+34 91 005 94 22', 'rrhh.spain@mbww.com', 'mediabrands.com', 'AI Marketing'],

  // ============ MAS EDITORIALES Y CONTENIDOS ============
  ['Edebé', 'Editorial', 'Barcelona', 'Cataluña', 'AI EdTech', 'Grande', '+34 93 220 33 00', 'rrhh@edebe.net', 'edebe.com', 'AI EdTech'],
  ['Edelvives', 'Editorial', 'Zaragoza', 'Aragón', 'AI EdTech', 'Grande', '+34 97 657 09 12', 'rrhh@edelvives.com', 'edelvives.com', 'AI EdTech'],
  ['Penguin Books España', 'Editorial', 'Madrid', 'Madrid', 'AI Publishing', 'Grande', '+34 91 005 94 50', 'rrhh.spain@penguin.com', 'penguinlibros.com', 'AI Publishing'],

  // ============ AGRICULTURA INTENSIVA / AGRI-FOOD ============
  ['Anecoop', 'Cooperativa Agroalimentaria', 'Valencia', 'C. Valenciana', 'AI Agri', 'Grande', '+34 96 393 85 00', 'rrhh@anecoop.com', 'anecoop.com', 'AI Agri'],
  ['Cooperativas Agro-alimentarias', 'Agricultura', 'Madrid', 'Madrid', 'AI Agri', 'Grande', '+34 91 535 10 35', 'rrhh@agro-alimentarias.coop', 'agro-alimentarias.coop', 'AI Agri'],
  ['BonÀrea Agrupa', 'Cárnicos/Cooperativa', 'Guissona', 'Cataluña', 'AI Manufacturing', 'Grande', '+34 97 355 25 25', 'rrhh@bonarea.com', 'bonarea.com', 'AI Manufacturing'],
  ['Vicky Foods', 'Alimentación', 'Gandía', 'C. Valenciana', 'AI Manufacturing', 'Grande', '+34 96 296 10 00', 'rrhh@vickyfoods.com', 'vickyfoods.com', 'AI Manufacturing'],
  ['Cárnicas Frial', 'Cárnicos', 'Burgos', 'Castilla y León', 'AI Manufacturing', 'Mediana', '+34 94 727 36 00', 'rrhh@frial.es', 'frial.es', 'AI Manufacturing'],

  // ============ DEPORTE Y FITNESS ============
  ['Decathlon España', 'Retail Deporte', 'Madrid', 'Madrid', 'AI E-commerce', 'Grande', '+34 91 745 22 00', 'rrhh@decathlon.es', 'decathlon.es', 'AI E-commerce'],
  ['Sportium', 'Apuestas Deportivas', 'Madrid', 'Madrid', 'AI Gaming', 'Grande', '+34 91 005 94 78', 'rrhh@sportium.es', 'sportium.es', 'AI Gaming'],
  ['VivaGym Group', 'Fitness', 'Sevilla', 'Andalucía', 'AI Fitness', 'Grande', '+34 95 449 96 99', 'rrhh@vivagym.es', 'vivagym.com', 'AI Fitness'],
  ['Holmes Place', 'Fitness', 'Madrid', 'Madrid', 'AI Fitness', 'Grande', '+34 91 005 94 92', 'rrhh.spain@holmesplace.com', 'holmesplace.es', 'AI Fitness'],
  ['Fitness 19', 'Fitness', 'Sevilla', 'Andalucía', 'AI Fitness', 'Mediana', '+34 95 449 96 99', 'rrhh@fitness19.es', 'fitness19.es', 'AI Fitness']
];

function reordenar(n) {
  return [n[7], n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[8], n[9]];
}

async function add() {
  try {
    console.log('🤖 Lote 3 empresas IA...\n');
    console.log(`📊 Nuevas: ${LOTE3.length}\n`);

    const { sheets } = await getServices();
    const reord = LOTE3.map(reordenar);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'EMPRESAS IA'!A1",
      valueInputOption: 'RAW',
      resource: { values: reord }
    });

    console.log(`✅ ${LOTE3.length} empresas añadidas\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

add();
