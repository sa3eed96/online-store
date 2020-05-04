const { param, body, query } = require('express-validator');

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
    }
}