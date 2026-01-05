const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Shop = require('./models/Shop');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/unideliver', {});

const importData = async () => {
    try {
        await User.deleteMany();
        await Shop.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('123456', salt);

        // Create Users
        const users = await User.insertMany([
            { name: 'Shop Keeper', email: 'shop@example.com', password: hash, role: 'shopkeeper', phone: '111', location: 'Shop A' },
            { name: 'Fast Runner', email: 'runner@example.com', password: hash, role: 'runner', phone: '222', location: 'Campus' },
            { name: 'Hungry Student', email: 'student@example.com', password: hash, role: 'student', phone: '333', location: 'Dorm A' },
        ]);

        const shopkeeper = users[0];

        // Create Shop
        const sampleShop = new Shop({
            owner: shopkeeper._id,
            name: 'Campus Burger',
            description: 'Best burgers in the university',
            address: 'Building 5, Ground Floor',
            isOpen: true
        });

        const createdShop = await sampleShop.save();

        // Create Products
        const sampleProducts = [
            { shop: createdShop._id, name: 'Cheeseburger', price: 5.99, description: 'Juicy beef patty with cheddar' },
            { shop: createdShop._id, name: 'Fries', price: 2.99, description: 'Crispy salted fries' },
            { shop: createdShop._id, name: 'Cola', price: 1.50, description: 'Chilled soda' },
        ];

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Shop.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
