// import "./Lancamentos.scss";
// import { useState } from "react";
// import rosto from "../../assets/rosto.png";
// import avaliacoes from "../../assets/avaliacoes.png";
// import thumb1 from '../../assets/kit3Batons.png';
// import thumb2 from '../../assets/kitBatomvermelhoNudeRosa.png';
// import thumb3 from '../../assets/kitGloss.png';

// export default function Lancamentos() {
//   const swatches = [
//     { color: '#BFB8E8', key: 'lavender' },
//     { color: '#E84B3A', key: 'red' },
//     { color: '#6E2626', key: 'maroon' },
//     { color: '#E08976', key: 'coral' }
//   ];
//   const thumbs = [thumb1, thumb2, thumb3];
//   const [mainImage, setMainImage] = useState(rosto);
//   const [selectedColor, setSelectedColor] = useState(swatches[0].color);

//   return (
//     <section className="Lancamentos-container">
//       <h1>Aproveite os Lançamentos</h1>

//       <div className="lancamentos-grid">
//         <div className="thumbs">
//           {thumbs.map((t, i) => (
//             <div className="thumb-box" key={i} onClick={() => setMainImage(t)}>
//               <img src={t} alt={`thumb-${i}`} />
//             </div>
//           ))}
//         </div>

//         <div className="main-image">
//           <div className="frame">
//             <button className="wishlist" aria-label="Adicionar aos favoritos">♡</button>
//             <img src={mainImage} alt="Produto principal" />
//           </div>
//         </div>

//         <aside className="details">
//           <div className="rating">
//             <img src={avaliacoes} alt="Avaliações" />
//           </div>
//           <h2>Matte Premium</h2>
//           <small style={{ display: 'block', marginTop: '.25rem' }}>Cores disponíveis</small>
//           <div className="colors">
//             {swatches.map((s, i) => (
//               <div
//                 key={s.key}
//                 className="swatch"
//                 style={{
//                   background: s.color,
//                   border: s.color === selectedColor ? '3px solid #d4af37' : '2px solid rgba(0,0,0,0.06)'
//                 }}
//                 onClick={() => setSelectedColor(s.color)}
//                 title={`Cor ${i + 1}`}
//               />
//             ))}
//           </div>

//           <div className="descricao">
//             <h4>Descrição</h4>
//             <p>
//               O Batom Matte possui uma fórmula inovadora desenvolvida para entregar o
//               máximo de cor na primeira aplicação com um desliz suave e macio. Tem
//               acabamento matte aveludado e manteiga de manga que ajuda a hidratar e a
//               proteger os lábios contra ressecamento. Ajuda na hidratação dos lábios,
//               textura fina e macia que não pesa nos lábios.
//             </p>
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// } deixar comentado como base

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
import { useCart } from "../../context/CartContext.jsx";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAuth } from "../../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Lancamentos() {
  const { addToCart } = useCart();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const swatches = [
    { color: "#BFB8E8", key: "lavender", image: imgAzul },
    { color: "#E84B3A", key: "red", image: imgVermelho },
    { color: "#6E2626", key: "marrom", image: imgMarrom },
    { color: "#D2B48C", key: "base", image: imgBase },
  ];

  const thumbs = [thumb1, thumb2, thumb3];

  const [mainImage, setMainImage] = useState(swatches[0].image);
  const [selectedColor, setSelectedColor] = useState(swatches[0].color);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `matte-premium-${selectedColor}`,
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
  };

  return (
    <section className="Lancamentos-container">
      <div className="section-title">
        <h1>Aproveite os Lançamentos</h1>
        <p>Descubra as últimas tendências em maquiagem e cuidados.</p>
      </div>

      <article className="lancamentos-grid">
        <aside className="thumbs">
          {thumbs.map((t, i) => (
            <button
              key={i}
              className="thumb-box"
              onClick={() => setMainImage(t)}
              aria-label={`Selecionar miniatura ${i + 1}`}
            >
              <img src={t} alt={`Miniatura ${i + 1}`} />
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
            <p>
              O Batom Matte possui uma fórmula inovadora desenvolvida para
              entregar cor intensa na primeira aplicação, com um deslize suave e
              macio. Possui acabamento matte aveludado e manteiga de manga que
              hidrata e protege contra o ressecamento. Textura fina, confortável
              e levemente perfumada.
            </p>
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
