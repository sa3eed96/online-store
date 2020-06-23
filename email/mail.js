const nodemailer = require('nodemailer');
const open = require('amqplib/callback_api');

console.log('mail worker running');
//STARTTLS
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: "jordy31@ethereal.email",
      pass: "MZxBBp3KWP1nx1tKGx",
  }
},{
  from: 'donotreply@onlinestore.com',
});

open.connect('amqp://hctwrgwm:PxHJ94zvWG8QcViltO2mvF0GuwWqA4oU@barnacle.rmq.cloudamqp.com/hctwrgwm',(err0,connection)=>{
  connection.createChannel((err, channel) => {
    if (err) {
        console.error(err.stack);
        console.log('sending failed');
        return;
    }

    // Ensure queue for messages
    channel.assertQueue('email', {
        // Ensure that the queue is not deleted when server restarts
        durable: true
    }, err => {
        if (err) {
            console.error(err.stack);
            console.log('sending failed');
            return;
        }
        // Only request 1 unacked message from queue
        // This value indicates how many messages we want to process in parallel
        channel.prefetch(1);

        // Set up callback to handle messages received from the queue
        channel.consume('email', data => {
            if (data === null) {
                return;
            }

            // Decode message contents
            let message = JSON.parse(data.content.toString());

            // attach message specific authentication options
            // this is needed if you want to send different messages from
            // different user accounts
            // message.auth = {
            //     user: 'testuser',
            //     pass: 'testpass'
            // };

            // Send the message using the previously set up Nodemailer transport
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.error(err.stack);
                    // put the failed message item back to queue
                    return channel.nack(data);
                }
                console.log('Delivered message %s', info.messageId);
                // remove message item from the queue
                channel.ack(data);
            });
        }, { noAck: false });
    });
});
});



// IMAP configuration:
// Host	imap.ethereal.email
// Port	993
// Security	TLS
// Username	jordy31@ethereal.email
// Password	MZxBBp3KWP1nx1tKGx

// POP3 configuration:
// Host	pop3.ethereal.email
// Port	995
// Security	TLS
// Username	jordy31@ethereal.email
// Password	MZxBBp3KWP1nx1tKGx