/**
 * EmailLink Model controller to handle requests.
 * @module helper-modules/createemail
 */

const crypto = require("crypto");
const {addToQueue} = require('../email/addToQueue');
const EmailLink = require('../models/index').EmailLink;

/**
 * creates a random hexadecimal link and add to to database and inserts it to jobs queue
 * @param {string} type - the type of created email whether reset password we email confirm
 * @param {number} userId - the id of the user whose the link is created for
 * @param {string} userEmail - the user email
 * @requires module:email/addToQueue
 */
module.exports = async (type, userId, userEmail)=>{
    const link = crypto.randomBytes(15).toString('hex');
    await EmailLink.destroy({where:{UserId: userId, type}});
    await EmailLink.create({link, UserId: userId, type});
    addToQueue(type, userEmail, link);
};