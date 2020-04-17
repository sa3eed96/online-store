const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const authController = require('../controllers/authentication');

router.get('', authController.checkAuthentication, cartController.index);
// router.put('', authController.checkAuthentication, cartController.update);
// router.delete('', authController.checkAuthentication, cartController.destroy);

module.exports = router;
