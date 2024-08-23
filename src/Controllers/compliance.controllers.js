
const compliance = require('../models/compliance.models.js');
const sendEmail = require('../helpers/emailService.js');
const User = require('../models/user.models.js');



const createCompliance = async (req, res) => {

    try {
        const { report_type, content, created_by } = req.body;


        const newCompliance = await compliance.create({
            report_type,
            content,
            created_by
        });

        const user = await User.findByPk(created_by);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        await sendEmail(to = user.email, 
            subject = `Compliance Report Created: ${report_type}`, 
            text = `Content: ${content}\n\nThank you!`);

        res.status(201).json({
            message: 'Compliance report created and email sent:ls -a',
            newCompliance
        });

    } catch (error) {
        console.log(error);
        res.status(501).json({
            massage: "complice create failed"
                + error.message
        })

    }
}

module.exports = createCompliance;