const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const userController = require('../controllers/user');
const validation = require('../validations/user');

router.put('', authController.checkAuthentication, userController.update);
router.delete('', validation('destroy'), authController.checkAuthentication, userController.destroy, authController.logout);

module.exports = router;
