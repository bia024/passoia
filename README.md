📘 README.md – Projeto PASSOIA
# 💄 PASSOIA — E-commerce de Cosméticos

Este é um projeto full-stack desenvolvido para treinar conceitos modernos de **React**, **Node.js**, **Prisma**, além de boas práticas de UI/UX e acessibilidade.  
A aplicação simula uma loja de beleza com página de lançamentos, detalhes de produtos, sistema de cadastro e integração com um backend próprio.

---

## ✨ **Tecnologias Utilizadas**

### 🔹 **Frontend**
- **React.js**
- **React Router**
- **React Hook Form** + **Zod**
- **SCSS (Sass)**
- **Hooks** (`useState`, `useEffect`)
- **SpeechSynthesis API** (Acessibilidade — leitura da página com *Shift + L*)
- **Componentização e Atomic Design Simplificado**

### 🔹 **Backend**
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **SQLite** (ambiente local)
- **Cors**
- **Nodemon**

### 🔹 **Ferramentas de Desenvolvimento**
- **VS Code**
- **Postman** (para testar as rotas)
- **Git + GitHub**

---

## 📁 **Estrutura do Frontend**
passoia/
├── frontend/
│
├── public/
│   └── ...arquivos públicos (favicon, imagens, etc)
│
├── src/
│   ├── Main/
│   │   └── Main.jsx
│   │
│   ├── assets/
│   │   └── ...imagens, ícones e mídias gerais
│   │
│   ├── components/
│   │   ├── Acessibilidade/
│   │   │   ├── Acessibilidade.jsx
│   │   │   ├── ReaderControls.jsx
│   │   │   ├── ReaderControls.scss
│   │   │   ├── accessibilityLogger.js
│   │   │   ├── acessibilidade.scss
│   │   │   └── useSpeech.js
│   │   │
│   │   ├── Banner/
│   │   │   ├── NovidadesMake.jpg
│   │   │   └── RevitaLift.png
│   │   │
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.scss
│   │   │
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.scss
│   │   │
│   │   ├── Lancamentos/
│   │   │   ├── Lancamentos.jsx
│   │   │   ├── Lancamentos.scss
│   │   │   └── LancamentosSimple.jsx
│   │   │
│   │   ├── Looks/
│   │   │   ├── Looks.jsx
│   │   │   └── Looks.scss
│   │   │
│   │   └── Novidades/
│   │       ├── Novidades.jsx
│   │       └── Novidades.scss
│   │
│   ├── pages/
│   │   ├── Cadastro/
│   │   │   ├── Cadastro.jsx
│   │   │   └── Cadastro.scss
│   │   │
│   │   ├── Blackfriday.jsx
│   │   ├── Home.jsx
│   │   └── Home.scss
│   │
│   ├── styles/
│   │   └── Globalstyle.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js

## 📁 **Estrutura do Backend**
passoia/
│
├── backend/
│   ├── .postman/                # Coleções / ambientes do Postman (opcional)
│   ├── config.json
│   ├── package.json
│   ├── package-lock.json
│   ├── passoia.postman_collection.json
│   ├── user.csv
│   ├── index.js
│   ├── app.js
│   ├── server.js
│   │
│   ├── prisma/
│   │   ├── dev.db
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       └── ...arquivos de migração...
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── error.js
│   │   │
│   │   ├── prisma/
│   │   │   └── client.js
│   │   │
│   │   ├── routes/
│   │   │   └── user.routes.js
│   │   │
│   │   └── services/
│   │       └── user.service.js
│   │
│   └── .gitignore


---

### 📌 **1. Clonar o repositório**

```bash
git clone https://github.com/bia024/passoia.git

### 🚀 **Como rodar o Frontend**

cd passoia/frontend
npm install
npm run dev

O projeto abrirá noemalmente em:

http://localhost:5173

### ⚙️ Rodando o Backend ##

No terminal:

cd passoia/backend
npm install


Criar o banco e gerar tabelas:

npx prisma migrate dev --name init


Rodar servidor:

npm run dev


Servidor abrirá em:

http://localhost:3000

📡 Rotas da API
➤ Criar usuário

POST /users

Body:

{
  "nome": "Bianca",
  "email": "bianca@email.com",
  "senha": "123456"
}

🧪 Testes com Postman

O repositório possui uma collection pronta:

passoia.postman_collection.json

Importe no Postman para testar todas as rotas do backend.

♿ Acessibilidade

Este projeto possui um atalho que lê todo o conteúdo da página usando síntese de voz:

➡ Pressione Shift + L para o sistema ler a página completa.

Recurso desenvolvido com:

SpeechSynthesisUtterance()

🎨 Design & UI

Imagens profissionais de cosméticos

Componentes reutilizáveis

Paleta em tons de rosa, lavanda e nude

Animações suaves

Layout responsivo

Swatches de cores dinâmicos com useState

📌 Funcionalidades Implementadas

✔ Lançamentos com troca de miniaturas
✔ Mudança de cor do produto via swatches
✔ Página de cadastro integrada ao backend
✔ Validação com Zod
✔ API de usuários com Prisma
✔ Estrutura limpa e semântica
✔ Acessibilidade com leitor automático
✔ Front e back totalmente separados

🛠️ Melhorias Futuras

Autenticação com JWT

Banco PostgreSQL para produção

Dashboard administrativo

Carrinho e checkout

Upload de imagens para produtos

Tema claro/escuro

👩‍💻 Autora

Bianca Caetano
Desenvolvedora Front-End em evolução
Back-End em prática com Node.js e Prisma
Apaixonada por UI intuitiva e acessível

⭐ Contribuições

Sugestões são sempre bem-vindas!
Se gostou do projeto, deixe uma ⭐ no repositório. 😊
