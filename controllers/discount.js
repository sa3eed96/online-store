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
 * @returns {object} - json object containing discount: Discount[]
 */
module.exports.index = async (req, res, next) => {
    try{
        const discounts = await Discount.findAll({
            limit: 3,
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        return res.json({ discounts });
    }catch(err){
        next(err);
    }
};
