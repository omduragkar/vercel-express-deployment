// const getRazorPayKeys = require('../../utils/getRazorPayKeys')
// const btoa = require('btoa')
// const axios = require('axios')

// /**
//  *
//  * @param {*} amount
//  * @param {*} razorPayOrderId
//  * @returns
//  */

// const cancelAndRefundOrder = async (amount, razorPayOrderId) => {
//   try {
//     const ID = getRazorPayKeys('key')
//     const SECRET_KEY = getRazorPayKeys('secret')

//     const razorpayToken = `${ID}:${SECRET_KEY}`

//     const encodedData = btoa(razorpayToken)

//     let data = {
//       amount,
//       notes: {
//         // TODO: Reason need to change as per condition, wht we refunding the amount
//         key_1: 'order not available'
//       }
//     }

//     const razorPayBody = {
//       url: `https://api.razorpay.com/v1/payments/${razorPayOrderId}/refund`,
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Basic ${encodedData}`
//       },
//       data
//     }
//     const razorPayResponse = await axios(razorPayBody)

//     return razorPayResponse?.data || 'Refund Failed'
//   } catch (error) {
//     console.log('Log: ~> file: placeOrder.js ~> line 746 ~> cancelAndRefundOrder ~> error.response', error)
//     return error.response || error
//   }
// }

// module.exports = cancelAndRefundOrder
