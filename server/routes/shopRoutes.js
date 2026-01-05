const express = require('express');
const router = express.Router();
const {
    createShop,
    getShops,
    getShopById,
    getMyShop,
    updateShop,
    createProduct,
    getShopProducts
} = require('../controllers/shopController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('shopkeeper'), createShop)
    .get(getShops);

router.route('/myshop')
    .get(protect, authorize('shopkeeper'), getMyShop);

router.route('/:id')
    .get(getShopById)
    .put(protect, authorize('shopkeeper'), updateShop);

router.route('/:shopId/products')
    .post(protect, authorize('shopkeeper'), createProduct)
    .get(getShopProducts);

module.exports = router;
