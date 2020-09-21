const EmailLink = require('../models/index').EmailLink;
const createError = require('http-errors');
const User = require('../models/index').User;
const sequelize = require('../models/index').sequelize; 
const createEmail = require('../helper-modules/createemail');

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