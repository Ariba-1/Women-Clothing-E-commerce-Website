import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Login from './pages/Login';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SearchPage from './pages/SearchPage';
import HeroSlider from './components/HeroSlider'; 
import './cart.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Header() {
  const { cartItems, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header>
      <div className="container header-content">
        <Link to="/" className="logo">ROSAVIE</Link>
        <nav>
          <ul>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/unstitched">Unstitched</Link></li>
            <li><Link to="/ready-to-wear">Ready To Wear</Link></li>
            <li><Link to="/bridal-collection">Bridal collection</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          {showSearch ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #ddd', outline: 'none', fontSize: '0.9rem', width: '150px' }}
              />
              <button type="button" className="icon-btn" onClick={() => setShowSearch(false)}><Search size={20} /></button>
            </form>
          ) : (
            <button className="icon-btn" onClick={() => setShowSearch(true)}><Search size={20} /></button>
          )}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user.name.split(' ')[0]}</span>
              <button className="icon-btn" onClick={logout} title="Logout"><LogOut size={20} /></button>
            </div>
          ) : (
            <Link to="/login" className="icon-btn" title="Login"><User size={20} /></Link>
          )}
          <button className="icon-btn cart-icon" onClick={toggleCart} style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {itemCount > 0 && <span className="cart-badge" style={{ position: 'absolute', top: -8, right: -8, background: '#C4DFDF', color: '#2C3333', fontSize: '0.7rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{itemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Home() {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const scrollAmount = 304;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reset to start if we've reached the end
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next item
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products?category=Trending');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <main>
     <HeroSlider />

      <section className="new-in-section container">
        <div className="new-in-layout">
          <div className="new-in-text">
            <span className="items-count">190+ ITEMS</span>
            <h2>NEW IN</h2>
            <p>
              Refresh your wardrobe with this week's new arrivals. Discover the latest trends, collection highlights, and key pieces for the season.
            </p>
            <Link to="/new-arrivals" className="shop-now-link">SHOP NOW</Link>
          </div>
          <div className="new-in-scroll-container">
            <div className="scroll-wrapper" ref={scrollRef}>
              <div className="scroll-item">
                <img src="/skin.jpg" alt="ELEGANCE" />
                <h4>ELEGANCE</h4>
              </div>
              <div className="scroll-item">
                <img src="/new2.jpeg" alt="Bridal" />
                <h4>BRIDAL COLLECTION</h4>
              </div>
              <div className="scroll-item">
                <img src="/new4.jpeg" alt="Best of Eid II" />
                <h4>BEST OF EID II</h4>
              </div>
              <div className="scroll-item">
                <img src="/new3.jpg" alt="Unstitched" />
                <h4>UNSTITCHED</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section container">
        <h2 className="section-title">Trending Now</h2>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item._id || item.id} className="product-card">
              <Link to={`/product/${item._id || item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-image">
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{item.name}</h3>
                  <p className="product-price">Rs. {item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <CartSidebar />
      {/* <HeroSlider /> */}
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-arrivals" element={<CategoryPage title="New Arrivals" categoryName="New Arrivals" />} />
          <Route path="/unstitched" element={<CategoryPage title="Unstitched" categoryName="Unstitched" />} />
          <Route path="/ready-to-wear" element={<CategoryPage title="Ready To Wear" categoryName="Ready To Wear" />} />
          <Route path="/bridal-collection" element={<CategoryPage title="Bridal Collection" categoryName="Bridal Collection" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
