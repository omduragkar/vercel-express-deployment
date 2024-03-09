const mongoose = require('mongoose')
const menu = require('../src/models/menu')
const restaurant = require('../src/models/restaurant')
const user = require('../src/models/user')

mongoose.connect('mongodb+srv://Lazar786:Menucart786@cluster0.sny7p.mongodb.net/socon-production', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const addMobileNumberToRestaurant = async () => {
  console.log('Running script to add menu in all restaurants: ')
  console.log()
  const restaurants = await restaurant.find({})
  for (let i = 0; i < restaurants.length; i++) {
    let ownerId = restaurants[i].createdBy ? restaurants[i].createdBy : restaurants[i].owner_id
    s
    if (ownerId) {
      let userFound = await user.findById(ownerId)
      if (userFound.role === 'VENDOR') {
        await restaurant.findOneAndUpdate(
          {
            _id: restaurants[i]._id
          },
          {
            mobileNumber: userFound.mobileNumber
          }
        )
      }
    }
  }
  console.log(`Proccessed the Work Please Exit`)
}

addMobileNumberToRestaurant()
