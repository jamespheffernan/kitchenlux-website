const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import seed functions (will be used if DB is empty)
const { checkAndSeedProducts } = require('./utils/autoSeed');

const app = express();

// Middleware
// Configure CORS for your Netlify frontend
const corsOptions = {
  origin: ['https://kitchenlux.netlify.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Also add a pre-flight response for browsers
app.options('*', cors(corsOptions));

// Add explicit CORS headers as a backup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://kitchenlux.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // In production, we'll let Netlify handle the frontend
  // This API server will only handle /api routes
  app.get('/', (req, res) => {
    res.send('KitchenLux API is running. Frontend is hosted separately on Netlify.');
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  
  // Check if database needs seeding and seed if necessary
  if (process.env.NODE_ENV === 'production') {
    try {
      await checkAndSeedProducts();
      console.log('Database check and seed process completed');
    } catch (error) {
      console.error('Error in auto-seed process:', error.message);
    }
  }
});