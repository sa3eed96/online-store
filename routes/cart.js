const express = require('express');
const router = express.Router();
const validation = require('../validations/cart');
const cartController = require('../controllers/cart');
const authController = require('../controllers/authentication');

router.get('', authController.checkAuthentication, cartController.index);
router.put('', validation('update'), authController.checkAuthentication, cartController.update);
router.delete('', authController.checkAuthentication, cartController.delete);

module.exports = router;
