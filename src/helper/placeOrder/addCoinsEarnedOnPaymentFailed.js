const CoinCollection = require('../../models/coinCollection')
const findRestaurant = require('../../services/restaurant/findRestaurantById')
const User = require('../../models/user')
const ObjectId = require('mongoose').Types.ObjectId

const addCoinsEarnedOnPaymentFailed = async (restaurantId, userId, giftCoins) => {
  try {
    // Updating the user's gift coins
    const resultUpdMyCoin = await CoinCollection.updateOne(
      { restaurantId, userId: new ObjectId(userId) },
      { $inc: { myCoins: giftCoins } }
    )
    // Finding the user
    const user = await User.findOne({ _id: userId })
    // Finding the restaurant
    const restaurant = await findRestaurant(restaurantId)
    // Reference coins transaction in the database
    await referenceCoinsTransaction(
      userId,
      user.mobileNumber,
      restaurantId,
      restaurant.restaurantName,
      giftCoins,
      'Credit',
      'Added Coins Earned on Payment Failed',
      `Refunded ${giftCoins} coins earned on payment failed for restaurant ${restaurant.restaurantName}`
    )
    // Add coins earned on payment failed to user hardcoded credit
    return resultUpdMyCoin
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = addCoinsEarnedOnPaymentFailed
