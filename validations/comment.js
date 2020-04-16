const { param, body } = require('express-validator');

module.exports = (method) => {
    switch(method){
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