# 🤖 Instruções para IA (Cursor, Copilot, ChatGPT, Claude)

Bem-vindo ao monorepo. Você deve seguir rigidamente estas regras ao gerar código ou sugerir alterações. Este projeto adota um padrão de excelência de empresas de alto nível.

## 1. Stack e Ferramentas 🛠️

- **Linguagem:** TypeScript estrito em todo o projeto. **NUNCA** use `any`. Se não souber o tipo, use `unknown` e refine depois com guards.
- **Gerenciador de pacotes:** `pnpm`. **NUNCA** sugira `npm install` ou `yarn add`. Use `pnpm add <pkg>` ou `pnpm add <pkg> --filter <workspace>` para instalar pacotes.
- **Validação:** Zod deve ser utilizado para todos os schemas, validação de inputs e de variáveis de ambiente.
- **Frontend Web:** Next.js (App Router), Tailwind CSS, shadcn/ui.
- **Frontend Mobile:** React Native (Expo).
- **Backend:** Node.js (NestJS ou Fastify Modular).

## 2. Arquitetura do Monorepo 🏢

- **Apps (`apps/`):** Devem conter **apenas** código específico da plataforma. A lógica de negócios central deve ser movida para os packages quando for compartilhada.
- **Packages (`packages/`):** Código compartilhado e isolado.
  - `@repo/ui`: Componentes React visuais, desacoplados da lógica de negócios.
  - `@repo/utils`: Funções puras utilitárias genéricas.
  - `@repo/types`: Tipos TypeScript compartilhados (ex: DTOs do backend para o frontend).
  - `@repo/sdk`: Cliente de API (fetchers tipados baseados no backend).
  - `@repo/auth`: Lógica de autenticação e gerenciamento de sessão compartilhada.

## 3. Padrões de Código (Clean Code) 🧹

- Prefira **arquivos pequenos** com funções curtas. Nomes de funções e variáveis devem ser descritivos e em Inglês (`handleUserSubmit`, `fetchData`).
- Evite duplicar lógica entre web e mobile. Se as duas plataformas precisam da mesma função utilitária ou regra, mova para um `package` em `packages/`.
- Use Functional Components e Custom Hooks no React/React Native.
- Para estado complexo e global, use `Zustand`. Evite Context API a menos que estritamente necessário (por performance).
- Para formulários, sempre use `React Hook Form` integrado com `Zod` (através de resolvers).

## 4. Testes e TDD 🧪

- **TDD MANDATÓRIO:** Toda nova feature, regra de negócio ou componente deve ser iniciada **sempre** pela criação dos testes. Você (IA) deve primeiro escrever e me mostrar o teste, para só depois implementar o código para fazê-lo passar.
- Sempre que criar regras de negócio complexas (nos packages ou backend), use `Vitest`.
- Para componentes de UI interativos, use `React Testing Library`.
- NUNCA proponha uma implementação final de código sem antes validar os casos de teste correspondentes.

## 5. Práticas de Imports 📦

- Evite caminhos relativos muito longos (`../../../../`).
- Sempre prefira usar os aliases globais exportados pelos workspaces, como:
  ```typescript
  import { Button } from "@repo/ui";
  import { UserDTO } from "@repo/types";
  import { formatDate } from "@repo/utils";
  ```

Siga estas instruções sem exceção. Caso algo fuja do padrão estabelecido, informe imediatamente o usuário.
