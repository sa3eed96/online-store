/**
 * News Model controller to handle requests.
 * @module controllers/news
 */

const News = require('../models/index').News;

/**
 * gets all categories
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object containing news:News[]
 */
module.exports.index = async(req, res, next)=> {
    try{
        const news = await News.findAll({
            limit: 3,
        });
        return res.json({news});
    }catch(err){
        next(err);
    }
};