import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CategoryPage({ title, categoryName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?category=${categoryName}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <main>
      <section className="products-section container" style={{ padding: '4rem 0' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{title}</h1>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No products found in this category.</p>
        ) : (
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
        )}
      </section>
    </main>
  );
}

export default CategoryPage;
