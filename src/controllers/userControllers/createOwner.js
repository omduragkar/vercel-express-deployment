const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')
const { ROLE } = require('../../constants/role')
const User = require('../../models/user')
const { generateSalt } = require('../../helper/saltgenerator')

/**
 *
 * @param {*} req
 * @param {*} res
 * @name {} Change User Role
 * @description {} change user role
 * @path /user/signup
 * @access Admin
 * @method POST
 * @requires {} role {from middleware} ownerDetails {from body}
 */

const createOwner = async (req, res) => {
  
  const { role } = req.userDetails
  const { ownerDetails } = req.body;
  try {
    if (role === ROLE.ADMIN) {
      if (ownerDetails.mobileNumber) {
        const user = await User.findOne({ mobileNumber: ownerDetails.mobileNumber })
         if (user) {
          return response(res, 400, false, 'User Already Exists!', null)
          
        } else {
          let pin = ownerDetails.pin;
          let generatedPin = await generateSalt(pin);
          let createOwner = await User.create({
            name: ownerDetails?.name,
            pin: generatedPin,
            mobileNumber:ownerDetails?.mobileNumber,
            role:ROLE.OWNER,
            isLogin:false,
            access:[]
          })
          if(createOwner){
            return response(res, 200, true, 'Success', {ownerDetails:createOwner, pin});

          }else{
            return response(res, 400, false, 'Not Able to process Request Currently', null)
          }
          
        }
      } else {
        return response(res, 400, false, 'Please Add Complete Details', null)
      }
    }else{
      return response(res, 400, false, 'Something went wrong', { error: "Not Authorized to create Owner module" })
    }
  } catch (error) {
    return response(res, 400, false, 'Something went wrong', { error: error.message })
  }
}

module.exports = createOwner
