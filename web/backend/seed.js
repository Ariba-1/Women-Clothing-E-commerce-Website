import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();

connectDB();

const desc = "Refresh your wardrobe with this stunning piece, crafted with premium materials for maximum comfort and elegance. Perfect for casual outings and special occasions.";

const sizesStitched = ['XS', 'S', 'M', 'L', 'XL'];
const sizesUnstitched = ['Unstitched'];

const sampleProducts = [
  // Trending Now (shown on Home)
  { name: 'Floral Printed Lawn Suit', price: 4500, image: '/trend1.jpg', category: 'Trending', description: desc, sizes: sizesStitched },
  { name: 'Embroidered Chiffon Dress', price: 8999, image: '/trend2.jpg', category: 'Trending', description: desc, sizes: sizesStitched },
  { name: 'Classic Shalwar Kameez', price: 5500, image: '/trend3.jpg', category: 'Trending', description: desc, sizes: sizesStitched },
  { name: 'Embroided Chiffon Dress', price: 13200, image: '/trend4.jpg', category: 'Trending', description: desc, sizes: sizesStitched },
  { name: 'Pastel Mint Summer Suit', price: 5900, image: '/trend5.jpg', category: 'Trending', description: desc, sizes: sizesStitched },
  { name: 'Green Party Wear', price: 12000, image: '/trend6.jpg', category: 'Trending', description: desc, sizes: sizesStitched },
  { name: 'Minimalist Unstitched Fabric', price: 9000, image: '/trend7.jpg', category: 'Trending', description: desc, sizes: sizesUnstitched },
  { name: 'Printed Lawn Suit', price: 6500, image: '/trend8.jpg', category: 'Trending', description: desc, sizes: sizesStitched },

  // New Arrivals
  { name: 'Summer Breeze Lawn', price: 4200, image: '/trend1.jpg', category: 'New Arrivals', description: desc, sizes: sizesStitched },
  { name: 'Pastel Pink Chiffon', price: 8500, image: '/trend2.jpg', category: 'New Arrivals', description: desc, sizes: sizesStitched },
  { name: 'Shocking Pink Lawn', price: 3200, image: '/trend3.jpg', category: 'New Arrivals', description: desc, sizes: sizesStitched },
  { name: 'Embroided Chiffon Dress', price: 11000, image: '/trend4.jpg', category: 'New Arrivals', description: desc, sizes: sizesStitched },
  { name: 'Beige Embroidered Suit', price: 4800, image: '/trend5.jpg', category: 'New Arrivals', description: desc, sizes: sizesStitched },
  
  // Unstitched
  { name: 'Unstitched Printed Lawn 3PC', price: 3500, image: '/trend3.jpg', category: 'Unstitched', description: desc, sizes: sizesUnstitched },
  { name: 'Unstitched Embroidered Chiffon', price: 7000, image: '/trend4.jpg', category: 'Unstitched', description: desc, sizes: sizesUnstitched },
  { name: 'Unstitched Silk 2PC', price: 5500, image: '/trend1.jpg', category: 'Unstitched', description: desc, sizes: sizesUnstitched },
  { name: 'Unstitched Cotton Khaddar', price: 4000, image: '/trend2.jpg', category: 'Unstitched', description: desc, sizes: sizesUnstitched },

  // Ready To Wear
  { name: 'Ready to Wear Kurtie', price: 2500, image: '/trend5.jpg', category: 'Ready To Wear', description: desc, sizes: sizesStitched },
  { name: 'Pret Wear 2PC', price: 4800, image: '/trend6.jpg', category: 'Ready To Wear', description: desc, sizes: sizesStitched },
  { name: 'Embroidered Pret Kurta', price: 6500, image: '/trend7.jpg', category: 'Ready To Wear', description: desc, sizes: sizesStitched },
  { name: 'Silk Tunic', price: 8900, image: '/trend8.jpg', category: 'Ready To Wear', description: desc, sizes: sizesStitched },

  // Bridal Collection
  { name: 'Silver Gown', price: 180000, image: '/new2.jpeg', category: 'Bridal Collection', description: desc, sizes: sizesStitched },
  { name: 'Royal Red Bridal Lehenga', price: 150000, image: '/red.jpg', category: 'Bridal Collection', description: desc, sizes: sizesStitched },
  { name: 'Golden Embellished Maxi', price: 120000, image: '/golden.jpg', category: 'Bridal Collection', description: desc, sizes: sizesStitched },
  { name: 'Silver Hand-Crafted Gown', price: 180000, image: '/silver.jpg', category: 'Bridal Collection', description: desc, sizes: sizesStitched },
  { name: 'Classic Maroon Bridal Wear', price: 135000, image: '/maroon.jpg', category: 'Bridal Collection', description: desc, sizes: sizesStitched },

];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
