import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()



console.log(process.env.EMAIL_HOST)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOTPEmail = async (to: string, otp: string) => {
    const mailOptions = {
        from: `"HD Notes App" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
        html: `<b>Your OTP code is ${otp}</b>. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};