const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const emailController = require('../controllers/emailcontroller');
const validation = require('../validations/emailconfirm');

router.delete('/:id', validation('destroy') , emailController.destroy);
router.post('', authController.checkAuthentication, emailController.create);

module.exports = router;
