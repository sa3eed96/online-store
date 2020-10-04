/**
 * PasswordReset Model controller to handle requests.
 * @module controllers/emailcontroller
 */

const PasswordReset = require('../models/index').PasswordReset;
const createError = require('http-errors');
const User = require('../models/index').User;
const { createPasswordResetEmail } = require('../helper-modules/email');
const sequelize = require('../models/index').sequelize;

/**
 * finds a password reset link and returns it
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.params.id - email link
 * @returns {object} - json object containing link:string
 */
module.exports.show = async(req, res, next)=> {
    const {id} = req.params;
    try{
        const link = await PasswordReset.findOne({where: {link: id}});
        if(!link){
            throw createError(404, 'not found, please get a new link');
        }
        return res.json({ link });
    }catch(err){
        next(err);
    }
};


/**
 * creates an password reset email link for the user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.body.email - user email
 * @requires module:helper-modules/email
 * @returns {object} - empty json object
 */
module.exports.create = async(req, res, next)=> {
    try{
        const {email} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
           throw createError(400, 'email is not registered');
        }
        await createPasswordResetEmail(user.id, email);
        return res.status(201).json({});
    }catch(err){
        next(err);
    }
};

/**
 * reset user password by checking the validity of the link and then saving the new password hashed in db
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.body.password - user new password
 * @param {string} req.body.id - password reset link
 * @returns {object} -empty json object
 */
module.exports.destroy = async(req, res, next)=> {
    try{
        const { id } = req.params;
        const { password } = req.body;
        await sequelize.transaction(async(transaction)=>{
            const link = await PasswordReset.findOne({where: { link: id}, transaction});
            if(!link){
                throw createError(404, 'invalid link, go to forget password form again to resend a new link');
            }
            const user = await User.findByPk(link.UserId, {transaction});
            if(!user){
                throw createError(404, 'invalid link, go to forget password form again to resend a new link');
            }
            user.password = password;
            await user.save({transaction});
            await link.destroy({transaction});
            return;
        });
        return res.json({});
    }catch(err){
        next(err);
    }
}