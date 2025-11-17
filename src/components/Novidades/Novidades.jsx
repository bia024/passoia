import "./Novidades.scss";
import BannerNovidades from "../Banner/NovidadesMake.jpg";

export default function Novidades() {
  return (
    <section id="secao-novidades">
      <h2>NOVIDADES PARA VOCÊ</h2>

      <div className="novidades-img">
        <img src={BannerNovidades} alt="Novidades" />
      </div>
    </section>
  );
}
