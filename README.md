# 💄 Passoia — Aplicativo de Beleza Inteligente  
### *Beauty Experience Platform — Inspirado nos padrões de marcas como L’Oréal*

O **Passoia** é um aplicativo front-end desenvolvido com **React + Vite**, criado para simular a experiência de um portal digital de beleza moderno.  
Ele apresenta páginas reais de um ecossistema beauty — como Looks, Lançamentos, Novidades e campanhas especiais — refletindo a estética e usabilidade esperadas por grandes marcas do setor.

Este projeto foi desenvolvido com foco no **mercado de cosméticos, skincare, haircare e maquiagem (novidades em breve)**, apresentando um design leve, elegante e preparado para campanhas digitais.

---

## ✨ Destaques do Projeto

- Experiência inspirada em plataformas de beleza premium  
- Navegação fluida construída com **React Router**  
- Componentização limpa e escalável  
- Estrutura preparada para catálogos, campanhas e conteúdos  
- Código organizado e de fácil expansão  
- Design responsivo voltado ao público de beleza  

---

## 🌺 Relevância para Empresas de Beleza

O projeto atende aos critérios observados em portais modernos de marcas como:

**L’Oréal · Avon · Natura · O Boticário · Eudora · Sephora · Quem Disse, Berenice?**

As características valorizadas incluem:

✔ UI elegante e consistente  
✔ Paginação clara  
✔ Espaços para catálogos e novidades  
✔ Áreas para campanhas sazonais (ex.: Black Friday)  
✔ Componentização e código modular  
✔ Possibilidade de expansão para APIs reais  

---

## 🖥️ Funcionalidades Principais

### 🏠 Home  
Página inicial destacando conteúdos e navegação principal.

### 💋 Looks  
Área dedicada à inspiração de maquiagem, tendências e estilos.

### 🌟 Lançamentos  
Seção voltada às novidades de produtos, coleções e lançamentos.

### 🧴 Novidades  
Conteúdos atualizados sobre beleza, campanhas e recomendações.

### 🖤 Black Friday  
Página temática para campanhas promocionais especiais.

---

## 🧩 Estrutura do App

```jsx
import Header from "./components/Header/Header.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Looks from './components/Looks/Looks.jsx';
import Lancamentos from './components/Lancamentos/Lancamentos.jsx';
import Novidades from './components/Novidades/Novidades.jsx';
import Blackfriday from './pages/Blackfriday.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/novidades" element={<Novidades />} />
        <Route path="/blackfriday" element={<Blackfriday />} />
      </Routes>
      <Footer />
    </>
  );
}

Design inspirado em apps beauty (L’Oréal, Sephora, Lancôme).

Componentização clara e escalável.

SCSS modularizado por componente.

Páginas dedicadas a eventos e campanhas (ex: Black Friday).

Layout adaptável para mobile-first e experiências premium.

Navegação fluida com estrutura ideal para evoluir para um e-commerce real.

## Estrutura de Pastas

src/
│
├── assets/
│   ├── avaliacoes.png
│   ├── azul.png
│   ├── base.png
│   ├── batomMarrom.png
│   ├── batomRosa.png
│   ├── batomRoxo.png
│   ├── batomVermelho.png
│   ├── bolaazul.png
│   ├── bolamarrom.png
│   ├── bolamatte.png
│   ├── bolavermelha.png
│   ├── boleto.png
│   ├── download.png
│   ├── Ellipse 4 (1).png
│   ├── Ellipse 6 (1).png
│   ├── Ellipse 7 (1).png
│   ├── facebook.png
│   ├── instagram.png
│   ├── kit3Batons.png
│   ├── kitBatomvermelhoNudeRosa.png
│   ├── kitGloss.png
│   ├── L'Oréal.png
│   ├── labios.png
│   └── (demais imagens…)
│
├── components/
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.scss
│   │
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.scss
│   │
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.scss
│   │
│   ├── Lançamentos/
│   │   ├── Lançamentos.jsx
│   │   ├── LançamentosSimple.jsx
│   │   └── Lançamentos.scss
│   │
│   ├── Looks/
│   │   ├── Looks.jsx
│   │   └── Looks.scss
│   │
│   └── Novidades/
│       ├── Novidades.jsx
│       └── Novidades.scss
│
├── Main/
│   └── Main.jsx
│
├── pages/
│   ├── Blackfriday.jsx
│   ├── Home.jsx
│   └── Home.scss
│
├── styles/
│   ├── Globalstyle.jsx
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
└── vite.config.js

##🔧 Tecnologias Utilizadas

React (Hooks)

Vite

React Router DOM

JavaScript

SCSS

Arquitetura modular de componentes

ESLint

git clone https://github.com/bia024/passoia.git
cd passoia
npm install
npm run dev

Acesse no navegador:
http://localhost:5173
