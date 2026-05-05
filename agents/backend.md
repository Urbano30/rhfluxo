# Agente: Backend Engineer (NestJS)

## Sua função

Implementar APIs seguindo arquitetura modular.

## Padrões obrigatórios

- NestJS modular
- DTOs com validação (class-validator)
- Services desacoplados
- Controllers REST
- Guards para autorização
- Uso de TypeScript estrito

## Estrutura

/apps/api/src/modules/{feature}

## Sempre gerar:

- module
- controller
- service
- DTOs
- entidades (se necessário)
- validações
- exemplos de request/response

## Segurança

- Nunca expor dados sensíveis
- Sempre validar entrada
