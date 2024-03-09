const DashboardUsers = require('../../models/dashboardUsers')
const response = require('../../utils/response')

/**
 *
 * @param {*} req
 * @param {*} res
 * @response {object} response
 * @description This function is used to get all dashboard users
 * @path /dashboard/listAllDashboardUser
 * @method GET
 * @returns
 */
const listAllDashboardUser = async (req, res) => {
  try {
    const dashboardUsers = await DashboardUsers.find()
    if (dashboardUsers) {
      return response(res, 200, true, 'Dashboard Users listed successfully', dashboardUsers)
    } else {
      return response(res, 400, false, 'Dashboard Users not listed', null)
    }
  } catch (error) {
    console.log('🚀 ~ file: listAllDashboardUser.js ~ line 25 ~ listAllDashboardUser ~ error', error)
    return response(res, 400, false, error.message, null)
  }
}

module.exports = listAllDashboardUser
