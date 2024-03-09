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
 * @description {} create user by owner Role
 * @path /user/createUser
 * @access Owner, Captain
 * @method POST
 * @requires {} role {from middleware} ownerDetails {from body}
 */

const createUser = async (req, res) => {
  const { role, restaurantLinked } = req.userDetails
  const { userData } = req.body
  try {
    if (role === ROLE.CAPTAIN || role == ROLE.OWNER) {
      if (userData?.mobileNumber && userData?.pin) {
        const user = await User.findOne({ mobileNumber: userData.mobileNumber })
         if (user) {
          return response(res, 400, false, 'User Already Exists!', null)
          
        } else {

          let createUser = await User.create({
            name: userData?.name,
            pin: await generateSalt(userData?.pin),
            mobileNumber:userData?.mobileNumber,
            role:ROLE[userData.role],
            isLogin:false,
            access:[],
            restaurantLinked,
          })
          if(createUser){
            let restaurantStaffAdd = await Restaurant.findByIdAndUpdate(
              restaurantLinked,
              {
                $push:{staff:createUser._id}
              },
              {
                new:true
              }
            )
            if(restaurantStaffAdd){
              return response(res, 200, true, 'Success', {user:createUser, pin:userData.pin});  
            }else{
              return response(res, 400, false, 'Restaurant Not Able to process Request Currently', null)

            }

          }else{
            return response(res, 400, false, 'Not Able to process Request Currently', null)
          }
          
        }
      } else {
        return response(res, 400, false, 'Please Add Complete Details', null)
      }
    }else{
      return response(res, 400, false, 'Something went wrong', { error: "Not Authorized to create New User" })
    }
  } catch (error) {
    return response(res, 400, false, 'Something went wrong', { error: error.message })
  }
}

module.exports = createUser
