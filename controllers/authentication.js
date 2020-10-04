/**
 * Authentication controller
 * @module controllers/authentication
 */

const User = require('../models/index').User;
const createError = require('http-errors');
const { createVerifyEmail } = require('../helper-modules/email');
const passwordCompare = require('../helper-modules/passwordcompare');

/**
 * first it checks if user is registered, then check credentials then checks if account is not locked then mark successful login 
 * and attach user:User object to Express req object and pass control using next function.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} [req.body.email] - user email
 * @param {string} [req.body.password] - user password
 * @requires module:helper-modules/passwordcompare
 */
module.exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            throw createError(400, 'email or password is incorrect');
        if(user.isLocked)
            throw createError(400, 'Account is Locked for reaching maximum login attempts');
        const passwordCheck = await passwordCompare(password, user.password);
        if (!passwordCheck){
            await user.incLoginCountAndLock();
            throw createError(400, 'email or password is incorrect');
        }
        await user.successfulLogin();
        req.user = user.toJSON();
        next();
    }catch(err){
        next(err);
    }
};

/**
 * create user record then create email to be sent and attach user to express req object and pass control using next function.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.body.firstname - user first name
 * @param {string} req.body.lastname - user last name
 * @param {string} req.body.email - user email
 * @param {string} req.body.password - user password
 * @param {string} req.body.phone - user phone
 * @requires module:helper-modules/createemail
 */
module.exports.register = async (req, res, next) => {
    try{
        const {firstName, lastName, email, password, phone } = req.body;
        const user = await User.create({firstName, lastName, email, password, phone, verified: false});
        await createVerifyEmail(user.id, email);
        req.user = user.toJSON();
        next();
    }catch(err){
        if(err.name === 'SequelizeUniqueConstraintError'){
            return next(createError(400, 'email is already registered'));
        }
        next(err);
    }
};

/**
 * create a session for a user atatched to the express req object
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object with user:User representing the newly registered user
 */
module.exports.createSession = (req, res, next) => {
    req.session.regenerate(async (err) => {
        if (err)
            next(createError(500, 'could not login', { expose: true }));
        if (req.body.rememberMe)
            req.session.cookie.maxAge = 3600000 * 24 * 7;
        req.session.user = req.user;
        return res.json({ user: req.user });
    });
};

/**
 * destroys user session
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} empty json object
 */
module.exports.logout = async (req, res, next) => {
    req.session.destroy(async (err) => {
        if (err)
            next(createError(500, 'Error logging out', { expose: true }));
        return res.status(200).json();
    });
};

/**
 * retrieve the currently authenticated user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object with user:User representing the currently authenticated user
 */
module.exports.returnLoggedInUser = (req, res, next)=> {
    return res.json({user: req.session.user});
};