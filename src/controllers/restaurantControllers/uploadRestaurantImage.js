const Restaurant = require('../../models/restaurant')

const uploadRestaurantImage = async (req, res) => {
  try {
    const { restaurantId } = req.query
    const { path } = req.file
    if (restaurantId && path) {
      const resultUpd = await Restaurant.updateOne({ _id: restaurantId }, { restaurantTokenImage: path })

      if (resultUpd) {
        return response(res, 200, true, 'Restaurant Image Updated', { resultUpd })
      } else {
        return response(res, 404, false, 'Something Went Wrong', null)
      }
    } else {
      return response(res, 404, false, 'Mandatory Parameters missing', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = uploadRestaurantImage
