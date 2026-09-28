# 🏋️ Exercise_api

API RESTful desenvolvida em Node.js, Express e TypeScript para gerenciamento e acompanhamento de treinos personalizados, catálogo de exercícios e histórico de séries dos usuários. Utiliza Prisma ORM para persistência de dados e autenticação via JSON Web Token (JWT).

---

## 🚀 Tecnologias

- **Linguagem:** TypeScript
- **Runtime:** Node.js
- **Framework Web:** Express
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Token)
- **Criptografia:** Bcrypt / Argon2

---

## 📁 Estrutura do Projeto

```text
src/
 ├── controllers/
 │    ├── user/            # Cadastro, login, perfil e exclusão de conta
 │    ├── exercise/        # CRUD completo do catálogo de exercícios
 │    └── userExercise/    # CRUD completo de treinos (POST, GET, PUT, DELETE)
 ├── middlewares/
 │    └── authMiddleware.ts # Validação e extração do token JWT
 ├── routes/
 │    ├── userRoutes.ts     # Rotas /user
 │    ├── exerciseRoutes.ts # Rotas /exercise
 │    └── userExerciseRouter.ts # Rotas /user-exercise
 ├── prisma.js
 └── server.ts
prisma/
 ├── schema.prisma         # Schema e relacionamentos do banco de dados
 └── seed.ts               # População inicial do banco (exercícios)
```

---

## 🗄️ Modelagem do Banco de Dados

- **`User`**: Armazena credenciais e dados cadastrais dos usuários.
- **`Exercise`**: Catálogo global de exercícios disponíveis na aplicação.
- **`UserExercise`**: Sessão de treino vinculada a um usuário (`userId`) e a um exercício (`exerciseId`).
- **`ExerciseSet`**: Séries associadas a uma sessão de treino (`userExerciseId`), contendo repetições, carga (peso) e tempo de descanso.

> **Créditos da Base de Dados:**  
> O catálogo inicial de exercícios utilizado no arquivo de *seed* foi obtido a partir da base em português disponibilizada no repositório [exercicios-bd-ptbr](https://github.com/gugeldev/exercicios-bd-ptbr).

---

## 🔐 Autenticação

As rotas protegidas exigem o envio do token no cabeçalho HTTP `Authorization`:

```http
Authorization: Bearer <seu_token_jwt>
```

---

## 📌 Endpoints da API

### 👥 Usuários (`/user`)

| Método | Rota | Autenticado | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/user` | ❌ | Cadastro de novo usuário. |
| `POST` | `/user/login` | ❌ | Autenticação e geração de token JWT. |
| `GET` | `/user/me` | ✅ | Retorna os dados do perfil do usuário logado. |
| `PUT` | `/user/me` | ✅ | Atualiza as informações do perfil do usuário. |
| `DELETE` | `/user/me` | ✅ | Remove a conta do usuário do sistema. |

---

### 🏋️ Catálogo de Exercícios (`/exercise`)

| Método | Rota | Autenticado | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/exercise` | ❌ | Lista todo o catálogo de exercícios disponíveis. |
| `GET` | `/exercise/:id` | ❌ | Retorna os detalhes de um exercício específico por ID. |
| `POST` | `/exercise` | ❌ / ✅ | Adiciona um novo exercício ao catálogo global. |
| `PUT` | `/exercise/:id` | ❌ / ✅ | Atualiza as informações de um exercício no catálogo. |
| `DELETE` | `/exercise/:id` | ❌ / ✅ | Remove um exercício do catálogo global. |

---

### 📊 Histórico e Treinos (`/user-exercise`)

| Método | Rota | Autenticado | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/user-exercise` | ✅ | Registra um novo treino com suas séries. |
| `GET` | `/user-exercise` | ✅ | Listagem completa do histórico de treinos do usuário. |
| `PUT` | `/user-exercise/:id` | ✅ | Atualiza o exercício ou substitui as séries de um treino. |
| `DELETE` | `/user-exercise/:id` | ✅ | Remove um registro de treino e todas as suas séries associadas. |

---

#### Detalhamento das Requisições (`/user-exercise`)

##### 1. Criar Treino (`POST /user-exercise`)
- **Body (`req.body`):**
  ```json
  {
    "exerciseId": "3_4_Sit-Up",
    "sets": [
      { "repetitions": 12, "weight": 0, "time": 45 },
      { "repetitions": 10, "weight": 5, "time": 50 }
    ]
  }
  ```

##### 2. Listar Treinos (`GET /user-exercise`)
- **Resposta (`200 OK`):**
  ```json
  [
    {
      "id": "3869e35b-27bd-4951-828d-30da947c43af",
      "userId": "68db8b50-4a33-4d45-8a6d-3e64c2651fd6",
      "exerciseId": "3_4_Sit-Up",
      "dateTime": "2026-09-08T14:37:41.374Z",
      "exerciseSet": [
        {
          "id": "6383ecff-00b1-4a9d-b2a6-2105bac3b314",
          "repetitions": 10,
          "weight": 60,
          "time": 45
        }
      ]
    }
  ]
  ```

##### 3. Atualizar Treino (`PUT /user-exercise/:id`)
- **Body (`req.body`):**
  ```json
  {
    "exerciseId": "3_4_Sit-Up",
    "sets": [
      { "repetitions": 12, "weight": 10, "time": 45 }
    ]
  }
  ```

##### 4. Deletar Treino (`DELETE /user-exercise/:id`)
- **Resposta (`200 OK`):**
  ```json
  {
    "message": "Treino removido com sucesso."
  }
  ```

---

## ⚙️ Como Executar o Projeto Localmente

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/0Erik1/Exercise_api.git](https://github.com/0Erik1/Exercise_api.git)
   cd Exercise_api
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/workout_db?schema=public"
   JWT_SECRET="sua_chave_secreta_jwt"
   PORT=8000
   ```

4. **Executar as migrações do banco e popular dados de exercícios:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Iniciar a aplicação:**
   ```bash
   npm run start
   ```
