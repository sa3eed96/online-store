const express = require('express');
const productController = require('../controllers/product');
const userRateRouter = require('./userrate');
const validation = require('../validations/product');
const router = express.Router();


router.get('/', validation('index'), productController.index);
router.get('/:id', validation('show'), productController.show);
router.use('/:productId/userrate', userRateRouter);

module.exports=router;