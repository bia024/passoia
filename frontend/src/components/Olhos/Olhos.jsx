import React, { useState } from "react";
import "./Olhos.scss";
import { useCart } from "../../context/CartContext";
import Avaliacoes from "../../assets/avaliacoes.png";
import MascaraCilios from "../../assets/mascara-cilios.jpg";
import RevitaliftPrimer from "../../assets/revitalift-primer.jpg";
import TrueMatch from "../../assets/True-match.jpg";
import CanetaSobrancelha from "../../assets/Caneta-Sobrancelhas.png";

const produtosOlhos = [
  {
    id: 6,
    imagem: MascaraCilios,
    nome: "Máscara para Cílios Loreal Duo",
    preco: "R$ 89,90",
    descricao:
      "Máscara de cílios com duplo aplicador para volume e alongamento extremos. Efeito cílios postiços instantâneo.",
  },
  {
    id: 7,
    imagem: RevitaliftPrimer,
    nome: "Revitalift Blur Mágico - Primer",
    preco: "R$ 59,90",
    descricao:
      "Primer que transforma a pele instantaneamente. Sua textura aveludada apaga rugas, brilho e poros, revelando uma pele lisa e uniforme.",
  },
  {
    id: 8,
    imagem: TrueMatch,
    nome: "Corretivo True Match",
    preco: "R$ 75,50",
    descricao:
      "Corretivo com 0,5% de ácido hialurônico que cuida da pele enquanto cobre. Ideal para a área dos olhos, proporcionando hidratação e cobertura natural.",
  },
  {
    id: 9,
    imagem: CanetaSobrancelha,
    nome: "Caneta para Sobrancelhas",
    preco: "R$ 65,00",
    descricao:
      "Caneta com ponta micro-fina para desenhar fios precisos e naturais, preenchendo falhas e definindo o formato das sobrancelhas.",
  },
];

export default function Olhos() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(
    produtosOlhos[0]
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(produtoSelecionado);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleProductSelect = (produto) => {
    setProdutoSelecionado(produto);
    setIsAdded(false);
  };

  return (
    <section className="Olhos-container">
      <div className="section-title">
        <h1>Para Seus Olhos</h1>
        <p>Realce seu olhar com produtos de alta performance.</p>
      </div>

      <div className="olhos-grid">
        <div className="thumbs">
          <h4>Produtos</h4>
          {produtosOlhos.map((produto) => (
            <div
              className="thumb-box"
              key={produto.id}
              onClick={() => handleProductSelect(produto)}
            >
              <img src={produto.imagem} alt={produto.nome} />
            </div>
          ))}
        </div>

        <div className="main-image">
          <div className="frame">
            <img
              src={produtoSelecionado.imagem}
              alt={produtoSelecionado.nome}
            />
            <button
              className={`wishlist ${isFavorited ? "favorited" : ""}`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              {isFavorited ? "♥" : "♡"}
            </button>
          </div>
        </div>

        <div className="details">
          <h2>{produtoSelecionado.nome}</h2>
          <p className="price">{produtoSelecionado.preco}</p>
          <img src={Avaliacoes} alt="Avaliações" className="rating" />
          <div className="descricao">
            <p>{produtoSelecionado.descricao}</p>
          </div>
          <button
            className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? "Adicionado ✓" : "Adicionar ao Carrinho"}
          </button>
        </div>
      </div>
    </section>
  );
}
