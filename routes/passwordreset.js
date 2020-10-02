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
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:validations/passwordreset
 * @see module:controllers/passwordreset
 */
router.get('/:id',validation('show'), passwordReset.show);


/**
 * attach handlers for post request to create link for password reset.
 * @name post/passwordreset
 * @param {string} path - path to map to this route.
 * @param validation - function to validate the request parameters.
 * @param check_authentication - function to authorize the user.
 * @param controller_function - function that handles the request.
 * @see module:validations/passwordreset
 * @see module:controllers/passwordreset
 */
router.post('', validation('create'), passwordReset.create);

module.exports = router;
