import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, token } = useAuth();
  const cartRef = useRef(cartItems);
  
  // Keep ref in sync
  useEffect(() => {
    cartRef.current = cartItems;
  }, [cartItems]);

  // Load cart on login or app start
  useEffect(() => {
    if (user && token) {
      const mergeCart = async () => {
        try {
          if (cartRef.current.length > 0) {
            const res = await fetch('http://localhost:5000/api/cart/merge', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ cartItems: cartRef.current })
            });
            if (!res.ok) throw new Error('Merge failed');
            const data = await res.json();
            formatAndSetCart(data);
          } else {
            const res = await fetch('http://localhost:5000/api/cart', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Fetch failed');
            const data = await res.json();
            formatAndSetCart(data);
          }
        } catch(err) {
           console.error('Error fetching/merging DB cart:', err);
        }
      };
      mergeCart();
    } else {
      const localCart = localStorage.getItem('cartItems');
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
        } catch {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [user, token]);

  const formatAndSetCart = (dbCartArray) => {
    const formattedCart = dbCartArray.map(item => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      quantity: item.quantity
    }));
    setCartItems(formattedCart);
  };

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product) => {
    const productId = product.id || product._id;
    let previousCart;
    
    // Optimistic UI update
    setCartItems(prev => {
      previousCart = [...prev];
      const existing = prev.find(item => (item.id || item._id) === productId);
      if (existing) {
        return prev.map(item => 
          (item.id || item._id) === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);

    if (user && token) {
      // Use ref for latest state
      const currentItems = cartRef.current;
      const existing = currentItems.find(item => (item.id || item._id) === productId);
      const newQuantity = existing ? existing.quantity + 1 : 1;
      
      try {
        const res = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ productId, quantity: newQuantity })
        });
        if (!res.ok) throw new Error('Server error');
      } catch (err) {
        console.error('Error updating DB cart:', err);
        if (previousCart) {
          setCartItems(previousCart);
        }
      }
    }
  };

  const removeFromCart = async (id, size) => {
    let previousCart;
    
    setCartItems(prev => {
      previousCart = [...prev];
      return size !== undefined
        ? prev.filter(item => !((item.id || item._id) === id && item.size === size))
        : prev.filter(item => (item.id || item._id) !== id);
    });

    if (user && token) {
      const url = size !== undefined
        ? `http://localhost:5000/api/cart/${id}/${size}`
        : `http://localhost:5000/api/cart/${id}`;
      
      try {
        const res = await fetch(url, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Server error');
      } catch (err) {
        console.error('Error removing from DB cart:', err);
        // Rollback on failure
        if (previousCart) {
          setCartItems(previousCart);
        }
      }
    }
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

