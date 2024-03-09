// order/getOrder?orderId=${orderId}

const order = require('../../models/order');
const response = require('../../utils/response');

const getOrderById = async (req, res) => {
  const { orderId, restaurantId } = req.query
  const { _id } = req.userDetails
  try {
    if (_id) {
      const result = await order.findOne({$and:[{_id:orderId}, {restaurantId}]}).populate(["createdUser", "order.menuId", "table"]);
      if (result) {
        return response(res, 200, true, 'Order Details', { orderInfo: result })
      } else {
        return response(res, 400, false, 'Order Details not found', null)
      }
    } else {
      return response(res, 400, false, 'Not authorized', null)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getOrderById
