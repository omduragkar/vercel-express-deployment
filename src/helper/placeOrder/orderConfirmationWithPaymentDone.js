// const { default: axios } = require('axios')

// const orderConfirmedWithPaymentDone = async (
//   mobileNumber,
//   variables_values
// ) => {
//   const { API_KEY, SENDER_ID, MESSAGE_ID_PAYMENT_DONE, ENVIRONMENT } =
//     process.env
//   try {
//     if (ENVIRONMENT === 'staging') {
//       return
//     }
//     const body = {
//       url: `https://www.fast2sms.com/dev/bulkV2?authorization=${API_KEY}&route=dlt&sender_id=${SENDER_ID}&message=${MESSAGE_ID_PAYMENT_DONE}&variables_values=${variables_values}&flash=0&numbers=${mobileNumber}`,
//       method: 'GET',
//       mode: 'no-cors',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     const response = await axios(body)
//     return response.data
//   } catch (error) {
//     return error.response || error
//   }
// }

// module.exports = orderConfirmedWithPaymentDone
