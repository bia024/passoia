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
      color: "#BFB8E8",
      key: "lavender",
      image: imgAzul,
      description:
        "Desafie o convencional com o tom lavanda, uma cor ousada que expressa sua criatividade. O Batom Matte possui uma fórmula inovadora desenvolvida para entregar cor intensa na primeira aplicação, com um deslize suave e macio. Possui acabamento matte aveludado e manteiga de manga que hidrata e protege contra o ressecamento. Textura fina, confortável e levemente perfumada.",
    },
    {
      color: "#E84B3A",
      key: "red",
      image: imgVermelho,
      description:
        "Sinta o poder do vermelho clássico, a cor da confiança que nunca sai de moda. O Batom Matte possui uma fórmula inovadora desenvolvida para entregar cor intensa na primeira aplicação, com um deslize suave e macio. Possui acabamento matte aveludado e manteiga de manga que hidrata e protege contra o ressecamento. Textura fina, confortável e levemente perfumada.",
    },
    {
      color: "#6E2626",
      key: "marrom",
      image: imgMarrom,
      description:
        "Envolva-se na sofisticação do marrom profundo, um toque de elegância para um visual marcante. O Batom Matte possui uma fórmula inovadora desenvolvida para entregar cor intensa na primeira aplicação, com um deslize suave e macio. Possui acabamento matte aveludado e manteiga de manga que hidrata e protege contra o ressecamento. Textura fina, confortável e levemente perfumada.",
    },
    {
      color: "#D2B48C",
      key: "base",
      image: imgBase,
      description:
        "Descubra a versatilidade do nude perfeito, o segredo para um look impecável todos os dias. O Batom Matte possui uma fórmula inovadora desenvolvida para entregar cor intensa na primeira aplicação, com um deslize suave e macio. Possui acabamento matte aveludado e manteiga de manga que hidrata e protege contra o ressecamento. Textura fina, confortável e levemente perfumada.",
    },
  ];

  const kits = [
    {
      image: thumb1,
      description:
        "Um kit versátil com três cores de batom matte para você criar looks incríveis, do dia à noite.",
    },
    {
      image: thumb2,
      description:
        "O trio perfeito para todas as ocasiões: um vermelho poderoso, um nude clássico e um rosa delicado.",
    },
    {
      image: thumb3,
      description:
        "Explore o brilho com nosso kit de gloss. Cores vibrantes com acabamento espelhado para lábios irresistíveis.",
    },
  ];

  const [mainImage, setMainImage] = useState(swatches[0].image);
  const [selectedColor, setSelectedColor] = useState(swatches[0].color);
  const [currentDescription, setCurrentDescription] = useState(
    swatches[0].description
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `matte-premium-${selectedColor.replace("#", "")}`,
      nome: "Matte Premium",
      preco: 89.9,
      imagem: mainImage,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const produtoId = "matte-premium-static-id";

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
    setSelectedColor(swatch.color);
    setMainImage(swatch.image);
    setCurrentDescription(swatch.description);
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
          {kits.map((kit, i) => (
            <button
              key={i}
              className="thumb-box"
              onClick={() => {
                setMainImage(kit.image);
                setCurrentDescription(kit.description);
                setIsAdded(false);
              }}
              aria-label={`Selecionar miniatura ${i + 1}`}
            >
              <img src={kit.image} alt={`Miniatura ${i + 1}`} />
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
            <img src={mainImage} alt="Produto principal" />
          </div>
        </figure>

        <aside className="details">
          <div className="rating">
            <img src={avaliacoes} alt="Avaliações do produto" />
          </div>
          <h2>Matte Premium</h2>
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
                  border:
                    s.color === selectedColor
                      ? "3px solid #d4af37"
                      : "2px solid rgba(0,0,0,0.06)",
                }}
              />
            ))}
          </nav>
          <section className="descricao">
            <h4>Descrição</h4>
            <p>{currentDescription}</p>
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
