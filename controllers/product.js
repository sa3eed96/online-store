const Product = require('../models/index').Product;
const Color = require('../models/index').Color;
const Discount = require('../models/index').Discount;
const sequelize = require('sequelize');
const { hmGetAsync } = require('../redis');

module.exports.index = async (req, res, next) => {
    try {
        const { page, q, c, sort, by } = req.query;
        const limit = 12;
        const offset = (page - 1) * limit;
        const where = {};
        q ? where['name'] = {
            [sequelize.Op.iLike]: `%${q}%`
        }: null;
        c ? where['SubcategoryName'] = c: null;
        let order = [];
        if(sort){
            order.push([sort, by]);
        }else{
            order = null;
        }
        const { count, rows } = await Product.findAndCountAll({
            where,
            limit,
            offset,
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            },
            include: [Color, Discount],
            order,
            distinct: true,
        });
        const products = rows.map(row => row.toJSON());
        return res.json({ products, count });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { color } = req.query;
        const where = {};
        if(color)
            where['Color'] = color;
        const product = await Product.findByPk(id, { include: [{
            model: Color,
            where,
            attributes:{exclude: ['createdAt', 'updatedAt', 'ProductId']},
        }, Discount] 
        });
        let cart = null;
        if (req.session.user && color){
            cart = await hmGetAsync(`cart-${req.session.user.id}`, `${product.id}-${product.name}-${color}`);
        }
        return res.json({ product, cart });
    } catch (err) {
        next(err);
    }
}