const open = require('amqplib/callback_api');

let ch = null;
const getChannel = ()=>{
    open.connect(process.env.RABBIT_URL,(err0,connection)=>{
        if (err0) {
            return process.exit(1);
        }
        connection.createChannel(function(err1, channel){
            if (err1) {
                return process.exit(1);
            }
            ch = channel;
        });
    });
};

const addToQueue = (type, to, link) => {
    if(!ch){
        return;
    }
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
    ch.assertQueue('email', {
        durable: true
    });
    ch.sendToQueue('email', Buffer.from(JSON.stringify(data)), {
        persistent: true
    });

};

module.exports = {
    addToQueue,
    getChannel,
};