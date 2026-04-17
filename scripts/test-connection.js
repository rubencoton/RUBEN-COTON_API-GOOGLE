#!/usr/bin/env node
/**
 * Test de conexion - RUBEN-COTON_API-GOOGLE
 * Verifica que todas las APIs Google estan accesibles para manager@rubencoton.com
 */

const { getServices, loadToken } = require('../src/auth/oauth-manager');

async function main() {
  console.log('=== Test de conexion APIs Google ===');
  console.log('Cuenta: manager@rubencoton.com\n');

  try {
    const { token, source } = loadToken();
    console.log(`[OK] Token cargado desde: ${source}`);
    console.log(`     Scopes: ${token.scope || '(no scope field)'}\n`);
  } catch (err) {
    console.error(`[ERR] ${err.message}`);
    process.exit(1);
  }

  let services;
  try {
    services = await getServices();
    console.log('[OK] OAuth2Client inicializado\n');
  } catch (err) {
    console.error(`[ERR] OAuth2Client: ${err.message}`);
    process.exit(1);
  }

  const tests = [
    { name: 'Gmail', fn: () => services.gmail.users.getProfile({ userId: 'me' }) },
    { name: 'Drive', fn: () => services.drive.about.get({ fields: 'user' }) },
    { name: 'Calendar', fn: () => services.calendar.calendarList.list({ maxResults: 1 }) },
    { name: 'Sheets', fn: () => services.sheets.spreadsheets.get({ spreadsheetId: 'test' }).catch(e => {
      // El error "Requested entity was not found" confirma que la API responde
      if (e.code === 404) return { data: { reachable: true } };
      throw e;
    }) },
    { name: 'YouTube', fn: () => services.youtube.channels.list({ part: 'id', mine: true }) },
    { name: 'People', fn: () => services.people.people.get({ resourceName: 'people/me', personFields: 'names' }) },
    { name: 'Tasks', fn: () => services.tasks.tasklists.list({ maxResults: 1 }) },
    { name: 'Slides', fn: () => services.slides.presentations.get({ presentationId: 'test' }).catch(e => {
      if (e.code === 404 || e.code === 400) return { data: { reachable: true } };
      throw e;
    }) },
    { name: 'Docs', fn: () => services.docs.documents.get({ documentId: 'test' }).catch(e => {
      if (e.code === 404 || e.code === 400) return { data: { reachable: true } };
      throw e;
    }) },
    { name: 'Forms', fn: () => services.forms.forms.get({ formId: 'test' }).catch(e => {
      if (e.code === 404 || e.code === 400) return { data: { reachable: true } };
      throw e;
    }) },
  ];

  console.log('Probando APIs...\n');
  for (const test of tests) {
    try {
      await test.fn();
      console.log(`[OK]  ${test.name}`);
    } catch (err) {
      const code = err.code || err.response?.status || '???';
      const msg = err.message?.split('\n')[0] || String(err);
      console.log(`[ERR] ${test.name} (${code}): ${msg}`);
    }
  }

  console.log('\n=== Test completado ===');
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
