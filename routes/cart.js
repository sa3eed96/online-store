/**
 * Cart Router.
 * @module routes/cart
 */

const express = require('express');
const router = express.Router();
const validation = require('../validations/cart');
const cartController = require('../controllers/cart');
const checkAuthentication = require('../middleware/checkauth');

/**
 * attach handlers for get request to get cart items.
 * @name get/cart
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:controllers/cart
 * @see module:middleware/checkauth
 */
router.get('', checkAuthentication, cartController.index);

/**
 * attach handlers for put request to update cart items.
 * @name put/cart
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:validations/cart
 * @see module:middleware/checkauth
 * @see module:controllers/cart
 */
router.put('', validation('update'), checkAuthentication, cartController.update);

/**
 * attach handlers for delete request to empty cart items.
 * @name delete/cart
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:controllers/cart
 * @see module:middleware/checkauth
 */
router.delete('', checkAuthentication, cartController.delete);

module.exports = router;
