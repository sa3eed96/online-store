const { param, query } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'index':{
            return[
                query('page').exists().isInt({min: 1}),
            ];
        }
        case 'show':{
            return[
                param('id').exists().isInt(),
            ];
        }
    }
}