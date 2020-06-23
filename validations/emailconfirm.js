const { param } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'destroy':{
            return [
                param('id').exists(),
            ];
        }
    }
}