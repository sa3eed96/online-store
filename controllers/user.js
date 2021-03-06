/**
 * User Model controller to handle requests.
 * @module controllers/address
 */

const User = require('../models/index').User;
const fieldsToUpdate = require('../helper-modules/fieldstoupdate');

const updateFieldsRegex = /(firstName|lastName|email|phone|newPassword)/;

/**
 * update user information
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} [req.body.firstname] - user fristname
 * @param {string} [req.body.lastname] - user lastname
 * @param {string} [req.body.email] - user email
 * @param {string} [req.body.phone] - user phone
 * @returns {object} - json object containing user:User representing the updated user
 */
module.exports.update = async (req, res, next) => {
    try{
        let newFields = fieldsToUpdate(req.body, updateFieldsRegex);
        if(newFields.hasOwnProperty('newPassword')){
            newFields = {
                password: newFields.newPassword,
            };
        }
        const [count, user] = await User.update(newFields, {where: {id: req.session.user.id }, returning: true, individualHooks: true});
        req.session.user = user[0].toJSON();
        return res.json({ user: user[0].toJSON() });
    }catch(err){
        next(err);
    }
};

/**
 * delete user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @requires module:helper-modules/passwordcompare
 */
module.exports.destroy = async(req, res, next)=> {
    try{
        // const {password} = req.body;
        // const user = await User.findByPk(req.session.user.id);
        // const passwordCheck = await passwordCompare(password, user.password);
        // if(!passwordCheck){
        //     throw createError(400, 'invalid password');
        // }
        await User.destroy({where: {id: req.session.user.id}});
        next();
    }catch(err){
        next(err);
    }
};
