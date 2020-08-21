const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const User = require('../models/index').User;
const createEmail = require('../helper-modules/createemail');

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