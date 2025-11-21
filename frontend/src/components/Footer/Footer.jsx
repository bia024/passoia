import React from "react";
import "./Footer.scss";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import boleto from "../../assets/boleto.png";
import pix from "../../assets/pix.png";
import ig from "../../assets/instagram.png";
import fb from "../../assets/facebook.png";
import yt from "../../assets/youtube.png";
import tw from "../../assets/twitter.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="contatos-wrapper">
        <div className="contatos-grid">
          <section className="contatos-col" aria-labelledby="atendimento">
            <h3 id="atendimento">ATENDIMENTO</h3>
            <ul>
              <li>
                <a href="#">Fale Conosco</a>
              </li>
              <li>
                <a href="#">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="#">Meus Pedidos</a>
              </li>
              <li>
                <a href="#">Nossas Lojas</a>
              </li>
            </ul>
          </section>

          <section className="contatos-col" aria-labelledby="pagamentos">
            <h3 id="pagamentos">FORMAS DE PAGAMENTO</h3>
            <div className="payments">
              <img src={mastercard} alt="Mastercard" />
              <img src={visa} alt="Visa" />
              <img src={pix} alt="Pix" />
              <div className="boleto">
                <img src={boleto} alt="Boleto" />
              </div>
            </div>
          </section>

          <section className="contatos-col" aria-labelledby="redes">
            <h3 id="redes">SIGA-NOS NAS REDES SOCIAIS</h3>
            <div className="socials">
              <a href="#" aria-label="Instagram" className="social-btn">
                <img src={ig} alt="Instagram" />
              </a>
              <a href="#" aria-label="Facebook" className="social-btn">
                <img src={fb} alt="Facebook" />
              </a>
              <a href="#" aria-label="YouTube" className="social-btn">
                <img src={yt} alt="YouTube" />
              </a>
              <a href="#" aria-label="Twitter" className="social-btn">
                <img src={tw} alt="Twitter" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
