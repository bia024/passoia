import React from 'react';
import './Hero.scss';
import heroImg from '../../assets/image-5f98509bd4794faf9bb619ce30ac88f7 1.png';

export default function Hero(){
  return (
    <section className="hero" role="banner" aria-label="Destaque principal" style={{backgroundImage:`url(${heroImg})`}}>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <h1 className="hero-title">Descubra a nova coleção</h1>
        <p className="hero-sub">Beleza que inspira — Lançamentos exclusivos e novidades selecionadas para você.</p>
        <div className="hero-ctas">
          <a href="/lancamentos" className="btn btn-primary">Ver lançamentos</a>
          <a href="/novidades" className="btn btn-outline">Novidades</a>
        </div>
      </div>
    </section>
  );
}
