/**
 * Category Model controller to handle requests.
 * @module controllers/category
 */

const Category = require('../models/index').Category;

/**
 * gets all categories
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object containing categpries:Category[]
 */
module.exports.index = async(req, res, next)=> {
    try{
        const categories = await Category.findAll({include: {all: true}});
        return res.json({categories});
    }catch(err){
        next(err);
    }
};