const mongoose = require('mongoose')
const Restaurant = require('../src/models/restaurant')

mongoose.connect('mongodb+srv://Lazar786:Menucart786@cluster0.sny7p.mongodb.net/socon-production', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const addMenuIdInOffersIfNotExistsSameAsId = async () => {
  const restaurants = await Restaurant.find({})
  console.log(
    '🚀 ~ file: addMenuIdInOffers.js ~ line 11 ~ addMenuIdInOffersIfNotExistsSameAsId ~ restaurants ',
    restaurants
  )
  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i]
    for (let j = 0; j < restaurant.offers.length; j++) {
      const offer = restaurant.offers[j]
      if (!offer.menuId) {
        offer.menuId = offer._id
      }
    }
    if (restaurant.isGstRegistered === undefined) {
      restaurant[i].isGstRegistered = false
    }
    await restaurant.save()
  }
}

addMenuIdInOffersIfNotExistsSameAsId()
