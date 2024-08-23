const User = require('../models/user.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/profile.model.js');
const passport = require('passport');
const crypto = require("crypto");
const sendEmail = require('../helpers/emailService.js');



const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        await UserProfile.create({first_name, last_name, user_id: user.id})

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const payload = {
            id: user.id,
        }


        const token = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            message: 'User authenticated successfully',
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            massage: "error" + error.message
        })
    }
}

const userGetById = async (req, res) => {

    try {

        const id = req.params.id;

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: `User not found this ${id} ` });
        }
        res.status(200).json({
            massage: "user fetch successful by Id",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

const allUserAreGet = async (req, res) => {
    try {

        const users = await User.findAll()

        res.status(200).json({
            massage: "All users fetch successful",
            users
        });

    } catch (error) {
        console.log(error);

    }
}

const userUpdate = async (req, res) => {
    try {
        const id = req.params.id;

        const { email, username,password } = req.body;

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found By Id'
            });
        }

        const updateUser = await user.update({ username, email,password });

        return res.status(200).json({
            message: 'User update successful',
            user: updateUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'user updating failed',
        });
    }
};

const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {

        const user = await User.findByPk(id)

        if (!user) {
            res.status(401).json({
                massage: ` user are not found`
            })
        }

        await user.destroy(id);

        res.status(201).json({
            massage: 'user deleted successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(501).json({
            massage: 'user failed to delete' + error.message
        })

    }
}

const userAndUserProfile = async (req, res) => {

    try {
        const user = await User.findAll({
            include: [{
                model: UserProfile,
                as: 'userProfiles'
            }]
        })

        res.status(201).json({
            massage: 'user and user profile are fetched successfully',
            user
        })

    } catch (error) {
        console.log(error);

    }

};

const userLoginWithGoogle = async (req, res, next) => {
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
}

const googleCallback = async (req, res, next) => {
    passport.authenticate('google', async (err, user, info) => {
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.redirect('/auth/google/failure');
        }

        const email = user.emails && user.emails[0] && user.emails[0].value;

        if (!email) {
            return res.status(400).json({ message: 'Email not found in Google profile' });
        }

        const exitUser = await User.findOne({
            where: { email: email }
        });

        let token;
        if (exitUser) {
            const payload = { id: exitUser.id };
            token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

            return res.status(200).json({
                message: 'User authenticated successfully',
                token,
            });
        }

        const newUser = await User.create({
            username: user.displayName,
            email: email,
            password: ''
        });

        const payload = { id: newUser.id };
        token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

        return res.status(200).json({
            message: 'User authenticated successfully',
            newUser,
            token,
        });
    })(req, res, next);
}

const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid');
            res.status(200).json({
                message: 'User logged out successfully',
            });
        });
    });
}


const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const randNumber = parseInt(crypto.randomBytes(2).toString('hex'), 16) % 10000;
        const OTP = String(randNumber).padStart(4, '0');
        console.log(OTP , "here");
        

        const otpToken = jwt.sign({ email, otp: OTP }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
 

        await sendEmail(
            to =  user.email,
            subject = `Hi ${user.email}`,
            text =  `Your OTP for resetting password is ${OTP}`
        );

        res.status(200).json({
            message: 'OTP sent successfully',
            otpToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Password reset failed"
        });
    }
}


const verifyOtp = async (req, res) => {
    const { otpToken, otp } = req.body;

    try {
        const decoded = jwt.verify(otpToken, process.env.ACCESS_TOKEN_SECRET);

        console.log(decoded , "otp here");
        

        if (decoded.otp === otp) {
            
            res.status(200).json({
                message: 'OTP verified successfully, you can now reset your password'
            });
        } else {
            res.status(400).json({
                message: 'Invalid OTP'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "OTP verification failed"
        });
    }
}




module.exports = {
    register,
    userLogin,
    userGetById,
    allUserAreGet,
    userUpdate,
    deleteUser,
    userAndUserProfile,
    userLoginWithGoogle,
    googleCallback,
    logoutUser,
    forgetPassword,
    verifyOtp
};



