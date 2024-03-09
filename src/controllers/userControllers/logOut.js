const User = require('../../models/user')
const response = require('../../utils/response')

/**
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @description
 * This function is used to logout the user
 */

const logOut = async (req, res) => {
  const { mobileNumber, role } = req.userDetails;
  if (mobileNumber) {
    const resultUpd = await User.findOneAndUpdate({ mobileNumber}, { jwtToken: '', isLogin: false }, {new:true})
    if (resultUpd) {
      return response(res, 200, true, 'User Logged Out', {
        login:false
      })
    } else {
      return response(res, 404, false, 'Something Went Wrong', null)
    }
  } else {
    return response(res, 404, false, 'Mandatory Parameters missing', null)
  }
}

module.exports = logOut
