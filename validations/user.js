/**
 * user request paramaters validation
 * @module validations/rate
 */

const { body } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'destroy':{
            return [
                body('password').exists(),
            ];
        }
        case 'changepassword':{
            return [
                body('password').exists(),
                body('newPassword').exists(),
            ];
        }
    }
}