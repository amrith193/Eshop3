
const express = require('express');
const orderController = require('../Controller/order');

const router = express.Router();

router.post('/orders/:sellerId', orderController.createOrder);


router.get('/ordersview', orderController.getAllOrdersview);
router.get('/orders', orderController.getAllOrders);
router.get('/ordersadmin', orderController.getAllOrdersadmin);

router.get('/ord', orderController.view);


router.get('/orders/:id', orderController.getOrderById);



router.put('/orders/:id', orderController.updateOrderById);

router.delete('/orders/:id', orderController.deleteOrderById);

module.exports = router;
