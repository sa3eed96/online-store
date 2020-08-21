const express = require('express');
const router = express.Router();
const validation = require('../validations/cart');
const cartController = require('../controllers/cart');
const checkAuthentication = require('../middleware/checkauth');

router.get('', checkAuthentication, cartController.index);
router.put('', validation('update'), checkAuthentication, cartController.update);
router.delete('', checkAuthentication, cartController.delete);

module.exports = router;
