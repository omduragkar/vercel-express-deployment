// const { isStaging, isDev, isProduction } = require('./env')

// /**
//  *
//  * @param {string} type
//  * @description Returns the razor pay key id or secret key
//  * @returns razor pay key
//  */

// const getRazorPayKeys = type => {
//   const {
//     RAZOR_PAY_PRODUCTION_KEY_ID,
//     RAZOR_PAY_TEST_KEY_ID,
//     RAZOR_PAY_SECRET_PRODUCTION_KEY,
//     RAZOR_PAY_SECRET_TEST_KEY
//   } = process.env
//   const testKeyId = isProduction ? RAZOR_PAY_PRODUCTION_KEY_ID : RAZOR_PAY_TEST_KEY_ID
//   const secretKey = isProduction ? RAZOR_PAY_SECRET_PRODUCTION_KEY : RAZOR_PAY_SECRET_TEST_KEY

//   return type === 'key' ? testKeyId : secretKey
// }

// module.exports = getRazorPayKeys
