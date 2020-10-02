/**
 * @module helper-modules/passwordcompare
 */
const bcrypt = require('bcrypt');

/**
 * 
 * @param {string} password - plain text password
 * @param {string} passwordHash - hashed password stored in database
 * @returns {Promise} promise resolves to boolean indicates whether password matches
 */
module.exports = (password, passwordHash)=> {
    return bcrypt.compare(password, passwordHash);
};