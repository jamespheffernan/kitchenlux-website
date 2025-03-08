# KitchenLux Premium Kitchenware Rental Website

KitchenLux is a premium kitchenware rental service that delivers high-quality cookware, chef-grade knives, and premium kitchen tools directly to your vacation rental, transforming every meal into a gourmet experience.

## Features

- Browse and search premium kitchenware collections
- Filter by category (Essential, Chef's, Specialty)
- User registration and authentication
- Detailed product pages with specifications and reviews
- Shopping cart system
- Rental date selection
- Damage protection option
- Checkout process with delivery information
- Order tracking and history
- Admin dashboard for managing products, orders, and users

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- React DatePicker for rental date selection
- React Toastify for notifications
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Stripe API for payment processing

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Install dependencies:
   ```
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/kitchenlux
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_test_key
   NODE_ENV=development
   ```

3. Seed the database with sample data:
   ```
   npm run data:import
   ```

### Frontend Setup

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the frontend development server:
   ```
   npm start
   ```

### Running the Full Application

From the root directory, you can run both backend and frontend concurrently:
```
npm run dev
```

## Project Structure

```
kitchenlux-website/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── data/            # Sample data for seeding
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server setup
│   └── seeder.js        # Database seeder
│
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # Context providers
│       ├── pages/       # Page components
│       ├── App.jsx      # Main app component
│       └── main.jsx     # Entry point
│
└── package.json         # Project metadata and scripts
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `GET /api/products/slug/:slug` - Get a product by slug
- `GET /api/products/top` - Get top-rated products
- `POST /api/products/:id/reviews` - Add a product review

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user & get token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/myorders` - Get logged in user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid

## Admin Endpoints

### Products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users
- `GET /api/users` - Get all users
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Orders
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id/deliver` - Update order to delivered
- `PUT /api/orders/:id/pickup` - Update order to picked up
- `PUT /api/orders/:id/status` - Update order status

## Demo Accounts

- **Admin User:**
  - Email: admin@kitchenlux.com
  - Password: 123456

- **Customer:**
  - Email: john@example.com
  - Password: 123456