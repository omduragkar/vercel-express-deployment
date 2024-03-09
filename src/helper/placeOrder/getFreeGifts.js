const PlaceOrder = require('../../models/placeOrder')

const getFreeGifts = async (req, id, type) => {
  const query = {
    isGift: true
  }

  if (type === 'restaurant') {
    query.restaurantId = id
  } else if (type === 'user') {
    query.userId = id
  }

  const { orderStatus, paymentStatus } = req.query

  if (orderStatus && orderStatus !== 'null') {
    query.orderStatus = orderStatus
  }

  if (paymentStatus && paymentStatus !== 'null') {
    query.paymentStatus = paymentStatus
  }

  const orders = await PlaceOrder.aggregate([
    {
      $match: { ...query }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'restaurants',
        localField: 'restaurantId',
        foreignField: '_id',
        as: 'restaurant'
      }
    },
    {
      $unwind: {
        path: '$restaurant',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        orderId: 1,
        orderStatus: 1,
        paymentStatus: 1,
        user: {
          _id: 1,
          mobileNumber: 1
        },
        restaurant: {
          restaurantName: 1,
          _id: 1
        },
        giftCoins: 1,
        isGift: 1
      }
    }
  ])
  return orders
}

module.exports = getFreeGifts
