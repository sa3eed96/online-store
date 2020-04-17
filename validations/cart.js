const { body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'update':{
            return [
                body('product').exists().isInt(),
                body('quantity').exists().isInt(),
            ];
        }
    }
}