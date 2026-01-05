const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    getShopOrders,
    getAvailableOrders,
    getRunnerActiveOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('student'), addOrderItems);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/shop/:shopId')
    .get(protect, authorize('shopkeeper'), getShopOrders);

router.route('/available')
    .get(protect, authorize('runner'), getAvailableOrders);

router.route('/runner/active')
    .get(protect, authorize('runner'), getRunnerActiveOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/status')
    .put(protect, updateOrderStatus); // Role check inside controller or here? Can be both.

module.exports = router;
