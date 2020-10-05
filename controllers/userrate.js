/**
 * UserRate Model controller to handle requests.
 * @module controllers/userrate
 */

const Product = require('../models/index').Product;
const Shipment = require('../models/index').Shipment;
const UserRate = require('../models/index').UserRate;
const User = require('../models/index').User;
const Purchase = require('../models/index').Purchase;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const createError = require('http-errors');
const sequelize = require('../models/index').sequelize;


/**
 * get a list of product rates.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.query.page - current pagination page
 * @param {number} req.params.productId - product id
 * @returns {object} -json object containing count:integer and rates:UserRate[]
 */
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

/**
 * get the product rating by the current authenticated user.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.params.productId - product id
 * @returns {object} -json object containing myRate:UserRate
 */
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
        return res.json({ myRate: purchaseDetail.UserRate });
    }catch(err){
        next(err);
    }
};

/**
 * update the product rating of the current authenticated user.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.params.rateId - the rate id
 * @param {number} req.params.productId - product id
 * @param {number} req.body.rate - user rating
 * @param {Array} req.body.rateArray - array representig the current rate of the product
 * @param {string} req.body.comment - the text review
 * @returns {object} -json object containing rate:integer[] representing the updated product rate and userRate:UserRate
 */
module.exports.update = async (req, res, next) => {
    try {
        const { rateId, productId } = req.params;
        const { rate, rateArray, comment } = req.body;
        let userRate = await UserRate.findOne({
            where:{id: rateId},
            include:{
                model: PurchaseDetail,
                where:{
                    ProductId: productId,
                },
                include:{
                    model: Purchase,
                    where: {
                        UserId: req.session.user.id
                    },
                },
            },
        });
        if (!userRate)
            throw createError(404, 'not found');
        let result;
        [result, userRate] = await sequelize.transaction(async (transaction) => {
            rateArray[rate]++;
            rateArray[userRate.rate]--;
            userRate.rate= rate;
            userRate.comment = comment;
            await userRate.save({ transaction });
            const [count, updatedRate] = await Product.update({ rate: rateArray }, { where: { id: productId }, transaction, returning: true });
            return [updatedRate[0].toJSON(), userRate.toJSON()];
        });
        return res.json({ rate: result.rate, userRate });
    } catch (err) {
        next(err);
    }
};


/**
 * add rating of the product for the current authenticated user.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.params.productId - product id
 * @param {number} req.body.rate - user rating
 * @param {Array} req.body.rateArray - array representig the current rate of the product
 * @param {string} req.body.comment - the text review
 * @returns {object} -json object containing rate:integer[] representing the updated product rate and userRate:UserRate
 */
module.exports.create = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { rate, rateArray, comment } = req.body;
        let details = await PurchaseDetail.findOne({
            where: {
                ProductId: productId
            },
            include: [{
                model: Purchase,
                where: {
                    UserId: req.session.user.id
                },
                include: [Shipment],
            },UserRate],
        });
        if (!details)
            throw createError(400, 'you need to purchase the product to be able to rate it');
        if (!details.Purchase.Shipment.delivered)
            throw createError(400, 'product not delivered yet');
        if (details.UserRate)
            throw createError(400, 'product rated');
        let result;
        [result, userRate] = await sequelize.transaction(async (transaction) => {
            rateArray[rate]++;
            userRate = await UserRate.create({ rate, comment, PurchaseDetailsId: details.id },{transaction});
            details.UserRateId = userRate.id;
            await details.save({ transaction });
            const [count, updatedRate] = await Product.update({ rate: rateArray }, { where: { id:  productId}, transaction, returning: true });
            return [updatedRate[0].toJSON(), userRate.toJSON()];
        });
        return res.json({ rate: result.rate, userRate });
    } catch (err) {
        next(err);
    }
};