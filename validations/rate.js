const { param, body, query } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'index':{
            return [
                param('productId').exists().isInt(),
                query('page').exists().isInt(),
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