#!/usr/bin/env node
/**
 * Auditoria de credenciales Google en el workspace.
 * Busca tokens, client_secrets y API keys en 01_PROYECTOS/.
 */

const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/elrub/Desktop/CARPETA CODEX/01_PROYECTOS';
const PATTERNS = {
  apiKey: /AIzaSy[A-Za-z0-9_-]{33}/g,
  clientSecret: /GOCSPX-[A-Za-z0-9_-]+/g,
  refreshToken: /1\/\/[0-9A-Za-z_-]+/g,
};
const EXTENSIONS = ['.json', '.env', '.js', '.ts', '.gs'];
const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build'];

function walk(dir, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) walk(full, results);
    } else {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext) || entry.name.startsWith('.env')) {
        results.push(full);
      }
    }
  }
  return results;
}

function scan() {
  console.log('=== Auditoria de credenciales Google ===\n');
  const files = walk(ROOT);
  const findings = { apiKey: new Set(), clientSecret: new Set(), refreshToken: new Set() };
  const byFile = {};

  for (const file of files) {
    let content;
    try { content = fs.readFileSync(file, 'utf8'); } catch { continue; }

    for (const [kind, pat] of Object.entries(PATTERNS)) {
      const matches = content.match(pat);
      if (matches) {
        for (const m of matches) {
          findings[kind].add(m);
          byFile[file] ||= [];
          byFile[file].push(`${kind}: ${m.slice(0, 20)}...`);
        }
      }
    }
  }

  console.log(`API Keys unicas: ${findings.apiKey.size}`);
  console.log(`Client Secrets unicos: ${findings.clientSecret.size}`);
  console.log(`Refresh Tokens unicos: ${findings.refreshToken.size}\n`);

  console.log('=== Archivos con credenciales ===');
  for (const [file, items] of Object.entries(byFile)) {
    console.log(`\n${file}`);
    for (const item of items) console.log(`  ${item}`);
  }
}

scan();
