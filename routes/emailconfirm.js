const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailcontroller');
const validation = require('../validations/emailconfirm');
const checkAuthentication = require('../middleware/checkauth');

router.delete('/:id', validation('destroy') , emailController.destroy);
router.post('', checkAuthentication, emailController.create);

module.exports = router;
