const mongoose = require('mongoose');

// Define a schema for items
const itemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FoodItem',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define the main order schema
const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  items: [itemSchema], // Array of items based on the above schema
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
