const { param } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'index':{
            return [
                param('productId').exists().isInt(),
            ];
        }
    }
}