/**
 * UserRate Model HTTP Methods Router.
 * @module routes/userrate
 */

const express = require('express');
const router = express.Router({ mergeParams: true });
const userRateController = require('../controllers/userrate');
const validation = require('../validations/rate');
const checkAuthentication = require('../middleware/checkauth');

/**
 * handle get request to get a list of product rates.
 * @name get/userrate
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/userrate
 * @see module:validations/rate
 */
router.get('', validation('index'), userRateController.index);

/**
 * handle get request to get current user rate.
 * @name get/myrate
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/userrate
 * @see module:validations/rate
 * @see module:middleware/checkauth
 */
router.get('/myrate', validation('index'),checkAuthentication, userRateController.show);

/**
 * handle post request to create a new rate.
 * @name post/userrate
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/userrate
 * @see module:validations/rate
 * @see module:middleware/checkauth
 */
router.post('/', validation('create'), checkAuthentication, userRateController.create);

/**
 * handle put request to update a rate.
 * @name post/userrate
 * @param {string} path - path to map to this route.
 * @param {Function} validation - function to validate the request parameters.
 * @param {Function} check_authentication - function to authorize the user.
 * @param {Function} controller_function - function that handles the request.
 * @see module:controllers/userrate
 * @see module:validations/rate
 * @see module:middleware/checkauth
 */
router.put('/:rateId', validation('update'), checkAuthentication, userRateController.update);

module.exports = router;