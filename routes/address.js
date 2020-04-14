const express = require('express');
const authController = require('../controllers/authentication');
const addressController = require('../controllers/address');
const validation = require('../validations/address');
const router = express.Router();


router.get('',authController.checkAuthentication, addressController.index);
router.post('',authController.checkAuthentication, addressController.create);
router.put('/:id', validation('update'), authController.checkAuthentication, addressController.update);
router.delete('/:id', validation('destroy'), authController.checkAuthentication, addressController.destroy);

module.exports = router;
