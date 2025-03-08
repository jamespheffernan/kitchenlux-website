// API service for interacting with the KitchenLux backend
// For cloud storage static hosting, we'll use a deployed backend URL if available
// Or you can use a mock API service like mockapi.io
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? '/api'  // In production, API calls are relative to the current origin
    : 'http://localhost:5001/api');  // In development, use the local dev server

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Function to get the JWT token from local storage
const getToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo).token : null;
};

// Product API calls
export const getProducts = async (keyword = '', pageNumber = '', category = '') => {
  try {
    let url = `${API_URL}/products?`;
    if (keyword) url += `keyword=${keyword}&`;
    if (pageNumber) url += `pageNumber=${pageNumber}&`;
    if (category) url += `category=${category}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/products/slug/${slug}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
};

export const fetchTopProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products/top`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};

// Product review
export const createProductReview = async (productId, review) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating product review:', error);
    throw error;
  }
};

// User API calls
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};

export const register = async (name, email, password, phone, address) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone, address }),
    });
    
    const data = await handleResponse(response);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    
    const data = await handleResponse(response);
    
    // Update localStorage with new user data if token is included
    if (data.token) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Order API calls
export const createOrder = async (orderData) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderDetails = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

export const payOrder = async (orderId, paymentMethodId) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders/${orderId}/pay`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentMethodId }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export const getMyOrders = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching my orders:', error);
    throw error;
  }
};

// Admin API calls
export const getUsers = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const updateUser = async (user) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getOrders = async (pageNumber = '') => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders?pageNumber=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const deliverOrder = async (orderId) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders/${orderId}/deliver`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error marking order as delivered:', error);
    throw error;
  }
};

export const pickupOrder = async (orderId) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders/${orderId}/pickup`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error marking order as picked up:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/products/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error('Authentication required');
    
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};