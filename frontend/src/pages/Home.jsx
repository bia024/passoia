import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import { useCart } from "../context/CartContext.jsx";
import { Helmet } from "react-helmet-async";
import "./Home.scss";

import prod1 from "../assets/kit3Batons.png";
import prod2 from "../assets/kitBatomvermelhoNudeRosa.png";
import prod3 from "../assets/kitGloss.png";
import prod4 from "../assets/revitalift-product.jpg";
import prod5 from "../assets/repair-molecular.jpg";
import prod6 from "../assets/vitamino-spectrum.jpg";

const produtosHome = [
  { id: 1, imagem: prod1, nome: "Kit Batons", preco: 79.9 },
  { id: 2, imagem: prod2, nome: "Batom Líquido", preco: 49.9 },
  { id: 3, imagem: prod3, nome: "Gloss", preco: 99.9 },
  { id: 4, imagem: prod4, nome: "Revitalift", preco: 106.99 },
  { id: 5, imagem: prod5, nome: "Absolut Repair Molecular", preco: 253.9 },
  { id: 6, imagem: prod6, nome: "Vitamino Color Spectrum", preco: 200.8 },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <main>
      <Helmet>
        <title>Passoia - Beleza que Inspira</title>
        <meta
          name="description"
          content="Descubra as últimas tendências em maquiagem e cuidados com a pele."
        />
      </Helmet>

      <Hero />

      <section className="highlights">
        <div className="container">
          {produtosHome.map((produto) => (
            <article key={produto.id} className="card">
              <figure>
                <img src={produto.imagem} alt={produto.nome} />
              </figure>
              <h3>{produto.nome}</h3>
              <p className="price">R$ {produto.preco.toFixed(2)}</p>
              <button className="btn" onClick={() => addToCart(produto)}>
                Adicionar ao Carrinho
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
