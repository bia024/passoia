import "./Lancamentos.scss";
import { useState } from "react";
// (color swatches use CSS colors now)
import rosto from "../../assets/rosto.png";
import avaliacoes from "../../assets/avaliacoes.png";
import thumb1 from '../../assets/kit3Batons.png';
import thumb2 from '../../assets/kitBatomvermelhoNudeRosa.png';
import thumb3 from '../../assets/kitGloss.png';

export default function Lancamentos() {
  const swatches = [
    { color: '#BFB8E8', key: 'lavender' },
    { color: '#E84B3A', key: 'red' },
    { color: '#6E2626', key: 'maroon' },
    { color: '#E08976', key: 'coral' }
  ];
  const thumbs = [thumb1, thumb2, thumb3];
  const [mainImage, setMainImage] = useState(rosto);
  const [selectedColor, setSelectedColor] = useState(swatches[0].color);

  return (
    <section className="Lancamentos-container">
      <h1>Aproveite os Lançamentos</h1>

      <div className="lancamentos-grid">
        <div className="thumbs">
          {thumbs.map((t, i) => (
            <div className="thumb-box" key={i} onClick={() => setMainImage(t)}>
              <img src={t} alt={`thumb-${i}`} />
            </div>
          ))}
        </div>

        <div className="main-image">
          <div className="frame">
            <button className="wishlist" aria-label="Adicionar aos favoritos">♡</button>
            <img src={mainImage} alt="Produto principal" />
          </div>
        </div>

        <aside className="details">
          <div className="rating">
            <img src={avaliacoes} alt="Avaliações" />
          </div>
          <h2>Matte Premium</h2>
          <small style={{ display: 'block', marginTop: '.25rem' }}>Cores disponíveis</small>
          <div className="colors">
            {swatches.map((s, i) => (
              <div
                key={s.key}
                className="swatch"
                style={{
                  background: s.color,
                  border: s.color === selectedColor ? '3px solid #d4af37' : '2px solid rgba(0,0,0,0.06)'
                }}
                onClick={() => setSelectedColor(s.color)}
                title={`Cor ${i + 1}`}
              />
            ))}
          </div>

          <div className="descricao">
            <h4>Descrição</h4>
            <p>
              O Batom Matte possui uma fórmula inovadora desenvolvida para entregar o
              máximo de cor na primeira aplicação com um desliz suave e macio. Tem
              acabamento matte aveludado e manteiga de manga que ajuda a hidratar e a
              proteger os lábios contra ressecamento. Ajuda na hidratação dos lábios,
              textura fina e macia que não pesa nos lábios.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
