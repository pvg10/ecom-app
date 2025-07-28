const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb://127.0.0.1:27017/ecomdb';

// Define schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  gender: String,
});

// Create models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clean collections
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create user
    const hashedPassword = await bcrypt.hash('Alphanumeric@123', 10);
    await User.create({ email: 'admin@example.com', password: hashedPassword });

    // Insert products
    await Product.insertMany([
      {
        name: 'Classic White T-Shirt',
        price: 499,
        category: 'Tops',
        gender: 'Men',
      },
      {
        name: 'Floral Summer Dress',
        price: 899,
        category: 'Dresses',
        gender: 'Women',
      },
      {
        name: 'Unisex Hoodie',
        price: 1299,
        category: 'Outerwear',
        gender: 'Unisex',
      },
    ]);

    console.log('✅ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
