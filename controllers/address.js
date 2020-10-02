/**
 * EmailLink Model controller to handle requests.
 * @module controllers/address
 */

const Address = require('../models/index').Address;
const fieldsToUpdate = require('../helper-modules/fieldstoupdate');

const updateFieldsRegex = /(country|city|address|zipCode)/;


/**
 * list all user addresses
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object containing addresses: Address[]
 */
module.exports.index = async (req, res, next) => {
    try{
        const addresses = await Address.findAll({
            where: {UserId: req.session.user.id},
            attributes:{exclude: ['createdAt', 'updatedAt']},
        });
        return res.json({ addresses });
    }catch(err){
        next(err);
    }
};

/**
 * create address for user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.body.country - country name
 * @param {string} req.body.city - city name
 * @param {string} req.body.address - user address
 * @param {string} req.body.zipCode - zip code
 * @returns {object} - json object containing address: Address representing the newly created address
 */
module.exports.create = async (req, res, next) => {
    try{
        const { country, city, address, zipCode } = req.body;
        const userAddress = await Address.create({ country, city, address, zipCode, UserId: req.session.user.id });
        return res.status(201).json({ address: userAddress });
    }catch(err){
        next(err);
    }
};


/**
 * update address for user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.param.id - address id
 * @param {string} [req.body.country] - country name
 * @param {string} [req.body.city] - city name
 * @param {string} [req.body.address] - user address
 * @param {string} [req.body.zipCode] - zip code
 * @returns {object} - json object containing address:Address representing the updated address
 */
module.exports.update = async (req, res, next) => {
    try{
        const newFields = fieldsToUpdate(req.body, updateFieldsRegex);
        const [count, address] = await Address.update(newFields, {where: {id: req.params.id }, returning: true});
        return res.json({ address: address[0].toJSON() });
    }catch(err){
        next(err);
    }
};

/**
 * delete address for user
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {number} req.param.id - address id
 * @returns {object} - empty json object
 */
module.exports.destroy = async(req, res, next) => {
    try{
        await Address.destroy({where: {id: req.params.id}});
        return res.json();
    }catch(err){
        next(err);
    }
}