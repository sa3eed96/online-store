const { mailQueue } = require('../jobs/index');

const addToQueue = (type, to, link) => {
    let data;
    if(type === "email"){
        data = {
            subject: 'Email Confirmation',
            to,
            html: `<p><b>Hello</b>please confirm your email!</p> <p><a href="${process.env.HOST}/emailverify/${link}">click here</a></p>`,
        };
    }else{
        data = {
            subject: 'Reset Password',
            to,
            html: `<p><b>Hello</b>click here to reset password!</p> <p><a href="${process.env.HOST}/forgotpassword/${link}">click here</a></p>`,
        };
    }
    const options = {
        attempts: 2,
    }

    mailQueue.add(data, options);
};

module.exports = {
    addToQueue,
};