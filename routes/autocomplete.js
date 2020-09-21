const express = require('express');
const router = express.Router();
const validation = require('../validations/autocomplete');
const AutoCompleteController = require('../controllers/autocomplete');

router.get('', validation('index'), AutoCompleteController.index);

module.exports = router;
