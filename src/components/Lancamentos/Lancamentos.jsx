// import "./Lancamentos.scss";
import { useState } from "react";
import azul from "../../assets/azul.png";
import vermelho from "../../assets/vermelho.png";
import base from "../../assets/base.png";
import marrom from "../../assets/marrom.png";

export default function Lancamentos() {
  const [cor, setCor] = useState(vermelho);
  //criamos um estado pra guardar o batom vermelho

  return (
    <section>
      <h1>Aproveite os Lançamentos</h1>
      <p>Conheça as últimas novidades e coleções em primeira mão.</p>
      <img src={cor} alt="" />
      <button onClick={() => setCor(vermelho)}>Vermelho</button>
      <button onClick={() => setCor(azul)}>Azul</button>
      <button onClick={() => setCor(base)}>Base</button>
      <button onClick={() => setCor(marrom)}>Marrom</button>
    </section>
  );
}
