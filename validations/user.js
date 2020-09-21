const { body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'destroy':{
            return [
                body('password').exists(),
            ];
        }
    }
}