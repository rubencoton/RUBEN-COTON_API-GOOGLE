const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// ============================================================
// MADRID UNIVERSIDADES MASIVO - Todas las áreas, públicas + privadas
// Formato: [UNIVERSIDAD, TIPO, FACULTAD/ESCUELA, DEPARTAMENTO, ÁREA, TELÉFONO, EMAIL, WEB]
// ============================================================

const DEPARTAMENTOS = [
  // ========== UNIVERSIDAD POLITÉCNICA DE MADRID (UPM) ==========
  // Email patrón: secretaria.[escuela]@upm.es / [dpto]@[escuela].upm.es
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Arquitectura', 'Composición Arquitectónica', 'Arquitectura', '+34 91 336 65 00', 'secretaria.arquitectura@upm.es', 'etsamadrid.aq.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Arquitectura', 'Construcción y Tecnología Arquitectónicas', 'Arquitectura', '+34 91 336 65 00', 'secretaria.arquitectura@upm.es', 'etsamadrid.aq.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Arquitectura', 'Estructuras y Física de Edificación', 'Arquitectura', '+34 91 336 65 00', 'secretaria.arquitectura@upm.es', 'etsamadrid.aq.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Arquitectura', 'Ideación Gráfica Arquitectónica', 'Arquitectura', '+34 91 336 65 00', 'secretaria.arquitectura@upm.es', 'etsamadrid.aq.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Arquitectura', 'Proyectos Arquitectónicos', 'Arquitectura', '+34 91 336 65 00', 'secretaria.arquitectura@upm.es', 'etsamadrid.aq.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Arquitectura', 'Urbanística y Ordenación del Territorio', 'Arquitectura', '+34 91 336 65 00', 'secretaria.arquitectura@upm.es', 'etsamadrid.aq.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Edificación', 'Construcciones Arquitectónicas y su Control', 'Arquitectura Técnica', '+34 91 336 76 00', 'secretaria.edificacion@upm.es', 'etsem.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Edificación', 'Tecnología de la Edificación', 'Arquitectura Técnica', '+34 91 336 76 00', 'secretaria.edificacion@upm.es', 'etsem.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Aeronáutica', 'Aeronaves y Vehículos Espaciales', 'Ingeniería Aeroespacial', '+34 91 336 63 00', 'secretaria.aeronauticos@upm.es', 'etsiae.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Aeronáutica', 'Física Aplicada Ingenierías Aeronáutica y Naval', 'Ingeniería Aeroespacial', '+34 91 336 63 00', 'secretaria.aeronauticos@upm.es', 'etsiae.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Aeronáutica', 'Matemática Aplicada Ingeniería Aeroespacial', 'Ingeniería Aeroespacial', '+34 91 336 63 00', 'secretaria.aeronauticos@upm.es', 'etsiae.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Aeronáutica', 'Mecánica de Fluidos y Propulsión Aeroespacial', 'Ingeniería Aeroespacial', '+34 91 336 63 00', 'secretaria.aeronauticos@upm.es', 'etsiae.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Aeronáutica', 'Sistemas Aeroespaciales, Transporte Aéreo y Aeropuertos', 'Ingeniería Aeroespacial', '+34 91 336 63 00', 'secretaria.aeronauticos@upm.es', 'etsiae.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Agronómica', 'Biotecnología-Biología Vegetal', 'Ingeniería Agronómica', '+34 91 067 19 00', 'secretaria.etsiaab@upm.es', 'etsiaab.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Agronómica', 'Economía Agraria, Estadística y Gestión de Empresas', 'Ingeniería Agronómica', '+34 91 067 19 00', 'secretaria.etsiaab@upm.es', 'etsiaab.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Agronómica', 'Ingeniería Agroforestal', 'Ingeniería Agronómica', '+34 91 067 19 00', 'secretaria.etsiaab@upm.es', 'etsiaab.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Agronómica', 'Producción Agraria', 'Ingeniería Agronómica', '+34 91 067 19 00', 'secretaria.etsiaab@upm.es', 'etsiaab.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Agronómica', 'Química y Tecnología de Alimentos', 'Ingeniería Agronómica', '+34 91 067 19 00', 'secretaria.etsiaab@upm.es', 'etsiaab.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Caminos', 'Ingeniería Civil: Construcción', 'Ingeniería Civil', '+34 91 336 67 00', 'secretaria.caminos@upm.es', 'caminos.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Caminos', 'Ingeniería Civil: Hidráulica, Energía y Medio Ambiente', 'Ingeniería Civil', '+34 91 336 67 00', 'secretaria.caminos@upm.es', 'caminos.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Caminos', 'Ingeniería del Transporte, Territorio y Urbanismo', 'Ingeniería Civil', '+34 91 336 67 00', 'secretaria.caminos@upm.es', 'caminos.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Caminos', 'Ingeniería y Morfología del Terreno', 'Ingeniería Civil', '+34 91 336 67 00', 'secretaria.caminos@upm.es', 'caminos.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Caminos', 'Mecánica de Medios Continuos y Teoría de Estructuras', 'Ingeniería Civil', '+34 91 336 67 00', 'secretaria.caminos@upm.es', 'caminos.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Industriales', 'Automática, Ingeniería Eléctrica y Electrónica', 'Ingeniería Industrial', '+34 91 067 70 00', 'secretaria.industriales@upm.es', 'etsii.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Industriales', 'Física Aplicada e Ingeniería de Materiales', 'Ingeniería Industrial', '+34 91 067 70 00', 'secretaria.industriales@upm.es', 'etsii.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Industriales', 'Ingeniería Energética', 'Ingeniería Industrial', '+34 91 067 70 00', 'secretaria.industriales@upm.es', 'etsii.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Industriales', 'Ingeniería Mecánica', 'Ingeniería Industrial', '+34 91 067 70 00', 'secretaria.industriales@upm.es', 'etsii.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Industriales', 'Ingeniería Química Industrial y del Medio Ambiente', 'Ingeniería Industrial', '+34 91 067 70 00', 'secretaria.industriales@upm.es', 'etsii.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Informáticos', 'Arquitectura y Tecnología de Sistemas Informáticos', 'Ingeniería Informática', '+34 91 067 38 00', 'secretaria.fi@upm.es', 'fi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Informáticos', 'Inteligencia Artificial', 'Ingeniería Informática', '+34 91 067 38 00', 'secretaria.fi@upm.es', 'fi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Informáticos', 'Lenguajes y Sistemas Informáticos e Ingeniería de Software', 'Ingeniería Informática', '+34 91 067 38 00', 'secretaria.fi@upm.es', 'fi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Informáticos', 'Matemática Aplicada Tecnologías Información', 'Ingeniería Informática', '+34 91 067 38 00', 'secretaria.fi@upm.es', 'fi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Informáticos', 'Sistemas Informáticos', 'Ingeniería Informática', '+34 91 067 38 00', 'secretaria.fi@upm.es', 'fi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Minas', 'Energía y Combustibles', 'Ingeniería de Minas', '+34 91 336 70 16', 'secretaria.minas@upm.es', 'minasyenergia.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Minas', 'Geología y Geoquímica Aplicadas', 'Ingeniería de Minas', '+34 91 336 70 16', 'secretaria.minas@upm.es', 'minasyenergia.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Minas', 'Ingeniería Geológica y Minera', 'Ingeniería de Minas', '+34 91 336 70 16', 'secretaria.minas@upm.es', 'minasyenergia.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Montes', 'Ingeniería y Gestión Forestal y Ambiental', 'Ingeniería Forestal', '+34 91 336 76 87', 'secretaria.montes@upm.es', 'montesymedionatural.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Montes', 'Sistemas y Recursos Naturales', 'Ingeniería Forestal', '+34 91 336 76 87', 'secretaria.montes@upm.es', 'montesymedionatural.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Telecomunicación', 'Electrónica Física, Ingeniería Eléctrica y Física Aplicada', 'Telecomunicación', '+34 91 549 57 00', 'secretaria.telecomunicacion@upm.es', 'etsit.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Telecomunicación', 'Ingeniería de Sistemas Telemáticos', 'Telecomunicación', '+34 91 549 57 00', 'secretaria.telecomunicacion@upm.es', 'etsit.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Telecomunicación', 'Ingeniería Electrónica', 'Telecomunicación', '+34 91 549 57 00', 'secretaria.telecomunicacion@upm.es', 'etsit.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Telecomunicación', 'Señales, Sistemas y Radiocomunicaciones', 'Telecomunicación', '+34 91 549 57 00', 'secretaria.telecomunicacion@upm.es', 'etsit.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Telecomunicación', 'Tecnología Fotónica y Bioingeniería', 'Telecomunicación', '+34 91 549 57 00', 'secretaria.telecomunicacion@upm.es', 'etsit.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Sistemas Informáticos', 'Sistemas Informáticos', 'Ingeniería Informática', '+34 91 067 35 24', 'secretaria.etsisi@upm.es', 'etsisi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Sistemas Telecomunicación', 'Ingeniería Audiovisual y Comunicaciones', 'Telecomunicación', '+34 91 067 51 00', 'secretaria.etsist@upm.es', 'etsist.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Sistemas Telecomunicación', 'Ingeniería Telemática y Electrónica', 'Telecomunicación', '+34 91 067 51 00', 'secretaria.etsist@upm.es', 'etsist.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Topografía', 'Ingeniería Topográfica y Cartografía', 'Topografía', '+34 91 067 91 00', 'secretaria.topografia@upm.es', 'topografia.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Diseño', 'Ingeniería Mecánica, Química y Diseño Industrial', 'Diseño Industrial', '+34 91 067 14 65', 'secretaria.eteid@upm.es', 'etsidi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'ETS Ing. Diseño', 'Ingeniería Eléctrica, Electrónica, Automática', 'Diseño Industrial', '+34 91 067 14 65', 'secretaria.eteid@upm.es', 'etsidi.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'Facultad CC Actividad Física', 'Ciencias Sociales del Deporte', 'Deporte', '+34 91 067 31 00', 'secretaria.inef@upm.es', 'inef.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'Facultad CC Actividad Física', 'Deportes', 'Deporte', '+34 91 067 31 00', 'secretaria.inef@upm.es', 'inef.upm.es'],
  ['Universidad Politécnica de Madrid', 'Pública', 'Facultad CC Actividad Física', 'Salud y Rendimiento Humano', 'Deporte', '+34 91 067 31 00', 'secretaria.inef@upm.es', 'inef.upm.es'],

  // ========== UNIVERSIDAD COMPLUTENSE DE MADRID (UCM) ==========
  // Email patrón validado: dpXXX@ucm.es / dpto-[X]@ucm.es / [dpto]@ucm.es
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filología', 'Estudios Ingleses: Lingüística y Literatura', 'Filología', '+34 91 394 53 83', 'dp428@ucm.es', 'filologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filología', 'Estudios Románicos, Franceses, Italianos y Traducción', 'Filología', '+34 91 394 58 58', 'dp432@ucm.es', 'filologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filología', 'Filología Clásica', 'Filología', '+34 91 394 54 07', 'dp433@ucm.es', 'filologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filología', 'Lengua Española y Teoría de la Literatura', 'Filología', '+34 91 394 53 99', 'dp429@ucm.es', 'filologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filología', 'Literaturas Hispánicas y Bibliografía', 'Filología', '+34 91 394 53 00', 'dp430@ucm.es', 'filologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filología', 'Lingüística General, Estudios Árabes, Hebreos y Asia Oriental', 'Filología', '+34 91 394 58 31', 'dp431@ucm.es', 'filologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Matemáticas', 'Álgebra, Geometría y Topología', 'Matemáticas', '+34 91 394 44 63', 'dpto-amma@ucm.es', 'matematicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Matemáticas', 'Análisis Matemático y Matemática Aplicada', 'Matemáticas', '+34 91 394 44 49', 'dpto-amma@ucm.es', 'matematicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Matemáticas', 'Estadística e Investigación Operativa', 'Matemáticas', '+34 91 394 44 25', 'eio@ucm.es', 'matematicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Económicas', 'Administración Financiera y Contabilidad', 'Economía y Empresa', '+34 91 394 23 00', 'ccee@ucm.es', 'cee.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Económicas', 'Análisis Económico', 'Economía y Empresa', '+34 91 394 23 00', 'ccee@ucm.es', 'cee.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Económicas', 'Economía Aplicada Pública y Política', 'Economía y Empresa', '+34 91 394 23 00', 'ccee@ucm.es', 'cee.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Económicas', 'Economía Financiera y Actuarial y Estadística', 'Economía y Empresa', '+34 91 394 23 00', 'ccee@ucm.es', 'cee.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Económicas', 'Economía Aplicada, Estructura e Historia', 'Economía y Empresa', '+34 91 394 23 00', 'ccee@ucm.es', 'cee.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Económicas', 'Organización de Empresas y Marketing', 'Economía y Empresa', '+34 91 394 23 00', 'ccee@ucm.es', 'cee.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Administrativo', 'Derecho', '+34 91 394 54 00', 'der.administrativo@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Civil', 'Derecho', '+34 91 394 54 00', 'dercivil@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Constitucional', 'Derecho', '+34 91 394 54 00', 'dconstit@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho del Trabajo y de la Seguridad Social', 'Derecho', '+34 91 394 54 00', 'dtrabajo@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Internacional, Eclesiástico y Filosofía del Derecho', 'Derecho', '+34 91 394 54 00', 'derinter@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Mercantil, Financiero y Tributario', 'Derecho', '+34 91 394 54 00', 'dermerc@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Procesal y Derecho Penal', 'Derecho', '+34 91 394 54 00', 'dproces@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Romano e Historia del Derecho', 'Derecho', '+34 91 394 54 00', 'derroman@ucm.es', 'derecho.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Anatomía y Embriología', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Cirugía', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Bioquímica y Biología Molecular', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Fisiología', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Inmunología, Oftalmología y ORL', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Medicina', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Medicina Legal, Psiquiatría y Patología', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Pediatría y Salud Pública', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Medicina', 'Radiología, Rehabilitación y Fisioterapia', 'Medicina', '+34 91 394 13 80', 'secmed@ucm.es', 'medicina.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Básica', 'Psicología', '+34 91 394 31 00', 'spsico@ucm.es', 'psicologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Clínica', 'Psicología', '+34 91 394 31 00', 'spsico@ucm.es', 'psicologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Experimental, Procesos Cognitivos y Logopedia', 'Psicología', '+34 91 394 31 00', 'spsico@ucm.es', 'psicologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Social, del Trabajo y Diferencial', 'Psicología', '+34 91 394 31 00', 'spsico@ucm.es', 'psicologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Psicología', 'Psicobiología y Metodología', 'Psicología', '+34 91 394 31 00', 'spsico@ucm.es', 'psicologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Químicas', 'Química Analítica', 'Química', '+34 91 394 41 00', 'secquim@ucm.es', 'quimicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Químicas', 'Química Física', 'Química', '+34 91 394 41 00', 'secquim@ucm.es', 'quimicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Químicas', 'Química Inorgánica', 'Química', '+34 91 394 41 00', 'secquim@ucm.es', 'quimicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Químicas', 'Química Orgánica', 'Química', '+34 91 394 41 00', 'secquim@ucm.es', 'quimicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Químicas', 'Ingeniería Química y Materiales', 'Química', '+34 91 394 41 00', 'secquim@ucm.es', 'quimicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Físicas', 'Estructura de la Materia, Física Térmica y Electrónica', 'Física', '+34 91 394 51 80', 'secfis@ucm.es', 'fisicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Físicas', 'Física Atómica, Molecular y Nuclear', 'Física', '+34 91 394 51 80', 'secfis@ucm.es', 'fisicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Físicas', 'Física de Materiales', 'Física', '+34 91 394 51 80', 'secfis@ucm.es', 'fisicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Físicas', 'Física Teórica', 'Física', '+34 91 394 51 80', 'secfis@ucm.es', 'fisicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Físicas', 'Óptica', 'Física', '+34 91 394 51 80', 'secfis@ucm.es', 'fisicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Biológicas', 'Biodiversidad, Ecología y Evolución', 'Biología', '+34 91 394 49 00', 'secbio@ucm.es', 'biologicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Biológicas', 'Biología Celular e Histología', 'Biología', '+34 91 394 49 00', 'secbio@ucm.es', 'biologicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Biológicas', 'Bioquímica y Biología Molecular', 'Biología', '+34 91 394 49 00', 'secbio@ucm.es', 'biologicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Biológicas', 'Genética, Fisiología y Microbiología', 'Biología', '+34 91 394 49 00', 'secbio@ucm.es', 'biologicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Geografía e Historia', 'Geografía', 'Humanidades', '+34 91 394 60 00', 'secgeohist@ucm.es', 'geografiaehistoria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Geografía e Historia', 'Historia del Arte', 'Humanidades', '+34 91 394 60 00', 'secgeohist@ucm.es', 'geografiaehistoria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Geografía e Historia', 'Historia Antigua, Arqueología y Ciencias Historiográficas', 'Humanidades', '+34 91 394 60 00', 'secgeohist@ucm.es', 'geografiaehistoria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Geografía e Historia', 'Historia Moderna e Historia Contemporánea', 'Humanidades', '+34 91 394 60 00', 'secgeohist@ucm.es', 'geografiaehistoria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Geografía e Historia', 'Historia de América, Medieval y Ciencias Auxiliares', 'Humanidades', '+34 91 394 60 00', 'secgeohist@ucm.es', 'geografiaehistoria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Geografía e Historia', 'Musicología', 'Humanidades', '+34 91 394 60 00', 'secgeohist@ucm.es', 'geografiaehistoria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filosofía', 'Filosofía y Sociedad', 'Filosofía', '+34 91 394 60 60', 'secfilo@ucm.es', 'filosofia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Filosofía', 'Lógica y Filosofía Teórica', 'Filosofía', '+34 91 394 60 60', 'secfilo@ucm.es', 'filosofia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Información', 'Ciencias de la Comunicación Aplicada', 'Comunicación', '+34 91 394 21 00', 'secinfo@ucm.es', 'ccinformacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Información', 'Periodismo y Comunicación Global', 'Comunicación', '+34 91 394 21 00', 'secinfo@ucm.es', 'ccinformacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Información', 'Periodismo y Nuevos Medios', 'Comunicación', '+34 91 394 21 00', 'secinfo@ucm.es', 'ccinformacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Información', 'Comunicación Audiovisual y Publicidad', 'Comunicación', '+34 91 394 21 00', 'secinfo@ucm.es', 'ccinformacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Información', 'Teorías y Análisis de la Comunicación', 'Comunicación', '+34 91 394 21 00', 'secinfo@ucm.es', 'ccinformacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Educación', 'Didáctica de las Ciencias Experimentales, Sociales y Matemáticas', 'Educación', '+34 91 394 62 00', 'secedu@ucm.es', 'educacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Educación', 'Didáctica de las Lenguas, Artes y Educación Física', 'Educación', '+34 91 394 62 00', 'secedu@ucm.es', 'educacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Educación', 'Estudios Educativos', 'Educación', '+34 91 394 62 00', 'secedu@ucm.es', 'educacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Educación', 'Investigación y Psicología en Educación', 'Educación', '+34 91 394 62 00', 'secedu@ucm.es', 'educacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Veterinaria', 'Anatomía y Anatomía Patológica Comparadas', 'Veterinaria', '+34 91 394 37 00', 'secvet@ucm.es', 'veterinaria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Veterinaria', 'Fisiología', 'Veterinaria', '+34 91 394 37 00', 'secvet@ucm.es', 'veterinaria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Veterinaria', 'Medicina y Cirugía Animal', 'Veterinaria', '+34 91 394 37 00', 'secvet@ucm.es', 'veterinaria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Veterinaria', 'Producción Animal', 'Veterinaria', '+34 91 394 37 00', 'secvet@ucm.es', 'veterinaria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Veterinaria', 'Sanidad Animal', 'Veterinaria', '+34 91 394 37 00', 'secvet@ucm.es', 'veterinaria.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Farmacia', 'Farmacia Galénica y Tecnología Alimentaria', 'Farmacia', '+34 91 394 17 00', 'secfar@ucm.es', 'farmacia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Farmacia', 'Farmacología, Farmacognosia y Botánica', 'Farmacia', '+34 91 394 17 00', 'secfar@ucm.es', 'farmacia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Farmacia', 'Microbiología y Parasitología', 'Farmacia', '+34 91 394 17 00', 'secfar@ucm.es', 'farmacia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Farmacia', 'Nutrición y Ciencia de los Alimentos', 'Farmacia', '+34 91 394 17 00', 'secfar@ucm.es', 'farmacia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Farmacia', 'Química en Ciencias Farmacéuticas', 'Farmacia', '+34 91 394 17 00', 'secfar@ucm.es', 'farmacia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Odontología', 'Especialidades Clínicas Odontológicas', 'Odontología', '+34 91 394 19 00', 'secodo@ucm.es', 'odontologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Odontología', 'Estomatología', 'Odontología', '+34 91 394 19 00', 'secodo@ucm.es', 'odontologia.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Geológicas', 'Geodinámica, Estratigrafía y Paleontología', 'Geología', '+34 91 394 48 00', 'secgeo@ucm.es', 'geologicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Geológicas', 'Mineralogía y Petrología', 'Geología', '+34 91 394 48 00', 'secgeo@ucm.es', 'geologicas.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Estudios Estadísticos', 'Estadística e Investigación Operativa', 'Estadística', '+34 91 394 47 00', 'secest@ucm.es', 'estudiosestadisticos.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Documentación', 'Biblioteconomía y Documentación', 'Documentación', '+34 91 394 24 00', 'secdoc@ucm.es', 'documentacion.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Trabajo Social', 'Trabajo Social y Servicios Sociales', 'Trabajo Social', '+34 91 394 26 00', 'sectso@ucm.es', 'trabajosocial.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Bellas Artes', 'Diseño e Imagen', 'Bellas Artes', '+34 91 394 36 00', 'secba@ucm.es', 'bellasartes.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Bellas Artes', 'Dibujo y Grabado', 'Bellas Artes', '+34 91 394 36 00', 'secba@ucm.es', 'bellasartes.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Bellas Artes', 'Pintura y Conservación-Restauración', 'Bellas Artes', '+34 91 394 36 00', 'secba@ucm.es', 'bellasartes.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Bellas Artes', 'Escultura y Formación Artística', 'Bellas Artes', '+34 91 394 36 00', 'secba@ucm.es', 'bellasartes.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Política y Sociología', 'Antropología Social y Psicología Social', 'Sociología', '+34 91 394 28 00', 'secpol@ucm.es', 'cps.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Política y Sociología', 'Ciencia Política y de la Administración', 'Política', '+34 91 394 28 00', 'secpol@ucm.es', 'cps.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Política y Sociología', 'Sociología: Metodología y Teoría', 'Sociología', '+34 91 394 28 00', 'secpol@ucm.es', 'cps.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de CC Política y Sociología', 'Sociología Aplicada', 'Sociología', '+34 91 394 28 00', 'secpol@ucm.es', 'cps.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Comercio y Turismo', 'Economía Aplicada Pública y Política', 'Comercio y Turismo', '+34 91 394 64 00', 'sectur@ucm.es', 'comercioyturismo.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Informática', 'Arquitectura de Computadores y Automática', 'Informática', '+34 91 394 75 00', 'sec-fdi@ucm.es', 'informatica.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Informática', 'Ingeniería del Software e Inteligencia Artificial', 'Informática', '+34 91 394 75 00', 'sec-fdi@ucm.es', 'informatica.ucm.es'],
  ['Universidad Complutense de Madrid', 'Pública', 'Facultad de Informática', 'Sistemas Informáticos y Computación', 'Informática', '+34 91 394 75 00', 'sec-fdi@ucm.es', 'informatica.ucm.es'],

  // ========== UNIVERSIDAD AUTÓNOMA DE MADRID (UAM) ==========
  // Patrón: secretaria.[facultad]@uam.es
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Biología', 'Biología', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Biología Molecular', 'Biología', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Ecología', 'Biología', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Física Aplicada', 'Física', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Física de Materiales', 'Física', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Física Teórica', 'Física', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Geología y Geoquímica', 'Geología', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Matemáticas', 'Matemáticas', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Química', 'Química', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Química Agrícola y Bromatología', 'Química', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Química Analítica y Análisis Instrumental', 'Química', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Química Física Aplicada', 'Química', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Química Inorgánica', 'Química', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Ciencias', 'Química Orgánica', 'Química', '+34 91 497 80 00', 'secretaria.administrativa.ciencias@uam.es', 'uam.es/ciencias'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Antropología Social y Pensamiento Filosófico Español', 'Humanidades', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Filología Clásica', 'Filología', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Filología Española', 'Filología', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Filología Francesa', 'Filología', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Filología Inglesa', 'Filología', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Filosofía', 'Filosofía', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Geografía', 'Geografía', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Historia Antigua, Medieval, Paleografía y Diplomática', 'Historia', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Historia Moderna', 'Historia', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Historia Contemporánea', 'Historia', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Historia y Teoría del Arte', 'Arte', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Lingüística General', 'Filología', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Música', 'Música', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Filosofía y Letras', 'Prehistoria y Arqueología', 'Historia', '+34 91 497 41 00', 'secretaria.administrativa.filosofia@uam.es', 'uam.es/filosofia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Privado, Social y Económico', 'Derecho', '+34 91 497 26 00', 'secretaria.administrativa.derecho@uam.es', 'uam.es/derecho'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Derecho', 'Derecho Público y Filosofía Jurídica', 'Derecho', '+34 91 497 26 00', 'secretaria.administrativa.derecho@uam.es', 'uam.es/derecho'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Derecho', 'Ciencia Política y Relaciones Internacionales', 'Política', '+34 91 497 26 00', 'secretaria.administrativa.derecho@uam.es', 'uam.es/derecho'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Análisis Económico', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Análisis Económico: Teoría e Historia', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Economía Aplicada', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Estructura Económica y Economía del Desarrollo', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Financiación e Investigación Comercial', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Organización de Empresas', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Contabilidad', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de CC Económicas', 'Economía y Hacienda Pública', 'Economía y Empresa', '+34 91 497 28 00', 'secretaria.administrativa.economicas@uam.es', 'uam.es/economicas'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Anatomía, Histología y Neurociencia', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Bioquímica', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Cirugía', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Farmacología y Terapéutica', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Fisiología', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Medicina', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Medicina Preventiva, Salud Pública y Microbiología', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Pediatría', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Medicina', 'Psiquiatría', 'Medicina', '+34 91 497 54 00', 'secretaria.administrativa.medicina@uam.es', 'uam.es/medicina'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Educación', 'Didácticas Específicas', 'Educación', '+34 91 497 42 53', 'secretaria.academica.educacion@uam.es', 'uam.es/educacion'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Educación', 'Educación Artística, Plástica y Visual', 'Educación', '+34 91 497 42 53', 'secretaria.academica.educacion@uam.es', 'uam.es/educacion'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Educación', 'Educación Física, Deporte y Motricidad Humana', 'Educación', '+34 91 497 42 53', 'secretaria.academica.educacion@uam.es', 'uam.es/educacion'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Educación', 'Filologías y su Didáctica', 'Educación', '+34 91 497 42 53', 'secretaria.academica.educacion@uam.es', 'uam.es/educacion'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Educación', 'Pedagogía', 'Educación', '+34 91 497 42 53', 'secretaria.academica.educacion@uam.es', 'uam.es/educacion'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Educación', 'Psicología Evolutiva y de la Educación', 'Educación', '+34 91 497 42 53', 'secretaria.academica.educacion@uam.es', 'uam.es/educacion'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Biológica y de la Salud', 'Psicología', '+34 91 497 40 00', 'secretaria.administrativa.psicologia@uam.es', 'uam.es/psicologia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Básica', 'Psicología', '+34 91 497 40 00', 'secretaria.administrativa.psicologia@uam.es', 'uam.es/psicologia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Facultad de Psicología', 'Psicología Social y Metodología', 'Psicología', '+34 91 497 40 00', 'secretaria.administrativa.psicologia@uam.es', 'uam.es/psicologia'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Informática', 'Informática', '+34 91 497 22 00', 'secretaria.administrativa.eps@uam.es', 'uam.es/eps'],
  ['Universidad Autónoma de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Tecnología Electrónica y de las Comunicaciones', 'Telecomunicación', '+34 91 497 22 00', 'secretaria.administrativa.eps@uam.es', 'uam.es/eps'],

  // ========== UNIVERSIDAD CARLOS III DE MADRID (UC3M) ==========
  // Patrón: departamento.[X]@[escuela].uc3m.es / [dpto]@uc3m.es
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Bioingeniería e Ingeniería Aeroespacial', 'Ingeniería', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ciencia e Ingeniería de Materiales', 'Ingeniería', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería de Sistemas y Automática', 'Ingeniería', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Eléctrica', 'Ingeniería', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Mecánica', 'Ingeniería', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Telemática', 'Telecomunicación', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Térmica y de Fluidos', 'Ingeniería', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Informática', 'Informática', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Matemáticas', 'Matemáticas', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Tecnología Electrónica', 'Telecomunicación', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Escuela Politécnica Superior', 'Teoría de la Señal y Comunicaciones', 'Telecomunicación', '+34 91 624 94 00', 'secretaria.eps@uc3m.es', 'uc3m.es/eps'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Análisis Social', 'Sociales', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Biblioteconomía y Documentación', 'Documentación', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Ciencia Política y Sociología', 'Política', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Comunicación', 'Comunicación', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Internacional, Eclesiástico y Filosofía', 'Derecho', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Penal, Procesal e Historia del Derecho', 'Derecho', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Privado', 'Derecho', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Público del Estado', 'Derecho', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Social e Internacional Privado', 'Derecho', '+34 91 624 95 00', 'secretaria.fcsj@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Economía', 'Economía', '+34 91 624 95 94', 'departamento.economia@eco.uc3m.es', 'eco.uc3m.es'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Economía de la Empresa', 'Economía y Empresa', '+34 91 624 95 00', 'departamento.empresa@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Estadística', 'Estadística', '+34 91 624 95 00', 'departamento.estadistica@uc3m.es', 'uc3m.es/fcsj'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad de Humanidades y Comunicación', 'Humanidades: Filosofía, Lengua, Teoría Literatura', 'Humanidades', '+34 91 624 96 00', 'secretaria.humanidades@uc3m.es', 'uc3m.es/humanidades'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad de Humanidades y Comunicación', 'Humanidades: Historia, Geografía y Arte', 'Humanidades', '+34 91 624 96 00', 'secretaria.humanidades@uc3m.es', 'uc3m.es/humanidades'],
  ['Universidad Carlos III de Madrid', 'Pública', 'Facultad de Humanidades y Comunicación', 'Periodismo y Comunicación Audiovisual', 'Comunicación', '+34 91 624 96 00', 'secretaria.humanidades@uc3m.es', 'uc3m.es/humanidades'],

  // ========== UNIVERSIDAD REY JUAN CARLOS (URJC) ==========
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Ingeniería Informática', 'Ciencias de la Computación', 'Informática', '+34 91 488 73 00', 'secretaria.etsii@urjc.es', 'urjc.es/etsii'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Ingeniería Informática', 'Estadística e Investigación Operativa Aplicadas', 'Informática', '+34 91 488 73 00', 'secretaria.etsii@urjc.es', 'urjc.es/etsii'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Ingeniería Informática', 'Sistemas Informáticos', 'Informática', '+34 91 488 73 00', 'secretaria.etsii@urjc.es', 'urjc.es/etsii'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Ingeniería Informática', 'Tecnologías de la Información y de las Comunicaciones', 'Telecomunicación', '+34 91 488 73 00', 'secretaria.etsii@urjc.es', 'urjc.es/etsii'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Ing. Telecomunicación', 'Teoría de la Señal y Comunicaciones', 'Telecomunicación', '+34 91 488 73 00', 'secretaria.telecomunicacion@urjc.es', 'urjc.es/etsit'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Ing. Telecomunicación', 'Tecnología Electrónica', 'Telecomunicación', '+34 91 488 73 00', 'secretaria.telecomunicacion@urjc.es', 'urjc.es/etsit'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Arquitectura', 'Tecnología Edificación', 'Arquitectura', '+34 91 488 73 00', 'secretaria.arquitectura@urjc.es', 'urjc.es/arquitectura'],
  ['Universidad Rey Juan Carlos', 'Pública', 'ETS Arquitectura', 'Composición, Historia y Técnica de Arquitectura', 'Arquitectura', '+34 91 488 73 00', 'secretaria.arquitectura@urjc.es', 'urjc.es/arquitectura'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Privado', 'Derecho', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Público I y Ciencia Política', 'Derecho', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho Público II', 'Derecho', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Derecho del Trabajo y Trabajo Social', 'Derecho', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Economía Aplicada I', 'Economía', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Economía de la Empresa', 'Economía y Empresa', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Economía Financiera y Contabilidad', 'Economía', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Sociales y Jurídicas', 'Fundamentos del Análisis Económico', 'Economía', '+34 91 488 79 00', 'secretaria.ccssjuridicas@urjc.es', 'urjc.es/fccssjj'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad de CC Comunicación', 'Comunicación Audiovisual y Publicidad', 'Comunicación', '+34 91 488 79 00', 'secretaria.comunicacion@urjc.es', 'urjc.es/fcc'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad de CC Comunicación', 'Periodismo', 'Comunicación', '+34 91 488 79 00', 'secretaria.comunicacion@urjc.es', 'urjc.es/fcc'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Salud', 'Enfermería', 'Salud', '+34 91 488 88 88', 'secretaria.salud@urjc.es', 'urjc.es/fccs'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Salud', 'Fisioterapia', 'Salud', '+34 91 488 88 88', 'secretaria.salud@urjc.es', 'urjc.es/fccs'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Salud', 'Medicina y Especialidades Médicas', 'Salud', '+34 91 488 88 88', 'secretaria.salud@urjc.es', 'urjc.es/fccs'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Salud', 'Odontología', 'Salud', '+34 91 488 88 88', 'secretaria.salud@urjc.es', 'urjc.es/fccs'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Salud', 'Psicología', 'Psicología', '+34 91 488 88 88', 'secretaria.salud@urjc.es', 'urjc.es/fccs'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Educación', 'Didáctica de las Lenguas Extranjeras', 'Educación', '+34 91 488 88 00', 'secretaria.educacion@urjc.es', 'urjc.es/fce'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Educación', 'Didáctica de las Matemáticas', 'Educación', '+34 91 488 88 00', 'secretaria.educacion@urjc.es', 'urjc.es/fce'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Educación', 'Didáctica de las Ciencias Experimentales', 'Educación', '+34 91 488 88 00', 'secretaria.educacion@urjc.es', 'urjc.es/fce'],
  ['Universidad Rey Juan Carlos', 'Pública', 'Facultad CC Educación', 'Didáctica de las Ciencias Sociales', 'Educación', '+34 91 488 88 00', 'secretaria.educacion@urjc.es', 'urjc.es/fce'],

  // ========== UNIVERSIDAD DE ALCALÁ (UAH) ==========
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Arquitectura', 'Arquitectura', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Automática', 'Ingeniería', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Ciencias de la Computación', 'Informática', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Electrónica', 'Telecomunicación', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Civil', 'Ingeniería Civil', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Ingeniería Mecánica', 'Ingeniería', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Escuela Politécnica Superior', 'Teoría de la Señal y Comunicaciones', 'Telecomunicación', '+34 91 885 65 60', 'secretaria.eps@uah.es', 'uah.es/eps'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Filosofía y Letras', 'Filología, Comunicación y Documentación', 'Filología', '+34 91 885 44 00', 'secretaria.filosofia@uah.es', 'uah.es/filosofia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Filosofía y Letras', 'Filología Moderna', 'Filología', '+34 91 885 44 00', 'secretaria.filosofia@uah.es', 'uah.es/filosofia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Filosofía y Letras', 'Historia y Filosofía', 'Humanidades', '+34 91 885 44 00', 'secretaria.filosofia@uah.es', 'uah.es/filosofia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Derecho', 'Ciencias Jurídicas', 'Derecho', '+34 91 885 43 00', 'secretaria.derecho@uah.es', 'uah.es/derecho'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Derecho', 'Derecho Privado', 'Derecho', '+34 91 885 43 00', 'secretaria.derecho@uah.es', 'uah.es/derecho'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Derecho', 'Derecho Público', 'Derecho', '+34 91 885 43 00', 'secretaria.derecho@uah.es', 'uah.es/derecho'],
  ['Universidad de Alcalá', 'Pública', 'Facultad CC Económicas', 'Ciencias Empresariales', 'Economía y Empresa', '+34 91 885 42 00', 'secretaria.economicas@uah.es', 'uah.es/economicas'],
  ['Universidad de Alcalá', 'Pública', 'Facultad CC Económicas', 'Economía', 'Economía', '+34 91 885 42 00', 'secretaria.economicas@uah.es', 'uah.es/economicas'],
  ['Universidad de Alcalá', 'Pública', 'Facultad CC Económicas', 'Economía y Dirección de Empresas', 'Economía y Empresa', '+34 91 885 42 00', 'secretaria.economicas@uah.es', 'uah.es/economicas'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Medicina', 'Cirugía, Ciencias Médicas y Sociales', 'Medicina', '+34 91 885 51 00', 'secretaria.medicina@uah.es', 'uah.es/medicina'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Medicina', 'Biología de Sistemas', 'Medicina', '+34 91 885 51 00', 'secretaria.medicina@uah.es', 'uah.es/medicina'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Medicina', 'Medicina y Especialidades Médicas', 'Medicina', '+34 91 885 51 00', 'secretaria.medicina@uah.es', 'uah.es/medicina'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Farmacia', 'Ciencias Biomédicas', 'Farmacia', '+34 91 885 49 00', 'secretaria.farmacia@uah.es', 'uah.es/farmacia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Farmacia', 'Química Analítica, Química Física e Ingeniería Química', 'Química', '+34 91 885 49 00', 'secretaria.farmacia@uah.es', 'uah.es/farmacia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Farmacia', 'Química Inorgánica', 'Química', '+34 91 885 49 00', 'secretaria.farmacia@uah.es', 'uah.es/farmacia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Farmacia', 'Química Orgánica', 'Química', '+34 91 885 49 00', 'secretaria.farmacia@uah.es', 'uah.es/farmacia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Educación', 'Ciencias de la Educación', 'Educación', '+34 91 885 44 00', 'secretaria.educacion@uah.es', 'uah.es/educacion'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Biología, CC Ambientales y Química', 'Biología', 'Biología', '+34 91 885 49 00', 'secretaria.biologia@uah.es', 'uah.es/biologia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Biología, CC Ambientales y Química', 'Ciencias de la Vida', 'Biología', '+34 91 885 49 00', 'secretaria.biologia@uah.es', 'uah.es/biologia'],
  ['Universidad de Alcalá', 'Pública', 'Facultad de Biología, CC Ambientales y Química', 'Geología, Geografía y Medio Ambiente', 'Geología', '+34 91 885 49 00', 'secretaria.biologia@uah.es', 'uah.es/biologia'],

  // ========== PRIVADAS MADRID ==========

  // Universidad CEU San Pablo
  ['Universidad CEU San Pablo', 'Privada', 'Escuela Politécnica Superior', 'Arquitectura y Diseño', 'Arquitectura', '+34 91 514 04 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Industrial', 'Ingeniería', '+34 91 514 04 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería de Sistemas y Comunicaciones', 'Telecomunicación', '+34 91 514 04 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Medicina', 'Ciencias Médicas', 'Medicina', '+34 91 372 47 22', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Medicina', 'Enfermería y Fisioterapia', 'Salud', '+34 91 372 47 22', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Medicina', 'Odontología', 'Salud', '+34 91 372 47 22', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Farmacia', 'Ciencias Farmacéuticas y Salud', 'Farmacia', '+34 91 372 47 22', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Derecho', 'Ciencias Jurídicas y Económicas', 'Derecho', '+34 91 372 47 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Derecho', 'Derecho Privado', 'Derecho', '+34 91 372 47 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Derecho', 'Derecho Público', 'Derecho', '+34 91 372 47 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad CC Económicas y Empresariales', 'Economía y Empresa', 'Economía y Empresa', '+34 91 372 47 11', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad CC Económicas y Empresariales', 'Marketing', 'Economía y Empresa', '+34 91 372 47 11', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Humanidades y CC Comunicación', 'Comunicación', 'Comunicación', '+34 91 514 04 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Humanidades y CC Comunicación', 'Educación y Humanidades', 'Educación', '+34 91 514 04 00', 'rrhh@ceu.es', 'usp.ceu.es'],
  ['Universidad CEU San Pablo', 'Privada', 'Facultad de Humanidades y CC Comunicación', 'Filosofía e Historia', 'Humanidades', '+34 91 514 04 00', 'rrhh@ceu.es', 'usp.ceu.es'],

  // Universidad Pontificia Comillas (ICAI/ICADE)
  ['Universidad Pontificia Comillas', 'Privada', 'ICAI - Escuela Técnica Superior', 'Ingeniería Eléctrica', 'Ingeniería Eléctrica', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICAI - Escuela Técnica Superior', 'Ingeniería Electromecánica', 'Ingeniería', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICAI - Escuela Técnica Superior', 'Ingeniería Mecánica', 'Ingeniería', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICAI - Escuela Técnica Superior', 'Ingeniería Telemática y Computación', 'Telecomunicación', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICAI - Escuela Técnica Superior', 'Ingeniería Industrial: Organización y Producción', 'Ingeniería', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICADE - Facultad CC Económicas', 'Economía', 'Economía', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICADE - Facultad CC Económicas', 'Gestión Empresarial', 'Economía y Empresa', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'ICADE - Facultad CC Económicas', 'Marketing', 'Economía y Empresa', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de Derecho', 'Derecho Privado', 'Derecho', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de Derecho', 'Derecho Público', 'Derecho', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de Derecho', 'Disciplinas Eclesiásticas', 'Derecho', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de CC Humanas y Sociales', 'Educación', 'Educación', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de CC Humanas y Sociales', 'Psicología', 'Psicología', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de CC Humanas y Sociales', 'Sociología y Trabajo Social', 'Sociología', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de CC Humanas y Sociales', 'Traducción e Interpretación y Comunicación', 'Comunicación', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Facultad de Teología', 'Teología', 'Humanidades', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],
  ['Universidad Pontificia Comillas', 'Privada', 'Escuela Universitaria de Enfermería', 'Enfermería y Fisioterapia', 'Salud', '+34 91 542 28 00', 'rrhh@comillas.edu', 'comillas.edu'],

  // Universidad Europea de Madrid (UEM)
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Arquitectura, Ingeniería y Diseño', 'Arquitectura', 'Arquitectura', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Arquitectura, Ingeniería y Diseño', 'Diseño', 'Diseño', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Arquitectura, Ingeniería y Diseño', 'Ingeniería Industrial', 'Ingeniería', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Arquitectura, Ingeniería y Diseño', 'Ingeniería Informática', 'Informática', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Escuela de Arquitectura, Ingeniería y Diseño', 'Ingeniería Civil', 'Ingeniería Civil', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de CC Sociales y Comunicación', 'Comunicación', 'Comunicación', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de CC Sociales y Comunicación', 'Educación', 'Educación', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de CC Sociales y Comunicación', 'Psicología', 'Psicología', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de CC Sociales y Comunicación', 'Relaciones Internacionales', 'Política', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad CC Salud', 'Enfermería', 'Salud', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad CC Salud', 'Fisioterapia', 'Salud', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad CC Salud', 'Medicina', 'Medicina', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad CC Salud', 'Odontología', 'Salud', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad CC Deporte', 'Ciencias del Deporte', 'Deporte', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de Empresa, Derecho y Comunicación', 'Derecho', 'Derecho', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de Empresa, Derecho y Comunicación', 'Empresa y Marketing', 'Economía y Empresa', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],
  ['Universidad Europea de Madrid', 'Privada', 'Facultad de Empresa, Derecho y Comunicación', 'Finanzas y Contabilidad', 'Economía', '+34 91 211 96 00', 'rrhh@universidadeuropea.es', 'universidadeuropea.com'],

  // Universidad Francisco de Vitoria (UFV)
  ['Universidad Francisco de Vitoria', 'Privada', 'Escuela Politécnica Superior', 'Arquitectura', 'Arquitectura', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Biomédica', 'Ingeniería', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería en Diseño Industrial', 'Diseño', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Informática', 'Informática', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Comunicación', 'Periodismo', 'Comunicación', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Comunicación', 'Comunicación Audiovisual', 'Comunicación', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Comunicación', 'Publicidad', 'Comunicación', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad CC Jurídicas Empresariales', 'Derecho', 'Derecho', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad CC Jurídicas Empresariales', 'Empresa', 'Economía y Empresa', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad CC Jurídicas Empresariales', 'Marketing', 'Economía y Empresa', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Educación y Psicología', 'Educación', 'Educación', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Educación y Psicología', 'Psicología', 'Psicología', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Medicina', 'Medicina', 'Medicina', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Medicina', 'Enfermería', 'Salud', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],
  ['Universidad Francisco de Vitoria', 'Privada', 'Facultad de Medicina', 'Fisioterapia', 'Salud', '+34 91 351 03 03', 'rrhh@ufv.es', 'ufv.es'],

  // Universidad Antonio de Nebrija
  ['Universidad Antonio de Nebrija', 'Privada', 'Escuela Politécnica Superior', 'Arquitectura', 'Arquitectura', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Industrial', 'Ingeniería', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Informática', 'Informática', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad de Comunicación y Artes', 'Periodismo', 'Comunicación', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad de Comunicación y Artes', 'Bellas Artes', 'Bellas Artes', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad CC Sociales', 'Empresa', 'Economía y Empresa', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad CC Sociales', 'Derecho', 'Derecho', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad CC Sociales', 'Relaciones Internacionales', 'Política', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad de Lenguas y Educación', 'Lenguas Aplicadas', 'Filología', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],
  ['Universidad Antonio de Nebrija', 'Privada', 'Facultad de Lenguas y Educación', 'Educación', 'Educación', '+34 91 452 11 00', 'rrhh@nebrija.es', 'nebrija.com'],

  // Universidad Camilo José Cela (UCJC)
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Educación', 'Educación', 'Educación', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Educación', 'Logopedia', 'Salud', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Salud', 'Enfermería', 'Salud', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Salud', 'Fisioterapia', 'Salud', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Salud', 'Psicología', 'Psicología', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Tecnología', 'Arquitectura y Tecnología', 'Arquitectura', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Tecnología', 'Ingeniería', 'Ingeniería', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Comunicación', 'Comunicación Audiovisual', 'Comunicación', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Comunicación', 'Periodismo', 'Comunicación', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Empresa', 'Empresa y Economía', 'Economía y Empresa', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],
  ['Universidad Camilo José Cela', 'Privada', 'Facultad CC Empresa', 'Marketing', 'Economía y Empresa', '+34 91 815 31 31', 'rrhh@ucjc.edu', 'ucjc.edu'],

  // IE University
  ['IE University', 'Privada', 'IE School of Architecture and Design', 'Arquitectura', 'Arquitectura', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE School of Architecture and Design', 'Diseño', 'Diseño', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE Business School', 'Marketing', 'Economía y Empresa', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE Business School', 'Finanzas', 'Economía y Empresa', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE Business School', 'Estrategia y Liderazgo', 'Economía y Empresa', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE Law School', 'Derecho', 'Derecho', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE School of Politics, Economics, Global Affairs', 'Relaciones Internacionales', 'Política', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE School of Politics, Economics, Global Affairs', 'Economía Política', 'Política', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE School of Human Sciences and Technology', 'Psicología', 'Psicología', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE School of Human Sciences and Technology', 'Comunicación', 'Comunicación', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],
  ['IE University', 'Privada', 'IE School of Human Sciences and Technology', 'Tecnología', 'Tecnología', '+34 91 568 96 00', 'rrhh@ie.edu', 'ie.edu'],

  // Universidad Alfonso X El Sabio (UAX)
  ['Universidad Alfonso X El Sabio', 'Privada', 'Escuela Politécnica Superior', 'Arquitectura', 'Arquitectura', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Aeroespacial', 'Ingeniería', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Industrial', 'Ingeniería', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Escuela Politécnica Superior', 'Ingeniería Informática', 'Informática', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad CC Salud', 'Enfermería', 'Salud', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad CC Salud', 'Fisioterapia', 'Salud', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad CC Salud', 'Medicina', 'Medicina', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad CC Salud', 'Veterinaria', 'Veterinaria', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad de Estudios Sociales', 'Comunicación', 'Comunicación', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad de Estudios Sociales', 'Derecho', 'Derecho', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad de Estudios Sociales', 'Empresa y Economía', 'Economía y Empresa', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],
  ['Universidad Alfonso X El Sabio', 'Privada', 'Facultad de Estudios Sociales', 'Educación', 'Educación', '+34 91 810 92 00', 'rrhh@uax.es', 'uax.com'],

  // CUNEF Universidad
  ['CUNEF Universidad', 'Privada', 'CUNEF', 'Economía Financiera', 'Economía', '+34 91 448 08 92', 'rrhh@cunef.edu', 'cunef.edu'],
  ['CUNEF Universidad', 'Privada', 'CUNEF', 'Empresa y Marketing', 'Economía y Empresa', '+34 91 448 08 92', 'rrhh@cunef.edu', 'cunef.edu'],
  ['CUNEF Universidad', 'Privada', 'CUNEF', 'Derecho Privado y Empresa', 'Derecho', '+34 91 448 08 92', 'rrhh@cunef.edu', 'cunef.edu'],
  ['CUNEF Universidad', 'Privada', 'CUNEF', 'Derecho Público', 'Derecho', '+34 91 448 08 92', 'rrhh@cunef.edu', 'cunef.edu'],
  ['CUNEF Universidad', 'Privada', 'CUNEF', 'Sistemas Informáticos', 'Informática', '+34 91 448 08 92', 'rrhh@cunef.edu', 'cunef.edu'],

  // Universidad Villanueva
  ['Universidad Villanueva', 'Privada', 'Facultad CC Comunicación', 'Comunicación', 'Comunicación', '+34 91 740 70 00', 'rrhh@villanueva.edu', 'villanueva.edu'],
  ['Universidad Villanueva', 'Privada', 'Facultad CC Comunicación', 'Periodismo', 'Comunicación', '+34 91 740 70 00', 'rrhh@villanueva.edu', 'villanueva.edu'],
  ['Universidad Villanueva', 'Privada', 'Facultad CC Sociales y Humanidades', 'Educación', 'Educación', '+34 91 740 70 00', 'rrhh@villanueva.edu', 'villanueva.edu'],
  ['Universidad Villanueva', 'Privada', 'Facultad CC Sociales y Humanidades', 'Psicología', 'Psicología', '+34 91 740 70 00', 'rrhh@villanueva.edu', 'villanueva.edu'],
  ['Universidad Villanueva', 'Privada', 'Facultad CC Jurídicas y Empresariales', 'Derecho', 'Derecho', '+34 91 740 70 00', 'rrhh@villanueva.edu', 'villanueva.edu'],
  ['Universidad Villanueva', 'Privada', 'Facultad CC Jurídicas y Empresariales', 'Empresa y Marketing', 'Economía y Empresa', '+34 91 740 70 00', 'rrhh@villanueva.edu', 'villanueva.edu'],

  // UDIMA
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Económicas y Empresariales', 'Administración y Dirección de Empresas', 'Economía y Empresa', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Económicas y Empresariales', 'Economía', 'Economía', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Económicas y Empresariales', 'Marketing', 'Economía y Empresa', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Jurídicas', 'Derecho', 'Derecho', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Jurídicas', 'Criminología', 'Derecho', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Salud y Educación', 'Educación', 'Educación', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Facultad CC Salud y Educación', 'Psicología', 'Psicología', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Escuela CC Técnicas e Ingeniería', 'Ingeniería Informática', 'Informática', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],
  ['Universidad a Distancia de Madrid', 'Privada', 'Escuela CC Técnicas e Ingeniería', 'Ingeniería de Organización Industrial', 'Ingeniería', '+34 91 856 16 99', 'rrhh@udima.es', 'udima.es'],

  // UDIT (Universidad de Diseño y Tecnología)
  ['Universidad de Diseño y Tecnología', 'Privada', 'UDIT', 'Diseño Gráfico', 'Diseño', '+34 91 555 25 28', 'rrhh@udit.es', 'udit.es'],
  ['Universidad de Diseño y Tecnología', 'Privada', 'UDIT', 'Diseño de Interiores', 'Diseño', '+34 91 555 25 28', 'rrhh@udit.es', 'udit.es'],
  ['Universidad de Diseño y Tecnología', 'Privada', 'UDIT', 'Diseño de Moda', 'Diseño', '+34 91 555 25 28', 'rrhh@udit.es', 'udit.es'],
  ['Universidad de Diseño y Tecnología', 'Privada', 'UDIT', 'Diseño de Producto', 'Diseño', '+34 91 555 25 28', 'rrhh@udit.es', 'udit.es'],
  ['Universidad de Diseño y Tecnología', 'Privada', 'UDIT', 'Animación y Efectos Visuales', 'Diseño', '+34 91 555 25 28', 'rrhh@udit.es', 'udit.es'],

  // UNIE Universidad
  ['UNIE Universidad', 'Privada', 'Facultad CC Económicas y Empresariales', 'Empresa', 'Economía y Empresa', '+34 91 514 23 70', 'rrhh@universidadunie.com', 'universidadunie.com'],
  ['UNIE Universidad', 'Privada', 'Facultad CC Económicas y Empresariales', 'Marketing', 'Economía y Empresa', '+34 91 514 23 70', 'rrhh@universidadunie.com', 'universidadunie.com'],
  ['UNIE Universidad', 'Privada', 'Facultad CC Sociales', 'Comunicación', 'Comunicación', '+34 91 514 23 70', 'rrhh@universidadunie.com', 'universidadunie.com'],
  ['UNIE Universidad', 'Privada', 'Facultad CC Sociales', 'Psicología', 'Psicología', '+34 91 514 23 70', 'rrhh@universidadunie.com', 'universidadunie.com'],
  ['UNIE Universidad', 'Privada', 'Facultad CC Sociales', 'Educación', 'Educación', '+34 91 514 23 70', 'rrhh@universidadunie.com', 'universidadunie.com'],

  // ESIC University
  ['ESIC University', 'Privada', 'ESIC', 'Marketing', 'Economía y Empresa', '+34 91 452 41 00', 'rrhh@esic.edu', 'esic.edu'],
  ['ESIC University', 'Privada', 'ESIC', 'Empresa', 'Economía y Empresa', '+34 91 452 41 00', 'rrhh@esic.edu', 'esic.edu'],
  ['ESIC University', 'Privada', 'ESIC', 'Comunicación', 'Comunicación', '+34 91 452 41 00', 'rrhh@esic.edu', 'esic.edu'],
  ['ESIC University', 'Privada', 'ESIC', 'Tecnologías Digitales', 'Tecnología', '+34 91 452 41 00', 'rrhh@esic.edu', 'esic.edu'],

  // TAI - Universidad de Artes
  ['TAI Universidad', 'Privada', 'TAI', 'Artes Cinematográficas', 'Artes Audiovisuales', '+34 91 553 87 80', 'rrhh@taiarts.com', 'taiarts.com'],
  ['TAI Universidad', 'Privada', 'TAI', 'Comunicación Audiovisual', 'Comunicación', '+34 91 553 87 80', 'rrhh@taiarts.com', 'taiarts.com'],
  ['TAI Universidad', 'Privada', 'TAI', 'Bellas Artes', 'Bellas Artes', '+34 91 553 87 80', 'rrhh@taiarts.com', 'taiarts.com'],
  ['TAI Universidad', 'Privada', 'TAI', 'Artes Escénicas', 'Artes', '+34 91 553 87 80', 'rrhh@taiarts.com', 'taiarts.com'],

  // UNED
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de CC Económicas y Empresariales', 'Análisis Económico', 'Economía', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de CC Económicas y Empresariales', 'Economía Aplicada', 'Economía', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de CC Económicas y Empresariales', 'Economía de la Empresa y Contabilidad', 'Economía y Empresa', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de CC Económicas y Empresariales', 'Economía Aplicada Cuantitativa', 'Economía', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Derecho', 'Derecho Civil', 'Derecho', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Derecho', 'Derecho Penal', 'Derecho', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Derecho', 'Derecho Constitucional', 'Derecho', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Derecho', 'Derecho Mercantil', 'Derecho', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Filosofía', 'Filosofía', 'Filosofía', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Filosofía', 'Lógica, Historia y Filosofía de la Ciencia', 'Filosofía', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Geografía e Historia', 'Geografía', 'Geografía', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Geografía e Historia', 'Historia Antigua', 'Historia', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Geografía e Historia', 'Historia Medieval', 'Historia', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Geografía e Historia', 'Historia Moderna', 'Historia', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Geografía e Historia', 'Historia Contemporánea', 'Historia', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Geografía e Historia', 'Historia del Arte', 'Historia del Arte', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Filología', 'Filologías Extranjeras y sus Lingüísticas', 'Filología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Filología', 'Lengua Española y Lingüística General', 'Filología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Filología', 'Literatura Española y Teoría Literatura', 'Filología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Psicología', 'Psicología Básica I', 'Psicología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Psicología', 'Psicología Básica II', 'Psicología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Psicología', 'Psicología Evolutiva y de la Educación', 'Psicología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Psicología', 'Psicobiología', 'Psicología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Psicología', 'Psicología Social y Organizaciones', 'Psicología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingenieros Industriales', 'Mecánica', 'Ingeniería', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingenieros Industriales', 'Ingeniería Eléctrica, Electrónica, Control', 'Ingeniería', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingenieros Industriales', 'Matemática Aplicada I', 'Ingeniería', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingenieros Industriales', 'Construcción y Fabricación', 'Ingeniería', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingeniería Informática', 'Inteligencia Artificial', 'Informática', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingeniería Informática', 'Lenguajes y Sistemas Informáticos', 'Informática', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'ETS Ingeniería Informática', 'Sistemas de Comunicación y Control', 'Telecomunicación', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Ciencias', 'Física Fundamental', 'Física', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Ciencias', 'Física Matemática y de Fluidos', 'Física', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Ciencias', 'Matemáticas Fundamentales', 'Matemáticas', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Ciencias', 'Química Analítica', 'Química', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Ciencias', 'Química Inorgánica', 'Química', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Educación', 'Didáctica, Organización Escolar y Didácticas Especiales', 'Educación', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Educación', 'Métodos de Investigación y Diagnóstico en Educación', 'Educación', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Educación', 'Teoría de la Educación y Pedagogía Social', 'Educación', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad de Educación', 'Historia de la Educación y Educación Comparada', 'Educación', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad CC Políticas y Sociología', 'Antropología Social y Cultural', 'Sociología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad CC Políticas y Sociología', 'Ciencia Política y de la Administración', 'Política', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad CC Políticas y Sociología', 'Sociología I', 'Sociología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad CC Políticas y Sociología', 'Sociología II', 'Sociología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
  ['Universidad Nacional Educación a Distancia', 'Pública', 'Facultad CC Políticas y Sociología', 'Sociología III', 'Sociología', '+34 91 398 60 00', 'rrhh@adm.uned.es', 'uned.es'],
];

async function createUniversidadesMadridMasivo() {
  try {
    console.log('🏛️ Creando UNIVERSIDADES MADRID MASIVO...\n');
    console.log(`📊 Total registros: ${DEPARTAMENTOS.length}\n`);

    const { sheets } = await getServices();

    // Verificar si existe la pestaña antigua y borrar
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const existing = meta.data.sheets.find(s => s.properties.title === 'UNIVERSIDADES MADRID');

    if (existing) {
      console.log('🗑️  Eliminando pestaña antigua UNIVERSIDADES MADRID...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: [{ deleteSheet: { sheetId: existing.properties.sheetId } }] }
      });
    }

    // Crear pestaña nueva
    console.log('📑 Creando pestaña UNIVERSIDADES MADRID...');
    const createResp = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: 'UNIVERSIDADES MADRID' } } }]
      }
    });

    const sheetId = createResp.data.replies[0].addSheet.properties.sheetId;

    // Headers
    const headers = ['UNIVERSIDAD', 'TIPO', 'FACULTAD/ESCUELA', 'DEPARTAMENTO', 'ÁREA', 'TELÉFONO', 'EMAIL', 'WEB'];
    const values = [headers, ...DEPARTAMENTOS];

    // Insertar datos
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'UNIVERSIDADES MADRID!A1',
      valueInputOption: 'RAW',
      resource: { values }
    });

    console.log(`✅ ${DEPARTAMENTOS.length} departamentos insertados`);

    // Formato
    const formatRequests = [
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 8 },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.1, green: 0.3, blue: 0.6 },
              textFormat: { bold: true, fontSize: 11, fontFamily: 'Arial', foregroundColor: { red: 1, green: 1, blue: 1 } },
              horizontalAlignment: 'CENTER'
            }
          },
          fields: 'userEnteredFormat'
        }
      },
      { updateDimensionProperties: { range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 35 }, fields: 'pixelSize' } },
      { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 8 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
      { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, endRowIndex: DEPARTAMENTOS.length + 1, startColumnIndex: 0, endColumnIndex: 8 } } } }
    ];

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: formatRequests }
    });

    console.log('✅ Formato aplicado\n');
    console.log('═══════════════════════════════════════');
    console.log('🏛️ UNIVERSIDADES MADRID MASIVO COMPLETADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 Total: ${DEPARTAMENTOS.length} departamentos`);

    // Estadísticas
    const publicas = DEPARTAMENTOS.filter(d => d[1] === 'Pública').length;
    const privadas = DEPARTAMENTOS.filter(d => d[1] === 'Privada').length;
    console.log(`   ✓ Públicas: ${publicas}`);
    console.log(`   ✓ Privadas: ${privadas}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createUniversidadesMadridMasivo();
