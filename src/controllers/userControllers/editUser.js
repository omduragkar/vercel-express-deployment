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

const editUser = async (req, res) => {
  const { role, restaurantLinked,_id} = req.userDetails
  const { userData } = req.body
  
  try {
    const oldData = await User.findById(userData?._id);
    if ((role === ROLE.CAPTAIN || role == ROLE.OWNER) ) {
      if (userData?._id) {
        let newPin = oldData?.pin
        const updated=await User.findByIdAndUpdate(userData?._id,{
          pin:userData?.pin?await generateSalt(userData?.pin):newPin,
          name: userData?.name ?? oldData?.name,
          role:userData?.role ?? oldData?.role
        },{new:true});
        if(updated)
        {
          response(res, 200, true, 'Updated Successfully', { update:updated})
        }
        else
        {
          response(res, 400, false, 'Pin not updated',null)
        }
      } else {
        return response(res, 400, false, 'Incomplete Details', null)
      }
    }else{
      return response(res, 400, false, 'Something went wrong', { error: "Not Authorized to Update User" })
    }
  } catch (error) {
    return response(res, 400, false, 'Something went wrong', { error: error.message })
  }
}

module.exports = editUser