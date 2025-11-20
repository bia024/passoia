import React from "react";
import "./Looks.scss";
import labios from "../../assets/labios.png";
import olhos from "../../assets/olhos.jpg";
import rosto from "../../assets/rosto.png";
import tendencia from "../../assets/tendencia.png";

export default function Looks() {  
  const items = [
    { img: labios, titulo: "LÁBIOS" },
    { img: olhos, titulo: "OLHOS" },
    { img: rosto, titulo: "ROSTO" },
    { img: tendencia, titulo: "TENDÊNCIA" }
  ];

  return (
    <section id="secao-looks">
      <h1>LOOKS E DICAS DE MAQUIAGEM</h1>

      <article id="caixa-looks">
        {items.map((item, index) => (
          <div className="produto" key={index}>
            <img src={item.img} alt={item.titulo} />
            <h2>{item.titulo}</h2>
          </div>
        ))}
      </article>
    </section>
  );
}
