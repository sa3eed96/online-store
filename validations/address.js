const { param, body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'update':{
            return [
                param('id').exists().isInt(),
            ];
        }
        case 'destroy':{
            return [
                param('id').exists().isInt(),
            ];
        }
    }
}