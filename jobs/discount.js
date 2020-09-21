const Discount = require('../models/index').Discount;
const sequelize = require('../models/index').sequelize;


module.exports = async(job)=>{
    await Discount.destroy({where: {
        until: {
            [sequelize.gt]: Date(),
        },
    }});
    return Promise.resolve();
};