import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import { secret } from './secret.js'; // Adjust the path as needed

export const sendEmail = (body, res, message) => {
  const transporter = nodemailer.createTransport({
    host: secret.email_host,
    service: secret.email_service, // comment this line if you use custom server/domain
    port: secret.email_port,
    secure: true,
    auth: {
      user: secret.email_user,
      pass: secret.email_pass,
    },
  });

  transporter.verify(function (err, success) {
    if (err) {
      res.status(403).send({
        message: `Error happened when verifying: ${err.message}`,
      });
      console.error(err.message);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      res.status(403).send({
        message: `Error happened when sending email: ${err.message}`,
      });
      console.error(err.message);
    } else {
      res.send({
        message: message,
      });
    }
  });
};
