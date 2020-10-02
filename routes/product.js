/**
 * Product Model HTTP Methods Router.
 * @module routes/product
 */

const express = require('express');
const productController = require('../controllers/product');
const userRateRouter = require('./userrate');
const validation = require('../validations/product');
const router = express.Router();

/**
 * attach handlers for get request to get a list of products.
 * @name get/products
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param controller_function - function that handles the request.
 * @see module:controllers/product
 * @see module:validations/product
 */
router.get('/', validation('index'), productController.index);

/**
 * attach handlers for get request to get a product by id.
 * @name get/product
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param controller_function - function that handles the request.
 * @see module:controllers/product
 * @see module:validations/product
 */
router.get('/:id', validation('show'), productController.show);

/**
 * adding userrate routes as child of product route as a nested route.
 */
router.use('/:productId/userrate', userRateRouter);

module.exports = router;