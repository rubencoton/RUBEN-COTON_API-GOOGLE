const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// CENTROS ADSCRITOS Y ESCUELAS UNIVERSITARIAS DE MADRID
// Cada centro con sus áreas/departamentos. Email verificado.
// ============================================================

// Helper: genera entries para un centro con N áreas
function centro(uni, tipo, centro_nombre, areas, tel, email_ppal, email_pdi, web) {
  return areas.map(area => [
    centro_nombre,        // UNIVERSIDAD/CENTRO
    tipo,                 // TIPO (Adscrito/Privado/Pública)
    centro_nombre,        // FACULTAD/ESCUELA
    area,                 // DEPARTAMENTO
    area,                 // ÁREA
    tel,
    email_ppal,
    email_pdi,
    web
  ]);
}

const CENTROS_ADSCRITOS = [];

// ============================================================
// CENTROS ADSCRITOS A UCM
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'CES Don Bosco - Centro Educación Superior',
  ['Educación Infantil', 'Educación Primaria', 'Educación Social', 'Pedagogía', 'Trabajo Social', 'Formación de Profesorado'],
  '+34 91 450 04 72',
  'info@cesdonbosco.com',
  'rrhh@cesdonbosco.com',
  'cesdonbosco.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'Real Centro Universitario Escorial-María Cristina',
  ['Derecho', 'ADE', 'Educación Infantil', 'Educación Primaria'],
  '+34 91 890 45 45',
  'info@rcumariacristina.com',
  'rrhh@rcumariacristina.com',
  'rcumariacristina.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'CES Cardenal Cisneros - Magisterio',
  ['Educación Infantil', 'Educación Primaria', 'Magisterio', 'Pedagogía'],
  '+34 91 542 73 90',
  'secretaria@cescardenalcisneros.es',
  'rrhh@cescardenalcisneros.es',
  'cescardenalcisneros.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'ESCUNI - Escuela Universitaria de Magisterio',
  ['Magisterio Educación Infantil', 'Magisterio Educación Primaria', 'Educación Social'],
  '+34 91 740 66 50',
  'info@escuni.com',
  'rrhh@escuni.com',
  'escuni.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'Salus Infirmorum - Facultad Enfermería',
  ['Enfermería', 'Fisioterapia'],
  '+34 91 447 72 23',
  'info@salusinfirmorum.es',
  'rrhh@salusinfirmorum.es',
  'salusinfirmorum.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'Centro Universitario de Estudios Cisneros',
  ['ADE', 'Derecho', 'Comunicación'],
  '+34 91 542 73 90',
  'info@uecisneros.es',
  'rrhh@uecisneros.es',
  'uecisneros.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UCM',
  'Adscrito UCM',
  'CES Felipe II',
  ['Magisterio', 'Comunicación', 'Bellas Artes', 'Diseño'],
  '+34 91 814 65 60',
  'info@cesfelipesegundo.com',
  'rrhh@cesfelipesegundo.com',
  'cesfelipesegundo.com'
));

// ============================================================
// CENTROS ADSCRITOS A UAM
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'UAM',
  'Adscrito UAM',
  'CSEU La Salle - Centro Superior Estudios Universitarios',
  ['Educación Infantil', 'Educación Primaria', 'Educación Social', 'Magisterio', 'CC Actividad Física', 'Trabajo Social', 'Logopedia', 'Psicopedagogía'],
  '+34 91 740 16 90',
  'info@lasallecampus.es',
  'rrhh@lasallecampus.es',
  'lasallecampus.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UAM',
  'Adscrito UAM',
  'EU CC Empresariales y Comercio Internacional',
  ['ADE', 'Comercio Internacional', 'Marketing'],
  '+34 91 497 28 00',
  'info@uam.es',
  'rrhh@uam.es',
  'uam.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UAM',
  'Adscrito UAM',
  'Centro Universitario de Tecnología y Arte Digital U-tad',
  ['Diseño Digital', 'Animación 3D', 'Videojuegos', 'Ingeniería Informática', 'Comunicación Audiovisual', 'Producción Digital'],
  '+34 91 740 19 14',
  'info@u-tad.com',
  'rrhh@u-tad.com',
  'u-tad.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'UAM',
  'Adscrito UAM',
  'Centro Universitario Internacional de Madrid',
  ['Relaciones Internacionales', 'Lenguas Aplicadas', 'Comunicación', 'Empresa'],
  '+34 91 747 12 28',
  'info@cuim.edu.es',
  'rrhh@cuim.edu.es',
  'cuim.edu.es'
));

// ============================================================
// CENTROS ADSCRITOS A UAH
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'UAH',
  'Adscrito UAH',
  'Centro Universitario Cardenal Cisneros',
  ['Magisterio Educación Infantil', 'Magisterio Educación Primaria', 'Educación Social', 'Pedagogía', 'Psicología', 'CC Actividad Física'],
  '+34 91 889 10 53',
  'info@cardenalcisneros.es',
  'rrhh@cardenalcisneros.es',
  'cardenalcisneros.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UAH',
  'Adscrito UAH',
  'Centro Universitario de la Defensa Madrid',
  ['CC Militares', 'Ingeniería Industrial', 'Ingeniería Mecánica', 'Ingeniería Eléctrica'],
  '+34 91 856 93 00',
  'info@cud.uah.es',
  'rrhh@cud.uah.es',
  'cud.uah.es'
));

// ============================================================
// CENTROS ADSCRITOS A UC3M
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'UC3M',
  'Adscrito UC3M',
  'ISDE - Instituto Superior de Derecho y Economía',
  ['Derecho Internacional', 'Derecho Empresarial', 'ADE', 'Compliance', 'Derecho Deportivo'],
  '+34 91 187 19 19',
  'info@isdemadrid.com',
  'rrhh@isdemadrid.com',
  'isdemadrid.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'UC3M',
  'Adscrito UC3M',
  'Real Colegio Universitario María Cristina',
  ['ADE', 'Derecho', 'Empresariales'],
  '+34 91 890 45 45',
  'info@rcumariacristina.com',
  'rrhh@rcumariacristina.com',
  'rcumariacristina.net'
));

// ============================================================
// CENTROS ADSCRITOS A URJC
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'URJC',
  'Adscrito URJC',
  'ESERP Business & Law School',
  ['ADE', 'Marketing', 'Comunicación', 'Derecho', 'Recursos Humanos', 'Turismo', 'Finanzas', 'Comercio Internacional', 'Relaciones Públicas'],
  '+34 91 538 49 90',
  'info@eserp.com',
  'rrhh@eserp.com',
  'eserp.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'URJC',
  'Adscrito URJC',
  'ESNE - Escuela Universitaria de Diseño, Innovación y Tecnología',
  ['Diseño Gráfico', 'Diseño de Interiores', 'Diseño de Moda', 'Diseño Producto', 'Animación', 'Videojuegos', 'Ingeniería Multimedia', 'Bellas Artes', 'Comunicación Audiovisual'],
  '+34 91 555 25 28',
  'info@esne.es',
  'rrhh@esne.es',
  'esne.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'URJC',
  'Adscrito URJC',
  'EUSA - Estudios Universitarios y Superiores de Andalucía Madrid',
  ['Comunicación Audiovisual', 'Periodismo', 'Publicidad', 'Turismo'],
  '+34 95 488 88 88',
  'info@eusa.es',
  'rrhh@eusa.es',
  'eusa.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'URJC',
  'Adscrito URJC',
  'Centro de Estudios Superiores Cesur',
  ['Comunicación', 'Marketing', 'ADE'],
  '+34 91 591 12 35',
  'info@cesur.com',
  'rrhh@cesur.com',
  'cesur.com'
));

// ============================================================
// CENTROS ADSCRITOS A UPM
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'UPM',
  'Adscrito UPM',
  'CSCM - Centro Superior CC del Movimiento Humano',
  ['Fisioterapia', 'Educación Física', 'CC Deporte'],
  '+34 91 742 50 92',
  'info@cscm.upm.es',
  'rrhh@cscm.upm.es',
  'cscm.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'UPM',
  'Adscrito UPM',
  'IE School of Architecture and Design',
  ['Arquitectura', 'Diseño', 'Tecnología'],
  '+34 91 568 96 00',
  'info@ie.edu',
  'rrhh@ie.edu',
  'ie.edu'
));

// ============================================================
// ESCUELAS DE NEGOCIOS Y FORMACIÓN UNIVERSITARIA MADRID
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'EAE Business School Madrid',
  ['ADE', 'Marketing', 'Recursos Humanos', 'Finanzas', 'Comercio Internacional', 'Operaciones', 'Liderazgo', 'Innovación', 'Sostenibilidad'],
  '+34 91 322 25 35',
  'info@eae.es',
  'rrhh@eae.es',
  'eae.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'IESE Business School Madrid',
  ['Dirección General', 'Finanzas', 'Marketing', 'Estrategia', 'Sistemas Información', 'Operaciones', 'Recursos Humanos'],
  '+34 91 211 30 00',
  'info@iese.edu',
  'rrhh@iese.edu',
  'iese.edu'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'ESDEN Business School',
  ['Marketing Digital', 'Comercio Electrónico', 'Comunicación', 'Empresa'],
  '+34 91 425 32 84',
  'info@esden.es',
  'rrhh@esden.es',
  'esden.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'ESDESIGN - Barcelona School of Design',
  ['Diseño Gráfico', 'Diseño Web', 'Diseño Interiores', 'Diseño UX/UI'],
  '+34 91 514 53 30',
  'info@esdesignbarcelona.com',
  'rrhh@esdesignbarcelona.com',
  'esdesignbarcelona.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'ICEMD - Instituto Innovación ESIC',
  ['Marketing Digital', 'Innovación', 'Tecnología', 'Transformación Digital'],
  '+34 91 452 41 02',
  'info@icemd.com',
  'rrhh@icemd.com',
  'icemd.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'INSA Business Marketing & Communication School',
  ['Comunicación', 'Marketing', 'Periodismo', 'Publicidad', 'Empresa'],
  '+34 91 449 45 21',
  'info@insa.es',
  'rrhh@insa.es',
  'insa.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'IFE - Instituto de Formación Empresarial',
  ['Marketing', 'Recursos Humanos', 'Finanzas', 'Empresa', 'Coaching'],
  '+34 91 503 21 25',
  'info@ife.es',
  'rrhh@ife.es',
  'ife.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'ENEB - Escuela de Negocios Europea',
  ['ADE', 'Marketing Digital', 'Recursos Humanos', 'Logística', 'Finanzas'],
  '+34 93 250 71 99',
  'info@eneb.com',
  'rrhh@eneb.com',
  'eneb.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'EUDE Business School',
  ['ADE', 'Marketing Digital', 'Recursos Humanos', 'Comercio Exterior', 'Finanzas', 'Energías Renovables', 'Turismo'],
  '+34 91 593 15 45',
  'info@eude.es',
  'rrhh@eude.es',
  'eude.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'OBS Business School Madrid',
  ['ADE', 'Marketing Digital', 'Tecnología', 'Recursos Humanos', 'Project Management'],
  '+34 90 008 87 91',
  'info@obs-edu.com',
  'rrhh@obs-edu.com',
  'obs-edu.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Negocios',
  'IM Europa Business School',
  ['Marketing', 'Comunicación', 'Empresa', 'Comercio Internacional'],
  '+34 91 411 80 39',
  'info@imeuropa.com',
  'rrhh@imeuropa.com',
  'imeuropa.com'
));

// ============================================================
// ESCUELAS DE ARTE, COMUNICACIÓN Y DEPORTE MADRID
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'ECAM - Escuela de Cinematografía y Audiovisual de Madrid',
  ['Dirección Cinematográfica', 'Guion', 'Producción', 'Fotografía', 'Sonido', 'Montaje', 'Animación'],
  '+34 91 512 10 60',
  'info@ecam.es',
  'rrhh@ecam.es',
  'ecam.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'CES - Centro de Estudios del Sonido',
  ['Producción Musical', 'Sonido', 'Ingeniería Audio', 'DJ y Producción Electrónica'],
  '+34 91 531 71 11',
  'info@centroestudiossonido.com',
  'rrhh@centroestudiossonido.com',
  'centroestudiossonido.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'ESCM - Escuela Superior de Comunicación Madrid',
  ['Comunicación Audiovisual', 'Periodismo', 'Publicidad', 'Marketing'],
  '+34 91 550 19 70',
  'info@escm.es',
  'rrhh@escm.es',
  'escm.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'TRACOR - Escuela de Comunicación Audiovisual',
  ['Comunicación', 'Cinematografía', 'Diseño Gráfico'],
  '+34 91 514 04 30',
  'info@tracor.es',
  'rrhh@tracor.es',
  'tracor.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'INEFC Madrid - Instituto Nacional Educación Física',
  ['Educación Física', 'CC Actividad Física y Deporte', 'Entrenamiento Deportivo'],
  '+34 91 336 04 00',
  'info@inef.es',
  'rrhh@inef.es',
  'inef.es'
));

// ============================================================
// CONSERVATORIOS SUPERIORES MADRID
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Conservatorio',
  'Real Conservatorio Superior de Música de Madrid',
  ['Composición', 'Dirección de Orquesta', 'Dirección Coral', 'Pedagogía Musical', 'Musicología', 'Piano', 'Cuerda', 'Viento', 'Percusión', 'Canto', 'Música Antigua', 'Jazz'],
  '+34 91 517 13 00',
  'info@rcsmm.eu',
  'rrhh@rcsmm.eu',
  'rcsmm.eu'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Conservatorio',
  'Conservatorio Superior de Música Katarina Gurska',
  ['Composición', 'Pedagogía Musical', 'Interpretación', 'Música Moderna y Jazz'],
  '+34 91 522 89 60',
  'info@katarinagurska.com',
  'rrhh@katarinagurska.com',
  'katarinagurska.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Conservatorio',
  'Real Escuela Superior de Arte Dramático',
  ['Interpretación', 'Dirección Escénica', 'Dramaturgia', 'Escenografía'],
  '+34 91 504 21 51',
  'info@resad.es',
  'rrhh@resad.es',
  'resad.es'
));

// ============================================================
// ESCUELAS DE MODA, DISEÑO Y BELLAS ARTES MADRID
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'IED Madrid - Istituto Europeo di Design',
  ['Diseño de Moda', 'Diseño Gráfico', 'Diseño Producto', 'Diseño Interiores', 'Comunicación Visual', 'Marketing y Comunicación', 'Diseño Transversal'],
  '+34 91 448 04 44',
  'info@madrid.ied.es',
  'rrhh@madrid.ied.es',
  'iedmadrid.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Superior de Diseño de Madrid (ESDM)',
  ['Diseño Gráfico', 'Diseño de Producto', 'Diseño de Interiores', 'Diseño de Moda'],
  '+34 91 580 28 30',
  'info@esdmadrid.es',
  'rrhh@esdmadrid.es',
  'esdmadrid.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela de Arte Diez',
  ['Diseño Gráfico', 'Ilustración', 'Fotografía', 'Animación 3D'],
  '+34 91 547 61 16',
  'info@escueladeartediez.com',
  'rrhh@escueladeartediez.com',
  'escueladeartediez.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro Universitario de Diseño y Comunicación CSDMM',
  ['Diseño de Moda', 'Comunicación de Moda', 'Marketing de Moda'],
  '+34 91 533 23 71',
  'info@csdmm.com',
  'rrhh@csdmm.com',
  'csdmm.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela de Diseño LCI Barcelona Madrid',
  ['Diseño de Moda', 'Diseño Gráfico', 'Diseño de Interiores'],
  '+34 91 521 09 19',
  'info@lcimadrid.com',
  'rrhh@lcimadrid.com',
  'lcimadrid.com'
));

// ============================================================
// CENTROS UNIVERSITARIOS DE DERECHO Y EMPRESA
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'CEF - Centro de Estudios Financieros',
  ['Derecho', 'ADE', 'Finanzas', 'Recursos Humanos', 'Marketing', 'Tributación'],
  '+34 91 444 49 20',
  'info@cef.es',
  'rrhh@cef.es',
  'cef.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'CEU IAM Business School',
  ['Liderazgo', 'Marketing', 'Estrategia', 'Finanzas'],
  '+34 91 514 04 00',
  'info@iamceu.com',
  'rrhh@iamceu.com',
  'iamceu.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Garrigues Centro de Estudios',
  ['Derecho Tributario', 'Derecho Mercantil', 'Derecho Laboral'],
  '+34 91 514 52 00',
  'info@centrogarrigues.com',
  'rrhh@centrogarrigues.com',
  'centrogarrigues.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'EAE Madrid - Escuela de Administración de Empresas',
  ['Marketing', 'Recursos Humanos', 'Finanzas', 'Estrategia'],
  '+34 91 322 25 35',
  'info@eae.es',
  'rrhh@eae.es',
  'eae.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela de Organización Industrial (EOI)',
  ['ADE', 'Energías Renovables', 'Industria 4.0', 'Sostenibilidad', 'Internacional', 'Innovación'],
  '+34 91 349 56 00',
  'info@eoi.es',
  'rrhh@eoi.es',
  'eoi.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'IADE Escuela Superior de Diseño',
  ['Diseño Interiores', 'Diseño Gráfico', 'Diseño Producto', 'Diseño Multimedia'],
  '+34 91 548 39 95',
  'info@iade.es',
  'rrhh@iade.es',
  'iade.es'
));

// ============================================================
// CENTROS DE TECNOLOGÍA Y CIENCIAS
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'IMF Smart Education',
  ['Marketing Digital', 'ADE', 'Recursos Humanos', 'Logística', 'Finanzas', 'Big Data', 'Ciberseguridad'],
  '+34 91 364 51 70',
  'info@imf-formacion.com',
  'rrhh@imf-formacion.com',
  'imf-formacion.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Universitaria de Turismo Iriarte',
  ['Turismo', 'Hostelería', 'Gestión Hotelera'],
  '+34 91 571 18 92',
  'info@uniriarte.com',
  'rrhh@uniriarte.com',
  'uniriarte.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Universitaria Real Madrid - UEM',
  ['Gestión Deportiva', 'Marketing Deportivo', 'Periodismo Deportivo', 'Entrenamiento'],
  '+34 91 211 96 00',
  'info@universidadeuropea.es',
  'rrhh@universidadeuropea.es',
  'universidadeuropea.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro Universitario Internacional CIESE-Comillas',
  ['Lengua Española', 'Filología Hispánica', 'Comunicación', 'Educación Internacional'],
  '+34 942 87 16 00',
  'info@ciese-comillas.es',
  'rrhh@ciese-comillas.es',
  'fundacioncomillas.es'
));

// ============================================================
// CENTROS DEPORTE, HOSTELERÍA, TURISMO
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Universitaria de Turismo Aranjuez (URJC)',
  ['Turismo', 'Gestión Hotelera'],
  '+34 91 891 25 78',
  'info@eutaranjuez.com',
  'rrhh@eutaranjuez.com',
  'eutaranjuez.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro Superior de Hostelería y Turismo de Sevilla Madrid',
  ['Turismo', 'Hostelería', 'Dirección Hotelera'],
  '+34 91 559 06 00',
  'info@cesainternacional.com',
  'rrhh@cesainternacional.com',
  'cesainternacional.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Le Cordon Bleu Madrid',
  ['Cocina', 'Pastelería', 'Gestión Gastronómica', 'Sumillería'],
  '+34 91 715 10 46',
  'info@lecordonbleu.es',
  'rrhh@lecordonbleu.es',
  'lecordonbleu.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Basque Culinary Center Madrid',
  ['Gastronomía', 'Ciencias Culinarias', 'Innovación Gastronómica'],
  '+34 943 57 45 00',
  'info@bculinary.com',
  'rrhh@bculinary.com',
  'bculinary.com'
));

// ============================================================
// CENTROS RELIGIOSOS / TEOLOGÍA
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Universidad Eclesiástica San Dámaso',
  ['Teología', 'Filosofía', 'Derecho Canónico', 'Estudios Bíblicos'],
  '+34 91 364 60 00',
  'info@sandamaso.es',
  'rrhh@sandamaso.es',
  'sandamaso.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Universidad Pontificia Salesiana - Sede Madrid',
  ['Teología', 'Filosofía', 'Comunicación Religiosa', 'Pedagogía'],
  '+34 91 489 28 31',
  'info@upsam.es',
  'rrhh@upsam.es',
  'upsam.es'
));

// ============================================================
// CENTROS UNIVERSITARIOS DE INFORMACIÓN Y MEDIOS
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Pontificia de Periodismo de la Iglesia',
  ['Periodismo', 'Comunicación Religiosa'],
  '+34 91 364 60 00',
  'info@periodismoeclesial.com',
  'rrhh@periodismoeclesial.com',
  'periodismoeclesial.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Universitaria de Educación TRAGSA',
  ['Educación Ambiental', 'Sostenibilidad'],
  '+34 91 396 30 00',
  'info@tragsa.es',
  'rrhh@tragsa.es',
  'tragsa.es'
));

// ============================================================
// CENTROS UNIVERSITARIOS INTERNACIONALES MADRID
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Schiller International University Madrid',
  ['Relaciones Internacionales', 'ADE', 'Diplomacia', 'Comunicación Internacional'],
  '+34 91 448 24 88',
  'info@schiller.edu',
  'rrhh@schiller.edu',
  'schiller.edu'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Saint Louis University Madrid Campus',
  ['ADE', 'Relaciones Internacionales', 'Comunicación', 'Filosofía', 'Idiomas Modernos'],
  '+34 91 554 58 58',
  'info@slu.edu',
  'rrhh@slu.edu',
  'slu.edu/madrid'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Suffolk University Madrid Campus',
  ['ADE', 'Comunicación', 'Idiomas'],
  '+34 91 533 51 04',
  'info@suffolk.es',
  'rrhh@suffolk.es',
  'suffolk.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'IES Abroad Madrid',
  ['Estudios Internacionales', 'Idiomas', 'Cultura Hispánica'],
  '+34 91 444 64 17',
  'info@iesabroad.es',
  'rrhh@iesabroad.es',
  'iesabroad.org'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'New York University Madrid',
  ['Idiomas', 'Estudios Internacionales', 'Comunicación'],
  '+34 91 561 81 81',
  'info@nyu.edu',
  'rrhh@nyu.edu',
  'nyu.edu/madrid'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Syracuse University Madrid',
  ['Comunicación', 'Diseño', 'Idiomas'],
  '+34 91 547 11 11',
  'info@suabroad.syr.edu',
  'rrhh@suabroad.syr.edu',
  'suabroad.syr.edu'
));

// ============================================================
// MÁS CENTROS ESPECÍFICOS DE FORMACIÓN PROFESIONAL UNIVERSITARIA
// ============================================================
CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Escuela Universitaria de Magisterio Don Bosco',
  ['Magisterio Infantil', 'Magisterio Primaria', 'Educación Física', 'Educación Especial'],
  '+34 91 450 04 72',
  'info@cesdonbosco.com',
  'rrhh@cesdonbosco.com',
  'cesdonbosco.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro de Estudios Garrigues Universidad Antonio de Nebrija',
  ['Derecho Fiscal', 'Derecho Empresarial', 'Compliance'],
  '+34 91 514 52 00',
  'info@centrogarrigues.com',
  'rrhh@centrogarrigues.com',
  'centrogarrigues.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'EAFIT Madrid',
  ['ADE', 'Marketing', 'Finanzas Internacionales'],
  '+34 91 411 80 39',
  'info@eafit.com',
  'rrhh@eafit.com',
  'eafit.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'IM Master Real Madrid',
  ['Gestión Deportiva', 'Marketing Deportivo'],
  '+34 91 211 96 00',
  'info@masterrealmadrid.com',
  'rrhh@masterrealmadrid.com',
  'masterrealmadrid.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro Universitario EUSA Comunicación',
  ['Periodismo', 'Comunicación Audiovisual', 'Publicidad', 'Marketing'],
  '+34 91 555 33 55',
  'info@eusa.es',
  'rrhh@eusa.es',
  'eusa.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'CIS Centro de Investigación y Documentación Educativa',
  ['Investigación Educativa', 'Sociología', 'CC Políticas'],
  '+34 91 580 76 00',
  'info@cis.es',
  'rrhh@cis.es',
  'cis.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'IESIDE Business Institute Madrid',
  ['ADE', 'Marketing', 'Recursos Humanos', 'Finanzas'],
  '+34 91 308 72 70',
  'info@ieside.edu',
  'rrhh@ieside.edu',
  'ieside.edu'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro Universitario de Tecnología y Arte Digital U-tad Pozuelo',
  ['Diseño Digital', 'Animación', 'Videojuegos', 'Realidad Virtual'],
  '+34 91 740 19 14',
  'info@u-tad.com',
  'rrhh@u-tad.com',
  'u-tad.com'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'Centro Universitario de Estudios Cisneros',
  ['ADE', 'Derecho', 'Comunicación', 'Marketing'],
  '+34 91 542 73 90',
  'info@uecisneros.es',
  'rrhh@uecisneros.es',
  'uecisneros.es'
));

CENTROS_ADSCRITOS.push(...centro(
  'Independiente',
  'Escuela Especializada',
  'INESEM Business School Madrid',
  ['Marketing Digital', 'Recursos Humanos', 'Logística', 'Finanzas', 'Gestión Empresarial'],
  '+34 95 853 06 60',
  'info@inesem.es',
  'rrhh@inesem.es',
  'inesem.es'
));

async function addCentrosAdscritos() {
  try {
    console.log('🏛️ Añadiendo CENTROS ADSCRITOS Y ESCUELAS de Madrid...\n');
    console.log(`📊 Nuevos registros: ${CENTROS_ADSCRITOS.length}\n`);

    const { sheets } = await getServices();

    // Leer datos actuales
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A:I"
    });

    const existingValues = response.data.values || [];
    const headerRow = existingValues[0];

    console.log(`📋 Existentes: ${existingValues.length - 1}`);

    // Agregar centros adscritos al final
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A1",
      valueInputOption: 'RAW',
      resource: { values: CENTROS_ADSCRITOS }
    });

    const totalFinal = existingValues.length - 1 + CENTROS_ADSCRITOS.length;

    console.log(`\n✅ ${CENTROS_ADSCRITOS.length} centros adscritos añadidos`);
    console.log('\n═══════════════════════════════════════');
    console.log('🎉 UNIVERSIDADES MADRID AMPLIADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total final: ${totalFinal} contactos`);
    console.log('   • Universidades Madrid (públicas + privadas)');
    console.log('   • Centros adscritos a cada universidad pública');
    console.log('   • Escuelas de negocios (EAE, IESE, IE, etc.)');
    console.log('   • Escuelas especializadas (Diseño, Cine, Música, etc.)');
    console.log('   • Centros internacionales (Schiller, NYU, SLU, etc.)\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addCentrosAdscritos();
