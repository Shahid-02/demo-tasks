const { Router } = require('express');
const userRouter = Router();
const { 
    register,
     userLogin,
    userGetById,
    allUserAreGet,
    userUpdate,
    deleteUser,
    userAndUserProfile } = require('../Controllers/user.controllers.js')

const authenticateToken = require('../auth/jwt.auth.js')


userRouter.post('/register',register)
.post('/login', userLogin)
.get('/:id', authenticateToken, userGetById)
.get('' ,authenticateToken,allUserAreGet)
.patch('/:id' ,authenticateToken, userUpdate)
.delete('/:id', authenticateToken,deleteUser)
// .get('' , authenticateToken , userAndUserProfile);




module.exports = userRouter;
