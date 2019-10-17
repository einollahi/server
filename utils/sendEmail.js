const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: config.EMAIL.SERVICE,
  auth: {
    user: config.EMAIL.USER,
    pass: config.EMAIL.PASS
  }
});

const mailOptions = {
  from: config.EMAIL.USER,
};

module.exports = class SendEmail {

  constructor() {
  }

  SendEmail(to, subject, content) {
    mailOptions['to'] = to;
    mailOptions['subject'] = subject;
    mailOptions['text'] = content;

    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        throw new Error(err)
      else
        return info.response;
    });
  }

}
