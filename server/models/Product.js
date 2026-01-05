const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
