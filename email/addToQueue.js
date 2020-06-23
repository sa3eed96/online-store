const open = require('amqplib/callback_api');

let ch = null;
const getChannel = ()=>{
    console.log(process.env.RABBIT_URL);
    open.connect(process.env.RABBIT_URL,(err0,connection)=>{
        if (err0) {
            console.error(err0.stack);
            return process.exit(1);
        }
        connection.createChannel(function(err1, channel){
            if (err1) {
                console.error(err1.stack);
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
            html: `<p><b>Hello</b>please confirm your email!</p> <p><a href="localhost:3001/emailverify/${link}">click here</a></p>`,
        };
    }else{
        data = {
            subject: 'Reset Password',
            to,
            html: `<p><b>Hello</b>click to reset password!</p> <p><a href="localhost:3001/forgotpassword/${link}">click here</a></p>`,
        };
    }
    console.log('sending mail: ');
    console.log(data);
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