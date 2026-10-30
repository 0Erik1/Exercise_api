# 🏋️ API de Gestão de Exercícios e Treinos

Uma API RESTful robusta desenvolvida para gerenciamento de exercícios físicos, histórico e sessões de treino de usuários, com controle de acesso baseado em funções (usuário comum e administrador) via tokens JWT.

---

## 📌 Visão Geral

A API foi projetada para alimentar plataformas de treino e bem-estar físico. Permite:
- **Autenticação e Perfis**: Cadastro de usuários, login seguro com criptografia de senhas e gerenciamento do próprio perfil.
- **Catálogo de Exercícios**: Consulta de exercícios com filtros avançados (grupo muscular primário, equipamento, nível, etc.), além de controle administrativo (criação, edição e exclusão de exercícios restritos a administradores).
- **Registro de Treinos (`UserExercise`)**: Registro detalhado dos treinos realizados pelos usuários, incluindo séries individuais com repetições, carga (peso) e tempo de execução.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework Web**: [Express 5](https://expressjs.com/)
- **Linguagem**: [TypeScript 7](https://www.typescriptlang.org/) (compilação estrita e execução de desenvolvimento com [tsx](https://github.com/privatenumber/tsx))
- **ORM**: [Prisma ORM 7](https://www.prisma.io/) com driver adapter PostgreSQL (`@prisma/adapter-pg`)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (hospedado na nuvem via [Supabase](https://supabase.com/))
- **Autenticação & Segurança**: [JSON Web Tokens (JWT)](https://jwt.io/) e [bcrypt](https://github.com/kelektiv/node.bcrypt.js) para hash de senhas
- **Hospedagem & Deploy**: [Render](https://render.com/)

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base nas seguintes chaves necessárias:

```env
# URL de conexão com o banco de dados (pooler / transações)
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?pgbouncer=true"

# URL de conexão direta com o banco de dados (usada para migrations e deploy)
DIRECT_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"

# Chave secreta para assinatura e validação dos tokens JWT
KEY="sua_chave_secreta_jwt_super_segura"
```

> **Atenção**: Nunca versione seu arquivo `.env` ou compartilhe suas credenciais reais publicamente.

---

## 🚀 Guia de Instalação e Execução Local

### Pré-requisitos
- Node.js (versão 20 ou superior recomendada)
- Gerenciador de pacotes `npm`
- Instância do PostgreSQL ativa (ou projeto no Supabase)

### Passo a Passo

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Exercise_api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie o arquivo `.env` na raiz do projeto preenchendo as variáveis `DATABASE_URL`, `DIRECT_URL` e `KEY`.

4. **Gere os artefatos do Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Execute as migrações no banco de dados (se necessário):**
   ```bash
   npx prisma migrate dev
   ```

6. **(Opcional) Popule o banco com exercícios iniciais:**
   ```bash
   npm run seed
   ```

7. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor será iniciado na porta **8000** (`http://localhost:8000`).

---

## 📋 Tabela de Rotas e Endpoints

A URL base da aplicação é `http://localhost:8000`.

### 1. Autenticação e Usuários (`/user`)

| Método | Caminho | JWT Obrigatório? | Permissão Admin? | Descrição |
| :--- | :--- | :---: | :---: | :--- |
| `POST` | `/user` | ❌ Não | ❌ Não | Cadastra um novo usuário no sistema |
| `POST` | `/user/login` | ❌ Não | ❌ Não | Autentica o usuário e retorna o token JWT |
| `GET` | `/user/me` | ✅ Sim | ❌ Não | Retorna as informações do usuário autenticado |
| `PUT` | `/user/me` | ✅ Sim | ❌ Não | Atualiza dados cadastrais (nome, e-mail ou senha) |
| `DELETE` | `/user/me` | ✅ Sim | ❌ Não | Remove a conta do usuário logado |

### 2. Catálogo de Exercícios (`/exercise`)

| Método | Caminho | JWT Obrigatório? | Permissão Admin? | Descrição |
| :--- | :--- | :---: | :---: | :--- |
| `GET` | `/exercise` | ❌ Não | ❌ Não | Lista todos os exercícios com suporte a filtros |
| `GET` | `/exercise/:id` | ❌ Não | ❌ Não | Obtém detalhes de um exercício pelo ID |
| `POST` | `/exercise` | ✅ Sim | ✅ Sim | Cadastra um novo exercício no catálogo |
| `PUT` | `/exercise/:id` | ✅ Sim | ✅ Sim | Atualiza dados de um exercício existente |
| `DELETE` | `/exercise/:id` | ✅ Sim | ✅ Sim | Remove um exercício do catálogo |

*Filtros aceitos via Query Params na rota `GET /exercise`: `name`, `force`, `level`, `category`, `equipment`, `primaryMuscles` (separados por vírgula).*

### 3. Registro de Treinos (`/user-exercise`)

| Método | Caminho | JWT Obrigatório? | Permissão Admin? | Descrição |
| :--- | :--- | :---: | :---: | :--- |
| `GET` | `/user-exercise` | ✅ Sim | ❌ Não | Lista o histórico de treinos e séries do usuário |
| `POST` | `/user-exercise` | ✅ Sim | ❌ Não | Registra uma nova sessão de exercício com séries |
| `PUT` | `/user-exercise/:id` | ✅ Sim | ❌ Não | Atualiza o exercício ou séries de uma sessão |
| `DELETE` | `/user-exercise/:id` | ✅ Sim | ❌ Não | Exclui uma sessão de treino e suas séries |

---

## 📤 Exemplos de Requisições

> Em requisições protegidas, inclua o cabeçalho:  
> `Authorization: Bearer <SEU_TOKEN_JWT>`

### 🔹 Autenticação e Usuários

#### Cadastro de Usuário
- **Endpoint**: `POST /user`
- **Body**:
  ```json
  {
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senhaSegura123"
  }
  ```
- **Resposta Esperada**: `201 Created`

#### Login (Obtenção de Token)
- **Endpoint**: `POST /user/login`
- **Body**:
  ```json
  {
    "email": "joao@example.com",
    "password": "senhaSegura123"
  }
  ```
- **Resposta Esperada (`200 OK`)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Obter Dados do Usuário Autenticado
- **Endpoint**: `GET /user/me`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Resposta Esperada (`200 OK`)**:
  ```json
  {
    "id": "c1f7a0b3-96b4-4b5c-b1d5-e7f09328ab8d",
    "name": "João Silva",
    "email": "joao@example.com"
  }
  ```

#### Atualizar Perfil
- **Endpoint**: `PUT /user/me`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "name": "João Pedro Silva"
  }
  ```
- **Resposta Esperada**: `200 OK`

#### Excluir Própria Conta
- **Endpoint**: `DELETE /user/me`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Resposta Esperada**: `204 No Content`

---

### 🔹 Catálogo de Exercícios

#### Listar Exercícios (com Filtros)
- **Endpoint**: `GET /exercise?category=strength&primaryMuscles=chest,shoulders`
- **Resposta Esperada (`200 OK`)**:
  ```json
  [
    {
      "id": "supino-reto-barra",
      "name": "Supino Reto com Barra",
      "force": "push",
      "level": "intermediate",
      "mechanic": "compound",
      "equipment": "barbell",
      "primaryMuscles": ["chest"],
      "secondaryMuscles": ["triceps", "shoulders"],
      "instructions": [
        "Deite-se no banco reto.",
        "Segure a barra com uma pegada um pouco mais aberta que os ombros.",
        "Desça a barra controladamente até o peito e empurre para cima."
      ],
      "category": "strength"
    }
  ]
  ```

#### Buscar Exercício por ID
- **Endpoint**: `GET /exercise/supino-reto-barra`
- **Resposta Esperada (`200 OK`)**:
  ```json
  {
    "id": "supino-reto-barra",
    "name": "Supino Reto com Barra",
    "force": "push",
    "level": "intermediate",
    "mechanic": "compound",
    "equipment": "barbell",
    "primaryMuscles": ["chest"],
    "secondaryMuscles": ["triceps", "shoulders"],
    "instructions": ["..."],
    "category": "strength"
  }
  ```

#### Criar Exercício (Requer Admin)
- **Endpoint**: `POST /exercise`
- **Headers**: `Authorization: Bearer <TOKEN_ADMIN>`
- **Body**:
  ```json
  {
    "id": "agachamento-livre",
    "name": "Agachamento Livre",
    "force": "push",
    "level": "intermediate",
    "mechanic": "compound",
    "equipment": "barbell",
    "primaryMuscles": ["quadriceps"],
    "secondaryMuscles": ["glutes", "hamstrings", "calves"],
    "instructions": [
      "Posicione a barra sobre os trapézios.",
      "Flexione os joelhos e desça os quadris até a linha paralela.",
      "Retorne à posição inicial empurrando o chão com os calcanhares."
    ],
    "category": "strength"
  }
  ```
- **Resposta Esperada**: `201 Created`

#### Atualizar Exercício
- **Endpoint**: `PUT /exercise/agachamento-livre`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "level": "advanced"
  }
  ```
- **Resposta Esperada**: `200 OK`

#### Deletar Exercício (Requer Admin)
- **Endpoint**: `DELETE /exercise/agachamento-livre`
- **Headers**: `Authorization: Bearer <TOKEN_ADMIN>`
- **Resposta Esperada**: `204 No Content`

---

### 🔹 Registro de Treinos (`/user-exercise`)

#### Registrar Treino com Séries
- **Endpoint**: `POST /user-exercise`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "exerciseId": "supino-reto-barra",
    "sets": [
      {
        "repetitions": 12,
        "weight": 60,
        "time": 45
      },
      {
        "repetitions": 10,
        "weight": 70,
        "time": 50
      },
      {
        "repetitions": 8,
        "weight": 80,
        "time": 40
      }
    ]
  }
  ```
- **Resposta Esperada**: `201 Created`

#### Listar Treinos do Usuário
- **Endpoint**: `GET /user-exercise`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Resposta Esperada (`200 OK`)**:
  ```json
  [
    {
      "id": "e8d975fb-a1d2-4ee1-b760-496191ef9720",
      "userId": "c1f7a0b3-96b4-4b5c-b1d5-e7f09328ab8d",
      "exerciseId": "supino-reto-barra",
      "dateTime": "2026-10-30T22:30:00.000Z",
      "exerciseSet": [
        {
          "id": "a93e3d96-857e-40aa-b2b9-e1f13b631e84",
          "userExerciseId": "e8d975fb-a1d2-4ee1-b760-496191ef9720",
          "repetitions": 12,
          "weight": 60,
          "time": 45
        }
      ]
    }
  ]
  ```

#### Atualizar Treino Registrado
- **Endpoint**: `PUT /user-exercise/e8d975fb-a1d2-4ee1-b760-496191ef9720`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "exerciseId": "supino-reto-barra",
    "sets": [
      {
        "repetitions": 12,
        "weight": 65,
        "time": 45
      }
    ]
  }
  ```
- **Resposta Esperada**: `200 OK`

#### Deletar Treino Registrado
- **Endpoint**: `DELETE /user-exercise/e8d975fb-a1d2-4ee1-b760-496191ef9720`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Resposta Esperada**: `204 No Content`

---

## 🌐 Instruções de Deploy (Render)

Para implantar a API como um **Web Service** no [Render](https://render.com/):

### 1. Configuração do Web Service
- **Environment**: `Node`
- **Root Directory**: `.` (ou deixe em branco para raiz do repositório)
- **Build Command**:
  ```bash
  npm install && npx prisma generate && npm run build
  ```
- **Start Command**:
  ```bash
  npm run start
  ```

### 2. Configuração das Variáveis de Ambiente no Render
Na aba **Environment** do seu serviço no Render, adicione:
- `DATABASE_URL`: String de conexão em modo pooler (com `pgbouncer=true`).
- `DIRECT_URL`: String de conexão direta com o banco PostgreSQL / Supabase.
- `KEY`: Sua chave secreta para assinatura dos tokens JWT.
- `NODE_VERSION`: `20` ou `22` (opcional, para garantir compatibilidade com ESM e Prisma).

---

## 📄 Licença

Este projeto está licenciado sob os termos da licença especificada no arquivo [LICENSE](LICENSE).
