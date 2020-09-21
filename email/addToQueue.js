const { mailQueue } = require('../jobs/index');

const addToQueue = (type, to, link) => {
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
};

module.exports = {
    addToQueue,
};