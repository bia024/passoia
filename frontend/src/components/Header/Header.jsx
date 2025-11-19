import "./Header.scss";
import Logo from "../../assets/L'Oréal.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo Passoia" />

      <nav>
        <ul>
          <li>
            <Link to="/looks">LOOKS</Link>
          </li>
          <li>
            <Link to="/lancamentos">LANÇAMENTOS</Link>
          </li>
          <li>
            <Link to="/novidades">NOVIDADES</Link>
          </li>
          <li>
            <Link to="/blackfriday">BLACKFRIDAY</Link>
          </li>
        </ul>
      </nav>

      <div className="cadastro">
        <Link to="/Cadastro">
          <button>Cadastro</button>
        </Link>
        <button>Login</button>
        <button>Carrinho</button>
      </div>
    </header>
  );
}
