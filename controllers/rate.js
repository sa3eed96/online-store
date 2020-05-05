const Rate = require('../models/index').Rate;
const Purchase = require('../models/index').Purchase;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const sequelize = require('../models/index').sequelize;
const createError = require('http-errors');

module.exports.update = async (req, res, next) => {
    try {
        const { rateId, productId } = req.params;
        const { rate, rateArray } = req.body;
        const details = await PurchaseDetail.findOne({
            where: {
                ProductId: productId
            }, 
            include: {
                model: Purchase, where: {
                    UserId: req.session.user.id
                }
            }
        });
        if (!details)
            return next(createError(400, 'you need to purchase the product to be able to rate it'));
        const result = await sequelize.transaction(async (transaction) => {
            rateArray[rate]++;
            if (details.toJSON().hasOwnProperty('rate')){
                rateArray[details.rate]--;
                console.log(rateArray);
            }
            details.setDataValue('rate', rate);
            await details.save({ transaction });
            const [count, updatedRate] = await Rate.update({ rate: rateArray }, { where: { id: rateId }, transaction, returning: true });
            return updatedRate[0].toJSON();
        });
        return res.json({ rate: result });
    } catch (err) {
        next(createError(500, err));
    }
};