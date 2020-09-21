const express = require('express');
const discountController = require('../controllers/discount');
const router = express.Router();


router.get('', discountController.index);

module.exports = router;
