const nodemailer = require('nodemailer');

/*
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1721057a14a0aa",
      pass: "6cc6127e47bece"
    }
  });

*/

config = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1721057a14a0aa",
      pass: "6cc6127e47bece"
    }
}

module.exports = nodemailer.createTransport(config);
