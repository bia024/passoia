import React, { useState } from "react";
import "./Tendencia.scss";
import { useCart } from "../../context/CartContext.jsx";
import Avaliacoes from "../../assets/avaliacoes.png";
import OleoCapilar from "../../assets/oleo-capilar.jpg";
import RepairMolecular from "../../assets/kit-repair.png";
import VitaminoSpectrum from "../../assets/vitamino-spectrum.jpg";
import KitGold from "../../assets/kit-absolut-gold.jpg";

const produtosTendencia = [
  {
    id: 14,
    imagem: OleoCapilar,
    nome: "Óleo Capilar Elseve Extraordinário",
    preco: "R$ 31,48",
    descricao:
      "Descubra o segredo para um cabelo sublime. Uma gota transforma a fibra, proporcionando nutrição intensa e brilho radiante sem pesar.",
  },
  {
    id: 15,
    imagem: RepairMolecular,
    nome: "Kit Repair Molecular Absolut Repair",
    preco: "R$ 852,60",
    descricao:
      "Experimente a revolução da reparação capilar. Este kit reconstrói a estrutura molecular do cabelo, restaurando a força e a elasticidade desde o primeiro uso.",
  },
  {
    id: 16,
    imagem: VitaminoSpectrum,
    nome: "Kit Vitamino Color Resveratrol",
    preco: "R$ 219,90",
    descricao:
      "Proteja a intensidade da sua cor por até 8 semanas. Este kit profissional preserva a vibração da cor e protege a fibra capilar contra danos.",
  },
  {
    id: 17,
    imagem: KitGold,
    nome: "Kit Absolut Repair Gold Quinoa",
    preco: "R$ 484,90",
    descricao:
      "A reestruturação instantânea para cabelos danificados. Enriquecido com Quinoa Dourada, este kit oferece brilho intenso e um toque leve.",
  },
];

export default function Tendencia() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(
    produtosTendencia[0]
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
    <section className="Tendencia-container">
      <div className="section-title">
        <h1>Tendências do Momento</h1>
        <p>Descubra os produtos que estão definindo a beleza hoje.</p>
      </div>

      <div className="tendencia-grid">
        <div className="thumbs">
          <h4>Produtos</h4>
          {produtosTendencia.map((produto) => (
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
