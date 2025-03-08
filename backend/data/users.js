const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@kitchenlux.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: '555-123-4567',
    address: {
      street: '123 Admin St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
    },
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '555-234-5678',
    address: {
      street: '456 Maple Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '555-345-6789',
    address: {
      street: '789 Oak Blvd',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60007',
      country: 'USA',
    },
  },
];

module.exports = users;