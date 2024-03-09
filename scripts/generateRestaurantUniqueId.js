const Restaurant = require('../src/models/restaurant')
const generateUniqueId = require('../src/helper/generateUniqueId')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/socon-production', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const generateRestaurantUniqueId = async () => {
  const restaurants = await Restaurant.find({})
  restaurants.forEach(async restaurant => {
    const uniqueId = await generateUniqueId(restaurant.restaurantName)
    await Restaurant.updateOne({ _id: restaurant._id }, { uniqueId })
  })
}

generateRestaurantUniqueId()
