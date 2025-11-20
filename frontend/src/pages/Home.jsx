import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import { Helmet } from "react-helmet-async";
import "./Home.scss";
import prod1 from "../assets/kit3Batons.png";
import prod2 from "../assets/kitBatomvermelhoNudeRosa.png";
import prod3 from "../assets/kitGloss.png";
import prod4 from "../assets/revitalift-product.jpg";
import prod5 from "../assets/Repair Molecular.jpg";
import prod6 from "../assets/vitamino-color-spectrum.jpg";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Passoia - Beleza que Inspira</title>
        <meta
          name="description"
          content="Descubra as últimas tendências em maquiagem e cuidados com a pele. Lançamentos exclusivos e novidades selecionadas para você."
        />
      </Helmet>
      <Hero />

      <section className="highlights" aria-labelledby="destaques">
        <h2 id="destaques" className="sr-only">
          Destaques
        </h2>
        <div className="container">
          <article className="card">
            <figure>
              <img src={prod1} alt="Kit de batons" />
            </figure>
            <h3>Kit Batons</h3>
            <p className="price">R$ 79,90</p>
            <a className="btn" href="/lancamentos">
              Ver produto
            </a>
          </article>

          <article className="card">
            <figure>
              <img src={prod2} alt="Batom líquido" />
            </figure>
            <h3>Batom Líquido</h3>
            <p className="price">R$ 49,90</p>
            <a className="btn" href="/lancamentos">
              Ver produto
            </a>
          </article>

          <article className="card">
            <figure>
              <img src={prod3} alt="Lançamento" />
            </figure>
            <h3>Gloss</h3>
            <p className="price">R$ 99,90</p>
            <a className="btn" href="/lancamentos">
              Ver produto
            </a>
          </article>
          <article className="card">
            <figure>
              <img src={prod4} alt="Revitalift" />
            </figure>
            <h3>Revitalift</h3>
            <p className="price">R$ 106,99</p>
            <a className="btn" href="/lancamentos">
              Ver produto
            </a>
          </article>
          <article className="card">
            <figure>
              <img src={prod5} alt=" Repair Molecular" />
            </figure>
            <h3>Absolut Repair Molecular</h3>
            <p className="price">R$ 253,90</p>
            <a className="btn" href="/lancamentos">
              Ver produto
            </a>
          </article>
          <article className="card">
            <figure>
              <img src={prod6} alt="Vitamino Color Spectrum" />
            </figure>
            <h3>Vitamino Color Spectrum</h3>
            <p className="price">R$ 200,80</p>
            <a className="btn" href="/lancamentos">
              Ver produto
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
