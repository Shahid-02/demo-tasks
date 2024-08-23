const { Router } = require('express');
const userRouter = Router();
const { 
    register,
     userLogin,
    userGetById,
    allUserAreGet,
    userUpdate,
    deleteUser,
    userLoginWithGoogle,
    googleCallback ,
    logoutUser,
    forgetPassword,
    verifyOtp} = require('../Controllers/user.controllers.js')

const authenticateToken = require('../auth/jwt.auth.js')


userRouter.post('/register',register)
.post('/login', userLogin)
.get('/:id', authenticateToken, userGetById)
.get('' ,authenticateToken,allUserAreGet)
.patch('/:id' ,authenticateToken, userUpdate)
.delete('/:id', authenticateToken,deleteUser)
.get('/auth/google',userLoginWithGoogle)
.get('/auth/google/callback',googleCallback)
.post('/logout'  , authenticateToken, logoutUser)
.post('/forgetPassword' , authenticateToken, forgetPassword)
.post('/verifyOtp' , authenticateToken, verifyOtp)




module.exports = userRouter;
