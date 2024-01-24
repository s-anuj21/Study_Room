const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url, emailToSend, grpName) {
    this.to = emailToSend;
    this.firstName = user.name.split(' ')[0];
    this.grpName = grpName;
    this.url = url;
    this.from = `Anuj Sharma <anuj21.dev@outlook.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  // Send the email
  async send(template, subject) {
    //1) Render HTML based on Pug
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        grpName: this.grpName,
        subject,
      }
    );
    //2) Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // Create transport and sent email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendJoinLink() {
    await this.send('joinTemp', 'Room Join Invitation!!');
  }
};
