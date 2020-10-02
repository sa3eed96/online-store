/**
 * emailconfirm request paramaters validation
 * @module validations/cart
 */

const { body } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'update':{
            return [
                body('productId').exists().isInt(),
                body('productName').exists().isString(),
                body('op').exists().isBoolean(),
                body('quantity').exists().isInt(),
                body('price').exists().isFloat(),
            ];
        }
    }
}