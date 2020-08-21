const crypto = require("crypto");
const {addToQueue} = require('../email/addToQueue');
const EmailLink = require('../models/index').EmailLink;

module.exports = async (type, userId, userEmail)=>{
    const link = crypto.randomBytes(15).toString('hex');
    await EmailLink.create({link, UserId: userId, type});
    addToQueue('email', userEmail, link);
};