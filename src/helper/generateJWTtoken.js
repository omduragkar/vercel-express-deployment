const jwt = require('jsonwebtoken');
const generateTokens = ({mobileNumber, role, _id}) =>{
    return jwt.sign({
        mobileNumber,
        role, 
        _id
    }, "etoPOS@secured@poweredbyKuponz",{
        expiresIn:"30d",
    });
};

module.exports = generateTokens;