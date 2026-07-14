import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { message: 'You need to login first before checking out.' } });
    }
  }, [user, navigate]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (!user) return null;

  if (orderPlaced) {
    return (
      <main className="container" style={{ padding: '4rem 0', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#f9f9f9', padding: '3rem', borderRadius: '8px' }}>
          <h2 style={{ color: '#28a745', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
          <p style={{ margin: '1rem 0 2rem', color: '#666' }}>Thank you for shopping with us. Your order (Cash on Delivery) has been confirmed and is being processed.</p>
          <Link to="/" className="btn" style={{ padding: '0.8rem 2rem' }}>Continue Shopping</Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="container" style={{ padding: '4rem 0', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Your Bag is Empty</h2>
        <p style={{ margin: '1rem 0 2rem' }}>You cannot checkout with an empty bag.</p>
        <Link to="/" className="btn">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Shipping Form Placeholder */}
        <div style={{ flex: '1 1 500px' }}>
          <h3>Shipping Information</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} onSubmit={handlePlaceOrder}>
            <input type="text" placeholder="Full Name" className="form-input" required />
            <input type="email" placeholder="Email Address" className="form-input" required />
            <input type="text" placeholder="Address" className="form-input" required />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="text" placeholder="City" className="form-input" required style={{ flex: 1 }} />
              <input type="text" placeholder="Postal Code" className="form-input" required style={{ flex: 1 }} />
            </div>
            <button type="submit" className="btn btn-full" style={{ padding: '1rem', marginTop: '1rem' }}>
              PLACE ORDER (COD)
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ flex: '1 1 300px', background: '#f9f9f9', padding: '2rem', borderRadius: '4px' }}>
          <h3>Order Summary</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '60px', objectFit: 'cover' }} />
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.9rem' }}>{item.name}</h5>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Size: {item.size}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div style={{ fontWeight: '500' }}>Rs. {item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '2px solid #ddd', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>Rs. {subtotal}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
