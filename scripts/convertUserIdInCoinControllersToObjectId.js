const CoinCollection = require('../src/models/coinCollection')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Lazar786:Menucart786@cluster0.sny7p.mongodb.net/socon-production', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const convertUserIdInCoinControllersToObjectId = async () => {
  try {
    const coinCollections = await CoinCollection.find({})
    coinCollections.forEach(async coinCollection => {
      await CoinCollection.updateOne(
        { _id: coinCollection._id },
        {
          userId: mongoose.Types.ObjectId(coinCollection.userId)
        }
      )
    })
  } catch (error) {
    console.log(error)
  }
}

convertUserIdInCoinControllersToObjectId()
