import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart-overlay" onClick={toggleCart}>
      <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="icon-btn" onClick={toggleCart}><X /></button>
        </div>
        
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is currently empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Rs. {item.price}</p>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <button className="icon-btn text-danger" onClick={() => removeFromCart(item.id || item._id, item.size)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
              <span>SUBTOTAL:</span>
              <span>Rs.{total}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Link to="/checkout" className="btn btn-full" style={{ flex: 1, textAlign: 'center' }} onClick={toggleCart}>VIEW BAG</Link>
              <Link to="/checkout" className="btn btn-full" style={{ flex: 1, textAlign: 'center' }} onClick={toggleCart}>CHECKOUT</Link>
            </div>
            <button className="btn btn-full" style={{ width: '100%' }} onClick={toggleCart}>CONTINUE SHOPPING</button>
          </div>
        )}
      </div>
    </div>
  );
}
