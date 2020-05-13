const express = require('express');
const productController = require('../controllers/product');
const rateRouter = require('./rate');
const purchaseDetailRouter = require('./purchasedetail');
const validation = require('../validations/product');
const router = express.Router();


router.get('/', validation('index'), productController.index);
router.get('/:id', validation('show'), productController.show);
router.use('/:productId/rate', rateRouter);
router.use('/:productId/purchasedetail', purchaseDetailRouter);

module.exports=router;