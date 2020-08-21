const express = require('express');
const checkAuthentication = require('../middleware/checkauth');
const rateController = require('../controllers/rate');
const validation = require('../validations/rate');
const router = express.Router({ mergeParams: true });

router.put('/:rateId', validation('update'), checkAuthentication, rateController.update);

module.exports = router;
