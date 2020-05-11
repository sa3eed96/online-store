const Category = require('../models/index').Category;
const createError = require('http-errors');

module.exports.index = async(req, res, next)=> {
    try{
        const categories = await Category.findAll({include: {all: true}});
        return res.json({categories});
    }catch(err){
        next(createError(500, err));
    }
};