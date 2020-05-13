const express = require('express');
const router = express.Router({ mergeParams: true });
const purchaseDetailController = require('../controllers/purchasedetail');
const validation = require('../validations/purchasedetail');

router.get('', validation('index'), purchaseDetailController.index);
router.get('/myrate', validation('index'), purchaseDetailController.getMyRate);
module.exports = router;