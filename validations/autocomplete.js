/**
 * autocomplete request paramaters validation
 * @module validations/address
 */

const { query } = require('express-validator');

/**
 * validate parameters sent with requests by checking contraints on each parameter and throwing an error if constraints not met.
 * @param {string} method - the name of the method that will be called in controller. 
 */
module.exports = (method) => {
    switch(method){
        case 'index':{
            return[
                query('q').exists(),
            ];
        }
    }
}