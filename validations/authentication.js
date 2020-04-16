const { body } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'login':{
            return [
                body('email').exists().isEmail(),
                body('password').exists().isString(),
            ];
        }
        case 'register':{
            return [
                body('firstName').exists(),
                body('lastName').exists(),
                body('phone').exists(),
                body('password').exists(),
                body('email').exists(),
            ];
        }
    }
}