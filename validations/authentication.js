/**
 * emailconfirm request paramaters validation
 * @module validations/authentication
 */

const { body } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'login':{
            return [
                body('email').exists().isEmail(),
                body('password').exists().isString(),
            ];
        }
        case 'register':{
            return [
                body('firstName').exists(),
                body('lastName').exists(),
                body('phone').exists(),
                body('password').exists(),
                body('email').exists(),
            ];
        }
    }
}