const express = require('express');
const productController = require('../controllers/product');
const rateRouter = require('./rate');
const router = express.Router();

router.get('', productController.index);
router.use('/:productId/rate',rateRouter);

module.exports = router;
