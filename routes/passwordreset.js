const express = require('express');
const router = express.Router();
const passwordReset = require('../controllers/passwordreset');
const validation = require('../validations/passwordreset');

router.get('/:id',validation('show'), passwordReset.show);
router.post('', validation('create'), passwordReset.create);

module.exports = router;
