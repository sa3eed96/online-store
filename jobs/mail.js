/**
 * email jobs processor
 * @module jobs/mail
 */

const {sendMail} = require('../email/mail');

/**
 * send the email through givin email service
 * @param {object} job - email to be sent
 * @requires module:email/mail
 * @return {Promise} resolved promise
 */
module.exports = (job)=>{
    sendMail(job);
    return Promise.resolve();
};