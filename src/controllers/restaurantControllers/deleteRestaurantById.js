const Restaurant = require('../../models/restaurant')
const response = require('../../utils/response')

const deleteRestaurantById = async (req, res) => {
  const { role, _id } = req.userDetails
  const { restaurantId } = req.query
  try {
    if (role === 'VENDOR') {
      if (restaurantId) {
        const result = await Restaurant.deleteOne({
          _id: restaurantId,
          createdBy: _id
        })
        if (result && result.n == 1 && result.deletedCount == 1) {
          return response(res, 200, true, 'Restaurant Deleted', { result })
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

module.exports = deleteRestaurantById
