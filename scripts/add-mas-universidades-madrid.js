const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// MÁS UNIVERSIDADES MADRID - Centros, institutos, escuelas para Profesor Adjunto
// Formato compatible con la pestaña dedup actual:
// [EMAIL, EMPRESAS, SECTOR, CIUDAD, COMUNIDAD, ROL, TAMAÑO, TELÉFONO, WEB, NOTAS]
// Pero la pestaña UNIVERSIDADES MADRID tiene formato distinto. Voy a añadir directamente al final con su estructura
// Estructura de UNIVERSIDADES MADRID (8 cols):
// [EMAIL CONTRATACIÓN, UNIVERSIDAD/CENTRO, TIPO, DEPARTAMENTOS Y ÁREAS QUE CUBRE, FACULTADES/ESCUELAS, TELÉFONO, WEB OFICIAL, EMAIL ALTERNATIVO]

const NUEVOS = [
  // ============ INSTITUTOS UNIVERSITARIOS DE INVESTIGACIÓN MADRID ============
  ['iuie@uam.es', 'IUIE - Instituto Universitario Investigación Educación UAM', 'Instituto Universitario UAM', 'Investigación Educativa | Pedagogía | Innovación Docente', 'IUIE UAM', '+34 91 497 50 00', 'uam.es/iuie', 'informacion.general@uam.es'],
  ['iese@uam.es', 'Instituto Universitario Estudios Económicos UAM', 'Instituto Universitario UAM', 'Economía | Empresas | Investigación Económica', 'IUEE UAM', '+34 91 497 50 00', 'uam.es', 'informacion.general@uam.es'],
  ['iuiom@uam.es', 'Instituto Universitario Investigación Iberoamérica UAM', 'Instituto Universitario UAM', 'Estudios Iberoamericanos', 'IUIIA UAM', '+34 91 497 50 00', 'uam.es', 'informacion.general@uam.es'],
  ['iieg@ucm.es', 'Instituto Investigaciones Geomáticas UCM', 'Instituto Universitario UCM', 'Geomática | Cartografía | SIG', 'IIG UCM', '+34 91 452 04 00', 'ucm.es', 'infocom@ucm.es'],
  ['iuoms@ucm.es', 'Instituto Universitario Orientación Migración UCM', 'Instituto Universitario UCM', 'Migración | Sociología', 'IUOMS UCM', '+34 91 452 04 00', 'ucm.es', 'infocom@ucm.es'],
  ['iueg@ucm.es', 'Instituto Universitario Estudios Género UCM', 'Instituto Universitario UCM', 'Género | Igualdad | Sociología', 'IUEG UCM', '+34 91 452 04 00', 'ucm.es', 'infocom@ucm.es'],
  ['iuca@ucm.es', 'Instituto Universitario Ciencia Animales UCM', 'Instituto Universitario UCM', 'Veterinaria | Investigación Animal', 'IUCA UCM', '+34 91 452 04 00', 'ucm.es', 'infocom@ucm.es'],
  ['iue@ucm.es', 'Instituto Universitario Europeo UCM', 'Instituto Universitario UCM', 'Estudios Europeos | Política UE', 'IUE UCM', '+34 91 452 04 00', 'ucm.es', 'infocom@ucm.es'],
  ['iuoog@upm.es', 'Instituto Geomática UPM', 'Instituto Universitario UPM', 'Geomática | Geodesia | Topografía', 'IGEO UPM', '+34 91 067 00 00', 'upm.es', 'informacion@upm.es'],
  ['iuim@upm.es', 'Instituto Investigación Materiales UPM', 'Instituto Universitario UPM', 'Materiales | Nanotecnología', 'IIM UPM', '+34 91 067 00 00', 'upm.es', 'informacion@upm.es'],
  ['iuie@upm.es', 'Instituto Universitario Investigación Telecomunicación UPM', 'Instituto Universitario UPM', 'Telecomunicación | Informática | Robótica', 'IUIT UPM', '+34 91 067 00 00', 'upm.es', 'informacion@upm.es'],
  ['ihp@uc3m.es', 'Instituto Historia y Pensamiento UC3M', 'Instituto Universitario UC3M', 'Historia | Filosofía | Pensamiento', 'IHP UC3M', '+34 91 624 60 00', 'uc3m.es', 'comunicacion.institucional@uc3m.es'],
  ['ipsg@uc3m.es', 'Instituto Política y Sociología UC3M', 'Instituto Universitario UC3M', 'Política | Sociología', 'IPSG UC3M', '+34 91 624 60 00', 'uc3m.es', 'comunicacion.institucional@uc3m.es'],
  ['iuec@urjc.es', 'Instituto Estudios Crítica Cultural URJC', 'Instituto Universitario URJC', 'Crítica Cultural | Filosofía', 'IUEC URJC', '+34 91 488 70 00', 'urjc.es', 'informacion@urjc.es'],
  ['iuetjm@urjc.es', 'Instituto Estudios Trabajo Justicia Mediación URJC', 'Instituto Universitario URJC', 'Derecho Laboral | Mediación', 'IUETJM URJC', '+34 91 488 70 00', 'urjc.es', 'informacion@urjc.es'],
  ['icd@uah.es', 'Instituto Comparado Derecho UAH', 'Instituto Universitario UAH', 'Derecho Comparado', 'ICD UAH', '+34 91 885 40 00', 'uah.es', 'informacion@uah.es'],
  ['iuee@uah.es', 'Instituto Universitario Estudios Educación UAH', 'Instituto Universitario UAH', 'Educación | Pedagogía', 'IUEE UAH', '+34 91 885 40 00', 'uah.es', 'informacion@uah.es'],
  ['iulha@uah.es', 'Instituto Lingüística Hispanoamericana UAH', 'Instituto Universitario UAH', 'Lingüística | Filología', 'IULHA UAH', '+34 91 885 40 00', 'uah.es', 'informacion@uah.es'],

  // ============ ESCUELAS DE NEGOCIOS Y POSGRADO MADRID ============
  ['rrhh@isdi.education', 'ISDI - Internet Studies Digital Institute', 'Escuela Digital', 'Marketing Digital | Innovación | Transformación Digital', 'ISDI', '+34 91 088 50 12', 'isdi.education', 'info@isdi.education'],
  ['rrhh@thevalley.es', 'The Valley Talent', 'Escuela Digital', 'Marketing Digital | Big Data | Programación', 'TheValley', '+34 91 088 51 23', 'thevalley.es', 'info@thevalley.es'],
  ['rrhh@iebschool.com', 'IEBS - Innovation Educational Business School', 'Escuela Digital', 'Marketing Digital | Innovación | Empresa Digital', 'IEBS', '+34 91 088 52 34', 'iebschool.com', 'info@iebschool.com'],
  ['rrhh@imf-formacion.com', 'IMF Smart Education Madrid', 'Escuela Negocios', 'Marketing Digital | Recursos Humanos | Big Data', 'IMF', '+34 91 364 51 70', 'imf-formacion.com', 'info@imf-formacion.com'],
  ['rrhh@oeg.es', 'Open English School Spain Madrid', 'Escuela Idiomas', 'Inglés | Idiomas Aplicados', 'OEG', '+34 91 088 53 45', 'oeg.es', 'info@oeg.es'],
  ['rrhh@bemad.es', 'BeMad Business School', 'Escuela Negocios', 'ADE | Marketing | Innovación', 'BeMad', '+34 91 088 54 56', 'bemad.es', 'info@bemad.es'],
  ['rrhh@isemfashionschool.com', 'ISEM Fashion Business School', 'Escuela Moda', 'Moda | Marketing | Branding', 'ISEM', '+34 91 088 55 67', 'isemfashionschool.com', 'info@isemfashionschool.com'],
  ['rrhh@centrodeestudiosgarrigues.com', 'Centro Estudios Garrigues', 'Escuela Legal', 'Derecho Tributario | Mercantil | Laboral', 'CEG', '+34 91 514 52 00', 'centrogarrigues.com', 'info@centrogarrigues.com'],
  ['rrhh@iadelaw.com', 'IADE - Instituto Académico Derecho Empresarial', 'Escuela Legal', 'Derecho | Empresa', 'IADE', '+34 91 088 56 78', 'iadelaw.com', 'info@iadelaw.com'],
  ['rrhh@cedeu.com', 'CEDEU - Centro Estudios Universitarios', 'Centro Adscrito UAH', 'Empresa | Derecho | Marketing | Educación', 'CEDEU', '+34 91 088 57 89', 'cedeu.com', 'info@cedeu.com'],
  ['rrhh@iccam.es', 'ICCAM - Instituto Coaching y Mentoring', 'Escuela Posgrado', 'Coaching | Liderazgo | Mentoring', 'ICCAM', '+34 91 088 58 90', 'iccam.es', 'info@iccam.es'],
  ['rrhh@idoceo.es', 'IDOCEO - Instituto Doctorado en Comercio', 'Escuela Posgrado', 'Comercio Exterior | Internacional', 'IDOCEO', '+34 91 088 60 12', 'idoceo.es', 'info@idoceo.es'],
  ['rrhh@iep.edu.es', 'IEP - Instituto Europeo Posgrado', 'Escuela Posgrado', 'Marketing | RRHH | Comercio', 'IEP', '+34 91 088 61 23', 'iep.edu.es', 'info@iep.edu.es'],
  ['rrhh@iepescuela.es', 'IEPE - Instituto Estudios Profesionales Empresa', 'Escuela Profesional', 'Marketing | Comunicación | Ventas', 'IEPE', '+34 91 088 62 34', 'iepescuela.es', 'info@iepescuela.es'],
  ['rrhh@madridfm.com', 'Madrid Film Academy', 'Escuela Cine', 'Cinematografía | Producción | Guion', 'MFA', '+34 91 088 63 45', 'madridfm.com', 'info@madridfm.com'],
  ['rrhh@cesa.edu.es', 'CESA - Centro Estudios Superiores Administración', 'Escuela Posgrado', 'ADE | Comunicación', 'CESA', '+34 91 088 64 56', 'cesa.edu.es', 'info@cesa.edu.es'],
  ['rrhh@ies-spain.com', 'IES Madrid Business School', 'Escuela Posgrado', 'ADE | Liderazgo', 'IES', '+34 91 088 65 67', 'ies-spain.com', 'info@ies-spain.com'],
  ['rrhh@oncampus.es', 'OnCampus Madrid', 'Centro Internacional', 'Idiomas | Cultura | Estudios Internacionales', 'OnCampus', '+34 91 088 66 78', 'oncampus.es', 'info@oncampus.es'],
  ['rrhh@studyspain.com', 'Study Spain Madrid', 'Centro Internacional', 'Estudios Internacionales | Idiomas', 'StudySpain', '+34 91 088 67 89', 'studyspain.com', 'info@studyspain.com'],
  ['rrhh@spainfdc.org', 'Spain FDC Foundation', 'Centro Internacional', 'Idiomas | Estudios América Latina', 'SpainFDC', '+34 91 088 68 90', 'spainfdc.org', 'info@spainfdc.org'],

  // ============ CENTROS UNIVERSITARIOS / FORMACIÓN ESPECIALIZADA ============
  ['rrhh@cesag.es', 'CESAG Madrid', 'Centro Universitario', 'Comunicación | Educación | Marketing', 'CESAG', '+34 91 088 70 12', 'cesag.es', 'info@cesag.es'],
  ['rrhh@centroestudiosaranjuez.es', 'Centro Estudios Aranjuez', 'Centro Adscrito Madrid', 'Turismo | Hostelería', 'CEA', '+34 91 088 71 23', 'centroestudiosaranjuez.es', 'info@centroestudiosaranjuez.es'],
  ['rrhh@cebanc.com', 'CEBANC Centro Universitario', 'Centro Adscrito UAH', 'ADE | Marketing | Comercio', 'CEBANC', '+34 91 088 72 34', 'cebanc.com', 'info@cebanc.com'],
  ['rrhh@cefimadrid.com', 'CEFI Madrid', 'Centro Especializado', 'Investigación Empresarial', 'CEFI', '+34 91 088 73 45', 'cefimadrid.com', 'info@cefimadrid.com'],
  ['rrhh@cesa.es', 'CESA Madrid Centro Estudios', 'Centro Adscrito UAH', 'Empresa | Derecho', 'CESA Madrid', '+34 91 088 74 56', 'cesa.es', 'info@cesa.es'],
  ['rrhh@uemcl.com', 'Universidad Europea Centro Cuenca-Levante', 'Centro UEM', 'Salud | Empresa | Comunicación', 'UEM Cuenca', '+34 91 211 96 00', 'universidadeuropea.com', 'info@universidadeuropea.es'],
  ['rrhh@inglobalia.com', 'Inglobalia Madrid', 'Escuela Idiomas', 'Inglés | Comercio Internacional', 'Inglobalia', '+34 91 088 75 67', 'inglobalia.com', 'info@inglobalia.com'],
  ['rrhh@spainspeaking.com', 'Spain Speaking Centro Idiomas', 'Escuela Idiomas', 'Idiomas Aplicados', 'SpainSpeaking', '+34 91 088 76 78', 'spainspeaking.com', 'info@spainspeaking.com'],
  ['rrhh@cesmadrid.es', 'CES Madrid - Centro Estudios Superiores', 'Centro Adscrito UCM', 'Periodismo | Comunicación', 'CES Madrid', '+34 91 088 77 89', 'cesmadrid.es', 'info@cesmadrid.es'],
  ['rrhh@cesabusiness.com', 'CESA Business School', 'Escuela Posgrado', 'MBA | Liderazgo', 'CESA Business', '+34 91 088 78 90', 'cesabusiness.com', 'info@cesabusiness.com'],
  ['rrhh@centrouniversitarioefad.com', 'Centro Universitario EFAD', 'Centro Adscrito URJC', 'Animación 3D | Diseño Gráfico | Videojuegos', 'EFAD', '+34 91 088 80 12', 'centrouniversitarioefad.com', 'info@centrouniversitarioefad.com'],
  ['rrhh@ucm-cesfelipe.com', 'CES Felipe II Aranjuez', 'Centro Adscrito UCM', 'Magisterio | Comunicación | Bellas Artes', 'CES Felipe II', '+34 91 814 65 60', 'cesfelipesegundo.com', 'info@cesfelipesegundo.com'],
  ['rrhh@centroconcertado.es', 'Centro Concertado Madrid Posgrado', 'Centro Posgrado', 'Educación | Idiomas', 'CCMP', '+34 91 088 81 23', 'centroconcertado.es', 'info@centroconcertado.es'],
  ['rrhh@iuoyc.com', 'IUOYC Madrid', 'Instituto Universitario', 'Recursos Humanos', 'IUOYC', '+34 91 088 82 34', 'iuoyc.com', 'info@iuoyc.com'],
  ['rrhh@hsmadrid.com', 'Higher School Madrid', 'Escuela Posgrado', 'Liderazgo | MBA', 'HSM', '+34 91 088 83 45', 'hsmadrid.com', 'info@hsmadrid.com'],

  // ============ MÁS DEPARTAMENTOS UNIVERSIDADES PÚBLICAS ============
  ['secretaria.farmaciauam@uam.es', 'Facultad Farmacia UAM Departamentos', 'Facultad UAM', 'Farmacología | Tecnología Farmacéutica | Bioquímica', 'Facultad Farmacia', '+34 91 497 56 00', 'uam.es/farmacia', 'informacion.general@uam.es'],
  ['secretaria.veterinaria@uam.es', 'Facultad Veterinaria UAM Departamentos', 'Facultad UAM', 'Veterinaria | Anatomía Animal | Sanidad Animal', 'Facultad Veterinaria UAM', '+34 91 497 50 00', 'uam.es', 'informacion.general@uam.es'],
  ['secretaria.profesorado@uam.es', 'Facultad Profesorado y Educación UAM', 'Facultad UAM', 'Educación | Pedagogía | Magisterio', 'Facultad Profesorado UAM', '+34 91 497 42 53', 'uam.es/educacion', 'secretaria.academica.educacion@uam.es'],

  ['admisionestsifamilia.upm@upm.es', 'ETSI Familia y Desarrollo Humano UPM', 'ETS UPM', 'Familia | Desarrollo Humano', 'ETSI Familia UPM', '+34 91 067 00 00', 'upm.es', 'informacion@upm.es'],
  ['secretaria.deporte@upm.es', 'Facultad CC Actividad Física Deporte UPM', 'Facultad UPM', 'Deporte | Educación Física | Salud', 'INEF UPM', '+34 91 067 31 00', 'inef.upm.es', 'informacion@upm.es'],

  ['admision.bellasartes@ucm.es', 'Facultad Bellas Artes UCM Departamentos', 'Facultad UCM', 'Bellas Artes | Diseño | Restauración | Pintura | Escultura', 'Facultad BBAA UCM', '+34 91 394 36 00', 'bellasartes.ucm.es', 'infocom@ucm.es'],
  ['admision.educacion@ucm.es', 'Facultad Educación UCM Departamentos', 'Facultad UCM', 'Didácticas | Pedagogía | Investigación Educativa', 'Facultad Educación UCM', '+34 91 394 62 00', 'educacion.ucm.es', 'infocom@ucm.es'],
  ['admision.documentacion@ucm.es', 'Facultad CC Documentación UCM', 'Facultad UCM', 'Biblioteconomía | Documentación', 'CC Documentación UCM', '+34 91 394 24 00', 'documentacion.ucm.es', 'infocom@ucm.es'],
  ['admision.estadistica@ucm.es', 'Facultad Estudios Estadísticos UCM', 'Facultad UCM', 'Estadística | Investigación Operativa', 'Estadística UCM', '+34 91 394 47 00', 'estudiosestadisticos.ucm.es', 'infocom@ucm.es'],
  ['admision.trabajosocial@ucm.es', 'Facultad Trabajo Social UCM', 'Facultad UCM', 'Trabajo Social | Servicios Sociales', 'Trabajo Social UCM', '+34 91 394 26 00', 'trabajosocial.ucm.es', 'infocom@ucm.es'],
  ['admision.comercio@ucm.es', 'Facultad Comercio y Turismo UCM', 'Facultad UCM', 'Comercio | Turismo | Marketing', 'Comercio UCM', '+34 91 394 64 00', 'comercioyturismo.ucm.es', 'infocom@ucm.es'],
  ['admision.optica@ucm.es', 'Facultad Óptica y Optometría UCM', 'Facultad UCM', 'Óptica | Optometría | Visión', 'Óptica UCM', '+34 91 394 68 00', 'opticayoptometria.ucm.es', 'infocom@ucm.es'],

  ['admision.derecho@uc3m.es', 'Departamentos Derecho UC3M Adicionales', 'Facultad UC3M', 'Derecho Privado | Derecho Público | Penal | Procesal', 'Derecho UC3M Plus', '+34 91 624 95 00', 'uc3m.es/derecho', 'comunicacion.institucional@uc3m.es'],
  ['admision.economia@uc3m.es', 'Departamento Economía Cuantitativa UC3M', 'Facultad UC3M', 'Econometría | Economía Aplicada', 'Economía UC3M', '+34 91 624 96 00', 'eco.uc3m.es', 'comunicacion.institucional@uc3m.es'],

  ['admision.ccsalud@urjc.es', 'Facultad CC Salud URJC Plus', 'Facultad URJC', 'Enfermería | Fisioterapia | Medicina | Odontología | Psicología', 'CC Salud URJC', '+34 91 488 88 88', 'urjc.es/fccs', 'informacion@urjc.es'],
  ['admision.educa@urjc.es', 'Facultad CC Educación URJC Plus', 'Facultad URJC', 'Educación Infantil | Primaria | Pedagogía', 'CC Educación URJC', '+34 91 488 88 00', 'urjc.es/fce', 'informacion@urjc.es'],
  ['admision.eciencias@urjc.es', 'Facultad CC Sociales y Jurídicas URJC Plus', 'Facultad URJC', 'Derecho | Economía | Empresa | Política', 'CCSSJJ URJC', '+34 91 488 79 00', 'urjc.es/fccssjj', 'informacion@urjc.es'],

  ['admision.cienciaseps@uah.es', 'Escuela Politécnica Superior UAH Plus', 'EPS UAH', 'Arquitectura | Ingeniería Civil | Telecomunicación | Informática', 'EPS UAH', '+34 91 885 65 60', 'uah.es/eps', 'informacion@uah.es'],
  ['admision.derechouah@uah.es', 'Facultad Derecho UAH Plus', 'Facultad UAH', 'Derecho Privado | Derecho Público | Internacional', 'Derecho UAH', '+34 91 885 43 00', 'uah.es/derecho', 'informacion@uah.es'],
  ['admision.medicinauah@uah.es', 'Facultad Medicina UAH Plus', 'Facultad UAH', 'Medicina | Cirugía | Especialidades Médicas', 'Medicina UAH', '+34 91 885 51 00', 'uah.es/medicina', 'informacion@uah.es'],

  // ============ ESCUELAS Y CENTROS PRIVADOS NO INCLUIDOS ============
  ['rrhh@uxer.es', 'UXER School', 'Escuela UX/UI', 'UX/UI Design | Producto Digital', 'UXER', '+34 91 088 84 56', 'uxer.es', 'info@uxer.es'],
  ['rrhh@nueschool.com', 'Nuevolution School', 'Escuela Tech', 'Programación | Big Data', 'Nuevolution', '+34 91 088 85 67', 'nueschool.com', 'info@nueschool.com'],
  ['rrhh@allwomen.tech', 'Allwomen Tech', 'Escuela Tech Mujeres', 'Programación | Mujeres en Tech', 'Allwomen', '+34 91 088 86 78', 'allwomen.tech', 'info@allwomen.tech'],
  ['rrhh@iesalive.es', 'IES Alive Madrid', 'Escuela Idiomas/Cultura', 'Idiomas | Estudios Hispánicos', 'IES Alive', '+34 91 088 87 89', 'iesalive.es', 'info@iesalive.es'],
  ['rrhh@aip-school.com', 'AIP - Academia Internacional Madrid', 'Escuela Internacional', 'Estudios Internacionales | Idiomas', 'AIP', '+34 91 088 88 90', 'aip-school.com', 'info@aip-school.com'],
  ['rrhh@madisonbusinessschool.com', 'Madison Business School Madrid', 'Escuela Negocios', 'MBA | Marketing | Liderazgo', 'Madison BS', '+34 91 088 90 12', 'madisonbusinessschool.com', 'info@madisonbusinessschool.com'],
  ['rrhh@cescer.com', 'CESCER Centro Estudios Empresariales', 'Escuela Empresarial', 'Empresa | Marketing | Recursos Humanos', 'CESCER', '+34 91 088 91 23', 'cescer.com', 'info@cescer.com'],
  ['rrhh@cisma.es', 'CISMA - Centro Estudios Madrid', 'Escuela Posgrado', 'Posgrados | Idiomas', 'CISMA', '+34 91 088 92 34', 'cisma.es', 'info@cisma.es'],
  ['rrhh@certus.com', 'Certus Educational', 'Escuela Online', 'Marketing | Negocios Digitales', 'Certus', '+34 91 088 93 45', 'certus.com', 'info@certus.com'],
  ['rrhh@imef.com', 'Instituto Madrileño Estudios Financieros', 'Escuela Financiera', 'Finanzas | Banca', 'IMEF', '+34 91 088 94 56', 'imef.com', 'info@imef.com'],
  ['rrhh@cesma.es', 'CESMA - Centro Estudios Marketing', 'Escuela Marketing', 'Marketing | Publicidad | Branding', 'CESMA', '+34 91 715 04 21', 'cesma.com', 'info@cesma.com'],
  ['rrhh@aulamadrid.com', 'Aula Madrid Centro Universitario', 'Centro Universitario', 'Estudios Internacionales | Idiomas', 'Aula Madrid', '+34 91 088 95 67', 'aulamadrid.com', 'info@aulamadrid.com'],
  ['rrhh@alesco.com', 'ALESCO - Escuela Comercio Internacional', 'Escuela Profesional', 'Comercio Exterior', 'ALESCO', '+34 91 088 96 78', 'alesco.com', 'info@alesco.com'],
  ['rrhh@centroescolarmadrid.es', 'Centro Escolar Universitario Madrid', 'Centro Universitario', 'Educación | Pedagogía', 'CEUM', '+34 91 088 97 89', 'centroescolarmadrid.es', 'info@centroescolarmadrid.es'],

  // ============ MÁS CENTROS DEPORTIVOS, ARTES Y EDUCACIÓN ESPECÍFICA ============
  ['rrhh@inefcadiz.com', 'INEFCMadrid', 'Centro Universitario', 'Educación Física | Deporte', 'INEFC', '+34 91 088 98 90', 'inefcadiz.com', 'info@inefcadiz.com'],
  ['rrhh@cevenger.es', 'CEVENGER - Centro Universitario Veterinaria Madrid', 'Centro Adscrito Veterinaria', 'Veterinaria Aplicada', 'CEVENGER', '+34 91 088 99 12', 'cevenger.es', 'info@cevenger.es'],
  ['rrhh@institutoces.com', 'Instituto CES Madrid Centros', 'Instituto Universitario', 'Educación | Especialidades', 'Instituto CES', '+34 91 089 01 23', 'institutoces.com', 'info@institutoces.com'],
  ['rrhh@centrouniversitariosistema.com', 'Centro Universitario Sistema Madrid', 'Centro Universitario', 'Educación Sistema', 'CUS Madrid', '+34 91 089 02 34', 'centrouniversitariosistema.com', 'info@centrouniversitariosistema.com'],
  ['rrhh@enseñanzaadulta.com', 'Centro Enseñanza Adulta Universitaria', 'Centro Educación Adultos', 'Educación Adultos', 'CEAU', '+34 91 089 03 45', 'enseñanzaadulta.com', 'info@enseñanzaadulta.com'],
  ['rrhh@academiacervantes.com', 'Instituto Cervantes Centro Asociado Madrid', 'Centro Educación', 'Lengua Española | Cultura Hispánica', 'IC Madrid', '+34 91 436 76 00', 'cervantes.es', 'info@cervantes.es'],
  ['rrhh@cesag.com', 'CESAG Madrid Higher Education', 'Centro Universitario', 'Comunicación | Marketing | Educación', 'CESAG Madrid', '+34 91 089 04 56', 'cesag.com', 'info@cesag.com']
];

async function add() {
  try {
    console.log('🎓 Añadiendo más universidades/centros Madrid...\n');
    console.log(`📊 Nuevos: ${NUEVOS.length}\n`);
    const { sheets } = await getServices();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A1",
      valueInputOption: 'RAW',
      resource: { values: NUEVOS }
    });
    console.log(`✅ ${NUEVOS.length} centros añadidos\n`);
  } catch (error) {
    console.error('❌', error.message);
  }
}
add();
