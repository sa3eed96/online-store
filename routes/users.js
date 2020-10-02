/**
 * User Model HTTP Methods Router.
 * @module routes/users
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const userController = require('../controllers/user');
const validation = require('../validations/user');
const checkAuthentication = require('../middleware/checkauth');


/**
 * attach handlers for put request to update user.
 * @name update/user
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:middleware/checkauth
 * @see module:controllers/user
 */
router.put('', checkAuthentication, userController.update);

/**
 * attach handlers for delete request to delete user.
 * @name delete/user
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:validations/user
 * @see module:middleware/checkauth
 * @see module:controllers/user
 * @see module:controllers/authentication
 */
router.delete('', validation('destroy'), checkAuthentication, userController.destroy, authController.logout);

module.exports = router;
