import { Link } from 'react-router-dom'

export default function Header () {
    return(
        <header>
            <img src="" alt="Logo Passoia" />
            <nav>
                <ul>
                    <Link to="/">LOOKS</Link>
                    <Link to="/">LANÇAMENTOS</Link>
                    <Link to="/">NOVIDADE</Link>
                </ul>  
            </nav>
        </header>
    );
    // posso adicionar um black friday também
}