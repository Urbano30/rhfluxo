#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Parse arguments
const args = process.argv.slice(2);
const componentName = args.find(arg => !arg.startsWith('--'));
const platformArg = args.find(arg => arg.startsWith('--platform='));
const platform = platformArg ? platformArg.split('=')[1] : 'web';

if (!componentName) {
  console.error('\x1b[31mErro: Nome do componente não fornecido.\x1b[0m');
  console.log('Uso: pnpm scaffold:frontend <nome-do-componente> [--platform=web|mobile|ui]');
  console.log('Exemplo: pnpm scaffold:frontend button --platform=ui');
  process.exit(1);
}

if (!['web', 'mobile', 'ui'].includes(platform)) {
  console.error(`\x1b[31mErro: Plataforma inválida "${platform}". Use web, mobile ou ui.\x1b[0m`);
  process.exit(1);
}

// Name sanitization
const kebabCase = componentName
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

const pascalCase = kebabCase
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const rootDir = process.cwd();
let targetDir = '';
let templates = {};

console.log(`\x1b[34m[Scaffold Frontend] Gerando componente "${pascalCase}" para a plataforma "${platform}"...\x1b[0m`);

if (platform === 'ui') {
  // Packages UI Shared
  targetDir = path.join(rootDir, 'packages', 'ui', 'src', 'components', pascalCase);
  fs.mkdirSync(targetDir, { recursive: true });

  templates = {
    [`${pascalCase}.tsx`]: `import * as React from "react";

export interface ${pascalCase}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ${pascalCase}({ children, className, ...props }: ${pascalCase}Props) {
  return (
    <div className={\`p-4 rounded-md border bg-card text-card-foreground shadow-sm \${className || ""}\`} {...props}>
      {children || "${pascalCase} Component"}
    </div>
  );
}
`,
    [`${pascalCase}.test.tsx`]: `import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ${pascalCase} } from "./${pascalCase}";

describe("${pascalCase}", () => {
  it("renders correctly with default text", () => {
    render(<${pascalCase} />);
    expect(screen.getByText("${pascalCase} Component")).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(<${pascalCase}>Custom Child</${pascalCase}>);
    expect(screen.getByText("Custom Child")).toBeInTheDocument();
  });
});
`,
    ['index.ts']: `export * from "./${pascalCase}";
`
  };

} else if (platform === 'web') {
  // Web Application Component
  targetDir = path.join(rootDir, 'apps', 'web', 'src', 'components', pascalCase);
  fs.mkdirSync(targetDir, { recursive: true });

  templates = {
    [`${pascalCase}.tsx`]: `"use client";

import * as React from "react";

export interface ${pascalCase}Props {
  title?: string;
  className?: string;
}

export function ${pascalCase}({ title = "${pascalCase}", className = "" }: ${pascalCase}Props) {
  return (
    <div className={\`flex flex-col gap-2 p-6 bg-white rounded-xl shadow-md border border-gray-100 \${className}\`}>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">Desenvolvido em conformidade com as regras do AGENTS.md.</p>
    </div>
  );
}
`,
    [`${pascalCase}.test.tsx`]: `import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ${pascalCase} } from "./${pascalCase}";

describe("${pascalCase}", () => {
  it("renders with default title", () => {
    render(<${pascalCase} />);
    expect(screen.getByText("${pascalCase}")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<${pascalCase} title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });
});
`,
    ['index.ts']: `export * from "./${pascalCase}";
`
  };

} else if (platform === 'mobile') {
  // Mobile React Native / Expo Component
  targetDir = path.join(rootDir, 'apps', 'mobile', 'components', pascalCase);
  fs.mkdirSync(targetDir, { recursive: true });

  templates = {
    [`${pascalCase}.tsx`]: `import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

export interface ${pascalCase}Props extends ViewProps {
  label?: string;
}

export function ${pascalCase}({ label = "${pascalCase} Mobile", style, ...props }: ${pascalCase}Props) {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0c0b2",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191c1e",
  },
});
`,
    [`${pascalCase}.test.tsx`]: `import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ${pascalCase} } from "./${pascalCase}";

describe("${pascalCase}", () => {
  it("renders label correctly", () => {
    render(<${pascalCase} />);
    expect(screen.getByText("${pascalCase} Mobile")).toBeTruthy();
  });

  it("renders custom label", () => {
    render(<${pascalCase} label="Custom Mobile Label" />);
    expect(screen.getByText("Custom Mobile Label")).toBeTruthy();
  });
});
`,
    ['index.ts']: `export * from "./${pascalCase}";
`
  };
}

// Write the template files
for (const [filename, content] of Object.entries(templates)) {
  const filePath = path.join(targetDir, filename);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\x1b[32m✔ Criado:\x1b[0m ${path.relative(rootDir, filePath)}`);
}

// For packages/ui, auto-export from main index.ts
if (platform === 'ui') {
  const mainIndexPath = path.join(rootDir, 'packages', 'ui', 'src', 'index.ts');
  if (fs.existsSync(mainIndexPath)) {
    let indexContent = fs.readFileSync(mainIndexPath, 'utf8');
    const exportStatement = `export * from "./components/${pascalCase}";`;
    
    if (!indexContent.includes(exportStatement)) {
      indexContent += `\n${exportStatement}\n`;
      fs.writeFileSync(mainIndexPath, indexContent, 'utf8');
      console.log(`\x1b[32m✔ Exportação adicionada empackages/ui/src/index.ts\x1b[0m`);
    }
  }
}

console.log(`\x1b[32m\nSucesso! Componente "${pascalCase}" criado para ${platform}.\x1b[0m\n`);
