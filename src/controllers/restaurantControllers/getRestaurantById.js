const restaurant = require('../../models/restaurant');
const response = require('../../utils/response');

const getRestaurantById = async (req, res) => {
  const { restaurantId } = req.query
  const userDetails = req.userDetails
  try {
    if (userDetails?._id) {
      const result = await restaurant.findById(restaurantId).select("_id restaurantName address isGstRegistered GstValue openingTime closingTime isRestaurantActive print").populate("print.kot print.billing");
      if (result) {
        return response(res, 200, true, 'Restaurant Details', { restaurantInfo: result })
      } else {
        return response(res, 400, false, 'Restaurant Details not found', null)
      }
    } else {
      return response(res, 400, false, 'Not authorized', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getRestaurantById
