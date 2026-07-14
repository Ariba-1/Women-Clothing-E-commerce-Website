import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3 className="logo" style={{fontSize: '1.2rem'}}>ROSAVIE</h3>
          <p className="footer-text">Elevating everyday style with premium fabrics and modern cuts.</p>
          <div className="social-links">
            <a href="#" className="icon-btn"><Facebook size={20} /></a>
            <a href="#" className="icon-btn"><Instagram size={20} /></a>
            <a href="#" className="icon-btn"><Twitter size={20} /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Collections</h4>
          <ul>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/unstitched">Unstitched</Link></li>
            <li><Link to="/ready-to-wear">Ready To Wear</Link></li>
            <li><Link to="/bridal-collection">Bridal Collection</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/login?mode=signup">Sign Up</Link></li>
              </>
            ) : (
              <>
                <li><span style={{ color: '#666' }}>Logged in as {user.name}</span></li>
                <li><button onClick={logout} className="text-btn" style={{ padding: 0, textDecoration: 'none', color: '#333' }}>Log Out</button></li>
              </>
            )}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p className="footer-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn" style={{marginTop: '0.5rem', width: '100%'}}>Subscribe</button>
            {isSubscribed && <p style={{ color: '#28a745', marginTop: '0.5rem', fontSize: '0.9rem' }}>Successfully subscribed!</p>}
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rosavie. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
