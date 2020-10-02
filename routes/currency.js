/**
 * currency Router.
 * @module routes/currency
 */

const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/currency');

/**
 * attach handlers for get request to currency rate
 * @name get/currency
 * @param {string} path - path to map to this route.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/currency
 */
router.get('', CurrencyController.index);

module.exports = router;
