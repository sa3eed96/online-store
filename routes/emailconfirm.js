/**
 * EmailLink Model HTTP Methods Router.
 * @module routes/emailconfirm
 */
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailcontroller');
const validation = require('../validations/emailconfirm');
const checkAuthentication = require('../middleware/checkauth');

/**
 * attach handlers for delete request to delete a email link from database.
 * @name delete/emailconfirm
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/emailcontroller
 * @see module:validations/emailconfirm
 */
router.delete('/:id', validation('destroy') , emailController.destroy);

/**
 * attach handlers for post request to create a new email link.
 * @name post/emailconfirm
 * @param {string} path - path to map to this route.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/emailcontroller
 * @see module:middleware/checkauth
 */
router.post('', checkAuthentication, emailController.create);

module.exports = router;
