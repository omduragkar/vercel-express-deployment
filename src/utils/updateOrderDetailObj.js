const cancelAndRefundOrder = require('../helper/placeOrder/cancelAndRefundOrder')

const updateOrderDetailObj = async (orderStatus, orderPickupTime, razorPayOrderId, amount) => {
  let updateObj = {}
  if (orderStatus === 'ACCEPTED') {
    updateObj = {
      orderStatus: orderStatus,
      orderPickupTime: orderPickupTime
    }
  } else if (orderStatus === 'DONE') {
    updateObj = { orderStatus: orderStatus }
  } else if (orderStatus === 'PICKED_UP') {
    updateObj = { orderStatus: orderStatus, orderPickupTime: 0 }
  } else if (orderStatus === 'REJECTED') {
    const refundResponse = await cancelAndRefundOrder(amount, razorPayOrderId)
    updateObj = {
      orderStatus: 'REJECTED',
      paymentStatus: 'REFUND',
      orderPickupTime: 0,
      refundResponse: refundResponse.data
      //TODO: ADD ACTION_TAKEN_BY AND ACTION_TAKEN_BY_ID
      //TODO: CHANGE IN MODAL
    }
  }
  return updateObj
}

module.exports = updateOrderDetailObj
