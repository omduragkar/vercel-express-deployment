const DashboardUsers = require('../../models/dashboardUsers')
const response = require('../../utils/response')

/**
 *
 * @param {*} req
 * @param {*} res
 * @requires {} _id (string), {} mobileNumber (string), {} displayName (string), {} role (string)
 * @returns {object} response
 * @description This function is used to update a dashboard user
 * @path /dashboard/updateDashboardUser
 * @method PUT
 *
 * @returns
 */

const updateDashboardUser = async (req, res) => {
  const { _id, mobileNumber, displayName, role } = req.body

  try {
    const updateDashboardUser = await DashboardUsers.updateOne({ _id }, { $set: { mobileNumber, displayName, role } })
    if (updateDashboardUser) {
      return response(res, 200, true, 'Dashboard User updated successfully', null)
    } else {
      return response(res, 400, false, 'Dashboard User not updated', null)
    }
  } catch (error) {
    console.log('🚀 ~ file: updateDashboardUser.js ~ line 25 ~ updateDashboardUser ~ error', error)
    return response(res, 400, false, error.message, null)
  }
}

module.exports = updateDashboardUser
