import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import "./Carrinho.scss";

export default function Carrinho() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert(
      "Redirecionando para o pagamento! (Funcionalidade a ser implementada)"
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos para vê-los aqui.</p>
        <Link to="/" className="btn-primary">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Meu Carrinho</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.imagem} alt={item.nome} className="item-image" />
              <div className="item-details">
                <h3 className="item-name">{item.nome}</h3>
                <p className="item-price">R$ {item.preco.toFixed(2)}</p>
              </div>
              <div className="item-quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Diminuir quantidade"
                >
                  <MdRemove />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Aumentar quantidade"
                >
                  <MdAdd />
                </button>
              </div>
              <p className="item-subtotal">
                R$ {(item.preco * item.quantity).toFixed(2)}
              </p>
              <button
                className="item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remover item"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
