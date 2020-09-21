const Purchase = require('../models/index').Purchase;
const Product = require('../models/index').Product;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const Shipment = require('../models/index').Shipment;
const Address = require('../models/index').Address;
const Refund = require('../models/index').Refund;
const sequelize = require('../models/index').sequelize; 
const createError = require('http-errors');
const { hmGetAllAsync, delAsync } = require('../redis');

module.exports.index = async (req, res, next) => {
    try {
        const { page } = req.query;
        const limit = 15;
        const offset = (page - 1) * limit;
        const {count, rows: purchases} = await Purchase.findAndCountAll({ 
            where: { UserId: req.session.user.id }, limit, offset, include: [Shipment], order: [['createdAt', 'Desc']]
        });
        return res.json({ purchases, count });
    } catch (err) {
        next(err);
    }
};

module.exports.show = async (req, res, next) => {
    try {
        const { purchaseId } = req.params;
        const purchase = await Purchase.findByPk(purchaseId, {include: [{
                model: Shipment, include: [Address]
            }, {
                model: PurchaseDetail, include: [Product]
            }
        ]});
        return res.json({ purchase });
    } catch (err) {
        next(err);
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const {addressId, isPaid, paymentType} = req.body;
        const result = await sequelize.transaction(async(transaction)=>{
            const cart = await hmGetAllAsync(`cart-${req.session.user.id}`);
            const {purchaseDetails, total} = Purchase.parseCart(cart);
            const productUpdateQuery = Product.getUpdateQuery(purchaseDetails);
            await sequelize.query(productUpdateQuery, {transaction});
            const purchase = await Purchase.create({
                UserId: req.session.user.id,
                total,
                isPaid,
                paymentType,
                PurchaseDetails: purchaseDetails,
                Shipment: { AddressId: addressId },
            }, {include: [PurchaseDetail, Shipment], transaction});
            await delAsync(`cart-${req.session.user.id}`);
            return purchase;
        });
        return res.status(201).json({ purchase: result });
    } catch (err) {
        next(err);
    }
};

module.exports.destroy = async(req, res, next)=> {
    try{
        const { id } = req.params;
        await sequelize.transaction(async(transaction)=>{
            const purchase = await Purchase.findOne({where: {id, UserId: req.session.user.id},
                include: [PurchaseDetail, Shipment],
                transaction});
            if(!purchase)
                throw createError(404, 'purchase not found');
            if(purchase.Shipment.delivered)
                throw createError(400, 'order is already delivered');
            if(purchase.paymentType === 'paypal')
                await Refund.create({UserId: req.session.user.id, amount: purchase.total, paymentType: purchase.paymentType}, {transaction});
            const productDeleteQuery = Product.getDeleteQuery(purchase.PurchaseDetails);
            await sequelize.query(productDeleteQuery, {transaction});
            await purchase.Shipment.destroy({transaction});
            await purchase.destroy({transaction});
        });
        return res.json({});
    }catch(err){
        next(err);
    }
};
