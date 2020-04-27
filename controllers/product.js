const Product = require('../models/index').Product;
const Rate = require('../models/index').Rate;
const Comment = require('../models/index').Comment;
const Image = require('../models/index').Image;
const createError = require('http-errors');
const sequelize = require('sequelize');
const {hmGetAsync} = require('../redis');

module.exports.index = async (req, res, next) => {
    try {
        const { page } = req.params;
        const limit = 15;
        const offset = (page - 1) * limit;
        const { count, rows: products } = await Product.findAndCountAll({
            where: {
                stockCount: { [sequelize.Op.gt]: 0 }
            },
            limit,
            offset
        });
        return res.json({ products, count });
    } catch (err) {
        next(createError(500, err));
    }
};

module.exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, { include: [Rate, Comment, Image] });
        let cart = null;
        if(req.session.user)
            cart = await hmGetAsync(`cart-${req.session.user.id}`,`${product.id}-${product.name}`);
        return res.json({product, cart});
    } catch (err) {
        next(createError(500, err));
    }
}