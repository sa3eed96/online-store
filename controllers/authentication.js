const User = require('../models/index').User;
const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const {addToQueue} = require('../email/addToQueue');
const sequelize = require('../models/index').sequelize;


module.exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            throw createError(400, 'email or password is incorrect');
        if(user.isLocked)
            throw createError(400, 'Account is Locked for reaching maximum login attempts');
        const passwordCheck = await bcrypt.compare(password, user.password);
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

module.exports.register = async (req, res, next) => {
    try{
        const {firstName, lastName, email, password, phone } = req.body;
        const user = await User.create({firstName, lastName, email, password, phone, verified: false});
        req.user = user.toJSON();
        const link = crypto.randomBytes(15).toString('hex');
        await EmailLink.create({link, UserId: user.id, type: 'email'});
        addToQueue('email', email, link);
        next();
    }catch(err){
        if(err.name === 'SequelizeUniqueConstraintError'){
            return next(createError(400, 'email is already registered'));
        }
        next(err);
    }
};

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

module.exports.logout = async (req, res, next) => {
    req.session.destroy(async (err) => {
        if (err)
            next(createError(500, 'Error logging out', { expose: true }));
        return res.status(200).json();
    });
};

module.exports.checkAuthentication = (req, res, next)=>{
    if('user' in req.session)
        return next();
    return next(createError(401, 'You Are Not Logged In')); 
};

module.exports.returnLoggedInUser = (req, res, next)=> {
    return res.json({user: req.session.user});
};

module.exports.changePassword = async(req, res, next)=> {
    try{
        const {oldPassword, newPassword} = req.body;
        const user = await User.findByPk(req.session.user.id);
        const passwordCheck = await bcrypt.compare(oldPassword, user.password);
        if(!passwordCheck){
            throw createError(400, 'incorrect password');
        }
        user.password = newPassword;
        await user.save();
        return res.json({});
    }catch(err){
        next(err);
    }
};

module.exports.passwordReset = async(req, res, next)=> {
    try{
        const { password, id } = req.body;
        await sequelize.transaction(async(transaction)=>{
            const link = await EmailLink.findOne({where: {type: 'password', link: id}});
            if(!link){
                throw createError(404, 'invalid link, go to forget password form again to resend a new link');
            }
            const user = await User.findOne({where: {id: link.UserId}});
            if(!user){
                throw createError(404, 'invalid link, go to forget password form again to resend a new link');
            }
            user.password = password;
            await user.save();
            await link.destroy();
            return;
        });
        return res.json({});
    }catch(err){
        next(err);
    }
}