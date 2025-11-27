# 🛍️ Passoia — E-commerce Moderno com Frontend + Backend + Integração AI

<img width="1536" height="1024" alt="Passoia" src="https://github.com/user-attachments/assets/87e5afae-10cd-4b7a-add2-a28b9c36764e" />


O **Passoia** é um e-commerce full-stack em desenvolvimento, focado em **performance**, **experiência do usuário**, **boas práticas de engenharia de software**, acessibilidade e escalabilidade.  
O projeto utiliza **React + Vite** no frontend e **Node.js + Express + Prisma** no backend, com ambiente configurado no Postman para testes.

---

## 🚀 Tecnologias Utilizadas

**Frontend**
- React + Vite
- JavaScript ES6+
- CSS / SCSS
- ESLint
- Deploy com Vercel

**Backend**
- Node.js + Express
- Prisma ORM + PostgreSQL
- Validação com Zod
- JWT para autenticação
- Rotas estruturadas por módulo
- Postman (coleção + variáveis globais)

---

## 🛠 Instalação & Execução

### 1️⃣ Clonar repositório
```bash
git clone https://github.com/bia024/passoia.git
cd passoia


---

# 📂 Estrutura do Projeto

Abaixo está a estrutura **completa** do repositório, organizada e documentada.

passoia/
├── .postman/
│ ├── config.json
│ ├── passoia.postman_collection.json
│ └── globals/
│ └── workspace.postman_globals.json
│
├── backend/
│ ├── prisma/
│ │ └── schema.prisma
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── services/
│ ├── app.js
│ ├── db.js
│ ├── index.js
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
│ ├── schema.sql
│ └── user.csv
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── vite.config.js
│ └── vercel.json
│
└── README.md

---

# ⚙️ Instalação, Configuração & Execução

## 🖥️ 1. Clonar o repositório

```bash
git clone https://github.com/bia024/passoia.git
cd passoia

```backend

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm start

```frontend
cd ../frontend
npm install
npm run dev

---

# ▶️ Como rodar o projeto

##backend
cd backend
npm start
(O servidor rodará na porta 3000 -> http://localhost:3000
)

#frontend
cd frontend
cd frontend
npm run dev

(O servidor rodará na porta 5173 -> http://localhost:5173)

---

# 🧪 Testes com Postman

Na pasta .postman, você encontra:

config.json
passoia.postman_collection.json
workspace.postman_globals.json

Como usar:

Abra o Postman
Clique em Import
Selecione o arquivo:
passoia.postman_collection.json
Importe também os globals:
workspace.postman_globals.json

Isso habilita:
✔️ Testes automáticos
✔️ Variáveis globais
✔️ Coleções prontas de rotas

---

| Método    | Rota            | Controller     | Body                                                                                                              | Params | Auth   |
| --------- | --------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| POST      | /users/cadastro | registerUser   | `{ tipo, email, senha, nome?, cpf?, nomeEmpresa?, cnpj?, cep?, telefone?, endereco?, bairro?, cidade?, estado? }` | —      | ❌      |
| POST      | /users/login    | loginUser      | `{ email, senha }`                                                                                                | —      | ❌      |
| GET       | /users          | listUsers      | —                                                                                                                 | —      | ✔️ JWT |
| GET       | /users/:id      | getUserById    | —                                                                                                                 | `id`   | ✔️ JWT |
| PUT       | /users/:id      | updateUser     | `{ ...campos a atualizar }`                                                                                       | `id`   | ✔️ JWT |
| DELETE    | /users/:id      | deleteUser     | —                                                                                                                 | `id`   | ✔️ JWT |
| GET       | /produtos       | getProdutos    | —                                                                                                                 | —      | ❌      |
| GET       | /produtos/:id   | getProdutoById | —                                                                                                                 | `id`   | ❌      |
| POST      | /produtos       | createProduto  | `{ campos do produto }`                                                                                           | —      | ✔️ JWT |
| PUT       | /produtos/:id   | updateProduto  | `{ campos a atualizar }`                                                                                          | `id`   | ✔️ JWT |
| DELETE    | /produtos/:id   | deleteProduto  | —                                                                                                                 | `id`   | ✔️ JWT |
| GET       | /health         | inline         | —                                                                                                                 | —      | ❌      |
| POST      | /admin/login    | inline         | `{ senha }`                                                                                                       | —      | ❌      |
| /wishlist | /wishlist       | wishlistRoutes | —                                                                                                                 | —      | ✔️ JWT |

---

# 🔌 Principais Rotas da API (exemplo — personalize conforme seu backend)

### GET /users
Retorna lista de usuários

### POST /users
Cria um novo usuário

### GET /products
Lista todos os produtos

### POST /auth/login
Realiza autenticação

---

📈 Roadmap de Evolução

Autenticação JWT
Dashboard administradora
Integração com IA para recomendações
Carrinho persistente
Integração com pagamentos
Acessibilidade nível AA (WCAG)
SEO avançado

---

🎯 Diferenciais do Projeto

Arquitetura modular com controllers, services e routes
Validação de dados com Zod
Autenticação e autorização via JWT
Banco de dados PostgreSQL + Prisma ORM
Testes prontos com Postman
Estrutura pronta para deploy profissional com Vercel
Código limpo e escalável, seguindo boas práticas

---

🧑‍💻 Autor(a)

Projeto desenvolvido por Bianca Caetano, software engineer focada em arquitetura, acessibilidade e criação de experiências digitais modernas.
---

📄 Licença

Este projeto está sob a licença MIT.
Sinta-se livre para usar, estudar e contribuir.

