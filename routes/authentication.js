const express = require('express');
const authController =require('../controllers/authentication');
const router = express.Router();

router.post('/login', authController.login, authController.createSession);

router.post('/register', authController.register, authController.createSession);

router.get('/logout', authController.logout);

module.exports = router;
