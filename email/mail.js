/**
 * email service
 * @module email/mail
 */

const nodemailer = require('nodemailer');

/**
 * email service configuration
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
  }
},{
  from: 'donotreply@onlinestore.com',
});

/**
 * send the email through configured transported service
 * @param {object} job - email to be sent 
 */
const sendMail = async(job)=>{
    await transporter.sendMail(job.data);
};

module.exports = {
    sendMail
};