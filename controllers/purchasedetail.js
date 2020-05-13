const PurchaseDetail = require('../models/index').PurchaseDetail;
const User = require('../models/index').User;
const Purchase = require('../models/index').Purchase;
const createError = require('http-errors');

module.exports.index = async(req, res, next)=> {
    try{
        const { productId } = req.params;
        console.log('all',productId);
        const { page } = req.query;
        const limit = 10;
        const offset = (page - 1) * limit;
        const { count, rows: rates } = await PurchaseDetail.findAndCountAll({
            where:{
                ProductId: productId
            },
            limit,
            offset,
            include: {
                model: Purchase,
                include: [User],
            }
        });
        return res.json({ rates, count });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.getMyRate = async(req, res, next)=> {
    try{
        const { productId } = req.params;
        console.log('myrate',productId);
        const myRate = await PurchaseDetail.findOne({
            where:{
                ProductId: productId
            },
            include: {
                model: Purchase,
                include: {
                    model: User,
                    where:{
                        id: req.session.user.id,
                    },
                },
            }
        });
        return res.json({ myRate });
    }catch(err){
        next(createError(500, err));
    }
};