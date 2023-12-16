import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import { secret } from './secret.js'; // Adjust the path as needed

export const sendEmail = async (body) => {
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

  try {
    await transporter.verify();
    console.log('Server is ready to take our messages');
    await transporter.sendMail(body);
    return 'Email sent successfully';
  } catch (err) {
    console.error(err.message);
    throw new Error(`Error in sending email: ${err.message}`);
  }
};
