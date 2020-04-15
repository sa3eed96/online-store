const Product = require('../models/index').Product;
const createError = require('http-errors');

module.exports.index = async (req, res, next) => {
    try{
        const products = await Product.findAll({include: {all: true}});
        return res.json({ products });
    }catch(err){
        next(createError(500, err));
    }
};