import { useState } from "react";
import "./Header.scss";
import Logo from "../../assets/L'Oréal.png";
import { Link, useNavigate } from "react-router-dom";
import { MdPersonAdd, MdShoppingCart, MdMenu, MdClose, MdLogout, MdAccountCircle } from 'react-icons/md';
import { useAuth } from "../../AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLinkClick();
    navigate('/');
  };

  return (
    <header>
      <img src={Logo} alt="Logo Passoia" />

      <nav className={isMenuOpen ? 'active' : ''}>
        <ul>
          <li>
            <Link to="/looks" onClick={handleLinkClick}>LOOKS</Link>
          </li>
          <li>
            <Link to="/lancamentos" onClick={handleLinkClick}>LANÇAMENTOS</Link>
          </li>
          <li>
            <Link to="/novidades" onClick={handleLinkClick}>NOVIDADES</Link>
          </li>
          <li>
            <Link to="/blackfriday" onClick={handleLinkClick}>BLACKFRIDAY</Link>
          </li>
          <li>
            <Link to="/favoritos" onClick={handleLinkClick}>FAVORITOS</Link>
          </li>
        </ul>
      </nav>

      <div className="user-actions">
        {isAuthenticated ? (
          <>
            <span className="welcome-message">Olá, {user.nome}</span>
            <button onClick={handleLogout} className="icon-btn" aria-label="Sair da conta">
              <MdLogout />
            </button>
          </>
        ) : (
          <>
            <Link to="/cadastro" className="icon-btn" aria-label="Página de cadastro">
              <MdPersonAdd />
            </Link>
            <Link to="/login" className="icon-btn" aria-label="Página de login" onClick={handleLinkClick}>
              <MdAccountCircle />
            </Link>
          </>
        )}

        <Link to="/carrinho" className="icon-btn cart-btn" aria-label="Carrinho de compras">
            <MdShoppingCart />
            {itemCount > 0 && (
              <span className="cart-count">{itemCount}</span>
            )}
        </Link>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

    </header>
  );
}
