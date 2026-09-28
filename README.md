# 🏋️ Workout Tracker API

API RESTful desenvolvida em Node.js, Express e TypeScript para gerenciamento de treinos, catálogo de exercícios e acompanhamento de séries dos usuários. Utiliza Prisma ORM para persistência de dados e autenticação via JSON Web Token (JWT).

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
 │    ├── user/            # Autenticação e cadastro de usuários
 │    ├── exercise/        # Consulta ao catálogo de exercícios
 │    └── userExercise/    # CRUD de treinos (POST, GET, PUT, DELETE)
 ├── middlewares/
 │    └── authMiddleware.ts # Validação e extração do token JWT
 ├── routes/
 │    ├── userRoutes.ts
 │    ├── exerciseRoutes.ts
 │    └── userExerciseRouter.ts
 ├── prisma.js
 └── server.ts
prisma/
 ├── schema.prisma         # Schema e relacionamentos do banco de dados
 └── seed.ts               # População inicial do banco (exercícios)
```

---

## 🗄️ Modelagem do Banco de Dados

- **`User`**: Armazena as credenciais e dados dos usuários.
- **`Exercise`**: Catálogo global de exercícios cadastrados.
- **`UserExercise`**: Sessão de treino vinculada a um usuário (`userId`) e a um exercício (`exerciseId`).
- **`ExerciseSet`**: Séries associadas a uma sessão de treino (`userExerciseId`), contendo repetições, carga (peso) e tempo de descanso.

---

## 🔐 Autenticação

As rotas protegidas exigem o envio do token no cabeçalho HTTP `Authorization`:

```http
Authorization: Bearer <seu_token_jwt>
```

---

## 📌 Endpoints da API

### 👥 Usuários (`/users`)

| Método | Rota | Autenticado | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | ❌ | Cadastro de novo usuário. |
| `POST` | `/users/login` | ❌ | Autenticação do usuário e geração de token JWT. |

---

### 🏋️ Exercícios (`/exercises`)

| Método | Rota | Autenticado | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/exercises` | 🔄 | Lista o catálogo de exercícios disponíveis. |

---

### 📊 Histórico e Treinos (`/user-exercise`)

#### 1. Registrar Treino
- **`POST /user-exercise`** *(Autenticado)*
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

#### 2. Listar Treinos do Usuário
- **`GET /user-exercise`** *(Autenticado)*
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

#### 3. Atualizar Treino
- **`PUT /user-exercise/:id`** *(Autenticado)*
- **Body (`req.body`):**
  ```json
  {
    "exerciseId": "3_4_Sit-Up",
    "sets": [
      { "repetitions": 12, "weight": 10, "time": 45 }
    ]
  }
  ```

#### 4. Remover Treino
- **`DELETE /user-exercise/:id`** *(Autenticado)*
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
   git clone [https://github.com/0Erik1/NOME_DO_REPOSITORIO.git](https://github.com/0Erik1/NOME_DO_REPOSITORIO.git)
   cd NOME_DO_REPOSITORIO
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

4. **Rodar as migrações do banco e popular dados:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Iniciar a aplicação:**
   ```bash
   npm run dev
   ```
