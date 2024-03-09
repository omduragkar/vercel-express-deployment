const { smallOrder, mediumOrder } = require('../../constants/orderSizeOfPackaging')
const { TAKEAWAY } = require('../../constants/orderTypes')
const { MAX_DISCOUNT_AMOUNT } = require('../../constants/placeOrderConstants')

const getOrderAmountWithDiscount = (
  orderList,
  taxPercentage,
  isGstRegistered,
  orderType,
  restPackagingCharges,
  coupon,
  isCouponClaimed
) => {
  let taxAmount = isGstRegistered ? taxPercentage : 0
  let countTotalItems = 0
  let totalOrderAmount =
    orderList
      .map(item => {
        const price = item?.price || 0
        const quantity = item?.quantity || 0
        countTotalItems += quantity
        return price * quantity
      })
      .reduce((a, b) => a + b) || 0

  let totalPayableAmount = totalOrderAmount
  let discountAmount = MAX_DISCOUNT_AMOUNT
  let totalDiscountAmountMax = 0
  let totalAmountWithDiscount = undefined
  let taxOnTotalAmount = 0

  if (!isCouponClaimed) {
    taxOnTotalAmount = totalOrderAmount * taxAmount
    totalPayableAmount = totalOrderAmount + taxOnTotalAmount
  } else if (coupon && isCouponClaimed) {
    const maximumDiscountValue = coupon.maximumDiscountValue
    const minimumOrderValue = coupon.minimumOrderValue
    const couponType = coupon.type
    const couponValue = coupon.value
    if (totalOrderAmount >= minimumOrderValue) {
      if (couponType === 'percentage') {
        discountAmount = (totalOrderAmount * couponValue) / 100
        totalDiscountAmountMax =
          discountAmount >= maximumDiscountValue ? maximumDiscountValue : Math.round(discountAmount)
        totalAmountWithDiscount = totalOrderAmount - totalDiscountAmountMax
        taxOnTotalAmount = Math.round(totalAmountWithDiscount * taxAmount)
        totalPayableAmount = Math.round(totalAmountWithDiscount + taxOnTotalAmount)
      } else if (couponType === 'fixed') {
        totalDiscountAmountMax = couponValue
        totalAmountWithDiscount = totalOrderAmount - totalDiscountAmountMax
        taxOnTotalAmount = Math.round(totalAmountWithDiscount * taxAmount)
        totalPayableAmount = Math.round(totalAmountWithDiscount + taxOnTotalAmount)
      }
    }
  }

  // smallOrder mediumOrder and largeOrder are basically size of orders defination can be found in constants/orderSizeOfPackaing.js

  let packagingCharges
  if (restPackagingCharges && orderType === TAKEAWAY) {
    let size =
      countTotalItems <= smallOrder
        ? 'small'
        : countTotalItems > smallOrder && countTotalItems <= mediumOrder
        ? 'medium'
        : 'large'
    packagingCharges = restPackagingCharges[size]
    totalPayableAmount += restPackagingCharges[size]
  }

  return {
    totalOrderAmount, // sum total of all product
    taxOnTotalAmount,
    totalPayableAmount,
    discountAmount,
    totalDiscountAmountMax,
    packagingCharges
  }
}

module.exports = getOrderAmountWithDiscount
