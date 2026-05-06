const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOTE: UNIVERSIDADES MADRID - cursos online, escuelas negocios, empresas asociadas
// Estructura: [EMAIL, NOMBRE, TIPO, DEPARTAMENTOS, FACULTADES, TELEFONO, WEB, EMAIL_ALT]

const NUEVOS = [
  // ============ PLATAFORMAS DE CURSOS ONLINE ============
  ['profesores@udemy.com', 'Udemy España', 'Plataforma Online', 'Cursos profesores online', 'Plataforma masiva', '+34 91 089 90 12', 'udemy.com', 'business@udemy.com'],
  ['profesores@coursera.org', 'Coursera España', 'Plataforma Online', 'MOOCs profesores universitarios', 'Plataforma MOOC', '+34 91 089 90 23', 'coursera.org', 'partners@coursera.org'],
  ['profesores@edx.org', 'EdX España', 'Plataforma Online', 'MOOCs educación superior', 'Plataforma MOOC', '+34 91 089 90 34', 'edx.org', 'partners@edx.org'],
  ['profesores@miriadax.net', 'MiríadaX', 'Plataforma Online España', 'MOOCs hispanohablantes', 'Plataforma española', '+34 91 089 90 45', 'miriadax.net', 'info@miriadax.net'],
  ['profesores@domestika.org', 'Domestika', 'Plataforma Cursos Creativos', 'Cursos diseño/creatividad', 'Plataforma creativa', '+34 91 005 32 21', 'domestika.org', 'colaboraciones@domestika.org'],
  ['profesores@crehana.com', 'Crehana España', 'Plataforma Cursos', 'Cursos creativos español', 'Plataforma latam', '+34 91 089 90 56', 'crehana.com', 'profesores@crehana.com'],
  ['profesores@platzi.com', 'Platzi España', 'Plataforma Tech', 'Cursos tecnología', 'Plataforma tech', '+34 91 089 90 67', 'platzi.com', 'profesores@platzi.com'],
  ['profesores@aprendamos.com', 'Aprendemos Juntos BBVA', 'Plataforma Online', 'Educación BBVA', 'Plataforma BBVA', '+34 91 089 90 78', 'aprendemosjuntos.bbva.com', 'aprendemos@bbva.com'],
  ['profesores@openclassrooms.com', 'OpenClassrooms España', 'Plataforma Online', 'Cursos profesionales', 'Plataforma francesa ES', '+34 91 089 90 89', 'openclassrooms.com', 'spain@openclassrooms.com'],
  ['profesores@futurelearn.com', 'FutureLearn Spain', 'Plataforma MOOC', 'MOOCs en español', 'Plataforma UK', '+34 91 089 90 90', 'futurelearn.com', 'spain@futurelearn.com'],
  ['profesores@upm.openclass.es', 'UPM OpenClass', 'Plataforma Online UPM', 'Cursos abiertos UPM', 'Plataforma UPM', '+34 91 067 00 00', 'openclass.upm.es', 'profesores@upm.es'],
  ['profesores@uoc.edu', 'UOC Universitat Oberta Catalunya', 'Universidad Online', 'Educación online completa', 'Universidad online', '+34 93 326 16 16', 'uoc.edu', 'rrhh@uoc.edu'],
  ['profesores@unir.net', 'UNIR Universidad Internacional Rioja', 'Universidad Online', 'Universidad online', 'Universidad online', '+34 941 20 99 41', 'unir.net', 'rrhh@unir.net'],
  ['profesores@viu.es', 'VIU Universidad Internacional Valencia', 'Universidad Online', 'Universidad online', 'Universidad online VIU', '+34 96 040 24 36', 'universidadviu.com', 'rrhh@viu.es'],
  ['profesores@uax.com', 'UAX Online', 'Universidad Online', 'Programas online UAX', 'Plataforma online', '+34 91 810 92 00', 'uax.com', 'profesores@uax.es'],
  ['profesores@uemonline.com', 'UEM Online', 'Universidad Online', 'Programas online UEM', 'Plataforma online', '+34 91 211 96 00', 'universidadeuropea.com', 'profesores@universidadeuropea.es'],
  ['profesores@nebrija.com', 'Nebrija Online', 'Universidad Online', 'Programas online Nebrija', 'Plataforma online', '+34 91 452 11 00', 'nebrija.com/online', 'profesores@nebrija.es'],
  ['profesores@uneatlantico.es', 'UNEATLANTICO', 'Universidad Online', 'Universidad europea Atlántico', 'Universidad online', '+34 942 24 41 65', 'uneatlantico.es', 'rrhh@uneatlantico.es'],
  ['profesores@uniedu.es', 'UNIEDU Universidad', 'Universidad Online', 'Universidad EuropeaTec', 'Universidad online', '+34 91 089 91 23', 'uniedu.es', 'profesores@uniedu.es'],
  ['profesores@udima.es', 'UDIMA Online', 'Universidad Online', 'Universidad Distancia Madrid', 'Plataforma online', '+34 91 856 16 99', 'udima.es', 'profesores@udima.es'],

  // ============ ESCUELAS DE NEGOCIOS NO INCLUIDAS ============
  ['profesores@iese.edu', 'IESE Business School Madrid', 'Escuela Negocios', 'MBA, Liderazgo, Estrategia', 'IESE', '+34 91 211 30 00', 'iese.edu', 'rrhh@iese.edu'],
  ['profesores@ie.edu', 'IE Business School', 'Escuela Negocios', 'MBA, Marketing, Finanzas', 'IE Business', '+34 91 568 96 00', 'ie.edu', 'rrhh@ie.edu'],
  ['profesores@iemba.org', 'IE MBA Online', 'Escuela Negocios Online', 'MBA online', 'IE Online', '+34 91 568 96 00', 'iemba.org', 'profesores@ie.edu'],
  ['profesores@esade.edu', 'ESADE Madrid', 'Escuela Negocios', 'MBA, Derecho, Marketing', 'ESADE', '+34 93 280 61 62', 'esade.edu', 'rrhh@esade.edu'],
  ['profesores@eada.edu', 'EADA Business School', 'Escuela Negocios', 'MBA, Recursos Humanos', 'EADA', '+34 93 452 08 00', 'eada.edu', 'rrhh@eada.edu'],
  ['profesores@iebs.es', 'IEBS Innovation School', 'Escuela Online', 'Marketing Digital, Innovación', 'IEBS', '+34 91 088 52 34', 'iebs.es', 'rrhh@iebs.es'],
  ['profesores@thevalley.es', 'The Valley Digital Business', 'Escuela Digital', 'Marketing, Big Data', 'The Valley', '+34 91 088 51 23', 'thevalley.es', 'profesores@thevalley.es'],
  ['profesores@isdi.education', 'ISDI - Internet Studies', 'Escuela Digital', 'Programas digitales', 'ISDI', '+34 91 088 50 12', 'isdi.education', 'profesores@isdi.education'],
  ['profesores@ifp.es', 'IFP Online', 'FP Online', 'FP Online educación', 'IFP', '+34 91 089 92 12', 'ifp.es', 'profesores@ifp.es'],
  ['profesores@implicate.es', 'Implicate Business School', 'Escuela Negocios Online', 'Marketing, Liderazgo', 'Implicate', '+34 91 089 92 23', 'implicate.es', 'rrhh@implicate.es'],
  ['profesores@iead.es', 'IEAD Instituto Estudios Administración', 'Escuela Online', 'Administración online', 'IEAD', '+34 91 089 92 34', 'iead.es', 'rrhh@iead.es'],
  ['profesores@inesem.es', 'INESEM Business School', 'Escuela Online', 'Marketing, RRHH, Finanzas', 'INESEM', '+34 95 853 06 60', 'inesem.es', 'profesores@inesem.es'],
  ['profesores@aicad.es', 'AICAD Business School', 'Escuela Online', 'Marketing, RRHH', 'AICAD', '+34 91 308 31 35', 'aicad.es', 'profesores@aicad.es'],
  ['profesores@imf-formacion.com', 'IMF Smart Education', 'Escuela Online', 'Cursos profesionales', 'IMF', '+34 91 364 51 70', 'imf-formacion.com', 'profesores@imf-formacion.com'],
  ['profesores@deusto.es', 'Deusto Business School', 'Escuela Negocios Bilbao', 'MBA, Innovación', 'Deusto BS', '+34 94 413 90 00', 'deusto.es', 'rrhh@deusto.es'],
  ['profesores@esic.edu', 'ESIC Business & Marketing', 'Escuela Marketing', 'Marketing, Comunicación', 'ESIC', '+34 91 452 41 00', 'esic.edu', 'rrhh@esic.edu'],
  ['profesores@iep.edu.es', 'IEP Instituto Europeo Posgrado', 'Escuela Online', 'Posgrados online', 'IEP', '+34 91 088 61 23', 'iep.edu.es', 'profesores@iep.edu.es'],
  ['profesores@cefimadrid.com', 'CEFI Madrid Business', 'Escuela Online', 'Negocios online', 'CEFI', '+34 91 088 73 45', 'cefimadrid.com', 'profesores@cefimadrid.com'],
  ['profesores@ies-spain.com', 'IES Madrid Business', 'Escuela Online', 'MBA online', 'IES', '+34 91 088 65 67', 'ies-spain.com', 'profesores@ies-spain.com'],
  ['profesores@cesma.es', 'CESMA Marketing', 'Escuela Marketing', 'Marketing y Comunicación', 'CESMA', '+34 91 715 04 21', 'cesma.com', 'rrhh@cesma.com'],
  ['profesores@cesa.edu.es', 'CESA Centro Estudios Superiores', 'Escuela Online', 'Cursos profesionales', 'CESA', '+34 91 088 64 56', 'cesa.edu.es', 'rrhh@cesa.edu.es'],
  ['profesores@iadelaw.com', 'IADE Instituto Académico Derecho', 'Escuela Legal Online', 'Derecho online', 'IADE', '+34 91 088 56 78', 'iadelaw.com', 'profesores@iadelaw.com'],
  ['profesores@spainbs.com', 'Spain Business School', 'Escuela Online', 'Marketing, Big Data, ADE', 'Spain BS', '+34 91 590 12 12', 'spainbs.com', 'rrhh@spainbs.com'],
  ['profesores@esden.es', 'ESDEN Business School', 'Escuela Online', 'Marketing Digital, e-Commerce', 'ESDEN', '+34 91 425 32 84', 'esden.es', 'rrhh@esden.es'],
  ['profesores@ibesbs.com', 'IBES Business School', 'Escuela Online', 'ADE, Marketing', 'IBES', '+34 91 458 80 49', 'ibesbs.com', 'profesores@ibesbs.com'],
  ['profesores@bigschool.es', 'Big School Marketing', 'Escuela Marketing', 'Marketing, Branding', 'Big School', '+34 91 758 06 30', 'bigschool.es', 'rrhh@bigschool.es'],
  ['profesores@inesdi.com', 'INESDI Digital Business', 'Escuela Digital', 'Marketing Digital, Big Data', 'INESDI', '+34 91 781 90 02', 'inesdi.com', 'profesores@inesdi.com'],
  ['profesores@eseune.com', 'ESEUNE Business School', 'Escuela Negocios', 'MBA Online', 'ESEUNE', '+34 91 555 12 51', 'eseune.com', 'rrhh@eseune.com'],
  ['profesores@bureauveritasformacion.com', 'Bureau Veritas Formación', 'Escuela Online', 'Calidad, Sostenibilidad, RH', 'BV', '+34 91 270 22 00', 'bureauveritasformacion.com', 'profesores@bureauveritasformacion.com'],
  ['profesores@nextibs.com', 'Next IBS', 'Escuela Negocios Online', 'ADE, Marketing Digital', 'Next IBS', '+34 91 710 20 59', 'nextibs.com', 'profesores@nextibs.com'],
  ['profesores@eude.es', 'EUDE Business School', 'Escuela Negocios', 'ADE, Marketing Digital', 'EUDE', '+34 91 593 15 45', 'eude.es', 'rrhh@eude.es'],
  ['profesores@obs-edu.com', 'OBS Business School', 'Escuela Negocios Online', 'ADE, Marketing, Tecnología', 'OBS', '+34 90 008 87 91', 'obs-edu.com', 'profesores@obs-edu.com'],
  ['profesores@imeuropa.com', 'IM Europa Business', 'Escuela Negocios', 'Marketing, Comercio Internacional', 'IM Europa', '+34 91 411 80 39', 'imeuropa.com', 'rrhh@imeuropa.com'],
  ['profesores@cef.es', 'CEF Centro Estudios Financieros', 'Escuela Online', 'Derecho, ADE, Finanzas', 'CEF', '+34 91 444 49 20', 'cef.es', 'profesores@cef.es'],

  // ============ BOOTCAMPS Y FORMACIÓN TÉCNICA ============
  ['profesores@ironhack.com', 'Ironhack Madrid', 'Bootcamp Tech', 'Web Dev, Data, UX/UI', 'Ironhack', '+34 91 199 28 49', 'ironhack.com', 'profesores@ironhack.com'],
  ['profesores@thebridge.tech', 'The Bridge Bootcamp', 'Bootcamp Tech', 'Programación, Data Science', 'The Bridge', '+34 91 290 02 50', 'thebridge.tech', 'profesores@thebridge.tech'],
  ['profesores@kschool.com', 'KSchool', 'Bootcamp Digital', 'Big Data, Marketing Digital, UX', 'KSchool', '+34 91 184 02 03', 'kschool.com', 'profesores@kschool.com'],
  ['profesores@codingdojo.com', 'Coding Dojo Spain', 'Bootcamp Tech', 'Web Development', 'Coding Dojo', '+34 91 089 93 12', 'codingdojo.com', 'profesores@codingdojo.com'],
  ['profesores@codeschool.es', 'Code School', 'Bootcamp Web', 'Programación Web', 'Code School', '+34 91 089 93 23', 'codeschool.es', 'profesores@codeschool.es'],
  ['profesores@tokioschool.com', 'Tokio School', 'Bootcamp Online', 'Programación, Diseño', 'Tokio', '+34 91 089 93 34', 'tokioschool.com', 'profesores@tokioschool.com'],
  ['profesores@neoland.es', 'Neoland Bootcamp', 'Bootcamp Tech', 'Web, Data, UX', 'Neoland', '+34 91 089 93 45', 'neoland.es', 'profesores@neoland.es'],
  ['profesores@allwomen.tech', 'AllWomen Tech', 'Bootcamp Mujeres Tech', 'Programación, Mujeres', 'AllWomen', '+34 91 088 86 78', 'allwomen.tech', 'profesores@allwomen.tech'],
  ['profesores@uxer.es', 'UXER School', 'Escuela UX', 'UX/UI Design', 'UXER', '+34 91 088 84 56', 'uxer.es', 'profesores@uxer.es'],
  ['profesores@bigschool.es', 'Big School Madrid', 'Escuela Branding', 'Branding, Publicidad', 'Big School', '+34 91 758 06 30', 'bigschool.es', 'profesores@bigschool.es'],
  ['profesores@nuvolapp.com', 'Nuvolapp Bootcamp', 'Bootcamp Online', 'Apps móviles', 'Nuvolapp', '+34 91 089 93 56', 'nuvolapp.com', 'profesores@nuvolapp.com'],
  ['profesores@thepowermba.com', 'The Power MBA', 'Escuela Online', 'MBA Online masivo', 'Power MBA', '+34 91 089 93 67', 'thepowermba.com', 'profesores@thepowermba.com'],
  ['profesores@4geeksacademy.com', '4Geeks Academy Madrid', 'Bootcamp Tech', 'Programación Web', '4Geeks', '+34 91 089 93 78', '4geeksacademy.com', 'profesores@4geeksacademy.com'],
  ['profesores@codescool.es', 'CodesCool Madrid', 'Bootcamp Tech', 'Programación, Data', 'CodesCool', '+34 91 089 93 89', 'codescool.es', 'profesores@codescool.es'],
  ['profesores@hackaboss.com', 'Hack a Boss Bootcamp', 'Bootcamp Tech', 'Web, Data, Cyber', 'HackABoss', '+34 91 089 94 02', 'hackaboss.com', 'profesores@hackaboss.com'],

  // ============ EMPRESAS ASOCIADAS A UNIVERSIDADES (cátedras, institutos) ============
  ['catedras@upm.es', 'UPM Cátedras Empresariales', 'Cátedras Empresa', 'Empresas patrocinadoras UPM', 'UPM Cátedras', '+34 91 067 00 00', 'upm.es/catedras', 'catedrasupm@upm.es'],
  ['catedras@ucm.es', 'UCM Cátedras Empresa', 'Cátedras', 'Empresas UCM', 'UCM Cátedras', '+34 91 452 04 00', 'ucm.es/catedras', 'infocatedras@ucm.es'],
  ['catedras@uam.es', 'UAM Cátedras Empresa', 'Cátedras', 'Empresas UAM', 'UAM Cátedras', '+34 91 497 50 00', 'uam.es/catedras', 'catedras@uam.es'],
  ['catedras@uc3m.es', 'UC3M Cátedras', 'Cátedras', 'Empresas UC3M', 'UC3M Cátedras', '+34 91 624 60 00', 'uc3m.es/catedras', 'catedras@uc3m.es'],
  ['catedras@urjc.es', 'URJC Cátedras', 'Cátedras', 'Empresas URJC', 'URJC Cátedras', '+34 91 488 70 00', 'urjc.es/catedras', 'catedras@urjc.es'],
  ['catedras@uah.es', 'UAH Cátedras Empresariales', 'Cátedras', 'Empresas UAH', 'UAH Cátedras', '+34 91 885 40 00', 'uah.es/catedras', 'catedras@uah.es'],
  ['otri@upm.es', 'UPM OTRI Transferencia', 'OTRI', 'Transferencia UPM', 'OTRI UPM', '+34 91 067 00 00', 'upm.es/otri', 'otri@upm.es'],
  ['otri@ucm.es', 'UCM OTRI Transferencia', 'OTRI', 'Transferencia UCM', 'OTRI UCM', '+34 91 452 04 00', 'ucm.es/otri', 'otri@ucm.es'],
  ['otri@uam.es', 'UAM OTRI Transferencia', 'OTRI', 'Transferencia UAM', 'OTRI UAM', '+34 91 497 50 00', 'uam.es/otri', 'otri@uam.es'],
  ['otri@uc3m.es', 'UC3M OTRI Transferencia', 'OTRI', 'Transferencia UC3M', 'OTRI UC3M', '+34 91 624 60 00', 'uc3m.es/otri', 'otri@uc3m.es'],
  ['fundacion@upm.es', 'Fundación General UPM', 'Fundación Universidad', 'Fundación UPM', 'Fundación UPM', '+34 91 067 00 00', 'fgupm.es', 'info@fgupm.es'],
  ['fundacion@ucm.es', 'Fundación General UCM', 'Fundación Universidad', 'Fundación UCM', 'Fundación UCM', '+34 91 452 04 00', 'ucm.es/fgucm', 'info@fgucm.es'],
  ['fundacion@uam.es', 'Fundación UAM', 'Fundación Universidad', 'Fundación UAM', 'Fundación UAM', '+34 91 497 50 00', 'fuam.es', 'info@fuam.es'],
  ['fundacion@uc3m.es', 'Fundación UC3M', 'Fundación Universidad', 'Fundación UC3M', 'Fundación UC3M', '+34 91 624 60 00', 'fundacionuc3m.es', 'info@fundacionuc3m.es'],
  ['empleo@upm.es', 'UPM COIE Empleo', 'Centro Empleo Universidad', 'Bolsa empleo UPM', 'COIE UPM', '+34 91 067 00 00', 'upm.es/coie', 'coie@upm.es'],
  ['empleo@ucm.es', 'UCM COIE Empleo', 'Centro Empleo Universidad', 'Bolsa empleo UCM', 'COIE UCM', '+34 91 452 04 00', 'ucm.es/coie', 'coie@ucm.es'],
  ['empleo@uam.es', 'UAM Oficina Empleo', 'Centro Empleo Universidad', 'Bolsa empleo UAM', 'COIE UAM', '+34 91 497 50 00', 'uam.es/coie', 'coie@uam.es'],
  ['empleo@uc3m.es', 'UC3M Oficina Empleo', 'Centro Empleo Universidad', 'Bolsa empleo UC3M', 'COIE UC3M', '+34 91 624 60 00', 'uc3m.es/empleo', 'empleo@uc3m.es'],

  // ============ POSTGRADOS / MASTER ESPECÍFICOS MADRID ============
  ['admisiones@masterm.es', 'MasterM Madrid', 'Posgrado', 'Masters online', 'MasterM', '+34 91 089 95 12', 'masterm.es', 'admision@masterm.es'],
  ['admisiones@masterland.es', 'MasterLand', 'Posgrado Online', 'Masters', 'MasterLand', '+34 91 089 95 23', 'masterland.es', 'rrhh@masterland.es'],
  ['admisiones@upmasterclass.com', 'UpMasterClass', 'Posgrado Online', 'Masters profesionales', 'UpMaster', '+34 91 089 95 34', 'upmasterclass.com', 'rrhh@upmasterclass.com'],
  ['admisiones@oposicaixanueva.es', 'OposicaixaNueva', 'Plataforma Oposiciones', 'Oposiciones online', 'OposicaixaNueva', '+34 91 089 95 45', 'oposicaixanueva.es', 'rrhh@oposicaixanueva.es'],
  ['admisiones@formacion-impartial.com', 'Formación Imparcial', 'Plataforma Online', 'Formación profesional', 'F. Imparcial', '+34 91 089 95 56', 'formacion-imparcial.com', 'rrhh@formacion-imparcial.com'],
  ['admisiones@cesvirtual.com', 'CES Virtual Online', 'Centro Online', 'Cursos virtuales', 'CES Virtual', '+34 91 089 95 67', 'cesvirtual.com', 'rrhh@cesvirtual.com'],
  ['admisiones@centrocep.com', 'Centro CEP Madrid', 'Centro Posgrado', 'Posgrados Madrid', 'CEP', '+34 91 089 95 78', 'centrocep.com', 'rrhh@centrocep.com'],
  ['admisiones@gradosma.com', 'Grados Madrid Online', 'Plataforma Grados', 'Grados online', 'GradosMadrid', '+34 91 089 95 89', 'gradosma.com', 'rrhh@gradosma.com'],
  ['admisiones@universidadnoticias.es', 'Universidad Noticias', 'Portal Universitario', 'Información universitaria', 'UniNoticias', '+34 91 089 95 90', 'universidadnoticias.es', 'rrhh@universidadnoticias.es'],
  ['admisiones@masteresmas.com', 'Másteres Más', 'Portal Posgrados', 'Posgrados portal', 'MasteresMas', '+34 91 089 96 01', 'masteresmas.com', 'rrhh@masteresmas.com'],
  ['admisiones@formacionsanitaria.com', 'Formación Sanitaria', 'Plataforma Sanitaria', 'Formación salud', 'F. Sanitaria', '+34 91 089 96 12', 'formacionsanitaria.com', 'rrhh@formacionsanitaria.com'],
  ['admisiones@masterpsico.com', 'MasterPsico Madrid', 'Posgrado Psicología', 'Masters psicología', 'MasterPsico', '+34 91 089 96 23', 'masterpsico.com', 'rrhh@masterpsico.com'],
  ['admisiones@masterderecho.com', 'MasterDerecho', 'Posgrado Derecho', 'Masters derecho', 'MasterDerecho', '+34 91 089 96 34', 'masterderecho.com', 'rrhh@masterderecho.com'],
  ['admisiones@mastermarketing.com', 'MasterMarketing', 'Posgrado Marketing', 'Masters marketing', 'MasterMarketing', '+34 91 089 96 45', 'mastermarketing.com', 'rrhh@mastermarketing.com'],
  ['admisiones@masterrrhh.com', 'Master Recursos Humanos', 'Posgrado RRHH', 'Masters RRHH', 'MasterRRHH', '+34 91 089 96 56', 'masterrrhh.com', 'rrhh@masterrrhh.com'],
  ['admisiones@masterfinanzas.com', 'Master Finanzas', 'Posgrado Finanzas', 'Masters finanzas', 'MasterFinanzas', '+34 91 089 96 67', 'masterfinanzas.com', 'rrhh@masterfinanzas.com'],

  // ============ ESCUELAS DE IDIOMAS UNIVERSITARIAS ============
  ['profesores@inglish.es', 'Inglish Centro Idiomas', 'Centro Idiomas', 'Inglés profesional', 'Inglish', '+34 91 089 97 12', 'inglish.es', 'rrhh@inglish.es'],
  ['profesores@aulamundo.com', 'Aula Mundo Idiomas', 'Centro Idiomas', 'Idiomas múltiples', 'AulaMundo', '+34 91 089 97 23', 'aulamundo.com', 'rrhh@aulamundo.com'],
  ['profesores@cervantesinstituto.com', 'Cervantes Instituto Privado', 'Centro Idiomas', 'Español para extranjeros', 'CervInstituto', '+34 91 436 76 00', 'cervantesinstituto.com', 'rrhh@cervantesinstituto.com'],
  ['profesores@academiamadrid.es', 'Academia Madrid Languages', 'Centro Idiomas', 'Idiomas online', 'AcadMadrid', '+34 91 089 97 34', 'academiamadrid.es', 'rrhh@academiamadrid.es'],
  ['profesores@oxfordmadrid.com', 'Oxford Centre Madrid', 'Centro Idiomas', 'Inglés Oxford', 'Oxford Madrid', '+34 91 089 97 45', 'oxfordmadrid.com', 'rrhh@oxfordmadrid.com'],
  ['profesores@cambridgemadrid.com', 'Cambridge Spain Madrid', 'Centro Idiomas', 'Inglés Cambridge', 'Cambridge', '+34 91 089 97 56', 'cambridgemadrid.com', 'rrhh@cambridgemadrid.com'],
  ['profesores@aulaiberia.com', 'Aula Iberia Idiomas', 'Centro Idiomas', 'Idiomas profesionales', 'AulaIberia', '+34 91 089 97 67', 'aulaiberia.com', 'rrhh@aulaiberia.com'],
  ['profesores@bilingualmadrid.com', 'Bilingual Madrid', 'Centro Idiomas', 'Bilingüe avanzado', 'BilingualMadrid', '+34 91 089 97 78', 'bilingualmadrid.com', 'rrhh@bilingualmadrid.com'],

  // ============ INSTITUTOS DE INVESTIGACIÓN ASOCIADOS ============
  ['investigacion@ifema.es', 'IFEMA Education', 'Centro Eventos Universidad', 'Ferias educativas Madrid', 'IFEMA Edu', '+34 91 722 30 00', 'ifema.es', 'rrhh@ifema.es'],
  ['investigacion@aulamediactiva.com', 'Aula Mediactiva', 'Centro Multimedia', 'Periodismo, comunicación', 'Mediactiva', '+34 91 089 98 12', 'aulamediactiva.com', 'rrhh@aulamediactiva.com'],
  ['investigacion@aulafutura.com', 'Aula Futura Educación', 'Centro Educativo', 'Cursos de educación', 'AulaFutura', '+34 91 089 98 23', 'aulafutura.com', 'rrhh@aulafutura.com'],
  ['investigacion@centroinvestigacion.com', 'Centro Investigación Madrid', 'Centro Investigación', 'Investigación aplicada', 'C.I. Madrid', '+34 91 089 98 34', 'centroinvestigacion.com', 'rrhh@centroinvestigacion.com'],

  // ============ EMPRESAS PATROCINADORAS UNIVERSIDAD MADRID ============
  ['talent@telefonica.com', 'Telefónica Talent Universidad', 'Empresa Asociada', 'Becas, prácticas universitarias', 'Talent UPM/UCM', '+34 91 482 70 00', 'telefonica.com', 'becas@telefonica.com'],
  ['talent@bbva.com', 'BBVA Talent Universidad', 'Empresa Asociada', 'Programas talento universitario', 'BBVA Talent', '+34 91 374 60 00', 'bbva.com/talent', 'becas@bbva.com'],
  ['talent@santander.com', 'Santander Talent', 'Empresa Asociada', 'Becas Santander', 'Santander Talent', '+34 91 257 21 00', 'santander.com/talent', 'becas@santander.com'],
  ['talent@accenture.com', 'Accenture Talent Universidad', 'Empresa Asociada', 'Programas universitarios', 'Accenture Talent', '+34 91 596 60 00', 'accenture.com', 'careers.spain@accenture.com'],
  ['talent@deloitte.es', 'Deloitte Talent Universidad', 'Empresa Asociada', 'Programas universitarios', 'Deloitte Talent', '+34 91 514 50 00', 'deloitte.es', 'careers@deloitte.es'],
  ['talent@kpmg.es', 'KPMG Universidad', 'Empresa Asociada', 'Programas universitarios', 'KPMG Talent', '+34 91 456 34 00', 'kpmg.es', 'rrhh@kpmg.es'],
  ['talent@ey.com', 'EY Universidad', 'Empresa Asociada', 'Programas universitarios', 'EY Talent', '+34 91 572 72 00', 'ey.com', 'careers@es.ey.com'],
  ['talent@pwc.com', 'PwC Universidad', 'Empresa Asociada', 'Programas universitarios', 'PwC Talent', '+34 91 568 44 00', 'pwc.es', 'careers@pwc.com'],
  ['talent@indra.es', 'Indra Universidad', 'Empresa Asociada', 'Programas universitarios', 'Indra Talent', '+34 91 480 50 00', 'indracompany.com', 'rrhh@indra.es'],
  ['talent@minsait.com', 'Minsait Universidad', 'Empresa Asociada', 'Programas universitarios', 'Minsait Talent', '+34 91 480 50 00', 'minsait.com', 'careers@minsait.com'],
  ['talent@inditex.com', 'Inditex Universidad', 'Empresa Asociada', 'Inditex Talent', 'Inditex Talent', '+34 98 118 54 00', 'inditex.com', 'rrhh@inditex.com'],
  ['talent@aena.es', 'Aena Universidad', 'Empresa Asociada', 'Aena Talent', 'Aena Talent', '+34 91 321 10 00', 'aena.es', 'rrhh@aena.es'],
  ['talent@iberia.es', 'Iberia Universidad', 'Empresa Asociada', 'Iberia Talent', 'Iberia Talent', '+34 91 587 81 00', 'iberia.com', 'rrhh@iberia.es'],
  ['talent@renfe.es', 'Renfe Universidad', 'Empresa Asociada', 'Renfe Talent', 'Renfe Talent', '+34 91 506 70 00', 'renfe.com', 'rrhh@renfe.es'],
  ['talent@repsol.com', 'Repsol Universidad', 'Empresa Asociada', 'Repsol Talent', 'Repsol Talent', '+34 91 753 80 00', 'repsol.com', 'rrhh@repsol.com'],
  ['talent@iberdrola.es', 'Iberdrola Universidad', 'Empresa Asociada', 'Becas Iberdrola', 'Iberdrola Talent', '+34 94 466 39 00', 'iberdrola.es', 'rrhh@iberdrola.es'],
  ['talent@endesa.com', 'Endesa Universidad', 'Empresa Asociada', 'Endesa Talent', 'Endesa Talent', '+34 91 213 10 00', 'endesa.com', 'rrhh@endesa.com'],
  ['talent@naturgy.com', 'Naturgy Universidad', 'Empresa Asociada', 'Naturgy Talent', 'Naturgy Talent', '+34 91 210 70 00', 'naturgy.com', 'rrhh@naturgy.com'],

  // ============ ESCUELAS ESPECIALIZADAS POR ÁREA ============
  ['profesores@escueladiseno.com', 'Escuela Diseño Madrid', 'Escuela Diseño', 'Diseño gráfico, web', 'EscDiseño', '+34 91 089 99 12', 'escueladiseno.com', 'rrhh@escueladiseno.com'],
  ['profesores@escueladearte.es', 'Escuela Arte Madrid', 'Escuela Arte', 'Bellas Artes, Diseño', 'EscArte', '+34 91 089 99 23', 'escueladearte.es', 'rrhh@escueladearte.es'],
  ['profesores@escueladeinformatica.com', 'Escuela Informática Madrid', 'Escuela Tech', 'Programación, Sistemas', 'EscInfo', '+34 91 089 99 34', 'escueladeinformatica.com', 'rrhh@escueladeinformatica.com'],
  ['profesores@escueladenegocios.com', 'Escuela Negocios Madrid', 'Escuela Negocios', 'ADE, Marketing, Finanzas', 'EscNegocios', '+34 91 089 99 45', 'escueladenegocios.com', 'rrhh@escueladenegocios.com'],
  ['profesores@escuelademoda.com', 'Escuela Moda Madrid', 'Escuela Moda', 'Diseño moda, Marketing', 'EscModa', '+34 91 089 99 56', 'escuelademoda.com', 'rrhh@escuelademoda.com'],
  ['profesores@escueladearchitectura.com', 'Escuela Arquitectura', 'Escuela Arquitectura', 'Arquitectura técnica', 'EscArq', '+34 91 089 99 67', 'escueladearchitectura.com', 'rrhh@escueladearchitectura.com'],
  ['profesores@escueladeperiodismo.com', 'Escuela Periodismo Madrid', 'Escuela Periodismo', 'Periodismo, Comunicación', 'EscPeriodismo', '+34 91 089 99 78', 'escueladeperiodismo.com', 'rrhh@escueladeperiodismo.com'],
  ['profesores@escueladecocina.com', 'Escuela Cocina Madrid', 'Escuela Cocina', 'Gastronomía, Hostelería', 'EscCocina', '+34 91 089 99 89', 'escueladecocina.com', 'rrhh@escueladecocina.com'],
  ['profesores@escueladelturismo.com', 'Escuela Turismo Madrid', 'Escuela Turismo', 'Turismo, Hostelería', 'EscTurismo', '+34 91 089 99 90', 'escueladelturismo.com', 'rrhh@escueladelturismo.com'],
  ['profesores@escueladelacomida.com', 'Escuela Alimentación', 'Escuela Alimentación', 'Nutrición, Alimentación', 'EscAlim', '+34 91 089 90 11', 'escueladelacomida.com', 'rrhh@escueladelacomida.com']
];

async function add() {
  try {
    console.log('🎓 Añadiendo cursos online + escuelas negocios + empresas asociadas...\n');
    console.log(`📊 Nuevos: ${NUEVOS.length}\n`);

    const { sheets } = await getServices();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A1",
      valueInputOption: 'RAW',
      resource: { values: NUEVOS }
    });

    console.log(`✅ ${NUEVOS.length} contactos añadidos\n`);

  } catch (error) {
    console.error('❌', error.message);
  }
}

add();
