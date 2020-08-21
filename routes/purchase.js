const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middleware/checkauth');
const purchaseController = require('../controllers/purchase');
const validation = require('../validations/purchase');

router.get('', checkAuthentication, purchaseController.index);
router.get('/:purchaseId', checkAuthentication, validation('show'), purchaseController.show);
router.post('', checkAuthentication, validation('create'), purchaseController.create);
router.delete('/:id', checkAuthentication, validation('destroy') ,purchaseController.destroy);

module.exports = router;
