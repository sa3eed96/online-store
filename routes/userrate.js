const express = require('express');
const router = express.Router({ mergeParams: true });
const userRateController = require('../controllers/userrate');
const validation = require('../validations/rate');
const checkAuthentication = require('../middleware/checkauth');

router.get('', validation('index'), userRateController.index);
router.get('/myrate', validation('index'), userRateController.show);
router.post('/', validation('create'), checkAuthentication, userRateController.create);
router.put('/:rateId', validation('update'), checkAuthentication, userRateController.update);

module.exports = router;