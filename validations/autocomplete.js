const { query } = require('express-validator');

module.exports = (method) => {
    switch(method){
        case 'index':{
            return[
                query('q').exists(),
            ];
        }
    }
}