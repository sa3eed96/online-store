/**
 * emailconfirm request paramaters validation
 * @module validations/emailverify
 */

const { param } = require('express-validator');


/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'destroy':{
            return [
                param('id').exists(),
            ];
        }
    }
}