const express =  require('express');
const {connectDatabase} =  require('./src/dbConfig/dbConfig.js');
const userRouter = require('./src/Router/user.router.js');
const userProfile  = require('./src/Router/userProfiles.router.js')
const { sequelize } = require('./src/dbConfig/dbConfig.js');
const complianceRouter = require('./src/Router/compliance.router.js')


const app = express();
sequelize.sync();

app.use(express.json());

connectDatabase();


// Router
 app.use('/user', userRouter);
 app.use('/userProfile', userProfile);
 app.use('/compliance',complianceRouter);


// Start server
module.exports = app