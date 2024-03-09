/**
 *
 * @param {Object} res
 * @param {Object} otpResponse
 * @param {Number} otp
 * @param {Boolean} isFirstTimeUser
 * @param {Object} myCoinSavedObject
 *
 * @description Returns the OTP Object
 *
 * @returns {
 *  otp: Number,
 *  otpResponse: Object,
 *  userId: String,
 *  userName: String,
 *  isFirstTimeUser: Boolean,
 *  myCoinSavedObject: Object
 * }
 */

const getOtp = (res, otpResponse, otp, isFirstTimeUser, myCoinSavedObject) => {
  return {
    otp: otp,
    otpResponse,
    userId: res._id,
    userName: res.userName,
    isFirstTimeUser: isFirstTimeUser,
    myCoinSavedObject
  }
}

module.exports = getOtp
