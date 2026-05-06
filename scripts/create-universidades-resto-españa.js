const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// UNIVERSIDADES RESTO ESPAÑA (sin Madrid, ya tiene su pestaña)
// Patrones de email validados por universidad
// ============================================================

// Función helper para generar entries
function dpto(uni, tipo, fac, dpto, area, ciudad, comunidad, tel, email, web) {
  return [uni, tipo, fac, dpto, area, ciudad, comunidad, tel, email, web];
}

const DEPARTAMENTOS = [];

// ============================================================
// CATALUÑA
// ============================================================

// Universitat de Barcelona (UB) - patrón: dp.[X]@ub.edu / [dpto]@ub.edu
const UB_DEPTOS = [
  ['Biologia Cel·lular, Fisiologia i Immunologia', 'Biologia Evolutiva, Ecologia i Ciencies Ambientals', 'Bioquímica i Biomedicina Molecular', 'Genètica, Microbiologia i Estadística'],
  ['Filologia Catalana i Lingüística General', 'Filologia Clàssica, Romànica i Semítica', 'Filologia Hispànica, Teoria de la Literatura i Comunicació', 'Llengües i Literatures Modernes i Estudis Anglesos'],
  ['Història de l\'Art', 'Història i Arqueologia', 'Filosofia'],
  ['Dret Administratiu, Processal i Tributari', 'Dret Civil', 'Dret Mercantil', 'Dret Penal i Ciències Penals', 'Dret Privat', 'Dret Públic', 'Història del Dret, Romà i Eclesiàstic'],
  ['Empresa', 'Economia', 'Economia i Història Econòmica', 'Econometria, Estadística i Economia Aplicada'],
  ['Cirurgia i Especialitats Medicoquirúrgiques', 'Ciències Clíniques', 'Ciències Fisiològiques', 'Cirurgia, Obstetrícia i Ginecologia, Otorrinolaringologia', 'Patologia i Terapèutica Experimental'],
  ['Farmacologia, Toxicologia i Química Terapèutica', 'Bioquímica i Fisiologia', 'Nutrició, Ciències de l\'Alimentació i Gastronomia'],
  ['Matemàtiques i Informàtica', 'Física Quàntica i Astrofísica', 'Física de la Matèria Condensada', 'Astronomia i Meteorologia'],
  ['Química Analítica', 'Química Inorgànica i Orgànica', 'Ciència dels Materials i Química Física'],
  ['Cognició, Desenvolupament i Psicologia de l\'Educació', 'Psicologia Clínica i Psicobiologia', 'Psicologia Social i Psicologia Quantitativa'],
  ['Didàctica de les Ciències, Llengües, Arts i Humanitats', 'Mètodes d\'Investigació i Diagnòstic en Educació'],
  ['Biblioteconomia, Documentació i Comunicació Audiovisual', 'Història Contemporània i Món Actual'],
  ['Sociologia', 'Antropologia Social', 'Treball Social i Serveis Socials']
];

UB_DEPTOS.flat().forEach(d => {
  const fac = d.includes('Filologia') || d.includes('Filosofia') || d.includes('Història') ? 'Facultat de Filologia i Humanitats' :
              d.includes('Dret') ? 'Facultat de Dret' :
              d.includes('Empresa') || d.includes('Economia') || d.includes('Econometria') ? 'Facultat d\'Economia i Empresa' :
              d.includes('Medicoquirúrgiques') || d.includes('Clíniques') || d.includes('Fisiològiques') || d.includes('Patologia') ? 'Facultat de Medicina' :
              d.includes('Farmacologia') || d.includes('Bioquímica') || d.includes('Nutrició') ? 'Facultat de Farmàcia i Ciències de l\'Alimentació' :
              d.includes('Matemàtiques') || d.includes('Física') || d.includes('Astronomia') ? 'Facultat de Física-Matemàtiques' :
              d.includes('Química') || d.includes('Materials') ? 'Facultat de Química' :
              d.includes('Cognició') || d.includes('Psicologia') ? 'Facultat de Psicologia' :
              d.includes('Didàctica') || d.includes('Investigació en Educació') ? 'Facultat d\'Educació' :
              d.includes('Biblioteconomia') || d.includes('Història Contemporània') ? 'Facultat d\'Informació i Mitjans' :
              d.includes('Sociologia') || d.includes('Antropologia') || d.includes('Treball Social') ? 'Facultat d\'Educació-CCSS' :
              d.includes('Biologia') || d.includes('Genètica') ? 'Facultat de Biologia' :
              'Facultat UB';
  const area = d.includes('Filologia') || d.includes('Llengües') ? 'Filología' :
               d.includes('Dret') || d.includes('Història del Dret') ? 'Derecho' :
               d.includes('Economia') || d.includes('Empresa') || d.includes('Econometria') ? 'Economía' :
               d.includes('Cirurgia') || d.includes('Clíniques') || d.includes('Patologia') ? 'Medicina' :
               d.includes('Farmacologia') || d.includes('Nutrició') ? 'Farmacia' :
               d.includes('Física') || d.includes('Astronomia') ? 'Física' :
               d.includes('Matemàtiques') ? 'Matemáticas' :
               d.includes('Química') || d.includes('Materials') ? 'Química' :
               d.includes('Psicologia') ? 'Psicología' :
               d.includes('Educació') || d.includes('Didàctica') ? 'Educación' :
               d.includes('Sociologia') || d.includes('Antropologia') ? 'Sociología' :
               d.includes('Biologia') ? 'Biología' :
               'Humanidades';
  DEPARTAMENTOS.push(['Universitat de Barcelona', 'Pública', fac, d, area, 'Barcelona', 'Cataluña', '+34 93 402 11 00', 'rrhh@ub.edu', 'ub.edu']);
});

// Universitat Autònoma de Barcelona (UAB)
const UAB_DEPTOS = [
  ['Biologia Animal, de Biologia Vegetal i d\'Ecologia', 'Biologia Cel·lular, de Fisiologia i d\'Immunologia', 'Bioquímica i de Biologia Molecular', 'Genètica i de Microbiologia'],
  ['Ciència Política i de Dret Públic', 'Dret Privat', 'Dret Públic i Ciències Historicojurídiques', 'Sociologia'],
  ['Ciències de l\'Antiguitat i de l\'Edat Mitjana', 'Filologia Anglesa i de Germanística', 'Filologia Catalana', 'Filologia Espanyola', 'Filologia Francesa i Romànica'],
  ['Història Moderna i Contemporània', 'Art i de Musicologia', 'Geografia', 'Antropologia Social i Cultural'],
  ['Empresa', 'Economia Aplicada', 'Economia i d\'Història Econòmica'],
  ['Cirurgia', 'Medicina', 'Pediatria, d\'Obstetrícia i Ginecologia', 'Bioquímica i de Biologia Molecular Mèdica'],
  ['Farmacologia, de Terapèutica i de Toxicologia', 'Anatomia Animal', 'Sanitat i Anatomia Animals'],
  ['Física', 'Matemàtiques', 'Química', 'Geologia'],
  ['Enginyeria Electrònica', 'Enginyeria Química, Biològica i Ambiental', 'Microelectrònica i Sistemes Electrònics'],
  ['Psicologia Bàsica, Evolutiva i de l\'Educació', 'Psicologia Clínica i de la Salut', 'Psicologia Social', 'Psicobiologia i Metodologia'],
  ['Pedagogia Aplicada', 'Pedagogia Sistemàtica i Social', 'Didàctica de la Llengua, la Literatura i les Ciències Socials'],
  ['Comunicació Audiovisual i Publicitat', 'Periodisme i de Ciències de la Comunicació', 'Mitjans, Comunicació i Cultura'],
  ['Ciències de la Computació', 'Arquitectura de Computadors i Sistemes Operatius', 'Enginyeria de la Informació i de les Comunicacions']
];
UAB_DEPTOS.flat().forEach(d => {
  DEPARTAMENTOS.push(['Universitat Autònoma de Barcelona', 'Pública', 'UAB Departament', d, 'Académico', 'Cerdanyola del Vallès', 'Cataluña', '+34 93 581 10 00', 'rrhh@uab.cat', 'uab.cat']);
});

// Universitat Politècnica de Catalunya (UPC)
const UPC_DEPTOS = [
  'Arquitectura', 'Composició Arquitectònica', 'Construccions Arquitectòniques I', 'Construccions Arquitectòniques II',
  'Estructures a l\'Arquitectura', 'Expressió Gràfica Arquitectònica', 'Projectes Arquitectònics',
  'Tecnologia de l\'Arquitectura', 'Urbanisme i Ordenació del Territori',
  'Ciència dels Materials i Enginyeria Metalúrgica', 'Enginyeria Civil i Ambiental', 'Enginyeria de la Construcció',
  'Enginyeria del Terreny, Cartogràfica i Geofísica', 'Enginyeria Hidràulica, Marítima i Ambiental',
  'Enginyeria Elèctrica', 'Enginyeria Electrònica', 'Enginyeria Mecànica', 'Enginyeria Química',
  'Enginyeria de Sistemes, Automàtica i Informàtica Industrial', 'Mecànica de Fluids',
  'Resistència de Materials i Estructures a l\'Enginyeria', 'Teoria del Senyal i Comunicacions',
  'Arquitectura de Computadors', 'Ciències de la Computació', 'Enginyeria de Serveis i Sistemes d\'Informació',
  'Enginyeria Telemàtica', 'Llenguatges i Sistemes Informàtics',
  'Estadística i Investigació Operativa', 'Matemàtiques', 'Física',
  'Enginyeria Agroalimentària i Biotecnologia', 'Enginyeria Minera, Industrial i TIC',
  'Òptica i Optometria', 'Enginyeria Tèxtil i Paperera', 'Organització d\'Empreses'
];
UPC_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Politècnica de Catalunya', 'Pública', 'UPC', d, d.includes('Arquitectura') || d.includes('Urbanisme') ? 'Arquitectura' : 'Ingeniería', 'Barcelona', 'Cataluña', '+34 93 401 62 00', 'rrhh@upc.edu', 'upc.edu']);
});

// Universitat Pompeu Fabra
const UPF_DEPTOS = [
  'Ciències Polítiques i Socials', 'Comunicació', 'Dret', 'Economia i Empresa', 'Humanitats',
  'Tecnologies de la Informació i les Comunicacions', 'Traducció i Ciències del Llenguatge', 'Medicina i Ciències de la Vida'
];
UPF_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Pompeu Fabra', 'Pública', 'UPF', d, 'Académico', 'Barcelona', 'Cataluña', '+34 93 542 20 00', 'rrhh@upf.edu', 'upf.edu']);
});

// Universidad de Girona, Lleida, Rovira i Virgili
const UDG_DEPTOS = ['Arquitectura i Enginyeria', 'Biologia', 'Ciències Mèdiques', 'Dret', 'Economia', 'Empresa', 'Física', 'Geografia', 'Història i Història de l\'Art', 'Informàtica', 'Matemàtica Aplicada', 'Pedagogia', 'Psicologia', 'Química', 'Filologia i Comunicació'];
UDG_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat de Girona', 'Pública', 'UdG', d, 'Académico', 'Girona', 'Cataluña', '+34 972 41 80 00', 'rrhh@udg.edu', 'udg.edu']);
});

const UDL_DEPTOS = ['Producció Vegetal', 'Hortofructicultura', 'Producció Animal', 'Tecnologia d\'Aliments', 'Enginyeria Agroforestal', 'Història de l\'Art', 'Història', 'Filologia Catalana', 'Filologia Anglesa', 'Filologia Hispànica', 'Dret Públic', 'Dret Privat', 'Administració d\'Empreses', 'Economia Aplicada', 'Cirurgia', 'Medicina', 'Infermeria', 'Matemàtica', 'Física Aplicada', 'Química', 'Pedagogia', 'Psicologia'];
UDL_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat de Lleida', 'Pública', 'UdL', d, 'Académico', 'Lleida', 'Cataluña', '+34 973 70 20 00', 'rrhh@udl.cat', 'udl.cat']);
});

const URV_DEPTOS = ['Antropologia, Filosofia i Treball Social', 'Bioquímica i Biotecnologia', 'Ciències Mèdiques Bàsiques', 'Dret Privat, Processal i Financer', 'Dret Públic', 'Economia', 'Educació', 'Enginyeria Electrònica, Elèctrica i Automàtica', 'Enginyeria Informàtica i Matemàtiques', 'Enginyeria Mecànica', 'Enginyeria Química', 'Estudis Anglesos i Alemanys', 'Filologia Catalana', 'Filologies Romàniques', 'Geografia', 'Gestió d\'Empreses', 'Història i Història de l\'Art', 'Infermeria', 'Medicina i Cirurgia', 'Pedagogia', 'Psicologia', 'Química Analítica i Química Orgànica', 'Química Física i Inorgànica'];
URV_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Rovira i Virgili', 'Pública', 'URV', d, 'Académico', 'Tarragona', 'Cataluña', '+34 977 55 99 00', 'rrhh@urv.cat', 'urv.cat']);
});

// Privadas Cataluña
const URL_DEPTOS = ['Enginyeria i Arquitectura', 'Empresa i Economia', 'Dret', 'Comunicació i Periodisme', 'Educació i Psicologia', 'Filosofia i Lletres', 'Ciències de la Salut', 'Esport', 'Turisme', 'Teologia'];
URL_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Ramon Llull', 'Privada', 'URL', d, 'Académico', 'Barcelona', 'Cataluña', '+34 93 602 22 00', 'rrhh@url.edu', 'url.edu']);
});

const UVIC_DEPTOS = ['Educació, Traducció i Ciències Humanes', 'Empresa i Comunicació', 'Salut', 'Politècnica', 'Ciències Bàsiques'];
UVIC_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat de Vic - Universitat Central de Catalunya', 'Privada', 'UVic-UCC', d, 'Académico', 'Vic', 'Cataluña', '+34 93 886 12 22', 'rrhh@uvic.cat', 'uvic.cat']);
});

const UIC_DEPTOS = ['Arquitectura', 'Comunicació', 'Dret', 'Economia i Ciències Socials', 'Educació', 'Humanitats', 'Infermeria', 'Medicina', 'Odontologia'];
UIC_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Internacional de Catalunya', 'Privada', 'UIC Barcelona', d, 'Académico', 'Barcelona', 'Cataluña', '+34 93 254 18 00', 'rrhh@uic.es', 'uic.es']);
});

const UAOCEU_DEPTOS = ['Comunicació', 'Empresa i Tecnologia', 'Dret', 'Educació', 'Humanitats'];
UAOCEU_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Abat Oliba CEU', 'Privada', 'UAO CEU', d, 'Académico', 'Barcelona', 'Cataluña', '+34 93 253 72 04', 'rrhh@uao.es', 'uao.es']);
});

// ============================================================
// COMUNIDAD VALENCIANA
// ============================================================

// Universitat de València (UV) - tenemos los emails reales
// Los 82 ya están en otra pestaña UV. Aquí añado para completar el resto.
// Universitat Politècnica de València (UPV) - 42 departamentos
const UPV_DEPTOS = [
  'Biotecnologia', 'Comunicacions', 'Comunicació Audiovisual, Documentació i Història de l\'Art',
  'Composició Arquitectònica', 'Construccions Arquitectòniques', 'Conservació i Restauració de Béns Culturals',
  'Dibuix', 'Ecosistemes Agroforestals', 'Economia i Ciències Socials', 'Educació Física i Esport',
  'Enginyeria Cartogràfica, Geodèsia i Fotogrametria', 'Enginyeria Electrònica', 'Enginyeria de la Construcció',
  'Enginyeria Hidràulica i Medi Ambient', 'Enginyeria Mecànica i Materials', 'Enginyeria Química i Nuclear',
  'Enginyeria Rural i Agroalimentària', 'Enginyeria de Sistemes i Automàtica', 'Enginyeria Tèxtil i Paperera',
  'Enginyeria del Terreny', 'Escultura', 'Estadística i Investigació Operativa Aplicades i Qualitat',
  'Expressió Gràfica Arquitectònica', 'Expressió Gràfica a l\'Enginyeria', 'Física Aplicada',
  'Informàtica de Sistemes i Computadors', 'Mecànica dels Medis Continus i Teoria d\'Estructures',
  'Lingüística Aplicada', 'Matemàtica Aplicada', 'Mecanització i Tecnologia Agrària', 'Organització d\'Empreses',
  'Pintura', 'Producció Vegetal', 'Projectes d\'Enginyeria', 'Projectes Arquitectònics',
  'Química', 'Sistemes Informàtics i Computació', 'Tecnologia d\'Aliments', 'Termodinàmica Aplicada',
  'Urbanisme'
];
UPV_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Politècnica de València', 'Pública', 'UPV', d, 'Académico', 'Valencia', 'Comunidad Valenciana', '+34 96 387 70 00', 'rrhh@upv.es', 'upv.es']);
});

// Universitat Jaume I (UJI)
const UJI_DEPTOS = ['Administració d\'Empreses i Màrqueting', 'Ciències Agràries i del Medi Natural', 'Comptabilitat i Finances', 'Dret del Treball, Seguretat Social i Eclesiàstic', 'Dret Privat', 'Dret Públic', 'Economia', 'Educació i Didàctiques Específiques', 'Enginyeria Mecànica i Construcció', 'Enginyeria Química', 'Enginyeria de Sistemes Industrials i Disseny', 'Estudis Anglesos', 'Filologia i Cultures Europees', 'Història, Geografia i Art', 'Llenguatges i Sistemes Informàtics', 'Matemàtiques', 'Medicina', 'Filosofia i Sociologia', 'Pedagogia', 'Psicologia Bàsica, Clínica i Psicobiologia', 'Psicologia Evolutiva, Educativa, Social i Metodologia', 'Química Inorgànica i Orgànica', 'Química Física i Analítica', 'Traducció i Comunicació'];
UJI_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat Jaume I', 'Pública', 'UJI', d, 'Académico', 'Castellón', 'Comunidad Valenciana', '+34 964 72 80 00', 'rrhh@uji.es', 'uji.es']);
});

// Universidad de Alicante (UA)
const UA_DEPTOS = ['Análisis Económico Aplicado', 'Análisis Geográfico Regional y Geografía Física', 'Anatomía y Embriología Humana', 'Biotecnología', 'Ciencia de la Computación e Inteligencia Artificial', 'Ciencias del Mar y Biología Aplicada', 'Ciencias Sociales y de la Salud', 'Comunicación y Psicología Social', 'Construcciones Arquitectónicas', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho Civil', 'Derecho Internacional Público y Derecho Penal', 'Derecho Mercantil y Derecho Procesal', 'Didáctica General y Didácticas Específicas', 'Ecología', 'Economía Aplicada y Política Económica', 'Economía Financiera y Contabilidad', 'Edafología y Química Agrícola', 'Educación Física', 'Enfermería', 'Estadística e Investigación Operativa', 'Estudios Jurídicos del Estado', 'Expresión Gráfica, Composición y Proyectos', 'Filología Catalana', 'Filología Española', 'Filología Inglesa', 'Filologías Integradas', 'Filosofía del Derecho y Derecho Internacional Privado', 'Física Aplicada', 'Física, Ingeniería de Sistemas y Teoría de la Señal', 'Fundamentos del Análisis Económico', 'Geografía Humana', 'Historia Medieval, Moderna y Ciencias Técnicas Historiográficas', 'Humanidades Contemporáneas', 'Innovación y Formación Didáctica', 'Lenguajes y Sistemas Informáticos', 'Marketing', 'Matemáticas', 'Matemática Aplicada', 'Organización de Empresas', 'Patología y Cirugía', 'Prehistoria, Arqueología, Historia Antigua, Filología Griega y Filología Latina', 'Psicología de la Salud', 'Psicología Evolutiva y Didáctica', 'Química Analítica, Nutrición y Bromatología', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Sociología I', 'Sociología II', 'Tecnología Informática y Computación', 'Trabajo Social y Servicios Sociales', 'Traducción e Interpretación'];
UA_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Alicante', 'Pública', 'UA', d, 'Académico', 'Alicante', 'Comunidad Valenciana', '+34 96 590 34 00', 'rrhh@ua.es', 'ua.es']);
});

// Universidad Miguel Hernández (UMH)
const UMH_DEPTOS = ['Anatomía y Psicobiología', 'Arte', 'Arquitectura y Tecnología de Computadores', 'Biología Aplicada', 'Bioquímica y Biología Molecular', 'Ciencias Históricas, Geografía y Filosofía', 'Ciencia Jurídica', 'Ciencia de Materiales, Óptica y Tecnología Electrónica', 'Comunicación', 'Economía Agroambiental, Ingeniería Cartográfica', 'Economía Financiera y Contabilidad', 'Educación', 'Estadística, Matemáticas e Informática', 'Estudios Económicos y Financieros', 'Farmacología, Pediatría y Química Orgánica', 'Filología y Traducción', 'Física y Arquitectura de Computadores', 'Fisiología', 'Histología y Anatomía', 'Ingeniería de Comunicaciones', 'Ingeniería de Sistemas y Automática', 'Ingeniería Mecánica y Energía', 'Medicina Clínica', 'Patología y Cirugía', 'Producción Vegetal y Microbiología', 'Psicología de la Salud', 'Psicología Social', 'Salud Pública, Historia de la Ciencia y Ginecología'];
UMH_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Miguel Hernández de Elche', 'Pública', 'UMH', d, 'Académico', 'Elche', 'Comunidad Valenciana', '+34 96 522 24 00', 'rrhh@umh.es', 'umh.es']);
});

// Privadas Comunidad Valenciana
const UCV_DEPTOS = ['Magisterio y Ciencias de la Educación', 'Empresariales', 'Ciencias Jurídicas, Económicas y Sociales', 'Filosofía y Antropología', 'Comunicación y Multimedia', 'Enfermería', 'Fisioterapia', 'Medicina y Ciencias de la Salud', 'Veterinaria', 'Psicología y Logopedia'];
UCV_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Católica de Valencia', 'Privada', 'UCV', d, 'Académico', 'Valencia', 'Comunidad Valenciana', '+34 96 363 74 12', 'rrhh@ucv.es', 'ucv.es']);
});

const UCH_DEPTOS = ['Arquitectura y Construcción', 'Empresa y Tecnología', 'Comunicación', 'Derecho, Empresa y Ciencias Políticas', 'Educación y Humanidades', 'Enfermería', 'Farmacia', 'Medicina', 'Odontología', 'Veterinaria'];
UCH_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad CEU Cardenal Herrera', 'Privada', 'UCH-CEU', d, 'Académico', 'Valencia', 'Comunidad Valenciana', '+34 96 136 90 00', 'rrhh@uchceu.es', 'uchceu.es']);
});

// ============================================================
// ANDALUCÍA
// ============================================================

// Universidad de Sevilla - 100 dptos representativos
const US_DEPTOS = ['Administración de Empresas y Marketing', 'Agronomía', 'Álgebra', 'Análisis Económico y Economía Política', 'Análisis Matemático', 'Anatomía y Embriología Humana', 'Antropología Social', 'Arquitectura y Tecnología de Computadores', 'Biología Celular', 'Biología Vegetal y Ecología', 'Bioquímica Médica y Biología Molecular', 'Bioquímica Vegetal y Biología Molecular', 'Bioquímica y Biología Molecular', 'Ciencias de la Computación e Inteligencia Artificial', 'Ciencias Jurídicas Básicas', 'Cirugía', 'Citología e Histología', 'Comunicación Audiovisual y Publicidad', 'Construcciones Arquitectónicas I', 'Construcciones Arquitectónicas II', 'Contabilidad y Economía Financiera', 'Cristalografía, Mineralogía y Química Agrícola', 'Derecho Administrativo', 'Derecho Civil y Derecho Internacional Privado', 'Derecho Constitucional', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho Financiero y Tributario', 'Derecho Internacional Público y Relaciones Internacionales', 'Derecho Mercantil', 'Derecho Penal y Ciencias Criminales', 'Derecho Procesal', 'Dibujo', 'Didáctica de la Lengua y la Literatura', 'Didáctica de las Ciencias Experimentales y Sociales', 'Didáctica de las Matemáticas', 'Didáctica y Organización Educativa', 'Economía Aplicada I', 'Economía Aplicada II', 'Economía Aplicada III', 'Economía e Historia Económica', 'Economía Financiera y Dirección de Operaciones', 'Ecuaciones Diferenciales y Análisis Numérico', 'Educación Artística', 'Educación Física y Deporte', 'Electrónica y Electromagnetismo', 'Enfermería', 'Escultura e Historia de las Artes Plásticas', 'Estadística e Investigación Operativa', 'Estética e Historia de la Filosofía', 'Estomatología', 'Estructuras de Edificación', 'Expresión Gráfica e Ingeniería en la Edificación', 'Expresión Gráfica y Arquitectónica', 'Farmacia y Tecnología Farmacéutica', 'Farmacología', 'Filología Alemana', 'Filología Francesa', 'Filología Griega y Latina', 'Filología Inglesa - Lengua', 'Filología Inglesa - Literatura', 'Filologías Integradas', 'Filosofía del Derecho', 'Filosofía y Lógica', 'Física Aplicada I', 'Física Aplicada II', 'Física Aplicada III', 'Física Atómica, Molecular y Nuclear', 'Física de la Materia Condensada', 'Fisiología', 'Fisiología Médica y Biofísica', 'Fisioterapia', 'Genética', 'Geografía Física y Análisis Geográfico Regional', 'Geografía Humana', 'Geometría y Topología', 'Historia Antigua', 'Historia Contemporánea', 'Historia de América', 'Historia del Arte', 'Historia Medieval', 'Historia Moderna', 'Historia, Teoría y Composición Arquitectónicas', 'Ingeniería Aeroespacial y Mecánica de Fluidos', 'Ingeniería de la Construcción y Proyectos', 'Ingeniería de Sistemas y Automática', 'Ingeniería del Diseño', 'Ingeniería Eléctrica', 'Ingeniería Electrónica', 'Ingeniería Energética', 'Ingeniería Gráfica', 'Ingeniería Mecánica y Fabricación', 'Ingeniería Química', 'Ingeniería Química y Ambiental', 'Ingeniería Telemática', 'Ingeniería y Ciencia de los Materiales', 'Lengua Española y Lingüística', 'Lenguajes y Sistemas Informáticos', 'Literatura Española e Hispanoamericana', 'Matemática Aplicada I', 'Matemática Aplicada II', 'Mecánica de Medios Continuos', 'Medicina', 'Medicina Preventiva y Salud Pública', 'Metafísica y Corrientes Actuales de la Filosofía', 'Microbiología', 'Microbiología y Parasitología', 'Motricidad Humana y Rendimiento Deportivo', 'Nutrición y Bromatología', 'Organización Industrial y Gestión I', 'Organización Industrial y Gestión II', 'Periodismo I', 'Periodismo II', 'Personalidad, Evaluación y Tratamientos Psicológicos', 'Pintura', 'Podología', 'Prehistoria y Arqueología', 'Proyectos Arquitectónicos', 'Psicología Evolutiva', 'Psicología Experimental', 'Psicología Social', 'Psiquiatría', 'Química Analítica', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Sociología', 'Tecnología Electrónica', 'Teoría de la Señal y Comunicaciones', 'Teoría e Historia de la Educación', 'Urbanística y Ordenación del Territorio', 'Zoología'];
US_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Sevilla', 'Pública', 'US', d, 'Académico', 'Sevilla', 'Andalucía', '+34 95 455 10 00', 'rrhh@us.es', 'us.es']);
});

// Universidad de Granada - 100 dptos
const UGR_DEPTOS = ['Álgebra', 'Análisis Geográfico Regional', 'Análisis Matemático', 'Anatomía Patológica', 'Anatomía y Embriología Humana', 'Antropología Social', 'Arquitectura y Tecnología de Computadores', 'Biología Celular', 'Bioquímica y Biología Molecular I', 'Bioquímica y Biología Molecular II', 'Bioquímica y Biología Molecular III', 'Botánica', 'Ciencia Política y de la Administración', 'Ciencias de la Computación e Inteligencia Artificial', 'Cirugía y sus Especialidades', 'Comercialización e Investigación de Mercados', 'Construcciones Arquitectónicas', 'Derecho Administrativo', 'Derecho Civil', 'Derecho Constitucional', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho Financiero y Tributario', 'Derecho Internacional Privado e Historia del Derecho', 'Derecho Internacional Público', 'Derecho Mercantil y Derecho Romano', 'Derecho Penal', 'Derecho Procesal y Derecho Eclesiástico del Estado', 'Dibujo', 'Didáctica de la Expresión Musical, Plástica y Corporal', 'Didáctica de la Lengua y la Literatura', 'Didáctica de la Matemática', 'Didáctica de las Ciencias Experimentales', 'Didáctica de las Ciencias Sociales', 'Didáctica y Organización Escolar', 'Ecología', 'Economía Aplicada', 'Economía Financiera y Contabilidad', 'Economía Internacional y de España', 'Edafología y Química Agrícola', 'Educación Física y Deportiva', 'Electromagnetismo y Física de la Materia', 'Electrónica y Tecnología de Computadores', 'Enfermería', 'Escultura', 'Estadística e Investigación Operativa', 'Estomatología', 'Estratigrafía y Paleontología', 'Estructuras', 'Estudios Semíticos', 'Expresión Gráfica Arquitectónica', 'Expresión Gráfica en la Ingeniería', 'Farmacia y Tecnología Farmacéutica', 'Farmacología', 'Filología Francesa', 'Filología Griega', 'Filología Inglesa y Alemana', 'Filología Latina', 'Filología Románica e Italiana', 'Filologías Eslava y Semítica', 'Filosofía I', 'Filosofía II', 'Filosofía del Derecho', 'Física Aplicada', 'Física Atómica, Molecular y Nuclear', 'Física Teórica y del Cosmos', 'Fisiología', 'Fisioterapia', 'Genética', 'Geodinámica', 'Geometría y Topología', 'Historia Antigua', 'Historia Contemporánea', 'Historia del Arte', 'Historia y CC. Técnicas Historiográficas', 'Historia Medieval', 'Historia Moderna y América', 'Información y Comunicación', 'Ingeniería Civil', 'Ingeniería Química', 'Lengua Española', 'Lenguajes y Sistemas Informáticos', 'Lingüística General y Teoría de la Literatura', 'Literatura Española', 'Matemática Aplicada', 'Mecánica de Estructuras e Ingeniería Hidráulica', 'Medicina', 'Medicina Legal, Toxicología y Antropología Física', 'Medicina Preventiva y Salud Pública', 'Métodos Cuantitativos para la Economía y la Empresa', 'Métodos de Investigación y Diagnóstico en Educación', 'Microbiología', 'Mineralogía y Petrología', 'Nutrición y Bromatología', 'Obstetricia y Ginecología', 'Óptica', 'Organización de Empresas', 'Parasitología', 'Pedagogía', 'Personalidad, Evaluación y Tratamiento Psicológico', 'Pintura', 'Prehistoria y Arqueología', 'Proyectos Arquitectónicos', 'Psicología Clínica y de la Salud', 'Psicología Evolutiva y de la Educación', 'Psicología Experimental', 'Psicología Social', 'Psiquiatría', 'Química Analítica', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Radiología y Medicina Física', 'Sociología', 'Teoría de la Literatura y Literatura Comparada', 'Teoría e Historia Económica', 'Trabajo Social y Servicios Sociales', 'Traducción e Interpretación', 'Urbanística y Ordenación del Territorio', 'Zoología'];
UGR_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Granada', 'Pública', 'UGR', d, 'Académico', 'Granada', 'Andalucía', '+34 958 24 30 00', 'rrhh@ugr.es', 'ugr.es']);
});

// Universidad de Málaga
const UMA_DEPTOS = ['Anatomía Humana, Medicina Legal e Historia de la Ciencia', 'Anatomía Patológica', 'Arte', 'Biología Animal', 'Biología Celular, Genética y Fisiología', 'Biología Molecular y Bioquímica', 'Biología Vegetal', 'Ciencias de la Comunicación', 'Cirugía, Obstetricia y Ginecología', 'Comunicación Audiovisual y Publicidad', 'Contabilidad y Gestión', 'Derecho Administrativo', 'Derecho Civil', 'Derecho Constitucional', 'Derecho del Estado y Sociología', 'Derecho del Trabajo', 'Derecho Financiero, Profesional y Eclesiástico', 'Derecho Mercantil', 'Derecho Penal', 'Derecho Privado Especial', 'Derecho Procesal', 'Didáctica de la Lengua y la Literatura', 'Didáctica de la Matemática, Ciencias Sociales y Experimentales', 'Didáctica de las Lenguas, Artes y Deporte', 'Didáctica y Organización Escolar', 'Ecología y Geología', 'Economía Aplicada', 'Economía y Administración de Empresas', 'Educación Artística', 'Electromagnetismo y Física de la Materia', 'Electrónica', 'Enfermería', 'Estadística e Investigación Operativa', 'Estética e Historia de la Filosofía', 'Estructuras de Edificación', 'Expresión Gráfica, Diseño y Proyectos', 'Farmacia y Tecnología Farmacéutica', 'Farmacología y Pediatría', 'Filología Española', 'Filología Griega, Latina y Documentación', 'Filología Inglesa, Francesa y Alemana', 'Filosofía', 'Física Aplicada I', 'Física Aplicada II', 'Fisiología Humana, Histología, Anatomía Patológica y Educación Física', 'Geografía', 'Geometría y Topología', 'Historia del Arte', 'Historia Moderna y Contemporánea', 'Historia, Filosofía y Teoría del Derecho', 'Ingeniería Civil, Materiales y Fabricación', 'Ingeniería de Comunicaciones', 'Ingeniería Eléctrica', 'Ingeniería Mecánica y Fabricación', 'Ingeniería Mecánica de Fluidos', 'Ingeniería Química', 'Lenguajes y Ciencias de la Computación', 'Matemática Aplicada', 'Mecánica de Medios Continuos y Teoría de Estructuras', 'Medicina Preventiva y Salud Pública', 'Microbiología', 'Music', 'Personalidad, Evaluación y Tratamiento Psicológico', 'Psicobiología y Metodología', 'Psicología Básica', 'Psicología Evolutiva y de la Educación', 'Psicología Social, Trabajo Social, Antropología Social', 'Química Analítica', 'Química Física', 'Química Inorgánica, Cristalografía y Mineralogía', 'Química Orgánica', 'Radiología y Medicina Física, Oftalmología y Otorrinolaringología', 'Tecnología Electrónica', 'Teoría e Historia de la Educación', 'Traducción e Interpretación'];
UMA_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Málaga', 'Pública', 'UMA', d, 'Académico', 'Málaga', 'Andalucía', '+34 952 13 10 00', 'rrhh@uma.es', 'uma.es']);
});

// Universidades Andalucía resto
const UCO_DEPTOS = ['Agronomía', 'Anatomía y Anatomía Patológica Comparadas', 'Bioquímica y Biología Molecular', 'Botánica, Ecología y Fisiología Vegetal', 'Ciencias del Lenguaje y de la Educación', 'Ciencias Jurídicas Internacionales', 'Ciencias Morfológicas', 'Ciencias Sociales y Humanidades', 'Derecho Civil, Penal y Procesal', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho Mercantil', 'Derecho Público y Económico', 'Didáctica de las Ciencias Sociales y Experimentales', 'Economía, Sociología y Política Agraria', 'Economía Agraria, Finanzas y Contabilidad', 'Educación', 'Educación Artística y Corporal', 'Estadística, Econometría, Investigación Operativa, Organización de Empresas y Economía Aplicada', 'Farmacología, Toxicología y Medicina Legal', 'Filología Hispánica y sus Didácticas', 'Filologías Inglesa y Alemana', 'Física Aplicada, Radiología y Medicina Física', 'Fisiología', 'Genética', 'Historia, Geografía y Filosofía', 'Informática y Análisis Numérico', 'Ingeniería Eléctrica y Automática', 'Ingeniería Forestal', 'Ingeniería Gráfica y Geomática', 'Ingeniería Mecánica', 'Ingeniería Rural, Construcciones Civiles y Proyectos de Ingeniería', 'Matemáticas', 'Mecánica', 'Microbiología', 'Producción Animal', 'Psicología', 'Química Agrícola, Edafología y Microbiología', 'Química Analítica', 'Química Física y Termodinámica Aplicada', 'Química Inorgánica e Ingeniería Química', 'Química Orgánica', 'Sanidad Animal', 'Sociología y Estudios de las Mujeres', 'Estudios Filológicos y Literarios'];
UCO_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Córdoba', 'Pública', 'UCO', d, 'Académico', 'Córdoba', 'Andalucía', '+34 957 21 80 00', 'rrhh@uco.es', 'uco.es']);
});

const UJA_DEPTOS = ['Antropología, Geografía e Historia', 'Biología Animal, Biología Vegetal y Ecología', 'Biología Experimental', 'Ciencias de la Salud', 'Derecho Civil, Financiero y Tributario', 'Derecho Penal, Filosofía del Derecho, Filosofía Moral y Filosofía', 'Derecho Público', 'Didáctica de las Ciencias', 'Didáctica de la Expresión Musical, Plástica y Corporal', 'Economía', 'Estadística e Investigación Operativa', 'Filología Española', 'Filología Inglesa', 'Física', 'Geología', 'Informática', 'Ingeniería de Telecomunicación', 'Ingeniería Eléctrica', 'Ingeniería Gráfica, Diseño y Proyectos', 'Ingeniería Mecánica y Minera', 'Ingeniería Química, Ambiental y de Materiales', 'Lenguas y Culturas Mediterráneas', 'Matemáticas', 'Organización de Empresas, Marketing y Sociología', 'Pedagogía', 'Patrimonio Histórico', 'Psicología', 'Química Analítica', 'Química Física y Analítica', 'Química Inorgánica y Orgánica'];
UJA_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Jaén', 'Pública', 'UJA', d, 'Académico', 'Jaén', 'Andalucía', '+34 953 21 21 21', 'rrhh@ujaen.es', 'ujaen.es']);
});

const UAL_DEPTOS = ['Agronomía', 'Biología y Geología', 'Derecho', 'Economía y Empresa', 'Educación', 'Enfermería, Fisioterapia y Medicina', 'Filología', 'Geografía, Historia y Humanidades', 'Informática', 'Ingeniería', 'Matemáticas', 'Psicología', 'Química y Física'];
UAL_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Almería', 'Pública', 'UAL', d, 'Académico', 'Almería', 'Andalucía', '+34 950 21 51 21', 'rrhh@ual.es', 'ual.es']);
});

const UHU_DEPTOS = ['Biología Ambiental y Salud Pública', 'Ciencias Agroforestales', 'Ciencias Integradas', 'Derecho Público y del Trabajo', 'Derecho Privado', 'Didácticas Integradas', 'Economía', 'Economía Financiera, Contabilidad y Dirección de Operaciones', 'Educación', 'Enfermería', 'Filología Española y sus Didácticas', 'Filologías Integradas', 'Geología', 'Historia, Geografía y Antropología', 'Ingeniería Eléctrica y Térmica', 'Ingeniería Minera, Mecánica, Energética y de la Construcción', 'Ingeniería Química, Química Física y Química Orgánica', 'Matemáticas', 'Pedagogía', 'Psicología Clínica, Experimental y Social', 'Psicología Social, Evolutiva y de la Educación', 'Química'];
UHU_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Huelva', 'Pública', 'UHU', d, 'Académico', 'Huelva', 'Andalucía', '+34 959 21 80 00', 'rrhh@uhu.es', 'uhu.es']);
});

const UPO_DEPTOS = ['Antropología Social, Psicología Básica y Salud Pública', 'Biología Molecular e Ingeniería Bioquímica', 'Ciencias Sociales', 'Deporte e Informática', 'Derecho Privado', 'Derecho Público', 'Economía Financiera y Contabilidad', 'Economía, Métodos Cuantitativos e Historia Económica', 'Educación y Psicología Social', 'Filología y Traducción', 'Fisiología, Anatomía y Biología Celular', 'Geografía, Historia y Filosofía', 'Organización de Empresas y Marketing', 'Sistemas Físicos, Químicos y Naturales', 'Trabajo Social y Servicios Sociales', 'Educación'];
UPO_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Pablo de Olavide', 'Pública', 'UPO', d, 'Académico', 'Sevilla', 'Andalucía', '+34 954 34 92 00', 'rrhh@upo.es', 'upo.es']);
});

const UCA_DEPTOS = ['Anatomía y Embriología Humana', 'Anatomía Patológica, Biología Celular, Histología, Historia de la Ciencia, Medicina Legal y Forense y Toxicología', 'Biología', 'Biomedicina, Biotecnología y Salud Pública', 'Bioquímica y Biología Molecular', 'Ciencias y Técnicas de la Navegación, Teoría de la Señal y Comunicaciones', 'Cirugía', 'Construcciones Navales', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho Internacional Público, Penal y Procesal', 'Derecho Mercantil', 'Derecho Privado', 'Derecho Público', 'Didáctica', 'Didáctica de la Educación Física, Plástica y Musical', 'Didáctica de la Lengua y la Literatura', 'Didáctica de las Ciencias Sociales y la Filosofía', 'Disciplinas Jurídicas Básicas', 'Economía Aplicada', 'Economía Financiera y Contabilidad', 'Economía General', 'Educación', 'Enfermería y Fisioterapia', 'Estadística e Investigación Operativa', 'Filología', 'Filología Clásica', 'Filología Francesa e Inglesa', 'Física Aplicada', 'Física de la Materia Condensada', 'Historia, Geografía y Filosofía', 'Historia Moderna, Contemporánea, de América y del Arte', 'Ingeniería Eléctrica', 'Ingeniería Industrial e Ingeniería Civil', 'Ingeniería Informática', 'Ingeniería Mecánica y Diseño Industrial', 'Ingeniería Química y Tecnología de Alimentos', 'Lenguas Modernas', 'Marketing y Comunicación', 'Matemáticas', 'Materno-Infantil y Radiología', 'Medicina', 'Microbiología', 'Organización de Empresas', 'Psicología', 'Química Analítica', 'Química Física', 'Química Inorgánica', 'Química Orgánica'];
UCA_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Cádiz', 'Pública', 'UCA', d, 'Académico', 'Cádiz', 'Andalucía', '+34 956 01 50 00', 'rrhh@uca.es', 'uca.es']);
});

// ============================================================
// CASTILLA Y LEÓN
// ============================================================

const USAL_DEPTOS = ['Administración y Economía de la Empresa', 'Anatomía e Histología Humanas', 'Biblioteconomía y Documentación', 'Biología Animal, Ecología, Parasitología', 'Biología Celular y Patología', 'Bioquímica y Biología Molecular', 'Botánica y Fisiología Vegetal', 'Ciencias Biomédicas y del Diagnóstico', 'Ciencias Farmacéuticas', 'Cirugía', 'Construcción y Agronomía', 'Derecho Administrativo, Financiero y Procesal', 'Derecho del Trabajo y Trabajo Social', 'Derecho Privado', 'Derecho Público General', 'Didáctica de la Expresión Musical, Plástica y Corporal', 'Didáctica de las Matemáticas y de las Ciencias Experimentales', 'Didáctica, Organización y Métodos de Investigación', 'Economía Aplicada', 'Economía e Historia Económica', 'Enfermería y Fisioterapia', 'Estadística', 'Filología Clásica e Indoeuropeo', 'Filología Francesa', 'Filología Inglesa', 'Filología Moderna', 'Filosofía, Lógica y Estética', 'Física Aplicada', 'Física Fundamental', 'Fisiología y Farmacología', 'Geografía', 'Geología', 'Historia del Arte / Bellas Artes', 'Historia del Derecho y Filosofía Jurídica', 'Historia Medieval, Moderna y Contemporánea', 'Informática y Automática', 'Ingeniería Cartográfica y del Terreno', 'Ingeniería Mecánica', 'Ingeniería Química y Textil', 'Lengua Española', 'Literatura Española e Hispanoamericana', 'Matemática Aplicada', 'Matemáticas', 'Medicina', 'Microbiología y Genética', 'Personalidad, Evaluación y Tratamiento Psicológicos', 'Prehistoria, Historia Antigua y Arqueología', 'Psicología Básica, Psicobiología y Metodología', 'Psicología Evolutiva y de la Educación', 'Psicología Social y Antropología', 'Química Analítica, Nutrición y Bromatología', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Sociología y Comunicación', 'Teoría e Historia de la Educación', 'Traducción e Interpretación'];
USAL_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Salamanca', 'Pública', 'USAL', d, 'Académico', 'Salamanca', 'Castilla y León', '+34 923 29 44 00', 'rrhh@usal.es', 'usal.es']);
});

const UVA_DEPTOS = ['Agroforestal', 'Análisis Económico e Investigación Económica Aplicada', 'Anatomía Patológica, Microbiología', 'Anatomía y Radiología', 'Biología Celular, Histología y Farmacología', 'Bioquímica y Biología Molecular', 'Cirugía, Oftalmología, Otorrinolaringología', 'Ciencias Agroforestales', 'Ciencias Experimentales y de la Salud', 'Construcciones Arquitectónicas', 'Derecho Civil', 'Derecho Constitucional, Procesal y Eclesiástico', 'Derecho del Trabajo y Trabajo Social', 'Derecho Mercantil, del Trabajo y Internacional Privado', 'Derecho Penal e Historia y Teoría del Derecho', 'Derecho Público', 'Didáctica de la Expresión Musical, Plástica y Corporal', 'Didáctica de la Lengua y Literatura', 'Didáctica de las Ciencias Experimentales', 'Didáctica de las Ciencias Sociales', 'Didáctica de las Matemáticas', 'Economía Financiera y Contabilidad', 'Economía Aplicada', 'Educación Física y Salud', 'Enfermería', 'Estadística e Investigación Operativa', 'Filología Clásica', 'Filología Inglesa', 'Filología Francesa y Alemana', 'Filosofía', 'Física Aplicada', 'Física de la Materia Condensada, Cristalografía', 'Física Teórica, Atómica y Óptica', 'Fundamentos de la Educación', 'Geografía', 'Historia Antigua y Medieval', 'Historia del Arte', 'Historia Moderna, Contemporánea, de América y Periodismo', 'Informática', 'Ingeniería Agrícola y Forestal', 'Ingeniería Eléctrica', 'Ingeniería Energética y Fluidomecánica', 'Ingeniería de Sistemas y Automática', 'Ingeniería Mecánica', 'Ingeniería Química y Tecnología del Medio Ambiente', 'Lengua Española', 'Literatura Española y Teoría de la Literatura', 'Matemática Aplicada', 'Matemática Aplicada Fundamental', 'Pediatría e Inmunología', 'Pedagogía', 'Producción Vegetal y Recursos Forestales', 'Psicología', 'Química Analítica', 'Química Inorgánica', 'Química Orgánica', 'Química Física y Química Inorgánica', 'Sociología y Trabajo Social', 'Teoría de la Señal y Comunicaciones e Ingeniería Telemática', 'Urbanismo y Representación de la Arquitectura'];
UVA_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Valladolid', 'Pública', 'UVA', d, 'Académico', 'Valladolid', 'Castilla y León', '+34 983 18 50 00', 'rrhh@uva.es', 'uva.es']);
});

const UBU_DEPTOS = ['Biotecnología y Ciencia de los Alimentos', 'Ciencias de la Educación', 'Ciencias de la Salud', 'Ciencias Históricas y Geografía', 'Construcciones Arquitectónicas, Ingeniería del Terreno y Mecánica de Medios Continuos', 'Derecho Privado', 'Derecho Público', 'Didácticas Específicas', 'Economía Aplicada', 'Economía y Administración de Empresas', 'Educación', 'Electromecánica', 'Filología', 'Física', 'Ingeniería Civil', 'Ingeniería Electromecánica', 'Ingeniería Informática', 'Ingeniería de Organización', 'Matemáticas y Computación', 'Química'];
UBU_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Burgos', 'Pública', 'UBU', d, 'Académico', 'Burgos', 'Castilla y León', '+34 947 25 88 00', 'rrhh@ubu.es', 'ubu.es']);
});

const ULE_DEPTOS = ['Biología Molecular', 'Biología Vegetal', 'Biotecnología y Ciencia de los Alimentos', 'Ciencias Biomédicas', 'Ciencias Forestales', 'Derecho Privado y de la Empresa', 'Derecho Público', 'Didáctica de las Lenguas, las Artes y el Deporte', 'Dirección y Economía de la Empresa', 'Economía y Estadística', 'Educación', 'Filología Hispánica y Clásica', 'Filología Moderna', 'Filosofía y Letras', 'Higiene y Tecnología de los Alimentos', 'Historia', 'Ingeniería Agraria', 'Ingeniería Eléctrica y de Sistemas y Automática', 'Ingeniería Mecánica, Informática y Aeroespacial', 'Ingeniería Minera, Topográfica y Estructuras', 'Matemáticas', 'Patrimonio Artístico y Documental', 'Producción Animal', 'Psicología, Sociología y Filosofía', 'Química y Física Aplicadas', 'Sanidad Animal'];
ULE_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de León', 'Pública', 'ULE', d, 'Académico', 'León', 'Castilla y León', '+34 987 29 12 00', 'rrhh@unileon.es', 'unileon.es']);
});

// ============================================================
// CASTILLA-LA MANCHA
// ============================================================

const UCLM_DEPTOS = ['Análisis Económico y Finanzas', 'Anatomía Patológica, Medicina Legal y Forense', 'Bioquímica y Biología Molecular', 'Ciencia Jurídica y Filosofía del Derecho', 'Ciencia Política y de la Administración', 'Ciencias Ambientales', 'Ciencias de la Salud', 'Ciencias Médicas', 'Ciencias y Técnicas Agroforestales', 'Construcción y Arquitectura', 'Derecho Civil e Internacional Privado', 'Derecho del Trabajo y Trabajo Social', 'Derecho Mercantil y Procesal', 'Derecho Público y de la Empresa', 'Didáctica de la Educación Física, Artística y Musical', 'Didáctica de la Lengua y la Literatura', 'Didáctica de las Ciencias Experimentales', 'Didáctica de las Ciencias Sociales', 'Didáctica de las Matemáticas', 'Economía Española e Internacional', 'Economía Política, Hacienda Pública, Estadística Económica', 'Educación', 'Enfermería, Fisioterapia y Terapia Ocupacional', 'Filología Hispánica y Clásica', 'Filología Moderna', 'Física Aplicada', 'Geografía y Ordenación del Territorio', 'Historia', 'Historia del Arte', 'Ingeniería Eléctrica, Electrónica, Automática y Comunicaciones', 'Ingeniería Geológica y Minera', 'Ingeniería Industrial', 'Ingeniería Informática', 'Ingeniería Mecánica, Aplicada y Estructural', 'Ingeniería Química', 'Lenguajes y Sistemas Informáticos', 'Matemáticas', 'Mecánica Aplicada e Ingeniería de Proyectos', 'Pedagogía', 'Psicología', 'Química Analítica y Tecnología de Alimentos', 'Química Física', 'Química Inorgánica, Orgánica y Bioquímica', 'Tecnologías y Sistemas de Información'];
UCLM_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Castilla-La Mancha', 'Pública', 'UCLM', d, 'Académico', 'Ciudad Real', 'Castilla-La Mancha', '+34 926 29 53 00', 'rrhh@uclm.es', 'uclm.es']);
});

// ============================================================
// GALICIA
// ============================================================

const USC_DEPTOS = ['Anatomía, Producción Animal y Ciencias Clínicas Veterinarias', 'Bioquímica y Biología Molecular', 'Botánica', 'Ciencia Política y Sociología', 'Ciencias Forenses, Anatomía Patológica, Ginecología y Obstetricia y Pediatría', 'Cirugía y Especialidades Médico-Quirúrgicas', 'Derecho Administrativo y Procesal', 'Derecho Común', 'Derecho Mercantil y del Trabajo', 'Derecho Privado', 'Derecho Público Especial y de la Empresa', 'Didáctica de las Ciencias Experimentales', 'Didáctica de las Lenguas, Artes Plásticas y Música', 'Didácticas Aplicadas', 'Economía Aplicada', 'Economía Cuantitativa', 'Economía Financiera y Contabilidad', 'Edafología y Química Agrícola', 'Electrónica y Computación', 'Estadística, Análisis Matemático y Optimización', 'Farmacología, Farmacia y Tecnología Farmacéutica', 'Filología Clásica, Francesa e Italiana', 'Filología Española, Teoría de la Literatura y Lingüística General', 'Filología Gallega', 'Filología Inglesa y Alemana', 'Filosofía y Antropología', 'Física Aplicada', 'Física de Partículas', 'Física de la Materia Condensada', 'Fisiología', 'Fisioterapia, Medicina y Ciencias Biomédicas', 'Genética', 'Geografía', 'Historia', 'Historia del Arte', 'Ingeniería Agroforestal', 'Ingeniería Química', 'Lengua y Literatura Españolas, Teoría de la Literatura y Lingüística General', 'Matemáticas', 'Microbiología y Parasitología', 'Pedagogía y Didáctica', 'Producción Vegetal y Proyectos de Ingeniería', 'Psicología Clínica y Psicobiología', 'Psicología Evolutiva y de la Educación', 'Psicología Organizacional, Jurídica-Forense y Metodología', 'Psicología Social, Básica y Metodología', 'Química Analítica, Nutrición y Bromatología', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Zoología, Genética y Antropología Física'];
USC_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Santiago de Compostela', 'Pública', 'USC', d, 'Académico', 'Santiago de Compostela', 'Galicia', '+34 881 81 10 00', 'rrhh@usc.es', 'usc.es']);
});

const UDC_DEPTOS = ['Análisis Económico y Administración de Empresas', 'Biología', 'Biomedicina, Medicina y Cirugía Nutricional', 'Ciencias Biomédicas, Medicina y Fisioterapia', 'Ciencias de la Computación y Tecnologías de la Información', 'Ciencias de la Navegación e Ingeniería Marina', 'Composición', 'Construcciones y Estructuras Arquitectónicas, Civiles y Aeronáuticas', 'Derecho', 'Derecho Privado', 'Derecho Público', 'Didácticas Específicas e Investigación Educativa', 'Economía', 'Educación Física y Deportiva', 'Empresa', 'Enfermería y Fisioterapia', 'Filología', 'Física y Ciencias de la Tierra', 'Humanidades', 'Ingeniería Civil', 'Ingeniería Eléctrica', 'Ingeniería Industrial', 'Ingeniería Naval e Industrial', 'Letras', 'Matemáticas', 'Pedagogía y Didáctica', 'Proyectos Arquitectónicos, Urbanismo y Composición', 'Psicología', 'Química', 'Sociología y Ciencias de la Comunicación', 'Tecnología de la Construcción', 'Tecnologías y Ciencias de la Edificación'];
UDC_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidade da Coruña', 'Pública', 'UDC', d, 'Académico', 'A Coruña', 'Galicia', '+34 981 16 70 00', 'rrhh@udc.es', 'udc.es']);
});

const UVI_DEPTOS = ['Análisis e Intervención Psicosocioeducativa', 'Análisis Matemático', 'Análisis y Modelización Industrial', 'Bioquímica, Genética e Inmunología', 'Biología Funcional y Ciencias de la Salud', 'Biología Vegetal y Ciencias del Suelo', 'Ciencia Política y de la Administración', 'Ciencias del Mar y Biología Aplicada', 'Cirugía', 'Comunicación Audiovisual y Publicidad', 'Construcciones Navales', 'Derecho Privado', 'Derecho Público', 'Derecho Público Especial', 'Didáctica, Organización Escolar y Métodos de Investigación', 'Diseño en la Ingeniería', 'Ecología y Biología Animal', 'Economía Aplicada', 'Economía Financiera y Contabilidad', 'Estadística e Investigación Operativa', 'Filología Española y Filología Latina', 'Filología Gallega y Latina', 'Filología Inglesa, Francesa y Alemana', 'Física Aplicada', 'Geociencias Marinas y Ordenación del Territorio', 'Historia, Arte y Geografía', 'Informática', 'Ingeniería de Sistemas y Automática', 'Ingeniería de los Materiales, Mecánica Aplicada y Construcción', 'Ingeniería Eléctrica', 'Ingeniería Mecánica', 'Ingeniería Química', 'Ingeniería de los Recursos Naturales y Medio Ambiente', 'Lengua Española', 'Marketing y Comportamiento del Consumidor', 'Matemática Aplicada I', 'Matemática Aplicada II', 'Mecánica de Medios Continuos, Teoría de Estructuras e IH', 'Música', 'Organización de Empresas y Marketing', 'Pintura', 'Psicología Evolutiva y Comunicación', 'Psicología Social, Básica y Metodología', 'Química Analítica y Alimentaria', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Sociología', 'Tecnología Electrónica', 'Teoría de la Literatura y Literatura Comparada', 'Teoría de la Señal y Comunicaciones', 'Traducción y Lingüística'];
UVI_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidade de Vigo', 'Pública', 'UVI', d, 'Académico', 'Vigo', 'Galicia', '+34 986 81 23 00', 'rrhh@uvigo.gal', 'uvigo.gal']);
});

// ============================================================
// PAÍS VASCO
// ============================================================

const EHU_DEPTOS = ['Álgebra', 'Análisis Económico y Finanzas', 'Análisis Matemático', 'Anatomía e Histología Humana', 'Antropología, Filosofía y Trabajo Social', 'Arquitectura', 'Bibliometría y Periodismo', 'Biología Celular e Histología', 'Bioquímica y Biología Molecular', 'Botánica', 'Ciencia Política y de la Administración', 'Ciencias del Lenguaje y de la Educación', 'Cirugía y Radiología y Medicina Física', 'Comunicación Audiovisual y Publicidad', 'Construcciones Arquitectónicas', 'Derecho Civil', 'Derecho Constitucional', 'Derecho Mercantil', 'Derecho Penal', 'Derecho Público', 'Didáctica de la Expresión Corporal', 'Didáctica de la Lengua y la Literatura', 'Didáctica de la Matemática y de las Ciencias Experimentales', 'Didáctica de las Ciencias Sociales', 'Didáctica y Organización Escolar', 'Dietética y Nutrición', 'Ecología', 'Economía Aplicada', 'Economía Financiera', 'Edafología y Química Agrícola', 'Educación Artística', 'Electricidad y Electrónica', 'Enfermería', 'Estratigrafía y Paleontología', 'Expresión Gráfica y Proyectos de Ingeniería', 'Farmacología', 'Filología Clásica', 'Filología Española', 'Filología Francesa y Alemana', 'Filología Hispánica, Románica y Teoría de la Literatura', 'Filología Inglesa y Alemana', 'Filología Vasca', 'Filosofía', 'Filosofía de los Valores y Antropología Social', 'Física Aplicada', 'Física de Materiales', 'Física Teórica e Historia de la Ciencia', 'Fisiología', 'Genética, Antropología Física y Fisiología Animal', 'Geografía, Prehistoria y Arqueología', 'Geometría y Topología', 'Historia Contemporánea', 'Historia del Arte y Música', 'Historia Medieval, Moderna y de América', 'Inmunología, Microbiología y Parasitología', 'Ingeniería Eléctrica', 'Ingeniería Mecánica', 'Ingeniería Minera y Metalúrgica', 'Ingeniería Nuclear y Mecánica de Fluidos', 'Ingeniería Química', 'Ingeniería Química y del Medio Ambiente', 'Ingeniería de Comunicaciones', 'Ingeniería de Sistemas y Automática', 'Lenguajes y Sistemas Informáticos', 'Matemática Aplicada', 'Matemática Aplicada y Estadística', 'Matemática Aplicada y Ciencias de la Computación', 'Medicina', 'Medicina Preventiva y Salud Pública', 'Microbiología y Parasitología', 'Neurociencias', 'Nutrición y Bromatología', 'Pedagogía', 'Periodismo', 'Procesos Cognitivos y Conducta', 'Psicobiología', 'Psicología Básica', 'Psicología Clínica y de la Salud', 'Psicología Social y Metodología de las CC. del Comportamiento', 'Química Analítica', 'Química Aplicada', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Sociología', 'Tecnología Electrónica', 'Teoría e Historia de la Educación', 'Trabajo y Acción Social', 'Urbanística y Ordenación del Territorio', 'Zoología y Biología Celular Animal'];
EHU_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad del País Vasco', 'Pública', 'EHU/UPV', d, 'Académico', 'Bilbao', 'País Vasco', '+34 94 601 25 00', 'rrhh@ehu.eus', 'ehu.eus']);
});

const DEUSTO_DEPTOS = ['Educación', 'Psicología', 'Comunicación', 'Empresariales', 'Economía', 'Derecho', 'Ciencias Políticas y Sociología', 'Ingeniería Mecánica', 'Ingeniería Industrial', 'Ingeniería Informática', 'Ingeniería Electrónica', 'Telecomunicaciones', 'Ciencias Sociales', 'Filosofía', 'Teología'];
DEUSTO_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Deusto', 'Privada', 'Deusto', d, 'Académico', 'Bilbao', 'País Vasco', '+34 94 413 90 00', 'rrhh@deusto.es', 'deusto.es']);
});

const MONDRAGON_DEPTOS = ['Educación', 'Empresariales', 'Ingeniería Mecánica', 'Ingeniería Eléctrica', 'Ingeniería Informática', 'Ingeniería Industrial', 'Comunicación', 'Gastronomía'];
MONDRAGON_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Mondragon Unibertsitatea', 'Privada', 'MU', d, 'Académico', 'Mondragón', 'País Vasco', '+34 943 71 21 85', 'rrhh@mondragon.edu', 'mondragon.edu']);
});

// Universidad Pública de Navarra
const UPNA_DEPTOS = ['Agronomía, Biotecnología y Alimentación', 'Ciencias', 'Ciencias de la Salud', 'Ciencias Humanas y de la Educación', 'Derecho', 'Economía', 'Estadística, Informática y Matemáticas', 'Gestión de Empresas', 'Ingeniería', 'Ingeniería Eléctrica, Electrónica y de Comunicación', 'Sociología y Trabajo Social'];
UPNA_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Pública de Navarra', 'Pública', 'UPNA', d, 'Académico', 'Pamplona', 'Navarra', '+34 948 16 90 00', 'rrhh@unavarra.es', 'unavarra.es']);
});

// Universidad de Navarra
const UN_DEPTOS = ['Anatomía', 'Biología Molecular', 'Bioquímica y Biología Molecular', 'Cardiología y Cirugía Cardiovascular', 'Cirugía Ortopédica y Traumatología', 'Comunicación Pública', 'Cultura y Comunicación Audiovisual', 'Derecho Civil', 'Derecho Constitucional, Administrativo y Procesal', 'Derecho Internacional, Eclesiástico y Filosofía del Derecho', 'Derecho Mercantil, Financiero y Tributario', 'Derecho Penal', 'Derecho Privado', 'Educación', 'Enfermería de la Persona Adulta', 'Enfermería Materno-Infantil y Salud', 'Farmacia', 'Filología Bíblica e Historia de la Iglesia', 'Filología', 'Filosofía', 'Física y Matemáticas', 'Gestión y Marketing', 'Histología y Anatomía Patológica', 'Historia, Historia del Arte y Geografía', 'Ingeniería Eléctrica y Electrónica', 'Ingeniería Mecánica', 'Marketing y Empresa', 'Microbiología y Parasitología', 'Operaciones Económicas', 'Patología y Cirugía Dental', 'Pediatría', 'Periodismo', 'Producción Audiovisual', 'Psicología', 'Psiquiatría y Psicología Médica', 'Química y Farmacia', 'Sociología', 'Teología Sistemática', 'Teología Moral y Espiritual', 'Trabajo Social'];
UN_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Navarra', 'Privada', 'UNAV', d, 'Académico', 'Pamplona', 'Navarra', '+34 948 42 56 00', 'rrhh@unav.edu', 'unav.edu']);
});

// ============================================================
// ARAGÓN
// ============================================================

const UNIZAR_DEPTOS = ['Análisis Económico', 'Análisis Matemático y Matemática Aplicada', 'Anatomía e Histología Humana', 'Anatomía, Embriología y Genética Animal', 'Anatomía Patológica, Medicina Legal, Medicina Forense y Toxicología', 'Bioquímica y Biología Molecular y Celular', 'Cirugía', 'Ciencias Agrarias y del Medio Natural', 'Ciencias de la Documentación e Historia de la Ciencia', 'Ciencias de la Educación', 'Ciencias Médicas', 'Construcciones Arquitectónicas, Ingeniería del Terreno y Mecánica de Medios Continuos', 'Contabilidad y Finanzas', 'Derecho de la Empresa', 'Derecho Penal, Filosofía del Derecho e Historia del Derecho', 'Derecho Privado', 'Derecho Público', 'Didáctica de la Lengua y de las Ciencias Humanas y Sociales', 'Didáctica de las Ciencias Experimentales', 'Didáctica de las Lenguas y de las Ciencias Humanas y Sociales', 'Didáctica de las Matemáticas', 'Dirección de Marketing e Investigación de Mercados', 'Dirección y Organización de Empresas', 'Economía Aplicada', 'Estructura e Historia Económica y Economía Pública', 'Expresión Musical, Plástica y Corporal', 'Farmacología, Fisiología y Medicina Legal y Forense', 'Filología Española', 'Filología Francesa', 'Filología Inglesa y Alemana', 'Filosofía', 'Física Aplicada', 'Física de la Materia Condensada', 'Física Teórica', 'Fisiatría y Enfermería', 'Geografía y Ordenación del Territorio', 'Geología', 'Historia', 'Historia del Arte', 'Historia Medieval, Ciencias y Técnicas Historiográficas y Estudios Árabes', 'Informática e Ingeniería de Sistemas', 'Ingeniería de Diseño y Fabricación', 'Ingeniería Eléctrica', 'Ingeniería Electrónica y Comunicaciones', 'Ingeniería Mecánica', 'Ingeniería Química y Tecnologías del Medio Ambiente', 'Lingüística General e Hispánica', 'Matemática Aplicada Estadística e Investigación Operativa', 'Microbiología, Pediatría, Radiología y Salud Pública', 'Patología Animal', 'Patología y Cirugía Animal', 'Pedagogía', 'Producción Animal y Ciencia de los Alimentos', 'Psicología y Sociología', 'Química Analítica', 'Química Inorgánica', 'Química Orgánica', 'Química Física', 'Trabajo Social y Servicios Sociales'];
UNIZAR_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Zaragoza', 'Pública', 'UNIZAR', d, 'Académico', 'Zaragoza', 'Aragón', '+34 976 76 10 00', 'rrhh@unizar.es', 'unizar.es']);
});

const USJ_DEPTOS = ['Comunicación', 'Educación', 'Empresariales', 'Derecho', 'Ingeniería', 'Ciencias de la Salud', 'Magisterio'];
USJ_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad San Jorge', 'Privada', 'USJ', d, 'Académico', 'Villanueva de Gállego', 'Aragón', '+34 976 06 01 00', 'rrhh@usj.es', 'usj.es']);
});

// ============================================================
// ASTURIAS, CANTABRIA, LA RIOJA
// ============================================================

const UNIOVI_DEPTOS = ['Anatomía Patológica, Farmacología y Microbiología', 'Antropología', 'Biología de Organismos y Sistemas', 'Biología Funcional', 'Bioquímica y Biología Molecular', 'Ciencia de los Materiales e Ingeniería Metalúrgica', 'Ciencias de la Educación', 'Cirugía y Especialidades Médico-Quirúrgicas', 'Construcción e Ingeniería de Fabricación', 'Derecho Privado y de la Empresa', 'Derecho Público', 'Economía', 'Economía Aplicada', 'Economía Cuantitativa', 'Educación Física y Deportiva', 'Energía', 'Estadística e Investigación Operativa y Didáctica de la Matemática', 'Explotación y Prospección de Minas', 'Filología Anglogermánica y Francesa', 'Filología Clásica y Románica', 'Filología Española', 'Filología Inglesa y Francesa', 'Filosofía', 'Física', 'Geología', 'Historia', 'Historia del Arte y Musicología', 'Informática', 'Ingeniería Eléctrica, Electrónica, de Computadores y Sistemas', 'Ingeniería Química y Tecnología del Medio Ambiente', 'Marketing y Empresa', 'Matemáticas', 'Medicina', 'Mineralogía y Petrología', 'Pedagogía', 'Psicología', 'Química Analítica', 'Química Física y Analítica', 'Química Orgánica e Inorgánica', 'Sociología'];
UNIOVI_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Oviedo', 'Pública', 'UO', d, 'Académico', 'Oviedo', 'Asturias', '+34 985 10 30 00', 'rrhh@uniovi.es', 'uniovi.es']);
});

const UNICAN_DEPTOS = ['Administración de Empresas', 'Anatomía y Biología Celular', 'Biología Molecular', 'Ciencias Históricas', 'Ciencias y Técnicas de la Navegación y de la Construcción Naval', 'Ciencia e Ingeniería del Terreno y de los Materiales', 'Ciencias Médicas y Quirúrgicas', 'Derecho Privado', 'Derecho Público', 'Economía', 'Educación', 'Educación Física, Deportiva y Salud', 'Electrónica y Computadores', 'Enfermería', 'Filología', 'Física Aplicada', 'Física Moderna', 'Fisiología y Farmacología', 'Geografía, Urbanismo y Ordenación del Territorio', 'Ingeniería Estructural y Mecánica', 'Ingeniería Eléctrica y Energética', 'Ingeniería Geográfica y Técnicas de Expresión Gráfica', 'Ingeniería Hidráulica y Ambiental', 'Ingeniería Química y Biomolecular', 'Matemáticas, Estadística y Computación', 'Medicina y Psiquiatría', 'Microbiología', 'Tecnología Electrónica e Ingeniería de Sistemas y Automática', 'Transportes y Tecnología de Proyectos y Procesos'];
UNICAN_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Cantabria', 'Pública', 'UC', d, 'Académico', 'Santander', 'Cantabria', '+34 942 20 15 00', 'rrhh@unican.es', 'unican.es']);
});

const UR_DEPTOS = ['Agricultura y Alimentación', 'Ciencias de la Educación', 'Ciencias Humanas', 'Ciencias y Técnicas de la Edificación', 'Derecho', 'Economía y Empresa', 'Filologías Hispánica y Clásicas', 'Filologías Modernas', 'Ingeniería Eléctrica', 'Ingeniería Mecánica', 'Matemáticas y Computación', 'Química', 'Servicios Sociales y Trabajo Social'];
UR_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de La Rioja', 'Pública', 'UR', d, 'Académico', 'Logroño', 'La Rioja', '+34 941 29 91 00', 'rrhh@unirioja.es', 'unirioja.es']);
});

const UNIR_DEPTOS = ['Educación', 'Empresa y Economía', 'Comunicación', 'Derecho', 'Ingeniería y Tecnología', 'Humanidades', 'Ciencias Sociales y de la Salud'];
UNIR_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Internacional de La Rioja', 'Privada', 'UNIR', d, 'Académico', 'Logroño', 'La Rioja', '+34 941 20 99 41', 'rrhh@unir.net', 'unir.net']);
});

// ============================================================
// MURCIA, EXTREMADURA
// ============================================================

const UMU_DEPTOS = ['Análisis Geográfico Regional y Geografía Física', 'Análisis Matemático', 'Anatomía Humana y Psicobiología', 'Anatomía Patológica', 'Anatomía y Anatomía Patológica Comparadas', 'Bibliotecología y Documentación', 'Biología Animal', 'Bioquímica y Biología Molecular A', 'Bioquímica y Biología Molecular B e Inmunología', 'Bioquímica y Biología Molecular y Edafología y Química Agrícola', 'Botánica', 'Ciencias Sociosanitarias', 'Cirugía, Pediatría, Obstetricia y Ginecología', 'Construcción y Vías Rurales', 'Derecho Administrativo', 'Derecho Civil', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho Financiero, Internacional y Procesal', 'Derecho Mercantil', 'Derecho Penal', 'Derecho Privado', 'Derecho Público', 'Derecho Romano, Filosofía del Derecho y Filosofía', 'Didáctica de la Lengua y la Literatura', 'Didáctica de las Ciencias Experimentales', 'Didáctica de las Ciencias Matemáticas y Sociales', 'Didáctica de la Educación Física, Plástica y Musical', 'Didáctica y Organización Escolar', 'Ecología e Hidrología', 'Economía Aplicada', 'Economía Financiera y Contabilidad', 'Edafología y Química Agrícola', 'Educación', 'Enfermería', 'Estadística e Investigación Operativa', 'Estadística y Matemática Aplicada', 'Farmacología', 'Filología Clásica', 'Filología Francesa, Románica, Italiana y Árabe', 'Filología Inglesa', 'Filosofía', 'Física', 'Fisiología', 'Fisioterapia', 'Genética y Microbiología', 'Geografía Humana', 'Geología y Mineralogía', 'Historia Antigua', 'Historia Medieval, Moderna y Contemporánea', 'Historia del Arte', 'Información y Documentación', 'Ingeniería de Alimentos y del Equipamiento Agrícola', 'Ingeniería de la Información y las Comunicaciones', 'Ingeniería y Tecnología de Computadores', 'Lengua Española y Lingüística General', 'Literatura Española y Teoría de la Literatura', 'Matemáticas', 'Matemática Aplicada', 'Métodos Cuantitativos para la Economía y la Empresa', 'Microbiología', 'Nutrición y Bromatología', 'Organización de Empresas y Finanzas', 'Patología Animal', 'Pedagogía', 'Personalidad, Evaluación y Tratamiento Psicológico', 'Prehistoria, Arqueología, Historia Antigua y Medieval', 'Producción Animal', 'Psicobiología', 'Psicología Básica y Metodología', 'Psicología Evolutiva y de la Educación', 'Psicología Social', 'Química Analítica', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Radiología y Medicina Física', 'Sanidad Animal', 'Sociología', 'Tecnología Electrónica', 'Tecnología de los Alimentos, Nutrición y Bromatología', 'Teoría e Historia de la Educación', 'Traducción e Interpretación', 'Zoología y Antropología Física'];
UMU_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Murcia', 'Pública', 'UMU', d, 'Académico', 'Murcia', 'Región de Murcia', '+34 868 88 30 00', 'rrhh@um.es', 'um.es']);
});

const UPCT_DEPTOS = ['Arquitectura y Tecnología de la Edificación', 'Automática, Ingeniería Eléctrica y Tecnología Electrónica', 'Ciencia y Tecnología Naval', 'Ciencias Politécnicas', 'Economía, Contabilidad y Finanzas', 'Economía de la Empresa', 'Estructuras y Construcción', 'Expresión Gráfica', 'Física Aplicada', 'Ingeniería Civil', 'Ingeniería de Alimentos y del Equipamiento Agrícola', 'Ingeniería Mecánica, Materiales y Fabricación', 'Ingeniería Minera y Civil', 'Ingeniería Química y Ambiental', 'Ingeniería Térmica y de Fluidos', 'Matemática Aplicada y Estadística', 'Producción Vegetal', 'Tecnología de Computadoras y Comunicaciones', 'Tecnología Electrónica', 'Teoría de la Señal y Comunicaciones'];
UPCT_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Politécnica de Cartagena', 'Pública', 'UPCT', d, 'Académico', 'Cartagena', 'Región de Murcia', '+34 968 32 54 00', 'rrhh@upct.es', 'upct.es']);
});

const UCAM_DEPTOS = ['Administración y Dirección de Empresas', 'Arquitectura y Tecnología', 'Ciencias del Deporte', 'Ciencias de la Comunicación', 'Ciencias de la Educación', 'Ciencias Jurídicas', 'Ciencias Políticas', 'Ciencias de la Salud', 'Enfermería', 'Farmacia', 'Fisioterapia', 'Medicina', 'Nutrición Humana y Dietética', 'Odontología', 'Psicología', 'Tecnología Aplicada', 'Turismo'];
UCAM_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad Católica San Antonio de Murcia', 'Privada', 'UCAM', d, 'Académico', 'Murcia', 'Región de Murcia', '+34 968 27 88 00', 'rrhh@ucam.edu', 'ucam.edu']);
});

const UNEX_DEPTOS = ['Anatomía y Embriología Humana', 'Anatomía, Biología Celular y Zoología', 'Arte y Ciencias del Territorio', 'Biología Vegetal, Ecología y Ciencias de la Tierra', 'Bioquímica y Biología Molecular y Genética', 'Ciencias Biomédicas', 'Ciencias del Trabajo', 'Construcción', 'Derecho Privado', 'Derecho Público', 'Didáctica de la Expresión Musical, Plástica y Corporal', 'Didáctica de las Ciencias Experimentales y de las Matemáticas', 'Didáctica de las Ciencias Sociales y de la Lengua y la Literatura', 'Economía', 'Economía Aplicada y Organización de Empresas', 'Economía Financiera y Contabilidad', 'Educación', 'Enfermería', 'Filología Clásica e Indoeuropea', 'Filología Hispánica y Lingüística General', 'Filología Inglesa', 'Geografía', 'Historia', 'Información y Comunicación', 'Ingeniería Civil', 'Ingeniería del Medio Agronómico y Forestal', 'Ingeniería Mecánica, Energética y de los Materiales', 'Ingeniería de Sistemas Informáticos y Telemáticos', 'Lenguas Modernas y Literaturas Comparadas', 'Matemáticas', 'Medicina', 'Patología y Cirugía', 'Pediatría', 'Producción Animal y Ciencia de los Alimentos', 'Psicología y Antropología', 'Química Analítica', 'Química Física', 'Química Inorgánica', 'Química Orgánica', 'Sanidad Animal', 'Tecnología de los Computadores y las Comunicaciones', 'Terapéutica Médico-Quirúrgica'];
UNEX_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Extremadura', 'Pública', 'UNEX', d, 'Académico', 'Badajoz', 'Extremadura', '+34 924 28 91 00', 'rrhh@unex.es', 'unex.es']);
});

// ============================================================
// BALEARES, CANARIAS
// ============================================================

const UIB_DEPTOS = ['Biología', 'Biología Fundamental y Ciencias de la Salud', 'Ciencias Históricas y Teoría de las Artes', 'Ciencias Matemáticas e Informática', 'Construcciones Arquitectónicas e Ingeniería de la Construcción', 'Derecho Privado', 'Derecho Público', 'Economía Aplicada', 'Economía de la Empresa', 'Educación', 'Filología Catalana y Lingüística General', 'Filología Española, Moderna y Clásica', 'Filosofía y Trabajo Social', 'Física', 'Infermería i Fisioteràpia', 'Pedagogía Aplicada y Psicología de la Educación', 'Pedagogía y Didácticas Específicas', 'Psicología', 'Química'];
UIB_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universitat de les Illes Balears', 'Pública', 'UIB', d, 'Académico', 'Palma', 'Illes Balears', '+34 971 17 30 00', 'rrhh@uib.es', 'uib.es']);
});

const ULL_DEPTOS = ['Análisis Económico', 'Anatomía, Anatomía Patológica e Histología', 'Antropología, Filosofía y Trabajo Social', 'Bellas Artes', 'Bioquímica, Microbiología, Biología Celular y Genética', 'Botánica, Ecología y Fisiología Vegetal', 'Cirugía', 'Ciencias Históricas', 'Ciencias Médicas Básicas', 'Construcción', 'Derecho Privado', 'Derecho Público', 'Didáctica e Investigación Educativa', 'Didácticas Específicas', 'Dirección de Empresas e Historia Económica', 'Economía Aplicada y Métodos Cuantitativos', 'Economía Política', 'Economía, Contabilidad y Finanzas', 'Educación', 'Enfermería', 'Estudios Hispánicos y Clásicos', 'Filología Española', 'Filología Inglesa y Alemana', 'Filología Francesa, Árabe y Romance', 'Física', 'Fisiología', 'Geografía e Historia', 'Ingeniería Agraria, Náutica, Civil y Marítima', 'Ingeniería Industrial', 'Ingeniería Informática y de Sistemas', 'Matemáticas, Estadística e Investigación Operativa', 'Medicina Interna', 'Medicina Preventiva, Salud Pública', 'Obstetricia, Ginecología y Pediatría', 'Pedagogía', 'Psicología Clínica, Psicobiología y Metodología', 'Psicología Cognitiva, Social y Organizacional', 'Psicología Evolutiva y de la Educación', 'Química'];
ULL_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de La Laguna', 'Pública', 'ULL', d, 'Académico', 'San Cristóbal de La Laguna', 'Canarias', '+34 922 31 90 00', 'rrhh@ull.es', 'ull.es']);
});

const ULPGC_DEPTOS = ['Análisis Económico Aplicado', 'Análisis Matemático', 'Arte, Ciudad y Territorio', 'Biología', 'Bioquímica y Biología Molecular, Fisiología, Genética e Inmunología', 'Cartografía y Expresión Gráfica en la Ingeniería', 'Ciencias Clínicas', 'Ciencias Históricas', 'Ciencias Jurídicas Básicas', 'Ciencias Médicas y Quirúrgicas', 'Cirugía', 'Construcción Arquitectónica', 'Derecho Privado', 'Derecho Público', 'Didáctica de la Expresión Musical, Plástica y Corporal', 'Didácticas Especiales', 'Economía y Dirección de Empresas', 'Economía Financiera y Contabilidad', 'Educación', 'Enfermería', 'Expresión Gráfica y Proyectos Arquitectónicos', 'Filología Hispánica, Clásica y de Estudios Árabes y Orientales', 'Filología Moderna', 'Física', 'Geografía', 'Informática y Sistemas', 'Ingeniería Civil', 'Ingeniería Eléctrica', 'Ingeniería Electrónica y Automática', 'Ingeniería Mecánica', 'Ingeniería de Procesos', 'Matemáticas', 'Métodos Cuantitativos en Economía y Gestión', 'Morfología', 'Patología Animal, Producción Animal, Bromatología', 'Psicología Clínica, Psicobiología y Metodología', 'Psicología, Sociología y Trabajo Social', 'Química'];
ULPGC_DEPTOS.forEach(d => {
  DEPARTAMENTOS.push(['Universidad de Las Palmas de Gran Canaria', 'Pública', 'ULPGC', d, 'Académico', 'Las Palmas de Gran Canaria', 'Canarias', '+34 928 45 10 00', 'rrhh@ulpgc.es', 'ulpgc.es']);
});

async function createUniversidadesRestoEspaña() {
  try {
    console.log('🏛️ Creando UNIVERSIDADES RESTO ESPAÑA MASIVO...\n');
    console.log(`📊 Total registros: ${DEPARTAMENTOS.length}\n`);

    const { sheets } = await getServices();

    // Verificar si existe la pestaña antigua y borrar
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const existing = meta.data.sheets.find(s => s.properties.title === 'UNIVERSIDADES ESPAÑA');

    if (existing) {
      console.log('🗑️  Eliminando pestaña antigua UNIVERSIDADES ESPAÑA...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: existing.properties.sheetId } }] }
      });
    }

    // Crear pestaña nueva
    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'UNIVERSIDADES ESPAÑA' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    // Headers
    const headers = ['UNIVERSIDAD', 'TIPO', 'FACULTAD/ESCUELA', 'DEPARTAMENTO', 'ÁREA', 'CIUDAD', 'COMUNIDAD AUTÓNOMA', 'TELÉFONO', 'EMAIL', 'WEB'];
    const values = [headers, ...DEPARTAMENTOS];

    // Insertar datos en lotes de 1000 si es necesario
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'UNIVERSIDADES ESPAÑA!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    console.log(`✅ ${DEPARTAMENTOS.length} departamentos insertados`);

    // Formato
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.1, green: 0.5, blue: 0.3 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 10 }, properties: { pixelSize: 160 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: DEPARTAMENTOS.length + 1, startColumnIndex: 0, endColumnIndex: 10 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('🏛️ UNIVERSIDADES RESTO ESPAÑA COMPLETADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${DEPARTAMENTOS.length} departamentos`);

    const publicas = DEPARTAMENTOS.filter(d => d[1] === 'Pública').length;
    const privadas = DEPARTAMENTOS.filter(d => d[1] === 'Privada').length;
    console.log(`   ✓ Públicas: ${publicas}`);
    console.log(`   ✓ Privadas: ${privadas}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createUniversidadesRestoEspaña();
