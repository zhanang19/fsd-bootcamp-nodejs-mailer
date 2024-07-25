const nodemailer = require("nodemailer");
require("dotenv").config();

const smtp = nodemailer.createTransport({
  host: process.env.MAILER_SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.MAILER_SMTP_USER,
    pass: process.env.MAILER_SMTP_PASSWORD,
  },
});

const now = () => new Date().toLocaleString();

(async () => {
  console.log(`${now()} - Preparing to send email...`);

  await smtp.sendMail({
    from: process.env.MAILER_DEFAULT_SENDER_EMAIL,
    to: "admin@example.com",
    subject: "Hello from Nodemailer",
    text: "Test email sent using Nodemailer",
    html: "Test email sent using <b>Nodemailer</b>",
    attachments: [
      {
        filename: "license.txt",
        path: "https://github.com/nodejs/node/raw/main/LICENSE",
      },
    ],
  });

  console.log(`${now()} - Email sent successfully`);
})();
