# API Treino

API REST desenvolvida em **TypeScript**, **Express**, **Prisma ORM** e **PostgreSQL** para gerenciamento de exercícios físicos.

Este projeto foi criado com foco em **aprendizado**, simulando o desenvolvimento de uma API utilizada em um ambiente real de trabalho.

## Objetivos

Este projeto tem como principais objetivos:

- Aprender a desenvolver APIs REST utilizando Express.
- Aprender a utilizar o Prisma ORM.
- Trabalhar com PostgreSQL.
- Aprender boas práticas de organização de projetos.
- Praticar tratamento de erros.
- Utilizar um banco de dados remoto (Supabase) em vez de um banco local.
- Futuramente hospedar a API em uma plataforma online para simular um ambiente de produção.

---

## Tecnologias utilizadas

- TypeScript
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Supabase

---

## Base de dados dos exercícios

Os exercícios utilizados para popular o banco de dados foram obtidos do projeto:

**João Gugel — exercicios-bd-ptbr**

https://github.com/joao-gugel/exercicios-bd-ptbr

Foi utilizada a versão traduzida para português do banco de exercícios.

---

## Funcionalidades implementadas

### Exercícios

- Seed automático do banco utilizando arquivo JSON.
- Consulta de exercícios.
- Busca por nome.
- Filtro por:
  - força (`force`)
  - nível (`level`)
  - categoria (`category`)
  - equipamento (`equipment`)
  - músculos primários (`primaryMuscles`)

---

## Estrutura do projeto

```
src/
├── controllers/
├── routes/
├── prisma.ts
└── server.ts

prisma/
├── migrations/
├── schema.prisma
├── seed.ts
└── exercises-ptbr-full-translation.json
```

---

## Próximos passos

- Buscar exercício por ID.
- CRUD de usuários.
- CRUD de treinos.
- Registro de séries e repetições.
- Autenticação.
- Deploy da API.
- Desenvolvimento de um aplicativo mobile utilizando esta API.

---

## Status

🚧 Projeto em desenvolvimento.
