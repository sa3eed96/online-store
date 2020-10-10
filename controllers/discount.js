/**
 * Discount Model controller to handle requests.
 * @module controllers/discount
 */

const Discount = require('../models/index').Discount;

/**
 * return all discounts
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {String} req.query.count - how many discounts to get
 * @returns {object} - json object containing discount: Discount[]
 */
module.exports.index = async (req, res, next) => {
    try{
        const {count} = req.query;
        const discounts = await Discount.findAll({
            limit: 3,
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: count,
        });
        return res.json({ discounts });
    }catch(err){
        next(err);
    }
};
