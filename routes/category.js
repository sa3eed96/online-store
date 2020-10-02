/**
 * Category Model HTTP Methods Router.
 * @module routes/category
 */

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');

/**
 * attach handlers for get request to return all categories
 * @name get/category
 * @param {string} path - path to map to this route.
 * @param controller_function - function that handles the request.
 * @see module:controllers/category
 */
router.get('', CategoryController.index);

module.exports = router;
