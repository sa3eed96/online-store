const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const purchaseController = require('../controllers/purchase');
const validation = require('../validations/purchase');

router.get('',authController.checkAuthentication, purchaseController.index);
router.get('/:purchaseId',authController.checkAuthentication, validation('show'), purchaseController.show);
router.post('',authController.checkAuthentication, purchaseController.create);

module.exports = router;
