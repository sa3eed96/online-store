const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const userController = require('../controllers/user');
const validation = require('../validations/user');
const checkAuthentication = require('../middleware/checkauth');

router.put('', checkAuthentication, userController.update);
router.delete('', validation('destroy'), checkAuthentication, userController.destroy, authController.logout);

module.exports = router;
