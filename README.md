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
│   ├── sdk/        # Cliente/fetchers baseados no backend com suporte a Mock Mode
│   ├── mocks/      # Fábricas de mocks de dados e cenários (compartilhado)
│   ├── hooks/      # Custom React Hooks compartilhados
│   └── constants/  # Constantes globais do negócio
│
├── agents/         # Perfis e instruções de persona para Agentes de IA
├── docs/           # Documentação arquitetural e de produto
└── tests/          # Testes E2E (Playwright), integração, performance
```

## 🛠 Stack Tecnológica

- **Linguagem:** TypeScript
- **Frontend Web:** React 19, Next.js 16, Tailwind CSS, shadcn/ui, Zustand
- **Mobile:** React Native, Expo
- **Backend:** Node.js (NestJS modular)
- **Monorepo:** pnpm workspaces, Turborepo
- **Qualidade:** ESLint, Prettier, Husky, lint-staged, Vitest / Jest

## 📦 Como Iniciar

### Pré-requisitos

- Node.js `v18+`
- pnpm `v9+`

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
- `pnpm scaffold:module <nome>`: Skill de projeto que gera o boilerplate estruturado de um módulo NestJS no backend (Module, Controller, Service, DTOs e Spec) em conformidade com as regras do monorepo.

## 🤖 Desenvolvimento Inteligente (IA & Agentes)

Este repositório foi construído para ser "AI-Friendly", possuindo integração direta com ferramentas como o **Cursor**:

- **Regras do Projeto ([`.cursorrules`](./.cursorrules) / [`AGENTS.md`](./AGENTS.md)):** Instruções automáticas de conduta de IA, clean code, TDD obrigatório e restrições arquiteturais para o assistente de programação.
- **Personas de Agente ([`agents/`](./agents/)):** Diretrizes específicas para cada papel do desenvolvimento que você pode invocar anexando o respectivo arquivo em sua conversa:
  - `@agents/_shared.md` — Contexto do Domínio de RH (LGPD, Funcionários, Aprovadores).
  - `@agents/backend.md` — Engenheiro Backend (Módulos NestJS).
  - `@agents/frontend.md` — Engenheiro Frontend Web (Next.js App Router).
  - `@agents/mobile.md` — Engenheiro Mobile (React Native + Expo).
  - `@agents/product.md` — Product Manager (Regras de negócio e especificações).
  - `@agents/qa.md` — QA Engineer (Vitest/Jest, mocks e edge cases).
  - `@agents/security.md` — Especialista em Segurança (RBAC, LGPD, vazamento de dados).
- **Mocking Compartilhado (`@repo/mocks`):** Possibilidade de rodar a navegação e prototipagem no frontend (Web e Mobile) sem conexão com o backend ativo, ativando o **Mock Mode** no `@repo/sdk` para latência simulada e massa de testes mockados centralizada.

---

_Construído com as melhores práticas._
