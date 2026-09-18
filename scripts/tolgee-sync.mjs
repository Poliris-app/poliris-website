// Pulls the current content of every managed string in Tolgee and writes
// it back into src/locales/en.js / fr.js — the reverse direction of the
// export scripts used elsewhere in this project's history.
//
// Uses recast (AST-based source transform) rather than regenerating the
// files from scratch, so everything NOT touched — comments, formatting,
// numbers/booleans/ids/slugs/colors/icons/codes that were never sent to
// Tolgee in the first place — is left byte-for-byte as it was. Only the
// exact string leaves that differ from Tolgee's current value get edited.
//
// Run standalone: TOLGEE_API_URL=... TOLGEE_API_KEY=... node scripts/tolgee-sync.mjs
// Exits with a non-zero code (and no file writes) if anything looks wrong,
// so a CI workflow calling this never commits a half-broken result.

import * as recast from 'recast';
import * as babelParser from '@babel/parser';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const TOLGEE_API_URL = process.env.TOLGEE_API_URL;
const TOLGEE_API_KEY = process.env.TOLGEE_API_KEY;
if (!TOLGEE_API_URL || !TOLGEE_API_KEY) {
  console.error('TOLGEE_API_URL and TOLGEE_API_KEY must be set.');
  process.exit(1);
}

// Same trick used by the site's own LangContext.jsx at runtime: Tolgee
// flattens arrays into sibling keys like "foo[0]", "foo[1]" (and
// "foo[0][0]" for nested arrays) — this turns them back into real arrays.
function reconstructArrays(node) {
  if (Array.isArray(node)) return node.map(reconstructArrays);
  if (node && typeof node === 'object') {
    let current = node;
    while (true) {
      const groups = {};
      const passthrough = {};
      let sawBracket = false;
      for (const [k, v] of Object.entries(current)) {
        const m = k.match(/^(.*)\[(\d+)\]$/);
        if (m) {
          sawBracket = true;
          const [, base, idxStr] = m;
          (groups[base] ??= [])[Number(idxStr)] = v;
        } else {
          passthrough[k] = v;
        }
      }
      if (!sawBracket) { current = passthrough; break; }
      current = { ...passthrough, ...groups };
    }
    const out = {};
    for (const [k, v] of Object.entries(current)) out[k] = reconstructArrays(v);
    return out;
  }
  return node;
}

// Never touch these even if Tolgee somehow had a value there (it shouldn't
// — these were excluded from every export to Tolgee in the first place).
const DENY_KEYS = new Set(['id', 'slug', 'key', 'color', 'icon', 'code']);

const babelPlugins = [];
const customParser = {
  parse(source) {
    return babelParser.parse(source, { sourceType: 'module', plugins: babelPlugins });
  },
};

let changedCount = 0;

// Walks the AST object/array literal in lockstep with the plain-JS Tolgee
// value at the same structural position (by property name / array index —
// no path strings needed). Only StringLiteral leaves are ever touched.
function applyToAst(astNode, tolgeeValue, keyName) {
  if (!astNode || tolgeeValue === undefined) return;
  if (keyName && DENY_KEYS.has(keyName)) return;

  if (astNode.type === 'StringLiteral') {
    if (typeof tolgeeValue === 'string' && tolgeeValue !== '' && astNode.value !== tolgeeValue) {
      astNode.value = tolgeeValue;
      delete astNode.extra;
      changedCount++;
    }
    return;
  }
  if (astNode.type === 'ObjectExpression') {
    if (typeof tolgeeValue !== 'object' || tolgeeValue === null || Array.isArray(tolgeeValue)) return;
    for (const prop of astNode.properties) {
      if (prop.type !== 'ObjectProperty') continue;
      const name = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
      applyToAst(prop.value, tolgeeValue[name], name);
    }
    return;
  }
  if (astNode.type === 'ArrayExpression') {
    if (!Array.isArray(tolgeeValue)) return;
    astNode.elements.forEach((el, i) => applyToAst(el, tolgeeValue[i], keyName));
    return;
  }
  // Any other node type (NumericLiteral, BooleanLiteral, NullLiteral,
  // TemplateLiteral, etc.) is left alone — these are exactly the field
  // types that never got exported to Tolgee to begin with.
}

async function syncOne(fileName, lang, tolgeeData) {
  const filePath = path.join(ROOT, 'src/locales', fileName);
  const source = readFileSync(filePath, 'utf8');
  const ast = recast.parse(source, { parser: customParser });

  const exportDecl = ast.program.body.find((n) => n.type === 'ExportDefaultDeclaration');
  if (!exportDecl || exportDecl.declaration.type !== 'ObjectExpression') {
    throw new Error(`${fileName}: couldn't find "export default { ... }"`);
  }

  const before = changedCount;
  applyToAst(exportDecl.declaration, tolgeeData, null);
  const changedHere = changedCount - before;

  if (changedHere === 0) {
    console.log(`${fileName}: already up to date (0 changes)`);
    return;
  }

  const output = recast.print(ast, { quote: 'single' }).code;

  // Safety net: make sure the file we're about to write is still valid,
  // loadable JS with the expected shape before it ever touches disk.
  const tmpPath = filePath + '.sync-check.mjs';
  writeFileSync(tmpPath, output, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmpPath).href + `?t=${Date.now()}`);
    if (!mod.default || typeof mod.default !== 'object') {
      throw new Error('default export is missing or not an object after the sync');
    }
  } finally {
    try { unlinkSync(tmpPath); } catch { /* best effort cleanup */ }
  }

  writeFileSync(filePath, output, 'utf8');
  console.log(`${fileName}: updated ${changedHere} string(s)`);
}

const res = await fetch(`${TOLGEE_API_URL}/v2/projects/translations/en,fr`, {
  headers: { 'X-API-Key': TOLGEE_API_KEY },
});
if (!res.ok) {
  console.error(`Failed to fetch Tolgee translations: HTTP ${res.status}`);
  process.exit(1);
}
const live = await res.json();
const fixed = { en: reconstructArrays(live.en), fr: reconstructArrays(live.fr) };

await syncOne('en.js', 'en', fixed.en);
await syncOne('fr.js', 'fr', fixed.fr);

console.log(`Done. ${changedCount} total string(s) synced from Tolgee.`);
