const express = require('express');
const router = express.Router({ mergeParams: true });
const userRateController = require('../controllers/userrate');
const validation = require('../validations/purchasedetail');

router.get('', validation('index'), userRateController.index);
router.get('/myrate', validation('index'), userRateController.show);
module.exports = router;