const Rate = require('../models/index').Rate;
const User = require('../models/index').User;
const Purchase = require('../models/index').Purchase;
const Shipment = require('../models/index').Shipment;
const PurchaseDetail = require('../models/index').PurchaseDetail;
const UserRate = require('../models/index').UserRate;
const sequelize = require('../models/index').sequelize;
const createError = require('http-errors');


module.exports.update = async (req, res, next) => {
    try {
        const { rateId, productId } = req.params;
        const { rate, rateArray, comment } = req.body;
        let details = await PurchaseDetail.findOne({
            where: {
                ProductId: productId
            },
            include: {
                model: Purchase,
                where: {
                    UserId: req.session.user.id
                },
                include: [User, Shipment],
            }
        });
        if (!details)
            throw createError(400, 'you need to purchase the product to be able to rate it');
        if (!details.Purchase.Shipment.delivered)
            throw createError(400, 'product not delivered yet');
        let result;
        [result, userRate] = await sequelize.transaction(async (transaction) => {
            rateArray[rate]++;
            let userRate = await UserRate.findOne({
                include:[{
                    model: PurchaseDetail,
                    where: {
                        ProductId: productId,
                    },
                    include: {
                        model: Purchase,
                        where: {
                            UserId: req.session.user.id,
                        },
                        duplicating: true
                    }
                }],
            });
            if (userRate) {
                rateArray[userRate.rate]--;
                userRate.setDataValue('rate', rate);
                userRate.comment = comment;
                await userRate.save({ transaction });
            }
            else {
                userRate = await UserRate.create({ rate, comment, PurchaseDetailsId: details.id });
                details.UserRateId = userRate.id;
                await details.save({ transaction });
            }
            const [count, updatedRate] = await Rate.update({ rate: rateArray }, { where: { id: rateId }, transaction, returning: true });
            return [updatedRate[0].toJSON(), userRate.toJSON()];
        });
        return res.json({ rate: result, userRate });
    } catch (err) {
        next(err);
    }
};