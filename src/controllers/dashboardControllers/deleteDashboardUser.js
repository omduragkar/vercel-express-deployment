const DashboardUsers = require('../../models/dashboardUsers')
const response = require('../../utils/response')

/**
 *
 * @param {*} req
 * @param {*} res
 * @requires {} userId (string)
 * @returns {object} response
 * @description This function is used to delete a dashboard user
 * @path /dashboard/deleteDashboardUser
 * @method DELETE
 * @returns
 */

const deleteDashboardUser = async (req, res) => {
  const { userId } = req.body
  const { _id } = req.userDetails
  try {
    if (userId === _id) {
      return response(res, 400, false, 'You cannot delete yourself', null)
    }
    const deleteDashboardUser = await DashboardUsers.deleteOne({ _id: userId })

    if (deleteDashboardUser) {
      return response(res, 200, true, 'Dashboard User deleted successfully', null)
    } else {
      return response(res, 400, false, 'Dashboard User not deleted', null)
    }
  } catch (error) {
    console.log('🚀 ~ file: deleteDashboardUser.js ~ line 25 ~ deleteDashboardUser ~ error', error)
    return response(res, 400, false, error.message, null)
  }
}

module.exports = deleteDashboardUser
