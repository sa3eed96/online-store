const express = require('express');
const authController = require('../controllers/authentication');
const rateController = require('../controllers/rate');
const validation = require('../validations/rate');
const router = express.Router();

router.put('/:rateId', validation('update'), authController.checkAuthentication, rateController.update);

module.exports = router;
