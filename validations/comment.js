const { param, body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'index':{
            return [
                query('page').exists().isInt({min: 1}),
                param('productId').exists().isInt(),
            ];
        }
        case 'create':{
            return[
                param('productId').exists().isInt(),
                body('comment').exists(),
            ];
        }
        case 'destroy':{
            return [
                param('commentId').exists().isInt(),
                param('productId').exists().isInt(),
            ];
        }
    }
}