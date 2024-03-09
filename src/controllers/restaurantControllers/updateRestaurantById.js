const updateRestaurant = require('../../services/restaurant/updateRestaurant')
const response = require('../../utils/response')

const updateRestaurantById = async (req, res) => {
  const { restaurantId } = req.query
  const { offers } = req.body
  const { _id, role } = req.userDetails
  try {
    if (role === 'VENDOR') {
      if (restaurantId) {
        if (offers && offers.length) {
          return response(res, 402, false, 'Invalid Request', null)
        } else {
          const result = await updateRestaurant(restaurantId, _id, {
            $set: req.body
          })

          if (result && result.n == 1 && result.nModified == 1) {
            return response(res, 200, true, 'Restaurant Updated', { result })
          } else {
            return response(res, 404, false, 'Something Went Wrong', null)
          }
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

module.exports = updateRestaurantById
