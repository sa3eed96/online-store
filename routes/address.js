const express = require('express');
const addressController = require('../controllers/address');
const checkAuthentication = require('../middleware/checkauth');
const validation = require('../validations/address');
const router = express.Router();


router.get('',checkAuthentication, addressController.index);
router.post('',checkAuthentication, addressController.create);
router.put('/:id', validation('update'), checkAuthentication, addressController.update);
router.delete('/:id', validation('destroy'), checkAuthentication, addressController.destroy);

module.exports = router;
