const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const User = require('../models/index').User;
const sequelize = require('../models/index').sequelize; 
const createEmail = require('../helper-modules/createemail');

module.exports.destroy = async(req, res, next)=> {
    try{
        const { id } = req.params;
        await sequelize.transaction(async(transaction)=>{
            const link = await EmailLink.findOne({where: {link: id, type: 'email'}});
            if(!link)
                throw createError(404, 'not found');
            const user = await User.findOne({where: {id: link.UserId}});
            user.verified = 1;
            await user.save();
            await link.destroy();
            req.user = user.toJSON();
            return;
        });
        return res.json({});
    }catch(err){
        next(err);
    }
};


module.exports.create = async(req, res, next)=> {
    try{
        if(req.session.user.verified === 1)
            throw createError(400, 'email already confirmed');
        await sequelize.transaction(async(transaction)=>{
            let link = await EmailLink.findOne({where: {UserId: req.session.user.id, type: 'email'}});
            if(link){
                await link.destory();
            }
            createEmail(req.session.user.id, req.session.user.email);
            return;
        });
        return res.json({});
    }catch(err){
        next(err);
    }
};