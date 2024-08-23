const nodemailer = require('nodemailer');

const sendEmail = async (to,subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS    
            }
        });
        console.log(process.env.EMAIL_USER, ' email sent');
        console.log(process.env.EMAIL_PASS, ' email sent');
        
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: to,              
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports =  sendEmail 
