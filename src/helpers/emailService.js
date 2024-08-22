const nodemailer = require('nodemailer');

const sendEmail = async (user, report_type, content) => {
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
            to: user.email,              
            subject: `Compliance Report Created: ${report_type}`,
            text: `Content: ${content}\n\nThank you!`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports =  sendEmail 
