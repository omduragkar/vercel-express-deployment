const DashboardUsers = require('../../models/dashboardUsers')
const response = require('../../utils/response')

const createDashboardUser = async (req, res) => {
  const { mobileNumber, displayName, role } = req.body
   try {
    const findDashboardUser = await DashboardUsers.findOne({ mobileNumber })
    if (findDashboardUser) {
      return response(res, 409, false, 'Dashboard User already exists', null)
    } else {
      const dashboardUser = new DashboardUsers({
        mobileNumber,
        displayName,
        role
      })
      const saveDashboardUser = await dashboardUser.save()
      if (saveDashboardUser) {
        return response(res, 200, true, 'Dashboard User created successfully', { saveDashboardUser })
      } else {
        return response(res, 400, false, 'Dashboard User not created', null)
      }
    }
  } catch (error) {
    console.log('🚀 ~ file: createDashboardUser.js ~ line 25 ~ createDashboardUser ~ error', error)
    return response(res, 400, false, error.message, null)
  }
}

module.exports = createDashboardUser
