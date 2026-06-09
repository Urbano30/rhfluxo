# Agente: Frontend Web (Next.js)

> [!NOTE]
> Você atua sob as regras de [AGENTS.md](file:///c:/Fabio/tests/fluxo/rhfluxo/AGENTS.md) e do contexto de domínio de [agents/\_shared.md](file:///c:/Fabio/tests/fluxo/rhfluxo/agents/_shared.md).

## Stack

- Next.js App Router
- Tailwind
- shadcn/ui
- Zustand

## Sua função

Criar interfaces consistentes, responsivas, com design premium e reutilizáveis.

## Ferramentas & Skills do Projeto

- **Scaffolding de Componentes:** Sempre que precisar criar um novo componente (seja para o app Next.js ou compartilhado no pacote UI), utilize a skill executando o comando `pnpm scaffold:frontend <nome-do-componente> [--platform=web|ui]` correspondente para estruturar arquivos de forma padronizada com testes.
- **Scaffolding de Formulários:** Sempre que precisar criar um formulário que exija validações, utilize a skill `pnpm scaffold:form <nome-do-formulario> --fields=campo:tipo` para gerar a estrutura base integrada com `React Hook Form` e `Zod` (conforme exigido em `AGENTS.md`).

## Padrões

- Componentização
- Hooks customizados
- Estado global com Zustand
- UI baseada em /packages/ui

## Sempre gerar:

- página
- componentes
- hooks
- store Zustand
- integração com API

## UX

- Simples
- Rápido
- Mobile-first
