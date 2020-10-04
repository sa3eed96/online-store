/**
 * @module helper-modules/email
 */

const crypto = require("crypto");
const { mailQueue } = require('../jobs/index');
const EmailVerify = require('../models/index').EmailVerify;
const PasswordReset = require('../models/index').PasswordReset;

/**
 * create a random link
 */
const getLink = () => {
    return crypto.randomBytes(15).toString('hex');
}

/**
 * add email to be sent to jobs queue with template based on the type of email
 * @param {string} type - the type of created email whether reset-password we email-confirm
 * @param {number} to - the user email
 * @param {string} link - the link for verification or password reset 
 * @requires module:jobs/index
 */
const send = (type, to, link)=>{
    let data;
    if(type === "email"){
        data = {
            subject: 'online-store Email Confirmation',
            to,
            html: `<p><b>Hello, </b>please confirm your email!</p> <p><a href="${process.env.HOST}/emailverify/${link}">click here</a></p>
                    <p>if link cant be clicked copy and paste the following into your browser.<p>${process.env.HOST}/emailverify/${link}</p>`,
        };
    }else{
        data = {
            subject: 'online-store Reset Password',
            to,
            html: `<p><b>Hello, </b>you requested to reset your password!</p> <p><a href="${process.env.HOST}/forgotpassword/${link}">click here</a></p>
            <p>if link cant be clicked copy and paste the following into your browser.<p>${process.env.HOST}/forgotpassword/${link}</p>`,
        };
    }
    const options = {
        attempts: 2,
    }
    mailQueue.add(data, options);
}

/**
 * create a link for email verification and stores it in database after deleting any previuos created links.
 * @param {Number} userId - the user id
 * @param {String} userEmail - the user email
 */
const createVerifyEmail = async(userId, userEmail)=>{
    const link = getLink();
    await EmailVerify.destroy({where:{UserId: userId}});
    await EmailVerify.create({link, UserId: userId});
    send('email', userEmail, link);
}

/**
 * create a link for password reset and stores it in database after deleting any previuos created links.
 * @param {Number} userId - the user id
 * @param {String} userEmail - the user email
 */
const createPasswordResetEmail = async(userId, userEmail)=>{
    const link = getLink();
    await PasswordReset.destroy({where:{UserId: userId}});
    await PasswordReset.create({link, UserId: userId});
    send('password', userEmail, link);
}

module.exports = {
    createVerifyEmail,
    createPasswordResetEmail
};