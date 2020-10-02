/**
 * authentication Router.
 * @module routes/authentication
 */

const express = require('express');
const authController =require('../controllers/authentication');
const validate = require('../validations/authentication');
const checkAuthentication = require('../middleware/checkauth');
const router = express.Router();

/**
 * attach handlers for post request to login user.
 * @name post/login
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} controller_function - function that handles login request.
 * @param {Function} controller_function - function that handles session creation.
 * @see module:validations/authentication
 * @see module:controllers/authentication
 */
router.post('/login', validate('login'), authController.login, authController.createSession);

/**
 * attach handlers for post request to register user.
 * @name post/register
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} controller_function - function that handles register request.
 * @param {Function} controller_function - function that handles session creation.
 * @see module:validations/authentication
 * @see module:controllers/authentication
 */
router.post('/register', validate('register'), authController.register, authController.createSession);

/**
 * attach handlers for put request to change password.
 * @name put/change_password
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} controller_function - function that handles chane password request.
 * @see module:validations/authentication
 * @see module:controllers/authentication
 */
router.put('/changepassword', validate('changepassword'), authController.changePassword);

/**
 * attach handlers for get request to logout user.
 * @name get/logout
 * @param {string} path - path to map to this route.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles logout request.
 * @see module:controllers/authentication
 * @see module:middleware/checkauth
 */
router.get('/logout', checkAuthentication, authController.logout);

/**
 * attach handlers for get request to current authenticated user.
 * @name get/get_logged_in
 * @param {string} path - path to map to this route.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles request.
 * @see module:controllers/authentication
 * @see module:middleware/checkauth
 */
router.get('/getloggedin', checkAuthentication, authController.returnLoggedInUser);

/**
 * attach handlers for post request to reset password.
 * @name post/reset
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} controller_function - function that handles request.
 * @see module:controllers/authentication
 * @see module:validations/authentication
 */
router.post('/reset', validate('reset'), authController.passwordReset);

module.exports = router;
