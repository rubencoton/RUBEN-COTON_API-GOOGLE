/**
 * OAuth Manager - Hub central RUBEN-COTON_API-GOOGLE
 * Cuenta: manager@rubencoton.com
 *
 * Gestiona la obtencion de un cliente OAuth autenticado
 * reutilizando el refresh_token ya existente en los otros proyectos.
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'config', '.env') });

// Ubicaciones conocidas del refresh_token de manager@rubencoton.com
const TOKEN_SOURCES = [
  path.join(__dirname, '..', '..', 'config', 'oauth', 'token.json'),
  'C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/codex-google-hub/secrets/oauth_token_manager_rubencoton_com.json',
  'C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/drive-manager-rubencoton-com/config/token.json',
  'C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS/RUBEN-COTON_COPIA-CRM-ARTES-BUHO/config/token.json',
];

/**
 * Carga el primer token disponible de las fuentes conocidas.
 */
function loadToken() {
  for (const tokenPath of TOKEN_SOURCES) {
    if (fs.existsSync(tokenPath)) {
      const raw = fs.readFileSync(tokenPath, 'utf8');
      const token = JSON.parse(raw);
      return { token, source: tokenPath };
    }
  }
  throw new Error(
    'No se encontro ningun token OAuth para manager@rubencoton.com.\n' +
    'Ejecuta: npm run oauth:setup'
  );
}

/**
 * Retorna un OAuth2Client autenticado listo para usar con cualquier API Google.
 *
 * @param {string[]} [scopes] - Opcional. Verifica que el token tiene estos scopes.
 * @returns {Promise<import('google-auth-library').OAuth2Client>}
 */
async function getAuthClient(scopes = []) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost';

  if (!clientId || !clientSecret) {
    throw new Error(
      'Faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en config/.env'
    );
  }

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const { token, source } = loadToken();
  oAuth2Client.setCredentials(token);

  // Verificar scopes si se pidieron
  if (scopes.length > 0 && token.scope) {
    const tokenScopes = token.scope.split(' ');
    const missing = scopes.filter(s =>
      !tokenScopes.some(ts => ts === s || ts.endsWith('/' + s))
    );
    if (missing.length > 0) {
      console.warn(
        `[oauth-manager] Token de ${source} no incluye los scopes: ${missing.join(', ')}`
      );
    }
  }

  return oAuth2Client;
}

/**
 * Retorna instancias de las APIs Google mas comunes.
 */
async function getServices() {
  const auth = await getAuthClient();
  return {
    auth,
    gmail: google.gmail({ version: 'v1', auth }),
    drive: google.drive({ version: 'v3', auth }),
    sheets: google.sheets({ version: 'v4', auth }),
    calendar: google.calendar({ version: 'v3', auth }),
    youtube: google.youtube({ version: 'v3', auth }),
    people: google.people({ version: 'v1', auth }),
    tasks: google.tasks({ version: 'v1', auth }),
    slides: google.slides({ version: 'v1', auth }),
    docs: google.docs({ version: 'v1', auth }),
    forms: google.forms({ version: 'v1', auth }),
  };
}

module.exports = {
  getAuthClient,
  getServices,
  loadToken,
  TOKEN_SOURCES,
};
