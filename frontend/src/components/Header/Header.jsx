import "./Header.scss";
import Logo from "../../assets/L'Oréal.png";
//kleber fez import logo from "./" - l minusculo
import { Link } from 'react-router-dom'

export default function Header () {
    return(
        <header>
            <img src={Logo} alt="Logo Passoia" />
            <nav>
                <ul>
                    <li><Link to="/looks">LOOKS</Link></li>
                    <li><Link to="/lancamentos">LANÇAMENTOS</Link></li>
                    <li><Link to="/novidades">NOVIDADES</Link></li>
                    <li><Link to="/blackfriday">BLACKFRIDAY</Link></li>
                </ul>
            </nav>
            <div className="cadastro">
            <button>Login</button>
            <button>Carrinho</button>
            </div>
        </header>
    );
}
