const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cart');  // Check this import statement
const Seller = require ('../Middleware/Admin')

router.post('/addtocart', cartController.insert);
router.get('/cart', cartController.viewAll);  // Assuming you want to view all cart items here
router.get('/viewSingle/:id', cartController.viewSingle);  // Assuming you want to view all cart items here
router.delete('/removecart/:id', cartController.remove);
router.delete('/removeall', cartController.removeall);
router.put('/updatecart', cartController.update);

module.exports = router;
