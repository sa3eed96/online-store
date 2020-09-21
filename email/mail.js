const nodemailer = require('nodemailer');

//STARTTLS
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
  }
},{
  from: 'donotreply@onlinestore.com',
});


const sendMail = async(job)=>{
    await transporter.sendMail(job.data);
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