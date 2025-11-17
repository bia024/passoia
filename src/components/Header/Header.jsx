import "./Header.scss";
import passoia from "../../assets/passoia.png";
//kleber fez import logo from "./" - l minusculo
import { Link } from 'react-router-dom'

export default function Header () {
    return(
        <header>
            <img src={passoia} alt="Logo Passoia" />
            <nav>
                <ul>
                    <li><Link to="/looks">LOOKS</Link></li>
                    <li><Link to="/lancamentos">LANÇAMENTOS</Link></li>
                    <li><Link to="/novidades">NOVIDADES</Link></li>
                    <li><Link to="/blackfriday">BLACKFRIDAY</Link></li>
                </ul>  
            </nav>
        </header>
    );
}
