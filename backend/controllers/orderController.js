import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import { sendEmail } from '../config/email.js';
import User from '../models/userModel.js';



// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    const emailBody = {
      from: process.env.EMAIL_USER, // Sender address
      to: req.user.email, // User's email address
      subject: 'Order Confirmation',
      text: `Your order has been successfully created. Order ID: ${createdOrder._id}`,
    }; 


    try { 
      await sendEmail(emailBody);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email could not be sent:', error.message); 
    }


    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id); 
  const user = await User.findById(order.user.toString());
  console.log("line 91");
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    console.log("line 99");
    const updatedOrder = await order.save();
    const emailBody = {
      from: process.env.EMAIL_USER,
      to: user.email, 
      subject: 'Order Payment Confirmation',
      text: `Your order has been successfully paid. Order ID: ${order}`,
    };

    try {
      await sendEmail(emailBody);
      console.log('Email sent successfully');
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).send({ message: error.message });
      console.error('Email could not be sent:', error.message);
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order.user.toString());
  console.log("line 128");
  const user = await User.findById(order.user.toString()); 
  console.log("line 130");
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    // Email content
    const emailBody = {
      from: process.env.EMAIL_USER,
      to: user.email, // Assuming the order object has a user field with email
      subject: 'Order Delivery Confirmation',
      text: `Your order has been delivered. Order ID: ${order._id}`,
    };

    try {
      await sendEmail(emailBody);
      console.log('Email sent successfully');
      res.json(updatedOrder);
    } catch (error) {
      console.error('Email could not be sent:', error.message);
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
