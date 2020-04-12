const express = require('express');
const authController =require('../controllers/authentication');
const validate = require('../validations/authentication');
const router = express.Router();

router.post('/login', validate('login'), authController.login, authController.createSession);

router.post('/register', authController.register, authController.createSession);

router.get('/logout',authController.checkAuthentication, authController.logout);

module.exports = router;
