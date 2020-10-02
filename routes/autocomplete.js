/**
 * autocomplete Router.
 * @module routes/autocomplete
 */

const express = require('express');
const router = express.Router();
const validation = require('../validations/autocomplete');
const AutoCompleteController = require('../controllers/autocomplete');

/**
 * attach handlers for get request to get auto complete items.
 * @name get/autocomplete
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param controller_function - function that handles the request.
 * @see module:controllers/cart
 * @see module:validations/autocomplete
 */
router.get('', validation('index'), AutoCompleteController.index);

module.exports = router;
