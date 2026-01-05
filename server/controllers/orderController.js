const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Student)
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shopId,
        totalAmount,
        deliveryAddress
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        const order = new Order({
            customer: req.user._id,
            shop: shopId,
            items: orderItems,
            totalAmount,
            deliveryAddress
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('customer', 'name email phone')
        .populate('shop', 'name address')
        .populate('runner', 'name phone')
        .populate('items.product', 'name price');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Shopkeeper, Runner)
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;

        // If runner accepts
        if (status === 'Accepted' && req.user.role === 'runner') {
            order.runner = req.user._id;
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
};

// @desc    Get orders for shop
// @route   GET /api/orders/shop/:shopId
// @access  Private (Shopkeeper)
const getShopOrders = async (req, res) => {
    const orders = await Order.find({ shop: req.params.shopId }).sort({ createdAt: -1 })
        .populate('customer', 'name')
        .populate('items.product', 'name price');
    res.json(orders);
};

// @desc    Get available orders for runners
// @route   GET /api/orders/available
// @access  Private (Runner)
const getAvailableOrders = async (req, res) => {
    // Orders that are 'Ready' (waiting for runner) or 'Accepted' by shop?
    // Let's say flow is: Shop Accepts -> Runner Accepts -> Runner Picks Up
    // Actually flow: Student places -> Shop Accepts -> Available for Runner
    // So status 'Accepted' means Shop accepted it, now waiting for Runner.

    const orders = await Order.find({ status: 'Accepted', runner: null })
        .populate('shop', 'name address')
        .populate('customer', 'name location'); // Changed location to match User model

    res.json(orders);
};

// @desc    Get runner's active orders
// @route   GET /api/orders/runner/active
// @access  Private (Runner)
const getRunnerActiveOrders = async (req, res) => {
    const orders = await Order.find({
        runner: req.user._id,
        status: { $in: ['Accepted', 'Picked_Up', 'On_The_Way'] }
    }).populate('shop', 'name address').populate('customer', 'name location phone');
    res.json(orders);
}


module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    getShopOrders,
    getAvailableOrders,
    getRunnerActiveOrders
};
