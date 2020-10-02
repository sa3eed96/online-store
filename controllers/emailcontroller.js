/**
 * EmailLink Model controller to handle requests.
 * @module controllers/emailcontroller
 */

const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const User = require('../models/index').User;
const sequelize = require('../models/index').sequelize; 
const createEmail = require('../helper-modules/createemail');


/**
 * deletes an email link from db and set verefied state of the user to true
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.params.id - email link
 * @returns {object} - empty json object
 */
module.exports.destroy = async(req, res, next)=> {
    try{
        const { id } = req.params;
        await sequelize.transaction(async(transaction)=>{
            const link = await EmailLink.findOne({where: {link: id, type: 'email'}, transaction});
            if(!link)
                throw createError(404, 'not found');
            const user = await User.findByPk(link.UserId, { transaction });
            user.verified = 1;
            await user.save({ transaction });
            await link.destroy({ transaction });
            req.session.user = user.toJSON();
            return;
        });
        return res.json({});
    }catch(err){
        next(err);
    }
};

/**
 * creates an email link for the user and deletes any previous created links for the same user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.params.id - email link
 * @requires module:helper-modules/createemail
 * @returns {object} - empty json object
 */
module.exports.create = async(req, res, next)=> {
    try{
        if(req.session.user.verified === 1)
            throw createError(400, 'email already confirmed');
        await sequelize.transaction(async(transaction)=>{
            let link = await EmailLink.findOne({where: {UserId: req.session.user.id, type: 'email'}, transaction});
            if(link){
                await link.destory({ transaction });
            }
            createEmail('email', req.session.user.id, req.session.user.email);
            return;
        });
        return res.json({});
    }catch(err){
        next(err);
    }
};