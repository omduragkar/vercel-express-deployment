const User = require('../../models/user')
const response = require('../../utils/response')

const getAllVendors = async (req, res) => {
  try {
    const users = await User.find({
      role: 'VENDOR'
    })
    if (users) {
      return response(res, 200, true, 'User List', { users })
    } else {
      return response(res, 404, false, 'User Not Found', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', null)
  }
}

module.exports = getAllVendors
