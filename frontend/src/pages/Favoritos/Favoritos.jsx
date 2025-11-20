import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth } from '../../AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Favoritos.scss';

export default function Favoritos() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // se por um acaso o usuário não estiver autenticado, ele vai é redirecionar para o login
      navigate('/login');
      return;
    }

    async function fetchWishlist() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('http://localhost:3000/wishlist', config);
        setWishlist(response.data);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [isAuthenticated, token, navigate]);

  if (loading) {
    return <div className="favoritos-container"><p>Carregando seus favoritos...</p></div>;
  }

  return (
    <div className="favoritos-container">
      <h1>Meus Favoritos</h1>
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Ainda não há nada aqui.</p>
          <Link to="/lancamentos" className="btn-primary">Consultar Produtos</Link>
        </div>
      ) : (
        <div className="favoritos-grid">
          {wishlist.map(item => (
            <div className="produto-card" key={item.produtoId}>
              <img src={item.produto.imagemUrl} alt={item.produto.nome} />
              <h3>{item.produto.nome}</h3>
              <p>R$ {item.produto.preco.toFixed(2)}</p>
              <button className="btn-ver-produto">Ver Produto</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}