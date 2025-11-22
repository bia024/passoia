import React, { useState, useEffect } from "react";
import "./Blackfriday.scss";
import { useCart } from "../context/CartContext.jsx";
import OleoCapilar from "../assets/oleo-capilar.jpg";
import BatomVermelho from "../assets/batomVermelho.png";
import BaseInfallible from "../assets/base-infaillible.avif";
import MascaraCilios from "../assets/mascara-cilios.jpg";

const produtosEmOferta = [
  {
    id: 20,
    imagem: OleoCapilar,
    nome: "Óleo Capilar Elseve Extraordinário",
    precoOriginal: "R$ 31,48",
    precoBlackFriday: "R$ 22,99",
  },
  {
    id: 2,
    imagem: BatomVermelho,
    nome: "Batom Matte Vermelho",
    precoOriginal: "R$ 35,90",
    precoBlackFriday: "R$ 24,90",
  },
  {
    id: 10,
    imagem: BaseInfallible,
    nome: "Base Infallible 24h Fresh Wear",
    precoOriginal: "R$ 99,90",
    precoBlackFriday: "R$ 69,90",
  },
  {
    id: 6,
    imagem: MascaraCilios,
    nome: "Máscara para Cílios Loreal Duo",
    precoOriginal: "R$ 89,90",
    precoBlackFriday: "R$ 59,90",
  },
];

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-11-29T23:59:59") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="time-segment">
          <span className="time-value">{value}</span>
          <span className="time-interval">{interval}</span>
        </div>
      ))}
    </div>
  );
};

export default function BlackFriday() {
  const { addToCart } = useCart();

  return (
    <main className="blackfriday-container">
      <header className="bf-header">
        <h1>🔥 Black Friday L'Oréal 🔥</h1>
        <p>Aproveite descontos exclusivos antes que acabem!</p>
      </header>
      <CountdownTimer />

      <section className="products-grid-bf">
        {produtosEmOferta.map((produto) => (
          <article key={produto.id} className="product-card-bf">
            <span className="sale-badge">OFERTA</span>
            <img src={produto.imagem} alt={produto.nome} className="product-img" />
            <h3>{produto.nome}</h3>
            <div className="price-container">
              <p className="original-price">{produto.precoOriginal}</p>
              <p className="sale-price">{produto.precoBlackFriday}</p>
            </div>
            <button
              className="btn-add-cart"
              onClick={() =>
                addToCart({ ...produto, preco: produto.precoBlackFriday })
              }
            >
              Adicionar ao Carrinho
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
