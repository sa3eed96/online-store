const { body } = require('express-validator/check');

module.exports = (method) => {
    switch(method){
        case 'login':{
            return [
                body('email').exists().isEmail(),
                body('password').exists().isString(),
            ];
        }

    }
}