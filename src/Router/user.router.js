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
    userSave  } = require('../Controllers/user.controllers.js')

const authenticateToken = require('../auth/jwt.auth.js')


userRouter.post('/register',register)
.post('/login', userLogin)
.get('/:id', authenticateToken, userGetById)
.get('' ,authenticateToken,allUserAreGet)
.patch('/:id' ,authenticateToken, userUpdate)
.delete('/:id', authenticateToken,deleteUser)
// .get('' , authenticateToken , userAndUserProfile);
.get('/auth/google',userLoginWithGoogle)





module.exports = userRouter;
