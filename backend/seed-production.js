// Script to seed the production database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

dotenv.config();

// Function to seed the database
const seedProductionDB = async () => {
  try {
    // Use the production MongoDB URI from environment variable
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('ERROR: MONGO_URI environment variable is not set'.red.bold);
      process.exit(1);
    }
    
    console.log(`Connecting to production database: ${mongoUri}`.cyan);
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${mongoose.connection.host}`.green.underline);
    
    // Only clear products, not users or orders for safety
    console.log('Clearing existing products...'.yellow);
    await Product.deleteMany();
    
    // Check if admin user exists, create if not
    console.log('Checking for admin user...'.yellow);
    let adminUser = await User.findOne({ isAdmin: true });
    
    if (!adminUser) {
      console.log('No admin user found. Creating admin user...'.yellow);
      // Create a default admin user
      const admin = users[0]; // Assuming the first user in users.js is admin
      adminUser = await User.create(admin);
      console.log('Admin user created'.green);
    } else {
      console.log('Admin user found'.green);
    }
    
    // Add admin user reference to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });
    
    // Import products
    console.log('Importing products...'.yellow);
    await Product.insertMany(sampleProducts);
    
    console.log('Data Imported Successfully!'.green.inverse);
    
    // Log the products for verification
    const productCount = await Product.countDocuments();
    console.log(`Inserted ${productCount} products`.cyan);
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Database disconnected'.gray);
    
    process.exit();
  } catch (error) {
    console.error(`ERROR: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Run the seed function
seedProductionDB();