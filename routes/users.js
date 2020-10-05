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
const checkPassword = require('../middleware/checkpassword');


/**
 * attach handlers for put request to update user.
 * @name update/user
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:middleware/checkauth
 * @see module:controllers/user
 */
router.put('', checkAuthentication, userController.update);

/**
 * attach handlers for put request to change password.
 * @name put/change_password
 * @param {string} path - path to map to this route.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_password - function to check the authinticity of user password
 * @param {Function} controller_function - function that handles chane password request.
 * @see module:validations/user
 * @see module:middleware/checkpassword
 * @see module:middleware/checkauth
 * @see module:controllers/user
 */
router.put('/changepassword', checkAuthentication, validation('changepassword'), checkPassword, userController.update);

/**
 * attach handlers for delete request to delete user.
 * @name delete/user
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:validations/user
 * @see module:middleware/checkauth
 * @see module:controllers/user
 * @see module:controllers/authentication
 */
router.delete('', validation('destroy'), checkAuthentication, checkPassword, userController.destroy, authController.logout);

module.exports = router;
