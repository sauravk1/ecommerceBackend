const express = require('express');
const { requireSignin,userMiddleware } = require('../common-middleware');

const { addItemToCart } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/add-to-cart',requireSignin,userMiddleware,addItemToCart);


module.exports = router; 