const User = require('../models/user.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/profile.model.js');



const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        // await UserProfile.create({first_name, last_name, user_id: user.id})

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

        const { email, username } = req.body;

        const user = await User.findOne({
            where  : {id}
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found By Id'
            });
        }

        const updateUser = await user.update({ username, email });

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
            massage : 'user and user profile are fetched successfully',
            user
         })
        
     } catch (error) {
         console.log(error);
         
     }

};

module.exports = {
    register,
    userLogin,
    userGetById,
    allUserAreGet,
    userUpdate,
    deleteUser,
    userAndUserProfile
};



