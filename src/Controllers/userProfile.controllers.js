
const User = require('../models/user.models.js');
const userProfile = require('../models/profile.model.js')


const userProfileCreate = async (req, res) => {
    try {

        const { first_name, last_name, user_id } = req.body;

        const user = await User.findOne({
            where: user_id
        })

        if (!user) {
            res.status(401).json({
                massage: "user id are not found"
            })
        }

        const profile = await userProfile.create({
            first_name,
            last_name,
            user_id,
        });

        res.status(201).json({
            message: 'User Profile created successfully',
            profile,
        });

    }
    catch (error) {
        console.log(error);

    }
}

const userProfileGetById = async (req, res) => {

    const id = req.params.id;

    try {

        const profile = await userProfile.findOne({ id })

        if (!profile) {
            res.status(401).json({
                massage: `user profile in no found by this id ${id}`
            })
        }

        return res.status(200).json({
            massage: 'user profile fetch successful by Id',
            data : profile
        })


    } catch (error) {
        console.log(error);
        res.status(505).json({
            massage: "user failed get by id" + error
        })

    }

}

const userProfileUpdate = async (req, res) => {

    const id = req.params.id;

    const { first_name, last_name } = req.body;

    try {
        const profile = await userProfile.findOne({
            where: { id }
        })

        if (profile) {
            req.status(401).json({
                massage: 'user profile update to failed'
            })
        }

        const updateProfile = await userProfile.update({
            first_name, last_name
        })

        req.status(201).json({
            massage: 'user update successful',
            updateProfile
        })

    } catch (error) {
        console.log(error);
        req.status(501).json({
            massage: 'user update failed', error
        })
    }
}

const allUserProfileAreGet = async (req, res) => {

    try {

        const profile = await userProfile.findAll();

        res.status(201).json({
            massage: "All user profile fetch successful",
            profile
        })


    } catch (error) {
        console.log(error);
        res.status(501).json({
            massage: "All user are fetched to failed"
        })

    }
}

const deleteUserProfile = async (req, res) => {

    const id = req.params.id;
    try {

        const profile = await userProfile.findByPk(id);

        if (profile) {
            req.status(401).json({
                message: `No user profile found with the ID ${id}`
            })
        }

        await profile.destroy();

        res.status(200).json({
            message: 'User profile deleted successfully',
            profile
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            massage: 'user profile delete failed'
        })
    }
}

module.exports = {
    userProfileCreate,
    userProfileGetById,
    allUserProfileAreGet,
    deleteUserProfile,
    userProfileUpdate
}