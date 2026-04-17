#!/usr/bin/env node
/**
 * Setup OAuth - RUBEN-COTON_API-GOOGLE
 * Genera un nuevo refresh_token para manager@rubencoton.com
 * con TODOS los scopes necesarios.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');
const { google } = require('googleapis');
require('dotenv').config({ path: path.join(__dirname, '..', 'config', '.env') });

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/contacts',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/forms',
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/analytics.readonly',
];

const TOKEN_PATH = path.join(__dirname, '..', 'config', 'oauth', 'token.json');
const PORT = 3999;

async function main() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `http://localhost:${PORT}/oauth/callback`;

  if (!clientId || !clientSecret) {
    console.error('ERROR: Faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en config/.env');
    process.exit(1);
  }

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
    login_hint: 'manager@rubencoton.com',
  });

  console.log('\n=== Setup OAuth - manager@rubencoton.com ===\n');
  console.log('1. Abre esta URL en el navegador:\n');
  console.log(authUrl);
  console.log(`\n2. Autoriza con manager@rubencoton.com`);
  console.log('3. Seras redirigido a localhost:' + PORT + ' automaticamente\n');

  // Servidor temporal para capturar el code
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      const code = url.searchParams.get('code');
      const err = url.searchParams.get('error');

      if (err) {
        res.end(`Error: ${err}`);
        server.close();
        return reject(new Error(err));
      }
      if (code) {
        res.end('<h1>OK</h1><p>Puedes cerrar esta pestana.</p>');
        server.close();
        resolve(code);
      }
    });
    server.listen(PORT);
    setTimeout(() => {
      server.close();
      reject(new Error('Timeout esperando autorizacion (5 min)'));
    }, 5 * 60 * 1000);
  });

  const { tokens } = await oAuth2Client.getToken(code);
  fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log(`\n[OK] Token guardado en: ${TOKEN_PATH}`);
  console.log(`     Scopes: ${tokens.scope}`);
  console.log(`     Refresh token: ${tokens.refresh_token ? 'SI (guardar bien)' : 'NO (ejecuta de nuevo con prompt=consent)'}`);
}

main().catch(err => {
  console.error('\nERROR:', err.message);
  process.exit(1);
});
