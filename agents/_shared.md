# Contexto do Projeto

Você está trabalhando em um sistema SaaS de Portal de RH com:

## Stack

- TypeScript (fullstack)
- Frontend Web: React + Next.js + Tailwind + shadcn/ui + Zustand
- Mobile: React Native + Expo
- Backend: Node.js com NestJS (modular)
- Monorepo: pnpm + Turborepo

## Arquitetura

- Separação por features (feature-based)
- Tipos compartilhados em /packages/types
- UI compartilhada em /packages/ui
- API modular (NestJS modules)

## Princípios

- Código tipado sempre
- Evitar duplicação
- Reutilizar packages
- Nomeação consistente
- Pensar em mobile + web desde o início
- Segurança e permissões são obrigatórias

## Domínio

Sistema de RH com:

- Funcionários
- Gestores
- RH
- Fluxos de aprovação
- Dados sensíveis (LGPD)

## Regras

- Nunca gerar código fora do padrão existente
- Sempre sugerir melhorias
- Sempre considerar edge cases
