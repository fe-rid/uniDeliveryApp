const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/unideliver';

console.log('Testing MongoDB Connection...');
console.log('URI:', mongoURI);

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000 // 5 second timeout
})
    .then(() => {
        console.log('MongoDB Connection Successful!');
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1);
    });
