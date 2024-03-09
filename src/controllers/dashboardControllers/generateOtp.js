const DashboardUsers = require('../../models/dashboardUsers')
const response = require('../../utils/response')
const sendOtpSms = require('../../helper/sendOtpSms')
const { isStaging, isDev } = require('../../utils/env')

const generateOtp = async (req, res) => {
  const { mobileNumber, environment } = req.body
  const findDashboardUser = await DashboardUsers.findOne({ mobileNumber })
  try {
    if (findDashboardUser) {
      // If the admin is present in the database
      const otp = Math.floor(Math.random() * 9000) + 1000 // Generate otp
      const updateOtp = await DashboardUsers.updateOne({ mobileNumber }, { $set: { otp } }) // Update the otp in the database
      // If the updateOtp is successful
      if (updateOtp) {
        // If the updateOtp is successful then send the otp to the admin
        if (!(environment === 'test' && (isStaging || isDev))) {
          // If the environment is not test, send otp as per mobileNumber as sms
          sendOtpSms(mobileNumber, otp) // Send the otp to the admin
        }
        // If the environment is test, staging or dev, send otp but default otp is 0000
        return response(res, 200, true, 'OTP sent successfully', null) // Send the success message to the admin
      }
    } else {
      return response(res, 404, false, 'Admin not found', null) // If the admin is not present in the database then return the error
    }
  } catch (error) {
    console.log('🚀 ~ file: generateOtp.js ~ line 26 ~ generateOtp ~ error', error)
    return response(res, 400, false, error.message, null)
  }
}

module.exports = generateOtp
