const mongoose = require('mongoose')
const Restaurant = require('../src/models/restaurant')

mongoose.connect('mongodb://localhost:27017/socon-production')

const callRestaurants = async () => {
  await Restaurant.updateMany(
    {},
    {
      packagingCharges: {
        small: 0,
        medium: 0,
        large: 0
      }
    }
  )
}

callRestaurants()
