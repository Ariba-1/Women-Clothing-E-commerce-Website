import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading details...</div>;
  }

  if (!product) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Product not found.</div>;
  }

  const isStitched = product.category !== 'Unstitched';

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      size: selectedSize
    };
    addToCart(itemToAdd);
  };

  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        
        {/* Left: Image */}
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }} 
          />
        </div>

        {/* Right: Details */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.name}</h1>
            <p style={{ fontSize: '1.25rem', color: '#555', fontWeight: 'bold' }}>Rs. {product.price}</p>
          </div>

          <p style={{ lineHeight: '1.6', color: '#444' }}>{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0 }}>Select Size</h4>
                {isStitched && (
                  <button 
                    onClick={() => setShowSizeGuide(!showSizeGuide)} 
                    style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#555' }}
                  >
                    Size Guide
                  </button>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: `1px solid ${selectedSize === size ? '#2C3333' : '#ccc'}`,
                      background: selectedSize === size ? '#2C3333' : 'transparent',
                      color: selectedSize === size ? '#fff' : '#333',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Guide Modal (Simple inline text for now) */}
          {showSizeGuide && isStitched && (
            <div style={{ background: '#f9f9f9', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
              <h5 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Standard Size Chart (Inches)</h5>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ padding: '4px 0' }}>Size</th>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '4px 0' }}>XS</td><td>34</td><td>28</td><td>36</td></tr>
                  <tr><td style={{ padding: '4px 0' }}>S</td><td>36</td><td>30</td><td>38</td></tr>
                  <tr><td style={{ padding: '4px 0' }}>M</td><td>38</td><td>32</td><td>40</td></tr>
                  <tr><td style={{ padding: '4px 0' }}>L</td><td>40</td><td>34</td><td>42</td></tr>
                  <tr><td style={{ padding: '4px 0' }}>XL</td><td>42</td><td>36</td><td>44</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Actions */}
          <button 
            className="btn btn-full" 
            style={{ padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}
            onClick={handleAddToCart}
          >
            ADD TO BAG
          </button>
          
        </div>
      </div>
    </main>
  );
}
