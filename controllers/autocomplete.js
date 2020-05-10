const createError = require('http-errors');
const Product = require('../models/index').Product;
const sequelize = require('sequelize');

module.exports.index = async(req, res, next)=> {
    try{
        const {q} = req.query;
        const results = await Product.findAll({
            where:{
                name:{
                    [sequelize.Op.like]: `${q}%`,
                }
            },
            limit: 5
        },{
            attributes: ['name', 'SubcategoryName']
        });
        res.json({results: results.toJSON()});
    }catch(err){
        next(createError(500, err));
    }
};