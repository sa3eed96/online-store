/**
 * rate request paramaters validation
 * @module validations/rate
 */

const { param, body, query } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'index':{
            return [
                param('productId').exists().isInt(),
                query('page').exists().isInt(),
            ];
        }
        case 'create':{
            return [
                param('productId').exists().isInt(),
                body('rate').exists().isInt({min:1, max:5}),
                body('rateArray').exists().isArray({min:5, max:5}),
                body('comment').isString(),
            ];
        }
        case 'update':{
            return [
                param('rateId').exists().isInt(),
                param('productId').exists().isInt(),
                body('rate').exists().isInt({min:1, max:5}),
                body('rateArray').exists().isArray({min:5, max:5}),
                body('comment').isString(),
            ];
        }
    }
}