/**
 * Category Model HTTP Methods Router.
 * @module routes/news
 */

const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/news');

/**
 * attach handlers for get request to return all categories
 * @name get/news
 * @param {string} path - path to map to this route.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/news
 */
router.get('', NewsController.index);

module.exports = router;
