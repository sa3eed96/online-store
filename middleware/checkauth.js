const createError = require('http-errors');

module.exports = (req, res, next)=>{
    if('user' in req.session)
        return next();
    return next(createError(401, 'You Are Not Logged In')); 
};