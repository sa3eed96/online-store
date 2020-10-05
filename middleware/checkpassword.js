/**
 * @module middleware/checkpassword
 */

const User = require('../models/index').User;
const createError = require('http-errors');
const passwordCompare = require('../helper-modules/passwordcompare');


/**
 * checks user password
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.body.password - user password
 * @requires module:helper-modules/passwordcompare
 */
const checkPassword = async (req, res,next)=>{
    try{
        const {password} = req.body;
        const user = await User.findByPk(req.session.user.id);
        const passwordCheck = await passwordCompare(password, user.password);
        if(!passwordCheck){
            throw createError(400, 'invalid password');
        }
        next();
    }catch(err){
        next(err);
    }

};

module.exports = checkPassword;