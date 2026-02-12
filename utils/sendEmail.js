const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define email options
    const mailOptions = {
        from: `RentOn <${process.env.EMAIL_USERNAME}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    // Check for email credentials
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
        console.log('--- EMAIL MOCK ---', options);
        return; // Skip sending real email if credentials are not set
    }

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`\x1b[32m%s\x1b[0m`, `>>> EMAIL SENT SUCCESSFULLY to: ${options.email}`);
    } catch (error) {
        console.error('Email send failed:', error.message);
        
        if (error.code === 'EAUTH' || error.response?.includes('Username and Password not accepted')) {
             console.log('\x1b[31m%s\x1b[0m', '>>> AUTH ERROR: Check "EMAIL_PASSWORD" in backend/.env. You must use a Google App Password (not your login password).');
             console.log('>>> Generate one here: https://myaccount.google.com/apppasswords');
        }

        console.log('--- EMAIL MOCK (Fallback due to error) ---', options);
    }
};

module.exports = sendEmail;
