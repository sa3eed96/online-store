const EmailLinks = require('../models/index').EmailLinks;
const createError = require('http-errors');
const User = require('../models/index').User;
const { addToQueue } = require('../email/addToQueue');
const sequelize = require('../models/index').sequelize; 
const crypto = require("crypto");

module.exports.destroy = async(req, res, next)=> {
    try{
        const { id } = req.params;
        console.log('am heeeeeer', id);
        await sequelize.transaction(async(transaction)=>{
            const link = await EmailLinks.findOne({where: {link: id, type: 'email'}});
            if(!link)
                return next(createError(404));
            const user = await User.findOne({where: {id: link.UserId}});
            user.verified = 1;
            await user.save();
            await link.destroy();
            req.user = user.toJSON();
            return;
        });
        return res.json({});
    }catch(err){
        next(createError(500));
    }
};


module.exports.create = async(req, res, next)=> {
    try{
        if(req.session.user.verified === 1)
            return next(createError(400, 'email already confirmed'));
        await sequelize.transaction(async(transaction)=>{
            let link = await EmailLinks.findOne({where: {UserId: req.session.user.id, type: 'email'}});
            if(link){
                await link.destory();
            }
            link = crypto.randomBytes(15).toString('hex');
            await EmailLinks.create({where: {link, UserId: req.session.user.id, type: 'email'}});
            addToQueue('email', req.session.user.email, link);
            return;
        });
        return res.json({});
    }catch(err){
        next(createError(500));
    }
};