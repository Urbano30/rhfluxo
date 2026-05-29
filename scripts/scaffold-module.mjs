#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mapear diretório atual do script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obter argumentos
const featureName = process.argv[2];

if (!featureName) {
  console.error('\x1b[31mErro: Nome da feature não fornecido.\x1b[0m');
  console.log('Uso: pnpm scaffold:module <nome-da-feature>');
  console.log('Exemplo: pnpm scaffold:module cargo');
  process.exit(1);
}

// Higienizar nome
const lowercaseName = featureName.toLowerCase();
const pascalCase = lowercaseName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');
const camelCase = pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);

// Caminho de destino no monorepo (relativo à raiz)
const targetDir = path.join(process.cwd(), 'apps', 'api', 'src', 'modules', lowercaseName);
const dtoDir = path.join(targetDir, 'dto');

// Validar se já existe
if (fs.existsSync(targetDir)) {
  console.error(`\x1b[31mErro: O módulo "${lowercaseName}" já existe em ${targetDir}.\x1b[0m`);
  process.exit(1);
}

console.log(`\x1b[34m[Scaffold] Criando estrutura de pastas para a feature "${lowercaseName}"...\x1b[0m`);

// Criar pastas
fs.mkdirSync(dtoDir, { recursive: true });

// Templates de Arquivo
const templates = {
  // Module
  [`${lowercaseName}.module.ts`]: `import { Module } from '@nestjs/common';
import { ${pascalCase}Controller } from './${lowercaseName}.controller';
import { ${pascalCase}Service } from './${lowercaseName}.service';

@Module({
  controllers: [${pascalCase}Controller],
  providers: [${pascalCase}Service],
})
export class ${pascalCase}Module {}
`,

  // Controller
  [`${lowercaseName}.controller.ts`]: `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ${pascalCase}Service } from './${lowercaseName}.service';
import { Create${pascalCase}Dto } from './dto/create-${lowercaseName}.dto';
import { Update${pascalCase}Dto } from './dto/update-${lowercaseName}.dto';

@Controller('${lowercaseName}')
export class ${pascalCase}Controller {
  constructor(private readonly ${camelCase}Service: ${pascalCase}Service) {}

  @Post()
  create(@Body() create${pascalCase}Dto: Create${pascalCase}Dto) {
    return this.${camelCase}Service.create(create${pascalCase}Dto);
  }

  @Get()
  findAll() {
    return this.${camelCase}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${camelCase}Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${pascalCase}Dto: Update${pascalCase}Dto) {
    return this.${camelCase}Service.update(id, update${pascalCase}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${camelCase}Service.remove(id);
  }
}
`,

  // Service
  [`${lowercaseName}.service.ts`]: `import { Injectable } from '@nestjs/common';
import { Create${pascalCase}Dto } from './dto/create-${lowercaseName}.dto';
import { Update${pascalCase}Dto } from './dto/update-${lowercaseName}.dto';

@Injectable()
export class ${pascalCase}Service {
  create(create${pascalCase}Dto: Create${pascalCase}Dto) {
    return {
      message: 'This action adds a new ${camelCase}',
      data: create${pascalCase}Dto,
    };
  }

  findAll() {
    return {
      message: 'This action returns all ${camelCase}',
      data: [],
    };
  }

  findOne(id: string) {
    return {
      message: \`This action returns a #\${id} ${camelCase}\`,
      id,
    };
  }

  update(id: string, update${pascalCase}Dto: Update${pascalCase}Dto) {
    return {
      message: \`This action updates a #\${id} ${camelCase}\`,
      id,
      data: update${pascalCase}Dto,
    };
  }

  remove(id: string) {
    return {
      message: \`This action removes a #\${id} ${camelCase}\`,
      id,
    };
  }
}
`,

  // Create DTO
  [`dto/create-${lowercaseName}.dto.ts`]: `export class Create${pascalCase}Dto {
  // Adicione propriedades da feature com class-validator se necessário
  name: string;
}
`,

  // Update DTO
  [`dto/update-${lowercaseName}.dto.ts`]: `import { Create${pascalCase}Dto } from './create-${lowercaseName}.dto';

export class Update${pascalCase}Dto implements Partial<Create${pascalCase}Dto> {
  name?: string;
}
`,

  // Spec Test
  [`${lowercaseName}.controller.spec.ts`]: `import { Test, TestingModule } from '@nestjs/testing';
import { ${pascalCase}Controller } from './${lowercaseName}.controller';
import { ${pascalCase}Service } from './${lowercaseName}.service';

describe('${pascalCase}Controller', () => {
  let controller: ${pascalCase}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${pascalCase}Controller],
      providers: [${pascalCase}Service],
    }).compile();

    controller = module.get<${pascalCase}Controller>(${pascalCase}Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
`
};

// Escrever os arquivos
for (const [filename, content] of Object.entries(templates)) {
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\x1b[32m✔ Criado:\x1b[0m ${path.relative(process.cwd(), filePath)}`);
}

console.log(`\x1b[32m\nSucesso! Módulo "${pascalCase}Module" criado em apps/api/src/modules/${lowercaseName}\x1b[0m`);
console.log(`\x1b[33mLembre-se de importar o ${pascalCase}Module no seu AppModule (apps/api/src/app.module.ts).\x1b[0m\n`);
