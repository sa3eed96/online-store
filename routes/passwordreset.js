/**
 * EmailLink Model HTTP Methods Router.
 * @module routes/users
 */

const express = require('express');
const router = express.Router();
const passwordReset = require('../controllers/passwordreset');
const validation = require('../validations/passwordreset');



/**
 * attach handlers for get request to get link for password reset.
 * @name get/passwordreset
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:validations/passwordreset
 * @see module:controllers/passwordreset
 */
router.get('/:id',validation('show'), passwordReset.show);


/**
 * attach handlers for post request to create link for password reset.
 * @name post/passwordreset
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:validations/passwordreset
 * @see module:controllers/passwordreset
 */
router.post('', validation('create'), passwordReset.create);

module.exports = router;
