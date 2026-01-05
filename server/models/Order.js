const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    runner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Initially null
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true } // Snapshot of price at time of order
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Preparing', 'Ready', 'Picked_Up', 'On_The_Way', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    deliveryAddress: { type: String, required: true }, // Can differ from user profile location
    shopReview: { type: Number }, // 1-5
    runnerReview: { type: Number } // 1-5
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
