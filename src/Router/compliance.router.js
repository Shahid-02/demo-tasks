const {Router} = require('express')
const authenticateToken = require('../auth/jwt.auth.js');
const createCompliance = require('../Controllers/compliance.controllers.js');


const complianceRouter = Router();


complianceRouter.post('',authenticateToken,createCompliance)



module.exports = complianceRouter;