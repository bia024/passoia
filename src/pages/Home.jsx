import React from 'react';
import Hero from '../components/Hero/Hero.jsx';
import './Home.scss';

import prod1 from '../assets/kit3Batons.png';
import prod2 from '../assets/kitBatomvermelhoNudeRosa.png';
import prod3 from '../assets/kitGloss.png';

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="highlights" aria-labelledby="destaques">
        <h2 id="destaques" className="sr-only">Destaques</h2>
        <div className="container">
          <article className="card">
            <figure>
              <img src={prod1} alt="Kit de batons"/>
            </figure>
            <h3>Kit Batons</h3>
            <p className="price">R$ 79,90</p>
            <a className="btn" href="/lancamentos">Ver produto</a>
          </article>

          <article className="card">
            <figure>
              <img src={prod2} alt="Batom líquido"/>
            </figure>
            <h3>Batom Líquido</h3>
            <p className="price">R$ 49,90</p>
            <a className="btn" href="/lancamentos">Ver produto</a>
          </article>

          <article className="card">
            <figure>
              <img src={prod3} alt="Lançamento"/>
            </figure>
            <h3>Lançamento</h3>
            <p className="price">R$ 99,90</p>
            <a className="btn" href="/lancamentos">Ver produto</a>
          </article>
        </div>
      </section>
    </main>
  );
}

