import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const secret = { 
  email_service: process.env.SERVICE,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  email_host: process.env.HOST,
  email_port: process.env.EMAIL_PORT
};
