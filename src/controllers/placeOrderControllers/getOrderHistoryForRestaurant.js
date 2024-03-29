
const response = require('../../utils/response')
const order = require('../../models/order')

const getOrderHistoryForRestaurant = async (req, res) => {
  const { restaurantId, startDate, endDate, pageNumber = 1, pageSize = 100 } = req.query
  try {
    // console.log(new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)), startDate);
    // console.log(new Date(endDate));
    // console.log(result)
    let totalPages = 0
    let result = []
    if(startDate == endDate){
      totalPages = await order.countDocuments({
        restaurantId,
        $and: [{ createdAt: { $gte:new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) } }, { createdAt: { $lt: new Date(endDate) } }]
      });

      result = await order.find({
        restaurantId,
        createdAt: {
          $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)),
          $lt: new Date(new Date(endDate).setUTCHours(24, 0, 0, 0))
        }
      }).populate("order.menuId table createdUser")
      .sort({ createdAt: -1 })
      .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize));
    }
    else{
      totalPages = await order.countDocuments({
        restaurantId,
        $and: [{ createdAt: { $gte:new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) } }, { createdAt: { $lte: new Date(endDate) } }]
      });
      // console.log(totalPages)
      result = await order.find({
        $and: [{restaurantId},{ createdAt: { $gte: new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) } }, { createdAt: { $lte: new Date(endDate) } }]
      })
      .populate("order.menuId table createdUser")
      .sort({ createdAt: -1 })
      .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize));
    }
    
    result = await result.reverse();
    if (result && result.length > 0) {
      return response(res, 200, true, 'Orders are found', {
        orders:result,
        totalPages:Math.ceil(totalPages/pageSize)
      })
    } else {
      return response(res, 400, false, 'No orders found', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getOrderHistoryForRestaurant
