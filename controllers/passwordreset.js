const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const User = require('../models/index').User;
const { addToQueue } = require('../email/addToQueue');
const crypto = require("crypto");

module.exports.show = async(req, res, next)=> {
    const {id} = req.params;
    try{
        const link = await EmailLink.findOne({where: {link: id, type: 'password'}});
        if(!link){
            throw createError(404, 'not found, please get a new link');
        }
        return res.json({});
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
        const link = crypto.randomBytes(15).toString('hex');
        await EmailLink.create({link, UserId: user.id, type: 'password'});
        addToQueue('password', email, link);
        return res.status(201).json({});
    }catch(err){
        next(err);
    }
};