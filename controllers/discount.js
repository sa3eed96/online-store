const Discount = require('../models/index').Discount;

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
