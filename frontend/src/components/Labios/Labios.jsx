import React, { useState } from "react";
import "./Labios.scss";
import { useCart } from "../../context/CartContext.jsx";
import Avaliacoes from "../../assets/avaliacoes.png";
import BatomRosa from "../../assets/batomRosa.png";
import BatomVermelho from "../../assets/batomVermelho.png";
import BatomRoxo from "../../assets/batomRoxo.png";
import BatomMarrom from "../../assets/batomMarrom.png";
import ElipseRosa from "../../assets/elipseRosa.png";
import ElipseVermelha from "../../assets/elipseVermelha.png";
import ElipseLilas from "../../assets/elipseLilas.png";
import ElipseMarrom from "../../assets/elipseMarrom.png";

const produtosLabios = [
  {
    id: 1,
    imagem: BatomRosa,
    elipse: ElipseRosa,
    nome: "Batom Cremoso Rosa",
    preco: "R$ 29,90",
    descricao:
      "Ilumine seu dia com um rosa vibrante e acabamento cremoso. Perfeito para um look alegre, este batom mantém seus lábios hidratados com uma cor suave e deslumbrante.",
  },
  {
    id: 2,
    imagem: BatomVermelho,
    elipse: ElipseVermelha,
    nome: "Batom Matte Vermelho",
    preco: "R$ 35,90",
    descricao:
      "Liberte sua confiança com o poder do vermelho clássico e acabamento matte aveludado. De longa duração e cor intensa, é a escolha ideal para uma aparência poderosa e sofisticada.",
  },
  {
    id: 4,
    imagem: BatomRoxo,
    elipse: ElipseLilas,
    nome: "Batom Matte Roxo",
    preco: "R$ 39,90",
    descricao: "Atreva-se a ser inesquecível com um roxo intenso e impactante. Com fórmula líquida de secagem rápida que não transfere, é ideal para looks noturnos e ousados.",
  },
  {
    id: 5,
    imagem: BatomMarrom,
    elipse: ElipseMarrom,
    nome: "Batom Bala Marrom",
    preco: "R$ 28,00",
    descricao:
      "Abrace a elegância do marrom, um tom versátil que complementa sua beleza natural. Com textura confortável, é perfeito para o dia a dia, combinando com diversos tons de pele.",
  },
];

export default function Labios() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(
    produtosLabios[0]
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
    <section className="Labios-container">
      <div className="section-title">
        <h1>Para Seus Lábios</h1>
        <p>Cores vibrantes e texturas incríveis para realçar sua beleza.</p>
      </div>

      <div className="labios-grid">
        <div className="thumbs">
          <h4>Cores disponíveis</h4>
          {produtosLabios.map((produto) => (
            <div
              className="thumb-box"
              key={produto.id}
              onClick={() => handleProductSelect(produto)}
            >
              <img src={produto.elipse} alt={produto.nome} />
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
