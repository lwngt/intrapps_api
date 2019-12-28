'use strict';
let nodemailer = require('nodemailer');
let fs = require('fs');

let stmp_connect_define = JSON.parse(fs.readFileSync('/work/mail_conf/mail.json', 'utf8'));
let api_define = JSON.parse(fs.readFileSync('/work/api_conf/api.json', 'utf8'));

let transporter = nodemailer.createTransport({
  host: stmp_connect_define.stmp_server,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: stmp_connect_define.stmp_user_id,
    pass: stmp_connect_define.stmp_password
  }
});

// class : Mail_Common
// memo  : common class for mail
class Mail_Common {

  send_user_confirm_email(to_email_address, verified_code, callback) {
    let mail_options = {
      from: stmp_connect_define.from_mail_address,
      to: to_email_address,
      subject: 'user authrization code',
      text: 'This is from intrapps. Your authorization code is ' + verified_code
        + '.\nPlease open the url : ' + api_define.web_url + '/confirm. Thank you.'
    };
    // skip send mail when mail.conf not is set.
    if (stmp_connect_define.stmp_user_id !== "xxxxxxxxxx"
      && stmp_connect_define.stmp_password !== "xxxxxxxxxx"
      && stmp_connect_define.from_mail_address !== "xxxxxxxxxx") {
      transporter.sendMail(mail_options, (error, information) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, information);
        }
      });
    } else {
      // not send email because stmp is not set
      callback(null, true);
    }
  }
}
module.exports = Mail_Common;

