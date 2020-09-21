const express = require('express');
const authController =require('../controllers/authentication');
const validate = require('../validations/authentication');
const checkAuthentication = require('../middleware/checkauth');
const router = express.Router();

router.post('/login', validate('login'), authController.login, authController.createSession);

router.post('/register', validate('register'), authController.register, authController.createSession);

router.put('/changepassword', validate('changepassword'), authController.changePassword);

router.get('/logout', checkAuthentication, authController.logout);
router.get('/getloggedin', checkAuthentication, authController.returnLoggedInUser);

router.post('/reset', validate('reset'), authController.passwordReset);

module.exports = router;
