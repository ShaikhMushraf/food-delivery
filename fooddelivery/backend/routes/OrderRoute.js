const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure the path is correct

// Create a new order
router.post('/orders', async (req, res) => {
    const { email, items, name, address, number } = req.body;

    try {
        const newOrder = new Order({
            email: email,
            items: items,
            name: name,
            address: address,
            number: number,
            orderDate: new Date(),
            totalPrice: items.reduce((total, item) => total + item.price, 0)
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
    }
});


// Get all orders (for admin use)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'items',
            select: 'name qty size price'
        }).exec();

        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

module.exports = router;
