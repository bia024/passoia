import { Helmet } from "react-helmet-async";
import "./Blackfriday.scss";
import { useCart } from "../context/CartContext.jsx";
import Countdown from "../components/Countdown/Countdown.jsx";
import OleoCapilar from "../assets/oleo-capilar.jpg";
import BatomVermelho from "../assets/batomVermelho.png";
import BaseInfallible from "../assets/base-infaillible.avif";
import ImgBanner from "../components/Banner/NovidadesMake.jpg";
import MascaraCilios from "../assets/mascara-cilios.jpg";

const produtosBlackFriday = [
  {
    id: 20,
    imagem: OleoCapilar,
    nome: "Óleo Capilar Elseve Extraordinário",
    precoAntigo: 31.48,
    precoNovo: 22.99,
  },
  {
    id: 2,
    imagem: BatomVermelho,
    nome: "Batom Matte Vermelho",
    precoAntigo: 35.9,
    precoNovo: 24.9,
  },
  {
    id: 10,
    imagem: BaseInfallible,
    nome: "Base Infallible 24h Fresh Wear",
    precoAntigo: 99.9,
    precoNovo: 69.9,
  },
  {
    id: 6,
    imagem: MascaraCilios,
    nome: "Máscara para Cílios Loreal Duo",
    precoAntigo: 89.9,
    precoNovo: 59.9,
  },
];

export default function Blackfriday() {
  const { addToCart } = useCart();
  const blackFridayEndDate = new Date(new Date().getFullYear(), 10, 30);

  return (
    <main className="black-friday-page">
      <Helmet>
        <title>Black Friday Passoia - Ofertas Imperdíveis!</title>
      </Helmet>
      <header
        className="bf-header"
        style={{ backgroundImage: `url(${ImgBanner})` }}
      >
        <h1>🔥 Black Friday L'Oréal 🔥</h1>
        <p>Aproveite descontos exclusivos antes que acabem!</p>
      </header>
      <Countdown targetDate={blackFridayEndDate} />

      <section className="bf-produtos-container">
        {produtosBlackFriday.map((produto) => (
          <article key={produto.id} className="bf-produto-card">
            <span className="sale-badge">OFERTA</span>
            <figure>
              <img src={produto.imagem} alt={produto.nome} />
            </figure>
            <h3>{produto.nome}</h3>
            <div className="price-box">
              <span className="preco-antigo">
                R$ {produto.precoAntigo.toFixed(2)}
              </span>
              <span className="preco-novo">
                R$ {produto.precoNovo.toFixed(2)}
              </span>
            </div>
            <button
              className="btn-add-cart"
              onClick={() =>
                addToCart({ ...produto, preco: produto.precoNovo })
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
