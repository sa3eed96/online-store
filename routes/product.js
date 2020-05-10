const express = require('express');
const productController = require('../controllers/product');
const rateRouter = require('./rate');
const commentRouter = require('./comment');
const validation = require('../validations/product');
const router = express.Router();


router.get('/', validation('index'), productController.index);
router.get('/:id', validation('show'), productController.show);
router.use('/:productId/rate', rateRouter);
router.use('/:productId/comment', commentRouter);

module.exports = router;
