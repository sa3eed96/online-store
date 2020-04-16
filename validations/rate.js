const { param, body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'update':{
            return [
                param('rateId').exists().isInt(),
                param('productId').exists().isInt(),
                body('rate').exists().isInt({min:1, max:5}),
                body('rateArray').exists().isArray({min:5, max:5}),
            ];
        }
    }
}