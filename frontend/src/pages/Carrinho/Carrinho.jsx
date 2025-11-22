import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import "./Carrinho.scss";

export default function Carrinho() {
  const { cartItems, updateQuantity, removeFromCart, formatPrice } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * formatPrice(item.preco),
    0
  );

  if (!cartItems.length)
    return (
      <main className="cart-container empty-cart">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos para vê-los aqui.</p>
        <Link to="/" className="btn-primary">
          Voltar para a loja
        </Link>
      </main>
    );

  return (
    <main className="cart-container">
      <h1>Meu Carrinho</h1>
      <section className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.imagem} alt={item.nome} className="item-image" />
              <div className="item-details">
                <h3>{item.nome}</h3>
                <p className="item-price">
                  R$ {formatPrice(item.preco).toFixed(2)}
                </p>
              </div>
              <div className="item-quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <MdRemove />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <MdAdd />
                </button>
              </div>
              <p className="item-subtotal">
                R$ {(formatPrice(item.preco) * item.quantity).toFixed(2)}
              </p>
              <button
                className="item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <MdDelete />
              </button>
            </article>
          ))}
        </div>

        <aside className="order-summary">
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
          <button
            className="checkout-btn"
            onClick={() => alert("Redirecionando para pagamento")}
          >
            Finalizar Compra
          </button>
        </aside>
      </section>
    </main>
  );
}
