import "./Novidades.scss";
import ImgBanner from "../Banner/NovidadesMake.jpg";
import { useCart } from "../../context/CartContext";
import prod1 from "../../assets/kit3Batons.png";
import prod2 from "../../assets/kitBatomvermelhoNudeRosa.png";
import prod3 from "../../assets/kitGloss.png";
import prod4 from "../../assets/revitalift-product.jpg";
import prod5 from "../../assets/repair-molecular.jpg";
import prod6 from "../../assets/vitamino-spectrum.jpg";

const produtosNovidades = [
  { id: 1, imagem: prod1, nome: "Kit Batons", preco: 79.9 },
  { id: 2, imagem: prod2, nome: "Batom Líquido", preco: 49.9 },
  { id: 3, imagem: prod3, nome: "Gloss", preco: 99.9 },
  { id: 4, imagem: prod4, nome: "Revitalift", preco: 106.99 },
  { id: 5, imagem: prod5, nome: "Absolut Repair Molecular", preco: 253.9 },
  { id: 6, imagem: prod6, nome: "Vitamino Color Spectrum", preco: 200.8 },
];

export default function Novidades() {
  const { addToCart } = useCart();

  return (
    <section id="secao-novidades">
      <h2>NOVIDADES PARA VOCÊ</h2>
      <img
        src={ImgBanner}
        alt="Itens de maquiagem espalhados sobre uma superfície rosa."
        className="banner-fundo"
      />

      <div className="produtos-container">
        {produtosNovidades.length > 0 ? (
          produtosNovidades.map((produto) => (
            <div key={produto.id} className="produto-card">
              <figure className="produto-imagem-container">
                <img src={produto.imagem} alt={produto.nome} />
              </figure>
              <h3>{produto.nome}</h3>
              <p className="produto-preco">R$ {produto.preco.toFixed(2)}</p>
              <button
                className="btn-add-cart"
                onClick={() => addToCart(produto)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))
        ) : (
          <p>Carregando novidades...</p>
        )}
      </div>
    </section>
  );
}
