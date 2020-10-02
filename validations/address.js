/**
 * emailconfirm request paramaters validation
 * @module validations/address
 */

const { param, body } = require('express-validator');


/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'update':{
            return [
                param('id').exists().isInt(),
            ];
        }
        case 'destroy':{
            return [
                param('id').exists().isInt(),
            ];
        }
    }
}