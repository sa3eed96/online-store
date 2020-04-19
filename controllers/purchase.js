const Purchase = require('../models/index').Purchase;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const Shipment = require('../models/index').Shipment;
const createError = require('http-errors');
const { hmGetAllAsync, delAsync } = require('../redis');

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
        //parse cart and empty it
        const cart = await hmGetAllAsync(`cart-${req.session.user.id}`);
        const {purchaseDetails, total} = Purchase.parseCart(cart); 
        //get delivery date and createshipment
        const shipment = { AddressId:req.body.AddressId };
        //create purchase with its purchase details and shipment
        const Purchase = await Purchase.create({total, purchasedetails: purchaseDetails, shipment},{include: [PurchaseDetail, Shipment]}); 
        //empty cart and return purchase with shipment
        await delAsync(`cart-${req.session.user.id}`);
        return res.json({ Purchase });
    } catch (err) {
        next(createError(500, err));
    }
};