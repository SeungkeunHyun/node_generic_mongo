require('./../config/config.js');
const jwt = require('jsonwebtoken');

module.exports =  { isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        }
        res.redirect('/login');
    },
    verifyToken: (req, res, next) => {
        var token = req.headers['x-auth'];
        console.log("Here is the token", token);
        if(!token) {
            next(new Error('Token is empty'));
        }
        try {
            var info = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch(ex) {
            next(ex);
        }
    }
}

