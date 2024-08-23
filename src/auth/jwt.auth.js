const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user",
        });
    }
    try {

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        req.user = user;
        console.log(req.user , 'user Token verified ');
        next();
    });
        
    } catch (error) {
          console.log(error);
          
    }
};

module.exports = authenticateToken;
