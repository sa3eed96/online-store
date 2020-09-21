const {sendMail} = require('../email/mail');

module.exports = (job)=>{
    sendMail(job);
    return Promise.resolve();
};