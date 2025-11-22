import React from "react";
import "./Looks.scss";
import { Link } from "react-router-dom";
import labios from "../../assets/labios.png";
import olhos from "../../assets/olhos.jpg";
import rosto from "../../assets/rosto.png";
import tendencia from "../../assets/tendencia.png";

export default function Looks() {
  const categorias = [
    { img: labios, titulo: "LÁBIOS", rota: "/labios" },
    { img: olhos, titulo: "OLHOS", rota: "/olhos" },
    { img: rosto, titulo: "ROSTO", rota: "/rosto" },
    { img: tendencia, titulo: "TENDÊNCIA", rota: "/tendencia" },
  ];

  return (
    <section id="secao-looks">
      <h1>LOOKS E DICAS DE MAQUIAGEM</h1>

      <article id="caixa-looks">
        {categorias.map((categoria, index) => (
          <Link to={categoria.rota} className="produto" key={index}>
            <img src={categoria.img} alt={categoria.titulo} />
            <h2>{categoria.titulo}</h2>
          </Link>
        ))}
      </article>
    </section>
  );
}
