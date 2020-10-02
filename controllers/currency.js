/**
 * currency controller to handle requests for currency change for paypal.
 * @module controllers/currency
 */

const axios = require('axios');

/**
 * gets currency rate
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object containing egp:number representing euros -> egp
 */
module.exports.index = async(req, res, next)=> {
    try{
        const {data} = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&format=1&symbols=EGP`);
        return res.json({egp: data.rates['EGP']})
    }catch(err){
        next(err);
    }
};