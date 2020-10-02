/**
 * Address Model HTTP Methods Router.
 * @module routes/address
 */

const express = require('express');
const addressController = require('../controllers/address');
const checkAuthentication = require('../middleware/checkauth');
const validation = require('../validations/address');
const router = express.Router();

/**
 * attach handlers for get request to list all user addresses.
 * @name get/addresses
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:controllers/address
 * @see module:middleware/checkauth
 */
router.get('',checkAuthentication, addressController.index);

/**
 * attach handlers for post request to create address.
 * @name create/address
 * @param {string} path - path to map to this route.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:controllers/address
 * @see module:middleware/checkauth
 */
router.post('',checkAuthentication, addressController.create);

/**
 * attach handlers for put request to update address.
 * @name update/address
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:validations/address
 * @see module:middleware/checkauth
 * @see module:controllers/address
 */
router.put('/:id', validation('update'), checkAuthentication, addressController.update);

/**
 * attach handlers for delete request to delete address.
 * @name delete/address
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:validations/address
 * @see module:middleware/checkauth
 * @see module:controllers/address
 */
router.delete('/:id', validation('destroy'), checkAuthentication, addressController.destroy);

module.exports = router;
