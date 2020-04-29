const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const userController = require('../controllers/user');

router.put('', authController.checkAuthentication, userController.update);

module.exports = router;
