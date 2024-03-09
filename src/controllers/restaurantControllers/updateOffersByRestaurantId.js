const response = require('../../utils/response')
const Restaurant = require('../../models/restaurant')

const updateOffersByRestaurantId = async (req, res) => {
  const { restaurantId } = req.query
  const { role, _id } = req.userDetails
  const { offers } = req.body
  try {
    if (role == 'VENDOR') {
      if (restaurantId && offers && offers.length) {
        const result = await updateRestaurant(restaurantId, _id, {
          $push: body
        })
        if (result && result.n == 1 && result.nModified == 1) {
          return response(res, 200, true, 'Offers Updated', { result })
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

module.exports = updateOffersByRestaurantId
