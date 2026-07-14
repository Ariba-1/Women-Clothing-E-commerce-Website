import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <main className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
      <h2 style={{ marginBottom: '2rem' }}>Search Results for: "{query}"</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((item) => (
            <div key={item._id} className="product-card">
              <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
      ) : (
        <p>No products found matching your search.</p>
      )}
    </main>
  );
}
