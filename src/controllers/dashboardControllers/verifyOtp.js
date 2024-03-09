const DashboardUsers = require('../../models/dashboardUsers')
const response = require('../../utils/response')
const { isStaging, isDev } = require('../../utils/env')
const getJwtToken = require('../../utils/getJwtToken')

const verifyOtp = async (req, res) => {
  const { mobileNumber, otp, enviroment } = req.body
  try {
    const findDashboardUser = await DashboardUsers.findOne({ mobileNumber })
    const userOtp = Number(findDashboardUser.otp)
    const incomingOtp = Number(otp)
    if (((isStaging || isDev) && otp === '0000') || userOtp === incomingOtp) {
      // If the environment is test, staging or dev, send otp but default otp is 0000
      const jwtToken = await getJwtToken(mobileNumber) // Get the jwtToken
      const updateLogin = await DashboardUsers.updateOne({ mobileNumber }, { $set: { jwtToken } }) // Update the isLogin and jwtToken in the database
      const updatedUser = await DashboardUsers.findOne({
        mobileNumber
      })
      if (updateLogin) {
        return response(res, 200, true, 'OTP verified successfully', { updatedUser, canLogin: true }) // Send the success message to the admin
      }
    } else {
      return response(res, 403, false, 'OTP is incorrect', null) // If the otp is incorrect then return the error
    }
  } catch (error) {
    console.log('🚀 ~ file: verifyOtp.js ~ line 26 ~ verifyOtp ~ error', error)
    return response(res, 400, false, error.message, null)
  }
}

module.exports = verifyOtp
