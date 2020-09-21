const crypto = require("crypto");
const {addToQueue} = require('../email/addToQueue');
const EmailLink = require('../models/index').EmailLink;

module.exports = async (type, userId, userEmail)=>{
    const link = crypto.randomBytes(15).toString('hex');
    await EmailLink.destroy({where:{UserId: userId, type}});
    await EmailLink.create({link, UserId: userId, type});
    addToQueue(type, userEmail, link);
};