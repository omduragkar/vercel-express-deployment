const CoinCollection = require('../../models/coinCollection')
const findRestaurant = require('../../services/restaurant/findRestaurantById')
const findUser = require('../../services/user/findUserByMobileNumber')
const referenceCoinsTransaction = require('../referenceCoinsTransaction')
const ObjectId = require('mongoose').Types.ObjectId

const removeCoinsEarnedOnCancelOrRefund = async (myCoins, restaurantId, userId, giftCoins) => {
  try {
    const dec = myCoins * -1 + giftCoins
    const resultUpdMyCoin = await CoinCollection.updateOne(
      {
        restaurantId,
        userId: new ObjectId(userId)
      },
      { $inc: { myCoins: dec } }
    )
    // todo debit logic for user hardcoded
    const user = await findUser(userId)
    const restaurant = await findRestaurant(restaurantId)
    await referenceCoinsTransaction(
      userId,
      user.mobileNumber,
      restaurantId,
      restaurant.restaurantName,
      giftCoins,
      'debit',
      'Removed Coins Earned on Cancel or Refund',
      `Removed ${giftCoins} coins earned on cancel or refund for restaurant ${restaurant.restaurantName}`
    )
    return resultUpdMyCoin
  } catch (err) {
     console.log('getMyAllCoinsByRestaurantId: ', err)
    return err
  }
}

module.exports = removeCoinsEarnedOnCancelOrRefund
