const Purchase = require('../models/index').Purchase;
const Product = require('../models/index').Product;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const Shipment = require('../models/index').Shipment;
const Address = require('../models/index').Address;
const UserRate = require('../models/index').UserRate;
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
        next(createError(500, err));
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
        next(createError(500, err));
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const result = await sequelize.transaction(async(transaction)=>{
            const {addressId, isPaid, paymentType} = req.body;
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
            }, {include: [PurchaseDetail], transaction});
            const shipment = await Shipment.create({AddressId: addressId},{transaction});
            purchase.ShipmentId = shipment.id;
            await purchase.save({transaction});
            purchase.Shipment = shipment.toJSON();
            await delAsync(`cart-${req.session.user.id}`);
            return purchase;
        });
        return res.status(201).json({ purchase: result });
    } catch (err) {
        console.log(err.stack);
        next(createError(500, err));
    }
};