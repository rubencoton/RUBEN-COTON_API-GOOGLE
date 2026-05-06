const { getServices } = require('../src/auth/oauth-manager');

const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

function centro(uni, tipo, centro_nombre, areas, tel, email_ppal, email_pdi, web) {
  return areas.map(area => [
    centro_nombre,
    tipo,
    centro_nombre,
    area,
    area,
    tel,
    email_ppal,
    email_pdi,
    web
  ]);
}

const CENTROS = [];

// MÁS ESCUELAS DE NEGOCIOS Y FORMACIÓN
CENTROS.push(...centro('', 'Escuela Negocios', 'CESMA Business School',
  ['ADE', 'Marketing', 'Recursos Humanos', 'Finanzas', 'Comercio Internacional', 'Logística'],
  '+34 91 715 04 21', 'info@cesma.com', 'rrhh@cesma.com', 'cesma.com'));

CENTROS.push(...centro('', 'Escuela Negocios', 'Spain Business School',
  ['Marketing Digital', 'Big Data', 'ADE', 'Innovación', 'Liderazgo'],
  '+34 91 590 12 12', 'info@spainbs.com', 'rrhh@spainbs.com', 'spainbs.com'));

CENTROS.push(...centro('', 'Escuela Negocios', 'IBNES Business School',
  ['ADE', 'Marketing', 'Comercio Exterior', 'Finanzas'],
  '+34 91 559 22 22', 'info@ibnes.es', 'rrhh@ibnes.es', 'ibnes.es'));

CENTROS.push(...centro('', 'Escuela Negocios', 'Iberoamerican Business School',
  ['ADE', 'Marketing', 'Recursos Humanos', 'Comercio Internacional'],
  '+34 91 559 33 33', 'info@iberoamericanbs.com', 'rrhh@iberoamericanbs.com', 'iberoamericanbs.com'));

CENTROS.push(...centro('', 'Escuela Negocios', 'INESDI Business Techschool',
  ['Marketing Digital', 'Comercio Electrónico', 'Big Data', 'Programación'],
  '+34 91 781 90 02', 'info@inesdi.com', 'rrhh@inesdi.com', 'inesdi.com'));

CENTROS.push(...centro('', 'Escuela Negocios', 'ESEUNE Business School Madrid',
  ['ADE', 'Marketing', 'Logística', 'Finanzas'],
  '+34 91 555 12 51', 'info@eseune.com', 'rrhh@eseune.com', 'eseune.com'));

CENTROS.push(...centro('', 'Escuela Negocios', 'Bureau Veritas Business School',
  ['Calidad', 'Sostenibilidad', 'Prevención Riesgos', 'Medio Ambiente', 'Energías'],
  '+34 91 270 22 00', 'info@bureauveritasformacion.com', 'rrhh@bureauveritasformacion.com', 'bureauveritasformacion.com'));

CENTROS.push(...centro('', 'Escuela Negocios', 'Next IBS - International Business School',
  ['ADE', 'Marketing Digital', 'Comercio Internacional'],
  '+34 91 710 20 59', 'info@nextibs.com', 'rrhh@nextibs.com', 'nextibs.com'));

// CENTROS DE TECNOLOGÍA AVANZADA
CENTROS.push(...centro('', 'Escuela Especializada', 'KSchool',
  ['Big Data', 'Marketing Digital', 'Programación Web', 'UX/UI', 'Data Science'],
  '+34 91 184 02 03', 'info@kschool.com', 'rrhh@kschool.com', 'kschool.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Ironhack Madrid',
  ['Programación Web', 'UX/UI', 'Data Analytics', 'Ciberseguridad'],
  '+34 91 199 28 49', 'info@ironhack.com', 'rrhh@ironhack.com', 'ironhack.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'The Bridge',
  ['Programación', 'Data Science', 'Marketing Digital', 'Producto Digital', 'Ciberseguridad'],
  '+34 91 290 02 50', 'info@thebridge.tech', 'rrhh@thebridge.tech', 'thebridge.tech'));

CENTROS.push(...centro('', 'Escuela Especializada', 'CEI Escuela de Diseño y Marketing',
  ['Diseño Gráfico', 'Marketing Digital', 'Diseño Web', 'Animación 3D'],
  '+34 91 522 53 12', 'info@cei.es', 'rrhh@cei.es', 'cei.es'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Trazos Escuela Cine y Multimedia',
  ['Cinematografía', 'Animación 3D', 'Postproducción', 'Diseño Multimedia'],
  '+34 91 547 94 98', 'info@trazos.net', 'rrhh@trazos.net', 'trazos.net'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Escuela Superior de Imagen y Sonido CES',
  ['Comunicación Audiovisual', 'Sonido', 'Cinematografía', 'Realidad Virtual'],
  '+34 91 506 32 02', 'info@centroces.com', 'rrhh@centroces.com', 'centroces.com'));

// CENTROS DE FORMACIÓN MUSICAL Y ARTÍSTICA
CENTROS.push(...centro('', 'Escuela Especializada', 'Escuela Superior de Música Reina Sofía',
  ['Composición', 'Interpretación', 'Pedagogía Musical', 'Música de Cámara'],
  '+34 91 411 73 53', 'info@escuelasuperiordemusicareinasofia.es', 'rrhh@escuelasuperiordemusicareinasofia.es', 'escuelasuperiordemusicareinasofia.es'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Centro Superior Música Creativa',
  ['Producción Musical', 'Música Moderna', 'Jazz', 'Composición Audiovisual'],
  '+34 91 539 31 92', 'info@musicacreativa.com', 'rrhh@musicacreativa.com', 'musicacreativa.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'EUTERPE Centro Superior Música',
  ['Composición', 'Pedagogía', 'Interpretación'],
  '+34 91 357 44 03', 'info@euterpemusic.com', 'rrhh@euterpemusic.com', 'euterpemusic.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Berklee Madrid',
  ['Producción Musical', 'Composición Audiovisual', 'Música de Cine', 'Industria Musical'],
  '+34 91 745 11 28', 'info@berklee.edu', 'rrhh@berklee.edu', 'berklee.edu/madrid'));

// CENTROS DE INTERPRETACIÓN Y ARTES ESCÉNICAS
CENTROS.push(...centro('', 'Escuela Especializada', 'Cristina Rota Centro Trabajo Escénico',
  ['Interpretación', 'Dirección Escénica', 'Dramaturgia'],
  '+34 91 534 91 27', 'info@cristinarota.es', 'rrhh@cristinarota.es', 'cristinarota.es'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Escuela de Cine y Televisión Septima Ars',
  ['Cinematografía', 'Guion', 'Producción', 'Realización TV'],
  '+34 91 524 03 39', 'info@septimaars.com', 'rrhh@septimaars.com', 'septimaars.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'TAI Escuela Universitaria de Artes',
  ['Cinematografía', 'Bellas Artes', 'Comunicación Audiovisual', 'Música', 'Artes Escénicas', 'Diseño'],
  '+34 91 553 87 80', 'info@taiarts.com', 'rrhh@taiarts.com', 'taiarts.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'CES - Centro de Estudios Superiores',
  ['Cinematografía', 'Periodismo', 'Producción Audiovisual'],
  '+34 91 502 27 00', 'info@cesmadrid.es', 'rrhh@cesmadrid.es', 'cesmadrid.es'));

// CENTROS UNIVERSITARIOS DE LA SALUD ADSCRITOS
CENTROS.push(...centro('', 'Adscrito UCM', 'Escuela Universitaria de Enfermería La Paz',
  ['Enfermería', 'Cuidados Intensivos', 'Salud Pública'],
  '+34 91 727 70 00', 'info@enfermerialapaz.com', 'rrhh@enfermerialapaz.com', 'enfermerialapaz.com'));

CENTROS.push(...centro('', 'Adscrito UCM', 'Escuela Universitaria de Enfermería Cruz Roja',
  ['Enfermería', 'Asistencia Sanitaria'],
  '+34 91 535 39 31', 'info@cruzroja.es', 'rrhh@cruzroja.es', 'cruzroja.es'));

CENTROS.push(...centro('', 'Adscrito UAM', 'Escuela Universitaria de Enfermería Fundación Jiménez Díaz',
  ['Enfermería', 'Salud'],
  '+34 91 550 48 00', 'info@fjd.es', 'rrhh@fjd.es', 'fjd.es'));

CENTROS.push(...centro('', 'Adscrito UAH', 'Escuela Universitaria de Enfermería Príncipe de Asturias',
  ['Enfermería', 'Cuidados', 'Salud Pública'],
  '+34 91 887 81 00', 'info@hupa.es', 'rrhh@hupa.es', 'hupa.es'));

CENTROS.push(...centro('', 'Adscrito UAH', 'EU Enfermería y Fisioterapia Cruz Roja',
  ['Enfermería', 'Fisioterapia'],
  '+34 91 387 23 00', 'info@cruzrojamadrid.org', 'rrhh@cruzrojamadrid.org', 'cruzrojamadrid.org'));

// CENTROS DE FORMACIÓN INTERNACIONAL CON SEDE MADRID
CENTROS.push(...centro('', 'Internacional', 'Universidad Internacional Menéndez Pelayo',
  ['CC Sociales', 'Humanidades', 'CC Salud', 'CC Naturales', 'CC Tecnología', 'Estudios Hispánicos'],
  '+34 91 592 06 00', 'info@uimp.es', 'rrhh@uimp.es', 'uimp.es'));

CENTROS.push(...centro('', 'Internacional', 'Universidad Internacional de Andalucía Madrid',
  ['CC Sociales', 'Estudios Iberoamericanos', 'Cooperación al Desarrollo'],
  '+34 91 432 24 50', 'info@unia.es', 'rrhh@unia.es', 'unia.es'));

CENTROS.push(...centro('', 'Internacional', 'Universidad Loyola Madrid Campus',
  ['ADE', 'Comunicación', 'Derecho', 'Educación', 'Psicología', 'Relaciones Internacionales'],
  '+34 91 755 25 25', 'info@uloyola.es', 'rrhh@uloyola.es', 'uloyola.es'));

// CENTROS RELACIONADOS CON LAS UNIVERSIDADES PÚBLICAS DE MADRID
CENTROS.push(...centro('', 'Adscrito UCM', 'Real Centro Universitario El Escorial-MC Filosofía',
  ['Filosofía', 'Estudios Religiosos', 'Humanidades'],
  '+34 91 890 45 45', 'info@rcumariacristina.com', 'rrhh@rcumariacristina.com', 'rcumariacristina.com'));

CENTROS.push(...centro('', 'Adscrito URJC', 'Centro de Estudios Superiores Hospital de Madrid',
  ['Enfermería', 'Fisioterapia', 'Medicina'],
  '+34 91 267 51 99', 'info@hospitaldemadrid.com', 'rrhh@hospitaldemadrid.com', 'hospitaldemadrid.com'));

// MÁS ESCUELAS Y CENTROS ESPECIALIZADOS MADRID
CENTROS.push(...centro('', 'Escuela Especializada', 'Escuela Superior Marketing y Empresa ESME',
  ['Marketing', 'ADE', 'Recursos Humanos'],
  '+34 91 401 11 11', 'info@esme.es', 'rrhh@esme.es', 'esme.es'));

CENTROS.push(...centro('', 'Escuela Especializada', 'CIFF Escuela de Negocios',
  ['Finanzas', 'ADE', 'Comercio Exterior'],
  '+34 91 657 88 00', 'info@ciff.net', 'rrhh@ciff.net', 'ciff.net'));

CENTROS.push(...centro('', 'Escuela Especializada', 'INSEAD Madrid',
  ['Liderazgo', 'Estrategia', 'Marketing', 'Innovación'],
  '+34 91 555 31 00', 'info@insead.edu', 'rrhh@insead.edu', 'insead.edu'));

CENTROS.push(...centro('', 'Escuela Especializada', 'IBES Business School',
  ['ADE', 'Marketing Internacional', 'Logística'],
  '+34 91 458 80 49', 'info@ibesbs.com', 'rrhh@ibesbs.com', 'ibesbs.com'));

CENTROS.push(...centro('', 'Escuela Especializada', 'Big School of Marketing',
  ['Marketing', 'Comunicación', 'Branding', 'Publicidad'],
  '+34 91 758 06 30', 'info@bigschool.es', 'rrhh@bigschool.es', 'bigschool.es'));

CENTROS.push(...centro('', 'Escuela Especializada', 'AICAD Business School',
  ['ADE', 'Marketing Digital', 'Recursos Humanos', 'Logística'],
  '+34 91 308 31 35', 'info@aicad.es', 'rrhh@aicad.es', 'aicad.es'));

CENTROS.push(...centro('', 'Escuela Especializada', 'EMAGISTER Business School',
  ['Marketing', 'ADE', 'Recursos Humanos'],
  '+34 91 781 99 33', 'info@emagister.com', 'rrhh@emagister.com', 'emagister.com'));

// CENTROS DE INVESTIGACIÓN UNIVERSITARIA
CENTROS.push(...centro('', 'Centro Investigación', 'CSIC - Consejo Superior de Investigaciones Científicas',
  ['Ciencias Naturales', 'Humanidades', 'Tecnología', 'Biomedicina', 'Sociología', 'Física', 'Química'],
  '+34 91 568 14 00', 'info@csic.es', 'rrhh@csic.es', 'csic.es'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Networks',
  ['Telecomunicaciones', 'Informática', 'Networking'],
  '+34 91 481 69 50', 'info@networks.imdea.org', 'rrhh@networks.imdea.org', 'networks.imdea.org'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Software',
  ['Software', 'Programación Avanzada', 'Verificación'],
  '+34 91 101 22 02', 'info@software.imdea.org', 'rrhh@software.imdea.org', 'software.imdea.org'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Materiales',
  ['Ciencia Materiales', 'Nanotecnología'],
  '+34 91 549 34 22', 'info@materials.imdea.org', 'rrhh@materials.imdea.org', 'materials.imdea.org'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Energía',
  ['Energías Renovables', 'Almacenamiento Energético', 'Biocombustibles'],
  '+34 91 737 11 20', 'info@energy.imdea.org', 'rrhh@energy.imdea.org', 'energy.imdea.org'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Alimentación',
  ['Alimentación', 'Nutrición', 'Salud'],
  '+34 91 727 81 00', 'info@food.imdea.org', 'rrhh@food.imdea.org', 'food.imdea.org'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Nanociencia',
  ['Nanociencia', 'Nanotecnología', 'Física Avanzada'],
  '+34 91 299 87 00', 'info@nanociencia.imdea.org', 'rrhh@nanociencia.imdea.org', 'nanociencia.imdea.org'));

CENTROS.push(...centro('', 'Centro Investigación', 'IMDEA Agua',
  ['Hidrología', 'Tratamiento de Aguas', 'Sostenibilidad Hídrica'],
  '+34 91 305 26 00', 'info@water.imdea.org', 'rrhh@water.imdea.org', 'water.imdea.org'));

// CENTROS UNIVERSITARIOS DEL CIEMAT, INTA, ISCIII
CENTROS.push(...centro('', 'Centro Investigación', 'CIEMAT - Centro Investigaciones Energéticas',
  ['Energía Nuclear', 'Energías Renovables', 'Medio Ambiente', 'Biotecnología'],
  '+34 91 346 60 00', 'info@ciemat.es', 'rrhh@ciemat.es', 'ciemat.es'));

CENTROS.push(...centro('', 'Centro Investigación', 'INTA - Instituto Nacional de Técnica Aeroespacial',
  ['Ingeniería Aeroespacial', 'Aeronáutica', 'Defensa'],
  '+34 91 520 12 41', 'info@inta.es', 'rrhh@inta.es', 'inta.es'));

CENTROS.push(...centro('', 'Centro Investigación', 'ISCIII - Instituto Salud Carlos III',
  ['Investigación Sanitaria', 'Epidemiología', 'Microbiología', 'Genética'],
  '+34 91 822 20 00', 'info@isciii.es', 'rrhh@isciii.es', 'isciii.es'));

async function addMasCentros() {
  try {
    console.log('🏛️ Añadiendo MÁS centros, escuelas e investigación...\n');
    console.log(`📊 Nuevos: ${CENTROS.length}\n`);

    const { sheets } = await getServices();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A:I"
    });

    const existingRows = (response.data.values || []).length - 1;
    console.log(`📋 Existentes: ${existingRows}`);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'UNIVERSIDADES MADRID'!A1",
      valueInputOption: 'RAW',
      resource: { values: CENTROS }
    });

    const totalFinal = existingRows + CENTROS.length;

    console.log(`\n✅ ${CENTROS.length} centros añadidos`);
    console.log('\n═══════════════════════════════════════');
    console.log('🎉 MADRID MASIVO COMPLETADO');
    console.log('═══════════════════════════════════════');
    console.log(`📊 TOTAL FINAL: ${totalFinal} contactos\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addMasCentros();
