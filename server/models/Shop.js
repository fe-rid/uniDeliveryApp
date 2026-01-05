const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    imageUrl: { type: String },
    isOpen: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
