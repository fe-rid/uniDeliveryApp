const Shop = require('../models/Shop');
const Product = require('../models/Product');

// @desc    Create a new shop
// @route   POST /api/shops
// @access  Private (Shopkeeper)
const createShop = async (req, res) => {
    const { name, description, address, imageUrl } = req.body;

    const shop = new Shop({
        owner: req.user._id,
        name,
        description,
        address,
        imageUrl
    });

    const createdShop = await shop.save();
    res.status(201).json(createdShop);
};

// @desc    Get all shops
// @route   GET /api/shops
// @access  Public
const getShops = async (req, res) => {
    const shops = await Shop.find({ isOpen: true });
    res.json(shops);
};

// @desc    Get shop by ID
// @route   GET /api/shops/:id
// @access  Public
const getShopById = async (req, res) => {
    const shop = await Shop.findById(req.params.id).populate('owner', 'name email');

    if (shop) {
        res.json(shop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
};

// @desc    Get my shop
// @route   GET /api/shops/myshop
// @access  Private (Shopkeeper)
const getMyShop = async (req, res) => {
    const shop = await Shop.findOne({ owner: req.user._id });
    if (shop) {
        res.json(shop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
}

// @desc    Update shop
// @route   PUT /api/shops/:id
// @access  Private (Owner)
const updateShop = async (req, res) => {
    const shop = await Shop.findById(req.params.id);

    if (shop) {
        if (shop.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        shop.name = req.body.name || shop.name;
        shop.description = req.body.description || shop.description;
        shop.address = req.body.address || shop.address;
        shop.imageUrl = req.body.imageUrl || shop.imageUrl;
        shop.isOpen = req.body.isOpen !== undefined ? req.body.isOpen : shop.isOpen;

        const updatedShop = await shop.save();
        res.json(updatedShop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
};

// @desc    Create a product for a shop
// @route   POST /api/shops/:shopId/products
// @access  Private (Owner)
const createProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    const shop = await Shop.findById(req.params.shopId);

    if (shop) {
        if (shop.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const product = new Product({
            shop: req.params.shopId,
            name,
            price,
            description,
            imageUrl
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
};

// @desc    Get products request by shop ID
// @route   GET /api/shops/:shopId/products
// @access  Public
const getShopProducts = async (req, res) => {
    const products = await Product.find({ shop: req.params.shopId });
    res.json(products);
};

module.exports = {
    createShop,
    getShops,
    getShopById,
    getMyShop,
    updateShop,
    createProduct,
    getShopProducts
};
