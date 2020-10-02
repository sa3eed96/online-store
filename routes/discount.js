/**
 * Discount Model HTTP Methods Router.
 * @module routes/discount
 */

const express = require('express');
const discountController = require('../controllers/discount');
const router = express.Router();

/**
 * attach handlers for get request to return all disconts
 * @name get/discount
 * @param {string} path - path to map to this route.
 * @param controller_function - function that handles the request.
 * @see module:controllers/discount
 */
router.get('', discountController.index);

module.exports = router;
