import React, { useState } from "react";
import "./Rosto.scss";
import { useCart } from "../../context/CartContext";
import Avaliacoes from "../../assets/avaliacoes.png";
import Infaillible from "../../assets/base-infaillible.avif";
import LumiGlotion from "../../assets/locao-lumi.jpg";
import AguaMicelar from "../../assets/agua-micelar.jpg";
import RevitaLift from "../../assets/revitalift-product.jpg";

const produtosRosto = [
  {
    id: 10,
    imagem: LumiGlotion,
    nome: "Loção Realçadora Lumi Glotion",
    preco: "R$ 179,90",
    descricao:
      "Loção realçadora de brilho natural que hidrata e ilumina instantaneamente para um acabamento radiante.",
  },
  {
    id: 11,
    imagem: Infaillible,
    nome: "Base em Pó Infallible",
    preco: "R$ 156,74",
    descricao:
      "Base em pó de longa duração com cobertura de base líquida e acabamento matte impecável.",
  },
  {
    id: 12,
    imagem: AguaMicelar,
    nome: "Água Micelar 5 em 1",
    preco: "R$ 19,90",
    descricao:
      "Solução de limpeza que remove 96% das impurezas, limpa, demaquila, purifica, tonifica e suaviza a pele.",
  },
  {
    id: 13,
    imagem: RevitaLift,
    nome: "Sérum Preenchedor Revitalift",
    preco: "R$ 106,99",
    descricao:
      "Sérum com 1.5% de ácido hialurônico puro que preenche e reduz visivelmente as linhas de expressão.",
  },
];

export default function Rosto() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(
    produtosRosto[0]
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
    <section className="Rosto-container">
      <div className="section-title">
        <h1>Para Seu Rosto</h1>
        <p>Uma pele impecável é a base de toda maquiagem.</p>
      </div>

      <div className="rosto-grid">
        <div className="thumbs">
          <h4>Produtos</h4>
          {produtosRosto.map((produto) => (
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
