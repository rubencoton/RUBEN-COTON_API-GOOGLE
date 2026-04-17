#!/usr/bin/env node
/**
 * Prueba real: lista documentos y presentaciones de manager@rubencoton.com
 */
const { getServices } = require('../src/auth/oauth-manager');

(async () => {
  const { drive } = await getServices();

  console.log('=== Google Docs de manager@rubencoton.com ===');
  const docs = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.document' and trashed=false",
    pageSize: 10,
    fields: 'files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
  });
  console.log(`Total mostrado: ${docs.data.files.length}`);
  docs.data.files.forEach(f => console.log(`  [DOC] ${f.name}  (${f.modifiedTime.slice(0,10)})`));

  console.log('\n=== Google Slides ===');
  const slides = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.presentation' and trashed=false",
    pageSize: 10,
    fields: 'files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
  });
  console.log(`Total mostrado: ${slides.data.files.length}`);
  slides.data.files.forEach(f => console.log(`  [SLIDE] ${f.name}  (${f.modifiedTime.slice(0,10)})`));

  console.log('\n=== Google Forms ===');
  const forms = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.form' and trashed=false",
    pageSize: 10,
    fields: 'files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
  });
  console.log(`Total mostrado: ${forms.data.files.length}`);
  forms.data.files.forEach(f => console.log(`  [FORM] ${f.name}  (${f.modifiedTime.slice(0,10)})`));
})();
