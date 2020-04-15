const Rate = require('../models/index').Rate;
const PurchasedDetails = require('../models/index').PurchasedDetails;
const createError = require('http-errors');
const sequelize = require('sequelize');

module.exports.update = async (req, res, next) => {
    try{
        const details = await PurchasedDetails.findOne({ProductId: req.params.productId, UserId: req.session.user.id});
        if(!details)
            return next(createError(400, 'you need to purchase the product to be able to rate it'));
        
        await sequelize.transaction(async (transaction)=>{
            details.rate = req.body.rate;
            await details.save({transaction});
            await Rate.update({rate: req.body.rateArray}, {where: {id: req.params.rateId }, transaction});
        });
        return res.JSON();
    }catch(err){
        next(createError(500, err));
    }
};