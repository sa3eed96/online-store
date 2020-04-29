const User = require('../models/index').User;
const createError = require('http-errors');
const bcrypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return next(createError(400, 'email or password is incorrect'));
        if(user.isLocked)
            return next(createError(400, 'Account is Locked for reaching maximum login attempts'));
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck){
            await user.incLoginCountAndLock();
            return next(createError(400, 'email or password is incorrect'));
        }
        await user.successfulLogin();
        req.user = user.toJSON();
        next();
    }catch(err){
        next(createError(500,err));
    }
};

module.exports.register = async (req, res, next) => {
    try{
        const {firstName, lastName, email, password, phone } = req.body;
        const user = await User.create({firstName, lastName, email, password, phone});
        req.user = user.toJSON();
        next();
    }catch(err){
        next(createError(400, err));
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
            return createError(400, 'invalid password');
        }
        user.password = newPassword;
        await user.save();
        return res.json({});
    }catch(err){
        createError(500);
    }
};