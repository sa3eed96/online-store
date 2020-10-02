/**
 * middleware function to authorize user requests
 * @module middleware/checkauth
 */

const createError = require('http-errors');

/**
 * checks if user object is in session object, if it is present then user is authorized, otherwise 401 error is thrown
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (req, res, next)=>{
    if('user' in req.session)
        return next();
    return next(createError(401, 'You Are Not Logged In')); 
};