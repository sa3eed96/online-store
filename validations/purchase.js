/**
 * product request paramaters validation
 * @module validations/purchase
 */

const { param, body, query } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'index':{
            return[
                query('page').exists().isInt({min:1}),
            ];
        }
        case 'show':{
            return [
                param('purchaseId').exists().isInt(),
            ];
        }
        case 'create':{
            return [
                body('addressId').exists().isInt(),
                body('paymentType').exists().isString(),
                body('isPain').exists().isBoolean(),
            ];
        }
        case 'destroy':{
            return [
                param('id').exists().isInt(),
            ];
        }
    }
}