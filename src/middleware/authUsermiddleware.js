const jwt = require('jsonwebtoken');
const User = require('../models/user');
const response = require('../utils/response');


const protect = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log(process.env.APPSETTING_JWT_SECRET);
            const decoded = jwt.verify(token, process.env.APPSETTING_JWT_SECRET);
            req.userDetails = await User.findById(decoded._id).select("-pin");
            next();
        } catch (error) {
            console.log(error);
            response(res,401,false,"Error",error);
        }
    }else{
        response(res,401,false,"Not Authorized, No Token!",token);

    }
}

module.exports = protect;