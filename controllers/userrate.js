const UserRate = require('../models/index').UserRate;
const User = require('../models/index').User;
const Purchase = require('../models/index').Purchase;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const createError = require('http-errors');

module.exports.index = async(req, res, next)=> {
    try{
        const { productId } = req.params;
        const { page } = req.query;
        const limit = 10;
        const offset = (page - 1) * limit;
        const { count, rows: rates } = await UserRate.findAndCountAll({
            limit,
            offset,
            include: {
                model: PurchaseDetail,
                where:{
                    ProductId: productId
                },
                include:{
                    model: Purchase,
                    include: [User],
                }
            },
            distinct: true,
        });
        return res.json({ rates, count });
    }catch(err){
        next(err);
    }
};

module.exports.show = async(req, res, next)=> {
    try{
        const { productId } = req.params;
        const purchaseDetail = await PurchaseDetail.findOne({
            where:{
                ProductId: productId
            },
            include:[{
                model:Purchase,
                where:{
                    UserId: req.session.user.id
                }
            },{
                model: UserRate
            }],
        });
        myRate = purchaseDetail.UserRate;
        return res.json({ myRate });
    }catch(err){
        next(err);
    }
};