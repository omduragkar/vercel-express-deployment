const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')
const { ROLE } = require('../../constants/role')
const User = require('../../models/user')
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

const deleteUser = async (req, res) => {
  const { role, restaurantLinked, _id } = req.userDetails
  const { userData } = req.body
  try {
    console.log({
      re:req.userDetails,
      userData
    })
    if ((role === ROLE.CAPTAIN || role == ROLE.OWNER)) {
      let deletedUserId = await User.findByIdAndDelete(userData?._id);
      response(res, 200, true, "Done!", {deletedUserId});
    } else {
      return response(res, 400, false, 'Something went wrong', { error: "Not Authorized to Update User" })
    }
  } catch (error) {
    return response(res, 400, false, 'Something went wrong', { error: error.message })
  }
}

module.exports = deleteUser