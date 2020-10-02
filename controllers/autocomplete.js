/**
 * auto complete controller to handle requests.
 * @module controllers/autocomplete
 */

const sequelize = require('../models/index').sequelize;
const Sequelize = require('sequelize');


/**
 * get autocomplete items by constructing a raw query using search text supplied
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} [req.query.q] - search text
 * @returns {object} - json object containing result:Product[] representing the product search items
 */
module.exports.index = async (req, res, next) => {
    try {
        const { q } = req.query;
        const keywords = q.split(' ');
        let query = 'select "name", "SubcategoryName" from "Products" where ';
        for (let index = 0; index < keywords.length; index++) {
            query += 'lower("name") like ? and ';
            keywords[index] = `%${keywords[index]}%`;
        }
        query = query.substring(0, query.length - 4);
        const results = await sequelize.query(query, { replacements: keywords, type: Sequelize.QueryTypes.SELECT });
        return res.json({ results });
    } catch (err) {
        next(err);
    }
};