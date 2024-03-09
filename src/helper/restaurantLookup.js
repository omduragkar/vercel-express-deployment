const Restaurant = require('../models/restaurant')

/**
 * @description - This function is used to get the restaurant details
 * @returns {Object} response {
 *  restaurants: Array
 * }
 */

const lookup = async () => {
  return await Restaurant.aggregate([
    {
      $lookup: {
        from: 'coin_collections',
        localField: '_id',
        foreignField: 'restaurantId',
        as: 'coinCollections'
      }
    },
    {
      $project: {
        themeColor: 1,
        openingTime: 1,
        closingTime: 1,
        discount: 1,
        _id: 1,
        restaurantName: 1,
        address: 1,
        createdBy: 1,
        offers: 1,
        restaurantTokenImage: 1,
        coins: 1,
        createdAt: 1,
        updatedAt: 1,
        isRestaurantActive: 1,
        packagingCharges: 1,
        isGstRegistered: 1,
        coinCollections: {
          $cond: {
            if: { $eq: [{ $size: '$coinCollections' }, 0] },
            then: [{}],
            else: '$coinCollections'
          }
        }
      }
    },
    {
      $unwind: '$coinCollections'
    }
  ])
}

module.exports = lookup
