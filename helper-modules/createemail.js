const crypto = require("crypto");
const {addToQueue} = require('../email/addToQueue');
const EmailLink = require('../models/index').EmailLink;

module.exports = async (userId, userEmail)=>{
    const link = crypto.randomBytes(15).toString('hex');
    await EmailLink.create({link, UserId: userId, type: 'email'});
    addToQueue('email', userEmail, link);
};