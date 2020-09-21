const nodemailer = require('nodemailer');

//STARTTLS
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSW0RD,
  }
},{
  from: 'donotreply@onlinestore.com',
});


const sendMail = async(data)=>{
    let message = JSON.parse(data.content.toString());
    await transporter.sendMail(message);
};

module.exports = {
    sendMail
};

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