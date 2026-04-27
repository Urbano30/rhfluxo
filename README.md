# 🚀 RHFluxo Monorepo

Este é um monorepo profissional e altamente escalável para o projeto RHFluxo, construído para ter excelência em desenvolvimento, reuso de código e ser extremamente "AI-Friendly" para assistentes de programação (Cursor, Copilot, etc).

## 🏗 Arquitetura do Projeto

O projeto utiliza `pnpm workspaces` junto com `Turborepo` para orquestração. A estrutura é dividida em dois eixos principais: **apps** (Aplicações fim) e **packages** (Pacotes compartilhados).

```
repo/
├── apps/
│   ├── web/        # Next.js App (Frontend Principal)
│   ├── mobile/     # React Native com Expo (App Mobile)
│   ├── api/        # Node.js + NestJS/Fastify (Backend)
│   └── admin/      # Next.js/Vite (Painel Admin - Planejado)
│
├── packages/
│   ├── ui/         # Componentes UI (Tailwind, shadcn)
│   ├── types/      # Tipagens TS compartilhadas (DTOs, Entidades)
│   ├── utils/      # Funções auxiliares puras
│   ├── auth/       # Lógica de autenticação compartilhada
│   ├── config/     # Configurações globais (TSConfig, ESLint)
│   ├── sdk/        # Cliente/fetchers baseados no backend
│   ├── hooks/      # Custom React Hooks compartilhados
│   └── constants/  # Constantes globais do negócio
│
├── docs/           # Documentação arquitetural e de produto
└── tests/          # Testes E2E (Playwright), integração, performance
```

## 🛠 Stack Tecnológica

- **Linguagem:** TypeScript
- **Frontend Web:** React 18+, Next.js, Tailwind CSS, shadcn/ui, Zustand
- **Mobile:** React Native, Expo
- **Backend:** Node.js (NestJS / Fastify modular)
- **Monorepo:** pnpm workspaces, Turborepo
- **Qualidade:** ESLint, Prettier, Husky, lint-staged, Vitest

## 📦 Como Iniciar

### Pré-requisitos

- Node.js `v18+`
- pnpm `v8+`

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repo>
cd rhfluxo
```

2. Instale as dependências na raiz:

```bash
pnpm install
```

3. Configure o `.env` (baseie-se no `.env.example`):

```bash
cp .env.example .env
```

### Comandos Úteis

- `pnpm dev`: Inicia o ambiente de desenvolvimento para todos os apps em paralelo usando Turbo.
- `pnpm build`: Roda o processo de build para todos os apps. O Turbo aplica cache em resultados não alterados.
- `pnpm lint`: Executa a checagem de estilo e qualidade de código em todo o monorepo.
- `pnpm test`: Executa os testes de todos os pacotes.
- `pnpm clean`: Limpa os diretórios de build e módulos de node em caso de inconsistência de cache.

## 🤖 Trabalhando com IA (Cursor, Copilot)

Foi criado um arquivo dedicado [`AGENTS.md`](./AGENTS.md) com as restrições rígidas da arquitetura e as regras de clean code que os assistentes de IA e os desenvolvedores devem seguir. Por favor, leia-o antes de iniciar.

---

_Construído com as melhores práticas._
