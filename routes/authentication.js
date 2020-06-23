const express = require('express');
const authController =require('../controllers/authentication');
const validate = require('../validations/authentication');
const router = express.Router();

router.post('/login', validate('login'), authController.login, authController.createSession);

router.post('/register', validate('register'), authController.register, authController.createSession);

router.put('/changepassword', validate('changepassword'), authController.changePassword);

router.get('/logout', authController.checkAuthentication, authController.logout);
router.get('/getloggedin', authController.checkAuthentication, authController.returnLoggedInUser);

router.post('/reset', validate('reset'), authController.passwordReset);

module.exports = router;
