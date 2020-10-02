/**
 * password EmailLink Model controller to handle requests.
 * @module controllers/emailcontroller
 */

const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const User = require('../models/index').User;
const createEmail = require('../helper-modules/createemail');

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
        const link = await EmailLink.findOne({where: {link: id, type: 'password'}});
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
 * @requires module:helper-modules/createemail
 * @returns {object} - empty json object
 */
module.exports.create = async(req, res, next)=> {
    try{
        const {email} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
           throw createError(400, 'email is not registered');
        }
        createEmail('password', user.id, email);
        return res.status(201).json({});
    }catch(err){
        next(err);
    }
};