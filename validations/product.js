const { param, query } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'index':{
            return[
                query('page').exists().isInt({min: 1}),
                query('q').isString(),
                query('c').isString(),
                query('sort').matches(/price|name/),
                query('by').matches(/ASC|DESC/),
            ];
        }
        case 'show':{
            return[
                param('id').exists().isInt(),
            ];
        }
    }
}