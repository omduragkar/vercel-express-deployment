const Restaurant = require('../../models/restaurant')
const PetpoojaRestaurant = require('../../models/petpoojaModels/restaurant')

const response = require('../../utils/response')

const getAllRestaurantsList = async (req, res) => {
  try {
    const data = {
      _id: 1,
      restaurantName: 1,
      restaurantTokenImage: 1,
      address: 1
    }

    const restaurants = await Restaurant.find({}, data)
    const petpoojaRestaurant = await PetpoojaRestaurant.find({}, { ...data, restaurantid: 1 })

    return response(res, 200, true, 'Restaurant List', { restaurants: [...restaurants, ...petpoojaRestaurant] })
  } catch (err) {
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getAllRestaurantsList
