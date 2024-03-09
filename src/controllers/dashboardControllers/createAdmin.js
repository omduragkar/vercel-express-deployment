const { ROLE } = require("../../constants/role");
const generateTokens = require("../../helper/generateJWTtoken");
const { generateSalt } = require("../../helper/saltgenerator");
const User = require("../../models/user");
const response = require("../../utils/response");

module.exports.addAdmin = async (req, res) => {

    const mobileNumber = req.body.mobileNumber;
    const pin = req.body.pin;
    const admin = await User.create({
      name: mobileNumber + '_ADMIN',
      pin: await generateSalt(pin),
      mobileNumber: mobileNumber,
      role:ROLE.ADMIN,
      isLogin: true,
    })
    if(admin){
      let newAdminDetails = await User.findByIdAndUpdate(
        admin._id,
        {
          jwtToken:generateTokens({mobileNumber, role:ROLE.ADMIN, _id:admin._id})
        },
        {new:true}
      )
      console.log('Admin added successfully', newAdminDetails)
      response(res, 200, true, "success", {
        newAdminDetails
      })
    }else{
      console.log('Unable to make Admin')
    }
  }