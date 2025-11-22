import "./Lancamentos.scss";
import { useState } from "react";
import avaliacoes from "../../assets/avaliacoes.png";
import thumb1 from "../../assets/kit3Batons.png";
import thumb2 from "../../assets/kitBatomvermelhoNudeRosa.png";
import thumb3 from "../../assets/kitGloss.png";
import imgAzul from "../../assets/azul.png";
import imgVermelho from "../../assets/vermelho.png";
import imgMarrom from "../../assets/marrom.png";
import imgBase from "../../assets/base.png";
import { useCart } from "../../context/CartContext";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAuth } from "../../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Lancamentos() {
  const { addToCart } = useCart();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const swatches = [
    {
      id: "matte-premium-lavender",
      nome: "Matte Premium Lavanda",
      preco: 89.9,
      color: "#BFB8E8",
      key: "lavender",
      image: imgAzul,
      description: "Desafie o convencional com o tom lavanda, uma cor ousada que expressa sua criatividade. Fórmula inovadora com cor intensa e deslize suave.",
    },
    {
      id: "matte-premium-red",
      nome: "Matte Premium Vermelho",
      preco: 89.9,
      color: "#E84B3A",
      key: "red",
      image: imgVermelho,
      description:
        "Sinta o poder do vermelho clássico, a cor da confiança que nunca sai de moda. Fórmula inovadora com cor intensa e deslize suave.",
    },
    {
      id: "matte-premium-marrom",
      nome: "Matte Premium Marrom",
      preco: 89.9,
      color: "#6E2626",
      key: "marrom",
      image: imgMarrom,
      description:
        "Envolva-se na sofisticação do marrom profundo. Este batom em bala tem acabamento matte e uma fórmula inovadora com cor intensa e deslize suave.",
    },
    {
      id: "matte-premium-base",
      nome: "Matte Premium Base",
      preco: 89.9,
      color: "#D2B48C",
      key: "base",
      image: imgBase,
      description:
        "Descubra a versatilidade do nude perfeito, o segredo para um look impecável todos os dias. Fórmula inovadora com cor intensa e deslize suave.",
    },
  ];

  const kits = [
    {
      id: "kit-3-batons",
      nome: "Kit 3 Batons Matte",
      preco: 239.9,
      image: thumb1,
      description: "Um kit versátil com três cores de batom matte para você criar looks incríveis, do dia à noite.",
    },
    {
      id: "kit-vermelho-nude-rosa",
      nome: "Kit Vermelho, Nude e Rosa",
      preco: 239.9,
      image: thumb2,
      description: "O trio perfeito para todas as ocasiões: um vermelho poderoso, um nude clássico e um rosa delicado.",
    },
    {
      id: "kit-gloss",
      nome: "Kit Gloss Brilhante",
      preco: 199.9,
      image: thumb3,
      description: "Explore o brilho com nosso kit de gloss. Cores vibrantes com acabamento espelhado para lábios irresistíveis.",
    },
  ];

  const lipstickReference = {
    id: "matte-premium-group",
    nome: "Matte Premium",
    preco: 89.9,
    image: swatches[0].image,
    description: "Escolha sua cor favorita do nosso batom Matte Premium. Fórmula inovadora com cor intensa e deslize suave.",
    isGroup: true,
  };

  const thumbnailItems = [lipstickReference, ...kits];

  const [currentItem, setCurrentItem] = useState(swatches[0]);
  const [selectedColor, setSelectedColor] = useState(swatches[0].color); 

  const [isFavorited, setIsFavorited] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: currentItem.id,
      nome: currentItem.nome,
      preco: currentItem.preco,
      imagem: currentItem.image,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const produtoId = currentItem.id;

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isFavorited) {
        await axios.delete(
          `http://localhost:3000/wishlist/${produtoId}`,
          config
        );
      } else {
        await axios.post(
          "http://localhost:3000/wishlist",
          { produtoId },
          config
        );
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      alert("Ocorreu um erro ao processar sua solicitação.");
    }
  };

  const handleColorClick = (swatch) => {
    setCurrentItem(swatch);
    setSelectedColor(swatch.color);
    setIsAdded(false);
  };

  return (
    <section className="Lancamentos-container">
      <div className="section-title">
        <h1>Aproveite os Lançamentos</h1>
        <p>Descubra as últimas tendências em maquiagem e cuidados.</p>
      </div>

      <article className="lancamentos-grid">
        <aside className="thumbs">
          {thumbnailItems.map((item, i) => (
            <button
              key={i}
              className="thumb-box"
              onClick={() => {
                if (item.isGroup) {
                  setCurrentItem(swatches[0]);
                  setSelectedColor(swatches[0].color);
                } else {
                  setCurrentItem(item);
                  setSelectedColor(null);
                }
                setIsAdded(false);
              }}
              aria-label={`Selecionar ${item.nome}`}
            >
              <img src={item.image} alt={`Miniatura de ${item.nome}`} />
            </button>
          ))}
        </aside>

        <figure className="main-image">
          <div className="frame">
            <button
              className={`wishlist ${isFavorited ? "favorited" : ""}`}
              onClick={handleFavoriteClick}
              aria-label="Adicionar aos favoritos"
            >
              {isFavorited ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <img src={currentItem.image} alt="Produto principal" />
          </div>
        </figure>

        <aside className="details">
          <div className="rating">
            <img src={avaliacoes} alt="Avaliações do produto" />
          </div>
          <h2>{currentItem.nome}</h2>
          <div className="price">
            <span className="current-price">
              R$ {currentItem.preco.toFixed(2).replace(".", ",")}
            </span>
          </div>
          {currentItem.color && (
            <>
              <small style={{ display: "block", marginTop: ".25rem" }}>
                Cores disponíveis
              </small>
              <nav className="colors">
                {swatches.map((s) => (
                  <button
                    key={s.key}
                    className="swatch"
                    onClick={() => handleColorClick(s)}
                    aria-label={`Cor ${s.key}`}
                    style={{
                      background: s.color,
                      border: s.color === selectedColor ? "3px solid #d4af37" : "2px solid rgba(0,0,0,0.06)",
                    }}
                  />
                ))}
              </nav>
            </>
          )}
          <section className="descricao">
            <h4>Descrição</h4>
            <p>{currentItem.description}</p>
            <button
              className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? "Adicionado ✓" : "Adicionar ao Carrinho"}
            </button>
          </section>
        </aside>
      </article>
    </section>
  );
}
