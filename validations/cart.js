const { body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'update':{
            return [
                body('productId').exists().isInt(),
                body('productName').exists().isString(),
                body('op').exists().isBoolean(),
                body('quantity').exists().isInt(),
            ];
        }
    }
}