/**
 * product request paramaters validation
 * @module validations/product
 */

const { param, query } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'index':{
            return[
                query('page').exists().isInt({min: 1}),
                query('q').isString(),
                query('c').isString(),
                query('sort').matches(/price|name/),
                query('by').matches(/ASC|DESC/),
            ];
        }
        case 'show':{
            return[
                param('id').exists().isInt(),
            ];
        }
    }
}