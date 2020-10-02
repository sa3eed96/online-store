/**
 * Purchase Model HTTP Methods Router.
 * @module routes/purchase
 */

const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middleware/checkauth');
const purchaseController = require('../controllers/purchase');
const validation = require('../validations/purchase');

/**
 * attach handlers for get request to list Purchases.
 * @name get/purchases
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:middleware/checkauth
 * @see module:controllers/emailcontroller
 */
router.get('', checkAuthentication, purchaseController.index);

/**
 * attach handlers for get request to get a Purchase.
 * @name get/purchase
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param validation - function to validate the request parameters.
 * @param controller_function - function that handles the request.
 * @see module:middleware/checkauth
 * @see module:controllers/emailcontroller
 * @see module:validations/emailconfirm
 */
router.get('/:purchaseId', checkAuthentication, validation('show'), purchaseController.show);

/**
 * attach handlers for post request to create a Purchase.
 * @name post/purchase
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param validation - function to validate the request parameters.
 * @param controller_function - function that handles the request.
 * @see module:middleware/checkauth
 * @see module:controllers/emailcontroller
 * @see module:validations/emailconfirm
 */
router.post('', checkAuthentication, validation('create'), purchaseController.create);

/**
 * attach handlers for delete request to delete a Purchase.
 * @name delete/purchase
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param validation - function to validate the request parameters.
 * @param controller_function - function that handles the request.
 * @see module:middleware/checkauth
 * @see module:controllers/emailcontroller
 * @see module:validations/emailconfirm
 */
router.delete('/:id', checkAuthentication, validation('destroy') ,purchaseController.destroy);

module.exports = router;
