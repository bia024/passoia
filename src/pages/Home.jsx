import React from 'react';
import Hero from '../components/Hero/Hero.jsx';
import './Home.scss';

import prod1 from '../assets/kit_3_batom_em_bala_oceane_edition_1 1.png';
import prod2 from '../assets/kit_batom_liquido_vermelho_batom_liquido_nude_batom_liquido_rosa_oceane_edition_1 1.png';
import prod3 from '../assets/image-5f98509bd4794faf9bb619ce30ac88f7 1.png';

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

