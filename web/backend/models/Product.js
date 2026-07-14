import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Trending', 'New Arrivals', 'Unstitched', 'Ready To Wear', 'Bridal Collection'],
  },
  description: {
    type: String,
    default: 'A beautiful piece from our collection.'
  },
  sizes: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
