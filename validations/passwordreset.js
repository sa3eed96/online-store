/**
 * password reset request paramaters validation
 * @module validations/passwordreset
 */

const { param, body } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'show':{
            return [
                param('id').exists(),
            ];
        } 
        case 'create':{
            return [
                body('email').exists().isEmail(),
            ];
        } 
        case 'destroy':{
            return [
                body('password').exists(),
                param('id').exists(),
            ];
        }
    }
}