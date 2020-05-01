const Purchase = require('../models/index').Purchase;
const Product = require('../models/index').Product;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const Shipment = require('../models/index').Shipment;
const createError = require('http-errors');
const { hmGetAllAsync, delAsync } = require('../redis');
const sequelize = require('sequelize');

module.exports.index = async (req, res, next) => {
    try {
        const purchases = await Purchase.findAll({ where: { UserId: req.session.user.id } });
        return res.json({ purchases });
    } catch (err) {
        next(createError(500, err));
    }
};

module.exports.show = async (req, res, next) => {
    try {
        const { purchaseId } = req.params;
        const purchase = await Purchase.findByPK(purchaseId, {include: {all: true}});
        return res.json({ purchase });
    } catch (err) {
        next(createError(500, err));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const result = await sequelize.transaction(async(transaction)=>{
            const cart = await hmGetAllAsync(`cart-${req.session.user.id}`);
            const {purchaseDetails, total} = Purchase.parseCart(cart);
            const productUpdateQuery = Product.getUpdateQuery(purchaseDetails);
            await sequelize.query(productUpdateQuery, {transaction});
            let time = new Date();
            time = time.setDate(time.getDate()+3);
            const shipment = { AddressId: req.body.AddressId, delivery: new Date(time) };
            const purchase = await Purchase.create({
                UserId: req.session.user.id,
                total,
                PurchaseDetails: purchaseDetails,
                Shipment: shipment
            }, {include: [PurchaseDetail, Shipment], transaction}); 
            await delAsync(`cart-${req.session.user.id}`);
            return purchase;
        });
        return res.json({ purchase: result });
    } catch (err) {
        next(createError(500, err));
    }
};