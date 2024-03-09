const CoinCollection = require('../../models/coinCollection')
const response = require('../../utils/response')
const Restaurant = require('../../models/restaurant')
const PetpoojaRestaurant = require('../../models/petpoojaModels/restaurant')

const getAllRestaurants = async (req, res) => {
  const { mobileNumber } = req.userDetails
  try {
    const myCoins = await CoinCollection.find({ mobileNumber }, { orderId: 0 })
    const restaurants = await Restaurant.find({})
    const petpoojaRestaurant = await PetpoojaRestaurant.find({})
    const result = [...restaurants, ...petpoojaRestaurant].map(restaurant => {
      const index = myCoins.findIndex(coins => {
        return JSON.stringify(coins?.restaurantId) == JSON.stringify(restaurant._id)
      })
      if (index >= 0) {
        return {
          ...restaurant._doc,
          coinCollections: myCoins[index]
        }
      } else {
        return {
          ...restaurant._doc,
          coinCollections: {
            _id: '',
            restaurantId: restaurant._id,
            userId: '',
            myCoins: 0,
            receivedCoins: 0,
            mobileNumber: ''
          }
        }
      }
    })
    return response(res, 200, true, 'Restaurant Details', { result })
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getAllRestaurants
