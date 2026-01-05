const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'runner', 'shopkeeper'],
        default: 'student'
    },
    phone: { type: String },
    location: { type: String }, // Dorm room / Shop address
    walletBalance: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true }, // For runners
    studentIdUrl: { type: String } // For verification
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
