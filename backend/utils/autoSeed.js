// Auto-seeding utility for production database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const products = require('../data/products');
const users = require('../data/users');

/**
 * Check if products exist in the database and seed if empty
 */
const checkAndSeedProducts = async () => {
  try {
    // Count products in the database
    const productCount = await Product.countDocuments();
    console.log(`Found ${productCount} products in database`);
    
    // If there are no products, seed the database
    if (productCount === 0) {
      console.log('No products found in database. Starting seeding process...');
      
      // Check if admin user exists, create if not
      let adminUser = await User.findOne({ isAdmin: true });
      
      if (!adminUser) {
        console.log('No admin user found. Creating admin user...');
        // Create admin user from users array
        const adminData = users.find(user => user.isAdmin) || {
          name: 'Admin User',
          email: 'admin@kitchenlux.com',
          password: bcrypt.hashSync('admin123', 10),
          isAdmin: true
        };
        
        adminUser = await User.create(adminData);
        console.log(`Admin user created: ${adminUser.email}`);
      } else {
        console.log(`Admin user found: ${adminUser.email}`);
      }
      
      // Add admin user reference to each product
      const productsWithUser = products.map(product => {
        return { ...product, user: adminUser._id };
      });
      
      // Insert products
      await Product.insertMany(productsWithUser);
      const newCount = await Product.countDocuments();
      console.log(`Successfully seeded database with ${newCount} products`);
      
      return true;
    } else {
      console.log('Database already contains products. Skipping seed process.');
      return false;
    }
  } catch (error) {
    console.error('Error in checkAndSeedProducts:', error);
    throw error;
  }
};

module.exports = {
  checkAndSeedProducts
};