import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (to, subject, text, htmlContent) => {
    try {
        const mailOptions = {
            from: `"Pelri Zhabtho" <${process.env.EMAIL_USERNAME}>`, // Sender address
            to, // List of receivers
            subject, // Subject line
            text, // Plain text body
            html: htmlContent, // HTML content for formatted message
            replyTo: 'no-reply@example.com', // Disable replies by setting no-reply email address
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Could not send email');
    }
};
