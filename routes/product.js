const express = require('express');
const productController = require('../controllers/product');
const rateRouter = require('./rate');
const commentRouter = require('./comment');
const router = express.Router();

router.get('', productController.index);
router.use('/:productId/rate', rateRouter);
router.use('/:productId/comment', commentRouter);

module.exports = router;
