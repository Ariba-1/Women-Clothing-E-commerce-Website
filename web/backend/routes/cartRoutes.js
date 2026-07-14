import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get user cart
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching cart' });
  }
});

// Merge local cart into user cart
router.post('/merge', protect, async (req, res) => {
  try {
    const localCart = req.body.cartItems; // Array of { product: productId, quantity, size }
    const user = await User.findById(req.user._id);

    if (localCart && localCart.length > 0) {
      localCart.forEach(localItem => {
        const productId = localItem.id || localItem._id;
        const size = localItem.size || 'Standard';
        if (!productId) return;

        const existingItem = user.cart.find(
          item => item.product.toString() === productId.toString() && item.size === size
        );
        
        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          user.cart.push({ product: productId, quantity: localItem.quantity, size });
        }
      });
      await user.save();
    }
    
    // Return populated cart
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error merging cart' });
  }
}); 

// Update cart item (add/increase/decrease)

router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity, size = 'Standard' } = req.body;
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      item => item.product.toString() === productId.toString() && item.size === size
    );
    
    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      user.cart.push({ product: productId, quantity, size });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error updating cart' });
  }
});

// Remove item from cart
router.delete('/:productId/:size', protect, async (req, res) => {
  try {
    const { productId, size } = req.params;
    const user = await User.findById(req.user._id);
    
    user.cart = user.cart.filter(
      item => !(item.product.toString() === productId.toString() && item.size === size)
    );
    
    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error removing from cart' });
  }
});

export default router;
