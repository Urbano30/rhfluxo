#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const formNameArg = args.find(arg => !arg.startsWith('--'));
const fieldsArg = args.find(arg => arg.startsWith('--fields='));
const appArg = args.find(arg => arg.startsWith('--app='));

const app = appArg ? appArg.split('=')[1] : 'web';

if (!formNameArg) {
  console.error('\x1b[31mErro: Nome do formulário não fornecido.\x1b[0m');
  console.log('Uso: pnpm scaffold:form <nome-do-formulario> [--fields=campo1:tipo,campo2:tipo] [--app=web|mobile]');
  console.log('Exemplo: pnpm scaffold:form EmployeeCreate --fields=name:string,email:string,age:number');
  process.exit(1);
}

if (!['web', 'mobile'].includes(app)) {
  console.error(`\x1b[31mErro: App inválido "${app}". Use web ou mobile.\x1b[0m`);
  process.exit(1);
}

// Parse fields (supports both comma and space separators)
const rawFields = fieldsArg 
  ? fieldsArg.split('=')[1].split(/[\s,]+/).filter(Boolean)
  : ['name:string'];
const fields = rawFields.map(f => {
  const [name, type] = f.split(':');
  return {
    name: name.trim(),
    type: (type || 'string').trim()
  };
});

// Sanitization
const kebabCase = formNameArg
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

const pascalCase = kebabCase
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

// Add "Form" suffix if not present
const componentName = pascalCase.endsWith('Form') ? pascalCase : `${pascalCase}Form`;

const rootDir = process.cwd();
let targetDir = '';

console.log(`\x1b[34m[Scaffold Form] Gerando formulário "${componentName}" para "${app}"...\x1b[0m`);

if (app === 'web') {
  targetDir = path.join(rootDir, 'apps', 'web', 'src', 'components', componentName);
  fs.mkdirSync(targetDir, { recursive: true });

  // Generate Zod Schema and TypeScript interface
  const zodFields = fields.map(f => {
    if (f.type === 'number') {
      return `  ${f.name}: z.coerce.number({ required_error: "${f.name} é obrigatório" }).min(1, "${f.name} deve ser maior que zero"),`;
    }
    if (f.name === 'email') {
      return `  email: z.string({ required_error: "E-mail é obrigatório" }).email("Formato de e-mail inválido"),`;
    }
    return `  ${f.name}: z.string({ required_error: "${f.name} é obrigatório" }).min(2, "${f.name} deve ter pelo menos 2 caracteres"),`;
  }).join('\n');

  // Input Components mapping
  const formFieldsHtml = fields.map(f => {
    const capitalizedName = f.name.charAt(0).toUpperCase() + f.name.slice(1);
    const inputType = f.type === 'number' ? 'number' : f.name === 'email' ? 'email' : 'text';
    
    return `      {/* Campo: ${capitalizedName} */}
      <div className="space-y-1">
        <Label htmlFor="${f.name}" className="text-xs font-semibold text-[#191c1e] block">
          ${capitalizedName}
        </Label>
        <Input
          id="${f.name}"
          type="${inputType}"
          placeholder="Digite o ${f.name}"
          {...register("${f.name}")}
          className="w-full bg-[#f7f9fb] border border-[#e0c0b2] rounded-lg text-base focus-visible:ring-[#006879] focus-visible:border-[#006879] focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        {errors.${f.name} && (
          <span className="text-xs text-red-500 font-medium">{errors.${f.name}.message}</span>
        )}
      </div>`;
  }).join('\n\n');

  const componentContent = `"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ${componentName}Schema = z.object({
${zodFields}
});

export type ${componentName}Data = z.infer<typeof ${componentName}Schema>;

interface ${componentName}Props {
  onSubmit: (data: ${componentName}Data) => void;
  defaultValues?: Partial<${componentName}Data>;
}

export function ${componentName}({ onSubmit, defaultValues }: ${componentName}Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<${componentName}Data>({
    resolver: zodResolver(${componentName}Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">${componentName}</h2>
      
${formFieldsHtml}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#e77a2f] hover:bg-[#e77a2f]/90 text-white font-semibold py-2 rounded-lg transition-all"
      >
        {isSubmitting ? "Enviando..." : "Salvar"}
      </Button>
    </form>
  );
}
`;

  // Write files
  fs.writeFileSync(path.join(targetDir, `${componentName}.tsx`), componentContent, 'utf8');

  // Test File
  const firstField = fields[0].name;
  const testContent = `import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ${componentName} } from "./${componentName}";

describe("${componentName}", () => {
  it("renders form fields correctly", () => {
    render(<${componentName} onSubmit={() => {}} />);
    
    ${fields.map(f => {
      const capitalized = f.name.charAt(0).toUpperCase() + f.name.slice(1);
      return `expect(screen.getByLabelText(/${capitalized}/i)).toBeInTheDocument();`;
    }).join('\n    ')}
  });

  it("validates empty submission", async () => {
    const mockOnSubmit = vi.fn();
    render(<${componentName} onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("submits form data successfully when valid", async () => {
    const mockOnSubmit = vi.fn();
    render(<${componentName} onSubmit={mockOnSubmit} />);

    // Preenche os campos
    ${fields.map(f => {
      const capitalized = f.name.charAt(0).toUpperCase() + f.name.slice(1);
      const val = f.type === 'number' ? '42' : f.name === 'email' ? 'teste@exemplo.com' : 'Valor de teste';
      return `fireEvent.change(screen.getByLabelText(/${capitalized}/i), { target: { value: "${val}" } });`;
    }).join('\n    ')}

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
`;

  fs.writeFileSync(path.join(targetDir, `${componentName}.test.tsx`), testContent, 'utf8');
  
  // Index file
  fs.writeFileSync(path.join(targetDir, 'index.ts'), `export * from "./${componentName}";\n`, 'utf8');

} else {
  // Mobile app (React Native)
  targetDir = path.join(rootDir, 'apps', 'mobile', 'components', componentName);
  fs.mkdirSync(targetDir, { recursive: true });

  const zodFields = fields.map(f => {
    if (f.type === 'number') {
      return `  ${f.name}: z.coerce.number({ required_error: "${f.name} é obrigatório" }).min(1, "${f.name} deve ser maior que zero"),`;
    }
    if (f.name === 'email') {
      return `  email: z.string({ required_error: "E-mail é obrigatório" }).email("Formato de e-mail inválido"),`;
    }
    return `  ${f.name}: z.string({ required_error: "${f.name} é obrigatório" }).min(2, "${f.name} deve ter pelo menos 2 caracteres"),`;
  }).join('\n');

  // Input Components mapping for React Native
  const formFieldsReactNative = fields.map(f => {
    const capitalizedName = f.name.charAt(0).toUpperCase() + f.name.slice(1);
    const keyboardType = f.type === 'number' ? 'numeric' : f.name === 'email' ? 'email-address' : 'default';
    
    return `      {/* Campo: ${capitalizedName} */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>${capitalizedName}</Text>
        <Controller
          control={control}
          name="${f.name}"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.${f.name} && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={String(value || "")}
              keyboardType="${keyboardType}"
              placeholder="Digite o ${f.name}"
              placeholderTextColor="#584237"
            />
          )}
        />
        {errors.${f.name} && (
          <Text style={styles.errorText}>{errors.${f.name}.message}</Text>
        )}
      </View>`;
  }).join('\n\n');

  const componentContent = `import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const ${componentName}Schema = z.object({
${zodFields}
});

export type ${componentName}Data = z.infer<typeof ${componentName}Schema>;

interface ${componentName}Props {
  onSubmit: (data: ${componentName}Data) => void;
  defaultValues?: Partial<${componentName}Data>;
}

export function ${componentName}({ onSubmit, defaultValues }: ${componentName}Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<${componentName}Data>({
    resolver: zodResolver(${componentName}Schema),
    defaultValues,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>${componentName}</Text>

${formFieldsReactNative}

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Enviando..." : "Salvar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0c0b2",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191c1e",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0c0b2",
    paddingBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#191c1e",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e0c0b2",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f7f9fb",
    color: "#191c1e",
  },
  inputError: {
    borderColor: "#ff0000",
  },
  errorText: {
    fontSize: 12,
    color: "#ff0000",
    marginTop: 4,
  },
  button: {
    height: 48,
    backgroundColor: "#e77a2f",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
`;

  fs.writeFileSync(path.join(targetDir, `${componentName}.tsx`), componentContent, 'utf8');

  // Test File
  const testContent = `import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import { ${componentName} } from "./${componentName}";

describe("${componentName}", () => {
  it("renders form fields correctly", () => {
    render(<${componentName} onSubmit={() => {}} />);
    
    ${fields.map(f => {
      const capitalized = f.name.charAt(0).toUpperCase() + f.name.slice(1);
      return `expect(screen.getByPlaceholderText(/Digite o ${f.name}/i)).toBeTruthy();`;
    }).join('\n    ')}
  });

  it("submits empty triggers validation errors", async () => {
    const mockOnSubmit = jest.fn();
    render(<${componentName} onSubmit={mockOnSubmit} />);

    fireEvent.press(screen.getByText("Salvar"));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
`;

  fs.writeFileSync(path.join(targetDir, `${componentName}.test.tsx`), testContent, 'utf8');
  fs.writeFileSync(path.join(targetDir, 'index.ts'), `export * from "./${componentName}";\n`, 'utf8');
}

for (const f of fields) {
  console.log(`\x1b[32m✔ Campo adicionado:\x1b[0m ${f.name} (${f.type})`);
}
console.log(`\x1b[32m✔ Arquivos gravados em:\x1b[0m ${path.relative(rootDir, targetDir)}`);
console.log(`\x1b[32m\nSucesso! Formulário "${componentName}" criado com React Hook Form + Zod.\x1b[0m\n`);
