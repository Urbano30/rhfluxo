#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
let filesChecked = 0;
let errorsFound = 0;

console.log('\x1b[34m[Check Architecture] Analisando arquivos TypeScript no monorepo...\x1b[0m\n');

// Recursively get files matching extensions
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (['node_modules', '.next', 'dist', 'build', '.expo', '.turbo', '.git'].includes(file)) {
        continue;
      }
      getFiles(filePath, fileList);
    } else {
      if (/\.(ts|tsx)$/.test(file) && !file.endsWith('.d.ts')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

// Find files in apps/ and packages/
const directoriesToScan = [
  path.join(rootDir, 'apps'),
  path.join(rootDir, 'packages')
];

let allFiles = [];
for (const dir of directoriesToScan) {
  if (fs.existsSync(dir)) {
    getFiles(dir, allFiles);
  }
}

// Check each file
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = path.relative(rootDir, file);
  const lines = content.split(/\r?\n/);
  
  filesChecked++;

  let fileErrors = [];

  // 1. Line count check (Clean Code - small files)
  const lineCount = lines.filter(line => line.trim().length > 0).length;
  if (lineCount > 300) {
    fileErrors.push({
      rule: 'CLEAN_CODE_FILE_SIZE',
      message: `Arquivo muito longo (${lineCount} linhas de código). Divida em arquivos menores e hooks customizados.`
    });
  }

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    // Strip comments to avoid false positives in comments/docs
    const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//g, '');

    // 2. Strict Type check (No 'any')
    // Matches: ": any", "as any", "<any>", but try to avoid partial matches like "company"
    const anyRegex = /(:\s*any\b|\bas\s+any\b|<any>)/i;
    if (anyRegex.test(cleanLine)) {
      fileErrors.push({
        rule: 'STRICT_TS_NO_ANY',
        line: lineNum,
        message: `Uso do tipo proibido 'any' detectado na linha ${lineNum}. Use 'unknown' e refine com type guards.`
      });
    }

    // 3. Import path check (No long relative imports crossing workspaces)
    // Matches relative imports containing multiple ../../ that go back to apps or packages
    const relativeImportRegex = /import\s+.*\s+from\s+["'](\.\.\/\.\.\/\.\.\/.*)["']/;
    if (relativeImportRegex.test(cleanLine)) {
      const match = cleanLine.match(relativeImportRegex);
      fileErrors.push({
        rule: 'ARCH_CLEAN_IMPORTS',
        line: lineNum,
        message: `Import relativo muito longo '${match[1]}' detectado na linha ${lineNum}. Prefira utilizar os aliases globais (ex: @repo/ui, @repo/utils).`
      });
    }
  });

  if (fileErrors.length > 0) {
    errorsFound += fileErrors.length;
    console.log(`\x1b[33m⚠ ${relativePath}\x1b[0m`);
    for (const err of fileErrors) {
      const lineStr = err.line ? `(L${err.line}) ` : '';
      console.log(`   \x1b[31m[${err.rule}]\x1b[0m ${lineStr}${err.message}`);
    }
    console.log('');
  }
}

console.log('--------------------------------------------------');
console.log(`Análise concluída. ${filesChecked} arquivos verificados.`);
if (errorsFound > 0) {
  console.log(`\x1b[31mFalha: ${errorsFound} violações arquiteturais encontradas.\x1b[0m\n`);
  process.exit(1);
} else {
  console.log('\x1b[32mSucesso! Nenhuma violação arquitetural encontrada.\x1b[0m\n');
  process.exit(0);
}
