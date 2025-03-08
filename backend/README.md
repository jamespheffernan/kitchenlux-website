# KitchenLux Backend API

Backend API for the KitchenLux premium kitchenware rental website.

## Features

- RESTful API architecture
- JWT authentication for user management
- MongoDB database integration
- Order processing and management
- Product catalog management
- Review system
- Admin dashboard capabilities
- Stripe payment integration

## Technology Stack

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Stripe API for payments

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd kitchenlux-website/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/kitchenlux
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NODE_ENV=development
   ```

### Database Setup

1. Ensure MongoDB is running
2. Seed the database with initial data:
   ```
   npm run data:import
   ```

### Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `GET /api/products/slug/:slug` - Get a product by slug
- `GET /api/products/top` - Get top-rated products
- `POST /api/products` - Create a new product (Admin)
- `PUT /api/products/:id` - Update a product (Admin)
- `DELETE /api/products/:id` - Delete a product (Admin)
- `POST /api/products/:id/reviews` - Add a product review

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user & get token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete a user (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id` - Update user (Admin)

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/myorders` - Get logged in user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `PUT /api/orders/:id/pickup` - Update order to picked up (Admin)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## Data Models

### User

- name
- email
- password
- isAdmin
- phone
- address (street, city, state, postalCode, country)
- rentalHistory

### Product

- name
- slug
- image
- description
- category (Essential, Specialty, Chef)
- price
- countInStock
- rating
- numReviews
- itemsIncluded
- specifications
- perfect_for
- isPopular
- related_products

### Order

- user
- orderItems
- rentalAddress
- paymentMethod
- paymentResult
- taxPrice
- deliveryPrice
- damageProtection
- damageProtectionPrice
- totalPrice
- isPaid
- paidAt
- rentalStart
- rentalEnd
- isDelivered
- deliveredAt
- isPickedUp
- pickedUpAt
- status
- notes

## Testing

Run tests using Jest:
```
npm test
```