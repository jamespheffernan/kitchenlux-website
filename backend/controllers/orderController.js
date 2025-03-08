const Order = require('../models/orderModel');
const User = require('../models/userModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      rentalAddress,
      paymentMethod,
      taxPrice,
      deliveryPrice,
      damageProtection,
      damageProtectionPrice,
      totalPrice,
      rentalStart,
      rentalEnd,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    if (!rentalStart || !rentalEnd) {
      res.status(400).json({ message: 'Rental dates are required' });
      return;
    }

    // Validate rental dates
    const start = new Date(rentalStart);
    const end = new Date(rentalEnd);
    
    if (start >= end) {
      res.status(400).json({ message: 'Rental end date must be after start date' });
      return;
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      rentalAddress,
      paymentMethod,
      taxPrice,
      deliveryPrice,
      damageProtection,
      damageProtectionPrice,
      totalPrice,
      rentalStart,
      rentalEnd,
    });

    const createdOrder = await order.save();

    // Add to user's rental history
    const user = await User.findById(req.user._id);
    user.rentalHistory.push(createdOrder._id);
    await user.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      // Check if the order belongs to the logged-in user or if user is admin
      if (
        order.user._id.toString() !== req.user._id.toString() &&
        !req.user.isAdmin
      ) {
        res.status(401).json({ message: 'Not authorized to view this order' });
        return;
      }
      
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Process payment with Stripe
      const { paymentMethodId } = req.body;
      
      if (!paymentMethodId) {
        res.status(400).json({ message: 'Payment method ID is required' });
        return;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalPrice * 100), // Stripe requires amount in cents
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });

      if (paymentIntent.status === 'succeeded') {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.status = 'confirmed';
        order.paymentResult = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: req.user.email,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400).json({ message: 'Payment failed' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'delivered';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to picked up
// @route   PUT /api/orders/:id/pickup
// @access  Private/Admin
const updateOrderToPickedUp = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPickedUp = true;
      order.pickedUpAt = Date.now();
      order.status = 'completed';

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .populate('user', 'id name')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'confirmed', 'delivered', 'completed', 'cancelled'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      
      // Update related fields based on status
      if (status === 'delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      } else if (status === 'completed') {
        order.isPickedUp = true;
        order.pickedUpAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToPickedUp,
  getMyOrders,
  getOrders,
  updateOrderStatus,
};