const { param, body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'show':{
            return [
                param('id').exists(),
            ];
        } 
        case 'create':{
            return [
                body('email').exists().isEmail(),
            ];
        } 
    }
}