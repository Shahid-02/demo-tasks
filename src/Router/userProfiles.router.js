const {Router} = require('express');
const { 
       userProfileGetById,
       allUserProfileAreGet,
       deleteUserProfile,
       userProfileUpdate } = require('../Controllers/userProfile.controllers.js');

 const authenticateToken = require('../auth/jwt.auth.js')

const userProfile = Router();



userProfile
.get('/:id' , authenticateToken , userProfileGetById)
.get('' , allUserProfileAreGet)
.put('/update' ,authenticateToken,userProfileUpdate )
.delete('' ,authenticateToken , deleteUserProfile)







module.exports = userProfile;