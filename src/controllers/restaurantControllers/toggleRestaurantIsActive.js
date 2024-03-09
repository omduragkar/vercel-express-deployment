const Restaurant = require('../../models/restaurant')
const updateRestaurant = require('../../services/restaurant/updateRestaurant')
const response = require('../../utils/response')

const toggleRestaurantIsActive = async (req, res) => {
  try {
    const { role, _id } = req.userDetails
    const { restaurantId } = req.query
    if (role === 'VENDOR') {
      if (restaurantId && req.body.hasOwnProperty('isRestaurantActive')) {
        const result = await updateRestaurant(restaurantId, _id, {
          $set: req.body
        })

        const activeState = req?.body?.isRestaurantActive ? 'Activated' : 'Deactivated'

        if (result && result.n == 1 && result.nModified == 1) {
          return response(res, 200, true, `Restaurant ${activeState}`, null)
        } else {
          return response(res, 404, false, 'Something Went Wrong', null)
        }
      } else {
        return response(res, 404, false, 'Mandatory Parameters missing', null)
      }
    } else {
      return response(res, 404, false, 'You are not a Vendor', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = toggleRestaurantIsActive
