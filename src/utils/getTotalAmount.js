const getTotalAmount = result => {
  const orderStatusArr = ['PICKED_UP', 'ACCEPTED', 'DONE']

  const totalOrders = result?.filter(obj => {
    const { paymentStatus, orderStatus } = obj
    return paymentStatus === 'DONE' && orderStatusArr.includes(orderStatus)
  })
  const rejected = result?.filter(obj=>{
    const { paymentStatus, orderStatus } = obj
    return paymentStatus === 'REFUND' && orderStatus === 'REJECTED'
  })
  const discountAmount = totalOrders.reduce((a, b) => a + (b?.discountObj?.discountAmount || 0), 0)

  const totalAmount = totalOrders.reduce((a, b) => a + b?.orderAmount, 0) + discountAmount

  return { totalAmount, discountAmount, totalOrders: totalOrders.length, refund: rejected }
}

module.exports = getTotalAmount

