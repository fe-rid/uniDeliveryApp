const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both ports
    credentials: true
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unideliver', {
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
    res.send('UniDeliver API is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
