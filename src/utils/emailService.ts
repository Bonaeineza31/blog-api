import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  const mailOptions = {
    from: `"Blog Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
