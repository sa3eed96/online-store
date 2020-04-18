const { param, body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'show':{
            return [
                param('purchaseId').exists().isInt(),
            ];
        }
        case 'create':{
            return [
                body('AddressId').exists().isInt(),
            ];
        }
    }
}