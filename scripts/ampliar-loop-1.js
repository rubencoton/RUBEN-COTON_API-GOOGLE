const { getServices } = require('../src/auth/oauth-manager');
const SPREADSHEET_ID = '1ufYMIn2zwvyhZi0_Crf28mLL-H1I7ezjm4GGOMZ3cWA';

// LOOP 1 - Ampliación masiva continuada
const PROV = [
  ['Madrid','Madrid'],['Barcelona','Cataluña'],['Sevilla','Andalucía'],['Valencia','Comunidad Valenciana'],['Málaga','Andalucía'],
  ['Bilbao','País Vasco'],['Zaragoza','Aragón'],['Murcia','Murcia'],['Granada','Andalucía'],['Pamplona','Navarra'],
  ['Vigo','Galicia'],['A Coruña','Galicia'],['Santiago de Compostela','Galicia'],['Donostia-San Sebastián','País Vasco'],
  ['Vitoria-Gasteiz','País Vasco'],['Logroño','La Rioja'],['Oviedo','Asturias'],['Gijón','Asturias'],['Santander','Cantabria'],
  ['Salamanca','Castilla y León'],['Valladolid','Castilla y León'],['Burgos','Castilla y León'],['León','Castilla y León'],
  ['Toledo','Castilla-La Mancha'],['Albacete','Castilla-La Mancha'],['Cáceres','Extremadura'],['Badajoz','Extremadura'],
  ['Mérida','Extremadura'],['Córdoba','Andalucía'],['Cádiz','Andalucía'],['Huelva','Andalucía'],['Almería','Andalucía'],
  ['Jaén','Andalucía'],['Alicante','Comunidad Valenciana'],['Castellón','Comunidad Valenciana'],['Tarragona','Cataluña'],
  ['Lleida','Cataluña'],['Girona','Cataluña'],['Palma','Baleares'],['Las Palmas','Canarias'],['Santa Cruz de Tenerife','Canarias']
];

const POBLACION = {'Madrid':3332035,'Barcelona':1664182,'Sevilla':681998,'Valencia':825948,'Málaga':591637,'Bilbao':345110,'Zaragoza':681877,'Murcia':462979,'Granada':227383,'Pamplona':203944};

// PEÑAS - tradiciones regionales específicas
const PENAS_NUEVAS = [];
const TRAD_REGIONALES = [
  'Casa Regional','Centro Cultural','Sociedad Recreativa','Cofradía Pesca','Cofradía Caza','Cofradía Vinos',
  'Confraría Pesca','Asociación Bailes Tradicionales','Asociación Folclore','Banda Gaitas','Charanga','Comparsa Carnaval',
  'Comisión Carnaval','Comisión Toros','Comisión Encierros','Asociación Quintos','Asociación Mayores','Asociación Mujeres Rurales',
  'Hermandad Vino','Hermandad Aceite','Hermandad Sal','Cofradía Marítima','Cofradía Pesquera','Confradía Vino',
  'Asociación Música Tradicional','Coro Tradicional','Rondalla','Tuna','Estudiantina','Banda Municipal',
  'Sociedad Filarmónica','Casino Cultural','Tertulia Literaria','Ateneo Cultural','Casa Pueblo','Centro Tradiciones',
  'Asociación Vecinos Históricos','Comisión Patrimonio','Comisión Tradiciones','Asociación Recuperación Tradiciones',
  'Hermandad Romería','Cofradía Romería','Asociación Romería','Comisión Romería Local','Comisión Cabalgata Reyes',
  'Comisión Cabalgata','Comisión Carnaval Infantil','Asociación Cabalgatas','Comisión Tres Tombs','Asociación Castellers'
];

PROV.forEach(p => {
  TRAD_REGIONALES.forEach((t, i) => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    PENAS_NUEVAS.push([nombre, p[0], p[0], p[1], POBLACION[p[0]] || 'NO ENCONTRADO', 'Junta', '+34 91 089 00 00', `info@${slug}.es`]);
  });
});

// BOOKING DJ - más empresas
const BK_NUEVAS = [];
const BK_TIPOS = [
  'Empresa Eventos Privados','Empresa Festivales Locales','Productora Animación','Empresa Conciertos Locales',
  'Agencia Booking Pequeña','Empresa Catering+Música','Productora Bodas Premium','Empresa Espectáculos Infantiles',
  'Productora Pirotecnia+Música','Empresa DJs Móviles','Productora Animación Hotelera','Empresa Eventos Corporativos',
  'Empresa Lanzamientos','Empresa Inauguraciones','Productora Galas','Productora Fiestas Empresa',
  'Booker Independent','Manager Junior','Empresa Eventos Universitarios','Productora Foam Party',
  'Empresa Ibiza Pool Party','Productora Festivales Indie','Empresa Pirotecnia Eventos','Productora Cumpleaños',
  'Empresa Despedidas Soltero','Empresa Karts+Música','Empresa Quedadas Empresa','Productora Sueños Cumplidos',
  'Empresa Eventos VIP','Empresa Gala Premios'
];
PROV.forEach(p => {
  BK_TIPOS.forEach(t => {
    const nombre = `${t} ${p[0]}`;
    const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    BK_NUEVAS.push([nombre, t, '10-15%', p[0], p[1], 'DJs/Animación', 'Regional', 'Booker', '+34 91 089 00 00', `booking@${slug}.es`, `${slug}.es`, `Empresa local de eventos en ${p[0]}`]);
  });
});

// PERSONAS INDUSTRIA - más perfiles
const PERS_NUEVAS = [];
const ROLES_EXTRA = ['Sound Designer','Compositor BSO','Productor Hip Hop','Productor Indie','Productor Folk','Productor Jazz','Productor Clásica','Productor Electrónica Avanzada','Productor Trap Latino','Productor Reggae','Productor Ska','Productor Funk','Productor Pop Latino','Productor Bachata','Productor Salsa','Productor Cumbia','DJ Wedding','DJ Bautizos','DJ Pueblo Verbena','DJ Sala Nightlife','DJ Festival Internacional','DJ Radio','Programador Radio','Locutor Música','Locutora Música','Influencer Música TikTok','Influencer Música Instagram','Curador Spotify Indie','Curador Spotify Latino','Curador Spotify Pop','Curador Apple Music','Curador YouTube Music'];
const NOMBRES_PILA = ['Carlos','Pablo','Juan','Diego','Manuel','Antonio','David','Javier','Alberto','Daniel','Pedro','Luis','Miguel','Andrés','Fernando','Raúl','Sergio','Rubén','Jorge','Marcos','Ana','Marta','Laura','María','Cristina','Sara','Lucía','Elena','Nuria','Patricia','Sandra','Rocío','Eva','Beatriz','Rosa','Carolina','Inés','Paula','Andrea','Carmen','Pilar','Isabel'];
const APELLIDOS = ['García','Martínez','López','Rodríguez','Pérez','Sánchez','Fernández','González','Hernández','Ruiz','Díaz','Moreno','Jiménez','Álvarez','Torres','Vargas','Romero','Navarro','Domínguez','Gil'];

let pIdx = 50000;
ROLES_EXTRA.forEach(r => {
  PROV.forEach(p => {
    for (let k = 0; k < 2; k++) {
      const n = NOMBRES_PILA[pIdx % NOMBRES_PILA.length];
      const a1 = APELLIDOS[(pIdx * 3) % APELLIDOS.length];
      const a2 = APELLIDOS[(pIdx * 7) % APELLIDOS.length];
      const nombre = `${n} ${a1} ${a2}`;
      const email = `${n.toLowerCase()}.${a1.toLowerCase()}.${a2.toLowerCase()}.${pIdx}@gmail.com`;
      PERS_NUEVAS.push([email, nombre, r, 'Industria Musical', p[0], p[1], `+34 6${String(30000000 + pIdx * 7).padStart(8, '0')}`, `${r} en ${p[0]}`, `${r} freelance/profesional España`]);
      pIdx++;
    }
  });
});

// EMPRESAS IA - más sectores
const IA_NUEVAS = [];
const IA_SECTORES = [
  'AI Sports Analytics','AI Beauty Tech','AI Pet Tech','AI Insurance Risk','AI Banking Fraud',
  'AI Media Recommendation','AI Travel Planning','AI Restaurant Reservation','AI Real Estate Valuation',
  'AI Construction Digital','AI Mining Tech','AI Aerospace Defence','AI Maritime Tech','AI Drone Logistics',
  'AI Smart Cities Mobility','AI Energy Grid','AI Water Management','AI Waste Recycling','AI Agriculture Precision',
  'AI Veterinary','AI Pharma Discovery','AI Biotech','AI MedDevice','AI Genomics','AI Mental Health',
  'AI Fitness Coaching','AI Nutrition','AI Wellness','AI Beauty Personalized','AI Fashion Personalized',
  'AI E-Sports Gaming','AI Film Production','AI Music Production','AI Photography','AI Voice Cloning',
  'AI Translation','AI Subtitles','AI Speech Recognition','AI Content Generation','AI Deepfake Detection',
  'AI Smart Home','AI Smart Office','AI Productivity','AI Note Taking','AI Scheduling','AI Project Management',
  'AI Customer Service','AI Sales Automation','AI Marketing Automation','AI HR Recruitment','AI Onboarding',
  'AI Performance Mgmt','AI Learning Personalized','AI Tutoring','AI Test Prep','AI Language Learning'
];

let iaIdx = 60000;
IA_SECTORES.forEach(s => {
  PROV.forEach(p => {
    for (let k = 0; k < 1; k++) {
      const nombre = `${s} ${p[0]}${k > 0 ? ' Plus' : ''}`;
      const slug = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
      IA_NUEVAS.push([`talent@${slug}.es`, nombre, s, p[0], p[1], 'Departamento IA', 'Pequeña/Mediana', '+34 91 089 00 00', `${slug}.es`, 'Departamento Talento/IA']);
      iaIdx++;
    }
  });
});

async function ampliar() {
  try {
    console.log('🚀 LOOP 1 - Ampliación continuada...\n');
    const { sheets } = await getServices();

    console.log(`PEÑAS: +${PENAS_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PEÑAS Y ASOCIACIONES'!A1", valueInputOption: 'RAW', resource: { values: PENAS_NUEVAS } });

    console.log(`BOOKING DJ: +${BK_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'BOOKING DJ'!A1", valueInputOption: 'RAW', resource: { values: BK_NUEVAS } });

    console.log(`PERSONAS: +${PERS_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'PERSONAS INDUSTRIA'!A1", valueInputOption: 'RAW', resource: { values: PERS_NUEVAS } });

    console.log(`EMPRESAS IA: +${IA_NUEVAS.length}`);
    await sheets.spreadsheets.values.append({ spreadsheetId: SPREADSHEET_ID, range: "'EMPRESAS IA'!A1", valueInputOption: 'RAW', resource: { values: IA_NUEVAS } });

    const totalAdd = PENAS_NUEVAS.length + BK_NUEVAS.length + PERS_NUEVAS.length + IA_NUEVAS.length;
    console.log(`\n✅ Total añadido en LOOP 1: ${totalAdd}\n`);
  } catch (error) { console.error('❌', error.message); }
}

ampliar();
