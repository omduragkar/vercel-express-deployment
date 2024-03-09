const restaurant = require('../../models/restaurant')
const User = require('../../models/user')
const response = require('../../utils/response')

/**
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @description
 * This is a api to get all the users
 *
 * @endpoint /user/getAllUsers
 *
 * @returns {Object} response {
 * users: Array
 * }
 */

const getAllUsers = async (req, res) => {
  try {
    const users = await restaurant.findById(req.query.restaurantId).populate("staff").select("staff");
    console.log(users, req.query);
    if (users) {
      return response(res, 200, true, 'User List', { staff:users.staff })
    } else {
      return response(res, 404, false, 'User Not Found', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', null)
  }
}
module.exports = getAllUsers
