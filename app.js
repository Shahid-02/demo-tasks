const express =  require('express');
const {connectDatabase} =  require('./src/dbConfig/dbConfig.js');
const userRouter = require('./src/Router/user.router.js');
const userProfile  = require('./src/Router/userProfiles.router.js')
const { sequelize } = require('./src/dbConfig/dbConfig.js');
const complianceRouter = require('./src/Router/compliance.router.js');
const passport = require('./src/Controllers/passport-google-oauth.js');
const session = require('express-session');
const {Router} = require('express')
const router = Router()
const {googleCallback} = require('./src/Controllers/user.controllers.js')


const app = express();
sequelize.sync();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

connectDatabase();


// Router
 app.use('/user', userRouter);
 app.use('/userProfile', userProfile);
 app.use('/compliance',complianceRouter);


// Start server
module.exports = app