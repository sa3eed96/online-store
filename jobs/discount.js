/**
 * discount jobs processor
 * @module jobs/discount
 */

const Discount = require('../models/index').Discount;
const sequelize = require('../models/index').sequelize;

/**
 * destroys discount which have expired dates
 * @param {object} job - parameter not used
 * @returns {Promise} resolved promise
 */
module.exports = async(job)=>{
    await Discount.destroy({where: {
        until: {
            [sequelize.gt]: Date(),
        },
    }});
    return Promise.resolve();
};