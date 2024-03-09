const jwt = require('jsonwebtoken')
const DashboardUsers = require('../models/dashboardUsers')
/**
 *
 * @param {string} mobileNumber
 * @description Returns the jwt token for the user
 * @returns jwt token as string
 */

const getJwtToken = async mobileNumber => {
  const { APPSETTING_APP_SECRET } = process.env
  const dashboardUser = await DashboardUsers.findOne({ mobileNumber })
  const jwtToken = await jwt.sign(
    {
      mobileNumber,
      role: dashboardUser.role
    },
    APPSETTING_APP_SECRET,
    {}
  )
  return jwtToken
}

module.exports = getJwtToken
