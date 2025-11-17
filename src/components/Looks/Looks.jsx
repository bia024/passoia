// import "./Looks.scss";

// export default function Looks() {  
//   return (
//     <section id="secao-looks">
    
//         <h1>LOOKS E DICAS DE MAQUIAGEM</h1>

//       <article id="caixa-looks">
//       <div class="produtos">
//           <img src="../../src/assets/lábios.png" alt="" />
//           <h2>LÁBIOS</h2>
//       </div>
//       <div class="produtos">
//           <img src="../../src/assets/olhos.jpg" alt="" />
//           <h2>OLHOS</h2>
//       </div>
//       <div class="produtos">
//           <img src="../../src/assets/rosto.png" alt="" />
//           <h2>ROSTO</h2>
//           </div>
//       <div class="produtos">
//           <img src="../../src/assets/tendencia.png" alt="" />
//           <h2>TENDÊNCIA</h2>
//       </div>
//     </article>
//     </section>
//   );
// }

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
