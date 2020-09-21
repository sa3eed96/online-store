const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/currency');

router.get('', CurrencyController.index);

module.exports = router;
